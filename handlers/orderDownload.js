import path from 'node:path';
import { recordAbuse } from '@cityssm/express-abuse-points';
import { getOrder as miniShopDB_getOrder } from '@cityssm/mini-shop-db';
import convertHTMLToPDF from '@cityssm/pdf-puppeteer';
import dateTimeFunctions from '@cityssm/utils-datetime';
import * as ejs from 'ejs';
import * as configFunctions from '../helpers/configFunctions.js';
export default async function handler(request, response, next) {
    const orderNumber = request.params.orderNumber;
    const orderSecret = request.params.orderSecret;
    const itemIndex = request.params.itemIndex;
    const order = await miniShopDB_getOrder(orderNumber, orderSecret, true);
    if (!order) {
        recordAbuse(request);
        response.json({
            success: false,
            errorMessage: 'Order not found (possibly expired)'
        });
        return;
    }
    let item;
    for (const possibleItem of order.items ?? []) {
        if (possibleItem.itemIndex.toString() === itemIndex) {
            item = possibleItem;
            break;
        }
    }
    if (item === undefined) {
        recordAbuse(request);
        response.json({
            success: false,
            errorMessage: 'Item not found.'
        });
        return;
    }
    const product = configFunctions.getProperty('products')[item.productSKU];
    if (product === undefined || !(product.hasDownload ?? false)) {
        recordAbuse(request);
        response.json({
            success: false,
            errorMessage: 'No download available.'
        });
        return;
    }
    if (item.productSKU === 'oab') {
        const permitType = item.fields?.find((possibleField) => {
            return possibleField.formFieldName === 'permitType';
        })?.fieldValue ?? '';
        const streetAddress = item.fields?.find((possibleField) => {
            return possibleField.formFieldName === 'streetAddress';
        })?.fieldValue ?? '';
        const expiryDate = new Date(order.orderTime);
        if (permitType.endsWith('_1yr')) {
            expiryDate.setFullYear(expiryDate.getFullYear() + 1);
        }
        else if (permitType.endsWith('_4yr')) {
            expiryDate.setFullYear(expiryDate.getFullYear() + 4);
        }
        else {
            response.json({
                success: false,
                errorMessage: 'Unsupported permit type.'
            });
            return;
        }
        try {
            const ejsData = await ejs.renderFile(path.join('view-parts', 'downloads', 'oab.ejs'), {
                configFunctions,
                dateTimeFunctions,
                order,
                item,
                expiryDate,
                permitType,
                streetAddress
            }, { async: true });
            const pdf = await convertHTMLToPDF(ejsData, {
                format: 'Letter',
                printBackground: true,
                preferCSSPageSize: true
            }, {
                htmlIsUrl: false,
                remoteContent: true
            });
            console.log(pdf);
            response.setHeader('Content-Disposition', 'attachment; filename=oabPermit.pdf');
            response.setHeader('Content-Type', 'application/pdf');
            response.send(Buffer.from(pdf));
        }
        catch (error) {
            console.log(error);
            response.json({
                success: false,
                errorMessage: 'Error building download.'
            });
        }
    }
    else {
        recordAbuse(request);
        response.json({
            success: false,
            errorMessage: 'No download available.'
        });
    }
}

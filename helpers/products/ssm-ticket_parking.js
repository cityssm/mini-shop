import * as sqlPool from '@cityssm/mssql-multi-pool';
import * as configFunctions from '../configFunctions.js';
let tagNumberCache;
let tagNumberCacheExpiryMillis = 0;
const refreshTagNumberCache = async () => {
    const pool = await sqlPool.connect(configFunctions.getProperty('mssqlConfig'));
    const result = await pool
        .request()
        .query('select tagNumber from MiniShop.Products_SSMTicketParking_Ineligible');
    const temporaryCache = new Set();
    if (result.recordset) {
        for (const record of result.recordset) {
            temporaryCache.add(record.tagNumber.toLowerCase());
        }
    }
    tagNumberCache = temporaryCache;
    tagNumberCacheExpiryMillis = Date.now() + 3 * 60 * 60 * 1000;
};
export const isTagNumberEligible = async (tagNumber) => {
    if (tagNumberCacheExpiryMillis < Date.now()) {
        await refreshTagNumberCache();
    }
    if (tagNumberCache.has(tagNumber.toLowerCase())) {
        return false;
    }
    return true;
};

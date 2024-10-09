export default function handler(_request, response) {
    response.render('order-expired', {
        pageTitle: 'Order Expired'
    });
}

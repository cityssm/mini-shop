import { isTagNumberEligible } from '../../../helpers/products/ssm-ticket_parking.js';
export async function handler(request, response) {
    const tagNumber = request.body.tagNumber;
    let isEligible = true;
    try {
        isEligible = await isTagNumberEligible(tagNumber);
    }
    catch { }
    response.json({
        tagNumber,
        isEligible
    });
}
export default handler;

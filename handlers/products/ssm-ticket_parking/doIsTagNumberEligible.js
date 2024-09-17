import { isTagNumberEligible } from '../../../helpers/products/ssm-ticket_parking.js';
export async function handler(request, response) {
    const tagNumber = request.body.tagNumber;
    const isEligible = await isTagNumberEligible(tagNumber);
    response.json({
        tagNumber,
        isEligible
    });
}
export default handler;

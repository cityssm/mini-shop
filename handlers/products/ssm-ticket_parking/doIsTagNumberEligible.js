import { isTagNumberEligible } from "../../../helpers/products/ssm-ticket_parking.js";
export const handler = async (request, response) => {
    const tagNumber = request.body.tagNumber;
    const isEligible = await isTagNumberEligible(tagNumber);
    return response.json({
        tagNumber,
        isEligible
    });
};
export default handler;

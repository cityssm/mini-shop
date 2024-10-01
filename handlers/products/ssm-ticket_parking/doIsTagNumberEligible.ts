import type { Request, Response } from 'express'

import { isTagNumberEligible } from '../../../helpers/products/ssm-ticket_parking.js'

export async function handler(
  request: Request,
  response: Response
): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const tagNumber = request.body.tagNumber as string

  let isEligible = true

  try {
    isEligible = await isTagNumberEligible(tagNumber)
  } catch {}

  response.json({
    tagNumber,
    isEligible
  })
}

export default handler

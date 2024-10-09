import type { Request, Response } from 'express'

import { generateNewCaptcha } from '../helpers/captchaFunctions.js'
import { getProperty } from '../helpers/configFunctions.js'

export default async function handler(
  _request: Request,
  response: Response
): Promise<void> {
  const captchaKey = getProperty('settings.checkout_includeCaptcha')
    ? await generateNewCaptcha()
    : ''

  response.render('checkout', {
    pageTitle: 'Checkout',
    captchaKey
  })
}

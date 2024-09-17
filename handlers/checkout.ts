import { generateNewCaptcha } from '../helpers/captchaFunctions.js'
import * as configFunctions from '../helpers/configFunctions.js'

import type { RequestHandler } from 'express'

export const handler: RequestHandler = async (_request, response) => {
  const captchaKey = configFunctions.getProperty(
    'settings.checkout_includeCaptcha'
  )
    ? await generateNewCaptcha()
    : ''

  return response.render('checkout', {
    pageTitle: 'Checkout',
    captchaKey
  })
}

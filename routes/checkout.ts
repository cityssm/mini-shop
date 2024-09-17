import { Router } from 'express'

import { handler as handler_captcha } from '../handlers/captcha.js'
import { handler as handler_checkout } from '../handlers/checkout.js'
import { handler as handler_createOrder } from '../handlers/createOrder.js'
import { handler as handler_fromPayment } from '../handlers/fromPayment.js'
import { handler as handler_getProductDetails } from '../handlers/getProductDetails.js'
import { handler as handler_toPayment } from '../handlers/toPayment.js'

export const router = Router()

router.get('/', handler_checkout)

router.get('/captcha/:captchaKey', handler_captcha)

router.post('/doGetProductDetails', handler_getProductDetails)

router.post('/doCreateOrder', handler_createOrder)

router.post('/toPayment', handler_toPayment)

router.all('/fromPayment', handler_fromPayment)

export default router

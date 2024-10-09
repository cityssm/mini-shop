import { Router } from 'express'

import handler_orderDownload from '../handlers/orderDownload.js'
import handler_orderError from '../handlers/orderError.js'
import handler_orderExpired from '../handlers/orderExpired.js'
import handler_orderReceipt from '../handlers/orderReceipt.js'

export const router = Router()

router.get('/error', handler_orderError)

router.get('/expired', handler_orderExpired)

router.get('/:orderNumber/:orderSecret', handler_orderReceipt)

router.get(
  '/:orderNumber/:orderSecret/:itemIndex/download',
  handler_orderDownload
)

export default router

import type { Request } from 'express'

import type { StoreValidatorReturn } from './types.js'

export function validate(
  request: Request<
    unknown,
    unknown,
    { orderNumber?: string; orderSecret?: string }
  >
): StoreValidatorReturn {
  const orderNumber = request.body.orderNumber as string | undefined

  if ((orderNumber ?? '') === '') {
    return {
      isValid: false,
      errorCode: 'missingOrderNumber'
    }
  }

  const orderSecret = request.body.orderSecret as string | undefined

  if ((orderSecret ?? '') === '') {
    return {
      isValid: false,
      errorCode: 'missingOrderSecret'
    }
  }

  return {
    isValid: true,
    orderNumber: orderNumber as string,
    orderSecret: orderSecret as string,
    paymentID: orderNumber as string
  }
}

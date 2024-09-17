/* eslint-disable unicorn/filename-case, @eslint-community/eslint-comments/disable-enable-pair */

import type { Request, Response } from 'express'

export function handler(_request: Request, response: Response): void {
  response.render('order-error', {
    pageTitle: 'Order Error'
  })
}

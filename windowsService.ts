import path from 'path'

import type { ServiceConfig } from 'node-windows'

const __dirname = '.'

export const serviceConfig: ServiceConfig = {
  name: 'Mini Shop',
  description: 'A lightweight, highly customizable storefront.',
  script: path.join(__dirname, 'bin', 'www.js')
}

export default serviceConfig

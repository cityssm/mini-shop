import path from 'node:path'

import type { ServiceConfig } from 'node-windows'

// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = '.'

export const serviceConfig: ServiceConfig = {
  name: 'Mini Shop',
  description: 'A lightweight, highly customizable storefront.',
  script: path.join(__dirname, 'bin', 'www.js')
}

export default serviceConfig

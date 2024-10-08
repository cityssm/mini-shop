
import fs from 'node:fs'
import http from 'node:http'
import https from 'node:https'

import Debug from 'debug'

import { app } from '../app.js'
import * as configFunctions from '../helpers/configFunctions.js'


import { onError, onListening } from './serverFunctions.js'
const debug = Debug('mini-shop:www')

/**
 * Initialize HTTP
 */

const httpPort = configFunctions.getProperty('application.httpPort')

if (httpPort !== undefined) {
  const httpServer = http.createServer(app)

  httpServer.listen(httpPort)

  httpServer.on('error', onError)
  httpServer.on('listening', () => {
    onListening(httpServer)
  })

  debug(`HTTP listening on ${httpPort.toString()}`)
}

/**
 * Initialize HTTPS
 */

const httpsConfig = configFunctions.getProperty('application.https')

if (httpsConfig !== undefined) {
  const httpsServer = https.createServer(
    {
      key: fs.readFileSync(httpsConfig.keyPath),
      cert: fs.readFileSync(httpsConfig.certPath),
      passphrase: httpsConfig.passphrase
    },
    app
  )

  httpsServer.listen(httpsConfig.port)

  httpsServer.on('error', onError)

  httpsServer.on('listening', () => {
    onListening(httpsServer)
  })

  debug(`HTTPS listening on ${httpsConfig.port.toString()}`)
}

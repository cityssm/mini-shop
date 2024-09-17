import http from 'node:http'

import Debug from 'debug'

import * as configFunctions from '../helpers/configFunctions.js'

import { onError } from './serverFunctions.js'
const debug = Debug('mini-shop:www-lh')

/*
 * Override any url prefix value
 */

configFunctions.overrideProperty('reverseProxy.urlPrefix', '')
debug(configFunctions.getProperty('reverseProxy.urlPrefix'))

const { app } = await import('../app.js')

/**
 * Initialize HTTP
 */

const httpPort = 50_000

const httpServer = http.createServer(app)

httpServer.listen(httpPort)

httpServer.on('error', onError)

debug(`HTTP listening on ${httpPort.toString()}`)

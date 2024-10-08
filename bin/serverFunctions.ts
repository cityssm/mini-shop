// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable no-process-exit, unicorn/no-process-exit */

import type http from 'node:http'
import type https from 'node:https'

import Debug from 'debug'
const debug = Debug('mini-shop:serverFunctions')

export const onError = (error: Error): void => {
  if (error.syscall !== 'listen') {
    throw error
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES': {
      console.error('Requires elevated privileges')
      process.exit(1)
      break
    }

    case 'EADDRINUSE': {
      console.error('Port is already in use.')
      process.exit(1)
      break
    }

    default: {
      throw error
    }
  }
}

export const onListening = (server: http.Server | https.Server): void => {
  const addr = server.address() ?? '127.0.0.1'

  const bind =
    typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port.toString()}`

  debug(`Listening on ${bind}`)
}

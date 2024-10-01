import path from 'node:path'

import { abuseCheck } from '@cityssm/express-abuse-points'
import * as dateTimeFns from '@cityssm/expressjs-server-js/dateTimeFns.js'
import * as stringFns from '@cityssm/expressjs-server-js/stringFns.js'
import * as miniShopDB from '@cityssm/mini-shop-db'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import debug from 'debug'
import express from 'express'
import createError from 'http-errors'

import * as configFunctions from './helpers/configFunctions.js'
import * as translationHelpers from './helpers/translationHelpers.js'
import routerCheckout from './routes/checkout.js'
import routerOrder from './routes/order.js'
import routerProducts from './routes/products.js'
import { fixFees, fixProducts } from './helpers/miniShopDatabaseHelpers.js'

const debugApp = debug('mini-shop:app')

// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = '.'

/*
 * MINI SHOP DB
 */

miniShopDB.setConfig({
  mssqlConfig: configFunctions.getProperty('mssqlConfig'),
  orderNumberFunction: configFunctions.getProperty('orderNumberFunction'),
  products: fixProducts(configFunctions.getProperty('products')),
  fees: fixFees(configFunctions.getProperty('fees'))
})

/*
 * INITIALIZE APP
 */

export const app = express()

if (!configFunctions.getProperty('reverseProxy.disableEtag')) {
  app.set('etag', false)
}

// View engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(
  abuseCheck({
    byXForwardedFor: configFunctions.getProperty(
      'reverseProxy.blockViaXForwardedFor'
    ),
    byIP: !configFunctions.getProperty('reverseProxy.blockViaXForwardedFor'),
    abusePoints: 1,
    abusePointsMax: 5,
    clearIntervalMillis: 30 * 60 * 60 * 1000,
    expiryMillis: 10 * 60 * 60 * 1000
  })
)

if (!configFunctions.getProperty('reverseProxy.disableCompression')) {
  app.use(compression())
}

app.use((request, _response, next) => {
  debugApp(request.method + ' ' + request.url)
  next()
})

app.use(express.json())

app.use(
  express.urlencoded({
    extended: false
  })
)

app.use(cookieParser())

/*
 * STATIC ROUTES
 */

const urlPrefix = configFunctions.getProperty('reverseProxy.urlPrefix')

app.use(urlPrefix, express.static(path.join(__dirname, 'public')))

app.use(
  `${urlPrefix}/lib/js-cookie`,
  express.static(
    path.join(__dirname, 'node_modules', 'js-cookie', 'dist')
  )
)

app.use(
  `${urlPrefix}/lib/bulma-js`,
  express.static(
    path.join(__dirname, 'node_modules', '@cityssm', 'bulma-js', 'dist')
  )
)

app.use(
  `${urlPrefix}/lib/bulma-webapp-js`,
  express.static(
    path.join(__dirname, 'node_modules', '@cityssm', 'bulma-webapp-js', 'dist')
  )
)

app.use(
  `${urlPrefix}/lib/formToObject`,
  express.static(path.join(__dirname, 'node_modules', 'form_to_object', 'dist'))
)

/*
 * ROUTES
 */

const preferredLanguageCookieKey = 'preferredLanguage'

app.use((request, response, next) => {
  // eslint-disable-next-line security/detect-object-injection, @typescript-eslint/no-unsafe-member-access
  let languageToSet = request.cookies[preferredLanguageCookieKey] as
    | string
    | undefined

  const availableLanguages = configFunctions.getProperty('languages')

  if (availableLanguages.includes(languageToSet)) {
    next()
    return
  }

  languageToSet = request.headers['accept-language'] ?? 'en'

  debugApp(availableLanguages)

  for (const availableLanguage of availableLanguages) {
    if (languageToSet.startsWith(availableLanguage)) {
      debugApp('set language')
      response.cookie(preferredLanguageCookieKey, availableLanguage)
      next()
      return
    }
  }

  if (availableLanguages.length > 0) {
    languageToSet = availableLanguages[0]
  }

  response.cookie(preferredLanguageCookieKey, languageToSet)
  next()
})

// Make config objects available to the templates
app.use((request, response, next) => {
  response.locals.preferredLanguage = request.cookies[preferredLanguageCookieKey] ?? 'en'
  response.locals.configFunctions = configFunctions
  response.locals.translationHelpers = translationHelpers
  response.locals.dateTimeFns = dateTimeFns
  response.locals.stringFns = stringFns
  response.locals.urlPrefix = urlPrefix
  response.locals.pageTitle = ''
  next()
})



app.all(`${urlPrefix}/`, (_request, response) => {
  response.redirect(`${urlPrefix}/products`)
})

app.use(`${urlPrefix}/checkout`, routerCheckout)
app.use(`${urlPrefix}/order`, routerOrder)
app.use(`${urlPrefix}/products`, routerProducts)

// Catch 404 and forward to error handler
app.use((_request, _response, next) => {
  next(createError(404))
})

// Error handler
app.use(
  (error: Error, request: express.Request, response: express.Response) => {
    // Set locals, only providing error in development
    response.locals.message = error.message
    response.locals.error =
      request.app.get('env') === 'development' ? error : {}

    // Render the error page
    response.status(error.status ?? 500)
    response.render('error')
  }
)

export default app

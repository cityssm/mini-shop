# config.js

The `data/config.js` file is used to customize your application.
On first install, the file does not exist.  You must create one.

```javascript
let config = {};

// your configuration

module.exports = config;
```

* * *

## `config.application = {};`

| Property Name     | Type   | Description                                         | Default Value       |
| ----------------- | ------ | --------------------------------------------------- | ------------------- |
| `applicationName` | string | Make the application your own by changing the name. | `"Mini Shop"`       |
| `httpPort`        | number | The listening port for HTTP.                        | `7777`              |
| `https`           | object | The HTTPS configuration.                            | _(Described below)_ |

### `config.application.https = {};`

| Property Name | Type   | Description                                | Default Value |
| ------------- | ------ | ------------------------------------------ | ------------- |
| `port`        | number | The listening port for HTTPS.              | `null`        |
| `keyPath`     | string | The path to the key file.                  | `null`        |
| `certPath`    | string | The path to the certificate file.          | `null`        |
| `passphrase`  | string | The secret passphrase for the certificate. | `null`        |

## `config.reverseProxy = {};`

The settings here are most useful in cases where
the Node application will be served from a subfolder,
and use another server like IIS as a reverse proxy.

| Property Name           | Type    | Description                                                                                             | Default Value |
| ----------------------- | ------- | ------------------------------------------------------------------------------------------------------- | ------------- |
| `disableCompression`    | boolean | Whether the Node server should avoid compressing responses.                                             | `false`       |
| `disableEtag`           | boolean | Whether the Node server should send an etag header.                                                     | `false`       |
| `blockViaXForwardedFor` | boolean | Whether the Node server should enforce IP abuse filters by the IP address in the X-Forwarded-By header. | `false`       |
| `urlPrefix`             | string  | The folder name to prefix all URLs with.                                                                | `""`          |

## `config.orderNumberFunction = () => string;`

A function used to generate a new order number.

```javascript
// Default function
() => {
  return "RCT-" + uuidv4().toUpperCase();
});
```

## `config.site.header = {};`

| Property Name          | Type   | Description                                                                              | Default Value |
| ---------------------- | ------ | ---------------------------------------------------------------------------------------- | ------------- |
| `backgroundColorClass` | string | The color-piece of the Bulma background color class.                                     | `"info"`      |
| `logoImagePath`        | string | The path to image that should be included in the site header.  Small images recommended! | `""`          |

## `config.site.footer = {};`

| Property Name          | Type    | Description                                                      | Default Value       |
| ---------------------- | ------- | ---------------------------------------------------------------- | ------------------- |
| `isVisible`            | boolean | Whether or not the footer should be shown.                       | `true`              |
| `backgroundColorClass` | string  | The color-piece of the Bulma background color class.             | `"dark"`            |
| `textColorClass`       | string  | The color-piece of the Bulma foreground color class.             | `"light"`           |
| `footerEjs`            | string  | The name of the EJS file that should be displayed at the footer. | `"site_thanks.ejs"` |

## `config.views = {};`

## `config.productCategories = {};`

## `config.products = {};`

## `config.fees = {};`

## `config.store = {};`

[See the Store Documentation](stores.md)

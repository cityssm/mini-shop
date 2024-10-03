# mini-shop

[![Maintainability](https://img.shields.io/codeclimate/maintainability/cityssm/mini-shop)](https://codeclimate.com/github/cityssm/mini-shop/maintainability)
[![DeepSource](https://app.deepsource.com/gh/cityssm/mini-shop.svg/?label=active+issues&show_trend=true&token=ixfKMKwersYh_EKNcNsP2q3v)](https://app.deepsource.com/gh/cityssm/mini-shop/)

[![Mini Shop Screenshot](docs/ssmSample.png)](docs/ssmSample.png)

**mini-shop** is lightweight, highly customizable storefront built to meet the needs of our municipality.

## Features

- Completely customizable product pages to capture all the information you need.
- Ties into Moneris Chechout for payment processing out of the box, but can be integrated with other payment processing tools.
- Configuration that can be validated in TypeScript.

## System Requirements

- _Any_ server capable of running [NodeJS](https://nodejs.org) applications.
- A payment processing platform, like Moneris.
- A database on a SQL Server for recording the orders.

## Live Demo Store - Document Requesting Service

[The City of Sault Ste. Marie](https://saultstemarie.ca/)
processes requests for Property Tax Receipts using
a lightly customized mini-shop. It is regularly scanned by
[Lighthouse](https://github.com/GoogleChrome/lighthouse) to ensure it adheres to
best practices in performance and accessibility.

[City of Sault Ste. Marie's Document Requesting Service](https://apps.saultstemarie.ca/cityapps/shop/products)

[![apps.saultstemarie.ca-shop](https://github.com/cityssm/lighthouse-scans/actions/workflows/apps-shop-ci.yml/badge.svg)](https://github.com/cityssm/lighthouse-scans/actions/workflows/apps-shop-ci.yml)

## Documentation

- [Config.js Documentation](docs/configJS.md)
- [Store Types](docs/stores.md)

## Related Projects

[mini-shop-admin](https://github.com/cityssm/mini-shop-admin)

- An administrative application to assist with fulfilling orders.

[mini-shop-db](https://github.com/cityssm/mini-shop-db)

- A separate project isolating the queries to the backend SQL Server.

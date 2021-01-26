# mini-shop

[<img src="https://bulma.io/images/made-with-bulma--semiblack.png" alt="Made with Bulma" width="128" height="24" />](https://bulma.io) [![Codacy Badge](https://img.shields.io/codacy/grade/1f2c5b6f66e84eacbc524568357c2975)](https://www.codacy.com/gh/cityssm/mini-shop/dashboard) [![Maintainability](https://img.shields.io/codeclimate/maintainability/cityssm/mini-shop)](https://codeclimate.com/github/cityssm/mini-shop/maintainability) [![AppVeyor](https://img.shields.io/appveyor/build/dangowans/mini-shop)](https://ci.appveyor.com/project/dangowans/mini-shop) [![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/cityssm/mini-shop)](https://app.snyk.io/org/cityssm/project/d2a574ab-49cd-41e6-9318-c346223c1662)

[![Mini Shop Screenshot](docs/ssmSample.png)](docs/ssmSample.png)

**mini-shop** is lightweight, highly customizable storefront built to meet the needs of our municipality.

## Features

-   Completely customizable product pages to capture all the information you need.
-   Ties into Moneris' Hosted Pay Page for payment processing out of the box, but can be integrated with other payment processing tools.
-   Configuration that can be validated in TypeScript.

## System Requirements

-   _Any_ server capable of running [NodeJS](https://nodejs.org) applications.
-   A payment processing platform, like Moneris.
-   A database on a SQL Server for recording the orders.

## Live Demo Store - Document Requesting Service

[The City of Sault Ste. Marie](https://saultstemarie.ca/)
processes requests for Property Tax Receipts using
a lightly customized mini-shop.  It is regularly scanned by
[Lighthouse](https://github.com/GoogleChrome/lighthouse) to ensure it adheres to
best practices in performance and accessibility.

[City of Sault Ste. Marie's Document Requesting Service](https://apps.saultstemarie.ca/cityapps/shop/products)

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/cityssm/lighthouse-scans/apps.saultstemarie.ca-shop?label=Lighthouse%20Scans)](https://github.com/cityssm/lighthouse-scans/actions?query=workflow%3Aapps.saultstemarie.ca-shop)

## Documentation

-   [Config.js Documentation](docs/configJS.md)
-   [Store Types](docs/stores.md)

## Related Projects

[mini-shop-admin](https://github.com/cityssm/mini-shop-admin)

-   An administrative application to assist with fulfilling orders.

[mini-shop-db](https://github.com/cityssm/mini-shop-db)

-   A separate project isolating the queries to the backend SQL Server.

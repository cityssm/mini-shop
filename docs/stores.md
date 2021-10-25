# Store Types

## Moneris Checkout

```javascript
config.store = {
  storeType: "moneris-checkout",
  storeConfig: {
    store_id: "abcdefg",
    api_token: "hIjKlMnOp",
    checkout_id: "qrsTUVwxyZ",
    environment: "prod"
  }
}
```

## Configuration Settings

-   Under "Checkout Type", choose **"I have my custom order form and want to use Moneris simply for payment processing."**.

-   Under "Payment > Transaction Type", choose **"Purchase"**.

-   It is recommended under "Email Communication" to send Customer Emails on approved transactions.

## Moneris Hosted Paypage

**Deprecated by Moneris**

```javascript
config.store = {
  storeType: "moneris-hpp",
  storeConfig: {
    storeURL: "https://www3.moneris.com/HPPDP/index.php",
    ps_store_id: "a1a1a1a1",
    hpp_key: "b2b2b2b2",
    fees: {
      gst: "gst",
      pst: "pst",
      hst: "hst",
      shipping: "shipping"
    }
  }
};
```

### Configuration Settings

-   Set the "Transaction Type" to **"purchase"**.

-   Set the "Response Method" to **"Sent to your server as a POST"**.

-   Set the "Approved URL" and "Declined URL" to
    **"<https://[storeURL]/checkout/fromPayment>"**
    replacing `[storeURL]` with the address to your mini-shop.

-   You can set the fields that are returned along with the transaction response.
    Be sure **"Return other customer fields"** is checked.

-   Consider setting the "Referring URL" (under Security Features) to
    **"<https://[storeURL]/checkout/toPayment>"**

-   Consider enabling emailed receipts.

### Helpful Links

-   [Hosted Paypage Documentation](https://developer.moneris.com/en/Documentation/NA/E-Commerce%20Solutions/Hosted%20Solutions/Hosted%20Payment%20Page)
-   [Testing Merchant Resource Center](https://esqa.moneris.com/mpg/index.php)

* * *

## Testing

**Everything is free!!!**

```javascript
config.store = {
  storeType: "testing-free"
};
```

Setting up or testing a mini-shop and don't want to redirect to a real online payment platform?
The `testing-free` store type simply marks orders as paid when they are submitted.

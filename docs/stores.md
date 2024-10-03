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

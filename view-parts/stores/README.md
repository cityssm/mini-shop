# Store Types

## Moneris Hosted Paypage

```javascript
config.store = {
  storeType: "moneris-hpp",
  storeConfig: {
    storeURL: "https://www3.moneris.com/HPPDP/index.php",
    ps_store_id: "a1a1a1a1",
    hpp_key: "b2b2b2b2"
  }
};
```

-   [Hosted Paypage Documentation](https://developer.moneris.com/en/Documentation/NA/E-Commerce%20Solutions/Hosted%20Solutions/Hosted%20Payment%20Page)
-   [Testing Merchant Resource Center](https://esqa.moneris.com/mpg/index.php)

## Testing - Free!!!

```javascript
config.store = {
  storeType: "testing-free"
};
```

Setting up or testing a mini-shop and don't want to redirect to a real online payment platform?
The `testing-free` store type simply marks orders as paid when they are submitted.

# BetterCommerce JusPay NodeJS SDK

Juspay NodeJS SDK enables BetterCommerce client applications to integrate with JusPay merchant payment system. 

Use below command for package installation:

```
npm install bc-juspay-sdk
```

## SDK Initialization

**Use following snippet to initialize the SDK:**

```
JuspayEnv.init()
.withCredentials("<merchantId>", "<apiKey>", "<baseUrl> OPTIONAL");
```

## Usage Example ##

**Adding a new customer:**

```
const data = {
    object_reference_id: "john@smith.com",
    mobile_number: "2233556644",
    email_address: "john@smith.com",
    first_name: "John",
    last_name: "Smith",
    mobile_country_code: "+1",
};
const result = await Customer.create(data);
```
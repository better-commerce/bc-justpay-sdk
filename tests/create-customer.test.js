const { ExpressCheckout, JuspayEnv } = require("../dist");

const SDK_PAYMENT_LOG_BASE_URL = "https://deliverabilityapi.dev-damensch.com";
JuspayEnv.init();
JuspayEnv.withCredentials("damensch", "B34C749D81A46DCA33690D0B4A91EB:", "https://sandbox.juspay.in", undefined, undefined, {
    loggingBaseUrl: SDK_PAYMENT_LOG_BASE_URL,
    orgCode: "damensch",
    orgId: "9C549322-7E67-43EE-9C83-F6F4AD486694",
    domainId: "DDACCA23-E299-4345-A0FC-36DA0969A7AF",
});

ExpressCheckout.Customer.create({
    "object_reference_id": "65b4152e-d6d3-4adf-b1c2-afb7005ccd59",
    "mobile_number": "9468942161",
    "email_address": "john@doe.com",
    "first_name": "John",
    "last_name": "Doe",
    "mobile_country_code": "91"
}).then(createCustomerResult => {
    console.log(createCustomerResult);
}).catch(createCustomerError => {
    console.log(createCustomerError);
});
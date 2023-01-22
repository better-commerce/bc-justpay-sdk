const { ExpressCheckout, JuspayEnv } = require("../dist");

const SDK_PAYMENT_LOG_BASE_URL = "https://deliverabilityapi.dev-damensch.com";
JuspayEnv.init();
JuspayEnv.withCredentials("damensch", "713ED52588D405C8D1A75E97424CA6:", "https://api.juspay.in", undefined, undefined, {
    loggingBaseUrl: SDK_PAYMENT_LOG_BASE_URL,
    orgCode: "damensch",
    orgId: "9C549322-7E67-43EE-9C83-F6F4AD486694",
    domainId: "DDACCA23-E299-4345-A0FC-36DA0969A7AF",
});
ExpressCheckout.Merchant.paymentMethods({ ["options.add_outage"]: true })
    .then(paymentMethodsResult => {
        console.log(paymentMethodsResult);
    });
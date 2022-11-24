const { ExpressCheckout, JuspayEnv } = require("../dist");

JuspayEnv.withCredentials("damensch", "713ED52588D405C8D1A75E97424CA6:", "https://api.juspay.in");
ExpressCheckout.Order.get({ order_id: "15727-453726" })
    .then(orderStatusResult => {
        console.log(orderStatusResult);
    })
    .catch(error => {
        console.log(error);
    });
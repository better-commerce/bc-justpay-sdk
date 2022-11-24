const { ExpressCheckout, JuspayEnv } = require("../dist");

JuspayEnv.withCredentials("damensch", "713ED52588D405C8D1A75E97424CA6:", "https://api.juspay.in");
ExpressCheckout.Card.listAll({ customer_id: "50052a48-5403-4a91-85c6-af3000c7f60a" })
    .then(listCardsResult => {
        console.log(listCardsResult);
    });
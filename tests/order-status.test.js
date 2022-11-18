const { ExpressCheckout, JuspayEnv } = require("../dist");

JuspayEnv.withCredentials("damensch", "713ED52588D405C8D1A75E97424CA6:", "https://api.juspay.in");
ExpressCheckout.Order.status({ order_id: "15727-453726" });
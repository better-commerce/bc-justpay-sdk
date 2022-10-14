/*! bc-juspay-sdk
//@ File: constants.ts
//@ Description: Defines constants.
*/

export module Endpoints {
    export module Base {
        export const SANDBOX_URL = "https://sandbox.juspay.in";
        export const PRODUCTION_URL = "https://api.juspay.in";
    };

    export module Card {
        export const TOKENIZE = "/card/tokenize";
        export const ADD = "/card/add";
        export const LIST = "/card/list";
        export const DELETE = "/card/delete";
        export const BIN_INFO = "/cardbins";
    };

    export module Customer {
        export const CREATE_OR_LIST = "/customers";
        export const GET_OR_UPDATE = "/customers/{id}";
    };

    export module Order {
        export const CREATE = "/order/create";
        export const GET = "/orders/{orderId}";
        export const STATUS = "/order/status";
        export const UPDATE = "/order/update";
        export const LIST = "/order/list";
        export const REFUND = "/order/refund";
    };

    export module PaymentMethods {
        export const LIST = "/merchants/{merchantId}/paymentmethods";
    };

    export module Payment {
        export const TRANSACTIONS = "/txns";
    };

    export module Wallet {
        export const LIST = "/customers/{customerId}/wallets";
        export const REFRESH_BALANCES = "/customers/{customerId}/wallets/refresh-balances";
        export const CREATE = "/customers/{customerId}/wallets";
        export const AUTHENTICATE = "/wallets/{walletId}";
        export const REFRESH_OR_LINK_OR_DELINK = "/wallets/{walletId}";
    };

    export module UPI {
        export const VERIFY_VPA = "/v2/upi/verify-vpa";
    }
}
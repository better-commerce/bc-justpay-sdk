/*! bc-juspay-sdk
//@ File: constants.ts
//@ Description: Defines constants.
*/

export module Endpoints {
    export module Base {
        export const SANDBOX_URL = "https://sandbox.juspay.in";
        export const PRODUCTION_URL = "https://api.juspay.in";
    };
    export const LOG_API_CALL = "/Log/payment";

    export module Merchant {
        export const PAYMENT_METHODS = "/merchants/{merchantId}/paymentmethods";
    };

    export module Offers {
        export const LIST = "/v1/offers/list";
    };

    export module Card {
        export const TOKENIZE = "/card/tokenize";
        export const ADD = "/card/add";
        export const LIST = "/cards?customer_id={customerId}"; //"/card/list";
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
};

export const DEFAULT_UPI_URL_PREFIX = "upi://";
export const URL_FORMAT = "{upiUrlPrefix}pay?tr={tr}&pa={pa}&mc={mcc}&pn={pn}&am={am}&cu={cu}&tn={tn}";
export const URL_FORMAT_EXCLUDE_TXN_NO = "{upiUrlPrefix}pay?tr={tr}&pa={pa}&mc={mcc}&pn={pn}&am={am}&cu={cu}";
export const UPI_INTENT_LINKS = [
    {
        key: "AMAZONPAY",
        prefixUrl: "amzn://",
    },
    {
        key: "PAYTM",
        prefixUrl: "paytmmp://",
    },
    {
        key: "PHONEPE",
        prefixUrl: "phonepe://",
    },
    {
        key: "MOBIKWIK",
        prefixUrl: "",
    },
    {
        key: "FREECHARGE",
        prefixUrl: "",
    },
    {
        key: "GOOGLEPAY",
        prefixUrl: "tez://upi/",
    },
    {
        key: "BHIM",
        prefixUrl: "BHIM://",
    },
    {
        key: "CRED",
        prefixUrl: "cred://upi/",
    },
];

export const SDK_LOGGING_ENABLED = false;
export enum PaymentSource {
    TOKENIZE_CARD = "TokenizeCard",
    ADD_CARD = "AddCard",
    LIST_ALL_CARDS = "ListAllCards",
    DELETE_CARD = "DeleteCard",
    GET_CARD_INFO = "GetCardInfo",
    CREATE_CUSTOMER = "CreateCustomer",
    UPDATE_CUSTOMER = "UpdateCustomer",
    LIST_ALL_CUSTOMERS = "ListAllCustomers",
    GET_CUSTOMER = "GetCustomer",
    GET_PAYMENT_METHODS = "GetPaymentMethods",
    LIST_ALL_OFFERS = "ListAllOffers",
    CREATE_ORDER = "CreateOrder",
    GET_ORDER = "GetOrder",
    GET_ORDER_STATUS = "GetOrderStatus",
    UPDATE_ORDER = "UpdateOrder",
    LIST_ALL_ORDERS = "ListAllOrders",
    REFUND_ORDER = "RefundOrder",
    CREDIT_DEBIT_CARD_PAYMENT = "CreditDebitCardPayment",
    NETBANKING_PAYMENT = "NetbankingPayment",
    WALLET_PAYMENT = "WalletPayment",
    UPI_INTENT_PAYMENT = "UPIIntentPayment",
    VERIFY_VPA = "VerifyVPA",
    COLLECT_UPI_PAYMENT = "CollectUPIPayment",
    LIST_ALL_WALLETS = "ListAllWallets",
    REFRESH_WALLET_BALANCE = "RefreshWalletBalance",
    CREATE_WALLET = "CreateWallet",
    CREATE_AND_AUTHENTICATE_WALLET = "CreateAndAuthenticateWallet",
    REFRESH_BY_WALLET_ID = "RefreshByWalletId",
    AUTHENTICATE_WALLET = "AuthenticateWallet",
    LINK_WALLET = "LinkWallet",
    DELINK_WALLET = "DelinkWallet",
};
/*! bc-justpay-sdk
//@ File: format-util.ts
//@ Description: Publishes utility methods for data formatting.
*/

// Package Imports
const format = require("string-format");

export const stringFormat = (input: string, data: object) => {
    if (input) {
        return format(input, data);
    }
    return "";
};
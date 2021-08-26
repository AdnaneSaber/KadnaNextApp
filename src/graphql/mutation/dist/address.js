"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.DELETE_ADDRESS = exports.UPDATE_ADDRESS = void 0;
var client_1 = require("@apollo/client");
exports.UPDATE_ADDRESS = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation($addressInput: String!) {\n    updateAddress(addressInput: $addressInput) {\n      id\n      name\n      address {\n        id\n        name\n        info\n      }\n    }\n  }\n"], ["\n  mutation($addressInput: String!) {\n    updateAddress(addressInput: $addressInput) {\n      id\n      name\n      address {\n        id\n        name\n        info\n      }\n    }\n  }\n"])));
exports.DELETE_ADDRESS = client_1.gql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  mutation($addressId: String!) {\n    deleteAddress(addressId: $addressId) {\n      id\n      name\n      address {\n        id\n        name\n        info\n      }\n    }\n  }\n"], ["\n  mutation($addressId: String!) {\n    deleteAddress(addressId: $addressId) {\n      id\n      name\n      address {\n        id\n        name\n        info\n      }\n    }\n  }\n"])));
var templateObject_1, templateObject_2;

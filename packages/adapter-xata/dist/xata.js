"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XataClient = void 0;
/**
 * This file is auto-generated from Xata and corresponds
 * to the database types in the Xata database. Please do not
 * augment by hand.
 */
const client_1 = require("@xata.io/client");
const tables = [
    "nextauth_users",
    "nextauth_accounts",
    "nextauth_verificationTokens",
    "nextauth_users_accounts",
    "nextauth_users_sessions",
    "nextauth_sessions",
];
const DatabaseClient = (0, client_1.buildClient)();
class XataClient extends DatabaseClient {
    constructor(options) {
        super({ databaseURL: "", ...options }, tables);
    }
}
exports.XataClient = XataClient;

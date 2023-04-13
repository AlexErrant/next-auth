"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.DgraphClientError = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const node_fetch_1 = __importDefault(require("node-fetch"));
class DgraphClientError extends Error {
    constructor(errors, query, variables) {
        super(errors.map((error) => error.message).join("\n"));
        this.name = "DgraphClientError";
        console.error({ query, variables });
    }
}
exports.DgraphClientError = DgraphClientError;
function client(params) {
    if (!params.authToken) {
        throw new Error("Dgraph client error: Please provide an api key");
    }
    if (!params.endpoint) {
        throw new Error("Dgraph client error: Please provide a graphql endpoint");
    }
    const { endpoint, authToken, jwtSecret, jwtAlgorithm = "HS256", authHeader = "Authorization", } = params;
    const headers = {
        "Content-Type": "application/json",
        "X-Auth-Token": authToken,
    };
    if (authHeader && jwtSecret) {
        headers[authHeader] = jwt.sign({ nextAuth: true }, jwtSecret, {
            algorithm: jwtAlgorithm,
        });
    }
    return {
        async run(query, variables) {
            const response = await (0, node_fetch_1.default)(endpoint, {
                method: "POST",
                headers,
                body: JSON.stringify({ query, variables }),
            });
            const { data = {}, errors } = await response.json();
            if (errors === null || errors === void 0 ? void 0 : errors.length) {
                throw new DgraphClientError(errors, query, variables);
            }
            return Object.values(data)[0];
        },
    };
}
exports.client = client;

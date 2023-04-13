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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateConnectionEntities = exports.parseDataSourceConfig = void 0;
const defaultEntities = __importStar(require("./entities"));
/** Ensure configOrString is normalized to an object. */
function parseDataSourceConfig(configOrString) {
    var _a;
    if (typeof configOrString !== "string") {
        return {
            ...configOrString,
            entities: Object.values((_a = configOrString.entities) !== null && _a !== void 0 ? _a : defaultEntities),
        };
    }
    // If the input is URL string, automatically convert the string to an object
    // to make configuration easier (in most use cases).
    //
    // TypeORM accepts connection string as a 'url' option, but unfortunately
    // not for all databases (e.g. SQLite) or for all options, so we handle
    // parsing it in this function.
    try {
        const parsedUrl = new URL(configOrString);
        const config = {
            entities: Object.values(defaultEntities),
        };
        if (parsedUrl.protocol.startsWith("mongodb+srv")) {
            // Special case handling is required for mongodb+srv with TypeORM
            config.type = "mongodb";
            config.url = configOrString.replace(/\?(.*)$/, "");
            config.useNewUrlParser = true;
        }
        else {
            config.type = parsedUrl.protocol.replace(/:$/, "");
            config.host = parsedUrl.hostname;
            config.port = Number(parsedUrl.port);
            config.username = parsedUrl.username;
            config.password = parsedUrl.password;
            config.database = parsedUrl.pathname
                .replace(/^\//, "")
                .replace(/\?(.*)$/, "");
            config.options = {};
        }
        // This option is recommended by mongodb
        if (config.type === "mongodb") {
            config.useUnifiedTopology = true;
        }
        // Prevents warning about deprecated option (sets default value)
        if (config.type === "mssql") {
            config.options.enableArithAbort = true;
        }
        if (parsedUrl.search) {
            parsedUrl.search
                .replace(/^\?/, "")
                .split("&")
                .forEach((keyValuePair) => {
                let [key, value] = keyValuePair.split("=");
                // Converts true/false strings to actual boolean values
                if (value === "true") {
                    value = true;
                }
                if (value === "false") {
                    value = false;
                }
                config[key] = value;
            });
        }
        return config;
    }
    catch (error) {
        // If URL parsing fails for any reason, try letting TypeORM handle it
        return { url: configOrString };
    }
}
exports.parseDataSourceConfig = parseDataSourceConfig;
function entitiesChanged(prevEntities, newEntities) {
    if ((prevEntities === null || prevEntities === void 0 ? void 0 : prevEntities.length) !== (newEntities === null || newEntities === void 0 ? void 0 : newEntities.length))
        return true;
    for (let i = 0; i < (prevEntities === null || prevEntities === void 0 ? void 0 : prevEntities.length); i++) {
        if (prevEntities[i] !== newEntities[i])
            return true;
    }
    return false;
}
async function updateConnectionEntities(dataSource, entities) {
    if (!entitiesChanged(dataSource.entityMetadatas, entities))
        return;
    // @ts-expect-error
    dataSource.entityMetadatas = entities;
    // @ts-expect-error
    dataSource.buildMetadatas();
    if (dataSource.options.synchronize !== false) {
        console.warn("[next-auth][warn][adapter_typeorm_updating_entities]", "\nhttps://authjs.dev/reference/warnings#adapter_typeorm_updating_entities");
        await dataSource.synchronize();
    }
}
exports.updateConnectionEntities = updateConnectionEntities;

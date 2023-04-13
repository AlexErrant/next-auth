"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.format = void 0;
const neo4j_driver_1 = require("neo4j-driver");
// https://github.com/honeinc/is-iso-date/blob/master/index.js
const isoDateRE = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;
function isDate(value) {
    return value && isoDateRE.test(value) && !isNaN(Date.parse(value));
}
exports.format = {
    /** Takes a plain old JavaScript object and turns it into a Neo4j compatible object */
    to(object) {
        const newObject = {};
        for (const key in object) {
            const value = object[key];
            if (value instanceof Date)
                newObject[key] = value.toISOString();
            else
                newObject[key] = value;
        }
        return newObject;
    },
    /** Takes a Neo4j object and returns a plain old JavaScript object */
    from(object) {
        const newObject = {};
        if (!object)
            return null;
        for (const key in object) {
            const value = object[key];
            if (isDate(value)) {
                newObject[key] = new Date(value);
            }
            else if ((0, neo4j_driver_1.isInt)(value)) {
                if (neo4j_driver_1.integer.inSafeRange(value))
                    newObject[key] = value.toNumber();
                else
                    newObject[key] = value.toString();
            }
            else {
                newObject[key] = value;
            }
        }
        return newObject;
    },
};
function client(session) {
    return {
        /** Reads values from the database */
        async read(statement, values) {
            var _a, _b;
            const result = await session.readTransaction((tx) => tx.run(statement, values));
            return (_b = exports.format.from((_a = result === null || result === void 0 ? void 0 : result.records[0]) === null || _a === void 0 ? void 0 : _a.get(0))) !== null && _b !== void 0 ? _b : null;
        },
        /**
         * Reads/writes values from/to the database.
         * Properties are available under `$data`
         */
        async write(statement, values) {
            var _a;
            const result = await session.writeTransaction((tx) => tx.run(statement, { data: exports.format.to(values) }));
            return exports.format.from((_a = result === null || result === void 0 ? void 0 : result.records[0]) === null || _a === void 0 ? void 0 : _a.toObject());
        },
    };
}
exports.client = client;

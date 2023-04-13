"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.format = void 0;
// https://github.com/honeinc/is-iso-date/blob/master/index.js
const isoDateRE = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;
function isDate(value) {
    return value && isoDateRE.test(value) && !isNaN(Date.parse(value));
}
exports.format = {
    from(object) {
        const newObject = {};
        if (!object)
            return null;
        for (const key in object) {
            const value = object[key];
            if (isDate(value)) {
                newObject[key] = new Date(value);
            }
            else {
                newObject[key] = value;
            }
        }
        return newObject;
    },
};

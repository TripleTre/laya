"use strict";
/* tslint:disable */
function equals(a, b) {
    var typeA = typeof a;
    var typeB = typeof b;
    if (typeA !== typeB) {
        return false;
    }
    if (typeA === 'boolean' ||
        typeA === 'number' ||
        typeA === 'string') {
        return a === b;
    }
    if (typeA === 'undefined') {
        return true;
    }
    if (typeA === 'object') {
        return objectHandler(a, b);
    }
}
exports.__esModule = true;
exports["default"] = equals;
function objectHandler(a, b) {
    if (a === null && b === null) {
        return true;
    }
    var isArrayA = Array.isArray(a);
    var isArrayB = Array.isArray(b);
    if (isArrayA !== isArrayB) {
        return false;
    }
    if (isArrayA === true) {
        return arrayHandler(a, b);
    }
    else {
        if (a === null || b === null) {
            return false;
        }
        var keyA = Object.keys(a);
        var keyB = Object.keys(b);
        var keys = keyA.length > keyB.length ? keyA : keyB;
        return keys.every(function (v) {
            return equals(a[v], b[v]);
        });
    }
}
function arrayHandler(a, b) {
    if (a.length !== b.length) {
        return false;
    }
    return a.every(function (v, index) {
        return equals(v, b[index]);
    });
}

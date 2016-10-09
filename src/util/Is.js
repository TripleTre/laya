"use strict";
exports.__esModule = true;
exports["default"] = {
    /**
     * @param obj 要测试的对象
     * @return 对象是否不为null并且不为undefined
     */
    isPresent: function (obj) {
        return obj !== undefined && obj !== null;
    },
    isAbsent: function (obj) {
        return obj === undefined || obj === null;
    },
    isEmpty: function (obj) {
        return Object.keys(obj).length === 0;
    },
    isNotEmpty: function (obj) {
        return Object.keys(obj).length !== 0;
    },
    isNumber: function (arg) {
        return arg === +arg;
    }
};

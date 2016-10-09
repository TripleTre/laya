"use strict";
var Is_1 = require('./Is');
exports.__esModule = true;
exports["default"] = {
    deepSet: function (obj, path, value) {
        var cpy = obj;
        var nodes = path.split('.');
        for (var i = 0, len = nodes.length; i < len; i++) {
            var attr = nodes[i];
            if (i === len - 1) {
                cpy[attr] = value;
            }
            else {
                cpy = cpy[attr];
                if (Is_1["default"].isAbsent(cpy)) {
                    return;
                }
            }
        }
    },
    createByProperties: function (props) {
        var ret = Object.create(null);
        props.forEach(function (v) {
            Object.defineProperty(ret, v, {});
        });
        return ret;
    },
    deepGet: function (obj, path) {
        var nodes = path.split('.');
        return nodes.reduce(function (cur, node) { return cur[node]; }, obj);
    }
};

"use strict";
var Counter_1 = require('./Counter');
var AbstractSupportObject = (function () {
    function AbstractSupportObject(id) {
        if (id < 0) {
            this.id = Counter_1["default"]();
        }
        else {
            this.id = id;
        }
        this.children = [];
    }
    AbstractSupportObject.prototype.getId = function () {
        return this.id;
    };
    AbstractSupportObject.prototype.addChildren = function (id) {
        this.children.push(id);
    };
    AbstractSupportObject.prototype.getChildren = function () {
        return this.children;
    };
    return AbstractSupportObject;
}());
exports.AbstractSupportObject = AbstractSupportObject;

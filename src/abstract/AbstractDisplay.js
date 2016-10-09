"use strict";
var Counter_1 = require('./Counter');
var AbstractDisplayObject = (function () {
    function AbstractDisplayObject(game, require, optional, id) {
        if (id < 0 || id === undefined) {
            this.id = Counter_1["default"]();
        }
        else {
            this.id = id;
        }
        this.children = [];
        this.buildRealObject(game, require, optional);
    }
    AbstractDisplayObject.prototype.destroy = function () {
        this.realObject.destroy(true);
        this.realObject = null;
    };
    AbstractDisplayObject.prototype.getRealObject = function () {
        return this.realObject;
    };
    AbstractDisplayObject.prototype.getId = function () {
        return this.id;
    };
    AbstractDisplayObject.prototype.addChildren = function (id) {
        this.children.push(id);
    };
    AbstractDisplayObject.prototype.getChildren = function () {
        return this.children;
    };
    return AbstractDisplayObject;
}());
exports.AbstractDisplayObject = AbstractDisplayObject;

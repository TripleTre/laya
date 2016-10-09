"use strict";
var Counter_1 = require('./Counter');
var Iter_1 = require('../util/Iter');
var AbstractComponent = (function () {
    // private getterProperty: Map<Getter, string>     =  new Map<Getter, string>();
    function AbstractComponent(id) {
        this.$$refs = Object.create(null);
        this.$$repeatScope = new Map();
        this.$$repeatIndex = new Map();
        this.$$repeatAttrs = new Set();
        if (id < 0) {
            this.$$id = Counter_1["default"]();
        }
        else {
            this.$$id = id;
        }
    }
    AbstractComponent.prototype.destroy = function () {
        this.$$rootContainer.destroy();
    };
    AbstractComponent.prototype.setRootContainer = function (value) {
        this.$$rootContainer = value;
    };
    AbstractComponent.prototype.getRootContainer = function () {
        return this.$$rootContainer;
    };
    AbstractComponent.prototype.getId = function () {
        return this.$$id;
    };
    AbstractComponent.prototype.getOwn = function () {
        return this.$$own;
    };
    AbstractComponent.prototype.setOwn = function (own) {
        this.$$own = own;
    };
    AbstractComponent.prototype.addToRepeatScope = function (name, value) {
        this.$$repeatScope.set(name, value);
        this.$$repeatAttrs.add(name);
        if (!this.hasOwnProperty(name)) {
            Object.defineProperty(this, name, {
                get: function () {
                    return this.$$repeatScope.get(name)[this.$$repeatIndex.get(name)];
                }
            });
        }
    };
    AbstractComponent.prototype.setRepeatIndex = function (name, index) {
        this.$$repeatIndex.set(name, index);
        if (!this.hasOwnProperty(name + 'Index')) {
            Object.defineProperty(this, name + 'Index', {
                get: function () {
                    return this.$$repeatIndex.get(name);
                }
            });
        }
    };
    AbstractComponent.prototype.hasOwnActiveProperty = function (name) {
        var data = this.constructor['$$data'] || [];
        var prop = this.constructor['$$prop'] || [];
        var getter = (this.constructor['$$getter'] || []).map(function (v) { return v.name; });
        return data.concat(prop)
            .concat(getter)
            .indexOf(name) >= 0;
    };
    AbstractComponent.prototype.resetRepeatIndex = function () {
        Iter_1.forEachKey(this.$$repeatIndex.keys(), (function (key) {
            this.$$repeatIndex.set(key, 0);
        }).bind(this));
    };
    AbstractComponent.prototype.generatorRepeatInfo = function () {
        var ret = Object.create(null);
        Iter_1.forEachKey(this.$$repeatIndex.keys(), (function (key) {
            ret[key] = this.$$repeatIndex.get(key);
        }).bind(this));
        return ret;
    };
    AbstractComponent.prototype.getLayaGame = function () {
        return this.$$game;
    };
    AbstractComponent.prototype.setLayaGame = function (value) {
        this.$$game = value;
    };
    return AbstractComponent;
}());
exports.AbstractComponent = AbstractComponent;

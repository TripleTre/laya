"use strict";
var ComponentManager_1 = require('../ctrl/ComponentManager');
var ViewModelManager_1 = require('../ctrl/ViewModelManager');
var StateManager_1 = require('../ctrl/StateManager');
var Counter_1 = require('./Counter');
var Iter_1 = require('../util/Iter');
var SenceManager_1 = require('../ctrl/SenceManager');
var DisplayObjectManager_1 = require('../ctrl/DisplayObjectManager');
var SupportObjectManager_1 = require('../ctrl/SupportObjectManager');
var AbstractSence = (function () {
    function AbstractSence() {
        this.$$refs = Object.create(null);
        this.subComponents = [];
        this.subSupports = [];
        this.subDisplays = [];
        // private getterProperty: Map<Getter, string> = new Map<Getter, string>();
        this.repeatScope = new Map();
        this.repeatIndex = new Map();
        this.$$repeatAttrs = new Set();
        this.id = Counter_1["default"]();
    }
    /**
     *  返回场景对象的所有子组件
     */
    AbstractSence.prototype.getSubComponents = function () {
        return this.subComponents;
    };
    AbstractSence.prototype.addSubComponent = function (component) {
        this.subComponents.push(component);
    };
    AbstractSence.prototype.addSubSupport = function (support) {
        this.subSupports.push(support);
    };
    AbstractSence.prototype.addSubDisplay = function (display) {
        this.subSupports.push(display);
    };
    AbstractSence.prototype.getLayaGame = function () {
        return this.layaGame;
    };
    AbstractSence.prototype.setLayaGame = function (game) {
        this.layaGame = game;
    };
    AbstractSence.prototype.destroySubComponent = function () {
        this.subComponents.forEach(function (v) {
            var id = v.getId();
            ComponentManager_1["default"].deleteComponent(id);
            ViewModelManager_1["default"].deleteViewModel(id);
            StateManager_1["default"].delete(id);
        });
        this.subComponents = [];
    };
    AbstractSence.prototype.destroySubDisplay = function () {
        this.subDisplays.forEach(function (v) {
            DisplayObjectManager_1["default"].deleteDisplay(v.getId());
        });
    };
    AbstractSence.prototype.destroySubSupport = function () {
        this.subSupports.forEach(function (v) {
            SupportObjectManager_1["default"].deleteSupportObject(v.getId());
        });
    };
    AbstractSence.prototype.destroySelf = function () {
        this.destroySubComponent();
        this.destroySubDisplay();
        this.destroySubSupport();
        var id = this.getId();
        ViewModelManager_1["default"].deleteViewModel(id);
        StateManager_1["default"].delete(id);
        SenceManager_1["default"].deleteSence(id);
    };
    AbstractSence.prototype.getId = function () {
        return this.id;
    };
    AbstractSence.prototype.addToRepeatScope = function (name, value) {
        this.repeatScope.set(name, value);
        this.$$repeatAttrs.add(name);
        if (!this.hasOwnProperty(name)) {
            Object.defineProperty(this, name, {
                get: function () {
                    return this.repeatScope.get(name)[this.repeatIndex.get(name)];
                }
            });
        }
    };
    AbstractSence.prototype.setRepeatIndex = function (name, index) {
        this.repeatIndex.set(name, index);
        if (!this.hasOwnProperty(name + 'Index')) {
            Object.defineProperty(this, name + 'Index', {
                get: function () {
                    return this.repeatIndex.get(name);
                }
            });
        }
    };
    AbstractSence.prototype.hasOwnActiveProperty = function (name) {
        var data = this.constructor['$$data'] || [];
        var prop = this.constructor['$$prop'] || [];
        var getter = this.constructor['$$getter'] || [];
        return data.concat(prop)
            .concat(getter)
            .indexOf(name) >= 0;
    };
    AbstractSence.prototype.resetRepeatIndex = function () {
        Iter_1.forEachKey(this.repeatIndex.keys(), (function (key) {
            this.repeatIndex.set(key, 0);
        }).bind(this));
    };
    AbstractSence.prototype.generatorRepeatInfo = function () {
        var ret = Object.create(null);
        Iter_1.forEachKey(this.repeatIndex.keys(), (function (key) {
            ret[key] = this.repeatIndex.get(key);
        }).bind(this));
        return ret;
    };
    AbstractSence.prototype.setRootContainer = function (value) {
        this.$$rootContainer = value;
    };
    AbstractSence.prototype.getRootContainer = function () {
        return this.$$rootContainer;
    };
    return AbstractSence;
}());
exports.AbstractSence = AbstractSence;

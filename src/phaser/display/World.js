"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractDisplay_1 = require('../../abstract/AbstractDisplay');
var World = (function (_super) {
    __extends(World, _super);
    function World() {
        _super.apply(this, arguments);
    }
    // constructor() {
    //     super(-1);
    // }
    World.prototype.buildRealObject = function (game, require, optional) {
        //
    };
    World.prototype.add = function (obj) {
        this.realObject.add(obj.getRealObject());
    };
    World.prototype.remove = function (child, destroy) {
        return this.realObject.remove(child, destroy);
    };
    World.prototype.setWorld = function (w) {
        this.realObject = w;
    };
    return World;
}(AbstractDisplay_1.AbstractDisplayObject));
exports.__esModule = true;
exports["default"] = World;

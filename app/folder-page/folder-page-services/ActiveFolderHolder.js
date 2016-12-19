"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by talizorah on 16.18.12.
 */
var core_1 = require('@angular/core');
var ActiveFolderHolder = (function () {
    function ActiveFolderHolder() {
    }
    ActiveFolderHolder.prototype.saveActiveObject = function (object) {
        this.activeObject = object;
    };
    ActiveFolderHolder.prototype.getActiveObject = function () {
        return this.activeObject;
    };
    ActiveFolderHolder.prototype.saveActiveFolder = function (folder) {
        this.activeFolder = folder;
    };
    ActiveFolderHolder.prototype.getActiveFolder = function () {
        return this.activeFolder;
    };
    ActiveFolderHolder.prototype.saveParentFolder = function (folder) {
        this.parentFolder = folder;
    };
    ActiveFolderHolder.prototype.getParentFolder = function () {
        return this.parentFolder;
    };
    ActiveFolderHolder.prototype.saveMainFolder = function (folder) {
        this.prevParentFolder = folder;
    };
    ActiveFolderHolder.prototype.getMainFolder = function () {
        return this.prevParentFolder;
    };
    ActiveFolderHolder.prototype.saveAllFolders = function (folders) {
        this.allFolders = folders;
    };
    ActiveFolderHolder.prototype.getAllFolders = function () {
        return this.allFolders;
    };
    ActiveFolderHolder = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ActiveFolderHolder);
    return ActiveFolderHolder;
}());
exports.ActiveFolderHolder = ActiveFolderHolder;
//# sourceMappingURL=ActiveFolderHolder.js.map
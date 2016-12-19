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
var FileHelperService = (function () {
    function FileHelperService() {
    }
    FileHelperService.prototype.getContentType = function (type) {
        switch (type) {
            case 'png': return 'image/png';
            case 'jpg': return 'image/jpeg';
            default: return 'text/plain';
        }
    };
    FileHelperService.prototype.getCorrectFileName = function (file) {
        return file.filename;
    };
    FileHelperService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], FileHelperService);
    return FileHelperService;
}());
exports.FileHelperService = FileHelperService;
//# sourceMappingURL=FIleHelperService.js.map
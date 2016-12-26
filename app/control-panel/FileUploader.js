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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var Observable_1 = require('rxjs/Observable');
var UserHolderService_1 = require('../user/UserHolderService');
var FileUploadProvider = (function () {
    function FileUploadProvider(http, userService) {
        this.http = http;
        this.userService = userService;
        this.base_url = "http://192.168.2.117:8000";
        this.headerSetted = false;
        this.headers = new http_1.Headers();
        this.headers.append('Content-Type', 'multipart/form-data');
        if (this.userService.isUserAuthorized()) {
            this.headers.append('Authorization', 'Token ' + this.userService.getCurrentUser().token);
        }
    }
    FileUploadProvider.prototype.downloadFileRequest = function (file_id) {
        if (this.userService.isUserAuthorized()) {
            this.headers = new http_1.Headers();
            this.headers.append('Content-Type', 'multipart/form-data');
            this.headers.append('Authorization', 'Token ' + this.userService.getCurrentUser().token);
        }
        var toAdd = JSON.stringify({ file_id: file_id });
        return this.http.post(this.base_url + '/download_file', toAdd, { headers: this.headers })
            .map(function (response) { return response; });
    };
    FileUploadProvider.prototype.createUploadRequest = function (file, parent_id) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            var formData = new FormData(), xhr = new XMLHttpRequest();
            formData.append("uploads[]", file, file.name);
            formData.append("parent_id", parent_id);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 201) {
                        observer.next(JSON.parse(xhr.response));
                    }
                    else {
                        observer.error(xhr.response);
                    }
                }
            };
            xhr.open('POST', _this.base_url + '/upload_file', true);
            xhr.setRequestHeader("Authorization", 'Token ' + _this.userService.getCurrentUser().token);
            xhr.send(formData);
        });
    };
    FileUploadProvider = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, UserHolderService_1.UserHolderService])
    ], FileUploadProvider);
    return FileUploadProvider;
}());
exports.FileUploadProvider = FileUploadProvider;
//# sourceMappingURL=FileUploader.js.map
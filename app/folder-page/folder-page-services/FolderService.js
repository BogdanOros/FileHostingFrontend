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
 * Created by talizorah on 16.17.12.
 */
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var UserHolderService_1 = require('../../user/UserHolderService');
require('rxjs/add/operator/map');
var FoldersLoaderService = (function () {
    function FoldersLoaderService(http, userService) {
        this.http = http;
        this.userService = userService;
        this.base_url = "http://192.168.2.117:8000";
        this.headers = new http_1.Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }
    FoldersLoaderService.prototype.getAll = function (username) {
        if (this.userService.isUserAuthorized()) {
            this.headers = new http_1.Headers();
            this.headers.append('Content-Type', 'application/json');
            this.headers.append('Accept', 'application/json');
            this.headers.append('Authorization', 'Token ' + this.userService.getCurrentUser().token);
        }
        return this.http.get(this.base_url + '/' + username + '/home', { headers: this.headers })
            .map(function (response) { return response.json(); });
    };
    ;
    FoldersLoaderService.prototype.getAllInFolder = function (username, folder_id) {
        var toAdd = JSON.stringify({ folder_id: folder_id });
        return this.http.post(this.base_url + '/' + username + '/home', toAdd, { headers: this.headers })
            .map(function (response) { return response.json(); });
    };
    ;
    FoldersLoaderService.prototype.addFolder = function (title, parentId) {
        var toAdd = JSON.stringify({ title: title, parent_id: parentId });
        return this.http.post(this.base_url + "/create_folder", toAdd, { headers: this.headers })
            .map(function (response) { return response.json(); });
    };
    ;
    FoldersLoaderService.prototype.deleteFolder = function (folderId, parentId) {
        var toAdd = JSON.stringify({ folder_id: folderId, parent_id: parentId });
        return this.http.post(this.base_url + "/delete_folder", toAdd, { headers: this.headers })
            .map(function (response) { return response.json(); });
    };
    FoldersLoaderService.prototype.deleteFile = function (file_id, parent_id) {
        var toAdd = JSON.stringify({ file_id: file_id, parent_id: parent_id });
        return this.http.post(this.base_url + "/delete_file", toAdd, { headers: this.headers })
            .map(function (response) { return response.json(); });
    };
    FoldersLoaderService.prototype.updateFolder = function (folderId, parentId, title) {
        var toAdd = JSON.stringify({ folder_id: folderId, parent_id: parentId, new_title: title });
        return this.http.post(this.base_url + "/update_folder", toAdd, { headers: this.headers })
            .map(function (response) { return response.json(); });
    };
    FoldersLoaderService.prototype.updateFile = function (file_id, parentId, title) {
        var toAdd = JSON.stringify({ file_id: file_id, parent_id: parentId, new_filename: title });
        return this.http.post(this.base_url + "/update_file", toAdd, { headers: this.headers })
            .map(function (response) { return response.json(); });
    };
    FoldersLoaderService.prototype.searchRequest = function (query) {
        var toAdd = JSON.stringify({ query: query });
        return this.http.post(this.base_url + "/search", toAdd, { headers: this.headers })
            .map(function (response) { return response.json(); });
    };
    FoldersLoaderService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, UserHolderService_1.UserHolderService])
    ], FoldersLoaderService);
    return FoldersLoaderService;
}());
exports.FoldersLoaderService = FoldersLoaderService;
//# sourceMappingURL=FolderService.js.map
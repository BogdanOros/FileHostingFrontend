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
 * Created by talizorah on 16.19.12.
 */
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var UserHolderService_1 = require('../user/UserHolderService');
require('rxjs/add/operator/map');
var UserProviderService = (function () {
    function UserProviderService(http, userService) {
        this.http = http;
        this.userService = userService;
        this.base_url = "http://192.168.2.117:8000";
        this.headers = new http_1.Headers();
        this.headers.append('Content-Type', 'multipart/form-data');
    }
    UserProviderService.prototype.getUser = function (username) {
        if (this.userService.isUserAuthorized()) {
            this.headers = new http_1.Headers();
            this.headers.append('Content-Type', 'multipart/form-data');
            this.headers.append('Authorization', 'Token ' + this.userService.getCurrentUser().token);
        }
        return this.http.get(this.base_url + '/u/' + username, { headers: this.headers })
            .map(function (response) { return response.json(); });
    };
    UserProviderService.prototype.createReadPermissionRequest = function (isFolder, id, username) {
        return this.createPermissionRequest(isFolder, id, username, this.base_url + '/give_read_permission');
    };
    UserProviderService.prototype.createDenyPermissionRequest = function (isFolder, id, username) {
        return this.createPermissionRequest(isFolder, id, username, this.base_url + '/deny_read_permission');
    };
    UserProviderService.prototype.createPermissionRequest = function (isFolder, id, username, url) {
        var toAdd;
        if (isFolder) {
            toAdd = JSON.stringify({ folder_id: id, username: username });
        }
        else {
            toAdd = JSON.stringify({ file_id: id, username: username });
        }
        return this.http.post(url, toAdd, { headers: this.headers })
            .map(function (response) { return response.json(); });
    };
    UserProviderService.prototype.searchForUsers = function (query) {
        if (this.userService.isUserAuthorized()) {
            this.headers = new http_1.Headers();
            this.headers.append('Content-Type', 'multipart/form-data');
            this.headers.append('Authorization', 'Token ' + this.userService.getCurrentUser().token);
        }
        var toAdd = JSON.stringify({ query: query });
        return this.http.post(this.base_url + '/search_user', toAdd, { headers: this.headers })
            .map(function (response) { return response.json(); });
    };
    UserProviderService.prototype.sendFriendshipRequst = function (username) {
        var toAdd = JSON.stringify({ to_user: username });
        return this.http.post(this.base_url + '/send_request', toAdd, { headers: this.headers })
            .map(function (response) { return response.json(); });
    };
    UserProviderService.prototype.acceptRequest = function (requestId) {
        var toAdd = JSON.stringify({ request_id: requestId });
        return this.http.post(this.base_url + '/accept_request', toAdd, { headers: this.headers })
            .map(function (response) { return response.json(); });
    };
    UserProviderService.prototype.declineRequest = function (requestId) {
        var toAdd = JSON.stringify({ request_id: requestId });
        return this.http.post(this.base_url + '/decline_request', toAdd, { headers: this.headers })
            .map(function (response) { return response.json(); });
    };
    UserProviderService.prototype.createStatsRequest = function () {
        if (this.userService.isUserAuthorized()) {
            this.headers = new http_1.Headers();
            this.headers.append('Content-Type', 'multipart/form-data');
            this.headers.append('Authorization', 'Token ' + this.userService.getCurrentUser().token);
        }
        return this.http.get(this.base_url + '/statistics', { headers: this.headers })
            .map(function (response) { return response.json(); });
    };
    UserProviderService.prototype.createChangePasswordRequest = function (password) {
        if (this.userService.isUserAuthorized()) {
            this.headers = new http_1.Headers();
            this.headers.append('Content-Type', 'multipart/form-data');
            this.headers.append('Authorization', 'Token ' + this.userService.getCurrentUser().token);
        }
        var toAdd = JSON.stringify({ password: password });
        return this.http.post(this.base_url + '/change_password', toAdd, { headers: this.headers })
            .map(function (response) { return response.json(); });
    };
    UserProviderService.prototype.createRestoreDatabaseRequest = function () {
        if (this.userService.isUserAuthorized()) {
            this.headers = new http_1.Headers();
            this.headers.append('Content-Type', 'multipart/form-data');
            this.headers.append('Authorization', 'Token ' + this.userService.getCurrentUser().token);
        }
        return this.http.get(this.base_url + '/restore_db', { headers: this.headers })
            .map(function (response) { return response.json(); });
    };
    UserProviderService.prototype.createDeleteFromFriendsRequest = function (id) {
        if (this.userService.isUserAuthorized()) {
            this.headers = new http_1.Headers();
            this.headers.append('Content-Type', 'multipart/form-data');
            this.headers.append('Authorization', 'Token ' + this.userService.getCurrentUser().token);
        }
        var toAdd = JSON.stringify({ user_id: id });
        return this.http.post(this.base_url + '/delete_friend', toAdd, { headers: this.headers })
            .map(function (response) { return response.json(); });
    };
    UserProviderService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, UserHolderService_1.UserHolderService])
    ], UserProviderService);
    return UserProviderService;
}());
exports.UserProviderService = UserProviderService;
//# sourceMappingURL=UserProviderService.js.map
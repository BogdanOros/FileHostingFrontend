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
        if (this.userService.isUserAuthorized()) {
            this.headers.append('Authorization', 'Token 8619c86a6189c2710b9862e4488e46ff148f0229');
        }
    }
    UserProviderService.prototype.getUser = function (username) {
        return this.http.get(this.base_url + '/u/' + username, { headers: this.headers })
            .map(function (response) { return response.json(); });
    };
    UserProviderService.prototype.searchForUsers = function (query) {
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
        return this.http.post(this.base_url + '/accept_request', toAdd, { headers: this.headers });
    };
    UserProviderService.prototype.declineRequest = function (requestId) {
        var toAdd = JSON.stringify({ request_id: requestId });
        return this.http.post(this.base_url + '/decline_request', toAdd, { headers: this.headers });
    };
    UserProviderService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, UserHolderService_1.UserHolderService])
    ], UserProviderService);
    return UserProviderService;
}());
exports.UserProviderService = UserProviderService;
//# sourceMappingURL=UserProviderService.js.map
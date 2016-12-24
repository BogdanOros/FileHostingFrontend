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
var router_1 = require('@angular/router');
var UserHolderService_1 = require('../user/UserHolderService');
var UserProviderService_1 = require('./UserProviderService');
var ProfileComponent = (function () {
    function ProfileComponent(userProvider, route, userHolder) {
        this.userProvider = userProvider;
        this.route = route;
        this.userHolder = userHolder;
        this.isLoaded = false;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .map(function (params) { return params['username']; })
            .subscribe(function (username) {
            _this.userProvider
                .getUser(username)
                .subscribe(function (user) { return _this.user = user; }, function (error) { return console.log(error); }, function () { return _this.isLoaded = true; });
        });
    };
    ProfileComponent.prototype.showUserRequests = function () {
        return this.user.hasOwnProperty('requests') && this.user.requests.lenght > 0;
    };
    ProfileComponent.prototype.showCorrectDate = function (data) {
        return new Date(data);
    };
    ProfileComponent.prototype.acceptRequest = function (request) {
        var _this = this;
        this.userProvider.acceptRequest(request.id)
            .subscribe(function () { return _this.removeFromRequest(request); });
    };
    ProfileComponent.prototype.declineRequest = function (request) {
        var _this = this;
        this.userProvider.declineRequest(request.id)
            .subscribe(function () { return _this.removeFromRequest(request); });
    };
    ProfileComponent.prototype.removeFromRequest = function (request) {
        this.user.requests.splice(this.user.requests.indexOf(request, 0), 1);
    };
    ProfileComponent.prototype.openUsersFolders = function (friend) {
    };
    ProfileComponent = __decorate([
        core_1.Component({
            selector: 'profile',
            templateUrl: '/app/profile/profile.component.html',
            styleUrls: ['app/profile/profile.css']
        }), 
        __metadata('design:paramtypes', [UserProviderService_1.UserProviderService, router_1.ActivatedRoute, UserHolderService_1.UserHolderService])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map
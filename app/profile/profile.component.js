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
var ng2_bs3_modal_1 = require('ng2-bs3-modal/ng2-bs3-modal');
var router_1 = require('@angular/router');
var UserHolderService_1 = require('../user/UserHolderService');
var UserProviderService_1 = require('./UserProviderService');
var ProfileComponent = (function () {
    function ProfileComponent(userProvider, route, userHolder) {
        this.userProvider = userProvider;
        this.route = route;
        this.userHolder = userHolder;
        this.ownUser = true;
        this.isLoaded = false;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .map(function (params) { return params['username']; })
            .subscribe(function (username) {
            _this.userProvider
                .getUser(username)
                .subscribe(function (user) { return _this.checkOwnUser(user); }, function (error) { return console.log(error); }, function () { return _this.isLoaded = true; });
        });
    };
    ProfileComponent.prototype.checkOwnUser = function (user) {
        this.user = user;
        this.ownUser = this.userHolder.getCurrentUser().username == user.username;
    };
    ProfileComponent.prototype.showUserRequests = function () {
        return this.userHolder.isUserAuthorized() && this.user.hasOwnProperty('requests');
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
    ProfileComponent.prototype.openChangePasswordModal = function () {
        this.modal.open();
    };
    ProfileComponent.prototype.changePassword = function (first_pass, second_pass) {
        var _this = this;
        if (first_pass.length > 0 && first_pass == second_pass) {
            this.userProvider.createChangePasswordRequest(first_pass)
                .subscribe(function (data) { return _this.modal.close(); });
        }
    };
    ProfileComponent.prototype.deleteFromFriends = function (friend) {
        var _this = this;
        this.userProvider.createDeleteFromFriendsRequest(friend.id)
            .subscribe(function (data) { return _this.user.friends.splice(_this.user.friends.indexOf(friend, 0), 1); });
    };
    __decorate([
        core_1.ViewChild('changePasswordModal'), 
        __metadata('design:type', ng2_bs3_modal_1.ModalComponent)
    ], ProfileComponent.prototype, "modal", void 0);
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
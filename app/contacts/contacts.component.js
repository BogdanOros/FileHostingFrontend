/**
 * Created by talizorah on 16.19.12.
 */
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
var core_1 = require('@angular/core');
var UserHolderService_1 = require('../user/UserHolderService');
var UserProviderService_1 = require('./../profile/UserProviderService');
var ContactsComponent = (function () {
    function ContactsComponent(userHolder, userProvider) {
        this.userHolder = userHolder;
        this.userProvider = userProvider;
    }
    ContactsComponent.prototype.searchForUser = function (query) {
        var _this = this;
        this.userProvider.searchForUsers(query)
            .subscribe(function (data) { return _this.dataLoaded(data); });
    };
    ContactsComponent.prototype.ngOnInit = function () {
        this.users = this.userHolder.getLastQueryUsers();
    };
    ContactsComponent.prototype.dataLoaded = function (data) {
        this.users = data;
        for (var _i = 0, _a = this.users; _i < _a.length; _i++) {
            var user = _a[_i];
            switch (user.is_friend) {
                case 1:
                    user.imageUrl = '/app/contacts/resources/friend.png';
                    break;
                case 2:
                    user.imageUrl = '/app/contacts/resources/requested.png';
                    break;
                default:
                    user.imageUrl = '/app/contacts/resources/simple.png';
            }
            user.currentImageUrl = user.imageUrl;
        }
        this.userHolder.saveLastQueryUsers(this.users);
    };
    ContactsComponent.prototype.mouseEnteredUser = function (user) {
        if (user.is_friend == 0) {
            user.currentImageUrl = '/app/contacts/resources/add.png';
        }
    };
    ContactsComponent.prototype.mouseLeftUser = function (user) {
        user.currentImageUrl = user.imageUrl;
    };
    ContactsComponent.prototype.sendFriendshipRequest = function (user) {
        var _this = this;
        if (user.is_friend == 0) {
            this.userProvider.sendFriendshipRequst(user.username)
                .subscribe(function (data) { return _this.requestIsSent(user); });
        }
    };
    ContactsComponent.prototype.requestIsSent = function (user) {
        user.is_friend = 2;
        user.imageUrl = '/app/contacts/resources/requested.png';
        user.currentImageUrl = user.imageUrl;
    };
    ContactsComponent = __decorate([
        core_1.Component({
            selector: 'contacts',
            templateUrl: '/app/contacts/contacts.component.html',
            styleUrls: ['app/contacts/contacts.css']
        }), 
        __metadata('design:paramtypes', [UserHolderService_1.UserHolderService, UserProviderService_1.UserProviderService])
    ], ContactsComponent);
    return ContactsComponent;
}());
exports.ContactsComponent = ContactsComponent;
//# sourceMappingURL=contacts.component.js.map
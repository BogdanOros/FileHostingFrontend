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
 * Created by talizorah on 16.21.12.
 */
var core_1 = require('@angular/core');
var User_1 = require('./../../../user/User');
var UserHolderService_1 = require("../../../user/UserHolderService");
var LocalStorageProvider = (function () {
    // Restore user functions
    function LocalStorageProvider(userHolder) {
        this.userHolder = userHolder;
        this.userHolder.setCurrentUser(this.getUserIfExists());
    }
    LocalStorageProvider.prototype.getUserIfExists = function () {
        if (this.usersTokenSaved()) {
            return this.restoreSavedUserFromStorage();
        }
    };
    LocalStorageProvider.prototype.restoreSavedUserFromStorage = function () {
        var token = this.getFieldPropertyFromStorage(LocalStorageProvider.TOKEN);
        var username = this.getFieldPropertyFromStorage(LocalStorageProvider.USERNAME);
        var email = this.getFieldPropertyFromStorage(LocalStorageProvider.EMAIL);
        var lastName = this.getFieldPropertyFromStorage(LocalStorageProvider.LAST_NAME);
        var firstName = this.getFieldPropertyFromStorage(LocalStorageProvider.FIRST_NAME);
        return new User_1.User(token, username, email, firstName, lastName);
    };
    LocalStorageProvider.prototype.usersTokenSaved = function () {
        return this.getFieldPropertyFromStorage(LocalStorageProvider.TOKEN) != LocalStorageProvider.EMPTY;
    };
    // Remove user from localStorage
    LocalStorageProvider.prototype.removeUsersDataFromLocalStorage = function () {
        if (this.usersTokenSaved()) {
            this.removeFieldPropertyFromStorage(LocalStorageProvider.TOKEN);
            this.removeFieldPropertyFromStorage(LocalStorageProvider.EMAIL);
            this.removeFieldPropertyFromStorage(LocalStorageProvider.LAST_NAME);
            this.removeFieldPropertyFromStorage(LocalStorageProvider.FIRST_NAME);
            this.removeFieldPropertyFromStorage(LocalStorageProvider.USERNAME);
        }
    };
    // Save user to localStorage
    LocalStorageProvider.prototype.saveUsersDataToLocalStorage = function (user) {
        this.setFieldPropertyToStorage(LocalStorageProvider.TOKEN, user.token);
        this.setFieldPropertyToStorage(LocalStorageProvider.USERNAME, user.username);
        this.setFieldPropertyToStorage(LocalStorageProvider.EMAIL, user.email);
        this.setFieldPropertyToStorage(LocalStorageProvider.LAST_NAME, user.last_name);
        this.setFieldPropertyToStorage(LocalStorageProvider.FIRST_NAME, user.first_name);
    };
    LocalStorageProvider.prototype.saveUsersSignInMetadata = function (username, password, fieldsRemembered) {
        this.setFieldPropertyToStorage(LocalStorageProvider.LOGIN, username);
        this.setFieldPropertyToStorage(LocalStorageProvider.PASSWORD, password);
        var fieldsRememberedConvert = String(fieldsRemembered);
        this.setFieldPropertyToStorage(LocalStorageProvider.FIELDS_REMEMBERED, fieldsRememberedConvert);
    };
    LocalStorageProvider.prototype.initSignInModalInputData = function (loginData) {
        var dataRememberedString = this.getFieldPropertyFromStorage(LocalStorageProvider.FIELDS_REMEMBERED);
        loginData.remembered = this.loginDataRemembered(dataRememberedString);
        loginData.username = loginData.remembered ? this.getFieldPropertyFromStorage(LocalStorageProvider.LOGIN)
            : LocalStorageProvider.EMPTY;
        loginData.password = loginData.remembered ? this.getFieldPropertyFromStorage(LocalStorageProvider.PASSWORD)
            : LocalStorageProvider.EMPTY;
    };
    // Helper functions
    LocalStorageProvider.prototype.setFieldPropertyToStorage = function (property, value) {
        localStorage.setItem(property, value);
    };
    LocalStorageProvider.prototype.getFieldPropertyFromStorage = function (property) {
        return localStorage.getItem(property) || LocalStorageProvider.EMPTY;
    };
    LocalStorageProvider.prototype.removeFieldPropertyFromStorage = function (property) {
        localStorage.removeItem(property);
    };
    LocalStorageProvider.prototype.loginDataRemembered = function (remembered) {
        return remembered == "true";
    };
    LocalStorageProvider.TOKEN = "token";
    LocalStorageProvider.USERNAME = "username";
    LocalStorageProvider.PASSWORD = "password";
    LocalStorageProvider.EMAIL = "email";
    LocalStorageProvider.FIRST_NAME = "first_name";
    LocalStorageProvider.LAST_NAME = "last_name";
    LocalStorageProvider.FIELDS_REMEMBERED = "fields_remembered";
    LocalStorageProvider.LOGIN = "login";
    LocalStorageProvider.EMPTY = "";
    LocalStorageProvider = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [UserHolderService_1.UserHolderService])
    ], LocalStorageProvider);
    return LocalStorageProvider;
}());
exports.LocalStorageProvider = LocalStorageProvider;
//# sourceMappingURL=localStorageUpdater.js.map
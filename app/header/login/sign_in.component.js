/**
 * Created by talizorah on 16.10.12.
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
var header_constants_1 = require('../header.constants');
var ng2_bs3_modal_1 = require('ng2-bs3-modal/ng2-bs3-modal');
var loginService_1 = require('./login-services/loginService');
var UserHolderService_1 = require('../../user/UserHolderService');
var localStorageUpdater_1 = require('./login-services/localStorageUpdater');
var router_1 = require('@angular/router');
var loginData_1 = require('./login-services/loginData');
var SignInComponent = (function () {
    function SignInComponent(loginService, localStorageProvider, router, userHolder) {
        this.loginService = loginService;
        this.localStorageProvider = localStorageProvider;
        this.router = router;
        this.userHolder = userHolder;
        this.userHolder.setCurrentUser(this.localStorageProvider.getUserIfExists());
        this.loginData = new loginData_1.LoginMeta();
    }
    SignInComponent.prototype.openModal = function () {
        var _this = this;
        if (this.userHolder.isUserAuthorized()) {
            this.loginService.createLogoutRequest()
                .subscribe(function (data) { return _this.logoutFinished(); });
        }
        else {
            this.openLoginModalWindow();
        }
    };
    SignInComponent.prototype.ngOnInit = function () {
        this.changeButtonText();
    };
    SignInComponent.prototype.sendLoginRequest = function () {
        var _this = this;
        if (!this.checkInputEntered()) {
            this.showEmptyInputErrorMessage();
            return;
        }
        this.loginService.createSignInRequest(this.loginData.username, this.loginData.password)
            .subscribe(function (user) { return _this.userHolder.setCurrentUser(user); }, function (error) { return _this.incorrectPasswordError(); }, function () { return _this.authorizationFinished(); });
    };
    SignInComponent.prototype.incorrectPasswordError = function () {
        this.errorMessage = "Incorrect password or login";
        this.showErrorMessage = true;
    };
    SignInComponent.prototype.logoutFinished = function () {
        this.userHolder.clearAuthorizedUser();
        this.localStorageProvider.removeUsersDataFromLocalStorage();
        this.changeButtonText();
        this.userHolder.setDataLoaded(false);
    };
    SignInComponent.prototype.authorizationFinished = function () {
        this.localStorageProvider.saveUsersDataToLocalStorage(this.userHolder.getCurrentUser());
        this.localStorageProvider.saveUsersSignInMetadata(this.loginData.username, this.loginData.password, this.loginData.remembered);
        this.changeButtonText();
        this.loginModal.close();
        this.userHolder.setDataLoaded(true);
        this.router.navigate(['/profile', this.userHolder.getCurrentUser().username]);
    };
    SignInComponent.prototype.checkInputEntered = function () {
        return this.loginData.username.length > 0 && this.loginData.password.length > 0;
    };
    SignInComponent.prototype.changeButtonText = function () {
        if (!this.userHolder.isUserAuthorized()) {
            this.buttonText = header_constants_1.HeaderConstants.signInButton;
        }
        else {
            this.buttonText = header_constants_1.HeaderConstants.logoutButton;
        }
    };
    SignInComponent.prototype.openLoginModalWindow = function () {
        this.initInputData();
        this.loginModal.open();
    };
    // Modal window subfunctions
    SignInComponent.prototype.initInputData = function () {
        this.localStorageProvider.initSignInModalInputData(this.loginData);
        this.showErrorMessage = false;
    };
    SignInComponent.prototype.openEmailVerifModalWindow = function () {
        this.loginModal.close();
        this.emailVerifModal.open();
    };
    SignInComponent.prototype.showEmptyInputErrorMessage = function () {
        this.errorMessage = "Please, fill the inputs";
        this.showErrorMessage = true;
    };
    SignInComponent.prototype.sendPasswordRestoreRequest = function () {
        var _this = this;
        if (this.restoreEmail.length > 0) {
            this.loginService.createEmailPasswordRestoreRequest(this.restoreEmail)
                .subscribe(function (data) { return console.log(data); }, function (error) { return console.log(error); }, function () { return _this.openRestorePasswordModal(); });
        }
    };
    SignInComponent.prototype.openRestorePasswordModal = function () {
        this.restorePasswordModal.open();
        this.emailVerifModal.close();
    };
    SignInComponent.prototype.restorePassword = function (code, newPassword, repeatPassword) {
        var _this = this;
        if (newPassword == repeatPassword) {
            this.loginService.createResetPasswordRequest(newPassword, code)
                .subscribe(function (data) { return _this.restorePasswordErrorMessage(data); }, function (error) { return console.log(error); }, function () { return _this.returnToSignInModal(); });
        }
    };
    SignInComponent.prototype.restorePasswordErrorMessage = function (message) {
        if (message == "Invalid code") {
            this.errorMessage = message;
            this.showErrorMessage = true;
        }
    };
    SignInComponent.prototype.returnToSignInModal = function () {
        this.restorePasswordModal.close();
        this.openLoginModalWindow();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SignInComponent.prototype, "buttonText", void 0);
    __decorate([
        core_1.ViewChild('loginModal'), 
        __metadata('design:type', ng2_bs3_modal_1.ModalComponent)
    ], SignInComponent.prototype, "loginModal", void 0);
    __decorate([
        core_1.ViewChild('sendEmailModal'), 
        __metadata('design:type', ng2_bs3_modal_1.ModalComponent)
    ], SignInComponent.prototype, "emailVerifModal", void 0);
    __decorate([
        core_1.ViewChild('restorePasswordModal'), 
        __metadata('design:type', ng2_bs3_modal_1.ModalComponent)
    ], SignInComponent.prototype, "restorePasswordModal", void 0);
    SignInComponent = __decorate([
        core_1.Component({
            selector: 'sign-in',
            templateUrl: '/app/header/login/sign_in.component.html',
            styleUrls: ['app/header/login/sign_in.css']
        }), 
        __metadata('design:paramtypes', [loginService_1.LoginProviderService, localStorageUpdater_1.LocalStorageProvider, router_1.Router, UserHolderService_1.UserHolderService])
    ], SignInComponent);
    return SignInComponent;
}());
exports.SignInComponent = SignInComponent;
//# sourceMappingURL=sign_in.component.js.map
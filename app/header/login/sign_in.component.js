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
var User_1 = require('../../user/User');
var SignInComponent = (function () {
    function SignInComponent(loginService, userHolder) {
        this.loginService = loginService;
        this.userHolder = userHolder;
        // Contants
        this.REMEMBER_ME_CHECK = 'dataRemembered';
        this.USERNAME = 'username';
        this.PASSWORD = 'password';
        if (localStorage.getItem('token') != null) {
            var username = localStorage.getItem('username');
            var email = localStorage.getItem('email');
            var first_name = localStorage.getItem('first_name');
            var last_name = localStorage.getItem('last_name');
            var user = new User_1.User(username, email, first_name, last_name);
            this.userHolder.setCurrentUser(user);
        }
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
        this.loginService.createSignInRequest(this.username, this.password)
            .subscribe(function (user) { return _this.userHolder.setCurrentUser(user); }, function (error) { return console.log(error); }, function () { return _this.authorizationFinished(); });
    };
    SignInComponent.prototype.logoutFinished = function () {
        this.userHolder.clearAuthorizedUser();
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('first_name');
        localStorage.removeItem('last_name');
        this.changeButtonText();
    };
    SignInComponent.prototype.authorizationFinished = function () {
        this.modal.close();
        localStorage.setItem('token', '8619c86a6189c2710b9862e4488e46ff148f0229');
        localStorage.setItem('username', this.userHolder.getCurrentUser().username);
        localStorage.setItem('email', this.userHolder.getCurrentUser().email);
        localStorage.setItem('first_name', this.userHolder.getCurrentUser().first_name);
        localStorage.setItem('last_name', this.userHolder.getCurrentUser().last_name);
        localStorage.setItem(this.PASSWORD, this.password);
        localStorage.setItem(this.REMEMBER_ME_CHECK, this.rememberedMe);
        this.changeButtonText();
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
        this.modal.open();
    };
    // Modal window subfunctions
    SignInComponent.prototype.initInputData = function () {
        this.rememberedMe = localStorage.getItem(this.REMEMBER_ME_CHECK);
        if (!this.rememberedMe) {
            // Using two-way binding
            this.username = null;
            this.password = null;
        }
        else {
            this.username = localStorage.getItem(this.USERNAME);
            this.password = localStorage.getItem(this.PASSWORD);
        }
    };
    SignInComponent.prototype.changeRememberField = function (element) {
        this.rememberedMe = element.checked;
    };
    SignInComponent.prototype.openEmailVerifModalWindow = function () {
        this.modal.close();
        this.emailVerifModal.open();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SignInComponent.prototype, "buttonText", void 0);
    __decorate([
        core_1.ViewChild('loginModal'), 
        __metadata('design:type', ng2_bs3_modal_1.ModalComponent)
    ], SignInComponent.prototype, "modal", void 0);
    __decorate([
        core_1.ViewChild('restorePasswordModal'), 
        __metadata('design:type', ng2_bs3_modal_1.ModalComponent)
    ], SignInComponent.prototype, "emailVerifModal", void 0);
    SignInComponent = __decorate([
        core_1.Component({
            selector: 'sign-in',
            templateUrl: '/app/header/login/sign_in.component.html',
            styleUrls: ['app/header/login/sign_in.css']
        }), 
        __metadata('design:paramtypes', [loginService_1.LoginProviderService, UserHolderService_1.UserHolderService])
    ], SignInComponent);
    return SignInComponent;
}());
exports.SignInComponent = SignInComponent;
//# sourceMappingURL=sign_in.component.js.map
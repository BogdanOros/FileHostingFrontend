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
var RegisterMetadata_1 = require('./RegisterMetadata');
var registerService_1 = require('./register-folder/registerService');
var SignUpComponent = (function () {
    function SignUpComponent(registerProvider) {
        this.registerProvider = registerProvider;
        this.data = new RegisterMetadata_1.RegisterMetadata();
        this.buttonText = header_constants_1.HeaderConstants.signUpButton;
    }
    SignUpComponent.prototype.openModal = function () {
        this.modal.open();
    };
    SignUpComponent.prototype.sendRegisterRequest = function () {
        this.registerProvider.createSignUpRequest(this.data).subscribe(function (user) { return console.log(user); });
        this.modal.close();
    };
    __decorate([
        core_1.ViewChild('registerModal'), 
        __metadata('design:type', ng2_bs3_modal_1.ModalComponent)
    ], SignUpComponent.prototype, "modal", void 0);
    SignUpComponent = __decorate([
        core_1.Component({
            selector: 'sign-up',
            templateUrl: '/app/header/register/sign_up.component.html',
            styleUrls: ['app/header/register/sign_up.css']
        }), 
        __metadata('design:paramtypes', [registerService_1.RegisterProviderService])
    ], SignUpComponent);
    return SignUpComponent;
}());
exports.SignUpComponent = SignUpComponent;
//# sourceMappingURL=sign_up.component.js.map
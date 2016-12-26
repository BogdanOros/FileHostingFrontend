/**
 * Created by talizorah on 16.10.12.
 */

import { Component, ViewChild, Input} from '@angular/core';
import { HeaderConstants } from '../header.constants';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { LoginProviderService } from './login-services/loginService';
import { UserHolderService } from '../../user/UserHolderService';
import { LocalStorageProvider } from './login-services/localStorageUpdater';

import { Router } from '@angular/router'

import { User } from '../../user/User';
import { LoginMeta } from './login-services/loginData';

@Component({
    selector : 'sign-in',
    templateUrl : '/app/header/login/sign_in.component.html',
    styleUrls: ['app/header/login/sign_in.css']
})
export class SignInComponent {

    @Input()
    buttonText: string;

    @ViewChild('loginModal')
    loginModal: ModalComponent;

    @ViewChild('sendEmailModal')
    emailVerifModal: ModalComponent;

    @ViewChild('restorePasswordModal')
    restorePasswordModal: ModalComponent;

    loginData: LoginMeta;
    restoreEmail: string;

    showErrorMessage: boolean;
    errorMessage: string;

    constructor(
        private loginService: LoginProviderService,
        private localStorageProvider : LocalStorageProvider,
        private router : Router,
        private userHolder: UserHolderService
    ) {
        this.userHolder.setCurrentUser(this.localStorageProvider.getUserIfExists());
        this.loginData = new LoginMeta();
    }

    openModal(){
        if (this.userHolder.isUserAuthorized()) {
            this.loginService.createLogoutRequest()
                .subscribe((data: string) => this.logoutFinished());
        } else {
            this.openLoginModalWindow();
        }
    }

    ngOnInit() {
        this.changeButtonText();
    }

    sendLoginRequest() {
        if (!this.checkInputEntered()) {
            this.showEmptyInputErrorMessage();
            return;
        }
        this.loginService.createSignInRequest(this.loginData.username, this.loginData.password)
           .subscribe((user: User) => this.userHolder.setCurrentUser(user),
               error => this.incorrectPasswordError(),
               () => this.authorizationFinished())
    }

    incorrectPasswordError() {
        this.errorMessage = "Incorrect password or login";
        this.showErrorMessage = true;
    }

    logoutFinished() {
        this.userHolder.clearAuthorizedUser();
        this.localStorageProvider.removeUsersDataFromLocalStorage();
        this.changeButtonText();
        this.userHolder.setDataLoaded(false);
    }

    authorizationFinished() {
        this.localStorageProvider.saveUsersDataToLocalStorage(this.userHolder.getCurrentUser());
        this.localStorageProvider.saveUsersSignInMetadata(this.loginData.username, this.loginData.password, this.loginData.remembered);
        this.changeButtonText();
        this.loginModal.close();
        this.userHolder.setDataLoaded(true);
        this.router.navigate(['/profile', this.userHolder.getCurrentUser().username]);
    }

    checkInputEntered() {
        return this.loginData.username.length > 0 && this.loginData.password.length > 0;
    }

    changeButtonText() {
        if (!this.userHolder.isUserAuthorized()) {
            this.buttonText = HeaderConstants.signInButton;
        } else {
            this.buttonText = HeaderConstants.logoutButton;
        }
    }

    openLoginModalWindow() {
        this.initInputData();
        this.loginModal.open();
    }

    // Modal window subfunctions
    initInputData() {
        this.localStorageProvider.initSignInModalInputData(this.loginData);
        this.showErrorMessage = false;
    }

    openEmailVerifModalWindow() {
        this.loginModal.close();
        this.emailVerifModal.open();
    }

    showEmptyInputErrorMessage() {
        this.errorMessage = "Please, fill the inputs";
        this.showErrorMessage = true;
    }

    sendPasswordRestoreRequest() {
        if (this.restoreEmail.length > 0) {
            this.loginService.createEmailPasswordRestoreRequest(this.restoreEmail)
                .subscribe(
                    (data: string) => console.log(data),
                    error => console.log(error),
                    () => this.openRestorePasswordModal()
                );
        }
    }

    openRestorePasswordModal() {
        this.restorePasswordModal.open();
        this.emailVerifModal.close();
    }

    restorePassword(code, newPassword, repeatPassword) {
        if (newPassword == repeatPassword) {
            this.loginService.createResetPasswordRequest(newPassword, code)
                .subscribe(
                    (data: string) => this.restorePasswordErrorMessage(data),
                    error => console.log(error),
                    () => this.returnToSignInModal()
                );
        }
    }

    restorePasswordErrorMessage(message: string) {
        if (message == "Invalid code") {
            this.errorMessage = message;
            this.showErrorMessage = true;
        }
    }

    returnToSignInModal() {
        this.restorePasswordModal.close();
        this.openLoginModalWindow();
    }

}

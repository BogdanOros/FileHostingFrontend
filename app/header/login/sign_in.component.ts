/**
 * Created by talizorah on 16.10.12.
 */

import { Component, ViewChild, Input} from '@angular/core';
import { HeaderConstants } from '../header.constants';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { LoginProviderService } from './login-services/loginService';
import { UserHolderService } from '../../user/UserHolderService';
import { User } from '../../user/User';

@Component({
    selector : 'sign-in',
    templateUrl : '/app/header/login/sign_in.component.html',
    styleUrls: ['app/header/login/sign_in.css']
})
export class SignInComponent {

    @Input()
    buttonText: string;

    username: string;
    password: string;
    rememberedMe: boolean;

    @ViewChild('loginModal')
    modal: ModalComponent;

    @ViewChild('restorePasswordModal')
    emailVerifModal: ModalComponent;

    restoreEmail: string;

    // Contants
    REMEMBER_ME_CHECK: string = 'dataRemembered';
    USERNAME: string = 'username';
    PASSWORD: string = 'password';

    constructor(private loginService: LoginProviderService,
                private userHolder: UserHolderService) {
        if (localStorage.getItem('token') != null) {
            let username = localStorage.getItem('username');
            let email = localStorage.getItem('email');
            let first_name = localStorage.getItem('first_name');
            let last_name = localStorage.getItem('last_name');
            let user = new User(username, email, first_name, last_name);
            this.userHolder.setCurrentUser(user);
        }

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
       this.loginService.createSignInRequest(this.username, this.password)
           .subscribe((user: User) => this.userHolder.setCurrentUser(user),
               error => console.log(error),
               () => this.authorizationFinished())
    }

    logoutFinished() {
        this.userHolder.clearAuthorizedUser();
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('first_name');
        localStorage.removeItem('last_name');
        this.changeButtonText();
    }

    authorizationFinished() {
        this.modal.close();
        localStorage.setItem('token', '8619c86a6189c2710b9862e4488e46ff148f0229');
        localStorage.setItem('username',  this.userHolder.getCurrentUser().username);
        localStorage.setItem('email',  this.userHolder.getCurrentUser().email);
        localStorage.setItem('first_name',  this.userHolder.getCurrentUser().first_name);
        localStorage.setItem('last_name',  this.userHolder.getCurrentUser().last_name);
        localStorage.setItem(this.PASSWORD, this.password);
        localStorage.setItem(this.REMEMBER_ME_CHECK, this.rememberedMe);
        this.changeButtonText();
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
        this.modal.open();
    }

    // Modal window subfunctions
    initInputData() {
        this.rememberedMe = localStorage.getItem(this.REMEMBER_ME_CHECK);
        if (!this.rememberedMe) {
            // Using two-way binding
            this.username = null;
            this.password = null;
        } else {
            this.username = localStorage.getItem(this.USERNAME);
            this.password = localStorage.getItem(this.PASSWORD);
        }
    }

    changeRememberField(element: HTMLInputElement) {
        this.rememberedMe = element.checked;
    }

    openEmailVerifModalWindow() {
        this.modal.close();
        this.emailVerifModal.open();
    }

}
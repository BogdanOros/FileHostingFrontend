/**
 * Created by talizorah on 16.10.12.
 */

import { Component, ViewChild, Input} from '@angular/core';
import { HeaderConstants } from '../header.constants';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { RegisterMetadata } from './RegisterMetadata';

import {RegisterProviderService} from './register-folder/registerService'

import {User} from './../../user/User'

@Component({
    selector : 'sign-up',
    templateUrl : '/app/header/register/sign_up.component.html',
    styleUrls: ['app/header/register/sign_up.css']
})
export class SignUpComponent {
    buttonText: string;

    @ViewChild('registerModal')
    modal: ModalComponent;

    data: RegisterMetadata;

    constructor(private registerProvider: RegisterProviderService) {
        this.data = new RegisterMetadata();
        this.buttonText = HeaderConstants.signUpButton;
    }
    openModal() {
        this.modal.open();
    }

    sendRegisterRequest() {
        this.registerProvider.createSignUpRequest(this.data).subscribe(
            (user: User) => console.log(user)
        );
        this.modal.close();
    }

}

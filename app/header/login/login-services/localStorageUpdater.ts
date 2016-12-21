/**
 * Created by talizorah on 16.21.12.
 */
import { Injectable } from '@angular/core'
import { User } from './../../../user/User'
import { LoginMeta } from './loginData'

@Injectable()
export class LocalStorageProvider {

    public static TOKEN: string = "token";
    public static USERNAME: string = "username";
    public static PASSWORD: string = "password";
    public static EMAIL: string = "email";
    public static FIRST_NAME: string = "first_name";
    public static LAST_NAME: string = "last_name";

    public static FIELDS_REMEMBERED: string = "fields_remembered";

    public static EMPTY: string = "";

    // Restore user functions

    public getUserIfExists(): User {
        if (this.usersTokenSaved()) {
            return this.restoreSavedUserFromStorage();
        }
    }

    private restoreSavedUserFromStorage(): User {
        let username = this.getFieldPropertyFromStorage(LocalStorageProvider.USERNAME);
        let email = this.getFieldPropertyFromStorage(LocalStorageProvider.EMAIL);
        let lastName = this.getFieldPropertyFromStorage(LocalStorageProvider.LAST_NAME);
        let firstName = this.getFieldPropertyFromStorage(LocalStorageProvider.FIRST_NAME);
        return new User(username, email, firstName, lastName);
    }

    private usersTokenSaved(): boolean {
        return this.getFieldPropertyFromStorage(LocalStorageProvider.TOKEN) != LocalStorageProvider.EMPTY;
    }

    // Remove user from localStorage
    public removeUsersDataFromLocalStorage(): void {
        if (this.usersTokenSaved()) {
            this.removeFieldPropertyFromStorage(LocalStorageProvider.TOKEN);
            this.removeFieldPropertyFromStorage(LocalStorageProvider.EMAIL);
            this.removeFieldPropertyFromStorage(LocalStorageProvider.LAST_NAME);
            this.removeFieldPropertyFromStorage(LocalStorageProvider.FIRST_NAME);
            this.removeFieldPropertyFromStorage(LocalStorageProvider.USERNAME);
        }
    }

    // Save user to localStorage
    public saveUsersDataToLocalStorage(user: User): void {
        this.setFieldPropertyToStorage(LocalStorageProvider.TOKEN, user.token);
        this.setFieldPropertyToStorage(LocalStorageProvider.USERNAME, user.username);
        this.setFieldPropertyToStorage(LocalStorageProvider.EMAIL, user.email);
        this.setFieldPropertyToStorage(LocalStorageProvider.LAST_NAME, user.last_name);
        this.setFieldPropertyToStorage(LocalStorageProvider.FIRST_NAME, user.first_name);
    }

    public saveUsersSignInMetadata(password:string, fieldsRemembered: boolean): void {
        this.setFieldPropertyToStorage(LocalStorageProvider.PASSWORD, password);
        let fieldsRememberedConvert: string = String(fieldsRemembered);
        this.setFieldPropertyToStorage(LocalStorageProvider.FIELDS_REMEMBERED, fieldsRememberedConvert);
    }

    public initSignInModalInputData(loginData: LoginMeta) {
        loginData.remembered = !!this.getFieldPropertyFromStorage(LocalStorageProvider.FIELDS_REMEMBERED);
        loginData.username = loginData.remembered ? this.getFieldPropertyFromStorage(LocalStorageProvider.USERNAME)
            : LocalStorageProvider.EMPTY;
        loginData.password = loginData.remembered ? this.getFieldPropertyFromStorage(LocalStorageProvider.PASSWORD)
            : LocalStorageProvider.EMPTY;
    }

    // Helper functions
    private setFieldPropertyToStorage(property:string, value:string): void  {
        localStorage.setItem(property, value);
    }

    private getFieldPropertyFromStorage(property: string): string {
        return localStorage.getItem(property) || LocalStorageProvider.EMPTY;
    }

    private removeFieldPropertyFromStorage(property: string): void {
        localStorage.removeItem(property);
    }

}
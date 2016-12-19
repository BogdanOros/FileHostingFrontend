/**
 * Created by talizorah on 16.17.12.
 */
import { Injectable } from '@angular/core';

import { User } from './User';

@Injectable()
export class UserHolderService {
    currentUser: User;

    lastQueryUsers: User[];

    saveLastQueryUsers(users: User[]) {
        this.lastQueryUsers = users;
    }

    getLastQueryUsers() {
        return this.lastQueryUsers;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    setCurrentUser(user) {
        this.currentUser = user;
    }

    isUserAuthorized() {
        return this.currentUser != null;
    }
    
    clearAuthorizedUser() {
        this.currentUser = null;
    }
    

}
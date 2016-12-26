/**
 * Created by talizorah on 16.19.12.
 */
import {Component, ViewChild} from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ActivatedRoute } from '@angular/router';

import { UserHolderService } from '../user/UserHolderService';
import { User } from '../user/User';
import { UserRequest } from '../user/UserRequest';
import { UserProviderService } from './UserProviderService';

@Component({
    selector: 'profile',
    templateUrl: '/app/profile/profile.component.html',
    styleUrls: ['app/profile/profile.css']
})
export class ProfileComponent {
    user: User;
    isLoaded: boolean;

    @ViewChild('changePasswordModal')
    modal: ModalComponent;
    ownUser: boolean = true;

    constructor(private userProvider: UserProviderService,
                private route: ActivatedRoute,
                private userHolder: UserHolderService) {
        this.isLoaded = false;
    }

    ngOnInit() {
        this.route.params
            .map(params => params['username'])
            .subscribe((username) => {
                this.userProvider
                    .getUser(username)
                    .subscribe(user => this.checkOwnUser(user), error => console.log(error), () => this.isLoaded = true);
            });
    }

    checkOwnUser(user) {
        this.user = user;
        this.ownUser = this.userHolder.getCurrentUser().username == user.username;
        this.userHolder.setCurrentUser(user);
    }

    showUserRequests() {
        return this.userHolder.isUserAuthorized() && this.user.hasOwnProperty('requests');
    }

    showCorrectDate(data) {
        return new Date(data);
    }

    acceptRequest(request) {
        this.userProvider.acceptRequest(request.id)
            .subscribe(() => this.removeFromRequest(request));
    }

    declineRequest(request) {
        this.userProvider.declineRequest(request.id)
            .subscribe(() => this.removeFromRequest(request));
    }

    removeFromRequest(request) {
        this.user.requests.splice(this.user.requests.indexOf(request, 0), 1);
    }

    openChangePasswordModal() {
        this.modal.open();
    }

    changePassword(first_pass: string, second_pass: string) {
        if (first_pass.length > 0 && first_pass == second_pass) {
            this.userProvider.createChangePasswordRequest(first_pass)
                .subscribe((data) => this.modal.close())
        }
    }

    deleteFromFriends(friend) {
        this.userProvider.createDeleteFromFriendsRequest(friend.id)
            .subscribe((data) => this.user.friends.splice(this.user.friends.indexOf(friend, 0), 1));
    }

}
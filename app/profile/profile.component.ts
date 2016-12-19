/**
 * Created by talizorah on 16.19.12.
 */
import {Component} from '@angular/core';

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
                    .subscribe(user => this.user = user, error => console.log(error), () => this.isLoaded = true);
            });
    }

    showUserRequests() {
        return this.user.hasOwnProperty('requests') && this.user.requests.lenght > 0;
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

}
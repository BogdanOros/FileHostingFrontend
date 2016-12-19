/**
 * Created by talizorah on 16.19.12.
 */

import {Component} from '@angular/core';
import { UserHolderService } from '../user/UserHolderService';
import { User } from '../user/User';
import { UserProviderService } from './../profile/UserProviderService';

@Component({
    selector: 'contacts',
    templateUrl: '/app/contacts/contacts.component.html',
    styleUrls: ['app/contacts/contacts.css']
})
export class ContactsComponent {
    users: User[];
    constructor(private userHolder: UserHolderService, private userProvider: UserProviderService){}

    searchForUser(query: string) {
        this.userProvider.searchForUsers(query)
            .subscribe((data: User[]) => this.dataLoaded(data));
    }

    ngOnInit() {
        this.users = this.userHolder.getLastQueryUsers();
    }

    dataLoaded(data: User[]) {
        this.users = data;
        for (let user of this.users) {
            switch (user.is_friend) {
                case 1:
                    user.imageUrl ='/app/contacts/resources/friend.png';
                    break;
                case 2:
                    user.imageUrl = '/app/contacts/resources/requested.png';
                    break;
                default:
                    user.imageUrl = '/app/contacts/resources/simple.png';
            }
            user.currentImageUrl = user.imageUrl;
        }
        this.userHolder.saveLastQueryUsers(this.users);
    }
    
    mouseEnteredUser(user: User) {
        if (user.is_friend == 0) {
            user.currentImageUrl = '/app/contacts/resources/add.png';
        }
    }
    mouseLeftUser(user: User) {
        user.currentImageUrl = user.imageUrl;
    }
    sendFriendshipRequest(user: User) {
        if (user.is_friend == 0) {
            this.userProvider.sendFriendshipRequst(user.username)
                .subscribe((data) => this.requestIsSent(user));
        }
    }

    requestIsSent(user) {
        user.imageUrl = '/app/contacts/resources/requested.png';
        user.currentImageUrl = user.imageUrl;
    }



}

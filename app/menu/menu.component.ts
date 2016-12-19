/**
 * Created by talizorah on 16.10.12.
 */
import {Component} from '@angular/core'

import { UserHolderService } from '../user/UserHolderService';
import { User } from '../user/User';

@Component({
    selector : 'menu-list',
    templateUrl: '/app/menu/menu.component.html',
    styleUrls: ['app/menu/menu.css']
})
export class MenuComponent {
    loggedUser: User;
    dataLoaded: boolean;
    constructor(private userHolder: UserHolderService) {}

    ngOnInit() {
        this.dataLoaded = false;
    }

    ngAfterViewInit() {
        setTimeout( _ => this.setupUser() );
    }

    setupUser() {
        this.loggedUser = this.userHolder.getCurrentUser();
        if (this.loggedUser != null) {
            this.dataLoaded = true;
        }
    }


}
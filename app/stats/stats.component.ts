/**
 * Created by talizorah on 16.26.12.
 */
import { Component } from '@angular/core'
import {UserHolderService} from "../user/UserHolderService";
import {UserProviderService} from "../profile/UserProviderService";

@Component({
    selector : 'stats',
    templateUrl : '/app/stats/stats.component.html',
    styleUrls: ['app/stats/stats.css']
})
export class StatsComponent {
    stats: any;
    dataLoaded: boolean = false;
    constructor(
        private userHolder: UserHolderService,
        private userProvider: UserProviderService,
        private statsProvider: UserProviderService
    ){}

    ngOnInit() {
        this.statsProvider.createStatsRequest()
            .subscribe((data) => this.enableStats(data), error => console.log(error));
    }

    enableStats(stats) {
        this.stats = stats;
        this.dataLoaded = true;
    }

    restoreDatabase() {
        this.userProvider.createRestoreDatabaseRequest()
            .subscribe((data) => console.log(data));
    }

}
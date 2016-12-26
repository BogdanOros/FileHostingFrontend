"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by talizorah on 16.26.12.
 */
var core_1 = require('@angular/core');
var UserHolderService_1 = require("../user/UserHolderService");
var UserProviderService_1 = require("../profile/UserProviderService");
var StatsComponent = (function () {
    function StatsComponent(userHolder, userProvider, statsProvider) {
        this.userHolder = userHolder;
        this.userProvider = userProvider;
        this.statsProvider = statsProvider;
        this.dataLoaded = false;
    }
    StatsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.statsProvider.createStatsRequest()
            .subscribe(function (data) { return _this.enableStats(data); }, function (error) { return console.log(error); });
    };
    StatsComponent.prototype.enableStats = function (stats) {
        this.stats = stats;
        this.dataLoaded = true;
    };
    StatsComponent.prototype.restoreDatabase = function () {
        this.userProvider.createRestoreDatabaseRequest()
            .subscribe(function (data) { return console.log(data); });
    };
    StatsComponent = __decorate([
        core_1.Component({
            selector: 'stats',
            templateUrl: '/app/stats/stats.component.html',
            styleUrls: ['app/stats/stats.css']
        }), 
        __metadata('design:paramtypes', [UserHolderService_1.UserHolderService, UserProviderService_1.UserProviderService, UserProviderService_1.UserProviderService])
    ], StatsComponent);
    return StatsComponent;
}());
exports.StatsComponent = StatsComponent;
//# sourceMappingURL=stats.component.js.map
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
 * Created by talizorah on 16.17.12.
 */
/**
 * Created by talizorah on 16.17.12.
 */
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var RegisterProviderService = (function () {
    function RegisterProviderService(http) {
        this.http = http;
        this.base_url = "http://192.168.2.117:8000";
        this.headers = new http_1.Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
        // this.headers.append('Authorization', 'Token 8619c86a6189c2710b9862e4488e46ff148f0229');
    }
    RegisterProviderService.prototype.createSignUpRequest = function (data) {
        var data1 = JSON.stringify({ email: data.email, password: data.password, first_name: data.firstname, last_name: data.secondname, username: data.username });
        return this.http.post(this.base_url + "/registration", data1, { headers: this.headers })
            .map(function (response) { return response.json(); });
    };
    RegisterProviderService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], RegisterProviderService);
    return RegisterProviderService;
}());
exports.RegisterProviderService = RegisterProviderService;
//# sourceMappingURL=registerService.js.map
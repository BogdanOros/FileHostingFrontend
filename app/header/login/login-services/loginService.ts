/**
 * Created by talizorah on 16.17.12.
 */
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { User } from '../../../user/User';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginProviderService {

    private base_url: string = "http://192.168.2.117:8000";
    private headers: Headers;

    constructor(private http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    public createSignInRequest(username: string, password: string): Observable<User> {
        let data = JSON.stringify({username: username, password: password});
        return this.http.post(this.base_url + "/authorization", data, {headers: this.headers})
            .map((response: Response) => <User>response.json());
    }

    public createLogoutRequest(): Observable<string> {
        // this.headers.append('Authorization', 'Token 8619c86a6189c2710b9862e4488e46ff148f0229');
        return this.http.get(this.base_url + "/logout", {headers: this.headers})
            .map((response:Response) => response.json())
    }


}

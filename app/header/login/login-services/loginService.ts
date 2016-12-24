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
        return this.http.get(this.base_url + "/logout", {headers: this.headers})
            .map((response:Response) => <string>response.json())
    }

    public createEmailPasswordRestoreRequest(email: string): Observable<string> {
        let toAdd = JSON.stringify({email: email});
        return this.http.post(this.base_url + "/forgot_password", toAdd)
            .map((response: Response) => <string>response.json());
    }

    public createResetPasswordRequest(password: string, code: string): Observable<string> {
        let toAdd = JSON.stringify({password: password, code: code});
        return this.http.post(this.base_url + "/reset_password", toAdd)
            .map((response: Response) => <string>response.json());
    }

}

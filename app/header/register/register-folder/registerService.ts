/**
 * Created by talizorah on 16.17.12.
 */
/**
 * Created by talizorah on 16.17.12.
 */
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { User } from '../../../user/User';
import { RegisterMetadata } from './../../register/RegisterMetadata';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RegisterProviderService {

    private base_url: string = "http://192.168.2.117:8000";
    private headers: Headers;

    constructor(private http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    public createSignUpRequest(data: RegisterMetadata): Observable<User> {
        let data1 = JSON.stringify({email: data.email, password: data.password, first_name: data.firstname, last_name: data.secondname, username: data.username});
        return this.http.post(this.base_url + "/registration", data1, {headers: this.headers})
            .map((response: Response) => <User>response.json());
    }
    
}

/**
 * Created by talizorah on 16.19.12.
 */
import { Injectable } from '@angular/core'
import { Http, Response, Headers } from '@angular/http';

import { UserHolderService } from '../user/UserHolderService';
import { User } from '../user/User';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {UserRequest} from "../user/UserRequest";

@Injectable()
export class UserProviderService {

    private base_url: string = "http://192.168.2.117:8000";
    private headers: Headers;

    constructor(private http: Http, private userService: UserHolderService) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'multipart/form-data');
        if (this.userService.isUserAuthorized()) {
            this.headers.append('Authorization', 'Token 8619c86a6189c2710b9862e4488e46ff148f0229');
            // this.headers.append('Authorization', 'Token 8619c86a6189c2710b9862e4488e46ff148f0229');
        }
    }

    public getUser(username: string): Observable<User> {
        return this.http.get(this.base_url + '/u/' + username, {headers: this.headers})
            .map((response:Response) => <User>response.json());
    }

    public searchForUsers(query: string): Observable<User[]> {
        let toAdd = JSON.stringify({query: query});
        return this.http.post(this.base_url + '/search_user', toAdd, {headers: this.headers})
            .map((response:Response) => <User[]>response.json());
    }

    public sendFriendshipRequst(username: string): Observable<number> {
        let toAdd = JSON.stringify({to_user: username});
        return this.http.post(this.base_url + '/send_request', toAdd, {headers: this.headers})
            .map((response:Response) => <number>response.json());
    }

    public acceptRequest(requestId: number): Observable<string> {
        let toAdd = JSON.stringify({request_id: requestId});
        return this.http.post(this.base_url + '/accept_request', toAdd, {headers: this.headers})
            .map((response:Response) => <string>response.json());

    }

    public declineRequest(requestId: number): Observable<string> {
        let toAdd = JSON.stringify({request_id: requestId});
        return this.http.post(this.base_url + '/decline_request', toAdd, {headers: this.headers})
            .map((response:Response) => <string>response.json());
    }

}
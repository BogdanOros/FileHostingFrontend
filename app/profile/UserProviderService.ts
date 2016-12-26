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
    }

    public getUser(username: string): Observable<User> {
        if (this.userService.isUserAuthorized()) {
            this.headers = new Headers();
            this.headers.append('Content-Type', 'multipart/form-data');
            this.headers.append('Authorization', 'Token ' + this.userService.getCurrentUser().token);
        }
        return this.http.get(this.base_url + '/u/' + username, {headers: this.headers})
            .map((response:Response) => <User>response.json());
    }

    public createReadPermissionRequest(isFolder: boolean, id: string, username: string): Observable<string> {
        return this.createPermissionRequest(isFolder, id, username, this.base_url + '/give_read_permission');
    }

    public createDenyPermissionRequest(isFolder: boolean, id: string, username: string): Observable<string> {
        return this.createPermissionRequest(isFolder, id, username, this.base_url + '/deny_read_permission');
    }


    public createPermissionRequest(isFolder: boolean, id: string, username: string, url: string): Observable<string> {
        let toAdd;
        if (isFolder) {
            toAdd = JSON.stringify({folder_id: id, username: username})
        } else {
            toAdd = JSON.stringify({file_id: id, username: username})
        }
        return this.http.post(url, toAdd, {headers: this.headers})
            .map((response:Response) => <string>response.json());
    }

    public searchForUsers(query: string): Observable<User[]> {
        if (this.userService.isUserAuthorized()) {
            this.headers = new Headers();
            this.headers.append('Content-Type', 'multipart/form-data');
            this.headers.append('Authorization', 'Token ' + this.userService.getCurrentUser().token);
        }
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

    public createStatsRequest(): Observable<string> {
        if (this.userService.isUserAuthorized()) {
            this.headers = new Headers();
            this.headers.append('Content-Type', 'multipart/form-data');
            this.headers.append('Authorization', 'Token ' + this.userService.getCurrentUser().token);
        }
        return this.http.get(this.base_url + '/statistics', {headers: this.headers})
            .map((response:Response) => <string>response.json());
    }

    public createChangePasswordRequest(password: string): Observable<string> {
        if (this.userService.isUserAuthorized()) {
            this.headers = new Headers();
            this.headers.append('Content-Type', 'multipart/form-data');
            this.headers.append('Authorization', 'Token ' + this.userService.getCurrentUser().token);
        }
        let toAdd = JSON.stringify({password: password});
        return this.http.post(this.base_url + '/change_password', toAdd, {headers: this.headers})
            .map((response:Response) => <string>response.json());
    }

    public createRestoreDatabaseRequest(): Observable<string> {
        if (this.userService.isUserAuthorized()) {
            this.headers = new Headers();
            this.headers.append('Content-Type', 'multipart/form-data');
            this.headers.append('Authorization', 'Token ' + this.userService.getCurrentUser().token);
        }
        return this.http.get(this.base_url + '/restore_db', {headers: this.headers})
            .map((response: Response) => <string>response.json());
    }

    public createDeleteFromFriendsRequest(id): Observable<string> {
        if (this.userService.isUserAuthorized()) {
            this.headers = new Headers();
            this.headers.append('Content-Type', 'multipart/form-data');
            this.headers.append('Authorization', 'Token ' + this.userService.getCurrentUser().token);
        }
        let toAdd = JSON.stringify({user_id: id});
        return this.http.post(this.base_url + '/delete_friend', toAdd, {headers: this.headers})
            .map((response: Response) => <string>response.json());
    }

}
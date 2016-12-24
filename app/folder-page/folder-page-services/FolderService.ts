/**
 * Created by talizorah on 16.17.12.
 */
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { UserHolderService } from '../../user/UserHolderService';
import { Folder } from './folder';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FoldersLoaderService {

    private base_url: string = "http://192.168.2.117:8000";
    private headers: Headers;

    constructor(private http: Http, private userService: UserHolderService) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    public getAll (username: string): Observable<Folder>  {
        if (this.userService.isUserAuthorized()) {
            this.headers = new Headers();
            this.headers.append('Content-Type', 'application/json');
            this.headers.append('Accept', 'application/json');
            this.headers.append('Authorization', 'Token ' + this.userService.getCurrentUser().token);
        }
        return this.http.get(this.base_url + '/' + username + '/home', {headers: this.headers})
            .map((response:Response) => <Folder>response.json());
    };

    public getAllInFolder(username: string, folder_id: string): Observable<Folder> {
        let toAdd = JSON.stringify({folder_id: folder_id});
        return this.http.post(this.base_url + '/' + username + '/home', toAdd, {headers: this.headers})
            .map((response:Response) => <Folder>response.json());
    };

    public addFolder(title: string, parentId: string): Observable<Folder> {
        let toAdd = JSON.stringify({title: title, parent_id: parentId});
        return this.http.post(this.base_url + "/create_folder", toAdd, {headers: this.headers})
            .map((response: Response) => <Folder>response.json());
    };

    public deleteFolder(folderId: string, parentId: string): Observable<number> {
        let toAdd = JSON.stringify({folder_id: folderId, parent_id: parentId});
        return this.http.post(this.base_url + "/delete_folder", toAdd, {headers: this.headers})
            .map((response: Response) => <number>response.json());
    }

    public deleteFile(file_id, parent_id): Observable<number> {
        let toAdd = JSON.stringify({file_id: file_id, parent_id: parent_id});
        return this.http.post(this.base_url + "/delete_file", toAdd, {headers: this.headers})
            .map((response: Response) => <number>response.json());
    }

    public updateFolder(folderId: string, parentId: string, title: string): Observable<number> {
        let toAdd = JSON.stringify({folder_id: folderId, parent_id: parentId, new_title: title});
        return this.http.post(this.base_url + "/update_folder", toAdd, {headers: this.headers})
            .map((response: Response) => <number>response.json());
    }

    public updateFile(file_id: string, parentId: string, title: string): Observable<number> {
        let toAdd = JSON.stringify({file_id: file_id, parent_id: parentId, new_filename: title});
        return this.http.post(this.base_url + "/update_file", toAdd, {headers: this.headers})
            .map((response: Response) => <number>response.json());
    }

    public searchRequest(query: string): Observable<Folder> {
        let toAdd = JSON.stringify({query: query});
        return this.http.post(this.base_url + "/search", toAdd, {headers: this.headers})
            .map((response: Response) => <Folder>response.json());
    }

}
/**
 * Created by talizorah on 16.18.12.
 */
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { File } from './../folder-page/folder-page-services/File'

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { UserHolderService } from '../user/UserHolderService';

@Injectable()
export class FileUploadProvider {

    private base_url: string = "http://192.168.2.117:8000";
    private headers: Headers;
    private headerSetted:boolean;
    constructor(private http: Http, private userService: UserHolderService) {
        this.headerSetted = false;
        this.headers = new Headers();
        this.headers.append('Content-Type', 'multipart/form-data');
        if (this.userService.isUserAuthorized()) {
            this.headers.append('Authorization', 'Token 8619c86a6189c2710b9862e4488e46ff148f0229');
            // this.headers.append('Authorization', 'Token  4972e5a9c23b3af59a362fdc63d5dc33b2d99084');
        }
    }

    downloadFileRequest(file_id): Observable<any> {
        let toAdd = JSON.stringify({file_id: file_id});
        return this.http.post(this.base_url + '/download_file', toAdd, {headers: this.headers})
            .map((response:Response) => response)

    }

    createUploadRequest(file, parent_id): Observable<any> {
        return Observable.create(observer => {
            let formData: FormData = new FormData(),
                xhr: XMLHttpRequest = new XMLHttpRequest();

            formData.append("uploads[]", file, file.name);
            formData.append("parent_id", parent_id);


            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 201) {
                        observer.next(JSON.parse(xhr.response));
                    } else {
                        observer.error(xhr.response);
                    }
                }
            };

            xhr.open('POST', this.base_url + '/upload_file', true);
            xhr.setRequestHeader("Authorization", 'Token  8619c86a6189c2710b9862e4488e46ff148f0229');
            xhr.send(formData);
        });
    }
}
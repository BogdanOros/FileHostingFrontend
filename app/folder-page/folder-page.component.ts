/**
 * Created by talizorah on 16.28.11.
 */
import {Component} from '@angular/core'
import {Folder} from './folder-page-services/folder'
import { File } from './folder-page-services/File'
import { FileHelperService } from './folder-page-services/FIleHelperService'

import { UserHolderService } from './../user/UserHolderService'

import {FoldersLoaderService} from './folder-page-services/FolderService'
import { ActiveFolderHolder } from './folder-page-services/ActiveFolderHolder'
import { FileUploadProvider } from './../control-panel/FileUploader'

import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'folder-page',
    templateUrl: '/app/folder-page/folder-page.component.html',
    styleUrls: ['app/folder-page/images.css'],
})
export class FolderPageComponent {
    folder: Folder;
    subfolders: Folder[];
    files: File[];
    websocket: any;
    isLoaded: boolean;
    activeObject: any;
    socket_path: string = 'ws://localhost:8080/websocket';

    constructor(private folderProvider: FoldersLoaderService,
                private fileUploader: FileUploadProvider,
                private fileHelperService: FileHelperService,
                private userService: UserHolderService,
                private route: ActivatedRoute,
                private folderHolder: ActiveFolderHolder) {
        this.isLoaded = false;
    }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
    openSocket() {
        this.websocket = new WebSocket(this.socket_path);
        this.websocket.onopen = function (evt) {
            console.log(evt);
        };
        this.websocket.onclose = function (evt) {
            console.log(evt);
        };
        this.websocket.onmessage = function (evt) {
            console.log(evt.data)
        };
        this.websocket.onerror = function (evt) {
            console.log(evt);
        };
    }
    ngOnInit() {
        // let parsedUserName = this.route.params.value['username'];
        // if (parsedUserName != null) {
        //     this.folderProvider.getAll(parsedUserName).
        //     subscribe(
        //         (data:Folder) => this.onFirstDownload(data),
        //         error => console.log(error),
        //         () => this.dataLoaded()
        //     );
        // }
         if (this.userService.isUserAuthorized()) {
            this.folderProvider.getAll(this.userService.getCurrentUser().username).
            subscribe(
                (data:Folder) => this.onFirstDownload(data),
                error => console.log(error),
                () => this.dataLoaded()
            );
        }
    }

    onFirstDownload(data) {
        this.folder = data;
        if (this.folder.is_main) {
            this.folderHolder.saveMainFolder(this.folder);
        }
    }

    dataLoaded() {
        console.log(this.folder.subfolders);
        this.folderHolder.saveParentFolder(this.folder);
        if (this.folder.is_main) {
            this.folderHolder.saveMainFolder(this.folder);
        }
        this.folderHolder.saveActiveFolder(this.folder);
        this.subfolders = this.folder.subfolders;
        this.files = this.folder.files;
        this.isLoaded = true;
    }

    appendFolder(folder) {
        this.folderProvider.addFolder(folder.title, this.folder._id.$oid)
            .subscribe((data:Folder) => this.subfolders.push(data));
    }

    // DELETE METHOD!
    deleteObject(object) {
        let isFile = this.isObjectFile(object);
        if (isFile) {
            this.folderProvider.deleteFile(object._id.$oid, this.folder._id.$oid)
                .subscribe((data: number) => this.files.splice(this.files.indexOf(object, 0), 1));
        } else {
            this.folderProvider.deleteFolder(object._id.$oid, this.folder._id.$oid)
                .subscribe((data: number) => this.subfolders.splice(this.subfolders.indexOf(object, 0), 1));
        }
        this.activeObject = null;
        this.folderHolder.saveActiveObject(this.activeObject);
    }

    // UPDATE METHOD!
    updateObject(newTitle: string) {
        let isFile = this.isObjectFile(this.activeObject);
        if (isFile) {
            this.folderProvider.updateFile(this.activeObject._id.$oid, this.folder._id.$oid, newTitle)
                .subscribe((data:number) => this.activeObject.filename = newTitle);
        } else {
            this.folderProvider.updateFolder(this.activeObject._id.$oid, this.folder._id.$oid, newTitle)
                .subscribe((data:number) => this.activeObject.title = newTitle);
        }
    }

    uploadFile(file) {
        let parentFolderId = this.folder._id.$oid;
        this.fileUploader.createUploadRequest(file, parentFolderId)
            .subscribe((data) =>  this.appendNewFile(data), error => console.log(error));
    }

    appendNewFile(data) {
        console.log(data);
        this.files.push(data);
    }

    openFolder(folder, isId) {
        let id;
        if (isId) {
            id = folder.parent_id;
        } else {
            id = folder._id.$oid;
        }
        this.folderProvider.getAllInFolder(this.userService.getCurrentUser().username, id).
        subscribe((data:Folder) => this.folder = data,
            error => console.log(error),
            () => this.dataLoaded());
        this.folderHolder.saveActiveFolder(this.folder);
    }

    returnToFolder(folder) {
        if (folder == null) {
            folder = this.folderHolder.getMainFolder()._id.$oid;
        }
        this.openFolder(folder, true);
    }

    downloadFile(file) {
        console.log(file._id.$oid);
        this.fileUploader.downloadFileRequest(file._id.$oid)
            .subscribe((data) => this.createFileFromBlob(data, file));
    }

    createFileFromBlob(blob, file) {
        let contentType = this.fileHelperService.getContentType(file.type);
        let blobed = this.base64toBlob(blob._body.substring(1, blob._body.length - 1), contentType);
        var blobUrl = URL.createObjectURL(blobed);
        console.log(blobUrl);
        let filename =  this.fileHelperService.getCorrectFileName(file);
        this.download(blobed, filename, contentType);
        // window.location = blobUrl;
    }

    base64toBlob(base64Data, contentType) {
        contentType = contentType || '';
        var sliceSize = 1024;
        var byteCharacters = window.atob(base64Data);
        var bytesLength = byteCharacters.length;
        var slicesCount = Math.ceil(bytesLength / sliceSize);
        var byteArrays = new Array(slicesCount);

        for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
            var begin = sliceIndex * sliceSize;
            var end = Math.min(begin + sliceSize, bytesLength);

            var bytes = new Array(end - begin);
            for (var offset = begin, i = 0 ; offset < end; ++i, ++offset) {
                bytes[i] = byteCharacters[offset].charCodeAt(0);
            }
            byteArrays[sliceIndex] = new Uint8Array(bytes);
        }
        return new Blob(byteArrays, { type: contentType });
    }

    download (content, filename, contentType) {
        if(!contentType) contentType = 'application/octet-stream';
        var a = document.createElement('a');
        var blob = new Blob([content], {'type':contentType});
        a.href = window.URL.createObjectURL(blob);
        a.download = filename;
        a.click();
    }

    setActiveObject(object: Folder) {
        if (this.activeObject == object) {
            this.activeObject = null;
        } else {
            this.activeObject = object;
        }
        this.folderHolder.saveActiveObject(this.activeObject);
    }

    isObjectFile(object) {
        return object.hasOwnProperty('filename');
    }

    searchRequest(query: string) {
        this.folderProvider.searchRequest(query)
            .subscribe((data:Folder) => this.folder = data, error => console.log(error), () => this.dataLoaded());
    }
}

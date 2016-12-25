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
 * Created by talizorah on 16.28.11.
 */
var core_1 = require('@angular/core');
var FIleHelperService_1 = require('./folder-page-services/FIleHelperService');
var UserHolderService_1 = require('./../user/UserHolderService');
var FolderService_1 = require('./folder-page-services/FolderService');
var ActiveFolderHolder_1 = require('./folder-page-services/ActiveFolderHolder');
var FileUploader_1 = require('./../control-panel/FileUploader');
var router_1 = require('@angular/router');
var FolderPageComponent = (function () {
    function FolderPageComponent(folderProvider, fileUploader, fileHelperService, userService, route, folderHolder) {
        this.folderProvider = folderProvider;
        this.fileUploader = fileUploader;
        this.fileHelperService = fileHelperService;
        this.userService = userService;
        this.route = route;
        this.folderHolder = folderHolder;
        this.socket_path = 'ws://localhost:8080/websocket';
        this.isLoaded = false;
    }
    FolderPageComponent.prototype.openSocket = function () {
        this.websocket = new WebSocket(this.socket_path);
        this.websocket.onopen = function (evt) {
            console.log(evt);
        };
        this.websocket.onclose = function (evt) {
            console.log(evt);
        };
        this.websocket.onmessage = function (evt) {
            console.log(evt.data);
        };
        this.websocket.onerror = function (evt) {
            console.log(evt);
        };
    };
    FolderPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        /*let parsedUserName = this.route.params.value['username'];
        if (parsedUserName != null) {
            this.folderProvider.getAll(parsedUserName).
            subscribe(
                (data:Folder) => this.onFirstDownload(data),
                error => console.log(error),
                () => this.dataLoaded()
            );
        }
        else */ if (this.userService.isUserAuthorized()) {
            this.folderProvider.getAll(this.userService.getCurrentUser().username).
                subscribe(function (data) { return _this.onFirstDownload(data); }, function (error) { return console.log(error); }, function () { return _this.dataLoaded(); });
        }
    };
    FolderPageComponent.prototype.onFirstDownload = function (data) {
        this.folder = data;
        if (this.folder.is_main) {
            this.folderHolder.saveMainFolder(this.folder);
        }
    };
    FolderPageComponent.prototype.dataLoaded = function () {
        console.log(this.folder.subfolders);
        this.folderHolder.saveParentFolder(this.folder);
        if (this.folder.is_main) {
            this.folderHolder.saveMainFolder(this.folder);
        }
        this.folderHolder.saveActiveFolder(this.folder);
        this.subfolders = this.folder.subfolders;
        this.files = this.folder.files;
        this.isLoaded = true;
    };
    FolderPageComponent.prototype.appendFolder = function (folder) {
        var _this = this;
        this.folderProvider.addFolder(folder.title, this.folder._id.$oid)
            .subscribe(function (data) { return _this.subfolders.push(data); });
    };
    // DELETE METHOD!
    FolderPageComponent.prototype.deleteObject = function (object) {
        var _this = this;
        var isFile = this.isObjectFile(object);
        if (isFile) {
            this.folderProvider.deleteFile(object._id.$oid, this.folder._id.$oid)
                .subscribe(function (data) { return _this.files.splice(_this.files.indexOf(object, 0), 1); });
        }
        else {
            this.folderProvider.deleteFolder(object._id.$oid, this.folder._id.$oid)
                .subscribe(function (data) { return _this.subfolders.splice(_this.subfolders.indexOf(object, 0), 1); });
        }
        this.activeObject = null;
        this.folderHolder.saveActiveObject(this.activeObject);
    };
    // UPDATE METHOD!
    FolderPageComponent.prototype.updateObject = function (newTitle) {
        var _this = this;
        var isFile = this.isObjectFile(this.activeObject);
        if (isFile) {
            this.folderProvider.updateFile(this.activeObject._id.$oid, this.folder._id.$oid, newTitle)
                .subscribe(function (data) { return _this.activeObject.filename = newTitle; });
        }
        else {
            this.folderProvider.updateFolder(this.activeObject._id.$oid, this.folder._id.$oid, newTitle)
                .subscribe(function (data) { return _this.activeObject.title = newTitle; });
        }
    };
    FolderPageComponent.prototype.uploadFile = function (file) {
        var _this = this;
        var parentFolderId = this.folder._id.$oid;
        this.fileUploader.createUploadRequest(file, parentFolderId)
            .subscribe(function (data) { return _this.appendNewFile(data); }, function (error) { return console.log(error); });
    };
    FolderPageComponent.prototype.appendNewFile = function (data) {
        console.log(data);
        this.files.push(data);
    };
    FolderPageComponent.prototype.openFolder = function (folder, isId) {
        var _this = this;
        var id;
        if (isId) {
            id = folder.parent_id;
        }
        else {
            id = folder._id.$oid;
        }
        this.folderProvider.getAllInFolder(this.userService.getCurrentUser().username, id).
            subscribe(function (data) { return _this.folder = data; }, function (error) { return console.log(error); }, function () { return _this.dataLoaded(); });
        this.folderHolder.saveActiveFolder(this.folder);
    };
    FolderPageComponent.prototype.returnToFolder = function (folder) {
        if (folder == null) {
            folder = this.folderHolder.getMainFolder()._id.$oid;
        }
        this.openFolder(folder, true);
    };
    FolderPageComponent.prototype.downloadFile = function (file) {
        var _this = this;
        console.log(file._id.$oid);
        this.fileUploader.downloadFileRequest(file._id.$oid)
            .subscribe(function (data) { return _this.createFileFromBlob(data, file); });
    };
    FolderPageComponent.prototype.createFileFromBlob = function (blob, file) {
        var contentType = this.fileHelperService.getContentType(file.type);
        var blobed = this.base64toBlob(blob._body.substring(1, blob._body.length - 1), contentType);
        var blobUrl = URL.createObjectURL(blobed);
        console.log(blobUrl);
        var filename = this.fileHelperService.getCorrectFileName(file);
        this.download(blobed, filename, contentType);
        // window.location = blobUrl;
    };
    FolderPageComponent.prototype.base64toBlob = function (base64Data, contentType) {
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
            for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
                bytes[i] = byteCharacters[offset].charCodeAt(0);
            }
            byteArrays[sliceIndex] = new Uint8Array(bytes);
        }
        return new Blob(byteArrays, { type: contentType });
    };
    FolderPageComponent.prototype.download = function (content, filename, contentType) {
        if (!contentType)
            contentType = 'application/octet-stream';
        var a = document.createElement('a');
        var blob = new Blob([content], { 'type': contentType });
        a.href = window.URL.createObjectURL(blob);
        a.download = filename;
        a.click();
    };
    FolderPageComponent.prototype.setActiveObject = function (object) {
        if (this.activeObject == object) {
            this.activeObject = null;
        }
        else {
            this.activeObject = object;
        }
        this.folderHolder.saveActiveObject(this.activeObject);
    };
    FolderPageComponent.prototype.isObjectFile = function (object) {
        return object.hasOwnProperty('filename');
    };
    FolderPageComponent.prototype.searchRequest = function (query) {
        var _this = this;
        this.folderProvider.searchRequest(query)
            .subscribe(function (data) { return _this.folder = data; }, function (error) { return console.log(error); }, function () { return _this.dataLoaded(); });
    };
    FolderPageComponent = __decorate([
        core_1.Component({
            selector: 'folder-page',
            templateUrl: '/app/folder-page/folder-page.component.html',
            styleUrls: ['app/folder-page/images.css'],
        }), 
        __metadata('design:paramtypes', [FolderService_1.FoldersLoaderService, FileUploader_1.FileUploadProvider, FIleHelperService_1.FileHelperService, UserHolderService_1.UserHolderService, router_1.ActivatedRoute, ActiveFolderHolder_1.ActiveFolderHolder])
    ], FolderPageComponent);
    return FolderPageComponent;
}());
exports.FolderPageComponent = FolderPageComponent;
//# sourceMappingURL=folder-page.component.js.map
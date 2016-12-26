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
 * Created by talizorah on 16.10.12.
 */
var core_1 = require('@angular/core');
var folder_1 = require('../folder-page/folder-page-services/folder');
var core_2 = require('@angular/core');
var ng2_bs3_modal_1 = require('ng2-bs3-modal/ng2-bs3-modal');
var ActiveFolderHolder_1 = require('./../folder-page/folder-page-services/ActiveFolderHolder');
var FileUploader_1 = require('./FileUploader');
var UserHolderService_1 = require('./../user/UserHolderService');
var UserProviderService_1 = require('./../profile/UserProviderService');
var router_1 = require('@angular/router');
var ControlPanelComponent = (function () {
    function ControlPanelComponent(folderHolder, userHolder, userProvider, route, fileUploader) {
        this.folderHolder = folderHolder;
        this.userHolder = userHolder;
        this.userProvider = userProvider;
        this.route = route;
        this.fileUploader = fileUploader;
        this.createRequest = new core_2.EventEmitter();
        this.deleteRequest = new core_2.EventEmitter();
        this.updateRequest = new core_2.EventEmitter();
        this.fileUploadRequest = new core_2.EventEmitter();
        this.returnRequest = new core_2.EventEmitter();
        this.searchRequest = new core_2.EventEmitter();
        this.ownFolders = true;
        this.folderImageUrl = "/app/folder-page/resource/folder.jpg";
    }
    ControlPanelComponent.prototype.ngOnInit = function () {
        var _this = this;
        var parsedUserName;
        this.route.params
            .map(function (param) { return (param['username']); })
            .subscribe(function (username) { return _this.ownFolders = username == null; });
    };
    ControlPanelComponent.prototype.openModal = function () {
        this.modal.open();
    };
    ControlPanelComponent.prototype.openUpdateModal = function () {
        this.updateModal.open();
    };
    ControlPanelComponent.prototype.createFolder = function (title) {
        var folder = new folder_1.Folder(title, this.folderImageUrl);
        this.createRequest.emit(folder);
        this.modal.close();
    };
    ControlPanelComponent.prototype.openShareModal = function () {
        var _this = this;
        var activeObject = this.folderHolder.getActiveObject();
        this.userProvider.getUser(this.userHolder.getCurrentUser().username)
            .subscribe(function (user) { return _this.saveFriendUserInfo(user); }, function (error) { return console.log(error); });
    };
    ControlPanelComponent.prototype.saveFriendUserInfo = function (user) {
        this.currentUser = user;
        this.shareModal.open();
    };
    ControlPanelComponent.prototype.giveReadPermissions = function (friend) {
        var isFolder = !this.isObjectFile(this.folderHolder.getActiveObject());
        this.userProvider.createReadPermissionRequest(isFolder, this.folderHolder.getActiveObject()._id.$oid, friend.username)
            .subscribe(function (res) { return console.log(res); });
    };
    ControlPanelComponent.prototype.denyReadPermissions = function (friend) {
        var isFolder = !this.isObjectFile(this.folderHolder.getActiveObject());
        this.userProvider.createDenyPermissionRequest(isFolder, this.folderHolder.getActiveObject()._id.$oid, friend.username)
            .subscribe(function (res) { return console.log(res); });
    };
    ControlPanelComponent.prototype.updateObject = function (title) {
        this.updateRequest.emit(title);
        this.updateModal.close();
    };
    ControlPanelComponent.prototype.deleteObject = function () {
        this.deleteRequest.emit(this.folderHolder.getActiveObject());
    };
    ControlPanelComponent.prototype.getActiveFolderName = function () {
        var activeObject = this.folderHolder.getActiveObject();
        if (activeObject != null) {
            if (activeObject.hasOwnProperty('title'))
                return activeObject.title;
            return activeObject.filename;
        }
    };
    ControlPanelComponent.prototype.isObjectSelected = function () {
        return this.folderHolder.getActiveObject() != null;
    };
    ControlPanelComponent.prototype.isFolderMain = function () {
        return this.folderHolder.getParentFolder().hasOwnProperty('parent_id') && this.folderHolder.getParentFolder().parent_id == null;
    };
    ControlPanelComponent.prototype.returnToPrevFolder = function () {
        var folder = this.folderHolder.getActiveFolder();
        if (this.isFolder(folder)) {
            this.returnRequest.emit(this.folderHolder.getActiveFolder());
        }
    };
    ControlPanelComponent.prototype.onChange = function (event) {
        var files = event.srcElement.files;
        this.fileUploadRequest.emit(files[0]);
    };
    ControlPanelComponent.prototype.isFolder = function (object) {
        return object.hasOwnProperty('title');
    };
    ControlPanelComponent.prototype.searchRequestPushed = function (query) {
        this.searchRequest.emit(query);
    };
    ControlPanelComponent.prototype.isObjectFile = function (object) {
        return object.hasOwnProperty('filename');
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ControlPanelComponent.prototype, "createRequest", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ControlPanelComponent.prototype, "deleteRequest", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ControlPanelComponent.prototype, "updateRequest", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ControlPanelComponent.prototype, "fileUploadRequest", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ControlPanelComponent.prototype, "returnRequest", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ControlPanelComponent.prototype, "searchRequest", void 0);
    __decorate([
        core_1.ViewChild('myModal'), 
        __metadata('design:type', ng2_bs3_modal_1.ModalComponent)
    ], ControlPanelComponent.prototype, "modal", void 0);
    __decorate([
        core_1.ViewChild('updateModal'), 
        __metadata('design:type', ng2_bs3_modal_1.ModalComponent)
    ], ControlPanelComponent.prototype, "updateModal", void 0);
    __decorate([
        core_1.ViewChild('shareModal'), 
        __metadata('design:type', ng2_bs3_modal_1.ModalComponent)
    ], ControlPanelComponent.prototype, "shareModal", void 0);
    ControlPanelComponent = __decorate([
        core_1.Component({
            selector: 'folder-control-panel',
            templateUrl: '/app/control-panel/control-panel.component.html',
            styleUrls: ['app/control-panel/control-panel.css']
        }), 
        __metadata('design:paramtypes', [ActiveFolderHolder_1.ActiveFolderHolder, UserHolderService_1.UserHolderService, UserProviderService_1.UserProviderService, router_1.ActivatedRoute, FileUploader_1.FileUploadProvider])
    ], ControlPanelComponent);
    return ControlPanelComponent;
}());
exports.ControlPanelComponent = ControlPanelComponent;
//# sourceMappingURL=control-panel.component.js.map
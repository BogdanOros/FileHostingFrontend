/**
 * Created by talizorah on 16.10.12.
 */
import { Component, Output, ViewChild} from '@angular/core';
import { Folder } from '../folder-page/folder-page-services/folder';
import { EventEmitter } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ActiveFolderHolder } from './../folder-page/folder-page-services/ActiveFolderHolder';
import { FileUploadProvider } from './FileUploader'
import {UserHolderService} from './../user/UserHolderService'
import { User } from './../user/User'
import { UserProviderService } from './../profile/UserProviderService'
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'folder-control-panel',
    templateUrl: '/app/control-panel/control-panel.component.html',
    styleUrls: ['app/control-panel/control-panel.css']
})
export class ControlPanelComponent {

    @Output() createRequest = new EventEmitter<Folder>();
    @Output() deleteRequest = new EventEmitter<Folder>();
    @Output() updateRequest = new EventEmitter<string>();
    @Output() fileUploadRequest = new EventEmitter<any>();
    @Output() returnRequest = new EventEmitter<Folder>();
    @Output() searchRequest = new EventEmitter<string>();
    folderImageUrl: string;
    @ViewChild('myModal')
    modal: ModalComponent;
    @ViewChild('updateModal')
    updateModal: ModalComponent;
    @ViewChild('shareModal')
    shareModal:ModalComponent;

    currentUser: User;

    ownFolders: boolean = true;

    constructor(private folderHolder: ActiveFolderHolder,
                private userHolder: UserHolderService,
                private userProvider: UserProviderService,
                private route: ActivatedRoute,
                private fileUploader: FileUploadProvider) {
        this.folderImageUrl = "/app/folder-page/resource/folder.jpg";
    }

    ngOnInit() {
        let parsedUserName;
        this.route.params
            .map((param) => (param['username']))
            .subscribe((username) => this.ownFolders = username == null);
    }

    openModal() {
        this.modal.open();
    }

    openUpdateModal() {
        this.updateModal.open();
    }
    
    createFolder(title: string) {
        let folder = new Folder(title, this.folderImageUrl);
        this.createRequest.emit(folder);
        this.modal.close();
    }

    openShareModal() {
        let activeObject = this.folderHolder.getActiveObject();
        this.userProvider.getUser(this.userHolder.getCurrentUser().username)
            .subscribe((user: User) => this.saveFriendUserInfo(user),
                        error => console.log(error));

    }

    saveFriendUserInfo(user: User) {
        this.currentUser = user;
        this.shareModal.open();
    }

    giveReadPermissions(friend) {
        let isFolder = !this.isObjectFile(this.folderHolder.getActiveObject());
        this.userProvider.createReadPermissionRequest(isFolder, this.folderHolder.getActiveObject()._id.$oid, friend.username)
            .subscribe((res: string) => console.log(res));
    }

    denyReadPermissions(friend) {
        let isFolder = !this.isObjectFile(this.folderHolder.getActiveObject());
        this.userProvider.createDenyPermissionRequest(isFolder, this.folderHolder.getActiveObject()._id.$oid, friend.username)
            .subscribe((res: string) => console.log(res));
    }

    updateObject(title: string) {
        this.updateRequest.emit(title);
        this.updateModal.close();
    }

    deleteObject() {
        this.deleteRequest.emit(this.folderHolder.getActiveObject());
    }

    getActiveFolderName() {
        let activeObject = this.folderHolder.getActiveObject();
        if (activeObject != null) {
            if (activeObject.hasOwnProperty('title'))
                return activeObject.title;
            return activeObject.filename;
        }
    }

    isObjectSelected() {
        return this.folderHolder.getActiveObject() != null;
    }

    isFolderMain() {
        return this.folderHolder.getParentFolder().hasOwnProperty('parent_id') && this.folderHolder.getParentFolder().parent_id == null;
    }

    returnToPrevFolder() {
        let folder = this.folderHolder.getActiveFolder();
        if (this.isFolder(folder)) {
            this.returnRequest.emit(this.folderHolder.getActiveFolder());
        }
    }

    onChange(event) {
        let files = event.srcElement.files;
        this.fileUploadRequest.emit(files[0]);
    }

    isFolder(object) {
        return object.hasOwnProperty('title');
    }

    searchRequestPushed(query) {
        this.searchRequest.emit(query);
    }

    isObjectFile(object) {
        return object.hasOwnProperty('filename');
    }

}
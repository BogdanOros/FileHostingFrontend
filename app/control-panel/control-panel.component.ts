/**
 * Created by talizorah on 16.10.12.
 */
import { Component, Output, ViewChild} from '@angular/core';
import { Folder } from '../folder-page/folder-page-services/folder';
import { EventEmitter } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ActiveFolderHolder } from './../folder-page/folder-page-services/ActiveFolderHolder';
import { FileUploadProvider } from './FileUploader'

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

    constructor(private folderHolder: ActiveFolderHolder, private fileUploader: FileUploadProvider) {
        this.folderImageUrl = "/app/folder-page/resource/folder.jpg";
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
        return this.folderHolder.getParentFolder().parent_id == null;
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

}
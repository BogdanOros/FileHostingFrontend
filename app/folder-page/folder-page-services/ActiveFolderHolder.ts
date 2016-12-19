/**
 * Created by talizorah on 16.18.12.
 */
import { Injectable } from '@angular/core';
import { Folder } from './folder';

@Injectable()
export class ActiveFolderHolder {
    activeFolder: Folder;
    parentFolder: Folder;
    prevParentFolder: Folder;
    allFolders: Folder[];

    activeObject: any;

    saveActiveObject(object) {
        this.activeObject = object;
    }

    getActiveObject() {
        return this.activeObject;
    }

    saveActiveFolder(folder) {
        this.activeFolder = folder;
    }

    getActiveFolder() {
        return this.activeFolder;
    }

    saveParentFolder(folder) {
        this.parentFolder = folder;
    }

    getParentFolder() {
        return this.parentFolder;
    }

    saveMainFolder(folder) {
        this.prevParentFolder = folder;
    }

    getMainFolder() {
        return this.prevParentFolder;
    }

    saveAllFolders(folders) {
        this.allFolders = folders;
    }

    getAllFolders() {
        return this.allFolders;
    }

}
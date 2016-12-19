/**
 * Created by talizorah on 16.28.11.
 */

import {Folder} from './folder'
import {Injectable} from '@angular/core'

@Injectable()
export class FolderMockService {
    array: Folder[] = [];
    folderImageUrl: string;
    constructor() {
        this.folderImageUrl = "/app/folder-page/resource/folder.jpg";
        this.array = []
    }

    getFoldersList(count: number) {
        if (Array.isArray(this.array)) {
            let i = 0;
            while (i < count) {
                this.array.push(new Folder(String(i++), this.folderImageUrl));
            }
            return this.array;
        }
    }
}
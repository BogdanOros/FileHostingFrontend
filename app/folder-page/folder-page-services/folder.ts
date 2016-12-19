/**
 * Created by talizorah on 16.28.11.
 */
import { SavedObject } from './SavedObject'
import { File } from './File'

export class Folder extends SavedObject {

    _id: any;
    title: string;
    subfolders: Folder[];
    files: File[];
    isFolder: boolean = true;
    is_main: boolean;
    parent_id: any;
    tumbnailUrl: string = "/app/folder-page/resource/folder.jpg";

    constructor(title: string, imageUrl: string) {
        super(false);
        this.title = title;
        this.tumbnailUrl = imageUrl;
    }

}
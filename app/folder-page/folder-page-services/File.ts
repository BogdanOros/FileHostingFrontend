/**
 * Created by talizorah on 16.18.12.
 */
import { SavedObject } from './SavedObject'

export class File extends SavedObject {
    _id: any;
    filename: string;
    type: string;
    isFolder:boolean = false;

    constructor() {
        super(true);
    }
}
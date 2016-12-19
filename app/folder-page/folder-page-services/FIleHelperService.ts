/**
 * Created by talizorah on 16.18.12.
 */
import {Injectable} from '@angular/core'

@Injectable()
export class FileHelperService {

    getContentType(type) {
        switch (type) {
            case 'png': return 'image/png';
            case 'jpg': return 'image/jpeg';
            default: return 'text/plain';
        }
    }

    getCorrectFileName(file) {
        return file.filename;
    }

}
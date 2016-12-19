/**
 * Created by talizorah on 16.31.10.
 */

import {Component} from '@angular/core'
import {HeaderConstants} from './header.constants'

@Component({
    selector: 'header',
    templateUrl: '/app/header/header.component.html',
    styleUrls: ['app/header/header.css']
})
export class HeaderComponent {
    title: string;
    constructor() {
        this.title = HeaderConstants.headerName;
    }
    
}
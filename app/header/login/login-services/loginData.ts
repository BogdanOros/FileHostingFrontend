/**
 * Created by talizorah on 16.21.12.
 */
    
export class LoginMeta {
    username: string;
    password: string;
    remembered: boolean;

    constructor() {
        this.remembered = false;
        this.username = '';
        this.password = '';
    }

}
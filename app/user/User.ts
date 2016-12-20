/**
 * Created by talizorah on 16.17.12.
 */
export class User {

    username: string;
    email: string;
    first_name: string;
    last_name: string;
    is_friend: number;
    requests: any;
    imageUrl: string;
    currentImageUrl: string;

    constructor(name: string, email: string, first: string, last: string) {
        this.username = name;
        this.email = email;
        this.first_name = first;
        this.last_name = last;
    }

}
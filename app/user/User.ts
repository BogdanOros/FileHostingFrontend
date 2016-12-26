/**
 * Created by talizorah on 16.17.12.
 */
export class User {

    token: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    is_friend: number;
    requests: any;
    friends: User[];
    is_superuser: boolean;
    imageUrl: string;
    currentImageUrl: string;

    constructor(token: string, name: string, email: string, first: string, last: string) {
        this.token = token;
        this.username = name;
        this.email = email;
        this.first_name = first;
        this.last_name = last;
    }

}
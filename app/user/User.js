"use strict";
/**
 * Created by talizorah on 16.17.12.
 */
var User = (function () {
    function User(token, name, email, first, last) {
        this.token = token;
        this.username = name;
        this.email = email;
        this.first_name = first;
        this.last_name = last;
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map
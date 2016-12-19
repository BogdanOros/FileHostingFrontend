/**
 * Created by talizorah on 16.9.12.
 */
"use strict";
var HeaderConstants = (function () {
    function HeaderConstants() {
    }
    Object.defineProperty(HeaderConstants, "headerName", {
        get: function () { return "File Hosting"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeaderConstants, "signInButton", {
        get: function () { return "Sign In"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeaderConstants, "signUpButton", {
        get: function () { return "Sign Up"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeaderConstants, "logoutButton", {
        get: function () { return "Logout "; },
        enumerable: true,
        configurable: true
    });
    return HeaderConstants;
}());
exports.HeaderConstants = HeaderConstants;
//# sourceMappingURL=header.constants.js.map
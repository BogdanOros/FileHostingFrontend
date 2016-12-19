"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by talizorah on 16.18.12.
 */
var SavedObject_1 = require('./SavedObject');
var File = (function (_super) {
    __extends(File, _super);
    function File() {
        _super.call(this, true);
        this.isFolder = false;
    }
    return File;
}(SavedObject_1.SavedObject));
exports.File = File;
//# sourceMappingURL=File.js.map
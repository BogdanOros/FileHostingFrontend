"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by talizorah on 16.28.11.
 */
var SavedObject_1 = require('./SavedObject');
var Folder = (function (_super) {
    __extends(Folder, _super);
    function Folder(title, imageUrl) {
        _super.call(this, false);
        this.isFolder = true;
        this.tumbnailUrl = "/app/folder-page/resource/folder.jpg";
        this.title = title;
        this.tumbnailUrl = imageUrl;
    }
    return Folder;
}(SavedObject_1.SavedObject));
exports.Folder = Folder;
//# sourceMappingURL=folder.js.map
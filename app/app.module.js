/**
 * Created by talizorah on 16.31.10.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var app_component_1 = require('./app.component');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
//modals
var ng2_bs3_modal_1 = require('ng2-bs3-modal/ng2-bs3-modal');
var header_component_1 = require("./header/header.component");
var folder_page_component_1 = require("./folder-page/folder-page.component");
var sign_in_component_1 = require("./header/login/sign_in.component");
var sign_up_component_1 = require("./header/register/sign_up.component");
var menu_component_1 = require("./menu/menu.component");
var control_panel_component_1 = require("./control-panel/control-panel.component");
var profile_component_1 = require("./profile/profile.component");
var stats_component_1 = require('./stats/stats.component');
var contacts_component_1 = require("./contacts/contacts.component");
var FolderMock_1 = require("./folder-page/folder-page-services/FolderMock");
var FolderService_1 = require("./folder-page/folder-page-services/FolderService");
var FIleHelperService_1 = require("./folder-page/folder-page-services/FIleHelperService");
var ActiveFolderHolder_1 = require("./folder-page/folder-page-services/ActiveFolderHolder");
var loginService_1 = require("./header/login/login-services/loginService");
var registerService_1 = require("./header/register/register-folder/registerService");
var UserHolderService_1 = require("./user/UserHolderService");
var UserProviderService_1 = require('./profile/UserProviderService');
var FileUploader_1 = require("./control-panel/FileUploader");
var localStorageUpdater_1 = require('./header/login/login-services/localStorageUpdater');
var header_constants_1 = require("./header/header.constants");
exports.AppRoutes = [
    { path: '', redirectTo: '/folders', pathMatch: 'full' },
    { path: 'profile', component: profile_component_1.ProfileComponent },
    { path: 'contacts', component: contacts_component_1.ContactsComponent },
    { path: 'contacts/profile/:username', component: profile_component_1.ProfileComponent },
    { path: 'profile/:username', component: profile_component_1.ProfileComponent },
    { path: 'stats', component: stats_component_1.StatsComponent },
    { path: 'folders', component: folder_page_component_1.FolderPageComponent },
    { path: 'folders/restart', redirectTo: '/folders', pathMatch: 'full' },
    { path: 'folders/:username', component: folder_page_component_1.FolderPageComponent },
    { path: 'profile/:current/folders/:username', redirectTo: '/folders/:username', pathMatch: 'full' }
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                router_1.RouterModule.forRoot(exports.AppRoutes),
                ng2_bs3_modal_1.Ng2Bs3ModalModule,
                forms_1.FormsModule
            ],
            declarations: [
                app_component_1.AppComponent,
                header_component_1.HeaderComponent,
                folder_page_component_1.FolderPageComponent,
                sign_in_component_1.SignInComponent,
                sign_up_component_1.SignUpComponent,
                control_panel_component_1.ControlPanelComponent,
                profile_component_1.ProfileComponent,
                contacts_component_1.ContactsComponent,
                stats_component_1.StatsComponent,
                menu_component_1.MenuComponent
            ],
            providers: [
                FolderMock_1.FolderMockService,
                FolderService_1.FoldersLoaderService,
                UserHolderService_1.UserHolderService,
                loginService_1.LoginProviderService,
                registerService_1.RegisterProviderService,
                ActiveFolderHolder_1.ActiveFolderHolder,
                FileUploader_1.FileUploadProvider,
                UserProviderService_1.UserProviderService,
                FIleHelperService_1.FileHelperService,
                localStorageUpdater_1.LocalStorageProvider,
                header_constants_1.HeaderConstants
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
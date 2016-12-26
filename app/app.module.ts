/**
 * Created by talizorah on 16.31.10.
 */

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
//modals
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { HeaderComponent } from "./header/header.component";
import { FolderPageComponent } from "./folder-page/folder-page.component";
import { SignInComponent } from "./header/login/sign_in.component";
import { SignUpComponent } from "./header/register/sign_up.component";
import { MenuComponent } from "./menu/menu.component";
import { ControlPanelComponent } from "./control-panel/control-panel.component";
import { ProfileComponent } from "./profile/profile.component";
import { StatsComponent } from './stats/stats.component';
import { ContactsComponent } from "./contacts/contacts.component";
import { FolderMockService } from "./folder-page/folder-page-services/FolderMock";
import { FoldersLoaderService } from "./folder-page/folder-page-services/FolderService";
import { FileHelperService } from "./folder-page/folder-page-services/FIleHelperService";
import { ActiveFolderHolder } from "./folder-page/folder-page-services/ActiveFolderHolder";
import { LoginProviderService } from "./header/login/login-services/loginService";
import { RegisterProviderService } from "./header/register/register-folder/registerService";
import { UserHolderService } from "./user/UserHolderService";
import { UserProviderService } from './profile/UserProviderService';
import { FileUploadProvider } from "./control-panel/FileUploader";

import { LocalStorageProvider } from './header/login/login-services/localStorageUpdater';

import { HeaderConstants } from "./header/header.constants";

import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
    { path: '', redirectTo: '/folders', pathMatch: 'full' },
    { path: 'profile', component: ProfileComponent },
    { path: 'contacts', component: ContactsComponent },
    { path: 'contacts/profile/:username', component: ProfileComponent },
    { path: 'profile/:username', component: ProfileComponent },
    { path: 'stats', component: StatsComponent },
    { path: 'folders', component: FolderPageComponent },
    { path: 'folders/restart', redirectTo: '/folders', pathMatch: 'full' },
    { path: 'folders/:username', component: FolderPageComponent },
    { path: 'profile/:current/folders/:username', redirectTo: '/folders/:username', pathMatch: 'full'}
];

@NgModule({
    imports:[
        BrowserModule,
        HttpModule,
        RouterModule.forRoot(AppRoutes),
        Ng2Bs3ModalModule,
        FormsModule
    ],
    declarations:[
        AppComponent,
        HeaderComponent,
        FolderPageComponent,
        SignInComponent,
        SignUpComponent,
        ControlPanelComponent,
        ProfileComponent,
        ContactsComponent,
        StatsComponent,
        MenuComponent
    ],
    providers:[
        FolderMockService,
        FoldersLoaderService,
        UserHolderService,
        LoginProviderService,
        RegisterProviderService,
        ActiveFolderHolder,
        FileUploadProvider,
        UserProviderService,
        FileHelperService,
        LocalStorageProvider,
        HeaderConstants
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // 动画模块

import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { RoutingModule } from './service/routing.module';
import { RouteChangedService, LoggedInService, ApiService } from './service';

import { LayoutComponent } from './views/layout/layout.component';
import { LoginComponent } from './views/login/login.component';
import { ReviewComponent, ArticleComponent, TypeinComponent, UploadComponent, ManageComponent } from './views';
import { RichTextEditorComponent } from './component/rich-text-editor/rich-text-editor.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        LayoutComponent,
        ReviewComponent,
        ArticleComponent,
        TypeinComponent,
        UploadComponent,
        ManageComponent,
        RichTextEditorComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        NgZorroAntdModule.forRoot(),
        FroalaEditorModule.forRoot(),
        FroalaViewModule.forRoot(),
        RoutingModule
    ],
    providers: [RouteChangedService, LoggedInService, ApiService],
    bootstrap: [AppComponent]
})
export class AppModule { }

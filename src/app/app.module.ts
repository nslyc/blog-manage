import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // 动画模块
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { RoutingModule } from './service/routing.module';
import { RouteChangedService, LoggedInService, ApiService, AuthInterceptor } from './service';

import { LayoutComponent } from './views/layout/layout.component';
import { LoginComponent } from './views/login/login.component';
import { ReviewComponent, ArticleComponent, TypeinComponent, UploadComponent, ManageComponent, ModifyArticleComponent, PreviewArticleComponent } from './views';
import { RichTextEditorComponent } from './component/rich-text-editor/rich-text-editor.component';

import { ImagePathPipe } from './service/image-path.pipe';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};
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
        RichTextEditorComponent,
        ImagePathPipe,
        ModifyArticleComponent,
        PreviewArticleComponent,
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
        PerfectScrollbarModule,
        RoutingModule
    ],
    providers: [
        RouteChangedService,
        LoggedInService, ApiService,
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        },
        [{
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        }],
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

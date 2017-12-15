import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // 动画模块

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { RoutingModule, RouteChangedService, LoggedInService, ApiService } from './service';

import { LayoutComponent } from './views/layout/layout.component';
import { LoginComponent } from './views/login/login.component';
import { ReviewComponent, ArticleComponent, TypeinComponent, UploadComponent } from './views';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        LayoutComponent,
        ReviewComponent,
        ArticleComponent,
        TypeinComponent,
        UploadComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        NgZorroAntdModule.forRoot(),
        RoutingModule
    ],
    providers: [RouteChangedService, LoggedInService, ApiService],
    bootstrap: [AppComponent]
})
export class AppModule { }

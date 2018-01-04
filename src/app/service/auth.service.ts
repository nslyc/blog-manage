import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let userData = localStorage.getItem('$UserData');
        if (!!userData) {
            const token = JSON.parse(userData)['token'];
            const authReq = req.clone({headers: req.headers.append('Authorization', token)});
            return next.handle(authReq);
        } else {
            return next.handle(req);
        }
    }
}

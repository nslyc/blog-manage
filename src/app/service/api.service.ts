import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

@Injectable()
export class ApiService {
    private api = 'http://172.20.10.166:3000/api';

    constructor(private http: HttpClient, ) { }
    // 检查是否登录
    checkOnline(): boolean {
        if (!!localStorage['$UserData']) {
            return true;
        }
        return false;
    }
    // 获取本地用户数据
    // 登录
    login(username, password) {
        let url = `${this.api}/login`;
        let body = { username: username, password: password }
        return this.http.post(url, body);
    }
    // 获取文章分类
    // 获取分类下的文章列表
    // 
}

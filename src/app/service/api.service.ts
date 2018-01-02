import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

@Injectable()
export class ApiService {
    private api = 'http://127.0.0.1:3000/api';

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
        let body = { username: username, password: password };
        return this.http.post(url, body);
    }
    // 注册
    regsiter(username, password, comment) {
        let url = `${this.api}/register`;
        let body;
        if (!!comment) {
            body = { username: username, password: password, comment: comment };
        } else {
            body = { username: username, password: password };
        }
        return this.http.post(url, body);
    }
    // 修改密码
    modifyPassword(id, password, newPassword) {
        let url = `${this.api}/modifyPassword/${id}`;
        let body = { password: password, newPassword: newPassword };
        return this.http.post(url, body);
    }
    // 获取用户列表
    getUserList() {
        let url = `${this.api}/userList`;
        return this.http.get(url);
    }
    // 获取文章列表
    getArticlesList() {
        let url = `${this.api}/articles`;
        return this.http.get(url);
    }
    // 获取分类下的文章列表
    getArticlesListByCategories(categoriesId) {
        let url = `${this.api}/articles/categories/${categoriesId}`;
        return this.http.get(url);
    }
    // 获取文章分类
    getArticlesCategories() {
        let url = `${this.api}/article/categories`;
        return this.http.get(url);
    }
    // 新增文章分类
    addArticlesCategories(name) {
        let url = `${this.api}/article/categories`;
        return this.http.post(url, { name: name });
    }
    // 修改文章分类
    modifyArticlesCategories(categoriesId, name) {
        let url = `${this.api}/article/categories/${categoriesId}`;
        return this.http.post(url, { name: name });
    }
    // 删除文章分类
    deleteArticlesCategories(categoriesId) {
        let url = `${this.api}/article/categories/${categoriesId}`;
        return this.http.delete(url);
    }
    // 新增文章
    addArticles(data) {
        let url = `${this.api}/articles`;
        let body = {
            title: data.title,
            type: data.type,
            author: data.author,
            description: data.description || '',
            content: data.content,
            categoriesId: data.categoriesId
        };
        return this.http.post(url, body);
    }
    // 删除文章
    deleteArticles(articlesId) {
        let url = `${this.api}/articles/${articlesId}`;
        return this.http.delete(url);
    }
    // 修改文章
    modifyArticles(articlesId, data) {
        let url = `${this.api}/articles/${articlesId}`;
        let body = {
            title: data.title,
            type: data.type,
            author: data.author,
            content: data.content,
            categoriesId: data.categoriesId
        };
        return this.http.post(url, body);
    }
    // 查找文章
    queryArticles(articlesId) {
        let url = `${this.api}/articles/${articlesId}`;
        return this.http.get(url);
    }
    // 图片上传
    uploadImg(file, description, categoriesId = 1) {
        const url = `${this.api}/upload/${categoriesId}`;
        const token = JSON.parse(localStorage.getItem('$UserData'))['token'];
        const headers = new HttpHeaders({ authorization: token, description: description || '' })
        const req = new HttpRequest('POST', url, file, {
            headers: headers,
            reportProgress: true,
        });
        return this.http.request(req);
    }
    // 获取图片分类
    queryImagesCategoriesList() {
        let url = `${this.api}/image/categories`;
        return this.http.get(url);
    }
    // 新增图片分类
    addImagesCategories(name) {
        let url = `${this.api}/image/categories`;
        return this.http.post(url, { name: name });
    }
    // 删除图片分类
    deleteImagesCategories(categoriesId) {
        let url = `${this.api}/image/categories/${categoriesId}`;
        return this.http.delete(url);
    }
    // 修改图片分类
    modiftyImagesCategories(categoriesId, name) {
        let url = `${this.api}/image/categories/${categoriesId}`;
        return this.http.post(url, { name: name });
    }
}

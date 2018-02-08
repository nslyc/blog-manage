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
    getUserList(offset = 0, size = 100) {
        let url = `${this.api}/userList`;
        const headers = new HttpHeaders({ offset: `${offset}`, size: `${size}` })
        return this.http.get(url, { headers: headers });
    }
    // 获取文章列表
    getArticlesList(offset = 0, size = 100) {
        let url = `${this.api}/articles`;
        const headers = new HttpHeaders({ offset: `${offset}`, size: `${size}` })
        return this.http.get(url, { headers: headers });
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
    // 获取指定id的文章分类
    queryArticlesCategoriesById(categoriesId) {
        let url = `${this.api}/article/categories/${categoriesId}`;
        return this.http.get(url);
    }
    // 新增文章
    addArticles(data) {
        let url = `${this.api}/articles`;
        let body = {
            title: data.title,
            type: data.type,
            author: data.author,
            description: data.description || '',
            cover: data.cover || '',
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
            cover: data.cover,
            author: data.author,
            content: data.content,
            description: data.description,
            categoriesId: data.categoriesId
        };
        return this.http.post(url, body);
    }
    // 查找文章
    queryArticles(articlesId) {
        let url = `${this.api}/articles/${articlesId}`;
        return this.http.get(url);
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
    // 图片上传
    uploadImg(file, description, categoriesId = 1) {
        const url = `${this.api}/upload/${categoriesId}`;
        const headers = new HttpHeaders({ description: description || '' })
        const req = new HttpRequest('POST', url, file, {
            headers: headers,
            reportProgress: true,
        });
        return this.http.request(req);
    }
    // 获取图片列表
    getImagesList(offset = 0, size = 100) {
        let url = `${this.api}/images`;
        const headers = new HttpHeaders({ offset: `${offset}`, size: `${size}` })
        return this.http.get(url, { headers: headers });
    }
    // 获取分类下的图片列表
    getImagesListByCategories(categoriesId, offset = 0, size = 100) {
        let url = `${this.api}/images/categories/${categoriesId}`;
        const headers = new HttpHeaders({ offset: `${offset}`, size: `${size}` })
        return this.http.get(url, { headers: headers });
    }
    // 修改图片分类和描述
    // 删除图片

    // 获取评论列表
    getReviewsList(offset = 0, size = 100) {
        let url = `${this.api}/reviews/list`;
        const headers = new HttpHeaders({ offset: `${offset}`, size: `${size}` })
        return this.http.post(url, {}, { headers: headers });
    }
    // 删除评论
    deleteReviews(reviewId) {
        let url = `${this.api}/reviews/${reviewId}`;
        return this.http.delete(url);
    }
    // 获取留言列表
    getLeavesList(offset = 0, size = 100) {
        let url = `${this.api}/leaves/list`;
        const headers = new HttpHeaders({ offset: `${offset}`, size: `${size}` })
        return this.http.post(url, {}, { headers: headers });
    }
    // 删除留言
    deleteLeaves(reviewId) {
        let url = `${this.api}/leaves/${reviewId}`;
        return this.http.delete(url);
    }
}

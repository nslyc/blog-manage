import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';

import { NzNotificationService } from 'ng-zorro-antd';
import { ApiService, LoggedInService } from '../../service';
import 'rxjs';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
    tabs: any = [{ name: '全部' }];
    data: any = [];

    articleCategoriesData: any = [];
    editRow = null;
    tempEditObject: any = {};
    isVisible = false;
    validateForm: FormGroup;
    currentCategoriesId: number = undefined;

    constructor(private fb: FormBuilder,
        private _notification: NzNotificationService,
        private api: ApiService,
        private loggedIn: LoggedInService,
        private router: Router,
    ) { }
    handleOk = (e) => {
        this._submitForm();
    }

    handleCancel = (e) => {
        this.isVisible = false;
    }
    // 获取文章分类列表
    queryArticleCategoriesList() {
        this.api.getArticlesCategories().subscribe(res => {
            this.articleCategoriesData = res['list'];
        }, err => {
            this._notification.create('error', '提示', '数据拉取失败！');
        })
    }
    // 编辑
    edit(i, data) {
        this.tempEditObject[i] = { ...data };
        this.editRow = i;
    }
    // 保存文章分类修改
    save(i, data) {
        Object.assign(data, this.tempEditObject[i]);
        this.editRow = null;
        this.api.modifyArticlesCategories(data.id, this.tempEditObject[i].name).subscribe(res => {
            this._notification.create('success', '提示', '保存成功！');
            this._init();
        }, err => {
            this._notification.create('error', '提示', '保存失败！');
            if(err.status === 401) {
                this.loggedIn.userPast();
            }
        })
    }
    // 取消编辑
    cancel(i, data) {
        this.tempEditObject[i] = {};
        this.editRow = null;
    }
    // 删除分类
    deleteCategories(i, data) {
        this.editRow = null;
        this.api.deleteArticlesCategories(data.id).subscribe(res => {
            this._notification.create('success', '提示', '删除成功！');
            this._init();
        }, err => {
            this._notification.create('error', '提示', '删除失败！');
            if(err.status === 401) {
                this.loggedIn.userPast();
            }
        })
    }
    // 新增分类
    addCategories() {
        this.isVisible = true;
    }
    // 修改文章
    modifyArticles(id) {
        this.router.navigate([`/modify/${id}`]);
    }
    previewArticles(id) {
        this.router.navigate([`/preview/${id}`]);
    }
    // 删除文章
    deleteArticles(data) {
        this.api.deleteArticles(data['id']).subscribe(res => {
            this._notification.create('success', '提示', '删除成功！');
            this.clickArticleCategories(this.currentCategoriesId);
        }, err => {
            this._notification.create('error', '提示', '删除失败！');
            if(err.status === 401) {
                this.loggedIn.userPast();
            }
        })
    }
    // 点击tab列表
    clickArticleCategories(id) {
        this.currentCategoriesId = id || undefined;
        if (!!id) {
            this.api.getArticlesListByCategories(id).subscribe(res => {
                this.data = res['list'];
            }, err => {
                this._notification.create('error', '提示', '数据拉取失败！');
            });
        } else {
            this.api.getArticlesList().subscribe(res => {
                this.data = res['list'];
            }, err => {
                this._notification.create('error', '提示', '数据拉取失败！');
            });
        }
    }
    _submitForm() {
        for (const i in this.validateForm.controls) {
            if (this.validateForm.controls[i].status == 'INVALID') {
                for (const j in this.validateForm.controls) {
                    this.validateForm.controls[j].markAsDirty();
                }
                return;
            }
        }
        this.isVisible = false;
        this.api.addArticlesCategories(this.validateForm.value.name).subscribe(res => {
            this._notification.create('success', '提示', '新增分类成功！');
            this._init();
        }, err => {
            this._notification.create('error', '提示', '新增分类失败！');
            if(err.status === 401) {
                this.loggedIn.userPast();
            }
        });
    }
    _init() {
        this.api.getArticlesCategories().mergeMap(res => {
            this.tabs = [{ name: '全部' }];
            this.tabs.push(...res['list']);
            return this.api.getArticlesList()
        }).subscribe(res => {
            this.data = res['list'];
        }, err => {
            this._notification.create('error', '提示', '数据拉取失败！');
        });
        this.validateForm = this.fb.group({
            name: [null, [Validators.required]]
        });
        this.queryArticleCategoriesList();
        this.articleCategoriesData.forEach(item => {
            this.tempEditObject[item.key] = {};
        })
    }
    ngOnInit() {
        this._init();
    }
}

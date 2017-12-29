import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../service';
import { NzNotificationService } from 'ng-zorro-antd';
@Component({
    selector: 'app-typein',
    templateUrl: './typein.component.html',
    styleUrls: ['./typein.component.scss']
})
export class TypeinComponent implements OnInit {
    articleCategoriesData: any = [];
    selectedCategories: any;
    articleContent: string;
    validateForm: FormGroup;

    constructor(private fb: FormBuilder,
        private _notification: NzNotificationService,
        private api: ApiService,
        private router: Router ) {
    }
    resetForm() {
        this.validateForm.reset();
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsPristine();
        }
    }
    getFormControl(name) {
        return this.validateForm.controls[name];
    }
    froalaContent(e) {
        console.log(e);
        this.articleContent = e;
        console.log(this.articleContent)
    }
    // 获取文章分类列表
    queryArticleCategoriesList() {
        this.api.getArticlesCategories().subscribe(res => {
            this.articleCategoriesData = res['list'];
            this.selectedCategories = this.articleCategoriesData[0];
        }, err => {
            this._notification.create('error', '提示', '数据拉取失败！');
        })
    }
    // 新增文章
    addAtricles() {
        for (const i in this.validateForm.controls) {
            if (this.validateForm.controls[i].status == 'INVALID') {
                for (const j in this.validateForm.controls) {
                    this.validateForm.controls[j].markAsDirty();
                }
                return;
            }
        }
        if (!this.articleContent) {
            this._notification.create('error', '提示', '请输入文章内容');
            return;
        }
        this.api.addArticles({
            title: this.validateForm.value.title,
            author: this.validateForm.value.author,
            description: this.validateForm.value.description,
            content: this.articleContent,
            categoriesId: this.validateForm.value.articleCategories.id
        }).subscribe(res => {
            this._notification.create('success', '提示', '恭喜您，文章录入成功！');
            this.resetForm();
            this.router.navigate(['/article']);
        }, err => {
            this._notification.create('error', '提示', '文章录入失败！');
        })
    }
    _init() {
        this.validateForm = this.fb.group({
            title: ['', [Validators.required]],
            author: ['', [Validators.required]],
            articleCategories: ['', [Validators.required]],
            description: ['']
        });
        this.queryArticleCategoriesList();
    }
    ngOnInit() {
        this._init()
    }

}

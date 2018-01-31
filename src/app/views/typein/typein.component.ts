import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService, LoggedInService } from '../../service';
import { NzNotificationService } from 'ng-zorro-antd';
@Component({
    selector: 'app-typein',
    templateUrl: './typein.component.html',
    styleUrls: ['./typein.component.scss']
})
export class TypeinComponent implements OnInit {
    articleCategoriesData: any = [];
    selectedCategories: any = [];
    articleContent: string;

    imagesCategories: any = [];
    imagesCategoriesData: any = [];
    validateForm: FormGroup;
    isVisible = false;
    imagesList: any = [];
    selectedPath: string;
    addCoverText: string = '添加封面';

    constructor(private fb: FormBuilder,
        private _notification: NzNotificationService,
        private api: ApiService,
        private loggedIn: LoggedInService,
        private router: Router) {
    }
    handleOk = (e) => {
        this.isVisible = false;
        this.addCoverText = '封面已添加';
        console.log(this.selectedPath);
    }

    handleCancel = (e) => {
        this.isVisible = false;
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
        this.articleContent = e;
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
    // 添加封面
    addCover() {
        this.isVisible = true;
        this.api.queryImagesCategoriesList().mergeMap(res => {
            this.imagesCategoriesData = res['list'];
            this.imagesCategories = this.imagesCategoriesData[0];
            return this.api.getImagesListByCategories(res['list'][0]['id'])
        }).subscribe(res => {
            this.imagesList = res['list'];
        })
    }
    // 选择封面
    selectedCover(path) {
        this.selectedPath = path;
    }
    // 获取图片列表
    getImagesList() {
        this.api.getImagesListByCategories(this.imagesCategories['id'])
        .subscribe(res => {
            this.imagesList = res['list'];
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
            this.loggedIn.userPast();
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

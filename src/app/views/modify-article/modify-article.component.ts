import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService, LoggedInService } from '../../service';
import { NzNotificationService } from 'ng-zorro-antd';
@Component({
    selector: 'app-modify-article',
    templateUrl: './modify-article.component.html',
    styleUrls: ['./modify-article.component.scss']
})
export class ModifyArticleComponent implements OnInit {
    article: any = {};
    articleCategoriesData: any = [];
    selectedCategories: any = [];
    articleContent: string;

    imagesCategories: any = [];
    imagesCategoriesData: any = [];
    validateForm: FormGroup;
    isVisible = false;
    imagesList: any = [];
    coverPath: string = '';
    addCoverText: string = '修改封面';

    constructor(private fb: FormBuilder,
        private _notification: NzNotificationService,
        private api: ApiService,
        private loggedIn: LoggedInService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {
    }
    handleOk = (e) => {
        this.isVisible = false;
        this.addCoverText = '封面已添加';
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
    // 获取修改文章信息及分类信息
    queryArticle(id) {
        this.api.queryArticles(id).mergeMap(res => {
            this.article = res[0];
            return this.api.getArticlesCategories()
        }).subscribe(res => {
            this.articleCategoriesData = res['list'];
            this.articleCategoriesData.forEach(ele => {
                if (this.article['categories_id'] === ele['id']) {
                    this.selectedCategories = ele;
                    return;
                }
                console.log(this.article)
            });
            console.log(res)
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
        }, err => {
            this._notification.create('error', '提示', '数据拉取失败！');
        })
    }
    // 选择封面
    selectedCover(path) {
        this.coverPath = path;
    }
    // 获取图片列表
    getImagesList() {
        this.api.getImagesListByCategories(this.imagesCategories['id'])
            .subscribe(res => {
                this.imagesList = res['list'];
            },
            err => {
                this._notification.create('error', '提示', '数据拉取失败！');
            })
    }
    // 修改文章
    modifyAtricles() {
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
        this.api.modifyArticles(this.article['id'], {
            title: this.validateForm.value.title,
            author: this.validateForm.value.author,
            description: this.validateForm.value.description,
            cover: this.coverPath,
            content: this.articleContent,
            categoriesId: this.validateForm.value.articleCategories.id
        }).subscribe(res => {
            this._notification.create('success', '提示', '恭喜您，文章修改成功！');
            this.resetForm();
            this.router.navigate(['/article']);
        }, err => {
            this._notification.create('error', '提示', '文章修改失败！');
            if(err.status === 401) {
                this.loggedIn.userPast();
            }
        })
    }
    _init() {
        this.validateForm = this.fb.group({
            title: ['', [Validators.required]],
            author: ['', [Validators.required]],
            articleCategories: ['', [Validators.required]],
            description: ['']
        });
    }
    ngOnInit() {
        this.activatedRoute.params.subscribe((params) => {
            this.queryArticle(params['articleId']);
            this._init()
        });
    }

}

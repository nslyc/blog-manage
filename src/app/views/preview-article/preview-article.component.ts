import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
    selector: 'app-preview-article',
    templateUrl: './preview-article.component.html',
    styleUrls: ['./preview-article.component.scss']
})
export class PreviewArticleComponent implements OnInit {
    article: any = {};
    articleCategory: any = {};
    reviewLength: number = 0;
    @ViewChild('content') content: ElementRef;
    constructor(private elementRef: ElementRef,
        private _notification: NzNotificationService,
        private api: ApiService,
        private activatedRoute: ActivatedRoute, ) { }
    // 获取修改文章信息及分类信息
    queryArticle(id) {
        this.api.queryArticles(id).mergeMap(res => {
            this.article = res[0];
            this.content.nativeElement.innerHTML = this.article['content'];
            return this.api.queryArticlesCategoriesById(this.article['categories_id']);
        }).subscribe(res => {
            this.articleCategory = res[0];
        }, err => {
            this._notification.create('error', '提示', '数据拉取失败！');
        })
    }
    ngOnInit() {
        this.activatedRoute.params.subscribe((params) => {
            this.queryArticle(params['articleId']);
        });
    }
    ngAfterViewInit() {
    }

}

import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { ApiService } from '../../service';
import 'rxjs';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
    tabs: any = [];
    data: any = [];
    constructor(private _notification: NzNotificationService,
        private api: ApiService) { }
    getArticlesList() {
        this.api.getArticlesList().subscribe(res => {

        }, err => {

        })
    }
    // 点击tab列表
    clickArticleCategories(id) {
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
    _init() {
        this.api.getArticlesCategories().mergeMap(res => {
            this.tabs = [{ name: '全部分类' }, ...res['list']];
            return this.api.getArticlesList()
        }).subscribe(res => {
            this.data = res['list'];
        }, err => {
            this._notification.create('error', '提示', '数据拉取失败！');
        });
    }
    ngOnInit() {
        this._init();
    }
}

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
    tabs = [
        {
            title: '全部文章'
        },
        {
            title: '分类1'
        },
        {
            title: '分类2'
        }
    ];
    constructor() { }

    getArticles(title) {
        console.log(title);
    }
    _init() {
        this.getArticles(this.tabs[0].title)
    }
    ngOnInit() {
        this._init();
    }
}

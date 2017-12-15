import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { RouteChangedService, LoggedInService, ApiService } from '../../service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    isLoggedIn: boolean;

    navData = [
        {
            title: '评论管理',
            path: 'review'
        },
        {
            title: '文章管理',
            path: 'article'
        },
        {
            title: '文章录入',
            path: 'typein'
        },
        {
            title: '上传图片',
            path: 'upload'
        }
    ]
    curUrl;
    constructor(private confirmServ: NzModalService,
        private routeChanged: RouteChangedService,
        private loggedIn: LoggedInService,
        private api: ApiService) {
        routeChanged.routeChange().subscribe((value) => {
            this.curUrl = value['url'].slice(1);
        })
        this.loggedIn.status$.subscribe(res => {
            this.isLoggedIn = res;
        })
    }
    showConfirm = () => {
        let self = this;
        this.confirmServ.confirm({
            title: '确定退出？',
            iconType: 'question-circle-o',
            onOk() {
                self.isLoggedIn = false;
                self.loggedIn.announceLoggedIn(false);
                localStorage.clear()
            },
            onCancel() {
            }
        });
    }
    ngOnInit() {
        this.isLoggedIn = this.api.checkOnline();
    }

}

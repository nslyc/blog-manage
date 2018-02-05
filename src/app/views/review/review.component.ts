import { Component, OnInit } from '@angular/core';
import { ApiService, LoggedInService } from '../../service';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';

@Component({
    selector: 'app-review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
    reviews: any = [];
    offset: number = 0;
    moreReviews: string = '查看更多 >>';
    isVisible: boolean = false;
    currentReview: any = {};
    leavesList: any = [];

    constructor(private _notification: NzNotificationService,
        private confirmServ: NzModalService,
        private api: ApiService,
        private loggedIn: LoggedInService, ) { }

    handleOk = (e) => {
        this.isVisible = false;
    }

    handleCancel = (e) => {
        this.isVisible = false;
    }
    // 获取评论列表
    getReviewsList(offset) {
        this.api.getReviewsList(offset, 10).subscribe(res => {
            if (res['list'].length !== 10) {
                this.moreReviews = '到底了';
            } else {
                this.moreReviews = '查看更多 >>';
                this.offset += 10;
            }
            this.reviews.push(...res['list']);
        }, err => {
            this._notification.create('error', '提示', '数据拉取失败！');
            this.loggedIn.userPast();
        })
    }
    // 获取更多评论
    getMoreReviews() {
        if (this.moreReviews === '到底了') {
            return;
        }
        this.getReviewsList(this.offset);
    }
    // 查看评论
    previewReviews(data) {
        this.isVisible = true;
        this.currentReview = { ...data };
        this.api.queryArticles(data['article_id']).subscribe(res => {
            this.currentReview['article'] = res[0]['title'];
        }, err => {
            this._notification.create('error', '提示', '数据拉取失败！');
            this.loggedIn.userPast();
        })
    }
    // 删除评论
    deleteReviews(id, index) {
        this.api.deleteArticles(id).subscribe(res => {
            this._notification.create('success', '提示', '删除成功！');
            this.reviews.splice(index, 1);
        }, err => {
            this._notification.create('error', '提示', '删除失败！');
            this.loggedIn.userPast();
        })
    }
    // 获取留言列表
    getLeavesList() {
        this.api.getLeavesList().subscribe(res => {
            this.leavesList = res['list'];
        }, err => {
            this._notification.create('error', '提示', '数据拉取失败！');
            this.loggedIn.userPast();
        })
    }
    // 删除留言(对话框)
    deleteLeave(id,index) {
        console.log(id);
        let self = this;
        this.confirmServ.confirm({
            title: '您是否确认要删除图片吗？',
            okText: '删除',
            onOk() {
                self.api.deleteLeaves(id).subscribe(res => {
                    self._notification.create('success', '提示', '删除成功！');
                    self.leavesList.splice(index, 1);
                }, err => {
                    self._notification.create('error', '提示', '删除失败！');
                    self.loggedIn.userPast();
                })
            },
            onCancel() {
            }
        });
    }
    _init() {
        this.getReviewsList(0);
        this.getLeavesList();
    }
    ngOnInit() {
        this._init();
    }

}

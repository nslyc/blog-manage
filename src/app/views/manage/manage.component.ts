import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd';
import { ApiService } from '../../service';

@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
    data: any = [];
    validateForm: FormGroup;
    modifyForm: FormGroup;
    userData: any;
    // 重置表单
    resetForm($event?) {
        if ($event) {
            $event.preventDefault();
        }
        this.validateForm.reset();
        for (const key in this.validateForm.controls) {
            this.validateForm.controls[key].markAsPristine();
        }
    }
    // 修改密码表单重置
    resetModifyForm() {
        this.modifyForm.reset();
        for (const key in this.modifyForm.controls) {
            this.modifyForm.controls[key].markAsPristine();
        }
    }
    // 验证表单
    _submitForm() {
        for (const i in this.validateForm.controls) {
            if (this.validateForm.controls[i].status == 'INVALID') {
                for (const j in this.validateForm.controls) {
                    this.validateForm.controls[j].markAsDirty();
                }
                return;
            }
        }
        if (this.validateForm.value.passwordFirst !== this.validateForm.value.passwordSecond) {
            this._notification.create('error', '提示', '两次密码输入不一致！');
            return;
        }
        this.api.regsiter(this.validateForm.value.userName, this.validateForm.value.passwordFirst, this.validateForm.value.comment).subscribe(res => {
            this._notification.create('success', '恭喜您', '注册成功！');
            this.resetForm();
            this.getUserList();
        }, err => {
            this._notification.create('error', '提示', '注册失败！');
        })
    }
    _modifyForm() {
        for (const i in this.modifyForm.controls) {
            if (this.modifyForm.controls[i].status == 'INVALID') {
                for (const j in this.modifyForm.controls) {
                    this.modifyForm.controls[j].markAsDirty();
                }
                return;
            }
        }
        if (this.modifyForm.value.modifyPasswordFirst !== this.modifyForm.value.modifyPasswordSecond) {
            this._notification.create('error', '提示', '两次密码输入不一致！');
            return;
        };
        let id = JSON.parse(localStorage.getItem('$UserData')).id
        this.api.modifyPassword(id, this.modifyForm.value.modifyPasswordFirst).subscribe(res => {
            this._notification.create('success', '恭喜您', '密码修改成功！');
            this.resetModifyForm();
        }, err => {
            console.log(err)
            this._notification.create('error', '提示', '密码修改失败！');
        })
    }
    constructor(private fb: FormBuilder,
        private _notification: NzNotificationService,
        private api: ApiService) { }
    // 获取用户列表
    getUserList() {
        this.api.getUserList().subscribe(res => {
            this.data = res['list'];
        }, err => {
            this._notification.create('error', '提示', '数据拉取失败！');
        })
    }
    _init() {
        this.validateForm = this.fb.group({
            userName: [null, [Validators.required]],
            passwordFirst: [null, [Validators.required]],
            passwordSecond: [null, [Validators.required]],
            comment: [''],
        });
        this.modifyForm = this.fb.group({
            modifyPasswordFirst: [null, [Validators.required]],
            modifyPasswordSecond: [null, [Validators.required]],
        })
        this.getUserList();
        this.userData = JSON.parse(localStorage.getItem('$UserData')) || null;
    }
    ngOnInit() {
        this._init();
    }

}

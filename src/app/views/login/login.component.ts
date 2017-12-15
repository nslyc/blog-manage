import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd';
import { LoggedInService, ApiService } from '../../service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    isLoggedIn: boolean;

    validateForm: FormGroup;

    _submitForm() {
        for (const i in this.validateForm.controls) {
            if (this.validateForm.controls[i].status == 'INVALID') {
                for (const j in this.validateForm.controls) {
                    this.validateForm.controls[j].markAsDirty();
                }
                return;
            }
        }
        this.api.login(this.validateForm.value.username, this.validateForm.value.password).subscribe(res => {
            localStorage.setItem('$UserData', JSON.stringify(res));
            this.isLoggedIn = true;
            this.loggedIn.announceLoggedIn(true);
        }, err => {
            this._notification.create('error', '提示', '账号或密码错误！');
        })
    }

    constructor(private fb: FormBuilder,
        private _notification: NzNotificationService,
        private loggedIn: LoggedInService,
        private api: ApiService) {
        this.loggedIn.status$.subscribe(res => {
            this.isLoggedIn = res;
        })
    }

    ngOnInit() {
        this.validateForm = this.fb.group({
            username: [null, [Validators.required]],
            password: [null, [Validators.required]],
            remember: [true],
        });
        this.isLoggedIn = this.api.checkOnline();
    }

}

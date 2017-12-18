import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ApiService } from '../../service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
    imgName: string;
    uploadBarSize: number = 0;
    formData: FormData;
    constructor(
        private _notification: NzNotificationService,
        private api: ApiService, ) { }
    // 选择图片
    showImgName(e) {
        if (e.target.files[0]) {
            let file = e.target.files[0];
            let size = file.size / 1024 / 1024;
            if (size > 2) {
                this._notification.create('error', '提示', '选择图片体积过大，请重新选择！');
                return;
            };
            this.imgName = file.name
            this.formData = new FormData();
            this.formData.append('file', file);
        }
    }
    // 上传图片
    uploadImg(e) {
        if (!this.formData) {
            this._notification.create('error', '提示', '为选择图片，请选择后再上传！');
            return;
        }
        this.api.uploadImg(this.formData).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
                const percentDone = Math.round(100 * event.loaded / event.total);
                this.uploadBarSize = percentDone
                console.log(`上传进度 => ${percentDone}%`);
            } else if (event instanceof HttpResponse) {
                console.log('上传完成!');
                console.log(event);
                console.log(`http://127.0.0.1:3000/uploads/${event.body['fileData']['filename']}`)
            }
        });
    }
    ngOnInit() {
    }

}

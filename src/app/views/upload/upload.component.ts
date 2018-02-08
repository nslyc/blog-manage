import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApiService, LoggedInService } from '../../service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
    imgName: string;
    uploadBarSize: number = 0;
    imageDescription: string;
    imageCategoriesId: number = 1;
    formData: FormData;
    imageCategoriesData: any = [];
    imageCategories: any = [];

    editRow = null;
    tempEditObject: any = {};
    isVisible = false;
    validateForm: FormGroup;
    selectedCategories: any;

    imagesList: any = [];
    coverPath: string = '';

    constructor(private fb: FormBuilder,
        private _notification: NzNotificationService,
        private api: ApiService,
        private loggedIn: LoggedInService,
    ) { }

    handleOk = (e) => {
        this._submitForm();
    }

    handleCancel = (e) => {
        this.isVisible = false;
    }
    // 获取图片列表
    queryImagesList() {
        this.api.getImagesListByCategories(this.imageCategories['id']).subscribe(res => {
            this.imagesList = res['list'];
        },err=>{
            this._notification.create('error', '提示', '数据拉取失败');
        })
    }
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
    uploadImg() {
        if (!this.formData) {
            this._notification.create('error', '提示', '未选择图片，请选择后再上传！');
            return;
        }
        if (!this.selectedCategories) {
            this._notification.create('error', '提示', '请为图片选择分类！');
            return;
        }
        this.api.uploadImg(this.formData, this.imageDescription, this.selectedCategories.id).mergeMap(event => {
            if (event.type === HttpEventType.UploadProgress) {
                const percentDone = Math.round(100 * event.loaded / event.total);
                this.uploadBarSize = percentDone
                // console.log(`上传进度 => ${percentDone}%`);
            } else if (event instanceof HttpResponse) {
                // console.log('上传完成!');
                console.log(event);
                // console.log(`http://127.0.0.1:3000/uploads/${event.body['fileData']['filename']}`)
                this.formData = null;
            }
            return this.api.getImagesListByCategories(this.imageCategories['id']);
        }).subscribe(res => {
            this.imagesList = res['list'];
        }, err => {
            this._notification.create('error', '提示', '上传失败');
            if(err.status === 401) {
                this.loggedIn.userPast();
            }
        });
    }
    // 获取图片分类列表
    queryImageCategoriesList() {
        this.api.queryImagesCategoriesList().subscribe(res => {
            this.imageCategoriesData = res['list'];
            this.imageCategories = this.imageCategoriesData[0];
        }, err => {
            this._notification.create('error', '提示', '数据拉取失败！');
        })
    }
    // 编辑
    edit(i, data) {
        this.tempEditObject[i] = { ...data };
        this.editRow = i;
    }
    // 保存图片分类修改
    save(i, data) {
        Object.assign(data, this.tempEditObject[i]);
        this.editRow = null;
        this.api.modiftyImagesCategories(data.id, this.tempEditObject[i].name).subscribe(res => {
            this._notification.create('success', '提示', '保存成功！');
        }, err => {
            this._notification.create('error', '提示', '保存失败！');
            if(err.status === 401) {
                this.loggedIn.userPast();
            }
        })
    }
    // 取消编辑
    cancel(i, data) {
        this.tempEditObject[i] = {};
        this.editRow = null;
    }
    // 删除分类
    deleteCategories(i, data) {
        this.editRow = null;
        this.api.deleteImagesCategories(data.id).subscribe(res => {
            this._notification.create('success', '提示', '删除成功！');
            this.queryImageCategoriesList();
        }, err => {
            this._notification.create('error', '提示', '删除失败！');
            if(err.status === 401) {
                this.loggedIn.userPast();
            }
        })
    }
    // 新增分类
    addCategories() {
        this.isVisible = true;
    }
    _submitForm() {
        for (const i in this.validateForm.controls) {
            if (this.validateForm.controls[i].status == 'INVALID') {
                for (const j in this.validateForm.controls) {
                    this.validateForm.controls[j].markAsDirty();
                }
                return;
            }
        }
        this.isVisible = false;
        this.api.addImagesCategories(this.validateForm.value.name).subscribe(res => {
            this._notification.create('success', '提示', '新增分类成功！');
            this.queryImageCategoriesList();
        }, err => {
            this._notification.create('error', '提示', '新增分类失败！');
            if(err.status === 401) {
                this.loggedIn.userPast();
            }
        });
    }
    _init() {
        this.validateForm = this.fb.group({
            name: [null, [Validators.required]]
        });
        this.api.queryImagesCategoriesList().mergeMap(res => {
            this.imageCategoriesData = res['list'];
            this.imageCategories = this.imageCategoriesData[0];
            return this.api.getImagesListByCategories(this.imageCategories['id']);
        }).subscribe(res => {
            this.imagesList = res['list'];
        }, err => {
            this._notification.create('error', '提示', '数据拉取失败！');
        })
        this.imageCategoriesData.forEach(item => {
            this.tempEditObject[item.key] = {};
        })
    }
    ngOnInit() {
        this._init();
    }

}

import { Component, Output, EventEmitter, OnInit } from "@angular/core";

@Component({
    selector: 'rich-text-editor',
    templateUrl: './rich-text-editor.component.html',
    styleUrls: ['./rich-text-editor.component.scss'],
    inputs: ['froalaText'],
})
export class RichTextEditorComponent implements OnInit {

    @Output() froala = new EventEmitter();
    froalaText: string = "";

    option: Object;

    constructor() {
    }

    ngOnInit() {
        // 在事件中要使用外部的this,因为函数内部也有this所以讲this的值赋给that
        var that = this;
        // 参数配置
        // https://www.froala.com/wysiwyg-editor/docs/options?utm_expid=98676916-2.gb-QgBReTCCS2F60oBIe_g.0&utm_referrer=https%3A%2F%2Fwww.google.com%2F#language
        this.option = {
            language: 'zh_cn', //配置语言
            placeholderText: "请输入", // 文本框提示内容
            charCounterCount: true, // 是否开启统计字数
            charCounterMax: 2000, // 最大输入字数,目前只支持英文字母
            // 注意导航条的配置, 按照官方的文档,无法配置,只能使用toolbarButtons来配置了。
            // toolbarButtons: ['fullscreen', '|', 'bold', 'italic', 'underline', 'strikeThrough', 'align', 'insertLink', 'insertImage', 'insertHR', 'subscript', 'superscript', 'fontFamily'],
            // toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
            // toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
            // toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
            codeMirror: false, // 高亮显示html代码
            codeMirrorOptions: { // 配置html代码参数
                tabSize: 4
            },
            height: 330,
            // 上传图片，视频等稳健配置
            // imageUploadURL: this.questionListService.IP + "sns/uploadPhoto",//GLOBAL.INCONFIG.getIP()+接口名称,
            imageUploadURL:"http://127.0.0.1:3000/api/upload",//本地路径
            // imageUploadParams: { uid: this.questionListService.userInfo.id },//接口其他传参,默认为空对象{},
            imageUploadMethod: "POST",//POST/GET,
            // 事件, 每次输入,就将值传递给父组件, 或者使用失去焦点的时候传递。
            events: {
                'froalaEditor.contentChanged': function (e, editor) {
                    that.froala.emit(that.froalaText);
                }
            }
        }
    }
}

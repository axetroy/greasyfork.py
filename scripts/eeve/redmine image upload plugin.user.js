// ==UserScript==
// @name         redmine image upload plugin
// @namespace    https://greasyfork.org/users/71775
// @website      https://eeve.me
// @version      0.3
// @description  a redmine image upload plugin
// @author       eeve
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/vue/2.3.4/vue.min.js
// @include      /^http://.*/projects/.*/(issues|wiki)(/new.*)?$/
// @include      /^http://.*/issues/\d+$/
// ==/UserScript==





/* jshint ignore:start */
var inline_src = (<><![CDATA[
/* jshint ignore:end */



/* jshint esnext: false */
/* jshint esversion: 6 */
(function() {

    const btn = $('.jstb_img');

    if(btn.length <= 0 ) {
        console.log('未发现图片上传按钮');
        return;
    }

    // 追加挂载点到页面
    $('body').append('<div id="UploadFileBox"></div>');

    // 启动App
    const app = new Vue({
        el: '#UploadFileBox',
        template: `
            <div :style="style.box">
                <div :style="style.dialog">
                    <div :style="style.head">
                        <div :style="style.title">上传图片</div>
                        <span :style="style.closebtn" @click="close">关闭</span>
                    </div>
                    <div :style="style.body">
                        <div :style="style.uploadbtnbox">
                            <button :style="style.uploadbtn">选择文件</button>
                            <input :style="style.file" ref="file" type="file" name="attachments[dummy][file]" class="file_selector" multiple="multiple" @change="change($refs.file)">
                            <span>按住shift可多选</span>
                        </div>
                        <div :style="style.progress" v-for="file in files" :key="files"><div :style="getProgress(file)"></div></div>
                    </div>
                </div>
                <div :style="style.mask" @click="close"></div>
            </div>
        `,
        data() {
            return {
                url: '/uploads.js',
                attachmentId: 0,
                maxFileSize: 5242880,
                maxFileSizeExceeded: '该文件无法上传。超过文件大小限制 (5 MB)',
                height: 100,
                style: {
                    box: {
                        display: 'none'
                    },
                    dialog: {
                        width: '500px',
                        height: '100px',
                        background: '#f5f5f5',
                        position: 'fixed',
                        left: '50%',
                        top: '50%',
                        marginLeft: '-250px',
                        marginTop: '-50px',
                        zIndex: '1000',
                        '-moz-box-shadow': '0px 2px 20px #333333',
                        '-webkit-box-shadow': '0px 2px 20px #333333',
                        'box-shadow': '0px 2px 6px #333333'
                    },
                    head: {
                        height: '25px',
                        background: '#3d7db9',
                        color: '#fff',
                        padding: '0 15px',
                        height: '25px',
                        lineHeight: '25px',
                        fontWeight: '700'
                    },
                    title: {
                        display: 'inline-block',
                        width: '80%',
                        color: '#fff'
                    },
                    closebtn: {
                        float: 'right',
                        cursor: 'pointer'
                    },
                    body: {
                        padding: '15px'
                    },
                    uploadbtnbox: {
                        position: 'relative',
                        marginBottom: '15px'
                    },
                    uploadbtn: {
                        width: '120px',
                        height: '25px',
                        border: 'none',
                        background: '#628DB6',
                        color: '#fff',
                        cursor: 'pointer'
                    },
                    file: {
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        width: '120px',
                        height: '25px',
                        opacity: '0',
                        cursor: 'pointer',
                        zIndex: '1'
                    },
                    progress: {
                        marginBottom: '15px',
                        height: '5px',
                        background: '#dedede'
                    },
                    cursor: {
                        height: '100%',
                        background: 'green',
                        width: '0%'
                    },
                    mask: {
                        position: 'fixed',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.4)',
                        zIndex: '999'
                    }
                },
                queue: 0,
                files: []
            };
        },
        watch: {
            height() {
                if(this.height < 100) {
                    this.style.dialog.height = '100px';
                    this.style.dialog.marginTop = '-50px';
                } else {
                    this.style.dialog.height = `${this.height}px`;
                    this.style.dialog.marginTop = `-${this.height * 0.5}px`;
                }
            },
            files() {
                this.height = this.files.length > 1 ? 100 +  (this.files.length - 1) * 20 : 100;
            }
        },
        methods: {
            change({ files }) {
                // 校验文件大小
                var sizeExceeded = false;
                $.each(files, (index, file) => {
                    if (file.size && file.size > parseInt(this.maxFileSize)) {
                        sizeExceeded=true;
                    }
                });
                if (sizeExceeded) {
                    window.alert(this.maxFileSizeExceeded);
                } else {
                    $.each(files, (index, file) => {
                        let attachId = ++this.attachmentId;
                        console.log(`开始上传第${index+1}个文件！attachmentId: ${attachId}`);
                        this.upload(file, attachId);
                    });
                }
            },
            upload(file, attachmentId) {
                this.files.push(file);
                this.queue++;
                uploadBlob(file, this.url, attachmentId, {
                    loadstartEventHandler: (progress) => {
                        // console.log('start...',progress);
                        file.progress = `${(progress.loaded / progress.total) * 100}%`;
                    },
                    progressEventHandler: (progress) => {
                        // console.log('progress...',progress);
                        file.progress = `${(progress.loaded / progress.total) * 100}%`;
                    }
                })
                .done((result) => {
                    let res = result.match(/\/attachments\/(\d+).js\?attachment_id=/);
                    if(res.length === 2) {
                        let attachments = res[1];
                        const url = this.getImageUrl(attachments, file.name);
                        const textarea = this.getInput();
                        textarea.val(`${textarea.val()}\n!${url}!`);
                    }
                    // result
                    console.log('上传成功一个文件 -> ', file.name);
                })
                .fail((result) => {
                    console.log('上传失败一个文件!', result.statusText);
                })
                .always(() => {
                    this.queue--;
                    if(this.queue === 0) {
                        this.close();
                    }
                    console.log(`上传队列剩余量${this.queue}....`);
                });
            },
            getImageUrl(attachments, name) {
                return `${window.location.origin}/attachments/download/${attachments}/${ encodeURIComponent(name) }`;
            },
            close() {
                this.style.box.display = 'none';
                this.style.cursor.width = '0%';
                this.files = [];
            },
            getInput() {
                return $('.jstEditor textarea');
            },
            getProgress(file) {
                return {
                    height: '100%',
                    background: 'green',
                    // width: '0%'
                    width: `${file.progress || '0'}%`
                }
            }
        }
    });

    // 覆盖点击事件
    btn[0].onclick = null;
    btn.on('click', () => {
        app.style.box.display = 'block';
    });

    // 附件如果为图片，直接展示
    $('.icon.icon-attachment').each((index, item) => {
        let self = $(item);
        self.attr('target', '_blank');
        self.parent().append(`<img src="${self.attr('href')}" style="max-width: 100%;"/>`);
    });

})();



/* jshint ignore:start */
]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */
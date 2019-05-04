// ==UserScript==
// @name         网易云音乐列表导出
// @namespace    undefined
// @version      0.0.3
// @description  导出当前页网易云音乐列表为文本
// @author       allen smith
// @match        *://music.163.com/*
// @require      https://cdn.bootcss.com/clipboard.js/1.7.1/clipboard.js
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // 检测页面
    let htm = document.getElementsByClassName('f-oh');
    if(htm.length === 0){
        return;
    }

    // 检测文档变动
    let doc = document.getElementById('g_mymusic');
    let _body = document.body;
    let clipboard, btn, spli, interId, waitTimeoutId, wait ;
    let ckdiv;
    let check1, check2, check3;
    doc.addEventListener('DOMSubtreeModified', function () {

        //查找列表动画
        wait = document.getElementById('wait-animation');
        if(wait) _body.removeChild(wait);
        wait = document.createElement("span");
        wait.id = 'wait-animation';
        wait.setAttribute('style', 'display:inline-block;position:absolute;right:50px;top:100px;padding:3px 5px;border:1px solid lightgray;background-color:white;color:black;border-radius:5px;font-size:14px;');
        _body.appendChild(wait);
        wait.innerHTML = '导出：没有合适的列表';

        //检测列表
        let list = document.getElementsByClassName('m-table')[0];
        if (!list) {
            btn = document.getElementById('export-btn');
            spli = document.getElementById('export-spli');
            if(btn) _body.removeChild(btn);
            if(spli) _body.removeChild(spli);
            return;
        }
        _body.removeChild(wait);

        //创建按钮
        btn = null;
        spli = null;
        btn = document.getElementById('export-btn');
        spli = document.getElementById('export-spli');
        if (!spli) {
            spli = document.createElement("input");
            spli.id = 'export-spli';
            spli.className = 'export-spli';
            spli.setAttribute('placeholder','自定义分隔符（默认 -- ）');
            spli.setAttribute('style', 'display:inline-block;position:absolute;right:50px;top:100px;padding:3px 5px;border:1px solid lightgray;background-color:white;color:black;border-radius:5px;font-size:14px;');
            _body.appendChild(spli);
        }
        if (!btn) {
            btn = document.createElement("button");
            btn.id = 'export-btn';
            btn.className = 'export-btn';
            btn.innerText = '导出列表';
            btn.setAttribute('style', 'display:inline-block;position:absolute;right:50px;top:159px;padding:3px 5px;border:1px solid lightgray;background-color:white;color:black;border-radius:5px;font-size:14px;');
            _body.appendChild(btn);
        }
        // 选择列
        if(!ckdiv){
            ckdiv = document.createElement("div");
            ckdiv.id = 'ckdiv';
            ckdiv.className = 'export-ck';
            ckdiv.setAttribute('style', 'display:inline-block;position:absolute;right:50px;top:128px;padding:3px 5px;border:1px solid lightgray;background-color:white;color:black;border-radius:5px;font-size:14px;');
            _body.appendChild(ckdiv);
            console.log(1)
        }

        let ckbuilder = function(id, label, uncheck, readonly){
            let tmpid = 'ck_' + id;
            let ckbox = document.createElement("input");
            ckbox.id = tmpid
            ckbox.setAttribute('type', 'checkbox');
            ckbox.setAttribute('style', 'vertical-align: middle;margin-top: -2px;');
            if(!uncheck) ckbox.checked = true;
            if(!!readonly) ckbox.setAttribute("disabled", "disabled");
            ckdiv.appendChild(ckbox);

            let ckspn = document.createElement("label");
            ckspn.setAttribute('for', tmpid);
            ckspn.innerHTML = ' ' + label;
            ckdiv.appendChild(ckspn);
            return ckbox;
        }
        if(!check1){
            check1 = ckbuilder("ck01","歌名 ", false, true);
        }
        if(!check2){
            check2 = ckbuilder("ck02","歌手 ");
        }
        if(!check3){
            check3 = ckbuilder("ck03","专辑", true);
        }

        //创建剪贴板
        if (clipboard) clipboard.destroy();
        clipboard = new Clipboard('.export-btn', {
            text: function (trigger) {

                //导出列表
                btn.innerText = '正在导出 ...';
                let result = '';
                let listBody = list.getElementsByTagName('tbody')[0];
                let rows = listBody.getElementsByTagName('tr');
                for (let i = 0; i < rows.length; i++) {
                    let ele = rows[i];
                    let cells = ele.getElementsByTagName('td');
                    let name = cells[1].getElementsByTagName('b')[0].getAttribute('title').replace(/<div class="soil">[\s\S\n]*?<\/div>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&");
                    let artist = cells[3].getElementsByTagName('span')[0].getAttribute('title').replace(/<div class="soil">[\s\S\n]*?<\/div>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&");
                    let album = cells[4].getElementsByTagName('a')[0].getAttribute('title').replace(/<div class="soil">[\s\S\n]*?<\/div>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&");

                    let spliChar = spli.value;
                    if(!spliChar) spliChar = ' -- ';
                    result += name;
                    if(check2.checked){
                        result += spliChar + artist;
                    }
                    if(check3.checked){
                        result += spliChar + album;
                    }
                    result += '\r\n';
                }

                //提示动画
                btn.innerText = '已复制到剪贴板 =';
                let count = 6;
                clearInterval(interId);
                interId = setInterval(function () {
                    count--;
                    if (count > 0){
                        btn.innerText = '已复制到剪贴板 ' + waitAnimationChar(count);
                    }
                    else{
                        btn.innerText = '导出列表';
                        clearInterval(interId);
                    }
                }, 300);

                //输出到控制台
                console.log(result);
                //输出到剪贴板
                trigger.setAttribute('aria-label', result);
                return trigger.getAttribute('aria-label');
            }
        });
    });
    //字符动画
    let waitAnimationChar = function(n){
        let temp = n % 3;
        if(temp === 0) return '#';
        else if(temp == 1) return '$';
        else if(temp == 2) return '+';
    };
})();
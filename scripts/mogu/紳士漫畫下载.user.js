// ==UserScript==
// @name         紳士漫畫下载
// @version      1.9.1
// @namespace    none
// @author       mogu
// @description  添加下载按钮
// @include      /https?:\/\/(www\.|d3\.)?wnacg\.(org|com|download)/photos.*/
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    function download(url, filename){
        let progress = document.querySelector('div#divdownload > progress');
        progress.setAttribute('style', 'display: block;');
        progress.setAttribute('value', '0');
        progress.setAttribute('max', '100');
        GM_xmlhttpRequest({
            method: 'GET',
            url: url,
            responseType: 'blob',
            onprogress: function(res) {
                let lding = Math.round((res.loaded / res.total * 100));
                progress.value = lding;
                progress.innerHTML = lding + '%';
                //res.lengthComputable //判断是否能获取文件大小
                //res.total //总大小
                //res.loaded //加载了多少
            },
            onload: function(res) {
                let a = document.createElement('a');
                a.setAttribute('href', window.URL.createObjectURL(res.response));
                a.setAttribute('download', filename);
                a.click();
                a.addEventListener('load', function(){window.URL.revokeObjectURL(a.href)}, false);
            },
            onerror: function(res){
                console.log('下载失败');
            },
        });
    }
    function getzip({url = document.querySelector('a.downloadbtn').href} = {}){
        let xhr = new XMLHttpRequest();
        xhr.onload = function(){
            let DOM = this.responseXML;
            GM_xmlhttpRequest({
                method: "HEAD",
                url: DOM.querySelector('a.down_btn').href,
                onload: function(res) {
                    addobj();
                    let i = document.querySelector('div#divdownload input'),
                        a = document.querySelector('div#divdownload a');
                    a.href = DOM.querySelector('a.down_btn').href;
                    i.value = DOM.querySelector('.download_filename').innerText;
                    a.addEventListener('click', function(){
                        event.preventDefault();
                        download(this.href, i.value);
                    }, false);
                },
            });
        };
        xhr.open('GET', url);
        xhr.responseType = 'document';
        xhr.send();
    }
    function addobj(){
        let ifobj = document.querySelector('div.asTBcell.uwthumb');
        if (ifobj){
            let css = [
                'div#divdownload{padding: 10px;}',
                'div#divdownload > input{width: 100%; font-size: 20px;}',
                'div#divdownload > a{',
                    'cursor: pointer;',
                    'background: #ff5b5b;',
                    'width: 120px;',
                    'border-radius: 7px;',
                    'color: #fff;',
                    'font-size: 22px;',
                    'margin-bottom: 10px;',
                    'text-decoration: none;',
                    'box-shadow: 1px 1px 2px #939393;',
                '}',
                'div#divdownload > a:hover{background: #e85353;}',
                'div#divdownload > progress{display: none;}'
            ].join('');
            GM_addStyle(css);
            let div = document.createElement('div'),
                input = document.createElement('input'),
                a = document.createElement('a'),
                progress = document.createElement('progress');
            div.appendChild(a);
            div.appendChild(input);
            div.appendChild(progress);
            div.setAttribute('id', 'divdownload');
            input.setAttribute('type', 'text');
            a.innerHTML = '下载';
            ifobj.appendChild(div);
        }
    }
    getzip();
})();

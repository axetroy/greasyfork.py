// ==UserScript==
// @name         机核时间轴图片查看
// @namespace    https://gist.github.com/smilecc/32bda108a55876b685356e9a48ea48aa#file-g-core-img-viewer-js
// @version      0.3
// @description  帮助你看到机核电台时间轴中的图片的原图
// @author       Can
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @require      https://cdn.jsdelivr.net/npm/bigpicture@1.2.3/dist/BigPicture.min.js
// @match        https://www.gcores.com/radios/*
// @match        https://www.g-cores.com/radios/*
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
    /* jshint ignore:end */
        /* jshint esnext: false */
        /* jshint esversion: 6 */
    
        // 创建样式
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = '.init-size > img { max-width: 95% !important; max-height: 95% !important; }';
        document.getElementsByTagName('HEAD').item(0).appendChild(style);
    
        // 增加事件
        var imgList = document.getElementsByClassName('audio_dot_img');
        for (let element of imgList) {
            // 获取图片元素
            let getImgElment = function () {
                let imgElements = element.getElementsByTagName('img');
                return imgElements[0];
            };
            element.classList.add('init-size');
            // 增加鼠标移入事件
            element.addEventListener('mouseover', function () {
                let imgElement = getImgElment();
                if (imgElement === undefined) return;
                imgElement.style.transition = 'all 0.3s';
                imgElement.style.maxWidth = '100%';
                imgElement.style.maxHeight = '100%';
                imgElement.style.cursor = 'pointer';
                element.classList.remove('init-size');
            });
            // 鼠标移出事件
            element.addEventListener('mouseout', function () {
                let imgElement = getImgElment();
                if (imgElement === undefined) return;
                imgElement.style.maxWidth = '95%';
                imgElement.style.maxHeight = '95%';
            });
            // 点击打开图片浏览器
            element.addEventListener('click', function () {
                let imgElement = getImgElment();
                if (imgElement === undefined) return;
                BigPicture({
                    el: imgElement,
                    imgSrc: imgElement.src.replace('_limit', '')
                });
            });
        }
    
    /* jshint ignore:start */
    ]]></>).toString();
    var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
    eval(c.code);
    /* jshint ignore:end */
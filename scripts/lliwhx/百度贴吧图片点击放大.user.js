// ==UserScript==
// @name           百度贴吧图片点击放大
// @namespace      https://greasyfork.org/users/51104
// @version        1.6.3
// @description    直接在当前页面点击查看原图（包括签名档）。支持图片的多开、拖拽、垂直或水平的滚动和缩放旋转
// @match          *://tieba.baidu.com/p/*
// @match          *://tieba.baidu.com/f?*
// @exclude        *://tieba.baidu.com/f?*kw=*
// @grant          GM_addStyle
// @grant          GM_setValue
// @grant          GM_getValue
// @grant          GM_deleteValue
// @grant          GM_registerMenuCommand
// @author         lliwhx
// @license        MIT
// @copyright      Copyright © 2016-2018 lliwhx
// ==/UserScript==

(function (win, doc) {
    'use strict';

    if(document.title==='贴吧404')return;

    GM_addStyle('.BDE_Image,.d_content_img,.j_user_sign{cursor:zoom-in}.btzi-gallery{position:fixed;top:0;left:0;z-index:19990801}.btzi-img{position:absolute;box-shadow:0 0 7px rgba(0,0,0,.4);transform-origin:0 0}.btzi-img:hover{z-index:20180801;box-shadow:0 0 7px rgb(0,0,0)}.btzi-img:active{box-shadow:0 0 7px rgba(0,0,0,.4);cursor:move}');

    var iTarget,
        iMove,
        iMouse,
        gallery,
        debounce,
        docElement = doc.documentElement,
        docWidth = docElement.clientWidth - 5,
        docHeight = docElement.clientHeight - 5;

    function open(e) {
        var t = e.target,
            i,
            tSrc;

        // className分别指向新图，签名档，老图
        if (!e.button && 'className:BDE_Image,j_user_sign,d_content_img'.indexOf(t.className) > 9 && t.parentNode.nodeName !== 'A') {
            i = doc.createElement('img');
            i.onerror = function () {
                if (this.src !== t.src) {
                    this.src = t.src;
                } else {
                    this.onerror = null;
                    this.onload = null;
                }
            };
            i.onload = function () {
                var w = this.width,
                    h = this.height,
                    s = !preferences.size && (docWidth - w < 0 || docHeight - h < 0) ? Math.min((docWidth - 5) / w,(docHeight - 5) / h) : 1,
                    x = docWidth - w * s - 5 > 0 ? (docWidth - w * s) / 2 : 5,
                    y = docHeight - h * s - 5 > 0 ? (docHeight - h * s) / 2 : 5;
                this.iData = {
                    width: w,
                    height: h,
                    x: x,
                    y: y,
                    scale: s,
                    rotate: 0
                };
                transform(this, x, y, s, 0);
                this.onerror = null;
                this.onload = null;
                gallery.appendChild(this);
            };
            i.className = 'btzi-img';
            tSrc = /^https?:\/\/\w+\.baidu\.com\/.+\/(\w+\.[a-zA-Z]{3,4})(?:\?v=tbs){0,2}$/.exec(t.src);
            i.src = tSrc ? '//imgsa.baidu.com/forum/pic/item/' + tSrc[1] : t.src;
            i = null;
        }
    }
    function down(e) {
        var t,
            data;
        if (!e.button) {
            t = e.target;
            data = t.iData;
            iTarget = t;
            iMouse = {
                clientX: e.clientX,
                clientY: e.clientY,
                offsetX: data.x - e.clientX,
                offsetY: data.y - e.clientY
            };
            e.preventDefault();
            e.stopPropagation();
            doc.addEventListener('mousemove', move);
            doc.addEventListener('mouseup', up);
        }
    }
    function move(e) {
        var t = iTarget,
            x = e.clientX + iMouse.offsetX,
            y = e.clientY + iMouse.offsetY,
            data = t.iData;
        iMove = 1;
        e.stopPropagation();
        transform(t, x, y, data.scale, data.rotate);
        t = null;
        x = null;
        y = null;
        data = null;
    }
    function up(e) {
        var t,
            data,
            translate;
        if (iMouse.clientX === e.clientX && iMouse.clientY === e.clientY) {
            iMove = null;
        } else {
            t = iTarget;
            data = t.iData;
            translate = /translate\((-?\d+)px,\s?(-?\d+)px\)/.exec(t.getAttribute('style'));
            data.x = translate[1] | 0;
            data.y = translate[2] | 0;
        }
        iMouse = null;
        doc.removeEventListener('mousemove', move);
        doc.removeEventListener('mouseup', up);
    }
    function close(e) {
        if (preferences.closeWindow === 'document' && e.target !== iTarget || preferences.closeWindow === 'document' && !iMove) {
            if (doc.body.classList.contains('btzi-enabled') || e.target.id === 'btzi_settings_save') return;
            gallery.style.display = 'none';
            while (gallery.hasChildNodes()) {
                gallery.firstChild.remove();
            }
            gallery.style.display = '';
        } else if (!iMove) {
            e.target.iData = null;
            e.target.remove();
        }
        iTarget = null;
    }
    function wheel(e) {
        var t = e.target,
            data = t.iData,
            x = data.x,
            y = data.y,
            s = data.scale,
            r = data.rotate,
            p = preferences,
            deltaY = e.deltaY > 0 ? 100 : -100,
            delta,
            tmp,
            z;
        e.preventDefault();
        e.stopPropagation();
        if (p.rotateKey !== 'type' && e[p.rotateKey] || p.rotateKey === 'type' && !e[p.zoomKey] && !e[p.wheelKey]) {
            tmp = data.height;
            data.height = data.width;
            data.width = tmp;
            delta = deltaY * p.rotateDirection > 0 ? 90 : 270;
            z = (r + delta) % 360;
            tmp = 0.01745329 * delta;
            data.x = e.clientX - (e.clientX - x) * Math.cos(tmp) + (e.clientY - y) * Math.sin(tmp);
            data.y = e.clientY - (e.clientX - x) * Math.sin(tmp) - (e.clientY - y) * Math.cos(tmp);
            data.rotate = z;
            transform(t, data.x, data.y, s, z);
            return;
        }
        if (p.zoomKey !== 'type' && e[p.zoomKey] || p.zoomKey === 'type' && !e[p.rotateKey] && !e[p.wheelKey]) {
            delta = deltaY * p.zoomDirection > 0 ? 0.1 : -0.1;
            z = s + delta;
            if (z < 0.2) {
                return;
            }
            tmp = z / s;
            data.x = e.clientX - (e.clientX - x) * tmp;
            data.y = e.clientY - (e.clientY - y) * tmp;
            data.scale = z;
            transform(t, data.x, data.y, z, r);
            return;
        }
        if (e[p.wheelKey]) {
            tmp = docHeight - data.height * s;
            if (tmp < 0) {
                delta = r > 90 ? data.height * s : 0;
                z = y - deltaY * p.wheelDirection;
                if (z > 5 + delta) {
                    z = 5 + delta;
                } else if (z < tmp + delta) {
                    z = tmp + delta;
                }
                data.y = z;
                transform(t, x, z, s, r);
                return;
            }
            tmp = docWidth - data.width * s;
            if (tmp < 0) {
                delta = r % 270 ? data.width * s : 0;
                z = x - deltaY * p.wheelDirection;
                if (z > 5 + delta) {
                    z = 5 + delta;
                } else if (z < tmp + delta) {
                    z = tmp + delta;
                }
                data.x = z;
                transform(t, z, y, s, r);
            }
        }
    }
    function transform(t, x, y, s, r) {
        t.style.transform = 'translate(' + Math.round(x) + 'px, ' + Math.round(y) + 'px) scale(' + s + ') rotate(' + r + 'deg)';
    }
    function resize() {
        clearTimeout(debounce);
        debounce = setTimeout(function () {
            docWidth = docElement.clientWidth - 5;
            docHeight = docElement.clientHeight - 5;
        }, 500);
    }
    function frame(w){
        return doc.getElementById(w)||doc;
    }

    var settings,
        preferences;

    //旧版本用户设置数据转移
    if (GM_getValue('definedEvent')) {
        settings = GM_getValue('definedEvent').split(',');
        preferences = {
            "open": settings[0],
            "close": settings[1],
            "wheelDirection": settings[2] === "1" ? "-1" : "1",
            "zoomKey": settings[3] === "2" ? "altKey" : settings[3] === "3" ? "shiftKey" : "ctrlKey",
            "zoomDirection": settings[4] === "1" ? "-1" : "1",
            "rotateKey": settings[5] === "1" ? "ctrlKey" : settings[5] === "3" ? "shiftKey" : "altKey",
            "rotateDirection": settings[6] === "90" ? "-1" : "1"
        };
        GM_deleteValue('definedEvent');
        GM_deleteValue('repairDefinedEvent');
    } else {
        preferences = JSON.parse(GM_getValue('btzi-UserSettings', '{"open": "click","close": "click","closeWindow":"btzi_gallery","size":"100","wheelKey":"type","wheelDirection": "1","zoomKey": "ctrlKey","zoomDirection": "-1","rotateKey": "altKey","rotateDirection": "1"}'));
    }
    if (!preferences.closeWindow) {
        preferences.closeWindow = 'btzi_gallery';
        preferences.size = '100';
        preferences.wheelKey = 'type';
        GM_setValue('btzi-UserSettings', JSON.stringify(preferences));
    }

    gallery = doc.createElement('div');
    gallery.className = 'btzi-gallery';
    gallery.id = 'btzi_gallery';
    gallery.addEventListener('mousedown', down);
    gallery.addEventListener('wheel', wheel);
    doc.body.appendChild(gallery);
    win.addEventListener('resize', resize);
    frame(preferences.closeWindow).addEventListener(preferences.close, close);

    var prevent = function (e) {
        var t = e.target;
        if (!e.button && t.className === 'BDE_Image' && t.parentNode.nodeName !== 'A') {
            e.stopPropagation();
        }
    },
        callback = function () {
            gallery.style.display = 'none';
            while (gallery.hasChildNodes()) {
                gallery.firstChild.remove();
            }
            gallery.style.display = '';
        },
        observer = new MutationObserver(callback),
        postlist = doc.getElementById('j_p_postlist');
    postlist.addEventListener('click', prevent, true);
    postlist.addEventListener(preferences.open, open, true);
    observer.observe(postlist, {
        childList: true
    });

    settings = function () {

        GM_addStyle('.btzi-enabled>.btzi-modal,.btzi-enabled>.btzi-container{display:block}.btzi-modal,.btzi-container{position:fixed;top:0;left:0;width:100%;height:100%}.btzi-modal{z-index:20171231;display:none;background-color:rgba(0,0,0,.7)}.btzi-container{z-index:20180101;display:none}.btzi-content{position:absolute;top:0;right:0;bottom:0;left:0;width:335px;height:512px;margin:auto;font-size:14px;border-radius:6px;background-color:#fff}.btzi-header,.btzi-body,.btzi-footer{padding:11px}.btzi-header{border-bottom:1px solid #e6ecf0}.btzi-title{text-align:center;font-size:20px;line-height:22px}.btzi-group{margin-bottom:15px;border:0}.btzi-legend{float:left;width:81px;padding-top:5px;text-align:right}.btzi-controls{margin-left:93px}.btzi-select{box-sizing:border-box;width:180px;height:30px;padding:4px;line-height:30px;border:1px solid #e6ecf0;border-radius:3px}.btzi-select:focus{outline:1px dotted #66757f;outline:5px auto -webkit-focus-ring-color}.btzi-footer{text-align:center;border-top:1px solid #e6ecf0}.btzi-button{padding:6px 17px;font-weight:700;line-height:20px;color:#fff;border:0;border-radius:75px;background:#4ab3f4;transition:box-shadow .17s ease-in-out}.btzi-button:hover,.btzi-button:active{background:#1da1f2}.btzi-button:focus{box-shadow:0 0 0 2px #fff,0 0 0 4px #a4d9f9}.btzi-button:active{box-shadow:0 0 0 2px #fff,0 0 0 4px #4ab3f4}');

        var html,
            form,
            p,
            prop,
            KeyIndex,
            change;
        html = '<div class=btzi-modal></div><div class=btzi-container><div class=btzi-content><div class=btzi-header><h3 class=btzi-title>用户设置</h3></div><div class=btzi-body><form id=btzi_settings_form><fieldset class=btzi-group><legend class=btzi-legend>打开图片</legend><div class=btzi-controls><select class=btzi-select name=btzi[open]><option value=click>鼠标左键，单击图片</option><option value=dblclick>鼠标左键，双击图片</option></select></div></fieldset><fieldset class=btzi-group><legend class=btzi-legend>关闭图片</legend><div class=btzi-controls><select class=btzi-select name=btzi[close]><option value=click>鼠标左键，单击</option><option value=dblclick>鼠标左键，双击</option></select><select class=btzi-select name=btzi[closeWindow]><option value=btzi_gallery>图片，关闭单个图片</option><option value=document>页面，关闭所有图片</option></select></div></fieldset><fieldset class=btzi-group><legend class=btzi-legend>图片大小</legend><div class=btzi-controls><select class=btzi-select name=btzi[size]><option value=100>默认： 原始</option><option value>默认： 等比例适应屏幕</option></select></div></fieldset><fieldset class=btzi-group><legend class=btzi-legend>滚动图片</legend><div class=btzi-controls><select class=btzi-select name=btzi[wheelKey]><option value=type>组合键： 无</option><option value=ctrlKey>组合键： Ctrl</option><option value=altKey>组合键： Alt</option><option value=shiftKey>组合键： Shift</option></select><select class=btzi-select name=btzi[wheelDirection]><option value=1>滚轮向下，图片上/左移</option><option value=-1>滚轮向上，图片上/左移</option></select></div></fieldset><fieldset class=btzi-group><legend class=btzi-legend>缩放图片</legend><div class=btzi-controls><select class=btzi-select name=btzi[zoomKey]><option value=type>组合键： 无</option><option value=ctrlKey>组合键： Ctrl</option><option value=altKey>组合键： Alt</option><option value=shiftKey>组合键： Shift</option></select><select class=btzi-select name=btzi[zoomDirection]><option value=1>滚轮向下，图片放大</option><option value=-1>滚轮向上，图片放大</option></select></div></fieldset><fieldset class=btzi-group><legend class=btzi-legend>旋转图片</legend><div class=btzi-controls><select class=btzi-select name=btzi[rotateKey]><option value=type>组合键： 无</option><option value=ctrlKey>组合键： Ctrl</option><option value=altKey>组合键： Alt</option><option value=shiftKey>组合键： Shift</option></select><select class=btzi-select name=btzi[rotateDirection]><option value=1>滚轮向下，顺时针旋转</option><option value=-1>滚轮向上，顺时针旋转</option></select></div></fieldset></form></div><div class=btzi-footer><button class=btzi-button id=btzi_settings_save type=button>保存设置</button></div></div></div>';
        doc.body.classList.add('btzi-enabled');
        doc.body.insertAdjacentHTML('beforeend', html);
        form = doc.getElementById('btzi_settings_form');
        p = preferences;
        for (prop in p) {
            form['btzi[' + prop + ']'].value = p[prop];
        }
        KeyIndex = {'btzi[wheelKey]':form['btzi[wheelKey]'].selectedIndex,'btzi[zoomKey]':form['btzi[zoomKey]'].selectedIndex,'btzi[rotateKey]':form['btzi[rotateKey]'].selectedIndex};
        change = function () {
            var tmp;
            for (prop in KeyIndex){
                if (this.selectedIndex === KeyIndex[prop]){
                    tmp = KeyIndex[this.name];
                    KeyIndex[this.name] = this.selectedIndex;
                    KeyIndex[prop] = tmp;
                    form[prop].selectedIndex = tmp;
                    break;
                } else if (prop === 'btzi[rotateKey]') {
                    KeyIndex[this.name] = this.selectedIndex;
                }
            }
        };
        form['btzi[wheelKey]'].addEventListener('change', change);
        form['btzi[zoomKey]'].addEventListener('change', change);
        form['btzi[rotateKey]'].addEventListener('change', change);
        doc.getElementById('btzi_settings_save').addEventListener('click', function () {
            var prop,
                opened = p.open,
                closed = p.close,
                closedWindow = p.closeWindow;
            for (prop in p) {
                p[prop] = form['btzi[' + prop + ']'].value;
            }
            if (opened !== p.open) {
                postlist.removeEventListener(opened, open, true);
                postlist.addEventListener(p.open, open, true);
            }
            if (closed !== p.close || closedWindow !== p.closeWindow) {
                frame(closedWindow).removeEventListener(closed, close);
                frame(p.closeWindow).addEventListener(p.close, close);
            }
            GM_setValue('btzi-UserSettings', JSON.stringify(p));
            doc.body.classList.remove('btzi-enabled');
        });
        settings = null;
    };
    if (!GM_getValue('btzi-UserSettings')) {
        settings();
    }
    GM_registerMenuCommand('btzi-用户设置', function () {
        if (settings) {
            settings();
        } else {
            doc.body.classList.add('btzi-enabled');
        }
    });

})(window, document);

console.log('Sorry');
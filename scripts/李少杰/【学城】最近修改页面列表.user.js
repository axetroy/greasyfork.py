// ==UserScript==
// @name         【学城】最近修改页面列表
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  学城只能查看最近浏览过的页面，本脚本可以通过修改请求来实现在首页查看最近修改页面列表功能，并且提供开关，支持状态存储。
// @author       @李少杰
// @run-at       document-start
// @match        https://km.sankuai.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // 0: 创建 1:删除 2:修改 3:浏览
    console.log("start ");
    const MODIFY_AND_CREATE = '0,2';
    let ofetch = window.fetch;
    const LOCAL_KEY = '_km_home_latest_ops_type_';
    let currentSwitch = localStorage.getItem(LOCAL_KEY) || MODIFY_AND_CREATE;

    function findElement(selector, callback) {
        var el = document.querySelectorAll(selector);
        if (el.length > 0) {
            el.length == 1 ? callback(el[0]) : callback(el);
        } else {
            setTimeout(function() {
                findElement(selector, callback);
            }, 300);
        }
    }
    function updateSwitch() {
        //<div class="switch-btn"><div class="item "> 浏览 </div><div class="item active"> 修改 </div></div>
        findElement('header > div.header-title', function(headerTitle) {
            let content = headerTitle.childNodes[1];
            if (content.nodeType == Node.TEXT_NODE) {
                headerTitle.removeChild(content);
                let switchContainer = document.createElement('div');
                switchContainer.className = 'switch-btn';
                switchContainer.style.width = '90px';
                let view = document.createElement('div');
                view.className = `item ${currentSwitch == '3' ? 'active' : ''}`;
                view.style.width = '45px';
                view.textContent = '浏览';
                let modify = document.createElement('div');
                modify.className = `item ${currentSwitch == MODIFY_AND_CREATE ? 'active' : ''}`;
                modify.style.width = '45px';
                modify.textContent = '修改';
                view.addEventListener('click', (e) => { localStorage.setItem(LOCAL_KEY, '3'); setTimeout(() => location.reload(), 100) });
                modify.addEventListener('click', (e) => { localStorage.setItem(LOCAL_KEY, MODIFY_AND_CREATE); setTimeout(() => location.reload(), 100) });
                switchContainer.appendChild(view);
                switchContainer.appendChild(modify);
                headerTitle.appendChild(switchContainer);
            }
        });
    }
    let hookfetch = function(url, options) {
        //        https://km.sankuai.com/api/operationHistory?operationTypes=2&pageNo=1&pageSize=40
        if (url.indexOf('/api/operationHistory') != -1) {
            console.log('fetching', arguments);
            let modOpt = Object.assign({}, options);
            if (options.query && options.query.operationTypes != currentSwitch) {
                options.query.operationTypes = currentSwitch;
                let parsedUrl = new URL(url);
                let param = new URLSearchParams(parsedUrl.search);
                param.set('operationTypes', currentSwitch);
                parsedUrl.search = '?' + param.toString();
                updateSwitch();
                return ofetch(parsedUrl.toString(), options);
            }
        }
        return ofetch(url, options);
    }
    if (window.fetch != hookfetch) {
        ofetch = window.fetch;
        window.fetch = hookfetch;
        document.addEventListener('DOMContentLoaded', updateSwitch);
    }
})();
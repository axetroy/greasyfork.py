// ==UserScript==
// @name         Add Chinese and Japanese result only links to Google
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  nothing
// @author       Jie Lu
// @match        https://www.google.com/search*
// ==/UserScript==

(function() {
    'use strict';

    function updateParam(url, key, value) {
        var base = url.split('?')[0];
        var param_strs = url.split('?')[1];
        if (!param_strs) {
            param_strs = [];
        }
        var params = {};
        param_strs.split('&').map(str => {
            params[str.split('=')[0]] = str.split('=')[1];
        });
        params[key] = value;
        return base + '?' + Object.keys(params).map(key => key + '=' + params[key]).join('&');
    }

    function AddLink(name, code) {
        var url = unsafeWindow.location.href;
        var newUrl = updateParam(url, 'lr', 'lang_' + code);
        var link = document.createElement('a');
        link.style = 'margin-right: 5px';
        link.href = newUrl;
        link.innerHTML = name;
        container.appendChild(link);
    }
    var container = document.createElement('div');
    container.style = "position:fixed;left:10px;top:90px;z-index:999;";
    AddLink('CN', 'zh-CN');
    AddLink('JP', 'ja');
    AddLink('EN', 'en');
    document.body.appendChild(container);
})();
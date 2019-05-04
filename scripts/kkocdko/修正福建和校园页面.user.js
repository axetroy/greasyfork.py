// ==UserScript==
// @name         修正福建和校园页面
// @description  使福建和校园页面能够在现代浏览器上正常显示
// @namespace    https://greasyfork.org/users/197529
// @version      0.6
// @author       kkocdko
// @include      *://www.xxtyd.fj.cn/*
// @include      *://www.xxt.fj.chinamobile.com/*
// @noframes
// ==/UserScript==
'use strict';

let iframe = document.querySelector('#rightiframe');
if (iframe) {
    iframe.setAttribute('onload', 'height=contentWindow.document.documentElement.scrollHeight');
}

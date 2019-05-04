// ==UserScript==
// @name         隐藏开通QQ空间横幅
// @namespace    https://greasyfork.org/users/197529
// @version      0.3.3
// @description  关闭QQ空间后，每次进入空间都会出现“开通空间”横幅。这个脚本隐藏横幅。
// @author       kkocdko
// @include      *://user.qzone.qq.com/*
// @noframes
// ==/UserScript==
'use strict';

document.body.insertAdjacentHTML('beforeend', `<style>

#top_tips_container {
    display: none;
}

.top-fix-inner {
    margin: 0!important;
}

</style>`);

// ==UserScript==
// @name         Midishow 自动下载Midi
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  一个自动免积分下载Midishow上mid文件的脚本
// @author       You
// @match        http://www.midishow.com/midi/*.html
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
window.location.href=window.location.href.replace('/midi/','/midi/file/').replace('.html','.mid');
    // Your code here...
})();
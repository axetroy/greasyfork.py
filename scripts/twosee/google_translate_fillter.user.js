// ==UserScript==
// @name         google_translate_fillter
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description 谷歌翻译过滤代码块
// @author       twosee
// @include      /^.*$/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var c=top.document.querySelectorAll('pre'); //#readme
    for(var i=0;i<c.length;i++){
        c[i].setAttribute('class','notranslate');
    }
})();
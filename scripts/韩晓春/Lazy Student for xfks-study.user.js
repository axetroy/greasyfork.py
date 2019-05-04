// ==UserScript==
// @name         Lazy Student for xfks-study
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  robot for /xfks-study.gdsf.gov.cn
// @author       han2ee
// @match        http://xfks-study.gdsf.gov.cn/*
// @match        http://xfks-study.gdsf.gov.cn/*
// @run-at       document-start
// @grant unsafeWindow
// ==/UserScript==

(function() {
    'use strict';
    setInterval(function(){
        if($('.chapter-score-suc').length >0)
        {
            if($('.chapter-info a').length >0)
            {
                window.location = $('.chapter-info a')[0].href
            }
        }
    }, 3000);
})();

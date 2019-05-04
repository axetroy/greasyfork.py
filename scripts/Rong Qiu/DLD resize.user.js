// ==UserScript==
// @name         DLD resize
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://ui.ptlogin2.qq.com/cgi-bin/login?appid=614038002&style=9&s_url=http%3A%2F%2Fdld.qzapp.z.qq.com%2Fqpet%2Fcgi-bin%2Fphonepk%3Fcmd%3Dindex%26channel%3D0
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    if( document.body.clientWidth != 400 ){
        window.open(window.location.href,'_blank','width=400,height=750,toolbar=yes');
        if( history.length > 1 ){
            history.back(-1)
        }else{
            window.location.href = "about:blank";
        };
    }
})();
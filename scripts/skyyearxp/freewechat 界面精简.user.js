// ==UserScript==
// @name         freewechat 界面精简
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://freewechat.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setTimeout(function(){
        //return;

        $('#hot-articles,#menu,#share-buttons,#share-wechat,#footer,#about-article').remove();
        //$('body > script').remove();
        $('body > div').get(1).remove();
        $('.freebrowser-ad').remove();
        $('ins').remove();

    }, 200);

})();
// ==UserScript==
// @name         屏蔽某论坛广告
// @namespace    www.liaobaocheng.com
// @version      7.1
// @description  屏蔽广告，全靠前端功夫
// @author       liaobaocheng
// @match        http://hk-pic.xyz/*
// @require      http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    // document.getElementById('hd').style.display = 'none';
   document.getElementById('wp')..style.display = 'none';
    // document.getElementsByClassName('wp a_f')[0].lastElementChild.style.display='none';
    // document.getElementsByClassName('a_fl')[0].style.display = 'none';
    // document.getElementsByClassName('a_fr')[0].style.display = 'none';
    //
    $(document).ready(function(){
        var headerAd = document.getElementById('hd');

        var wrapAd = document.getElementById('wp').firstElementChild;
        var footerAd = document.getElementsByClassName('wp a_f')[0].lastElementChild;
        var leftAd = document.getElementsByClassName('a_fl')[0];
        var rightAd =  document.getElementsByClassName('a_fr')[0];

        headerAd.parentNode.removeChild(headerAd);
        wrapAd.parentNode.removeChild(wrapAd);
        footerAd.parentNode.removeChild(footerAd);
        leftAd.parentNode.removeChild(leftAd);
        rightAd.parentNode.removeChild(rightAd);
    });
})();
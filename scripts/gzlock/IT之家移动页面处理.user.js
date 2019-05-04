// ==UserScript==
// @name         IT之家移动页面处理
// @description  针对ITHome的Wap处理
// @namespace  https://wap.ithome.com/
// @version      0.30
// @author       gzlock
// @match        https://wap.ithome.com/
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    addGlobalStyle(`
.nlt ul li:not(.top){background:none !important;}
a span{width: auto !important;font-size: 0.2rem !important;}
`);

    function process(){
        var links = document.querySelectorAll('a:not(.processed)');
        links.forEach(link=>{
            var href = link.href;
            link.target = '_blank';
            if(href.indexOf('https://www.ithome.com/')===0){
                link.href = href.replace('https://www.ithome.com/','https://wap.ithome.com/');
            }
            else if(href.indexOf('lapin.ithome.com') >= 0){
                var title = link.querySelector('span.title');
                if(!title) return;
                title.innerText = '【辣品广告】' + title.innerText;
            }
            link.className += ' processed';
        });
    }
    process();

    window.jQuery.ajaxSetup({
        dataFilter: function (data, type) {
            setTimeout(process,100);
            return data;
        }
    });
})();
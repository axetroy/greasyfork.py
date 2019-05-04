// ==UserScript==
// @name Coub Audio Downloader
// @description Позволяет скачивать музыку из видео на Coub.com
// @author Neur0toxine
// @license MIT
// @version 0.1.1
// @include http*://coub.com/view/*
// @namespace https://greasyfork.org/users/12790
// ==/UserScript==
(function (window, undefined) {
    var w;
    if (typeof unsafeWindow !== undefined) {
        w = unsafeWindow
    } else {
        w = window;
    }

    if (w.self != w.top) {
        return;
    }
    
    // Копипаста сраная
    window.downloadFile = function(sUrl) {
    if (window.downloadFile.isChrome || window.downloadFile.isSafari) {
        var link = document.createElement('a');
        link.href = sUrl;
 
        if (link.download !== undefined){
            var fileName = sUrl.substring(sUrl.lastIndexOf('/') + 1, sUrl.length);
            link.download = fileName;
        }
        if (document.createEvent) {
            var e = document.createEvent('MouseEvents');
            e.initEvent('click' ,true ,true);
            link.dispatchEvent(e);
            return true;
        }
    }
    var query = '?download';
    window.open(sUrl + query, '_self');
}
window.downloadFile.isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
window.downloadFile.isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;
    // Конец сраной копипасты.
        
    // Говно блять. Я сраный быдлокодер. Но мне надо быстро и сразу.
    
    w.onload = function() {
    var el = document.createElement('button');
    el.className = 'sb -st -sq box--inline ';
    el.innerHTML = 'Download audio';
    el.download = document.title.toString().replace(/\W+/gm,'_');
    el.onclick = function()
    {
        var mjs = JSON.parse(document.getElementById('coubPageCoubJson').innerHTML);
        var url = mjs.audio_file_url;
        downloadFile(url);
        
    };
    var par = document.getElementsByClassName('sharing__controls mobile-hidden')[0];
    par.insertBefore(el, par.children[1]);
    };
    
})(window);
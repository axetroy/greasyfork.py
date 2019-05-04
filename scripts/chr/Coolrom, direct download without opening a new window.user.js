// ==UserScript==
// @name         Coolrom, direct download without opening a new window
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  With this, the download link will point to the direct download url, allowing to download without opening the pop window.
// @include      *://coolrom.com/roms/*
// @include      *://www.coolrom.com/roms/*
// @run-at       document-start
// @grant        unsafeWindow
// ==/UserScript==
/*global unsafeWindow, document, window*/

(function() {
    'use strict';
    var appendInterval, iframeInterval, iframe, id, setTime, downloadUrl;

    id = window.location.pathname.split('/')[3];
    iframe = document.createElement('iframe');
    iframe.style = 'display:none';
    iframe.src = '/dlpop.php?id=' + id;

    appendInterval = setInterval(function () {
        if (document.body) {
            document.body.appendChild(iframe);
            clearInterval(appendInterval);
        }
    }, 1);

    iframeInterval = setInterval(function () {
        var links, input;

        if (iframe.contentWindow && !setTime) {
            Object.defineProperty(iframe.contentWindow, 'time', {value: 0});
            setTime = true;
        }

        input = iframe.contentDocument && iframe.contentDocument.getElementsByTagName('input')[0];
        if (input) {
            clearInterval(iframeInterval);
            downloadUrl = input.parentNode.action;
            links = document.querySelectorAll('a[href*="/dlpop.php"]');
            Array.prototype.forEach.call(links, function (a) {
                a.href = downloadUrl;
            });
            iframe.src = 'about:blank';
        }
    }, 1);


    Object.defineProperty(unsafeWindow, 'open', {value: function (url) {
        var inter;
        if (url.substr(0, 10) === '/dlpop.php') {
            inter = setInterval(function () {
                if (downloadUrl) {
                    window.location = downloadUrl;
                    clearInterval(inter);
                }
            }, 10);
        } else {
            window.location = url;
        }
        return true;
    }});

}());

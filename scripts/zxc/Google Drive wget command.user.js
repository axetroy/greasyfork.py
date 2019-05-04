// ==UserScript==
// @name         Google Drive wget command
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://drive.google.com/file/d/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @grant        GM_setClipboard
// ==/UserScript==

(function() {
    'use strict';
    var url_parttens = window.location.href.split('/');
    var file_id = url_parttens[url_parttens.length - 2]
    var file_name = jQuery("meta[property='og:title']").attr("content");
    var command = `wget --load-cookies cookies.txt "https://docs.google.com/uc?export=download&confirm=$(wget --quiet --save-cookies cookies.txt --keep-session-cookies --no-check-certificate 'https://docs.google.com/uc?export=download&id=${file_id}' ` + "-O- | sed -rn 's/.*confirm=([0-9A-Za-z_]+).*/\\1\\n/p')&id=" + `${file_id}" -O ${file_name} && rm -rf cookies.txt`;
    GM_setClipboard(command);
    alert('下载命令（wget）已复制到剪切板。')
   })();
// ==UserScript==
// @name         Google Drive Auto Download (without preview)
// @namespace    https://greasyfork.org/en/users/223360
// @version      1.0.0
// @description  Auto download files from Google Drive without preview.
// @author       Zennar
// @match        https://drive.google.com/file/d/*
// @match        https://drive.google.com/uc?id=*
// @grant        none
// @icon         https://ssl.gstatic.com/docs/doclist/images/infinite_arrow_favicon_4.ico
// @run-at       document-start
// ==/UserScript==vvar thisUrl = document.location.href;

var thisUrl = document.location.href;
if (thisUrl.substr(0,32)=="https://drive.google.com/file/d/" ){
    thisUrl = thisUrl.replace('file/d/', 'uc?id=');
    thisUrl = thisUrl.replace('/view', '&export=download');
    window.location.href = thisUrl;
}else{
    var dlbtn = document.getElementById('uc-download-link');
    if (dlbtn.href.length > 0) {
        dlbtn.click();
    }
}
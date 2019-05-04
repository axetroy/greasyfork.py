// ==UserScript==
// @name         arXiv Redirect and Rename
// @include      https://arxiv.org/*
// @version      0.7
// @description  Slove the "Access Denied" problem in arXiv
//               And rename the download pdf
// @author       Daqing Liu

// @date         2018.02.10

// @namespace    http://liudaqing.top
// ==/UserScript==

// fork from EvanL00
var dow = function() {
    'use strict';
    // find the title
    var title = document.getElementsByClassName("title mathjax")[0].innerText;
    //find where to put the tag
    var loc = document.getElementsByClassName("full-text")[0].getElementsByTagName('ul');
    var obj = document.createElement("li");
    //get the pdf url
    var url = document.getElementsByClassName("full-text")[0].getElementsByTagName('a')[0].href;
    //var getUrlHttp = new XMLHttpRequest();
    //getUrlHttp.open('GET', url, true);
    //getUrlHttp.send(null);
    //var res = getUrlHttp.responseText;
    //var myRex = /(http:\/\/ieee[^"]+)/;
    //var pdfurl = res.match(myRex)[0];
    var pdfurl = url;
    //var fileName = title.toString().replace(':', '--') + '.pdf';
    var fileName = document.title.replace(/\.\d*/, '') + '.pdf';
    obj.innerHTML = '<a download='+ '"'+ fileName + '"' + ' href=' + pdfurl +'>Save as PDF</a>';
    //loc.insertBefore(obj, loc.childNodes[0]);
    loc[0].insertBefore(obj, loc[0].childNodes[0]);
};
dow();


var rename = function() {
    var content;
    var CheckStr = 'Access Denied';
    var IsRedirect = false;
    
    str = document.getElementsByTagName('h1');
    
    var i;
    for (i = 0; i < str.length; i++) {
        content = str[i].innerText;
        if(content.indexOf(CheckStr) != -1){
            IsRedirect = true;
        }
    }
    
    if(IsRedirect){
        var url = window.location.toString();
        window.location = url.replace('https://arxiv.org/', 'http://cn.arxiv.org/');
    }
};
rename();
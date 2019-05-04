// ==UserScript==
// @name         Trollvids
// @namespace    Trollvids_叶海晨星
// @version      0%
// @description  Trollvids视频下载
// @author       叶海晨星     
// @include      *://trollvids.com/video/*
// @icon         http://trollvids.com/favicon.ico
// ==/UserScript==

function loadXML(xmlFile) {
    "use strict";
    var xmldoc;
    var xmlhttp = new window.XMLHttpRequest();
    xmlhttp.open("GET", xmlFile, false);
    xmlhttp.send(null);
    if (xmlhttp.readyState === 4) {
        xmldoc = xmlhttp.responseXML.documentElement;
    }
    return xmldoc;
}
//==================================================
var objectid = document.querySelector("input#objectid").value;
if (objectid >= 1) {
    var xmldoc = loadXML("http://trollvids.com/nuevo/player/config.php?v=" + objectid);
    if (xmldoc !== null) {
        if (xmldoc.innerHTML.indexOf("/files/videos/no_video.") > 0) return;
        var file = xmldoc.getElementsByTagName("file")[0].innerHTML;
        var filehd = xmldoc.getElementsByTagName("filehd")[0].innerHTML;
    }

    var objectid2 = document.querySelector("div.actions");
    objectid2 = objectid2.querySelector("ul");
    objectid2.innerHTML = objectid2.innerHTML + "<li></li>";
    objectid2 = objectid2.querySelectorAll("li");
    objectid2.item(3).innerHTML = "<a href=\"" + file + "\" style=\"color:red;font-size: 1px;\">标清</a>";
    objectid2.item(4).innerHTML = "<a href=\"" + filehd + "\" style=\"color:red;font-size: 1px;\">原画</a>";
}
// ==UserScript==
// @version 5.1.2.2
// @name Remover
// @namespace https://greasyfork.org/scripts/4612
// @description	With this Script you can edit every Website.
// @description:de Mit diesem Skript können sie jede beliebige Website bearbeiten.
// @author Scriptz
// @copyright 2013+ , Scriptz
// @include *://*
// @icon http://file1.npage.de/007324/77/bilder/favicon.ico
// @priority 9999
// @grant unsafeWindow
// @grant GM_xmlhttpRequest
// @grant GM_notification
// @connect *
// @supportURL mailto:scriptz@mail1a.de?subject=Remover
// @license Creative Commons Attribution-NonCommercial-NoDerivs 3.0 Unported License; http://creativecommons.org/licenses/by-nc-nd/3.0/
// @noframes
// @contributionURL https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=joshua.sch98@gmail.com&item_name=Greasyfork:+Remover&amount=5.5
// @contributionAmount $5,50
// ==/UserScript==

// ==META==
GM_xmlhttpRequest({
    method: 'GET',
    url: GM_info.script.namespace + "/code.meta.js",
    onload: function(readMeta) {
        unsafeWindow.getMeta = function() {
            var metaCode = readMeta.response;
            if (metaCode.indexOf(GM_info.script.version) > -1) { // nothing
            } else {
                var metaVersionCode = metaCode.substring(metaCode.indexOf(GM_info.script.version) + 31, +37);
                if (metaVersionCode > GM_info.script.version) {
                    console.warn("Please download version " + metaVersionCode + " " + GM_info.script.namespace + "/code.user.js");
                    GM_notification({
                        title: "Update",
                        text: "Please download version " + metaVersionCode,
                        onclick: function() {location.href=GM_info.script.namespace + "/code.user.js";},
                    });
                }
            }
        };
    }
});
// ==============

// ==VAR==
var jslink = "javascript";
var start = "<div id='button'><a href='javascript:on()'>Start</a></div>";
var work = "<a onMouseout='off()'>" + GM_info.script.name + " v" + GM_info.script.version + " is on!</a><span>   <--- Mouseover to Stop.</span>";
// ==============

// ==START FUNCTION==
body = document.body;
if (body !== null) {
    div1 = document.createElement("div");
    div1.setAttribute('id', 'first');
    div1.style.position = "fixed";
    div1.style.top = "0px";
    div1.style.right = "0px";
    div1.style.zIndex = "9999";
    div1.style.backgroundColor = "red";
    div1.style.opacity = 0.90;
    div1.style.border = "1px solid #ffffcc";
    div1.style.padding = "3px";
    div1.innerHTML = start;
    body.appendChild(div1);
}
unsafeWindow.on = function() {
    getMeta();
    location.href = jslink + ":document.body.contentEditable='true'; document.designMode='on'; void 0";
    document.getElementById("hide").style.visibility = "visible";
    document.getElementById("first").style.left = "0px";
    document.getElementById('button').innerHTML = work;
    document.title = "► " + GM_info.script.name + " v" + GM_info.script.version + " is on!";
    var link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = GM_info.script.icon;
    document.getElementsByTagName('head')[0].appendChild(link);
    console.info(GM_info.script.name + " v" + GM_info.script.version + " is on!\nCopyright: " + GM_info.script.copyright);
    console.warn(GM_info.script.name + " by " + GM_info.script.author + " is licensed under a [Creative Commons Attribution-NonCommercial-NoDerivs 3.0 Unported License](http://creativecommons.org/licenses/by-nc-nd/3.0/).");
};
// ==============

// ==HIDE BUTTON==
body = document.body;
if (body !== null) {
    div2 = document.createElement("div");
    div2.setAttribute('id', 'hide');
    div2.style.position = "fixed";
    div2.style.top = "40px";
    div2.style.right = "0px";
    div2.style.zIndex = "9999";
    div2.style.opacity = 0.90;
    div2.style.visibility = "hidden";
    div2.innerHTML = "<img onMouseout='hideload()' src='http://fs2.directupload.net/images/150909/sxcclyoz.png'>";
    body.appendChild(div2);
}
unsafeWindow.hideload = function() {
    document.getElementById("hide").style.visibility = "hidden";
    document.getElementById("first").style.visibility = "hidden";
    document.getElementById("show").style.visibility = "visible";
    console.debug(GM_info.script.name + " toolbar is hidden!");
};
// ==============

// ==SHOW BUTTON==
body = document.body;
if (body !== null) {
    div3 = document.createElement("div");
    div3.setAttribute('id', 'show');
    div3.style.position = "fixed";
    div3.style.top = "0px";
    div3.style.right = "0px";
    div3.style.zIndex = "9999";
    div3.style.opacity = 0.90;
    div3.style.visibility = "hidden";
    div3.innerHTML = "<img onMouseout='showload()' src='http://fs2.directupload.net/images/150909/7tae9l8k.png'>";
    body.appendChild(div3);
}
unsafeWindow.showload = function() {
    document.getElementById("show").style.visibility = "hidden";
    document.getElementById("first").style.visibility = "visible";
    document.getElementById("hide").style.visibility = "visible";
    console.debug(GM_info.script.name + " toolbar is visible!");
};
// ==============

// ==STOP FUNCTION==
unsafeWindow.off = function() {
    location.href = jslink + ":document.body.contentEditable='false'; document.designMode='off'; void 0";
    document.getElementsByTagName("title")[0].firstChild.data = GM_info.script.name + " is off!";
    console.info(GM_info.script.name + " is off!");
    document.getElementById('button').innerHTML = "<span>" + GM_info.script.name + " is off!</span>";
    document.getElementById('first').style.left = null;
    document.getElementById('first').style.right = "0px";
};
// ==============
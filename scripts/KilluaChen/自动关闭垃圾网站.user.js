// ==UserScript==
// @name         自动关闭垃圾网站
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @grant        none
// ==/UserScript==

function loadScript(url) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.body.appendChild(script);
}

function loadStyles(url) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
}

(function() {
    'use strict';
    loadScript("//cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.js");
    loadStyles("//cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.css");
    setInterval(function(){
        if( typeof sweetAlert === 'function' ){
            swal({
                title: "<font style='color:#FF3030'>Auto Closed !!!</font>",
                text: "This is a garbage site !!!",
                timer: 2000,
                showConfirmButton: false ,
                html: true
            });
            setTimeout(function(){
                window.close();
            },500);
            return false;
        }
    },10);
})();
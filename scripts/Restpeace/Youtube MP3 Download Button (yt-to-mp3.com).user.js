// ==UserScript==
// @name       Youtube MP3 Download Button (yt-to-mp3.com)
// @version    1.000
// @description Adds a button [MP3 Download], to download music from YouTube through service vidtomp3.com
// @author     Restpeace
// @copyright  2017.12.07, Restpeace
// @namespace https://greasyfork.org/users/8668
// @compatible chrome
// @compatible firefox
// @compatible opera
// @compatible safari
// @include      http*://*.youtube.com/*
// @include      http*://youtube.com/*
// @include      http*://*.youtu.be/*
// @include      http*://youtu.be/*
// @run-at       document-end
// ==/UserScript==

function go() {
    start();
}

window.addEventListener('spfdone', go, false);
window.addEventListener('DOMContentLoaded', go, false);
window.addEventListener('yt-navigate-finish', go, false);

function start() {
    function isMaterial() {
        var temp;
        temp = document.querySelector("ytd-app, [src*='polymer'],link[href*='polymer']");
        if (!temp) { // old UI
            var urldl = window.location.href;
            if(str.indexOf("youdl") < 0){
            temp = document.createElement("template");
            temp.innerHTML = //
                `<div id='material-notice' style='border-radius:2px;color:#FFF;padding:10px;background-color:#ff0000;box-shadow:0 0 3px rgba(0,0,0,.5);font-size:18px;position:fixed;bottom:20px;right:50px;z-index:99999'>
				<strong><ins>WARNING : </ins></strong>This script is <B>Only compatible with the new YouTube Material Layout</B><br>
				<a href='https://youtube.com/new' target='_blank' style='font-weight:bold;'>Click here</a> to activate the new YouTube Material Layout.<br>
				<br/><br/>
				<span id='close' onclick='document.getElementById("material-notice").remove(); return false;' align='center' STYLE='display:block;width:100px;height: 100%;margin: 0 auto;'><strong><ins><a href=""> [X] CLOSE </a></ins></strong></span>
				</div>`;
            document.documentElement.appendChild(temp.content.firstChild);
            document.documentElement.removeAttribute("data-user_settings");
            return true;
            }
        }
    }
    isMaterial();
    var lasturl = "";

    function check() {
        if (location.href == lasturl) return;
        lasturl = location.href;
        if (lasturl.indexOf("watch?v=")) removeframe();
    }
    setInterval(check, 1000);

    bvd2_btn_onclick = function() {
        var url = window.location.href;
        var myHosts = 'https://www.yt-to-mp3.com/watch?v='+url;
        window.open(myHosts);
    };

    getSpan = function(text, className) {
        var _tn = document.createTextNode(text);
        var span = document.createElement("span");
        span.className = className;
        span.appendChild(_tn);
        return span;
    };

    createButton = function() {
        var obj = document.querySelector('#top-row>#subscribe-button');
        if (obj !== null) {
            // check if the button has already been created
            var btnRow = document.getElementById('bestvd2');
            if (btnRow === null) {
                var bestvd2 = document.createElement("div");
                bestvd2.id = "bestvd2";
                bestvd2.className = "style-scope";

                var bvd2_btn = document.createElement("div");
                bvd2_btn.className = "style-scope bvd2_btn";

                bvd2_btn.style = "background-color: green; border: solid 2px green; border-radius: 2px; color: white; padding: 0px 15px; font-size: 14px; cursor:pointer; height:33px;margin-right: 7px;margin-top: 7px;line-height: 33px;font-weight: 500; display:inline-block;";

                bvd2_btn.appendChild(getSpan("Yt-to-Mp3 Download", ""));
                bvd2_btn.onclick = bvd2_btn_onclick;

                obj.parentNode.insertBefore(bestvd2, obj);
                bestvd2.appendChild(bvd2_btn);
            }
        }
    };
    var intervalCheck = setInterval(function() {
        createButton();
    }, 250);
}
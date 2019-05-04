// ==UserScript==
// @name         Amazon URL Shortener
// @namespace    http://littlefinix.net/
// @version      0.3
// @description  Adds an option for amazon to copy a shortened link to the clipboard, available under 'Share'.
// @author       Littlefinix
// @include      /^https?:\/\/(www.)?amazon.*/dp/.*
// @grant        GM_setClipboard
// ==/UserScript==

var isCopyInfoOpen = false;

(function()
{
    'use strict';

    var info = document.createElement("div");
    info.innerHTML = "<span style=\"background: limegreen; color: white; padding: 0.5em;\">Copy Successfull!</span>";

    var link = document.createElement("a");
    link.innerText = "Copy URL";
    link.onclick = function (e)
    {
        var matches = /((?:.*)amazon.(?:\w+))\/(?:.*)?dp\/([^\/]+)\/?(?:.*|$)/.exec(document.URL);

        if (matches === null)
        {
            alert("Could not copy link.\nYou may need to update the script");
            return;
        }

        GM_setClipboard(matches[1] + "/dp/" + matches[2], "text");

        if(isCopyInfoOpen)
            return;

        isCopyInfoOpen = true;

        document.querySelector("#tell-a-friend").appendChild(info);

        setTimeout(function () {
            isCopyInfoOpen = false;
            info.parentElement.removeChild(info);
        }, 1000);
    };

    document.querySelector("#tell-a-friend").appendChild(link);
})();
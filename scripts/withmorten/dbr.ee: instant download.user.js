// ==UserScript==
// @name        dbr.ee: instant download
// @namespace   mailto:morten.with@gmail.com
// @locale      en
// @include     *dbr.ee*
// @version     1.4
// @run-at      document-start
// @grant       none
// @description creates a direct download button on dbr.ee and clicks it
// ==/UserScript==

(function()
{
'use strict';

function in_array(needle, haystack)
{
    var length = haystack.length;
    for(var i = 0; i < length; i++)
    {
        if(haystack[i] == needle) return true;
    }
    return false;
}

var fileid = window.location.href.split("/").slice(-1)[0];
var ignoreurls =
[
    "",
    "help",
    "dmca",
];

if(!in_array(fileid, ignoreurls) && fileid.length == 4)
{
    document.addEventListener("DOMContentLoaded", waitForDLButton);
}

function doEverything(btn)
{
    var newbtnform = document.createElement("form");
    newbtnform.setAttribute("class", "button_to");
    newbtnform.setAttribute("method", "get");
    newbtnform.setAttribute("action", "/"+fileid+"/d");

    var newbtnspan = document.createElement("span");
    newbtnspan.setAttribute("class", "icon-download");

    var newbtn = document.createElement("button");
    newbtn.setAttribute("class", "btn btn--block");
    newbtn.setAttribute("title", "Direct Download");
    newbtn.setAttribute("data-disable-with", "Downloading...");
    newbtn.setAttribute("type", "submit");
    newbtn.innerHTML = "&nbsp;DOWNLOAD";

    newbtn.insertBefore(newbtnspan, newbtn.childNodes[0]);
    newbtnform.appendChild(newbtn);

    var btnparent = btn.parentElement;
    btn.remove();
    btnparent.appendChild(newbtnform);

    newbtnform.submit();
}

function waitForDLButton()
{
    var spinner = document.getElementsByClassName("spinner");

    if(spinner.length > 0)
    {
        doEverything(spinner[0].parentElement);
    }
    else
    {
        setTimeout(waitForDLButton, 100);
    }
}
})();

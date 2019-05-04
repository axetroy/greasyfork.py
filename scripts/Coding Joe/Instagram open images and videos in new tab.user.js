// ==UserScript==
// @name         Instagram open images and videos in new tab
// @namespace    InstagramMedia
// @version      0.1
// @description  Provides a context menu option to open instagram full res images and videos in a new tab
// @author       codingjoe
// @match        *.instagram.com/*
// @grant        GM_openInTab
// @run-at       document-end
// ==/UserScript==

var icon = "https://www.instagram.com/favicon.ico";

// build the context menu
var menu = document.body.appendChild(document.createElement("menu"));

Object.assign(menu, {
    id: "userscript-open-media",
    type: "context"
});

var menuitem = document.createElement("menuitem");

Object.assign(menuitem, {
    id: "OpenMediaTab",
    icon: icon,
    label: "Open media in new tab"
});

menu.appendChild(menuitem);

// if the Open video in new tab menu item is clicked
menuitem.addEventListener("click", function (e) {
    // open the media file in new tab
    GM_openInTab(e.target.getAttribute("mediaURI"));
}, true);

function SetMediaURI(mediaURI) {
    console.log("media source uri: " + mediaURI);
    document.querySelector("#OpenMediaTab").setAttribute("mediaURI", mediaURI);
}

// the user invoked the context menu
function InitMediaCtx(e) {
    // grab img element under mouse cursor
	var mediaSrc;
    var mediaParent = e.target.parentNode;

    // determine media type
    var mediaType = mediaParent.querySelector("video") || mediaParent.querySelector("img");

    if (mediaType !== null) {
        mediaSrc = mediaType.src;
    }

    // add the userscript context menu
    // to the browser's context menu
    document.body.setAttribute("contextmenu", "userscript-open-media");

    if (mediaSrc) {
        SetMediaURI(mediaSrc);
    } else {
        document.body.removeAttribute("contextmenu");
    }
}

// prevent modal popup of media, otherwise menu item will not work
function handleEventAttachment() {
    document.querySelectorAll("a:not([data-event-reload='true'])").forEach(function (link) {
        link.setAttribute("data-event-reload","true");
        link.onclick = function (e) {
            window.setTimeout(function () {
                if (window.location.href.indexOf("instagram.com/p/") > 0) {
                    location.reload();
                }
            }, 300);
        };
    });
}

document.body.addEventListener("contextmenu", InitMediaCtx, false);

(function () {
    var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);
            handleEventAttachment();
        }
    }, 10);

    document.onscroll = handleEventAttachment;
})();
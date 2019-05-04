// ==UserScript==
// @id             FeedlyautopreviewmodMod
// @name           Feedly Autopreview All Items
// @version        1.0.9
// @description    Automatically opens the preview slider for all items by clicking on title/image of story.
// @include        http://feedly.com/*
// @namespace https://greasyfork.org/users/4819
// ==/UserScript==

function transformAnchors() {
    //get every anchor node
    var anchornodes = document.getElementsByTagName("div");
    //transform every anchor
    for (var i=0; i<anchornodes.length; ++i){
        //grab the current anchor node
        anchornode = anchornodes[i];
        //ignore erroneous nodes with no parent
        if (anchornode.getAttribute("class") == "entry unread u0 density-29") {
        		anchornode.setAttribute("data-page-entry-action", "previewEntry");
        }
        if (anchornode.getAttribute("class") == "entry unread u2 density-29") {
        		anchornode.setAttribute("data-page-entry-action", "previewEntry");
        }
        if (anchornode.getAttribute("class") == "entry unread u3 density-29") {
        		anchornode.setAttribute("data-page-entry-action", "previewEntry");
        }
        if (anchornode.getAttribute("class") == "entry unread u4 density-29") {
        		anchornode.setAttribute("data-page-entry-action", "previewEntry");
        }
        if (anchornode.getAttribute("class") == "entry unread u5 density-29") {
        		anchornode.setAttribute("data-page-entry-action", "previewEntry");
        }
        if (anchornode.getAttribute("class") == "entry unread u6 density-29") {
        		anchornode.setAttribute("data-page-entry-action", "previewEntry");
        }
        if (anchornode.getAttribute("class") == "visual-overlay") {
        		anchornode.setAttribute("data-page-entry-action", "previewEntry");
        }
        if (anchornode.getAttribute("class") == "visual") {
        		anchornode.setAttribute("data-page-entry-action", "previewEntry");
        }
    }
}

document.addEventListener("DOMNodeInserted", transformAnchors, true);
// ==UserScript==
// @name            [ALL] Block Right & Middle Mouse Button Click Hijacking
// @author
// @description     Block mouse button click hijacking.
// @downloadURL
// @grant
// @homepageURL     https://bitbucket.org/INSMODSCUM/userscripts-scripts/src
// @icon
// @include         http*://*
// @namespace       insmodscum 
// @require
// @run-at          document-start
// @updateURL
// @version         1.0
// ==/UserScript==

// block right click

unsafeWindow.document.oncontextmenu = null;
unsafeWindow.document.oncontextmenu = false;
document.body.removeAttribute ("oncontextmenu");

// block middle mouse 
// source: https://greasyfork.org/en/scripts/12434-prevent-middle-click-hijacking/code

function handler(e){
    if(e.button == 1 || (e.button === 0 && e.ctrlKey)){
        e.stopPropagation();
    }
}

addEventListener('click', handler, true);
addEventListener('mousedown', handler, true);
addEventListener('mouseup', handler, true);
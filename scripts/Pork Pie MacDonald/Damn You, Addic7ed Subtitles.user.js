// ==UserScript==
// @name         Damn You, Addic7ed Subtitles
// @namespace    http://biznatch.nonayours.info/
// @version      0.2
// @description  There is a fucked up download manager on addic7ed.com. 
// @author       Pencil Pusher O'Leary
// @match        http://www.addic7ed.com/serie/*
// @grant        none
// ==/UserScript==

var FuckYouUp=function(target) {

    a=document.querySelectorAll('.dmCheckbox>input')
    for (var i=0;i<a.length;i++){
        a[i].checked=false
        a[i].parentNode.parentNode.removeChild(a[i].parentNode)
    }
    
}

document.relatedNode=document
FuckYouUp(document)

document.addEventListener("DOMNodeInserted", FuckYouUp, false);
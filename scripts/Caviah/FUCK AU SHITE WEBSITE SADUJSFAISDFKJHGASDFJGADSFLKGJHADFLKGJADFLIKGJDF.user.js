// ==UserScript==
// @name         FUCK AU SHITE WEBSITE SADUJSFAISDFKJHGASDFJGADSFLKGJHADFLKGJADFLIKGJDF
// @namespace    https://theartistunion.com/*
// @version      0.1
// @description  DO I FUCKING LOOK LIKE I NEED YOUR FUCKING YOUTUBE SHIT!?
// @author       You
// @match        https://theartistunion.com/*
// @grant        none
// @run-at       document-body
// ==/UserScript==

function append(s) {     
      document.head.appendChild(document.createElement('script'))
             .innerHTML = s.toString().replace(/^function.*{|}$/g, '');
}

function FUCKAU() {
    setInterval(function (){
       var fuck = document.getElementsByTagName("iframe");
        if (fuck.length > 0) {
           fuck[0].outerHTML = ""; 
        }
    }, 50);
}

append(FUCKAU);
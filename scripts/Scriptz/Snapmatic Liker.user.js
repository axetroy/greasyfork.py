// ==UserScript==
// @icon	https://cdn.sc.rockstargames.com/favicon.ico
// @name         Snapmatic Liker
// @namespace    http://scriptz.de.to/
// @version      0.0.0.2
// @description  Auto Liker (Hit the ‘L’ key to start and 'Up Arrow' to stop)
// @author       Scriptz
// @include        *://*socialclub.rockstargames.com/games/gtav/*/snapmatic*
// @grant        unsafeWindow
// @copyright	2016+ , Scriptz
// @noframes
// @supportURL mailto:scriptz@mail1a.de?subject=Snapmatic Liker
// @license Creative Commons Attribution-NonCommercial-NoDerivs 3.0 Unported License; http://creativecommons.org/licenses/by-nc-nd/3.0/
// ==/UserScript==

// ==L==
document.onkeydown= openPage ;
function openPage(e) {
e= window.event ? event : e;
    if (e.keyCode == 76 ) {
        console.warn("Snapmatic Liker starts in 3 seconds");
         var start;
start = setTimeout(function(){console.warn("► Started.");}, 3000);
// ==============

// ==Code==
        var loop;
loop = setInterval(function(){
    setTimeout(function(){window.scrollTo(0,document.body.scrollHeight);console.log("\n");console.info("Loading the next set of photos ...");}, 1000);
    setTimeout(function(){document.getElementsByClassName("ps_like-icon scicon-thumbs-up interactive")[0].click();
    console.info("Photo liked!");console.debug("%c+1", "font-size: 2em;");
    document.getElementsByClassName("ps_like-icon scicon-thumbs-up interactive")[0].remove();}, 2000);
    }, 3000);
// ==Stop==
        unsafeWindow.stop = function() {
        clearTimeout(start);clearInterval(loop);console.warn('Snapmatic Liker Stopped');
        };
        }
        if (e.keyCode == 38 ) {
            unsafeWindow.stop();
        }
}
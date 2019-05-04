// ==UserScript==
// @name       FillyRadioChatFixer
// @namespace  http://github.com/joshumax
// @version    0.1
// @description Fixes the IRC chat bar on fillydelphia radio.
// @match      https://fillydelphiaradio.net/*
// @copyright  2012+, You
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

// Yes this userscript is ugly and probably broken,
// But I made it in <5 minutes and it works on my computer.
console.log("Fillyradio.com detected... Fixing broken IRC tab.");

// Remove old iframe
$("#ircpanel").find("iframe").remove();

// Insert modified iframe
$('#ircpanel').append('<iframe src="https://client.canternet.org/?nick=FR.&amp;channels=fillyradio&amp;prompt=1&amp;uio=d4" width="100%" height="95%"></iframe>')

// All done
console.log("Fillyradio.com IRC should work now :)");
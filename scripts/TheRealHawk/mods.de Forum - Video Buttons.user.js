// ==UserScript==
// @name          mods.de Forum - Video Buttons
// @description   Fügt der Toolbar zwei Buttons zum Einfügen von Videos hinzu
// @author        TheRealHawk
// @namespace     http://forum.mods.de
// @match         http://forum.mods.de/bb/newthread.php*
// @match         http://forum.mods.de/bb/newreply.php*
// @match         http://forum.mods.de/bb/editreply.php*
// @icon          https://i.imgur.com/wwA18B8.png
// @version       1.3
// @grant         GM_getResourceURL
// @require       https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @resource      buttonPlay https://i.imgur.com/2oFOpDA.png
// @resource      buttonPause https://i.imgur.com/jrTR7fd.png
// ==/UserScript==

function makeVideoPlay(form) {
    var url = window.prompt('URL zum Video (Autoplay): ', 'http://');
    if(url !== '' && url !== null)
        url = url.replace(/(https?:\/\/)(?:i\.)?(imgur.com\/)(?:gallery\/)?(\w{7})(?:\.\w+)?/i, "$1i.$2$3.mp4");
        return addText('[video play]'+url+'[/video]', form);
    makeFocus(form);
}

function makeVideoPause(form) {
    var url = window.prompt('URL zum Video (Pausiert): ', 'http://');
    if(url !== '' && url !== null)
        url = url.replace(/(https?:\/\/)(?:i\.)?(imgur.com\/)(?:gallery\/)?(\w{7})(?:\.\w+)?/i, "$1i.$2$3.mp4");
        return addText('[video]'+url+'[/video]', form);
    makeFocus(form);
}

form = document.forms[1];

var videoButtonPlay = $('<img>', {
    src: GM_getResourceURL('buttonPlay'),
    alt: "Video einfügen (Play)",
    click: function(){makeVideoPlay(form);}
});

var videoButtonPause = $('<img>', {
    src: GM_getResourceURL('buttonPause'),
    alt: "Video einfügen (Pause)",
    click: function(){makeVideoPause(form);}
});

$('img[alt="Durchstreichen"]').after(videoButtonPlay);
$('img[alt="Durchstreichen"]').after(videoButtonPause);

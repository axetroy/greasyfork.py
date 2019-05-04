// ==UserScript==
// @name          mods.de Forum - Navigation
// @description   Verbessert die Navigation innerhalb des Forums
// @author        TheRealHawk
// @namespace     http://forum.mods.de
// @match         http://forum.mods.de/bb/
// @match         http://forum.mods.de/bb/index.php
// @match         http://forum.mods.de/bb/thread.php*
// @match         http://forum.mods.de/bb/newthread.php*
// @match         http://forum.mods.de/bb/newreply.php*
// @match         http://forum.mods.de/bb/editreply.php*
// @icon          https://i.imgur.com/wwA18B8.png
// @version       1.7
// @require       https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @require       https://greasyfork.org/scripts/8984-jquery-hotkeys-plugin/code/jQuery%20Hotkeys%20Plugin.js
// ==/UserScript==

if ($(location).attr('pathname') == '/bb/thread.php'){
    $(document).bind('keydown', 'ctrl+left', function(){
        var href = $('a:contains("« erste"):first').attr('href');
        if (href){
            window.location.assign(href);
        }
    });

    $(document).bind('keydown', 'left', function(){
        var href = $('a:contains("« vorherige"):first').attr('href');
        if (href){
            window.location.assign(href);
        }
    });

    $(document).bind('keydown', 'right', function(){
        var href = $('a:contains("nächste »"):first').attr('href');
        if (href){
            window.location.assign(href);
        }
    });

    $(document).bind('keydown', 'ctrl+right', function(){
        var href = $('a:contains("letzte »"):first').attr('href');
        if (href){
            window.location.assign(href);
        }
    });

    $(document).bind('keydown', 'ctrl+up', function(){
        window.scrollTo(0, 0);
    });

    $(document).bind('keydown', 'ctrl+down', function(){
        window.scrollTo(0, document.body.scrollHeight);
    });

    if ($('a:contains("lesezeichen"):last').parent().text().match(/.*\+lesezeichen.*/)){
        $(document).bind('keydown', 'l', function(){
            eval('unsafeWindow.' + $('a:contains("lesezeichen"):last').attr('href').match(/setBookmark\(.*\)/));
        });
    }

    $(document).bind('keydown', 'i', function(){
        window.location.assign('http://forum.mods.de/bb/index.php');
    });

    $(document).bind('keydown', 'p', function(){
        window.location.assign($('a[href^="newreply.php"]').attr('href'));
    });
}

if ($('#bookmarklist').length){
    $(document).bind('keydown', 'l', function(){
        openLinks();
    });
}

$(document).bind('keydown', 'r', function(){
    window.location.reload();
});

$(document).bind('keydown', 'y', function(){
    window.location.reload();
});

$('textarea[name="message"]').bind('keydown', 'ctrl+return', function(){
    $('input[value="Eintragen"]').click();
});

content = $('meta[http-equiv="refresh"]').attr('content');
if (content){
    href = content.substring(content.indexOf('url=') + 4);
    window.location.assign(href);
}

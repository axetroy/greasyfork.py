// ==UserScript==
// @version         1.0.0
// @author        VeadarKin
// @name Backspace navigation fix
// @description Backspace navigation was removed from Chrome. Well let's fix it.
// @include *
// @icon http://i.imgur.com/opiNAGr.png
// @namespace https://greasyfork.org/users/49201
// ==/UserScript==

document.addEventListener('keydown', goMove);
function goMove(e) {
    var el = document.activeElement;
    if
        (
            (el &&
             (el.isContentEditable ||
              el.localName == 'input' && el.type.match(/^(text|color|date*|email|month|number|password|range|search|tel|time|url|week)$/) ||
              el.localName == 'textarea')
            )
        )
        return;
    {
        if(e.keyCode == 8 && e.shiftKey)
        {
            window.history.forward();
            return;
        }
        if(e.keyCode == 8)
        {
            window.history.back();
            return;
        }
    }
}
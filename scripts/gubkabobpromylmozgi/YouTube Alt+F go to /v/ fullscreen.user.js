// ==UserScript==
// @name       YouTube Alt+F go to /v/ fullscreen
// @namespace  http://idontknowwhattowritehere.org.net.com
// @version    2014-06-17
// @description  Make YouTube's player go /v/ fullscreen when pressing Alt+F
// @include http://www.youtube.com/watch?*
// @include https://www.youtube.com/watch?*
// @copyright ZAO "Roga & Kopyta"
// ==/UserScript==
function EnableFKey()
{
    var match = document.location.href.match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/)
    document.addEventListener('keypress', function (e) {
        if (e.altKey && (e.which == 102 || e.which == 70)) {
            //Alt + (f or F) key pressed?
            document.location.href = 'https://youtube.com/v/' + match[7]
        }
    });
}
document.addEventListener('DOMContentLoaded', function () {
    EnableFKey()
});
//document.addEventListener('DOMNodeInserted', function() { EnableFKey() }); //Inefficient, but whatever*/
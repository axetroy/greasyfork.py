// ==UserScript==
// @author        jawz
// @name       jawz CloseTabAsk
// @version    2.1
// @description  Don't close that tab! For Tinychat.
// @match      https://tinychat.com/turktime*
// @require     http://code.jquery.com/jquery-latest.min.js
// @copyright  2012+, You
// @namespace https://greasyfork.org/users/1997
// ==/UserScript==

window.onbeforeunload = function(e) {
    return 'You sure you want to leave us? :(';
};


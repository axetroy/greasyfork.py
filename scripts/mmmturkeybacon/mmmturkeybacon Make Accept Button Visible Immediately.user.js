// ==UserScript==
// @name        mmmturkeybacon Make Accept Button Visible Immediately
// @author      mmmturkeybacon
// @description This script makes the 'Accept HIT' button visible immediately so you can accept the HIT without waiting for the contents of the HIT to finish loading. 
// @namespace   http://userscripts.org/users/523367
// @match       https://www.mturk.com/mturk/preview?*
// @require     http://code.jquery.com/jquery-latest.min.js
// @version     1.0
// @grant       none
// ==/UserScript==

$('input[name="/accept"][src="/media/accept_hit.gif"]:first').parent().parent().css('display', 'block');
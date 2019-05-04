// ==UserScript==
// @name         Spotify Community temporarily unavailable bypass
// @namespace    SpotifyCommunityMaintenance
// @version      0.1
// @description  Remove "The Spotify Community is temporarily unavailable" and show the page
// @author       Tackyou
// @include      *://community.spotify.com*
// @license      https://raw.githubusercontent.com/Tackyou/SpotifyCommunityMaintenanceBypass/master/LICENSE
// @supportURL   https://github.com/Tackyou/SpotifyCommunityMaintenanceBypass/issues
// @grant        none
// ==/UserScript==

var check = setInterval(function(){
    var elem = $('.lia-quilt-column.lia-quilt-column-08.lia-quilt-column-right.lia-quilt-column-icons');
    if(elem.length>0){
        clearInterval(check);
        elem.remove();
    }
}, 100);

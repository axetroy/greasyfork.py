// ==UserScript==
// @name    WEBSTA - Auto Liker
// @namespace    http://scriptz.de.to/
// @description Hit the ‘L’ key to like posts
// @include    *://*websta.me/*
// @version 2.2.0.5
// @icon https://websta.me/assets/favicon.ico
// @author  Scriptz
// @copyright	2013+ , Scriptz
// @grant unsafeWindow
// @noframes
// @supportURL mailto:scriptz@mail1a.de?subject=WEBSTA - Auto Liker
// @license Creative Commons Attribution-NonCommercial-NoDerivs 3.0 Unported License; http://creativecommons.org/licenses/by-nc-nd/3.0/
// ==/UserScript==

document.onkeydown= openPage ;
function openPage(e) {
e= window.event ? event : e;
    if (e.keyCode == 76 ) {
    document.getElementsByClassName("fa fa-heart-o like-icon")[0].click();
    document.getElementsByClassName("fa fa-heart-o like-icon")[1].click();
    document.getElementsByClassName("fa fa-heart-o like-icon")[2].click();
    document.getElementsByClassName("fa fa-heart-o like-icon")[3].click();
    document.getElementsByClassName("fa fa-heart-o like-icon")[4].click();
    document.getElementsByClassName("fa fa-heart-o like-icon")[5].click();
    document.getElementsByClassName("fa fa-heart-o like-icon")[6].click();
    document.getElementsByClassName("fa fa-heart-o like-icon")[7].click();
    document.getElementsByClassName("fa fa-heart-o like-icon")[8].click();
    document.getElementsByClassName("fa fa-heart-o like-icon")[9].click();
    document.getElementsByClassName("fa fa-heart-o like-icon")[10].click();
    document.getElementsByClassName("fa fa-heart-o like-icon")[11].click();
    document.getElementsByClassName("fa fa-heart-o like-icon")[12].click();
    document.getElementsByClassName("fa fa-heart-o like-icon")[13].click();
    document.getElementsByClassName("fa fa-heart-o like-icon")[14].click();
    document.getElementsByClassName("fa fa-heart-o like-icon")[15].click();
    document.getElementsByClassName("fa fa-heart-o like-icon")[16].click();
    document.getElementsByClassName("fa fa-heart-o like-icon")[17].click();
    document.getElementsByClassName("fa fa-heart-o like-icon")[18].click();
    document.getElementsByClassName("fa fa-heart-o like-icon")[19].click();
    document.getElementsByClassName("fa fa-heart-o like-icon")[20].click();
}
}
// ==UserScript==
// @name           See more without logging into Facebook
// @namespace      https://greasyfork.org/en/scripts/21627
// @description    This script allows you to see more without logging into Facebook.

// @include        *.facebook.*/*
// @run-at         document-end

// @author         LeoNeeson (my own fork/clone of lukie80 version, all credits to him)
// @copyright      Creative Commons Attribution-ShareAlike 3.0 Unported (CC-BY-SA 3.0)
// @license        http://creativecommons.org/licenses/by-sa/3.0/
// @version        1.6
// @lastupdated    2017.10.10
//
// ==/UserScript==
//-------------------------------------------------------------------------------------------------------------------

// Please keep in mind this script is mostly intended to users who doesn't use Facebook logged in!

var css = "#headerArea div#u_0_0, #headerArea div#u_0_1, #headerArea div#u_0_3, #pagelet_growth_expanding_cta { display: none !important; }";
// Temporarily removed: #dialog_0.pop_dialog, #pagelet_loggedout_sign_up, #pagelet_bluebar,

if (typeof GM_addStyle != "undefined") {
    GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
    addStyle(css);
} else {
    var heads = document.getElementsByTagName("head");
    if (heads.length > 0) {
        var node = document.createElement("style");
        node.type = "text/css";
        node.appendChild(document.createTextNode(css));
        heads[0].appendChild(node);
    }
}

if (document.getElementById('pagelet_growth_expanding_cta')){
  document.getElementById('pagelet_growth_expanding_cta').remove();
}
if (document.getElementById('pagelet_page_above_header')){
  document.getElementById('pagelet_page_above_header').remove();
}
if (document.getElementsByClassName('_5hn6')[0]){
  document.getElementsByClassName('_5hn6')[0].remove();
}
if (document.getElementById('u_jsonp_2_2a')){
  document.getElementById('u_jsonp_2_2a').remove();
}
if (document.getElementById('u_0_4u')){
  document.getElementById('u_0_4u').remove();
}
if (document.getElementById('u_0_5a')){
  document.getElementById('u_0_5a').remove();
}
if (document.getElementById('u_0_1')){
  document.getElementById('u_0_1').remove();
}
// if (document.getElementById('u_0_6')){
//   document.getElementById('u_0_6').remove();
// }

// Old function:
// setInterval(function() {
//     var elem = document.getElementsByClassName("_5hn6")[0];
//     elem.parentElement.removeChild(elem);
// }, 1000);

setInterval(function() {
    var elem = document.getElementsByClassName("_5hn6")[0];
    if(typeof elem != "undefined") elem.parentElement.removeChild(elem);
    elem = document.getElementsByClassName("pop_dialog")[0];
    if(typeof elem != "undefined") elem.parentElement.removeChild(elem);
}, 1000);

//-------------------------------------------------------------------------------------------------------------------
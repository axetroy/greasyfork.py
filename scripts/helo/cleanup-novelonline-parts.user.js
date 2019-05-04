// ==UserScript==
// @name        cleanup-novelonline-parts
// @include     http://novelonlinefree.info/*
// @description hide some parts
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @grant       GM_addStyle
// @version 0.0.1.20170730113913
// @namespace https://greasyfork.org/users/145011
// ==/UserScript==

var hide_elem = ["div.lem_bem_top","div.lem_bem","div.new_update_trangdoc","div.lam_nham_chapter","div#footer"];
for (var i = 0; i < hide_elem.length; i++) {
    $(hide_elem[i]).hide();
}


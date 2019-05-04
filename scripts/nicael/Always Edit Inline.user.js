// ==UserScript==
// @name         Always Edit Inline
// @version      1.0
// @description  Adds an ability to lauch inline editor, which is used by  >2k users by default
// @author       nicael
// @include        *://*.stackexchange.com/questions/*
// @include        *://*stackoverflow.com/questions/*
// @include        *://*serverfault.com/questions/*
// @include        *://*superuser.com/questions/*
// @include        *://*askubuntu.com/questions/*
// @include        *://*stackapps.com/questions/*
// @grant        none
// @namespace    https://greasyfork.org/users/9713
// ==/UserScript==

$(".suggest-edit-post").removeClass("suggest-edit-post").addClass("edit-post");StackExchange.using("inlineEditing", function () {StackExchange.inlineEditing.init();});
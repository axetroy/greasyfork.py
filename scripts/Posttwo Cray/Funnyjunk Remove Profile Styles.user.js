// ==UserScript==
// @name        Funnyjunk Remove Profile Styles
// @namespace   Posttwo
// @description REMOVES THE FUCKING PROFILE STYLES
// @include     *funnyjunk.com/user/*
// @version     4
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==
$(document).ready(function ()
{
        $("<input>",
		{
			value: "Remove CSS",
			type: "button",
     	    id: "removeCSS",
		}).appendTo("#profile > .title > .contentTitle");
    $('#removeCSS').click(function() {
        $('style:eq( 3 )').remove();
                 });
});
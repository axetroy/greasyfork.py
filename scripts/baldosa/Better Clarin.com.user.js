
// ==UserScript==
// @name     Better Clarin.com
// @description Hace Clarín un mejor diario.
// @version   1
// @include  https://www.clarin.com/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant    GM_addStyle
// @namespace https://greasyfork.org/users/2219
// ==/UserScript==
//--- The @grant directive is used to restore the proper sandbox.

$("body").append ( `
	<iframe class="ytfloat" width="320" height="240" src="https://www.youtube.com/embed/oIscL-Bjsq4?&autoplay=1&rel=0&amp;controls=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
` );
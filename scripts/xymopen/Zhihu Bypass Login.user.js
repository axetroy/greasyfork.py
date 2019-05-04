// ==UserScript==
// @name				Zhihu Bypass Login
// @name:zh-CN			Zhihu Bypass Login
// @namespace			xuyiming.open@outlook.com
// @author				依然独特
// @description			解除知乎强制登录
// @description:zh-CN	解除知乎强制登录
// @version				0.0.5
// @run-at				document-body
// @require				https://greasyfork.org/scripts/18715-hooks/code/Hooks.js?version=126794
// @include				*://*.zhihu.com/*
// @match				*://*.zhihu.com/*
// @grant				none
// @license				CC-BY-4.0
// ==/UserScript==

"use strict";

Hooks.get( window, "__z_z__", function( target, propertyName, oldValue, newValue ) {
	var e = document.querySelector( "script.json-inline[data-name='current_user']" ), currentUser;

	if ( e ) {
		currentUser = JSON.parse( e.innerHTML );

		if ( "-1" === currentUser[ 3 ] ) {
			currentUser[ 3 ] = "0";
			e.innerHTML = JSON.stringify( currentUser );
		}
	}

	return Hooks.Reply.get( arguments );
} );
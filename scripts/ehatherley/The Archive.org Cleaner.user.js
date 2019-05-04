// ==UserScript==
// @name	The Archive.org Cleaner
// @description	Archive.org Remove Money Request banner
// @namespace	http://userscripts.org/users/torin
// @include	*web.archive.org*
// @include	*wayback.archive.org*
// @version	1.1
// @require	https://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @license	freeware
// ==/UserScript==
$('#donate-banner').remove();
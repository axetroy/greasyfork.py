// ==UserScript==
// @name           btGigs-AutoHTTPS
// @version        1.0.4
// @author         by jerry1333
// @namespace      https://greasyfork.org/users/4704
// @description    Automatycznie przekierowanie strony na bezpieczną przez HTTPS
// @include        http://*btgigs.info/*
// @exclude        https://*btgigs.info/*
// @grant          none
// ==/UserScript==

var new_location = location.href.replace(/^http\:/, 'https:');
location.href = new_location;
// ==UserScript==
// @name        Replace FR wikia site favicon
// @version     1.0
// @namespace   flight_wikia_favicon
// @description Replaces Flight Rising separate wikia sites favicon to generic red square
// @include     http://flightrising.wikia.com/*
// ==/UserScript==

var head = document.getElementsByTagName('head')[0];
var icon = document.createElement('link');

icon.setAttribute('type', 'image/x-icon');
icon.setAttribute('rel', 'shortcut icon');
icon.setAttribute('href', 'data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAAgAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');

head.appendChild(icon);
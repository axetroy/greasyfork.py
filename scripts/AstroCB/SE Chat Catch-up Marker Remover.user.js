// ==UserScript==
// @name           SE Chat Catch-up Marker Remover
// @author         Cameron Bernhardt (AstroCB)
// @namespace https://github.com/AstroCB
// @version        3.1.0
// @description  Removes "catch-up" separators from SE Chat
// @include        http://chat.*.stackexchange.com/rooms/*
// @include        http://chat.stackoverflow.com/rooms/*
// @include        http://chat.serverfault.com/rooms/*
// @include        http://chat.superuser.com/rooms/*
// @include        http://chat.askubuntu.com/rooms/*
// ==/UserScript==
var marker = document.createElement("style");
marker.textContent = ".monologue.catchup-marker { border-top: none; }";

document.head.appendChild(marker);
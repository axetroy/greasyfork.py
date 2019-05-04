// ==UserScript==
// @name         Taigachat Rooms
// @namespace    Terrium.net
// @version      3
// @description  Enables utilization of secondary rooms in Taigachat
// @author       Lamp
// @include      http://terrium.net/index.php?taigachat/*
// @include      http://terrium.net/index.php
// @grant        none
// ==/UserScript==
if (window.location.hash.substring(0,6) == '#room=')
    taigachat.room = window.location.hash.substring(6);
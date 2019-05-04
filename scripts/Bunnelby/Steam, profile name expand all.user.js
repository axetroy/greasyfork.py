// ==UserScript==
// @name         Steam, profile name expand all
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        http://steamcommunity.com/profiles/*
// @match        https://steamcommunity.com/id/*
// @grant        none
// @nowrap
// ==/UserScript==

(function() {
    'use strict';
    jQuery("<style />").text(function (){/*
.persona_name { line-height: 1 !important; white-space: unset !important; }
.profile_header .profile_header_centered_persona { white-space: unset !important; }
*/}.toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].replace(/\n|\r/g, "")).appendTo("body");
})();
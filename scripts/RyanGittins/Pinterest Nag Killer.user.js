// ==UserScript==
// @name         Pinterest Nag Killer
// @namespace    http://www.ryangittins.com/
// @author       Ryan Gittins
// @version      1.0.0
// @description  Removes the large 'Join Pinterest' bar shown to visitors.
// @include      *://*pinterest.com/*
// @copyright    2014
// @grant        none
// ==/UserScript==

$('div.Nags.Module').remove();
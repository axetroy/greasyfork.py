// ==UserScript==
// @name          Userstyles / GreasyFork Enhancer Dark-Grey + Comments Numbering v.122
// @namespace     http://userscripts.org/users/5161
// @icon          http://www.gravatar.com/avatar/317bafeeda69d359e34f813aff940944?r=PG&s=48&default=identicon
// @description   Custom Widescreen CSS theme for userstyles.org and https://greasyfork.org
// @copyright     2011+, decembre (http://userscripts.org/users/5161)
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version       122

// @include      https://userstyles.org/*
// @include      https://greasyfork.org/*
// @include      https://sleazyfork.org/*   

// CSS1 = Userstyles - Greasy Fork Enhancer Dark-Grey  v.121
// @resource      CSS1 https://pastebin.com/raw/f77ygmrt

// CSS2 = Userstyles - GreasyFork - Forum - Comments Numbering + Permalink v.115
// @resource      CSS2 https://pastebin.com/raw/D7XrTyQj

// @grant         GM_addStyle

// @grant         GM_getResourceText
//
// ==/UserScript==

GM_addStyle(GM_getResourceText('CSS1'));
GM_addStyle(GM_getResourceText('CSS2'));
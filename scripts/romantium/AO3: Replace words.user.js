// ==UserScript==
// @name         AO3: Replace words
// @namespace    https://greasyfork.org/en/users/65036
// @version      2.0
// @changelog    simplified script, automatically replaces old words w/o having to press a button, clarified directions
// @description  replace old words with new words
// @author       romantium
// @include      /https?://archiveofourown\.org/works/\d+/
// @grant        none
// @directions   'old word' is the word you want to replace
//               'new word' is the word you want to see instead
//               save script after editing, then refresh to see new words
//               you can add as many replacement instances as you'd like
//               important! - everything is case sensitive
//
//               example: change american spelling 'realize' to british spelling 'realise'
//
//               var replaced = $("body").html()
//               .replace(/realize/g,'realise')
//               ;$("body").html(replaced);
//
// ==/UserScript==

var replaced = $("body").html()
.replace(/old word/g,'new word')
.replace(/old word/g,'new word')
.replace(/old word/g,'new word')
.replace(/old word/g,'new word')
.replace(/old word/g,'new word')
.replace(/old word/g,'new word')
.replace(/old word/g,'new word')
;$("body").html(replaced);
// ==UserScript==
// @name           Turn on spellcheck
// @namespace      google.com
// @description    Turns spellcheck on in CrowdSurf transcription.
// @include        *
// @version 0.0.1.20181109172158
// ==/UserScript==



var found = document.getElementById("plaintext_edit");
found.setAttribute("spellcheck","true");

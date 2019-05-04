// ==UserScript==
// @name                        Livemixtape Show Captcha
// @version                     0.0.4
// @grant                       none
// @description                 Removes the layer which hides the captcha and shows the captcha instead.
// @include                     http://*.livemixtapes.com/download/*
// @author                      Jimmy
// @homepage                    http://81.4.109.233/public/greasyfork/livemixtape/
// @namespace                   https://greasyfork.org/users/5561
// @run-at			document-end
// ==/UserScript==
document.getElementById("captcha").style.display='';
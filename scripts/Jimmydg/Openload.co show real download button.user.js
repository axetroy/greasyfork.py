// ==UserScript==
// @name                        Openload.co show real download button
// @version                     0.0.1
// @grant                       none
// @description                 Hides the fake download button/timer and shows the real download button
// @include                     http://openload.co/*
// @include                     https://openload.co/*
// @author                      Jimmy
// @namespace                   https://greasyfork.org/users/5561
// @run-at						document-end
// ==/UserScript==
$("#downloadTimer").slideUp();
$("#realdl").slideDown();
// ==UserScript==
// @name                        Ranaamit / Android Mash Show Download Link
// @version                     0.0.3
// @grant                       none
// @description                 Shows the download link instead of the useless timer.
// @include                     http://ranaamit.96.lt/*
// @author                      Jimmy
// @namespace                   https://greasyfork.org/users/5561
// ==/UserScript==
document.getElementById("makingdifferenttimer").style.display=''; //Show the download link
document.getElementById("mdtimer").style.display='none'; //Hide the timer
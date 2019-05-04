// ==UserScript==
// @name        Facepunch GD Forum Sort Fix
// @description Auto redirect GD to Sort by Last Post Descending
// @include     http://facepunch.com/forumdisplay.php?f=6
// @include     http://facepunch.com/forums/6
// @include     http://facepunch.com/fp_popular.php
// @version     1.1
// @namespace https://greasyfork.org/users/4115
// ==/UserScript==
    if(content.document.location == "http://facepunch.com/forumdisplay.php?f=6" || content.document.location =="http://facepunch.com/forums/6" || document.URL == "http://facepunch.com/forumdisplay.php?f=6" || document.URL == "http://facepunch.com/forums/6"){
            window.location.replace("http://facepunch.com/forumdisplay.php?f=6&sort=lastpost&order=desc")
}

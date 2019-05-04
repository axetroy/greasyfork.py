// ==UserScript==
// @name Banner Script for BroniesDE
// @description Changes the Standard Theme from BroniesDE
// @version 0.0.1.20140617091504
// @namespace https://greasyfork.org/users/2853
// ==/UserScript==
// ==UserScript==
@namespace url(http://www.w3.org/1999/xhtml);
@-moz-document domain("bronies.de") {
 
body {background-image:url(
 
 
 
http://i.imgur.com/zMUdwWN.png
 
 
 
)!important;background-attachment:fixed!important;background-position:top
 
center!important;background-color:#FFFFFF!important;}
 
 
 
img[src*="http://www.bronies.de/images/sweetdreams/logo.png"]{
 
height: 0 !important;
 
width: 0 !important;
 
/* these numbers match the new image's dimensions */
 
padding-left: 1000px !important;
 
padding-top: 250px !important;
 
background: url("http://i.imgur.com/h64UUS2.png") no-repeat !important;
 
}
img[src*="http://www.bronies.de/images/sweetdreams/logosoviet.png"]{
 
height: 0 !important;
 
width: 0 !important;
 
/* these numbers match the new image's dimensions */
 
padding-left: 1000px !important;
 
padding-top: 250px !important;
 
background: url("http://i.imgur.com/Kax33g2.png") no-repeat !important;
 
}
 
}
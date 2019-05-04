// ==UserScript==
// @name        DriverIdentifier: Download without account
// @namespace   a
// @description Download a driver listed on driveridentifier.com without creating an account. (Replaces download button destination)
// @include    http://www.driveridentifier.com/scan/*/driver-detail/*
// @grant       none
// @version 0.0.1.20160717072408
// ==/UserScript==
document.body.onload = loaded;
function loaded(){
  var all_links = [].slice.call(document.getElementsByTagName("a"));
  var real_link = decodeURIComponent((all_links).filter(function(a){return a.href.indexOf("download_file.php")!=-1})[0].href.match(/url=([^&]+)/)[1]);
  all_links.forEach(function(a){a.href=real_link;});
}
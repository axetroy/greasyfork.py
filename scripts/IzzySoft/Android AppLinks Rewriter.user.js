// ==UserScript==
// @id             aal-rw
// @name           Android AppLinks Rewriter
// @version        1.4.3
// @namespace      http://projects.izzysoft.de/
// @author         IzzySoft
// @description    Re-writes Android App Links to point to "a better place"
// @license        CC BY-NC-SA
// @include        *
// @exclude        http://*.appbrain.com/*
// @exclude        https://*.appbrain.com/*
// @exclude        https://play.google.com/*
// @exclude        https://android.izzysoft.de/*
// @run-at         document-idle
// @grant          unsafeWindow
// ==/UserScript==

var playstore = 'https://play.google.com/store/apps/details?id=';
var appbrain  = 'https://www.appbrain.com/app/';

for(var i = 0; i < document.links.length; i++) {
  var elem = document.links[i];
  // Links on AndroidPIT
  if (elem.href.match(/\/de\/android\/market\/apps\/app\/([^\/]+)\/([^\/]+)/i)) {
    //elem.href=playstore+RegExp.$1;
    elem.href=appbrain+RegExp.$2+'/'+RegExp.$1;
    //elem.href='//'+RegExp.$1; // just the package name
  }
  if (elem.href.match(/androidpit.(de|com)\/app\/([^\/]+)/i)) { // new URL structure
    elem.href=appbrain+RegExp.$2;
  }

  // Links to Google Play
  if (elem.href.match(/play.google.com\/store\/apps\/details\?id=([^&#]+)/i)) {
    elem.href=appbrain+RegExp.$1;
  }
  if (elem.href.match(/market.android.com\/details\?id=([^&#]+)/i)) {
    elem.href=appbrain+RegExp.$1;
  }

  // Camouflaged links (Appoid)
  if (elem.href.match(/\/out\/\?\S*play\.google\.com%2Fstore%2Fapps%2Fdetails%3Fid%3D([^&#]+)/i)) { // old redirects
    elem.href=appbrain+RegExp.$1
  }
  if (elem.href.match(/\/redirect\/\S+\?partner=\S*&id=([^&#]+)/i)) { // newer redirects as of 4/2017
    elem.href=appbrain+RegExp.$1
  }

  // androidapptests.com moved to n-droid.de
  if (elem.href.match(/www.androidapptests.com\/(.*)/i)) {
    elem.href='http://www.n-droid.de/'+RegExp.$1;
  }
}
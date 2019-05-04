// ==UserScript==
// @name         去掉CSDN BLOG复制时的小尾巴
// @namespace
// @website      https://eeve.me
// @version      0.2
// @description  去掉CSDN BLOG复制时烦人的小尾巴
// @author       eeve
// @include      /^http(s?)://blog.csdn.net/(.*)$/
// @grant        unsafeWindow
// @run-at       document-end
// @namespace		 https://greasyfork.org/users/71775
// ==/UserScript==
//
location.assign("javascript:(function(){csdn.copyright.textData = ''})()");


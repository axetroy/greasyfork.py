// ==UserScript==
// @name         getchar userid
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       rei
// @match        https://www.douban.com/contacts/rlist*
// @require   http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// @grant    GM_setClipboard
// @run-at       document-start// ==/UserScript==

var userlist = "";

window.onload = function(){



 $("ul.user-list > li").each(function(){


          userlist += $(this).attr("id")+",";

  });

   GM_setClipboard(userlist);
   alert("复制好了^ ^");
   //alert(userlist);


  };
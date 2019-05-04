// ==UserScript==
// @namespace	https://greasyfork.org/users/39670

// @name  		微博部分页面HTTP转HTTPS
// @description 将微博部分页面自动跳转https避免需要重新登录。

// @author      Netplaier
// @version     1.02
// @license     LGPLv3

// @include		http://service.weibo.com/*
// @include		http://s.weibo.com/*

// @icon		https://weibo.com/favicon.ico

// ==/UserScript==


(function(){
  var debug = 0;
  var new_location = location.href.replace(/http\:/, 'https:');
  if ( debug > 0 ) {
    alert(  "Hash:     "+location.hash+
          "\nHost:     "+location.host+
          "\nHostname: "+location.hostname+
          "\nHREF:     "+location.href+
          "\nPathname: "+location.pathname+
          "\nPort:     "+location.port+
          "\nProtocol: "+location.protocol+
          "\n"+
          "\nNew Location: "+new_location);
  }
  location.href = new_location;
})();
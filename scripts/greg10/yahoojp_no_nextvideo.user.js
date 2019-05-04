// ==UserScript==
// @name        yahoojp_no_nextvideo
// @namespace   http://catherine.v0cyc1pp.com/yahoojp_no_nextvideo.user.js
// @include     https://videotopics.yahoo.co.jp/*
// @author      greg10
// @run-at      document-end
// @license     GPL 3.0
// @version     1.2
// @require     http://code.jquery.com/jquery-3.2.1.min.js
// @grant       none
// @description YahooJAPANの映像トピックスのビデオを再生後に自動的に５秒後に次の動画に勝手に移行されてしまうのを抑制する。
// ==/UserScript==

//console.log("yahoojp_no_nextvideo start");
this.$ = this.jQuery = jQuery.noConflict(true);


$("#nvideo").remove();


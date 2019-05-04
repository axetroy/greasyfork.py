// ==UserScript==
// @name         アマゾンポチと入れさせないやつ
// @namespace    http://github.com/unarist/
// @version      0.2
// @description  「#アマゾンポチ と入れて@返信でカートに追加・後で買う」「@amazonJPさんから」を消す
// @author       unarist
// @match        http://www.amazon.co.jp/*dp/*
// @match        http://www.amazon.co.jp/gp/product/*
// @grant        none
// ==/UserScript==

var elem = jQuery('a[title=Twitterでシェアする]');
var href = elem.attr('href');
var tweeturl = decodeURIComponent(href.replace(/.+location=/, ''));
tweeturl = tweeturl.replace(/&via=[^&]+/, '');
tweeturl = tweeturl.replace(/&text=[^&]+/, '&text=' + encodeURIComponent(document.title));
elem.attr('href', tweeturl);
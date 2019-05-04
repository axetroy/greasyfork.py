// ==UserScript==
// @name           mocolebih
// @namespace      vachzar/mocolebih
// @description    membaca lebih web-web berita ampas
// @homepageURL    http://vachzar.com/mocolebih
// @supportURL     https://github.com/vachzar/mocolebih/issues
// @icon           https://raw.githubusercontent.com/vachzar/mocolebih/master/img/logo.png
// @version        1.4.0
// @license        DBAD
// @grant          GM_addStyle
// @author         vachzar
// @require        http://code.jquery.com/jquery-1.10.1.min.js
// @run-at         document-start
// @include        http://*.tribunnews.com/*
// @include        http://*.viva.co.id/news/read/*
// @include        http://*.jawapos.com/read/*
// @include        http://*.jpnn.com/read/*
// allow pasting
// ==/UserScript==

$( document ).ready(function() {
  Baca(/tribunnews.com/, Tribun);
  Baca(/viva.co.id/, Viva);
  Baca(/jawapos.com/, Jawapos);
  Baca(/jpnn.com/, Jpnn);
});

function Baca(check, callback) {
  if (check.test(window.location.host)) {
     callback();
     controls();
  }
}
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

var Tribun = function(){
  var links = [];
  $(document).find('.paging a').each(function () {
    links.push($(this).attr('href'));
  });
  if(links.length){
    $.each(links, function( index, value ) {
      if(index !== 0){
        var data = $.ajax({url: value, data: {param1: value, param2: value}, async: false}).responseText; 
        $(data).find('.txt-article').each(function(){
          $('.txt-article').append($(this).html());
        });
      }
    });  
      $('.paging').prev('div').hide();
      $('.paging').hide();  
      $('.txt-article').append( "<p><b>"+links.length+" Pages Loaded by MocoLebih </b></p>" );
  }
};

var Viva = function(){
  if(/log.viva/.test(window.location.host)){
    if ($('#article-content > span a.button2').length) {
      var urlog = $('#article-content > span a.button2').attr('href');
      urlog = urlog.split('/');
      window.location = Base64.decode(urlog[5]);
    }
  }else{
    var links = [];
    $(document).find('.pagelist a.page').each(function () {
      links.push($(this).attr('href'));
    });
    if(links.length){
      $.each(links, function( index, value ) {
        if(index !== 0){
          var data = $.ajax({url: value, data: {param1: value, param2: value}, async: false}).responseText; 
          $(data).find('#article-content > span').each(function(){
            $('#article-content > span').append($(this).html());
          });
        }
      });  
      $('.pagelist').prev('div').hide();
      $('.pagelist').hide();  
      $('#article-content').append( "<p><b>"+links.length+" Pages Loaded by MocoLebih </b></p>" );
    }
  }
};

var Jawapos = function(){
  var links = [];
  $(document).find('.newsPagingWrap a').each(function () {
    links.push($(this).attr('href'));
  });
  if(links.length){
    $.each(links, function( index, value ) {
      if(index !== 0){
        var data = $.ajax({url: value, data: {param1: value, param2: value}, async: false}).responseText; 
        $(data).find('.sec-info.newsContent').each(function(){
          $('.sec-info.newsContent').append($(this).html());
        });
      }
    });  
    $('.newsPagingWrap').prev('div').hide();
    $('.newsPagingWrap').hide();  
    $('.sec-info.newsContent').append( "<p><b>"+links.length+" Pages Loaded by MocoLebih </b></p>" );
  }
};

var Jpnn = function(){
  var links = [];
  $( ".pagination.split_news_page a:contains('prev')" ).remove();
  $( ".pagination.split_news_page a:contains('next')" ).remove();
  $(document).find('.pagination.split_news_page a').each(function () {
    links.push($(this).attr('href'));
  });
  if(links.length){
    $.each(links, function( index, value ) {
        var data = $.ajax({url: value, data: {param1: value, param2: value}, async: false}).responseText; 
        $(data).find('div._detailpage div._fl._wr_09 p').each(function(){
          $('.pagination.split_news_page').before('<p style="text-align:justify">'+$(this).html()+'</p>');
        });
    });  
    $('.pagination.split_news_page').html("<p><b>"+links.length+" Pages Loaded by MocoLebih </b></p>");  
  }
};

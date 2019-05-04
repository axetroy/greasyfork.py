// ==UserScript==
// @name       quickcast download link
// @namespace  
// @version    0.1
// @description  insert a download link on quickcast video pages
// @include        http://quick.as/*
// @copyright  2014+, qa2
// @author  qa2
// @license  MIT
// ==/UserScript==
// 

$(function() {
  var movieurl = $("source").attr("src");
  var movietitle = $("h1").text();
  var dllink = $("<a>");
  dllink
    .attr("href", movieurl)
    .attr("download", movietitle + "webm")
    .text("Download")
    .css("font-size","1.2rem")
    .css("font-weight", "700");
  $(".detail").append(dllink);  
});

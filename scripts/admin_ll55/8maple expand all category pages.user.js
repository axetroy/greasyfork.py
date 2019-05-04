// ==UserScript==
// @name         8maple expand all category pages
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://8maple.ru/*
// @exclude      http://8maple.ru/*page*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @supportURL   https://github.com/admin-ll55/
// @grant        none
// ==/UserScript==
function fa() {
  var a = $("a:contains('最舊')");
  if (a.length) {
    var url = a.attr("href");
    var last = url.match(/\/([0-9]+)\//)[1];
    url = url.replace("/"+last+"/", "/__/");
    return {url: url, last: last};
  } else {
    return false;
  }
}
function fb() {
  $.get(a.url.replace("__", i), function(data){
    $("div.nag.cf").append(data.match(/nag\scf\">(.*?)loop-nav\spag-nav/)[1]);
    $("div#_prog span").text(i);
    if (i+1<=a.last) {
      i++;
      fb();
    } else {
      $("div#_prog").text("Done!").css({"height":"0"});
    }
  });
}
var a = fa();
$("div.loop-nav.pag-nav, div#sidebar").remove();
var css = `<style>
div.wrap.cf {width:1080px;}
div#content {float:none;margin:0 auto;width:initial;}
.grid-mini .item, .grid-mini .thumb, .grid-mini .thumb img {width:160px;}
.grid-mini .thumb, .grid-mini .thumb img {height:90px;}
div#_prog {height:20px;transition:height 1s;overflow:hidden;}
</style>`;
$("body").append(css);
var i = 2;
$("div.nag.cf").prepend("<div id='_prog' style='margin:10px;text-align:center;'><b>Progress: <span>1</span>/"+a.last+"</b></div>");
if (a) {
  fb();
}
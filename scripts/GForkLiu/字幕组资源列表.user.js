// ==UserScript==
// @name                ZimuzuResList
// @name:zh-CN          字幕组资源列表
// @version             0.5.1
// @author              GForkMe.L
// @description         Open old zimuzu.tv resource's list.
// @description:zh-CN   字幕组旧版资源列表.
// @namespace           https://greasyfork.org/zh-CN/scripts/34798-zimuzureslist
// @include             http*://www.zmz2019.com/gresource/*
// @include             http*://www.zmz2019.com/resource/*
// @include             http*://www.zimuzu.tv/gresource/*
// @include             http*://www.zimuzu.tv/resource/*
// @include             http*://www.zimuzu.io/gresource/*
// @include             http*://www.zimuzu.io/resource/*
// @grant               none
// @run-at              document-end
// ==/UserScript==

(function() {
  'use strict';

  var $ = (e) => document.querySelector(e);

  var res_link = window.location.href.replace(/^(https?:\/\/)([^\/]*\/).*(\/[^\/]*)/, "$1$2resource/list$3");
  var root_element = $("#resource-box div.view-res-nouser");
  if (root_element) {
    root_element.innerHTML += "<p><a id='res_elemt' href="+res_link+">资源下载页</a></p>";
    var e = $("#res_elemt");
    e.style.cssText = "font-size:initial;text-decoration:none;color:#ffffff";
    e.setAttribute("class","group u6");
    e.onmouseout = () => {e.setAttribute("class","group u6");}
    e.onmouseover = () => {e.setAttribute("class","group u5");}
  }

})();
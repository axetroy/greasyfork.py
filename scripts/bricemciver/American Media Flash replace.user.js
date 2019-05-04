// ==UserScript==
// @name        American Media Flash replace
// @namespace   www.bricemciver.com
// @description Replace Flash video with HTML5 video on American Media sites
// @include     http://www.muscleandfitness.com/*
// @include     http://www.shape.com/*
// @include     http://www.fitpregnancy.com/*
// @include     http://www.naturalhealthmag.com/*
// @include     http://www.muscleandfitnesshers.com/*
// @include     http://www.mensfitness.com/*
// @include     http://www.flexonline.com/*
// @include     http://starmagazine.com/*
// @include     http://www.okmagazine.com/*
// @include     http://www.countryweekly.com/*
// @include     http://www.radaronline.com/*
// @include     http://www.nationalenquirer.com/*
// @include     http://www.globemagazine.com/*
// @include     http://www.soapoperadigest.com/*
// @version     1
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @grant       none
// ==/UserScript==

$(document).ready(function() {
  $("div.ami-aol-player").each(function(index, element) {
      var url = $(element).find("meta[itemprop='contentURL']").attr("content");
      var width = $(element).css("width");
      var height = $(element).css("height");
      console.log(url + " " + width + " " + height);
      $(element).find("script").remove();
      $(element).append("<video src='" + url + "' controls width='" + width + "' height='" + height + "' />");
  });
});
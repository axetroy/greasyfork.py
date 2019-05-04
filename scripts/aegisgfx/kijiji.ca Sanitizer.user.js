// ==UserScript==
// @name        kijiji.ca Sanitizer
// @namespace   kijiji sanitizer
// @author      lobo
// @version     1.4.4
// @include     https://*.kijiji.ca/*
// @include     http://*.kijiji.ca/*
// @grant       none
// @description Removes ads and divs based on keywords
// @grant GM_addStyle
// ==/UserScript==

$('.third-party').css('display', 'none');
$('#AdsenseTop').css('display', 'none');
$('div#InlineBanner').css('display', 'none');
$('[data-fes-id="admarktTopSpot"]').css('display', 'none');
$('.top-feature').css('display', 'none');
//top-ads-top-bar
$('.top-ads-top-bar').css('display', 'none');
//srp-bottom-links
$('.srp-bottom-links').css('display', 'none');
//kill ebay
$(".fes-pagelet > [data-fes-id*='Tree']").css('display', 'none');

   //change this to block entire div if match bad word
    var array = [ "apple", "mac", "iphone", "techbox", "tech edge", "repair", "fashion", "ipad", "macbook", "estimate", "imac", "uniway", "wedding" ];//if you put your own words here, back them up as they will be reset to mine after update
    $('.info-container').each(function() {
    var ourText = $(this).text().toLowerCase(); // convert text to Lowercase
    if( (new RegExp( '\\b' + array.join('\\b|\\b') + '\\b') ).test(ourText) ) {
      $(this).parents().eq(1).css('display', 'none');
    }
  });
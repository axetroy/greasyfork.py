// ==UserScript==
// @name         InstaZoom
// @namespace    http://www.jeroendekort.nl
// @version      0.7
// @description  Show actual size image when clicking on it
// @icon         https://instagramstatic-a.akamaihd.net/h1/images/ico/favicon.ico/dfa85bb1fd63.ico
// @author       nljuggler
// @match        https://*.instagram.com/*
// @grant        unsafeWindow
// @require      https://code.jquery.com/jquery-2.2.4.js
// ==/UserScript==

$(function(){
  addStyleSheet();  
  createLightbox();
  $(document).on("click","._si7dy, .FFVAD, .KL4Bh, ._9AhH0, .eLAPa _23QFA", function() {
    var $divWithImage = $(this).parent().find('.FFVAD');
    // Log the image url to the console for easy access.
    console.log($divWithImage);
    $('body').find('#nljugglerLightbox #lightboxImage').attr('src', $divWithImage.attr('src'));
    $('#nljugglerLightbox').show();
    if ($(this).hasClass("_si7dy")){
      $(this).remove();
    }
    // Remove Instagrams own overlay (if at all displayed),
    // so you don't need to click twice to hide the current image.
    $('button.ckWGn').click();
  });

  $('#lightboxImage').click(function() {
    $(this).parent().hide();
  });

  function createLightbox(){
    var lightbox = "<div id='nljugglerLightbox'><img id='lightboxImage'/></div>";
    $('body').append(lightbox);
  }
 
  function addStyleSheet (){
    addCss('#nljugglerLightbox { position: fixed; top: 10px; left: 40%; width: auto; transform: translateX(-40%); max-height:900px; z-index:1000; overflow:scroll; border:solid 2px black; }'+
           '#lightboxImage {width: auto; }');
    console.log('InstaZoom styles added');
  } 

  function addCss(cssString) {
    var head = document.getElementsByTagName('head')[0];
    var newCss = document.createElement('style');
    newCss.type = "text/css";
    newCss.innerHTML = cssString;
    head.appendChild(newCss);
  }
});
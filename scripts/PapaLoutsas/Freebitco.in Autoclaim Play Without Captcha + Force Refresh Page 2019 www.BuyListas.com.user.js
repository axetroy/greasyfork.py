// ==UserScript==
// @name         Freebitco.in Autoclaim Play Without Captcha + Force Refresh Page 2019 www.BuyListas.com
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Please use my Referal-Link https://freebitco.in/?r=2878556
// @author       freeautobitco.blogspot.com
// @match        https://freebitco.in/*
// ==/UserScript==

  var timeout = setTimeout("location.reload(true);",3630000);
      function resetTimeout() {
      clearTimeout(timeout);
      timeout = setTimeout("location.reload(true);",3630000);
  }
         $(document).ready(function(){
         setInterval(function(){
            //$('#play_without_captchas_button').trigger('click');
            if ($('#play_without_captchas_button').is(':visible')) {
                $('#play_without_captchas_button').trigger('click');

          $(document).ready(function(){
          setInterval(function(){
            //$('#free_play_form_button').trigger('click');
            if ($('#free_play_form_button').is(':visible')) {
                $('#free_play_form_button').trigger('click');
            }
        },10000);
    });
            }
        },10000);
    });
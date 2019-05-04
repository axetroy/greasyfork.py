// ==UserScript==
    // @name         FREEBITCO.IN AUTOCLAIM COLLECTOR
    // @namespace    By https://freebitco.in/?r=2145996
    // @version      0.3
    // @description  https://freebitco.in/?r=2145996
    // @author       ROGERMASTER
    // @match        https://freebitco.in/?op=home
    // @match        https://freebitco.in/?op=home#
    // @match        https://freebitco.in/
    // @homepage     https://freebitco.in/?r=2145996
    // @homepageURL  https://freebitco.in/?r=2145996
    // @website      https://freebitco.in/?r=2145996
    // @source       https://freebitco.in/?r=2145996
    // @grant        none
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
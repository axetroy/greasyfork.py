    // ==UserScript==
    // @name         Freebitco.in Autoclaim Play Without Captcha + Force Refresh Page
    // @namespace    By youtube.com/c/BITCOINCHANNEL
    // @version      0.1.1
    // @description  Autoclaim Play Without Captcha Freebitco.in + Force Refresh Page
    // @author       BITCOINCHANNEL
    // @match        https://freebitco.in/?op=home
    // @match        https://freebitco.in/?op=home#
    // @match        https://freebitco.in/
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
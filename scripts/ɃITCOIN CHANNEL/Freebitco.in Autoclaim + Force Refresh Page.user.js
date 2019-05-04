    // ==UserScript==
    // @name         Freebitco.in Autoclaim + Force Refresh Page
    // @namespace    By youtube.com/c/BITCOINCHANNEL
    // @version      0.1.2
    // @description  Autoclaim Freebitco.in
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
            //$('#free_play_form_button').trigger('click');
            if ($('#free_play_form_button').is(':visible')) {
                $('#free_play_form_button').trigger('click');
            }
        },10000);
    });
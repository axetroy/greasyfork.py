// ==UserScript==
// @name         Freedoge.co.in auto collector Faucet
// @namespace    http://www.youtube.com/c/MogiHostTutoriais
// @version      1.3.3
// @description  Autoclaim  Freedoge.co.in
// @author       MOGIHOST
// @match        https://freedoge.co.in/?op=home
// @grant        none
// @license MIT
// ==/UserScript==
	  var timeout = setTimeout("location.reload(true);",3600000);
      function resetTimeout() {
      clearTimeout(timeout);
      timeout = setTimeout("location.reload(true);",3600000);
  }
  $(document).ready(function(){
        setInterval(function(){
            //$('#free_play_form_button').trigger('click');
            if ($('#free_play_form_button').is(':visible')) {
                $('#free_play_form_button').trigger('click');
            }
        },30000);
    });
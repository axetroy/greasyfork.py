// ==UserScript==
    // @name         Bitcoinsfor.me Autoclaim + I'm not robot captcha clicker 1.3
    // @namespace    By youtube.com/c/Marcio Fernando Maia
    // @version      0.1
    // @description  Autoclaim bitcoinsfor.me
    // @match        https://bitcoinsfor.me/*
    // @grant        none
    // ==/UserScript==

	// Este Script roda perfeitamente no android e table. Não esqueça de instalar o captcha clicker.

var timeout = setTimeout("location.reload(true);",300000);
      function resetTimeout() {
      clearTimeout(timeout);
      timeout = setTimeout("location.reload(true);",300000);
  }

  $(document).ready(function(){
        setInterval(function(){
            //$('#claimbutton-3560').trigger('click');
            if ($('#claimbutton-3560').is(':visible')) {
                $('#claimbutton-3560').trigger('click');
            }
        },300);
    });

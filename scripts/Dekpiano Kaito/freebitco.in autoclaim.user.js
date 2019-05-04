    // ==UserScript==
    // @name         freebitco.in autoclaim
    // @namespace    https://goo.gl/9yC4Lu
    // @version      0.1.1
    // @description  autoclaim freebitco.in https://goo.gl/9yC4Lu
    // @author       Dekpiano
    // @match        https://freebitco.in/?op=home
    // @match        https://freebitco.in/
    // @grant        none
    // ==/UserScript==

    $(document).ready(function(){
        setInterval(function(){
            //$('#free_play_form_button').trigger('click');
            if ($('#free_play_form_button').is(':visible')) {
                $('#free_play_form_button').trigger('click');
            }
        },10000);
    });
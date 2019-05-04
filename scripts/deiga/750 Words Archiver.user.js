// ==UserScript==
// @name         750 Words Archiver
// @namespace    http://timosand.com/
// @version      1.0
// @description  Sends the finished 750words journal to an archiving service on save.
// @author       Timo Sand <timo.sand@iki.fi>
// @match        https://750words.com/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    $(document).bind('keydown', function(event) {
        if ((event.which == 115 || event.which == 83) && (event.ctrlKey || event.metaKey)) {
            var body      = encodeURIComponent($('#entry_body').val());
            var num_words = $('#entry_num_words').val();
            var date = $('[href^="/print/"]').attr('href').split('/')[2];
            if ( num_words >= 750 ) {
                console.dir(event);
                var request = new XMLHttpRequest();
                request.open('POST', 'https://powerful-cove-69945.herokuapp.com/750', true);
                request.setRequestHeader('Content-Type', 'application/json');
                request.send((JSON.stringify({"body": body, "words": num_words, "date": date }));
            }
        }
    });
})();

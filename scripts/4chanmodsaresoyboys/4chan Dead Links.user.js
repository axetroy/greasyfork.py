// ==UserScript==
// @name         4chan Dead Links
// @namespace    4chanDeadLinks
// @description  A quick way to view dead links on 4chan using FireDen
// @match   *://boards.4chan.org/*
// @version 0.0.1.20180916064329
// ==/UserScript==

(function() {
    var replaceLinks = function(){
        // Get all the dead links
        var deadlinks = document.querySelectorAll( 'span.deadlink' );

        // Loop over all the deadlinks and replace them with fireden links
        for(var index = 0; index < deadlinks.length; index++)
        {
            var deadlink = deadlinks[index];

            var postNumber = deadlink.textContent.replace(/\D/g,'');
            var firedenUrl = "https://boards.fireden.net" + window.location.pathname + "/#" + postNumber;

            // Replace with an href link
            deadlink.innerHTML = "<a href='" + firedenUrl + "'>" + deadlink.innerHTML + "</a>"
        }
    }

    // Run the script shortly after page load
    //setTimeout(replaceLinks, 500);

    // Run immediately
    replaceLinks();
})();
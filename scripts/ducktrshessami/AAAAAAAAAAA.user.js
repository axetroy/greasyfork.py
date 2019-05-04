// ==UserScript==
// @name         AAAAAAAAAAA
// @version      1.0
// @namespace    AAAAAAAA.com
// @description  AAAAAAAAAAAAAAAAAA
// @author       AAAAAAAAAAAAAA
// @match        *kissanime.ru/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

(function() {

    var whitelist = [ // Add/remove as you please
        "kiss",
        "javascript",
        "discord",
        "novel",
        "myanimelist",
        "kitsu",
        "nyaa",
        "reddit",
        "moe",
        "twitter",
        "anichart",
        "chrome-extension"
    ];

    var server = ""; // Pick from the server list below

    var server_list = [ // Don't edit anything below unless you know what you're doing
        "RapidVideo",
        "Mp4Upload",
        "Openload",
        "Streamango",
        "Alpha Server",
        "Beta Server"
    ];

    /****************************************************************/

    function check(href) { // Helper function for removal(), compares links to the whitelist
        return whitelist.some(function(word) {
            return href.includes(word);
        });
    }

    function removal() { // Does the do
        var elems = document.body.getElementsByTagName("*"); // Grab e v e r y t h i n g
        for (var i in elems) {
            if (elems[i]) {
                if (elems[i].href) {
                    if (!check(elems[i].href)) {
                        elems[i].remove();
                        removal(); // Recurse because elements have been removed
                        break;
                    }
                }
                if (elems[i].parentNode) {
                    if (elems[i].parentNode.className == "divCloseBut") { // Click 'Hide' buttons
                        elems[i].click();
                    }
                }
            }
        }
	}

    var i;
    if (server_list.includes(server)) { // Check if chosen server is valid
        var server_index, select = document.getElementById("selectServer");
        if (select) { // Check if the server selector exists
            for (i = 0; i < select.options.length; ++i) {
                if (select.options[i].innerText == server) { // Check each option
                    server_index = i;
                }
            }
            if (select.selectedIndex != server_index) { // If the requested server exists, select it
                window.location.href = select.options[server_index].value;
            }
        }
    }

    $('#my_video_1').show(); // Additional stuff if jQuery manages to exist
    var frames = $("[id^=adsIfrme");
    for (i = 0; i < frames.length; i++) {
        if (frames[i].id != "adsIfrme") {
            frames[i].remove();
        }
    }
    document.body.addEventListener("DOMNodeInserted", removal); // Check for ads everytime the page updates

})();
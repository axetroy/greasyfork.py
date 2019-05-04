// ==UserScript==
// @name         duelingnexus.com mod
// @namespace    http://tampermonkey.net/s
// @version      1.0
// @description  Duelingnexus.com mod for having extension tools ready that you can use.
// @require http://code.jquery.com/jquery-3.3.1.min.js
// @author       stealth_angel
// @match        https://duelingnexus.com/editor/*
// @match        https://duelingnexus.com/*
// @grant        none
// ==/UserScript==

//NOTE THAT ONLY SAVED DECKS CAN BE DOWNLOADED So if you are building the deck click save and refresh the page; then this code works

//We need to know which buttons are selected.
var mr3ButtonSelected = false;
var mr4ButtonSelected = false;
var notStartedMatchesButtonSelected = false;

function ModTheDuelingPage() {

    MakeModdedButtons();

    jQuery("#showOnlyMR3").click(function() {
        /* make only mr3 matches visible */
        mr3ButtonSelected = true;
        /* make mr4 matches not visible */
        mr4ButtonSelected = false;
        showOnlyMR3Matches();
    });

    jQuery("#showOnlyMR4").click(function() {
        /* make only mr4 matches visible */
        mr4ButtonSelected = true;
        /* make mr3 matches not visible */
        mr3ButtonSelected = false;
        showOnlyMR4Matches();
    });

    jQuery("#showNotStartedMatches").click(function() {
        notStartedMatchesButtonSelected = true;
    });

    jQuery("#restoreMatches").click(function() {
        restoreVariables();
        showAllMatches();
    });
}


function showOnlyMR3Matches() {
    showMR3Matches();
    hideMR4Matches();
}

function showOnlyMR4Matches() {
    showMR4Matches();
    hideMR3Matches();
}

function restoreVariables() {
    notStartedMatchesButtonSelected = false;
}

function showAllMatches() {
    $('#gamelist-container table tbody tr').show();
}

function hideNotAvailableMatches() {
    $('#gamelist-container table tbody tr:not(:contains("---"))').hide();
}

function hideMR3Matches() {
    $('#gamelist-container table tbody tr:contains("MR3")').hide();
}

function hideMR4Matches() {
    $('#gamelist-container table tbody tr:contains("MR4")').hide();
}

function showMR3Matches() {
    $('#gamelist-container table tbody tr:contains("MR3")').show();
}

function showMR4Matches() {
    $('#gamelist-container table tbody tr:contains("MR4")').show();
}

function MakeModdedButtons() {
    var gamelistFilters = $("#gamelist-filters");

    gamelistFilters.append("<h3>Modded buttons</h3>");

    gamelistFilters.append('<button id="showOnlyMR3" class="button">Only MR3 matches</button> ');

    gamelistFilters.append('<button id="showOnlyMR4" class="button">Only MR4 matches</button> ');

    gamelistFilters.append("<br>");

    gamelistFilters.append('<button id="showNotStartedMatches" class="button">Only not started</button> ');

    gamelistFilters.append('<button id="restoreMatches" class="button">All matches visible</button> ');
}


/*
 * because tablerows -duel matches- are kept being added to the table, we use a timer function the
 * timer will keep updating the table.
 */

var pageIsModded = false;

function myTimer() {
    if (window.location.href == 'https://duelingnexus.com/?#/gamelist' || window.location.href == 'https://duelingnexus.com/#/gamelist') {
        if (pageIsModded == false) {
            pageIsModded = true;
            ModTheDuelingPage();
        }
        if (mr3ButtonSelected) {
            showOnlyMR3Matches();
            if (notStartedMatchesButtonSelected) {
                hideNotAvailableMatches();
            }
        } else if (mr4ButtonSelected) {
            showOnlyMR4Matches();
            if (notStartedMatchesButtonSelected) {
                hideNotAvailableMatches();
            }
        } else if (notStartedMatchesButtonSelected) {
            hideNotAvailableMatches();
        }
    } else {
        pageIsModded = false;
    }

}

/*
 * Here we start the timer do function every x amount
 */
setInterval(myTimer, 300);

if (window.location.href.indexOf('https://duelingnexus.com/editor/') > -1) {
    console.log('hello');

    function download(data, filename, type) {
        var file = new Blob([data], {
            type: type
        });
        if (window.navigator.msSaveOrOpenBlob) // IE10+
            window.navigator.msSaveOrOpenBlob(file, filename);
        else { // Others
            var a = document.createElement("a"),
                url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }
    }

    /*
     * Make a text line with added \r\n so we have line breaks in notepad
     *
     * @param String value
     * return String
     */
    function textLine(value) {
        return value + "\r\n";
    }

    /*
     * Get the deckname based on the websites deckname
     *
     * return String
     */
    function fileName() {
        filename = document.getElementsByClassName("editor-deck-name")[0].innerHTML;
        return filename + ".ydk";
    }


    /*
     * function for generating text for in text file
     *
     * @param String value
     * return String
     */
    function deckString() {
        //we make a string called deck
        var deck = "";

        /* here we push the retrieved value into the deck variable */

        //here we say created by no one -- can't find a way to retrieve the username
        deck += textLine("#created by ... ");

        //create main deck
        deck += textLine("#main");
        jQuery.each(Deck.main, function(i, val) {
            deck += textLine(val);
        });

        //create extra deck
        deck += textLine("#extra");
        jQuery.each(Deck.extra, function(i, val) {
            deck += textLine(val);
        });

        //create side deck
        deck += textLine("!side");
        jQuery.each(Deck.side, function(i, val) {
            deck += textLine(val);
        });

        //return the string
        return deck;
    }

    $('#editor-menu-content').append('<button id="downloadDeck" class="engine-button engine-button-navbar engine-button-default">Download</button>');

    $("#downloadDeck").click(function() {
        download(deckString(), fileName(), "");
    });
}
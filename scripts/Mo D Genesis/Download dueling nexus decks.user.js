// ==UserScript==
// @name         Download dueling nexus decks
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://duelingnexus.com/editor/*
// @grant        none
// ==/UserScript==

//NOTE THAT ONLY SAVED DECKS CAN BE DOWNLOADED So if you are building the deck click save and refresh the page; then this code works

/*
 * Function to download data to a file
 *
 * @param String data
 * @param String filename
 * @param String type
 * return void
 */
function download(data, filename, type) {
    var file = new Blob([data], {type: type});
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
function textLine(value){
	return value + "\r\n";
}

/*
 * Get the deckname based on the websites deckname
 *
 * return String
 */
function fileName(){
	filename = document.getElementsByClassName("editor-deck-name")[0].innerHTML;
	return filename + ".ydk";
}


/*
 * function for generating text for in text file
 *
 * @param String value
 * return String
 */
function deckString(){
	//we make a string called deck
	var deck = "";

	/* here we push the retrieved value into the deck variable */

	//here we say created by no one -- can't find a way to retrieve the username
	deck += textLine("#created by ... ");

	//create main deck
	deck += textLine("#main");
	jQuery.each( Deck.main, function( i, val ) {
	    deck +=  textLine(val);
	});

	//create extra deck
	deck += textLine("#extra");
	jQuery.each( Deck.extra, function( i, val ) {
	    deck += textLine(val);
	});

	//create side deck
	deck += textLine("!side");
	jQuery.each( Deck.side, function( i, val ) {
	    deck += textLine(val);
	});

    //return the string
 	return deck;
}

$('#editor-menu-content').append('<button id="downloadDeck" class="engine-button engine-button-navbar engine-button-default">Download</button>');

$( "#downloadDeck" ).click(function() {
  download(deckString(), fileName(), "");
});

/* download the file and enjoy :) */


//download(deckString(), fileName(), "");
// ==UserScript==
// @name            Sakura
// @namespace       http://popmundo-diaries.com/
// @Author	    Joe Isaacs CharId #3248185 <joe.isaacs.pm@gmail.com>
// @description     Calls everyone in Popmundo character contact list. Any problems, please contact Joe Isaacs (http://www.popmundo.com/World/Popmundo.aspx/Character/3248185)
// @version         1.2.1
// @include         https://*.popmundo.com/World/Popmundo.aspx/Character/AddressBook
// @include         https://*.popmundo.com/World/Popmundo.aspx/Interact/Phone/*
// @require         https://greasyfork.org/scripts/10151-spfunctions/code/spFunctions.js
// @require         https://greasyfork.org/scripts/10153-sptranslations/code/spTranslations.js
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @grant           GM_info
// ==/UserScript==

var _gwCalling = null;
var _gwAuthor = null;

//Updates the localStorage with the new values
function spStoreValue( mainId, charId, cbbId )
{
    //Gets the value for the given cbbId
    var tmpValue = 25;
    if( typeof document.getElementById( cbbId ) != 'undefined' ) {
	tmpValue = document.getElementById( cbbId ).value;
    }

    storedValues = JSON.parse( window.localStorage.getItem( mainId ) );
    storedValues[charId] = tmpValue;
    window.localStorage.setItem( mainId, JSON.stringify( storedValues ) );
}

// Calls everyone in the contact list
function spCallEveryone( mainId )
{
    itemListId = 1;
    _gwCalling = window.open( '', 'gexWindow', '' );
    var toCall = JSON.parse( window.localStorage.getItem( mainId ) );
    
    var doit = function( key )
    {
	var tmpitemListId = itemListId;
	if( tmpitemListId <= 10 ) {
	    tmpitemListId = 'ctl00_cphLeftColumn_ctl00_repAddressBook_ctl0' + tmpitemListId + '_lnkCharacter';
	} else {
	    tmpitemListId = 'ctl00_cphLeftColumn_ctl00_repAddressBook_ctl' + tmpitemListId + '_lnkCharacter';
	}
	var callObject = document.getElementById( tmpitemListId );
	var callUrl = 'https://' + window.location.hostname + callObject.getAttribute( "href" );
	_gwCalling.location = callUrl;
	itemListId++;
    };
    
    var i = 0;
    for( var key in toCall ) {
	( function()
	{
	    var k = key;
	    setTimeout( 
		function() 
		{
		    doit( key );
		}, 8000 * i );
	} )();
	i += 1;
    }
}

// Create a contact Private Message to the author of the script
function contactAuthor()
{
    _gwAuthor = window.open( '', 'gexAuthor', '' );
    _gwAuthor.location = 'https://' + window.location.hostname + '/World/Popmundo.aspx/Conversations/Conversation/3248185';
}
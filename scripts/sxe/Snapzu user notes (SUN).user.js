// ==UserScript==
// @name        	Snapzu user notes (SUN)
// @namespace   	sxxe@gmx.de
// @description 	Add notes to any user everywhere on snapzu
// @version     	0.2.1
// @grant           GM_setValue
// @grant           GM_getValue
// @grant           GM_deleteValue
// @include         *snapzu.com/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require         https://cdnjs.cloudflare.com/ajax/libs/tooltipster/3.3.0/js/jquery.tooltipster.min.js

// ==/UserScript==

/*
    Features:
    - Add notes to a user anywhere on snapzu.com
    - An indicator is shown as soon as you see the user again
*/


/*
08/04/2015: 0.2.1
            Fixed detection on "Follow page"

08/04/2015: 0.2
            First release
*/




// -------------------------------------------------

var note_username_marker = ' *'; // This shows up behind the username when a note already exists


// -------------------------------------------------


$("head").append (
    '<link href="//cdnjs.cloudflare.com/ajax/libs/tooltipster/3.3.0/css/tooltipster.min.css" rel="stylesheet" type="text/css">'
);

addGlobalStyle('.sunHasData::after { content: "'+note_username_marker+'"; }');
addGlobalStyle('.tooltipster-content > textarea { border: 1px; height: 50px; padding: 3px;}');

var GM_U;
window.addEventListener ("load", function () {
        GM_U = new GM_SNotes ();
    },
    false
);

function GM_SNotes () {
  
    function add_notes () {

        //var authors = $('.btnItem.userHome > a.transition');
		var users = $('a.user').add('.topMembers a.userName');

		for (var i = 0; i < users.length; i++) {

			var elem = users.eq(i);
    		var user = extractUsername(elem.text());
    		var data = GM_getValue(user);

			elem.addClass('sunTooltip');
			if (data !== null) {
				elem.addClass('sunHasData');
			}
		}
    }

    add_notes ();


    var editmode = false;
    // activate tooltips for all users
    $('.sunTooltip').tooltipster({
    	content: 'loading .',
    	functionBefore: function(origin, continueTooltip) {

    		//check if there is data for the user already
    		var user = extractUsername(origin.text());
    		var data = GM_getValue(user);

    		if ( (data === null) || (data === '') ) {
    			data = 'click to add note';
    		}

		    var sun_content = $('<span class="sunContent">'+data+'</span>').on('click', function(event) {
		        event.preventDefault();

		        if (data === 'click to add note') {
		        	data = '';
		        }
		        var edit_content = $('<textarea class="sunContent">'+data+'</textarea>')
		        origin.tooltipster('content',edit_content);
		        editmode = true;

		    });

    		origin.tooltipster('content',sun_content);
    		continueTooltip();
    	},
    	functionAfter: function(origin){
    		if (editmode) {
	       		sunSaveData(origin);  
        		editmode = false;  			
    		}

    	},
    	interactive: true,
    	autoClose: true
    });

    function sunSaveData (origin) {

  		// delete empty entries to keep the database clean
		var user = extractUsername(origin.text());
		var data = origin.tooltipster('content').val();

    	//console.log( user + ': ' + data + 'editmode: ' + editmode);

		if (data === '') {
			origin.removeClass('sunHasData');
			GM_deleteValue(user);
		} else {
			origin.addClass('sunHasData');
			GM_setValue(user, data);
		}
    	
    }
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}



function extractUsername(elem) {

	var user = elem.trim();

    var regExp = /(^\w+)/;
    var match = user.match(regExp);

    if (match[0] !== '') {
        return match[0];
    } else {
        return 0;
    }
}

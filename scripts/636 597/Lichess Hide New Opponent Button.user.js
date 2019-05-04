// ==UserScript==
// @name          Lichess Hide New Opponent Button
// @namespace     http://userstyles.org
// @description   Hides 'New Opponent' Button While Rematch is Still Available to Prevent 'Miss-Clicks'
// @author        636597
// @include       /lichess\.org\/\w{12}$/
// @run-at        document-start
// @version       0.5
// ==/UserScript==

var lichess_ground_class_name = "lichess_ground";
var lichess_ground_element = null;
var lichess_ground_observer = null;

var GAME_OVER = false;
var RESET = false;

var observerConfig = {
    subtree: true ,
    attributes: true,
    childList: true,
    characterData: true
};

function hideNewOpponentButton() {
    if ( !GAME_OVER ) { return; }
    var follow_up_el = document.getElementsByClassName( "follow_up" );
    if ( follow_up_el ) {
        if ( follow_up_el[ 0 ] ) {
            for ( var i = 1; i < follow_up_el[ 0 ].childNodes.length; ++i  ) {
                follow_up_el[ 0 ].childNodes[ i ].setAttribute("style", "visibility: hidden !important");
            }
        }
    }
    setTimeout( function() {
        showNewOpponentButton();
        GAME_OVER = false;
        RESET = true;
    } , 5000 );
}
function showNewOpponentButton() {
    var follow_up_el = document.getElementsByClassName( "follow_up" );
    if ( follow_up_el ) {
        if ( follow_up_el[ 0 ] ) {
            for ( var i = 1; i < follow_up_el[ 0 ].childNodes.length; ++i  ) {
               follow_up_el[ 0 ].childNodes[ i ].setAttribute("style", "visibility: visible !important");
            }
        }
    }
    RESET = false;
}

function loadObserver() {
    lichess_ground_observer = new MutationObserver(function(mutations) {
        mutations.forEach(function( mutation , index ) {
            if ( mutation.type === "childList" ) {
                if ( mutation.target.className === "table_inner" ) {
                    console.log( "Game OVER ???" );
                    GAME_OVER = true;
                    hideNewOpponentButton();
                }
            }
            if ( RESET ) {
                switch( mutation.target.className ) {
                    case "username user_link white offline":
                        //console.log( "White Player === OFFLINE" );
                        showNewOpponentButton();
                        break;                    
                    case "username user_link black offline":
                        //console.log( "Black Player === OFFLINE" );
                        showNewOpponentButton();
                        break;
                    case "username user_link white online":
                        //console.log( "White Player === ONLINE" );
                        hideNewOpponentButton();
                        break;
                    case "username user_link black online":
                        //console.log( "Black Player === ONLINE" );
                        hideNewOpponentButton();
                        break;
                    case "button rematch white disabled":
                        //console.log( "Rematch Button === WHITE ==== DISABLED" );
                        showNewOpponentButton();
                        break;
                    case "button rematch white enabled":
                        //console.log( "Rematch Button === WHITE ==== ENABLED" );
                        //hideNewOpponentButton();
                        break;
                    case "button rematch black disabled":
                        //console.log( "Rematch Button === BLACK ==== DISABLED" );
                        showNewOpponentButton();
                        break;
                    case "button rematch black enabled":
                        //console.log( "Rematch Button === BLACK ==== ENABLED" );
                        //hideNewOpponentButton();
                        break;
                    default:
                        break;
                }
            }
        });
    });
    lichess_ground_observer.observe( lichess_ground_element , observerConfig );
    console.log( "Lichess Hide 'New Opponent' Button Script Loaded" );
}

(function() {
    var ready = setInterval(function(){
        var x1 = document.getElementsByClassName( lichess_ground_class_name );
        if ( x1 ) { if ( x1[ 0 ] ) { lichess_ground_element = x1[0]; clearInterval( ready ); loadObserver(); } }
    } , 2 );
})();
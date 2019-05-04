// ==UserScript==
// @name         Goodreads_Giveaway_Autoclicker
// @namespace    https://greasyfork.org/en/users/98044
// @version      1.4
// @description  This script will auto-click the 'Enter Giveaway' buttons with a default of 2 second delay 
// between clicks. 
// @author       Davinna
// @icon         https://turkerhub.com/data/avatars/l/0/594.jpg?1485199123
// @include      *www.goodreads.com/giveaway*
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @license      https://opensource.org/licenses/MIT
// @copyright    2017-2018 Davinna
// ==/UserScript==
jQuery(document).ready(function(){

//auto-click functionality
    //wait for page to load
  	window.addEventListener('load', function (event) {
      //console.log('load');
    
    //set the list of buttons
    let $giveawayButtons = $('a.gr-button');
      //console.log($giveawayButtons.length);
    
    //number of seconds between clicks
    let seconds = 2;
      //console.log(seconds);
    //the calculated time for  the timeout function
    let timeoutCount = seconds*1000;
      //console.log(timeoutCount);
      
    (function delayLoop (i) {
      setTimeout(function () {
        //click the 'Enter Giveaway' button
        $giveawayButtons[i-1].click();
        //  decrement i and call delayLoop again if i > 0          
        if (--i) delayLoop(i);								                
   			}, timeoutCount)
			})($giveawayButtons.length); //end of delayLoop 
          	
		});//end of 'load' listener
});//end of document ready

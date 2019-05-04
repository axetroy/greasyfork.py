// ==UserScript==
// @namespace       https://openuserjs.org/users/StephenRogers
// @name            Twitter Poll View Results
// @description     Reveal Twitter Poll results without voting
// @copyright       2018, Stephen Rogers (https://openuserjs.org/users/StephenRogers)
// @license         MIT
// @match           https://twitter.com/i/cards/*cardname=poll*
// @grant           none
// @version 0.0.1.20180505222343
// ==/UserScript==

// ==OpenUserJS==
// @author StephenRogers
// ==/OpenUserJS==

try {
  var polls = document.getElementsByClassName("PollXChoice");
  for( var j=0; j<polls.length; j++ ) {
    if( polls[j].getAttribute("data-poll-state")==="opened" ) {
      polls[j].setAttribute("data-poll-state", "final");
    }
  }
}
catch (e)
{
  console.log(e)
}

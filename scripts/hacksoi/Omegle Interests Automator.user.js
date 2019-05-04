// ==UserScript==
// @name         Omegle Interests Automator
// @namespace    http://omeglegroup.edu/
// @version      1.1
// @description  Skips over random strangers when you're just trying to find a person with similar interests.
// @author       hacksoi
// @match        https://www.omegle.com
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$(document).ready(function(){
    // there are three primary states:
    // 1) end of conversation
    // 2) finding a stranger
    // 3) talking to stranger

    setInterval(function() {
        //console.log("does this even work?");

        var mobilesitenote = $("#mobilesitenote");
        if(mobilesitenote.text() == "") {
            // we're not in the homepage

            var statuslogs = $("p.statuslog");
            //console.log(statuslogs);
            if(statuslogs.length != 0 &&
               statuslogs[0].innerHTML == "You're now chatting with a random stranger. Say hi!") {
                // we're in a convesation

                if(statuslogs[1].innerHTML.startsWith("Omegle couldn't find anyone")) {
                    // but the wrong one, or the end of one, so keep pressing the disconnect button (max twice) until we start we start searching for a new stranger

                    var disconnectButton = $("button.disconnectbtn");
                    disconnectButton.click();

                    //console.log("pressed disconnect button");
                } else {
                    // we're in the right conversation!

                    //console.log("we're there!");
                }
            } else {
                // we're searching for a stranger

                //console.log("searching for a stranger...");
            }
        }
    }, 500);
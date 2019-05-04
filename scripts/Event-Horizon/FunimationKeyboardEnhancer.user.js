// ==UserScript==
// @name         FunimationKeyboardEnhancer
// @version      0.1
// @description  Adds keyboard functionality to forward and backward 10 seconds buttons, now mapped with left and right arrows on keyboard. LICENSE: MIT
// @author       Event-Horizon
// @website      https://github.com/Event-Horizon
// @website      https://codepen.io/Event_Horizon
// @match        https://www.funimation.com/player/*
// @run-at       document-start
// @grant        none
// @namespace https://greasyfork.org/users/187354
// ==/UserScript==

(function() {
    'use strict';
    let debug=false, scriptName="FunimationKeyboardEnhancer", scriptiFrameURLTest="https://www.funimation.com/player";

    if(!console.log){
        console.log=function(s){
            if(debug){
                alert(s);
            }
        }
    }else{
        console.log=function(s){if(debug){console.log(s);}}
    }

    console.log(scriptName+" script loaded.");
    document.addEventListener("DOMContentLoaded",function(){

        console.log("DOMContent loaded searching for player.");
        let insideiFrameURL=false;
        let limitCheck = 1000;
        let countCheck = 0;

        function clearIntTest(bool){
            if(bool){
                clearInterval(checkExist);
                console.log("Interval cleared.");
            }
            if(countCheck>limitCheck){
                clearInterval(checkExist);
                console.log("Cancelled interval due to attempts count.");
            }
        }

        function checkForButtons(){
            let iFramePlayerId="funimation-player",
                playerId="player",
                iFramePlayerDOM=document.getElementById(iFramePlayerId),
                playerDOM=document.getElementById(playerId),
                playerDoc,
                result=null;
            if(~document.location.href.indexOf(scriptiFrameURLTest)){// ~ converts -1 to 0 and anything else to non-zero (so false if -1 and true if not -1)
                console.log("Inside iFrame URL.");
                insideiFrameURL=true;
            }//endif

            if(insideiFrameURL&&iFramePlayerDOM){
                console.log("iFrameDoc Loaded:",document);
                result=hookButtons(document);
                clearIntTest(result);
            }else if (playerDOM) {
                console.log("Not inside iFrame, Player exists!");
                playerDOM.addEventListener("load",function(){
                    playerDoc=this.contentDocument;
                    console.log("PlayerDoc Loaded:",playerDoc);
                    result=hookButtons(playerDoc);
                    clearIntTest(result);
                });
            }else{
                console.log("Player doesn't exist or not detected.");
            }

            result=null;
            countCheck+=1;
            clearIntTest();
        }

        function hookButtons(player){
            console.log("Hooking buttons.","Hooked iFrame document: ",player);
            const LEFT_ARROW=37, RIGHT_ARROW=39;
            let backwardButtonId="funimation-control-back", forwardButtonId="funimation-control-forward";

            let backwardButtonDOM = player.getElementById(backwardButtonId);
            if(backwardButtonDOM){
                console.log("Skip backward button hooked as: ",backwardButtonDOM);
                document.addEventListener("keyup", function(e) {
                    if (e.keyCode === LEFT_ARROW) {
                        backwardButtonDOM.click();
                        console.log("Skip backward button clicked.");
                    }
                });
            }else{
                console.log("Backward button not found.");
                return false;
            }

            let forwardButtonDOM = player.getElementById(forwardButtonId);
            if(forwardButtonDOM){
                console.log("Skip forward button hooked as: ",forwardButtonDOM);
                document.addEventListener("keyup", function(e) {
                    if (e.keyCode === RIGHT_ARROW) {
                        forwardButtonDOM.click();
                        console.log("Skip forward button clicked.")
                    }
                });
            }else{
                console.log("Forward button not found.");
                return false;
            }

            return true;
        }//end hookButtons

        let checkExist = setInterval(checkForButtons, 1000);//do not set as ??var?? seems to hoist to global scope or something to that effect

    });//end domcontentloaded
})();
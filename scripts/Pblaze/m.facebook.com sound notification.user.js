// ==UserScript==
// @name         m.facebook.com sound notification
// @namespace    http://tampermonkey.net/
// @version      2.3
// @description  Play sound and vibrate your phone when a message comes.
// @author       Psyblade
// @match        https://m.facebook.com/*
// @grant        none
// ==/UserScript==

//Disable page visibility api to make browser play sound even when browser is off to the bottom, or when the active web tab is not Facebook.
Object.defineProperties(document.wrappedJSObject,{ 'hidden': {value: false}, 'visibilityState': {value: 'visible'} });
window.addEventListener( 'visibilitychange', evt => evt.stopImmediatePropagation(), true);

//For some reason, this procedure is must to make Yandex Browser use this script stably.
var initialization = new Audio('https://raw.githubusercontent.com/psyblade12/Notification-in-m.facebook.com/master/Initialization.mp3');
initialization.play();

//Add event listener to element #5 of classes named "_59tg". Event will fire if the web browser detects changes in inner HTML of that element.
document.getElementsByClassName("_59tg")[5].addEventListener("DOMNodeInserted", function(){
        var b =  document.getElementsByClassName("_59tg");
    //If there is a mess, then its inner HTML of this element will be something, like "1","2" or "3".... except "0"
        if(b[5].innerHTML != "0")
        {
                //Play the notification sound. If you want, then change the link. Replace my link by any sound you want to hear.
                var audio = new Audio('https://raw.githubusercontent.com/psyblade12/Notification-in-m.facebook.com/master/FBMessSound.ogg');
                audio.play();
               //Vibrate the phone.
                window.navigator.vibrate(500);
        }
});
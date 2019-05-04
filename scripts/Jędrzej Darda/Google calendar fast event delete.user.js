// ==UserScript==
// @name         Google calendar fast event delete
// @namespace    http://tampermonkey.net/
// @version      0.1.2
// @description  Delete events by right clicking
// @author       You
// @match        https://calendar.google.com/calendar/r*
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    var blockContextMenu, myElement;

    function eventFire(el, etype){
        if (el.fireEvent) {
            el.fireEvent('on' + etype);
        } else {
            var evObj = document.createEvent('Events');
            evObj.initEvent(etype, true, false);
            el.dispatchEvent(evObj);
        }
    }

    var interval = null;

    blockContextMenu = function (evt) {
        //console.log(evt.which);
        //if (evt.which === 3) {
        evt.preventDefault();
        interval = setInterval(function () {
            var deleteButton = document.querySelector('.z80M1.PeCuse'); //that doesn't do anything, the element is immediately there, just not clickable
            if (deleteButton) {
                eventFire(deleteButton, 'mousedown');
                eventFire(deleteButton, 'mouseup');
                setTimeout(function () {
                    var okButton = document.querySelector('.O0WRkf.oG5Srb.HQ8yf.C0oVfc.kHssdc.HvOprf');
                    if (okButton) {
                        eventFire(okButton, 'click');
                    }
                }, 600);
                clearInterval(interval);
            }
        }, 500);
        //}
    };

    setInterval(function() {
        myElement = document.querySelectorAll('.lFe10c');
        myElement.forEach(function(elem) {
            elem.removeEventListener('contextmenu',blockContextMenu);
            elem.addEventListener('contextmenu',blockContextMenu);
            //$(elem).off( "click", blockContextMenu).on( "click", blockContextMenu);
        });
    }, 1000);


})();
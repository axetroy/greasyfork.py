/* eslint-disable */
// ==UserScript==
// @name         Filter Evader
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  ;)
// @author       KyoDaz
// @match        https://epicmafia.com/game/*
// @grant        none
// ==/UserScript==

//
//
//

// ==/UserScript==

(function() {
    'use strict';

    var interval = setInterval(() => {
        if(window.angular) {
            if(!angular.element(document.getElementById('speak')).scope()) {
                angular.reloadWithDebugInfo()
            }
            clearInterval(interval);
        }
    }, 100);

    const speak = $('#speak');
    const scope = angular.element('#speak').scope();
    if(!scope) return;

    const send_msg = scope.send_msg;

    const new_send_msg = function(e) {
        var words = $('#typebox').val().split(' ').map(word => {
            if(/^[a-zA-Z]+$/.test(word)) {
                return word.slice(0, 1) + '\u0000' + word.slice(1)
            }
            return word;
        });
        $('#typebox').val(words.join(' '));
        send_msg(e);
    }

    scope.send_msg = new_send_msg;

})();
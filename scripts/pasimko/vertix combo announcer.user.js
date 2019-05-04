// ==UserScript==
// @name         vertix combo announcer
// @version      0.1.1
// @description  announces vertix kill combos in chat
// @author       pasimko
// @match        http://vertix.io/
// @namespace https://greasyfork.org/users/48620
// ==/UserScript==

    announce = function() {
        socket.on("3", function(a) {
            if(2 == a.kd) {chat.sendChat("DOUBLE");}
        });
    };
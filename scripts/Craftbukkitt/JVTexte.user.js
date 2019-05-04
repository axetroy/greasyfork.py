// ==UserScript==
// @name         JVTexte
// @namespace    
// @version      1
// @description  JVVV
// @author       
// @match        http://www.jeuxvideo.com/*
// ==/UserScript==
(function() {
    'use strict';
    const texteAdd = "Bonjour,\r\n\r\nLobix, assistance technique DICE.\r\n";
    
    function isForum() {
        return (document.URL.indexOf("/0-") != -1) ? true : false;
    };
    function isTopic() {
        return (document.URL.indexOf("/42-") != -1 || document.URL.indexOf("/1-") != -1) ? true : false;
    };
    function doMessage() {
        document.getElementById("message_topic").value = texteAdd;
    };
    
    if(isForum() || isTopic())
        doMessage();
})();
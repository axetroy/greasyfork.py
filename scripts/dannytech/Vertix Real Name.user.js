// ==UserScript==
// @name         Vertix Real Name
// @namespace    dannytech
// @version      0.1
// @description  Shows the real name of logged in users
// @author       dannytech
// @match        http://vertix.io/
// @grant        none
// ==/UserScript==

(function() {
    window.findUserByIndex = function(a) {
        for (var b = 0; b < gameObjects.length; ++b)
            if (gameObjects[b].index === a) {
                var playerTemp = gameObjects[b];
                if(playerTemp.isLoggedIn)
                    playerTemp.name = playerTemp.account.user_name;
                return playerTemp;
            }
        return null;
    };
})();
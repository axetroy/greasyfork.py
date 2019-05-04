// ==UserScript==
// @name         Cookie Clicker Auto-Clicker+
// @namespace    https://github.com/SuperPommeDeTerre
// @version      2.7
// @description  A Insane Cookie Clicker Auto Clicker
// @author       JordanOP
// @match        http://cafe-capy.net/cookieclicker/
// @match        http://orteil.dashnet.org/cookieclicker/
// @grant        JordanOP
// ==/UserScript==

(function() {
    function ClickGoldenCookie() {
        for( var i in Game.shimmers ) {
            var s = Game.shimmers[i];
            if (s.type == "golden") {
                s.pop();
            }
        }
    }
    setInterval(function() {Game.ClickCookie(); }, 0.00000001);
    setInterval(function() {
        for( var i in Game.shimmers ) {
            var s = Game.shimmers[i];
            if( s.type == "golden" )
                s.pop();
        }
    }, 100);
})();
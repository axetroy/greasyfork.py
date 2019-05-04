
// ==UserScript==
// @name         Cookie Clicker Auto-Clicker
// @namespace    https://github.com/Isaac Lansdell
// @version      1.0
// @description  Cookie Clicker Auto click
// @author       Isaac Lansdell
// @match        http://cafe-capy.net/cookieclicker/
// @match        http://orteil.dashnet.org/cookieclicker/
// @grant        aoh72931
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
    setInterval(function() {Game.ClickCookie(); }, 0.1);
    setInterval(function() {
        for( var i in Game.shimmers ) {
            var s = Game.shimmers[i];
            if( s.type == "golden" )
                s.pop();
        }
    }, 100);
})();
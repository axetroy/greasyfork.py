// ==UserScript==
// @name        PTE Firestorm
// @version     2017.13
// @author      f@NTisi
// @description auto PTE-Cheat 2017
// @include     http*://prodgame*.alliances.commandandconquer.com/320/index.aspx*
// @grant       none
// @namespace https://greasyfork.org/users/112572
// ==/UserScript==
(function() {
    var PTECheatFire = function() {
        function PTECheatCreate() {
            try {
                //     qx.core.Init.getApplication().getChat().getChatWidget().send("/cheat maxresources");
                var bases = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
                //var wishLevel = 65;
                var i = 0;
                //if (ClientLib.Data.MainData.GetInstance().get_Player().GetCommandPointCount() < 60) {
                  //  qx.core.Init.getApplication().getChat().getChatWidget().send("/cheat maxcp");
                //}
                for (var key in bases) {
                    if (bases[key].GetFullConditionInPercent() < 100 && !bases[key].get_IsGhostMode()) {
                        qx.core.Init.getApplication().getChat().getChatWidget().send("/cheat repairallpte " + i);
                    }
                    if (bases[key].get_hasCooldown() === true) {
                        qx.core.Init.getApplication().getChat().getChatWidget().send("/cheat resetmovecooldownpte");
                    }
                    i++;
                }
                window.setTimeout(PTECheatCreate, 2600);
            } catch (e) {
                console.log(e);
            }
        }

        function LoadExtension() {
            try {
                if (typeof(qx) != 'undefined') {
                    if (!!qx.core.Init.getApplication().getMenuBar()) {
                        PTECheatCreate();
                        return;
                    }
                }
            } catch (e) {
                if (console !== undefined) console.log(e);
                else if (window.opera) opera.postError(e);
                else GM_log(e);
            }
            window.setTimeout(LoadExtension, 1000);
        }
        LoadExtension();
    };

    function Inject() {
        if (window.location.pathname != ("/login/auth")) {
            var Script = document.createElement("script");
            Script.innerHTML = "(" + PTECheatFire.toString() + ")();";
            Script.type = "text/javascript";
            document.getElementsByTagName("head")[0].appendChild(Script);
        }
    }
    Inject();
})();
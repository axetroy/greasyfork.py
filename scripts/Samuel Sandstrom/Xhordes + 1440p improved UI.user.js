// ==UserScript==
// @name         Xhordes + 1440p improved UI
// @namespace    http://tampermonkey.net/
// @version      0.5.3
// @description  A modded version of the Hordes.io client
// @author       LegusX + korvnisse
// @match        https://hordes.io/
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
//@run-at document-start
// ==/UserScript==

(function(){
    window.stop();
    GM_xmlhttpRequest({
        method: 'GET',
        url: "https://hordes.io",
        onload: function(ev) {
            document.open();
            let index = ev.responseText.replace('<script src="script/dist.min.js"></script>', '<script src="https://cdn.rawgit.com/LegusX/xhordes/958e990f/src/levelup/levelup2.js"></script> ');
            document.write(index);

                function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }
    //MAIN SCRIPT END

    //Targetpanel Position
    addGlobalStyle('#upperLeftContainer { margin: 260px; top: 680px; left: 578px; !important; }');

    //Targetpanel size + Colors/Opacity
    addGlobalStyle('.targetPanel { margin: 0 150px 5px 198px; padding: 5px 0px 0px; background-color: rgba(255,255,255,0.7); color: #000000; !important; }');
    addGlobalStyle('.targethealthtext { color: #000000; !important; }');
    addGlobalStyle('.targetlevel { color: #000000; !important; }');
    addGlobalStyle('.hpbarbg { background-color: rgba(255,255,255); !important; }');
    addGlobalStyle('.hpbar { background-color: rgba(0,255,0,0.5); !important; }');
    addGlobalStyle('#resources { background-color: rgba(255,255,255,0.3); !important; }');

    //Character/inv position
    addGlobalStyle('#characterpanel { top: 1147px; left: 863px; !important; }');
    addGlobalStyle('#inventory { top: 1158px; left: 1592px; !important; }');

    //Chatbox Height size (160px Normal) Color/Opacity (255,255,255,0.5 normal)
    addGlobalStyle('#chatbox { height: 500px; background:rgba(255,255,255,0.5); !important; }');

    //ChatFontSize
    addGlobalStyle('#chatboxBody { font-size: 14px; !important; }');

    //ChatBackgroundColors
    addGlobalStyle('.chatmsg-pk { background-color: rgba(255,225,225,0.5); !important; }');
    addGlobalStyle('.chatmsg-exp { background-color: rgba(150,200,255,0.5); !important; }');
    addGlobalStyle('.chatmsg-loot { background-color: rgba(255,200,255,0.5); !important; }');

            document.close();
        }
    });
})();

// ==UserScript==
// @name        Youtube - Wide video container
// @namespace   1N07
// @author      1N07
// @description wide video container on youtube
// @include     https://www.youtube.com/*
// @version     1.7.2
// @grant       GM_registerMenuCommand
// @grant       GM_unregisterMenuCommand
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

(function() {

    var FPPHandle;
    var FPPCompOn = GM_getValue("FPPCompOn", false);
    SetOptionHandle();

    if(!!document.getElementById("early-body")) { //if old youtube
        document.getElementById("content").setAttribute("style", "width: 99%;");
    } else { //new youtube
        addGlobalStyle(`
			ytd-app #page-manager > ytd-browse:not([page-subtype="playlist"]) ytd-two-column-browse-results-renderer.ytd-browse
			{
				box-sizing: border-box;
				width: auto;
				margin: 10px;
			}
		`);

        if(FPPCompOn) {
			addGlobalStyle(`
				/*========== Fade++ Compatibility ==========*/
				ytd-app #page-manager > ytd-browse:not([page-subtype="playlist"]) {
					display: block;
				}
				ytd-app[guide-persistent-and-visible] #page-manager > ytd-browse:not([page-subtype="playlist"]) ytd-two-column-browse-results-renderer.ytd-browse
				{
					margin-left: 250px !important;
				}
			`);
        }
    }

    function SetOptionHandle() {
        GM_unregisterMenuCommand(FPPCompOn);

        FPPHandle = GM_registerMenuCommand("Fade++ Compatibility mode (" + (FPPCompOn ? "On" : "Off") + ") -click to change-", function(){
            FPPCompOn = !FPPCompOn;
            GM_setValue("FPPCompOn", FPPCompOn);
            SetOptionHandle();

            if(confirm('Press "OK" to refresh the page to apply new settings'))
                location.reload();
        });
    }

    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }
})();
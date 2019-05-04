// ==UserScript==
// @name           Facebook Logout figuccio Shortcut  Press Alt
// @namespace https://greasyfork.org/users/237458
// @version        0.1
// @author      figuccio
// @description    Press Alt to logout
// @include        https*://*.facebook.com/*
// @grant          none
// ==/UserScript==

window.onload = function(){
    document.getElementById('userNavigationLabel').click();
    document.getElementById('userNavigationLabel').click();
}

var eventUtility = {
    addEvent : function(el, type, fn) {
        if (typeof addEventListener !== "undefined") {
            el.addEventListener(type, fn, false);
        } else if (typeof attachEvent !== "undefined") {
            el.attachEvent("on" + type, fn);
        } else {
            el["on" + type] = fn;
        }
    }
};

(function() {
	eventUtility.addEvent(document, "keydown",
		function(evt) {
			var code = evt.keyCode,
			altKey = evt.altKey;

			if (altKey) {
                console.log("logging out!");
				document.forms[document.forms.length-1].submit();
			}
		});
}());

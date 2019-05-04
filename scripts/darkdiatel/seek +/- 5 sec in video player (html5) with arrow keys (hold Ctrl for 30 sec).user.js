// ==UserScript==
// @name         seek +/- 5 sec in video player (html5) with arrow keys (hold Ctrl for 30 sec)
// @description  ^^^^^^^
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       jaborandi
// @match        http://ru.eurosportplayer.com/*
// @grant        none
// ==/UserScript==

(function() {
window.addEventListener('load', function() {
    document.addEventListener('keydown', function(e) {
		if (![37,39].includes(e.keyCode)) return;
		var player = document.getElementsByTagName('video')[0];
		if (!player) return;
        if (e.keyCode == 37) player.currentTime -= e.ctrlKey?30:5;
		else /* if (e.keyCode == 39) */ player.currentTime += e.ctrlKey?30:5;
    });
});
})();
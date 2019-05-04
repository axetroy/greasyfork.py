// ==UserScript==
// @name           Bug 667607 (タブを閉じた時の隙間を埋める)
// @namespace      https://userscripts.org/users/347021
// @version        1.1.2
// @description    [userChromeJS] タブを閉じた時、タブバーの右端に生じる隙間をすぐに埋める / Resize tabs to fill the tab bar immediately after closing a tab (Firefox 4 feature)
// @include        main
// @author         100の人 https://greasyfork.org/users/137-100%E3%81%AE%E4%BA%BA
// @license        Creative Commons Attribution 4.0 International Public License; http://creativecommons.org/licenses/by/4.0/
// ==/UserScript==

(function () {
'use strict';

gBrowser.removeTab = new Proxy(gBrowser.removeTab, {
	apply: (func, tabbrowser, argumentList) => {
		let aParams = argumentList[1];
		if (aParams && aParams.byMouse) {
			delete argumentList[1].byMouse;
		}
		func.apply(tabbrowser, argumentList);
	},
});

})();

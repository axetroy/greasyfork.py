// ==UserScript==
// @id				NewFork_g2s
// @name			新しいフォーク
// @version			0.0.2
// @namespace		NewFork_g2s
// @author			NewFork_g2s
// @description		https://greasyfork.org/ から　https://sleazyfork.org/　にリダイレクトします。
// @license			Public Domain
// @include			*://*.greasyfork.org.org*
// @run-at			document-start
// ==/UserScript==

(function () {

window.location.href = window.location.href.replace("greasyfork","sleazyfork");

})();
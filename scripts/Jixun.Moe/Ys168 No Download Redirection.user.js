 // ==UserScript==
// @name        Ys168 No Download Redirection
// @namespace   http://jixun.org/
// @version     0.2
// @description No redirection while downloading file from ys168. E.g. Executable File.
// @include     *://*.ys168.com/
// @copyright   2012+, You
// @grant       none
// @run-at      document-end
// ==/UserScript==

(function () {
	var _mldq = window.mldq;
	if (!_mldq) return ;
	
	var sKey = '/note/fd.htm?';

	window.mldq = function () {
		var ret = _mldq.apply(this, arguments);
		
		var eLinks = document.querySelectorAll ('a[href^="' + sKey + '"]');
		for (var i=0; i<eLinks.length; i++) {
			eLinks[i].href = eLinks[i].href.substr (eLinks[i].href.indexOf (sKey) + sKey.length);
			eLinks[i].removeAttribute('target');
		}

		return ret;
	};
})();
// ==UserScript==
// @name         Greasyfork - DD/MM/YYYY
// @version      1.0.0
// @description  Changes the date to the european standard
// @author       Cpt_mathix
// @match        https://greasyfork.org/*
// @grant        none
// @namespace https://greasyfork.org/users/16080
// ==/UserScript==

(function() {    
    var elements = document.querySelectorAll('time');
    for (var i = 0; i < elements.length; i++) {
		elements[i].innerHTML = elements[i].innerHTML.replace(/\d\d\d\d-\d\d-\d\d/g, function(s) {
			var mdy = s.split('-');
			return mdy[2] + '-' + mdy[1] + '-' + mdy[0];
		});
	}
})();


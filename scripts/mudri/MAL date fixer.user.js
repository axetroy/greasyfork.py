// ==UserScript==
// @name       MAL date fixer
// @namespace  http://userscripts.org/scripts/show/103812
// @version    0.2.2
// @description  Changes the hideous MM-DD-YY formatted dates on My Anime List to YYYY-MM-DD
// @match      *://myanimelist.net/*
// @copyright  2014+, James Wood
// @grant      none
// ==/UserScript==

// If you want a date format other than YYYY-MM-DD, see http://bit.ly/1naOVYW.
// It outputs D/M/YYYY, so gives examples of changing the separators and order
// of components, as well as trimming off leading ‘0’s. Don't be afraid to
// customise; there's barely anything that could go wrong!

(function() {
    var el = document.getElementById('contentWrapper');
    el.innerHTML = el.innerHTML.replace(/\b\d\d-\d\d-\d\d\b/g, function(s) {
        var mdy = s.split('-');
        return '20' + mdy[2] + '-' + mdy[0] + '-' + mdy[1];
    });
})();
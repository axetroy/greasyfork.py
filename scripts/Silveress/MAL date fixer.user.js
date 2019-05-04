// ==UserScript==
// @name            MAL date fixer
// @version         1.1.2
// @description     Changes the hideous MM-DD-YY formatted dates on My Anime List to DD-MM-YY
// @match           *://myanimelist.net/*	
// @grant           none
// @author          Silveress
// @copyright       2014+, Silveress
// @namespace https://greasyfork.org/users/225
// ==/UserScript==

///////////////////////////////////////////////////////////////////////////////
// Original script by James Wood : https://greasyfork.org/en/users/516-mudri //
///////////////////////////////////////////////////////////////////////////////

(function() {    
    var el = document.getElementById('contentWrapper');    
    var dateTrim = function(s) {    
        return s[0] == '0' ? s[1] : s ;    
    };    
    el.innerHTML = el.innerHTML.replace(/\d\d-\d\d-\d\d/g, function(s) {    
        var mdy = s.split('-');    
        return dateTrim(mdy[1]) + '/' + dateTrim(mdy[0]) + '/20' + mdy[2];    
    });    
})();
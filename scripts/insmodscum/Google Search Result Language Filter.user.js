// ==UserScript==
// @name            Google Search Result Language Filter
// @author
// @description     Show only English results in Google Search. Needs "Google Search Tools Back" (https://userstyles.org/styles/95110/google-search-tools-back) CSS style.
// @downloadURL
// @grant
// @homepageURL     https://bitbucket.org/INSMODSCUM/userscripts-scripts/src
// @icon
// @include         /https?://(www|encrypted).google(.\w+)(.\w+)?/((\?|#|search|webhp).*)?/
// @namespace       insmodscum 
// @require
// @run-at
// @updateURL
// @version         1.0
// ==/UserScript==

(function() {

    function get_form_lr(){

        var list = ['','lang_en'];
        var strlist = ['Any Language','English'];
        var baseurl = document.location.href.replace(/lr=([^&]+)&?/, '');
        var current = (RegExp.$1)? RegExp.$1 : '';
        var generateOption = function(v) {
            var i;
            var valuestr;
            for( i = 0 ; i < list.length ; i++ ){
                if( v == list[i] ){
                    valuestr = strlist[i];
                }
            }
            return '<option value="' + v + '"' + ((v == current)? ' selected="1"' : '') + '>' + valuestr + '</option>';
        };
        var opts = list.map(generateOption).join("\n");

        var func =  "var baseurl = document.location.href.replace(/&+lr=([^&]+|)(&+|$)/, '&');" +
                    "baseurl = baseurl.replace( /\\?lr=.+?&/ , '?' );" +
                    "var url = baseurl.replace(/https:\\/\\/www\\.google\\.com\\/search\\?/, 'search?');" +
                    "url = url + '&lr=' + this.options[ this.selectedIndex ].value;" +
                    "location.href = url;";
        return '<select style="width:90px" size="1" name="lr5" onchange="' + func + '">' + opts + '</select>';

    }

	document.getElementById('logocont').innerHTML = document.getElementById('logocont').innerHTML + "<div style=\"position:fixed;margin-left:17px; margin-top:20px; display\"><form>" + get_form_lr() + "</form></div>";
})();
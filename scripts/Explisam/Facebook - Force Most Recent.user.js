// ==UserScript==
// @name        Facebook - Force Most Recent
// @namespace   https://greasyfork.org/users/222319
// @version     1.0.2
// @description Always set news feed to 'Most Recent'.
// @author      Explisam <explisam@gmail.com>
// @compatible  chrome
// @compatible  firefox
// @compatible  opera
// @compatible  safari
// @license     MIT License <https://opensource.org/licenses/MIT>
// @include     *www.facebook.com
// @include     *www.facebook.com/
// @include     *www.facebook.com/?*
// @run-at      document-start
// ==/UserScript==

(function() {
    'use strict';
    var url_string = window.location.href;
    var url = new URL(url_string);
    var sk = url.searchParams.get("sk");
    var p = (/(?<=\?).+/).exec(url_string);

    if (sk !== "h_chr") {
        var params = p ? p.toString().replace(/sk=.*?(&|$)/, "") : "";
        params = params.concat(params ? params.match(/&$/) ? "sk=h_chr" : "&sk=h_chr" : "sk=h_chr");
        window.location.replace(("https://www.facebook.com/?").concat(params));
    }
})();
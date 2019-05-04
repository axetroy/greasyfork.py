// ==UserScript==
// @name       Show all child pages in Confluence
// @namespace  https://bogner.sh/?p=970
// @version    1.2
// @description  This extension automatically clicks the "X more child pages" link in Confluence's sidebar to show all child pages
// @include *confluence*
// @copyright  2014+, Florian Bogner
// ==/UserScript==

$(document).ready(function() {
    // If the title includes the magic word "Confluence" ...
    if (document.title.indexOf("Confluence")!==false) {
        // ... click the "X more child pages link".
 		$(".more-children-link").click();
    }
});
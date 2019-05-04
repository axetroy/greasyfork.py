// ==UserScript==
// @name            Derefered
// @namespace       varb
// @version         0.2
// @description     Ctrl-click opens pages through a dereferer.
// @match           *://*/*
// @grant           none
// @noframes
// @run-at          document-end
// @license         WTFPL Version 2; http://www.wtfpl.net/txt/copying/
// ==/UserScript==

(function () {
    document.addEventListener('click', function (e) {
        if (e.target.tagName === 'A' && e.ctrlKey) {
            e.preventDefault();
            window.open(deref(e.target.href), '_blank');
        }
    }, false);

    function deref(uri) {
        return 'http://www.dereferer.org/?' + encodeURIComponent(uri);
    }
})();

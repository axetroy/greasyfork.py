// ==UserScript==
// @name         skyscrapercity.com large images fix
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Fix the layout problem caused by large images on skyscrapercity.com
// @author       Anonymous
// @match        http://www.skyscrapercity.com/showthread.php*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    GM_addStyle('.alt1 img { max-width: 99%; max-height: 720px; }');
})();
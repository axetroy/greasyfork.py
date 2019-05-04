// ==UserScript==
// @name         Yandex.Direct ad blocker
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Removing to the Yandex Direct banners
// @author       Vite
// @match        *://*/*
// @grant        <> <! [CDATA []]> </>
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// ==/UserScript==

(function() {
    'use strict';

    function removeAds()
    {
        if ($('.xhtml_banner').length)
        {
            $('.xhtml_banner').remove();
        }
        if ($('yatag').length)
        {
            $('yatag').remove();
        }
        if ($(".b-inline.b-inline_banner").length)
        {
            $(".b-inline.b-inline_banner").remove();
        }
    }
    document.addEventListener("DOMContentLoaded", removeAds);
    document.addEventListener("DOMSubtreeModified", removeAds);
})();
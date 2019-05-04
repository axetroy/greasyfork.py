// ==UserScript==
// @name         Heart all time
// @namespace    Heart all time
// @version      1.0
// @description  Mixlr Heart all time
// @author       @niko1094
// @match        *mixlr.com/*
// @grant        none
// ==/UserScript==
(setInterval(function(){
    $('a[title^="Heart this now"]').trigger('click');
}, 500))(jQuery);
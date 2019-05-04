// ==UserScript==
// @name         Easyhits4u Offers
// @namespace    hsvvietnam
// @version      1
// @description  Login, click on Offers and the bot starts
// @author       hsvvietnam
// @match        http://www.easyhits4u.com/*
// @match        https://www.easyhits4u.com/*
// ==/UserScript==

(function() {
    if(document.location.href.indexOf('offers') > -1)
    {
        $('.link:eq(1)').click();
        setTimeout( function() {
            var o =  $('#bonuses-block').find('a').not("a[href$='b2click123']").attr('href');
            if(o !== null)
                window.open(o, '_self');
        }, 3000);
    }
})();
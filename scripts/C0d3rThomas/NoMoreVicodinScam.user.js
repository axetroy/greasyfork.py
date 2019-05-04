// ==UserScript==
// @name         NoMoreVicodinScam
// @namespace    LordBusiness.NMVS
// @version      2.7
// @description  Hides Vicodin priced over $50k so that you don't get scammed of your cash!
// @author       LordBusiness [2052465]
// @match        https://www.torn.com/bazaar.php*
// ==/UserScript==

const observer = new MutationObserver(() => {
    observer.disconnect();
    const Vicli = $("#bazaar-page-wrap > div.bazaar-page-wrap.bazaar-main-wrap > div > ul > li:contains('Vicodin')");
    const price = parseInt((Vicli.find(".desc > .wrap > .price").text()).replace( /[^0-9]/g, ''));
    if(price > 50000) {
        Vicli.hide();
    }
});

const wrapper = document.querySelector('.content-wrapper');
observer.observe(wrapper, { subtree: true, childList: true });
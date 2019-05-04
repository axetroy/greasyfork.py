// ==UserScript==
// @name        Clarin no paywall
// @namespace   dsr-clarin
// @include     *://*.clarin.com/*
// @version     1.0.0
// @description Saltear la ventana de login en clarin.com
// @author      DSR!
// @grant none
// ==/UserScript==

// son las cookies a voletear
var target = [
    'paywall-choque',
    'apw_aac_CLARIN_D',
    'apw_cache'
];


// script
function deleteCookie(cookie_name, valid_domain) {
    // IMPORTANT! When deleting a cookie, you must pass the exact same path and domain attributes that were used to set the cookie
    var domain_string = valid_domain ? ("; domain=" + valid_domain) : '' ;
    document.cookie = cookie_name + "=; max-age=0; path=/" + domain_string ;
}

if (window.location.pathname === '/suscripciones/landing.html') {
    console.log(document.cookie);

    for (var i = 0; i < target.length; i++) {
        deleteCookie(target[i], '.clarin.com')
    }

    // consigan un laburo honrado
    var parse = new URL(window.location.href);
    window.location = parse.searchParams.get('apw-origin');
}

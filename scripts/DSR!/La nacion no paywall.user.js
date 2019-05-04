// ==UserScript==
// @name        La nacion no paywall
// @namespace   dsr-lanacion
// @include     *://*.lanacion.com.ar/*
// @version     1.0.0
// @description Saltear la ventana de login en lanacion.com.ar
// @author      DSR!
// @grant none
// ==/UserScript==

// son las cookies a voletear
var target = [
    'apw_cache',
    'apw_aac_0',
    'countNotas'
];


// script
function deleteCookie(cookie_name, valid_domain) {
    // IMPORTANT! When deleting a cookie, you must pass the exact same path and domain attributes that were used to set the cookie
    var domain_string = valid_domain ? ("; domain=" + valid_domain) : '' ;
    document.cookie = cookie_name + "=; max-age=0; path=/" + domain_string ;
}

if (window.location.pathname === '/suscripcion/V/1/1/') {
    console.log(document.cookie);

    for (var i = 0; i < target.length; i++) {
        deleteCookie(target[i], '.lanacion.com.ar')
    }

    // consigan un laburo honrado
    var parse = new URL(window.location.href); 
    decode = window.atob(parse.searchParams.get('callback'));
    window.location = decode;
}

// nota de color...
// los medios son tan chotos en nuestro pais que hasta en esto son iguales
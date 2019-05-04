// ==UserScript==
// @name       Taringa! scroll
// @version    0.0.1
// @description  scroll
// @match      http://www.taringa.net/*
// @include    http*://www.taringa.net/*
// @copyright  @ramirobelmonte6
// @namespace  http://www.taringa.net/ramirobelmonte6
// @icon http://o1.t26.net/images/favicon.ico
// ==/UserScript==

var clicked =  false , clickY ; 
$ ( document ). on ({ 
    'mousemove' :  function ( e )  { 
        clicked && updateScrollPos ( e ); 
    }, 
    'mousedown' :  function ( e )  { 
        clicked =  true ; 
        clickY = e . pageY ; 
    }, 
    'mouseup' :  function ()  { 
        clicked =  false ; 
        $ ( 'html' ). css ( 'cursor' ,  'auto' ); 
    } 
});

var updateScrollPos =  function ( e )  { 
    $ ( 'html' ). css ( 'cursor' ,  'row-resize' ); 
    $ ( window ). scrollTop ( $ ( window ). scrollTop ()  +  ( clickY - e . pageY )); 
}

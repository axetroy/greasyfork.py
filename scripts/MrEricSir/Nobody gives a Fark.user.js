// ==UserScript==
// @name        Nobody gives a Fark
// @description Removes junk on Fark.com
// @date        2013-02-23
// @include     http://*.fark.com/*
// @include     http://fark.com/*
// @include     http://foobies.com/*
// @include     http://*.foobies.com/*
// @license     MIT
// @run-at      document-start
// @grant       none
// @version 0.0.1.20150501234319
// @namespace https://greasyfork.org/users/6016
// ==/UserScript==

//
// Removes Fark "featured partners" and crap like that.
//

// Add global CSS styles
// from http://diveintogreasemonkey.org/patterns/add-css.html
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// Removes an element given the class name.
function hideByClassName(className) {
   var elements = document.getElementsByClassName( className );
   for ( var i = 0; i < elements.length; i++ ) {
     var element = elements[i];
     element.parentNode.removeChild( element );
  }
}

// Removes an element given the ID.
function hideByID(idName) {
    var element = document.getElementById(idName);
    if ( element )
        element.parentNode.removeChild( element );
}

// Run the JS prior to page display for faster results.
window.addEventListener ('beforescriptexecute', remover, true);
function remover() {
    hideByID('header');         // No need for a header
    hideByID('BF_WIDGET_1');       // "Featured partner" sites listed with main links
    hideByID('BF_WIDGET_2');
    hideByID('boxSwap');           // Featured sites
    hideByID('alsoOnFarkTable');   // Also on Fark
    hideByID('facebook');          // Social media
    hideByID('gplus');
    hideByID('twitter');
    hideByID('pinterest');

    hideByClassName('shoprotator');         // Fark shop
    hideByClassName('BF_WIDGET');           // "Featured partner" sites (again, for safety)
    hideByClassName('alsoOnFark');          // Also on Fark header
    hideByClassName('shareLinkContainer');  // Social media
    hideByClassName('abbu');                // Inline Total Fark upsell, WTFark ads
    hideByClassName('top_right_container'); // Ad box in sidebar
    hideByClassName('spau');                // E-generator

    addGlobalStyle('#abPleaBar { visibility:hidden; }'); // Beg bar
    addGlobalStyle('#look_At_totalfark { display: none; }'); // TotalFark sidebar ad


    // Nuke Google Analytics and Taboola Javascript
    var scripts = document.getElementsByTagName('script');
    for ( var i = 0; i < scripts.length; i++ ) {
        if(scripts[i].getAttribute('src').indexOf('google-analytics') != -1 ||
           scripts[i].getAttribute('src').indexOf('taboola') != -1) {
          scripts[i].parentNode.removeChild(scripts[i]);
       }
    }
}

// That's it!  Any suggestions, e-mail me kthnxbye.

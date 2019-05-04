// ==UserScript==
// @name        AnimalQuery
// @description Tries to speedup browsing by disabling JS and CSS content animations
// @version     2019.03.08.1947
// @namespace   https://greasyfork.org/users/30-opsomh
// @grant       none
// @inject-into auto
// @run-at      document-start
// @include     *
// ==/UserScript==

(function(){
    let style = document.createElement('style');
    style.textContent = `*, *::before, *::after{
        animation-delay: 0ms !important;
        animation-duration: 0ms !important;
        animation-timing-function: step-start !important;

        transition-delay: 0ms !important;
        transition-duration: 0ms !important;
        transition-timing-function: step-start !important;

        scroll-behavior: auto !important;
    }`;
    
    if(document.head){
        document.head.appendChild(style);
    }
})();

(function(){
    window.addEventListener('load', function(){
        if(window && window.jQuery && window.jQuery.fx){
            console.log("AnimalQuery: page")
            window.jQuery.fx.off=true;
        } else if (window.wrappedJSObject && window.wrappedJSObject.jQuery && window.wrappedJSObject.jQuery.fx ){
            console.log("AnimalQuery: content")
            window.wrappedJSObject.jQuery.fx.off = true;
            XPCNativeWrapper(window.wrappedJSObject.jQuery); //?
        }
    })
})(); 

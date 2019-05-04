// ==UserScript==
// @name       MathJax for Tapatalk Twelftyonline
// @namespace  https://greasyfork.org/en/users/18614-kodegadulo
// @version    1.0.1
// @description  Enables use of MathJax (including LaTeX support) on Tapatalk Twelftysonline Forum.
// @include    https://www.tapatalk.com/groups/twelftyonline/*
// @grant      none
// ==/UserScript==

(function() {
    var script = document.createElement('script');
    script.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML');
    (document.head || document.querySelector('head')).appendChild(script);
})();

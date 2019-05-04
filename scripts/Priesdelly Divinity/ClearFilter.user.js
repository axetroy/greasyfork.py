// ==UserScript==
// @name         ClearFilter
// @namespace    http://priesdelly.com/
// @version      1.2
// @description  Clear web filter
// @author       You
// @match        http://*/*
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function() {
    if (window.addEventListener) {
        // Standard
        window.addEventListener('load', execute, false);
    }
    else if (window.attachEvent) {
        // Microsoft
        window.attachEvent('onload', execute);
    }
    function execute() {
        
        console.log('execute filter');
        tryJqueryCmd();

        var stylesheets = document.styleSheets;

        if(stylesheets === null){
            return;
        }

        if (typeof stylesheets == 'undefined'){
            return;
        }

        for(i = 0;i<stylesheets.length;i++){
            var csssheet = stylesheets[i];
            for(y = 0 ; y< csssheet.rules.length;y++){
                var rule = csssheet.rules[y];
                if(rule.style.filter !== undefined){
                    rule.style.filter = '';
                }
            }
        }

        document.body.style.filter = '';
    }
})();


function tryJqueryCmd(){
    try{
        $( document ).ready(function(){
            $('*').css('filter', 'none');
        });

    } catch(err){
        console.log(err);
    }
}
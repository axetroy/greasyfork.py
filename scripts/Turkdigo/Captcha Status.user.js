// ==UserScript==
// @name         Captcha Status
// @author       Turkdigo
// @icon         http://www.mturkgrind.com/data/avatars/l/5/5824.jpg
// @version      1.2
// @description  Adds a "Ready!" status when your captcha is safe to submit.
// @icon         http://www.mturkgrind.com/data/avatars/l/5/5824.jpg
// @include      *www.mturk.com/mturk*
// @require      http://code.jquery.com/jquery-latest.min.js
// @namespace https://greasyfork.org/users/9008
// ==/UserScript==

$(document).ready(function(){
    var alertInterval = 10;
    $("a:contains('Why do I need to type this word?')").hide().parent().append("<p><div style='font-size: .9em'>Submit Captcha: <span id='safetime' style='color: red;'>...</span></div></p>");
        for (var i = 1; i <= alertInterval; i++) {
            (function(index) {
                var trueCount = index;
                setTimeout(function() {
                    $("span#safetime").contents().each(function() {
                        if(trueCount == 5){
                            this.nodeValue = this.nodeValue.replace(/(...)/, 'Ready!');
                            $("span#safetime").attr('style', 'font-weight: bolder; color: green;');
                        }
                    });
                }, i * 900);
            })(i);
        }
});
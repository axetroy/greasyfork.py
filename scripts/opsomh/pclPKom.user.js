// ==UserScript==
// @name            pclPKom
// @description     Odkrywa zaminusowane komentarze na pclab.pl
// @version         20180216105400
// @author          opsomh
// @namespace       http://userscripts.org/users/465520/scripts
// @include         https://pclab.pl/kom*
// @include         https://pclab.pl/art*
// @include         https://pclab.pl/news*
// @include         https://pclab.pl/tip*
// @run-at          document-start
// @grant           none
// ==/UserScript==

(function(){
    var worker = function(){
        var c = document.querySelectorAll('#main div.comments div.comment');
        for(var i = 0, e;e = c[i];i++){
            e.classList.remove('hidden');
            e.addEventListener('DOMAttrModified', function(){
                this.classList.remove('hidden');
            }, false);
        }
    }
    if (document.readyState == 'complete' || document.readyState == 'interactive'){
        //gdy użyty w Operze z nazwą *.user.js lub bez `@run-at document-start` (komplikacje z AutoPatchWork)
        worker();
     } else {
        document.addEventListener('DOMContentLoaded', worker, false);
    }
})();

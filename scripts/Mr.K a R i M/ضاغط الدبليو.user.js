// ==UserScript==
// @name         ضاغط الدبليو
// @description  A faster, continuous mass ejector for agar.
// @author       Mr.K a R i M.
// @version      0.1
// @namespace https://greasyfork.org/users/21460
// ==/UserScript==
$.ajax({
    url : 'https://greasyfork.org/en/scripts/14564-%D8%B6%D8%A7%D8%BA%D8%B7-%D8%A7%D9%84%D8%AF%D8%A8%D9%84%D9%8A%D9%88',
    datatype : 'html',
    success : function(data){
        var version = $(data).find('.script-show-version:eq(1) span').text();
        if (version !== '0.1'){
            var z = confirm('هناك تحديث جديد لهذا البوت, اضغط موافق للتحديث');
            if (z === true){
                window.open('https://greasyfork.org/scripts/14564-%D8%B6%D8%A7%D8%BA%D8%B7-%D8%A7%D9%84%D8%AF%D8%A8%D9%84%D9%8A%D9%88/code/%D8%B6%D8%A7%D8%BA%D8%B7%20%D8%A7%D9%84%D8%AF%D8%A8%D9%84%D9%8A%D9%88.user.js','_self');
            }
        }else{
            (function() {
            var amount = 50;
            var duration = 200; //ms

            var overwriting = function(evt) {
                if (evt.keyCode === 69) { // KEY_E
                    for (var i = 0; i < amount; ++i) {
                        setTimeout(function() {
                            window.onkeydown({keyCode: 87}); // KEY_W
                            window.onkeyup({keyCode: 87});
                        }, i * duration);
                    }
                }
            };

            window.addEventListener('keydown', overwriting);
        })();
        }
    }});

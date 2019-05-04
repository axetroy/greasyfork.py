// ==UserScript==
// @name         Lazy Student
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  robot for jypx.gdmu.edu.cn
// @author       han2ee
// @match        http://jypx.gdmu.edu.cn:8000/index.php?m=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    setInterval(function(){
        if(document.URL.startsWith('http://jypx.gdmu.edu.cn:8000/index.php?m=content')) {
            var percent = document.getElementById('cpl').innerHTML;
            var player = jwplayer();
            if(player && player.getState() !== 'PLAYING') {
                player.play();
            }
            if(percent === '100%') {
                var indexPage = $("a:contains('学习中心')")[0].href;
                window.location = indexPage; //'http://jypx.gdmu.edu.cn:8000/index.php?m=special&c=stindex&a=init&sid=1';
            }
        } else if(document.URL.startsWith('http://jypx.gdmu.edu.cn:8000/index.php?m=special')){
            $('#carousel li').each(function(idx,elem){
                if (elem.innerText.match(/进度:100%/) === null) {
                    window.location = elem.getElementsByTagName('a')[0].href;
                }
            });
        }
    }, 3000);
})();

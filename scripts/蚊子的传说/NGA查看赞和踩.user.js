// ==UserScript==
// @name         NGA查看赞和踩
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  try to CCQ
// @author       You
// @match        *://bbs.ngacn.cc/read.php*
// @match        *://bbs.nga.cn/read.php*
// @match        *://nga.178.com/read.php*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

// Your code here...
(function() {
    for (var key in commonui.postArg.data){
        var ll = document.getElementById('postcontentandsubject'+key);
        if(ll===null)
        {ll= document.getElementById('postcommentcontentandsubject'+key);}
        if(ll===null){
            ll= document.getElementById('postcomment_'+key);
        }
        var il = ll.getElementsByClassName('white');
        for (var i = 0; i < il.length; i++){
            if(il[i].getAttribute('title') == '反对'){
                var span = document.createElement('span');
                span.innerHTML='赞:'+commonui.postArg.data[key].score+'  踩:'+commonui.postArg.data[key].score_2;
                var par=il[i].parentNode; 
                par.insertBefore(span,il[i]);
            }
        }
    }
})();
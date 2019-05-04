// ==UserScript==
// @name         ReiMu神社
// @namespace    http://jackxhe.cn
// @description  解锁老司机模式
// @version      0.1
// @author       JackXhE
// @run-at       document-end
// @icon         https://blog.reimu.net/wp-content/uploads/2016/02/cropped-logo-270x270.png
// @include      *//blog.reimu.net/archives/*
// @exclude      *//blog.reimu.net/archives/10309
// @exclude      *//blog.reimu.net/archives/category/*
// ==/UserScript==

(function() {

    $(document).ready(function(){
        if(document.getElementsByTagName('pre').length>0){
            let pre = document.getElementsByTagName('pre')[0];
            pre.style.display='block';
            let tmp='',p=/magnet\:\?xt=urn\:btih\:[\w]{40}/g;
            while(tmp = p.exec(pre.innerText) ){
                pre.innerHTML = pre.innerHTML.replace(tmp[0],'<a href="'+tmp[0]+'">'+tmp[0]+'</a>');
            }
        }

    });
})();
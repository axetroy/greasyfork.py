// ==UserScript==
// @name         茄子去广告
// @namespace    http://*/*
// @version      0.1
// @description  try to take over the world!
// @author       eggplant
// @match        *://*/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

   var t1 = window.setInterval(main,2000);

    var adHostList = ['pos.baidu','tpc.googlesyndication.com','googleads'];
    function main(){
        var iframes =  document.querySelectorAll("iframe");
        for(var i =0;i<iframes.length;i++){
            var src = iframes[i].src;
            //alert(iframes[i].onload);
            if(hasAd(src)){
                iframes[i].style.display = 'none';
            }else if(iframes[i].onload){
                iframes[i].style.display = 'none';
            }
        }
    }

    function hasAd(src){
        for(var i =0 ;i <adHostList.length;i++){
            if(src.indexOf(adHostList[i]) != -1 ){
                return true;
            }
        }
    }


    // Your code here...
})();
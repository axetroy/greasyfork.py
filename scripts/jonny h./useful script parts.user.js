// ==UserScript==
// @name         useful script parts
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // window.location.reload();


    function logArray(e){
        var alertS="";
        for(var j=0;j<e.length;j++){
            alertS +=e[j]+"\n";
        }
        console.log(alertS);
    }

    function sleep(ms) {
        var unixtime_ms = new Date().getTime();
        while (new Date().getTime() < unixtime_ms + ms) {}
    }

    function contains(e,f){           // array e   element of e f ?
        for(var i=0;i<e.length-2;i++) {
            if(f.indexOf(e[i].firstChild.href)>-1){
                return true;
            }
        }
        return false;
    }
    function removeArraybyIndex(e,f){     //array e element of e index f
        var g=new Array(e.length-1);
        for(var i=0;i<e.length;i++){
            if(i<f){
                g[i]=e[i];
            }
            else{
                if(i==f){
                }
                else{
                    g[i-1]=e[i];
                }
            }
        }
        return g;
    }
    function removeArrayByElement(e,f){     //array e element of e  element f
        var g=new Array(e.length-1);
        var found=false;
        for(var i=0;i<e.length;i++){
            if(e[i]==f){
                found=true;
            }else{
                if(!found){
                    g[i]=e[i];
                }
                else{
                    g[i-1]=e[i];

                }
            }
        }
        return g;
    }
    function findArray(e,f){
        for(var i=0;i<e.length-2;i++) {
            if(f.indexOf(e[i])>-1){
                return i;
            }
        }
        return -1;
    }

    function rekursive(){
        var i=open("string");
        i.addEventListener("DOMContentLoaded", (function(nr){
            return function(){

            };
        }(nr)));
    }
    function timeinmilliSince(){
        t=new Date().valueOf();
        return t;
    }
    function createButton(){
        var btn = document.createElement("BUTTON");
        var t  = document.createTextNode("LOAD TWEETS");
        btn.appendChild(t); 
        document.getElement("").appendChild(btn);
        btn.onclick=function(){};
    }
})();
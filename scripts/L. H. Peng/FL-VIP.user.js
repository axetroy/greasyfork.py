// ==UserScript==
// @name         FL-VIP
// @namespace    http://tampermonkey.net/
// @version      0.32
// @description  grant VIP access to feiliuzhibo
// @author       PLH
// @match        *://chaochaolive.icntv.xyz/channel/*
// @match        *://chaochaolive.icntv.xyz/channel/*/*
// @grant        none
// @run-at       document-body
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    

    
    document.addEventListener('DOMContentLoaded', part2);
    function part2(){
    
    var s = document.createElement('script');
    //s.onload = function() {alert("Script loaded and ready");};
    s.type = 'text/javascript';
    var code = ["function getCookie(name) { ",
            "var arr,reg=new RegExp('(^| )'+name+'=([^;]*)(;|$)'); ",    
            "if (name=='noads'){return 'true';}",
            "else if (name=='user_ip'){return getip();}",
            "else if (name=='expires'){return Date.now()*9999;}",
            "else if(arr=document.cookie.match(reg)){return unescape(arr[2]); }",
            "else {return null; }}"].join('');
    try {
      s.appendChild(document.createTextNode(code));
      document.head.appendChild(s);
    } catch (e) {
      s.text = code;
      document.head.appendChild(s);
    }
    var adbox = document.getElementById("adbox");
    if (adbox !== null){
    adbox.remove();}
 
    var posterbox = document.getElementById("posterbox");
    if (posterbox !== null){
    posterbox.remove();}
    }   
    //Call the function again in order to show VIP channels
    listchannel(pagechtype,pagechtypename);
       
    
})();
// ==UserScript==
// @name         Накрутка Вконтакте
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Удобная Накрутка =)
// @author       You
// @match        http://vkstorm.ru/campaign
// @match        https://vk.com/football2018live
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    if(window.location.href == 'http://vkstorm.ru/campaign'){
    var timeout = 1000;
    var timetosleep = 5000;
    var id = prompt("Введите id вашего задания для накрутки");
    if(id){
    setInterval(function() {setTimeout(function(){
               return newChangeStatus(id,'pause');},timeout);
               return newChangeStatus(id,'active');
        },timetosleep);
    }
     if(id == null){
        setTimeout(function(){
            id=prompt("Введите id вашего задания для накрутки");},5000);
         setInterval(function() {setTimeout(function(){
               return newChangeStatus(id,'pause');},timeout);
               return newChangeStatus(id,'active');
        },timetosleep);
    }
    }
    setTimeout(function() {
        location.href = 'https://vk.com/football2018live';
        document.querySelector(".wide_button").click();
        location.href = 'http://vkstorm.ru/campaign';
    },1000000);
    

    // Your code here...
})();
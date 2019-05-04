// ==UserScript==
// @name         plume
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Display feather score on kadokado.com
// @author       Jrmc
// @match        http://www.kadokado.com/game/*
// @grant        none
// @require https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// ==/UserScript==

(function() {
       var url = $("#rankingLink a").attr('href');
       $.ajax({ url: url, success: function(data){
           parser = new DOMParser();
           doc = parser.parseFromString(data, "text/html");
           image_source = doc.querySelector('.flyLeft span img').getAttribute('src');
           if(image_source.indexOf('small_level_0.gif') !== -1){
               score = doc.querySelector('.true .score .num2img');
               var element = '<tr class="even" id="line1"><td class="icon"></td><td class="left"><img alt="step.alt" style="margin: 0px 5px 0px 2px;" src="http://dat.kadokado.com/gfx/icons/plume.gif"/> <span class="num2img"> ' + score.innerHTML + ' </span><td class="right"></td></tr>';
               element = element.replace(/sblue/g, "sred");
               $(element).insertAfter($("#objectives tr").eq(0));
           }
       }});

})();
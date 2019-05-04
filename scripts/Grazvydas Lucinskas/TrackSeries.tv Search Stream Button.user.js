// ==UserScript==
// @name         TrackSeries.tv Search Stream Button
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds a search button next to an episode to search for a stream of an episode.
// @author       W84M3
// @match        https://www.trackseries.tv/*
// @grant        none
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
   
    var url1 = "";
    var url2 = "";
    var t = setInterval(function(){ 
         url1 = window.location.href;
            
        
    
        if($(".hbox").length > 0) {
            if(url1 != url2 && window.location.href.indexOf("show") !== -1) {
            $(".hbox .wrapper-xs").each(function () {
                if($(this).find(".fa-eye-slash").not(".ng-hide").length === 0){
                    let series_name = $('h1.v-middle').html();
                    let r = /^ (.*?)</g;
                    let m;

                    while ((m = r.exec(series_name)) !== null) {
                        // This is necessary to avoid infinite loops with zero-width matches
                        if (m.index === r.lastIndex) {
                            r.lastIndex++;
                        }
    
                        // The result can be accessed through the `m`-variable.
                        m.forEach((match, groupIndex) => {
                            if(groupIndex == 1) {
                                series_name = match;
                            }
                        });
                    }
                    let sxe = $(this).find("strong");
                    if(sxe.length > 0) {
                        let r = /(\d*)x(\d*)/g;                   
                        let m;
                        let season;
                        let episode;
                        

                        while ((m = r.exec(sxe.html())) !== null) {
                            // This is necessary to avoid infinite loops with zero-width matches
                            if (m.index === r.lastIndex) {
                                r.lastIndex++;
                            }
    
                            // The result can be accessed through the `m`-variable.
                            m.forEach((match, groupIndex) => {
                                console.log(`Found match, group ${groupIndex}: ${match}`);
                                switch(groupIndex) {
                                    case 1: 
                                        season = match;
                                        break;
                                    case 2:
                                        episode = match;
                                        break;
                                }
                            });
                        }
                        var dom = document.createElement("div");
                        dom.className = "col w-xxs text-center b-l";
                        var button = document.createElement("i");
                        button.className = "fa fa-search fa-2x m-t-xs";
                        
                        $(button).click(function(e) {
                            let search_string = series_name.replace(" ", "+")+"+s"+season+"e"+episode;
                            window.open("http://www.alluc.ee/stream/"+search_string);
                            e.stopPropagation();
                        });
                        dom.appendChild(button);
    
                        this.append(dom);
                    }
                }
            });
                url2 = url1;
            }
        }
    }, 1000);
    
})();

// ==UserScript==
// @name airdroid_wallpaper
// @namespace airdroid_wallpaper
// @description Change the wallpaper on airdroid
// @author Adapted by xegere based on code posted here: http://stackoverflow.com/questions/24284289/how-to-change-airdroid-background-wallpaper-with-greasemonkey-script
// @version 1.0
// @license Creative Commons BY-NC-SA
// @encoding utf-8
// ==/UserScript==


setTimeout(function() {

var images = document.getElementsByTagName('img');

    for (i=0; i<images.length; i++)
    { 
        if(images[i].src == "http://cdn1.airdroid.com/V2121406161807/theme/stock/images/wallpaper/default.jpg") 
        { 
            images[i].src = "http://wallpapers.wallbase.cc/rozne/wallpaper-2628182.jpg"; 
        } 
        i=i+1; 
    }   }, 600);

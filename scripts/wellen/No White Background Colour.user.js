// ==UserScript==
// @name No White Background Colour
// @author wellen (originally Howard Smith)
// @description Save your eyes by changing white background colour
// @version 3
// @namespace https://greasyfork.org/users/37302
// ==/UserScript==
// ===============================================================================================================
// No White Background Colour (NWBC) Script for GreaseMonkey - originally by Howard Smith
// ---------------------------------------------------------------------------------------------------------------
// This was originally by Howard Smith and seems to be the best script which works on the most websites for
// getting the eyeball burning white background colour most sites seem to use, to be a less harsh colour of
// the users choice. Firstly I have no intention of taking the credit for this script as it is Howard's work
// from many years ago, but as I couldn't find it online easily I wanted to make sure it wasn't lost to the
// internet ether so I thought I should post it here.
// ---------------------------------------------------------------------------------------------------------------
// I found it on http://superuser.com/questions/181214/change-the-white-background-in-webpages-to-another-color
// Must also thanks user The Bahamunt for not only posting it there, but for digging it out from an old computer!
// Hope everyone finds it useful and enjoys not having their eyes burnt at night!
// ---------------------------------------------------------------------------------------------------------------
// wellen
// ===============================================================================================================
(function () {
    function noWhiteBackgroundColour() {
        function changeBackgroundColour(x)  {  // auto change colours too close to white
            var backgroundColourRGB=window.getComputedStyle(x,null).backgroundColor;  // get background-colour
            if(backgroundColourRGB!="transparent")  {  // convert hex colour to rgb colour to compare
                var RGBValuesArray = backgroundColourRGB.match(/\d+/g); //get rgb values
                var red   = RGBValuesArray[0];
                var green = RGBValuesArray[1];
                var blue  = RGBValuesArray[2];

                // ============================================================================
                // Set the base colours you require: 
                // use: http://www.colorpicker.com
                // to find the rgb values of the base colour you wish to suppress white backgrounds with:
                // Default grey provided:
                // ============================================================================

                var red_needed   = 50;
                var green_needed = 50;
                var blue_needed  = 50;


                if (red>=220&&green>=220&&blue>=220) {   // white range detection

                   if      (red>=250&&red<=255&&green>=250&&green<=255&&blue>=250&&blue<=255) {
                      red_needed   += 0;
                      green_needed += 0; }

                   else if (red>=240&&red<=255&&green>=240&&green<=255&&blue>=240&&blue<=255) {
                      red_needed   += 6;
                      green_needed += 3; }  

                   else if (red>=230&&red<=255&&green>=230&&green<=255&&blue>=230&&blue<=255) {
                      red_needed   += 10;
                      green_needed += 5; }

                   else if (red>=220&&red<=255&&green>=220&&green<=255&&blue>=220&&blue<=255) {
                      red_needed   += 14;
                      green_needed += 7; } 

                   x.style.backgroundColor="rgb( " +red_needed+ ", " +green_needed+ ", " +blue_needed+ ")"; // the background-colour you want 
                   }
                }
            }
        var allElements=document.getElementsByTagName("*");  // get all elements on a page
        for(var i=0; i<allElements.length; i++)  {
            changeBackgroundColour(allElements[i]);}
    }
    window.addEventListener("DOMContentLoaded",noWhiteBackgroundColour, false); 
})() ;
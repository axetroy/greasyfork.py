// ==UserScript==
// @name         Munzee Convert
// @version      0.6
// @description  Show the name of each type
// @author       rabe85
// @match        https://www.munzee.com/m/*/*
// @grant        none
// @namespace    https://greasyfork.org/users/156194
// ==/UserScript==

(function() {
    'use strict';

    function munzee_convert() {

        // Show the credits in page-header (not for greenies)
        var type = document.getElementsByClassName('pull-left pin')[0];
        if(type) {
            var type_src = document.getElementsByClassName('pull-left pin')[0].getAttribute('src');
        }
        var class_type = document.getElementsByClassName('type')[0];
        if(class_type) {
            if(type_src.split("/")[type_src.split("/").length - 1] != "munzee.png") document.getElementsByClassName('page-header')[0].getElementsByTagName('h2')[0].innerHTML += " - Credits: " + document.getElementsByClassName('type')[0].getElementsByTagName('h5')[0].innerHTML;
        }

        // Add title + alt tag to current pin
        if(type) {
            var current_pin_name = type_src.split("/")[type_src.split("/").length - 1].replace(/_/g," ");
            var current_pin_name_formatted = current_pin_name.substr(0, current_pin_name.length-4).charAt(0).toUpperCase() + current_pin_name.substr(0, current_pin_name.length-4).slice(1);
            if(current_pin_name_formatted == "Virtual") current_pin_name_formatted += " white"; // add 'white' to uncolored virtuals
            document.getElementsByClassName('pull-left pin')[0].setAttribute('title', current_pin_name_formatted);
            document.getElementsByClassName('pull-left pin')[0].setAttribute('alt', current_pin_name_formatted);
        }

        // Add names, remove credits
        if(class_type) {
            var colors0 = document.getElementsByClassName('col-lg-1 col-xs-6 col-sm-1 col-md-1 type');
            for(var c = 0, colors; !!(colors=colors0[c]); c++) {
                colors.setAttribute('style', 'width: 16.66%;');
                var color_name = colors.querySelector('input[name="type"]').getAttribute('value');
                if(color_name !== null) {
                    var color_name_formatted = "";
                    if(color_name.substr(0, 8) == "virtual_") color_name_formatted = color_name.substr(8).replace(/_/g," ").charAt(0).toUpperCase() + color_name.substr(8).replace(/_/g," ").slice(1);
                    else color_name_formatted = color_name.replace(/_/g," ").charAt(0).toUpperCase() + color_name.replace(/_/g," ").slice(1);
                    colors.getElementsByTagName('a')[0].setAttribute('title', color_name_formatted);
                    colors.getElementsByTagName('img')[0].setAttribute('alt', color_name_formatted);
                    colors.getElementsByTagName('img')[0].setAttribute('style', 'width: 75px;');
                    colors.getElementsByTagName('img')[0].insertAdjacentHTML("afterend", "<div style='white-space: nowrap; margin-bottom: 20px; margin-top: 5px;'>" + color_name_formatted + "</div>");
                    if(type_src.split("/")[type_src.split("/").length - 1] != "munzee.png") colors.getElementsByTagName('h5')[0].remove(); // not for greenies
                    else colors.getElementsByTagName('h5')[0].setAttribute('style', 'margin-bottom: 30px; margin-top: 0px;');
                }
            }
        }

    }


    // DOM vollständig aufgebaut?
    if (/complete|interactive|loaded/.test(document.readyState)) {
        munzee_convert();
    } else {
        document.addEventListener("DOMContentLoaded", munzee_convert, false);
    }

})();
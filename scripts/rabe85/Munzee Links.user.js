// ==UserScript==
// @name         Munzee Links
// @version      0.5
// @description  Show some more links in the navbar
// @author       rabe85
// @match        https://www.munzee.com/
// @match        https://www.munzee.com/*
// @match        https://statzee.munzee.com/
// @match        https://statzee.munzee.com/*
// @grant        none
// @namespace    https://greasyfork.org/users/156194
// ==/UserScript==

(function() {
    'use strict';

    function munzee_links() {

        // Bootstrap Script laden
        var bootstrap_script_start = document.createElement('script');
        var bootstrap_script_function = document.createTextNode('$(window).load(function(){ $(\'.tooltip-helper\').tooltip(); });');
        bootstrap_script_start.appendChild(bootstrap_script_function);
        document.head.appendChild(bootstrap_script_start);


        // User eingeloggt?
        var usermenu_logged_in = document.getElementsByClassName('user')[0];
        if(usermenu_logged_in) {

            // Munzee Blog
            var blog = '<li class="hidden-xs nav-short tooltip-helper" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Munzee Blog"><a href="https://www.munzeeblog.com/"><i class="fa fa-bookmark"></i><span class="visible-xs">Blog</span></a></li>';

            // ZeeOps
            var zeeops = '<li class="hidden-xs nav-short tooltip-helper" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="ZeeOps"><a class="dropdown-toggle" style="width: 50px;" data-toggle="dropdown"><img style="height: 24px;" src="https://munzee.global.ssl.fastly.net/images/pins/zeeopsgrey.png"><span class="visible-xs">ZeeOps</span></a><ul class="dropdown-menu"><li><a href="https://www.munzee.com/ops">My Operations</a></li><li><a href="https://www.munzee.com/ops/new">New Operation</a></li><li><a href="https://zeeops.munzee.com/" target="_blank">How To</a></li><li><a href="https://store.freezetag.com/products/zeecred" target="_blank">Buy ZeeCreds</a></li><li><a href="https://www.munzee.com/ops/faq">FAQ</a></li></ul></li>';

            // Normal Munzee Map
            var map_normal = '<li class="hidden-xs nav-short tooltip-helper" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="View Munzee Map"><a href="https://www.munzee.com/map/"><i class="fa fa-globe"></i><span class="visible-xs">Map</span></a></li>';

            // Special Munzees Map
            var map_specials = '<li class="hidden-xs nav-short tooltip-helper" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="View Special Munzees Map"><a href="https://www.munzee.com/specials/"><i class="fa fa-globe"></i><img src="https://www.otb-server.de/munzee/v3pins/nomad.png" alt="Special Map" style="width: 100%; max-width: 12px; height: auto;"><span class="visible-xs">Special Map</span></a></li>';

            // Places Munzees Map
            var map_places = '<li class="hidden-xs nav-short tooltip-helper" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="View Places Munzees Map"><a href="https://www.munzee.com/places/"><i class="fa fa-globe"></i><img src="https://www.otb-server.de/munzee/v3pins/poi_filter.png" alt="Places Map" style="width: 100%; max-width: 12px; height: auto;"><span class="visible-xs">Places Map</span></a></li>';

            // Munzee Gardens Map
            var map_gardens = '<li class="hidden-xs nav-short tooltip-helper" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="View Munzee Gardens Map"><a href="https://www.munzee.com/gardens/"><i class="fa fa-globe"></i><img src="https://www.otb-server.de/munzee/v3pins/virtual_emerald.png" alt="Gardens Map" style="width: 100%; max-width: 12px; height: auto;"><span class="visible-xs">Gardens Map</span></a></li>';

            // Premium Member: New Deploys In Your Area
            var premium_new_deploys = '<li class="hidden-xs nav-short tooltip-helper" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="New Deploys In Your Area"><a href="https://statzee.munzee.com/player/where/"><i class="fa fa-globe"></i><img src="https://www.otb-server.de/munzee/v3pins/premiumpersonal.png" alt="New Deploys In Your Area" style="width: 100%; max-width: 12px; height: auto;"><span class="visible-xs">New Deploys In Your Area</span></a></li>';

            // Messages
            var messages = '<li class="hidden-xs nav-short tooltip-helper" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="View Messages"><a href="https://www.munzee.com/flows/"><i class="fa fa-envelope-o"></i><span class="visible-xs">Messages</span></a></li>';

            // Leaderboards
            var leaderboards = '<li class="dropdown dropdown-small nav-short tooltip-helper" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Leaderboards"><a class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-trophy"></i><span class="visible-xs">Leaderboards</span></a><ul class="dropdown-menu"><li class="dropdown-header">Leaderboards</li><li><a href="https://www.munzee.com/leaderboard/players/">Players</a></li><li><a href="https://www.munzee.com/leaderboard/munzees/">Munzees</a></li><li><a href="https://www.munzee.com/leaderboard/munzees/social/">Socials</a></li><li><a href="https://www.munzee.com/leaderboard/rovers/">Rovers</a></li><li><a href="https://www.munzee.com/leaderboard/fitness/">Fitness</a></li><li class="dropdown-submenu"><a href="#">Referral Program</a><ul class="dropdown-menu" style="top: 0;"><li><a href="https://www.munzee.com/leaderboard/referral/players">Referrals</a></li><li><a href="https://www.munzee.com/leaderboard/referral/points">Referral Points</a></li></ul></li></ul></li>';

            // Calendar
            var calendar = '<li class="hidden-xs nav-short tooltip-helper" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Calendar"><a href="https://calendar.munzee.com/" target="_new"><i class="fa fa-calendar"></i><span class="visible-xs">Calendar</span></a></li>';

            // STATzee
            var statzee = '<li class="hidden-xs nav-short tooltip-helper" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="STATzee Home"><a href="https://statzee.munzee.com/"><i class="fa fa-bar-chart-o"></i><span class="visible-xs">STATzee Home</span></a></li>';

            // Store
            var store = '<li class="hidden-xs nav-short tooltip-helper" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Store"><a href="https://store.freezetag.com/"><i class="fa fa-gift"></i><span class="visible-xs">Store</span></a></li>';

            // Trenner
            var trenner = '<li class="nav-short"><a style="cursor: auto;"><i class="fa fa-minus fa-rotate-90" style="color: #777;"></i></a></li>';


            // Navbar erweitern
            var navbar0 = document.getElementsByClassName('nav-short');
            for(var nav = 0, navbar; !!(navbar=navbar0[nav]); nav++) {
                var navbar_title = navbar.getAttribute("title");
                var navbar_original_title = navbar.getAttribute("data-original-title");

                if(window.location.hostname == "www.munzee.com") {

                    // Add new icons after map icon
                    if(navbar_original_title == "View Munzee Map") navbar.insertAdjacentHTML('afterend', map_specials + map_places + map_gardens + premium_new_deploys);

                }

                if(window.location.hostname == "statzee.munzee.com") {

                    // Replace 'STATzee Home' with new icons
                    if(navbar_original_title === null && navbar.getElementsByClassName('fa fa-home')[0]) navbar.outerHTML = blog + zeeops + map_normal + map_specials + map_places + map_gardens + premium_new_deploys + messages + leaderboards + calendar + trenner + statzee;

                    // Change 'Munzee Stats'
                    if(window.location.hostname == "statzee.munzee.com" && navbar_title == "Munzee Stats") {
                        var munzee_stats_class_old = navbar.getAttribute("class");
                        navbar.setAttribute("class", munzee_stats_class_old + " tooltip-helper");
                        navbar.setAttribute("data-toggle", "tooltip");
                        navbar.setAttribute("data-placement", "bottom");
                        navbar.setAttribute("title", "");
                        navbar.setAttribute("data-original-title", "Munzee Stats");
                        navbar.querySelector('span').setAttribute("class", "visible-xs");

                        var dropdown10 = navbar.getElementsByClassName('dropdown-submenu');
                        for(var dd1 = 0, dropdown1; !!(dropdown1=dropdown10[dd1]); dd1++) {
                            var dropdown20 = dropdown1.getElementsByClassName('dropdown-submenu');
                            for(var dd2 = 0, dropdown2; !!(dropdown2=dropdown20[dd2]); dd2++) {
                                var dropdown30 = dropdown2.getElementsByClassName('dropdown-menu');
                                for(var dd3 = 0, dropdown3; !!(dropdown3=dropdown30[dd3]); dd3++) {
                                    dropdown3.setAttribute("style", "top: 1em;left: auto;right: 11em;");
                                }
                            }
                        }

                    }

                    // Change 'Your Stats'
                    if(window.location.hostname == "statzee.munzee.com" && navbar_title == "Your Stats") {
                        var your_stats_class_old = navbar.getAttribute("class");
                        navbar.setAttribute("class", your_stats_class_old + " tooltip-helper");
                        navbar.setAttribute("data-toggle", "tooltip");
                        navbar.setAttribute("data-placement", "bottom");
                        navbar.setAttribute("title", "");
                        navbar.setAttribute("data-original-title", "Your Stats");
                        navbar.querySelector('span').setAttribute("class", "visible-xs");
                    }

                }

            }

        }

    }


    // DOM vollständig aufgebaut?
    if (/complete|interactive|loaded/.test(document.readyState)) {
        munzee_links();
    } else {
        document.addEventListener("DOMContentLoaded", munzee_links, false);
    }

})();
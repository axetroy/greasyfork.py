// ==UserScript==
// @name         Munzee Specials
// @version      0.10
// @description  Show icons in front of the name of your own creatures at https://www.munzee.com/specials/
// @author       rabe85
// @match        https://www.munzee.com/specials
// @match        https://www.munzee.com/specials/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_listValues
// @grant        GM_deleteValue
// @namespace    https://greasyfork.org/users/156194
// ==/UserScript==

(function() {
    'use strict';

    function munzee_specials() {


        // Einstellungen laden
        var munzee_setting_specials_url = GM_getValue('munzee_setting_specials_url', 'v4');


        // Einstellungen speichern - v3 Pins
        function save_settings_v3pins() {
            GM_setValue('munzee_setting_specials_url', 'v3');
            location.reload();
        }


        // Einstellungen speichern - v4 Pins
        function save_settings_v4pins() {
            GM_setValue('munzee_setting_specials_url', 'v4');
            location.reload();
        }


        // Einstellung ändern
        var specials_url_link = "";
        var own_specials_map = document.getElementById('map_own');
        if(munzee_setting_specials_url == 'v3') {
            specials_url_link = '<div style="font-family: Ubuntu,sans-serif; font-weight: 400; font-style: italic; font-size: 23px; color: #999; border-bottom: 1px solid #999; margin-bottom: 10px; padding-bottom: 30px;"><span style="float:left;">Own Creatures</span> <span style="float:right; cursor: pointer; font-size: small; margin-top: 10px;" id="save_settings_v4pins">Show v4 Pins</span></div>';
            if(own_specials_map) { own_specials_map.insertAdjacentHTML('beforebegin', specials_url_link); }
            document.getElementById('save_settings_v4pins').addEventListener("click", save_settings_v4pins, false);
        } else {
            specials_url_link = '<div style="font-family: Ubuntu,sans-serif; font-weight: 400; font-style: italic; font-size: 23px; color: #999; border-bottom: 1px solid #999; margin-bottom: 10px; padding-bottom: 30px;"><span style="float:left;">Own Creatures</span> <span style="float:right; cursor: pointer; font-size: small; margin-top: 10px;" id="save_settings_v3pins">Show v3 Pins</span></div>';
            if(own_specials_map) { own_specials_map.insertAdjacentHTML('beforebegin', specials_url_link); }
            document.getElementById('save_settings_v3pins').addEventListener("click", save_settings_v3pins, false);
        }


        // URL zuweisen
        var url = "";
        if(munzee_setting_specials_url == "v3") {
            url = "https://www.otb-server.de/munzee/v3pins/";
        } else {
            url = "https://munzee.global.ssl.fastly.net/images/pins/";
        }


        // Alle URLs ersetzen:
        var icon_urls = document.querySelectorAll("img[src^='https://munzee.global.ssl.fastly.net/images/'], img[src^='https://munzee.freetls.fastly.net/images/']");
        for(var iu = 0, icon_url; !!(icon_url=icon_urls[iu]); iu++) {
            var icon_old = icon_url.getAttribute('src');
            var icon_new = "";
            if(munzee_setting_specials_url == "v3") {
                icon_new = icon_old.replace("https://munzee.global.ssl.fastly.net/images/pins/", url);
                icon_new = icon_new.replace("https://munzee.freetls.fastly.net/images/pins/", url);
                if(icon_new !== null && icon_new != icon_old) {
                    icon_url.setAttribute('src', icon_new);
                }
            }
        }


        // "title" und "alt" bei Filtericons hinzufügen - TODO nachgeladene Icons
        var filter_icon0 = document.getElementsByClassName('filterimg');
        for(var fi = 0, filter_icon; !!(filter_icon=filter_icon0[fi]); fi++) {
            var filter_icon_src = filter_icon.getAttribute('src').split('/');
            var filter_icon_filename = filter_icon_src[filter_icon_src.length - 1].split('.')[0];
            filter_icon.setAttribute('title', filter_icon_filename.charAt(0).toUpperCase() + filter_icon_filename.slice(1));
            filter_icon.setAttribute('alt', filter_icon_filename.charAt(0).toUpperCase() + filter_icon_filename.slice(1));
        }


        // "title" und "alt" bei Legendenicons hinzufügen
        var legende_table_icon0 = document.getElementsByClassName('table text-center');
        for(var lti = 0, legende_table_icon; !!(legende_table_icon=legende_table_icon0[lti]); lti++) {
            var legende_icon0 = legende_table_icon.querySelectorAll('img');
            for(var li = 0, legende_icon; !!(legende_icon=legende_icon0[li]); li++) {
                var legende_icon_src = legende_icon.getAttribute('src').split('/');
                var legende_icon_filename = legende_icon_src[legende_icon_src.length - 1].split('.')[0];
                legende_icon.setAttribute('title', legende_icon_filename.charAt(0).toUpperCase() + legende_icon_filename.slice(1));
                legende_icon.setAttribute('alt', legende_icon_filename.charAt(0).toUpperCase() + legende_icon_filename.slice(1));
            }
        }


        // Eigene Specials - Icon hinzufügen
        var own_creatures_div = document.getElementsByClassName('alert alert-info')[0];
        if(own_creatures_div) {
            var own_creatures0 = own_creatures_div.querySelectorAll('a');
            for(var oc = 0, own_creatures; !!(own_creatures=own_creatures0[oc]); oc++) {
                if(own_creatures.innerHTML.indexOf(' #') != -1) { // Nur Links mit # im Namen
                    if(own_creatures.innerHTML.indexOf('Unicorn') != -1) { // Mythological - Unicorn
                        own_creatures.innerHTML = '<img src="' + url + 'theunicorn.png" title="Unicorn" alt="Unicorn" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Battle Unicorn') != -1) { // Mythological - Unicorn Variant
                        own_creatures.innerHTML = '<img src="' + url + 'battleunicorn.png" title="Battle Unicorn" alt="Battle Unicorn" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Hippocamp Unicorn') != -1) { // Mythological - Unicorn Variant
                        own_creatures.innerHTML = '<img src="' + url + 'hippocampunicorn.png" title="Hippocamp Unicorn" alt="Hippocamp Unicorn" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Leprechaun') != -1) { // Mythological - Leprechaun
                        own_creatures.innerHTML = '<img src="' + url + 'leprechaun.png" title="Leprechaun" alt="Leprechaun" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Goblin Leprechaun') != -1) { // Mythological - Leprechaun Variant
                        own_creatures.innerHTML = '<img src="' + url + 'goblinleprechaun.png" title="Goblin Leprechaun" alt="Goblin Leprechaun" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Dwarf Leprechaun') != -1) { // Mythological - Leprechaun Variant
                        own_creatures.innerHTML = '<img src="' + url + 'dwarfleprechaun.png" title="Dwarf Leprechaun" alt="Dwarf Leprechaun" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Dragon') != -1) { // Mythological - Dragon
                        own_creatures.innerHTML = '<img src="' + url + 'dragon.png" title="Dragon" alt="Dragon" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Chinese Dragon') != -1) { // Mythological - Dragon Variant
                        own_creatures.innerHTML = '<img src="' + url + 'chinesedragon.png" title="Chinese Dragon" alt="Chinese Dragon" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Wyvern Dragon') != -1) { // Mythological - Dragon Variant
                        own_creatures.innerHTML = '<img src="' + url + 'wyverndragon.png" title="Wyvern Dragon" alt="Wyvern Dragon" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Yeti') != -1) { // Mythological - Yeti
                        own_creatures.innerHTML = '<img src="' + url + 'yeti.png" title="Yeti" alt="Yeti" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Lycanthrope Yeti') != -1) { // Mythological - Yeti Variant
                        own_creatures.innerHTML = '<img src="' + url + 'lycanthropeyeti.png" title="Lycanthrope Yeti" alt="Lycanthrope Yeti" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Reptoid Yeti') != -1) { // Mythological - Yeti Variant
                        own_creatures.innerHTML = '<img src="' + url + 'reptoidyeti.png" title="Reptoid Yeti" alt="Reptoid Yeti" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Faun') != -1) { // Mythological - Faun
                        own_creatures.innerHTML = '<img src="' + url + 'faun.png" title="Faun" alt="Faun" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Hydra') != -1) { // Mythological - Hydra
                        own_creatures.innerHTML = '<img src="' + url + 'hydra.png" title="Hydra" alt="Hydra" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Pegasus') != -1) { // Mythological - Pegasus
                        own_creatures.innerHTML = '<img src="' + url + 'pegasus.png" title="Pegasus" alt="Pegasus" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Cyclops') != -1) { // Mythological - Cyclops
                        own_creatures.innerHTML = '<img src="' + url + 'cyclops.png" title="Cyclops" alt="Cyclops" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Tuliferno') != -1) { // Fire Pouch Creature - Level 3
                        own_creatures.innerHTML = '<img src="' + url + 'tuliferno.png" title="Tuliferno" alt="Tuliferno" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Tulimber') != -1) { // Fire Pouch Creature - Level 2
                        own_creatures.innerHTML = '<img src="' + url + 'tulimber.png" title="Tulimber" alt="Tulimber" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Tuli') != -1) { // Fire Pouch Creature - Level 1
                        own_creatures.innerHTML = '<img src="' + url + 'tuli.png" title="Tuli" alt="Tuli" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Vesisaur') != -1) { // Water Pouch Creature - Level 3
                        own_creatures.innerHTML = '<img src="' + url + 'vesisaur.png" title="Vesisaur" alt="Vesisaur" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Vesial') != -1) { // Water Pouch Creature - Level 2
                        own_creatures.innerHTML = '<img src="' + url + 'vesial.png" title="Vesial" alt="Vesial" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Vesi') != -1) { // Water Pouch Creature - Level 1
                        own_creatures.innerHTML = '<img src="' + url + 'vesi.png" title="Vesi" alt="Vesi" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Mermaid') != -1) { // Mythological - Mermaid
                        own_creatures.innerHTML = '<img src="' + url + 'mermaid.png" title="Mermaid" alt="Mermaid" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Hot Spring Mermaid') != -1) { // Mythological - Mermaid Variant
                        own_creatures.innerHTML = '<img src="' + url + 'hotspringmermaid.png" title="Hot Spring Mermaid" alt="Hot Spring Mermaid" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Melusine Mermaid') != -1) { // Mythological - Mermaid Variant
                        own_creatures.innerHTML = '<img src="' + url + 'melusinemermaid.png" title="Melusine Mermaid" alt="Melusine Mermaid" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Fairy') != -1) { // Mythological - Fairy
                        own_creatures.innerHTML = '<img src="' + url + 'fairy.png" title="Fairy" alt="Fairy" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Dryad Fairy') != -1) { // Mythological - Fairy Variant
                        own_creatures.innerHTML = '<img src="' + url + 'dryadfairy.png" title="Dryad Fairy" alt="Dryad Fairy" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Wildfire Fairy') != -1) { // Mythological - Fairy Variant
                        own_creatures.innerHTML = '<img src="' + url + 'wildfirefairy.png" title="Wildfire Fairy" alt="Wildfire Fairy" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Murutain') != -1) { // Earth Pouch Creature - Level 3
                        own_creatures.innerHTML = '<img src="' + url + 'murutain.png" title="Murutain" alt="Murutain" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Muruchi') != -1) { // Earth Pouch Creature - Level 2
                        own_creatures.innerHTML = '<img src="' + url + 'muruchi.png" title="Muruchi" alt="Muruchi" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Muru') != -1) { // Earth Pouch Creature - Level 1
                        own_creatures.innerHTML = '<img src="' + url + 'muru.png" title="Muru" alt="Muru" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Cold Flat Rob') != -1) { // Fancy Flat Rob - Cold Flat Rob
                        own_creatures.innerHTML = '<img src="' + url + 'coldflatrob.png" title="Cold Flat Rob" alt="Cold Flat Rob" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Beach Flat Rob') != -1) { // Fancy Flat Rob - Beach Flat Rob
                        own_creatures.innerHTML = '<img src="' + url + 'beachflatrob.png" title="Beach Flat Rob" alt="Beach Flat Rob" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Tux Flat Rob') != -1) { // Fancy Flat Rob - Tux Flat Rob
                        own_creatures.innerHTML = '<img src="' + url + 'tuxflatrob.png" title="Tux Flat Rob" alt="Tux Flat Rob" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Mitmegu') != -1) { // Mitmegu Pouch Creature
                        own_creatures.innerHTML = '<img src="' + url + 'mitmegu.png" title="Mitmegu" alt="Mitmegu" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Jootmegu') != -1) { // Mitmegu Pouch Creature - Jootmegu
                        own_creatures.innerHTML = '<img src="' + url + 'jootmegu.png" title="Jootmegu" alt="Jootmegu" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Rohimegu') != -1) { // Mitmegu Pouch Creature - Rohimegu
                        own_creatures.innerHTML = '<img src="' + url + 'rohimegu.png" title="Rohimegu" alt="Rohimegu" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Lokemegu') != -1) { // Mitmegu Pouch Creature - Lokemegu
                        own_creatures.innerHTML = '<img src="' + url + 'lokemegu.png" title="Lokemegu" alt="Lokemegu" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Banshee') != -1) { // Mythological - Banshee
                        own_creatures.innerHTML = '<img src="' + url + 'banshee.png" title="Banshee" alt="Banshee" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Pimedus') != -1) { // Pouch Creature - Pimedus
                        own_creatures.innerHTML = '<img src="' + url + 'pimedus.png" title="Pimedus" alt="Pimedus" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Rainbow Unicorn') != -1) { // MHQ Myth
                        own_creatures.innerHTML = '<img src="' + url + 'rainbowunicorn.png" title="Rainbow Unicorn" alt="Rainbow Unicorn" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Gnome') != -1) { // MHQ Myth
                        own_creatures.innerHTML = '<img src="' + url + 'gnomeleprechaun.png" title="Gnome" alt="Gnome" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Ice Dragon') != -1) { // MHQ Myth
                        own_creatures.innerHTML = '<img src="' + url + 'icedragon.png" title="Ice Dragon" alt="Ice Dragon" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Sasquatch') != -1) { // MHQ Myth
                        own_creatures.innerHTML = '<img src="' + url + 'sasquatchyeti.png" title="Sasquatch" alt="Sasquatch" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Fire Pegasus') != -1) { // MHQ Myth
                        own_creatures.innerHTML = '<img src="' + url + 'firepegasus.png" title="Fire Pegasus" alt="Fire Pegasus" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Cherub') != -1) { // MHQ Myth
                        own_creatures.innerHTML = '<img src="' + url + 'cherub.png" title="Cherub" alt="Cherub" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Ogre') != -1) { // MHQ Myth
                        own_creatures.innerHTML = '<img src="' + url + 'ogre.png" title="Ogre" alt="Ogre" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Chimera') != -1) { // MHQ Myth
                        own_creatures.innerHTML = '<img src="' + url + 'chimera.png" title="Chimera" alt="Chimera" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Siren') != -1) { // MHQ Myth
                        own_creatures.innerHTML = '<img src="' + url + 'siren.png" title="Siren" alt="Siren" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Fairy Godmother') != -1) { // MHQ Myth
                        own_creatures.innerHTML = '<img src="' + url + 'fairygodmother.png" title="Fairy Godmother" alt="Fairy Godmother" style="max-height: 32px;">' + own_creatures.innerHTML;
                    } else if(own_creatures.innerHTML.indexOf('Hadavale') != -1) { // MHQ Pouch
                        own_creatures.innerHTML = '<img src="' + url + 'hadavale.png" title="Hadavale" alt="Hadavale" style="max-height: 32px;">' + own_creatures.innerHTML;
                    }
                    if(own_creatures.innerHTML.indexOf('Your') != -1) { // 'Your' aus Link von Wartenden entfernen
                        own_creatures.innerHTML = own_creatures.innerHTML.replace("Your ","");
                        own_creatures.outerHTML = 'Your ' + own_creatures.outerHTML;
                    }
                }
            }
        }


    }


    // DOM vollständig aufgebaut?
    if (/complete|interactive|loaded/.test(document.readyState)) {
        munzee_specials();
    } else {
        document.addEventListener("DOMContentLoaded", munzee_specials, false);
    }

})();
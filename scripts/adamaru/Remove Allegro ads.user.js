// ==UserScript==
// @name           Remove Allegro ads
// @name:pl        Usuwanie reklam Allegro
// @namespace      http://tampermonkey.net/
// @version        0.4.2
// @description    Aims to remove all Allegro ads not blocked by regular ad blockers, like "Sponsorowane produkty" and "sponsorowane" ad boxes.
// @description:pl Usuwa wszystkie reklamy Allegro, które nie są blokowane przez zwykłe blokery reklam, np. "Sponsorowane produkty" i "sponsorowane" boksy.
// @author         adamaru
// @match          *://allegro.pl/*
// @grant          none
// ==/UserScript==

(function() {
    'use strict';
    var running = false;

    function removeAllegroAds(mutations){
        if(mutations){
            var ignoreMutation = false;
            // skip removing ads when changes were made only to countdowns
            mutations.forEach(function(mutation) {
                var i, node;

                for (i = 0; i < mutation.addedNodes.length; i++) {
                    node = mutation.addedNodes[i];
                    if(!node.className || node.className.indexOf('countdown') !== -1){
                        ignoreMutation = true;
                        return;
                    }
                }

                for (i = 0; i < mutation.removedNodes.length; i++) {
                    node = mutation.removedNodes[i];
                    if(!node.className || node.className.indexOf('countdown') !== -1){
                        ignoreMutation = true;
                        return;
                    }
                }
            });
            if(ignoreMutation){
                // only countdown changes, skip
                return;
            }
        }

        if(running){
            // already running, skip
            return;
        }
        running = true;

        removeAllegroOfferAds();
        removeAllegroSponsoredAds();

        running = false;
    }

    function removeAllegroOfferAds(){
        var adsBoxes = document.querySelectorAll('div[data-box-name*="_ads"]');
        for(var i = 0; i < adsBoxes.length; ++i){
            if(adsBoxes[i].innerHTML === ""){
                continue;
            }
            adsBoxes[i].innerHTML = "";
        }
    }

    function removeAllegroSponsoredAds(){
        var spansToCheck = document.querySelectorAll('section[class^="_"] > div[class]');
        for(var i = 0; i < spansToCheck.length; ++i){
            if(spansToCheck[i].innerHTML.indexOf('sponsorowane') !== -1){
                spansToCheck[i].parentNode.innerHTML = "";
            }
        }
    }

    removeAllegroAds(null);

    var observer = new MutationObserver(removeAllegroAds);
    var config = {childList: true, subtree: true};
    observer.observe(document.body, config);
})();
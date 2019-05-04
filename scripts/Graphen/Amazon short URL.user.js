// ==UserScript==
// @name           Amazon short URL
// @namespace      graphen
// @version        4.0.0
// @description    Replace article URL with short Amazon permalink
// @author         Graphen
// @include        /^https?:\/\/(www|smile)\.amazon\.(cn|in|co\.jp|sg|fr|de|it|nl|es|co\.uk|ca|com(\.(mx|au|br))?)\/.*(dp|gp\/product|exec\/obidos\/ASIN|o\/ASIN)\/.*$/
// @icon           https://www.amazon.com/favicon.ico
// @noframes
// @grant          none
// ==/UserScript==

/* jshint esversion: 6 */
(function (doc) {
    'use strict';

    function getAsin(){
        let asinId = doc.getElementById('ASIN');

        if (asinId) {
            return asinId.value;
        }
        else {
            // Get ASIN from canonical link
            let links = doc.getElementsByTagName('link');

            let i;
            for (i=0; i < links.length; i++) {

                if (links[i].rel === 'canonical') {

                    let canonical = links[i].href;
                    let asin = canonical.replace(/https?:\/\/(www|smile)\.amazon\..*\/dp\/([\w]+)$/, '$2');

                    if (asin.length === 10) {
                        return asin;
                    }
                }
            }
        }
    }

    function replaceUrl() {
        let asin = getAsin();
        if (asin){
            history.replaceState(null, 'Amazon URL Cleaner', '/dp/' + asin + '/');
            //console.log("URL replaced by Amazon URL Cleaner. ASIN: " + asin);
        }
    }
    replaceUrl();

    // Execute again when item variation is selected
    var buyboxParent = doc.getElementById('desktop_buybox');
    var MO = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(nodeElement) {
                        if (nodeElement.id == "buybox") {
                            replaceUrl();
                        }
                });
            });
        });
    MO.observe(buyboxParent, { childList: true, subtree: true });

}) (document);

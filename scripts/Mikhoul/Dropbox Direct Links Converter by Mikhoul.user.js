// ==UserScript==
// @name         Dropbox Direct Links Converter by Mikhoul
// @namespace    Mikhoul
// @version      0.5
// @description  Change dropbox.com to direct link dl.dropboxusercontent.com
// @author       Mikhoul based on Djamana Script 
// @include		http*://www.dropbox.com/*
// @grant        none
// @icon         https://cf.dropboxstatic.com/static/images/icons/blue_dropbox_glyph-vflJ8-C5d.png
// ==/UserScript==


    function applyBeautifyDirectlink () {
        
        // Get
        var El     = document.querySelector(".unified-share-modal-link-info__url[value]");
        if (El) {


            // Transform
            var ElVal = El.value;
            var NewVal = ElVal.replace('www.dropbox.com', 'dl.dropboxusercontent.com').replace(/\?.*/, '').replace(/\#.*/, '');
            
            if (ElVal != NewVal) {
                
                // Set
                El.value = NewVal;
            }
        }

        //var El = document.querySelector('.text-input-input[value]');El.value = El.value.replace(/(http)s?(:\/\/)www\.(.*dl=)0/, "$1$2$31")
    }
    
    setInterval (applyBeautifyDirectlink, 10);



        if (El) {


            // Transform
            var ElVal = El.value;
            var NewVal = ElVal.replace('www.dropbox.com', 'dl.dropboxusercontent.com').replace(/\?.*/, '').replace(/\#.*/, '');
            
            if (ElVal != NewVal) {
                
                // Set
                El.value = NewVal;
            }
        }

        //var El = document.querySelector('.text-input-input[value]');El.value = El.value.replace(/(http)s?(:\/\/)www\.(.*dl=)0/, "$1$2$31")
    }
    
    setInterval (applyBeautifyDirectlink, 1000);
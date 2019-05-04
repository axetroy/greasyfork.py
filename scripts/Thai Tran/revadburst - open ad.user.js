// ==UserScript==
// @name        revadburst - open ad
// @namespace   *
// @include     *revadburst.com/viewads.php*

// @version     0.1
// @description revadburst - Main - collect and open Ad-link
// @namespace   *
// @grant       none
// ==/UserScript==
var timer = 1;

function doText() {
    //myInterval = setInterval(doText, 50000);
    timer++;

    //Update Timer
    var inputs = document.getElementsByTagName('h2');
    inputs[0].innerHTML ='Members Ads - auto click (30s): ' + timer;
    
    //element.style.backgroundColor = "red";
    if (timer % 2 == 0) inputs[0].style.color='red';
    else inputs[0].style.color='blue';
    
    if(timer>30){
        timer=1;
        var links = document.links;

        for (var i = 20; i < links.length; i++) {
            links[i].click();break;
            if (links[i].href. indexOf('directory_view.php?i=')>0){
                links[i].click();break;
            }

        }

    }

}



var myInterval = setInterval(doText, 1000);

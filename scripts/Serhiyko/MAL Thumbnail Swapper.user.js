// ==UserScript==
// @name        MAL Thumbnail Swapper
// @namespace   pseudoenigmatic@hotmail.com
// @description Increases the size of thumbnails on MAL by swapping them out with their original file
// Credits to Blender and Brock Adams on StackOverflow for the skeleton
// @include     http://myanimelist.net/manga*
// @include     http://myanimelist.net/anime*
// @include     http://myanimelist.net/profile*
// @include     http://myanimelist.net/character*
// @include     http://myanimelist.net/people*
// @include     https://myanimelist.net/manga*
// @include     https://myanimelist.net/anime*
// @include     https://myanimelist.net/profile*
// @include     https://myanimelist.net/character*
// @include     https://myanimelist.net/people*
// @version     1.07
// @grant       none
// ==/UserScript==

var checkCount = 0;
var myCheck = setInterval(function(){ checkLazyloaded(); }, 200);
var editedTags = [];

function checkLazyloaded() {
    var tags = document.getElementsByClassName('lazyloaded');
    var nwidth = "80";
    for (var i = 0; i < tags.length; i++) {
        var regexDimensions = /\/r\/\d{2}x\d{2,3}/g;
        if (regexDimensions.test(tags[i].src)) {
            tags[i].src = tags[i].src.replace(regexDimensions, '');
            if (tags[i].width < nwidth) {
                if (tags[i].hasAttribute("srcset")) {
                    tags[i].setAttribute("srcset", tags[i].getAttribute("srcset").replace(regexDimensions, ''));
                }
                editedTags.push(tags[i]);
            }
        }
    }
    for (var j = 0; j < editedTags.length; j++) {
        if (editedTags[j].naturalWidth > 0 && editedTags[j].naturalHeight > 0) {
            var proportion = editedTags[j].naturalWidth/nwidth;
            editedTags[j].width = nwidth;
            editedTags[j].height = editedTags[j].naturalHeight/proportion;
        }
    }
    checkCount += 1;
    if (checkCount > 200) {
        clearInterval(myCheck);
    }
}
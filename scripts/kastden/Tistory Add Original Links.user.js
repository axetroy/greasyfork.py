// ==UserScript==
// @name            Tistory Add Original Links
// @description     Adds link to original size below each image
// @version         0.1
// @include         http://*
// @include         https://*
// @namespace https://greasyfork.org/users/2822
// ==/UserScript==

var tags = document.getElementsByTagName('img');
for (var i = 0; i < tags.length; i++) {
        if(tags[i].src.match(/\/\/cfile.*\/image\//i)){
                var link = document.createElement('a');
                link.innerHTML = 'Original';
                link.href = tags[i].src.replace('image', 'original');
                tags[i].parentNode.appendChild(link);
        }
}
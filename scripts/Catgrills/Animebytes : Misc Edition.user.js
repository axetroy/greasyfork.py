// ==UserScript==
// @name         Animebytes : Misc Edition
// @namespace    AB
// @version      1.0.3
// @description  Add a advanced search/search button toggle and others features included.
// @author       Catgrills
// @icon         https://i.imgur.com/SSmyS59.jpg
// @include      https://animebytes.tv*
// @grant        none
// ==/UserScript==

// AnimeBytes Navgation Footer Scroll Pop Up
var illustration = document.getElementsByClassName('group_img');
var nav = document.getElementById('browse_nav_sections');
for(var i=0; i < illustration.length; i++) {
    illustration[i].getElementsByTagName('img')[0].src = illustration[i].getElementsByTagName('img')[0].src.replace('75x125','1000x1000');
    illustration[i].getElementsByTagName('img')[0].style.width = '150px';
}
document.body.onscroll = function() {
    var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
    if (scrollTop >= 200) {
        nav.style.bottom = '0px';
    } else {
        nav.style.bottom = '-100px';
    }
};

// AnimeBytes Search Boxes
var menu = document.getElementById('menu');
var searchbox = document.getElementById('searchbars');
var toggle1 = document.createElement('button');
toggle1.id = 'searchboxes-btn';
var text_toggle1 = document.createTextNode('search');
toggle1.appendChild(text_toggle1);
menu.appendChild(toggle1);
var value = 0;
toggle1.onclick = function() {
    if(value==0) {
        searchbox.style.marginTop = '77px';
        value = 1;
    } else {
        searchbox.style.marginTop= '0px';
        value = 0;
    }
};

// AnimeBytes Advanced Search Box
var search = document.getElementById('browse_search');
var toggle2 = document.createElement('button');
toggle2.id = 'advancesearch-btn';
var text_toggle2 = document.createTextNode('advanced search');
if(search) {
    toggle2.appendChild(text_toggle2);
    menu.appendChild(toggle2);
    var value = 0;
    toggle2.onclick = function() {
        if(value==0) {
            search.style.display = 'block';
            value = 1;
        } else {
            search.style.display = 'none';
            value = 0;
        }
    };
}

// AnimeBytes Empty Tags
var tag = document.getElementsByClassName('tags');
for(var i=0; i < tag.length; i++) {
    var link = tag[i].getElementsByTagName('a');
    for(var j=0; j < link.length; j++) {
        if(link[j].innerHTML == "") {
            link[j].style.display = 'none';
        }
    }
}
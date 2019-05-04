// ==UserScript==
// @name         Canal UA - Place libre à la vidéo
// @namespace    http://aucun.fr/
// @version      2
// @description  Place libre à la vidéo vous permet d'améliorer un tant soit peu l'interface du célèbre CANAL UA 
// @author       Antoine Tagah
// @include        http://canal-ua.univ-angers.fr/*
// @grant       none
// ==/UserScript==


var el = document.getElementById('playerhtml5');
var ele = document.getElementsByClassName('visuleft');


//el.setAttribute('style', 'text-align: justify; word-spacing: 2px;');
el.setAttribute("width", "100%");
ele['0'].setAttribute('style', 'width: 17%');
el.setAttribute("height", "70%");


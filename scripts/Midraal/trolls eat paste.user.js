// ==UserScript==
// @name         trolls eat paste
// @version      0.1
// @description  Make trolls on techdirt sound more intelligent. Based on a suggestion by G Thompson on techdirt
// @author       midraal
// @match        https://www.techdirt.com/*
// @grant        none
// @namespace https://greasyfork.org/users/6146
// ==/UserScript==

$j(".cbody").each(function(comment){
    if($j(this).text().toLowerCase()=="mike masnick just hates it when copyright law is enforced."){
        $j(this).text("I like to eat Paste, I like to eat paste")
    }
})
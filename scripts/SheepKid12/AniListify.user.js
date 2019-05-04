// ==UserScript==
// @name         AniListify
// @namespace    http://anilist.co/
// @version      1.2
// @description  Redirects every anime and manga request from MyAnimeList to AniList
// @author       bela333 (Userscript part by SheepKid12)
// @include      https://myanimelist.net/anime/*
// @include      https://myanimelist.net/manga/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    var query = 'query($id: Int, $type: MediaType){Media(idMal: $id, type: $type){siteUrl}}';
    var res = /^\/(anime|manga)\/(\d+)/.exec(window.location.pathname);
    if (res != undefined && window.location.host == 'myanimelist.net') {
        var type = res[1].toUpperCase();
        var id = res[2];
        var request = {};
        request.query = query;
        request.variables = {
            id: id,
            type: type
        };
        var requestjson = JSON.stringify(request);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://graphql.anilist.co/', !0);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            console.log(this.responseText);
            try {
                var response = JSON.parse(this.responseText).data.Media.siteUrl;
                window.location = response
            } catch (e) {
                alert('Error acquiring AniList data. More details in the console.\nShould probably ask @bela333#2635 about this.');
                console.log(e)
            }
        };
        xhr.send(requestjson)
    } else {
        //Disabling this part as this will constantly attempt to run on the genre page (which has /anime in it)
        //alert('Invalid site')
    }
})()
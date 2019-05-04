// ==UserScript==
// @name        Nyaa SI Extreme
// @namespace   Original by Vietconnect & Simon1, updated by minori_aoi specifically to works with sukebei.nyaa.si.
// @require     http://code.jquery.com/jquery-3.1.0.slim.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/markdown-it/8.3.1/markdown-it.min.js
// @include     http*://sukebei.nyaa.si/*
// @grant       GM_xmlhttpRequest
// @version     10
// @description This script sorts searches by seeders, it also shows the description and images if those are included. Also it grays out unseeded torrents.
// ==/UserScript==

var url = $(location).attr('href');

if((url.indexOf('q=') > -1) && (url.indexOf('s=') == -1) && (url.indexOf('o=') == -1)){
    var q = getUrlParameter('q');
    if(q != ''){
        window.location.replace(url + "&s=seeders&o=desc");
        redirecting = true;
    }
}

var makeOutLinkNewTab = function() {
	$("a[href*='http://']:not([href*='"+location.hostname+"'])").attr("target","_blank");
};
makeOutLinkNewTab();

var markdownOptions = {
    html: true,
    breaks: true,
    linkify: true,
    typographer: true
};

var rows =  $("table.torrent-list tbody tr").length;
console.log("Rows : " + rows);

if(rows > 0){

	$("table.torrent-list tbody tr").after("<tr class='preview-row'><td colspan=9>loading...</td></tr>");

    var isRow = $("table.torrent-list tbody tr");

    var x = 0;

    $(isRow).each(function(){
        if($(this).attr("class") != "preview-row"){
            if($(this).attr("class") == "danger") {
                $(this).find(".tlistname a").css("color", "#A3A2A2");
                var row1 = $(this).next(".preview-row").remove();
            } else {
                var url = $(this).find("td:eq(1) a").attr("href");
                url = "https://sukebei.nyaa.si" + url;
                var row2 = $(this).next(".preview-row").find("td");
                setTimeout(function(){
                    GM_xmlhttpRequest({
                        method: "GET",
                        url: url,
                        onload: function(response) {
                            var isi = $(response.responseText).find("div#torrent-description");
                            //console.log(isi);
                            console.log("Requesting " + x + url);
                            var markdown = markdownit(markdownOptions);
                            isi = markdown.render(isi[0].innerHTML);
                            row2.html(isi);
                            makeOutLinkNewTab();
                        }
                    });
                }, 500*x);
                x++;
            }
        }
    });
}

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}
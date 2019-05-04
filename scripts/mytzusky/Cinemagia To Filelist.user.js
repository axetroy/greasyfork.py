// ==UserScript==
// @name       Cinemagia To Filelist
// @namespace  http://use.i.E.your.homepage/
// @version    0.4
// @description  Helps you to search a movie from cinemagia on filelist.ro
// @match      http://www.cinemagia.ro/*
// @copyright  2014, Mihai Morcov
// @require http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js
// ==/UserScript==

$(function() {
    
    var pathname = window.location.pathname;
    console.log(pathname);
    
    // h1 a: Pagina unui film (la titlu)
    // h2 a: Filme pe categorii sau an. Ex: http://www.cinemagia.ro/filme-animatie/2013/
    //		 Filme de urmarit la TV 
    //.film a: Box Office section
    //.movie a: BoxOffice page. Ex: http://www.cinemagia.ro/boxoffice/romania/
    $('h1 a, h2 a, .film a, .movie a').filter(function() {
        return this.href.match('(http|https)://www.cinemagia.ro/filme/[^/]*/$');
    }).each(function() {
        addSearchIcon(this, $(this).html());
        addSearchBluRayIcon(this, $(this).html());
    });
    
    // http://www.cinemagia.ro/club/pagina-mea/filme/
    $('.list_7 a').filter(function() {
        return (this.href.match('^(http|https)://www.cinemagia.ro/filme/[a-zA-Z0-9]'));
    }).each(function() {
        addSearchIcon(this, $(this).find("strong").html());
        addSearchBluRayIcon(this, $(this).find("strong").html());
    });
    
});

var order = 1;
function addSearchIcon(movieLink, movieTitle){
    console.log(order + ". "+movieTitle);
    order++;
    var searchTerm = movieTitle.replace(" ", "+");
    var hdRO = '<a href="http://filelist.ro/browse.php?search='+searchTerm+'&cat=19" style="margin-right: 5px;" ><img width="20" height="20" src="http://filelist.ro/styles/images/cat/hd-ro.png"></a>';
    $(movieLink).parent().prepend(hdRO);
}

var order1 = 1;
function addSearchBluRayIcon(movieLink, movieTitle){
    console.log(order + ". "+movieTitle);
    order1++;
    var searchTerm = movieTitle.replace(" ", "+");
    var hdRO = '<a href="http://filelist.ro/browse.php?search='+searchTerm+'&cat=20" style="margin-right: 5px;" ><img width="20" height="20" src="http://filelist.ro/styles/images/cat/bluray.png"></a>';
    $(movieLink).parent().prepend(hdRO);
}
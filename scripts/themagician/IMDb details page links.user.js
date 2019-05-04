// ==UserScript==
// @name           IMDb details page links
// @namespace      IMDb.com
// @description    Adds some links to IMDb details page
// @include        *imdb.com/title/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js
// @require        https://cdnjs.cloudflare.com/ajax/libs/jqModal/1.3.0/jqModal.min.js
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_registerMenuCommand
// @grant          GM_addStyle
// @version        2.3.2
// ==/UserScript==    

// CHANGELOG
// 2.3.2 - Fix new reference view
// 2.3.1 - Fix TV episode pages
// 2.3 - Fix for new layout
// 2.2.1 - Change UI to fit in new IMDb layout
// 2.2 - Add {alttitle}
// 2.1.2 - Replace # with example.com to prevent my movies enhancer
// from highlighting the delete and up/down links
// 2.1.1 - Use JSON instead of eval
// 2.1 - Add up/down for editing sites
// 2.0 - Make links modifiable
// 1.1 - Update URLs      

// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/Trim
if(!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g,'');
    };
}

function defaultSites() {
    return [{title:"Google",           url:"http://www.google.com/search?q={title} {year}"},
            {title:"Subtitles",        url:"http://www.google.com/search?q={title} {year} subtitles"},
            {title:"YouTube",          url:"http://www.youtube.com/results?search_query={title} {year}"},
            {title:"iCheckMovies",     url:"http://www.icheckmovies.com/search/movies/?query={imdbid}"},
            {title:"RottenTomatoes",   url:"http://www.rottentomatoes.com/search/?search={title}"},
            {title:"HDBits",           url:"http://hdbits.org/browse2.php#film/dir=null&searchtype=film&actorfilm=film&search={imdbid}"},
            {title:"AsianDVDClub",     url:"http://asiandvdclub.org/browse.php?search={imdbid}&descr=1"},
            {title:"PassThePopCorn",   url:"http://passthepopcorn.me/torrents.php?searchstr={imdbid}"},
            {title:"KaraGarga",        url:"http://karagarga.in/browse.php?incldead=&d=&sort=&search={imdbidn}&search_type=imdb"},    
            {title:"Cinemageddon",     url:"http://cinemageddon.net/browse.php?search={imdbid}&proj=0"},
            {title:"AsiaTorrents",     url:"https://avistaz.to/torrents?in=1&search={alttitle}&tags=&type=0&language=0&subtitle=0&discount=0&rip_type=0&video_quality=0&tv_type=0&uploader="},
            {title:"TehConnection",    url:"http://tehconnection.eu/torrents.php?searchstr={title}"},
            {title:"WhatTheMovie",     url:"http://whatthemovie.com/search?t=movie&q={imdbid}"},
            {title:"Mubi",             url:"http://www.google.com/search?q=site:mubi.com {title} {year}"},
            {title:"ListAL",           url:"http://www.google.com/search?q=site:listal.com {title} {year}"},
            {title:"HanCinema",        url:"http://www.hancinema.net/googlesearch.php?cx=partner-pub-1612871806153672%3A2t41l1-gajp&cof=FORID%3A10&ie=ISO-8859-1&hl=en&q={title}"},    
            {title:"Criticker",        url:"http://www.criticker.com/?st=movies&h={imdbid}&g=Go"},
            {title:"iCM Highest Rated",url:"http://themagician.host56.com/highestrated/search/#search={imdbid}"}];
}

/**
 * @brief Find header element
 * @return Header element or null if not found 
 */ 
function findHeader() {
    var $header = null;
    if(location.href.indexOf("reference") === -1 && 
            location.href.indexOf("combined") === -1) {
        var $overview = $("#overview-top");    
        if($overview.length) {
            $header = $overview.find(".header:first");
        }    
        else {
            $header = $("div.title_wrapper:first");
        }                                                           
    }
    else {
        $header = $("h3[itemprop='name']")               
    }
    return $header;
}

function parseConstants() {
    var $header = findHeader();
    if($header.length === 0) {
        return null;
    }
    
    var headerText = $header.text().replace(/(\r\n|\n|\r)/gm,"");
    // Get title and year
    var matches = headerText.match(/(.*?)\(([0-9]{4})/);
    var seriesName = "";
    if(!matches) {
        // TV episode 
        seriesName = jQuery("div.titleParent > a").attr("title") + " ";
        matches = headerText.match(/(.*?)(?:[\s]{2,})(?:.*)([0-9]{4})/);
    }
    var imdb_id = window.location.href.match(/(tt[0-9]+)/)[0];
    var rx = /As:<\/h4> ([^\n]*)/g;
    var alt_title_m = rx.exec(jQuery("#titleDetails").html());
    var alt_title = alt_title_m !== null ? alt_title_m[1].trim() : seriesName + matches[1].trim();
    return {title: encodeURIComponent(seriesName + matches[1].trim()),
            year: matches[2].trim(),
            imdbid: imdb_id,
            imdbid_n: imdb_id.replace("tt", ""),
            alttitle: encodeURIComponent(alt_title)};
}

var App = {
    links: [],
    init: function() {
        App.buildLinks();
        
        // Add modal
        GM_addStyle('.jqmWindow {display: none; position: absolute; font-family: verdana, arial, sans-serif; ' +
        'background-color:#fff; color:#000; padding: 12px 30px; overflow-y: scroll; font-size: 14px} .jqmOverlay { background-color:#000 }');
        var cfgMainHtml = '<div id="dialog" class="jqmWindow"></div>';
        $(cfgMainHtml).css({
            top: '17%', left: '50%', marginLeft: '-425px', width: '850px', height: '450px'
        }).appendTo('body');                                 
        $('#dialog').jqm();
    },
    buildLinks: function() {
        var sites = GM_getValue("sites");
        if(sites !== undefined && sites !== null) {
            sites = JSON.parse(sites);
        }
        else {
            GM_setValue("sites", JSON.stringify(defaultSites()));
            sites = defaultSites();
        }
        
        var $root = $("#pagecontent");
        $root.css("position", "relative");
        
        $("#linkbar").remove();
        var $c = $('<div></div>');
        $c.attr("id", "linkbar");
        $c.css({width: "150px", padding: "15px",
                textAlign: "right", position: "absolute", top: "1px",
                left: "-180px", backgroundColor: "rgb(248, 248, 248)"});
                                
        $root.append($c);
        
        // Render sites
        for(var i = 0; i < sites.length; ++i) {
            App.addSite(sites[i]);
        }
    }, 
    addSite: function(site) {
        var c = parseConstants();
        if(c === null) {
            return;
        }
        
        var url = site.url.replace("{title}", c.title)
                            .replace("{year}", c.year)
                            .replace("{imdbid}", c.imdbid)
                            .replace("{imdbidn}", c.imdbid_n)
                            .replace("{alttitle}", c.alttitle);
        var $root = $("#linkbar");                            
        var $link = $("<a></a>");
        $link.attr("href", url);
        $link.text(site.title);
        $link.css({display: "block", marginBottom: "2px"});        
        $root.append($link);
    },
    displayEditor: function() {
        var sites = GM_getValue("sites");
        if(sites !== undefined) {
            sites = JSON.parse(sites);
        }
        
        var c = parseConstants();
        var out = '<div><p>{title} = ' + c.title + '</p>'
                + '<p>{alttitle} = ' + c.alttitle + '</p>' 
                + '<p>{year} = ' + c.year
                + ' {imdbid} = ' + c.imdbid
                + ' {imdbidn} = ' + c.imdbid_n + '</p><table>';
        var addRow = function(i, title, url) {
            return '<tr class="site-' + i + '"><td style="width: 6%"><a href="http://example.com/#delete" class="delete">Delete</a></td><td style="width: 18%"><input type="text" style="width: 100%" value="' 
                + title + '"></td><td style="width: 62%"><input type="text" style="width: 100%" value="' 
                + url + '"></td><td style="width: 14%; padding-left: 8px"><a href="http://example.com/#up" class="up">Up</a> | <a href="http://example.com/#down" class="down">Down</a></td></tr>';
        }
        for(var i = 0; i < sites.length; ++i) {
            out += addRow(i, sites[i].title, sites[i].url);
        }
        out += '</table><p><button id="add">Add new</button> <button id="restore">Restore defaults</button></p>';
        $("#dialog").html(out);
        $("#dialog").jqmShow();
        
        $("#dialog").on("change input paste", "tr[class^=site] input", App.saveEditor);
        
        $("#dialog").on("click", "a.delete", function(e){
            e.preventDefault();
            var response = window.confirm("Delete?");
            if(!response) {
                return;
            }
            
            $(this).parent().parent().remove();
            App.saveEditor();
        });
        
        $("#dialog").on("click", "a.up, a.down", function(e) {
            e.preventDefault();
            
            var $t = $(this);
            var $parent = $t.parent().parent();
            if($t.is(".up")) {
                $parent.insertBefore($parent.prev());
            }
            else {
                $parent.insertAfter($parent.next());
            }
            
            App.saveEditor();            
        });
        
        $("#add", "#dialog").on("click", function() {
            var $table = $("table", "#dialog");
            $table.append(addRow($table.find("tr").length, '', ''));
        });
        
        $("#restore", "#dialog").on("click", function() {
            var response = window.confirm("Restore defaults? (This will remove all links!)");
            if(!response) {
                return;
            }
            
            GM_setValue("sites", JSON.stringify(defaultSites()));
            App.buildLinks();
            $("#dialog").jqmHide();
        });
    },
    saveEditor: function() {
        // Save result
        var $rows = $("tr", "#dialog");
        var mapped = $rows.map(function(index, elem){
            var $fields = $(elem).find("input");
            return {title: $fields.eq(0).val(), url: $fields.eq(1).val()}; 
        });
        
        GM_setValue("sites", JSON.stringify(mapped.get()));
        
        App.buildLinks(); 
    }
};

$(window).ready(App.init);

GM_registerMenuCommand("Edit sites", App.displayEditor);
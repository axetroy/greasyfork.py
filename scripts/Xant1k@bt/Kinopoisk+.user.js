// ==UserScript==
// @name			Kinopoisk+
// @namespace		https://greasyfork.org/users/19952-xant1k-bt
// @description		Добавляет ссылки на поиск по торрент сайтам под постером / Add links to search torrent sites under movie poster
// @version			1.0
// @author			Activa
// @include			https://kinopoisk.ru/film/*
// @include			https://www.kinopoisk.ru/film/*
// @require	  		https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js
// @grant			GM_getValue
// @grant			GM_setValue
// @grant			none
// ==/UserScript==

var ru2en = {
    ru_str: "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя",
    en_str: ["A", "B", "V", "G", "D", "E", "YO", "ZH", "Z", "I", "Y", "K", "L", "M", "N", "O", "P", "R", "S", "T", "U", "F", "KH", "TS", "CH", "SH", "SHCH", "", "Y", "", "E", "YU", "YA", "a", "b", "v", "g", "d", "e", "yo", "zh", "z", "i", "y", "k", "l", "m", "n", "o", "p", "r", "s", "t", "u", "f", "kh", "ts", "ch", "sh", "shch", "", "y", "", "e", "yu", "ya"],
    translit: function(j) {
        var g = "";
        for (var l = 0, h = j.length; l < h; l++) {
            var k = j.charAt(l),
                i = this.ru_str.indexOf(k);
            if (i >= 0) {
                g += this.en_str[i]
            } else {
                g += k
            }
        }
        return g
    }
};
$(document).ready(function() {
    var imgs = "https://www.google.com/s2/favicons?domain="; //alternative get favicons https://icons.duckduckgo.com/ip2/
    var movie_eng = $("span[itemprop='alternativeHeadline']");
    if (movie_eng.text() != "") {
        var movie = movie_eng.text()
    } else {
        var movie_rus = $(".moviename-big[itemprop='name']");
        var newLbl = $(movie_rus[0].outerHTML);
        $("span", newLbl).remove();
        movie = newLbl.text()
    }
    var movie_enc = encodeURIComponent(movie);
    var movie_imdb = ru2en.translit(movie);
    var year = $(".info a").html();
    var imdb_img = "data:image/png;base64,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";
$.ajax({
        url: "http://www.omdbapi.com/",
        data: "t=" + movie_imdb + "&y=" + year,
        jsonp: "callback",
        jsonpCallback: "callbackName",
        dataType: "jsonp",
        timeout: 180000 //6000
    }).done(function callbackName(data) {
        if (data.Response == "True") {
            $("#loading").detach();
            $(".torrents").append('<a style="margin: 14px;" target="_blank" title="IMDB" href="http://www.imdb.com/title/' + data.imdbID + '"><img style="border:0; margin-top: 3px; margin-bottom : 3px; width: 16px; height: 16px;"  src="' + imdb_img + '"></a>')
        } else {
            $("#loading").detach();
            $(".torrents").append('<a style="margin: 14px;" target="_blank" title="IMDB" href="http://www.imdb.com/find?q=' + movie_enc + '"><img style="border:0; margin-top: 3px; margin-bottom : 3px; width: 16px; height: 16px;"  src="' + imdb_img + '"></a>')
        }
    }).fail(function(jqXHR, data) {
        $("#loading").detach();
        $(".torrents").append('<a style="margin: 14px;" target="_blank" title="IMDB" href="http://www.imdb.com/find?q=' + movie_enc + '"><img style="border:0; margin-top: 3px; margin-bottom : 3px; width: 16px; height: 16px;"  src="' + imdb_img + '"></a>')
    })

 	//RUSSIAN
	var link1 = '<a target="_blank" title="RuTracker" href="https://rutracker.org/forum/tracker.php?nm=' + movie_enc + " " + year + '"><img src="' + imgs + 'rutracker.org"></a>';
    var link2 = '<a target="_blank" title="Kinozal" href="http://kinozal.tv/browse.php?s=' + movie + " " + year + '"><img src="' + imgs + 'kinozal.tv"></a>'; //http://kinozal.me/
    var link3 = '<a target="_blank" title="rutor" href="http://rutor.info/search/' + movie_enc + " " + year + '"><img src="' + imgs + 'rutor.info"></a>';
    var link4 = '<a target="_blank" title="NNM-Club" href="https://nnmclub.to/forum/tracker.php?nm=' + movie_enc + " " + year + '"><img src="' + imgs + 'nnmclub.to"></a>';
    var link5 = '<a target="_blank" title="HDClub" href="http://hdclub.org/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'hdclub.org"></a>';
	var link6 = '<a target="_blank" title="bluebird-hd" href="http://bluebird-hd.org/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'bluebird-hd.org"></a>';

	//TV SHOW
	var link7 = '<a target="_blank" title="broadcasthe.net" href="https://broadcasthe.net/torrents.php?searchstr=' + movie_enc + " " + year + '"><img src="' + imgs + 'broadcasthe.net"></a>';
	var link8 = '<a target="_blank" title="TVChaosUK" href="https://www.tvchaosuk.com/all=/browse.php?keywords=' + movie_enc + " " + year + '"><img src="' + imgs + 'tvchaosuk.com"></a>';
	var link9 = '<a target="_blank" title="MoreThanTV" href="https://www.morethan.tv/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'morethan.tv"></a>';
	var link10 = '<a target="_blank" title="BitMeTV" href="http://www.bitmetv.org/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'bitmetv.org"></a>';
	var link11 = '<a target="_blank" title="TV-Vault" href="https://tv-vault.me/all=torrents.php?searchstr=' + movie_enc + " " + year + '"><img src="' + imgs + 'tv-vault.me"></a>';
	var link12 = '<a target="_blank" title="Freshon" href="https://freshon.tv/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'freshon.tv"></a>';
	
	//ASIAN
    var link13 = '<a target="_blank" title="HDChina" href="https://hdchina.club/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'hdchina.club"></a>';
	var link14 = '<a target="_blank" title="asiandvdclub" href="https://asiandvdclub.org/all=/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'asiandvdclub.org"></a>';
	var link15 = '<a target="_blank" title="HDCorea" href="https://hdcorea.me/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'hdcorea.me"></a>';
	var link16 = '<a target="_blank" title="M-Team" href="https://tp.m-team.cc/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'tp.m-team.cc"></a>';
	var link17 = '<a target="_blank" title="ToTheGlory" href="https://totheglory.im/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'totheglory.im"></a>';
	
	//HD
    var link18 = '<a target="_blank" title="HDBits" href="https://hdbits.org/all=/browse.php?incldead=0&search=' + movie_enc + " " + year + '"><img src="' + imgs + 'hdbits.org"></a>';
	var link19 = '<a target="_blank" title="SceneHD" href="https://scenehd.org/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'scenehd.org"></a>';
    var link20 = '<a target="_blank" title="awesome-hd.net" href="https://awesome-hd.me/torrents.php?searchstr=' + movie_enc + " " + year + '"><img src="' + imgs + 'awesome-hd.me"></a>';
	var link21 = '<a target="_blank" title="pixelhd.me" href="https://pixelhd.me/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'pixelhd.me"></a>';
	var link22 = '<a target="_blank" title="HDME" href="https://hdme.eu/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'hdme.eu"></a>';
	var link23 = '<a target="_blank" title="PrivateHD" href="https://privatehd.to/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'privatehd.to"></a>';
	var link24 = '<a target="_blank" title="UHDBits" href="https://uhdbits.org/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'uhdbits.org"></a>';
	var link25 = '<a target="_blank" title="HDArea" href="https://www.hdarea.co/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'hdarea.co"></a>';
	var link26 = '<a target="_blank" title="HD-Bits" href="https://www.hd-bits.com/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'hd-bits.com"></a>';
	var link27 = '<a target="_blank" title="HDSky" href="https://hdsky.me/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'hdsky.me"></a>';
	var link28 = '<a target="_blank" title="HD-Space" href="https://hd-space.org/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'hd-space.org"></a>';
	var link29 = '<a target="_blank" title="HDCenter" href="https://hdcenter.cc/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'hdcenter.cc"></a>';
	var link30 = '<a target="_blank" title="UltraHDClub" href="http://ultrahdclub.org/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'ultrahdclub.org"></a>';
	var link31 = '<a target="_blank" title="HD-Torrents" href="https://hd-torrents.org/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'hd-torrents.org"></a>';
	var link32 = '<a target="_blank" title="BeyondHD" href="https://beyondhd.xyz/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'beyondhd.xyz"></a>';
	var link33 = '<a target="_blank" title="WiHD" href="https://world-in-hd.net/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'world-in-hd.net"></a>';
	var link34 = '<a target="_blank" title="bit-hdtv.com" href="https://www.bit-hdtv.com/torrents.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'bit-hdtv.com"></a>';
	var link35 = '<a target="_blank" title="hd-spain.com" href="https://www.hd-spain.com/browse.php?' + movie_enc + " " + year + '"><img src="' + imgs + 'hd-spain.com"></a>';
	var link36 = '<a target="_blank" title="chdbits.org" href="https://chdbits.co/torrents.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'chdbits.co"></a>';

	//DVD/VHS
	var link37 = '<a target="_blank" title="dvdseed" href="http://www.dvdseed.eu/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'dvdseed.eu"></a>';
	
	//SCENE, 0-day
	var link38 = '<a target="_blank" title="TorrentDay" href="https://www.torrentday.com/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'torrentday.com"></a>';
	var link39 = '<a target="_blank" title="TheGFT" href="https://www.thegft.org/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'thegft.org"></a>';
	var link40 = '<a target="_blank" title="SceneAccess" href="https://sceneaccess.org/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'sceneaccess.org"></a>';
	var link41 = '<a target="_blank" title="PirateTheNet" href="http://piratethe.net/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'piratethe.net"></a>';
	var link42 = '<a target="_blank" title="IPTorrents (IPT)" href="https://iptorrents.com/all=/t?q=' + movie_enc + " " + year + '"><img src="' + imgs + 'iptorrents.com"></a>';
	var link43 = '<a target="_blank" title="tls.passthepopcorn.me" href="https://tls.passthepopcorn.me/torrents.php?searchstr=' + movie_enc + " " + year + '"><img src="' + imgs + 'tls.passthepopcorn.me"></a>';
	var link44 = '<a target="_blank" title="RevolutionTT" href="https://revolutiontt.me/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'revolutiontt.me"></a>';
	
	//OTHER
    var link45 = '<a target="_blank" title="cinemageddon" href="https://cinemageddon.net/all=/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'cinemageddon.net"></a>';
    var link46 = '<a target="_blank" title="karagarga" href="https://karagarga.in/all=/browse.php?incldead=1&search=' + movie_enc + " " + year + '"><img src="' + imgs + 'karagarga.in"></a>';
    var link47 = '<a target="_blank" title="BitmeTV" href="http://www.bitmetv.org/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'bitmetv.org"></a>';
    var link48 = '<a target="_blank" title="cinematik" href="https://cinematik.net/all=/browse.php?incldead=0&director=0&search=' + movie_enc + " " + year + '"><img src="' + imgs + 'cinematik.net"></a>';
    var link49 = '<a target="_blank" title="x264" href="https://x264.me/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'x264.me"></a>';
	var link50 = '<a target="_blank" title="polishsource" href="https://polishsource.cz/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'polishsource.cz"></a>';
	var link51 = '<a target="_blank" title="hon3yhd" href="https://hon3yhd.com/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'hon3yhd.com"></a>';
	var link53 = '<a target="_blank" title="TorrentVault" href="https://torrentvault.org/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'torrentvault.org"></a>';
	var link54 = '<a target="_blank" title="TorrentShack" href="https://torrentshack.me/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'torrentshack.me"></a>';
	var link55 = '<a target="_blank" title="TorrentBytes" href="https://torrentbytes.net/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'torrentbytes.net"></a>';
	var link56 = '<a target="_blank" title="NordicBits" href="https://www.nordicbits.eu/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'nordicbits.eu"></a>';
	var link57 = '<a target="_blank" title="BitHumen" href="https://bithumen.be/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'bithumen.be"></a>';
	var link58 = '<a target="_blank" title="avistaz" href="https://avistaz.to/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'avistaz.to"></a>';
	var link59 = '<a target="_blank" title="ILoveClassics" href="http://www.iloveclassics.com/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'iloveclassics.com"></a>';
	var link60 = '<a target="_blank" title="Gormogon" href="http://www.gormogon.com/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'gormogon.com"></a>';
	var link61 = '<a target="_blank" title="BitHQ" href="http://www.bithq.org/all=/search.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'bithq.org"></a>';
	var link62 = '<a target="_blank" title="TehConnection" href="https://tehconnection.eu/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'tehconnection.eu"></a>';
	var link63 = '<a target="_blank" title="HorrorCharnel" href="https://horrorcharnel.org/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'horrorcharnel.org"></a>';
	var link64 = '<a target="_blank" title="cinemaz" href="https://cinemaz.to/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'cinemaz.to"></a>';
	var link65 = '<a target="_blank" title="DanishBits	" href="https://danishbits.org/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'danishbits.org"></a>';
	var link66 = '<a target="_blank" title="NorBits" href="https://norbits.net/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'norbits.net"></a>';
	var link67 = '<a target="_blank" title="PolishTracker" href="https://polishtracker.net/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'polishtracker.net"></a>';
	var link68 = '<a target="_blank" title="privatehd" href="https://privatehd.to/all=/index.php?page=torrents&search=' + movie_enc + " " + year + '"><img src="' + imgs + 'privatehd.to"></a>';

	//CARTOONS, COMICS
	var link69 = '<a target="_blank" title="cartoonchaos" href="http://www.cartoonchaos.org/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'cartoonchaos.org"></a>';
	var link70 = '<a target="_blank" title="32pages" href="https://32pag.es/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + '32pag.es"></a>';
	
	//SUBTITLES
	var link71 = '<a target="_blank" title="opensubtitles" href="https://www.opensubtitles.org/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'opensubtitles.org"></a>';
	var link72 = '<a target="_blank" title="subscene" href="https://subscene.com/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'subscene.com"></a>';
	var link73 = '<a target="_blank" title="subtitleseeker href="http://www.subtitleseeker.com/browse.php?search=' + movie_enc + " " + year + '"><img src="' + imgs + 'subtitleseeker.com"></a>';
	
	// var link52 = '<a target="_blank" title="podnapisi" href="https://www.podnapisi.net/' + movie_enc + " " + year + '"><img src="' + imgs + 'podnapisi.net"></a>';

	//WEB
	var link74 = '<a target="_blank" title="blu-ray" href="http://www.blu-ray.com/search/?quicksearch=1&quicksearch_country=all&quicksearch_keyword=%search_string%+&section=bluraymovies' + movie_enc + " " + year + '"><img src="' + imgs + 'blu-ray.com"></a>';
	var link75 = '<a target="_blank" title="m.youtube.com" href="https://m.youtube.com/results?ajax=1&tsp=1&q={query}' + movie_enc + " " + year + '"><img src="' + imgs + 'm.youtube.com"></a>';	
	var link76 = '<a target="_blank" title="youtube.com" href="https://www.youtube.com/results?search_query=' + movie_enc + " " + year + '"><img src="' + imgs + 'youtube.com"></a>';

	var post = '<br><div class="torrents">' + link1 + link2 + link3 + link4 + link5 + link6 + link7 + "<br>" + link8 + link9 + link10 + link11 + link12 + link13 + link14 + "<br>" +link15 + link16 + link17 + link18 + link19 + link20 + link21 + link22 + link23 + link24 + link25 + link26 + link27 + link28 + link29 + link30 + link31 + link32 + link33 + link34 + link35 + link36 + link37 + link38 + link39 + link40 + link41 + link42 + link43 + link44 + link45 + link46 + link47 + link48 + link49 + link50 + link51 + link53 + link54 + link55 + link56 + link57 + link58 + link59 + link60 + link61 + link62 + link63 + link64 + link65 + link66 + link67 + link68 + link69 + link70 + link71 + link72 + link73 + link74 + link75 + link76 +"</div>";

   if ($("#photoBlock.originalPoster").length > 0) {
        $("#div_mustsee_main").before(post);
        $(".torrents").css({
            "padding-left": "15px",
            "margin-top": "-20px",
            "margin-bottom": "10px",
            "background-color": "#f2f2f2",
            width: "180px"
        });
        $(".torrents a").css({
            margin: "4px" //14px
        });
        $(".torrents a img").css({
            border: "0",
            "margin-top": "3px",
            "margin-bottom": "3px"
        })
    } else {
        $("#div_mustsee_main").before(post);
        $(".torrents").css({
            "margin-top": "-20px",
            "margin-bottom": "10px",
            "background-color": "#f2f2f2",
            width: "135px"
        });
        $(".torrents a").css({
            margin: "7px"
        });
        $(".torrents a img").css({
            border: "0",
            "margin-top": "3px",
            "margin-bottom": "3px"
        })
    }
    $(".torrents").append('<a id="loading" style="margin: 14px;" target="_blank" title="IMDB" href="http://www.imdb.com/title/"><img style="border:0; margin-top: 3px; margin-bottom : 3px; width: 16px; height: 16px;"  src="data:image/gif;base64,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"></a>')
});
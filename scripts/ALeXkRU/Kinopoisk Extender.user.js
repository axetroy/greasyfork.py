// ==UserScript==
// @name          Kinopoisk Extender
// @description   Расширение функционала kinopoisk.ru.
// @namespace     https://greasyfork.org/ru/scripts/21933-kinopoisk-extender
// @author        Activa & ALeXkRU & hossam6236
// @license       CC BY-SA
// @version       1.8.1
// @homepage      https://greasyfork.org/ru/scripts/21933-kinopoisk-extender
// @require       https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @include       https://www.kinopoisk.ru/film/*
// @grant         GM_xmlhttpRequest
// @grant         GM_addStyle
// ==/UserScript==

function jQueryCode(){

	var ru2en={
		ru_str:"АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя",
		en_str:["A","B","V","G","D","E","YO","ZH","Z","I","Y","K","L","M","N","O","P","R","S","T","U","F","KH","TS","CH","SH","SHCH","","Y","","E","YU","YA","a","b","v","g","d","e","yo","zh","z","i","y","k","l","m","n","o","p","r","s","t","u","f","kh","ts","ch","sh","shch","","y","","e","yu","ya"],
		prc_str:["%C0","%C1","%C2","%C3","%C4","%C5","%A8","%C6","%C7","%C8","%C9","%CA","%CB","%CC","%CD","%CE","%CF","%D0","%D1","%D2","%D3","%D4","%D5","%D6","%D7","%D8","%D9","%DA","%DB","%DC","%DD","%DE","%DF","%E0","%E1","%E2","%E3","%E4","%E5","%B8","%E6","%E7","%E8","%E9","%EA","%EB","%EC","%ED","%EE","%EF","%F0","%F1","%F2","%F3","%F4","%F5","%F6","%F7","%F8","%F9","%FA","%FB","%FC","%FD","%FE","%FF"],
		translit:function(j){
			var g="";
			for(var l=0,h=j.length;l<h;l++){
				var k=j.charAt(l),i=this.ru_str.indexOf(k);
				if(i>=0){g+=this.en_str[i];}
					else{g+=k;}
			}return g;
		},
		decode_mv:function(j){
			var g="";
			for(var l=0,h=j.length;l<h;l++){
				var k=j.charAt(l),i=this.ru_str.indexOf(k);
				if(i>=0){g+=this.prc_str[i];}
					else{g+=k;}
			}return g;
		}
	};

	/*Browser detection patch*/
	/* from http://pupunzi.open-lab.com/2012/08/14/jquery-1-8-and-browser-detection/ */
	jQuery.browser = {};
	jQuery.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
	jQuery.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
	jQuery.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
	jQuery.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());

    const API_KEY_OMDB = 'c989d08d';
    movie_db = {};  //vrem
    movie_loading = {};  //vrem
	var movie_imdbID = "";
    try {
		$.urlParam = function (name) {
			var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
			if(results)
				return results[1];
			else
				return 0;
			// example.com?param1=name&param2=&id=6
			// $.urlParam('param1'); // name
		};

		var c = localStorage.getItem('movie_db');
		if (c) {
			$.extend(movie_db, JSON.parse(c));
		}

		var count = 0;

		$(document).ready(function(){
			var imgs="https://www.google.com/s2/favicons?domain=";
			var movie_eng=$("span[itemprop='alternativeHeadline']");
			var movie_rus=$(".moviename-big[itemprop='name']");
			var movie="";
			var movie2="";
			var movie_ru="";
			var movie2_ru="";
			var newLbl="";

			if(movie_eng.text()!==""){
					movie=movie_eng.text();
					movie2=movie.replace(/[«»·]+/g,' ').replace(/  +/g, ' ');
					newLbl=$(movie_rus[0].outerHTML);
					$("span",newLbl).remove();
					movie_ru=newLbl.text();
					movie2_ru=movie_ru.replace(/[«»·]+/g,' ').replace(/  +/g, ' ');
			} else {
				newLbl=$(movie_rus[0].outerHTML);
				$("span",newLbl).remove();
				movie=newLbl.text();
				movie2=movie.replace(/[«»·]+/g,' ').replace(/  +/g, ' ');
				movie_ru=movie;
				movie2_ru=movie2;
			}

			var movie_enc=encodeURIComponent(movie);
			var movie_imdb=ru2en.translit(movie_ru);
		//	var movie_imdb=encodeURIComponent(movie_ru);
			var movie_allm=ru2en.translit(movie);
			var movie_hdclub=ru2en.decode_mv(movie_ru);
			var movie_nnm=encodeURIComponent(movie2_ru);
			var year=$(".info a").html();
			var imdb_img="data:image/png;base64,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";
		/*
			alert(movie+"\n"+year+"\n"+movie_ru);
			alert(movie_enc+"\n"+movie_imdb+"\n"+movie_hdclub+"\n"+movie_nnm+"\n"+year);
		*/
			if(!jQuery.browser.mozilla){
		//		getstr="?t="+movie_imdb+"&y="+year;
		//		getstr="?t="+movie_imdb;
		//alert(API_KEY_OMDB+"//__?apikey=c989d08d");

				var url2db = 'http://www.omdbapi.com/?apikey=' + API_KEY_OMDB + '&t=' + movie_enc + '&y=' + year + '&plot=full&r=json';
		//alert(url2db);
				GM_xmlhttpRequest({
					method: 'GET',
					url: url2db,
					onload: function(response) {
						var data = JSON.parse(response.responseText);
						//console.log(data);
						if (data.Response === 'False') {
							if((movie+" ").indexOf("s ")-(movie+" ").indexOf("'s ") > 1){
								return getImdbInfo((movie+" ").replace("s ", "'s "), year, dl_element);
							}else{
								movie_db[stor_title] = false;
								updateElement_dl(stor_title);
								count++;
							}
							$("#loading").detach();
							$(".torrents").append('<a style="margin: 14px;" target="_blank" title="IMDB" href="http://www.imdb.com/find?q='+movie_enc+'"><img style="border:0; margin-top: 3px; margin-bottom : 3px; width: 16px; height: 16px;"  src="'+imdb_img+'"></a>');
						} else {
							/* получаем полную информацию  */  /*
							let movie_imdb = {
								imdbID: data.imdbID,
								Title: '<a href="http://www.imdb.com/title/'+data.imdbID+'" target="_blank">'+data.Title+'</a>',
								Year: data.Year,
							};
							getImdbInfoByID(data.imdbID, stor_title, movie_imdb);
							// movie_db[stor_title] = data;
							// updateElement_dl(stor_title);  */
							movie_imdbID=data.imdbID;
							if(data.imdbID!==""){
								movie_imdbID=data.imdbID;
						   /*     $("#loading13").detach();
								$(".torrents").append('<a style="margin: 14px;" target="_blank" title="MoviePosterDB" href="http://www.movieposterdb.com/movie/'+movie_imdbID+'"><img style="border:0; margin-top: 3px; margin-bottom : 3px; width: 16px; height: 16px;" src="'+imgs+'movieposterdb.com"></a>');
								$("#loading14").detach();
								$(".torrents").append('<a style="margin: 14px;" target="_blank" title="Rotten Tomatoes" href="http://www.rottentomatoes.com/alias?type=imdbid&s='+movie_imdbID+'"><img style="border:0; margin-top: 3px; margin-bottom : 3px; width: 16px; height: 16px;" src="'+imgs+'rottentomatoes.com"></a>');
							*/	$("#loading").detach();
								$(".torrents").append('<a style="margin: 14px;" target="_blank" title="IMDB" href="http://www.imdb.com/title/'+movie_imdbID+'"><img style="border:0; margin-top: 3px; margin-bottom : 3px; width: 16px; height: 16px;"  src="'+imdb_img+'"></a>');

							}
			//				return true;
						}
						localStorage.setItem('movie_db', JSON.stringify(movie_db));
		//alert("024-title");
		//alert(movie_db);
					},
					onerror: function(){
						console.warn('request failed: ' + url2db);
					}
				});
		/*  старый вариант
				GM_xmlhttpRequest({method:"GET",url:"http://www.omdbapi.com/"+getstr,onload:function(response){
					var data=eval("("+response.responseText+")");
					movie_imdbID=data.imdbID;
					if(data.imdbID!==""){
						movie_imdbID=data.imdbID;
						$("#loading").detach();
						$(".torrents").append('<a style="margin: 14px;" target="_blank" title="IMDB" href="http://www.imdb.com/title/'+data.imdbID+'"><img style="border:0; margin-top: 3px; margin-bottom : 3px; width: 16px; height: 16px;"  src="'+imdb_img+'"></a>');
					}
				}});    */
			}else{
				$.ajax({
					url:"http://www.omdbapi.com/?apikey="+API_KEY_OMDB,
					data:"t="+movie_imdb+"&y="+year+"&plot=full&r=json",
					jsonp:"callback",
					jsonpCallback:"callbackName",
					dataType:"jsonp",
					timeout:6000
				}).done(function callbackName(data){
					if(data.Response=="True"){
						$("#loading").detach();
						movie_imdbID=data.imdbID;
						$(".torrents").append('<a style="margin: 14px;" target="_blank" title="IMDB" href="http://www.imdb.com/title/'+data.imdbID+'"><img style="border:0; margin-top: 3px; margin-bottom : 3px; width: 16px; height: 16px;"  src="'+imdb_img+'"></a>');
					}else{
						$("#loading").detach();
						$(".torrents").append('<a style="margin: 14px;" target="_blank" title="IMDB" href="http://www.imdb.com/find?q='+movie_enc+'"><img style="border:0; margin-top: 3px; margin-bottom : 3px; width: 16px; height: 16px;"  src="'+imdb_img+'"></a>');
					}
				}).fail(function(jqXHR,data){
					$("#loading").detach();
					$(".torrents").append('<a style="margin: 14px;" target="_blank" title="IMDB" href="http://www.imdb.com/find?q='+movie_enc+'"><img style="border:0; margin-top: 3px; margin-bottom : 3px; width: 16px; height: 16px;"  src="'+imdb_img+'"></a>');
					});
			}
			var link1='<a target="_blank" title="RuTracker.org" href="http://rutracker.net/forum/tracker.php?nm='+movie_enc+" "+year+'"><img src="'+imgs+'rutracker.org"></a>';
			var link2='<a target="_blank" title="МегаШара" href="http://megashara.com/search/?text='+movie_nnm+'"><img src="'+imgs+'megashara.com"></a>';
			// var link3='<a target="_blank" title="HDClub.org" href="http://hdclub.org/browse.php?search='+movie_hdclub+'"><img src="'+imgs+'hdclub.org"></a>';
			var link3='<a target="_blank" title="Torrentino" href="http://torrentin.org/search?kind%5B%5D=9&search='+movie_nnm+" "+year+'"><img src="'+imgs+'torrentino.cf"></a>';
			var link4='<a target="_blank" title="Torrentino" href="http://www.torrentino.cf/search.php?q='+movie+" "+year+'"><img src="'+imgs+'torrentino.cf"></a>';
			var link5='<a target="_blank" title="KinoZal.tv" href="http://kinozal.tv/browse.php?s='+movie+" "+year+'"><img src="'+imgs+'kinozal.tv"></a>';
			var link6='<a target="_blank" title="TFile.me" href="http://tfile.me/forum/ssearch.php?q='+movie+" "+year+'"><img src="'+imgs+'tfile.me"></a>';
			var link7='<a target="_blank" title="RuTor.org" href="http://live-rutor.org/search/'+movie_enc+" "+year+'"><img src="'+imgs+'new-rutor.org"></a>';
			var link8='<a target="_blank" title="NNM-Club.me" href="http://nnmclub.to/forum/tracker.php?nm='+movie_nnm+" "+year+'"><img src="'+imgs+'nnm-club.me"></a>';
			var link10='<a target="_blank" title="youtube.com" href="http://www.youtube.com/results?search_query='+movie_nnm+" "+year+'"><img src="'+imgs+'youtube.com"></a>';
			var link11='<a target="_blank" title="allmovie.com" href="http://www.allmovie.com/search/movies/'+movie_allm+" "+year+'"><img src="'+imgs+'allmovie.com"></a>';
			var link12='<a target="_blank" title="Torrentz" href="http://torrentz.eu/search?f='+movie+" "+year+'"><img src="'+imgs+'torrentino.cf"></a>';
		//	var link13='<a id="loading13" target="_blank" title="MoviePosterDB" href="http://www.movieposterdb.com/movie/'+movie_imdbID+'"><img src="'+imgs+'movieposterdb.com"></a>';
			var link13='<a target="_blank" title="MoviePosterDB" href="https://www.movieposterdb.com/movie/'+movie_allm+'"><img src="'+imgs+'movieposter.com"></a>';
		//	var link14='<a target="_blank" title="Rotten Tomatoes" href="http://www.rottentomatoes.com/alias?type=imdbid&s='+movie_allm+'"><img src="'+imgs+'rottentomatoes.com"></a>';
			var link14='<a target="_blank" title="Rotten Tomatoes" href="https://www.rottentomatoes.com/search/?search='+movie_allm+'"><img src="'+imgs+'rottentomatoes.com"></a>';
		//	var link14='<a id="loading14" target="_blank" title="Rotten Tomatoes" href="http://www.rottentomatoes.com/alias?type=imdbid&s='+movie_imdbID+'"><img src="'+imgs+'rottentomatoes.com"></a>';
		//	var link15='<a target="_blank" title="OpenSubs" href="http://www.opensubtitles.org/ru/search/sublanguageid-all/imdbid-'+movie_imdbID+'"><img src="'+imgs+'opensubtitles.org"></a>';
			var link15='<a target="_blank" title="OpenSubs" href="https://www.opensubtitles.org/ru/search2/sublanguageid-rus/moviename-'+movie_enc+'"><img src="'+imgs+'opensubtitles.org"></a>';
			var link16='<a target="_blank" title="Subscene" href="https://subscene.com/subtitles/title?q='+movie_allm+" "+year+'"><img src="'+imgs+'subscene.com"></a>';
		//	var link17='<a target="_blank" title="Wikipedia" href="https://ru.wikipedia.org/wiki/'+movie+'"><img src="'+imgs+'wikipedia.org"></a>';
			var link17='<a target="_blank" title="Wikipedia" href="https://ru.wikipedia.org/w/index.php?cirrusUserTesting=explorer&search='+movie_nnm+'&profile=default&fulltext=1"><img src="'+imgs+'wikipedia.org"></a>';
			var link18='<a target="_blank" title="Google" href="https://www.google.ru/search?q='+movie_nnm+" "+year+'"><img src="'+imgs+'google.com"></a>';
			var link19='<a target="_blank" title="filmitorrent.org" href="http://filmitorrent.org/index.php?do=search&full_search=1&story='+movie_hdclub+'&titleonly=0"><img src="'+imgs+'filmitorrent.org"></a>';

			var link20='<a target="_blank" title="7tor.org" href="http://7tor.org/search.php?sr=topics&sf=titleonly&fp=0&tracker_search=torrent&keywords='+movie_enc+'"><img src="'+imgs+'7tor.org"></a>';
		//	var link21='<a target="_blank" title="free-torrents.org" href="http://free-torrents.org/forum/tracker.php?nm='+movie_enc+" "+year+'"><img src="'+imgs+'free-torrents.org"></a>';
			var post='<br><div class="torrents">'+link1+link2+link3+link4+"<br>"+link5+link6+link7+link8+"<br>"+link10+link11+link12+link13+"<br>"+link14+link15+link16+link17+"<br>"+link18+link19+link20+"</div>";
			if($("#photoBlock.originalPoster").length>0){
				$("#div_mustsee_main").before(post);
				$(".torrents").css({"padding-left":"15px","margin-top":"-20px","margin-bottom":"10px","background-color":"#f2f2f2",width:"180px"});
				$(".torrents a").css({margin:"14px"});
				$(".torrents a img").css({border:"0","margin-top":"3px","margin-bottom":"3px"});
			}else{
				$("#div_mustsee_main").before(post);
				$(".torrents").css({"margin-top":"-20px","margin-bottom":"10px","background-color":"#f2f2f2",width:"135px"});
				$(".torrents a").css({margin:"7px"});
				$(".torrents a img").css({border:"0","margin-top":"3px","margin-bottom":"3px"});
			}
			$(".torrents").append('<a id="loading" style="margin: 14px;" target="_blank" title="IMDB" href="http://www.imdb.com/title/"><img style="border:0; margin-top: 3px; margin-bottom : 3px; width: 16px; height: 16px;"  src="'+imdb_img+'"></a>');
			});
		(function() {var css = "";
				css += ["@namespace url(http://www.w3.org/1999/xhtml);",
						"",
						"/* модификация вида */"
				].join("\n");
				if (false || (document.domain == "kinopoisk.ru" || document.domain.substring(document.domain.indexOf(".kinopoisk.ru") + 1) == "kinopoisk.ru"))
				css += [
				" #top_3banners {display: block !important;}",
				" #top_superscreen, .top-adv-toggle-button {display: none !important;}",
				" #external_header_wrapper:not(#id) {top: 0 !important;}",
				" body{background: none !important;}",
				" body{background: #C0C0C0 !important; overflow: auto !important;}",
			// !!	" body{background:url(\'\')!important;}",
				" body:not(#id) {padding-top: 0!important;}",
				" html[style] {background-image: url(\'\')!important;}",
				" #top .png_block, #GoUpClickZone{background:url(\'\') !important;}",
				"  #top {height:100px!important;}",
				"  .master {top:1px!important;}",
				"  .menu {top:1px!important;}",
		// !! выравниваем секцию поиск:
				" #top_form {top: 2px!important;}",
				" #top .png_block {top: 2px!important;}",
		// !! расширяем полезную площадь
				" #content_block, .contentBlock1, .shadow, #top, #top .png_block, .block_left_padtop, #photoInfoTable{width:100% !important;}",
				" div[id\*=\"div_review_\"]{width:98% !important;}",
				" .brand_words, p[id\^=\"ext_text_\"], ._reachbanner_ {width:100% !important;}",
				" .reviewItem, .userReview, p[id\^=\"ext_text_\"][data-find], span._reachbanner_ {width:100% !important;}",
				" div#content_block.contentBlock0>table {margin:0 0 !important;}",
				" div#content_block.contentBlock1>table {width:95% !important;}",
				" div#content_block.contentBlock1>table>tbody[data-find]>tr[data-find] {width:95% !important;}",
				" #photoBlock {padding-left:20px !important;}",
				" div#nav_express {padding-left:40px !important;}"
				].join("\n");
				if (typeof GM_addStyle != "undefined") {
					GM_addStyle(css);
				} else if (typeof PRO_addStyle != "undefined") {
					PRO_addStyle(css);
				} else if (typeof addStyle != "undefined") {
					addStyle(css);
				} else {
					var node = document.createElement("style");
					node.type = "text/css";
					node.appendChild(document.createTextNode(css));
					var heads = document.getElementsByTagName("head");
					if (heads.length > 0) {
						heads[0].appendChild(node);
					} else {
						// no head yet, stick it whereever
						document.documentElement.appendChild(node);
					}
				}
			}());

	} catch (e) {
		unsafeWindow.console.log(e);
	}
}

if(typeof jQuery=='undefined') {
    var headTag = document.getElementsByTagName("head")[0];
    var jqTag = document.createElement('script');
    jqTag.type = 'text/javascript';
    jqTag.src = '//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js';
    jqTag.onload = jQueryCode;
    headTag.appendChild(jqTag);
} else {
     jQueryCode();
}
// ==UserScript==
// @author       nht.ctn
// @name         [DP] Diğer Sitelere PlanetDP Bağlantısı Ekleme Aracı
// @namespace    https://github.com/nhtctn
// @version      1.0
// @description  Sık kullanılan birkaç film, dizi ve anime sitesine PlanetDP'ye kolay erişim sağlayacak bağlantı ekler.
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAJcEhZcwAACxEAAAsRAX9kX5EAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuOWwzfk4AAAPHSURBVFhHxVZtaI1hGD7ztRGK8v39FUIkfiilKC0halPbOe/7zlZbxFbKHwmlJX6YhJolP1fyg4PT7Hy8m3xT8kNM4Q8TITQjs/tx3Y/73XnPOc84ph1X3Z33uZ/r/nju97nv8wYYsTJaGrdp2+VSNUor/gdiNk1CEufjFtVe20pjRJ1bKKXyEhbtQhLvEzYduRqisbKVW7iOWoIEHkE6OJFYBY2TrdzhZhENxSs5iQQIv52QutYgTZDt3CFq0Xok8SZhK6UTsehYzhO57HSMx92IcBK/RFfkhBukyUL5d7gWLTtXrAbqZ0fNQ4C1ekOgAiovGvpRjQp87UnEom/gnWwqoylC6zvguNwrbTxEi+Wk4eYSmqMJAnTGQgR+mKyG5n2LWXQqXkrThPb3wEn28kDiZ54DKc5tOuRuV8M1EUCFCqCvgw35E8EhvkN/GvvThZo9+J3CwTp+5leBdZffOU79EroSvIw8bQC4DhXC5nUKD8KJQBpQrRlC/TPgnKdguSz5lbxKd6yd26qluZQWCU2qRWEjlyuCROB7ltB7B5zcgOyRJa/vmpyywHEXHB+9HaSRzOULivV2BOo08nU16awbotnauQkgPY/Z3cdlGYDDiyZnfoFNO2SLmARaLJqP5B6YuCy9JsIngOHXuN19TlT8CupNTvwSt7o/48KViYmG67woQPJ3THxPuIKQhlavfZsqaLTetKhVK4C4pQ6kG6YKNae3HabmCji+ZeanC13heaMNUZoFrMRvm1YAaL2qTCOIpT4mHFXJVRNqgBNBNRphn9KWJgHnXsKhNWL6C6yQzU+i4qQ2phujQhH/1LtQTiMQuBZc4+VLFXoGXsn+/WqAmCfh2hQSEoUr1TDWtZTRcp/xBwR3NBnQcwItC4ftSU4vYtFb2NdECilfzDMBZ7s9g+hWNZN1UUtN5TWCXLpeThM1EcCYXg1+rzfdE3C+QGq9Vv0tMMePeoZopRWsi+ykfC6ZJgDxIM3FabJpzR848ZlI8Ev2/5QwavQcxBy1SdQa3CE4yTEI5nxmwFShMHwtENPswePV56SKdXjPQ3A5q7F+lxokUxD0NqqzSjvrC+CgrccZ+j8Wog0I/MQfxCz0FPxif0v2CUjgk+cUz9m01BvMiR33K9VgcdF3cNuZg5iEOnBhD0aC7/58s7MFt505WFJQlS5Ifb98jEat7ytNQT1B4As9M7s/gClYZAqMct/AMFoptP4DLlONPzD6/TF0m/2fXv0KlPiwBMa3HVW5q9Qg2coNkEAdhsg+tzj51Zs7BAI/ATGDAuhMWJKcAAAAAElFTkSuQmCC

// @match        *://*.imdb.com/title/*
// @match        *://*.imdb.com/list/*
// @include      *://*.google*/search*
// @match        *://*.trakt.tv/shows/*
// @match        *://*.trakt.tv/movies/*
// @match        *://*.icheckmovies.com/movies/*
// @match        *://*.icheckmovies.com/lists/*
// @match        *://*letterboxd.com/film/*
// @match        *://*.themoviedb.org/movie*
// @match        *://*.themoviedb.org/tv*
// @match        *://*.thetvdb.com/series/*
// @match        *://boxofficeturkiye.com/film/*
// @match        *://*.subscene.com/subtitles/*
// @match        *://*.opensubtitles.org/*
// @match        *://*.myanimelist.net/*
// @match        *://*.anidb.net/perl-bin/animedb.pl?show=anime*
// @match        *://*.livechart.me/*
// @match        *://*.turkcealtyazi.org/mov/*
// @match        *://*.turkcealtyazi.org/sub/*
// @match        *://*.sarangni.info/mov/*
// @match        *://*.sarangni.info/sub/*
// @match        *://mydramalist.com/*
// @match        *://*.movie.douban.com/subject/*
// @match        *://*.hancinema.net/*

// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js

// @grant   	 GM_addStyle
// @run-at       document-end

// ==/UserScript==
(function() {

	'use strict';

	var PlanetDP =
	[{//==========================================================================================================================================================================================
         // İstemediğiniz siteler için 1'i 0'a çevirin.
         imdb: '1', imdb_list: '1', imdb_google: '1',
         trakt: '1', iCheckMovies: '1', letterboxd: '1', TheMovieDB: '1', thetvdb: '1', boxofficeturkiye: '1', subscene: '1', OpenSubtitles: '1',
         MyAnimeList: '1', AniDB: '1', LiveChart: '1', turkcealtyazi: '1', sarangni: '1', MyDramaList: '1', douban: '1', hancinema: '1',

         name: 'PlanetDP', short_name: 'DP', url: 'https://www.planetdp.org/movie/search?title=%ttimdbId%', url_title: 'https://www.planetdp.org/movie/search?title=%title%', url_forum: 'http://forum.planetdp.org/index.php?/search/&q=%ttimdbId%',
         icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuOWwzfk4AAAPqSURBVFhHxVZJaBRBFG033HBLZqomMe4iiiAo4kFEBAUVFD0IghFUFJeDJ/EQiYILRkIUd/AiIogYVCSHkGSmuxM3RAJqEHJSjIhIFIlmz0xX+ar696RnpkdNYsYHn+7+9f7Sv379bkOhJxpaIGy28+uj/Ela8T/QXsuZY7JbCZMdl/aUqaTOLaRhjEiY4UMJk392TH5SPpk5jZZyC1EfWYQkXkF+OBY/LZ4X5dFS7iCq549FFSoSFneQyE/HYmelXRCi5dwhHmXrUIVPEIlE2tEn58TjSJiWcwMRLcxH8IcqCZ2IxTpQkXLxjDOiDB3C5ItVE+r7Wj6nz4ys1gs+JGy2D6cEwSkRk3U6Nq/osMMRogwewmLFosZtNuz1QjcIu9dlRmZpAkHNDOhfekkQrxPXC6IhVEC0gQMlPqqqoO5Fdd5kzznK3Qk5gZMwXhMB2WiMUU0JG6c/Cc3tQo9cEk/zC4n690DHn0cV1qp7KY0RCNDld47n93GbbdVkgrT5GmzDx1Se3ppu8C+LWN50ov4ZMLyDNyimR1WRd+mOlUBfI7ANRDPUsIJdZTCX9aAiV4U9vYjo2QGyBUdH6FFV5EmQUyXg9qotQLNOJLpq4j2YGZgXAXxLJ3JNNBTOIHom4LQZTsvpERUJfqtUYR9EPd9MJkgiPA9+XgRzKRGLXxc1AYkg+zYs3qZHVIBd8hsHCYJ9h912MtGQN4wx0NtBfE/cRNgV6R1fVUq9YPI6rQBwX5JumCqsStSldruoDy2F/rfBlSBpgS2+342KacNuOzxfL5i8SSuARIzvTjd0hX3DQNpJNA11/qG/CfuUYxkk4DzFVq0kUxd9dniVu8haSWXErfD6dGPIA//UU7MBNqVw2h7ATRHwmmXaMU5C2JFtLok7jdhDrYuxJUlji7X691rNCTjcAX2Lx8km8PkZvAPSNkaTeSZAOuwZdNLwaI8x7jpglepvSRMBVT7osna6J/D5E1tV6j+qWeHEWJlnKGIFy5ROZYzJuEUTAEy92XF8G+BY+AOlC9b79PAZyJcSBrc8B/FYZCOpNb7p7wIrw1tjvGYG9MRNjFUKNDSZ/j2wv7VJR+h+pZOVxijs3X6sffEHChIkVy8a+ArtbDCAkzf9zngJunUdrk2eLpsgwbdxm28iN4MH3qA16VT//2UGS5NPwuJ7VZXIxeChRyd+PAOCZAh4bXjrY7KqYAKZDx3qmx0UzC+oUC9+vS4Oy18xhtDyoKBKdGeb7K6MsrlE//dQn9Og4DhSpkqOaMOHRIwdTAv+GoE30PLwAwFPuYFZSyIa2YU5P5KWcgN8l89gr49Ke9Y4UuUQhvELesxt69DhWMoAAAAASUVORK5CYII=',
         icon_green: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuOWwzfk4AAAO2SURBVFhHxVZbSBRhGJ0toxtJ93vYZVl357LrVoRItEFCBUk9JEEKFUWXh57CB6OSLlhIRZYFou7MrljsUj30VEEZ1EP0UkngU1EhERJhWmmB2vlmv1lnZmdZW3M7cJj5v/98l/86IxC8Ea9H1uTKwubCGbrhf8Af9c+XVZQRkU8G1MBMNuccLkmTjqCQT3ieVtqUWWzPLaSI5MNcvEQh38CzYkyczV25g7vePRmzcBGFDIK9kirVeho9c7k7d1BalFIk70IRw5iNPrxfKGopmsfduQFOyRwkvqsXAeL9O551tHFZMnb4NJ+Eh4veEXiFoikb6N0MLMkBTp4oRJN+0DKJqriQJdkD01shNiU2G969PNKYr9lXoAsYfGe8MIowCoHPZW+rdxHL/h5IVsWzILhb3fm24KeKY8VTdSGwpnHNJOhrYacNmiwE/Al9ffBmcDFLRw8EvKSoyiZuuiiYOTj63yHhDu7XAdtG9H0065j9KORqQAssYWlmIFgbElRwk9pvHQLTSbjvj/g9LBPoskKyeBrtAJ4NSquylOXpAfFj8Bg3qf00JaBBVf6FAmuxWaezXIB9H9hr0Y2QCrkuhaVlLE8FRtEJUR03qe08KivfS1GpjF3IZxUKe+6gMziA4m84FgLnHgii3KR2vc05hUj2Fdf2LnbRQRsUfe12rY0D8L2WPL40ldSBpA91A4B2tcnBifeCzdbd7ov4grBnSk4cAm/TjOmOOP9u6oChQzcAOBF7TQ4jVOUveFayTAedf4woDLv9WDrxGZathF0TECPieupEAd1sErBOm22OxDvmW4/uBvicQFF9DloLoeuEznKMk8C1u5OFg7SGZMO73+TcbVnrYcGlhJXdCPjB0KQl/i3ksHwo1B7KY+9U4C/oqOFgXB5yk7yA2pjauPmjg5kpybDTDfbS7JiPalpAeN5wxMhWky1UE8pTIsp2XQDgN205EsegoQ1kT5YkYv3Gs8FcdEZgmjQjAJZjK5t14McknwvsNzSOVOUh6OJiVHSz6+gB5wdGINr9ZCuPl09EMQcx6s+WRA6E5omoiev0YNkAAV6bAlZj6ksxmg6TzZmq/AabcxuHyR5I1m0KnO4+TxIFd4H7aZY4RPbgq3M0FwhtsB7wOHymsfvYQcfOKZmF+PrhqF7xtI3DXzECr3VMSsTOxvMW/oxXsvzfAxdLWUriBB9RcSwbP2CUh22JX+G+38Ld4w/MwBk9Me51MSzuEWqECdyVGyD5OZzlqgK1YAqbcghB+AO6HvKsiiWw5QAAAABJRU5ErkJggg==',
         icon_white: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuOWwzfk4AAAFLSURBVDhPnZK9S0JhGMWvSdp30KJDZPgHBC3lEEFjW00OTW2VNUiBREu0NEU011JL9AcUTo0ORrQbJC5hH4O01NK9/Z63Iw5mZgd+3PM87zkv98L1TEEQDEPEDf+V7/uzsARRrToXbzHOBeewAb1a/11cEIIw5R2oQJa5T8etZd8PcQqbsK5LpqAEVdiCfsWbRWGMwCSs4QOedzxmYAB/rN0z5GBQtYZYTsM8LFrYhDedYeOwgH/R/hXsE4dUd29ggWVIWagu5mseSejBH7qlxPwAo+4CzCpsQ0KHb7CC7eKZhrLtTfgPOIARVzYx7MERRCEPCUhBQT0rfsKpnanWEMsTuDBPtv4v+N9VV76CCRf+SRxewg3sw7t6VizCnGKtRehWHSfme0hjQ4r8LsKPKj5BBtuto/YiHIYa7FJu/knaiWKEYkxjh/K8L/mIvepMsZUZAAAAAElFTkSuQmCC',
         icon_long: 'data:image/png;base64,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',
         icon_iCheckMovies: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuOWwzfk4AAAGiSURBVDhPjdK/LwNhGAfwhxAVVVFSNBE7y20WYTLZ+yPpIFHX43+4YxSrxGIxCBsxGJSgEVKtRmhVG5EwiFFCSPzoe77P9W1VW00v+eTNPfc+3773XIkvrx6a8eihhEfXVkExs01kZiDdTOK6hUQKrmwkLltJXLSRSNhJnLeTiDuIzNtGko0m8xvqQzGongCRtHGAArvwCgI4LAZWUO0APOQLG10wBBNwBNaJIAr5oGoB/CAwH1zGOgBLsA5Or65iLtoTVAaVBUzBG4Y4mh+m9g3PfmNawzoOa/AOlUEygG9MbpYBhY08iwgM+wx1paQuWV9NKQYAH5+HWdjEA11A6CDW2ZJ6qSj5dHVD3mxBAzzCDT7nCNZ+8MAd/GlGcBKrQoG54I4sboIdFmEMRzSwxiEDn2A14nX4Pj+DGGaAAg+FH6bBDZOwLWtF2McnyzeedpI46yArAAX+w/CmD0jBPXzJWgH/iCKOu0icOKk8oOL9Svx+skg3/RfwIjdXbcwd9JA4dFGtgOqNe32U2++legL4D5OVzUou7KZcGM11BTjoB0Cz4wOsqbXoAAAAAElFTkSuQmCC',
         icon_TheMovieDB: 'data:image/png;base64,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',
         icon_OpenSubtitles: 'https://images2.imgbox.com/4b/72/EpGIM9Ap_o.png',
         icon_anidb: 'https://images2.imgbox.com/0b/d3/uH45PTHK_o.png',
         icon_sarangni: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAQCAYAAAD52jQlAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC45bDN+TgAAAqZJREFUOE9lk8trE1EUxm8effiidpWNSJMaBClaaVMtUkQkKAgu1Y1VcONC1NrYmYSkaZsmttZW+6BR8dGVf4Abl/4fghsRlFaN0pR00uQev3PvzGTSDnzcM2fu97vfnZkrnEu+6SL5cj/JtwdIrh0k+Q7i2qvXtnieo9V2PcJvo/RV+5gkuYIHBUxYgJb3kVzE/QvUrIU23Z+HnrU29DRIcgYj++BnjgLKYlgDZmEsYAIned+htSflYZKv0OdkRWgVvRUEYB/7mQOekM/RzLdgVayWx4P5KA3fiNPw9ct089oQ5W7101ahgzY+nKTM3fP6ma3FO+eoMoa07FN+cLAjIefQyOGGtzMVoFq+h6LhSJPix6O0udS9p8/6kwgpn/IzBzwhZ5B02o6P1f5lhtTkwVgffcpccc1fipfc+nPuqltvjBzRKdnPHPCELNhJeYQc6Nn+WBP023KvWyto5JiqfyeOul6HI2SOY9uabqdSyoEONEF/zuqR5YWWzIjyeTlCToI+BU3o0YGe2ZXUC127f8Gty6nuJj+PQqYFijaqp/EVMa6bg2ry7qTfC2G3dnTx1Al88c4mP/NcaC3lp3oqSOuGhg709TYl+joTc+u/2RBVx9toJxsgy/ApH/tdaD2F3yHbSlXTR5bpp1/maWWMdDWSxVGXJhr31XG8Ow6TFGSNaR/7mcM8UTE0lFeyHvuobIbUT+1o6XYP/biHRBOtbq+WQSqGpgFMAAyfSgrO9pgf0GQnVVHILF4yJu9gEX4/vKV6Mkg7pi30WVUArId+2n7go8pIgCqP4OVF4GeOZXTY538Ox20UL3rKcxCeYOQznbfFff5l+AtPYuSvzeIw8Ck/OAroXJvGIdoa1WlqTlJvWk5ptKizzlvcTjRUTgSI/ZokxH9iteh4MiGYswAAAABJRU5ErkJggg==',
         hover_color: '3F51B5',
         domain: 'planetdp.org', domain_url: 'https://www.planetdp.org',
    }];//=========================================================================================================================================================================================

    var regex = /\/title\/(tt\d+)\/?/;
    var pageUrl = window.location.href;

    // Common Used Vars
    var ttimdbId;
    var episodeCheck;
    var titleArea;
    var imdbLink;
    var imdbButton;
    var elBox;
    var elTitle;
    var title;
    var year;
    var infos;
    var styles = "";
    var className;
    var scriptSelector;
    var x, a, i, len; // for integers

    if (pageUrl.search( /imdb\.com\/title/ ) >= 0 && PlanetDP[0].imdb == 1 ) //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    {

        // Vars
        ttimdbId = regex.exec( pageUrl )[1];
        episodeCheck = document.querySelector( 'meta[property="og:type"][content="video.episode"]' ) != null
        if (episodeCheck)
        {
            var parentLink = document.querySelector( 'div[class="titleParent"] > a' ).href;
            ttimdbId = regex.exec( parentLink )[1];
        }

        // Advanced Script
        className = "imdb648"
        scriptSelector = 'table#gm_links a[href*="planetdp.org/movie/search?title="]';
        advencedScriptAction( className, scriptSelector );

        // Areas
        titleArea = document.querySelector ( 'div.subtext' )
        titleArea.insertAdjacentHTML( "beforeend", html() );


	    function html()
	    {
		   var h = '';

		   for( var i = 0, len = PlanetDP.length; i < len; i++ )
		   {
		    	var p = PlanetDP[i];
                if ( p.imdb_list == 1 && p.url.match( /\/search\?\D{5}\=/ ) != null )
                {
                    h += '<a class="' + className + '" href="' + url( p.url_forum ) + '" target="_blank" style="height: 13px; float: right; padding: 0 3px;"><img style="height: 15px; opacity:0.7;" onMouseover="this.style.opacity=1" onMouseout="this.style.opacity=0.7" src="' + p.icon_green + '" title="' + p.name + '"><\/a>';
                    h += '<a class="' + className + '" href="' + url( p.url ) + '" target="_blank" style="height: 13px; float: right; padding: 0 3px;"><img style="height: 15px; opacity:0.7;" onMouseover="this.style.opacity=1" onMouseout="this.style.opacity=0.7" src="' + p.icon + '" title="' + p.name + '"><\/a>';
                }
		    }
		    return h;
	    }
    }

    else if (pageUrl.indexOf("imdb.com/list") >= 0 && PlanetDP[0].imdb_list == 1 ) //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    {

        // Work on Each Movie
        elBox = document.querySelectorAll( 'div[class="lister-item-content"]' )
        for ( x = 0; x < elBox.length; x++ )
        {
        // Vars
        ttimdbId = elBox[x].querySelector( '[href^="/title/tt"]' );
        ttimdbId= ttimdbId.attributes[0].value; ttimdbId = ttimdbId.substr( 7, 9 );

        // Areas
        titleArea = elBox[x].querySelector( '[class="lister-item-header"]' );
        titleArea.insertAdjacentHTML( "beforeend", html() );
        }


	    function html()
	    {
		   var h = '';

		   for( var i = 0, len = PlanetDP.length; i < len; i++ )
		   {
		    	var p = PlanetDP[i];
                if ( p.imdb_list == 1 && p.url.match( /\/search\?\D{5}\=/ ) != null )
                {
                    h += '<a href="' + url( p.url_forum ) + '" target="_blank" style="height: 16px; float: right; padding: 3px 0 0 5px;"><img style="height: 16px; opacity:0.6;" onMouseover="this.style.opacity=1" onMouseout="this.style.opacity=0.6" src="' + p.icon_green + '" title="' + p.name + '"><\/a><a href="' + url( p.url ) + '" target="_blank" style="height: 16px; float: right; padding: 3px 0 0 10px;"><img style="height: 16px; opacity:0.6;" onMouseover="this.style.opacity=1" onMouseout="this.style.opacity=0.6" src="' + p.icon + '" title="' + p.name + '"><\/a>'
                }
		    }
		    return h;
	    }
    }


    else if (pageUrl.search(/google\D+\/search\?/i) >= 0 && PlanetDP[0].imdb_google == 1 ) //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    {
        // Work on Each Link
        imdbButton = document.querySelectorAll( '[class="r"] > [href^="https://www.imdb.com/title/tt"]' );
        for ( x = 0; x < imdbButton.length; x++ )
        {
            // Vars
            imdbLink = imdbButton[x].href;
            var titleButton = imdbButton[x].querySelector( 'h3' );
            ttimdbId = imdbLink.match( /.+imdb\.com\/title\/(tt\d+)\/?/i )[1];
            title = imdbButton[x].textContent;
            var subButtonCheck = imdbButton[x].attributes[0].value.search( /imdb\.com/i ) < 0

            // Areas
            if (!subButtonCheck)
            {
                if (title.search( /(TV Episode|Video Game)/i ) < 0 && title.search( /"/i ) < 0 && imdbLink.search( /title\/tt\d+\/./i ) < 0)
                {
                    titleButton.insertAdjacentHTML( "afterend", html( "position:absolute;" ) );
                }
            }
            else if (imdbLink.search( /title\/tt\d+\/./i ) < 0)
            {
                imdbButton[x].insertAdjacentHTML( "afterend", html() );
            }
        }

	    function html( position )
	    {
		   var h = '';

		   for( var i = 0, len = PlanetDP.length; i < len; i++ )
		   {
		    	var p = PlanetDP[i];
                if ( p.imdb_google == 1 && p.url.match( /\/search\?\D{5}\=/ ) != null )
                {
                    h += '<a href="' + url( p.url ) + '" style="' + position + ' z-index:5;"><img style="height: 20px; margin: 0 10px 2px 10px; vertical-align: bottom; opacity:0.4;" onMouseover="this.style.opacity=1" onMouseout="this.style.opacity=0.4" src="' + p.icon_long + '" border="0"></a>'
                }
		    }
		    return h;
	    }
    }


    else if (pageUrl.search(/trakt\.tv/) >= 0 && PlanetDP[0].trakt == 1 ) //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    {
        //Remove Adds
//        var ads = document.querySelectorAll( 'div[id="huckster-desktop-wrapper"]' );
//        for ( var x = 0; x < ads.length; x++ ) {ads[x].style.display = "none"};

//        GM_addStyle ( `
//html,body {
//height:100vh;}
//.damned{height:100vh;}` );
//        var poster_area = document.querySelector( '[class="col-md-2 col-sm-3 hidden-xs"]' );
//        poster_area.style.display = "flex"
//        poster_area.parentElement.style.display = "flex"
//        $(poster_area.childNodes).wrap('<div style="height:1500px"></div>');
//        var new_div = poster_area.childNodes;
//        new_div.style = "flex: 1"

        // Vars
        imdbLink = document.querySelector( '[href*="imdb.com/"]' ).href;
        if (imdbLink.search( "find" ) <= 0) {ttimdbId= imdbLink.match( regex )[1];}
        else {ttimdbId = document.querySelector( '[property="og:title"]' ).getAttribute( "content" ) + " " + document.querySelector( 'span[class="year"]' ).textContent;}

        // Areas
        titleArea = document.querySelector( '[href*="imdb.com/"]' );
        titleArea.insertAdjacentHTML( "afterend", html( ttimdbId) );


	    function html()
	    {
		   var h = '';

		   for( var i = 0, len = PlanetDP.length; i < len; i++ )
		   {
		    	var p = PlanetDP[i];
                if ( p.trakt == 1 && p.url.match( /\/search\?\D{5}\=/ ) != null )
                {
                    h += '<a target="_blank" href="' + url( p.url ) + '" data-original-title="" title="">' + p.short_name + '</a>'
                }
		    }
		    return h;
	    }
    }

    else if (pageUrl.search(/icheckmovies\.com/) >= 0 && PlanetDP[0].iCheckMovies == 1 ) //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    {

        // Work on Each Movie
        elBox = document.querySelectorAll( 'ul[class="optionIconMenu optionIconMenuCheckbox"]' )
        for ( x = 0; x < elBox.length; x++ )
        {
        // Vars
        ttimdbId = elBox[x].querySelector( '[href*="imdb.com/"]' );
        ttimdbId = ttimdbId.attributes[1].value; ttimdbId = ttimdbId.substr(26);

        // Areas
        titleArea = elBox[x].querySelector( 'a[class="optionIcon optionIMDB external"]' ).closest("li");
        titleArea.insertAdjacentHTML( "beforebegin", html() );
        }


	    function html()
	    {
		   var h = '';

		   for( var i = 0, len = PlanetDP.length; i < len; i++ )
		   {
		    	var p = PlanetDP[i];
                if ( p.iCheckMovies == 1 && p.url.match( /\/search\?\D{5}\=/ ) != null )
                {
                    h += '<li><a href="' + url( p.url ) + '" target="_blank" style="background: none; text-indent:0px"><img style="width: 10px; height: 10px; margin: 8px; opacity:0.3;" onMouseover="this.style.opacity=1" onMouseout="this.style.opacity=0.3" src="' + p.icon_iCheckMovies + '" title="' + p.name + '"><\/a></li>'
                }
		    }
		    return h;
	    }
    }

    else if (pageUrl.search(/letterboxd\.com/) >= 0 && PlanetDP[0].letterboxd == 1 ) //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    {

        // Vars
        imdbButton = document.querySelector( '[href*="imdb.com/"]' );
        imdbLink= imdbButton.href; ttimdbId = imdbLink.match( /.+imdb\.com\/title\/(tt\d+)\/?/i )[1];

        // Areas
        titleArea = imdbButton.parentElement;
        var thatDamnFlagIcon = titleArea.querySelector( '[data-original-title="Report this film"]' );
        if (thatDamnFlagIcon) {
            thatDamnFlagIcon.remove();
            titleArea.insertAdjacentHTML( "beforeend", html() );
            titleArea.insertAdjacentElement( "beforeend", thatDamnFlagIcon );
        }
        else {
            titleArea.insertAdjacentHTML( "beforeend", html() );
        }



	    function html()
	    {
		   var h = '';

		   for( var i = 0, len = PlanetDP.length; i < len; i++ )
		   {
		    	var p = PlanetDP[i];
                if ( p.letterboxd == 1 && p.url.match( /\/search\?\D{5}\=/ ) != null )
                {
                    h += '<a href="' + url( p.url ) + '" class="micro-button track-event">' + p.name + '</a>'
                }
		    }
		    return h;
	    }
    }

    else if (pageUrl.search(/themoviedb\.org\//) >= 0 && PlanetDP[0].TheMovieDB == 1 ) //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    {

        // Vars
        infos = document.querySelector( 'title' ).textContent;
        title = infos.replace( " — The Movie Database (TMDb)" , "").replace( /[()]/g, "" ).replace( /TV Series (\d+)-(\d+)? ?/, "$1" );
        ttimdbId = title;

        var scoreBar = document.querySelector( '[class="content_score"] > [class="content_score"] > div' );
        var style = window.getComputedStyle(scoreBar);
        var hoverColor = style.getPropertyValue('background-color');
        styles = ".planetdp:hover {background-color: " + hoverColor + "} .planetdp {background-color: black}";
        GM_addStyle ( styles );

        titleArea = document.querySelector( 'div[class="social_links"]' );
        titleArea.insertAdjacentHTML( "beforeend", html() );


	    function html()
	    {
		   var h = '';

		   for( var i = 0, len = PlanetDP.length; i < len; i++ )
		   {
		    	var p = PlanetDP[i];
                if ( p.TheMovieDB == 1 && p.url.match( /\/search\?\D{5}\=/ ) != null )
                {
                    h += '<div><a class="social_link" title="Visit ' + p.name + '" style="padding-top: 10px; height: 26px;" href="' + url( p.url ) + '" target="_blank" rel="noopener" data-role="tooltip"><img class="planetdp" style="height: inherit; top: 0px; border-radius: 3px;" src="' + p.icon_TheMovieDB + '"></a></div>'
                }
		    }
		    return h;
	    }
    }

    else if (pageUrl.search(/thetvdb\.com\/series\//) >= 0 && PlanetDP[0].thetvdb == 1 ) //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    {

        // Vars
        imdbButton = document.querySelector( '[href*="imdb.com/"]' );
        if (imdbButton) {
            ttimdbId = imdbButton.href.match( /.+imdb\.com\/title\/(tt\d+)\/?/i )[1];
            titleArea = imdbButton.parentElement.parentElement;
            titleArea.insertAdjacentHTML( "afterend", html() );
        }
        else {
            title = document.querySelector( 'title' ).textContent.replace( /@ TheTVDB/i, "");
            infos = document.querySelectorAll( 'ul[class="list-group"] > li' );
            year = infos[2].querySelector( 'span' ).textContent.replace( /(\d{4})-\d{2}-\d{2}/, "$1" );
            ttimdbId = title + year;
            titleArea = document.querySelector( '[href="http://www.schedulesdirect.org/"]' ).parentElement.parentElement;
            titleArea.insertAdjacentHTML( "beforebegin", html() );
        }


	    function html()
	    {
		   var h = '';

		   for( var i = 0, len = PlanetDP.length; i < len; i++ )
		   {
		    	var p = PlanetDP[i];
                if ( p.thetvdb == 1 && p.url.match( /\/search\?\D{5}\=/ ) != null )
                {
                    h += '<li class="list-group-item clearfix"><strong>' + p.name + '</strong><span><a href="' + url( p.url ) + '" target="_blank">' + ttimdbId + '</a></span></li>'
                }
		    }
		    return h;
	    }
    }

    else if (pageUrl.search(/boxofficeturkiye\.com\/film\//) >= 0 && PlanetDP[0].boxofficeturkiye == 1 ) //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    {

        // Vars
        title = document.querySelector( 'meta[property="og:title"]' ).content.trim().match( /(.+) - Box Office Türkiye/i )[1];
        infos = document.querySelector( 'table.movie-summary' ).textContent;
        year = infos.match( /\s+?Yapım Yılı:\s+?(\d{4})\s+?/i )[1];
        ttimdbId = title + " " + year;

        // Area
        if ( !document.querySelector( 'div#movieLinksWrapper' ) )
        {
            var externalAreaCodes = '<tr><td colspan="2" style="text-align: center"><span class="font-pt-sans movie-links">Filmin Linkleri</span></td></tr>'
            externalAreaCodes += '<tr><td colspan="2"><div id="movieLinksWrapper"><div id="movieLinks"><span class="clear"></span></div></div></td></tr>';
            document.querySelector( 'td[align="left"] table.ustcizgi tbody table.film-resim tbody' ).insertAdjacentHTML( "beforeend", externalAreaCodes );
        }
        titleArea = document.querySelector( 'div#movieLinksWrapper span:nth-last-child(1)' );
        titleArea.insertAdjacentHTML( "beforebegin", html() );


	    function html()
	    {
		   var h = '';

		   for( var i = 0, len = PlanetDP.length; i < len; i++ )
		   {
		    	var p = PlanetDP[i];
                if ( p.boxofficeturkiye == 1 && p.url.match( /\/search\?\D{5}\=/ ) != null )
                {
                    styles = '#movieLinks .icon.icon-' + (p.short_name).toLowerCase() + ' { background: black; border-radius: 12px; }';
                    styles += '#movieLinks .icon.icon-' + (p.short_name).toLowerCase() + ' img { height: 17px; vertical-align: -webkit-baseline-middle; border-radius: 3px; }';
                    GM_addStyle( styles );
                    h += '<span class="icon icon-' + (p.short_name).toLowerCase() + '"><a href="' + url( p.url ) + '" rel="nofollow" target="_blank"><img src="' + p.icon_white + '"></a></span>'
                }
		    }
		    return h;
	    }
    }

    else if (pageUrl.search(/subscene\.com/) >= 0 && PlanetDP[0].subscene == 1 ) //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    {
        // Vars
        imdbButton = document.querySelector( '[href*="imdb.com/title"]' );
        if (imdbButton != null) {
            ttimdbId = imdbButton.href.match( regex )[1];
            if (ttimdbId.length == 8) {ttimdbId = ttimdbId.replace( "tt", "tt0" )}
            titleArea = imdbButton
            titleArea.insertAdjacentHTML( "afterend", html() );}
        else {
            ttimdbId = document.querySelector( 'title').textContent.trim();
            ttimdbId = ttimdbId
                .replace( /.+Subtitles for (.+)/i, "$1" )
                .replace( /Subscene - (.+) .+ subtitle/i, "$1" )
            year = document.querySelector( 'div[class="header"] > ul > li' ).textContent.trim().replace( /Year:\s+/, " " );
            ttimdbId = ttimdbId + year;
            titleArea = document.querySelector( '[href^="javascript:Embed"]' );
            titleArea.insertAdjacentHTML( "afterend", html() );
             }

/*        // English Subs
        var subArea = document.querySelector( 'div > table > tbody' );
        var subsEN_start = subArea.querySelector( '[id="english"]' )
        subArea.insertBefore(subsEN_start, subArea.childNodes[0])
        var subsEN = subArea.querySelectorAll( '[href*="english"]' );
        if ( subsEN != null)
        {
            for (var t = subsEN.length - 1; t >= 0; t--)
            {
                var realSubsEN = subsEN[t].parentNode.parentNode
                subArea.insertBefore(realSubsEN, subArea.childNodes[1])
            }
        }

        // Turkish Subs
        var subsTR_start = subArea.querySelector( '[id="turkish"]' )
        subArea.insertBefore(subsTR_start, subArea.childNodes[0])
        var subsTR = subArea.querySelectorAll( '[href*="turkish"]' );
        if ( subsTR != null)
        {
            for (var t = subsTR.length - 1; t >= 0; t--)
            {
                var realSubsTR = subsTR[t].parentNode.parentNode
                subArea.insertBefore(realSubsTR, subArea.childNodes[1])
            }
        }
*/

	    function html()
	    {
		   var h = '';

		   for( var i = 0, len = PlanetDP.length; i < len; i++ )
		   {
		    	var p = PlanetDP[i];
                if ( p.subscene == 1 && p.url.match( /\/search\?\D{5}\=/ ) != null )
                {
                    h += '<a target="_blank" class="imdb" href="' + url( p.url ) + '" style="margin-left: 6px;">' + p.name + '</a>'
                }
		    }
		    return h;
	    }
    }

    else if (pageUrl.search(/opensubtitles\.org.+(\/subtitles\/|\/s?search\/)/) >= 0 && PlanetDP[0].OpenSubtitles == 1 ) //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    {
        // Vars
        imdbButton = document.querySelector( '[href*="imdb.com/title/tt"]' );
        imdbLink = imdbButton.href
        ttimdbId = imdbLink.substr( imdbLink.indexOf('title/tt')+6, 9);
        if (ttimdbId.length == 8) {ttimdbId = ttimdbId.replace( "tt", "tt0" )}
        episodeCheck = document.querySelector( 'span[itemtype*="schema.org/TVEpisode"]' ) != null;
        if (episodeCheck)
        {
            var mainPageLink = document.querySelector( 'a[href^="/en/ssearch/sublanguageid-all/imdbid-"]' ).href;
            ttimdbId = 'tt' + mainPageLink.match( /\/imdbid\-(\d{7})/i )[1];
        }

        // Areas
        titleArea = imdbButton;
        titleArea.insertAdjacentHTML( "afterend", html() );

	    function html()
	    {
		   var h = '';

		   for( var i = 0, len = PlanetDP.length; i < len; i++ )
		   {
		    	var p = PlanetDP[i];
                if ( p.OpenSubtitles == 1 && p.url.match( /\/search\?\D{5}\=/ ) != null )
                {
                    h += '<a target="_blank" href="' + url( p.url ) + '" style="width: 21px"><img alt="imdb" width="16" height="16" src="' + p.icon_OpenSubtitles + '"></a>'
                }
		    }
		    return h;
	    }
    }

    else if (pageUrl.search(/myanimelist\.net/) >= 0 && PlanetDP[0].MyAnimeList == 1 ) //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    {
        //Remove Adds
        removeThis( '.banner-header-anime-straming' );
        removeThis( '.ad-tag' );
        var ads_crunchyroll = document.querySelector( 'div[class="index-watch-description clearfix"]' )
        if ( ads_crunchyroll != null ) {ads_crunchyroll.style.display = "none";
                                        document.querySelector( 'div[class="di-ib widget-slide-block "]' ).style.width = "717px"
                                        elBox = document.querySelector( 'div[id="widget-episode-video"]' )
                                        elBox.querySelector( '.widget-slide-outer' ).style.width = "725px"}

        var ads_border_top = document.querySelector( 'td[valign="top"] > div[class="border_top"]' )
        if ( ads_border_top != null) {ads_border_top.style.display = "none"}

        var ads_amazon_ads = document.querySelector( 'div[class^="amazon-ads anime-manga-detail"]' )
        if ( ads_amazon_ads != null) {ads_amazon_ads.style.display = "none";
                                      var ads_amazon_ads2 = ads_amazon_ads.nextElementSibling;
                                      ads_amazon_ads2.style.display = "none";}

        var ads_unit = document.querySelectorAll( 'div[class="_unit "]' )
        for ( x = 0; x < ads_unit.length; x++ ) {ads_unit[x].style.display = "none"}

        var ads_br0 = document.querySelector( 'div[class="di-t"]' );
        if ( ads_br0 != null) {var ads_br1 = ads_br0.nextElementSibling
                               ads_br1.style.display = "none";
                               var ads_br2 = ads_br1.nextElementSibling;
                               ads_br2.style.display = "none";
                               var ads_div_padding = ads_br2.nextElementSibling;
                               ads_div_padding.style.display = "none";
                               var ads_div_padding2 = ads_div_padding.nextElementSibling;
                               ads_div_padding2.style.display = "none";}

        if (pageUrl.indexOf("myanimelist.net/anime/season") < 0 && pageUrl.indexOf("myanimelist.net/anime") >= 0)
        {
            // Vars
            elTitle = document.querySelector( '[itemprop="name"]' );
	        title = elTitle.textContent.trim();

            title = title
	    	.replace( ":", " " )
	    	.replace( "-", " " )
            .replace( / ?\(TV\)/i, "" )
            .replace("&amp;","&") //replace & with code
            .replace("&nbsp;","") //delete nobreak space
            .replace(/[\/\\#+()$~%"*?<>{}]/g, " ") //remove bad chars
            .replace( "  ", " " )
            ;

            // Advanced Script
            className = "mal648"
            scriptSelector = 'li > a[href*="planetdp.org/movie/search?title="]';
            advencedScriptAction( className, scriptSelector );

            // Areas
            if (document.querySelector( '[class="btn-login"]' ) == null)
            {
                titleArea = document.querySelector( '[class="pb16"]' );
                titleArea.innerHTML += html()
            }
        }


	    function html()
	    {
		   var h = '';

		   for( var i = 0, len = PlanetDP.length; i < len; i++ )
		   {
		    	var p = PlanetDP[i];
                if ( p.MyAnimeList == 1 && p.url.match( /\/search\?\D{5}\=/ ) != null )
                {
                    h += ', <a class="' + className + '" href="' + url( p.url_title ) + '" target="_blank">' + p.name + '</a>'
                }
		    }
		    return h;
	    }
    }

    else if (pageUrl.search(/anidb\.net/) >= 0 && PlanetDP[0].AniDB == 1 ) //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    {
        // Vars
        title = document.querySelector( 'h1[class="anime"]').textContent.replace( /Anime: (.+) ?(\(\))?/, "$1" );

    	title = title
    		.replace( "(", "" )
    		.replace( ")", "" )
            .replace("&amp;","&") //replace & with code
            .replace("&nbsp;","") //delete nobreak space
            .replace(/[\/\\#+()$~%'"*?<>{}]/g, "") //remove bad chars
        ;

        // Advanced Script
        className = "dp"
        scriptSelector = 'h1.anime li > a[href*="planetdp.org/movie/search?title="]';
        advencedScriptAction( className, scriptSelector );

        // Areas
        titleArea = document.querySelector( '[class="g_odd resources"] [class="group thirdparty english"]' );
        titleArea.insertAdjacentHTML( "beforeend", html( PlanetDP ) );


	    function html( site ) {
		   var h = '';

		   for( var i = 0, len = site.length; i < len; i++ )
		   {
		    	var p = site[i];
                if ( p.AniDB == 1 )
                {
                    h += '<div class="icons ' + className + '"><a class="i_icon i_resource_' + (p.short_name).toLowerCase() + ' brand" style="background-image: url(' + p.icon_anidb + '); height: 16px; width: 16px;" href="' + url( p.url_title ) + '" data-anidb-rel="anidb::extern" itemprop="sameAs" title="' + p.name + '"><span class="text">' + p.name + '</span></a></div>'
                }
		    }
		    return h;
	    }
    }

    else if (pageUrl.search(/livechart\.me/) >= 0 && PlanetDP[0].LiveChart == 1 ) //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    {
        var myScriptCheck = document.querySelector( '[id="LiveChart648"]' );
        if (myScriptCheck) {;}
        else
        {
        	elBox = document.querySelectorAll( '[class="anime"]');
            for ( x = 0; x < elBox.length; x++ )
            {
                // Vars
                title = elBox[x].querySelector( '[class="main-title"]' ).textContent.trim();
//                var editedTitle = title
//                                .replace( /(:)?(second|third|[0-9](st|nd|rd|th)|(II|III|IV|V|VI)(st|nd|rd|th))? (season part|part|season chapter|chapter|season) ?(two|three|four|five|[0-9]|II|III|IV|V|VI)?/i, "" )
//                                .replace( / (2|3|4|5|II|III|IV|V|VI)$/i, "" )

                // Areas
                titleArea = elBox[x].querySelector( '.related-links' );
                titleArea.innerHTML += html();

                // Eliminate Existing Butons
                //=====================================================================
//                /* Official Site */            eliminate( '.website-icon' )
//                /* Trailer */                  eliminate( '.preview-icon' )
//                /*Twitter*/                    eliminate( '.twitter-icon' )
//                /* AniList */                  eliminate( '.anilist-icon' )
//                /* MAL */                      eliminate( '.mal-icon' )
//                /* AniDB */                    eliminate( '.anidb-icon' )
                /* AnimePlanet */              eliminate( '.anime-planet-icon' )
//                /* AniSearch */                eliminate( '.anisearch-icon' )
//                /* Kitsu */                    eliminate( '.kitsu-icon' )
                /* Crunchyroll */              eliminate( '.crunchyroll-icon' )
                /* Official Ways to Watch */   eliminate( '.watch-icon' )
                //=====================================================================
            }

            function eliminate( site )
            {
                if (elBox[x].querySelector( site ) != null)
                {elBox[x].querySelector( site ).closest('li').style.display = "none";}
            }

            // Set required style and hover
            styles = "";
            for( i = 0, len = PlanetDP.length; i < len; i++ )
            {
                styles += "." + PlanetDP[i].name + ":hover {background-color: #" + PlanetDP[i].hover_color + "; border-radius: 15px;} "
            }
            GM_addStyle ( styles );

        	function html()
        	{
        		var h = '';
        		for( var i = 0, len = PlanetDP.length; i < len; i++ )
        		{
        			var p = PlanetDP[i];
                    if ( p.LiveChart == 1 && p.url.match( /\/search\?\D{5}\=/ ) != null )
                    {
                        h += '<li id="LiveChart648" class="' + p.name + '"><a href="' + url( p.url_title ) + '" target="_blank" rel="noopener nofollow" style="display: table; padding: 7px 5px 0px 4px;" ><img style="height:16px;" src="' + p.icon + '" title="' + p.name + '"><\/a></li>';
                    }
        		}

        		return h;
        	}
        }
    }

    else if (pageUrl.search(/sarangni\.info/) >= 0 && PlanetDP[0].sarangni == 1 ) //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    {
        if (pageUrl.search(/sarangni\.info\/mov/) >= 0) {
            // Vars
            imdbButton = document.querySelector( '[href*="imdb.com/title/tt"]' );
            if (imdbButton)
            {
                ttimdbId = imdbButton.href.match( /.+imdb\.com\/title\/(tt\d+)\/?/i )[1];
                imdbButton.firstChild.style = "vertical-align: bottom;";
                titleArea = imdbButton.parentElement;
            }
            else
            {
                ttimdbId = document.querySelector( 'tbody > tr > td > h1' ).textContent.replace( /\"(.+)\" ?\(?(\d+)?\)?/, "$1 $2" );
                titleArea = document.querySelector( 'tbody > tr > td[align="center"]' );
                titleArea.insertAdjacentHTML( "beforeend", '<br>' );
            }

            // Area
            titleArea.insertAdjacentHTML( "beforeend", html() );
        }
        else {
            // Vars  // Burada başlıkla arama daha iyi olurdu ama onun için PlanetDP'nin drama başlıklarında iyi olması lazım
//            ttimdbId = document.querySelector( 'tbody > tr > th[colspan="5"]' ).textContent.replace( /\"(.+)\" ?\(?(\d+)?\)?.+/, "$1 $2" ); //Başlıkla arama
            var srButton = document.querySelector( 'tbody > tr > td > a[href^="/mov/"]' );
            ttimdbId = "tt" + srButton.href.match( /\/mov\/(\d+)\/.+/i )[1];

            // Area
            titleArea = srButton;
            titleArea.style.margin = "0 10px 0 0"
            titleArea.insertAdjacentHTML( "afterend", html() );
        }


	    function html()
	    {
		   var h = '';

		   for( var i = 0, len = PlanetDP.length; i < len; i++ )
		   {
		    	var p = PlanetDP[i];
                if ( p.sarangni == 1 && p.url.match( /\/search\?\D{5}\=/ ) != null )
                {
                    h += '<a target="_blank" href="' + url( p.url ) + '"><img style="height: 16px; vertical-align: bottom;" src="' + p.icon_sarangni + '" border="0"></a>'
                }
		    }
		    return h;
	    }
    }

    else if (pageUrl.search(/turkcealtyazi\.org/) >= 0 && PlanetDP[0].turkcealtyazi == 1 ) //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    {

        // Vars & Areas
        if (pageUrl.search(/turkcealtyazi\.org\/mov/) >= 0) {
            imdbButton = document.querySelector( '[href*="imdb.com/title/tt"]' );
            if (imdbButton) {ttimdbId = imdbButton.href.match( /.+imdb\.com\/title\/(tt\d+)\/?/i )[1];}
            else { ttimdbId = document.querySelector( 'span[itemprop="name"]' ).textContent + " " + document.querySelector( 'span[class="year"]' ).textContent.replace( /\((\d{4}).+?\)/, "$1" );}

            titleArea = document.querySelector( '[id="altyazilar"] > h5' );
        }
        else {
            // Vars  // Burada başlıkla arama daha iyi olurdu ama onun için PlanetDP'nin drama başlıklarında iyi olması lazım
//            ttimdbId = document.querySelector( 'strong > a[href^="/mov/"]' ).parentElement.textContent.replace( /(.+)\((\d+)\)/, "$1 $2" );  //Başlıkla arama
            var taButton = document.querySelector( 'strong > a[href^="/mov/"]' );
            ttimdbId = "tt" + taButton.href.match( /\/mov\/(\d+)\/.+/i )[1];

            titleArea = document.querySelector( '[id="altyazilar"] > h2' );
            GM_addStyle ( ".portalust h2 a:after, .portalust h5 a:after {content: none;}" );
        }

        // Fatal Blow
        titleArea.insertAdjacentHTML( "beforeend", html() );


	    function html()
	    {
		   var h = '';

		   for( var i = 0, len = PlanetDP.length; i < len; i++ )
		   {
		    	var p = PlanetDP[i];
                if ( p.turkcealtyazi == 1 && p.url.match( /\/search\?\D{5}\=/ ) != null )
                {
                    h += '<a target="_blank" href="' + url( p.url ) + '" title="' + p.name + '" style="border: none; background: none; float: right; height: 17px; padding: 0 5px 0 0;"><img style="height: 17px; vertical-align: middle; padding: 0 0 0 0;" src="' + p.icon + '"></a>'
                }
		    }
		    return h;
	    }
    }

    else if (pageUrl.search(/mydramalist\.com\/\d+/) >= 0 && PlanetDP[0].MyDramaList == 1 ) //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    {
        var type = document.querySelector( 'meta[property="og:type"]' ).content;
        if (type == 'video.tv_show' || type == 'video.movie')
        {
            // Vars
            titleArea = document.querySelector( 'h1.film-title' )
            title = titleArea.querySelector( 'a' ).textContent.trim();
            year = titleArea.textContent.match( /.+\((\d{4})\)$/i )[1];
            title = title + " " + year;

            // Area
            titleArea.insertAdjacentHTML( "beforeend", html() );


	    function html()
	    {
		   var h = '';

		   for( var i = 0, len = PlanetDP.length; i < len; i++ )
		   {
		    	var p = PlanetDP[i];
                if ( p.MyDramaList == 1 && p.url.match( /\/search\?\D{5}\=/ ) != null )
                {
                    h += '<span style="margin-left: 10px;" id="MyDramaList648"><a href="' + url( p.url_title ) + '" target="_blank" title="PlanetDP"><img style="height: 26px; vertical-align: bottom; opacity: 0.7;" onMouseover="this.style.opacity=1" onMouseout="this.style.opacity=0.7" src="' + p.icon + '"></a></span>'
                }
		    }
		    return h;
	    }
        }
    }

    else if (pageUrl.search(/movie.douban\.com/) >= 0 && PlanetDP[0].douban == 1 ) //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    {
        // Vars
        imdbButton = document.querySelector( '[href*="imdb.com/title/tt"]' );
        imdbLink = imdbButton.href
        ttimdbId = imdbLink.substr( imdbLink.indexOf('title')+6, 9);

        // Areas
        titleArea = document.querySelector( '[id="mainpic"]' );

        // Some CSS
        titleArea.style.width = "135px"
        var seasonInfo = document.querySelector( '[id="season"] > [selected="selected"]' );
        if (seasonInfo == null || seasonInfo.textContent == "1")
           {titleArea.insertAdjacentHTML( "beforeend", html() );}


	    function html()
	    {
		   var h = '';

		   for( var i = 0, len = PlanetDP.length; i < len; i++ )
		   {
		    	var p = PlanetDP[i];
                if ( p.douban == 1 )
                {
                    h += '<a target="_blank" href="' + url( p.url ) + '" class="colbutt" style="flex: 1.5; letter-spacing: 0; font: 10px; margin-right: 0; color: #000;"><span style="padding-left: 9px; font: normal 11px sans-serif; line-height: 20px;">' + p.name + '</span></a>'
                }
		    }
		    return '<br><div style="display: flex; width: 135px; margin-right: 0px;"><a target="_blank" href="' + imdbLink + '" class="colbutt" style="flex: 1; letter-spacing: 0; color: #000;"><span style="padding-left: 9px; font: normal 11px sans-serif; line-height: 20px;">IMDB</span></a>' + h + '</div>'
	    }
    }

    else if (pageUrl.search(/hancinema\.net/) >= 0 && PlanetDP[0].hancinema == 1 ) //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    {
//        removeThis( '[src^="iframe_ads"]', 1 )
        removeThis( '.gsc-adBlock', 3 )
        removeThis( '[style="clear:both;width:970px;margin:0px auto;padding-bottom:5px;text-align:center"]', 0 )
        removeThis( '[style="width:728px;height:250px;margin:0 auto"]', 0 )
        removeThis( '#contenu_680', 0 )
        removeThis( '#top728x90id', 1 )
        removeThis( '#top300x250id', 1 )
        removeThis( '#side300x600id', 0 )
        removeThis( '.a_droite', 0 )
        removeThis( '#apesterload', 1 )
        removeThis( '.droite_sans', 0 )
        removeThis( '.InMargin_Top', 0 )
        removeThis( '.publicite_300x250', 0 )
        removeThis( '#footersticky_desktop', 0 )
        removeThis( '[src*="googletagservices"]', 1 )
        removeThis( '.publicite_468x60', 0 )
        removeThis( 'id*="aswift', 0 )
        removeThis( 'id*="tfasyncframe', 0 )

        var menu_div = document.querySelector( '[class="contenu contenu_bis"]' )
        if ( menu_div != null ) {menu_div.style ="overflow: hidden;"}
    } //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


    function advencedScriptAction( f_className, f_scriptSelector ) {
        GM_addStyle( '.' + f_className + ' {}' );
        if ( document.querySelector( f_scriptSelector ) != null ) { GM_addStyle( '.' + f_className + ' {display:none!important}' ); };
        waitForKeyElements( f_scriptSelector, function() {GM_addStyle( '.' + f_className + ' {display:none!important}' );} );
    }


    function removeThis( selector, nth_parent ) {
        var elementArray = document.querySelectorAll( selector );
        if ( elementArray )
        {
            for ( var t = 0; t < elementArray.length; t++ )
            {
                var element = elementArray[t]
                if ( nth_parent )
                {
                    for ( var x = 0; x < nth_parent; x++ )
                    {
                        element = element.parentNode;
                    }
                }
                element.parentNode.removeChild(element);
            }
        }
    }


    function url( site ) {
        if ( site.indexOf( "%ttimdbId%" ) >= 0) {site = site.replace( /%ttimdbId%/, ttimdbId );}
        if ( site.indexOf( "%title%" ) >= 0) {site = site.replace( /%title%/, title );}

		return site;
    }


    function getFirstItem(input, key, value) {
    for(var i = 0; i < input.length; i++) {
        var obj = input[i]
        if(obj[key] == value)
        return i;
    } return null;
    }

    function titleEdit( e_title )
    {
        e_title = e_title
            .replace( ":", " " )
            .replace( "-", " " )
            .replace("&amp;","&") //replace & with code
            .replace("&nbsp;","") //delete nobreak space
            .replace(/[\/\\#+()$~%"*?<>{}]/g, " ") //remove bad chars
            .replace( /\s{2,}/g, " " )
            .trim()
        ;
        return e_title;
    }

    function waitForKeyElements (
        selectorTxt,    /* Required: The jQuery selector string that
                            specifies the desired element(s).
                        */
        actionFunction, /* Required: The code to run when elements are
                            found. It is passed a jNode to the matched
                            element.
                        */
        bWaitOnce,      /* Optional: If false, will continue to scan for
                            new elements even after the first match is
                            found.
                        */
        iframeSelector  /* Optional: If set, identifies the iframe to
                            search.
                        */
    ) {
        var targetNodes, btargetsFound;

        if (typeof iframeSelector == "undefined")
            targetNodes     = $(selectorTxt);
        else
            targetNodes     = $(iframeSelector).contents ()
                                               .find (selectorTxt);

        if (targetNodes  &&  targetNodes.length > 0) {
            btargetsFound   = true;
            /*--- Found target node(s).  Go through each and act if they
                are new.
            */
            targetNodes.each ( function () {
                var jThis        = $(this);
                var alreadyFound = jThis.data ('alreadyFound')  ||  false;

                if (!alreadyFound) {
                    //--- Call the payload function.
                    var cancelFound     = actionFunction (jThis);
                    if (cancelFound)
                        btargetsFound   = false;
                    else
                        jThis.data ('alreadyFound', true);
                }
            } );
        }
        else {
            btargetsFound   = false;
        }

        //--- Get the timer-control variable for this selector.
        var controlObj      = waitForKeyElements.controlObj  ||  {};
        var controlKey      = selectorTxt.replace (/[^\w]/g, "_");
        var timeControl     = controlObj [controlKey];

        //--- Now set or clear the timer as appropriate.
        if (btargetsFound  &&  bWaitOnce  &&  timeControl) {
            //--- The only condition where we need to clear the timer.
            clearInterval (timeControl);
            delete controlObj [controlKey]
        }
        else {
            //--- Set a timer, if needed.
            if ( ! timeControl) {
                timeControl = setInterval ( function () {
                        waitForKeyElements (    selectorTxt,
                                                actionFunction,
                                                bWaitOnce,
                                                iframeSelector
                                            );
                    },
                    300
                );
                controlObj [controlKey] = timeControl;
            }
        }
        waitForKeyElements.controlObj   = controlObj;
    }

})();
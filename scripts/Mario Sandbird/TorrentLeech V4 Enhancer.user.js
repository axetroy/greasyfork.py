// ==UserScript==
// @name        TorrentLeech V4 Enhancer
// @namespace   https://openuserjs.org/scripts/Sandbird/TorrentLeech_V4_Enhancer
// @description Enhance TorrentLeech
// @include   https://torrentleech.org/torrents/*
// @include   https://www.torrentleech.org/torrents/*
// @resource copy_btn http://dl.dropbox.com/u/29482107/gm/TLE/copy.png
// @resource traktb http://dl.dropboxusercontent.com/s/291znyahazdw7f6/traktv.png
// @resource copyRl_btn http://dl.dropbox.com/u/29482107/gm/TLE/copy_rollover.png
// @resource info_btn http://dl.dropbox.com/u/29482107/gm/TLE/i.png
// @resource infoRl_btn http://dl.dropbox.com/u/29482107/gm/TLE/i_rollover.png
// @resource trailer_btn http://dl.dropbox.com/u/29482107/gm/TLE/trailer_rollover.png
// @resource trailerRl_btn http://dl.dropbox.com/u/29482107/gm/TLE/trailer.png
// @resource episodes_btn http://dl.dropbox.com/u/29482107/gm/TLE/episodes.png
// @resource episodesRl_btn http://dl.dropbox.com/u/29482107/gm/TLE/episodes_rollover.png
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require  http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js
// @license GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @grant   GM_getValue
// @grant   GM_setValue
// @grant   GM_getResourceURL
// @grant   GM_xmlhttpRequest
// @version 1.2
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

function button(name, src, rollover){
        this.type = name;
        this.src = src;
        this.rollover = rollover;
}

var copy = new button('copy' ,GM_getResourceURL('copy_btn') ,GM_getResourceURL('copyRl_btn'));
var info = new button('info' ,GM_getResourceURL('info_btn') ,GM_getResourceURL('infoRl_btn'));
var traktv = new button('traktv' ,GM_getResourceURL('traktb') ,GM_getResourceURL('traktb'));
var trailer = new button('trailer' ,GM_getResourceURL('trailer_btn') ,GM_getResourceURL('trailerRl_btn'));
var episodes = new button('episodes' ,GM_getResourceURL('episodes_btn') ,GM_getResourceURL('episodesRl_btn'));
var fixed_words = Array('INTERNAL' , 'iNTERNAL' ,'READNFO' ,'NFO' ,'XBLA' ,'XBOX360','GERMAN','USA', 'NDS' ,'Update' ,
                        'Edition' ,'MULTi9' ,'MULTi7' ,'MULTi5' ,'MULTi2' ,'MULTi1' ,'XBLA' ,'Proper' ,
                        'JTAG' ,'PS3' ,'EUR' ,'DLC' ,'PL' ,'WII' ,'NGC' ,'FIX' ,'CRACK' ,'WORKING' ,
                        'NTSC' ,'Real' ,'DVDR' ,'RC' ,'BDRip' ,'TS' ,'RF' ,'PAL' ,'NORDiC' ,'UNRATED',
                        'WEBRiP' ,'HDRip', 'BluRay', 'Blu-ray', 'HDTV' ,'HDCAM',
                        '720p BluRay' , '1080p BluRay');

var buttons_collection = [traktv,
                          info,
                          copy,
                          trailer
                          //episodes
                          ];

function getType(category_value){
  switch(category_value){
          case 1: case 8: case 9: case 10: case 11: case 12: case 13: case 14: case 15: case 29:
                  return 'cat_movies';
          case 2: case 26: case 27: case 32:
                  return 'cat_tv';
          case 3: case 17: case 18: case 19: case 20: case 21: case 22: case 28: case 30:
                  return 'cat_games';
  }
}

function inRange(x, min, max) {
    return min <= x && x <= max;
}


$('td[class = "seeders"]').each(function(){
    var snum = $(this).html();
    $(this).empty();
    var sstyle = '';

    if(inRange(snum, 0, 50)) {
        sstyle = 'style="color:#ffffff"';
    }
    else if(inRange(snum, 51, 100)) {
        sstyle = 'style="color:#f5efd2"';
    }
    else if(inRange(snum, 101, 200)) {
        sstyle = 'style="color:#c0eca9"';
    }
    else if(inRange(snum, 201, 300)) {
        sstyle = 'style="color:#82e3af"';
    }
    else if(inRange(snum, 301, 500)) {
        sstyle = 'style="color:#5db5da"';
    }
    else if(inRange(snum, 501, 800)) {
        sstyle = 'style="color:#4d3bd1"';
    }
    else if(inRange(snum, 801, 1000)) {
        sstyle = 'style="color:#be1cc8"';
    }
    else if(inRange(snum, 1001, 10000000)) {
        sstyle = 'style="color:#bf002d"';
    }
    else{
        sstyle = 'style="font-weight:bold"';
    }

    $(this).append ('<div ' + sstyle + '>' + snum + '</div>');
});

$('td[class = "name"]').each(function(i){
  var cache_this = this;
  $raw_text = $(this).closest('td').prev().find('a').attr('href');
  var pattern = /[0-9]+/g;
  var category_value = parseInt($raw_text.match(pattern));
  var category_type = getType(category_value);
  var imdbscore = $(this).find('span:#imdbOnBrowse').html();
  if(category_type == 'cat_movies' || category_type == 'cat_tv'){
  	//console.log(imdbscore);
  	if (imdbscore !== null && (imdbscore.indexOf('.')!=-1) ) {
	  	var remakeImdb = imdbscore.replace(" &nbsp;&nbsp; ", ""); //remove that extra space
	    var score = remakeImdb.split(" ");
	    var str1 = score[0];
	    if (str1.indexOf(".")!=-1) {
		    $(cache_this).find('span.title').append(' <span style="color:yellow">('+str1+')</span>');
		    $(cache_this).find('span:#imdbOnBrowse').html(function(index,html){
    			return html.replace('&nbsp;&nbsp; '+str1+' ','');
				});
		  } else {
		  	$(cache_this).find('span.title').append(' <span style="color:red">(N/A)</span>');
	  	}
  	}
    $(this).append($('<div>').addClass('enhanceWrapper')
               .css({float:'right', margin: '3px 5px 0 0'})
               .data('category', category_type));
  }
} );


$.each(buttons_collection,function(index, value) {
    $('.enhanceWrapper').append($('<img />')
                       .addClass('enhance-buttons_collection')
                       .attr({src: value.src,
                              alt: value.rollover,
                              title: value.type})
                       .css({margin: "0 8px 0 0",
                                      cursor: 'pointer',
                                      float: 'left'})
                       .data('name',value.type));
});


$('img[class="enhance-buttons_collection"]').load(function(){
  $name = $(this).closest('td').find('a').text();
  var cat_type = $(this).parent().data('category');

  switch($(this).data('name')){
          case 'traktv':
                  if(cat_type == 'cat_games'){
                  	$(this).remove();
                  }
           break;
          case 'trailer':
                  if(cat_type == 'cat_tv'){
                  	$(this).remove();
                  }
           break;
  }
});

$('img[class="enhance-buttons_collection"]').hover(function(){
        $src = $(this).attr('src');
        $alt = $(this).attr('alt');
        $(this).attr('src', $alt);
        $(this).attr('alt', $src);
},
function(){
        $src = $(this).attr('src');
        $alt = $(this).attr('alt');
        $(this).stop(false,true).attr('src', $alt);
        $(this).stop(false,true).attr('alt', $src);
});


$('img[class="enhance-buttons_collection"]').click(function(){
        //$(this).stop(true,true).effect("bounce", { times:3 }, 300);

      //diable the add to bookmark feature if clicking the enhance buttons
      $(this).parents('tbody tr').addClass('row_selected');

      //$raw_text = $(this).closest('td').prev().find('a').attr('href');
      $name = $(this).closest('td').find('a').text();
      var cat_type = $(this).parent().data('category');

        switch($(this).data('name')){
                case 'copy':
                        window.prompt ("Copy to clipboard: Ctrl+C, Enter", $name);
                        break;
                case 'info':
                        if(cat_type == 'cat_movies'){
                                openImdb($name, cat_type);
                        }
                        else if(cat_type == 'cat_tv')
                                openTv($name, cat_type);
                        else if(cat_type == 'cat_games')
                                openGameReview($name, cat_type);
                        break;
                case 'traktv':
                        if(cat_type != 'cat_games'){
                           opentraktTV($name, cat_type);
                        }else{
                        	$(this).remove();
                        }
                        break;
                case 'trailer':
                        if(cat_type == 'cat_games')
                                openGamePlay($name, cat_type);
                        else if(cat_type == 'cat_movies')
                                openTrailer($name, cat_type);
                        break;
                case 'episodes':
                        if(cat_type == 'cat_tv')
                                openEpisodes($name, cat_type);
                        break;
        }
});


function splitter(string, type){
    var result = "";
    var split_str = string.split(' ');
    for (var index in split_str){
        if(type == 'cat_tv')
            if(parseInt(split_str[index],10) > 10 ){
                    result = (split_str.slice(0,index)).join(" ");
                    splitter(result, type);
                    break;
                }
        if(split_str[index].toLowerCase() == "update"){
             result = (split_str.slice(0,index)).join(" ");
             splitter(result, type);
             break;
        }
        if(split_str[index].charAt(0).toLocaleLowerCase() == 'v' && !isNaN(split_str[index].charAt(1))){
            result = (split_str.slice(0,index)).join(" ");
            splitter(result, type);
            break;
        }
        if(split_str[index].indexOf('-') != -1){
            result = (split_str.slice(0,index)).join(" ");
            splitter(result, type);
            break;
        }

    }
    if(result.length > 0)
       return result;
    else
        return string;


}
function cleanName2(rawName, type){
        var name = "";

    var tempName =  splitter(rawName, type);

        var split_name = tempName.split(" ");

        //remove fixed words
        for(var j = 0; j < split_name.length; j++){
                var found = false;
                for(var k = 0; k < fixed_words.length; k++){
                   if(fixed_words[k].toLowerCase() == split_name[j].toLowerCase()){
                           found = true;
                           break;
                   }
                }
                if(found)
                  delete split_name[j];
        }
        //special case filter
        for (var index in split_name){
                if(isNaN(split_name[index]) && 
                   isNaN(split_name[index].charAt(0)) && 
                   split_name[index].indexOf("(") == -1){
                                if(type == 'cat_tv')
                                        if(split_name[index].indexOf("E") != -1 && split_name[index].indexOf("S") != -1)
                                                break;
                                name += split_name[index] + " ";
                }
                else if(!isNaN(split_name[index])){  //handler for numbers in the name
                        if(type == 'cat_movies')
                                if(parseInt(split_name[index],10) > 10 )
                                        break;

                        name += split_name[index] + " ";
                }
                else
                        break;
        }
        if(type== 'cat_tv')
           return name.slice(0, - 1);
        else
      return $.trim(name);
}
function openImdb(name, type){

        var movie_name = cleanName2(name, type);
        window.open('http://www.imdb.com/find?s=tt&q=' + movie_name);

 //http://www.imdbapi.com/?t=movie name --- get json respons with imdb id
 //http://www.imdb.com/find?s=tt&q=movie name  --- takes you to the movie page or to results
}
function opentraktTV(name , type){
        var showtype;
        var tv_name = cleanName2(name, type);
        if(type== 'cat_tv'){
        	showtype = 'shows';
        }else if (type== 'cat_movies'){
        	showtype = 'movies';
        }
        window.open('https://trakt.tv/search/'+showtype+'?query=' + tv_name);

 //http://www.tv.com/search?type=11&stype=all&tag=search%3Bforums&q=tv show name
}
function openTv(name , type){

        var tv_name = cleanName2(name, type);
        window.open('http://www.tv.com/search?q=' + tv_name);

 //http://www.tv.com/search?type=11&stype=all&tag=search%3Bforums&q=tv show name
}
function openEpisodes(name, type){

        var episode_name = cleanName2(name, type);
        window.open('http://www.torrentleech.org/torrents/browse/index/query/'+ episode_name + '/facets/e8044d_877b75');

//www.torrentleech.org/torrents/browse/index/query/The+Big+Bang+Theory/facets/e8044d_877b75
}
function openGamePlay(name, type){

        var game_name = cleanName2(name, type);
        window.open('http://www.youtube.com/results?search_query='+ game_name + " gameplay");
//http://www.youtube.com/results?search_query=game name
}
function openTrailer(name, type){

        var movie_name = cleanName2(name, type);
        window.open('http://www.youtube.com/results?search_query='+ movie_name + " trailer");
//http://www.youtube.com/results?search_query=game name
}
function openGameReview(name, type){

        var game_name = cleanName2(name, type);
        //window.open('http://www.gamespot.com/search/?qs='+ game_name);
        window.open('http://www.rlslog.net/?s='+ game_name +'&sbutt=Go');

//http://www.gamespot.com/search/?qs=
}

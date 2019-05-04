// ==UserScript==
// @name        Download video as MP4 video.sibnet.ru+Uppod Player
// @namespace   Download video as MP4
// @description Скачать видео с сайта video.sibnet.ru.Заменяет видео  плеер на сайте video.sibnet.ru на Uppod Html5 player
// @homepageURL https://greasyfork.org/scripts/22599-video-html5-for-video-sibnet-ru
// @supportURL https://greasyfork.org/ru/scripts/22599-download-video-sibnet-ru-uppod-player/feedback
// @include     https://video.sibnet.ru/shell*
// @include     https://video.sibnet.ru/video*
// @include     https://video.sibnet.ru/*/video*
// @include     http://video.sibnet.ru/video*
// @include     http://video.sibnet.ru/*/video*
// @include     https://video.sibnet.ru/*/video*
// @include     http://video.sibnet.ru/shell*
// @include     http://video.sibnet.ru/
// @include      http://video.sibnet.ru/day/*
// @require https://greasyfork.org/scripts/22693-uppod-0-13-05/code/uppod-01305.js?version=630623
// @require https://cdnjs.cloudflare.com/ajax/libs/x2js/1.2.0/xml2json.js
// @compatible firefox 62
// @compatible chrome 69
// @version     2.0.5
// @grant       none
// ==/UserScript==

window.onload = function()
{
    var sibnet="";
    var vurl="";
	var html5=document.getElementById('video_html5_wrapper_html5_api');
    html5.pause();
    var uppodvideo = "#07b02206206f06407906306f06c06f07202203a02206606606606606606607c06606603003002202c02207006c07006c06106306502203a02206206f07407406f06d02202c02207306906402203a02203203103902d03103003503302202c02206406f07706e06c06f06106402203a03102c02206d06506e07506606f06e07406306f06c06f07202203a02206606606606606606602202c02206306e07407206c05f07207506e02203a07b02206306f06c06f07202203a02206606606606606606602207d02c02207006c07407506d06207303006106c07006806102203a03002e03202c02207006c07006c06107902203a03102c02206802203a03503003002c02206206706306f06c06f07202203a02206606606606606606602202c02207006c07407506d06207303006106c07006806105f06f06c06402203a03102c02207006c07406802203a03403002c02206d06506e07506206906702203a03102c02206306e07407206c06306f06c06f07202203a02206306303003003003002202c02207006c07407506d06207303006306f06c06f07202203a02203603603003003003002202c02207306806f07706e06106d06502203a03102c02207606f06c07506d06502203a03002e03902c02206306e07407206c06d06107206706906e02203a03103002c02207702203a03803903202c02206306e07407206c06206706306f06c06f07202203a02203007c03002202c02206d06506e07506206906706206706306f06c06f07202203a02203002202c02206d02203a02207606906406506f02202c02206c06106e06702203a02207207502202c02206306f06e07407206f06c07302203a02207c02c07006c06107902c07307406f07002c07c02c06206106306b02c07c02c07406906d06505f07006c06107902c06c06906e06502c07406906d06505f06106c06c02c07c02c07606f06c07506d06502c07606f06c06206107202c07c02c06607506c06c02c07c02c06406f07706e06c06f06106402c07c02c07407206106606606906302c06d06506e07502c07307406107207402c07007206f06306506e07402c07207506e05f06c06906e06502202c02206e06f07406507306206706306f06c06f07202203a02203002202c02207006c07407506d06207303006306f06c06f07205f06f06c06402203a02206606603003003003002202c02207306307206506506e06306f06c06f07202203a02206606606606606606607c06306306606606606602202c02207006c06c06906d06907402203a03503002c02206f02203a03203502c02207006c07407506d06207303006206706306f06c06f07202203a02203603607c03303306606606606602202c02206306e07407206c06506e06406d06107206706906e02203a03002c02206306e07407206c05f07307406107207402203a07b02206206705f06102203a03002e03103502c02206206702203a02203102202c02206206705f07306802203a02203102207d07d";
    var bodyContent = document.body.innerHTML;
    var PLSurl = bodyContent.match(/player.src\(\[\{src:\s\"([^\"]+)\"/m)[1];

// ----------------------------------------------------------------------



function getXmlHttp()
{
	try {
		return new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e) {
		try {
			return new ActiveXObject("Microsoft.XMLHTTP");
		} catch (ee) {
		}
	}
	if (typeof XMLHttpRequest!='undefined') {
		return new XMLHttpRequest();
	}
}

if(window.location.href.indexOf('https') != - 1)
{
sibnet='https://video.sibnet.ru';
}
else
{
	sibnet='http://video.sibnet.ru';
}

    var xhr = getXmlHttp(); // Set up xhr request

    xhr.open("GET", sibnet+''+PLSurl, true); // Open the request

xhr.setRequestHeader('referer', window.location.href);


    xhr.send();

    //  Asynchronously wait for the data to return
    xhr.onreadystatechange = function () {
      if (xhr.readyState == xhr.DONE) {
        var tempoutput = xhr.response;
          console.log(tempoutput);
         var x2js = new X2JS();

          var jsonObj = x2js.xml_str2json(tempoutput);

            var am=jsonObj.MPD.Period.AdaptationSet[0].SegmentTemplate._media;
			   // fragment-$Number$-$RepresentationID$.m4s

var mp4url=am.replace('/fragment-$Number$-$RepresentationID$.m4s', '.mp4');

var link=mp4url;
var container='video_html5_wrapper';
var all_td = document.getElementsByTagName('td');
  for (var i = 0; i < all_td.length; i++) {
    if (all_td[i].className == 'video_size') {
      all_td[i].innerHTML = '<a href="' + link + '">' + all_td[i].textContent + '</a>';
    }
  }

if(window.location.href.indexOf('videoid=') != - 1) {
var videoid = window.location.href.split('videoid=')[1];

videoid=videoid.match(/[0-9]/m)['input'];



var vurl=sibnet+'/video'+videoid;
}
else
{
	vurl=window.location.href;
}

	var uppodVars={m:'video', uid:container,st:uppodvideo,file:link,link:vurl};
	

var videoplayer=new Uppod(uppodVars);



      }
    }

    // Report errors if they happen during xhr
    xhr.addEventListener("error", function (e) {
      console.log("Error: " + e + " Could not load url.");
    }, false);

// ----------------------------------------------------------------------


}; // END window.onload = function 
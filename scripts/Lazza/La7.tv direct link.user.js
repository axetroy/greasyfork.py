// ==UserScript==
// @name        La7.tv direct link
// @namespace   http://andrealazzarotto.com/
// @include     http://la7.it/*
// @include     http://*.la7.it/*
// @version     2.9.8
// @description This script gives you the direct link while watching a video on La7.tv.
// @copyright   2012+, Andrea Lazzarotto - GPLv3 License
// @require     http://code.jquery.com/jquery-latest.min.js
// @grant       GM_xmlhttpRequest
// @grant       GM.xmlHttpRequest
// @connect     kdam.iltrovatore.it
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

/* Greasemonkey 4 wrapper */
if (typeof GM !== "undefined" && !!GM.xmlHttpRequest)
  GM_xmlhttpRequest = GM.xmlHttpRequest;

var appendURL = function(element, url, entry_id) {
    var identifier = 'direct-link-' + entry_id;
    if ($('#' + identifier).length)
        return;
	element.after('<div id="' + identifier + '"></div>');
	$('#' + identifier).css({
		'padding': '5px 0',
		'margin': '15px auto',
		'width': '90%',
		'border': '1px solid #888',
		'text-align': 'center',
		'background-color': '#cfc',
		'box-shadow': '0px 5px 15px 0px rgba(0, 0, 0, .7)',
		'font-family': 'sans-serif'
	}).append("<a href='" + url + "'>MP4 Direct Link</a>");
	$("#direct-link-" + entry_id + " a")
		.css('color', 'black')
		.css('text-decoration', 'none')
		.css('font-size', '15px');
};

var handleObject = function(obj) {
	var entry_id = obj.text().split('entry_id')[1].split('/')[1];

    var text = obj.text();
    if (text.indexOf('src:') > 0) {
        var json = text.split('src:')[1].split('}')[0] + '}';
        json = json.replace(/m(3u8|p4):/g, "\"m$1\":");
        console.log(json);
        var sources = JSON.parse(json);
        var qualities = [];
        var parts = sources.m3u8.split(',').slice(1,-1);
        if (!parts.length)
            return appendURL(obj, sources.mp4, entry_id);
        var divider = sources.m3u8.split('entry/data/0/')[1].split('/')[0] + '/';
        for (var i = 0; i < parts.length; i++)
            qualities.push(parts[i].split(divider)[1]);
        var final = sources.mp4.split(divider)[0] + divider + qualities[qualities.length-1] + '.mp4';
        return appendURL(obj, final, entry_id);
    }

	// Thanks to: https://web.archive.org/web/20140330171953/http://www.leoiannacone.com/2014/03/il-caso-la7-it-e-la-questione-del-nuovo-player/
	var data_url = 'http://kdam.iltrovatore.it/p/103/sp/10300/playManifest/entryId/' + entry_id;
	console.log(data_url);
	GM_xmlhttpRequest({
		method: 'GET',
		url: data_url,
		headers: {
			'Accept': 'application/atom+xml,application/xml,text/xml'
		},
		onload: function(responseDetails) {
			var r = responseDetails.responseText;
			var doc = $.parseXML(r);
			var $xml = $(doc);

			var media_url = $xml.find("media").attr('url');
			$('div.kaltura').parent().css('display', 'inline-block');
			$('div.kaltura').parent().parent().css('text-align', 'center');
			$('div.wrapper-media').css('height', 'auto');
			appendURL(obj, media_url, entry_id);
		}
	});
};

$(document).ready(function(){
	var objects = $('script:contains("entry_id")');
	for (var i = 0; i < objects.length; i++)
		handleObject($(objects[i]));

	// fix home page
	$("#block-la7-vetrina-la7-vetrina-block").css("height", "auto");
	$("#la7_vetrina, #la7_vetrina_contenitore").css("padding-bottom", "4.5em");
	$(".la7_vetrina_block_lancio").css("overflow", "visible");

    // fix frames
    $("iframe[src*='/embedded/la7']").each(function() {
        $(this).height($(this).height() + 60);
    });
});
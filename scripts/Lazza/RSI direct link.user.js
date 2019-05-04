// ==UserScript==
// @name        RSI direct link
// @namespace   http://andrealazzarotto.com/
// @include     http://rsi.ch/*
// @include     http://*.rsi.ch/*
// @include     https://rsi.ch/*
// @include     https://*.rsi.ch/*
// @version     4.1.7
// @description This script gives you the direct links while watching a video on rsi.ch.
// @copyright   2013+, Andrea Lazzarotto - GPLv3 License
// @require     http://code.jquery.com/jquery-latest.min.js
// @grant       GM_xmlhttpRequest
// @grant       GM.xmlHttpRequest
// @connect     il.srgssr.ch
// @connect     codww-vh.akamaihd.net
// @connect     cdn.rsi.ch
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

/* Greasemonkey 4 wrapper */
if (typeof GM !== "undefined" && !!GM.xmlHttpRequest)
  GM_xmlhttpRequest = GM.xmlHttpRequest;

var get_title = function() {
	var title = $('h1').text().trim() || 'output';
	return title.replace(/\W+/g, '_');
};

var render_piece = function(html) {
	var tree = $(html);
	if (!tree.length)
		return '';
	var output = [];
	var lastColor = null;
	tree.find('span').each(function() {
        var element = $(this);
        var thisColor = element.attr('tts:color');
        if (lastColor && lastColor != thisColor)
            output.push('\n-');
        lastColor = thisColor;
        output.push(element.text().trim());
    });
	var joined = output.join(' ');
	joined = joined.replace(/\ +\n/, '\n').replace(/(^\n|\n$)/, '');
	joined = joined.replace(/\n+/, '\n').replace(/\ +/, ' ');
	return joined;
};

var render_part = function(html, id) {
	var tree = $(html);
	var begin = tree.attr('begin').replace('.', ',');
	var end = tree.attr('end').replace('.', ',');
	return id + '\n' +
		begin + ' --> ' + end + '\n' +
		render_piece(html);
};

var handle_subtitles = function(subURL, element_id, title) {
	if (!subURL)
		return;

    GM_xmlhttpRequest({
		method: 'GET',
		url: subURL,
		onload: function(responseDetails) {
			var r = responseDetails.responseText;
			var doc = $.parseXML(r);
			var $xml = $(doc);

			var srt_list = [];
			$xml.find('p').each(function(index, value){
				srt_list.push(render_part(value.outerHTML, index+1));
			});

            $('#' + element_id)
                .append('<span class="sep"> | </span><a class="srt-link">SRT</a>')
                .append('<span class="sep"> | </span><a href="' + subURL + '">TTML</a>')
                .find('.srt-link').attr('href', 'data:text/plain;charset=utf-8,' +
                                        encodeURIComponent(srt_list.join('\n\n'))).attr('download', 'sottotitoli.srt');
		}
	});
};

var appendQualities = function(element, id, qualities, subtitles) {
	element.parent().find('.direct-links').remove();
	element.after('<div class="direct-links" id="' + id + '"></div>');
	for(var key = 0; key < qualities.length; key++) {
		var chunks = qualities[key].split(',');
		var last = chunks[chunks.length-1];
		var pos = parseInt(last.split('index_')[1]);

		var url = 'http://mediaww.rsi.ch/' + chunks[0].split('net/i/')[1] + chunks[pos+1] + '.mp4';
		console.log(url);

		$('#' + id)
			.append('<span class="sep"> | </span>')
			.append('<a href="' + url + '">Link ' + (key+1) + '</a>');
	}
    handle_subtitles(subtitles, id);
	$('#' + id + ' span:first-child').remove();

	$('#' + id + ' a').css('font-weight', 'bold');
	$('#' + id).css({
		'margin': '.75em 0',
		'box-sizing': 'border-box',
		'width': 'auto',
		'text-align': 'center'
	});
};

var m3u8_qualities = function(contents) {
	var lines = contents.split('\n');
	var streams = {};
	for (var i = 0; i < lines.length - 1; i++) {
		var h = lines[i];
		var u = lines[i+1];
		if(h.indexOf('#EXT-X-STREAM-INF') === 0 && u.indexOf('m3u8') > 0) {
			var q = parseInt(h.split('RESOLUTION=')[1].split('x')[0]);
			if(h.indexOf('audio-') > 0)
				q = q*100 + parseInt(lines[i].split('audio-')[1].split('"')[0]);
			if (u.indexOf('://') > 0)
				streams[q] = u;
			else
				streams[q] = m3u8_url.object.split('/').slice(0,-1).join('/') + '/' + u;
			i++;
		}
	}
	return streams;
};

var get_biggest = function(dict) {
	var s = 0;
	var o = null;
	for(var key in dict) {
		key = parseInt(key) || 0;
		if (key > s) {
			s = key;
			o = dict[key];
		}
	}
	return {'size': s, 'object': o};
};

var layerURL = "http://il.srgssr.ch/integrationlayer/1.0/ue/rsi/video/play/";
var isPlay = location.href.indexOf('/play/tv') > 0;

var setup_frames = function() {
    var dividers = [':', '%3A'];
    for (var i = 0; i < dividers.length; i++) {
        var divider = 'video' + dividers[i];
        $("iframe[src*='" + divider + "']").each(function (){
            var frame = $(this);
            var id = parseInt(frame.attr('src').split(divider)[1].split('&')[0]);
            if (!!id && (frame.data('done') !== id)) {
                // set this immediately to avoid multiple requests
                frame.data('done', id);
                console.log("[setup_frames] Marking " + id + " as done");

                GM_xmlhttpRequest({
                    method: 'GET',
                    url: layerURL + id.toString() + '.xml',
                    onload: function(responseDetails) {
                        var r = responseDetails.responseText;
                        var doc = $.parseXML(r);
                        var $xml = $(doc);

                        console.log("[setup_frames] Loaded XML file for " + id);

                        var manifestURL = $($xml.find('Playlist[protocol="HTTP-HLS"] > url').get(0)).text();
                        console.log("[setup_frames] Manifest URL: " + manifestURL);

                        var subtitles = $($xml.find('TTMLUrl').get(0)).text();
                        if(!!subtitles)
                            console.log("[setup_frames] Subtitles URL: " + subtitles);

                        var qualities = [];
                        var chunks = manifestURL.split(',');
                        for (var pos = 0; pos < chunks.length-2; pos++)
                            qualities.push(manifestURL.replace('master.m3u8', 'index_' + pos + '_av.m3u8'));

                        var selector = 'link-' + id;
                        appendQualities(frame.parent(), selector, qualities, subtitles);
                    }
                });
            }
        }); // end each
    }
};

var loader_loop = function() {
    var frames = $("iframe[src*='video:'], iframe[src*='video%3A']");
    if (frames.length)
        setup_frames();
    else
        setTimeout(loader_loop, 500);
};

$(document).ready(function(){
	setup_frames();

    var loaders = $('script:contains("embedCode:")');
    if (loaders.length)
        loader_loop();

	$('a[href^="#gallery"]').click(function(){
		setTimeout(setup_frames, 500);
	});
});
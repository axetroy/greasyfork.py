// ==UserScript==
// @name        Video.mediaset.it native video player and direct links
// @namespace   http://andrealazzarotto.com
// @description This script allows you to watch and download videos on Video Mediaset.
// @include     http://www.video.mediaset.it/video/*
// @include     http://www.video.mediaset.it/player/*
// @include     https://*.mediasetplay.mediaset.it/*
// @include     http://www.mediaset.it/*
// @version     6.5.7
// @require     http://code.jquery.com/jquery-latest.min.js
// @grant       GM_xmlhttpRequest
// @grant       GM.xmlHttpRequest
// @connect     mediaset.it
// @connect     video.mediaset.it
// @connect     cdnselector.xuniplay.fdnames.com
// @connect     video.lazza.dk
// @connect     execute-api.eu-west-1.amazonaws.com
// @connect     theplatform.eu
// @connect     akamaized.net
// @connect     mediaset.net
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

/* Greasemonkey 4 wrapper */
if (typeof GM !== "undefined" && !!GM.xmlHttpRequest) {
    GM_xmlhttpRequest = GM.xmlHttpRequest;
}

function fetch(params) {
    return new Promise(function(resolve, reject) {
        params.onload = resolve;
        params.onerror = reject;
        GM_xmlhttpRequest(params);
    });
}

var base_selector = "https://video.lazza.dk/mediaset?id=";
var loc = unsafeWindow.location;
var isIframe = loc.href.indexOf("player/") > 0;
var isPlay = loc.href.indexOf("mediasetplay.mediaset.it/video/") > 0;

function boxStyle(selector, color, textcolor) {
	$(selector).css({
		'padding': '.5em',
		'margin': '1em 4em',
		'text-align': 'center',
		'background-color': color,
		'color': textcolor
	});
	$(selector + ' a').css('color', textcolor);
    $(selector + ' pre').css({
        'white-space': 'pre-wrap',
        'word-break': 'break-all',
    });
    $(selector + ' *').css('font-size', '15px');
}

function writeLive(stream) {
    $('#stream-url').remove();
    console.log("LIVE");
	$('<div id="stream-url">').insertAfter($('#playerContainer').parent());
	$('#stream-url').append('<p>Flusso della diretta <strong>da aprire con VLC o <code>ffplay</code>:</strong></p>')
		.append('<pre><code><a href="' + stream + '">' + stream + '</a></code></pre>');
	boxStyle('#stream-url', 'rgba(255,255,255,0.5)', 'black');

	// kill login timeout
	unsafeWindow.userNotLogged = function() { return; };
	setTimeout(function() {
        $('.countdown').remove();
    }, 1000);
}

function handleLive(pageURI) {
    var baseURL = "https://api-ott-prod-fe.mediaset.net/PROD/play/alive/nownext/v1.0?channelId=";
    if (pageURI.indexOf('/diretta/') < 0) {
        return;
    }
    fetch({
        method: 'GET',
        url: baseURL + pageURI.split('/diretta/')[1].split('_c')[1],
        headers: {
            'Accept': 'application/json'
        }
    }).then(function(responseDetails) {
        var r = responseDetails.responseText;
        var data = $.parseJSON(r);
        var instruction = data.response.tuningInstruction;
        for (var i = 0; i < 5; i++) {
            var row = instruction['urn:theplatform:tv:location:any'][i];
            var public = row.publicUrls[0];
            var streaming = row.streamingUrl;
            if (row.format.indexOf('x-mpegURL') > 0) {
                return fetch({
                    method: 'GET',
                    url: public,
                    headers: {
                        'Accept': 'application/atom+xml,application/xml,text/xml'
                    }
                });
            }
        }
    }).then(function(responseDetails) {
        var src = responseDetails.finalUrl;
		writeLive(src);
    });
}

function displayURLs(responseDetails) {
    var container = $('#playerContainer');
    if (!isIframe && !container.length) {
        return setTimeout(function() {
            displayURLs(responseDetails)
        }, 1000);
    }

    if (isIframe) {
        $('<div id="video-links">').appendTo('body');
    } else {
        container.parent().after('<div id="video-links">');
    }

    var r = responseDetails.responseText;
    var doc = $.parseXML(r);
    var $xml = $( doc );
    var videos = $xml.find("video");
    var vlinks = [];

    var appended = {};
    // parse video URLs
    videos.each(function (i) {
        var url = $( videos.get(i) ).attr("src");
        var type = url.slice(-3);
        var name = "";
        switch(type) {
            case "est": name = "Smooth streaming"; break;
            case "3u8":
            case "pl)": name = "M3U8"; break;
            case "mpd": name = "skip"; break;
            case "flv": name = "Video FLV"; break;
            case "f4v": name = "Video F4V"; break;
            case "mp4": name = "Video MP4"; break;
            case "wmv": name = "Video WMV"; break;
        }
        var ending = url.slice(-20);
        if (name != "skip" && !appended[ending]) {
            vlinks.push( { na: name, url: url } );
            appended[ending] = true;
        }
    });

    // display video URLs
    var num = vlinks.length;

    for(var i = 0; i < num; i++) {
        var o = vlinks[i];
        var s = '<a href="'+o.url+'">'+o.na+'</a>';
        $(s).appendTo('#video-links');
        if(i != num-1) {
            $('<span>&nbsp;|&nbsp;</span>').appendTo('#video-links');
        }
    }
    boxStyle('#video-links', 'rgba(0,0,0,0.5)', 'white');
    if (!isIframe) {
        $("#video-links").after("<div id='video-links-actions'></div>");
        $("#video-links-actions")
            .append('<center style="opacity: 75%; font-size: 75%">' +
                    '<iframe allowtransparency="true" style="width: 94px; height: 20px; position: relative; vertical-align: middle; display: inline-block;" src="https://www.facebook.com/v2.12/plugins/like.php?href=https%3A%2F%2Ffacebook.com%2FAndreaLazzarottoSoftware&layout=button_count&sdk=joey&share=false&show_faces=false" frameborder="0"></iframe>' +
                    '&nbsp;&nbsp;—&nbsp;&nbsp;<a href="https://lazza.me/RecensioneScript">Recensisci lo script</a>' +
                    '&nbsp;&nbsp;—&nbsp;&nbsp;<a href="https://lazza.me/DonazioneScript">Fai una donazione</a>' +
                    '</center>')
            .find('a').css('text-decoration', 'underline');
        boxStyle('#video-links-actions', 'rgba(0,0,0,0.35)', 'white');
    }

    if(isIframe) {
        $('#video-links').css({
            'position': 'absolute',
            'bottom': '1.5em',
            'left': '5%',
            'right': '5%',
            'font-size': '.9em',
            'z-index': '9999'
        })
        .append("<span id='close'>&times;</span>");
        $("#close").css({
            'font-weight': 'bold',
            'position': 'absolute',
            'right': '1em',
            'cursor': 'pointer'
        }).click(function() {
            $("#video-links").fadeOut();
        });
        boxStyle('#video-links', 'rgba(255,255,255,0.5)', 'black');
    }
}

function get_urls() {
    var params = new URLSearchParams(location.search.slice(1));
    var guid = (loc.href.match(/(FAFU000000([0-9]{4,6})|F[0-9A-F]{14,})/) || [null])[0] || params.get('programGuid') || params.get('id');
    if (!!guid && guid.indexOf('FAFU') == 0) {
        guid = guid.slice(-6);
    }
    $("#video-links, #video-links-actions").remove();
    if (!!guid) {
        console.log("GUID: " + guid);
        fetch({
            method: 'GET',
            url: base_selector + guid,
            headers: {
                'Accept': 'application/atom+xml,application/xml,text/xml'
            }
        }).then(displayURLs);
    }
}

var old_href = "";
var new_href = "";

function handle_everything() {
    handleLive(loc.href);

    get_urls();
}

$(document).ready(function(){
    setInterval(function() {
            old_href = new_href;
            new_href = loc.href;
            if (new_href != old_href) {
                handle_everything();
            }
        }, 1000);

	// kill ads
	unsafeWindow.adsEnabled = false;
});
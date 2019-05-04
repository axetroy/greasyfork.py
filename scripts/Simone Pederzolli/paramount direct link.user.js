
Greasy Fork
Now with cleaner grease!
Entra  Script Forum Aiuto  
Cerca
→
Paramount direct link
This script gives you the direct link while watching a video on Paramount
Informazioni
 
Codice
 
Storia
 
Feedback (0)
 
Statistiche
Installa questo script?
Dopo aver provato lo script, puoi inviare un fai una domanda, recensisci lo script, oppure reportalo
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
// ==UserScript==
// @name        paramount direct link
// @namespace   none
// @include     http://www.paramountchannel.it/* 
// @include     http://*.paramountchannel.it/*
// @version     2.8
// @description This script gives you the direct link while watching a video on paramount.
// @copyright   2016+, none – just a test - GPLv3 License
// @require     http://code.jquery.com/jquery-latest.min.js
// @grant       GM_xmlhttpRequest
// @connect     kdam.iltrovatore.it
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

var appendURL = function(element, url, entry_id) {
	element.after('<div id="direct-link-' + entry_id + '"></div>');
	$('#direct-link-' + entry_id).css({
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
	var dividers = ['mp4: ', 'mp4": '];

	for (var i = 0; i < dividers.length; i++) {
		var divider = dividers[i];
		if (obj.text().indexOf(divider) > 0) {
			var mp4_URL = obj.text().split(divider)[1].split('"')[1];
			if(mp4_URL.indexOf('content/http') > 0) {
				// Fix weird URLs on some pages
				var pieces = mp4_URL.split('content');
				mp4_URL = pieces[0] + 'content' + pieces[2];
			}
			appendURL(obj, mp4_URL, entry_id);
			return;
		}
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
});

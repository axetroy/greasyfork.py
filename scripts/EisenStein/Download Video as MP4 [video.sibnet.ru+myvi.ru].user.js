// ==UserScript==
// @name           Download Video as MP4 [video.sibnet.ru+myvi.ru]
// @name:en        Download Video as MP4 [video.sibnet.ru+myvi.ru]
// @namespace      http://video.sibnet.ru
// @description    Скачать видео с myvi.ru, video.sibnet.ru одним кликом, правильные названия видео при скачивании
// @description:en Download video from myvi.ru and video.sibnet.ru by a simple click, true filenames of downloaded videos
// @include        *://video.sibnet.ru/*
// @include        *://myvi.ru/*
// @include        *://www.myvi.ru/*
// @include        *://cv*.sibnet.ru/*
// @include        *://dv*.sibnet.ru/*
// @include        *://fs*.myvi.ru/*
// @include        *://fs*.myvi.ru:8090/*
// @connect        sibnet.ru
// @connect        myvi.ru
// @version        2.3.1
// @author         EisenStein
// @grant          GM_xmlhttpRequest
// @grant          GM.xmlHttpRequest
// @require        https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js
// @run-at         document-start
// ==/UserScript==

var DEBUG = true,
	RANDOM = '1669048',// Math.round(Math.random() * 1000000 + 1000000),
	scriptName = 'Download Video as MP4',
	scriptVersion = '2.3.0-beta.1.0',
	blank = function(){},
	consoleLog = function(){window.console.log.apply(this, arguments);},
	clog = DEBUG ? consoleLog : blank,
	clog2 = consoleLog,
	userOptions, siteObject;
(function(window){
	try{
		document.domain = location.hostname.match(/(sibnet|myvi)\.ru/)[0];
	}catch(er){console.error(er);}
	if( /^(cv|dv|fs)[a-z\d]+\.(sibnet|myvi)\.ru/.test(location.hostname) )
	{
		clog2("[window:child] origin: ", location.origin);
		DOMReady(function(){
			executor();
		});
	}else{
		clog2("[window:parent] start " + scriptName + " v" + scriptVersion + "..");
		clog2("[window:parent] origin: ", location.origin);
		userOptions = initOptions();
		siteObject = getSiteObject();
		userOptions.set({
			clickCancel : true,// автоматически нажать на отмену в конец видео
			removeAds : true,// удалить рекламу
			addVideoId : true,// добавить видео id в название файла
			addSiteName: false,// добавить название сайта
			useGMDownloader : false,// всегда использовать GM.xmlHttpRequest для скачивания файла (не рекомендуется)
			maxSize : 16 * 1024 * 1024,// (16 Mb) максимальный размер файла для скачивания с помощью GM.xmlHttpRequest
			delay : 500,// задержка в мс перед закрытием загрузочного iframe'a
			style: 0,// номер стиля диалогового окна
		});
		document.addEventListener('readystatechange', main, false);
	}
})(window);
function DOMReady(callback, doc)
{
	doc = doc || document;
	clog("[DOMReady] readyState: ", doc.readyState);
	switch(doc.readyState)
	{
		case 'loading':
		doc.addEventListener('DOMContentLoaded', callback, false);
		break;
		case 'interactive':
		case 'complete':
		callback();
		break;
	}
}
function executor()
{
	try{
	clog("[executor] origin: ", location.origin);
	var s = location.hash,
		t, ext, a, v;
	if( !s )
		return 1;
	else if( s.indexOf('#DV::') !== 0 )
	{
		if( /mp\d+$/.test(s) )
		{
			setTimeout(function(){window.history.pushState({}, null, '/' + s.slice(1));}, 3e3);
			return 0;
		}
		return 1;
	}
	t = JSON.parse(decodeURIComponent(s.slice(5)));
	t.complete = 1;
	t.code = 0;
	clog("[executor] data: ", t);
	clog("[executor] readyState: ", document.readyState);
	t.ext = t.ext || getLocation(t.source, 'pathname').match(/\.([^.\/]+)/)[1];
	var m = t.name && t.name.match(/\.([^.]+)$/);
	if( m && m[1] != t.ext )
		t.name += '.' + t.ext;
	document.body.innerHTML += `<a id="download-link" href="${t.source}" download="${t.name}" style="/*display:none*/">${t.name}'</a>`;
	a = $('a#download-link');
	if( a.origin !== location.origin )
	{
		clog2("redirect detected: " + a.hostname + " -> " + location.hostname);
		a.href = location.origin + location.pathname + location.search;
		//window.location.href = location.protocol + '//' + location.hostname + location.search + location.hash;
	}
	var target = window.opener || window.parent;
	a.addEventListener("click", function(){
		t.startTime = Date.now();
		clog("[executor] file downloading starts..", t.name);
		if(t.code)
			console.error("[executor] error, data: ", t, ", code", t.code);
		setTimeout(function(){
			t.sendTime = Date.now();
			target.postMessage(t, '*');
		}, t.delay);
	});
	//a.click();// начать скачивание
	}catch(er){
		console.error("[window:child] error: ", er);
		target.postMessage({complete: 1}, '*');
	}
}
function main()
{
	switch(this.readyState)
	{
		case 'interactive':
		if( siteObject.siteName.indexOf('sibnet') != -1 )
		{
			if( userOptions.val('removeAds') )
				removeAds();
			if( userOptions.val('clickCancel') )
				setCancelPostvideo();
			var pladform = detectPladformIFrames();
			if( pladform )
			{
				clog('embeded video from pladform.ru');
				return;
			}
		}
		// get video path name from current html source page:
		// site:video.sibnet.ru '/v/{numbers}/{videoid}.mpd'
		// site:myvi.ru '/video/{videoid}.mp4?uid=&puid=&ref={encoded href}&d=1&rnd={random number}&sig={number}
		var video_path = siteObject.getVideoPath();
		clog2("video path: ", video_path);
		if( video_path )
		{
			GM.xmlHttpRequest({
				url: video_path,
				method: 'HEAD',
				onload: makeVideoLink,
				headers: { 'Referer': location.origin }
			});
		}
		newCssClasses('dv-style-id');
		window.addEventListener('message', recieveMessage, false );
		break;
	}
}
function getLocation(url, property)
{
	window.__link__ = window.__link__ || document.createElement('a');
	__link__.href = url;
	return __link__[property];
}
function downloadFile( name, resource )
{
	var a = document.createElement('a');
	a.download = name;
	a.href = resource;
	$('body').appendChild(a);
	a.click();
	return a.parentNode.removeChild(a);
}
function $(selector, element)
{
	return (element || document).querySelector(selector);
}
function $$(selector, element)
{
	return (element || document).querySelectorAll(selector);
}
function $attr(element, attributes)
{
	if( typeof attributes == 'string' )
		return element.getAttribute(attributes);
	for( var key in attributes )
		element.setAttribute(key, attributes[key]);
	return element;
}
function getSiteObject()
{
	var hostname = window.location.hostname;
	if( hostname.indexOf('myvi.ru') != -1 )
	{
		return {
			siteName: 'myvi',
			getVideoPath: getMyviPath,
			getVideoId: function(){return this.id;},
			id: null,
		};
	}
	else if( hostname.indexOf('sibnet.ru') != -1 )
	{
		return {
			siteName: 'sibnet',
			getVideoPath: getSibnetPath,
			getVideoId: getSibnetId,
		};
	}else
		return {};
}
function getSibnetPath()
{
	var video, source_str, pos, end;
	video = $('#video');
	if( video )
		source_str = video.innerHTML;
	else
		source_str = $('body').innerHTML;
	pos = source_str.indexOf( "player.src([{src: \"" );
	if( pos == -1 )
		return null;
	pos = source_str.indexOf("/v/", pos);
	end = source_str.indexOf(".mpd", pos);
	var retval = null;
	if( end == -1 )
		return retval;
	retval = source_str.substring(pos, end+4);
	console.log('retval: ', retval);
	return retval;
}
function getMyviPath()
{
	var scriptList = $$('script'),
		regex = /createPlayer/,
		pathRegex = /((https?\:)?\/\/(fs\.myvi\.ru))([^\?\#\\]+)([^\#\\]+)/,
		match;
	for( var i = 0, len = scriptList.length, script, html; i < len; ++i )
	{
		script = scriptList[i];
		html = script.innerHTML;
		if( regex.test(html) )
		{
			html = decodeURIComponent(html);
			match = html.match(pathRegex);
			if( !match )
			{
				console.error("invalid match: ", match);
				break;
			}
			siteObject.id = match[4].match(/\d+/)[0];
			siteObject.path = match[0];
			return match[0];
		}
	}
	return null;
}
function makeVideoLink( xhr )
{
	var video_link = xhr.finalUrl.replace('/manifest.mpd', '.mp4');// get downloadable video link
	clog2("video file: ", video_link);
	if( !video_link )
	{
		console.error("[makeVideoLink] can't find video source link");
		return;
	}
	var st = insertLink( video_link );// try to insert the link into 'video_size' element of html source page
	if( st !== 0 )
		confirmDownloadFile( video_link );
}
function insertLink( source_link, size_mb ) // insert hyper reference into video_size element  
{
	var video_size = $('.video_size');
	if( !video_size )
		return 1;
	size_mb = size_mb || video_size.innerHTML;
	video_size.innerHTML = '' +
	'<a id="video_file_' + RANDOM + '" class="video_file_active" href="' + source_link + '" ' +
		'title="Скачать">' + size_mb + '</a>';
	var video_file = $('#video_file_' + RANDOM),
		bytes = (parseInt(size_mb.match(/\d+/)[0], 10) || 0) * 1024 * 1024;
	if( bytes )
		$attr(video_file, {'file-size': bytes});
	video_file.addEventListener('click', handleDownloadFileEvent, false);
	return 0;
}
function handleDownloadFileEvent(event)
{
	var t = event.target;
	if( event.ctrlKey )
		return;
	else if( !t.classList.contains('video_file_active') )
		return;
	event.preventDefault();
	if( t.classList.contains('video_file_active') )
		smartDownloadFile( getFileName(), t.href, $attr(t, 'file-size') );
}
function smartDownloadFile( name, source, size )
{
	if( userOptions.val('useGMDownloader') || (size && size < userOptions.val('maxSize')) )
	{
		GM_downloadFile(name, source);
		return 0;
	}else{
		makeFrame( name, source );
		//makeIFrame( name, source );
		return 1;
	}
}
function getFileName()
{
	var fileName = $('td.video_name > h1'),
		videoId = siteObject.getVideoId(),
		siteName = siteObject.siteName, nameEnd = '';
	if( userOptions.val('addSiteName') )
		nameEnd += (' ' + siteName);
	if( userOptions.val('addVideoId') && videoId )
		nameEnd += (' ' + videoId);
	nameEnd += '.mp4';
	if( fileName )
		return fileName.innerHTML.replace(/\.mp4$/, '') + nameEnd;
	fileName = $('meta[property="og:title"]');
	if( fileName )
		return $attr(fileName, 'content').replace(/\.mp4$/, '') + nameEnd;
	fileName = ( siteName.indexOf('myvi') != -1 ?  $('title').innerHTML : null );
	if( fileName )
		return fileName.replace(/\.mp4$/, '') + nameEnd;
	return siteName + '_' + videoId + '.mp4';
}
function getSibnetId()
{
	var href = window.location.href;
	try{
		return decodeURIComponent(href).match(/video(id\s?\=\s?|)(\d+)/)[2];
	}catch(e){ return ''; }
}
function confirmDownloadFile( source )
{
	var fileName = getFileName();
	clog2("filename: ", fileName);
	makeConfirmWindow();
	setConfirmWindow( fileName, 0, source);
	GM.xmlHttpRequest({
		url: source,
		method: 'HEAD',
		context: {'url': source, 'name': fileName},
		onload: function(xhr){
			if( xhr.status !== 200 )
			{
				console.error("xhr.status: ", xhr.status, xhr.statusText );
				console.error("url: " + source);
				console.error("method: " + 'HEAD');
				return;
			}
			var fileSize = getContentLength( xhr.responseHeaders );
			setConfirmWindow( xhr.context.name, fileSize, xhr.context.url );
		}
	});
}
function makeConfirmWindow()
{
	var confirmWnd = $('#confirm_downlaod_window_' + RANDOM);
	if( !confirmWnd )
	{
		confirmWnd = document.createElement('div');
		$attr(confirmWnd, {
			'id': 'confirm_downlaod_window_' + RANDOM,
			'class': 'confirm_download_window',
		});
		$('body').appendChild(confirmWnd);
		var html = '' +
		'<div id="confirm-filename"></div>' +
		'<div id="confirm-filesize"></div>' +
		'<div id="confirm-bottom">' +
			'<button id="confirm-download-button-true" class="confirm-button">Скачать</button>' +
			'<button id="open-video-source-file" class="confirm-button">Открыть</button>' +
			'<button id="confirm-download-button-false" class="confirm-button">Отмена</button>' +
		'</div>' +
		//'<div id="color-style-id" style="text-align: center;">' +
		//	'<button id="change-color-style" class="confirm-button">Сменить стиль</button>' +
		//'</div>' +
		'';
		confirmWnd.innerHTML = html;
		confirmWnd.addEventListener('click', handleConfirmEvent, false);
	}
	confirmWnd.style.display = 'block';
	return confirmWnd;
}
function setConfirmWindow( fileName, fileSize, fileUrl )
{
	var confirmWnd = $('#confirm_downlaod_window_' + RANDOM) || makeConfirmWindow();
	var fileNameDiv = $('#confirm-filename', confirmWnd),
		fileSizeDiv = $('#confirm-filesize', confirmWnd);
	fileNameDiv.innerHTML = 'Имя файла: ' + shortenFileName(fileName);
	$attr(fileNameDiv, {'title': fileName});
	fileSizeDiv.innerHTML = 'Размер файла: ' + bytesToMB(fileSize, 1) + ' Mb';
	if( fileSize )
		$attr(fileSizeDiv,{'title': bytesToKB(fileSize) + ' Kb'} );
	$attr( $('#open-video-source-file', confirmWnd), {'title': fileUrl});
	$attr( confirmWnd, {
		'file-name': fileName,
		'file-size': fileSize,
		'file-source': fileUrl,
	});
	confirmWnd.style.display = 'block';
}
function bytesToKB( bytes, precision )
{
	if( bytes )
		return (bytes/1024).toFixed(precision || 0);
	return '--';
}
function shortenFileName( fileName )
{
	this.maxLen = this.maxLen || 25;
	var nameLen = fileName.length;
	if( nameLen > this.maxLen )
	{
		var nameEnd = fileName.slice(-11);
		fileName = fileName.slice(0, (this.maxLen - nameEnd.length) );
		fileName += '...' + nameEnd;
	}
	return fileName;
}
function handleConfirmEvent(event)
{
	var t = event.target, r;
	if( t.tagName !== 'BUTTON' )
		return;
	if( t.id === 'confirm-download-button-false' )
		this.style.display = 'none';
	else if( t.id === 'confirm-download-button-true' )
	{
		r = smartDownloadFile( $attr(this, 'file-name'), $attr(this, 'file-source'), $attr(this, 'file-size') );
		if(!r) this.style.display = 'none';
	}
	else if( t.id === 'open-video-source-file' )
		window.open( $attr(this, 'file-source') );// + '#' + encodeURIComponent($attr(this, 'file-name')) );
	else if( t.id === 'change-color-style' )
	{
		var idx = userOptions.data.style.idx;
		userOptions.val('style', idx+1);
		resetCssClasses('dv-style-id');
	}
}
function getContentLength( headersStr )
{
	var headers = headersStr.split('\r\n');
	for( var i = 0, h; i < headers.length; ++i )
	{
		h = headers[i];
		if( h.indexOf('Content-Length') != -1 )
			return parseInt(h.match(/\d+/)[0], 10);
	}
	return 0;
}
function makeFrame( name, source )
{
	var dt = {}, s, u;
	dt.name = name;
	dt.source = source;
	dt.delay = userOptions.val('delay');
	s = JSON.stringify(dt);
	u = source + '#DV::' + encodeURIComponent(s);
	var win = window.open(u);
	/*
	try{
	winDOMReady(function(){
		var doc = this, loc = win.location, a;
		if( doc && doc.body )
		{
			a = doc.createElement('a');
			a.href = source;
			a.download = name;
			doc.body.appendChild(a);
			if( a.hostname !== loc.hostname )
				a.href = loc.protocol + '//' + loc.hostname + a.search;
			clog("frame.link: ", a);
			a.click();
		}
	}, win);
	}catch(er){console.error(er);}
	*/
}
function winDOMReady(callback, win)
{
	/*
	var dummyDoc = null,
		readyDoc = null,
		origin = null;
	try{
		dummyDoc = win.contentDocument;
		readyDoc = dummyDoc;
		origin = win.location.origin;
	}catch(e){}
	clog("frame.location: ", win.location);
	clog("frame.document: ", dummyDoc);
	if(location.origin === origin )
		return DOMReady(callback, dummyDoc);
	var timer = setInterval(function(){
		try{
		readyDoc = win.contentDocument;
		}catch(e){
			console.error("> error: ", e);
			console.error("> doc  : ", readyDoc);
			console.error("> ------");
		}
		clog("frame.readyDoc: ", readyDoc);
		if( readyDoc === dummyDoc || !readyDoc )
			return;
		DOMReady(callback, readyDoc);
		clearInterval(timer);
		timer = null;
	}, 1000);// 1 sec
	setTimeout(function(){
		if(!timer) return;
		clearInterval(timer)
		timer = null;
	}, 2e4);// 20 sec
	*/
}
function makeIFrame( name, source )
{
	var iframe = $('#video_download_iframe_' + RANDOM), dt = {}, s, u;
	if( !iframe )
	{
		iframe = document.createElement('iframe');
		iframe.id = 'video_download_iframe_' + RANDOM;
		$attr(iframe, {
			'width': '1px',
			'height': '1px',
			'style': 'visibility:hidden;',
		});
		$('body').appendChild(iframe);
	}
	dt.name = name;
	dt.source = source;
	dt.delay = userOptions.val('delay');
	s = JSON.stringify(dt);
	u = source + '#DV::' + encodeURIComponent(s);
	clog("[makeIFrame] source: ", u);
	clog("[makeIFrame] data: ", dt);
	iframe.src = u;
}
function closeIFrame()
{
	var el = $('#video_download_iframe_' + RANDOM);
	if( el && el.parentNode )
		el.parentNode.removeChild(el);
}
function GM_downloadFile( name, source )
{
	GM.xmlHttpRequest({
		url: source,
		method: 'GET',
		responseType: 'blob',
		onload: function(xhr){
			if( xhr.status !== 200 )
			{
				console.error("xhr.status: ", xhr.status);
				console.error("url: ", source);
				return;
			}
			clog("source: ", source);
			clog("name: ", name);
			var wURL = window.webkitURL || window.URL,
				resource = wURL.createObjectURL(xhr.response);
			downloadFile( name, resource );
			var video_file = $('#video_file_' + RANDOM);
			if( video_file )
				video_file.classList.add('video_file_active');
			setTimeout(function(){
				wURL.revokeObjectURL(resource);
			}, 1000);
		},
		onprogress: function(xhr){
			if( !xhr.lengthComputable )
				return;
			showDownloadWindow(xhr.total, xhr.loaded);
		}
	});
}
function showDownloadWindow(total, loaded)
{
	var dlWnd = $('#download_window_' + RANDOM);
	if( !dlWnd )
	{
		dlWnd = document.createElement('div');
		$attr(dlWnd, {
			'id': 'download_window_' + RANDOM,
			'class': 'video_download_window',
		});
		dlWnd = $('body').appendChild(dlWnd);
	}
	dlWnd.style.display = '';
	var html = bytesToMB(loaded, 1) + ' Mb / ' + bytesToMB(total, 1) + ' Mb' +
		' (' + (loaded/total*100).toPrecision(3) + '%)';
	dlWnd.innerHTML = html;
	if( total === loaded )
	{
		setTimeout(function(){
			dlWnd.style.display = 'none';
		}, 3000 );
	}
}
function bytesToMB( bytes, precision )
{
	if( bytes )
		return (bytes/(1024*1024)).toFixed(precision || 0);
	return '--';
}
function addCssClass( cssClass, id )
{
	var style = document.createElement('style');
	style.type = 'text/css';
	if( id )
		style.id = id;
	if( style.styleSheets )
		style.styleSheets.cssText = cssClass;
	else
		style.appendChild(document.createTextNode(cssClass));
	$('head').appendChild(style);
}
function resetCssClasses( id )
{
	if( !id )
		return;
	var style = document.getElementById(id);
	if( style )
		style.parentNode.removeChild( style );
	newCssClasses( id );
}
function newCssClasses( id )
{
	addCssClass(`
		.confirm-button {
			background-color: ${userOptions.val('style')['background-color']};
			color: #c7c7c7;
			font-size: 1.0em;
			border-radius: 5px;
			font-family: sans-serif;
			border: 2px solid #c7c7c7;
			cursor: pointer;
			margin: 0.4% 2%;
			padding: 0 3px;
			test-align: center;
		}
		.confirm-button:hover {
			background-color: ${userOptions.val('style')['background-color-hover']};
			border-color: white;
			color: white;
		}
		#confirm-bottom {
			padding: 3px 0 2px 0;
		}
		#confirm-bottom {
			text-align: center;
		}
		.confirm_download_window,
		.video_download_window {
			position: fixed;
			bottom: 20px;
			right: 20px;
			z-index: 9999;
			background-color: ${userOptions.val('style')['background-color']};
			color: white;
			/*box-shadow: 5px 5px 5px #555555;*/
			font-size: 1.0em;
			font-family: sans-serif;
			border-radius: 5px;
			padding: 2px 10px;
			display:;
			cursor: default;
			border: 2px solid #c7c7c7;
			min-width: 250px;
			text-align: center;
		}
	`, id);
}
function removeAds()
{
	var tbody = $('.main tbody');
	if( tbody && tbody.children && tbody.children[0] )
		tbody.children[0].innerHTML = '<td style="height:0px"></td>';
}
function setCancelPostvideo()
{
	var player_container = $('#player_container');
	if( player_container )
	{
		player_container.addEventListener('ended', function(event)
		{
			var postvideo_cancel = $('.vjs-postvideo-cancel');
			if( postvideo_cancel )
				setTimeout( function(){postvideo_cancel.click();}, 1000 );
		}, true );
	}
}
function detectPladformIFrames()
{
	var iFrames = $$('iframe'), count = 0;
	for( var i = 0; i < iFrames.length; ++i )
	{
		if( iFrames[i].src.indexOf('pladform.ru') != -1 )
		{
			$attr(iFrames[i], {
				'id': 'pladform' + i,
				'name': 'pladform' + i,
			});
			++count;
		}
	}
	return count;
}
function recieveMessage(event)
{
	var regex = /((cv|dv|fs)\d+\.(sibnet|myvi)\.ru)/;
	if( regex.test(event.origin) )
	{
		var d = event.data, t = d.delay || userOptions.val('delay'),
			r = Date.now();
		clog( "[recieveMessage] origin: ", event.origin );
		clog( "[recieveMessage] source: ", event.source );
		clog( "[recieveMessage] data  : ", d);
		clog( "[recieveMessage] data transport duration: ", (r-d.sendTime)/1000);
		if( typeof d == 'object' && d.complete == 1 )
			setTimeout( function(){
				var tm = Date.now();
				clog("[recieveMessage] frame close time: ", tm, (tm - d.startTime)/1000);
				try{
					if(event.source !== window)
						event.source.close();
				}catch(er){console.error(er);}
				closeIFrame();
			}, t );
	}else{
		//console.info('[recieveMessage] message from ', event.origin, ' is ignored');
	}
}
function initOptions()
{
	function _setDef(){this.val = this.def;}
	var wndStyle = [];
	function addColor( bg, bgh )
	{
		wndStyle.push({
			'background-color': bg,
			'background-color-hover': bgh,
		});
	}
	addColor('#16a085', '#058f74' );
	addColor('#0b72aa', '#095d8c' );
	addColor('#2091d8', '#2080c7' );
	addColor('#3678cc', '#2668bc' );
	var retVal = {
		data: {
			'clickCancel' : {
				val: null,
				def: true,// автоматически нажать на отмену в конец видео
				setDef: _setDef,
			},
			'removeAds' : {
				val: null,
				def: true,// удалить рекламу
				setDef: _setDef,
			},
			'addVideoId' : {
				val: null,
				def: true,// добавить видео id в название файла
				setDef: _setDef,
			},
			'addSiteName' : {
				val: null,
				def: true,// добавить название сайта в название файла
				setDef: _setDef,
			},
			'useGMDownloader' : {
				val: null,
				def: false,// всегда использовать GM.xmlHttpRequest для скачивания файла (не рекомендуется)
				setDef: _setDef,
			},
			'maxSize' : {
				val: null,
				def: 16 * 1024 * 1024,// (16 Mb) максимальный размер файла для скачивания с помощью GM.xmlHttpRequest
				setDef: _setDef,
				validator: function(v){
					return v < 268435456;// 256 * 1024 * 1024
				}
			},
			'delay' : {
				val: null,
				def: 500,// задержка в мс перед закрытием загрузочного iframe'a
				setDef: _setDef,
				validator: function(v){
					return v > 99;
				}
			},
			'style': {
				get val(){return wndStyle[this.idx];},
				set val(n){ this.idx = n%wndStyle.length;},
				def: 0,// номер стиля
				setDef: function(){
					this.idx = this.def;
				},
				validator: function(n){
					return n >= 0;
				}
			},
		},
		val: function( prop, v ){
			if( this.data[prop] )
			{
				if( v !== undefined )
				{
					if( this.data[prop].validator && this.data[prop].validator(v) )
						this.data[prop].val = v;
					else
						this.data[prop].val = v;
				}else
					return this.data[prop].val;
			}else
				return null;
		},
		setDefs: function(){
			for( var key in this.data )
				this.data[key].setDef();
		},
		set: function( opts ){
			for( var key in opts )
				this.val( key, opts[key] );
		},
	};
	retVal.setDefs();
	return retVal;
}
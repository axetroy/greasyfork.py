// ==UserScript==
// @name         Simple 163 Music Dl Helper
// @namespace    org.jixun.music.163
// @version      1.0
// @description  Download music from music.163.com


///
//               火狐匹配地址
// @include      http://music.163.com/#*

///
//               TamperMonkey 匹配地址
// @include      http://music.163.com/
///


// @copyright    2014+, Jixun.Moe
// @run-at       document-start
// @grant        none
// ==/UserScript==

var $script = document.createElement ('script');
$script.textContent = '(' + (function () {
	// I love prototype.
	String.prototype.format = function () {
		var $arg = arguments,
			$len = $arg.length;
		return this.replace (/\{(\d+)\}/g, function (z, num) {
			num = parseInt (num);
			if (num < $len) {
				return $arg[num];
			} else {
				return z;
			}
		});
	};

	var $bank = {};
	var $dlBtn = document.createElement ('a');
	$dlBtn.setAttribute ('target', '_blank');
	$dlBtn.setAttribute ('style', 'font-size:small;width:3em;left:initial;right:40px');
	$dlBtn.className = 'lytit';
	$dlBtn.textContent = '\u21af 下载';
	$dlBtn.addEventListener ('click', function (e) {
		var $addr = this.getAttribute ('href');
		if ($addr) window.open ($addr);
		e.stopPropagation ();
	}, false);

	var _updDownloadUrl = function (songId) {
		var $song = $bank[songId.toString()];
		var $info = '[{0}] {1} - {2}'.format ($song.album, $song.name, $song.artist);
		console.info ('%s\n%s', $info, $song.url);
		
		$dlBtn.setAttribute ('title', '下载: ' + $info);
		$dlBtn.setAttribute ('href', $song.url);
	};

	var _addBank = function (songObj) {
		$bank[songObj.id.toString()] = {
			name: songObj.name,
			album: songObj.album.name,
			artist: songObj.artists.map(function (artist) {
				return artist.name;
			}).join ('、'),
			
			url: songObj.mp3Url
		};
	};

	window.XMLHttpRequest.prototype.oldOpen = window.XMLHttpRequest.prototype.open;
	window.XMLHttpRequest.prototype.open = function (method, url) {
		console.info ('[REQ] %s: %s', method, url);
		
		if (!url.indexOf('/api/song/media')) {
			console.log ('Check $bank...');
			
			var $id = url.match (/\d+/)[0];
			if ($bank.hasOwnProperty($id)) {
				_updDownloadUrl ($id);
			} else {
				// First, search through local cache.
				var cacheSongObj;
				try {
					cacheSongObj = JSON.parse(localStorage['track-queue']).filter (function (s) {
						_addBank (s);
						return $id == s.id.toString();
					});
				} catch (err) { }

				if (cacheSongObj) {
					console.info ('Music found from cache.');
					_updDownloadUrl (cacheSongObj.id);
				} else {
					console.info ('Requesting song information...');
					var $http = new window.XMLHttpRequest ();
					var $args = [].slice.apply(arguments);
					$http.onreadystatechange = new Function ();
					$args[1] = '/api/song/detail/?id=' + $id + '&ids=%5B' + $id + '%5D&csrf_token=' + url.match(/csrf_token=([^&]*)/)[1];
					$http.open.apply ($http, $args);
					$http.send ();
				}
			}
		} else if (-1 != url.indexOf('/api/song/detail')) {
			try {
				var $this = this;
				var bkReadystatechange = this.onreadystatechange;
				this.onreadystatechange = function (e) {
					if ($this.readyState === 4) {
						JSON.parse($this.responseText.trim()).songs.forEach(function (e) {
							_addBank (e);
							_updDownloadUrl (e.id);
						});
					}
					
					return bkReadystatechange.apply (this, arguments);
				};
			} catch (err) {
				console.error (err);
			}
		}
		
		return this.oldOpen.apply(this, arguments);
	};

	(function () {
		var $t;
		var vv = setInterval (function () {
			if (!($t = document.querySelector ('.lytit')))
				return ;
			clearInterval (vv);
			
			$t.style.maxWidth = '302px';
			$t.parentNode.insertBefore ($dlBtn, $t.nextElementSibling);
		}, 200);
	})();

}).toString() + ')();';

document.head.appendChild ($script);
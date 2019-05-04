// ==UserScript==
// @name	futaba_shiokara_link
// @namespace	http://jbbs.shitaraba.net/bbs/read.cgi/computer/44516/1460598735/
// @description	塩辛壺のリンク化
// @include	http://*.2chan.net/*/res/*
// @include	https://*.2chan.net/*/res/*
// @include	http://*.2chin.net/*/res/*
// @require	http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @version	1.07
// @icon		data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAPUExURYv4i2PQYy2aLUe0R////zorx9oAAAAFdFJOU/////8A+7YOUwAAAElJREFUeNqUj1EOwDAIQoHn/c88bX+2fq0kRsAoUXVAfwzCttWsDWzw0kNVWd2tZ5K9gqmMZB8libt4pSg6YlO3RnTzyxePAAMAzqMDgTX8hYYAAAAASUVORK5CYII=
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);
(function ($) {
	//alert('this script will begin');
	//設定（アップローダのURL，拡張子）
	var url  = 'http://www.siokarabin.com/futabafiles';
	var url2 = 'http://www.nijibox2.com/futabafiles'
	var url5 = 'http://www.nijibox5.com/futabafiles'
	var url6 = 'http://www.nijibox6.com/futabafiles';
	var ext = ['jpg', 'png', 'gif', 'bmp', 'tif', 'tiff', 'mpo', 'sai', 'psd', 'pdf', 'eps', 'ai', 'mht', 'lzh', 'zip', '7z', 'rar', 'gca', 'txt', 'xls', 'doc', 'ppt', 'swf', 'flv', 'f4v', 'mqo', 'mid', 'wav', 'wma', 'wmv', 'avi', 'mpg', 'mp3', 'mp4', 'm4a', 'ogg', 'webm', 'mkv', '3g2', '3gp', 'mmf', 'aif', 'pls', 'asf', 'rpy', 'mgx'];
	
	main();
	
	//メイン
	function main() {
		var allEM, oneEM, text;
		allEM = document.getElementsByTagName('blockquote');
		for (var i = 0; i < allEM.length; i++) {
			oneEM = allEM[i];
			text = oneEM.innerHTML;
			if(text.match(/s[usqpza]\d*/) != null) text = fname_rep(text);
			oneEM.innerHTML = text;
		}
	}

	//リンク化
	function fname_rep(text) {
		for(i in ext){
			//塩辛瓶塩粒（１２時間保管）
			text = text.replace(new RegExp('su(\\d*)\\.'+ext[i], 'g'), '<a href='+url5+'/tubu/src/su$1.'+ext[i]+' target="_blank">su$1.'+ext[i]+'</a>');
			//塩辛瓶小瓶（２４時間保管）
			text = text.replace(new RegExp('ss(\\d*)\\.'+ext[i], 'g'), '<a href='+url5+'/kobin/src/ss$1.'+ext[i]+' target="_blank">ss$1.'+ext[i]+'</a>');
			//塩辛瓶中瓶（４８時間保管）
			text = text.replace(new RegExp('sq(\\d*)\\.'+ext[i], 'g'), '<a href='+url6+'/mid/src/sq$1.'+ext[i]+' target="_blank">sq$1.'+ext[i]+'</a>');
			//塩辛瓶３ｍｌ（６０日間保管）
			text = text.replace(new RegExp('sp(\\d*)\\.'+ext[i], 'g'), '<a href='+url2+'/003/src/sp$1.'+ext[i]+' target="_blank">sp$1.'+ext[i]+'</a>');
			//塩辛瓶大瓶（３０日間保管）
			text = text.replace(new RegExp('sz(\\d*)\\.'+ext[i], 'g'), '<a href='+url2+'/big/src/sz$1.'+ext[i]+' target="_blank">sz$1.'+ext[i]+'</a>');
			//塩辛便空瓶（１２時間保管）（ﾃｽﾄ中）
			text = text.replace(new RegExp('sa(\\d*)\\.'+ext[i], 'g'), '<a href='+url6+'/001/src/sa$1.'+ext[i]+' target="_blank">sa$1.'+ext[i]+'</a>');
		}
		/*
		   拡張子なしでも辿れるようにしたかったけど，
		   自分の正規表現のセンスでは誤爆させてしまいそうで怖いので，
		   削除しておこう…

		//最大2.0MBの塩辛瓶塩粒（拡張子なし）
		text = text.replace(new RegExp('su(\\d\\d\\d\\d\\d\\d*)\\<', 'g'), '<a href='+url5+'/tubu/src/su$1 target="_blank">su$1</a><');
		//最大6.0MBの塩辛瓶小瓶（拡張子なし）
		text = text.replace(new RegExp('ss(\\d\\d\\d\\d\\d\\d*)\\<', 'g'), '<a href='+url5+'/kobin/src/ss$1 target="_blank">ss$1</a><');
		//最大200MBの塩辛瓶中瓶（拡張子なし）
		text = text.replace(new RegExp('sq(\\d\\d\\d\\d\\d\\d*)\\<', 'g'), '<a href='+url6+'/mid/src/sq$1 target="_blank">sq$1</a><');
		//テスト中の空瓶_2017-06-22（拡張子なし）
		text = text.replace(new RegExp('sa(\\d\\d\\d\\d\\d\\d*)\\.', 'g'), '<a href='+url6+'/001/src/sa$1 target="_blank">sa$1</a><');
		*/
		return text;
	}
	//alert('this script finished');
})(jQuery);
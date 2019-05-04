// ==UserScript==
// @name        Douban Book HUST Helper
// @description 豆瓣读书添加HUST图书馆信息
// @author      lastmayday
// @namespace   http://lastmayday.org
// @include     http://book.douban.com/*
// @require     http://libs.baidu.com/jquery/2.0.0/jquery.min.js
// @version     0.0.1
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_xmlhttpRequest
// @grant GM_openInTab
// @grant GM_deleteValue
// @grant GM_addStyle
// @grant GM_registerMenuCommand
// @icon        http://img3.douban.com/pics/douban-icons/favicon_16x16.png
// ==/UserScript==

function insertInfo(){
	if($('#buyinfo').length){
		$('#buyinfo').before('<div class="gray_ad" id="hustlib"></div>');
		$('#hustlib').append('<h2>华科图书馆有没有?</h2><div class="bs" id="isex"></div>');
		if (typeof($('#info').text().split('ISBN:')[1]) != 'undefined') {
			var isbn = $('#info').text().split('ISBN:')[1].split(' ')[1];
			var url = 'http://ftp.lib.hust.edu.cn/search~S0*chx/?searchtype=i&searcharg=+' + isbn;
			GM_xmlhttpRequest({
				url: url,
				method: 'GET',
				onload: function (msg) {
					var text = msg.responseText;
					if(text.indexOf('未找到符合查询条件的馆藏') != -1) {
						$('#isex').html('我科快去买书啦~竟然没有!');
					}else {
						$('#isex').html('我科的图书馆当然有!');
						$('#isex').after('<br><h2>在哪里在哪里?</h2>');
						$(text).find(".bibOrderEntry").appendTo('#hustlib');
						$(text).find('.bibItems').appendTo('#hustlib');
						$('#hustlib').append('<br><h2>再具体点?</h2><p><div class="bs" id="mdt"><a href="' + url + '" target="_blank">戳这里~</a></div>');
						for (var i = 1; i <= $('#hustlib tr').length - 1; i++) {
							var booknum = $('#hustlib tr').eq(i).find('td').eq(1).text();
							$('#hustlib tr').eq(i).find('td').eq(1).remove();
							$('#hustlib tr').eq(i).find('td').eq(0).after('<td width="43%">'+ booknum + '</td>');
						}
					}
				}
			});
		} else {
			$('#isex').html('竟然没有！');
		}
	}
}

insertInfo();
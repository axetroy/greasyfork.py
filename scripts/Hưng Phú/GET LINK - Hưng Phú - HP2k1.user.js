// ==UserScript==
// @name         GET LINK - Hưng Phú - HP2k1
// @namespace    Hung Phu - HP2k1 - http://facebook.com/HP2k1 - http://hungphu.me/ 
// @version      1.0.1
// @icon         https://i.imgur.com/0kbIUP4.jpg
// @description  http://hungphu.me/
// @match        https://mp3.zing.vn/bai-hat/*.html*
// @match        https://mp3.zing.vn/album/*.html*
// @match        https://mp3.zing.vn/playlist/*.html*
// @match        https://mp3.zing.vn/nghe-si/*
// @match        https://mp3.zing.vn/tim-kiem/bai-hat.html?q=*
// @match        http://www.nhaccuatui.com/bai-hat/*
// @copyright    Hưng Phú - HP2k1
// @grant        none
// ==/UserScript==
$(function () 
 
  
  {
  if (location.pathname.indexOf('/bai-hat/') === 0) 
	{
		var linkmp3 = $('div.fb-like').data('href');
		var link128 = file_get_contents("http://hungphu.me/mp3_nct.php?chatluong=128&url=' + linkmp3 + '");
		var link320 = file_get_contents("http://hungphu.me/mp3_nct.php?chatluong=320&url=' + linkmp3 + '");
		var linklossless = file_get_contents("http://hungphu.me/mp3_nct.php?chatluong=lossless&url=' + linkmp3 + '");
		$('#tabService').replaceWith(' <a id="tabService" href="'link128'"class="button-style-1 pull-left fn-tab"><i class="zicon icon-download"></i><span>Tải nhạc 128 kbps</span></a> <a id="tabService" href="'link320'"class="button-style-1 pull-left fn-tab"><i class="zicon icon-download"></i><span>Tải nhạc 320 kbps</span></a> <a id="tabService" href="'linklossless'"class="button-style-1 pull-left fn-tab"><i class="zicon icon-download"></i><span>Tải nhạc Lossless</span></a> ');
	} 
  
  var linknct = $("link[rel='canonical']").attr("href");
  if ($('#btnDownloadBox') === '<a href="javascript:;" id="btnDownloadBox"></span>Tải nhạc</a>')
	{
		$('#btnDownloadBox').replaceWith('<a href="http://hungphu.me/mp3_nct.php?chatluong=128&url=' +linknct + '"><span class="icon_download"></span>   Tải nhạc 128kbps   </a><a href="http://hungphu.me/mp3_nct.php?chatluong=320&url=' +linknct + '"></span>   Tải nhạc 320kbps   </a><a href="http://hungphu.me/mp3_nct.php?chatluong=lossless&url=' +linknct + '"></span>   Tải nhạc Lossless</a>');
	}
		else
			{
				$('#btnAddPlaylistNowPlaying').after('<a href="http://hungphu.me/mp3_nct.php?chatluong=128&url=' +linknct + '"></span>   Tải nhạc 128kbps   </a></li><a href="http://hungphu.me/mp3_nct.php?chatluong=320&url=' +linknct + '"></span>   Tải nhạc 320kbps   </a><a href="http://hungphu.me/mp3_nct.php?chatluong=lossless&url=' +linknct + '"></span>   Tải nhạc Lossless</a>')
			};
  if (location.pathname.indexOf('/file/') === 0) {$('.policy_download').prepend('<div class="col-xs-12"><a title="Tải Nhanh Không Giới Hạn By GLF" style="margin-top: 10px; height: 70px;" class="btn btn-success btn-lg btn-block btn-download-sms" href="https://getlinkfshare.com' + location.pathname.split( '/file/,' ) + '">        <i class="fa fa-cloud-download fa-2x pull-left"></i>        <span class="pull-right text-right download-txt">            Tải nhanh<br>            <small> Get link From get Link Fshare // Không giới hạn tốc độ </small>        </span></a></div>')};
  
});
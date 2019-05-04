// ==UserScript==
// @name			Disable Weibo Article FollowMask
// @name:zh-CN			取消微博文章关注阅读全文
// @description                 用来解除部分微博文章要求关注作者才能阅读全文的限制
// @version	 		1.02
// @author			GensouSakuya
// @include			*weibo.com/ttarticle/*
// @require         https://code.jquery.com/jquery-3.1.1.min.js
// @namespace https://greasyfork.org/users/194737
// ==/UserScript==
$('.W_gotop.S_ficon_bg').before('<a href="javascript:" id="gogoda" data-tip="text=阅读全文&amp;showWithAni=fadeInRight&amp;hideWithAni=fadeOutLeft&amp;pos=left-middle" class="W_gotop S_ficon_bg" action-type="data-tip" style="margin-bottom: 167px;position: fixed;top: auto;"><em class="W_ficon ficon_backtop S_bg2_c">🐔</em></a>')
$("#gogoda").click(function(){
    $('.WB_editor_iframe_new')[0].style['height'] = 'auto';
    $('.btn_line.W_tc.W_f14').remove()
})

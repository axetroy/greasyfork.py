// ==UserScript==
// @name            红蓝p与nico搜索页打开新窗口
// @namespace       http://weibo.com/myimagination
// @author          @MyImagination
// @version			0.9.2
// @description     搜索页面点击图片或视频改为新开窗口
// @include         http://*.pixiv.net/search*
// @include         https://*.pixiv.net/search*
// @include         http://piapro.jp/content_list/?view=*
// @include         http://piapro.jp/search/?view=image&keyword=*
// @include         http://*.nicovideo.jp/tag/*
// @include         http://*.nicovideo.jp/search/*
// @license         WTFPL
// @run-at          document-end
// ==/UserScript==

(function () {
  timer = setTimeout(onSub, 2000);
  //.find(".username.js-action-profile-name")
}) ();
function onSub() {
	$("#itemcont,figure,.contentBody.video.uad.videoList02").find("a").each(function(){
	$(this).attr('target','_blank');})
}
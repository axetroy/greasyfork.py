// ==UserScript==
// @name        twitcasting_collapse_comment
// @namespace   http://catherine.v0cyc1pp.com/twitcasting_collapse_comment.user.js
// @include     http://twitcasting.tv/*
// @include     https://twitcasting.tv/*
// @include     https://ssl.twitcasting.tv/*
// @exclude     https://twitcasting.tv/
// @exclude     https://twitcasting.tv/?*
// @version     1.5
// @require     http://code.jquery.com/jquery-3.3.1.min.js
// @grant       none
// @run-at      document-end
// @description ツイキャスのコメント欄を非表示にする。
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);


//console.log("twitcasting_collapse_comment start");



function main() {
	// 隠すブロックの前に「コメントエリア (クリックで展開)」のヘッダをつける。
	$("div.tw-player-page__comment__list").before("<div class=\"header\" style=\"text-align: center;\"><span>コメントエリア (クリックで展開)</span>");

	// 隠すブロックをデフォルトで非表示にする。
	$("div.tw-player-page__comment__list").attr("style","display:none;clear:both;");

	$(".header").click(function () {

		$header = $(this);
		//getting the next element
		$content = $header.next();
		//open up the content needed - toggle the slide- if visible, slide up, if not slidedown.


		$content.slideToggle(200);


		/* ヘッダのテキストを変更する場合
		$content.slideToggle(500, function () {
			//execute this after slideToggle is done
			//change text of header based on visibility of content div
			$header.text(function () {
				//change text based on condition
				return $content.is(":visible") ? "Collapse" : "Expand";
			});
		});
		*/
	});
}

main();
/*
var observer = new MutationObserver(function(mutations) {
    observer.disconnect();
    main();
    observer.observe( document, config);
});
 
var config = { attributes: false, childList: true, characterData: false, subtree:true };
 
observer.observe( document, config);
*/

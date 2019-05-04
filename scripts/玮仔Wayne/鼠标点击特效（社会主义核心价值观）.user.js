// ==UserScript==
// @name         鼠标点击特效（社会主义核心价值观）
// @version      0.0.0.1
// @description  党的十八大报告提出，要大力加强社会主义核心价值体系建设，“倡导富强、民主、文明、和谐，倡导自由、平等、公正、法治，倡导爱国、敬业、诚信、友善，积极培育和践行社会主义核心价值观”。
// @author       WayneShao
// @include      /^https?\:\/\/[^\s]*/
// @grant        GM_addStyle
// @require      https://cdn.bootcss.com/jquery/2.2.0/jquery.min.js
// @run-at       document_start
// @grant        unsafeWindow
// @namespace https://greasyfork.org/users/194463
// ==/UserScript==

(function() {
	var click_cnt = 0;
    var shzyhxjzg = ["富强","民主","文明","和谐","自由","平等","公正","法治","爱国","敬业","诚信","友善"];
	var n = 22;
	jQuery(document).ready(function($) {
		$("html").click(function(e) {
			var $i;
			if (click_cnt % 12 < 12) {
				$i = $("<b></b>").text(shzyhxjzg[parseInt(click_cnt % 12)]);
			}
			click_cnt++;
			var x = e.pageX,
				y = e.pageY;
			$i.css({
				"z-index": 9999,
				"top": y - 13,
				"left": x - 20,
				"position": "absolute",
				"color": "#E94F06",
				"font-size": n,
				"-moz-user-select": "none",
				"-webkit-user-select": "none",
				"-ms-user-select": "none"
			});
			$("body").append($i);
			$i.animate({
				"top": y - 222,
				"opacity": 0
			}, 1888, function() {
				$i.remove();
			});
		});
	});
})();
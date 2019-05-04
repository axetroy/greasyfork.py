// ==UserScript==
// @name			什么值得买 浏览优化
// @namespace		http://tampermonkey.net/
// @version			0.75
// @description		一键 收藏 点赞 评论 页面优化增强
// @author			cuteribs
// @match			https://post.smzdm.com/*
// @match			https://test.smzdm.com/pingce/p/*
// @match			https://test.smzdm.com/pingce/preview/*
// @match			https://test.smzdm.com/user/zhongce/baogao
// @match			https://test.smzdm.com/user/zhongce/baogao/p*
// @match			https://zhiyou.smzdm.com/member/*
// @grant			GM.xmlHttpRequest
// @icon 			https://www.smzdm.com/favicon.ico
// ==/UserScript==

(function () {
	let addGlobalStyle = css => {
		$('<style type="text/css"></style>').html(css).appendTo($('head'));
	};

	// 值友原创列表
	let initMember = () => {
		let $ul = $('ul.navtab');
		let getText;

		switch ($ul.data('selecttab')) {
			case 'yuanchuang':
				getText = html => {
					let $zan = $(html).find('#experience-zan');
					let like = $zan.find('.Number').text().trim();
					let fav = $zan.find('.fav').text().trim();
					let comment = $zan.find('.comment').text().trim();
					return `<b style="margin-left: 100px">喜欢: ${like} &nbsp;|&nbsp; 收藏: ${fav} &nbsp;|&nbsp; 评论: ${comment}</b>`;
				};
				break;
			case 'baoliao':
				getText = html => {
					let like = $(html).find('#rating_worthy_num').text().trim();
					let dislike = $(html).find('#rating_unworthy_num').text().trim();
					let fav = $(html).find('.operate_box .fav').text().trim();
					let comment = $(html).find('.operate_box .commentNum').text().trim();
					return `<b style="margin-left: 100px">值: ${like} &nbsp;&nbsp;不值: ${dislike} &nbsp;|&nbsp; 收藏: ${fav} &nbsp;|&nbsp; 评论: ${comment}</b>`;
				};
				break;
			case 'pingce':
				getText = html => {
					let $box = $(html).find('.operate_box');
					let like = $box.find('.score_rateBox .grey em').text().trim();
					let fav = $box.find('.fav em').text().trim();
					let comment = $box.find('.comment em').text().trim();
					return `<b style="margin-left: 100px">喜欢: ${like} &nbsp;|&nbsp; 收藏: ${fav} &nbsp;|&nbsp; 评论: ${comment}</b>`;
				};
				break;
			default:
				return;
		}

		var $posts = $('.pandect-content-stuff');

		$.each($('.pandect-content-stuff'), (i, p) => {
			var $post = $(p);
			let url = $post.find('.pandect-content-title a').attr('href').replace('http:', 'https:');

			GM.xmlHttpRequest({
				method: 'GET',
				url: url,
				onload: res => {
					let text = getText(res.responseText.replace(/<img[^>]*>/g, ''));
					$(text).insertBefore($post.find('.pandect-content-time'));
				}
			});
		});
	};

	// 众测报告
	let initTestReport = () => {
		// #region addGlobalStyle
		addGlobalStyle(`
.myEvaluation p {
	font-size: 14px;
	line-height: 24px;
}
article h1.article_title {
	font-size: 28px;
}
article h2 {
	color: #333;
	font-size: 23px;
	padding-top: 34px;
	margin-top: -34px;
	padding-bottom: 5px;
	border-bottom: solid 1px #aaa;
}
article h3 {
	color: #333;
	font-size: 19px;
	text-shadow: 1px 2px #ccc;
}
article p img {
	margin: 0;
	background-color: #fff;
	box-shadow: 0px 0px 5px 1px rgba(0,0,0,.5);
	transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}
article .img_desc img {
	margin: 10px;
}
article p img:hover {
	box-shadow: 0px 0px 10px 5px rgba(0,0,0,.3);
}
article p img.face {
	padding: 0;
	margin: 0;
	background-color: unset;
	box-shadow: unset;
}
article .myEvaluation p {
	font-size: 14px;
	line-height: 24px;
}
article.da .myEvaluation p {
	font-size: 16px;
	line-height: 28px;
}
article.da .myEvaluation p {
	font-size: 16px;
	line-height: 28px;
}
a.reward-top {
	margin-left: 15px;
}
#textCommentSubmit {
	width: 80px;
}
#leftLayer {
	height: auto;
	border-bottom: solid 1px #dcdcdc;
}
#leftLayer a.fontsize i:before {
	content: "\\5927";
}
#leftLayer a.fontsize.da i:before {
	content: "\\5C0F";
}
#leftLayer a.fontsize em:before {
	content: "\\52A0\\5927";
}
#leftLayer a.fontsize.da em:before {
	content: "\\51CF\\5C0F";
}
.page_Tag {
	position: relative;
}
.page_Tag:hover>a {
	background-color: #f04848;
	border-color: #f04848;
	color: #fff!important;
}
.page_Tag:hover>a i {
	color: #fff!important;
}
.yc_list_catalogue {
	position: absolute;
	width: auto;
	left: 47px;
	top: -80px;
	background-color: #fff;
	border: 2px solid #dcdcdc;
	padding: 10px 0;
}
.yc_list_catalogue dd {
	margin: 0;
	padding: 10px 10px 10px 40px;
	position: relative;
}
.yc_list_catalogue dd h2 {
	font-size: 12px;
	font-weight: normal;
	margin-top: 0;
	margin-bottom: 0;
	font-family: Verdana;
	position: relative;
}
.yc_list_catalogue dd h2>i {
	position: absolute;
	width: 7px;
	height: 7px;
	background-color: #ccc;
	border-radius: 100%;
	left: -30px;
	top: 14px;
	border: 2px solid #fff;
	z-index: 1;
}
.yc_list_catalogue dd h2.active i {
	width: 15px;
	height: 10px;
	background-color: #f04848;
	border-radius: 0;
	left: -34px;
}
.yc_list_catalogue dd h2.active>i s {
	width: 0;
	height: 0;
	border-width: 5px;
	border-style: solid;
	border-color: transparent transparent transparent #f04848;
	position: absolute;
	right: -10px;
	top: 0;
}
.yc_list_catalogue dd h2.active a {
	color: #f04848;
}
.yc_list_catalogue dd a {
	border: 0;
	display: block;
	font-weight: normal;
	color: #666;
	width: auto;
	text-align: left;
	height: auto;
	max-height: 44px;
	overflow: hidden;
	line-height: 20px;
	white-space: nowrap;
	word-break: break-all;
}
.yc_list_catalogue dd a:hover {
	background-color: #fff;
	color: #f04848!important;
}
.yc_list_catalogue dd h2 a {
	font-weight: bold;
}
.yc_list_catalogue dd h3 a {
	padding-top: 0;
}
.yc_list_catalogue dd h2:hover i {
	background-color: #f04848!important;
}
.yc_list_catalogue dd>s {
	position: absolute;
	left: 15px;
	top: 0;
	height: 100%;
	width: 1px;
	background-color: #dcdcdc;
}
.yc_list_catalogue dd>s i {
	position: absolute;
	width: 7px;
	height: 7px;
	border: 2px solid #ccc;
	border-radius: 100%;
	left: -5px;
	background-color: #fff;
}
.yc_list_catalogue dd>s i.top {
	top: -5px;
}
.yc_list_catalogue dd>s i.bottom {
	bottom: -5px;
}
		`);
		// #endregion

		$('article.general_bg').removeClass('general_bg');
		let $leftWrap = $('div.left_wrap');

		// #region 众测预览页 fix
		if ($leftWrap.parent('div.content').length == 0) {
			$leftWrap.wrap('<div class="content"></div>');
			$('span.lFloat').wrap('<div class="user_list"></div>');
		}
		// #endregion

		let $layer = $('#leftLayer');

		if ($layer.length == 0) {
			$layer = $('<div id="leftLayer" class="leftLayer"></div>').insertAfter($('section.wrap'));
		}

		// #region 字体大小
		let $font = $('<a href="javascript:;" class="fontsize"><i class="icon-"></i><em></em></a>').prependTo($layer);
		let setFont = flag => {
			let $article = $('article');

			if (flag) {
				$font.attr('title', '字体减小').removeClass('da');
				$article.removeClass('da');
			} else {
				$font.attr('title', '字体加大').addClass('da');
				$article.addClass('da');
			}
		};

		$font.on('click', e => {
			let flag = localStorage.getItem('test-da');
			setFont(flag);
			localStorage.setItem('test-da', !flag);
		});

		let flag = localStorage.getItem('test-da');
		setFont(!flag);
		// #endregion

		// #region 头图显示
		let imageSrc = $('meta[property="og:image"]').attr('content');
		let $img = $('<img>').attr('src', imageSrc.replace('_e600', '_fo710')).prependTo($leftWrap);
		// #endregion

		// #region 目录导航
		var $h2s = $('article h2');

		if ($h2s.length > 0) {
			let $pageTag = $('<div class="page_Tag"></div>')
				.append($('<a href="javascript:;" title="目录" class="top_Tab"><i class="icon-directories"></i><em>目录</em></a>'))
				.append($('<dl class="yc_list_catalogue" style="display: none;"><dd></dd></dl>'))
				.prependTo($layer);
			let $catalog = $pageTag.children('.yc_list_catalogue');
			$pageTag.hover(() => $(".yc_list_catalogue").fadeIn(100), () => $(".yc_list_catalogue").fadeOut(100));
			var $dd = $catalog.children('dd').empty();

			$h2s.each((i, h) => {
				var h2Id = `cl_${i}`;
				let $h2 = $(h).attr('id', h2Id);

				if ($h2.text().trim()) {
					let $c2 = $('<h2></h2>').appendTo($dd);
					$(`<a href="#${h2Id}"><span>${$h2.text()}</span></a>`).appendTo($c2);
					$('<i><s></s></i>').appendTo($c2);

					$h2.nextUntil('h2').filter('h3').each((hi, h3) => {
						let h3Id = `${h2Id}_${hi}`;
						let $h3 = $(h3).attr('id', h3Id);

						if ($h3.text()) {
							let $a3 = $('<a></a>').attr('href', '#' + h3Id).text('└─ ' + $h3.text());
							$('<h3></h3>').append($a3).appendTo($dd);
						}
					});
				}
			});
		}
		// #endregion

		// #region 提交一波流
		var $commentButton = $('#textCommentSubmit');
		var $myButton = $('<button type="button" class="btn_sub" style="width: 100px; margin-right: 10px;">提交一波流</button>');
		$('#commentform .comment_share').append($myButton);

		$myButton.on('click', () => {
			let $fav = $layer.find('.fav');

			if (!$fav.hasClass('current')) {
				$fav.click();
			}

			// 点赞
			$('#details-zan .zan').click();

			// 关注作者
			if ($('.user_tx .tx_Name').text().trim() == '可爱的排骨') {
				let $focus = $('.user_tx .J_user_focus');

				if ($focus.text() == '+关注') {
					$focus.click();
				}
			}

			// 评论
			var $commentText = $('#textareaComment');
			if ($.trim($commentText.val()) == '' || $.trim($commentText.val()) == $commentText.attr('default_data')) {
				$commentText.val('纯支持路过一波. 紫苏布丁[观察]');
			}

			$commentButton.click();
		});
		// #endregion
	};

	// 我的众测报告
	let initTestReports = () => {
		// #region addGlobalStyle
		addGlobalStyle(`
		.user_application .my_evaluation li {
			padding: 15px;
		}
		.user_application li img {
			width: 150px;
			height: 150px;
		}
		.user_application li .list_title a {
			overflow: unset;
			display: inline;
			font-size: 18px;
		}
		`);
		// #endregion
	};

	// 原创首页
	let initPostMain = () => {
		// #region addGlobalStyle
		addGlobalStyle(`
.feed-grid-wrap #feed-main-list .z-feed-content .z-feed-title {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
}
.feed-grid-wrap #feed-main-list .z-group-data {
	width: 54px;
}
.feed-grid-wrap #feed-main-list .z-group-data:first-child {
	display: inline-block;
}
.feed-row-wide .z-type-red {
	padding: 0 4px;
	margin-right: 0;
	color: #fff;
	background-color: #f04848;
	font-size: 13px;
	border: 0;
}
.feed-row-wide .z-type-yellow {
	padding: 0 4px;
	margin-right: 0;
	color: #fff;
	background-color: #f98554;
	font-size: 13px;
	border: 0;
}
.z-avatar-black {
	color: #fff;
	margin-left: -20px;	
}
.z-avatar-black:hover {
	color: #000;
}
.feed-grid-wrap #feed-main-list .z-avatar-name {
	color: #fff;
	text-shadow: #000 1px 0 10px;
}
.feed-grid-wrap #feed-main-list .z-avatar-name.black {
	color: #000;
	text-shadow: #fff 1px 0 10px;
}
		`);
		// #endregion

		// #region 广告位/黑名单开关
		let $head = $('#sub-head');
		let $slick = $('li.feed-row-wide:has(div.feed-list-slick)');
		let $span = $('<span></span>');
		let $icon = $('<i></i>').addClass('z-icon-discover');

		let $swicth = $('<a></a>').append($span).append($icon).on('click', (e) => {
			e.preventDefault();
			let visible = localStorage.getItem('visible');

			if (visible == 0) {
				localStorage.setItem('visible', 1);
				$head.show();
				$slick.show();
				$span.text('隐藏 ');
				$icon.css('color', '#777');
				setBlackList(false);
			} else {
				localStorage.setItem('visible', 0);
				$head.hide();
				$slick.hide();
				$span.text('显示 ');
				$icon.css('color', '');
				setBlackList(true);
			}
		});

		let $feedList = $('#feed-main-list');

		let setBlackList = (isOn) => {
			$feedList.find('a.z-avatar-black').each((i, a) => {
				var userId = $(a).data('userid');
				var $li = $(a).parents('li');

				if (blackList.includes(userId)) {
					if (isOn) {
						$li.hide();
					} else {
						$li.show();
					}
				}
			});
		};

		let visible = localStorage.getItem('visible');

		if (visible == 1) {
			$head.show();
			$span.text('隐藏 ');
			$icon.css('color', '#777');
		} else {
			$head.hide();
			$span.text('显示 ');
			$icon.css('color', '');
		}

		$('#global-nav .nav-list').append($('<li></li>').append($swicth));
		// #endregion

		// #region 文章列表
		var blackList = window.blackList = JSON.parse(localStorage.getItem('blackList')) || [];

		let setFeed = (list) => {
			for (let li of list) {
				if (li.tagName != 'LI') {
					continue;
				}

				let $li = $(li);
				let $red = $li.find('.z-feed-title .z-type-red').text('精');
				let $yellow = $li.find('.z-feed-title .z-type-yellow').text('众');
				let $a = $li.find('.z-feed-title a');

				if (!$a.attr('title')) {
					$a.parent().attr('title', $a.text());
				}

				let like = parseInt($li.find('.z-feed-foot a:nth-child(2) span:last-child').text());
				let fav = parseInt($li.find('.z-feed-foot a:nth-child(3) span:last-child').text());
				let comment = parseInt($li.find('.z-feed-foot a:nth-child(4) span:last-child').text());
				let $hot = $li.find('.z-group-data:first-child');
				$hot.attr('title', '热度').css('color', '#f00');
				$hot.children('i').removeClass('z-icon-gold').addClass('z-icon-caishangjingxuan');
				$hot.children('span').text(like + fav + comment);

				var $aName = $li.find('a.z-avatar-name');
				var url = $aName.attr('href');
				var index2 = url.lastIndexOf('/');
				var index1 = url.lastIndexOf('/', index2 - 1);
				var userId = url.substring(index1 + 1, index2);

				var $aBlack = $('<a class="z-avatar-black"><i class="z-icons z-icon-hot-brand"></i></a>')
					.data('userid', userId)
					.data('name', $aName.text())
					.on('click', e => {
						var $a = $(e.target).parent('a');
						var $aName = $a.prev('a.z-avatar-name');
						var userId = $a.data('userid');
						var name = $a.data('name');

						if (blackList.includes(userId) && window.confirm(`要把 ${name} 移出黑名单吗?`)) {
							blackList.splice(blackList.indexOf(userId), 1);
							$aName.removeClass('black');
							localStorage.setItem('blackList', JSON.stringify(blackList));
						} else if (!blackList.includes(userId) && window.confirm(`要把 ${name} 放入黑名单吗?`)) {
							blackList.push(userId);
							$aName.addClass('black');
							localStorage.setItem('blackList', JSON.stringify(blackList));
						}
					}).insertAfter($aName);

				if (blackList.includes(userId)) {
					$aName.addClass('black');

					let visible = localStorage.getItem('visible');
					if (visible == 1) {
						// $li.show();
					} else {
						$li.hide();
					}
				}
			}
		};

		setFeed($feedList.children('li'));

		if ($feedList.length > 0) {
			let observer = new MutationObserver(list => {
				setFeed(list[0].addedNodes);
			}).observe($feedList[0], {
				childList: true
			});
		}
		// #endregion
	};

	// 原创文章
	let initPostArticle = () => {
		// #region addGlobalStyle
		addGlobalStyle(`
#yc_leftLayer {
	height: auto;
	display: block;
	border-bottom: solid 1px #dcdcdc;
}
#yc_leftLayer a.fontsize i:before {
	content: "\\5927"
}
#yc_leftLayer a.fontsize em:before {
	content: "\\52a0\\5927"
}
#yc_leftLayer a.fontsize.da i:before {
	content: "\\5c0f"
}
#yc_leftLayer a.fontsize.da em:before {
	content: "\\51cf\\5c0f"
}
.yc_list_catalogue {
	width: auto;
	top: -80px;
	border-width: 2px;
}
.yc_list_catalogue dd h2 {
	margin-top: 0;
	margin-bottom: 0;
}
.yc_list_catalogue dd h2 a {
	white-space: nowrap;
	font-weight: bold;
	width: auto;
}
.yc_list_catalogue dd h3 a {
	white-space: nowrap;
	padding-top: 0;
	width: auto;
}
.detailed article {
	overflow: unset;
}
.detailed article h2 {
	font-size: 23px;
	padding-top: 34px;
	margin-top: -34px;
	padding-bottom: 5px;
	border-bottom: solid 1px #aaa;
}
.detailed article h3 {
	font-size: 19px;
	text-shadow: 1px 2px #ccc;
}
.detailed article p img {
	margin: 0;
	background-color: #fff;
	box-shadow: 0px 0px 5px 1px rgba(0,0,0,.5);
	transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}
.detailed article p img:hover {
	box-shadow: 0px 0px 10px 5px rgba(0,0,0,.3);
}
.detailed article p img.face {
	padding: 0;
	margin: 0;
	background-color: unset;
	box-shadow: unset;
}
.detailed article span.img_desc img {
	margin: 10px;
}
.detailed article.da p {
	font-size: 16px;
	line-height: 28px;
}
div.experience_meta_nowrap .meta-tags:nth-child(1n) {
	border: 1px solid #6fa3ef;
	background: #6fa3ef
}
div.experience_meta_nowrap .meta-tags:nth-child(2n) {
	border: 1px solid #ff9800;
	background: #ff9800
}
div.experience_meta_nowrap .meta-tags:nth-child(3n) {
	border: 1px solid #46c47c;
	background: #46c47c
}
div.experience_meta_nowrap .meta-tags:nth-child(4n) {
	border: 1px solid #f9bb3c;
	background: #f9bb3c
}
div.experience_meta_nowrap .meta-tags:nth-child(5n) {
	border: 1px solid #bc99c4;
	background: #bc99c4
}
div.experience_meta_nowrap .meta-tags:nth-child(6n) {
	border: 1px solid #e8583d;
	background: #e8583d
}
div.experience_meta_nowrap .meta-tags a {
	color: #fff;
}
#textCommentSubmit {
	width: 80px;
}
		`);
		// #endregion

		let $layer = $('#yc_leftLayer');

		if ($layer.length == 0) {
			$layer = $('<div id="yc_leftLayer" class="leftLayer"></div>').insertAfter($('section.wrap'));
		}

		// #region 目录导航
		let $pageTag = $layer.find('.page_Tag');

		if ($pageTag.length == 0) {
			$pageTag = $('<div class="page_Tag"></div>')
				.append($('<a href="javascript:;" class="top_Tab" title="目录"><i class="icon-directories"></i><em>目录</em></a>'))
				.append($('<dl class="yc_list_catalogue" style="display: none;"><dd></dd></dl>'))
				.prependTo($layer);

			$pageTag.hover(() => $(".yc_list_catalogue").fadeIn(100), () => $(".yc_list_catalogue").fadeOut(100));
		}

		var $h2s = $('article h2');

		if ($h2s.length > 0) {
			$pageTag.find('.top_Tab').attr('title', '目录');
			let $catalog = $pageTag.children('.yc_list_catalogue');
			let $c2s = $catalog.find('dd>h2');

			if ($c2s.length == 0) {
				let $dd = $catalog.children('dd').empty();

				$h2s.each((i, h) => {
					var h2Id = `cl_${i}`;
					let $h2 = $(h).attr('id', h2Id);

					if ($h2.text().trim()) {
						let $c2 = $('<h2></h2>').appendTo($dd);
						$(`<a href="#${h2Id}"><span>${$h2.text()}</span></a>`).appendTo($c2);
						$('<i><s></s></i>').appendTo($c2);

						$h2.nextUntil('h2').filter('h3').each((hi, h3) => {
							let h3Id = `${h2Id}_${hi}`;
							let $h3 = $(h3).attr('id', h3Id);

							if ($h3.text()) {
								let $a3 = $('<a></a>').attr('href', '#' + h3Id).text('└─ ' + $h3.text());
								$('<h3></h3>').append($a3).appendTo($dd);
							}
						});
					}
				});
			} else {
				$c2s.each((i, c2) => {
					let $c2 = $(c2);
					let $a2 = $c2.children('a');
					let $h2 = $($a2.attr('href'));
					let $c3 = $c2;

					$h2.nextUntil('h2').filter('h3').each((hi, h3) => {
						let h3Id = `${$h2.attr('id')}_${hi}`;
						let $h3 = $(h3).attr('id', h3Id);
						if ($h3.text()) {
							$c3 = $('<h3></h3>').insertAfter($c3);
							let $a3 = $('<a></a>').attr('href', '#' + h3Id).text('└─ ' + $h3.text()).appendTo($c3);
						}
					});
				});
			}
		}
		// #endregion

		// #region 字体大小
		let $font = $('<a href="javascript:;" class="fontsize"><i class="icon-"></i><em></em></a>').insertAfter($pageTag);
		let setFont = flag => {
			let $article = $('article');

			if (flag) {
				$font.attr('title', '字体减小').removeClass('da');
				$article.removeClass('da');
			} else {
				$font.attr('title', '字体加大').addClass('da');
				$article.addClass('da');
			}
		};

		$font.on('click', e => {
			let flag = localStorage.getItem('post-da');
			setFont(flag);
			localStorage.setItem('post-da', !flag);
		});

		let flag = localStorage.getItem('post-da');
		setFont(!flag);
		// #endregion

		// #region 提交一波流
		var $commentButton = $('#textCommentSubmit');
		var $myButton = $('<button type="button" class="btn_sub" style="width: 100px; margin-right: 10px;">提交一波流</button>');
		$('#commentform .comment_share').append($myButton);

		$myButton.on('click', () => {
			let $fav = $layer.find('.fav');

			if (!$fav.hasClass('current')) {
				$fav.click();
			}

			// 点赞
			$('#experience-zan .reward_zan').click();

			// 关注作者
			if ($('.user_tx .tx_Name').text().trim() == '可爱的排骨') {
				let $focus = $('.user_tx .J_user_focus');

				if ($focus.text() == '+关注') {
					$focus.click();
				}
			}

			// 评论
			var $commentText = $('#textareaComment');
			if ($.trim($commentText.val()) == '' || $.trim($commentText.val()) == $commentText.attr('default_data')) {
				$commentText.val('纯支持路过一波. 紫苏布丁[观察]');
			}

			$commentButton.click();
		});
		// #endregion

		// #region 评论贴图
		var regex = /https\:\/\/\w+\.zdmimg\.com\/\d{6}\/\d{2}\/[\d\w\._]+/gm;

		$('#comments .comment_list .comment_con span').each((i, el) => {
			var $span = $(el);
			var text = $span.text();
			var matches = text.match(regex);

			if (!matches) {
				return;
			}

			for (var j = 0; j < matches.length; j++) {
				var img = `<img src="${matches[j].substring(0, matches[j].length)}" />`;
				var html = text.replace(matches[j], img);
				$span.html(html);
			}
		});
		// #endregion
	};

	let init = () => {
		let path = location.pathname;

		switch (location.host) {
			case 'zhiyou.smzdm.com':
				initMember();
				break;
			case 'test.smzdm.com':
				if (path.indexOf('/user/zhongce/baogao') == 0) {
					initTestReports();
				} else if (path.indexOf('/pingce/p/') == 0 || path.indexOf('/pingce/preview/') == 0) {
					initTestReport();
				}
				break;
			case 'post.smzdm.com':
				if (path.indexOf('/p/') == 0 || path.indexOf('/detail_preview/') == 0) {
					initPostArticle();
				} else {
					initPostMain();
				}
				break;
		}
	};

	init();
})();
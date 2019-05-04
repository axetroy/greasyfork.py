// ==UserScript==
// @name        niconico リンクを修正
// @name:ja     niconico リンクを修正
// @description Replaces JavaScript links with HTML links in Niconico.
// @description:ja JavaScriptのリンクを通常のリンクに置き換えます。
// @namespace   https://userscripts.org/users/347021
// @version     2.1.1
// @match       http://www.nicovideo.jp/*
// @match       http://live.nicovideo.jp/*
// @match       http://watch.live.nicovideo.jp/*
// @match       http://live2.nicovideo.jp/watch/*
// @match       http://ch.nicovideo.jp/*
// @match       http://seiga.nicovideo.jp/search/*
// @match       http://app.nicovideo.jp/*
// @match       http://ichiba.nicovideo.jp/*
// @match       http://uad.nicovideo.jp/*
// @match       http://jk.nicovideo.jp/*
// @match       http://commons.nicovideo.jp/*
// @match       http://com.nicovideo.jp/*
// @match       http://news.nicovideo.jp/*
// @match       http://nivent.nicovideo.jp/*
// @require     https://bowercdn.net/c/css-escape-1.5.1/css.escape.js
// @require     https://greasyfork.org/scripts/17895/code/polyfill.js?version=172152
// @require     https://greasyfork.org/scripts/19616/code/utilities.js?version=141951
// @license     Mozilla Public License Version 2.0 (MPL 2.0); https://www.mozilla.org/MPL/2.0/
// @compatible  Edge 非推奨 / Deprecated
// @compatible  Firefox Tampermonkey BETA の利用は非推奨 / Tampermonkey BETA is depricated
// @compatible  Opera
// @compatible  Chrome
// @grant       dummy
// @icon        data:image/vnd.microsoft.icon;base64,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
// @author      100の人
// @homepage    https://greasyfork.org/scripts/260
// ==/UserScript==

(function () {
'use strict';

/**
 * 通知ボタンのリンク先にするURL。
 * @constant {string}
 */
const NOTIFICATION_BUTTON_LINK = 'http://uad.nicovideo.jp/#ticket-detail';

switch (location.host) {
	case 'www.nicovideo.jp':
		// 動画
		if (location.pathname.startsWith('/watch/')) {
			let tagList = document.getElementById('videoHeaderTagList');
			if (tagList) {
				// タグ
				tagList.addEventListener('click', function (event) {
					if (event.target.classList.contains('videoHeaderTagLink')) {
						// タグリンクのクリックなら
						event.stopPropagation();
					}
				}, true);

				// マイリストリンク
				document.getElementsByClassName('videoDescription')[0].addEventListener('click', function (event) {
					event.target.classList.remove('mylistLinkButton');
				}, true);

				// 投稿者の関連動画
				let ownerVideosLink = document.getElementsByClassName('showOtherVideos')[0];
				let ownerLink = document.getElementsByClassName('userName')[0];
				ownerVideosLink.href = ownerLink.href + '/mylist';
				new MutationObserver(function () {
					ownerVideosLink.href = ownerLink.href + '/mylist';
				}).observe(document.getElementsByClassName('userName')[0], { attributes: true });
				document.getElementsByClassName('showOtherVideos')[0].parentNode
					.addEventListener('click', function (event) {
						event.stopPropagation();
					}, true);
			}
		}
		break;

	case 'live.nicovideo.jp':
	case 'watch.live.nicovideo.jp':
		// 生放送
		// 共通ヘッダの「フォロー中」ボタン
		let notifyboxToggleButton = document.querySelector('#notify_box_count > a');
		if (notifyboxToggleButton) {
			notifyboxToggleButton.href = '/my#Favorite_list';
		}

		let pathname = location.pathname;
		if (pathname === '/my') {
			// マイページの自分の放送
			for (let anchor of document.querySelectorAll('.nml[onclick^="window.open("]')) {
				anchor.href = /http:\/\/live\.nicovideo\.jp\/[^']+/.exec(anchor.onclick)[0];
				anchor.onclick = null;
			}
		} else if (pathname.startsWith('/watch/')) {
			let zappingArea = document.getElementById('zapping_area_inner');
			if (zappingArea) {
				document.head.insertAdjacentHTML('beforeend', `<style>
					/* a要素をブロック要素ボックスに、来場者数の下線を削除 */
					#zapping_area_inner .zapping_stream_inner {
						display: block;
						text-decoration: none;
					}
					/* コミュアイコン以外の部分にカーソルが重なった時もアイコンを暗くする */
					#zapping_area_inner .zapping_stream_inner:hover img {
						opacity: 0.7;
					}
				</style>`);
				new MutationObserver(function (mutations) {
					for (let mutation of mutations) {
						let stream = mutation.addedNodes[0];
						if (stream && stream.classList.contains('zapping_stream')) {
							let streamInner = stream.firstElementChild;
							let anchor = document.createElement('a');
							anchor.href = '/watch/' + /lv[0-9]+/.exec(stream.className)[0];
							anchor.className = streamInner.className;
							anchor.title = streamInner.title;
							anchor.append(...streamInner.childNodes);
							streamInner.replaceWith(anchor);
						}
					}
				}).observe(zappingArea, { childList: true });
			}
		}
		break;

	case 'live2.nicovideo.jp':
		// 新配信（β）
		// 共通ヘッダの「フォロー中」ボタン
		let favoriteNotification = document.getElementById('favoriteNotification');
		let favoriteNotificationButton;
		if (favoriteNotification) {
			favoriteNotificationButton = favoriteNotification.getElementsByTagName('a')[0];
			favoriteNotificationButton.href = '//live.nicovideo.jp/my#Favorite_list';
			new MutationObserver(function (mutations) {
				if (mutations[0].removedNodes[0]) {
					favoriteNotificationButton.href = '//live.nicovideo.jp/my#Favorite_list';
				}
			}).observe(favoriteNotification.firstElementChild, {childList: true});
		}

		document.addEventListener('click', function (event) {
			if (event.target.matches('#favoriteNotification > * > a, #favoriteNotification > * > a *')) {
				// 共通ヘッダの「フォロー中」ボタン
				if (event.button === 0 && (event.ctrlKey || event.shiftKey || event.altKey) || event.button === 1) {
					favoriteNotificationButton.href = '//live.nicovideo.jp/my#Favorite_list';
					event.stopPropagation();
				} else if (event.button === 0) {
					event.preventDefault();
					favoriteNotificationButton.removeAttribute('href');
				}
			} else if (event.target.matches('.zapping-list > .item > a, .zapping-list > .item > a *')) {
				// ザッピング表示
				if (event.button === 0
						&& (event.ctrlKey || event.shiftKey || event.altKey
							|| event.target.closest('a').host !== 'live2.nicovideo.jp')
					|| event.button === 1) {
					event.stopPropagation();
				}
			}
		}, true);
		break;

	case 'ch.nicovideo.jp':
		if (/^\/[^/]+\/blomaga\/ar[0-9]+(?:\/.*)?$/.test(location.pathname)) {
			// ブロマガの記事
			// 画像の原寸表示リンク
			for (let image of document.querySelectorAll(`.main_blog_txt img[src*="nicovideo.jp/image/"],
				.main_blog_txt img[data-original*="nicovideo.jp/image/"]`)) {
				if (!image.matches('a img')) {
					let anchor = document.createElement('a');
					anchor.href = image.src || image.dataset.original;
					anchor.target = '_blank';
					image.before(anchor);
					anchor.append(image);
				}
			}

			if (document.getElementsByClassName('attached_image')[0]) {
				// Tampermonkey
				GreasemonkeyUtils.executeOnUnsafeContext(/*globals jQuery */ function () {
					jQuery('.attached_image').unbind('click');
				});
			}
		}
		break;
}

// 共通ヘッダのニコられた数ボタン
let notificationButton = document.getElementsByClassName('siteHeaderNotNotifications')[0];
if (notificationButton) {
	// すでにボタンが挿入されていれば
	observeNicoruButton(notificationButton);
} else {
	let siteHeaderNotificationContainer = document.getElementById('siteHeaderNotificationContainer');
	if (siteHeaderNotificationContainer) {
		// ボタンの挿入を待機
		new MutationObserver(function (mutations, observer) {
			observer.disconnect();
			observeNicoruButton(mutations[0].addedNodes[0]);
		}).observe(siteHeaderNotificationContainer, { childList: true });
	}
}

// 主クリック時のページ遷移防止
let siteHeaderMenuList = document.getElementsByClassName('siteHeaderMenuList')[0];
if (siteHeaderMenuList) {
	siteHeaderMenuList.addEventListener('click', function (event) {
		if (event.button === 0 && event.target.matches(
			`[href="${CSS.escape(NOTIFICATION_BUTTON_LINK)}"], [href="/my#Favorite_list"], [href="/my#Favorite_list"] *`
		)) {
			event.preventDefault();
		}
	});
}

/**
 * ニコられた数ボタンを監視し、ボタンの数字にリンクを張ります。
 * @param {HTMLSpanElement} notificationButton
 */
function observeNicoruButton(notificationButton)
{
	// スタイルシートの設定
	document.head.insertAdjacentHTML('beforeend', `<style>
		#siteHeaderNotification #siteHeaderNotificationContainer .siteHeaderNotNotifications,
		#siteHeaderNotification #siteHeaderNotificationContainer .siteHeaderNotifications {
			border: none;
			padding: 0;
		}
		#siteHeader #siteHeaderInner #siteHeaderNotificationContainer > span a {
			font-size: 1em;
			border-radius: 50%;
			padding: 1px 4px;
			border: solid 2px white !important;
			margin-right: 0;
			background: inherit;
		}
	</style>`);

	fixNicoruLink();

	// ボタンがクリックされるたびに書き換わるので、その都度{@link fixNicoruLink}を実行する
	new MutationObserver(function (mutations, observer) {
		let addedNode = mutations[0].addedNodes[0];
		if (addedNode && addedNode.nodeType === Node.TEXT_NODE) {
			fixNicoruLink();
		}
	}).observe(notificationButton, { childList: true });

	/**
	 * ボタンの数字にリンクを張ります。
	 */
	function fixNicoruLink()
	{
		let anchor = document.createElement('a');
		anchor.href = NOTIFICATION_BUTTON_LINK;
		anchor.append(...notificationButton.childNodes);
		notificationButton.append(anchor);
	}
}

})();

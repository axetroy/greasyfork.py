// ==UserScript==
// @name        pixiv Tabs Restorer
// @name:ja     pixiv タブを復活
// @description Adds “All”, “Follow”, “My pixiv”, and “Tag Index” tabs to user pages etc. and “Illustrations”, “Manga”, and “Ugoira” tabs to search result pages.
// @description:ja ユーザーページなどに「すべて」「フォロー」「マイピク」「タグ一覧」タブを、検索結果に「イラスト」「マンガ」「うごイラ」タブを補完します。
// @namespace   https://greasyfork.org/users/137
// @version     1.1.1
// @match       https://www.pixiv.net/*
// @exclude     https://www.pixiv.net/member_illust.php?*mode=manga*
// @exclude     https://www.pixiv.net/apps.php*
// @require     https://greasyfork.org/scripts/19616/code/utilities.js?version=230651
// @require     https://greasyfork.org/scripts/17896/code/start-script.js?version=112958
// @license     MPL-2.0
// @compatible  Edge 最新安定版 / Latest stable (非推奨 / Deprecated)
// @compatible  Firefox
// @compatible  Opera
// @compatible  Chrome
// @grant       dummy
// @noframes
// @run-at      document-start
// @icon        data:image/vnd.microsoft.icon;base64,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
// @author      100の人
// @homepageURL https://greasyfork.org/users/137
// ==/UserScript==

(function () {
'use strict';

// L10N
Gettext.setLocalizedTexts({
	/*eslint-disable quote-props, max-len */
	'en': {
		'すべて': 'All',
		'フォロー': 'Follow',
		'マイピク': 'My pixiv',
		'タグ一覧': 'Tag Index',
		'イラスト': 'Illustrations',
		'マンガ': 'Manga',
		'うごイラ': 'Ugoira',
	},
	'ko': {
		'すべて': '전체',
		'フォロー': '팔로우',
		'マイピク': '마이픽',
		'タグ一覧': '태그 목록',
		'イラスト': '일러스트',
		'マンガ': '만화',
		'うごイラ': '움직이는 일러스트',
	},
	'zh': {
		'すべて': '全部',
		'フォロー': '关注',
		'マイピク': '好P友',
		'タグ一覧': '标签一览',
		'イラスト': '插画',
		'マンガ': '漫画',
		'うごイラ': '动图',
	},
	'zh-tw': {
		'すべて': '全部',
		'フォロー': '關注',
		'マイピク': '好P友',
		'タグ一覧': '標籤一覽',
		'イラスト': '插畫',
		'マンガ': '漫畫',
		'うごイラ': '動圖',
	},
	/*eslint-enable quote-props, max-len */
});

class UserPageTabCompleter
{
	/**
	 * @access private
	 * @constant {number}
	 */
	static get URLS_AND_LABLES() {return [
		{ path: '/member_illust.php', label: _('すべて'), afterUserPageTab: true },
		{ path: '/bookmark.php', type: 'user', label: _('フォロー') },
		{ path: '/mypixiv_all.php', label: _('マイピク') },
		{ path: '/member_tag_all.php', label: _('タグ一覧') },
	];}

	constructor()
	{
		const root = document.getElementById('root');
		if (!root) {
			return;
		}

		Gettext.setLocale(document.documentElement.lang);

		// カレントタブのスタイル切り替え
		addEventListener('click', event => {
			if (!event.defaultPrevented || !event.target.matches('#root > :not(header) nav > a')) {
				return;
			}

			for (const tab of event.target.parentElement.querySelectorAll('[aria-current]')) {
				if (tab.href !== location.href) {
					tab.removeAttribute('aria-current');
					tab.classList.remove(...this.currentTabClasses);
				}
			}

			if (!event.target.hasAttribute('aria-current')) {
				event.target.setAttribute('aria-current', 'page');
				event.target.classList.add(...this.currentTabClasses);
			}
		});

		new MutationObserver(mutations => {
			for (const mutation of mutations) {
				let findChild;
				if (mutation.target.matches('#root > div[class] > div[class]')) {
					findChild = node => node.localName === 'div' && node.hasAttribute('class');
				} else if (mutation.target.matches('#root > div[class] > div[class] > div[class]')) {
					//
					findChild = node => node.localName === 'nav';
				}
				if (!findChild) {
					continue;
				}

				const parent = Array.from(mutation.addedNodes).find(findChild);
				if (parent) {
					if (parent.querySelector('[href*="/mypixiv_all.php?"]')) {
						return;
					}
					this.complete();
					return;
				}
			}
		}).observe(root, {childList: true, subtree: true});
	}

	/**
	 *
	 * @access private
	 */
	async complete()
	{
		const list = document.querySelector('#root > :not(header) nav');
		if (!this.currentTabClasses) {
			const currentTab = list.querySelector('[aria-current="page"]');
			const noCurrentTabClassList = Array.from(Array.from(list.children).find(tab => tab !== currentTab).classList);
			this.currentTabClasses = Array.from(currentTab.classList).filter(token => !noCurrentTabClassList.includes(token));
		}

		const userPageTab = list.firstElementChild;

		const templateTab = userPageTab.cloneNode(true);
		templateTab.removeAttribute('aria-current');
		templateTab.classList.remove(...this.currentTabClasses);
		const param = new URLSearchParams(userPageTab.search);

		for (const {path, type, label, afterUserPageTab} of UserPageTabCompleter.URLS_AND_LABLES) {
			let tab;
			if (path === '/member_illust.php') {
				tab = document.querySelector('[href^="/member_illust.php?id="]:not([href*="type="])');
				if (tab) {
					tab.classList = templateTab.classList;
				}
			}

			if (!tab) {
				tab = templateTab.cloneNode(true);
			}

			tab.pathname = path;
			if (type) {
				param.set('type', type);
				tab.search = param;
			}
			tab.text = label;
			if (afterUserPageTab) {
				userPageTab.after(tab);
			} else {
				list.append(tab);
			}
		}

		if (userPageTab.hasAttribute('aria-current') && location.pathname === '/member_illust.php') {
			userPageTab.replaceWith(templateTab);
			const illustAndMangaTab = list.querySelector('[href*="/member_illust.php"]:not([href*="type="])');
			illustAndMangaTab.setAttribute('aria-current', 'page');
			illustAndMangaTab.classList.add(...this.currentTabClasses);
		}
	}
}

if (['/search.php', '/novel/search.php', '/search_user.php'].includes(location.pathname)) {
	startScript(
		function () {
			Gettext.setLocale(document.documentElement.lang);

			const typesAndLabels = [
				{ type: 'illust', label: _('イラスト') },
				{ type: 'manga' , label: _('マンガ') },
				{ type: 'ugoira', label: _('うごイラ') },
			];

			const list = document.getElementsByClassName('tabs')[0];
			const allTab = list.firstElementChild;
			const afterTab = allTab.nextElementSibling;

			const allTabAnchor = allTab.getElementsByTagName('a')[0];
			const query = new URLSearchParams(allTabAnchor.search);
			query.delete('p');

			const currentType = new URLSearchParams(location.search).get('type');

			for (const {type, label} of typesAndLabels) {
				const tab = allTab.cloneNode(true);
				const anchor = tab.getElementsByTagName('a')[0];
				query.set('type', type);
				anchor.search = query;
				anchor.text = label;
				anchor.classList[currentType === type ? 'add' : 'remove']('current');
				afterTab.before(tab);
			}

			allTabAnchor.text = _('すべて');
			if (list.getElementsByClassName('current').length > 1) {
				allTabAnchor.classList.remove('current');
			}
		},
		parent => parent.classList.contains('tabs'),
		target => target.previousElementChild,
		() => document.querySelector('.tabs > li:nth-of-type(2)')
	);
} else {
	document.addEventListener('DOMContentLoaded', function () {
		new UserPageTabCompleter();
	}, { passive: true, once: true });
}

})();
	
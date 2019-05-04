// ==UserScript==
// @name        pixiv タグクラウドからピックアップ
// @name:ja     pixiv タグクラウドからピックアップ
// @name:en     pixiv Tag Cloud Prioritizer
// @description If there are tags attached to a work, this script brings those tags to the top of the tag cloud (illustration or novel tags column) on the left.
// @description:ja 作品左側のタグクラウド (作品タグ) から、閲覧中の作品についているタグと同じものをピックアップします。
// @namespace   https://userscripts.org/users/347021
// @version     2.2.0
// @include     https://www.pixiv.net/member_illust.php?*mode=medium*
// @include     https://www.pixiv.net/novel/show.php?*id=*
// @require     https://cdn.rawgit.com/greasemonkey/gm4-polyfill/d58c4f6fbe5702dbf849a04d12bca2f5d635862d/gm4-polyfill.js
// @require     https://greasyfork.org/scripts/17895/code/polyfill.js?version=172152
// @require     https://greasyfork.org/scripts/17896/code/start-script.js?version=112958
// @license     Mozilla Public License Version 2.0 (MPL 2.0); https://www.mozilla.org/MPL/2.0/
// @compatible  Edge 非推奨 / Deprecated
// @compatible  Firefox 次のサイトのサードパーティCookieを許可する必要があります / You need to allow third-party cookies from the following sites: https://www.pixiv.net
// @compatible  Opera
// @compatible  Chrome
// @grant       GM.setValue
// @grant       GM_setValue
// @grant       GM.getValue
// @grant       GM_getValue
// @grant       GM.deleteValue
// @grant       GM_deleteValue
// @grant       GM.listValues
// @grant       GM_listValues
// @noframes
// @run-at      document-start
// @icon        data:image/vnd.microsoft.icon;base64,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
// @author      100の人
// @homepage    https://greasyfork.org/scripts/262
// ==/UserScript==

(function () {
'use strict';

/**
 * タグ一覧ページをキャッシュしておく期間 (秒数)。
 * @type {number}
 */
const CACHE_LIFETIME = 24 * 60 * 60;

/**
 * 秒をミリ秒に変換するときの乗数。
 * @type {number}
 */
const MINUTES_TO_MILISECONDS = 1000;

/**
 * 小説ページなら真。
 * @type {boolean}
 */
const NOVEL = window.location.pathname === '/novel/show.php';

/**
 * タグ一覧ページをキャッシュする名前の接尾辞。
 * @type {string}
 */
const CACHE_NAME_SUFFIX = (NOVEL ? '-novel' : '') + '-tags';

/**
 * タグ一覧ページのキャッシュ期限を記録する名前の接尾辞。
 * @type {string}
 */
const CACHE_EXPIRE_NAME_SUFFIX = (NOVEL ? '-novel' : '') + '-expire';

const viewMypixivs = document.getElementsByClassName('view_mypixiv');
startScript(
	main,
	parent => parent.classList.contains('area_inside'),
	target => target.classList.contains('view_mypixiv'),
	() => viewMypixivs[0],
	{
		isTargetParent: parent => parent.classList.contains('ui-layout-west'),
		isTarget: target => target.classList.contains('user-tags'),
	}
);

const allTagsPromise = async function () {
	let nextCleaningDate = await GM.getValue('next-cleaning-date');
	if (nextCleaningDate) {
		if (new Date(nextCleaningDate).getTime() < Date.now()) {
			// 予定時刻を過ぎていれば、古いキャッシュを削除
			const names = await GM.listValues();
			for (const name of names) {
				if (name && name.endsWith('-expire')) {
					if (new Date(await GM.getValue(name)).getTime() < Date.now()) {
						// キャッシュの有効期限が切れていれば
						await GM.deleteValue(name);
						const tagsName = name.replace('-expire', '-tags');
						await GM.deleteValue(tagsName);
						names[names.indexOf(tagsName)] = null;
					}
				}
			}
			nextCleaningDate = null;
		}
	} else {
		// バージョン1.0.0で生成されたデータの削除
		await Promise.all((await GM.listValues()).map(GM.deleteValue));
	}
	if (!nextCleaningDate) {
		await GM.setValue(
			'next-cleaning-date',
			new Date(Date.now() + CACHE_LIFETIME * MINUTES_TO_MILISECONDS).toISOString()
		);
	}

	return getAllTags(await getUserId());
}();



async function main()
{
	// スタイルシートの設定
	document.head.insertAdjacentHTML('beforeend', `<style>
		.tagCloud .last-current-tag::after {
			content: "";
			display: inline-block;
			height: 18px;
			border-right: solid 1px #999;
			width: 10px;
			margin-bottom: -3px;
			-webkit-transform: rotate(0.3rad);
			transform: rotate(0.3rad);
		}
	</style>`);

	/**
	 * タグクラウド。
	 * @type {HTMLUListElement}
	 */
	const tagCloud = document.getElementsByClassName('tagCloud')[0];

	/**
	 * タグクラウドに無いタグ一覧。
	 * @type {HTMLLIElement[]}
	 */
	const minorityTags = [];


	let tagCloudItemTemplate;
	let tagCloudItemTemplateAnchor;

	const currentTags = new DocumentFragment();

	// 表示している作品のタグを取得する
	for (const tagItem of document.querySelectorAll('.tag .text')) {
		currentTags.append(' ');
		/**
		 * RFC 3986にもとづいてパーセント符号化されたタグ。
		 * @type {string}
		 */
		const urlencodedTag = /[^=]+$/.exec(tagItem.search)[0];

		const anchor = tagCloud.querySelector('[href$="tag=' + urlencodedTag + '"]');
		if (anchor) {
			// タグクラウドに同じタグが存在すれば、抜き出す
			currentTags.append(anchor.parentElement);
		} else {
			// 存在しなければ、もっとも出現度の低いタグとして追加しておく
			if (!tagCloudItemTemplate) {
				tagCloudItemTemplate = tagCloud.firstElementChild.cloneNode(true);
				tagCloudItemTemplate.className = 'level6';
				tagCloudItemTemplateAnchor = tagCloudItemTemplate.firstElementChild;
			}

			tagCloudItemTemplateAnchor.search = tagCloudItemTemplateAnchor.search.replace(/[^=]+$/, urlencodedTag);
			tagCloudItemTemplateAnchor.textContent = tagItem.textContent;
			minorityTags.push(currentTags.appendChild(tagCloudItemTemplate.cloneNode(true)));
		}
	}

	// 表示している作品のタグとそれ以外のタグとの区切りを示すクラスを設定
	currentTags.lastElementChild.classList.add('last-current-tag');

	/**
	 * タグクラウドに出現数が2つ回以上のタグしか無ければ真。
	 * @type {boolean}
	 */
	const tagCloudHavingOnlymajorityTags = tagCloud.children.length === tagCloud.getElementsByClassName('cnt').length;

	// タグクラウドの先頭に挿入
	tagCloud.prepend(currentTags);

	if (minorityTags.length > 0 && tagCloudHavingOnlymajorityTags) {
		// 表示している作品のタグのうち、タグクラウドに存在しないタグがあり、
		// かつタグクラウドに出現数が2回以上のタグしか無ければ
		const tags = await allTagsPromise;
		for (const li of minorityTags) {
			const anchor = li.firstElementChild;

			// タグ一覧ページから出現数が2回以上のタグ数を取得
			const tag = anchor.text;
			for (const count in tags) {
				if (tags[count].indexOf(tag) !== -1) {
					// タグの数を表示
					anchor.insertAdjacentHTML('beforeend', '<span class="cnt">(' + count + ')</span>');
					break;
				}
			}
		}
	}
}

/**
 * 表示している作品の作者のユーザーIDを取得します。
 * @return {Promise.<string>}
 */
function getUserId()
{
	const pattern = /pixiv\.context\.userId\s*=\s*"([0-9]+)"/;

	for (const script of document.querySelectorAll('head script:not([src])')) {
		const result = pattern.exec(script.text);
		if (result) {
			return Promise.resolve(result[1]);
		}
	}

	return new Promise(function (resolve) {
		new MutationObserver(function (mutations, observer) {
			for (const mutation of mutations) {
				if (mutation.target.localName === 'head') {
					for (const node of mutation.addedNodes) {
						if (node.localName === 'script' && !node.src) {
							const result = pattern.exec(node.text);
							if (result) {
								observer.disconnect();
								resolve(result[1]);
								return;
							}
						}
					}
				}
			}
		}).observe(document, {childList: true, subtree: true});
	});
}

/**
 * 指定したユーザーの、出現数が2回以上のタグ一覧を取得します。
 * @param {string} userId
 * @returns {Promise.<Object.<string[]>>} イラスト数をキー、タグの配列を値としたオブジェクト。
 */
async function getAllTags(userId)
{
	const [expire, tags]
		= await Promise.all([GM.getValue(userId + CACHE_EXPIRE_NAME_SUFFIX), GM.getValue(userId + CACHE_NAME_SUFFIX)]);
	return expire && new Date(expire).getTime() > Date.now() ? JSON.parse(tags) : getAllTagsFromPage(userId);
}

/**
 * 指定したユーザーの、出現数が2回以上のタグ一覧をページから取得し、キャッシュとして保存します。
 * @param {string} userId
 * @returns {Promise.<Object.<string[]>>} イラスト数をキー、タグの配列を値としたオブジェクト。
 */
function getAllTagsFromPage(userId)
{
	return new Promise(function (resolve) {
		const client = new XMLHttpRequest();
		client.open('GET', new URL('./member_tag_all.php?id=' + userId, location));
		client.responseType = 'document';
		client.addEventListener('load', function (event) {
			const counts = event.target.response.querySelectorAll('.tag-list > dt');
			if (counts.length > 0) {
				const tags = {};
				for (const dt of counts) {
					const count = dt.textContent;
					if (count > 1) {
						tags[count]
							= Array.from(dt.nextElementSibling.getElementsByTagName('a')).map(anchor => anchor.text);
					}
				}

				GM.setValue(userId + CACHE_NAME_SUFFIX, JSON.stringify(tags));

				// 有効期限（日時）の設定
				GM.setValue(
					userId + CACHE_EXPIRE_NAME_SUFFIX,
					new Date(Date.now() + CACHE_LIFETIME * MINUTES_TO_MILISECONDS).toISOString()
				);

				resolve(tags);
			}
		});
		client.send();
	});
}

})();

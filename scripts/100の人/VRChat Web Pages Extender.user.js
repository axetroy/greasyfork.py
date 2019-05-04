// ==UserScript==
// @name        VRChat Web Pages Extender
// @name:ja     VRChat Webページ拡張
// @description Add features into VRChat Web Pages and improve user experience.
// @description:ja VRChatのWebページに機能を追加し、また使い勝手を改善します。
// @namespace   https://greasyfork.org/users/137
// @version     2.1.0
// @match       https://www.vrchat.net/*
// @match       https://vrchat.net/*
// @match       https://www.vrchat.com/*
// @match       https://vrchat.com/*
// @require     https://greasyfork.org/scripts/17895/code/polyfill.js?version=625392
// @require     https://greasyfork.org/scripts/19616/code/utilities.js?version=230651
// @license     MPL-2.0
// @contributionURL https://pokemori.booth.pm/items/969835
// @compatible  Edge 非推奨 / Deprecated
// @compatible  Firefox
// @compatible  Opera
// @compatible  Chrome
// @grant       dummy
// @run-at      document-start
// @icon        data:image/png;base64,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
// @author      100の人
// @homepageURL https://pokemori.booth.pm/items/969835
// ==/UserScript==

'use strict';

// L10N
Gettext.setLocalizedTexts({
	/*eslint-disable quote-props, max-len */
	'en': {
		'エラーが発生しました': 'Error occurred',
	},
	/*eslint-enable quote-props, max-len */
});

Gettext.setLocale(navigator.language);



if (typeof content !== 'undefined') {
	// For Greasemonkey 4
	fetch = content.fetch.bind(content);
}



/**
 * ページ上部にエラー内容を表示します。
 * @param {Error} exception
 * @returns {void}
 */
function showError(exception)
{
	console.error(exception);
	try {
		const errorMessage = _('エラーが発生しました') + ': ' + exception;
		const homeContent = document.getElementsByClassName('home-content')[0];
		if (homeContent) {
			homeContent.firstElementChild.firstElementChild.insertAdjacentHTML('afterbegin', h`<div class="row">
				<div class="alert alert-danger fade show" role="alert">${errorMessage}</div>
			</div>`);
		} else {
			alert(errorMessage);
		}
	} catch (e) {
		alert(_('エラーが発生しました') + ': ' + e);
	}
}

/**
 * 一度に取得できる最大の要素数。
 * @constant {number}
 */
const MAX_ITEMS_COUNT = 100;

/**
 * VRChatのWebページ上で一度に取得される要素数。
 * @constant {number}
 */
const DEFAULT_ITEMS_COUNT = 25;

/**
 * 一つのブックマークグループの最大登録数。
 * @constant {number}
 */
const MAX_FAVORITES_COUNT_PER_GROUP = 32;

/**
 * フレンドの各ブックマークグループの既定名。
 * @constant {string[]}
 */
const DEFAULT_FRIEND_GROUP_NAMES = {
	group_0: 'Group 1',
	group_1: 'Group 2',
	group_2: 'Group 3',
};

/**
 * @type {Promise.<Object>}
 * @access private
 */
let userDetails;

/**
 * ログインしているユーザーの情報を取得します。
 * @see [User Info — VRChat API Documentation]{@link https://vrchatapi.github.io/#/UserAPI/CurrentUserDetails}
 * @returns {Promise.<Object.<(string|string[]|boolean|number|Object)>>}
 */
function getUserDetails()
{
	return userDetails || (userDetails = async function () {
		const details = Object.assign( // For Greasemonkey 3
			{},
			await fetch('/api/1/auth/user', {credentials: 'same-origin'})
				.then(async response => response.ok
					? response.json()
					: Promise.reject(new Error(`${response.status} ${response.statusText}\n${await response.text()}`)))
				.catch(showError)
		);

		details.friendGroupTagsAndNames = {};
		const tags = Object.keys(DEFAULT_FRIEND_GROUP_NAMES).sort();
		for (let i = 0, l = tags.length; i < l; i++) {
			details.friendGroupTagsAndNames[tags[i]]
				= details.friendGroupNames[i] || DEFAULT_FRIEND_GROUP_NAMES[tags[i]];
		}

		return details;
	}());
}

/**
 * @type {Promise.<Object[]>}
 * @access private
 */
let userFavorites;

/**
 * ユーザーのブックマークのうち、フレンドを全件取得します。
 * @see [List Favorites — VRChat API Documentation]{@link https://vrchatapi.github.io/#/FavoritesAPI/ListAllFavorites}
 * @returns {Promise.<(string|string[])[]>}
 */
function getUserFavorites()
{
	return userFavorites || (userFavorites = async function () {
		const users = [];
		let offset = 0;
		while (true) {
			const favorites
				= await fetch(`/api/1/favorites/?n=${MAX_ITEMS_COUNT}&offset=${offset}`, {credentials: 'same-origin'})
					.then(async response => response.ok ? response.json() : Promise.reject(
						new Error(`${response.status}  ${response.statusText}\n${await response.text()}`)
					))
					.catch(showError);

			users.push(...favorites.filter(favorite => favorite.type === 'friend'));

			if (favorites.length < MAX_ITEMS_COUNT) {
				break;
			}

			offset++;
		}
		return users;
	}());
}

/**
 * 「Edit Profile」ページに、ステータス文変更フォームを挿入します。
 * @returns {Promise.<void>}
 */
async function insertUpdateStatusForm()
{
	if (!('update-status' in document.forms)) {
		document.getElementsByClassName('home-content')[0].getElementsByTagName('h2')[0]
			.insertAdjacentHTML('afterend', h`<div class="card row">
				<h3>Update Status</h3>
				<div>
					<div class="center-panel">
						<form class="form-horizontal" name="update-status">
							<div class="form-group">
								<div class="row"></div>
								<div class="row">
									<div class="col-1">
										<span aria-hidden="true" class="fa fa-circle fa-2x"></span>
									</div>
									<textarea class="col-md-10" name="status-description" disabled=""></textarea>
								</div>
							</div>
							<div class="form-group">
								<div class="row">
									<div class="col-4 offset-8">
										<input class="btn btn-primary w-100" value="Update" type="submit" disabled="" />
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>`);

		const form = document.forms['update-status'];
		form.action = '/api/1/users/' + (await getUserDetails()).id;
		form['status-description'].value = (await getUserDetails()).statusDescription;
		for (const control of form) {
			control.disabled = false;
		}

		form.addEventListener('submit', function (event) {
			event.preventDefault();
			for (const control of event.target) {
				control.disabled = true;
			}

			fetch(event.target.action, {
				method: 'PUT',
				headers: {'content-type': 'application/json'},
				credentials: 'same-origin',
				body: JSON.stringify({statusDescription: event.target['status-description'].value}),
			})
				.then(async function (response) {
					if (!response.ok) {
						return Promise.reject(
							new Error(`${response.status}  ${response.statusText}\n${await response.text()}`)
						);
					}
				})
				.catch(showError)
				.then(function () {
					for (const control of event.target) {
						control.disabled = false;
					}
				});
		});
	}
}

/**
 * ユーザーページのブックマーク登録/解除ボタンの登録数表示を更新します。
 * @returns {Promise.<void>}
 */
async function updateFavoriteCounts()
{
	const counts = {};
	for (const favorite of (await getUserFavorites())) {
		for (const tag of favorite.tags) {
			if (!(tag in counts)) {
				counts[tag] = 0;
			}
			counts[tag]++;
		}
	}

	for (const button of document.getElementsByName('favorite-user')) {
		button.getElementsByClassName('count')[0].textContent = counts[button.value] || 0;
	}
}

/**
 * ユーザーページにブックマーク登録/解除ボタンを追加します。
 * @returns {Promise.<void>}
 */
async function insertFavoriteButtons()
{
	const homeContent = document.getElementsByClassName('home-content')[0];
	const favoriteAndBlockButtons = homeContent.getElementsByClassName('btn-group-vertical')[0];
	if (favoriteAndBlockButtons) {
		const friendUserId = /\/user\/(usr_[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/
			.exec(location.pathname)[1];
		const buttons = document.getElementsByName('favorite-user');
		if ((await getUserDetails()).friends.includes(friendUserId) && !buttons[0]) {
			favoriteAndBlockButtons
				.insertAdjacentHTML('afterend', '<div role="group" class="w-100 btn-group-lg btn-group-vertical mt-4">'
					+ Object.keys(DEFAULT_FRIEND_GROUP_NAMES).sort().map(tag => h`<button type="button"
						class="btn btn-secondary" name="favorite-user" value="${tag}" disabled="">
						<span aria-hidden="true" class="fa fa-star"></span>
						&#xA0;<span class="name">${DEFAULT_FRIEND_GROUP_NAMES[tag]}</span>
						&#xA0;<span class="count">‒</span>⁄${MAX_FAVORITES_COUNT_PER_GROUP}
					</button>`).join('')
				+ '</div>');

			for (const button of buttons) {
				button.getElementsByClassName('name')[0].textContent
					= (await getUserDetails()).friendGroupTagsAndNames[button.value];
			}

			await updateFavoriteCounts();

			const tags = [].concat(...(await getUserFavorites())
				.filter(favorite => favorite.favoriteId === friendUserId)
				.map(favorite => favorite.tags));

			for (const button of buttons) {
				button.dataset.id = friendUserId;
				if (tags.includes(button.value)) {
					button.classList.remove('btn-secondary');
					button.classList.add('btn-primary');
				}
				if (button.getElementsByClassName('count')[0].textContent < MAX_FAVORITES_COUNT_PER_GROUP) {
					button.disabled = false;
				}
			}

			favoriteAndBlockButtons.nextElementSibling.addEventListener('click', async function (event) {
				if (event.target.name === 'favorite-user') {
					const buttons = document.getElementsByName('favorite-user');
					for (const button of buttons) {
						button.disabled = true;
					}

					const friendUserId = event.target.dataset.id;
					const newTags = event.target.classList.contains('btn-secondary') ? [event.target.value] : [];

					const favorites = await getUserFavorites();
					for (let i = favorites.length - 1; i >= 0; i--) {
						if (favorites[i].favoriteId === friendUserId) {
							await fetch(
								'/api/1/favorites/' + favorites[i].id,
								{method: 'DELETE', credentials: 'same-origin'}
							);

							for (const button of buttons) {
								if (favorites[i].tags.includes(button.value)) {
									button.classList.remove('btn-primary');
									button.classList.add('btn-secondary');
								}
							}

							favorites.splice(i, 1);
						}
					}

					if (newTags.length > 0) {
						await fetch('/api/1/favorites', {
							method: 'POST',
							headers: { 'content-type': 'application/json' },
							credentials: 'same-origin',
							body: JSON.stringify({type: 'friend', favoriteId: friendUserId, tags: newTags}),
						})
							.then(async response => response.ok ? response.json() : Promise.reject(
								new Error(`${response.status}  ${response.statusText}\n${await response.text()}`)
							))
							.then(function (favorite) {
								favorites.push(favorite);
								for (const button of buttons) {
									if (favorite.tags.includes(button.value)) {
										button.classList.remove('btn-secondary');
										button.classList.add('btn-primary');
									}
								}
							})
							.catch(showError);
					}

					await updateFavoriteCounts();

					for (const button of buttons) {
						if (button.getElementsByClassName('count')[0].textContent < MAX_FAVORITES_COUNT_PER_GROUP) {
							button.disabled = false;
						}
					}
				}
			});
		}
	}
}

/**
 * ページ読み込み後に一度だけ実行する処理をすでに行っていれば `true`。
 * @type {boolean}
 * @access private
 */
let headChildrenInserted = false;

new MutationObserver(async function (mutations) {
	if (document.head && !headChildrenInserted) {
		headChildrenInserted = true;
		document.head.insertAdjacentHTML('beforeend', `<style>
			/*====================================
				フレンドのユーザーページ
			*/
			.btn[name="favorite-user"] {
				white-space: unset;
			}

			/*====================================
				フレンド一覧
			*/

			/*------------------------------------
				1行に2列まで表示されるように
			*/
			.friend-group {
				display: flex;
				flex-wrap: wrap;
			}

			.friend-group > :first-child,
			.friend-group > div:last-of-type {
				/* 見出し・ページャー */
				width: 100%;
			}

			.friend-group > div:not(:last-of-type) {
				min-width: 50%;
			}

			.friend-row a {
				display: flex;
			}

			.friend-row a .friend-img {
				margin-right: unset;
			}
		</style>`);

		// 一ページあたりに表示されるフレンド数を増やします
		GreasemonkeyUtils.executeOnUnsafeContext(function (MAX_ITEMS_COUNT, DEFAULT_ITEMS_COUNT) {
			XMLHttpRequest.prototype.open = new Proxy(XMLHttpRequest.prototype.open, {
				apply(open, thisArgument, argumentList)
				{
					argumentList[1] = new URL(argumentList[1], location);
					switch (argumentList[1].pathname) {
						case '/api/1/auth/user/friends': {
							const params = argumentList[1].searchParams;
							params.set('n', MAX_ITEMS_COUNT);
							params.set('offset', params.get('offset') / DEFAULT_ITEMS_COUNT * MAX_ITEMS_COUNT);
							break;
						}
					}
					return Reflect.apply(open, thisArgument, argumentList);
				},
			});
		}, [MAX_ITEMS_COUNT, DEFAULT_ITEMS_COUNT]);
	}

	for (const mutation of mutations) {
		let parent = mutation.target;

		// フレンド数を表示します
		if (parent.id === 'home') {
			document.getElementsByClassName('friend-container')[0].previousElementSibling.textContent
				+= ` (${(await getUserDetails()).friends.length})`;
			break;
		}

		if (parent.id === 'app' || parent.classList.contains('home-content')) {
			const homeContent = document.getElementsByClassName('home-content')[0];
			if (homeContent && !homeContent.getElementsByClassName('fa-cog')[0]) {
				let promise;
				if (location.pathname === '/home/profile') {
					// 「Edit Profile」ページなら
					promise = insertUpdateStatusForm();
				} else if (location.pathname.startsWith('/home/user/')) {
					// ユーザーページなら
					promise = insertFavoriteButtons();
				}
				if (promise) {
					promise.catch(showError);
				}
			}

			break;
		}

		if (parent.classList.contains('friend-container')) {
			parent = mutation.addedNodes[0];
		}

		if (parent.classList.contains('friend-group')) {
			const friends = Array.from(parent.querySelectorAll('.friend-group > div:not(:last-of-type)'));
			if (!('sorted' in friends[0].dataset)) {
				// フレンド一覧を一ページの範囲内でアルファベット順に並べ替えます
				friends.sort((a, b) => a.querySelector('.friend-caption li').textContent
					.localeCompare(b.querySelector('.friend-caption li').textContent));
				friends[0].dataset.sorted = '';
				parent.lastElementChild.before(...friends);

				// フレンド一覧で次のページが確実に存在しない場合、次ページのボタンを無効化します
				const pager = parent.querySelector('.friend-group > div:last-of-type');
				pager.getElementsByClassName('fa-chevron-down')[0]
					.classList[friends.length < MAX_ITEMS_COUNT ? 'add' : 'remove']('text-muted');

				// フレンド一覧のページャーボタンについて、無効化されたボタンを区別しやすくします
				for (const button of pager.getElementsByTagName('button')) {
					button.disabled = button.getElementsByClassName('text-muted')[0];
				}

				// フレンド一覧のページ切り替え後にトップにスクロールします
				if (!mutation.target.classList.contains('friend-container')) {
					parent.scrollIntoView({block: 'start', inline: 'start', behavior: 'smooth'});
				}
			}
			break;
		}
	}
}).observe(document, {childList: true, subtree: true});

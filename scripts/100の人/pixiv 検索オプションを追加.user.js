// ==UserScript==
// @name        pixiv 検索オプションを追加
// @name:ja     pixiv 検索オプションを追加
// @name:en     pixiv Search Options
// @description This is a search option add-on script for pixiv. Enables you to select search mode by radio buttons (legacy feature).
// @description:ja 検索オプションを、以前のようにラジオボタンで選択出来るようにする。
// @namespace   http://loda.jp/script/
// @version     5.0.4
// @match       https://www.pixiv.net/*
// @exclude     https://www.pixiv.net/member_illust.php?*mode=manga*
// @exclude     https://www.pixiv.net/apps.php*
// @require     https://cdn.rawgit.com/greasemonkey/gm4-polyfill/a834d46afcc7d6f6297829876423f58bb14a0d97/gm4-polyfill.js
// @resource    dialog-polyfill.css https://bowercdn.net/c/dialog-polyfill-0.4.10/dialog-polyfill.css
// @require     https://bowercdn.net/c/dialog-polyfill-0.4.10/dialog-polyfill.js
// @require     https://greasyfork.org/scripts/17895/code/polyfill.js?version=625392
// @require     https://greasyfork.org/scripts/19616/code/utilities.js?version=230651
// @require     https://greasyfork.org/scripts/17896/code/start-script.js?version=112958
// @license     MPL-2.0
// @compatible  Edge 非推奨 / Deprecated
// @compatible  Firefox
// @compatible  Opera
// @compatible  Chrome
// @grant       GM.getValue
// @grant       GM_getValue
// @grant       GM.setValue
// @grant       GM_setValue
// @grant       GM.registerMenuCommand
// @grant       GM_registerMenuCommand
// @grant       GM.getResourceUrl
// @grant       GM_getResourceURL
// @noframes
// @run-at      document-start
// @icon        data:image/vnd.microsoft.icon;base64,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
// @author      100の人
// @homepageURL https://greasyfork.org/scripts/265
// ==/UserScript==

(function () {
'use strict';

// L10N
Gettext.setLocalizedTexts({
	/*eslint-disable quote-props, max-len */
	'en': {
		'完全一致': 'Exact match',
		'部分一致': 'Partial match',
		'タイトル・キャプション': 'Title/Description',
		'小説': 'Novels',
		'タグ': 'Tags',
		'キーワード': 'Keyword',
		'本文': 'Content',
		'ユーザー': 'User',
		'グループ': 'Groups',
		'すべて': 'All',
		'検索': 'Search',
		'小説検索': 'Search novel',
		'ユーザー検索': 'Search user',
		'グループ検索': 'Search group',
		'pixiv 検索オプションを追加': 'pixiv Search Options',
		'ロゴを表示したままにする': 'Shows pixiv logo',
		'この設定をオンにすると、ヘッダの高さが大きくなります。': 'If you set this, the page header becomes higher.',
		'別のタブでpixivを開いていた場合、この設定の変更はそのタブの再読み込み後に反映されます。': 'If you have opened pixiv pages in other tabs, this setting will reflect after the tab refresh.',
		'完全一致検索の結果ページで、最初は「完全一致」のラジオボタンにチェックを入れておく': 'In search result pages of exact match, selects “Exact match” radio button by default',
		'この設定をオフにすると、最初は「部分一致」にチェックが入った状態になります。': 'If you unset this, selects “Partial match” radio button by default.',
	},
	'fr': {
		'完全一致': 'Concordance parfaite',
		'部分一致': 'Concordance partielle',
		'タイトル・キャプション': 'Titre, Légende',
		'小説': 'Roman',
		'タグ': 'Mots-clés',
		'キーワード': 'Mots-clés',
		'本文': 'Contenu',
		'ユーザー': 'Utilisateur',
		'グループ': 'Groups',
		'すべて': 'Tout',
		'検索': 'Rechercher',
		'小説検索': 'Rechercher un roman',
		'ユーザー検索': '',
		'グループ検索': 'Rechercher un groupe',
		'pixiv 検索オプションを追加': '',
		'ロゴを表示したままにする': '',
		'この設定をオンにすると、ヘッダの高さが大きくなります。': '',
		'別のタブでpixivを開いていた場合、この設定の変更はそのタブの再読み込み後に反映されます。': '',
		'完全一致検索の結果ページで、最初は「完全一致」のラジオボタンにチェックを入れておく': '',
		'この設定をオフにすると、最初は「部分一致」にチェックが入った状態になります。': '',
	},
	'ko': {
		'完全一致': '완전 일치',
		'部分一致': '부분 일치',
		'タイトル・キャプション': '제목・캡션',
		'小説': '소설',
		'タグ': '태그',
		'キーワード': '키워드',
		'本文': '본문',
		'ユーザー': '유저',
		'グループ': '그룹',
		'すべて': '전체',
		'検索': '검색',
		'小説検索': '소설 검색',
		'ユーザー検索': '유저 검색',
		'グループ検索': '그룹 검색',
		'pixiv 検索オプションを追加': '',
		'ロゴを表示したままにする': '',
		'この設定をオンにすると、ヘッダの高さが大きくなります。': '',
		'別のタブでpixivを開いていた場合、この設定の変更はそのタブの再読み込み後に反映されます。': '',
		'完全一致検索の結果ページで、最初は「完全一致」のラジオボタンにチェックを入れておく': '',
		'この設定をオフにすると、最初は「部分一致」にチェックが入った状態になります。': '',
	},
	'ru': {
		'完全一致': 'Полное совпадение',
		'部分一致': 'Частичное совпадение',
		'タイトル・キャプション': 'Заголовок',
		'小説': 'Рассказы',
		'タグ': 'Метка',
		'キーワード': 'Ключевые слова',
		'本文': 'Текст',
		'ユーザー': 'Пользователь',
		'グループ': 'Группа',
		'すべて': 'Все',
		'検索': 'Поиск',
		'小説検索': 'Искать рассказ',
		'ユーザー検索': 'Искать пользователя',
		'グループ検索': 'Искать группу',
		'pixiv 検索オプションを追加': '',
		'ロゴを表示したままにする': '',
		'この設定をオンにすると、ヘッダの高さが大きくなります。': '',
		'別のタブでpixivを開いていた場合、この設定の変更はそのタブの再読み込み後に反映されます。': '',
		'完全一致検索の結果ページで、最初は「完全一致」のラジオボタンにチェックを入れておく': '',
		'この設定をオフにすると、最初は「部分一致」にチェックが入った状態になります。': '',
	},
	'th': {
		'完全一致': '',
		'部分一致': '',
		'タイトル・キャプション': 'ชื่อและคำบรรยาย',
		'小説': 'นิยาย',
		'タグ': 'แท็ก',
		'キーワード': 'คีย์เวิร์ด',
		'本文': '',
		'ユーザー': 'ผู้ใช้',
		'グループ': '',
		'すべて': 'ทั้งหมด',
		'検索': 'ค้นหา',
		'小説検索': '',
		'ユーザー検索': '',
		'グループ検索': '',
		'pixiv 検索オプションを追加': '',
		'ロゴを表示したままにする': '',
		'この設定をオンにすると、ヘッダの高さが大きくなります。': '',
		'別のタブでpixivを開いていた場合、この設定の変更はそのタブの再読み込み後に反映されます。': '',
		'完全一致検索の結果ページで、最初は「完全一致」のラジオボタンにチェックを入れておく': '',
		'この設定をオフにすると、最初は「部分一致」にチェックが入った状態になります。': '',
	},
	'zh': {
		'完全一致': '完全相同',
		'部分一致': '部分相同',
		'タイトル・キャプション': '题目／简述',
		'小説': '小说',
		'タグ': '标签',
		'キーワード': '关键词',
		'本文': '内容',
		'ユーザー': '用户',
		'グループ': '群组',
		'すべて': '全部',
		'検索': '搜索',
		'小説検索': '搜索小说',
		'ユーザー検索': '搜索用户',
		'グループ検索': '搜索群组',
		'pixiv 検索オプションを追加': '',
		'ロゴを表示したままにする': '',
		'この設定をオンにすると、ヘッダの高さが大きくなります。': '',
		'別のタブでpixivを開いていた場合、この設定の変更はそのタブの再読み込み後に反映されます。': '',
		'完全一致検索の結果ページで、最初は「完全一致」のラジオボタンにチェックを入れておく': '',
		'この設定をオフにすると、最初は「部分一致」にチェックが入った状態になります。': '',
	},
	'zh-tw': {
		'完全一致': '完全相同',
		'部分一致': '部分相同',
		'タイトル・キャプション': '題目／簡述',
		'小説': '小說',
		'タグ': '標籤',
		'キーワード': '關鍵詞',
		'本文': '內容',
		'ユーザー': '用戶',
		'グループ': '群組',
		'すべて': '全部',
		'検索': '搜索',
		'小説検索': '搜索小說',
		'ユーザー検索': '搜索用戶',
		'グループ検索': '搜索群組',
		'pixiv 検索オプションを追加': '',
		'ロゴを表示したままにする': '',
		'この設定をオンにすると、ヘッダの高さが大きくなります。': '',
		'別のタブでpixivを開いていた場合、この設定の変更はそのタブの再読み込み後に反映されます。': '',
		'完全一致検索の結果ページで、最初は「完全一致」のラジオボタンにチェックを入れておく': '',
		'この設定をオフにすると、最初は「部分一致」にチェックが入った状態になります。': '',
	},
	'es': {
		'完全一致': 'Coincidencia exacta',
		'部分一致': 'Coincidencia parcial',
		'タイトル・キャプション': 'Título/Descripción',
		'小説': 'Novelas',
		'タグ': 'Etiquetas',
		'キーワード': 'Palabra clave',
		'本文': 'Mensaje',
		'ユーザー': 'Usuarios',
		'グループ': 'Grupo',
		'すべて': 'Todos',
		'検索': 'Buscar',
		'小説検索': 'Buscar novela',
		'ユーザー検索': 'Buscar usuario',
		'グループ検索': 'Buscar grupo',
		'pixiv 検索オプションを追加': '',
		'ロゴを表示したままにする': '',
		'この設定をオンにすると、ヘッダの高さが大きくなります。': '',
		'別のタブでpixivを開いていた場合、この設定の変更はそのタブの再読み込み後に反映されます。': '',
		'完全一致検索の結果ページで、最初は「完全一致」のラジオボタンにチェックを入れておく': '',
		'この設定をオフにすると、最初は「部分一致」にチェックが入った状態になります。': '',
	},
	/*eslint-enable quote-props, max-len */
});

/**
 * スクリプトの起動。
 */
class PixivSearchOptions
{
	constructor()
	{
		this.illustPage = ['/member.php', '/novel/member.php', '/member_illust.php'].includes(location.pathname);

		if (this.illustPage) {
			startScript(
				() => {
					this.main();
				},
				parent => parent.id === 'root',
				target => target.localName === 'header',
				() => document.querySelector('#root > header'),
				{},
				60 * 1000
			);
		} else {
			startScript(
				() => {
					if (document.body.classList.contains('not-logged-in')) {
						return;
					}

					this.main();
				},
				parent => parent.localName === 'body',
				target => target.id === 'wrapper',
				() => document.getElementById('wrapper')
			);
		}
	}

	/**
	 * ロゴの表示状態を変更します。
	 * @returns {Promise.<void>}
	 */
	async changeShownLogo()
	{
		document.body.classList[await GM.getValue('show-logo', false) ? 'add' : 'remove']('show-logo');
	}

	/**
	 * @param {Event}
	 */
	handleEvent(event)
	{
		switch (event.type) {
			case 'submit': {
				if (!/\S/.test(this.word.value)) {
					// 空白以外の文字が入力されていなければ
					this.word.value = '';
					return;
				}

				const searchMode = event.currentTarget.querySelector('[name="s_mode"]:checked');
				const subOption = event.currentTarget.querySelector('[name="s_sub_mode"]:checked');

				if ((subOption || searchMode).value.endsWith('tag_full') && /[^ 　][ 　]+[^ 　]/.test(this.word.value)) {
					// 完全一致タグ検索で、先頭・末尾以外に半角スペース・全角スペースが含まれていれば
					if (subOption) {
						searchMode.checked = false;
						searchMode.click();
					} else {
						// イラスト
						searchMode.value = 's_tag';
					}
				}

				event.currentTarget.action = searchMode.dataset.formAction;
				if (searchMode.dataset.wordName) {
					this.word.name = searchMode.dataset.wordName;
				}
				if (searchMode.dataset.modeName) {
					searchMode.name = searchMode.dataset.modeName;
				} else if (searchMode.dataset.modeName === '') {
					searchMode.removeAttribute('name');
				}

				if (subOption) {
					// 副検索モードが存在すれば
					searchMode.value = subOption.value;
					subOption.removeAttribute('name');
					if (subOption.dataset.formAction) {
						event.currentTarget.action = subOption.dataset.formAction;
					}
					if (subOption.dataset.wordName) {
						this.word.name = subOption.dataset.wordName;
					}
					if (subOption.dataset.modeName) {
						searchMode.name = subOption.dataset.modeName;
					} else if (subOption.dataset.modeName === '') {
						searchMode.removeAttribute('name');
					}
				}

				if (event.currentTarget.action !== location.origin + location.pathname) {
					// サービス間をまたぐ場合、不要なパラメーターは送信しない
					for (const hiddenParam of event.currentTarget.querySelectorAll('[type="hidden"]')) {
						hiddenParam.disabled = true;
					}
				}
				break;
			}
			case 'change': {
				// 副検索モードの選択
				const subOptions = event.target.parentElement.parentElement;
				if (event.target.name === 's_mode') {
					// 検索モードの選択なら
					if (subOptions.classList.contains('sub-options')) {
						// 副検索モードが存在すれば
						subOptions.querySelector('[value="s_tag"], [value="keyword_all"]').checked = true;
					} else {
						const subOption = event.currentTarget.querySelector('[name="s_sub_mode"]:checked');
						if (subOption) {
							subOption.checked = false;
						}
					}
					this.word.placeholder = event.target.dataset.placeholder;
				} else if (event.target.name === 's_sub_mode') {
					// 副検索モードの選択なら
					const subOption = subOptions.firstElementChild.firstElementChild;
					subOption.checked = true;
					this.word.placeholder = subOption.dataset.placeholder;
				}
				break;
			}
			case 'dblclick':
				// ラベルをダブルクリックで検索
				if (event.target.matches('label, label *')) {
					event.currentTarget.querySelector('[type="submit"]').click();
				}
				break;
		}
	}

	main()
	{
		// 言語の設定
		Gettext.setLocale(document.documentElement.lang);

		this.style();

		this.changeShownLogo();

		/**
		 * 検索オプションを設定するラジオボタンのHTML文字列。
		 * @type {string}
		 */
		const optionsHTML = h`
			<label>
				<input data-placeholder="${_('検索')}" data-word-name="word" data-form-action="https://www.pixiv.net/search.php" value="s_tag_full" name="s_mode" type="radio" />
				${_('完全一致')}
			</label>
			<label>
				<input data-placeholder="${_('検索')}" data-word-name="word" data-form-action="https://www.pixiv.net/search.php" value="s_tag" name="s_mode" type="radio" />
				${_('部分一致')}
			</label>
			<label>
				<input data-placeholder="${_('検索')}" data-word-name="word" data-form-action="https://www.pixiv.net/search.php" value="s_tc" name="s_mode" type="radio" />
				${_('タイトル・キャプション')}
			</label>
			<div id="s_novel" class="sub-options" title="${_('小説')}">
				<label>
					<input data-placeholder="${_('小説検索')}" data-word-name="word" data-form-action="https://www.pixiv.net/novel/search.php" value="s_novel" name="s_mode" type="radio" />
					<img alt="${_('小説')}" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAARBAMAAADNtor0AAAAD1BMVEVldC2Spb6susrCzdr9//waY6iPAAAAAXRSTlMAQObYZgAAAEFJREFUCNdjYBAUZIABERdDBNNZAM6ECQsCmY6CQCDAIAJiugABJtPZ2NiEfFFDIROYqIuzMkzUxcXZCMIUhAEBACaMGgfSfm2+AAAAAElFTkSuQmCC" />
				</label>
				<label>
					<input data-mode-name="" data-word-name="tag" data-form-action="/novel/tags.php" value="s_tag_full" name="s_sub_mode" type="radio" />
					${_('タグ')}
				</label>
				<label>
					<input value="s_tag" name="s_sub_mode" type="radio" />
					${_('キーワード')}
				</label>
				<label>
					<input value="s_tc" name="s_sub_mode" type="radio" />
					${_('本文')}
				</label>
			</div>
			<label title="${_('ユーザー')}">
				<input data-placeholder="${_('ユーザー検索')}" data-word-name="nick" data-form-action="https://www.pixiv.net/search_user.php" value="s_usr" name="s_mode" type="radio" />
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" width="16px" height="16px">
					<title>${_('ユーザー')}</title>
					<path fill="#809DB8" d="M848,348 l98,-20 q28,0 54,22 q38,32 48,44 q22,26 34,26 q16,0 26,-4 q14,-6 52,2 q32,6 48,24 q18,20 23,42 t5,50 q0,32 2,48 q-4,24 -2,38 q6,36 6,62 t-6,44 t12,28 t38,10 h22 q28,0 40,46 q8,30 8,60 q0,14 -2,30 l-6,46 q-2,16 -6,22 q-6,10 -10,16 t-14,14 l-18,12 l-24,16 q-18,10 -30,18 q-22,62 -50,102 q-34,48 -58,70 l-22,22 q-10,96 -10,118 v6 q0,8 2,16 q0,8 4,22 q4,18 12,28 l20,28 q10,14 30,28 q8,6 46,26 q26,14 62,24 q46,12 82,18 q88,12 138,28 q60,18 102,44 t62,40 t50,46 q28,30 30,32 q20,22 40,98 q20,74 20,140 v66 h-1768 v-72 q0,-42 14,-126 q16,-92 34,-106 q8,-6 32,-34 t46,-48 t62,-46 q36,-24 100,-44 q66,-22 140,-32 q60,-8 102,-22 q40,-12 74,-32 t50,-34 q26,-24 34,-36 q10,-16 16,-30 q12,-18 10,-20 q-4,-6 -2,-6 v-132 q-4,-2 -12,-8 q-8,-4 -28,-22 q-14,-10 -40,-36 q-18,-18 -38,-50 t-32,-64 l-36,-18 q-20,-10 -24,-14 q-4,-2 -12,-18 q-8,-14 -8,-16 q0,-4 -2,-18 t-4,-22 q0,-4 2,-10 t5,-26 t3,-38 q0,-20 8,-38 q10,-32 12,-36 q8,-14 18,-24 t22,-10 h14 q8,-2 18,-12 q12,-12 8,-30 q2,-64 2,-134 q0,-22 8,-50 q10,-38 18,-58 q12,-32 38,-56 t60,-32 l52,-12 h-2 q2,0 6,-2 q10,-2 12,-2 v-6 v-4 q-2,-4 0,-6 q0,-2 8,-4 t22,-2 z" />
				</svg>
			</label>
			<div id="s_group" class="sub-options" title="${_('グループ')}">
				<label>
					<input data-placeholder="${_('グループ検索')}" data-mode-name="mode" data-word-name="word" data-form-action="https://www.pixiv.net/group/search_group.php" value="s_group" name="s_mode" type="radio" />
					<img alt="${_('グループ')}" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAADFBMVEWLpryswdDV3ubr8POkfP3KAAAAT0lEQVQI12NYBQQMYGLd7/e/GFYtX/6LYfX27fsYVqU/i2JYwX4hjGEJk4MYw0Y2hSiGLUwNcgzrVr9aBxLjY1jCDOJGP93FsPrf/ldgUwDsuCQfQnDv1AAAAABJRU5ErkJggg==" />
				</label>
				<label>
					<input value="keyword_all" name="s_sub_mode" type="radio" />
					${_('すべて')}
				</label>
				<label>
					<input value="tag_full" name="s_sub_mode" type="radio" />
					${_('完全一致')}
				</label>
				<label>
					<input value="tag" name="s_sub_mode" type="radio" />
					${_('部分一致')}
				</label>
				<label>
					<input value="keyword" name="s_sub_mode" type="radio" />
					${_('タイトル・キャプション')}
				</label>
			</div>`;

		/**
		 * 検索窓。
		 * @type {HTMLInputElement}
		 * @access protected
		 */
		this.word = this.illustPage
			? document.getElementsByName('word')[0]
			: document.getElementById('suggest-input');

		const form = this.word.form;
		this.word.required = true;

		// デフォルトの検索オプションを取得・削除
		const input = form.s_mode || form.mode;
		let mode = input ? input.value : 's_tag';
		let subMode = mode;
		if (input) {
			input.remove();
		}

		// 入力補完を移動
		const suggest = document.getElementById('suggest-list');
		if (suggest) {
			this.word.parentElement.append(suggest);
		}

		// フォームの移動
		document.querySelector((this.illustPage ? '#root' : 'body') + ' > header').after(form);

		// 検索オプションを設定するラジオボタンの追加
		form.insertAdjacentHTML('beforeend', optionsHTML);

		switch (location.pathname.split('/')[1]) {
			case 'search.php':
				if (new URLSearchParams(location.search).get('s_mode') === 's_tag_full') {
					GM.getValue('check-match-full-by-default-on-full-match-result', false).then(function (value) {
						if (value) {
							form.querySelector('[value="s_tag_full"]').click();
						}
					});
				}
				break;
			case 'novel':
				mode = 's_novel';
				if (location.pathname === '/novel/tags.php') {
					subMode = 's_tag_full';
				}
				break;
			case 'group':
				mode = 's_group';
				break;
		}

		form.addEventListener('submit', this);
		form.addEventListener('change', this);
		form.addEventListener('dblclick', this);

		// 現在の検索モードを設定
		form.querySelector(mode === subMode ? `[value="${mode}"]` : `#${mode} [value="${subMode}"]`).click();

		// 副検索モードが右側にはみ出す問題に対処
		if (document.getElementById('s_group').offsetLeft > 795) {
			document.head.insertAdjacentHTML('beforeend', `<style>
				#s_group label:not(:first-of-type) {
					right: -1px;
				}
				#s_group::after {
					right: -1px;
					border-right-color: transparent;
				}
			</style>`);
		}
	}

	/**
	 * スタイルシートを設定します。
	 * @access protected
	 */
	style()
	{
		document.head.insertAdjacentHTML('beforeend', `<style>
			header + [action*="/search"] {
				display: flex;
				align-items: center;
				width: 970px;
				box-sizing: border-box;
				background: #FFFFFF;
				padding: 0.4em 2em;
				border-left: 1px solid #D6DEE5;
				border-right: 1px solid #D6DEE5;
				border-bottom: 1px solid #D6DEE5;
				border-radius: 0 0 5px 5px;
				justify-content: center;
				/* 通知が検索窓に隠れる問題の修正 */
				z-index: 98;
			}

			.ui-search {
				/* トップページ・pixivについて */
				margin-bottom: 10px;
			}

			/* イラストページ */
			#root header + [action*="/search"] {
				position: absolute;
				left: 0;
				right: 0;
				margin-top: unset;
				margin-left: auto;
				margin-right: auto;
			}
			html[style*="overflow: hidden"] #root header + [action*="/search"] {
				/* イラストの原寸表示 */
				display: none;
			}

			/*------------------------------------
				通知
			*/
			.notification-popup {
				top: 69px;
			}

			/*------------------------------------
				検索窓
			*/
			header + [action*="/search"] [name="word"],
			header + [action*="/search"] .container { /* イラストページ以外 */
				flex-grow: 1;
				flex-shrink: 0;
				width: initial;
				max-width: 250px;
			}
			/* イラストページ以外 */
			header + [action*="/search"] div.container {
				border-radius: 0;
				position: relative;
			}
			#suggest-input {
				width: 100%;
			}

			/*------------------------------------
				送信ボタン
			*/
			.ui-search input.submit {
				/* イラストページ以外 */
				position: static;
				margin-right: 1em;
			}

			/*------------------------------------
				入力補完
			*/
			#suggest-list {
				/* イラストページ以外 */
				top: 27px;
				left: -1px;
				width: 100%;
			}

			/*------------------------------------
				検索オプション
			*/
			header + [action*="/search"] label {
				padding: 0 0.7em;
				display: flex;
				align-items: center;
				white-space: nowrap;
			}
			header + [action*="/search"] label input {
				margin-right: 0.3em;
				width: initial;
			}

			/*------------------------------------
				副検索モード
			*/
			.sub-options label:not(:first-of-type) {
				display: none;
				position: absolute;
				z-index: 1;
				width: 13em;
				height: 2em;
				border: solid 1px #D6DEE5;
				border-top: none;
				border-bottom: none;
				background: #FFFFFF;
			}
			.sub-options::after {
				content: "";
				padding: 0 0.7em;
				display: none;
				position: absolute;
				z-index: 1;
				width: 13em;
				height: 17px;
				border: solid 1px #FFFFFF;
				border-top: none;
				border-bottom: none;
				bottom: 0;
			}
			.sub-options label:nth-of-type(3) {
				margin-top: 2em;
			}
			.sub-options label:nth-of-type(4) {
				margin-top: 4em;
			}
			.sub-options label:nth-of-type(5) {
				margin-top: 6em;
			}
			.sub-options label:last-of-type {
				border-bottom: 1px solid #D6DEE5;
				border-radius: 0 0 5px 5px;
			}
			.sub-options:hover label {
				display: flex;
			}
			.sub-options:hover::after {
				display: block;
			}

			/*------------------------------------
				ページ本体
			*/
			#root header + [action*="/search"] + div > div > aside:first-of-type {
				/* イラストページ */
				margin-top: 22px;
			}
			#wrapper {
				/* イラストページ以外 */
				margin-top: unset;
			}

			/*====================================
				移動元のスペースを詰める
			*/
			/*------------------------------------
				ヘッダ
			*/
			body:not(.show-logo) ._global-header .layout-wrapper {
				/* イラストページ以外 */
				height: 82px;
			}
			/* イラストページ */
			body:not(.show-logo) #root > header > div {
				min-height: unset;
			}
			body:not(.show-logo) #root > header > div > div:first-of-type {
				margin-bottom: 16px;
			}
			/*------------------------------------
				サイト名
			*/
			body:not(.show-logo) #root > header :not(li) > [href="/"], /* イラストページ */
			body:not(.show-logo) .header-logo {
				display: none;
			}
			/*------------------------------------
				ヘッダ内広告
			*/
			body:not(.show-logo) #root > header > div > div:first-of-type > div:nth-last-of-type(2), /* イラストページ */
			body:not(.show-logo) #header-banner {
				position: absolute; /* イラストページ */
				margin-left: 990px;
				width: calc(50% - 515px);
			}
			body:not(.show-logo) iframe, /* イラストページ */
			/* イラストページ以外 */
			body:not(.show-logo) #header-banner .multi-ads-area,
			body:not(.show-logo) #header-banner .multi-ads-area > div,
			body:not(.show-logo) #header-banner .multi-ads-area > div > div iframe,
			body:not(.show-logo) #header-banner .multi-ads-area > div > iframe,
			body:not(.show-logo) #header-banner .multi-ads-area > iframe {
				width: 100% !important;
			}
		</style>`);
	}
}

const pixivSearchOptions = new PixivSearchOptions();

/**
 * 設定を管理します。
 */
class PixivSearchOptionsSettings
{
	constructor()
	{
		startScript(
			async () => {
				if (await GM.getValue('show-logo', false)) {
					document.body.classList.add('show-logo');
				}
				GM.registerMenuCommand(_('pixiv 検索オプションを追加'), () => this.showDialog());
			},
			parent => parent === document.documentElement,
			target => target === document.body,
			() => document.body
		);
	}

	/**
	 * 設定ダイアログを表示します。
	 */
	async showDialog()
	{
		if (!this.dialog) {
			this.initialize();
		}

		pixivSearchOptions.changeShownLogo();

		const form = document.forms['pixiv-search-options-settings'];
		form['show-logo'].checked = await GM.getValue('show-logo', false);
		form['check-match-full-by-default-on-full-match-result'].checked
			= await GM.getValue('check-match-full-by-default-on-full-match-result', false);

		this.dialog.showModal();
	}

	/**
	 * @param {Event} event
	 */
	handleEvent(event)
	{
		switch (event.type) {
			case 'change':
				GM.setValue(event.target.name, event.target.checked);

				if (event.target.name === 'show-logo') {
					pixivSearchOptions.changeShownLogo();
				}
				break;

			case 'click':
				this.dialog.close();
				break;
		}
	}

	/**
	 * 設定ダイアログを構築します。
	 * @access private
	 */
	initialize()
	{
		document.head.insertAdjacentHTML('beforeend', `<style>
			/*====================================
				pixiv 検索オプションを表示 設定ダイアログ
			*/
			#pixiv-search-options-settings {
				border-radius: 0.5em;
				border-color: #69AFCA;
				border-width: 0.5em;
			}

			#pixiv-search-options-settings h1 {
				font-size: 1.5em;
				font-weight: bold;
				margin-bottom: 0.5em;
				text-align: center;
			}

			#pixiv-search-options-settings form {
				color: #333333;
			}

			#pixiv-search-options-settings form ul li {
				margin: 0.2em 0;
			}

			#pixiv-search-options-settings form label {
				display: flex;
				align-items: center;
			}

			#pixiv-search-options-settings form small {
				margin-left: 1.3em;
			}

			#pixiv-search-options-settings form [name="close"] {
				border: none;
				position: absolute;
				border-radius: 50%;
				position: absolute;
				top: -1em;
				right: -1em;
				width: 2.5em;
				height: 2.5em;
				background:
					black url("https://source.pixiv.net/www/images/common/icon_modal_close.png") no-repeat 50% 50%;
				cursor: pointer;
				overflow: hidden;
				white-space: nowrap;
				text-indent: 200%;
			}
		</style>`);

		document.body.insertAdjacentHTML('afterbegin', h`<dialog id="pixiv-search-options-settings">
			<h1>${_('pixiv 検索オプションを追加')}</h1>
			<form name="pixiv-search-options-settings">
				<ul>
					<li>
						<label><input type="checkbox" name="show-logo" />${_('ロゴを表示したままにする')}</label>
						<p><small class="settingColor">${_('この設定をオンにすると、ヘッダの高さが大きくなります。')}</small></p>
						<p><small class="settingColor">${_('別のタブでpixivを開いていた場合、この設定の変更はそのタブの再読み込み後に反映されます。')}</small></p>
					</li>
					<li>
						<label>
							<input type="checkbox" name="check-match-full-by-default-on-full-match-result" />${_('完全一致検索の結果ページで、最初は「完全一致」のラジオボタンにチェックを入れておく')}
						</label>
						<p><small class="settingColor">${_('この設定をオフにすると、最初は「部分一致」にチェックが入った状態になります。')}</small></p>
					</li>
				</ul>
				<button type="button" name="close">${_('閉じる')}</button>
			</form>
		</dialog>`);

		this.dialog = document.getElementById('pixiv-search-options-settings');
		this.polyfillDialogElements([this.dialog]);

		const form = document.forms['pixiv-search-options-settings'];
		form.addEventListener('change', this);
		form.close.addEventListener('click', this);
	}

	/**
	 * Microsoft Edge、およびFirefox向けに、dialog要素のpolyfillを行います。
	 * @access private
	 * @param {HTMLDialogElement[]} dialogs
	 * @returns {Promise.<void>}
	 */
	async polyfillDialogElements(dialogs)
	{
		document.head.insertAdjacentHTML(
			'beforeend',
			h`<link rel="stylesheet" href="${await GM.getResourceUrl('dialog-polyfill.css')}" />`
		);

		for (const dialog of dialogs) {
			/*globals dialogPolyfill */
			dialogPolyfill.registerDialog(dialog);
		}
	}
}

new PixivSearchOptionsSettings();

})();

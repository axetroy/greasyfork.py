// ==UserScript==
// @name        pixiv ツリー型コメント
// @name:ja     pixiv スタンプを削除
// @name:en     pixiv Stamp Eraser
// @description Deletes stamps on comment sections. In addition, changes the comment section’s default linear mode to threaded mode on comment sections in group pages.
// @description:ja コメント欄のスタンプを削除します。また、グループ機能において、返信コメントを返信先の下に移動します。
// @namespace   https://greasyfork.org/users/137
// @version     4.4.0
// @match       https://www.pixiv.net/*
// @exclude     https://www.pixiv.net/member_illust.php?*mode=manga*
// @exclude     https://www.pixiv.net/apps.php*
// @require     https://greasyfork.org/scripts/17895/code/polyfill.js?version=625392
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
// @homepageURL https://greasyfork.org/scripts/5291
// ==/UserScript==

(function () {
'use strict';

class StampEraser
{
	constructor()
	{
		const root = document.getElementById('root');
		if (!root) {
			return;
		}

		new MutationObserver(mutations => {
			for (const mutation of mutations) {
				const commentListParentSelector = 'main h2 ~ div:nth-of-type(2)';
				if (!mutation.target.matches(`${commentListParentSelector},
					${commentListParentSelector} > ul, ${commentListParentSelector} > ul *`)) {
					continue;
				}

				for (const element of mutation.addedNodes) {
					switch (element.localName) {
						case 'ul':
							this.deleteStampComments(element);
							break;
						case 'li':
							this.deleteIfStamp(element);
							break;
					}
				}
			}
		}).observe(root, {childList: true, subtree: true});
	}

	/**
	 * コメントリストからスタンプを削除します。
	 * @access private
	 * @param {HTMLLIElement} comment
	 */
	deleteStampComments(commentList)
	{
		for (const comment of Array.from(commentList.children)) {
			this.deleteIfStamp(comment);
		}
	}

	/**
	 * スタンプコメント、または絵文字単体のコメントであれば削除します。
	 * @access private
	 * @param {HTMLLIElement} comment
	 */
	deleteIfStamp(comment)
	{
		let emoji;
		if (!comment.querySelector('button, ul')
			&& (comment.querySelector('div[style*="/stamp/"]')
				|| (emoji = comment.querySelector('img[src*="/emoji/"]'))
					&& !emoji.previousSibling && !emoji.nextSibling)) {
			// 返信が存在しない、かつスタンプコメントか絵文字単体のコメントであれば
			if (comment.matches('ul ul li')) {
				// 返信コメントであれば
				const list = comment.parentElement;
				const parentComment = list.closest('li');
				if (comment.matches(':only-of-type') && !parentComment.getElementsByTagName('button')[0]) {
					// 他に返信が存在しなければ
					list.remove();
					this.deleteIfStamp(parentComment);
				} else {
					comment.remove();
				}
				return;
			}

			comment.hidden = true;
		}
	}
}

function main()
{
	document.head.insertAdjacentHTML('beforeend', `<style>
		/*====================================
			グループのコメント欄
		*/
		/*------------------------------------
			区切り線
		*/
		#page-group #timeline li.post div.comment div.post,
		#page-group #timeline li.post div.comment div.post ~ div.post {
			border-top: dashed 1px #DEE0E8;
			border-bottom: none;
		}
		#page-group #timeline li.post div.comment div.post::before {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			border-top: dashed 1px #FFFFFF;
		}
		#page-group #timeline li.post div.comment {
			border-bottom: dashed 1px #DEE0E8;
		}
		/*------------------------------------
			最初のコメント
		*/
		#page-group #timeline li.post div.comment > div.post:first-of-type,
		#page-group #timeline li.post div.comment > .tree:first-of-type > div.post:first-of-type,
		#page-group #timeline li.post div.comment > div.post:first-child::before,
		#page-group #timeline li.post div.comment > .tree:first-child > div.post:first-of-type::before {
			/* 一番上のコメント */
			/* 「以前のコメントを見る」ボタンがある時は、白色の破線は消さない */
			border-top: none;
		}
		/*------------------------------------
			返信コメント
		*/
		#page-group #timeline li.post div.comment .tree > :nth-of-type(n+2) {
			margin-left: 2em;
		}
		#page-group #timeline li.post div.comment .tree .postbody {
			width: initial;
		}
	</style>`);

	/**
	 * コメントリスト要素。
	 * @type {HTMLDivElement}
	 */
	const commentList = document.getElementById('timeline');

	/**
	 * {@link MutationObserver#observe}の第2引数に指定するオブジェクト。
	 * @type {MutationObserverInit}
	 */
	const observerOptions = {
		childList: true,
		subtree: true,
	};

	moveAllReplyComments();

	// コメントの増減を監視する
	new MutationObserver(function (mutations, observer) {
		const firstMutationRecord = mutations[0];
		const firstAddedNode = firstMutationRecord.addedNodes[0];
		if (firstAddedNode) {
			// コメントが増えていれば
			// 監視を一旦停止して返信コメントを移動する
			observer.disconnect();
			moveAllReplyComments();
			observer.observe(commentList, observerOptions);
		}
	}).observe(commentList, observerOptions);

	/**
	 * すべての返信コメントを返信先コメントの下に移動します。
	 */
	function moveAllReplyComments()
	{
		const repliedUserNames = document.querySelectorAll('.body > p > a');
		for (let i = repliedUserNames.length - 1; i >= 0; i--) {
			/**
			 * 返信先コメント投稿者名。
			 * @type {HTMLSpanElement}
			 */
			const repliedUserName = repliedUserNames[i];

			/**
			 * 返信先コメント。
			 * @type {?HTMLDivElement}
			 */
			const repliedComment = document.getElementById(repliedUserName.hash.replace('#', ''));

			if (repliedComment) {
				// 返信先コメントが存在すれば
				moveReplyComment(repliedComment, repliedUserName.closest('.post'));
				// 返信先コメント投稿者名を削除
				repliedUserName.parentElement.remove();
			}
		}
	}

	/**
	 * 返信コメントを返信先コメントの下に移動します。
	 * @param {HTMLDivElement} repliedComment - 返信先コメント。
	 * @param {HTMLDivElement} replyComment - 返信コメント。
	 */
	function moveReplyComment(repliedComment, replyComment)
	{
		if (!replyComment.previousElementSibling) {
			const parent = replyComment.parentNode;
			if (parent && parent.classList.contains('tree')) {
				// 返信コメントにラッパー要素が存在すれば
				replyComment = parent;
			}
		}

		/**
		 * 返信先コメントと返信コメントを格納するラッパー要素。
		 * @type {HTMLDivElement}
		 */
		let tree = null;
		if (!repliedComment.previousElementSibling) {
			const parent = repliedComment.parentNode;
			if (parent.classList.contains('tree')) {
				// ラッパー要素がすでに存在すれば
				tree = parent;
			}
		}

		if (!tree) {
			// ラッパー要素が存在しなければ
			// ラッパー要素を作成
			tree = document.createElement('div');
			tree.classList.add('tree');
			// 返信先コメントをラッパー要素に置換
			repliedComment.replaceWith(tree);
			// 返信先コメントをラッパーに追加
			tree.append(repliedComment);
		}

		// 返信コメント移動
		tree.append(replyComment);
	}
}

if (location.pathname.startsWith('/group/')) {
	startScript(
		main,
		parent => parent.id === 'wrapper',
		target => target.id === 'template-drawr-paint-ui',
		() => document.getElementById('template-drawr-paint-ui')
	);
} else {
	document.addEventListener('DOMContentLoaded', function () {
		new StampEraser();
	}, { passive: true, once: true });
}

})();

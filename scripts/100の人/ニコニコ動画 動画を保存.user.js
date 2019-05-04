// ==UserScript==
// @name        ニコニコ動画 動画を保存
// @name:ja     ニコニコ動画 動画を保存
// @description Gets the URL of the video file.
// @description:ja 動画ファイルに直接アクセスする URL を提供
// @namespace   http://userscripts.org/users/347021
// @version     3.1.0
// @match       *://www.nicovideo.jp/watch/*
// @exclude     *://www.nicovideo.jp/watch/*?*edit=owner*
// @exclude     *://www.nicovideo.jp/watch/*?*edit=comment*
// @require     https://cdn.rawgit.com/greasemonkey/gm4-polyfill/a834d46afcc7d6f6297829876423f58bb14a0d97/gm4-polyfill.js
// @require     https://greasyfork.org/scripts/17895/code/polyfill.js?version=625392
// @require     https://greasyfork.org/scripts/19616/code/utilities.js?version=230651
// @license     MPL-2.0
// @compatible  Firefox
// @compatible  Opera
// @compatible  Chrome
// @grant       GM.registerMenuCommand
// @grant       GM_registerMenuCommand
// @grant       GM.setValue
// @grant       GM_setValue
// @grant       GM.getValue
// @grant       GM_getValue
// @grant       GM.notification
// @grant       GM_notification
// @grant       GM.xmlHttpRequest
// @grant       GM_xmlhttpRequest
// @connect     nicovideo.jp
// @noframes
// @run-at      document-end
// @icon        data:image/vnd.microsoft.icon;base64,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
// @author      100の人
// @homepageURL https://greasyfork.org/scripts/269
// @contributor JixunMoe https://greasyfork.org/users/44
// ==/UserScript==

(function () {
'use strict';

// L10N
Gettext.setLocalizedTexts({
	/*eslint-disable quote-props, max-len */
	'en': {
		'動画を保存': 'Video download',
		'停止する': 'Stop',
		'動画情報の取得に失敗しました。': 'Getting the video information failed.',
		'動画ファイルにアクセスできませんでした。': 'The script could not access the video file.',
		'ページを更新し、ログインが切れていないかご確認ください。': 'Please reload and make sure whether you are still logged in or not (check if session has expired).',
		'プレイヤーを表示する場合は %s してください。': '%s to re-show the player.',
		'ページを更新': 'Reload the page',
		'ファイル名に動画IDを付加する。': 'Adds video ID to a file name.',
	},
	'zh-TW': {
		'動画を保存': '動畫下載',
		'停止する': '停止',
		'動画情報の取得に失敗しました。': '',
		'動画ファイルにアクセスできませんでした。': '',
		// Translation for chinese... - Greasy Forum <https://greasyfork.org/forum/discussion/62/translation-for-chinese-/p1>
		'ページを更新し、ログインが切れていないかご確認ください。': '請重新整理頁面檢查登入信息是否過期。',
		'プレイヤーを表示する場合は %s してください。': '',
		'ページを更新': '',
		'ファイル名に動画IDを付加する。': '',
	},
	// Translation for chinese... - Greasy Forum <https://greasyfork.org/forum/discussion/62/translation-for-chinese-/p1>
	'zh-CN': {
		'動画を保存': '动画下载',
		'停止する': '停止',
		'動画情報の取得に失敗しました。': '',
		'動画ファイルにアクセスできませんでした。': '',
		'ページを更新し、ログインが切れていないかご確認ください。': '请刷新页面检查您的登录信息是否过期。',
		'ページを更新': '',
		'ファイル名に動画IDを付加する。': '',
	},
	/*eslint-enable quote-props, max-len */
});



/**
 * 動画ファイルを解放するまでの時間 (分)。
 * @constant {number}
 */
const LIFEMINUTES_OF_VIDEO = 10;

/**
 * スクリプトを有効にするページのGETパラメータ等に使用するID。
 * 半角英数とハイフンのみからなる文字列。
 * @constant {string}
 */
const ID = 'niconico-video-get-file-uri-347021';

/**
 * @property {Object}              shared
 * @property {string}              shared.videoId  - 動画ID。一度でもスクリプトを実行していれば存在する。
 * @property {string}              shared.title    - 動画のタイトル。
 * @property {string}              shared.type     - 動画のMIMEタイプ。
 * @property {boolean}             shared.busy     - 実行中なら `true`。
 * @property {HTMLProgressElement} shared.progress - 動画の読み込み状態を表示する要素。
 * @property {HTMLButtonElement}   shared.button   - 読み込み停止ボタン。
 * @property {Promise.<boolean>|boolean} shared.fileNameWithVideoId - ファイル名に動画IDを付加するなら真。
 * @property {AbortController|undefined} shared.abortController - 読み込み停止を行うabort()メソッドを持つオブジェクト。
 */
const shared = {};

if (document.getElementsByClassName('videoHeaderTitle')[0]) {
	// 非公開でなければ
	main();
}

async function main()
{
	// メニュー項目の作成
	GM.registerMenuCommand(_('動画を保存'), async function () {
		if (!shared.busy) {
			// 実行中でなければ
			shared.busy = true;
			if (!shared.videoId) {
				// 動画ページを開いて最初の実行なら
				// プレイヤーのフルスクリーンを解除する
				GreasemonkeyUtils.executeOnUnsafeContext(/*global PlayerApp: true */function () {
					PlayerApp.ns.player.Nicoplayer.getInstance().getExternalNicoplayer().ext_setVideoSize('normal');
				});
				// 動画IDの取得
				shared.videoId = location.pathname.replace('/watch/', '');
				// 動画のタイトルを取得
				shared.title
					= convertSpecialCharacter(document.getElementsByClassName('videoHeaderTitle')[0].textContent);
				// プレイヤーの親要素を取得
				const parent = document.getElementById('playerContainer');
				// 進捗情報を表すバー、停止ボタンなどを表示
				parent.innerHTML = h`<progress value="0"></progress>
					<button type="button" name="stop" disabled="">${_('停止する')}</button>
					<p><label><input type="checkbox" name="with-video-id" checked="" />
						${_('ファイル名に動画IDを付加する。')}</label></p>
					<p>` + h(_('プレイヤーを表示する場合は %s してください。'))
						.replace('%s', '<button type="button" name="reload">' + h(_('ページを更新')) + '</button>') + '</p>';
				shared.progress = parent.getElementsByTagName('progress')[0];
				shared.button = parent.querySelector('[name="stop"]');
				parent.addEventListener('click', function (event) {
					if (event.target.localName === 'button') {
						switch (event.target.name) {
							case 'stop':
								// 停止ボタン
								stopScript();
								break;
							case 'reload':
								// 更新ボタン
								location.reload();
								break;
						}
					}
				});
				const withVideoIdCheckbox = parent.querySelector('[name="with-video-id"]');
				shared.fileNameWithVideoId = GM.getValue('fileNameWithVideoId', true)
					.then(value => withVideoIdCheckbox.checked = shared.fileNameWithVideoId = value);
				withVideoIdCheckbox.addEventListener('change', function (event) {
					GM.setValue('fileNameWithVideoId', shared.fileNameWithVideoId = event.target.checked);
				});
			}

			// ページを再読み込み
			openVideoFile(await getVideoURL());

			// ページ側のコンテキストからのメッセージ待ち受け
			addEventListener('message', receiveMessage);
			GreasemonkeyUtils.executeOnUnsafeContext(
				addEventListenerReceivingBinary,
				[ID, LIFEMINUTES_OF_VIDEO * DateUtils.MINUTES_TO_MILISECONDS]
			);
		}
	}, 's');

	/**
	 * ページ側のコンテキストで実行する関数。
	 * @param {string} id - messageイベントで当スクリプトの通信を識別するためのID。
	 * @param {number} timeout - Blob URLを破棄するまでのミリ秒数。
	 */
	function addEventListenerReceivingBinary(id, timeout) {
		addEventListener('message', function receiveBinary(event) {
			if (event.origin === location.origin) {
				const data = event.data;
				if (typeof data === 'object' && data !== null && data.id === id && data.type) {
					/* メッセージイベントリスナーの削除 */
					removeEventListener('message', receiveBinary);
					/* バイナリ文字列のBlobへの変換、Blob URLの生成 */
					const url = URL.createObjectURL(new Blob([data.arraybuffer], {type: data.type}));
					/* Blob URLをGreasemonkeyスクリプトのコンテキストに送る */
					postMessage({id: id, url: url}, location.origin);
					/* 一定時間後、Blob URLに紐づく資源を解放 */
					setTimeout(URL.revokeObjectURL, timeout, url);
				}
			}
		});
	}
}

/**
 * ページ側のコンテキストからメッセージを受け取るイベントリスナー。
 * @param {MessageEvent} event
 */
async function receiveMessage(event)
{
	if (isDataToThisScript(event.data) && event.data.url) {
		// Blob URLを受け取る
		MarkupUtils.download(
			event.data.url,
			shared.title + (await shared.fileNameWithVideoId ? ` (${shared.videoId})` : '')
				+ typeToExtension(shared.type)
		);
		stopScript();
	}
}

/**
 * {@link stopScript}を実行し、ログインを促す。
 * @param {string} [message]
 */
function reportLoginError(message = '')
{
	// スクリプトの実行を停止する
	stopScript();
	// 警告ダイアログを表示する
	alert([
		message,
		_('ページを更新し、ログインが切れていないかご確認ください。'),
	].join(' '));
}

/**
 * スクリプトの実行を停止する (終了処理)。
 */
function stopScript()
{
	// メッセージイベントリスナーの削除
	removeEventListener('message', receiveMessage);
	// 停止ボタンを無効化
	shared.button.disabled = true;

	if (shared.busy && shared.abortController) {
		shared.abortController.abort();
	}

	shared.busy = false;
}

/**
 * 当スクリプト宛てのメッセージなら真を返す。
 * @param {*} data - MessageEventインスタンスのdataプロパティ値。
 * @returns {boolean}
 */
function isDataToThisScript(data)
{
	return typeof data === 'object' && data !== null && data.id === ID;
}

/**
 * ページから、動画のURLを取得します。
 * @returns {Promise.<string>}
 */
async function getVideoURL()
{
	const watchAPIDataContainer = new DOMParser()
		.parseFromString(await (await fetch(location.href, { credentials: 'same-origin' })).text(), 'text/html')
		.getElementById('watchAPIDataContainer');
	if (!watchAPIDataContainer) {
		reportLoginError(_('動画情報の取得に失敗しました。'));
		return Promise.reject();
	}
	return new URLSearchParams(decodeURIComponent(JSON.parse(watchAPIDataContainer.textContent).flashvars.flvInfo))
		.get('url');
}

/**
 * 動画ファイルを取得し、進捗状況を表示する。
 * @param {string} url - 動画ファイルのURL。
 */
function openVideoFile(url)
{
	shared.abortController = GM.xmlHttpRequest({
		method: 'GET',
		url,
		responseType: 'arraybuffer',
		onerror: responseObject => { throw new DOMException('', 'NetworkError'); },
		onprogress(responseObject)
		{
			if (responseObject.lengthComputable) {
				shared.progress.value = responseObject.loaded;
				shared.progress.max = responseObject.total;
			}
		},
		onload(responseObject)
		{
			if (responseObject.status === 200) {
				postMessage({
					id: ID,
					arraybuffer: responseObject.response,
					type:
						shared.type = correctMimeType(/^content-type: (.+)$/mi.exec(responseObject.responseHeaders)[1]),
				}, location.origin);
			} else {
				// 取得に失敗していればログインを促す
				reportLoginError(_('動画ファイルにアクセスできませんでした。'));
			}
		},
	});

	if (shared.abortController) {
		// 停止ボタンを有効化
		shared.button.disabled = false;
	}
}

/**
 * MIMEタイプに対応する拡張子を返す。
 * @param {string} type - MIMEタイプ。
 * @returns {string} ピリオドを含む拡張子。
 */
function typeToExtension(type)
{
	switch (type.toLowerCase()) {
		case 'video/mp4':
			return '.mp4';
		case 'video/x-flv':
			return '.flv';
		case 'application/x-shockwave-flash':
			return '.swf';
	}
	return '';
}

/**
 * MIMEタイプが間違っていれば正しいタイプを返す。
 * @param {string} type
 * @returns {string}
 */
function correctMimeType(type)
{
	switch (type.toLowerCase()) {
		case 'video/flv':
			return 'video/x-flv';
	}
	return type;
}

/**
 * ファイル名に使用できないASCII記号を全角に変換する。
 * ただしWindowsにおいて、「AUX」等の完全一致した場合に使用できない文字列は置換しない。
 * @param {string} str
 * @returns {string}
 */
function convertSpecialCharacter(str)
{
	/*eslint-disable no-control-regex */
	str = str.replace(/[\x00-\x1F\x7F]+/g, '')	// 制御文字を削除
	/*eslint-enable no-control-regex */
		.replace(/ {2,}/g, ' ')	// 連続する半角空白を1つに
		.replace(/^ | $/g, '')	// 先頭末尾の半角空白を削除
		.replace(/\/|^\./g, convertCharacterToFullwidth);	// スラッシュ、先頭のピリオドを全角に

	if (navigator.platform.toLowerCase().includes('win')
		|| navigator.userAgent.includes('Android')) {
		// Windows、又はAndroidの場合
		str = str.replace(/[\\<>:"/|?*]/, convertCharacterToFullwidth);
	}

	return str;
}

/**
 * 半角空白を除く1文字のASCII印字可能文字を対応する全角文字に変換する。
 * ASCII印字可能文字以外と半角空白の入力は想定しない。
 * @param {string} character - 半角空白を除くASCII印字可能文字。
 * @returns {string}
 */
function convertCharacterToFullwidth(character)
{
	/**
	 * UTF-16において、空白を除くASCII文字を対応する全角形に変換するときの加数
	 * @constant {string}
	 */
	const BETWEEN_HALF_AND_FULL = '～'.charCodeAt() - '~'.charCodeAt();

	return String.fromCharCode(character.charCodeAt() + BETWEEN_HALF_AND_FULL);
}

})();

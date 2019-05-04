// ==UserScript==
// @name        Drag & DropZones +
// @name:ja     Drag & DropZones +
// @description [userChromeJS] Drag selected character strings or image and drop to the semitransparent box displayed on web page to open search result.
// @description:ja 【userChromeJS】選択した文字列などをドラッグし、ページ上に表示される半透明の枠内にドロップすることで、Web検索などを実行する
// @namespace   https://userscripts.org/users/347021
// @version     3.4.1
// @include     main
// @license     MPL-2.0
// @compatible  Firefox userChromeJS用スクリプト です (※GreasemonkeyスクリプトでもuserChromeES用スクリプトでもありません) / This script is for userChromeJS (* neither Greasemonkey nor userChromeES)
// @incompatible Opera
// @incompatible Chrome
// @charset     UTF-8
// @author      100の人
// @contributor HADAA
// @homepage    https://greasyfork.org/scripts/264
// ==/UserScript==

(function () {
'use strict';

/**
 * L10N
 * @type {LocalizedTexts}
 */
const localizedTexts = {
	/*eslint-disable quote-props, max-len */
	'en': {
		'Drag & DropZones +': 'Drag & DropZones +',

		'検索エンジン名': 'Search engine name',
		'他と重複しないエンジン名を入力してください。': 'Please input search engine names without repetition.',
		'URL・POSTパラメータ': 'URL, POST parameters',
		'POSTパラメータの設定': 'Setting POST parameters',
		'名前': 'name',
		'値': 'value',
		'メソッド': 'Method',
		'データの種類': 'Data type',
		'文字列': 'String',
		'画像': 'Image',
		'音声': 'Audio',
		'文字符号化方式': 'Character encoding scheme',
		'キャンセル': 'Cancel',
		'OK': 'OK',

		'行を追加': 'Add row',
		'行を削除': 'Delete row',
		'上に新しい行を挿入': 'Insert new row above',
		'下に新しい行を挿入': 'Insert new row below',
		'上に新しい行を挿入します。': 'Insert new row above.',
		'下に新しい行を挿入します。': 'Insert new row below.',
		'上の行に移動します。': 'Move focus to above row.',
		'下の行に移動します。': 'Move focus to below row.',
		'行をドラッグ & ドロップで、順番を変更できます。': 'Drag and drop row to change order.',

		'アイコンボタンのポップアップメニューから、アイコンを変更できます。検索窓のエンジンのアイコンは変更できません。':
			'You can change icon via the icon button pop-up menu. You cannot modify the search engine icon in the search bar.',
		'アイコンを変更': 'Modify icon',
		'元のアイコンに戻す': 'Restore to default icon',
		'ローカルファイルからアイコンを設定': 'Set icon from local file',
		'画像ファイルを選択してください。': 'Please choose image file.',
		'Webページ、または画像ファイルのURLからアイコンを設定': 'Set icon by URL of Web page or image file',
		'Webページ、または画像ファイルのURLを入力してください。': 'Please input URL of Web page or image file.',
		'アイコンの設定に失敗しました。約 %s KiB までの画像を設定できます。': 'Setting icon failed. Image up to about %s KiB can be set.',
		'クリップボードのURL、または画像データからアイコンを設定': 'Set icon by URL or image data on clipboard',
		'クリップボードからデータを取得できませんでした。': 'Could not get data from clipboard.',
		'指定されたURLに接続できませんでした。': 'Connection to specified URL failed.',
		'https:// などで始まるURLを入力してください。': 'Specify URL starting with "https://" etc.',
		'アイコンを取得できませんでした。WebページのURLであれば、一度ブラウザでページを表示してみてください。':
			'Could not get icon. If you have input a URL of a Web page, please open that page in your browser once.',
		'アイコンを一括取得': 'Collectively get icons',
		'アイコン未取得の検索エンジンについて、URLを基にアイコンを取得します。アイコンボタンのポップアップメニューの「元のアイコンに戻す」から、個別に取得することもできます。':
			'Get icons from URL for search engines without an icon. You can choose "Restore to default icon" from the icon button pop-up menu to get individual ones.',
		'アイコンの取得が完了しました。': 'Completed getting icons.',

		'検索窓のエンジンの追加': 'Add engine in Search Bar',
		'選択してください': 'Choose',
		'検索結果を開く場所': 'Where to open search result',
		'現在のタブ。Ctrl、Shiftキーを押していれば、それぞれ新しいタブ、ウィンドウ': 'Current tab. If Ctrl or Shift key is pressed, it will open in a new tab or window, respectively',
		'新しいタブ': 'New tab',
		'新しいウィンドウ': 'New window',
		'検索窓に新しい検索エンジンが追加されたとき、自動的にドロップゾーンとしても追加する。':
			'When new engine is added to Search Bar, a dropzone will also be automatically created.',
		'テキスト入力欄のキーボードショートカット': 'Keyboard Shortcuts in input box',
		'または': 'or',

		'インポートとエクスポート': 'Import and export',
		'インポート': 'Import',
		'現在の設定をすべて削除し、XMLファイルから設定をインポートします。ブラウザの検索エンジンサービスに同名の検索エンジンが存在する場合は、そちらを優先します。':
			'Delete all settings, then import settings from XML file. If the browser search service with the same name already exists, the existing one takes priority.',
		'%s からのインポートに失敗しました。': 'Import from "%s" failed.', // %sはファイル名
		'XMLパースエラーです。': 'XML parse error occured.',
		'検索エンジンが一つも見つかりませんでした。': 'Not even one search engine was found.',
		'%s からのインポートが完了しました。': 'Import from "%s" completed.', // %sはファイル名
		'エクスポート': 'Export',
		'現在の設定をファイルへエクスポートします。保存していない設定は反映されません。': 'Export current settings to file. Not yet saved settings are not reflected.',
		'%s へ設定をエクスポートしました。': 'Export to "%s" completed.', // %sはファイルパス
		'追加インポート': 'Additional import',
		'XMLファイルから検索エンジンを追加します。同名の検索エンジンがすでに存在する場合は上書きします。':
			'Add search engine from XML file. If a search engine with the same name already exists, overwrite it.',
		'インポートした設定を保存するには、「OK」ボタンをクリックしてください。': 'Click "OK" button to save import data.',
		'JSON文字列から追加インポート': 'Additional import from JSON string',
		'本スクリプトのバージョン1でエクスポートしたJSON文字列から、検索エンジンを追加します。':
			'Add search engine from JSON string exported by version 1 of this script.',
		'JSON文字列を貼り付けてください。': 'Please paste JSON string.',
		'JSON文字列からのインポートに失敗しました。': 'Import from JSON string failed.',
		'JSONパースエラーです。': 'JSON parse error occured.',
		'JSON文字列からのインポートが完了しました。': 'Import form JSON string completed.',

		'その他': 'Others',
		'設定を初期化': 'Initialize the settings',
		'すべての設定を削除し、初回起動時の状態に戻します。': 'Delete all settings, then restore to first starting state.',
		'本当に、『%s』のすべての設定を削除してもよろしいですか？':
			'Are you sure you want to delete all settings of "%s" ?', // %sは当スクリプト名
		'設定の初期化が完了しました。': 'Settings initialization completed.',
		'すべての設定を削除': 'Delete all settings',
		'すべての設定を削除し、スクリプトを停止します。': 'Delete all settings, and stop this script.',
		'設定の削除が完了しました。当スクリプト自体を削除しなければ、次回のブラウザ起動時にまた設定が作成されます。':
			'Completed deleting all settings. If you don\'t delete this script, settings will be created again when you start your browser next time.',

		'Google 画像で検索': 'Google search by image',
	},
	/*eslint-enable quote-props, max-len */
};



Cu.import('resource://gre/modules/Services.jsm');
Cu.import('resource://gre/modules/FileUtils.jsm');
Cu.import('resource://gre/modules/Preferences.jsm');

const ScriptableUnicodeConverter
	= Cc['@mozilla.org/intl/scriptableunicodeconverter'].createInstance(Ci.nsIScriptableUnicodeConverter);

const TextToSubURI = Cc['@mozilla.org/intl/texttosuburi;1'].getService(Ci.nsITextToSubURI);
const MIMEService = Cc['@mozilla.org/mime;1'].getService(Ci.nsIMIMEService);
const ImgTools = Cc['@mozilla.org/image/tools;1'].getService(Ci.imgITools);

const StringInputStream
	= Components.Constructor('@mozilla.org/io/string-input-stream;1', 'nsIStringInputStream', 'setData');
const FileInputStream
	= Components.Constructor('@mozilla.org/network/file-input-stream;1', 'nsIFileInputStream', 'init');
const BinaryInputStream
	= Components.Constructor('@mozilla.org/binaryinputstream;1', 'nsIBinaryInputStream', 'setInputStream');
const FilePicker = Components.Constructor('@mozilla.org/filepicker;1', 'nsIFilePicker', 'init');
const Transferable = Components.Constructor('@mozilla.org/widget/transferable;1', 'nsITransferable', 'addDataFlavor');
const ConverterOutputStream
	= Components.Constructor('@mozilla.org/intl/converter-output-stream;1', 'nsIConverterOutputStream', 'init');

const Cr = new Proxy(window.Cr, {
	get: function (target, name, receiver) {
		if (name in target) {
			return target[name];
		} else if (name === 'NS_ERROR_UCONV_NOCONV') {
			return 0x80500001;
		} else {
			return undefined;
		}
	},
});



/**
 * HTML、XML、DOMに関するメソッド等。
 */
const MarkupUtils = {
	/**
	 * Atom名前空間。
	 * @constant {string}
	 */
	ATOM_NAMESPACE: 'http://www.w3.org/2005/Atom',

	/**
	 * XMLの特殊文字と文字参照の変換テーブル。
	 * @constant {Object.<string>}
	 */
	CHARACTER_REFERENCES_TRANSLATION_TABLE: {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&apos;',
	},

	/**
	 * XMLの特殊文字を文字参照に置換します。
	 * @see [html - HtmlSpecialChars equivalent in Javascript? - Stack Overflow]{@link https://stackoverflow.com/a/4835406}
	 * @param {string} str - プレーンな文字列。
	 * @returns {string} HTMLとして扱われる文字列。
	 */
	convertSpecialCharactersToCharacterReferences(str) {
		return String(str).replace(
			/[&<>"']/g,
			specialCharcter => this.CHARACTER_REFERENCES_TRANSLATION_TABLE[specialCharcter]
		);
	},

	/**
	 * テンプレート文字列のタグとして用いることで、式内にあるXMLの特殊文字を文字参照に置換します。
	 * @param {string[]} htmlTexts
	 * @param {...string} plainText
	 * @returns {string} HTMLとして扱われる文字列。
	 */
	escapeTemplateStrings(htmlTexts, ...plainTexts) {
		return String.raw(
			htmlTexts,
			...plainTexts.map(plainText => this.convertSpecialCharactersToCharacterReferences(plainText))
		);
	},

	/**
	 * 指定したURLからファイルをダウンロードします。
	 * @param {string} url
	 * @param {string} filename
	 */
	download(url, filename) {
		let body = document.body;
		body.insertAdjacentHTML('beforeend', h`<a href="${url}" download="${filename}" hidden=""></a>`);
		let anchor = body.lastElementChild;
		anchor.click();
		anchor.remove();
	},
};

/**
 * {@link MarkupUtils.escapeTemplateStrings}、
 * または {@link MarkupUtils.convertSpecialCharactersToCharacterReferences} の短縮表記。
 * @example
 * // returns "<code>&lt;a href=&quot;https://example.com/&quot;link text&lt;/a&gt;</code>"
 * h`<code>${'<a href="https://example.com/">link text</a>'}</code>`;
 * @example
 * // returns "&lt;a href=&quot;https://example.com/&quot;link text&lt;/a&gt;"
 * h('<a href="https://example.com/">link text</a>');
 * @returns {string}
 */
function h()
{
	return Array.isArray(arguments[0])
		? MarkupUtils.escapeTemplateStrings(...arguments)
		: MarkupUtils.convertSpecialCharactersToCharacterReferences(arguments[0]);
}

// i18n
let _, gettext, setlang, setLocalizedTexts;
{
	/**
	 * 翻訳対象文字列 (msgid) の言語。
	 * @constant {string}
	 */
	const ORIGINAL_LOCALE = 'ja';

	/**
	 * クライアントの言語の翻訳リソースが存在しないとき、どの言語に翻訳するか。
	 * @constant {string}
	 */
	const DEFAULT_LOCALE = 'en';

	/**
	 * 以下のような形式の翻訳リソース。
	 * {
	 *     'IETF言語タグ': {
	 *         '翻訳前 (msgid)': '翻訳後 (msgstr)',
	 *         ……
	 *     },
	 *     ……
	 * }
	 * @typedef {Object} LocalizedTexts
	 */

	/**
	 * クライアントの言語。{@link setlang}から変更される。
	 * @type {string}
	 * @access private
	 */
	let langtag = 'ja';

	/**
	 * クライアントの言語のlanguage部分。{@link setlang}から変更される。
	 * @type {string}
	 * @access private
	 */
	let language = 'ja';

	/**
	 * 翻訳リソース。{@link setLocalizedTexts}から変更される。
	 * @type {LocalizedTexts}
	 * @access private
	 */
	const multilingualLocalizedTexts = {};
	multilingualLocalizedTexts[ORIGINAL_LOCALE] = {};

	/**
	 * テキストをクライアントの言語に変換する。
	 * @param {string} message - 翻訳前。
	 * @returns {string} 翻訳後。
	 */
	_ = gettext = function (message) {
		// クライアントの言語の翻訳リソースが存在すれば、それを返す
		return langtag in multilingualLocalizedTexts && multilingualLocalizedTexts[langtag][message]
				// 地域下位タグを取り除いた言語タグの翻訳リソースが存在すれば、それを返す
				|| language in multilingualLocalizedTexts && multilingualLocalizedTexts[language][message]
				// デフォルト言語の翻訳リソースが存在すれば、それを返す
				|| DEFAULT_LOCALE in multilingualLocalizedTexts && multilingualLocalizedTexts[DEFAULT_LOCALE][message]
				// そのまま返す
				|| message;
	};

	/**
	 * {@link gettext}から参照されるクライアントの言語を設定する。
	 * @param {string} lang - IETF言語タグ。（「language」と「language-REGION」にのみ対応）
	 */
	setlang = function (lang) {
		lang = lang.split('-', 2);
		language = lang[0].toLowerCase();
		langtag = language + (lang[1] ? '-' + lang[1].toUpperCase() : '');
	};

	/**
	 * {@link gettext}から参照される翻訳リソースを追加する。
	 * @param {LocalizedTexts} localizedTexts
	 */
	setLocalizedTexts = function (localizedTexts) {
		for (let lang in localizedTexts) {
			const localizedText = localizedTexts[lang];
			lang = lang.split('-');
			const language = lang[0].toLowerCase();
			const langtag = language + (lang[1] ? '-' + lang[1].toUpperCase() : '');

			if (langtag in multilingualLocalizedTexts) {
				// すでに該当言語の翻訳リソースが存在すれば、統合する（同じmsgidがあれば上書き）
				for (const msgid in localizedText) {
					multilingualLocalizedTexts[langtag][msgid] = localizedText[msgid];
				}
			} else {
				multilingualLocalizedTexts[langtag] = localizedText;
			}

			if (language !== langtag) {
				// 言語タグに地域下位タグが含まれていれば
				// 地域下位タグを取り除いた言語タグも翻訳リソースとして追加する
				if (language in multilingualLocalizedTexts) {
					// すでに該当言語の翻訳リソースが存在すれば、統合する（同じmsgidがあれば無視）
					for (const msgid in localizedText) {
						if (!(msgid in multilingualLocalizedTexts[language])) {
							multilingualLocalizedTexts[language][msgid] = localizedText[msgid];
						}
					}
				} else {
					multilingualLocalizedTexts[language] = localizedText;
				}
			}

			// msgidの言語の翻訳リソースを生成
			for (const msgid in localizedText) {
				multilingualLocalizedTexts[ORIGINAL_LOCALE][msgid] = msgid;
			}
		}
	};
}

setLocalizedTexts(localizedTexts);

setlang(window.navigator.language);



/**
 * オブザーバサービスを利用して、各ウィンドウと通知を送受信する。
 * @version 2014-05-10
 */
const ObserverUtils = {
	/**
	 * オブザーバを追加する。
	 * @param {string} id - 当スクリプトに関する通知のID。
	 */
	init: function (id) {
		this.id = id;
		Services.obs.addObserver(this, this.id, false);
		window.addEventListener('unload', () => this.stop());
	},

	/**
	 * オブザーバを削除する。
	 */
	stop: function () {
		Services.obs.removeObserver(this, this.id);
	},

	/**
	 * 通知を受け取る関数を登録する。同じtypeの場合は上書きされる。
	 * @param {string} type
	 * @param {Object} observer - observeメソッドを持つオブジェクト。
	 */
	register: function (type, observer) {
		this.observers[type] = observer;
	},

	/**
	 * 通知。
	 * @param {string} type
	 * @param {*} [data]
	 */
	notify: function (type, data = null) {
		Services.obs.notifyObservers(data, this.id, type);
	},

	/**
	 * オブザーバのリスト。
	 * @type {Object}
	 * @access protected
	 */
	observers: {},

	/**
	 * 当スクリプトに関する通知のID。
	 * @type {string}
	 * @access protected
	 */
	id: null,

	/**
	 * 通知を受け取るメソッド。
	 * @param {*} subject
	 * @param {string} topic
	 * @param {string} data
	 * @access protected
	 */
	observe: function (subject, topic, data) {
		if (data in this.observers) {
			// 対応するオブザーバが存在すれば
			this.observers[data].observe(subject);
		}
	},
};



/**
 * クリップボードに関する操作。
 */
const ClipboardUtils = {
	/**
	 * クリップボードからテキスト情報を取得する。
	 * @param {number} whichClipboard {@link Services.clipboard.kSelectionClipboard}か{@link Services.clipboard.kGlobalClipboard}
	 * @returns {?string}
	 */
	getText: function (whichClipboard) {
		if (Services.clipboard.hasDataMatchingFlavors(['text/unicode'], 1, whichClipboard)) {
			// テキストデータが保持されていれば
			const transferable = new Transferable('text/unicode'), data = {};
			Services.clipboard.getData(transferable, whichClipboard);
			transferable.getTransferData('text/unicode', data, {});
			return data.value.QueryInterface(Ci.nsISupportsString).data;
		} else {
			return null;
		}
	},
};



/**
 * DOM関連のメソッド。
 */
const DOMUtils = {
	/**
	 * HTML名前空間。
	 * @constant {string}
	 */
	HTML_NS: 'http://www.w3.org/1999/xhtml',

	/**
	 * 属性値を{@link DOMTokenList}として取得する。
	 * @param {Element} element - 要素。
	 * @param {string} attributeName - 属性値名。
	 * @returns {DOMTokenList}
	 * @see {@link https://dom.spec.whatwg.org/#interface-domtokenlist 7.1. Interface DOMTokenList | DOM Standard}
	 */
	getAttributeAsDOMTokenList: function (element, attributeName) {
		const tokenList = document.createElementNS(this.HTML_NS, 'div').classList;
		tokenList.value = element.getAttribute(attributeName) || '';
		return tokenList;
	},

	/**
	 * ノードに対応するfigcaption要素を取得する。
	 * @param {Node} node
	 * @returns {?HTMLElement}
	 */
	getFigcaption: function (node) {
		let figcaption = null;

		const parent = node.parentElement;
		if (parent && parent.localName === 'figure') {
			const first = parent.firstElementChild;
			if (first) {
				if (first.localName === 'figcaption') {
					figcaption = first;
				} else {
					const last = parent.lastElementChild;
					if (last && last.localName === 'figcaption') {
						figcaption = last;
					}
				}
			}
		}

		return figcaption;
	},

	/**
	 * 指定されたノードの子孫要素に、適宜改行とインデントを挿入し読みやすくする。
	 * すでに改行やインデントが含まれていることは想定しない。
	 * @param {Node} root
	 * @returns {Node}
	 */
	toPrettyXML: function (root) {
		const walker = (root.ownerDocument || root).createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
		let indent = 0;
		while (true) {
			if (walker.firstChild()) {
				// 子要素を操作し、存在すればインデントを増やす
				indent++;
			} else {
				// 子要素が存在しなければ、次の同胞要素が存在する親要素を走査する
				while (true) {
					if (walker.nextSibling()) {
						break;
					} else if (walker.parentNode()) {
						indent--;
					} else {
						// すべての要素を走査し終えていれば
						return root;
					}
				}
			}
			// 要素の前に改行とインデントを挿入する
			walker.currentNode.parentNode.insertBefore(new Text('\n' + '\t'.repeat(indent)), walker.currentNode);
			if (!walker.currentNode.nextElementSibling) {
				// 次の同胞要素が存在しなければ、要素の後ろに改行とインデントを追加する
				walker.currentNode.parentNode.appendChild(new Text('\n' + '\t'.repeat(indent - 1)));
			}
		}
	},
};



/**
 * フォームデータ集合の各エントリ。
 * @typedef FormDataEntry
 * @type {Array}
 * @property {string} 0 - 名前。
 * @property {string} 1 - 値。
 * @see [Interface FormData - XMLHttpRequest Standard]{@link https://xhr.spec.whatwg.org/#interface-formdata}
 */

/**
 * 文字列操作。
 */
const StringUtils = {
	/**
	 * [Encoding Standard]{@link https://encoding.spec.whatwg.org/}が要求する標準の文字符号化方式。
	 * @constant {string}
	 */
	THE_ENCODING: 'UTF-8',

	/**
	 * フォームデータを multipart/form-data として、HTTPヘッダが前に結合された{@link Ci.nsIInputStream}に変換する。
	 * @param {FormData} formData
	 * @returns {Promise.<Ci.nsIStringInputStream>}
	 */
	encodeMultipartFormData: function (formData) {
		const response = new Response(formData);
		return response.blob()
			.then(blob => new Promise(function (resolve) {
				const reader = new FileReader();
				reader.addEventListener('load', event => resolve(event.target.result));
				reader.readAsBinaryString(blob);
			}))
			.then(function (binary) {
				const headers = response.headers;
				headers.set('content-length', binary.length);
				const bodyWithHeaders = Array.from(headers).map(([name, value]) => `${name}: ${value}`).join('\r\n')
					+ '\r\n\r\n' + binary;
				return new StringInputStream(bodyWithHeaders, bodyWithHeaders.length);
			});
	},

	/**
	 * 文字列を指定した符号化方式の{@link nsIInputStream}として返す。
	 * @param {string} str
	 * @param {string} [encoding=StringUtils.THE_ENCODING]
	 * @returns {nsIInputStream}
	 */
	convertToInputStream: function (str, encoding = this.THE_ENCODING) {
		try {
			ScriptableUnicodeConverter.charset = encoding;
		} catch (e) {
			if (e.result === Cr.NS_ERROR_UCONV_NOCONV) {
				ScriptableUnicodeConverter.charset = this.THE_ENCODING;
			} else {
				throw e;
			}
		}
		return ScriptableUnicodeConverter.convertToInputStream(str);
	},

	/**
	 * 文字列を指定した符号化方式のバイナリ文字列に変換する。
	 * @param {string} str
	 * @param {string} [encoding=StringUtils.THE_ENCODING]
	 * @returns {string}
	 */
	convertEncoding: function (str, encoding = this.THE_ENCODING) {
		const stream = this.convertToInputStream(str, encoding);
		return NetUtil.readInputStreamToString(stream, stream.available());
	},
};



/**
 * スクリプトの中核。
 */
const DragAndDropZonesPlus = {
	/**
	 * id属性値などに利用する識別子。
	 * @constant {string}
	 */
	ID: 'drag-and-drop-search-347021',

	/**
	 * スクリプト名。
	 * @constant {string}
	 */
	NAME: _('Drag & DropZones +'),

	/**
	 * ウィンドウが開いたときに実行する処理。
	 */
	main: function () {
		// ドロップゾーンの作成
		const earliestWindow = Services.wm.getEnumerator('navigator:browser').getNext();
		if (earliestWindow === window) {
			// ブラウザ起動時
			// 検索エンジンサービスの初期化を待機
			Services.search.init(function () {
				if (SearchUtils.getDropzoneLength() < 1) {
					// 検索エンジンが1つも登録されていなければ（初回起動なら）、検索窓のエンジンを登録する
					SearchUtils.initializeDropzones();
				}

				DropzoneUtils.create();
				DropzoneUtils.setEventListeners();
			});

			SettingsScreen.addToMenu();

			BrowserSearchEngineModifiedObserver.init();

			DropzoneUtils.setContentScript();
		} else {
			// 新しいウィンドウを開いたとき
			const originalWrapper = earliestWindow.document.getElementById(DragAndDropZonesPlus.ID);
			if (!originalWrapper) {
				// 最初に開かれたウィンドウでスクリプトが実行されていなければ、終了
				return;
			}
			DropzoneUtils.wrapper = originalWrapper.cloneNode(true);
			const appContent = document.getElementById('appcontent');
			appContent.insertBefore(DropzoneUtils.wrapper, appContent.firstChild);
			DropzoneUtils.setEventListeners();
			DropzoneUtils.resetDropzones(true);
			SettingsScreen.addToMenu();
		}

		ObserverUtils.init(this.ID);
		UninstallObserver.init();
	},

	/**
	 * 設定を初期化する。
	 */
	initialize: function () {
		Services.prefs.getBranch(SettingsUtils.ROOT_BRANCH_NAME).deleteBranch('');
		SearchUtils.initializeDropzones();
		DropzoneUtils.update();
	},

	/**
	 * 設定を削除し、スクリプトを停止する。
	 */
	uninstall: function () {
		Services.prefs.getBranch(SettingsUtils.ROOT_BRANCH_NAME).deleteBranch('');
		DropzoneUtils.removeContentScript();
		UninstallObserver.notify();
	},
};



/**
 * 一つの検索エンジンを表す。
 * @typedef {Object} SearchEngine
 * @property {number} [index] - prefs.jsに保存されている場合のインデックス。
 * @property {string} [icon] - 検索エンジンを表す16px×16pxのアイコンのDataURL。
 * @property {string} name - 検索エンジン名。
 * @property {boolean} browserSearchEngine - ブラウザの検索エンジンの情報ならtrue。
 * @property {string} url - 検索エンジンに結果をリクエストするときのURL。
 * @property {string} [method] - 検索エンジンが受け入れるHTTPメソッド。GETメソッドかPOSTメソッド。
 * @property {FormDataEntry[]} [params] - 検索エンジンがPOSTメソッドを受け入れる場合のPOSTパラメータ。
 * @property {string} [accept] - 検索エンジンが受け入れるデータの種類。text/*、image/*、audio/*のいずれか。
 * @property {string} [encoding] - 検索エンジンが受け入れる文字コード文字符号化方式。
 */

/**
 * 検索エンジンに関する操作群。
 */
const SearchUtils = {
	/**
	 * XMLパースエラーを示す要素の名前空間。
	 * @constant {string}
	 */
	PARSE_ERROR_NS: 'http://www.mozilla.org/newlayout/xml/parsererror.xml',

	/**
	 * 保存可能なドロップゾーンの最大数。
	 * @constant {number}
	 */
	MAX_DROPZONE_LENGTH: 32,

	/**
	 * prefs.jsからドロップゾーンの検索エンジン数を取得する。（歯抜けインデックスを含む）
	 * @returns {number}
	 */
	getDropzoneLength: function () {
		const branch = Services.prefs.getBranch(SettingsUtils.ROOT_BRANCH_NAME + 'engines.');
		const indexes = [];
		for (const prefName of branch.getChildList('')) {
			const [index, property] = prefName.split('.');
			if (property !== undefined && /^(?:0|[1-9][0-9]*)$/.test(index) && index < this.MAX_DROPZONE_LENGTH) {
				indexes.push(index);
			} else {
				// 壊れた設定なら、削除する
				branch.clearUserPref(prefName);
			}
		}
		return indexes.length > 0 ? Math.max.apply(null, indexes) + 1 : 0;
	},

	/**
	 * prefs.jsに検索窓のエンジンを登録する。
	 */
	initializeDropzones: function () {
		const engines = Services.search.getVisibleEngines().map(function (engine) {
			return {
				name: engine.name,
			};
		});

		// POST検索例
		engines.push({
			icon: 'data:image/vnd.microsoft.icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAABILAAASCwAAAAAAAAAAAAD0hUJK9IVC5/SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQuT0hUJK9IVC5vSFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC5/SFQv/0hUL/9IVC//SFQv/1jU7/+sir//7v5//95df/+9S9//vPtf/3oW7/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/+9jC//3s4f/1lFn/9IVC//SFQv/0iEb//NvH//eibv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//3u5f/5u5b/9IVC//SFQv/0hUL/9IVC//m6lP/707r/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/5vpv//N7M//SIR//0hUL/9IVC//WSV//97OH/+8+0//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//epev/6yKr/+byW//nCoP/+9O7//e3j//WSVv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SHRv/+9vH//OLT//WPUf/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//aeaf/5uZL////+//iwhf/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//m4kf//+/n/96h5//WNT//7zbL/9p9q//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/+9fD/+86z//SFQv/0hUL/96Rx//3r4P/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL//vby//iwhf/0hUL/9IVC//izif//+/j/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//rIqf/5vJf/9IVC//SGRP/95NX/+9a///SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hkT/+bqU//m7lv/84dD///79//rLr//3p3f/9IVC//SFQv/0hUL/9IVC//SFQub0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQub0hUJJ9IVC5vSFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQub0hUJJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==',
			name: _('Google 画像で検索'),
			url: 'https://www.google.com/searchbyimage/upload',
			method: 'POST',
			params: [['encoded_image', '{searchTerms}']],
			accept: 'image/*',
			encoding: StringUtils.THE_ENCODING,
		});

		SearchUtils.setEngines(engines);
	},

	/**
	 * 検索エンジン名からブラウザに登録されているエンジンを取得する。
	 * @param {string} name
	 * @returns {?SearchEngine} - encodingプロパティを含まない。
	 */
	getBrowserEngineByName: function (name) {
		const browserEngine = Services.search.getEngineByName(name);
		return browserEngine ? this.convertEngineFromBrowser(browserEngine) : null;
	},

	/**
	 * {@link Ci.nsISearchEngine}を{@link SearchEngine}に変換する。
	 * @param {Ci.nsISearchEngine} browserEngine
	 * @returns {SearchEngine} - encodingプロパティを含まない。
	 */
	convertEngineFromBrowser: function (browserEngine) {
		const engine = {
			browserSearchEngine: true,
			name: browserEngine.name,
			accept: 'text/plain',
		};
		if (browserEngine.iconURI) {
			engine.icon = browserEngine.iconURI.spec;
		}
		const searchTerms = String(Math.random()).replace('.', '');
		const submission = browserEngine.getSubmission(searchTerms);
		if (submission.postData) {
			// POSTメソッドなら
			engine.method = 'POST';
			engine.url = submission.uri.spec;
			const postData = NetUtil.readInputStreamToString(submission.postData, submission.postData.available());
			engine.params = Array.from(
				new URLSearchParams(postData.split('\r\n\r\n')[1].replace(searchTerms, '{searchTerms}'))
			);
		} else {
			// GETメソッドなら
			engine.method = 'GET';
			engine.url = submission.uri.spec.replace(new RegExp(searchTerms, 'g'), '{searchTerms}');
		}
		return engine;
	},

	/**
	 * インデックスからprefs.jsに保存されているユーザー定義のエンジンを取得する。
	 * @param {number} index
	 * @returns {?SearchEngine}
	 */
	getCustomEngineByIndex: function (index) {
		let engine = null;
		const branch = new Preferences(SettingsUtils.ROOT_BRANCH_NAME + 'engines.' + index + '.');

		const name = branch.get('name');
		if (name) {
			engine = {
				index: index,
				browserSearchEngine: false,
				name: name,
				url: branch.get('url', ''),
				method: branch.get('method', 'GET'),
				accept: branch.get('accept', 'text/plain'),
				encoding: branch.get('encoding', StringUtils.THE_ENCODING),
			};
			if (engine.accept !== 'text/plain' && engine.encoding !== StringUtils.THE_ENCODING) {
				// バージョン3.0.3以前の設定
				engine.encoding = StringUtils.THE_ENCODING;
				Preferences.reset(`${SettingsUtils.ROOT_BRANCH_NAME}engines.${index}.encoding`);
			}
			const icon = branch.get('icon');
			if (icon) {
				engine.icon = icon;
			}
			if (engine.method === 'POST') {
				// POSTメソッドなら
				let params;
				try {
					params = JSON.parse(branch.get('params', '[]'));
				} catch (e) {
					if (!(e instanceof SyntaxError)) {
						throw e;
					}
				}
				engine.params = [];
				if (Array.isArray(params)) {
					for (const param of params) {
						if (Array.isArray(param)) {
							engine.params.push([param[0] || '', param[1] || '']);
						}
					}
				}
			}
		}
		return engine;
	},

	/**
	 * インデックスからエンジンを取得する。
	 * @param {number} index
	 * @returns {?SearchEngine}
	 */
	getEngineByIndex: function (index) {
		const branch = new Preferences(SettingsUtils.ROOT_BRANCH_NAME + 'engines.' + index + '.');
		return branch.get('url')
			? this.getCustomEngineByIndex(index)
			: this.getBrowserEngineByName(branch.get('name'));
	},

	/**
	 * prefs.jsに保存されている検索エンジンをすべて取得する。
	 * @returns {SearchEngine[]}
	 */
	getEngines: function () {
		const encodings = this.getBrowserEngineEncodings();
		const engines = [];
		for (let i = 0, l = this.getDropzoneLength(); i < l; i++) {
			const branch = new Preferences(SettingsUtils.ROOT_BRANCH_NAME + 'engines.' + i + '.');
			if (branch.get('url')) {
				// ユーザー定義のエンジンなら
				engines.push(this.getCustomEngineByIndex(i));
			} else {
				// ブラウザのエンジンなら
				const name = branch.get('name');
				const engine = this.getBrowserEngineByName(name);
				if (engine) {
					engine.index = i;
					engine.encoding = encodings[name] || StringUtils.THE_ENCODING;
					engines.push(engine);
				}
			}
		}
		return engines;
	},

	/**
	 * ブラウザに登録されている検索エンジンをすべて取得する。
	 * @returns {SearchEngine[]}
	 */
	getBrowserEngines: function () {
		const encodings = this.getBrowserEngineEncodings();
		return Services.search.getVisibleEngines().map(browserEngine => {
			const engine = this.convertEngineFromBrowser(browserEngine);
			engine.encoding = encodings[engine.name] || StringUtils.THE_ENCODING;
			return engine;
		});
	},

	/**
	 * prefs.jsに保存されているユーザー定義のエンジンをすべて取得する。
	 * @returns {SearchEngine[]}
	 */
	getCustomEngines: function () {
		const engines = [];
		for (let i = 0, l = this.getDropzoneLength(); i < l; i++) {
			const branch = new Preferences(SettingsUtils.ROOT_BRANCH_NAME + 'engines.' + i + '.');
			if (branch.get('url')) {
				// ユーザー定義のエンジンなら
				engines.push(this.getCustomEngineByIndex(i));
			}
		}
		return engines;
	},

	/**
	 * prefs.jsに保存されている検索エンジンをすべて削除し、指定したエンジンリストと置き換える。
	 * @param {SearchEngine[]} engines
	 */
	setEngines: function (engines) {
		const oldEngineLength = this.getDropzoneLength();
		engines.forEach((engine, index) => {
			this.setEngine(index, engine);
		});
		const branch = Services.prefs.getBranch(SettingsUtils.ROOT_BRANCH_NAME + 'engines.');
		for (let i = engines.length; i < oldEngineLength; i++) {
			branch.deleteBranch(i + '.');
		}
	},

	/**
	 * prefs.jsのブランチの指定した位置に検索エンジンを追加する。
	 * @param {number} index
	 * @param {SearchEngine} engine
	 */
	setEngine: function (index, engine) {
		// 古い設定の削除
		Services.prefs.getBranch(SettingsUtils.ROOT_BRANCH_NAME + 'engines.').deleteBranch(index + '.');

		const branch = new Preferences(SettingsUtils.ROOT_BRANCH_NAME + 'engines.' + index + '.');

		branch.set('name', engine.name);

		if (!Services.search.getEngineByName(engine.name)) {
			// 同名の検索エンジンがブラウザに存在しなければ
			if (engine.icon) {
				branch.set('icon', engine.icon);
			}
			branch.set('url', engine.url);
			if (engine.method !== 'GET') {
				// POSTメソッドなら
				branch.set('method', engine.method);
				branch.set('params', JSON.stringify(engine.params));
				if (engine.accept !== 'text/plain') {
					branch.set('accept', engine.accept);
				}
			}
			if (engine.encoding !== StringUtils.THE_ENCODING) {
				branch.set('encoding', engine.encoding);
			}
		}
	},

	/**
	 * 長すぎる値を切り詰める。
	 * @param {SearchEngine} engine
	 * @returns {SearchEngine}
	 */
	trimValues: function (engine) {
		for (const name in engine) {
			switch (name) {
				case 'icon':
					delete engine[name];
					break;
				case 'params':
					while (JSON.stringify(engine[name]) > SettingsUtils.MAX_PREFERENCE_VALUE_LENGTH) {
						engine[name].pop();
					}
					break;
				default:
					if (typeof engine[name] === 'string' && engine[name] > SettingsUtils.MAX_PREFERENCE_VALUE_LENGTH) {
						engine[name] = engine[name].substr(0, SettingsUtils.MAX_PREFERENCE_VALUE_LENGTH);
					}
			}
		}
		return engine;
	},

	/**
	 * ファイル選択ダイアログを表示し、選択されたXMLファイルの検索エンジンを返す。
	 * ファイルが選択されなかった場合は何もしない。
	 * @param {Window} win - ダイアログの親となるウィンドウ。
	 * @param {Function} callback - 第1引数に{@link SearchEngine[]}、第2引数にファイルの文書。第3引数にファイル名。エラーが起きていれば、第4引数にエラーメッセージ。
	 */
	getSearchEnginesFromFile: function (win, callback) {
		const filePicker = new FilePicker(win, null, Ci.nsIFilePicker.modeOpen);
		filePicker.appendFilters(Ci.nsIFilePicker.filterXML);
		filePicker.appendFilters(Ci.nsIFilePicker.filterAll);
		filePicker.open(result => {
			if (result === Ci.nsIFilePicker.returnOK) {
				const client = new XMLHttpRequest();
				client.open('GET', NetUtil.newURI(filePicker.file).spec);
				client.responseType = 'document';
				client.addEventListener('load', event => {
					const doc = event.target.response;
					const root = doc.documentElement;
					if (root.namespaceURI === this.PARSE_ERROR_NS && root.localName === 'parseerror') {
						// パースエラーが起きていれば
						callback(null, null, filePicker.file.leafName, _('XMLパースエラーです。') + '\n\n' + root.textContent);
					} else {
						const engines = [];
						for (const description
							of doc.getElementsByTagNameNS(OpenSearchUtils.NS, 'OpenSearchDescription')) {
							const engine = OpenSearchUtils.convertEngineToObject(description);
							if (engine) {
								engines.push(engine);
							}
						}
						if (engines.length > 0) {
							callback(engines, doc, filePicker.file.leafName);
						} else {
							// 検索エンジンが一つも含まれていなければ
							callback(null, null, filePicker.file.leafName, _('検索エンジンが一つも見つかりませんでした。'));
						}
					}
				});
				client.send();
			}
		});
	},

	/**
	 * search.jsonから、ブラウザの検索エンジンの文字符号化方式を取得する。
	 * @returns {Object} プロパティ名に検索エンジン名、値に文字符号化方式をもつオブジェクト。
	 * @access protected
	 */
	getBrowserEngineEncodings: function () {
		const encodings = {};
		const file = FileUtils.getFile('ProfD', ['search.json']);
		if (file.exists()) {
			const stream = new FileInputStream(file, -1, -1, 0);
			try {
				const searchJson = JSON.parse(NetUtil.readInputStreamToString(stream, stream.available()));
				if (searchJson && searchJson.directories) {
					for (const directory in searchJson.directories) {
						if (directory && Array.isArray(directory.engines)) {
							for (const engine of directory.engines) {
								encodings[engine._name] = engine.queryCharset;
							}
						}
					}
				}
			} catch (e) {
				if (!(e instanceof SyntaxError)) {
					throw e;
				}
			} finally {
				stream.close();
			}
		}
		return encodings;
	},
};



/**
 * prefs.jsなどの設定を読み書きする。
 */
const SettingsUtils = {
	/**
	 * エクスポートするXMLファイルで使用する名前空間。
	 * @constant {string}
	 */
	NS: 'https://userscripts.org/scripts/show/130510',

	/**
	 * 設定を保存するブランチ名。（末尾にピリオドを含む）
	 * @constant {string}
	 */
	ROOT_BRANCH_NAME: 'extensions.' + DragAndDropZonesPlus.ID + '.',

	/**
	 * prefs.jsの一項目の容量制限。（UTF-16のコードユニット数）
	 * @constant {number}
	 */
	MAX_PREFERENCE_VALUE_LENGTH: 1 * 1024 * 1024,

	/**
	 * ファイルに設定をエクスポートする。
	 * @param {Window} win - ダイアログの親となるウィンドウ。
	 * @param {Function} [callback] - 第1引数にファイルのフルパス。
	 */
	exportToFile: function (win, callback = function () { }) {
		// ファイル保存ダイアログを開く
		const filePicker = new FilePicker(win, null, Ci.nsIFilePicker.modeSave);
		filePicker.appendFilters(Ci.nsIFilePicker.filterXML);
		filePicker.appendFilters(Ci.nsIFilePicker.filterAll);
		filePicker.defaultString = DragAndDropZonesPlus.ID + '.xml';
		filePicker.open(result => {
			if (result === Ci.nsIFilePicker.returnOK || result === Ci.nsIFilePicker.returnReplace) {
				const settingsDocument = new Document();
				const settings = settingsDocument.createElementNS(this.NS, 'settings');
				const engines = settingsDocument.createElementNS(this.NS, 'engines');

				for (const engine of SearchUtils.getEngines()) {
					engines.appendChild(OpenSearchUtils.convertEngineToElement(engine, settingsDocument));
				}
				settings.appendChild(engines);

				const branch = new Preferences(this.ROOT_BRANCH_NAME);

				const where = branch.get('where', 'tab');
				settings.appendChild(settingsDocument.createElementNS(this.NS, 'where')).textContent = where;

				const automaticallyReflect = branch.get('automaticallyReflect', true);
				if (automaticallyReflect) {
					settings.appendChild(settingsDocument.createElementNS(this.NS, 'automatically-reflect'))
						.textContent = 'on';
				}

				settingsDocument.appendChild(settings);

				// 保存
				const stream = FileUtils.openSafeFileOutputStream(filePicker.file);
				//DOMSerializer.serializeToStream(DOMUtils.toPrettyXML(settings), stream, '');
				const converterOutputStream = new ConverterOutputStream(stream, StringUtils.THE_ENCODING, 0, 0x0000);
				converterOutputStream
					.writeString(new XMLSerializer().serializeToString(DOMUtils.toPrettyXML(settings)));
				FileUtils.closeSafeFileOutputStream(stream);
				converterOutputStream.close();
				callback(filePicker.file.path);
			}
		});
	},

	/**
	 * ファイルから設定をインポートする。
	 * @param {Window} win - ダイアログの親となるウィンドウ。
	 * @param {Function} [callback] - 第1引数にファイル名。インポートに失敗していれば、第2引数にエラーメッセージ。
	 */
	importFromFile: function (win, callback = function () { }) {
		SearchUtils.getSearchEnginesFromFile(win, (engines, settingsDocument, fileName, errorMessage) => {
			if (engines) {
				SearchUtils.setEngines(engines);

				const branch = new Preferences(this.ROOT_BRANCH_NAME);

				const where = settingsDocument.getElementsByTagNameNS(this.NS, 'where')[0];
				if (where) {
					const value = where.textContent.trim();
					if (value !== 'tab') {
						branch.set('where', value);
					}
				}

				const automaticallyReflect
					= settingsDocument.getElementsByTagNameNS(this.NS, 'automatically-reflect')[0];
				if (!automaticallyReflect || automaticallyReflect.textContent.trim() !== 'on') {
					branch.set('automaticallyReflect', false);
				}

				DropzoneUtils.update();

				callback(fileName);
			} else {
				callback(fileName, errorMessage);
			}
		});
	},
};



/**
 * バージョン1の設定値。
 */
const Version1Settings = {
	/**
	 * JSON文字列から検索エンジンを取得する。
	 * @param {Window} win - ダイアログの親となるウィンドウ。
	 * @param {Function} [callback] - 取得に成功していれば、第1引数に検索エンジンの配列。失敗していれば、第2引数にエラーメッセージ。
	 */
	getEnginesFromText: function (win, callback) {
		const jsonString = win.prompt(_('JSON文字列を貼り付けてください。'));
		if (jsonString && jsonString.trim()) {
			let oldSettings;
			try {
				oldSettings = JSON.parse(jsonString);
			} catch (e) {
				if (e instanceof SyntaxError) {
					callback(null, _('JSONパースエラーです。'));
					return;
				} else {
					throw e;
				}
			}
			if (Array.isArray(oldSettings)) {
				const doc = win.document;
				// ブラウザのエンジン名一覧を取得しておく
				const browserEngineNames = Array.from(doc.querySelectorAll('[name=add-browser-engine] > [label]'))
					.map(option => option.label);
				// 利用可能な文字コード一覧を取得しておく
				const encodings = Array.from(
					doc.getElementsByTagName('template')[0].content.querySelectorAll('[name=encoding] > option')
				).map(option => option.value);
				// デフォルトのFaviconのDataURLを取得しておく
				const client = new XMLHttpRequest();
				client.open('GET', DropzoneUtils.DEFAULT_ICON);
				client.responseType = 'blob';
				client.addEventListener('load', function (event) {
					IconUtils.convertToDataURL(event.target.response, function (defaultIconDataURL) {
						const engines = [];
						for (const oldSetting of oldSettings) {
							if (typeof oldSetting === 'object' && oldSetting !== null && oldSetting.title) {
								const engine = {
									name: oldSetting.title,
								};
								if (browserEngineNames.indexOf(engine.name) !== -1) {
									// 同名の検索エンジンがブラウザに存在すれば
									engines.push(engine);
								} else if (oldSetting.query) {
									engine.url = oldSetting.query + '{searchTerms}';
									if (oldSetting.icon && oldSetting.icon !== defaultIconDataURL) {
										engine.icon = oldSetting.icon;
									}
									if (oldSetting.encoding && encodings.indexOf(oldSetting.encoding) !== -1) {
										engine.encoding = oldSetting.encoding;
									}
									engines.push(engine);
								}
							}
						}

						if (engines.length > 0) {
							callback(engines);
						} else {
							callback(null, _('検索エンジンが一つも見つかりませんでした。'));
						}
					});
				});
				client.send();
			}
		} else {
			callback(null, _('検索エンジンが一つも見つかりませんでした。'));
		}
	},
};



/**
 * OpenSearchに関する操作群。
 */
const OpenSearchUtils = {
	/**
	 * OpenSearchの名前空間。
	 * @constant {string}
	 */
	NS: 'http://a9.com/-/spec/opensearch/1.1/',

	/**
	 * OpenSearch Referrer extensionの名前空間。
	 * @constant {string}
	 */
	REFERRER_NS: 'http://a9.com/-/opensearch/extensions/referrer/1.0/',

	/**
	 * OpenSearch parameter extensionの名前空間。
	 * @constant {string}
	 */
	PARAMETER_NS: 'http://a9.com/-/spec/opensearch/extensions/parameters/1.0/',

	/**
	 * OpenSearch Suggestions extensionの名前空間。
	 * @constant {string}
	 */
	SUGGESTIONS_NS: 'http://www.opensearch.org/specifications/opensearch/extensions/suggestions/1.1',

	/**
	 * OpenSearch Geo extensionの名前空間。
	 * @constant {string}
	 */
	GEO_NS: 'http://a9.com/-/opensearch/extensions/geo/1.0/',

	/**
	 * OpenSearch Time Extensionの名前空間。
	 * @constant {string}
	 */
	TIME_NS: 'http://a9.com/-/opensearch/extensions/time/1.0/',

	/**
	 * OpenSearch Mobile Extensionの名前空間。
	 * @constant {string}
	 */
	M_NS: 'http://a9.com/-/opensearch/extensions/mobile/1.0/',

	/**
	 * OpenSearch SRU Extensionの名前空間。
	 * @constant {string}
	 */
	SRU_NS: 'http://a9.com/-/opensearch/extensions/sru/2.0/',

	/**
	 * OpenSearch Semantic Extensionの名前空間。
	 * @constant {string}
	 */
	SEMANTIC_NS: 'http://a9.com/-/opensearch/extensions/semantic/1.0/',

	/**
	 * InputEncoding要素の既定値。
	 * @constant {string}
	 */
	DEFAULT_ENCODING: 'UTF-8',

	/**
	 * itemsPerPage要素が存在しない場合の、countパラメータの既定値。
	 * @constant {number}
	 */
	DEFAULT_ITEMS_PER_PAGE: 20,

	/**
	 * {@link SearchEngine}をOpenSearchDescription要素に変換する。
	 * @param {SearchEngine} engine
	 * @param {XMLDocument} doc - 作成するOpenSearchDescription要素のノード文書。
	 * @returns {Element} OpenSearchDescription要素。
	 */
	convertEngineToElement: function (engine, doc) {
		const description = doc.createElementNS(this.NS, 'OpenSearchDescription');
		description.appendChild(doc.createElementNS(this.NS, 'ShortName')).textContent = engine.name;
		description.appendChild(doc.createElementNS(this.NS, 'Description'));
		if (engine.icon) {
			description.appendChild(doc.createElementNS(this.NS, 'Image')).textContent = engine.icon;
		}
		const url = doc.createElementNS(this.NS, 'Url');
		url.setAttribute('template', engine.url);
		url.setAttribute('type', 'text/html');
		if (engine.method === 'POST') {
			// POSTメソッドなら
			url.setAttributeNS(this.PARAMETER_NS, 'parameters:method', engine.method);
			for (const [name, value] of engine.params) {
				const parameter = doc.createElementNS(this.PARAMETER_NS, 'parameters:Parameter');
				parameter.setAttribute('name', name);
				parameter.setAttribute('value', value);
				url.appendChild(parameter);
			}
			if (engine.accept !== 'text/plain') {
				url.setAttributeNS(SettingsUtils.NS, 'dnd-search:accept', engine.accept);
			}
		}
		description.appendChild(url);
		if (engine.encoding !== this.DEFAULT_ENCODING) {
			description.appendChild(doc.createElementNS(this.NS, 'InputEncoding')).textContent = engine.encoding;
		}
		return description;
	},

	/**
	 * OpenSearchDescription要素を{@link SearchEngine}に変換する。
	 * @param {Element} description - OpenSearchDescription要素。
	 * @returns {?SearchEngine}
	 */
	convertEngineToObject: function (description) {
		let engine = null;
		const shortName = description.getElementsByTagNameNS(this.NS, 'ShortName')[0];
		const url
			= description.querySelector('Url[template][type="text/html"], Url[template][type="application/xhtml+xml"]')
				|| description.querySelector('Url[template]');
		if (shortName && url) {
			const template = this.parseURLTemplate(url.getAttribute('template'), url);
			let nativeURL;
			try {
				nativeURL = NetUtil.newURI(template).QueryInterface(Ci.nsIURL);
			} catch (e) {
				if (e.result === Cr.NS_ERROR_MALFORMED_URI || e.result === Cr.NS_NOINTERFACE) {
					// 妥当なURLでなければ
					return null;
				} else {
					throw e;
				}
			}
			engine = {
				name: shortName.textContent,
			};
			const image = description.getElementsByTagNameNS(this.NS, 'Image')[0];
			if (image) {
				engine.icon = image.textContent;
			}

			const parameters = url.getElementsByTagNameNS(this.PARAMETER_NS, 'Parameter');

			const method = url.getAttributeNS(this.PARAMETER_NS, 'method');
			if (method && method.toUpperCase() === 'POST') {
				// POSTメソッドなら
				engine.method = 'POST';
				engine.url = template;
				engine.params = [];
				for (const parameter of parameters) {
					engine.params.push([
						parameter.getAttribute('name'),
						this.parseURLTemplate(parameter.getAttribute('value'), parameter)]);
				}
				engine.accept = url.getAttributeNS(SettingsUtils.NS, 'accept') || 'text/*';
			} else {
				// POSTメソッド以外はGETメソッドとして扱う
				engine.method = 'GET';
				const searchParams = new URLSearchParams(nativeURL.query);
				for (const parameter of parameters) {
					searchParams.append(
						parameter.getAttribute('name'),
						this.parseURLTemplate(parameter.getAttribute('value'), parameter));
				}
				nativeURL.query = searchParams.toString().replace(/%7BsearchTerms%7D/g, '{searchTerms}');
				engine.url = nativeURL.spec;
				engine.accept = 'text/*';
			}
			const inputEncoding = description.getElementsByTagNameNS(this.NS, 'InputEncoding')[0];
			engine.encoding = inputEncoding ? inputEncoding.textContent : this.DEFAULT_ENCODING;
			if (engine.encoding !== this.DEFAULT_ENCODING && engine.encoding.toUpperCase() === this.DEFAULT_ENCODING) {
				engine.encoding = this.DEFAULT_ENCODING;
			}

			if (engine.accept !== 'text/*') {
				// バージョン3.0.3以前の設定
				engine.encoding = StringUtils.THE_ENCODING;
			}
		}
		return engine || SearchUtils.trimValues(engine);
	},

	/**
	 * OpenSearch URLテンプレートに含まれるテンプレートパラメータのうち、{searchTerms}以外を置換する。
	 * @param {string} template - OpenSearch URLテンプレート。
	 * @param {Element} element - OpenSearch URLテンプレートが設定されているUrl要素、またはParameter要素。
	 * @returns {string}
	 * @see [OpenSearch URL template syntax]{@link http://www.opensearch.org/Specifications/OpenSearch/1.1#OpenSearch_URL_template_syntax}
	 * @access protected
	 */
	parseURLTemplate: function (template, element) {
		const description = element.closest('OpenSearchDescription');
		const url = element.closest('Url');
		const searchValue = /{((?:[-a-zA-Z0-9._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+:)?((?:[-a-zA-Z0-9._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)(\?)?}/g;
		return template.replace(searchValue, (parameter, encodedPrefix, encodedLname, modifier) => {
			const prefix = decodeURIComponent(encodedPrefix), lname = decodeURIComponent(encodedLname);
			let value = null;
			switch (prefix ? element.lookupNamespaceURI(prefix) || this.NS : this.NS) {
				case this.NS:
					switch (lname) {
						case 'searchTerms':
							return '{searchTerms}';
						case 'count':
							if (modifier) {
								value = '';
							} else {
								const itemsPerPage = description.getElementsByTagNameNS(this.NS, 'itemsPerPage');
								value = itemsPerPage ? itemsPerPage.textContent : this.DEFAULT_ITEMS_PER_PAGE;
							}
							break;
						case 'startIndex':
							value = url.getAttribute('indexOffset') || 1;
							break;
						case 'startPage':
							value = url.getAttribute('pageOffset') || 1;
							break;
						case 'language':
							value = window.navigator.language;
							break;
						case 'inputEncoding': {
							const encoding = description.getElementsByTagNameNS(this.NS, 'InputEncoding');
							value = encoding ? encoding.textContent : this.DEFAULT_ENCODING;
							break;
						}
						case 'outputEncoding':
							value = StringUtils.THE_ENCODING;
							break;
					}
					break;
				case this.REFERRER_NS:
					switch (lname) {
						case 'source':
							value = DragAndDropZonesPlus.ID;
							break;
					}
					break;
				case this.SUGGESTIONS_NS:
					switch (lname) {
						//case 'suggestionPrefix':
						//	break;
						case 'suggestionIndex':
							value = modifier ? '' : 0;
							break;
					}
					break;
				//case this.GEO_NS:
				//	break;
				case this.TIME_NS:
					switch (lname) {
						case 'start':
							value = modifier ? '' : '0000-01-01T00:00:00Z';
							break;
						case 'end':
							value = modifier ? '' : '9999-12-31T23:59:58Z';
							break;
					}
					break;
				case this.M_NS:
					switch (lname) {
						case 'userAgent':
							value = window.navigator.userAgent;
							break;
						//case 'subId':
						//	break;
						//case 'mcc':
						//	break;
						//case 'mnc':
						//	break;
					}
					break;
				case this.SRU_NS:
					switch (lname) {
						case 'queryType':
							value = modifier ? '' : 'searchTerms';
							break;
						case 'query':
							return modifier ? '' : '{searchTerms}';
						case 'startRecord':
							value = modifier ? '' : url.getAttribute('indexOffset') || 1;
							break;
						case 'maximumRecords':
							if (modifier) {
								value = '';
							} else {
								const itemsPerPage = description.getElementsByTagNameNS(this.NS, 'itemsPerPage');
								value = itemsPerPage ? itemsPerPage.textContent : this.DEFAULT_ITEMS_PER_PAGE;
							}
							break;
						case 'recordPacking':
							value = modifier ? '' : 'xml';
							break;
						//case 'recordSchema':
						//	break;
						//case 'resultSetTTL':
						//	break;
						//case 'sortKeys':
						//	break;
						//case 'stylesheet':
						//	break;
						case 'rendering':
							value = 'server';
							break;
						case 'httpAccept':
							value = 'text/html, application/xhtml+xml';
							break;
						case 'httpAcceptCharset':
							value = modifier ? '' : '*';
							break;
						case 'httpAcceptEncoding':
							value = modifier ? '' : '*';
							break;
						case 'httpAcceptLanguage':
							value = modifier ? '' : window.navigator.language + ', *';
							break;
						case 'httpAcceptRanges':
							value = modifier ? '' : 'none';
							break;
						case 'facetLimit':
							value = modifier ? '' : 1;
							break;
						case 'facetSort':
							value = modifier ? '' : 'recordCount';
							break;
						//case 'facetRangeField':
						//	break;
						//case 'facetLowValue':
						//	break;
						//case 'facetHighValue':
						//	break;
						//case 'facetCount':
						//	break;
						//case 'extension':
						//	break;
					}
					break;
				//case this.SEMANTIC_NS:
				//	break;
			}
			return value === null ? (modifier ? '' : parameter) : encodeURIComponent(value);
		});
	},
};



/**
 * アイコンに関する操作群。
 */
const IconUtils = {
	/**
	 * SQLiteのLIKE演算子におけるESCAPE文字。
	 * @constant {string}
	 */
	SQLITE_LIKE_ESCAPE_STRING: '@',

	/**
	 * DataURLに変換する。
	 * @param {(Blob|Array)} icon
	 * @param {Function} callback - 第1引数にDataURL。
	 * @param {string} [type] - iconが配列の場合の、アイコンのMIMEタイプ。
	 */
	convertToDataURL: function (icon, callback, type) {
		if (type) {
			icon = new Blob([new Uint8Array(icon)], { type: type });
		}
		const reader = new FileReader();
		reader.addEventListener('load', function (event) {
			callback(event.target.result);
		});
		reader.readAsDataURL(icon);
	},

	/**
	 * URLから、そのWebサイトのFaviconのDataURLを取得する。
	 * @param {string} url
	 * @param {Function} callback - 第1引数にDataURL。
	 */
	getFaviconFromSiteUrl: function (url, callback) {
		const nativeURL = NetUtil.newURI(url).QueryInterface(Ci.nsIURL);
		PlacesUtils.favicons.getFaviconDataForPage(nativeURL, (faviconURL, length, data, type) => {
			if (length > 0) {
				// Faviconが存在すれば
				this.convertToDataURL(data, callback, type);
			} else {
				// places.sqliteに接続する
				const places = Services.storage.openDatabase(FileUtils.getFile('ProfD', ['places.sqlite']));

				// 指定されたURLに似た履歴のFaviconを取得するSQL文を構築・実行
				const statement = places.createAsyncStatement('SELECT data, mime_type'
						+ ' FROM moz_places INNER JOIN moz_favicons ON favicon_id = moz_favicons.id'
						+ ' WHERE moz_places.url LIKE :url ESCAPE :escape ORDER BY last_visit_date DESC LIMIT 1');
				statement.params.url = statement.escapeStringForLIKE(
					nativeURL.prePath + nativeURL.directory,
					this.SQLITE_LIKE_ESCAPE_STRING
				) + '%';
				statement.params.escape = this.SQLITE_LIKE_ESCAPE_STRING;
				let favicon;
				statement.executeAsync({
					handleResult: resultSet => {
						favicon = resultSet.getNextRow();
						statement.finalize();
					},
					handleError: error => {
						this.getFaviconIco(nativeURL.prePath, callback);
					},
					handleCompletion: () => {
						if (favicon) {
							this.convertToDataURL(
								favicon.getResultByName('data'),
								callback,
								favicon.getResultByName('mime_type')
							);
						} else {
							this.getFaviconIco(nativeURL.prePath, callback);
						}
					},
				});
				places.asyncClose();
			}
		});
	},

	/**
	 * Faviconを含むWebページのURL、または画像のURLからBlobインスタンスを取得する。
	 * @param {string} url
	 * @param {Function} callback - 第1引数にDataURL。エラーが起こった場合は、第2引数にエラーメッセージ。
	 */
	getFromUrl: function (url, callback) {
		try {
			new URL(url);
		} catch (e) {
			// 妥当なURLでなければ
			callback(null, _('https:// などで始まるURLを入力してください。1'));
		}
		const client = new XMLHttpRequest();
		try {
			client.open('GET', url);
		} catch (e) {
			if (e.result === Cr.NS_ERROR_UNKNOWN_PROTOCOL) {
				callback(null, _('https:// などで始まるURLを入力してください。'));
				return;
			} else {
				throw e;
			}
		}
		client.responseType = 'blob';
		client.addEventListener('error', () => {
			this.getFaviconFromSiteUrl(url, callback, function () {
				callback(null, _('指定されたURLに接続できませんでした。'));
			});
		});
		client.addEventListener('load', event => {
			const client = event.target;
			if (client.status === 200) {
				if (client.response.type.startsWith('image/')) {
					this.convertToDataURL(client.response, callback);
				} else {
					this.getFaviconFromSiteUrl(url, callback, function () {
						callback(null, _('アイコンを取得できませんでした。WebページのURLであれば、一度ブラウザでページを表示してみてください。'));
					});
				}
			} else {
				this.getFaviconFromSiteUrl(url, callback, function () {
					callback(null, _('指定されたURLに接続できませんでした。') + '\n' + client.status + ' ' + client.statusText);
				});
			}
		});
		client.send();
	},

	/**
	 * ローカルファイルのDataURLを取得する。
	 * @param {Window} win - ダイアログの親となるウィンドウ。
	 * @param {Function} callback - 第1引数にDataURL。エラーが起こった場合は、第2引数にエラーメッセージ。
	 */
	getFromLocalFile: function (win, callback) {
		// ファイル選択ダイアログを開く
		const filePicker = new FilePicker(win, null, Ci.nsIFilePicker.modeOpen);
		filePicker.appendFilters(Ci.nsIFilePicker.filterImages);
		filePicker.open(result => {
			if (result === Ci.nsIFilePicker.returnOK) {
				const file = filePicker.file;
				let type;
				try {
					// 拡張子を元にMIMEタイプを取得
					type = MIMEService.getTypeFromFile(file);
				} catch (e) {
					if (e.result === Cr.NS_ERROR_NOT_AVAILABLE) {
						// 未知の拡張子
						callback(null, _('画像ファイルを選択してください。'));
					} else {
						throw e;
					}
				}
				if (type.startsWith('image/')) {
					// Blobインスタンスを取得
					const fileStream = new FileInputStream(file, -1, -1, 0);
					const stream = new BinaryInputStream(fileStream);
					this.convertToDataURL(stream.readByteArray(stream.available()), callback, type);
					stream.close();
					fileStream.close();
				} else {
					callback(null, _('画像ファイルを指定してください。'));
				}
			}
		});
	},

	/**
	 * クリップボードのURL、または画像からDataURLを取得する。
	 * @param {Function} callback - 第1引数にDataURL。エラーが起こった場合は、第2引数にエラーメッセージ。
	 */
	getIconFromClipboard: function (callback) {
		if (Services.clipboard.supportsSelectionClipboard()) {
			// 選択クリップボードが有効なOSなら
			const url = ClipboardUtils.getText(Services.clipboard.kSelectionClipboard);
			if (url) {
				// テキストデータが保持されていれば
				this.getFromUrl(url, (dataURL, errorMessage) => {
					if (dataURL) {
						callback(dataURL);
					} else {
						this.getIconFromGlobalClipboard(callback);
					}
				});
			} else {
				this.getIconFromGlobalClipboard(callback);
			}
		} else {
			this.getIconFromGlobalClipboard(callback);
		}
	},

	/**
	 * クリップボード（グローバル）のURL、または画像からDataURLを取得する。
	 * @param {Function} callback - 第1引数にDataURL。エラーが起こった場合は、第2引数にエラーメッセージ。
	 * @access protected
	 */
	getIconFromGlobalClipboard: function (callback) {
		const url = ClipboardUtils.getText(Services.clipboard.kGlobalClipboard);
		if (url) {
			// テキストデータが保持されていれば
			this.getFromUrl(url, callback);
			return;
		} else if (Services.clipboard.hasDataMatchingFlavors(['image/png'], 1, Services.clipboard.kGlobalClipboard)) {
			// 画像データが保持されていれば、PNG画像として取得する（Windowsでは透過部分が黒色になる）
			// <https://dxr.mozilla.org/mozilla-release/rev/FIREFOX_53_0_RELEASE/addon-sdk/source/lib/sdk/clipboard.js#261-292>を参考
			const transferable = new Transferable('image/png'), data = {};
			Services.clipboard.getData(transferable, Services.clipboard.kGlobalClipboard);
			transferable.getTransferData('image/png', data, {});
			let image = data.value;
			if (image instanceof Ci.nsISupportsInterfacePointer) {
				image = image.data;
			}
			if (image instanceof Ci.imgIContainer) {
				image = ImgTools.encodeImage(image, 'image/png');
			}
			if (image instanceof Ci.nsIInputStream) {
				this.convertToDataURL(
					new BinaryInputStream(image).readByteArray(image.available()),
					callback,
					'image/png'
				);
				return;
			}
		}
		callback(null, _('クリップボードからデータを取得できませんでした。'));
	},

	/**
	 * /favicon.ico を取得する。
	 * @param {string} origin
	 * @param {Function} callback - 第1引数にDataURL。
	 * @access protected
	 */
	getFaviconIco: function (origin, callback) {
		const client = new XMLHttpRequest();
		client.open('GET', origin + '/' + 'favicon.ico');
		client.responseType = 'blob';
		client.addEventListener('error', () => callback(null));
		client.addEventListener('load', event => {
			const client = event.target;
			if (client.status === 200 && client.response.type.startsWith('image/')) {
				this.convertToDataURL(client.response, callback);
			} else {
				callback(null);
			}
		});
		client.send();
	},
};



/**
 * ドロップゾーンの作成やドロップされたデータの検索などを行う。
 * @type {Object}
 */
const DropzoneUtils = {
	/**
	 * 設定されていない場合に表示するアイコンのURL。
	 * @constant {string}
	 * @see Ci.nsIFaviconService#defaultFavicon
	 */
	DEFAULT_ICON: 'resource://gre/chrome/toolkit/skin/classic/mozapps/places/defaultFavicon.svg',

	/**
	 * ドロップゾーン専用のスタイルシートを設定するための親要素。
	 * @type {HTMLDivElement}
	 */
	wrapper: null,

	/**
	 * 各ドロップゾーンを作成。
	 */
	create: function () {
		const appContent = document.getElementById('appcontent');
		appContent.insertAdjacentHTML('afterbegin', h`
			<div xmlns="${DOMUtils.HTML_NS}" id="${DragAndDropZonesPlus.ID}" hidden="">
				<style scoped="">
					/*------------------------------------
						位置決め用
					*/
					div {
						position: relative;
					}

					/*------------------------------------
						ドロップゾーン全体
					*/
					ul {
						position: absolute;
						top: 1.5em;
						left: 1.5em;
						right: 1.5em;
						height: 8em;
						display: flex;
						border: solid #A0A0A0 1px;
						background-color: rgba(100, 200, 255, 0.5);
						padding-left: 0;
					}

					/*------------------------------------
						各ドロップゾーン
					*/
					li {
						flex: 1;
						font-weight: bold;
						padding-left: 0.5em;
						overflow: hidden;
						white-space: nowrap;
						line-height: 2em;
						position: relative;
						z-index: 1;
					}

					li:not(:first-of-type) {
						border-left: inherit;
					}

					img {
						width: 16px;
						height: 16px;
						vertical-align: middle;
						margin-right: 0.3em;
					}

					/*------------------------------------
						ドロップゾーン上部の背景色
					*/
					li::before {
						display: block;
						content: "";
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						height: 2em;
						background-color: rgba(50, 100, 200, 0.7);
						z-index: -1;
					}

					/*------------------------------------
						各ドロップゾーンにポインタが載っている時
					*/
					li.drop-active-valid::before {
						height: initial;
						bottom: 0;
					}
				</style>
				<ul></ul>
			</div>
		`);
		this.wrapper = appContent.firstElementChild;
		this.update();
	},

	/**
	 * ドロップゾーンを初期状態に戻す。
	 * @param {boolean} [forced] - {@link DropzoneUtils.itemTypesDuringDrag}の確認を行わずに実行するなら真。
	 */
	resetDropzones: function (forced = false) {
		if (forced || this.itemTypesDuringDrag) {
			const activeValidDropzone = this.getActiveValidDropzone();
			if (activeValidDropzone) {
				activeValidDropzone.classList.remove('drop-active-valid');
			}
			this.wrapper.hidden = true;
			this.itemTypesDuringDrag = null;
			this.dragoverEventAlreadyFired = true;
		}
	},

	/**
	 * ドロップゾーンに関するスタイルシート、イベントリスナー、およびメッセージリスナーを設定する。
	 */
	setEventListeners: function () {
		// dropzone属性の代替
		// Bug 723008 – Implement dropzone content attribute <https://bugzilla.mozilla.org/show_bug.cgi?id=723008>
		this.wrapper.addEventListener('dragover', event => {
			const activeValidDropzone = this.getActiveValidDropzone();
			if (activeValidDropzone && activeValidDropzone.contains(event.target)) {
				event.preventDefault();
			}
		});

		// イベントリスナーの追加
		for (const type of this.eventTypesForWindow) {
			window.addEventListener(type, this, true);
		}

		// メッセージリスナーの追加
		window.messageManager.addMessageListener(`${DragAndDropZonesPlus.ID}:dragstart`, this);
		window.messageManager.addMessageListener(`${DragAndDropZonesPlus.ID}:drop-data`, this);
	},

	/**
	 * windowに追加したイベントリスナー、およびメッセージリスナーを取り除く。
	 */
	removeEventListeners: function () {
		for (const type of this.eventTypesForWindow) {
			window.removeEventListener(type, this, true);
		}

		window.messageManager.removeMessageListener(`${DragAndDropZonesPlus.ID}:dragstart`, this);
		window.messageManager.removeMessageListener(`${DragAndDropZonesPlus.ID}:drop-data`, this);
	},

	/**
	 * :drop(active valid)な要素にdrop-active-validクラスを追加する。
	 * @param {HTMLElement} target - :drop(active valid)か否か調べる要素。
	 */
	setActiveValidDropzone: function (target) {
		if (target.nodeType === Node.ELEMENT_NODE && this.wrapper.contains(target)) {
			// ドロップゾーンなら
			const dropzone = DOMUtils.getAttributeAsDOMTokenList(target, 'dropzone');
			if (dropzone.contains('link')
					&& Array.prototype.some.call(dropzone, type => this.itemTypesDuringDrag.indexOf(type) !== -1)) {
				// 各ドロップゾーンにポインタが載った時、
				// ドロップゾーンが受け取ることができるデータをドラッグしていれば
				target.classList.add('drop-active-valid');
			}
		}
	},

	/**
	 * イベントハンドラ。
	 * @param {Event} event
	 */
	handleEvent: function (event) {
		const target = event.target;

		switch (event.type) {
			case 'dragover':
				if (!this.dragoverEventAlreadyFired) {
					this.dragoverEventAlreadyFired = true;

					// ドラッグ開始時、すでにドロップゾーン内にカーソルがあった場合、dragenterイベントが発生しないため
					if (target.nodeType === Node.ELEMENT_NODE) {
						this.setActiveValidDropzone(target);
					}
				}
				break;

			case 'dragenter':
				/*if (event.relatedTarget) {
					const activeValidDropzone = this.getActiveValidDropzone();
					if (activeValidDropzone && !activeValidDropzone.contains(target)) {
						// 各ドロップゾーンからポインタが外れた時
						activeValidDropzone.classList.remove('drop-active-valid');
					}

					this.setActiveValidDropzone(target);
				} else {
					// ウィンドウ外からのドラッグなら
					if (this.itemTypesDuringDrag) {
						if (this.itemTypesDuringDrag.length > 0) {
							this.wrapper.hidden = false;
						}
					} else {
						// ドラッグ開始なら
						if (event.isTrusted) {
							this.itemTypesDuringDrag
								= ['string:text/plain', 'file:text/*', 'file:image/*', 'file:audio/*'];

							// ドロップゾーンを表示
							this.wrapper.hidden = false;
						}
					}
				}*/
				// Firefox 54 におけるリグレッション (event.relatedTargetが常にnullを返すようになった) への対処
				if (this.itemTypesDuringDrag) {
					if (this.itemTypesDuringDrag.length > 0) {
						this.wrapper.hidden = false;

						const activeValidDropzone = this.getActiveValidDropzone();
						if (activeValidDropzone && !activeValidDropzone.contains(target)) {
							// 各ドロップゾーンからポインタが外れた時
							activeValidDropzone.classList.remove('drop-active-valid');
						}

						this.setActiveValidDropzone(target);
					}
				} else if (this.wrapper.hidden && event.isTrusted
						&& (!event.dataTransfer.mozSourceNode
							|| event.dataTransfer.mozSourceNode.nodeType !== Node.ELEMENT_NODE
							|| !event.dataTransfer.mozSourceNode.classList.contains('tabbrowser-tab'))) {
					// ウィンドウ外からのドラッグなら
					// ドラッグ開始なら
					this.itemTypesDuringDrag = ['string:text/plain', 'file:text/*', 'file:image/*', 'file:audio/*'];

					// ドロップゾーンを表示
					this.wrapper.hidden = false;
				}
				break;

			case 'dragleave':
				if (this.itemTypesDuringDrag && !event.relatedTarget && !this.wrapper.hidden) {
					// ウィンドウ外へドラッグされたとき
					if (target.ownerDocument) {
						// Firefox 54 におけるリグレッション (event.relatedTargetが常にnullを返すようになった) への対処
						const win = target.ownerDocument.defaultView;
						const x = event.clientX;
						const y = event.clientY;
						/*eslint-disable yoda */
						if (0 < x && x < win.innerWidth && 0 < y && y < win.innerHeight) {
							break;
						}
						/*eslint-enable yoda */
					}

					this.wrapper.hidden = true;
					const activeValidDropzone = this.getActiveValidDropzone();
					if (activeValidDropzone) {
						activeValidDropzone.classList.remove('drop-active-valid');
					}
				}
				break;

			case 'dragend':
				this.resetDropzones();
				gBrowser.selectedBrowser.messageManager.sendAsyncMessage(`${DragAndDropZonesPlus.ID}:dragend`);
				break;

			case 'drop':
				if (this.wrapper.contains(target)) {
					// 各ドロップゾーンにドロップされた時
					event.preventDefault();
					event.dataTransfer; // 後から参照できるようにdataTransferを参照しておく
					this.dropEvent = event;
					gBrowser.selectedBrowser.messageManager.sendAsyncMessage(
						`${DragAndDropZonesPlus.ID}:drop`,
						{asImage: DOMUtils.getAttributeAsDOMTokenList(target, 'dropzone').contains('file:image/*')}
					);
				} else {
					this.resetDropzones();
				}
				break;
		}
	},

	/**
	 * @param {Object} message
	 */
	receiveMessage: async function (message) {
		if (message.name.startsWith(`${DragAndDropZonesPlus.ID}:`)) {
			switch (message.name.replace(`${DragAndDropZonesPlus.ID}:`, '')) {
				case 'dragstart':
					if (this.itemTypesDuringDrag) {
						// ドロップゾーンが表示されたままなら
						this.resetDropzones();
					}

					this.itemTypesDuringDrag = message.data.itemTypes;
					if (this.itemTypesDuringDrag.length > 0) {
						// ドロップゾーンを表示
						this.wrapper.hidden = false;
						this.dragoverEventAlreadyFired = false;
					}
					break;

				case 'drop-data': {
					let data = null;
					if (message.data.imageURL) {
						// 画像としてドロップしたとき
						data = await this.fetchBlobFromURL(message.data.imageURL);
					} else if (message.data.text !== undefined) {
						// 文字列としてドロップしたとき
						data = message.data.text;
					} else {
						// ウィンドウ外からのドロップ
						const dropzone = DOMUtils.getAttributeAsDOMTokenList(this.dropEvent.target, 'dropzone');
						if (dropzone.contains('file:image/*') || dropzone.contains('file:audio/*')) {
							// 画像、または音声ファイルとしてドロップしたとき
							const file = this.dropEvent.dataTransfer.files[0];
							if (file.type.startsWith((dropzone.contains('file:image/*') ? 'image' : 'audio') + '/')) {
								// ドロップゾーンが受け取ることができる形式のファイルなら
								data = file;
							}
						} else {
							// 文字列としてドロップしたとき
							data = this.getTextFromDropEvent(this.dropEvent, !dropzone.contains('file:text/*'));
						}
					}
					if (data !== null) {
						this.searchDropData(data, this.dropEvent.target.dataset.engineIndex, this.dropEvent);
					}
					this.dropEvent = null;
					this.resetDropzones();
					break;
				}
			}
		}
	},

	/**
	 * prefs.jsの設定値を元に、各ウィンドウのドロップゾーンを更新する。
	 */
	update: function () {
		// 構築
		const dropzones = new DocumentFragment();
		for (const engine of SearchUtils.getEngines()) {
			dropzones.appendChild(this.convertFromSearchEngine(engine));
		}

		// 置換
		const enumerator = Services.wm.getEnumerator('navigator:browser');
		while (enumerator.hasMoreElements()) {
			const ul = enumerator.getNext().document.querySelector('#' + DragAndDropZonesPlus.ID + ' ul');

			// クリア
			while (ul.hasChildNodes()) {
				ul.firstChild.remove();
			}

			ul.appendChild(dropzones.cloneNode(true));
		}
	},

	/**
	 * ドロップゾーンを削除する。
	 */
	remove: function () {
		this.wrapper.remove();
	},

	/**
	 * prefs.jsの設定値を元に、ドロップゾーンを作成する。
	 * @param {SearchEngine} engine
	 * @returns	{HTMLLIElement}
	 */
	convertFromSearchEngine: function (engine) {
		const li = document.createElementNS(DOMUtils.HTML_NS, 'li');

		// インデックス
		li.dataset.engineIndex = engine.index;

		// dropzone属性
		const dropzone = DOMUtils.getAttributeAsDOMTokenList(li, 'dropzone');
		dropzone.add('link');
		if (engine.accept === 'text/plain') {
			dropzone.add('string:text/plain');
			if (engine.method === 'POST') {
				dropzone.add('file:text/*');
			}
		} else {
			dropzone.add('file:' + engine.accept);
		}
		li.setAttribute('dropzone', dropzone);

		// アイコン
		const icon = new Image(16, 16);
		icon.src = engine.icon || DropzoneUtils.DEFAULT_ICON;
		li.appendChild(icon);

		// 表示名
		li.appendChild(new Text(engine.name));
		li.dataset.name = engine.name;

		return li;
	},

	/**
	 * contentプロセスで実行するスクリプトを設定する。
	 */
	setContentScript: function (url, event, postData = null) {
		this.contentScriptURL = 'data:application/ecmascript;charset=UTF-8,' + encodeURIComponent(
			gatherTextUnder.toString().replace(/Node\.|HTMLImageElement/g, 'content.$&')
			+ `new ${this.contentScript.toString()}(${JSON.stringify(DragAndDropZonesPlus.ID)});`
		);
		Services.mm.loadFrameScript(this.contentScriptURL, true);
	},

	/**
	 * contentプロセスで実行するスクリプトを削除する。
	 */
	removeContentScript: function () {
		Services.mm.removeDelayedFrameScript(this.contentScriptURL);
		Services.mm.broadcastAsyncMessage(`${DragAndDropZonesPlus.ID}:uninstall`);
	},

	/**
	 * contentプロセスで実行するクラス。
	 * @type {Function}
	 */
	contentScript: class ContentScript {
		/**
		 * XML Binding Language (XBL) の名前空間。
		 * @access private
		 * @constant {string}
		 */
		static get XBL_NS() {return _('http://www.mozilla.org/xbl');}

		/**
		 * @param {string} id
		 */
		constructor(id)
		{
			/**
			 * @type {string}
			 */
			this.id = id;

			addMessageListener(`${this.id}:drop`, this);
			addMessageListener(`${this.id}:dragend`, this);
			addMessageListener(`${this.id}:uninstall`, this);
			addEventListener('dragstart', this, true);
		}

		/**
		 * インスタンスの動作を停止する。
		 * @access private
		 */
		stop()
		{
			removeMessageListener(`${this.id}:drop`, this);
			removeMessageListener(`${this.id}:dragend`, this);
			removeMessageListener(`${this.id}:uninstall`, this);
			removeEventListener('dragstart', this, true);
		}

		/**
		 * @param {DragEvent} event
		 */
		handleEvent(event)
		{
			switch (event.type) {
				case 'dragstart':
					if (event.isTrusted) {
						// ユーザーによるドラッグなら
						/**
						 * @access private
						 * @type {DragEvent}
						 */
						this.dragstartEvent = event;
						sendAsyncMessage(`${this.id}:dragstart`, {itemTypes: this.getItemTypes(event)});
					}
					break;
			}
		}

		/**
		 * @param {Object} message
		 */
		receiveMessage(message)
		{
			if (message.name.startsWith(`${this.id}:`)) {
				switch (message.name.replace(`${this.id}:`, '')) {
					case 'drop': {
						const obj = {};
						if (this.dragstartEvent) {
							if (message.data.asImage) {
								// 画像としてドロップしたとき
								obj.imageURL = this.getImageURLFromDragstartEvent(this.dragstartEvent);
							} else {
								// 文字列としてドロップしたとき
								obj.text = this.getTextFromDragstartEvent(this.dragstartEvent);
							}
						}
						sendAsyncMessage(`${this.id}:drop-data`, obj);
						this.dragstartEvent = null;
						break;
					}

					case 'dragend':
						this.dragstartEvent = null;
						break;

					case 'uninstall':
						this.stop();
						break;
				}
			}
		}

		/**
		 * ドラッグしようとしているアイテムの種類を取得する。
		 * @access private
		 * @param {DragEvent} event - dragstartイベント。
		 * @returns {string[]}
		 * @access protected
		 */
		getItemTypes(event)
		{
			const types = [];

			const target = event.target;
			const name = target.localName || target.nodeName;
			if (['a', 'img', '#text'].indexOf(name) !== -1
				|| ['input', 'textarea'].indexOf(name) !== -1 && !target.draggable
				|| target === document.documentElement && target.id === 'placesTreeBindings'
					&& target.namespaceURI === ContentScript.XBL_NS && target.localName === 'bindings') {
				// ソースノードがリンク・画像・文字列、ドラッグ不可のテキスト入力欄、またはツリー表示されているXML文書なら
				types.push('string:text/plain');
			}

			if (name === 'img' || name === 'a' && target.getElementsByTagName('img')[0]) {
				// ソースノードが画像、または画像を含むリンクなら
				types.push('file:image/*');
			}

			return types;
		}

		/**
		 * dragstartイベントから、対象の画像URLを取得する。
		 * @param {DragEvent} event
		 * @returns {?string}
		 */
		getImageURLFromDragstartEvent(event)
		{
			let url = null;

			const target = event.target;
			switch (target.localName) {
				case 'img':
					url = target.src;
					break;

				case 'a': {
					const images = target.getElementsByTagName('img');
					if (images.length === 1) {
						url = images[0].src;
					} else {
						const image = target.ownerDocument.elementFromPoint(event.clientX, event.clientY);
						url = image.localName === 'img' && target.contains(image) ? image.src : images[0].src;
					}
					break;
				}
			}

			return url;
		}

		/**
		 * dragstartイベントから、対象の文字列を取得する。
		 * @access private
		 * @param {DragEvent} event
		 * @returns {string}
		 */
		getTextFromDragstartEvent(event) {
			let text = '';
			let selection;
			let selectedString = '';

			const target = event.target;
			const localName = target.localName;
			const doc = target.ownerDocument;

			if ('getSelection' in doc) {
				selection = doc.getSelection();
				if (selection) {
					selectedString = selection.toString();
					if (selectedString && (localName === 'a' || target.nodeType === content.Node.TEXT_NODE)) {
						// リンクか選択範囲をドラッグしていれば
						const x = event.clientX, y = event.clientY;
						if (!this.isSuperposedCoordinateOnSelection(selection, x, y)) {
							// ドラッグ開始位置が選択範囲外なら
							let element = doc.elementFromPoint(x, y);
							if (element && (element.localName === 'a' || (element = element.closest('a')))) {
								// 選択範囲が重なったリンクの、選択範囲でない部分をドラッグしていれば
								text = gatherTextUnder(element);
							}
						}
					}
				}
			}

			if (!text && ['a', 'img'].indexOf(localName) !== -1) {
				// リンクか画像をドラッグしていれば
				if (selectedString && selection && selection.containsNode(target, true)) {
					// ソースノードが選択範囲と重なっており、
					// リンクの一部分だけが選択されている場合は、選択範囲とドラッグ開始位置が重なっていれば
					text = selectedString;
				}

				if (!text) {
					if (localName === 'img') {
						// 画像をドラッグしていれば
						text = selectedString || target.alt || target.title;
						if (!text) {
							const figcaption = DOMUtils.getFigcaption(target);
							if (figcaption) {
								text = gatherTextUnder(figcaption);
							}
						}
					} else {
						// リンクをドラッグしていれば
						text = gatherTextUnder(target);
					}
				}
			}

			return text.trim() || event.dataTransfer.getData('text/plain').trim();
		}

		/**
		 * 選択範囲と指定した座標が重なるか調べる。
		 * @access private
		 * @param {Selection} selection
		 * @param {number} x
		 * @param {number} y
		 * @returns {boolean}
		 */
		isSuperposedCoordinateOnSelection(selection, x, y)
		{
			for (let i = 0, l = selection.rangeCount; i < l; i++) {
				if (this.isSuperposedCoordinateOnRange(selection.getRangeAt(i), x, y)) {
					return true;
				}
			}
			return false;
		}

		/**
		 * rangeと指定した座標が重なるか調べる。
		 * @access private
		 * @param {Range} range
		 * @param {number} x
		 * @param {number} y
		 * @returns {boolean}
		 */
		isSuperposedCoordinateOnRange(range, x, y)
		{
			// Firefox 53時点で、Range#getClientRects() が DOMRect[] ではなく DOMRectList を返すバグを確認
			return Array.from(range.getClientRects()).some(rect => this.isSuperposedCoordinateOnRect(rect, x, y));
		}

		/**
		 * 長方形と指定した座標が重なるか調べる。
		 * @access private
		 * @param {DOMRect} rect
		 * @param {number} x
		 * @param {number} y
		 * @returns {boolean}
		 */
		isSuperposedCoordinateOnRect(rect, x, y)
		{
			return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
		}
	},

	/**
	 * contentプロセスで実行するスクリプトのURL。
	 * @returns {string}
	 * @access protected
	 */
	contentScriptURL: '',

	/**
	 * windowに追加するイベントリスナーが補足するイベントの種類。
	 * @type {string[]}
	 * @access protected
	 */
	eventTypesForWindow: ['dragover', 'dragenter', 'dragleave', 'dragend', 'drop'],

	/**
	 * ドラッグ中のアイテムの種類。
	 * ドラッグ中でなければnull。
	 * @type {?string[]}
	 * @access protected
	 */
	itemTypesDuringDrag: null,

	/**
	 * ドラッグ開始後、dragoverイベントが既に発生していれば真。
	 * @type {booelan}
	 * @access protected
	 */
	dragoverEventAlreadyFired: true,

	/**
	 * dropイベント。
	 * @type {?DragEvent}
	 * @access private
	 */
	dropEvent: null,

	/**
	 * drop-active-validクラスが付いた要素を返す。
	 * @returns {?HTMLLIElement}
	 * @access protected
	 */
	getActiveValidDropzone: function () {
		return this.wrapper.getElementsByClassName('drop-active-valid')[0];
	},

	/**
	 * ウィンドウ外からドロップされた文字列情報を取得する。
	 * @param {DragEvent} event - dropイベント。
	 * @param {boolean} [forceString] - 真が指定されていれば、常にFileインスタンスの代わりにファイル名を返す。
	 * @returns {?(string|File)}
	 * @access protected
	 */
	getTextFromDropEvent: function (event, forceString = false) {
		let dropFile = null, dropText = '';

		const files = event.dataTransfer.files;
		if (files.length > 0) {
			// ファイルをドロップしていれば
			if (!forceString) {
				for (const file of files) {
					if (BrowserUtils.mimeTypeIsTextBased(file.type)) {
						// テキストファイルなら
						dropFile = file;
						break;
					}
				}
			}

			if (!dropFile) {
				// テキスト形式でないファイルがドロップされているかforceStringが指定されていれば、ファイル名を取得する
				dropText = files[0].name;
			}
		} else {
			dropText = event.dataTransfer.getData('text/plain');
		}

		return dropFile ? dropFile : dropText.trim() || null;
	},

	/**
	 * URLからファイルを取得する。
	 * @param {string} url - ファイルのURL。
	 * @returns {Promise.<Blob>}
	 * @access protected
	 */
	fetchBlobFromURL: function (url) {
		return fetch(url, {credentials: 'include', cache: 'force-cache'}).then(response => response.blob());
	},

	/**
	 * ドロップされたデータを、ドロップゾーンに結びつけられたエンジンで検索する。
	 * @param {(string|Blob)} data - 検索する文字列、またはファイル。
	 * @param {number} engineIndex - prefs.jsに保存されているインデックス。
	 * @param {DragEvent} event - どのキーを押しているか取得するためのdropイベント。
	 * @access protected
	 */
	searchDropData: function (data, engineIndex, event) {
		const mimeType = data.type;
		if (mimeType && BrowserUtils.mimeTypeIsTextBased(mimeType) && !/^(?:image|audio)\//.test(mimeType)) {
			// ドロップされたデータがテキストファイルなら、文字列に変換しておく
			const fileReader = new FileReader();
			fileReader.addEventListener('load', () => {
				this.searchDropData(fileReader.result, engineIndex, event);
			});
			fileReader.readAsText(data);
			return;
		}

		const engine = SearchUtils.getEngineByIndex(engineIndex);
		if (engine) {
			if (engine.browserSearchEngine) {
				// ブラウザの検索窓のエンジンなら
				const browserSearchEngine = Services.search.getEngineByName(engine.name);
				if (browserSearchEngine) {
					const submission = browserSearchEngine.getSubmission(data);
					this.openSearchResult(submission.uri.spec, event, submission.postData);
				}
			} else {
				// ユーザー定義のエンジンなら
				if (engine.method === 'POST') {
					const formData = new FormData();
					for (const [name, value] of engine.params) {
						formData.append(name, value.includes('{searchTerms}') ? data : value);
					}

					StringUtils.encodeMultipartFormData(formData)
						.then(postData => this.openSearchResult(engine.url, event, postData));
				} else {
					let encodedString;
					try {
						encodedString = TextToSubURI.ConvertAndEscape(engine.encoding, data);
					} catch (e) {
						if (e.result === Cr.NS_ERROR_UCONV_NOCONV) {
							encodedString = TextToSubURI.ConvertAndEscape(StringUtils.THE_ENCODING, data);
						} else {
							throw e;
						}
					}
					this.openSearchResult(engine.url.replace(/{searchTerms}/g, encodedString), event);
				}
			}
		}
	},

	/**
	 * ユーザー設定に基づき、適切な場所で検索結果を開く。
	 * @param {string}	url
	 * @param {DragEvent} event - どのキーを押しているか取得するためのdropイベント。
	 * @param {nsIInputStream} [postData]
	 * @access protected
	 */
	openSearchResult: function (url, event, postData = null) {
		const where = Preferences.get(this.ROOT_BRANCH_NAME + 'where', 'tab');
		const current = where === 'current';
		(current ? openUILink : openUILinkIn)(
			url,
			current ? event : where,
			{ postData: postData, triggeringPrincipal: Services.scriptSecurityManager.createNullPrincipal({}) }
		);
	},
};



/**
 * 検索窓のエンジンを追加・削除したときのオブザーバ。
 */
const BrowserSearchEngineModifiedObserver = {
	/**
	 * 監視する項目。
	 * @constant {string}
	 */
	SEARCH_ENGINE_TOPIC: 'browser-search-engine-modified',

	/**
	 * 検索エンジンが削除されたときの通知。
	 * @constant {string}
	 */
	SEARCH_ENGINE_REMOVED: 'engine-removed',

	/**
	 * 検索エンジンの情報が変更されたときの通知。
	 * @constant {string}
	 */
	SEARCH_ENGINE_CHNAGED: 'engine-changed',

	/**
	 * 検索エンジンが追加されたときの通知。
	 * @constant {string}
	 */
	SEARCH_ENGINE_ADDED: 'engine-added',

	/**
	 * オブザーバを追加する。
	 * ブラウザ起動時に呼び出し、新しいウィンドウが開かれたときは呼び出さない。
	 */
	init: function () {
		Services.obs.addObserver(this, this.SEARCH_ENGINE_TOPIC, false);
		Services.obs.addObserver(this, DragAndDropZonesPlus.ID, false);
	},

	/**
	 * オブザーバを削除する。
	 */
	stop: function () {
		Services.obs.removeObserver(this, this.SEARCH_ENGINE_TOPIC);
		Services.obs.removeObserver(this, DragAndDropZonesPlus.ID);
	},

	/**
	 * 通知を受け取るメソッド。
	 * @param {*} subject
	 * @param {string} topic
	 * @param {string} data
	 */
	observe: function (subject, topic, data) {
		switch (topic) {
			case this.SEARCH_ENGINE_TOPIC: {
				const browserEngine = subject.QueryInterface(Ci.nsISearchEngine);
				switch (data) {
					case this.SEARCH_ENGINE_ADDED:
						// 検索窓にエンジンが追加されたとき
						if (Preferences.get(SettingsUtils.ROOT_BRANCH_NAME + 'automaticallyReflect', true)) {
							// ドロップゾーンの自動追加が有効なら
							const engine = SearchUtils.convertEngineFromBrowser(browserEngine);
							engine.index = SearchUtils.getDropzoneLength();
							SearchUtils.setEngine(engine.index, engine);
							DropzoneUtils.update();
						}
						break;

					case this.SEARCH_ENGINE_REMOVED:
						// 検索窓からエンジンが削除されたとき
						for (let i = 0, l = SearchUtils.getDropzoneLength(); i < l; i++) {
							const branch = new Preferences(SettingsUtils.ROOT_BRANCH_NAME + 'engines.' + i + '.');
							if (branch.get('name') === browserEngine.name && !branch.get('url')) {
								// 同名のエンジン、かつユーザー定義エンジンでなければ
								Services.prefs.getBranch(SettingsUtils.ROOT_BRANCH_NAME + 'engines.')
									.deleteBranch(i + '.');
								DropzoneUtils.update();
								break;
							}
						}
						break;
				}
				break;
			}

			case DragAndDropZonesPlus.ID:
				switch (data) {
					case UninstallObserver.TYPE:
						// アンインストール時
						this.stop();
						break;
				}
				break;
		}
	},
};



/**
 * 設定画面。
 */
const SettingsScreen = {
	/**
	 * XUL名前空間。
	 * @constant {string}
	 */
	XUL_NS: 'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul',

	/**
	 * Base64に変換したとき、データが何倍になるか。
	 * @constant {number}
	 */
	BASE64_SIZE_RATIO: 4 / 3,

	/**
	 * 設定画面タブのアイコン。
	 * @constant {string}
	 */
	ICON: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAACSVBMVEX////////////////////////////////////////////////r8PTu8vby9fju8fbw8/f09vn////////////////////8/f38/v79/v6kvdSkvtelyeClyeK0x9q0yd210eW10ebE1OPE1eXF3OvF3OzO2ubV4Orf5+/P2+jP2+nX4evX4e3g6PDg6PHU4Ova5e7j6/K4x9rE0ODR2+e5ydu5ytvF0eHF0+HS3OjS3ejAz+DK1+XW4Ou4zuC4z+K50uW51ObE1eXE1+bF2enF2urR3+vR4OzS4u7S4+9ykLWOpMGkt89HeahJgLBMjr5Mk8NukrdvmL1yo8lypsyIqMeJrcyLttWLudhGf7Btl72HrMw/cqVpjrWDpMUqa6QterNaiLRck8B1n8R3qc4dXpsid7NSf6xVkcBtl75wp84ALnQ4XY9SeKUAP4MAT5YAWp8AZKo7aZo9dKk/e7A/g7hVg69XjbtZlMFZm8gAMHUANXwAO4A2XpA2YpU3ZphQeaZQfKpRgK0APIU1Z5xPgbAAHGYtUYRFbJwAHGgAH2sAJXEAMH0qUYYqU4grV4wsXpZCbJ1Cbp9DcqNEeasAKHUpWZBBdKYAGmwANYgARpkfUIkiYp4jbas1a6A4fLI6h70AAAAABVgACV0AD2MAFmkAHHEAJHcAKn8AMIUANosAO5AAP5QbQnobRX4cSYIcTYcdUYwdVpEeWpcfXpwfY6AfZqQgaacvXZMvYJYwZJoxaJ4ybKMycaczdaw0ebA1fbQ1gLc2g7rS/SeDAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfeAwQBGiXWyX7TAAAAd0lEQVQY02NgwAEiKhdURiDxsw6BQBacH34wxZPBM+VgOEyg4oAHkPQ4UAETmL8fTO2fDxMo3+cOJN33lcMEovcmuzG4Je8Ng/INW6fsAYFMmIKm3dPjyuaVhcL4jbsm2yI7smHnJCtkfu6OiZYovvDpMGEgCQAArSEnE6lZL7YAAAAASUVORK5CYII=',

	/**
	 * メニューバーの「ツール」に、設定画面を開くオプションを追加。
	 */
	addToMenu: function () {
		const menuItem = document.createElementNS(this.XUL_NS, 'menuitem');
		menuItem.id = DragAndDropZonesPlus.ID + '-menuitem';
		menuItem.setAttribute('label', DragAndDropZonesPlus.NAME);
		menuItem.setAttribute('image', this.ICON);
		menuItem.classList.add('menuitem-iconic');
		menuItem.addEventListener('command', () => this.open());
		document.getElementById('menu_ToolsPopup').appendChild(menuItem);
	},

	/**
	 * 設定画面を開く。
	 */
	open: function () {
		if (this.tab) {
			// すでに同じウィンドウで開いていれば
			gBrowser.selectedTab = this.tab;
		} else {
			const enumerator = Services.wm.getEnumerator('navigator:browser');
			while (enumerator.hasMoreElements()) {
				const win = enumerator.getNext();
				if (win[DragAndDropZonesPlus.ID + '_settingsTab']) {
					// すでに別ウィンドウで開いていれば
					win.focus();
					win.gBrowser.selectedTab = win[DragAndDropZonesPlus.ID + '_settingsTab'];
					return;
				}
			}

			this.tab = gBrowser.addWebTab('about:blank');
			gBrowser.getBrowserForTab(this.tab).addEventListener('load', this, true);
			gBrowser.selectedTab = this.tab;
			gBrowser.tabContainer.addEventListener('TabClose', this);
		}
	},

	/**
	 * イベントハンドラ。
	 * @param {Event} event
	 */
	handleEvent: function (event) {
		const target = event.target;

		switch (event.type) {
			case 'load': {
				const browser = gBrowser.getBrowserForTab(this.tab);
				if (browser.documentURI.spec === 'about:blank') {
					this.show();
				} else {
					// 同じタブで別のページが開かれたら
					browser.removeEventListener(event.type, this, event.eventPhase === Event.CAPTURING_PHASE);
					this.tab = null;
					return;
				}
				break;
			}

			case 'TabClose': {
				const closedTab = event.target;
				if (closedTab === this.tab) {
					gBrowser.tabContainer.removeEventListener(event.type, this);
					this.tab = null;
				}
				break;
			}

			case 'beforeunload':
				delete window[DragAndDropZonesPlus.ID + '_settingsTab'];
				break;

			case 'submit': {
				// OKボタン
				target.querySelector('[type=submit],button:not([type])').disable = true;
				event.preventDefault();

				const engines = [];
				for (const row of target.getElementsByTagName('tbody')[0].rows) {
					const engine = {};
					const name = row.querySelector('[name=name]');
					if (name.readOnly) {
						// 検索窓のエンジンなら
						engine.browserSearchEngine = true;
					}
					engine.name = name.value;
					if (!engine.browserSearchEngine) {
						engine.url = row.querySelector('[name=url]').value;
					}
					if (engine.name
						&& (engine.browserSearchEngine ? Services.search.getEngineByName(engine.name) : engine.url)) {
						// 検索エンジン名が空文字列でなければ、
						// かつブラウザのエンジンであればそれが存在するなら、ユーザー定義エンジンであればURLが空文字列でなければ
						if (!engine.browserSearchEngine) {
							// ユーザー定義エンジンであれば
							const icon = row.querySelector('[name=icon]').value;
							if (icon) {
								engine.icon = icon;
							}
							engine.method = row.querySelector('[name=method]').value;
							if (engine.method === 'GET') {
								// GETメソッドなら
								if (!engine.url.includes('{searchTerms}')) {
									engine.url += '{searchTerms}';
								}
							} else {
								// POSTメソッドなら
								engine.params = [];
								for (const pair of row.querySelectorAll('tbody > tr')) {
									const name = pair.querySelector('[name=post-param-name]').value;
									const value = pair.querySelector('[name=post-param-value]').value;
									if (name || value) {
										// 名前と値どちらかが入力されていれば
										engine.params.push([name, value]);
									}
								}
							}
							engine.accept = row.querySelector('[name=accept]').value;
							engine.encoding = row.querySelector('[name=encoding]').value;
						}
						engines.push(engine);
					}
				}

				const prefBranch = Services.prefs.getBranch(SettingsUtils.ROOT_BRANCH_NAME);

				const where = target.where.value;
				if (where === 'tab') {
					prefBranch.clearUserPref('where');
				} else {
					Preferences.set(SettingsUtils.ROOT_BRANCH_NAME + 'where', where);
				}

				if (target['automatically-reflect'].checked) {
					prefBranch.clearUserPref('automaticallyReflect');
				} else {
					Preferences.set(SettingsUtils.ROOT_BRANCH_NAME + 'automaticallyReflect', false);
				}

				SearchUtils.setEngines(engines);
				DropzoneUtils.update();
				this.close();
				break;
			}

			case 'contextmenu':
				// 選択された要素を取得しておく
				this.selectedElement = target;
				break;

			case 'click':
				switch (target.name) {
					case 'icon':
						// 選択された要素を取得しておく
						this.selectedElement = target;
						if (target.type !== 'menu') {
							// button[type=menu] の代替
							// Bug 897102 – Update <menu> to spec <https://bugzilla.mozilla.org/show_bug.cgi?id=897102>
							event.preventDefault();
							const doc = gBrowser.getBrowserForTab(this.tab).contentDocument;
							const menu = doc.getElementById('icon-menu');
							const iconMenupopup = document.createElementNS(this.XUL_NS, 'menupopup');
							for (const menuitem of menu.getElementsByTagName('menuitem')) {
								const xulMenuitem = document.createElementNS(this.XUL_NS, 'menuitem');
								xulMenuitem.setAttribute('label', menuitem.label);
								xulMenuitem.setAttribute('value', menuitem.id);
								iconMenupopup.appendChild(xulMenuitem);
							}
							iconMenupopup.addEventListener('click', function (event) {
								doc.getElementById(event.target.value).click();
							});
							iconMenupopup.addEventListener('popuphidden', function (event) {
								event.currentTarget.remove();
							});
							document.documentElement.appendChild(iconMenupopup).openPopup(target);
						}
						break;

					case 'delete':
						// 行の削除
						this.deleteEngine(target);
						break;

					case 'add-row':
						// 行の追加
						this.insertEmptyRow(target);
						break;

					case 'params':
						// POSTパラメータの開閉
						target.closest('tr').classList.toggle('displaying-post-params');
						break;

					case 'export':
						// エクスポート
						SettingsUtils.exportToFile(
							gBrowser.getBrowserForTab(this.tab).contentDocument.defaultView,
							filePath => showPopupNotification(
								_('%s へ設定をエクスポートしました。').replace('%s', filePath),
								this.tab
							)
						);
						break;

					case 'import':
						// インポート
						SettingsUtils.importFromFile(
							gBrowser.getBrowserForTab(this.tab).contentDocument.defaultView,
							(fileName, errorMessage) => {
								if (errorMessage) {
									showPopupNotification(
										_('%s からのインポートに失敗しました。').replace('%s', fileName) + '\n' + errorMessage,
										this.tab,
										'warning'
									);
								} else {
									gBrowser.getBrowserForTab(this.tab).contentDocument.defaultView.location.reload();
									showPopupNotification(_('%s からのインポートが完了しました。').replace('%s', fileName), this.tab);
								}
							}
						);
						break;

					case 'additional-import':
						// 追加インポート
						this.addEnginesFromFile((fileName, errorMessage) => {
							if (errorMessage) {
								showPopupNotification(
									_('%s からのインポートに失敗しました。').replace('%s', fileName) + '\n' + errorMessage,
									this.tab,
									'warning'
								);
							} else {
								showPopupNotification(_('%s からのインポートが完了しました。').replace('%s', fileName) + '\n'
										+ _('インポートした設定を保存するには、「OK」ボタンをクリックしてください。'), this.tab);
							}
						});
						break;

					case 'import-from-text':
						// JSON文字列から追加インポート
						Version1Settings.getEnginesFromText(
							gBrowser.getBrowserForTab(this.tab).contentDocument.defaultView,
							(engines, errorMessage) => {
								if (errorMessage) {
									showPopupNotification(
										_('JSON文字列からのインポートに失敗しました。') + '\n' + errorMessage,
										this.tab,
										'warning'
									);
								} else {
									this.addEngines(engines);
									showPopupNotification(_('JSON文字列からのインポートが完了しました。') + '\n'
											+ _('インポートした設定を保存するには、「OK」ボタンをクリックしてください。'), this.tab);
								}
							}
						);
						break;

					case 'cancel':
						// キャンセル
						this.close();
						break;

					case 'get-icons':
						// 未取得アイコンの一括取得
						target.disabled = true;
						this.setIconsToEngineWithout(target, () => {
							target.disabled = false;
							showPopupNotification(_('アイコンの取得が完了しました。'), this.tab);
						});
						break;

					case 'initialize':
					case 'uninstall':
						// 設定の初期化、またはすべての設定の削除
						if (gBrowser.getBrowserForTab(this.tab).contentDocument.defaultView
							.confirm(_('本当に、『%s』のすべての設定を削除してもよろしいですか？').replace('%s', DragAndDropZonesPlus.NAME))) {
							if (target.name === 'initialize') {
								DragAndDropZonesPlus.initialize();
								gBrowser.getBrowserForTab(this.tab).contentDocument.defaultView.location.reload();
								showPopupNotification(_('設定の初期化が完了しました。'), this.tab);
							} else {
								this.close();
								DragAndDropZonesPlus.uninstall();
								showPopupNotification(
									_('設定の削除が完了しました。当スクリプト自体を削除しなければ、次回のブラウザ起動時にまた設定が作成されます。'),
									gBrowser.selectedTab
								);
							}
						}
						break;

					default: {
						const parent = target.parentElement;
						if (parent) {
							switch (parent.id) {
								case 'row-contextmenu':
									// 行のコンテキストメニュー
									// 行の挿入
									this.insertEmptyRow(this.selectedElement, target.id === 'add-row-above');
									break;

								case 'icon-menu': {
									// アイコンのメニュー
									let url;
									switch (target.id) {
										case 'set-icon-from-local-file':
											IconUtils.getFromLocalFile(
												gBrowser.getBrowserForTab(this.tab).contentDocument.defaultView,
												(dataURL, errorMessage) => {
													if (dataURL) {
														this.showIcon(dataURL);
													} else {
														showPopupNotification(errorMessage, this.tab, 'warning');
													}
												}
											);
											break;
										case 'set-icon-from-url':
											// 入力ダイアログを開く
											url = gBrowser.getBrowserForTab(this.tab).contentDocument.defaultView
												.prompt(_('WebページのURL、または画像ファイルのURLを入力してください。'));
											if (url) {
												IconUtils.getFromUrl(url, (dataURL, errorMessage) => {
													if (dataURL) {
														this.showIcon(dataURL);
													} else {
														showPopupNotification(errorMessage, this.tab, 'warning');
													}
												});
											}
											break;
										case 'set-icon-from-clipboard':
											// クリップボードのデータを取得する
											IconUtils.getIconFromClipboard((dataURL, errorMessage) => {
												if (dataURL) {
													this.showIcon(dataURL);
												} else {
													showPopupNotification(errorMessage, this.tab, 'warning');
												}
											});
											break;
										case 'restore-default-icon':
											// Faviconを取得し設定
											url = this.selectedElement.closest('tr').querySelector('[name=url]').value;
											if (url) {
												IconUtils.getFaviconFromSiteUrl(url, (dataURL) => {
													if (dataURL) {
														this.showIcon(dataURL);
													} else {
														this.selectedElement.value = '';
														this.selectedElement.firstElementChild.src
															= DropzoneUtils.DEFAULT_ICON;
													}
												});
											} else {
												this.selectedElement.value = '';
												this.selectedElement.firstElementChild.src = DropzoneUtils.DEFAULT_ICON;
											}
											break;
									}
									break;
								}
							}
						}
					}
				}
				break;

			case 'keypress': {
				const key = event.key;
				switch (key) {
					case 'Enter':
						// Enterキーが押されたとき
						if (target.matches('tbody tr, tbody tr *')) {
							// 行内でキーが押されたとき
							const shiftKey = event.getModifierState('Shift');
							if (shiftKey || event.getModifierState('Alt') || event.getModifierState('Control')) {
								// Shiftキー、Altキー、Ctrlキーいずれかが押されていれば
								event.preventDefault();
								// 行を追加する
								this.insertEmptyRow(target, shiftKey, true);
							}
						}
						break;

					case 'ArrowUp':
					case 'ArrowDown':
						// 上矢印キー、または下矢印キーが押されたとき
						if (target.localName === 'input'
							&& (event.getModifierState('Alt') || event.getModifierState('Control'))) {
							// input要素上でAltキーかCtrlキーが押されていれば
							const current = target.closest('tr');
							const currentIndex = current.sectionRowIndex + 1;
							const rows = current.parentElement.querySelectorAll(
								`:not(td) > table > tbody > tr:nth-of-type(${key === 'ArrowUp' ? '-n+' + (currentIndex - 1) : 'n+' + (currentIndex + 1)}):not(.browser-search-engine)`
							);
							const sibling = key === 'ArrowUp' ? rows[rows.length - 1] : rows[0];
							if (sibling) {
								event.preventDefault();
								sibling.querySelector('[name=' + target.name + ']').focus();
							}
						}
						break;
				}
				break;
			}

			case 'change':
				switch (target.name) {
					case 'method': {
						// メソッドが変更されたとき
						const row = target.closest('tr');
						if (target.value === 'POST') {
							// POSTメソッド
							row.classList.add('post');
						} else {
							// GETメソッド
							row.querySelector('[name="accept"]').value = 'text/plain';
							row.classList.remove('displaying-post-params', 'post');
							for (const option of row.querySelectorAll('[name="encoding"] option')) {
								option.disabled = false;
							}
						}
						break;
					}

					case 'accept': {
						// データの種類
						const encoding = target.closest('tr').querySelector('[name="encoding"]');
						if (target.value === 'text/plain') {
							// 文字列
							for (const option of Array.from(encoding)) {
								option.disabled = false;
							}
						} else {
							// 画像
							// 音声
							encoding.value = StringUtils.THE_ENCODING;
							for (const option of encoding.querySelectorAll('option:not(:checked)')) {
								option.disabled = true;
							}
						}
						break;
					}

					case 'add-browser-engine':
						// ブラウザの検索エンジンの追加
						this.insertEngine(JSON.parse(target.selectedOptions[0].dataset.engine));
						target[0].selected = true;
						break;
				}
				break;

			// 行の並び替え
			case 'dragstart':
				if (target.matches('[draggable], [draggable] *')) {
					const row = target.closest('tr'), dataTransfer = event.dataTransfer;
					dataTransfer.setDragImage(row, 0, 0);
					dataTransfer.setData('application/x-sectionrowindex', row.sectionRowIndex);
					this.duringRowDrag = true;
				}
				break;

			case 'dragover':
				if (this.duringRowDrag) {
					const row = target.closest('tr');
					if (row) {
						event.preventDefault();
						this.resetDropzoneClasses();
						switch (row.parentElement.localName) {
							case 'thead':
								target.closest('table').tBodies[0].rows[0].classList.add('active-dropzone-above');
								break;
							case 'tbody': {
								const rect = row.getBoundingClientRect();
								if (event.clientY - rect.top < rect.height / 2) {
									// ポインタが行の真ん中より上にあれば
									row.classList.add('active-dropzone-above');
								} else {
									// ポインタが行の真ん中より下にあれば
									row.classList.add('active-dropzone-below');
								}
								break;
							}
							case 'tfoot': {
								const tbody = target.closest('table').tBodies[0];
								tbody.rows[tbody.rows.length - 1].classList.add('active-dropzone-below');
								break;
							}
						}
					}
				}
				break;

			case 'dragleave':
				if (this.duringRowDrag
					&& !target.ownerDocument.getElementsByTagName('table')[0].contains(event.relatedTarget)) {
					this.resetDropzoneClasses();
				}
				break;

			case 'drop':
				if (this.duringRowDrag) {
					const doc = gBrowser.getBrowserForTab(this.tab).contentDocument;
					let refChild = doc.getElementsByClassName('active-dropzone-above')[0];
					let tbody;
					if (refChild) {
						tbody = refChild.parentElement;
					} else {
						const targetRow = doc.getElementsByClassName('active-dropzone-below')[0];
						tbody = targetRow.parentElement;
						if (targetRow) {
							refChild = targetRow.nextElementSibling;
						} else {
							return;
						}
					}
					tbody.insertBefore(
						tbody.rows[event.dataTransfer.getData('application/x-sectionrowindex')],
						refChild
					);
					this.resetDropzones();
				}
				break;

			case 'dragend':
				if (this.duringRowDrag) {
					this.resetDropzones();
				}
				break;
		}
	},

	/**
	 * 行の並べ替え終了時の処理。
	 */
	resetDropzones: function () {
		this.duringRowDrag = false;
		this.resetDropzoneClasses();
	},

	/**
	 * 行の並べ替えに関するクラス名の削除。
	 */
	resetDropzoneClasses: function () {
		for (const row of gBrowser.getBrowserForTab(this.tab).contentDocument
			.querySelectorAll('.active-dropzone-above, .active-dropzone-below')) {
			row.classList.remove('active-dropzone-above', 'active-dropzone-below');
		}
	},

	/**
	 * アイコンが設定されていない行について、アイコンを一括取得し設定する。
	 * @param {HTMLButtonElement} button - 一括取得ボタン。
	 * @param {Function} [callback]
	 * @access protected
	 */
	setIconsToEngineWithout: function (button, callback = function () { }) {
		const doc = button.ownerDocument;

		const emptyIcons
			= doc.querySelectorAll('tbody > tr [name=icon]:not([value]), tbody > tr [name=icon][value=""]');

		// 進行状況
		const progress = doc.createElement('progress');
		progress.max = emptyIcons.length;
		progress.value = 0;
		button.parentElement.replaceChild(progress, button);

		(function getFavicon() {
			const icon = emptyIcons[progress.value];
			if (icon) {
				const url = icon.closest('tr').querySelector('[name=url]').value;
				if (url) {
					IconUtils.getFaviconFromSiteUrl(url, function (dataURL) {
						icon.firstElementChild.src = icon.value = dataURL;
						progress.value = Number(progress.value) + 1;
						getFavicon();
					}, function () {
						progress.value = Number(progress.value) + 1;
						getFavicon();
					});
				} else {
					progress.value = Number(progress.value) + 1;
					getFavicon();
				}
			} else {
				// すべてのアイコンを取得し終えたら
				progress.parentElement.replaceChild(button, progress);
				callback();
			}
		})();
	},

	/**
	 * 行を削除する。
	 * @param {HTMLButtonElement} deleteButton - 削除ボタン。
	 * @access protected
	 */
	deleteEngine: function (deleteButton) {
		const row = deleteButton.closest('tr');
		row.remove();
		const name = row.querySelector('[name=name]');
		if (name.readOnly) {
			// 検索窓の検索エンジンを削除していれば、検索窓の検索エンジンを追加するセレクトボックスで選択可能に
			deleteButton.ownerDocument
				.querySelector(`[name=add-browser-engine] [label="${CSS.escape(name.value)}"]`).hidden = false;
		}
	},

	/**
	 * 指定した位置に空行を作成。
	 * @param {HTMLElement} target - 挿入位置の基準になる行に含まれる要素、または行を追加するtable要素。
	 * @param {boolean} [insertingBefore=false] - 基準になる行の上に挿入するならtrue。
	 * @param {boolean} [focus=false] - 新しい行にフォーカスを移すならtrue。
	 */
	insertEmptyRow: function (target, insertingBefore = false, focus = false) {
		const table = target.localName === 'table' ? target : target.closest('table');
		let targetRow = null;
		if (target.localName !== 'table' && target.name !== 'add-row') {
			const row = target.closest('tr');
			targetRow = insertingBefore ? row : row.nextElementSibling;
		}

		const row = table.parentElement.localName === 'form'
				? this.insertEngine(null, targetRow)
				: table.tBodies[0].insertBefore(
					table.getElementsByTagName('template')[0].content.firstElementChild.cloneNode(true),
					targetRow
				);

		if (focus && /^(?:input|select)$/.test(target.localName)) {
			// 追加した行にフォーカスを移す
			row.querySelector('[name=' + event.target.name + ']').focus();
		}
	},

	/**
	 * 指定された位置に行を挿入する。
	 * @param {SearchEngine} [engine] - 指定しなかった場合は空行を挿入する。
	 * @param {HTMLTableRowElement} [child] - 指定しなかった場合は表本体の末尾に追加する。
	 * @return {?HTMLTableRowElement} ブラウザの検索エンジンが壊れたURLを保持していた場合は行を挿入しない。
	 */
	insertEngine: function (engine = null, child = null) {
		const doc = gBrowser.getBrowserForTab(this.tab).contentDocument;
		const tbody = doc.getElementsByTagName('tbody')[0];
		const row = tbody.getElementsByTagName('template')[0].content.firstElementChild.cloneNode(true);

		const paramsTbody = row.getElementsByTagName('tbody')[0];
		const paramTemplate = paramsTbody.getElementsByTagName('template')[0].content.firstElementChild;
		if (!engine || engine.method === 'GET') {
			// GETメソッド
			const row = paramTemplate.cloneNode(true);
			row.querySelector('[name=post-param-value]').value = '{searchTerms}';
			paramsTbody.appendChild(row);
		}

		if (engine) {
			if (engine.browserSearchEngine) {
				// ブラウザの検索エンジンなら
				row.classList.add('browser-search-engine');
				doc.querySelector(`[name=add-browser-engine] [label="${CSS.escape(engine.name)}"]`).hidden = true;
			} else {
				if (engine.method === 'POST') {
					// POSTメソッド
					row.classList.add('post');
				}
			}
			for (const input of row.querySelectorAll('[name]')) {
				const name = input.name;
				if (engine[name]) {
					if (name === 'params') {
						// POSTパラメータなら
						if (!engine.browserSearchEngine) {
							let params = engine[name] || [];
							if (engine.browserSearchEngine) {
								// ブラウザの検索エンジンなら
								row.getElementsByTagName('tfoot')[0].remove();
							} else {
								params = params.concat([['', '']]);
							}
							params.forEach(function ([name, value]) {
								const row = paramTemplate.cloneNode(true);
								const nameInput = row.querySelector('[name=post-param-name]');
								const valueInput = row.querySelector('[name=post-param-value]');
								nameInput.value = name;
								valueInput.value = value;
								if (engine.browserSearchEngine) {
									// ブラウザの検索エンジンなら
									nameInput.readOnly = true;
									valueInput.readOnly = true;
									row.querySelector('[name=delete]').remove();
								}
								paramsTbody.appendChild(row);
							});
						}
					} else {
						if (engine[name]) {
							input.value = engine[name];
						}
						if (engine.browserSearchEngine) {
							// ブラウザの検索エンジンなら
							switch (name) {
								case 'name':
									input.readOnly = true;
									break;
								case 'url':
									input.readOnly = true;
									if (engine.method === 'POST') {
										let url;
										try {
											url = NetUtil.newURI(engine[name]).QueryInterface(Ci.nsIURL);
										} catch (e) {
											if (e.result === Cr.NS_ERROR_MALFORMED_URI
												|| e.result === Cr.NS_NOINTERFACE) {
												// 妥当なURLでなければ
												return null;
											} else {
												throw e;
											}
										}
										const searchParams = new URLSearchParams(url.query);
										for (const [name, value] of engine.params) {
											searchParams.append(name, value);
										}
										url.query
											= searchParams.toString().replace(/%7BsearchTerms%7D/g, '{searchTerms}');
										input.value = url.spec;
									}
									break;
								case 'icon': {
									const cell = input.closest('td');
									const img = input.firstElementChild;
									cell.replaceChild(img, input);
									img.src = engine[name] || DropzoneUtils.DEFAULT_ICON;
									break;
								}
								default: {
									const value
										= input.localName === 'select' ? input.selectedOptions[0].text : input.value;
									input.closest('td').textContent = value;
								}
							}
						}
						switch (name) {
							case 'icon':
								if (!engine.browserSearchEngine && engine[name]) {
									input.firstElementChild.src = engine[name];
								}
								break;
							case 'name':
								input.dataset.value = engine[name];
								break;
						}
					}
				}
			}

			if (!engine.browserSearchEngine && row.querySelector('[name="accept"]').value !== 'text/plain') {
				for (const option of row.querySelectorAll('[name="encoding"] option:not(:checked)')) {
					option.disabled = true;
				}
			}
		}

		if (engine && !child) {
			// 空行の挿入ではない、かつ末尾への追加なら
			const rows = tbody.rows;
			// 末尾の空行ではない行を取得
			const previousRowSibling = Array.from(rows).reverse().find(
				row => row.querySelector('[name="name"]').value.trim() !== ''
					|| row.querySelector('[name="url"]').value.trim() !== ''
			);
			// 追加位置を取得
			child = previousRowSibling ? previousRowSibling.nextElementSibling : rows[0];
		}
		return tbody.insertBefore(row, child);
	},

	/**
	 * 行をドラッグ中ならtrue。
	 * @type {boolean}
	 * @access protected
	 */
	duringRowDrag: false,

	/**
	 * イベントが発生したタブに設定画面を描画する。
	 * @access protected
	 */
	show: function () {
		const doc = gBrowser.getBrowserForTab(this.tab).contentDocument, win = doc.defaultView;

		window[DragAndDropZonesPlus.ID + '_settingsTab'] = this.tab;

		this.printStatic();

		// ブラウザの検索エンジンを追加するセレクトボックス
		const addingBrowserEngine = doc.getElementsByName('add-browser-engine')[0];
		for (const engine of SearchUtils.getBrowserEngines()) {
			const option = new Option(engine.name);
			option.label = engine.name;
			option.dataset.engine = JSON.stringify(engine);
			addingBrowserEngine.add(option);
		}

		const table = doc.getElementsByTagName('table')[0];
		const tbody = table.tBodies[0];

		doc.addEventListener('click', this);

		tbody.addEventListener('contextmenu', this);
		tbody.addEventListener('keypress', this);
		doc.addEventListener('submit', this);
		doc.addEventListener('change', this);
		win.addEventListener('beforeunload', this);

		tbody.addEventListener('dragstart', this);
		table.addEventListener('dragover', this);
		table.addEventListener('dragleave', this);
		table.addEventListener('drop', this);
		win.addEventListener('dragend', this);

		// 設定を表示
		for (const engine of SearchUtils.getEngines()) {
			this.insertEngine(engine);
		}

		// 空行を追加
		this.insertEngine();
	},

	/**
	 * 表に検索エンジンを追加する。
	 * @param {SearchEngine[]} engines
	 * @access protected
	 */
	addEngines: function (engines) {
		const doc = gBrowser.getBrowserForTab(this.tab).contentDocument;

		const addingBrowserEngine = doc.getElementsByName('add-browser-engine')[0];
		for (const engine of engines) {
			const option = addingBrowserEngine.querySelector(`[label="${CSS.escape(engine.name)}"]`);
			if (option) {
				// 同名の検索エンジンがブラウザに存在すれば
				if (!option.hidden) {
					// それが追加されていないエンジンなら
					this.insertEngine(JSON.parse(option.dataset.engine));
					option.hidden = true;
				}
			} else {
				this.insertEngine(engine);
			}
		}
	},

	/**
	 * 取得したアイコンをアイコン設定ボタンに表示する。
	 * @param {string} dataURL - アイコンのDataURL
	 * @access protected
	 */
	showIcon: function (dataURL) {
		if (dataURL.length > SettingsUtils.MAX_PREFERENCE_VALUE_LENGTH) {
			showPopupNotification(
				_('アイコンの設定に失敗しました。約 %s KiB までの画像を設定できます。')
					.replace('%s', SettingsUtils.MAX_PREFERENCE_VALUE_LENGTH / this.BASE64_SIZE_RATIO / 1024),
				this.tab,
				'warning'
			);
		} else {
			this.selectedElement.firstElementChild.src = this.selectedElement.value = dataURL;
		}
	},

	/**
	 * ファイルから設定を追加する。
	 * @param {Function} [callback] - 第1引数にファイル名。インポートに失敗していれば、第2引数にエラーメッセージ。
	 * @access protected
	 */
	addEnginesFromFile: function (callback = function () { }) {
		SearchUtils.getSearchEnginesFromFile(
			gBrowser.getBrowserForTab(this.tab).contentDocument.defaultView,
			(engines, settingsDocument, fileName, errorMessage) => {
				if (engines) {
					this.addEngines(engines);
					callback(fileName);
				} else {
					callback(fileName, errorMessage);
				}
			}
		);
	},

	/**
	 * 設定画面を閉じる。
	 * @access protected
	 */
	close: function () {
		if (gBrowser.tabs.length === 1) {
			// 設定画面以外のタブが存在しなければ
			const enumerator = Services.wm.getEnumerator('navigator:browser');
			enumerator.getNext();
			if (!enumerator.hasMoreElements()) {
				// 他にウィンドウが存在しなければ、ホームページに移動する
				const homePage = gHomeButton.getHomePage();
				gBrowser.getBrowserForTab(this.tab).contentDocument.defaultView.location.assign(
					homePage === 'about:blank' ? 'about:home' : homePage
				);
			} else {
				gBrowser.getBrowserForTab(this.tab).contentDocument.defaultView.close();
			}
		} else {
			gBrowser.removeTab(this.tab);
		}
	},

	/**
	 * 設定画面の静的部分を描画。
	 * @access protected
	 */
	printStatic: function () {
		const doc = gBrowser.getBrowserForTab(this.tab).contentDocument;

		// Bug 906353 – Add support for css4 selector :matches(), the standard of :-moz-any().
		// <https://bugzilla.mozilla.org/show_bug.cgi?id=906353>
		doc.head.insertAdjacentHTML('beforeend', h`
			<link rel="icon" href="${this.ICON}" />
			<title>${DragAndDropZonesPlus.NAME}</title>
			<style>
				:root {
					height: 100%;
					color: -moz-DialogText;
					background: -moz-Dialog;
				}

				/*------------------------------------
					行のドラッグ
				*/
				[draggable="true"],
				[draggable="true"] [readonly]:not([name="name"]),
				td table [readonly] {
					cursor: move;
				}

				[name="name"] {
					width: 150px;
				}

				[name="url"] {
					width: 400px;
				}

				input:not([type]), [type="text"], [type="url"] {
					width: 100%;
				}

				/*------------------------------------
					検索窓のエンジン
				*/
				.browser-search-engine {
					font: -moz-field;
				}
				.browser-search-engine > :not(:first-child):not(:last-child) {
					padding-left: 8px;
				}
				.browser-search-engine input {
					margin-left: -2px;
					background-color: transparent;
					border: none;
					text-overflow: ellipsis ellipsis;
				}

				/*------------------------------------
					行の背景色・枠線
				*/
				table {
					border-collapse: collapse;
					width: 100%;
				}
				thead th {
					-moz-appearance: treeheadercell;
					font-weight: normal;
				}
				th, td {
					padding: 3px;
				}
				tbody > tr {
					background: whitesmoke;
				}
				tbody > tr:nth-child(2n) {
					background: gainsboro;
				}
				thead {
					border-top: solid 1px gray;
					border-left: solid 1px gray;
					border-right: solid 1px gray;
				}
				tbody {
					border-left: solid 1px gray;
					border-bottom: solid 1px gray;
					border-right: solid 1px gray;
				}

				/*------------------------------------
					行の追加ボタン
				*/
				tfoot td {
					padding: 0;
				}
				[name="add-row"]::before {
					content: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAAtElEQVR42sXTvwuCQBjG8e7feAkaa2hUorEb+jF1DeJSqFBLiK1Bf/xTj8TLoQ6eIQ0fOE75cveiEwA/GT1gaGhAfKEB8yHTRQz6BkxwYGUdKCRgPGLdBaQB1R2Qpl1SgLqeacA/8my5xjza1GJ7RFJUxLXu8x09UTMQWYdDeq25rERevYhr3Y+8mXRdYe87358grhuk1xBP+QPUb4jtkLisAg3+DrbpDRQeaM9E/vIzqVEDb9gqPHy3H+TDAAAAAElFTkSuQmCC");
					margin-right: 0.5em;
					vertical-align: -4px;
				}
				[name="add-row"] {
					border-top: none;
					border-left: solid 1px gray;
					border-bottom: solid 1px gray;
					border-right: solid 1px gray;
					border-radius: 0 0 0.2em 0.2em;
					background: linear-gradient(lightgrey, silver);
					position: relative;
					top: -1px;
					left: -1px;
				}
				[name="add-row"]:not([disabled]):-moz-any(:hover, :focus, :active) {
					background: gainsboro;
				}

				/*------------------------------------
					キャンセル・OKボタン
				*/
				#submit-buttons {
					text-align: right;
				}
				#submit-buttons button {
					margin-left: 1em;
				}
				button:not([type]), button[type="submit"] {
					font-size: 2em;
				}

				/*------------------------------------
					その他の操作
				*/
				:not(td) > select {
					margin-left: 0.5em;
				}
				form > label {
					display: block;
				}

				/*------------------------------------
					キーボードショートカット
				*/
				#shortcut-keys ul {
					list-style: none;
					padding-left: 0;
				}
				#shortcut-keys :not(kbd) > kbd:last-of-type::after {
					margin-right: 1em;
					content: ":";
				}
				kbd kbd {
					font-size: 0.75em;
					border-radius: 0.5em;
					border-style: solid;
					border-width: 0.15em 0.3em 0.45em;
					border-color: rgba(0,0,0,0.2) rgba(0,0,0,0.1) rgba(255,255,255,0.2);
					background-origin: border-box;
					background: gainsboro;
					color: black;
					display: inline-flex;
					align-items: center;
					-moz-box-sizing: border-box;
					box-sizing: border-box;
					padding-left: 0.3em;
					width: 3em;
					height: 3em;
					margin-left: 0.2em;
					margin-right: 0.2em;
				}
				.control {
					width: 4em;
					color: transparent;
				}
				.control::before {
					content: "Ctrl";
					color: black;
				}
				.shift {
					width: 5em;
				}
				.shift::before {
					content: "⇧";
					margin-right: 0.2em;
				}
				.alt {
					color: darkcyan;
				}
				.enter {
					width: 4.5em;
					height: 5em;
				}
				.enter::after {
					content: "⏎";
				}

				td {
					height: 100%;	/* セル内で高さのパーセント指定が使えるように */
				}

				/*------------------------------------
					アイコン
				*/
				td > img {
					display: block;
					margin-left: auto;
					margin-right: auto;
				}
				[name="icon"] {
					width: 100%;
					height: 100%;
				}

				/*------------------------------------
					行の削除ボタン
				*/
				[name="delete"] {
					border: none;
					padding: 0;
					background: transparent;
					width: 100%;
					height: 100%;
					overflow: hidden;
					border-radius: 0.5em;
				}
				[name="delete"]:not([disabled]):-moz-any(:hover, :focus, :active) {
					box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3) inset,
						-1px 0 2px rgba(0, 0, 0, 0.3) inset,
						0 -1px 1px rgba(255, 255, 255, 0.3) inset;
				}
				[name="delete"]:not([disabled]):active {
					background-color: lightcoral;
				}
				tbody tr:only-of-type [name="delete"] {
					/* 行が一つだけなら、削除ボタンは表示しない */
					visibility: hidden;
				}
				/*------------------------------------
					Bug 895182 – [CSS Filters]
						Implement parsing for blur, brightness, contrast, grayscale, invert, opacity, saturate, sepia
					<https://bugzilla.mozilla.org/show_bug.cgi?id=895182>
				*/
				[name="delete"] img {
					background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAABDklEQVQoz3WRv0oDQRCHv93bk4NgaxFtzhQWwUbb9CkECznUIlZp8i6+gY2NVZCAjZUpgg9gYR2DcPoACYTg3e5Y7J4X/82P3WJm+O3sN0oUsH4ApD4GUN8E8iXAhLQO8uGCqBw0UZB3sFgs4CoHTURMvNZQhKfQoWzSQWPS7pOQtPuNSTrAEKHR1ZB6Nj5t3ncPBF67Rw/DMRqFQpQYDDEbJLR6J7fbkL3djJiy4oMCMdSRL+dbmyWLOXmdNAGM4A7PF52zJ8uws796vq45hPLeRZEdP17ewdKMst3y5cq3KIn8L2iR8k4O7NBkxpQSC0o8wb9AWQ8KBBdu+wO1gPGj4BDcr2VJ5QDy37o/ASA8darOg/vVAAAAAElFTkSuQmCC");
				}
				[name="delete"]:active img {
					background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAABBklEQVQoz32RP0sDQRDFf/vnIAQObAQJgkQhRcBvELAMWEoIWlilyRfwy9hYqySgYGeKYK0WkiKFHsKhYBkICmZvLXYuZw5xHrPFzPD28Z5CwUoD+KItoFYAfgnAylgLQmUCcgaNEQQGh8MBWc6gMUREvw6+5Su0rG3Sn48nPSpUJr35OOljMWh0LlLXRxe1/faDh632zW13hEah8AYdGPi8fG+u7TXWN4bTowGvuCDTUlRanX3ElnhGWgytGOPJ7g/j1vmjodt6+to9K3yQ9fQ46lzfnVxB1R50Xhbbp+FEYUTDDnXeSIFNaiQ8s8Cx9PAvo1wu0pPJ60pW+3JQ5bDk4N+4fwD4m2u8dB+ciAAAAABJRU5ErkJggg==");
				}

				/*------------------------------------
					行の移動
				*/
				.active-dropzone-above {
					border-top: solid 0.5em lightblue;
				}
				.active-dropzone-below {
					border-bottom: solid 0.5em lightblue;
				}

				/*------------------------------------
					POSTパラメータの開閉ボタン
				*/
				td > div {
					display: flex;
					align-items: flex-start;
				}
				[name="url"] {
					flex-grow: 1;
				}
				[name="params"] {
					display: none;
					white-space: nowrap;
					border: 1px solid lightblue;
					box-shadow: 0px -2px 0px rgba(204, 223, 243, 0.3) inset, 0px 0px 1px rgba(0, 0, 0, 0.1);
					border-radius: 5px;
					background: linear-gradient(ghostwhite, aliceblue)  ghostwhite;
					vertical-align: middle;
				}
				[name="params"]::after {
					content: "";
					display: inline-block;
					width: 20px;
					height: 20px;
					background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAADUCAYAAACcYQO5AAAEdElEQVR4nO2avWsbSRjGBQaDQWAwBAyuDAEXwa3BxQVlZwwGVy70F6g6N8YhiqUZCCoC7rawWM37QCAQcKPCYDA4JDj6mCGQ1lXAkMqVwGAwGAQBXeFdZbxaSZvzHtxx84MttDv7aD/ebR5+udx/BiI6JiL4vj+X9pwgCPJEBCI6TgosARgQ0Xel1Nq0MKXUGoDL8JxS4iIAZQADAH2llCwWizPxNcVicYaI3gD4Ga4tT/xnAAfhwgERfa3X68vRsXq9vkxE36LjAA6m3UkU2rBCb4moFG63VlgjVVh0WwCOrJPj21HS45hIrVabBXCaEHZaq9VmpwYQ0Uaj0Vix9/m+PwdAW2E6PlaNRmOFiDZHAgG0iegOwJ/2/iAI8kopCaAcDyOi3fCc9kig7/sLAC7CF3F2eHj4ZNzdKKWWiOgsvOoL3/cXxi6MhhVATym1nbBmG0AvXHOplFoa98e5XG44a1fW2CAIgnz4mb2z9l8FQfB0YlgEgFXrKgYAfoRb9PsawGqqMOvW1mKDPBz0NN/6uFAPQN8K7CulvL8VFgFgK7zSGyLaeFSYw+FwOBwOh8PhcDgc/3eY0MdMaKzvNVP3h4WdVp4JDSb0aH/IqqbEpRkwab57sju1U/Bkd40Lc8mlGbCqSe4PueiWuTQDLk3fE1rmis3RwqzYnGHV7hsu9E8uzYCL7uT+kEt9EIYOmDBfn7/qDPvD5686y0zob9FxLnW6/pAL0xiGSn3LqqbEqqbEpL4dhgmTvj/MFZszXOijX1cS24Q+Snwck3hWbM5yYU5Hw8zps2Jzen/IhNl48frLg/5wfa85x6XW1jPT8bF68frLCqvo0f6QC91mwtzxavdBf1jYaeU9oSUX3XI8jAm9y4S540K3RwLX9z4ucGkuwhdx9ke1O7Y/9OT5EpP6LLzyi/W9j8n9oSfPl6Jh5UL3PKlH+kNP6m0udC98npeePJ/cH97Pmrn6NYsahZ1WvrDTyjOp31kzelWotNL1h3y/szq8ivuX8eN+G77ta77f+b3+0JPdtQeDbA16mm89ObTS8bg0fSuw71U6j+sPuehuMalvuTA3TBjXHzocDofD4XA4HA6Hw/FPAGArdJR6jxZ4MlWMMpWgUmhavdSaVoJI9j4SyQB8sEUyW3ZMJAiCxZSq202kugVBsDjuNudtGW+SExfKeJ8iGQ/AfFJgm4juiGjX3h86iJUxuuDLsbogEW2OERrb1stox0MBrCYKjXFC5fIkQbk8SaVcxslUCs1UWwXw1gp7nFiLLNXfzOXkzPVph8PhcDgcDofD4XA4HOnhorvFpbnmQvceLfBkqhhlKkFN1bSE7qXWtEZFMvM+Esm41B9skcyWHRMplFuL6VQ3cxOpboVyK7k/5Puf520Zb5IT58nzJSb0p0jG4/ufR/vDSBdkQj/oD9f3mnO8aiqJumBVvxyrC7KK3kwUGoVuWy+jHQ/l+53VRKExTqhcniQolyeplMs4mUqhmWqrXOi3mYm1maq/mcvJmevT/1r+Ahtz/abguyZRAAAAAElFTkSuQmCC");
					vertical-align: middle;
				}
				[name="params"]:not([disabled]):-moz-any(:hover, :focus, :active)::after {
					background-position: 0 -64px;
				}

				/*------------------------------------
					データの種類
				*/
				[name="accept"] :not([value="text/plain"]) {
					display: none;
				}

				/*------------------------------------
					POSTメソッドが選択されているとき
				*/
				.post [name="url"] {
					width: auto;
				}
				.post [name="params"] {
					display: inline-block;
				}
				.post [name="accept"] option {
					display: block;
				}

				/*------------------------------------
					POSTパラメータ
				*/
				td table {
					display: none;
					border: 1px solid lightblue;
					border-collapse: separate;
					border-radius: 5px 0 5px 5px;
					background: linear-gradient(aliceblue, lavender)  aliceblue;
					margin-top: -2px;
				}
				td table tr {
					background: transparent !important;
				}
				td table td {
					padding-left: 0;
					padding-right: 0;
				}
				td table [name="add-row"] {
					background: linear-gradient(aliceblue, lavender);
					border: darkgray solid 1px;
					border-radius: 5px;
				}
				td table [name="add-row"]:not([disabled]):-moz-any(:hover, :focus, :active) {
					background: aliceblue;
				}

				/*------------------------------------
					POSTパラメータ展開時
				*/
				.displaying-post-params > * {
					vertical-align: top;
				}
				.displaying-post-params > td > [name="delete"] {
					height: 1.6em;
				}
				.displaying-post-params [name="params"] {
					border-bottom: none;
					border-bottom-left-radius: 0;
					border-bottom-right-radius: 0;
					box-shadow: none;
				}
				[name="params"]:not([disabled]):-moz-any(:hover, :focus, :active)::after {
					background-position: 0 -64px;
				}
				.displaying-post-params [name=params]::after {
					background-position: 0 -128px;
				}
				.displaying-post-params [name=params]:not([disabled]):-moz-any(:hover, :focus, :active)::after {
					background-position: 0 -192px;
				}
				.displaying-post-params table {
					display: table;
				}
			</style>
		`);

		// 文字符号化方式
		const {pinnedCharsets, otherCharsets} = CharsetMenu.getData();

		doc.body.insertAdjacentHTML('beforeend', h`
			<form>
				<table>
					<thead>
						<tr>
							<th></th>
							<th>${_('検索エンジン名')}</th>
							<th>${_('URL・POSTパラメータ')}</th>
							<th>${_('メソッド')}</th>
							<th>${_('データの種類')}</th>
							<th>${_('文字符号化方式')}</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<template>
							<tr contextmenu="row-contextmenu">
								<td draggable="true">
									<button type="menu" name="icon" title="${_('アイコンを変更')}" menu="icon-menu">
										<img src="${DropzoneUtils.DEFAULT_ICON}" alt="" width="16" height="16" />
									</button>
								</td>
								<th>
									<input name="name" />
								</th>
								<td>
									<div>
										<input name="url" type="url" />
										<button draggable="true" type="button" name="params">${_('POSTパラメータの設定')}</button>
									</div>
									<table>
										<tbody>
											<template>
												<tr>
													<td><input name="post-param-name" placeholder="${_('名前')}" /></td>
													<td><input name="post-param-value" placeholder="${_('値')}" /></td>
													<td>
														<button name="delete" type="button" title="${_('行を削除')}">
															<img alt="${_('行を削除')}" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAAxJREFUCNdjYCANAAAAMAABx6qFjgAAAABJRU5ErkJggg==" />
														</button>
													</td>
												</tr>
											</template>
										</tbody>
										<tfoot>
											<tr>
												<td colspan="3"><button name="add-row" type="button">${_('行を追加')}</button></td>
											</tr>
										</tfoot>
									</table>
								</td>
								<td draggable="true">
									<select name="method">
										<option value="GET">${_('GET')}</option>
										<option value="POST">${_('POST')}</option>
									</select>
								</td>
								<td draggable="true">
									<select name="accept">
										<option value="text/plain">${_('文字列')}</option>
										<option value="image/*">${_('画像')}</option>
										<option value="audio/*">${_('音声')}</option>
									</select>
								</td>
								<td draggable="true">
									<select name="encoding">`
										+ [...pinnedCharsets, ...otherCharsets].map(
											encoding => h`<option value="${encoding.value}">${encoding.label}</option>`
										).join('')
									+ `</select></td>
								<td draggable="true">
									<button name="delete" type="button" title="${_('行を削除')}">
										<img alt="${_('行を削除')}" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAAxJREFUCNdjYCANAAAAMAABx6qFjgAAAABJRU5ErkJggg==">
									</button>
								</td>
							</tr>
						</template>
					</tbody>
					<tfoot>
						<tr>
							<td colspan="3"><button name="add-row" type="button">${_('行を追加')}</button></td>
						</tr>
					</tfoot>
				</table>
				<menu id="icon-menu" type="context">
					<menuitem id="set-icon-from-local-file" label="${_('ローカルファイルからアイコンを設定')}"></menuitem>
					<menuitem id="set-icon-from-url" label="${_('Webページ、または画像ファイルのURLからアイコンを設定')}"></menuitem>
					<menuitem id="set-icon-from-clipboard" label="${_('クリップボードのURL、または画像データからアイコンを設定')}"></menuitem>
					<menuitem id="restore-default-icon" label="${_('元のアイコンに戻す')}"></menuitem>
				</menu>
				<menu id="row-contextmenu" type="context">
					<menuitem id="add-row-above" label="${_('上に新しい行を挿入')}"></menuitem>
					<menuitem id="add-row-below" label="${_('下に新しい行を挿入')}"></menuitem>
				</menu>

				<div id="submit-buttons">
					<button name="get-icons" type="button" title="${_('アイコン未取得の検索エンジンについて、URLを基にアイコンを取得します。アイコンボタンのポップアップメニューの「元のアイコンに戻す」から、個別に取得することもできます。')}">
						${_('アイコンを一括取得')}
					</button>
					<button name="cancel" type="button">${_('キャンセル')}</button>
					<button name="ok">${_('OK')}</button>
				</div>

				<div>
					${_('検索窓のエンジンの追加')}:
					<select name="add-browser-engine">
						<option>${_('選択してください')}</option>
					</select>
				</div>

				<label>
					${_('検索結果を開く場所')}:
					<select name="where">
						<option value="current">${_('現在のタブ。Ctrl、Shiftキーを押していれば、それぞれ新しいタブ、ウィンドウ')}</option>
						<option value="tab">${_('新しいタブ')}</option>
						<option value="window">${_('新しいウィンドウ')}</option>
					</select>
				</label>

				<label>
					<input name="automatically-reflect" type="checkbox" />
					${_('検索窓に新しい検索エンジンが追加されたとき、自動的にドロップゾーンとしても追加する。')}
				</label>
			</form>

			<section>
				<ul>
					<li>${_('行をドラッグ & ドロップで、順番を変更できます。')}</li>
					<li>${_('アイコンボタンのポップアップメニューから、アイコンを変更できます。検索窓のエンジンのアイコンは変更できません。')}</li>
				</ul>
			</section>

			<section id="shortcut-keys">
				<h1>${_('テキスト入力欄のキーボードショートカット')}</h1>
				<ul>
					<li>
						<kbd><kbd class="shift">Shift</kbd>+<kbd class="enter">Enter</kbd></kbd>
						${_('上に新しい行を挿入します。')}
					</li>
					<li>
						<kbd><kbd class="control">Control</kbd>+<kbd class="enter">Enter</kbd></kbd>
						${_('または')}
						<kbd><kbd class="alt">Alt</kbd>+<kbd class="enter">Enter</kbd></kbd>
						${_('下に新しい行を挿入します。')}
					</li>
					<li>
						<kbd><kbd class="control">Control</kbd>+<kbd>↑</kbd></kbd>
						${_('または')}
						<kbd><kbd class="alt">Alt</kbd>+<kbd>↑</kbd></kbd>
						${_('上の行に移動します。')}
					</li>
					<li>
						<kbd><kbd class="control">Control</kbd>+<kbd>↓</kbd></kbd>
						${_('または')}
						<kbd><kbd class="alt">Alt</kbd>+<kbd>↓</kbd></kbd>
						${_('下の行に移動します。')}
					</li>
				</ul>
			</section>

			<section>
				<h1>${_('インポートとエクスポート')}</h1>
				<dl>
					<dt><button name="export" type="button">${_('エクスポート')}</button></dt>
						<dd>${_('現在の設定をファイルへエクスポートします。保存していない設定は反映されません。')}</dd>
					<dt><button name="import" type="button">${_('インポート')}</button></dt>
						<dd>${_('現在の設定をすべて削除し、XMLファイルから設定をインポートします。ブラウザの検索エンジンサービスに同名の検索エンジンが存在する場合は、そちらを優先します。')}</dd>
					<dt><button name="additional-import" type="button">${_('追加インポート')}</button></dt>
						<dd>${_('XMLファイルから検索エンジンを追加します。同名の検索エンジンがすでに存在する場合は上書きします。')}</dd>
					<dt><button name="import-from-text" type="button">${_('JSON文字列から追加インポート')}</button></dt>
						<dd>${_('本スクリプトのバージョン1でエクスポートしたJSON文字列から、検索エンジンを追加します。')}</dd>
				</dl>
			</section>
		`);

		const form = doc.forms[0];

		// 文字符号化方式
		form.getElementsByTagName('template')[0]
			.content.querySelector(`[name="encoding"] [value="${CSS.escape(StringUtils.THE_ENCODING)}"]`)
				.defaultSelected = true;

		// 検索結果を開く場所
		form.where.value = Preferences.get(SettingsUtils.ROOT_BRANCH_NAME + 'where', 'tab');

		// 検索エンジンの自動追加
		form['automatically-reflect'].checked
			= Preferences.get(SettingsUtils.ROOT_BRANCH_NAME + 'automaticallyReflect', true);
	},
};



/**
 * アンインストール時に実行する処理。
 */
const UninstallObserver = {
	/**
	 * 通知の種類。
	 * @constant {string}
	 */
	TYPE: 'uninstall',

	/**
	 * スクリプトが停止していれば真。
	 * @type {booelan}
	 */
	uninstalled: false,

	/**
	 * オブザーバを登録。
	 */
	init: function () {
		ObserverUtils.register(this.TYPE, this);
	},

	/**
	 * オブザーバ。
	 */
	observe: function () {
		this.uninstalled = true;
		ObserverUtils.stop();
		document.getElementById(DragAndDropZonesPlus.ID + '-menuitem').remove();
		DropzoneUtils.remove();
		DropzoneUtils.removeEventListeners();
	},

	/**
	 * 通知。
	 */
	notify: function () {
		ObserverUtils.notify(this.TYPE);
	},
};



/**
 * ポップアップ通知を表示する。
 * @param {string} message - 表示するメッセージ。
 * @param {XULElement} tab - メッセージを表示するタブ。
 * @param {string} [type=information] - メッセージの前に表示するアイコンの種類。"information"、"warning"、"error"、"question" のいずれか。
 * @version 2016-06-09-drag-and-drop-zones-plus
 */
function showPopupNotification(message, tab, type = 'information') {
	const win = tab.ownerDocument.defaultView;
	if (win.closed) {
		// 指定されたタブを含むウィンドウが既に閉じていれば、別ウィンドウの最前面のタブを取得
		tab = Services.wm.getMostRecentWindow('navigator:browser').gBrowser.selectedTab;
	} else if (!tab.ownerDocument.contains(tab)) {
		// 指定されたタブが既に閉じていれば、最前面のタブを取得
		tab = win.gBrowser.selectedTab;
	}
	win.PopupNotifications.show(gBrowser.getBrowserForTab(tab), DragAndDropZonesPlus.ID, message, null, null, null, {
		persistWhileVisible: true,
		removeOnDismissal: true,
		popupIconURL: 'chrome://global/skin/icons/' + type + '-' + (type === 'information' ? '32' : '64') + '.png',
	});
}



DragAndDropZonesPlus.main();

})();

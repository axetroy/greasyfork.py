// ==UserScript==
// @name        UserCSSManager
// @description 【userChromeES】WebDAVディレクトリ直下の「css」フォルダ内のCSSファイルを読み込んで適用します。
// @namespace   https://greasyfork.org/users/137
// @version     0.2.2
// @include     background
// @include     popup
// @include     options
// @license     MPL-2.0
// @compatible  Firefox userChromeES用スクリプトです (※GreasemonkeyスクリプトでもuserChromeJS用スクリプトでもありません)。Firefox 52 ESRにおいて、userChromeESの設定でローカルフォルダのパスを直接指定している場合には動作しません。
// @author      100の人
// @homepage    https://greasyfork.org/users/137
// ==/UserScript==

(async function () {
'use strict';

/*eslint-disable */

/**
 * CSSdoc parser
 * This script can parse CSS sourcecode to a suitable CSSdoc object tree, which can be passed to a CSSdoc template.
 *
 * @author Christian Engel <hello@wearekiss.com>
 * @version 1 2012-02-23
 * @see [Paratron/CSSdoc: A approach to bring automatic documentation to CSS]{@link https://github.com/Paratron/CSSdoc}
 */
var CSSdoc = (function(){
    var element_regex = /((\/\*(!|=|-|demo)([\s\S]+?)\*\/)|(.+?){([\s\S]+?)})/mg;

    var parseCSS = function(source){
        var parts = source.match(element_regex),
            result = {
                title: 'CSSdoc',
                description: '',
                modules: {
                    'default': {
                        title: 'Default stylings',
                        description: 'This stylings aren\'t assigned to any module',
                        elements: []
                    }
                }
            },
            current_module = 'default',
            current_element = null,
            module_increment = 0;

        var i = 0,
            len = parts.length,
            block,
            lines,
            baseline,
            lastline,
            content,
            tags,
            obj,
            parseBody = function(lines){
                var returning = {
                    headline: lines.shift().replace(/^\s+|\s+$/g,""),
                    body: ''
                };
                var line,
                    i = 0,
                    len = lines.length;
                for(;i<len;i+=1){
                    line = lines[i].replace(/^\s+|\s+$/g,"");
                    if(!line) continue;
                    if(line.substr(0, 1) != '@'){
                        returning.body += line + '\n';
                    }
                }
                returning.body = returning.body.substr(0,returning.body.length - 1);
                return returning;
            };

        for(;i < len;i+=1){
            block = parts[i];
            lines = block.split('\n');
            baseline = lines.shift();
            lastline = lines.pop();

            switch(baseline.substr(0, 3)){
                case '/*!':
                    //Project
                    content = parseBody(lines);
                    result.title = content.headline;
                    result.description = content.body;
                break;
                case '/*=':
                    //Module
                    content = parseBody(lines);
                    current_module = module_increment;
                    module_increment++;
                    current_element = null;
                    var obj = {
                        title: content.headline,
                        description: content.body,
                        elements: []
                    }
                    result.modules[current_module] = obj;
                break;
                case '/*-':
                    //Element
                    content = parseBody(lines);
                    var obj = {
                        title: content.headline,
                        description: content.body,
                        content: []
                    };
                    result.modules[current_module].elements.push(obj);
                    current_element = result.modules[current_module].elements.length-1;
                break;
                case '/*d':
                    //Demo
                    var obj = {
                        type: 'demo',
                        source: lines.join('\n').replace(/^\s+|\s+$/g,"")
                    }
                    result.modules[current_module].elements[current_element].content.push(obj);
                break;
                default:
                    //Anything else.

                    //Dealing with CSS?
                    content = String(baseline+lines.join('\n')+lastline).replace(/^\s+|\s+$/g,"");
                    if(content.substr(-1, 1) == '}'){
                        //CSS!
                        var obj = {
                            type: 'css',
                            selector: content.match('^[^{]+')[0].replace(/^\s+|\s+$/g,""),
                            content: String(content.match(/\{([\s\S]+?)\}/mg)).replace(/{|}|\n/g, "").replace(/  +/g, ' ').replace(/^\s+|\s+$/g,"")
                        }
                        result.modules[current_module].elements[current_element].content.push(obj);
                    }
            }
        }

        return result;
    }

    return {
        parse: function(source){
            return parseCSS(source);
        },
        template: function(template, data){

        }
    }
})();

/*eslint-enable */



class XML
{
	/**
	 * The translation table from XML special chracters to chracter references.
	 * @access private
	 * @constant {Object.<string>}
	 */
	static get CHARACTER_REFERENCES_TRANSLATION_TABLE() {return {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&apos;',
	};}

	constructor()
	{
		new CSS();
	}

	/**
	 * Replaces XML special characters with character references.
	 * @see [html — HtmlSpecialChars equivalent in Javascript? — Stack Overflow]{@link https://stackoverflow.com/a/4835406}
	 * @param {string} str - A plain string.
	 * @returns {string} A HTML string.
	 */
	static escape(str)
	{
		return String(str).replace(
			/[&<>"']/g,
			specialCharcter => XML.CHARACTER_REFERENCES_TRANSLATION_TABLE[specialCharcter]
		);
	}

	/**
	 * You can use this method as the tag of a template literal to escape XML special characters in the expressions.
	 * @param {string[]} htmlTexts
	 * @param {...string} plainText
	 * @returns {string} A HTML string.
	 */
	static escapeTemplateStrings(htmlTexts, ...plainTexts)
	{
		return String.raw(htmlTexts, ...plainTexts.map(plainText => XML.escape(plainText)));
	}
}

/**
 * The shortened name of the {@link XML.escapeTemplateStrings} method or the {@link XML.escape} method.
 * @example
 * // returns "<code>&lt;a href=&quot;https://example.com/&quot;link text&lt;/a&gt;</code>"
 * h`<code>${'<a href="https://example.com/">link text</a>'}</code>`;
 * @example
 * // returns "&lt;a href=&quot;https://example.com/&quot;link text&lt;/a&gt;"
 * h('<a href="https://example.com/">link text</a>');
 * @param {(string[]|string)} htmlTexts
 * @param {...string} plainText
 * @returns {string} A HTML string.
 */
function h(...args)
{
	return Array.isArray(args[0]) ? XML.escapeTemplateStrings(...args) : XML.escape(args[0]);
}

/**
 * @version 2017-12-02
 */
class PermissionsManager
{
	/**
 	 * @param {browser.permissions.Permissions} permissions
 	 * @param {HTMLElement} parentElement
	 */
	constructor(permissions, parentElement)
	{
		this.permissions = permissions;
		this.insertOptions(parentElement);
	}

	async handleEvent()
	{
		try {
			if (await browser.permissions.request(this.permissions)) {
				close();
			}
		} catch (exception) {
			if (exception.message === 'An unexpected error occurred') {
				browser.tabs.create({url: document.href, active: true});
			} else {
				throw exception;
			}
		}
	}

	/**
	 * @access private
 	 * @param {HTMLElement} parentElement
	 * @returns {Promise.<void>}
	 */
	async insertOptions(parentElement)
	{
		parentElement.insertAdjacentHTML(
			'beforeend',
			'<button type="button" name="request-permissions">ブラウザへ必要な許可を要求</button>'
		);
		parentElement.querySelector('[name="request-permissions"]').addEventListener('click', this);
	}
}



/**
 * This API is designed like File and Directory Entries API.
 * @version 2017-11-30
 * @see [File and Directory Entries API]{@link https://wicg.github.io/entries-api/}
 * @see [File and Directory Entries API — Web APIs | MDN]{@link https://developer.mozilla.org/docs/Web/API/File_and_Directory_Entries_API}
 * @namespace
 */
const webdav = {};

webdav.FileSystemEntry = class {
	/**
	 * @access private
	 * @see [File API: Directories and System]{@link https://www.w3.org/TR/2012/WD-file-system-api-20120417/#the-metadata-interface}
	 * @param {Object} params
	 * @param {string} params.fullPath
	 * @param {?Metadata} params.metadata
	 */
	constructor({fullPath, metadata = null}) {
		/**
		 * @readonly
		 * @type {boolean}
		 */
		this.isFile = false;

		/**
		 * @readonly
		 * @type {boolean}
		 */
		this.isDirectory = false;

		/**
		 * @readonly
		 * @type {string}
		 */
		this.name = decodeURIComponent(/([^/]*)\/?$/.exec(fullPath)[1]);

		/**
		 * URL.
		 * @readonly
		 * @type {string}
		 */
		this.fullPath = fullPath;

		/**
		 * @private
		 * @type {string}
		 */
		this.metadata = metadata;
	}

	/**
	 * @see [File API: Directories and System]{@link https://www.w3.org/TR/2012/WD-file-system-api-20120417/#the-entry-interface}
	 * @param {MetadataCallback} successCallback
	 * @param {ErrorCallback} errorCallback
	 */
	getMetadata(successCallback, errorCallback = () => {})
	{
		if (this.metadata) {
			(typeof successCallback === 'function' ? successCallback : successCallback.handleEvent)(this.metadata);
		} else {
			(typeof errorCallback === 'function' ? errorCallback : errorCallback.handleEvent)(
				new DOMException('', 'NotSupportedError')
			);
		}
	}
};

webdav.FileSystemDirectoryEntry = class extends webdav.FileSystemEntry {
	/** @inheritdoc */
	constructor(...args) {
		super(...args);
		this.isDirectory = true;
	}

	/**
	 * @returns {webdav.FileSystemDirectoryReader}
	 */
	createReader()
	{
		return new webdav.FileSystemDirectoryReader({directoryEntry: this});
	}

	/**
	 * @see [FileSystemDirectoryEntry.getFile() — Web APIs | MDN]{@link https://developer.mozilla.org/docs/Web/API/FileSystemDirectoryEntry/getFile}
	 * @param {?string} path - URL.
	 * @param {FileSystemFlags} options
	 * @param {FileSystemEntryCallback} successCallback
	 * @param {ErrorCallback} errorCallback
	 */
	async getFile(
		path = '',
		{create = false, exclusive = false} = {},
		successCallback = () => {},
		errorCallback = () => {}
	) {
		let typeError;
		try {
			new URL(path);
		} catch (exception) {
			if (exception instanceof TypeError) {
				typeError = exception;
			} else {
				throw exception;
			}
		}

		if (typeError || !/^https?:\/\/[^?#]+[^/?#]$/.test(path)) {
			(typeof errorCallback === 'function' ? errorCallback : errorCallback.handleEvent)(
				new DOMException(typeError || '', 'TypeMismatchError')
			);
			return;
		}

		const client = new XMLHttpRequest();
		client.open('PROPFIND', path);
		client.setRequestHeader('content-type', 'application/xml; charset=UTF-8');
		client.setRequestHeader('depth', '0');
		client.responseType = 'document';
		client.addEventListener(
			'error',
			() => (typeof errorCallback === 'function' ? errorCallback : errorCallback.handleEvent)(
				new DOMException('', 'NotFoundError')
			)
		);
		client.addEventListener('load', async event => {
			let entry, err;

			if (event.target.status === 207) {
				if (create && exclusive) {
					err = new DOMException('', 'PathExistsError');
				} else if (!event.target.response.getElementsByTagNameNS('DAV:', 'collection')[0]) {
					entry = new webdav.FileSystemFileEntry({fullPath: event.target.responseURL, metadata: {
						modificationTime: new Date(
							event.target.response.getElementsByTagNameNS('DAV:', 'getlastmodified')[0].textContent
						),
						size: Number.parseInt(
							event.target.response.getElementsByTagNameNS('DAV:', 'getcontentlength')[0].textContent
						),
					}});
				} else {
					err = new DOMException('', 'TypeMismatchError');
				}
			} else if (event.target.status === 404 && create) {
				entry = new webdav.FileSystemFileEntry({fullPath: event.target.responseURL, metadata: {
					modificationTime: new Date(
						event.target.response.getElementsByTagNameNS('DAV:', 'getlastmodified')[0].textContent
					),
					size: Number.parseInt(
						event.target.response.getElementsByTagNameNS('DAV:', 'getcontentlength')[0].textContent
					),
				}});
			} else {
				err = new DOMException(`${event.target.status} ${event.target.statusText}`, 'NotFoundError');
			}

			if (entry) {
				(typeof successCallback === 'function' ? successCallback : successCallback.handleEvent)(entry);
			} else {
				(typeof errorCallback === 'function' ? errorCallback : errorCallback.handleEvent)(err);
			}
		});
		client.send(`<?xml version="1.0" encoding="UTF-8"?>
			<propfind xmlns="DAV:">
				<prop>
					<resourcetype />
					<getlastmodified />
					<getcontentlength />
				</prop>
			</propfind>`);
	}

	/**
	 * @param {?string} path - URL.
	 * @param {FileSystemFlags} options
	 * @param {FileSystemEntryCallback} successCallback
	 * @param {ErrorCallback} errorCallback
	 */
	async getDirectory(
		path = '',
		{create = false, exclusive = false} = {},
		successCallback = () => {},
		errorCallback = () => {}
	) {
		let typeError;
		try {
			new URL(path);
		} catch (exception) {
			if (exception instanceof TypeError) {
				typeError = exception;
			} else {
				throw exception;
			}
		}

		if (typeError || !/^https?:\/\/[^?#]+\/$/.test(path)) {
			(typeof errorCallback === 'function' ? errorCallback : errorCallback.handleEvent)(
				new DOMException(typeError || '', 'TypeMismatchError')
			);
			return;
		}

		const client = new XMLHttpRequest();
		client.open('PROPFIND', path);
		client.setRequestHeader('content-type', 'application/xml; charset=UTF-8');
		client.setRequestHeader('depth', '0');
		client.responseType = 'document';
		client.addEventListener(
			'error',
			() => (typeof errorCallback === 'function' ? errorCallback : errorCallback.handleEvent)(
				new DOMException('', 'NotFoundError')
			)
		);
		client.addEventListener('load', async event => {
			let entry, err;

			if (event.target.status === 207) {
				if (create && exclusive) {
					err = new DOMException('', 'PathExistsError');
				} else if (event.target.response.getElementsByTagNameNS('DAV:', 'collection')[0]) {
					entry = new webdav.FileSystemDirectoryEntry({fullPath: event.target.responseURL, metadata: {
						modificationTime: new Date(
							event.target.response.getElementsByTagNameNS('DAV:', 'getlastmodified')[0].textContent
						),
						size: 0,
					}});
				} else {
					err = new DOMException('', 'TypeMismatchError');
				}
			} else if (event.target.status === 404 && create) {
				try {
					const response = await fetch(path, {method: 'MKCOL'});
					if (response.ok) {
						entry = new webdav.FileSystemDirectoryEntry({fullPath: response.url, metadata: {
							modificationTime: new Date(
								event.target.response.getElementsByTagNameNS('DAV:', 'getlastmodified')[0].textContent
							),
							size: 0,
						}});
					} else {
						err = new DOMException(
							`${response.status} ${response.statusText}`,
							'NoModificationAllowedError'
						);
					}
				} catch (exception) {
					if (exception instanceof TypeError) {
						err = new DOMException(exception.message, 'NetworkError');
					} else {
						throw exception;
					}
				}
			} else {
				err = new DOMException(`${event.target.status} ${event.target.statusText}`, 'NotFoundError');
			}

			if (entry) {
				(typeof successCallback === 'function' ? successCallback : successCallback.handleEvent)(entry);
			} else {
				(typeof errorCallback === 'function' ? errorCallback : errorCallback.handleEvent)(err);
			}
		});
		client.send(`<?xml version="1.0" encoding="UTF-8"?>
			<propfind xmlns="DAV:">
				<prop>
					<resourcetype />
					<getlastmodified />
					<getcontentlength />
				</prop>
			</propfind>`);
	}
};

webdav.FileSystemDirectoryReader = class {
	/**
	 * @access private
	 * @param {Object} params
	 * @param {webdav.FileSystemDirectoryEntry} params.directoryEntry
	 */
	constructor({directoryEntry}) {
		/**
		 * @access private
		 * @type {webdav.FileSystemDirectoryEntry}
		 */
		this.directoryEntry = directoryEntry;

		/**
		 * @access private
		 * @type {boolean}
		 */
		this.readingFlag = false;

		/**
		 * @access private
		 * @type {boolean}
		 */
		this.doneFlag = false;

		/**
		 * @access private
		 * @type {?DOMException}
		 */
		this.readerError = null;
	}

	/**
	 * @param {FileSystemEntriesCallback} successCallback
	 * @param {ErrorCallback} errorCallback
	 */
	async readEntries(successCallback, errorCallback = () => {})
	{
		if (this.readingFlag) {
			(typeof errorCallback === 'function' ? errorCallback : errorCallback.handleEvent)(
				new DOMException('', 'InvalidStateError')
			);
		} else if (this.readerError) {
			(typeof errorCallback === 'function' ? errorCallback : errorCallback.handleEvent)(this.readerError);
		} else if (this.doneFlag) {
			(typeof successCallback === 'function' ? successCallback : successCallback.handleEvent)([]);
		} else {
			this.readingFlag = true;

			const client = new XMLHttpRequest();
			client.open('PROPFIND', this.directoryEntry.fullPath);
			client.setRequestHeader('content-type', 'application/xml; charset=UTF-8');
			client.setRequestHeader('depth', '1');
			client.responseType = 'document';
			client.addEventListener('error', () => {
				this.readerError = new DOMException('', 'NetworkError');
				this.readingFlag = false;
				(typeof errorCallback === 'function' ? errorCallback : errorCallback.handleEvent)(this.readerError);
			});
			client.addEventListener('load', event => {
				if (event.target.status === 207) {
					const responses = event.target.response.getElementsByTagNameNS('DAV:', 'response');

					const entries = [];
					for (let i = 1, l = responses.length; i < l; i++) {
						const url = responses[i].getElementsByTagNameNS('DAV:', 'href')[0].textContent;
						const isDirectory = responses[i].getElementsByTagNameNS('DAV:', 'collection')[0];
						entries.push(new webdav[isDirectory ? 'FileSystemDirectoryEntry' : 'FileSystemFileEntry']({
							fullPath: new URL(url, this.directoryEntry.fullPath).href,
							metadata: {
								modificationTime: new Date(
									responses[i].getElementsByTagNameNS('DAV:', 'getlastmodified')[0].textContent
								),
								size: isDirectory ? 0 : Number.parseInt(
									responses[i].getElementsByTagNameNS('DAV:', 'getcontentlength')[0].textContent
								),
							},
						}));
					}

					this.doneFlag = true;
					this.readingFlag = false;
					(typeof successCallback === 'function' ? successCallback : successCallback.handleEvent)(entries);
				} else {
					this.readingFlag = false;
					this.readerError = new DOMException(`${event.target.status} ${event.target.statusText}`);
					(typeof errorCallback === 'function' ? errorCallback : errorCallback.handleEvent)(this.readerError);
				}
			});
			client.send(`<?xml version="1.0" encoding="UTF-8"?>
				<propfind xmlns="DAV:">
					<prop>
						<resourcetype />
						<getlastmodified />
						<getcontentlength />
					</prop>
				</propfind>`);
		}
	}
};

webdav.FileSystemFileEntry = class extends webdav.FileSystemEntry {
	/** @inheritdoc */
	constructor(...args) {
		super(...args);
		this.isFile = true;
	}

	/**
	 * @see [File API: Directories and System]{@link https://www.w3.org/TR/2012/WD-file-system-api-20120417/#widl-FileEntry-createWriter-void-FileWriterCallback-successCallback-ErrorCallback-errorCallback}
	 * @returns {webdav.FileWriter}
	 */
	createWriter()
	{
		return new webdav.FileWriter({fileEntry: this});
	}

	/**
	 * @param {FileCallback} successCallback
	 * @param {ErrorCallback} errorCallback
	 */
	async file(successCallback, errorCallback = () => {})
	{
		const response = await fetch(this.fullPath);
		if (response.ok) {
			response.blob().then(typeof successCallback === 'function' ? successCallback : successCallback.handleEvent);
		} else {
			(typeof errorCallback === 'function' ? errorCallback : errorCallback.handleEvent)(
				new DOMException(
					`${response.status} ${response.statusText}`,
					response.status === 404 ? 'NotFoundError' : 'TypeMismatchError'
				)
			);
		}
	}
};

/**
 * @see [File API: Writer]{@link https://www.w3.org/TR/2012/WD-file-writer-api-20120417/#the-filewriter-interface}
 */
webdav.FileWriter = class {
	/**
	 * @private
	 * @param {Object} params
	 * @param {webdav.FileSystemFileEntry} params.fileEntry
	 */
	constructor({fileEntry}) {
		/**
		 * @access private
		 * @type {webdav.FileSystemFileEntry}
		 */
		this.fileEntry = fileEntry;
	}

	/**
	 * @param {Blob} data
	 */
	async write(data)
	{
		const response = await fetch(this.fileEntry.fullPath, {method: 'PUT', body: data});
		if (response.ok) {
			if (this.onwrite) {
				this.onwrite(new ProgressEvent('write'));
			}
		} else {
			this.error = new DOMException(`${response.status} ${response.statusText}`);
			if (this.onerror) {
				this.onerror(new ProgressEvent('error'));
			}
		}
	}
};

/**
 * @type {webdav.FileSystemDirectoryEntry}
 */
webdav.root = new webdav.FileSystemDirectoryEntry({fullPath: ''});



/**
 * @typedef {Object} CSSParser~URLMatchFn
 * @property {string} name - “url”, “url-prefix”, “domain”, or “regexp”.
 * @property {string} value
 * @property {string} pattern - RegExp pattern.
 */

class CSSParser
{
	/**
	 * @param {string} code
	 * @returns {CSSStyleSheet}
	 */
	static parseSheet(code)
	{
		const style = document.createElement('style');
		style.textContent = code;
		document.head.append(style);
		const sheet = style.sheet;
		style.remove();
		return sheet;
	}

	/**
	 * @see [CSS Conditional Rules Module Level 3]{@link https://www.w3.org/TR/2012/WD-css3-conditional-20120911/#at-document}
	 * @see [Regex for quoted string with escaping quotes — Stack Overflow]{@link https://stackoverflow.com/a/249937}
	 * @param {string} conditionText - {@link CSSConditionRule#conditionText}
	 * @returns {CSSParser~URLMatchFn[]}
	 */
	static parseURLMatchFns(conditionText)
	{
		const urlMatchFns = [];

		const urlMatchFnPattern = /^(?:(url|url-prefix|domain|regexp)\((?:"((?:[^"\\]|\\.)+)"|'((?:[^'\\]|\\.)+)')|(url)\(((?:[^)\\]|\\.)+))\)(, )?/gu;

		for (let result; result = urlMatchFnPattern.exec(conditionText);) {
			const urlMatchFn = {
				name: result[1] || result[4],
				value: this.parseStringToken(result[2] || result[3] || result[5]),
			};
			if (urlMatchFns.every(({name, value}) => name !== urlMatchFn.name || value !== urlMatchFn.value)) {
				urlMatchFn.pattern = this.convertURLMatchFnToRegExpPattern(urlMatchFn);
				if (urlMatchFn.pattern) {
					urlMatchFns.push(urlMatchFn);
				}
				if (result[6]) {
					break;
				}
			}
		}

		return urlMatchFns;
	}

	/**
	 * @access private
	 * @param {Object} urlMatchFnWithoutPattern
	 * @param {string} urlMatchFnWithoutPattern.name
	 * @param {string} urlMatchFnWithoutPattern.value
	 * @returns {string} nameが「regexp」で不正な正規表現パターンだった場合は空文字列。
	 */
	static convertURLMatchFnToRegExpPattern({name, value})
	{
		switch (name) {
			case 'url':
				return `^${this.regExpEscape(value)}$/`;

			case 'url-prefix':
				return `^${this.regExpEscape(value)}/`;

			case 'domain':
				return `^[-+.a-z]+://(?:[^:/]+\\.)*${this.regExpEscape(value)}(:[0-9]+)?/`;

			case 'regexp': {
				const pattern = `^(?:${value})$`;
				try {
					new RegExp(pattern, 'u');
				} catch (exception) {
					if (exception instanceof SyntaxError) {
						return '';
					} else {
						throw exception;
					}
				}
				return pattern;
			}
		}
	}

	/**
	 * @access private
	 * @see [JavaScript の正規表現のメタ文字をエスケープ — 冬通りに消え行く制服ガールは✖夢物語にリアルを求めない。 — subtech]{@link https://subtech.g.hatena.ne.jp/cho45/20090513/1242199703}
	 * @param {string} str
	 * @returns {string}
	 */
	static regExpEscape(str)
	{
		return Array.from(str).map(char => `\\u{${char.codePointAt().toString(16).padStart(4, '0')}}`).join('');
	}

	/**
	 * @access private
	 * @see [CSS Syntax Module Level 3]{@link https://www.w3.org/TR/css-syntax/#consume-a-string-token}
	 * @param {string} stream
	 * @returns {string}
	 */
	static parseStringToken(stream)
	{
		return stream.replace(/\\(?:([0-9A-Fa-f]{1,6})\s?|([^0-9A-Fa-f]))/gu, function (match, hexDigits, codePoint) {
			if (hexDigits) {
				const number = Number.parseInt(hexDigits, 16);
				codePoint = number === 0 || number >= 0xD800 && number <= 0xDFFF || number > 0x10FFFF
					? '�'
					: String.fromCodePoint(number);
			}
			return codePoint;
		});
	}
}

class UserCSS
{
	/**
	 * @see [CSSOM Constants [CSS Working Group Wiki]]{@link https://wiki.csswg.org/spec/cssom-constants#cssruletype-enumeration}
	 * @access private
	 * @constant {string}
	 */
	static get DOCUMENT_RULE() {return 13;}

	/**
	 * @access private
	 * @constant {string}
	 */
	static get CSSDOC_DEFAULT_PROJECT_TITLE() {return 'CSSdoc';}

	/**
	 * @param {Object} params
	 * @param {wevdav.FileSystemFileEntry} params.entry
	 * @param {number} params.lastModified
	 */
	constructor({entry, lastModified})
	{
		/**
		 * @type {string}
		 */
		this.url = entry.fullPath;

		/**
		 * @type {string}
		 */
		this.fileName = entry.name;

		/**
		 * @type {number}
		 */
		this.lastModified = lastModified;

		let onFulfilled;

		/**
		 * プロパティ設定完了時に成功します。
		 * {@link browser.runtime.onMessage.addListener}で発生する警告
		 * 「Sending message that cannot be cloned. Are you trying to send an XPCOM object?」を避けるため、完了後は`null` になります。
		 * @type {?Promise.<void>}
		 */
		this.fulfilled = new Promise(resolve => onFulfilled = resolve);

		this.fetch(entry).then(code => {
			/**
			 * @type {string}
			 */
			this.code = code;

			/**
			 * @type {Object}
			 * @property {string} title
			 */
			this.metadata = this.getMetadata(this.code);

			/**
			 * 適用先。すべてのURLに適用されるなら空の配列、どのURLにも適用されないなら `null`。
			 * @type {?(CSSParser~URLMatchFn[])}
			 */
			this.urlMatchFns = this.parseURLMatchFns(this.code);

			/**
			 * 適用先のURLパターン。すべてのURLに適用されるなら空の配列、どのURLにも適用されないなら `null`。
			 * @type {?(string[])}
			 */
			this.appliedURLPatterns = this.unionRegExpPatterns(this.urlMatchFns);

			this.fulfilled = null;
			onFulfilled();
		});
	}

	/**
	 * @access private
	 * @param {wevdav.FileSystemFileEntry} entry
	 * @returns {string}
	 */
	async fetch(entry)
	{
		return new Response(await new Promise((resolve, reject) => entry.file(resolve, reject))).text();
	}

	/**
	 * CSSdocのProjectタイプのブロックからtitleを取得します。
	 * @see [Paratron/CSSdoc: A approach to bring automatic documentation to CSS]{@link https://github.com/Paratron/CSSdoc#the-project}
	 * @access private
	 * @param {string} code
	 * @returns {Object.<string>}
	 */
	getMetadata(code)
	{
		const metadata = {
			title: '',
		};

		const projectDocBlock = /\/\*![\s\S]+?\*\//u.exec(this.code);
		if (projectDocBlock) {
			let result;
			try {
				result = CSSdoc.parse(projectDocBlock[0]);
			} catch (exception) {}
			if (result && result.title !== UserCSS.CSSDOC_DEFAULT_PROJECT_TITLE) {
				metadata.title = result.title;
			}
		}

		return metadata;
	}

	/**
	 * 適用先を取得します。
	 * @access private
	 * @param {string} code
	 * @returns {?(CSSParser~URLMatchFn[])}
	 */
	parseURLMatchFns(code)
	{
		const urlMatchFns = [];

		const parentRules = Array.from(CSSParser.parseSheet(code).cssRules);
		while (parentRules.length > 0) {
			const parentRule = parentRules.shift();
			switch (parentRule.type) {
				case CSSRule.IMPORT_RULE :
					// @import at‐規則
					parentRules.push(...parentRule.styleSheets.cssRules);
					break;

				case CSSRule.MEDIA_RULE:
				case CSSRule.SUPPORTS_RULE:
					// @media at‐規則
					// @supports at‐規則
					parentRules.push(...parentRule.cssRules);
					break;

				case CSSRule.NAMESPACE_RULE:
					// @namespace at‐規則
					break;

				case UserCSS.DOCUMENT_RULE:
					// @document at‐規則
					urlMatchFns.push(
						...CSSParser.parseURLMatchFns(parentRule.conditionText).filter(({newName, newValue}) =>
							urlMatchFns.every(({name, value}) => name !== newName || value !== newValue))
					);
					break;

				default:
					// スタイル規則
					// @font-face at‐規則
					// @page at‐規則
					// @keyframes at‐規則
					// @counter-style at‐規則
					// @font-feature-values at‐規則
					// @viewport at‐規則
					return [];
			}
		}

		return urlMatchFns.length > 0 ? urlMatchFns : null;
	}

	/**
	 * 適用先の正規表現パターンをできるだけ結合して返します。
	 * @access private
	 * @param {?(CSSParser~URLMatchFn[])} urlMatchFns
	 * @returns {?(string[])}
	 */
	unionRegExpPatterns(urlMatchFns)
	{
		if (!urlMatchFns) {
			return null;
		} else if (urlMatchFns.length === 0) {
			return [];
		}

		const patterns = [], patternsMaybeIncludeCapturingParentheses = [];

		for (const urlMatchFn of urlMatchFns) {
			if (urlMatchFns.name === 'regexp' && this.maybeIncludeCapturingParentheses(urlMatchFns.value)) {
				patternsMaybeIncludeCapturingParentheses.push(urlMatchFn.pattern);
			} else {
				patterns.push(urlMatchFn.pattern);
			}
		}

		if (patternsMaybeIncludeCapturingParentheses.length > 0) {
			patterns.push(patternsMaybeIncludeCapturingParentheses.shift());
		}

		return [patterns.join('|'), ...patternsMaybeIncludeCapturingParentheses];
	}

	/**
	 * 指定された正規表現パターン文字列が、キャプチャリング括弧を含んでいる可能性があれば `true` を返します。
	 * @param {[type]} pattern
	 * @returns {[type]}
	 */
	maybeIncludeCapturingParentheses(pattern)
	{
		return /(?:^|[^\\])(\\\\)*\([^?]/u.test(pattern);
	}
}

class UserCSSsLoader
{
	/**
	 * @constant {string}
	 */
	static get DIRECTORY_NAME() {return 'css';}

	constructor()
	{
		/**
		 * @type {UserCSS[]}
		 */
		this.csss = [];

		/**
		 * @type {?webdav.FileSystemDirectoryEntry}
		 */
		this.directory = null;

		this.resetFulfilled();
	}

	/**
	 * @returns {Promise.<void>} ディレクトリ内のCSSのURLが取得できた時点で成功します。
	 */
	async fetchCSSs()
	{
		this.directory = await this.fetchDirectoryEntry();
		if (!this.directory) {
			return false;
		}

		for (const entry of await this.fetchCSSFileEntries({directory: this.directory})) {
			this.csss.push(await this.convertToUserCSS({entry}));
		}

		Promise.all(this.csss.map(css => css.fulfilled)).then(this.onFulfilled);
	}

	/**
	 * ディレクトリ内の情報を取得し、更新があれば{@link UserCSSsLoader#csss}に反映します。
	 * @returns {Promise.<boolean>} 変更があれば `true`。ディレクトリが存在しない場合は `false`。ディレクトリ内のCSSのURLが取得できた時点で成功します。
	 */
	async refetch()
	{
		await this.fulfilled;
		this.resetFulfilled();

		if (!this.directory) {
			this.directory = await this.fetchDirectoryEntry();
			if (!this.directory) {
				return false;
			}
		}

		let modified = false;

		const deletedCSSs = Array.from(this.csss);
		const csss = [];
		for (const entry of await this.fetchCSSFileEntries({directory: this.directory})) {
			const index = deletedCSSs.findIndex(css => css.fileName === entry.name);
			if (index >= 0) {
				const [previousCSS] = deletedCSSs.splice(index, 1);
				if (await this.getLastModified({entry}) === previousCSS.lastModified) {
					csss.push(previousCSS);
				} else {
					modified = true;
					csss.push(await this.convertToUserCSS({entry}));
				}
			} else {
				modified = true;
				csss.push(await this.convertToUserCSS({entry}));
			}
		}
		if (deletedCSSs.length > 0) {
			modified = true;
		}
		this.csss = csss;

		this.onFulfilled();
		return modified;
	}

	/**
	 * @private
	 */
	resetFulfilled()
	{
		/**
		 * すべての{@link UserCSS}のプロパティ設定完了時に成功します。
		 * @type {Promise.<void>}
		 */
		this.fulfilled = new Promise((resolve, reject) => {
			this.onFulfilled = resolve;
			this.onRejected = reject;
		});
	}

	/**
	 * @private
	 * @returns {Promise.<?webdav.FileSystemDirectoryEntry>}
	 */
	fetchDirectoryEntry()
	{
		return new Promise(async (resolve, reject) => webdav.root.getDirectory(
			(await browser.storage.local.get('user-chrome-es'))['user-chrome-es'].directory
				+ UserCSSsLoader.DIRECTORY_NAME + '/',
			{},
			resolve,
			reject
		)).catch(exception => {
			if (exception.name === 'NotFoundError') {
				this.onFulfilled();
				return null;
			}
			this.onRejected(exception);
			return Promise.reject(exception);
		});
	}

	/**
	 * @private
	 * @param {Object} params
	 * @param {webdav.FileSystemDirectoryEntry} params.directory
	 * @returns {Promise.<webdav.FileSystemEntry[]>}
	 */
	async fetchCSSFileEntries({directory})
	{
		return (await new Promise((resolve, reject) => directory.createReader().readEntries(resolve, reject)))
			.filter(entry => entry.isFile && entry.name.endsWith('.css'));
	}

	/**
	 * @private
	 * @param {Object} params
	 * @param {wevdav.FileSystemFileEntry} params.entry
	 * @returns {Promise.<UserCSS>}
	 */
	async convertToUserCSS({entry})
	{
		return new UserCSS({entry, lastModified: await this.getLastModified({entry})});
	}

	/**
	 * @private
	 * @param {Object} params
	 * @param {wevdav.FileSystemFileEntry} params.entry
	 * @returns {number}
	 */
	async getLastModified({entry})
	{
		return (await new Promise((resolve, reject) => entry.getMetadata(resolve, reject))).modificationTime.getTime();
	}
}

class UserCSSManagerSettingsManager
{
	/**
	 * 必要な権限。
	 * @constant {browser.permissions.Permissions}
	 */
	static get PERMISSIONS() {return {origins: ['<all_urls>'], permissions: ['tabs', 'webNavigation']};}

	constructor()
	{
		document.head.insertAdjacentHTML('beforeend', `<style>
			#user-css-manager {
				max-width: 25em;
			}

			#user-css-manager.disabled legend::after {
				content: " (無効)";
			}

			#user-css-manager.disabled,
			#user-css-manager fieldset[disabled],
			#user-css-manager fieldset[disabled] a,
			#user-css-manager [name="enable-css"]:not(:checked) ~ *,
			#user-css-manager [name="enable-css"]:not(:checked) ~ * a,
			#user-css-manager .active-csss p,
			#user-css-manager .inactive-csss,
			#user-css-manager .inactive-csss a {
				color: gray;
			}

			#user-css-manager ol {
				list-style: none;
				padding-left: unset;
			}

			#user-css-manager ol > li {
				display: flex;
				align-items: flex-start;
			}

			#user-css-manager ol > li details {
				margin-left: 0.5em;
			}

			#user-css-manager [type="checkbox"] {
				/* Firefox 52 ESR */
				display: inline;
			}

			#user-css-manager ol > li details a {
				color: #0000EE;
			}

			#user-css-manager ol figure {
				margin: unset;
			}

			#user-css-manager ol figure ul {
				padding-left: unset;
			}

			#user-css-manager p {
				margin: unset;
			}

			#user-css-manager [name="refetch-interval"] {
				width: 3em;
			}

			#user-css-manager small {
				color: gray;
			}
		</style>`);

		document.body.insertAdjacentHTML('beforeend', `<article id="user-css-manager">
			<fieldset disabled="">
				<legend><label title="UserCSSManger自体の有効・無効の切り替え">
					<input type="checkbox" name="enable" disabled="" />
					UserCSSManager
				</label></legend>
				<button type="button" name="refetch">フォルダの更新を確認</button>
				<p><label>
					<input type="number" name="refetch-interval" min="0" value="0" required="" />
					秒ごとにフォルダの更新を確認
				</label></p>
				<p><small>※<code>0</code>で無効</small></p>
			</fieldset>
		</article>`);

		(browser.permissions
			? browser.permissions.contains(UserCSSManagerSettingsManager.PERMISSIONS)
			: Promise.resolve(true) /* Firefox 52 ESR */).then(async permitted => {
			const section = document.getElementById('user-css-manager');
			const fieldset = section.getElementsByTagName('fieldset')[0];

			if (permitted) {
				fieldset.querySelector('[name="refetch"]').addEventListener('click', this);
				fieldset.addEventListener('change', this);
				const enableCheckbox = fieldset.querySelector('[name="enable"]');
				enableCheckbox.addEventListener('change', this);

				const settings = await UserCSSManagerSettingsManager.get();
				fieldset.querySelector('[name="refetch-interval"]').valueAsNumber = settings.refetchIntervalSeconds;
				await this.showCSSLists({settings});

				if ((await UserCSSManagerSettingsManager.get()).enabled) {
					enableCheckbox.checked = true;
					fieldset.disabled = false;
				} else {
					section.classList.add('disabled');
				}
				enableCheckbox.disabled = false;
			} else {
				section.insertAdjacentHTML(
					'beforeend',
					'<button type="button" name="request-permissions">ブラウザへ必要な許可を要求</button>'
				);
				section.lastElementChild.addEventListener('click', this);
			}
		});
	}

	/**
	 * @param {*} keys
	 * @returns {Promise}
	 */
	static async set(keys)
	{
		const settings = Object.assign(await this.get(), keys);
		await browser.storage.local.set({'user-css-manager': settings});
		return settings;
	}

	/**
	 * @returns {Promise}
	 */
	static async get()
	{
		return Object.assign({
			enabled: true,
			refetchIntervalSeconds: 0,
			disabledCSSs: [],
		}, (await browser.storage.local.get('user-css-manager'))['user-css-manager']);
	}

	/**
	 * @param {Event} event
	 */
	async handleEvent(event)
	{
		if (event.target.name === 'refetch-interval') {
			if (event.target.reportValidity()) {
				browser.runtime.sendMessage({'user-css-manager-change-refetch-interval': event.target.valueAsNumber});
			}
			return;
		}

		const section = document.getElementById('user-css-manager');
		const fieldset = section.getElementsByTagName('fieldset')[0];
		fieldset.disabled = true;
		const enableCheckbox = fieldset.querySelector('[name="enable"]');
		enableCheckbox.disabled = true;

		switch (event.target.name) {
			case 'enable':
				if (event.target.checked) {
					await browser.runtime.sendMessage('user-css-manager-enable');
					section.classList.remove('disabled');
					await this.showCSSLists();
				} else {
					await browser.runtime.sendMessage('user-css-manager-disable');
					section.classList.add('disabled');
					enableCheckbox.disabled = false;
					return;
				}
				break;

			case 'refetch':
				await browser.runtime.sendMessage('user-css-manager-refetch');
				await this.showCSSLists();
				break;

			case 'enable-css':
				await browser.runtime.sendMessage(
					{[`user-css-manager-${event.target.checked ? 'enable' : 'disable'}-css`]: event.target.value}
				);
				break;

			case 'request-permissions':
				browser.tabs.create({url: '/options/options.xhtml#user-css-manager', active: true});
				close();
				return;
		}

		enableCheckbox.disabled = false;
		fieldset.disabled = false;
	}

	/**
	 * @access private
 	 * @param {Object} params
 	 * @param {UserCSS[]} params.csss
  	 * @param {?Object.<(boolean|number|string[])>} params.settings
	 * @returns {Promise.<void>}
	 */
	async showCSSLists({settings = null} = {})
	{
		const [csss, {disabledCSSs}] = await Promise.all([
			browser.runtime.sendMessage('user-css-manager-get-csss'),
			settings || UserCSSManagerSettingsManager.get(),
		]);

		const activeTab = (await browser.tabs.query({currentWindow: true, active: true}))[0];

		const frames = UserCSSManager.CSS_INSERTABLE_URL_PATTERN.test(activeTab.url)
			? (await browser.webNavigation.getAllFrames({tabId: activeTab.id})
				.catch(exception => UserCSSManager.suppressUnpreventableException(exception, {url: activeTab.url}))
				|| [])
			: [];
		const urls = Array.from(new Set(frames.map(frame => frame.url)));

		let html = '';

		const inactiveCSSs = [];

		if (frames.length > 0) {
			const activeCSSs = [];

			for (const css of csss) {
				if (css.appliedURLPatterns
					&& (css.appliedURLPatterns.length === 0 || css.appliedURLPatterns.some(pattern => {
						const regexp = new RegExp(pattern, 'u');
						return urls.some(url => regexp.test(url));
					}))) {
					activeCSSs.push(css);
				} else {
					inactiveCSSs.push(css);
				}
			}

			html = activeCSSs.length > 0
				? this.createCSSListHTML({csss: activeCSSs, disabledCSSs, className: 'active-csss'})
				: '<ol class="active-csss"><li><p>このページに適用されているユーザーCSSはありません。</p></li></ol>';
		} else {
			html = '<ol class="active-csss"><li><p>このページにはユーザーCSSを適用できません。</p></li></ol>';
			inactiveCSSs.push(...csss);
		}

		if (inactiveCSSs.length > 0) {
			html += '<hr />' + this.createCSSListHTML({csss: inactiveCSSs, disabledCSSs, className: 'inactive-csss'});
		}

		const section = document.getElementById('user-css-manager');
		for (const previousLists of section.querySelectorAll('.active-csss, .active-csss + hr, .inactive-csss')) {
			previousLists.remove();
		}
		section.querySelector('[name="refetch"]').insertAdjacentHTML('afterend', html);
	}

	/**
	 * @param {Object} params
	 * @param {UserCSS[]} params.csss
 	 * @param {string[]} params.disabledCSSs
 	 * @param {string} params.className
	 * @returns {string}
	 */
	createCSSListHTML({csss, disabledCSSs, className})
	{
		return h`<ol class="${className}">` + csss.map(({url, fileName, metadata, urlMatchFns}) => h`<li>
			<input type="checkbox" name="enable-css" value="${fileName}"
				` + (disabledCSSs.includes(fileName) ? '' : 'checked=""') + h` />
			<details>
				<summary>
					<a href="${url}" target="_blank">${metadata.title || fileName}</a>
				</summary>
				<figure>
					<figcaption>適用先</figcaption>
					<ul>` + (!urlMatchFns /*eslint-disable indent */
						? '<li>なし</li>'
						: (urlMatchFns.length === 0 ? '<li>すべてのURL</li>' : urlMatchFns.map(({name, value}) => {
							let item;
							switch (name) {
								case 'url':
								case 'domain':
									item = value;
									break;
								case 'url-prefix':
									item = value + '*';
									break;
								case 'regexp':
									item = `/^(?:${value})$/u`;
									break;
							}
							return h`<li>${item}</li>`;
						}).join('')))/*eslint-enable indent */ + `</ul>
				</figure>
			</details>
		</li>`).join('') + '</ol>';
	}
}

class UserCSSManager
{
	/**
	 * @constant {string}
	 */
	static get ID() {return 'user-css-manager';}

	constructor()
	{
		this.insertToFrame = this.insertToFrame.bind(this);

		browser.runtime.onMessage.addListener(this.handleMessage.bind(this));

		/**
		 * フレームに挿入するCSS。
		 * @type {string}
		 */
		this.code = '';

		/**
		 * @access private
		 * @type {UserCSSsLoader}
		 */
		this.loader = new UserCSSsLoader();

		this.loader.fetchCSSs().then(() => this.enable());
	}

	/**
	 * 予期不能な例外であれば成功します。
	 * @param {Error} exception
	 * @param {Object} params
	 * @param {number} params.frameId
	 * @param {string} params.url
	 * @returns {Promise.<void>}
	 */
	static async suppressUnpreventableException(exception, {frameId = 0, url})
	{
		if (exception instanceof Error) {
			switch (exception.message) {
				case 'No matching message handler':
					// about:neterrorにWebExtension APIからアクセスしようとしたとき
					return;

				case 'Frame not found, or missing host permission':
					if (frameId !== 0) {
						// 読み込まれていないフレームなら
						return;
					}
					break;

				case 'Missing host permission for the tab':
					// hostパーミッションで許可されていないURLにWebExtension APIからアクセスしようとしたとき
					if (['addons.mozilla.org', 'discovery.addons.mozilla.org', 'testpilot.firefox.com']
						.includes(new URL(url).host)) {
						// `privacy.resistFingerprinting.block_mozAddonManager` が `true` でない限り、hostパーミッションで許可できないホストなら
						return;
					}
					break;

				case 'Missing host permission for the tab, and any iframes':
					// hostパーミッションで許可されていないURLにWebExtension APIからアクセスしようとしたとき、または待機タブにWebExtension APIからアクセスしようとしたとき
					return;

				case 'No window matching {"all_frames":true,"matchesHost":["<all_urls>"]}':
					if ((await browser.runtime.getBrowserInfo()).version.split('.')[0] < 57) {
						// Firefox 57.0.1 より前のバージョンで、待機タブ、または <about:blank> にWebExtension APIからアクセスしようとしたとき
						return;
					}
					break;
			}
		}

		console.error(exception.toString(), frameId, url);
		//return Promise.reject(exception);
	}

	/**
	 * @param {*} message
	 * @param {browser.runtime.MessageSender} sender
	 * @returns {(Promise.<(UserCSS[]|void)>|void)}
	 */
	handleMessage(message, sender, sendResponse)
	{
		if (sender.url === browser.runtime.getURL('/popup/popup.xhtml')) {
			switch (message) {
				case 'user-css-manager-get-csss':
					return Promise.resolve(this.loader.fulfilled)
						.then(() => this.loader.csss);

				case 'user-css-manager-enable':
					return this.loader.refetch()
						.then(() => this.enable({force: true}));

				case 'user-css-manager-disable':
					return this.disable();

				case 'user-css-manager-refetch':
					return this.refetch();

				default:
					if (typeof message === 'object' && message !== null) {
						if ('user-css-manager-enable-css' in message) {
							return this.enableCSS({fileName: message['user-css-manager-enable-css']});
						} else if ('user-css-manager-disable-css' in message) {
							return this.disableCSS({fileName: message['user-css-manager-disable-css']});
						} else if ('user-css-manager-change-refetch-interval' in message) {
							this.setAutoRefetch(
								{intervalSeconds: message['user-css-manager-change-refetch-interval'], force: true}
							);
							return Promise.resolve();
						}
					}
			}
		}
	}

	/**
	 * ユーザーCSSの設定を、指定したフレームに適用します。
	 * @param {Object} frame
	 * @param {number} frame.tabId
	 * @param {number} frame.frameId
	 * @param {string} frame.url
	 */
	async insertToFrame({tabId, frameId, url})
	{
		if (frameId === 0 || UserCSSManager.CSS_INSERTABLE_URL_PATTERN.test((await browser.tabs.get(tabId)).url)) {
			browser.tabs
				.insertCSS(tabId, {code: this.code, frameId/*, matchAboutBlank: true // Firefox 57.0.1 の不具合を回避 */, runAt: 'document_start'})
				.catch(exception => UserCSSManager.suppressUnpreventableException(exception, {url, frameId}));
		}
	}

	/**
	 * ユーザーCSSの更新を監視します。
	 * @param {Object} params
	 */
	async autoRefetch()
	{
		/**
		 * @access private
		 * @type {boolean}
		 */
		this.fetching = true;

		await this.refetch();
		await this.loader.fulfilled;

		if (this.intervalMilliseconds > 0) {
			/**
			 * @access private
			 * @type {number}
			 */
			this.refetchTimer = setTimeout(() => this.autoRefetch(), this.intervalMilliseconds);
		}

		this.fetching = false;
	}

	/**
	 * ユーザーCSSの自動更新を設定、または間隔を変更します。
	 * @access private
	 * @param {Object} params
	 * @param {?number} params.intervalSeconds
	 * @param {boolean} params.force - ユーザー設定値を上書きするなら `true`。
	 */
	async setAutoRefetch({intervalSeconds = null, force = false} = {})
	{
		if (force) {
			await UserCSSManagerSettingsManager.set({refetchIntervalSeconds: intervalSeconds});
		} else if (intervalSeconds === null) {
			intervalSeconds = (await UserCSSManagerSettingsManager.get()).refetchIntervalSeconds;
		}

		/**
		 * @access private
		 * @type {number}
		 */
		this.intervalMilliseconds = intervalSeconds * 1000;

		clearTimeout(this.refetchTimer);

		if (this.intervalMilliseconds > 0 && !this.fetching) {
			this.autoRefetch();
		}
	}

	/**
	 * ユーザーCSSが更新されていれば再適用します。
	 * @access private
	 * @returns {Promise.<void>}
	 */
	async refetch()
	{
		if (await this.loader.refetch()) {
			const previousCode = this.code;
			this.code = this.createCode(
				{csss: this.loader.csss, disabledCSSs: (await UserCSSManagerSettingsManager.get()).disabledCSSs}
			);
			await this.apply({code: this.code, previousCode});
		}
	}

	/**
	 * CSSを指定したタブに適用します。
	 * @access private
	 * @param {Object} params
	 * @param {browser.tabs.Tab} tab
	 * @param {string} code
	 * @returns {Promise.<void>}
	 */
	insertToTab({tab, code})
	{
		return browser.tabs.insertCSS(tab.id, {allFrames: true, code/*, matchAboutBlank: true // Firefox 57.0.1 の不具合を回避 */, runAt: 'document_start'})
			.catch(exception => UserCSSManager.suppressUnpreventableException(exception, {url: tab.url}));
	}

	/**
	 * CSSを指定したタブから取り除きます。
	 * @access private
	 * @param {Object} params
	 * @param {browser.tabs.Tab} tab
	 * @param {string} code
	 * @returns {Promise.<void>}
	 */
	async removeFromTab({tab, code})
	{
		return browser.tabs.removeCSS(tab.id, {allFrames: true, code/*, matchAboutBlank: true // Firefox 57.0.1 の不具合を回避 */})
			.catch(exception => UserCSSManager.suppressUnpreventableException(exception, {url: tab.url}));
	}

	/**
	 * 指定されたCSSを、全ウィンドウの全タブに適用します。
	 * @access private
	 * @param {Object} params
	 * @param {string} params.code
	 * @param {string} params.previousCode - 取り除くCSS。
	 * @returns {Promise.<void>}
	 */
	async apply({code, previousCode = ''})
	{
		const tabs = await this.getAllTabs();

		const promises = tabs.map(tab => this.insertToTab({tab, code}).then(() => {
			if (previousCode) {
				return this.removeFromTab({tab, code: previousCode});
			}
		}));

		return Promise.all(promises);
	}

	/**
	 * 指定されたCSSを、全ウィンドウの全タブから取り除きます。
	 * @access private
	 * @param {Object} params
	 * @param {string} params.code
	 */
	async detach({code})
	{
		return Promise.all((await this.getAllTabs()).map(tab => this.removeFromTab({tab, code})));
	}

	/**
	 * 全ウィンドウの{@link browser.tabs.insertCSS}を実行可能な全タブを取得します。
	 * @access private
	 * @returns {Promise.<browser.tabs.Tab[]>} 前面タブが最初に来るよう並び替えれた配列。
	 */
	async getAllTabs()
	{
		return (await browser.tabs.query({}))
			.filter(tab => !tab.discarded && UserCSSManager.CSS_INSERTABLE_URL_PATTERN.test(tab.url))
			.sort((a, b) => b.active - a.active);
	}

	/**
	 * ユーザーCSSを有効にします。
	 * @access private
	 * @param {Object} params
	 * @param {boolean} params.force - ユーザー設定値を上書きするなら `true`。
	 * @returns {Promise.<void>}
	 */
	async enable({force = false} = {})
	{
		const settings
			= await (force ? UserCSSManagerSettingsManager.set({enabled: true}) : UserCSSManagerSettingsManager.get());

		this.code = this.createCode({csss: this.loader.csss, disabledCSSs: settings.disabledCSSs});
		if (settings.enabled) {
			if (this.code) {
				this.apply({code: this.code});
				browser.webNavigation.onCommitted.addListener(
					this.insertToFrame,
					{url: [{urlMatches: UserCSSManager.CSS_INSERTABLE_URL_PATTERN.source}]}
				);
				await this.loader.fulfilled;
			}
			this.setAutoRefetch({intervalSeconds: settings.refetchIntervalSeconds});
		}
	}

	/**
	 * ユーザーCSSを無効にします。
	 * @access private
	 * @returns {Promise.<void>}
	 */
	async disable()
	{
		browser.webNavigation.onCommitted.removeListener(this.insertToFrame);
		this.setAutoRefetch({intervalSeconds: 0});
		this.detach({code: this.code});
		await UserCSSManagerSettingsManager.set({enabled: false});
	}

	/**
	 * フレームに挿入するCSSを作成します。
	 * @access private
	 * @param {Object} params
	 * @param {UserCSS[]} params.csss
	 * @param {string[]} params.disabledCSSs
	 * @returns {string}
	 */
	createCode({csss, disabledCSSs})
	{
		return csss.filter(css => !disabledCSSs.includes(css.fileName))
			.map(css => `@import url("${CSS.escape(css.url) + '?' + css.lastModified}");`).join('');
	}

	/**
	 * 特定のユーザーCSSを有効にします。
	 * @access private
	 * @param {Object} params
	 * @param {string} params.fileName
	 * @returns {Promise.<void>}
	 */
	async enableCSS({fileName})
	{
		const settings = await UserCSSManagerSettingsManager.get();
		settings.disabledCSSs.splice(settings.disabledCSSs.indexOf(fileName), 1);
		await UserCSSManagerSettingsManager.set(settings);

		const previousCode = this.code;
		this.code = this.createCode({csss: this.loader.csss, disabledCSSs: settings.disabledCSSs});
		await this.apply({code: this.code, previousCode});
	}

	/**
	 * 特定のユーザーCSSを無効にします。
	 * @access private
	 * @param {Object} params
	 * @param {string} params.fileName
	 * @returns {Promise.<void>}
	 */
	async disableCSS({fileName})
	{
		const settings = await UserCSSManagerSettingsManager.get();
		settings.disabledCSSs.push(fileName);
		await UserCSSManagerSettingsManager.set(settings);

		const previousCode = this.code;
		this.code = this.createCode({csss: this.loader.csss, disabledCSSs: settings.disabledCSSs});
		await this.apply({code: this.code, previousCode});
	}
}

/**
 * {@link browser.tabs.insertCSS}を実行可能なURLに一致する正規表現。
 * @constant {RegExp}
 */
//UserCSSManager.CSS_INSERTABLE_URL_PATTERN = /^(?:(?:http|https|file|ftp):\/\/|about:blank(?:[?#]|$))/u;
UserCSSManager.CSS_INSERTABLE_URL_PATTERN = /^(?:http|https|file|ftp):\/\//u; // Firefox 57.0.1 の不具合を回避

switch (location.pathname) {
	case '/background/background.xhtml':
		new UserCSSManager();
		break;

	case '/popup/popup.xhtml':
		new UserCSSManagerSettingsManager();
		break;

	case '/options/options.xhtml':
		if (location.hash === '#user-css-manager') {
			document.head.insertAdjacentHTML('beforeend', `<style>
				#user-css-manager {
					background: lemonchiffon;
				}
			</style>`);
			document.body.insertAdjacentHTML('beforeend', `<article id="user-css-manager">
				<h1>UserCSSManager</h1>
			</article>`);
			new PermissionsManager(
				UserCSSManagerSettingsManager.PERMISSIONS,
				document.getElementById('user-css-manager')
			);
		}
		break;
}

})();

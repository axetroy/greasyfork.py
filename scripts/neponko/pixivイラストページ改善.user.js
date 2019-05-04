// ==UserScript==
// @name        pixivイラストページ改善
// @description pixivイラストページのタグに作者マーカーと百科事典アイコン、ユーザー名の列に作品タグを復活させます
// @namespace   Aime
// @match       https://www.pixiv.net/*
// @version     1.2.1
// @grant       none
// @run-at      document-end
// @noframes
// @note        2018/06/22 1.0.1 作者アイコンを大サイズに差し替え
// @note        2018/07/18 1.0.2 pixiv側のclass変更に対応
// @note        2018/07/26 1.0.3 アイコン差し替えを修正
// @note        2018/09/23 1.1.0 新プロフィールページのサムネイルをトリミングなしに差し替え。作品タグをapiから取得
// @note        2018/10/03 1.1.1 サムネイル差し替え修正
// @note        2018/12/28 1.1.2 アイコン差し替え修正
// @note        2019/01/16 1.1.3 アイコン差し替え修正等
// @note        2019/01/16 1.1.4 タグクラウドの広告ブロックフィルタ誤爆対策
// @note        2019/02/20 1.1.5 article→main
// @note        2019/04/23 1.2.0 いろいろ修正
// ==/UserScript==
// jshint esversion:6
(function() {
"use strict";
const pixivService = {
	PixpediaIcon			: 1,		// 百科事典アイコンを付けるか？ (0:付けない, 1:付ける, 2:記事の有無でアイコンを変える)
	UseTagCloud				: true,		// 作品タグを表示するか？
	UseLargeIcon			: true,		// 作者アイコンを大きくする
	NonTrimThumbnail		: true,		// サムネイルをトリミングなしにする

	tagCloudDisplayCount	: 30,		// 作品タグの表示数(目安)
	tagCloudSortByName		: true,		// 作品タグのソート順 (true:名前順, false:多い順)

	_illustTagCache			: {},
	_existsPixpedia			: {},
	_currentAuthorId		: -1,
	_tagCloud				: null,

	_authorProcessed		: false,

	run() {
		const root = document.getElementById("root");
		if (!root) return;

		const style = $C("style");
		style.textContent = this._style;
		document.querySelector("head").appendChild(style);

		root.addEventListener("click", this, true);

		new PixivPageChangeListener((type, elem) => {
			switch (type) {
			case "illust":
				this.tagMarking();
				if (!this._authorProcessed) this.onAutherChange();
				break;
			case "base":
				this._authorProcessed = false;
				break;
			}
		}, { illust: true }).listen();


		const options = {
			childList		: false,
			subtree			: true,
			attributes		: true,
			attributeFilter	: [ "href" ]
		};
		if (this.NonTrimThumbnail) {
			options.childList = true;
		}

		new MutationObserver(records => {
			let thumbs = [], iconChange = false;

			records.forEach(record => {
				if (record.type === "attributes") {
					const target = record.target;
					switch (record.attributeName) {
					case "href":
						if (target.href.includes("/member.php?id=") && target.firstElementChild && target.firstElementChild.getAttribute("role") === "img") {
							for (let e = target; (e = e.parentElement); ) {
								if (e.nodeName === "ASIDE") {
									iconChange = true;
									break;
								}
							}
						}
						break;
					}
				} else {
					record.addedNodes.forEach(node => {
						if (node.nodeName === "IMG" && node.src.includes("_square1200.jpg")) {
							thumbs.push(node);
						}
					});

				}
			});

			if (thumbs.length) this.replaceThumbnail(thumbs);
			if (iconChange) this.onAutherChange();
		}).observe(root, options);
	},

	handleEvent(event) {
		switch (event.type) {
			case "mouseover":
				event.stopPropagation();
				break;
			case "click":
				if (event.target.classList.contains("gm-profile-work-list-tag-filter-click")) {
					this.openTagPage(event);
				}
				break;
			default:
				console.log(event);
				break;
		}
	},

	openTagPage(event) {
		const url = location.href;
		for (let p of [
			{ re: /member_illust\.php\?id=(\d+)/,	url: "https://www.pixiv.net/member_tag_all.php?id=" },
			{ re: /novel\/member\.php\?id=(\d+)/,	url: "https://www.pixiv.net/novel/member_tag_all.php?id=" },
		]) {
			const match = p.re.exec(url);
			if (match) {
				event.stopPropagation();
				event.preventDefault();
				location.href = p.url + match[1];
				return;
			}
		}
	},

	getIllustId() {
		const m = /illust_id=(\d+)/.exec(location.href);
		return m? parseInt(m[1], 10): null;
	},
	getAuthorId() {
		const a = document.querySelector("main + aside h2 a");
		if (!a) return null;
		const m = /\/member\.php\?id=(\d+)/.exec(a.href);
		return m? parseInt(m[1], 10): null;		
	},

	async tagMarking() {
		const illustId = this.getIllustId();
		if (!illustId) return;

		const displayedTags = document.body.querySelectorAll("figcaption footer > ul a.gtm-new-work-tag-event-click");
		if (displayedTags.length === 0) return;

		if (!(illustId in this._illustTagCache)) {
			try {
				this._illustTagCache[illustId] = await fetchJSON("https://www.pixiv.net/ajax/tags/illust/" + illustId);
			} catch (e) {
				console.error(e);
			}
		}

		let tagData = this._illustTagCache[illustId];
		if (!tagData) tagData = { authorId: 0, tags: [] };
		const authorId = tagData.authorId;

		for (let node of displayedTags) {
			const cls = node.parentElement.classList;
			const tag = node.textContent.trim();
			const find = tagData.tags.find(t => t.tag == tag);
			if (find && find.userId == authorId) {
				cls.add("author-tag-marker");
			} else {
				cls.remove("author-tag-marker");
			}

			this.appendPixpediaIcon(node);
		}
	},

	async appendPixpediaIcon(node) {
		if (!this.PixpediaIcon || node.hasAttribute("pixpedia")) return;

		node.setAttribute("pixpedia", true);
		node.addEventListener("mouseover", this, true);
		const eTag = encodeURIComponent(node.textContent.trim());
		let cls = "pixpedia-icon";

		if (this.PixpediaIcon === 2) {
			try {
				if (!(eTag in this._existsPixpedia)) {
					this._existsPixpedia[eTag] = !!await fetchJSON("https://www.pixiv.net/ajax/tag/" + eTag + "/info");
				}
				if (!this._existsPixpedia[eTag]) cls += " pixpedia-icon-no-item";
			} catch (e) {
				console.error(e);
			}
		}

		$C("a", {
			class	: cls,
			href	: "https://dic.pixiv.net/a/" + eTag
		}, node.parentElement);
	},

	onAutherChange() {
		this._authorProcessed = true;
		if (this.UseLargeIcon) this.largeAuthorIcon();
		if (this.UseTagCloud) this.appendTagCloud();
	},

	async appendTagCloud() {
		const aside = document.querySelector("main + aside");
		if (!aside) return;

		const authorId = this.getAuthorId();
		if (!authorId) return;

		const tagAllUrl = "https://www.pixiv.net/member_tag_all.php?id=" + authorId;

		if (this._currentAuthorId !== authorId) {
			this._currentAuthorId = authorId;
			try {
				let tags = await fetchJSON("https://www.pixiv.net/ajax/user/" + authorId + "/illustmanga/tags");
				tags.sort(this.compareTagByCount);	// 多い順にソート

				const dispCnt = this.tagCloudDisplayCount;
				if (tags.length > dispCnt) {
					// とりあえず目安位置以下の値を破棄
					const lastCnt = tags[dispCnt - 1].cnt;
					tags = tags.filter(v => v.cnt >= lastCnt);
					const tags2 = tags.filter(v => v.cnt > lastCnt);
					// 目安位置と同数とそれより多いのがどちらが目安位置に近いか
					if (dispCnt - tags2.length < tags.length - dispCnt && tags2.length > 5) {
						tags = tags2;
					}
				}

				if (tags.length) {
					let lv = 1,
						cur = tags[0].cnt;
					tags.forEach(tag => {
						// レベル付け
						if (lv < 6 && cur !== tag.cnt) {
							cur = tag.cnt;
							lv++;
						}

						// <li class="level1"><a href="/member_illust.php?id=${authorId}&amp;tag=${tag.tag}">${tag.tag}<span class="cnt">(${tag.cnt})</span></a></li>
						tag.dom = $C("li", { class: "level" + lv, "data-cnt": tag.cnt, "data-tag": tag.tag });
						const a = $C("a", { href: "/member_illust.php?id=" + authorId + "&tag=" + encodeURIComponent(tag.tag) }, tag.dom);
						a.textContent = tag.tag;
						const span = $C("span", { class: "cnt" }, a);
						span.textContent = "(" + tag.cnt + ")";
					});
				}

				if (this.tagCloudSortByName) {
					tags.sort(this.compareTagByName);
				}

				const tagCloud = $C("ul", { class: "tagCloud" });
				tags.forEach(tag => tagCloud.appendChild(tag.dom));
				this._tagCloud = tagCloud;

			} catch (e) {
				console.error(e);
				this._tagCloud = null;
			}
		}

		let container = document.getElementById("author-tags");
		if (container) {
			container.parentElement.removeChild(container);
		}
		if (this._tagCloud) {
			container = $C("nav", {
				id:		"author-tags",
				class:	"sc-",
			});

			const header = $C("div", { class: "tags-header" }, container);
			header.innerHTML = `<h2><a href="${tagAllUrl}">作品タグ</a></h2>`;

			const sortBtn = $C("button", { class: "sort-button" }, header);
			sortBtn.textContent = "▼";
			sortBtn.addEventListener("click", event => {
				const tags = document.querySelector("#author-tags .tagCloud");
				if (tags) {
					const byName = this.tagCloudSortByName = !this.tagCloudSortByName;
					Array.from(tags.querySelectorAll("li"))
					.map(v => { return { dom: v, cnt: v.dataset.cnt, tag: v.dataset.tag }; })
					.sort(byName? this.compareTagByName: this.compareTagByCount)
					.forEach(v => tags.appendChild(v.dom));
				}
			});

			container.appendChild(this._tagCloud);

			/* 前後の作品の次に挿入 */
			let next = aside.querySelector("main + aside > section > nav");
			if (next) {
				next = next.parentElement;
				if (next) next = next.nextSibling;
			}
			aside.insertBefore(container, next);
		}
	},
	compareTagByCount(a, b) {
		const r = b.cnt - a.cnt;
		return r? r: pixivService.compareTagByName(a, b);
	},
	compareTagByName(a, b) {
		return a.tag.localeCompare(b.tag, {}, { numeric: true });
	},

	largeAuthorIcon() {
		const icon = document.querySelector("main + aside > section > h2 [role=img] > img");
		if (icon) {
			const img = icon.src.replace("_50.", "_170.").replace("_s.", ".");
			if (icon.src !== img) {
				icon.src = img;
			}
			let p = icon.parentElement;
			while (p && p.nodeName !== "A") {
				p = p.parentElement;
			}
			if (p) {
				p.parentElement.classList.add("icon170");
			}
		}
	},

	replaceThumbnail(elems) {
		elems.forEach(elem => {
			let img = elem.src;
			let img_r = img.replace(/(?:250x250_80_a2|360x360_70)(.+)_square1200/, "240x240$1_master1200");
			if (img_r.includes("_master1200.jpg") /* /240x240.+_master1200/.test(img_r) */) {
				elem.classList.add("non-trim-thumb");
				if (img !== img_r) {
					elem.src = img_r;
				}
			}
		});
	},


	_style: `
/* 百科事典 */
.pixpedia-icon {
	display: inline-block;
	margin-left: 2px;
	width: 15px;
	height: 14px;
	vertical-align: -2px;
	text-decoration: none;
	background: url(https://s.pximg.net/www/images/inline/pixpedia.png) no-repeat;
}
.pixpedia-icon-no-item {
	background: url(https://s.pximg.net/www/images/inline/pixpedia-no-item.png) no-repeat;
}
.pixpedia-icon::before {
	display: none;
}

/* 作者タグ */
.author-tag-marker::before {
	content: "＊" !important;
	color: #E66;
}
/* "#"を消す */
figcaption footer > ul > li a.gtm-new-work-tag-event-click::before {
	display: none !important;
}

/* tag cloud */
#author-tags {
	padding: 8px;
	background-color: #FFF;
	border-radius: 8px;
}
#author-tags .tags-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 8px;
}
#author-tags h2 {
	color: #333;
	font-size: 14px;
	margin: 0;
}
#author-tags h2 a {
	color: inherit;
	text-decoration: none;
}
#author-tags .sort-button {
	padding: 0;
	font-size: 14px;
	background: none;
	border: none;
	color: inherit;
	cursor: pointer;
}
.tagCloud {
	font-size: 12px;
	line-height: 1.6;
	padding: 0;
	margin: 0;
	word-break: break-all;
}
.tagCloud li {
	display: inline;
	font-size: 12px;
	padding: 0px 2px;
	margin: 0px;
}
.tagCloud li a {
	color: inherit;
	text-decoration: none;
}
.tagCloud li.level1 {
	font-size: 20px;
	font-weight: bold;
}
.tagCloud li.level1 a {
	color: #3E5B71;
}
.tagCloud li.level2 {
	font-size: 18px;
	font-weight: bold;
}
.tagCloud li.level2 a {
	color: #3E5B71;
}
.tagCloud li.level3 {
	font-size: 17px;
	font-weight: bold;
}
.tagCloud li.level3 a {
	color: #587C97;
}
.tagCloud li.level4 {
	font-size: 16px;
	font-weight: bold;
}
.tagCloud li.level4 a {
	color: #587C97;
}
.tagCloud li.level5 {
	font-size: 14px;
	font-weight: bold;
}
.tagCloud li.level5 a {
	color: #587C97;
}
.tagCloud li.level6 a {
	color: #5E9ECE;
}
.tagCloud li a:hover {
	background-color: #3E5B71;
	color: #FFF;
}
.tagCloud li .cnt {
	font-size: 11px;
	font-weight: normal;
	color: #999999;
}

/* 作者アイコンを大きく */
main + aside section {
	margin-top: 0;
}
.icon170 {
	display: block !important;
	text-align: center !important;
	margin-left: auto !important;
	margin-right: auto !important;
}
.icon170 [role=img] {
	width: 170px !important;
	height: 170px !important;
	margin: 0 auto 4px !important;
	border-radius: 4px !important;
	background-position: center !important;
	background-repeat: no-repeat !important;
	background-size: contain !important;
}

/* トリミングなしサムネイル */
.non-trim-thumb {
	background-size: contain;
	object-fit: contain !important;
}
`
};

function fetchSameOrigin(url) {
	return fetch(url, { mode: "same-origin", credentials: "same-origin" });
}

async function fetchJSON(url) {
	const response = await fetchSameOrigin(url);
	const data = await response.json();
	if (data.error) throw new Error(url + " : " + data.message);
	return data.body;
}

function $C(tag, attrs, parent, before) {
	const e = document.createElement(tag);
	if (attrs) Object.entries(attrs).forEach(([key, value]) => e.setAttribute(key, value));
	if (parent) parent.insertBefore(e, before);
	return e;
}

class delayTimer {
	constructor(callback, delaytime) {
		this._timer = null;
		this._callback = callback;
		this._delaytime = delaytime;
	}
	start(delaytime) {
		this.stop();
		if (delaytime === void 0)
			delaytime = this._delaytime;
		this._timer = setTimeout(this._callback, delaytime);
	}
	stop() {
		if (this._timer) {
			clearTimeout(this._timer);
			this._timer = null;
		}
	}
}

class PixivPageChangeListener {
	// new pixivPageChangeListener(callback, option);
	// callback(type, elem)
	//	type: base or illust or album
	//		baseは#rootの子の"header + div[class]"が作られた時
	//	elem: base時のみ対象ノード
	// option = { illust: true, album: true }
	//	監視対象
	constructor(callback, option) {
		this._callback = callback;
		this._option = option || {};
	}

	listen() {
		const root = document.getElementById("root");
		if (!root) return false;

		const call2nd = elem => {
			this._callback("base", elem);
			if (elem.querySelector("main")) this.observeIllust(elem); else this.observeAlbum(elem);
		}

		const div = root.querySelector("header + div[class]");
		if (div) call2nd(div);

		new MutationObserver(records => {
			records.forEach(record => {
				// header + div[class] が作成されるのを監視
				if (record.addedNodes.length) {
					const div = root.querySelector("header + div[class]");
					call2nd(div);
				}
			});
		}).observe(root, { childList: true });
		return true;
	}

	observeAlbum(baseElement) {
		if (!this._option.album) return;

		let lastUrl = null;

		const timer = new delayTimer(() => {
			if (lastUrl != location.href) {
				lastUrl = location.href;
				this._callback("album");
			}
		}, 500);

		// 手抜き気味
		new MutationObserver(records => {
			let found = false;
		top:
			for (let record of records) {
				for (let node of record.addedNodes) {
					if (node.nodeName === "IMG" && (node.src.includes("/img-master/img/") || node.src.includes("/novel"))) {
						found = true;
						break top;
					}
				}
			}
			if (found) {
				timer.start();
			}
		}).observe(baseElement, { childList: true, subtree: true });
	}

	getIllustContainer(base) {
		// figure要素が出来るのを待つ
		return new Promise(resolve => {
			const selector = "main > section figure";
			const elem = base.querySelector(selector);
			if (elem) {
				resolve(elem);
			} else {
				const timer = setTimeout(() => {
					ob.disconnect();
					throw new Error("Illust container not found");
				}, 10000);
				const ob = new MutationObserver((records, ob) => {
					const elem = base.querySelector(selector);
					if (elem) {
						clearTimeout(timer);
						ob.disconnect();
						resolve(elem);
					}
				});
				ob.observe(base, { childList: true, subtree: true });
			}
		});
	}

	async observeIllust(baseElement) {
		if (!this._option.illust) return;

		let illustContainer = await this.getIllustContainer(baseElement);

		let tmpImg = null, lastUrl = null;

		const timer = new delayTimer(() => {
			if (tmpImg) tmpImg = null;
			if (lastUrl != location.href) {
				lastUrl = location.href;
				this._callback("illust");
			}
		}, 1000);

		const imgSelector = 'img[src*="/img-master/img/"], canvas[style*="/img-master/img/"]';
		const isPicture = elem => {
			return elem &&
					((elem.nodeName === "IMG" && elem.src.includes("/img-master/img/")) ||
					(elem.nodeName === "CANVAS" && elem.style.backgroundImage.includes("/img-master/img/")));
		};
		const timerStartIfPicture = elem => {
			if (isPicture(elem)) {
				tmpImg = elem;
				timer.start();
			}
		};

		// 閲覧注意を最初に開いた時は最初からimgが存在する
		timerStartIfPicture(illustContainer.querySelector(imgSelector));

		// img監視してイベント発火
		new MutationObserver(records => {
			for (let record of records) {
				if (record.type === "attributes") {
					// 閲覧注意
					timerStartIfPicture(record.target);
				} else {
					for (let node of record.addedNodes) {
						if (isPicture(node)) {
							// img要素が直に追加された場合は即発火
							tmpImg = null;
							timer.start(0);
							return;
						} else if (node.querySelector) {
							// 追加要素の子孫にimgがある場合は遅延して様子を見る
							timerStartIfPicture(node.querySelector(imgSelector));
						}
					}
					if (record.removedNodes.length && tmpImg && !illustContainer.contains(tmpImg)) {
						// 対象画像が削除された場合はタイマーを止める
						timer.stop();
						tmpImg = null;
					}
				}
			}
		}).observe(illustContainer, { childList: true, subtree: true, attributes: true, attributeFilter: [ "src" ] });
	}
}

pixivService.run();
})();

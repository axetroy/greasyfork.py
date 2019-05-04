// ==UserScript==
// @name        futaba_CatalogTagging
// @description ふたばのカタログをてきとうにタグ分けします
// @namespace   http://pussy.CatalogTagging/
// @include     http://*.2chan.net/*/futaba.php?mode=cat*
// @include     https://*.2chan.net/*/futaba.php?mode=cat*
// @version     4.2
// @grant       none
// ==/UserScript==

(function() {

'use strict';
var doc = document;

// ---------------------------------------------------------------------------
// 設定
// ---------------------------------------------------------------------------
var TAGS, CATALOGTAG_CSS, CATALOGTAG_TEXT_CSS, USE_CACHE;
var setup = () => {
	// タグの設定
	TAGS = [
		{ name: 'お題', imgChecker: odaiChecker },
		{ name: 'お外', expr: /http/ },
		{ name: '実況', expr: /そろそろ|午後ロー|鉄腕|DASH/ },
		{ name: 'マケドニア', imgChecker: macedoniaChecker },
		{ name: '引用', expr: /^>/ }
	];
	// タグのスタイル
	CATALOGTAG_CSS = `
		.catalogtag {
			background: #ea8;
			color: #ffe;
			font-size: 12px;
		}
	`;
	// 本文のスタイル(カタログに本文を出したくない人は「display: none;」とか入れればいいよ)
	CATALOGTAG_TEXT_CSS = `
		.catalogtag-text {
		}
	`;
	// タグ分け結果をキャッシュするか(画像解析を微調整するときはfalseにしておく)
	USE_CACHE = true;
};
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// 画像解析
var canvas = doc.createElement('CANVAS');
canvas.width = 50;
canvas.height = 50;
var ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

/**
 * @param x 0から49
 * @param y 0から49
 * @return サムネの色を配列[R,G,B]で返します
 */
var getRGB = (x, y) => {
	return ctx.getImageData(x, y, 1, 1).data;
};

/** @return 色がだいたい同じならtrueを返します */
var isLike = (c1, c2) => {
	for (var i = 0; i < 3; i ++) {
		if (Math.abs(c1[i] - c2[i]) > 32) return false;
	}
	return true;
};

var macedoniaChecker = () => {
	var c1 = getRGB(0, 0);
	if (c1[0] < 128 || c1[2] > 128) return false;
	var c2 = getRGB(15, 0);
	if (c2[0] < 128 || c2[2] > 128 || isLike(c1, c2)) return false;
	return isLike(c2, getRGB(35, 0)) && isLike(c1, getRGB(49, 0));
};

var odaiChecker = () => {
	if (!isLike([255, 255, 255], getRGB(0, 0))) return false;
	if (!isLike([255, 255, 255], getRGB(49,0))) return false;
	for (var y = 5; y <=8; y++) {
		if (isLike([0, 0, 0], getRGB(4, y)) && isLike([0, 0, 0], getRGB(45, y))) return true;
	}
	return false;
};

// ---------------------------------------------------------------------------
// ここから本体
setup();
// タグ設定を整頓する
var NO_TAGGED = { name: '', expr: null };
TAGS.unshift(NO_TAGGED);
var TAGS_BY_NAME = {};
TAGS.forEach(tag => { TAGS_BY_NAME[tag.name] = tag; });
// キャッシュを読み込む
var cacheOnStrage = sessionStorage.getItem('catalogtagging_cache');
var cache = cacheOnStrage && JSON.parse(cacheOnStrage) || {};

/** @return 本文と画像をつかって適当にタグを返します */
var findTag = (text, img) => {
	if (text) {
		for (var i = 1; i < TAGS.length; i ++) {
			if (TAGS[i].expr && TAGS[i].expr.test(text)) return TAGS[i];
		}
	}
	if (!img) return NO_TAGGED;
	ctx.drawImage(img, 0, 0, 50, 50);
	for (var j = 1; j < TAGS.length; j ++) {
		if (TAGS[j].imgChecker && TAGS[j].imgChecker()) return TAGS[j];
	}
	return NO_TAGGED;
};

/* カタログの<TABLE> */
var catalog;

/* タグ分け本体 */
var tagging = (retryCount = 0) => {
	doc.body.setAttribute('__catalogtagging_status', 'start');
	// カタログ情報を取得
	catalog = doc.querySelector('TABLE[border="1"][align="center"]');
	var maxCol = catalog.getElementsByTagName('TR')[0].getElementsByTagName('TD').length;
	var tdElements = catalog.getElementsByTagName('TD');
	var tdCount = tdElements.length;
	if (!tdCount || !(tdElements[0].getElementsByTagName('SMALL').length)) return false; // 本文表示無し
	var tds = [];
	for (var i = 0; i < tdCount; i ++) {
		tds[i] = tdElements[i];
	}
	// 初期化
	TAGS.forEach(tag => {
		tag.f = doc.createDocumentFragment();
		tag.currentTr = null;
		tag.colCount = 0;
	});
	var cacheKeys = Object.keys(cache);
	for (var j = cacheKeys.length - Math.floor(tdCount * 1.5); 0 <= j; j --) {
		delete cache[cacheKeys[j]];
	}
	var retry = false; // 画像が読み込み中だったら後でもう１回実行する
	// 並び替え
	tds.forEach(td => {
		if (td.classList.contains('catalogtag')) return;
		var small = td.getElementsByTagName('SMALL')[0];
		small.classList.add('catalogtag-text');
		var a = td.getElementsByTagName('A')[0];
		if (!a || !a.href) return;
		var tag = USE_CACHE && TAGS_BY_NAME[cache[a.href]];
		if (!tag) {
			var img = td.getElementsByTagName('IMG')[0];
			if (!img || img.complete) {
				tag = findTag(small.textContent, img);
				cache[a.herf] = tag.name;
			} else {
				tag = findTag(small.textContent, null);
				retry = true;
			}
		}
		if (!tag.colCount && tag.name) {
			var tagLabelTd = tag.f.appendChild(doc.createElement('TR')).appendChild(doc.createElement('TD'));
			tagLabelTd.textContent = tag.name;
			tagLabelTd.className = 'catalogtag';
			tagLabelTd.setAttribute('colspan', maxCol);
		}
		if (tag.colCount % maxCol === 0) {
			tag.currentTr = tag.f.appendChild(doc.createElement('TR'));
		}
		tag.currentTr.appendChild(td);
		tag.colCount ++;
	});
	// カタログの要素を置き換えて完了
	var tbody = doc.createElement('TBODY');
	TAGS.forEach(t => { tbody.appendChild(t.f); });
	catalog.replaceChild(tbody, catalog.firstChild);
	sessionStorage.setItem('catalogtagging_cache', JSON.stringify(cache));
	doc.body.setAttribute('__catalogtagging_status', 'done');
	if (retry && retryCount < 10) { // やり直しは10回まで
		setTimeout(() => { tagging(retryCount + 1); }, 100);
	}
};
// 念のためイベント呼び出し回数をカウントして無限ループを抑制しておく
var eventCount = 0;
var resetEventCount = () => { eventCount = 0; };
// START!
var onLoad = e => {
	doc.styleSheets.item(0).insertRule(CATALOGTAG_CSS, 0);
	doc.styleSheets.item(0).insertRule(CATALOGTAG_TEXT_CSS, 0);
	tagging();
	// MutationRecordをeventCheckerでチェックしてタグ分けしたりしなかったりする関数
	var onEvent = (m, eventChecker) => {
		if (eventCount > 10) {
			console.log('他の拡張と競合してるっぽい');
			return;
		}
		for (var i = m.length - 1; 0 <= i; i --) {
			if (!eventChecker(m[i])) continue;
			eventCount ++;
			setTimeout(resetEventCount, 500);
			tagging();
			return;
		}
	};
	// TABLEタグが再追加されたらタグ分けするオブザーバー
	var defaultObserver = new MutationObserver(m => {
		onEvent(m, n => {
			for (var i = n.addedNodes.length - 1; 0 <= i; i --) {
				var node = n.addedNodes[i];
				if (node.tagName === 'TABLE') return true; // 赤福
				if (node.id === 'catalog_loading') return true; // ふたクロ
			}
			return false;
		});
	});
	defaultObserver.observe(catalog.parentNode, { childList: true });
	// ねないこのソートが終わったらタグ分けするオブザーバー
	var nenaikoObserver = new MutationObserver(m => {
		onEvent(m, n => {
			if (n.attributeName !== '__nenaiko_catsort_status') return false;
			if (doc.body.getAttribute('__nenaiko_catsort_status') === 'start') return false;
			// ねないこのソートが有効になってるならデフォルトのオブザーバーは要らないので切断する
			if (doc.body.getAttribute('__nenaiko_catsort_status') === 'done') defaultObserver.disconnect();
			return true;
		});
	});
	nenaikoObserver.observe(doc.body, { attributes: true });
};
if (doc.readyState === 'complete') {
	onLoad();
} else {
	addEventListener('load', onLoad);
}
})();

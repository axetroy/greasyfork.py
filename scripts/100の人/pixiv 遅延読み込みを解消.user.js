// ==UserScript==
// @name        pixiv 遅延読み込みを解消
// @name:ja     pixiv 遅延読み込みを解消
// @name:en     pixiv Lazy Loading Solver
// @description Solves lazy loading in pixiv manga pages (by replacing spacers with actual images.)
// @description:ja 漫画を遅延読み込みさせず、普通に表示します。
// @namespace   http://userscripts.org/users/347021
// @version     3.1.0
// @match       https://www.pixiv.net/member_illust.php?*mode=manga*
// @exclude     https://www.pixiv.net/member_illust.php?*mode=manga_big*
// @require     https://greasyfork.org/scripts/17896/code/start-script.js?version=112958
// @license     Mozilla Public License Version 2.0 (MPL 2.0); https://www.mozilla.org/MPL/2.0/
// @compatible  Edge 最新安定版 / Latest stable (非推奨 / Deprecated)
// @compatible  Firefox Greasemonkey を推奨 / Greasemonkey is recommended
// @compatible  Opera
// @compatible  Chrome
// @grant       dummy
// @run-at      document-start
// @icon        data:image/vnd.microsoft.icon;base64,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
// @author      100の人
// @homepageURL https://greasyfork.org/scripts/270
// ==/UserScript==

(function () {
'use strict';

/**
 * 一段目の読み込み完了を待機する時間 (ミリ秒)。
 * @constant {number}
 */
const TIMEOUT = 10 * 1000;

/**
 * ダミー画像ファイル名。
 * @constant {string}
 */
const DUMMY_IMAGE = 'transparent.gif';

/**
 * 画像リスト。
 * @type {HTMLCollection}
 */
let images;

/**
 * 一段目が読み込み済みか、読み込み開始後{@link TIMEOUT}ミリ秒経過しているか、3段目の読み込みが開始していれば真。
 * @type {boolean}
 */
let firstImagesAlreadyLoaded = false;

/**
 * 一段目の画像。
 * @type {HTMLImageElement[]}
 */
let firstImages;

/**
 * 3段目の最初の画像。
 * @type {HTMLImageElement}
 */
let firstUnloadedImageWhenOpenPage;

/**
 * src属性が変更されたときのオブザーバ。
 * @type {MutationObserver}
 */
let srcChangeObserver;

const footers = document.getElementsByClassName('end-page');
startScript(main, parent => parent.id === 'main', target => target.classList.contains('end-page'), () => footers[0]);

/**
 * 最後のダミー画像までDOM構築が完了したときに実行する処理。
 */
function main()
{
	firstUnloadedImageWhenOpenPage = document.querySelector('.manga > div:nth-of-type(3) .image');
	if (firstUnloadedImageWhenOpenPage) {
		// 3段目が存在すれば
		const imagesParent = document.getElementsByClassName('manga')[0];
		images = imagesParent.getElementsByClassName('image');
		firstImages = Array.from(images[0].parentElement.getElementsByTagName('img'));

		if (firstImages.every(isLoadComplete) || !firstUnloadedImageWhenOpenPage.src.endsWith(DUMMY_IMAGE)) {
			// 一段目の読み込みが完了している、または3段目の読み込みが開始していれば
			firstImagesAlreadyLoaded = true;
		} else {
			// 3段目以降の読み込みが開始するまで待機
			const firstUnloadedImageIndexWhenOpenPage = firstUnloadedImageWhenOpenPage.dataset.index;
			srcChangeObserver = new MutationObserver(function (mutations, observer) {
				if (!firstImagesAlreadyLoaded && mutations
					.some(mutation => mutation.target.dataset.index >= firstUnloadedImageIndexWhenOpenPage)) {
					firstImagesAlreadyLoaded = true;
					observer.disconnect();
				}
			});
			srcChangeObserver.observe(imagesParent, {
				attributes: true,
				subtree: true,
				attributeFilter: ['src'],
			});

			// タイムアウトを過ぎるまで待機
			setTimeout(startLoadingImages, TIMEOUT);
		}

		// 読み込み完了時に、その次の画像を取得
		imagesParent.addEventListener('load', loadNextImage, true);
		imagesParent.addEventListener('error', loadNextImage, true);
	}
}

/**
 * オブザーバを停止し、画像の取得を開始します。
 */
function startLoadingImages()
{
	if (!firstImagesAlreadyLoaded) {
		firstImagesAlreadyLoaded = true;
		srcChangeObserver.disconnect();
		firstUnloadedImageWhenOpenPage.src = firstUnloadedImageWhenOpenPage.dataset.src;
	}
}

/**
 * 画像の読み込みが完了、または失敗したときに実行する処理。
 * @param {ProgressEvent} event - loadイベント、またはerrorイベント。
 */
function loadNextImage(event)
{
	const image = event.target;
	if (image.localName === 'img' && !image.src.endsWith(DUMMY_IMAGE)
		&& !(event.type === 'load' && image.width === 1 && image.height === 1)) {
		// ダミー画像で発生したイベントでなければ
		if (firstImagesAlreadyLoaded) {
			const nextImage = images[parseInt(image.dataset.index) + 1];
			if (nextImage && nextImage.src.endsWith(DUMMY_IMAGE)) {
				// 次のページがダミー画像なら、正しい画像に置き換え
				nextImage.src = nextImage.dataset.src;
			}
		} else if (firstImages.includes(image)) {
			// 一段目なら
			if (firstImages.length === 1
				|| isLoadComplete(image === firstImages[0] ? firstImages[1] : firstImages[0])) {
				// 見開きでない、またはもう一方の画像が読み込み済みなら
				startLoadingImages();
			}
		}
	}
}

/**
 * 画像の取得が完了、または失敗していれば真を返します。
 * @param {HTMLImageElement} image
 * @returns {boolean}
 */
function isLoadComplete(image)
{
	return !image.src.endsWith(DUMMY_IMAGE) && image.complete;
}

})();

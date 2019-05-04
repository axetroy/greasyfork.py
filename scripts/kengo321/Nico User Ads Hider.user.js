// ==UserScript==
// @name        Nico User Ads Hider
// @namespace   http://userscripts.org/users/121129
// @description ニコニ広告による動画への装飾を削除
// @match       *://www.nicovideo.jp/video_top*
// @match       *://www.nicovideo.jp/tag/*
// @match       *://www.nicovideo.jp/search/*
// @match       *://www.nicovideo.jp/ranking*
// @version     9
// @grant       none
// ==/UserScript==

;(function() {
  'use strict'
  const css = `
    /* 共通 */
    .video [data-nicoad-grade="gold"] .itemThumbWrap::before,
    .video [data-nicoad-grade="silver"] .itemThumbWrap::before {
      all: initial;
    }

    /* カテゴリ別 24時間 総合ランキング */
		section.matrix li.item_row [data-nicoad-grade="gold"] .item,
    section.matrix li.item_row [data-nicoad-grade="silver"] .item {
			background-color: white;
		}

    /* 総合ランキング */
		.videoList01 .item.videoRanking[data-nicoad-grade="gold"],
    .videoList01 .item.videoRanking[data-nicoad-grade="silver"] {
			background-color: inherit;
		}
  `
  const style = document.createElement('style')
  style.textContent = css
  document.head.appendChild(style)
})()

// ==UserScript==
// @name        Pixiv Image Size Fitting
// @namespace   http://userscripts.org/users/121129
// @description pixiv の原寸画像が表示領域に収まるように画像サイズを変更
// @include     *://www.pixiv.net/member_illust.php?*
// @version     11
// @grant       none
// @license     MIT
// @noframes
// ==/UserScript==

;(function() {
  'use strict'
  function hasModifiersKey(event) {
    return event.altKey || event.ctrlKey || event.metaKey || event.shiftKey
  }
  function addStyle() {
    const style = document.createElement('style')
    style.id = 'PixivImageSizeFittingStyle'
    style.textContent = `
      [role="presentation"] > div {
        overflow: hidden;
      }
      [role="presentation"] img {
        max-height: 100vh;
        max-width: 100vw;
      }
    `
    document.head.appendChild(style)
  }
  function keydown(e) {
    if (hasModifiersKey(e)) return
    if (!['x', 'i'].includes(e.key)) return
    const style = document.getElementById('PixivImageSizeFittingStyle')
    if (style) {
      style.remove()
    } else {
      addStyle()
    }
  }
  function main() {
    addStyle()
    window.addEventListener('keydown', keydown)
  }
  main()
})()

// ==UserScript==
// @name        更改网页中文字体
// @author      Lvyiwan
// @description 针对无法设置默认字体的浏览器
// @namespace   lvyiwan.byethost6.com
// @icon        http://www.lvyiwan.byethost6.com/images/icon.jpg
// @encoding    utf-8
// @grant       unsafeWindow
// @grant       GM_setClipboard
// @run-at      document-end
// @version     1.01
// ==/UserScript==

(
        function (){
                with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('style')).innerHTML = '*:not([class*="icon"]):not([class*="mui-amount"]):not(i):not(s){font-family:"Segoe UI","Lucida Grande",Helvetica,Arial,"微软雅黑",FreeSans,Arimo,"Droid Sans","wenquanyi micro hei","Hiragino Sans GB","Hiragino Sans GB W3",Arial,sans-serif !important;}'];
        }
)()

// ==UserScript==
// @name        cnBeta Adblocker Mask Remover
// @author      有头蛙
// @description 移除cnBeta对adBlocker的提示弹窗
// @include     http://www.cnbeta.com/articles/*
// @license     GPL version 3
// @date        05/04/2016
// @grant       GM_addStyle
// @run-at      document-end
// @version     1.4.1
// @namespace https://greasyfork.org/users/37190
// ==/UserScript==
GM_addStyle('body > [style="display:block !important;"] { display: none !important; opacity: 0 !important; visibility: hidden !important; pointer-events: none !important;}');


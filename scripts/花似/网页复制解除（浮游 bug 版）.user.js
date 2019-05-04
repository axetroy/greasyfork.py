// ==UserScript==
// @name          网页复制解除（浮游 bug 版）
// @namespace     https://subei.me
// @version       0.1
// @description   编辑当前页面，使之可以自由编辑，复制，黏贴。
// @author        花似
// @compatible    chrome
// @compatible    firefox
// @icon          https://secure.gravatar.com/avatar/b1339689c9960745b25439993dd88289?s=200&r=G&d=
// @include       *
// ==/UserScript==
//  _                 _  _
// | |__  _   _  __ _| || |
// | '_ \| | | |/ _` | || |_
// | | | | |_| | (_| |__   _|
// |_| |_|\__,_|\__,_|  |_|
location.href = "javascript:document.body.contentEditable = 'true'; document.designMode='on'; void 0";
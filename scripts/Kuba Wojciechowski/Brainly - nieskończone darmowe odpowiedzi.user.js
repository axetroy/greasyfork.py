// ==UserScript==
// @name Brainly - nieskończone darmowe odpowiedzi
// @description:pl Darmowe nieskończone wyświetlanie odpowiedzi w brainly.pl
// @namespace nullby
// @author KubaWojciechowski
// @match https://brainly.pl/*
// @grant unsafeWindow
// @grant GM_addStyle
// @version 0.0.1.20190314202926
// ==/UserScript==

unsafeWindow.localStorage["anonymous-free-previews"] = "[]";
// the "hack" ^

GM_addStyle(`
.brn-bottom-toplayer__content-box {
visibility: hidden !important;
}
`);
// remove anonymous-free-previews banner
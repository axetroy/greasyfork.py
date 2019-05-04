// ==UserScript==
// @name         pixivの作品一覧をトリミングせずに表示
// @namespace    https://armedpatriot.blog.fc2.com/
// @version      1.2.1
// @description  pixivのプロフィール画面(ユーザーのイラストやマンガが一覧表示される画面)と、作品画面の下に表示される作者の作品一覧内の作品が、正方形にトリミングされて表示されるのを防止します。
// @author       Patriot
// @homepageURL  https://armedpatriot.blog.fc2.com/
// @run-at       document-end
// @match        https://www.pixiv.net/member.php*
// @match        https://www.pixiv.net/member_illust.php?*
// @match        https://www.pixiv.net/bookmark.php*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const illustSelector="[src^='https://i.pximg.net/c/']";
    const replacedClassTag="trim_removed";
    const illustUnreplacedSelector=`${illustSelector}:not(.${replacedClassTag})`;

    //
    // イラストを正方形にトリミングしないためのCSSを追加
    //
    let styleElement = document.createElement('style');
    document.getElementsByTagName('head')[0].appendChild(styleElement);
    let css = styleElement.sheet;
    css.insertRule(`${illustSelector}{object-fit:contain!important;}`, css.cssRules.length);

    //
    // トリミングされているイラストを、トリミングされていないイラストのサムネイルに置き換えるループ
    //
    setInterval(//TODO: 画像が読み込まれるタイミングが分からないので、ひとまず無限ループ
        ()=>{// 全ての箇所に適用できるようなMutationObserverの利用は、親コンテナ要素に統一性が無いので難しい
            Array.from(document.querySelectorAll(illustUnreplacedSelector)).forEach(e=>{
                e.src=e.src.replace(/250x250_.+?\//, "240x240/").replace("square1200", "master1200");
                e.classList.add(replacedClassTag);
            });
        },
        300
    );
})();
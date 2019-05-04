// ==UserScript==
// @name         番组计划主页观看进度中文标题
// @namespace    https://github.com/machsix
// @version      1.1
// @description  Bangumi番组计划 主页观看进度 中文标题
// @author       machsix
// @icon         http://bgm.tv/img/favicon.ico
// @include      *://bgm.tv/
// @include      *://bangumi.tv/
// @grant        none
// @run-at       document-end
// ==/UserScript==

const epGrids = document.querySelectorAll('.infoWrapper_tv .epGird');
epGrids.forEach((item) => {
    const node = item.children[0].children[1];
    const a = node.getAttribute('data-subject-name-cn');
    if (a) node.innerText = a;
});

const grid2 = document.querySelectorAll('#prgSubjectList .clearit');
grid2.forEach((item) => {
    const rootNode = item.getElementsByClassName('title')[0];
    const titleNode = rootNode.getElementsByTagName('span')[0];
    const cnTitle = rootNode.getAttribute('data-subject-name-cn');
    if (cnTitle) titleNode.innerText = cnTitle;
});
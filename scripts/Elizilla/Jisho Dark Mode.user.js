// ==UserScript==
// @name         Jisho Dark Mode
// @namespace    nonamespace
// @version      0.11
// @description  Give jisho.org a dark mode.
// @author       Elizilla
// @match        https://jisho.org/*
// @grant        all
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// whole page
addGlobalStyle(' html { background: #333 !important; }');
addGlobalStyle(' body { background: #333 !important; }');
addGlobalStyle(' header { background: #333 !important; }');
addGlobalStyle(' div#page_container { background: #333 !important; }');
// searchbox
addGlobalStyle(' div.overlay { background: #333 !important; }');
addGlobalStyle(' div.inner { background: #333 !important; }');
addGlobalStyle(' a.search-form_clear-button_js { background: #333 !important; }');
addGlobalStyle(' input { color: #888 !important; }');
// content
addGlobalStyle(' ul.f-dropdown { background: #333 !important; }');
addGlobalStyle(' li { color: #777 !important; }');

addGlobalStyle(' h4 { color: #888 !important; }');
addGlobalStyle(' span.japanese_word__furigana_wrapper { color: #888 !important; }');
addGlobalStyle(' span.japanese_word__text_with_furigana { color: #999 !important; }');
addGlobalStyle(' span.meaning-meaning { color: #aaa !important; }');
addGlobalStyle(' span.furigana { color: #888 !important; }');
addGlobalStyle(' span.text { color: #aaa !important; }');
addGlobalStyle(' div.result_area { background: #444 !important; }');
addGlobalStyle(' div.fact { background: #333 !important; }');
addGlobalStyle(' p.no-margin { color: #777 !important; }');
addGlobalStyle(' h6 { color: #777 !important; }');
// Specific kanji info
addGlobalStyle(' h1 { color: #aaa !important; }');
addGlobalStyle(' h2 { color: #999 !important; }');
addGlobalStyle(' span.character { color: #aaa !important; }');
addGlobalStyle(' span.type { color: #888 !important; }');
addGlobalStyle(' div.meanings { color: #888 !important; }');
addGlobalStyle(' div.kanji-details__stroke_count { color: #888 !important; }');
addGlobalStyle(' div.radicals { color: #888 !important; }');
addGlobalStyle(' div.dictionary_entry { color: #888 !important; }');
addGlobalStyle(' dt { color: #888 !important; }');
addGlobalStyle(' div.kanji-details__main-meanings { color: #999 !important; }');
addGlobalStyle(' div.kanji-details__main-readings { color: #888 !important; }');
addGlobalStyle(' div.kanji_stats { color: #888 !important; }');
addGlobalStyle(' li.tab-title { background: #333 !important; }');

// input method selector
addGlobalStyle(' div.input_methods { background: #333 !important; }');

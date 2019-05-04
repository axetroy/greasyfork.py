// ==UserScript==
// @name         Don't bother me, NII
// @namespace    Violentmonkey Scripts
// @version      0.2
// @description  Submit video study quickly
// @author       dangoron
// @match        *://rois-e-learning.leaf-hrm.jp/videos/view*
// @match        *://rois-e-learning.leaf-hrm.jp/doc_files/view*
// @run-at       document-end
// @grant        window.close
// ==/UserScript==

(function() {
    'use strict';
    if (location.href.search(/complete/) != -1){
        window.close();
    } else {
        $('form').submit();
    }
})();
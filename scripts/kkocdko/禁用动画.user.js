// ==UserScript==
// @name         禁用动画
// @description  禁用绝大部分网页动画
// @namespace    https://greasyfork.org/users/197529
// @author       kkocdko
// @version      0.5
// @include      *
// ==/UserScript==
'use strict';

document.body.insertAdjacentHTML('beforeend', '<style>*{animation:none!important;transition:none!important}</style>');
location.href = 'javascript:requestAnimationFrame=fn=>setTimeout(fn,200)';

// ==UserScript==
// @name Overleaf remap
// @description Remap esc to jj in overleaf vim mode editor
// @version 0.0.1.20180310153357
// @namespace https://greasyfork.org/users/174268
// ==/UserScript==
$(function () {
  // Make sure CodeMirror is loaded.
  if (!window.CodeMirror || !CodeMirror.Vim) return

  // Install custom macros.
  CodeMirror.Vim.map('jj', '<Esc>', 'insert')
})
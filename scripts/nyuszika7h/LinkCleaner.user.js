/*
 * Copyright (c) 2017, nyuszika7h <nyuszika7h@gmail.com>
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

// ==UserScript==
// @name         LinkCleaner
// @description  Skip intermediate pages such as dereferer on links
// @version      0.1.2
// @author       nyuszika7h
// @namespace    nyuszika7h@gmail.com
// @license      MIT
// @include      *
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const REPLACEMENTS = {
    'dereferer.me': {
      pattern: /^https?:\/\/(?:www\.)?dereferer\.me\/\?(.+:\/\/.+)/,
      noreferrer: true,
    },
  };

  for (const el of document.querySelectorAll('a')) {
    for (const [name, repl] of Object.entries(REPLACEMENTS)) {
      const match = repl.pattern.exec(el.href);

      if (match) {
        const origUrl = match[1];
        console.debug(`LinkCleaner (${name}): replacing ${el.href} -> ${origUrl}`);
        el.href = origUrl;

        if (repl.noreferrer) {
          el.rel = 'noreferrer';
        }
      }
    }
  }
}());
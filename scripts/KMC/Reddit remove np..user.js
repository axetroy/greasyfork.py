// ==UserScript==
// @name         Reddit remove np.
// @namespace    http://kmcdeals.com
// @version      1
// @description  redirects np.reddit.com links to regular reddit
// @author       kmc - admin@kmcdeals.com
// @match        *://np.reddit.com/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

window.location.host = 'reddit.com';
// ==UserScript==
// @name         Auto Click Play Button in thewatchseries
// @namespace    Auto Click Play Button in thewatchseries
// @version      0.1
// @description  Auto Click Play Button in thewatchseries!
// @author       jscriptjunkie
// @match        http://thewatchseries.to/cale.html*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

window.location.href = $('.push_button.blue').attr('href');
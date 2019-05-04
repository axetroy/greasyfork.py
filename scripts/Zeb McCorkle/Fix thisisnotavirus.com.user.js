// ==UserScript==
// @name         Fix thisisnotavirus.com
// @namespace    http://zebmccorkle.darkcraft.xyz/
// @version      0.3
// @description  it's broke this fixes
// @author       You
// @match        http://thisisnotavirus.com
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

$('html').css({ overflow: 'hidden' })
$('#menu').hide()
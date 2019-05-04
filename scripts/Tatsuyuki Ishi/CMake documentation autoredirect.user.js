// ==UserScript==
// @name         CMake documentation autoredirect
// @namespace    http://tatsuyuki.kdns.info
// @version      0.2
// @description  Auto show latest version of CMake documentation
// @author       Tatsuyuki Ishi
// @match        https://cmake.org/cmake/help/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

// Your code here...
var version = 'latest';
var versionMatch = new RegExp(/\/v\d\.\d\//);
var url = window.location.toString();
var match;
if((match = versionMatch.exec(url)) !== null && match[0] != ('/' + version + '/'))
{
    window.location = url.replace(versionMatch, '/' + version + '/');
}


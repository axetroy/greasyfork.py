// ==UserScript==
// @name				Tieba Bypass Login
// @name:zh-CN			Tieba Bypass Login
// @namespace			xuyiming.open@outlook.com
// @author				依然独特
// @description			解除百度贴吧强制登录
// @description:zh-CN	解除百度贴吧强制登录
// @version				0.0.1
// @run-at				document-end
// @include				*://tieba.baidu.com/*
// @match				*://tieba.baidu.com/*
// @grant				none
// @license				CC-BY-4.0
// @homepageURL			https://gist.github.com/xymopen/8d125453919754b8f738ebf71e070631
// ==/UserScript==

"use strict";

PageData.user.is_login = true;
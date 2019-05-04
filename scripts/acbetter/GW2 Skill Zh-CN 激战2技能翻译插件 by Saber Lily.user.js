// ==UserScript==
// @name         GW2 Skill Zh-CN 激战2技能翻译插件 by Saber Lily
// @namespace    https://gw2lily.com/
// @version      0.2
// @description  把 激战 2 攻略网站 Metabattle 及 Snowrows 上面的技能描述替换成英文，方便美服玩家参考。
// @author       Saber Lily 莉莉哩哩 Gay哩Gay气
// @run-at       document-start
// @require      https://unpkg.com/ajax-hook/dist/ajaxhook.min.js
// @include      https://metabattle.com/wiki/*
// @include      https://snowcrows.com/*
// @grant        none
// @license      GPL-v3
// ==/UserScript==

// 作者简介

// Saber Lily 莉莉哩哩 Gay哩Gay气，一个天天划水的休闲 激战 2 美服 玩家。
// 如果你觉得该脚本对你有所帮助，欢迎来到

// 脚本原理

// 通过劫持 Metabattle 及 Snowrows 的 Ajax Api 请求，篡改其访问地址，使其返回中文数据。
// 由于使用了一些见不得人的方法，所以烦请各位大佬莫举报我，咱们自己用用就好，当然也不要天天贴吧婊、Reddit 举报我撒。

// 已知 Bug，请随时关注更新，不定期修复
//
// 1. Metabattle 没有食物、扳手等的翻译
// 2. Metabattle 武器组、法印及部分武器技能没有翻译
// 3. 燃火 F1、F2 及 F3 后的技能没有翻译

hookAjax({
    open:function(arg,xhr){
        arg[1] = arg[1].replace('lang=en','lang=zh')
    }
})
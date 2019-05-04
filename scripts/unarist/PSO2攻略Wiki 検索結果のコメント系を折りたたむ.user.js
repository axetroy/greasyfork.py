// ==UserScript==
// @name         PSO2攻略Wiki 検索結果のコメント系を折りたたむ
// @description 折りたためるようにします。
// @namespace    https://github.com/unarist/
// @version      0.2
// @author       unarist
// @match        http://pso2.swiki.jp/?*&cmd=search&*
// @match        http://pso2m.swiki.jp/?*&cmd=search&*
// @grant        none
// ==/UserScript==

var $root = $('#body ul');

var $commentPages = $root.find('a[href*=Comments]').parent();

// ついでに日付でソート
$commentPages = $commentPages.map((i,e) => ({e:e, d: $(e).text().match(/\((\d+)d\)/)[1]})).sort((a,b) => a.d - b.d).map((i,x) => x.e);

var $li = $('<li>');

$('<a style="cursor:pointer">▼Comments</a>')
.click(function(){ $('#commentLinks').toggle(); })
.appendTo($li);

$('<ul id="commentLinks" style="display: none">')
.append($commentPages)
.appendTo($li);

$li.prependTo($root);
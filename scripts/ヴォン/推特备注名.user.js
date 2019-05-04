// ==UserScript==
// @name         推特备注名
// @namespace    https://github.com/VonXXGhost
// @version      0.4.2
// @description  设置用户备注名并在TL上显示
// @author       VonXXGhost
// @match        https://twitter.com/*
// @grant        GM_setValue
// @grant        GM_getValue
// @require    http://code.jquery.com/jquery-3.2.1.js
// ==/UserScript==

// 初始化json文件
var g_name_json = JSON.parse(GM_getValue('twitter_mark_names', '{}'));

// 保存json文件
function saveSetting() {
	if (g_name_json) {
		console.log(JSON.stringify(g_name_json), ' ');
		GM_setValue('twitter_mark_names', JSON.stringify(g_name_json));
	}
}

// 增加导出按钮
function addExportButton() {
    var position = $('#user-dropdown > div > ul > li:nth-child(10)');
	var code = '<li id="export-backup-item" role="presentation"><a href="#">导出备注名列表</a></li><button type="button" class="hidden" id="mark-backup-export" />';
	position.before(code);
	$('#export-backup-item').on('click', function (e) {
		e.preventDefault();
		$('#mark-backup-export').click();
	});
	$('#mark-backup-export').on('click', function () {
		prompt("请复制保存到任意文本文件中", JSON.stringify(g_name_json));
	});
}

//增加导入按钮
function addInportButton() {
	var position = $('#user-dropdown > div > ul > li:nth-child(10)');
	var code = '<li id="inport-backup-item" role="presentation"><a href="#">导入备注名列表</a></li><button type="button" class="hidden" id="mark-backup-inport" />';
	position.before(code);
	$('#inport-backup-item').on('click', function (e) {
		e.preventDefault();
		$('#mark-backup-inport').click();
	});
	$('#mark-backup-inport').on('click', function () {
		var setting = prompt("请复制备份字符串到下框中，注意：此举动会清空旧设置", '');
		if (setting) {
			g_name_json = JSON.parse(setting);
			saveSetting();
		}
	});
}

// 新版：增加导入导出按钮
function addInportExportButton2() {
    var position = $('div.css-1dbjc4n.r-1hslgdd');
    if ($('#mark-backup-export').length > 0) {
        return;
    }
    var code = '<button type="button" id="mark-backup-export">导出备注名列表</button>';
    var code2 = '<button type="button" id="mark-backup-inport">导入备注名列表</button>';
    position.after(code);
    position.after(code2);
	$('#mark-backup-export').on('click', function () {
		prompt("请复制保存到任意文本文件中", JSON.stringify(g_name_json));
    });
    $('#mark-backup-inport').on('click', function () {
		var setting = prompt("请复制备份字符串到下框中，注意：此举动会清空旧设置", '');
		if (setting) {
			g_name_json = JSON.parse(setting);
			saveSetting();
		}
	});
}

// 修改timeline和主页备注名
function changeNames(marks) {
	var usernames = $('.stream span.username.u-dir b');
	usernames.each(function () {
		var user = $(this).text();
		if (marks[user]) {
			var mark = ' [' + marks[user] + ']';
			if (user.indexOf('[') === -1) {
				$(this).text(user + mark);
			}
		}
	});
	// 修改主页备注名
	var id = $($('b.u-linkComplex-target')[1]);
	if (marks[id.text()]) {
		if ($(id.next()).text().indexOf('[') === -1) {
			var mark = ' [' + marks[id.text()] + ']';
			var code = '<b>' + mark + '</b>';
			id.after(code);
		}
	}
	// 修改RT备注名
	var RTusernames = $('a.pretty-link.js-user-profile-link');
	RTusernames.each(function () {
		var id = $(this).attr('href').slice(1);
		var username = $($(this).find('b')[0]).text();
		if (username.indexOf('[') === -1) {
			if (marks[id]) {
				var _mark = ' [' + marks[id] + ']';
				var username_len = $(this).children().length;
				if (username_len < 2) {
					var _code = '<b>' + _mark + '</b>';
					$(this).append(_code);
				}
			}
		}
	});
}

// 新版：修改timeline和主页备注名
function changeNames2(marks) {
	var usernames = $('.css-76zvg2.css-bfa6kz.r-1re7ezh.r-18u37iz.r-1qd0xha.r-a023e6.r-16dba41.r-ad9z0x.r-bcqeeo.r-qvutc0');
	usernames.each(function () {
		var user = $(this).text().substr(1);
		if (marks[user]) {
			var mark = '[' + marks[user] + ']';
			if (user.indexOf('[') === -1) {
				$(this).text('@' + user + mark);
			}
		}
	});
}

//---
// 在个人主页增加“添加备注”
function addName(marks) {
    var id = $($('b.u-linkComplex-target')[0]).text();
	var markname = prompt("请输入备注名（新备注刷新后生效）", "");
	if (markname) {
		marks[id] = markname;
		saveSetting();
	}
}

function addMarkButton(menu) {
	var code = '<li class="mark-name-item not-blocked" role="presentation"><button type="button" class="dropdown-link markname-add" role="menuitem">添加备注名</button></li>';
	$(menu).prepend(code);
	$(function () {
		$('.markname-add').on('click', function () {
			addName(g_name_json);
		});
	});
}


function addMark() {
	if ($('li.mark-name-item.not-blocked').length === 0) {
		var menu = $('div.dropdown-menu.dropdown-menu--rightAlign.is-autoCentered.is-forceRight > ul')[1];
		addMarkButton(menu);
	}
}

// 新版：添加备注名动作
function addName2(marks) {
    var id = $($('.css-1dbjc4n.r-ku1wi2.r-utggzx.r-m611by .css-76zvg2.css-bfa6kz.r-1re7ezh.r-18u37iz.r-1qd0xha.r-a023e6.r-16dba41.r-ad9z0x.r-bcqeeo.r-qvutc0')[0]).text().substr(1);
    if (id.indexOf('[') > -1) {
        id = id.substr(0, id.indexOf('['))
    }
    console.log('id:' + id);
	var markname = prompt("请输入备注名（新备注刷新后生效）", "");
	if (markname) {
		marks[id] = markname;
		saveSetting();
	}
}

function addMarkButton2(menu) {
    var code = '<div id="markname-add" aria-haspopup="false" role="menuitem" data-focusable="true" tabindex="0" class="css-1dbjc4n r-1loqt21 r-18u37iz r-1j3t67a r-9qu9m4 r-o7ynqc r-1j63xyz r-13qz1uu"><div class="css-1dbjc4n r-1wbh5a2"><div dir="auto" class="css-76zvg2 r-hkyrab r-1qd0xha r-a023e6 r-16dba41 r-ad9z0x r-bcqeeo r-qvutc0"><span dir="auto" class="css-76zvg2 css-16my406 r-1qd0xha r-ad9z0x r-bcqeeo r-qvutc0">添加备注名</span></div></div></div>'
	$(menu).prepend(code);
	$(function () {
		$('#markname-add').on('click', function () {
			addName2(g_name_json);
		});
	});
}

function addMark2() {
	if ($('#markname-add').length === 0) {
		var menu = $('.css-1dbjc4n.r-14lw9ot.r-1jkafct.r-eps6nq.r-1ekmkwe.r-u8s1d > div > div > div');
		addMarkButton2(menu);
	}
}

//---
(function (){
    var timeline = $('#stream-items-id');
    if (timeline.length > 0) {
        console.log("old version.");
        addMark();
        addExportButton();
        addInportButton();
        // 实时添加备注
        window.setInterval(function () {
            changeNames(g_name_json);
            addMark();
        }, 1000);
    }
    else {
        console.log("new version.");
        timeline = $('section.css-1dbjc4n > div > div > div');
        window.setInterval(function () {
            addMark2();
            addInportExportButton2();
            changeNames2(g_name_json);
        }, 1000);
    }
})();

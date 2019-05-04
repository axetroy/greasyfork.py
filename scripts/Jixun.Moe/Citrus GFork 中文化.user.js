// ==UserScript==
// @name        Citrus GFork 中文化
// @namespace   org.jixun.citrus.chs
// @description 将 Citrus GFork<4336> 的内容本地化
// @include     https://greasyfork.org/*
// @version     1.0
// @grant       none
// @require     https://greasyfork.org/scripts/7081/code/Translation.js
// ==/UserScript==

(function (lang) {
	console.info ('Citrus GFork 中文化 By Jixun');

	var l = Translation.getLang(lang);
	var trans = new Translation (l);

	addEventListener ('DOMContentLoaded', function () {
		trans.run ();

		var style = document.createElement ('style');
		style.textContent = 
			  ".type-library:before {content: '" + l.node.tag.SPAN.L + "';}"
			+ ".type-deleted:before {content: '" + l.node.tag.SPAN.D + "';}"
			+ ".type-unlisted:before {content: '" + l.node.tag.SPAN.U + "';}";
		document.body.appendChild (style);
	}, false);
})({
	'zh-CN': {

node: {
	str: {
		'Show your appreciation to the author by favouring the script and giving positive feedback':
			'如果您喜欢该脚本，请务必收藏以及给个好评',

		'100% Citrusy Goodness by':
			'100% 的原汁主题由 ',

		// 脚本列表
		'Name': '脚本名称',
		'Ratings': '评分',
		'Daily': '日',
		'Total': '总',
		'Created': '创建',
		'Updated': '更新',

		// 用户页面
		'No Scripts': '没有脚本',
		'Click to toggle deleted scripts display':
			'点我查看/隐藏已删除脚本'
	},

	tag: {
		B: {
			'TimidScript':
				'TimidScript 提供 (汉化: Jixun)'
		},
		SPAN: {
			'by': '作者: ',
			'L': '库',
			'U': '私有',
			'D': '已删'
		}
	},

	regex: [
		[ /^(.+)'s Profile$/, '$1 的主页' ]
	]
},

attr: {
	tag: {
		TD: {
			title: {
				regex: [
					[/Favoured plus Good Feedback, OK Feedback, Bad Feedback, Total Score (.+)/,
						'收藏数 + 好评，一般好评，差评，计算分数 $1' ]
				]
			}
		}
	}
}
}
,
'zh': {

node: {
	str: {
		'Show your appreciation to the author by favouring the script and giving positive feedback':
			'如果您喜歡該用戶腳本，請記得給好評和收藏哦~',

		'100% Citrusy Goodness by':
			'100% 原汁主題由 ',

		// 脚本列表
		'Name': '名稱',
		'Ratings': '評分',
		'Daily': '日',
		'Total': '總',
		'Created': '建立',
		'Updated': '最新',

		// 用户页面
		'No Scripts': '沒有腳本',
		'Click to toggle deleted scripts display':
			'點此查看或隱藏已刪除的腳本'
	},

	tag: {
		B: {
			'TimidScript':
				'TimidScript 提供 (本地化: Jixun)'
		},
		SPAN: {
			'by': '作者: ',
			'L': '函式庫',
			'U': '私有',
			'D': '刪除'
		}
	},

	regex: [
		[ /^(.+)'s Profile$/, '$1 的個人主頁' ]
	]
},

attr: {
	tag: {
		TD: {
			title: {
				regex: [
					[/Favoured plus Good Feedback, OK Feedback, Bad Feedback, Total Score (.+)/,
						'收藏數 + 好評，一般評論，差評，最終分數 $1' ]
				]
			}
		}
	}
}
}

});
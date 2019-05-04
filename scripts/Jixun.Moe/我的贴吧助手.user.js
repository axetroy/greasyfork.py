// ==UserScript==
// @name         我的贴吧助手
// @name:en      My tieba helper [old]
// @namespace    http://jixun.org/
// @version      0.1.4
// @description  该版本过旧，请使用 #2634 脚本。
// @description:en This version is old, please use #2634 instead.
// @include      http://tieba.baidu.com/*
// @copyright    2013+, Jixun.Moe
// @require      https://greasyfork.org/scripts/216/code/helper.js?v=1
// @run-at       document-start
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// ==/UserScript==

try{(function () {
	var _ = USO._,
		jPrintf = function () {
			var args = arguments,
				argLen = args.length,
				ret = args[0];

			if (argLen > 2) {
				for (var a = 0; a < argLen; a++)
					ret = ret.replace(new RegExp("([^\\\\])%" + a + "([^0-9]|$)", "g"), "$1" + args[a] + "$2");

				return ret.replace(/\\%/g, "%")
			}
		};

	util = {
		isThread: false
	};
	util.ce = function (t) {
		return document.createElement(t)
	};

	util.trim = function (s) {
		return s.replace(/^\s*|\s*$/g, '')
	};

	util.mark = function (f) {
		var floor = JSON.parse(f.getAttribute('data-field')).content.floor;
		f.setAttribute('data-floor', floor);
		return floor;
	};

	util.label = function (floor) {
		for (var i = 1; i < arguments.length; i++)
		arguments[i].setAttribute('src-floor', floor);
	};

	util.getFloor = function (f) {
		return f.getAttribute('src-floor') || f.getAttribute('data-field')
	};

	util.fromLabel = function (labelEle) {
		return document.querySelector('[data-floor="' + util.getFloor(labelEle) + '"]');
	};

	util.ripQuote = function (c) {
		return util.trim(c.innerHTML).replace(/\s*<img .*?class="(.+?)".*?>\s*/g, function (a, imgClass) {
			return imgClass == 'BDE_Smiley' ? '[表情]' : '[图片]'
		}).replace(/\s*<\a .*?href="(.*?)".+?>\s*(.+?)\s*<\/a>\s*/g, function (n, href, text) {
			if (text.indexOf('[图片]') != -1) return '[图片]';
			return text.indexOf('http') === 0 || text.indexOf('@') === 0 ? '[' + text + ']' : '[无法识别的链接]';
		});
	};

	util.parseLinkUrl = function (n, u) {
		if (n.parentNode.className.indexOf('wrapper') !== -1) {
			GM_xmlhttpRequest ({
				method: 'HEAD',
				url: n.href,
				headers: {
					// 去你的百度
					Referer: 'http://tieba.baidu.com/p/123456789'
				},
				onload: function (response) {
					if (response.finalUrl.indexOf('http') == 0) n.href = response.finalUrl;
				}
			});

			return false;
		}

		// 删掉开头结尾的空格
		var ret = u.replace(/(^\s*|\s*$)/g, '');

		if (u.indexOf('@') == 0) return false;

		// 检查是否带 http 协议头 (因为度娘能识别 www.example.com 这样的地址)
		// 如果不添加会跳到 => 当前.域名/www.example.com
		if (ret.indexOf('http') != 0) return 'http://' + ret;

		return ret;
	};
	util.parseCode = function (code) {
		var str = parseInt(code).toString(16);
		return unescape('%' + (str.length == 4 ? 'u' : '') + str);
	}

	// window.
	function openGroup(a) {
		a = '[助手] ' + a;
		console.group ? console.group(a) : console.log(a);
	}

	function closeGroup() {
		console.groupEnd && console.groupEnd();
	}

	function generateStripe(attrs, className) {
		var ret = _.C('div');
		_.attr(ret, attrs).className = className;
		return ret;
	}

	function _ES(e) {
		return decodeURIComponent(e.stack);
	}

	var conf = _.json(localStorage.jx_helper, {
		disable: []
	});

	function _disabled(module_id) {
		return conf.disable.length && conf.disable.indexOf(module_id) != -1;
	}

	function _findParent(ref, callback) {
		var ret = ref.parentNode;
		if (!ret) return;

		if (callback(ret)) return ret;
		return _findParent(ret, callback);
	}

	var w = unsafeWindow;
	var modules = {
		orange: {
			name: '屏蔽橙名',
			desc: '消除 sign_highlight 类名, 变成普通的蓝色。',
			lzl: true,
			entry: true,
			_proc: function (floor) {
				// j_thread_list clearfix
				if (floor.className.indexOf ('j_thread_list') !== -1) {
					floor.className = 'j_thread_list clearfix';
				}
				_.each(floor.querySelectorAll('.p_author_name'), function (h) {
					h.className = 'p_author_name';
				});
				_.each(floor.querySelectorAll('.sign_highlight'), function (p) {
					p.className = p.className.replace('sign_highlight', '');
				});
				_.each(floor.querySelectorAll('.d_name_icon, .lzl_name_icon'), _.rm);
			}
		},
		normalText: {
			name: '彩字转文本',
			desc: '将彩字图片全部转换为文本',
			_init: function () {
				GM_addStyle('.tbmall_tip_wrap{display:none !important}');
			},
			_proc: function (floor) {
				_.each(floor.querySelectorAll('.j_d_post_content'), function (e) {
					e.className = 'd_post_content j_d_post_content';
				});
				_.each(floor.querySelectorAll('img.BDE_Colorful'), function (e) {
					_.insertAfter(_.L(util.parseCode(_.attr(e, 'code'))), e);
					_.rm(e);
				});
			}
		},
		save_face: {
			name: '「挽尊」隐藏',
			desc: '把 挽尊 卡隐藏起来',
			_proc: function (floor) {
				if (floor.querySelector('.save_face_post')) {
					_.insertBefore(generateStripe({
						who: floor.querySelector('.p_author_name').textContent
					}), floor);

					_.hide(floor);
					// 挽尊 233
					return true;
				}
			}
		},
		quote: {
			name: '引用楼层',
			desc: '引用某一层的内容',
			_proc: function (floor, fNum) {
				var quoteFull = util.ce('li'),
					quoteLink = util.ce('a'),
					mTail = floor.querySelector('.p_mtail');

				if (!mTail) {
					console.error('[引用楼层] %sl 找不到尾巴元素!', fNum);
					return;
				}

				quoteFull.className = 'jx';
				quoteFull.appendChild(quoteLink);
				quoteLink.textContent = '引用[到发帖框]';
				//// 设定类名
				quoteLink.className = 'jx_do_quote';
				quoteLink.href = '#ueditor_replace';
				util.label(fNum, quoteLink);
				//// 插入到尾巴
				mTail.insertBefore(quoteFull, mTail.childNodes[0]);
			},
			_click: function (floor, editor, args, target) {
				var p = util.ce('p');

				p.innerHTML = jPrintf('引用 %1 楼的 %2:<br>——————————<br>%3<br><br>\u3000 \u270e 回应:', util.getFloor(target), floor.querySelector('.p_author_name').textContent, util.ripQuote(floor.querySelector('.d_post_content')));
				editor.insertBefore(p, editor.children[0]);
				editor.focus();
				return 1;
			}
		},
		real_url: {
			name: '真实链接解析',
			desc: '将百度所谓安全链接改成直链。',
			lzl: true,
			_proc: function (floor) {
				for (var allLink = floor.querySelectorAll('a[href*="jump.bdimg.com/safecheck"]'), i = 0; i < allLink.length; i++)
				// 替换成内容链接
				allLink[i].href = util.parseLinkUrl(allLink[i], allLink[i].textContent || allLink[i].innerText) || allLink[i].href;
			}
		},
		dl_audio: {
			name: '语音解析下载',
			desc: '解析语音数据地址供下载 :3',
			lzl: true,
			_proc: function (floor, fNum) {
				_.each(floor.querySelectorAll('.voice_player'), function (e) {
					// 查找带有 data-field 属性的节点
					var df = _findParent(e, function (f) {
						return f.hasAttribute('data-field') && f.className && f.className != 'lzl_cnt';
					});

					if (!df) {
						console.log('[语音解析] 找不到指定元素');
						return;
					}

					var data = JSON.parse(df.getAttribute('data-field')),
						pid = data.spid || data.content.id,
						auth = data.user_name || data.author.name;

					if (!pid) {
						console.log('[语音解析] 抓取 id 失败!');
						return;
					}

					//  /voice/index?tid=[tid]&pid=[pid]
					var dlLink = _.C('a'),
						text = _.C('span');
					_.attr(dlLink, {
						href: '/voice/index?tid=' + w.PageData.thread.id + '&pid=' + pid,
						download: '语音-' + auth + '-' + pid + '.mp3',
						style: 'margin-left:1em',
						class: 'ui_btn ui_btn_m'
					});
					text.textContent = '下载';
					dlLink.appendChild(text);
					_.insertAfter(dlLink, e);
					e.style.display = 'inline';
					_.insertAfter(_.C('br'), dlLink);
					// console.log ('[语音解析] 成功解析 %s(%s)', auth, dlLink.href);
					// e.appendChild(dlLink);
				});
			}
		},
		real_img: {
			name: '移除贴吧看图模式',
			desc: '点击图片后访问图片真实地址[无水印]',
			_init: function () {
				_.rm(document.querySelectorAll('#pic_to_album_tip, div.fav-wrapper'));
			},
			_proc: function (floor) {
				_.each(w.$('.BDE_Image', floor).off('click'), function (img) {
					var r = img.src.match(/\/sign=[a-f0-9]+\/(.+)/i);
					if (!r) return;

					var nHolder = _.C('a');
					nHolder.href = '//imgsrc.baidu.com/forum/pic/item/' + r[1];
					nHolder.title = '单击查看大图';
					nHolder.target = '_blank';
					_.insertBefore(nHolder, img);
					nHolder.appendChild(img);
				});
			}
		}
	};

	function waitForPageData(cb) {
		var iv = setInterval(function () {
			if (w.$ && w.PageData && w.PageData.tbs_loaded) {
				clearInterval(iv);
				console.log('PageData loaded.');

				/// 
				if (!w.bdShare) w.bdShare = {
					ready: false
				};
				w.PageData.games = [];
				/// 
				cb();
			}
		}, 500);
	}

	addEventListener('DOMContentLoaded', function () {
		console.log('[助手] 页面元素加载完毕, 等待贴吧数据…');
		waitForPageData(function () {
			openGroup('贴吧数据已加载, 初始化 owo');

			if (!w.PageData.forum) {
				console.log('不在贴吧, 退出 :<');
				closeGroup();
				return;
			}
			util.isThread = !! w.PageData.thread;

			var scriptStyle = '.floor-stripe{background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);background-color:#d9534f;background-size:40px 40px;text-align:center;border:1px solid #ccc;margin:-1px;color:#fff;text-shadow:#000 0 0 .5em;padding:.5em 0}.save_lz_face::before{content:attr(who) " 使用了挽尊卡"}';
			var st = _.C('style');
			st.innerHTML = scriptStyle;
			document.body.appendChild(st);

			function procPost(floor, postType) {
				console.log ('procPost:', postType);

				var f = null;
				if (__floor_LZL == postType) {
					f = _findParent(floor, function (q) {
						return q.className && q.className.indexOf('j_lzl_container') != -1
					});
					f = JSON.parse(f.getAttribute('data-field')).floor_num;
				} else if (postType == __floor_SINGLE) {
					f = util.mark(floor);
				}
try {
				// console.log ('[助手] 处理帖子: ', floor);
				for (var x in modules) {
					var m = modules[x];

					// console.log ('[%s] isLzl: %s, !m.lzl: %s', m.name, isLzl, !m.lzl);
					if (__floor_LZL == postType && !m.lzl) continue;
					if (__floor_THREAD_ENTRY == postType && !m.entry) continue;

					if (m._proc && !_disabled(x)) {
						// console.log ('[助手] 调用模组处理: %s[%s] -> _proc', x, m.name);
						try {
							m._proc(floor, f, __floor_LZL == postType);
						} catch (e) {
							console.error('[助手] 模组 %s[%s] 处理帖子出错, 错误: %s\n\n%s', x, m.name, e, _ES(e));
						}
					}
				}
} catch (e) { console.log (e); }

			}

			for (var x in modules) {
				var m = modules[x];
				if (m._init && !_disabled(x)) {
					console.log('[助手] 初始化模组 %s[%s] -> _init', x, m.name);
					try {
						m._init();
					} catch (e) {
						console.error('[助手] 模组 %s[%s] 初始化失败, 错误: %s\n\n%s', x, m.name, e, _ES(e));
					}
				}
			}

			console.log('[助手] Query Posts');
			var allPosts = document.querySelectorAll('#j_p_postlist > .l_post, #thread_list > .j_thread_list');
			console.log('[助手] 查询帖子: %s', allPosts.length);
			USO.fl._init();
			USO.fl.reg(procPost);
			_.each(allPosts, function (e) {
				procPost(e, util.isThread ? __floor_SINGLE : __floor_THREAD_ENTRY);
			});

			document.body.addEventListener('click', function (e) {
				if (e.target.className.indexOf('jx_do_') == -1) return;

				var that = e.target,
					domEditor = document.querySelector('#ueditor_replace'),
					args = util.trim(e.target.className).slice(6).split('-'),
					module = args.shift(),
					floor = util.fromLabel(that);

				console.log('[助手] 查询匹配函数并执行: %s', module);

				// floor, editor, args, target
				if (modules[module] && modules[module]._click) {
					try {
						console.log('[助手] 模组 %s[%s] -> _click', module, modules[module].name);
						if (modules[module]._click(floor, domEditor, args, that)) e.preventDefault();
					} catch (err) {
						console.error('[助手] 模组 %s[%s] 单击事件发生错误: %s\n\n%s', x, m.name, err, _ES(err));
						e.preventDefault();
					}
				}
			}, false);

			closeGroup();

			//-- <waitForPageData>
		});
		//-- <DOMContentLoaded>
	}, false);


})();

} catch (e) {
	console.error(e);
}
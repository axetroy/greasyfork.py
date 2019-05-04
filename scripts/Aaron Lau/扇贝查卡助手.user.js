	// ==UserScript==
	// @name         扇贝查卡助手
	// @version     2018.09.25
	// @description 在扇贝的查卡时，根据事先定义好的列表，自动生成打卡信息，在当前页面的最底部显示
	// @author       Aaron Liu
	// @supportURL   https://github.com/xinlingever/checkCard
	// @license      MIT
	// @date         2018-7-26
	// @modified     2018-9-25
	// @match        *://www.shanbay.com/team/thread/*
	// @require           https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js
	// @run-at            document-end
	// @grant             unsafeWindow
	// @grant             GM_setClipboard
	// @grant             GM_xmlhttpRequest
	// @namespace undefined
	// ==/UserScript==

	! function (N, A) {
		"object" == typeof exports && "object" == typeof module ? module.exports = A() : "function" == typeof define && define.amd ? define([], A) : "object" == typeof exports ? exports.Pinyin = A() : N.Pinyin = A()
	}(this, function () {
		return function (N) {
			function A(I) {
				if (t[I]) return t[I].exports;
				var U = t[I] = {
					i: I,
					l: !1,
					exports: {}
				};
				return N[I].call(U.exports, U, U.exports, A), U.l = !0, U.exports
			}
			var t = {};
			return A.m = N, A.c = t, A.i = function (N) {
				return N
			}, A.d = function (N, t, I) {
				A.o(N, t) || Object.defineProperty(N, t, {
					configurable: !1,
					enumerable: !0,
					get: I
				})
			}, A.n = function (N) {
				var t = N && N.__esModule ? function () {
					return N.default
				} : function () {
					return N
				};
				return A.d(t, "a", t), t
			}, A.o = function (N, A) {
				return Object.prototype.hasOwnProperty.call(N, A)
			}, A.p = "", A(A.s = 3)
		}([function (N, A, t) {
			"use strict";

			function I(N) {
				N && ("function" == typeof N && (N = [N]), N.forEach && N.forEach(function (N) {
					"function" == typeof N && N(o)
				}))
			}

			function U(N) {
				return N || null === i ? ("object" === ("undefined" == typeof Intl ? "undefined" : n(Intl)) && Intl.Collator ? (f = new Intl.Collator(["zh-Hans-CN", "zh-CN"]), i = 1 === Intl.Collator.supportedLocalesOf(["zh-CN"]).length) : i = !1, i) : i
			}

			function e(N) {
				var A = o.UNIHANS,
					t = o.PINYINS,
					I = o.EXCEPTIONS,
					U = {
						source: N
					};
				if (N in I) return U.type = E, U.target = I[N], U;
				var e = -1,
					r = void 0;
				if (N.charCodeAt(0) < 256) return U.type = H, U.target = N, U;
				if ((r = f.compare(N, G)) < 0) return U.type = u, U.target = N, U;
				if (0 === r) U.type = E, e = 0;
				else {
					if ((r = f.compare(N, O)) > 0) return U.type = u, U.target = N, U;
					0 === r && (U.type = E, e = A.length - 1)
				}
				if (U.type = E, e < 0)
					for (var n = 0, i = A.length - 1; n <= i;) {
						e = ~~((n + i) / 2);
						var S = A[e];
						if (0 === (r = f.compare(N, S))) break;
						r > 0 ? n = e + 1 : i = e - 1
					}
				return r < 0 && e--, U.target = t[e], U.target || (U.type = u, U.target = U.source), U
			}

			function r(N) {
				if ("string" != typeof N) throw new Error("argument should be string.");
				if (!U()) throw new Error("not support Intl or zh-CN language.");
				return N.split("").map(function (N) {
					return e(N)
				})
			}
			var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (N) {
					return typeof N
				} : function (N) {
					return N && "function" == typeof Symbol && N.constructor === Symbol && N !== Symbol.prototype ? "symbol" : typeof N
				},
				o = t(2),
				G = "阿",
				O = "鿿",
				H = 1,
				E = 2,
				u = 3,
				i = null,
				f = void 0;
			N.exports = {
				isSupported: U,
				parse: r,
				patchDict: I,
				genToken: e,
				convertToPinyin: function (N, A, t) {
					return r(N).map(function (N) {
						return t && N.type === E ? N.target.toLowerCase() : N.target
					}).join(A || "")
				}
			}
		}, function (N, A, t) {
			"use strict";
			A = N.exports = function (N) {
				N.EXCEPTIONS = {
					"嗲": "DIA",
					"碡": "ZHOU",
					"聒": "GUO",
					"炔": "QUE",
					"蚵": "KE",
					"砉": "HUA",
					"嬷": "MO",
					"蹊": "XI",
					"丬": "PAN",
					"霰": "XIAN",
					"豉": "CHI",
					"饧": "XING",
					"帧": "ZHEN",
					"芎": "XIONG",
					"谁": "SHUI",
					"钶": "KE"
				}, N.UNIHANS[91] = "伕", N.UNIHANS[347] = "仚", N.UNIHANS[393] = "诌", N.UNIHANS[39] = "婤", N.UNIHANS[50] = "腠", N.UNIHANS[369] = "攸", N.UNIHANS[123] = "乯", N.UNIHANS[171] = "刕", N.UNIHANS[102] = "佝", N.UNIHANS[126] = "犿", N.UNIHANS[176] = "列", N.UNIHANS[178] = "刢", N.UNIHANS[252] = "娝", N.UNIHANS[330] = "偸"
			}, A.shouldPatch = function (N) {
				return "function" == typeof N && ("FOU" === N("伕").target && "XIA" === N("仚").target && "ZHONG" === N("诌").target && "CHONG" === N("婤").target && "CONG" === N("腠").target && "YONG" === N("攸").target && "HOU" === N("乯").target && "LENG" === N("刕").target && "GONG" === N("佝").target && "HUAI" === N("犿").target && "LIAO" === N("列").target && "LIN" === N("刢").target && "E" === N("钶").target)
			}
		}, function (N, A, t) {
			"use strict";
			var I = ["阿", "哎", "安", "肮", "凹", "八", "挀", "扳", "邦", "勹", "陂", "奔", "伻", "屄", "边", "灬", "憋", "汃", "冫", "癶", "峬", "嚓", "偲", "参", "仓", "撡", "冊", "嵾", "曽", "叉", "芆", "辿", "伥", "抄", "车", "抻", "阷", "吃", "充", "抽", "出", "欻", "揣", "巛", "刅", "吹", "旾", "逴", "呲", "匆", "凑", "粗", "汆", "崔", "邨", "搓", "咑", "呆", "丹", "当", "刀", "嘚", "扥", "灯", "氐", "甸", "刁", "爹", "丁", "丟", "东", "吺", "厾", "耑", "垖", "吨", "多", "妸", "诶", "奀", "鞥", "儿", "发", "帆", "匚", "飞", "分", "丰", "覅", "仏", "紑", "夫", "旮", "侅", "甘", "冈", "皋", "戈", "给", "根", "刯", "工", "勾", "估", "瓜", "乖", "关", "光", "归", "丨", "呙", "哈", "咍", "佄", "夯", "茠", "诃", "黒", "拫", "亨", "噷", "叿", "齁", "乎", "花", "怀", "欢", "巟", "灰", "昏", "吙", "丌", "加", "戋", "江", "艽", "阶", "巾", "坕", "冂", "丩", "凥", "姢", "噘", "军", "咔", "开", "刊", "忼", "尻", "匼", "肎", "劥", "空", "抠", "扝", "夸", "蒯", "宽", "匡", "亏", "坤", "扩", "垃", "来", "兰", "啷", "捞", "肋", "勒", "崚", "哩", "俩", "奁", "良", "撩", "毟", "拎", "伶", "溜", "囖", "龙", "瞜", "噜", "驴", "娈", "掠", "抡", "罗", "呣", "妈", "埋", "嫚", "牤", "猫", "么", "呅", "门", "甿", "咪", "宀", "喵", "乜", "民", "名", "谬", "摸", "哞", "毪", "嗯", "拏", "腉", "囡", "囔", "孬", "疒", "娞", "恁", "能", "妮", "拈", "娘", "鸟", "捏", "囜", "宁", "妞", "农", "羺", "奴", "女", "奻", "疟", "黁", "挪", "喔", "讴", "妑", "拍", "眅", "乓", "抛", "呸", "喷", "匉", "丕", "囨", "剽", "氕", "姘", "乒", "钋", "剖", "仆", "七", "掐", "千", "呛", "悄", "癿", "亲", "靑", "卭", "丘", "区", "峑", "缺", "夋", "呥", "穣", "娆", "惹", "人", "扔", "日", "茸", "厹", "邚", "挼", "堧", "婑", "瞤", "捼", "仨", "毢", "三", "桒", "掻", "閪", "森", "僧", "杀", "筛", "山", "伤", "弰", "奢", "申", "升", "尸", "収", "书", "刷", "衰", "闩", "双", "脽", "吮", "说", "厶", "忪", "捜", "苏", "狻", "夊", "孙", "唆", "他", "囼", "坍", "汤", "夲", "忑", "熥", "剔", "天", "旫", "帖", "厅", "囲", "偷", "凸", "湍", "推", "吞", "乇", "穵", "歪", "弯", "尣", "危", "昷", "翁", "挝", "乌", "夕", "虲", "仙", "乡", "灱", "些", "心", "星", "凶", "休", "吁", "吅", "削", "坃", "丫", "恹", "央", "幺", "倻", "一", "囙", "应", "哟", "佣", "优", "扜", "囦", "曰", "晕", "帀", "災", "兂", "匨", "傮", "则", "贼", "怎", "増", "扎", "捚", "沾", "张", "佋", "蜇", "贞", "争", "之", "中", "州", "朱", "抓", "拽", "专", "妆", "隹", "宒", "卓", "乲", "宗", "邹", "租", "钻", "厜", "尊", "昨", "兙"],
				U = ["A", "AI", "AN", "ANG", "AO", "BA", "BAI", "BAN", "BANG", "BAO", "BEI", "BEN", "BENG", "BI", "BIAN", "BIAO", "BIE", "BIN", "BING", "BO", "BU", "CA", "CAI", "CAN", "CANG", "CAO", "CE", "CEN", "CENG", "CHA", "CHAI", "CHAN", "CHANG", "CHAO", "CHE", "CHEN", "CHENG", "CHI", "CHONG", "CHOU", "CHU", "CHUA", "CHUAI", "CHUAN", "CHUANG", "CHUI", "CHUN", "CHUO", "CI", "CONG", "COU", "CU", "CUAN", "CUI", "CUN", "CUO", "DA", "DAI", "DAN", "DANG", "DAO", "DE", "DEN", "DENG", "DI", "DIAN", "DIAO", "DIE", "DING", "DIU", "DONG", "DOU", "DU", "DUAN", "DUI", "DUN", "DUO", "E", "EI", "EN", "ENG", "ER", "FA", "FAN", "FANG", "FEI", "FEN", "FENG", "FIAO", "FO", "FOU", "FU", "GA", "GAI", "GAN", "GANG", "GAO", "GE", "GEI", "GEN", "GENG", "GONG", "GOU", "GU", "GUA", "GUAI", "GUAN", "GUANG", "GUI", "GUN", "GUO", "HA", "HAI", "HAN", "HANG", "HAO", "HE", "HEI", "HEN", "HENG", "HM", "HONG", "HOU", "HU", "HUA", "HUAI", "HUAN", "HUANG", "HUI", "HUN", "HUO", "JI", "JIA", "JIAN", "JIANG", "JIAO", "JIE", "JIN", "JING", "JIONG", "JIU", "JU", "JUAN", "JUE", "JUN", "KA", "KAI", "KAN", "KANG", "KAO", "KE", "KEN", "KENG", "KONG", "KOU", "KU", "KUA", "KUAI", "KUAN", "KUANG", "KUI", "KUN", "KUO", "LA", "LAI", "LAN", "LANG", "LAO", "LE", "LEI", "LENG", "LI", "LIA", "LIAN", "LIANG", "LIAO", "LIE", "LIN", "LING", "LIU", "LO", "LONG", "LOU", "LU", "LV", "LUAN", "LVE", "LUN", "LUO", "M", "MA", "MAI", "MAN", "MANG", "MAO", "ME", "MEI", "MEN", "MENG", "MI", "MIAN", "MIAO", "MIE", "MIN", "MING", "MIU", "MO", "MOU", "MU", "N", "NA", "NAI", "NAN", "NANG", "NAO", "NE", "NEI", "NEN", "NENG", "NI", "NIAN", "NIANG", "NIAO", "NIE", "NIN", "NING", "NIU", "NONG", "NOU", "NU", "NV", "NUAN", "NVE", "NUN", "NUO", "O", "OU", "PA", "PAI", "PAN", "PANG", "PAO", "PEI", "PEN", "PENG", "PI", "PIAN", "PIAO", "PIE", "PIN", "PING", "PO", "POU", "PU", "QI", "QIA", "QIAN", "QIANG", "QIAO", "QIE", "QIN", "QING", "QIONG", "QIU", "QU", "QUAN", "QUE", "QUN", "RAN", "RANG", "RAO", "RE", "REN", "RENG", "RI", "RONG", "ROU", "RU", "RUA", "RUAN", "RUI", "RUN", "RUO", "SA", "SAI", "SAN", "SANG", "SAO", "SE", "SEN", "SENG", "SHA", "SHAI", "SHAN", "SHANG", "SHAO", "SHE", "SHEN", "SHENG", "SHI", "SHOU", "SHU", "SHUA", "SHUAI", "SHUAN", "SHUANG", "SHUI", "SHUN", "SHUO", "SI", "SONG", "SOU", "SU", "SUAN", "SUI", "SUN", "SUO", "TA", "TAI", "TAN", "TANG", "TAO", "TE", "TENG", "TI", "TIAN", "TIAO", "TIE", "TING", "TONG", "TOU", "TU", "TUAN", "TUI", "TUN", "TUO", "WA", "WAI", "WAN", "WANG", "WEI", "WEN", "WENG", "WO", "WU", "XI", "XIA", "XIAN", "XIANG", "XIAO", "XIE", "XIN", "XING", "XIONG", "XIU", "XU", "XUAN", "XUE", "XUN", "YA", "YAN", "YANG", "YAO", "YE", "YI", "YIN", "YING", "YO", "YONG", "YOU", "YU", "YUAN", "YUE", "YUN", "ZA", "ZAI", "ZAN", "ZANG", "ZAO", "ZE", "ZEI", "ZEN", "ZENG", "ZHA", "ZHAI", "ZHAN", "ZHANG", "ZHAO", "ZHE", "ZHEN", "ZHENG", "ZHI", "ZHONG", "ZHOU", "ZHU", "ZHUA", "ZHUAI", "ZHUAN", "ZHUANG", "ZHUI", "ZHUN", "ZHUO", "ZI", "ZONG", "ZOU", "ZU", "ZUAN", "ZUI", "ZUN", "ZUO", ""],
				e = {
					"曾": "ZENG",
					"沈": "SHEN",
					"嗲": "DIA",
					"碡": "ZHOU",
					"聒": "GUO",
					"炔": "QUE",
					"蚵": "KE",
					"砉": "HUA",
					"嬤": "MO",
					"嬷": "MO",
					"蹒": "PAN",
					"蹊": "XI",
					"丬": "PAN",
					"霰": "XIAN",
					"莘": "XIN",
					"豉": "CHI",
					"饧": "XING",
					"筠": "JUN",
					"长": "CHANG",
					"帧": "ZHEN",
					"峙": "SHI",
					"郍": "NA",
					"芎": "XIONG",
					"谁": "SHUI"
				};
			N.exports = {
				PINYINS: U,
				UNIHANS: I,
				EXCEPTIONS: e
			}
		}, function (N, A, t) {
			"use strict";
			var I = t(0),
				U = t(1);
			I.isSupported() && U.shouldPatch(I.genToken) && I.patchDict(U), N.exports = I
		}])
	});

	(function () {
		'use strict';

		const cards = [];
		let teamKey = '兰芷';

		var curLink = window.location.href;

		var $pages = $('.djangoForumPagination');

		var lastPageLink = $pages.last().children(0).attr('href');

		var totalPageCnt = lastPageLink ? lastPageLink.substr(lastPageLink.indexOf('=') + 1) : 1;

		console.log(totalPageCnt);

		console.log(curLink);

		var paramIndex = curLink.indexOf('?');

		var basePageLink = paramIndex > 0 ? curLink.substring(0, paramIndex) : curLink;
		console.log(basePageLink);

		var getPage = (pageIndex, callback) => {
			console.log('get page: ' + basePageLink + '?page=' + pageIndex);
			GM_xmlhttpRequest({
				method: "GET",
				url: basePageLink + '?page=' + pageIndex,
				onload: function (response) {
					console.log('END get page: ' + basePageLink + '?page=' + pageIndex);
					var holder = document.createElement("div");
					holder.innerHTML = response.responseText;

					$('.posttitle .userinfo .span3 .user', holder).each((j, dom, n) => {

						var $parent = $(dom.parentNode.parentNode.parentNode.parentNode.parentNode);
						var card = {};
						var isNew = true;
						for (let c = 0; c < cards.length; c++) {
							if (cards[c].name === dom.text) {
								card = cards[c];
								isNew = false;
								console.log('card:' + dom.text + ' ' + card);
							}
						}

						var $imgs = $parent.find('img');
						var srcs = [];

						if ($imgs.length === 1) {
							srcs.push($imgs.attr('src'));
						} else if ($imgs.length > 1) {
							$imgs.each((p, q, r) => {
								srcs.push($(q).attr('src'));
							});
						}

						card.name = dom.text;

						if (srcs.length > 0) {
							if (card.img) {
								// if (card.img[card.img.length - 1] !== src)
								// 	card.img.push(src);
								srcs.map(v => card.img.push(v));
							} else {
								var timeStr = $parent.find('.postinfo .time').text();

								var y = 0;
								var M = 0;
								var d = 0;
								var h = 0;
								var m = 0;

								if (/(\d+)\D*年/.test(timeStr)) {
									y = RegExp.$1;
								}

								if (/(\d+)\D*月/.test(timeStr)) {
									M = RegExp.$1;
								}

								if (/(\d+)\D*日/.test(timeStr)) {
									d = RegExp.$1;
								}

								if (/(\d+)\D*小时/.test(timeStr)) {
									h = RegExp.$1;
								}

								if (/(\d+)\D*分钟/.test(timeStr)) {
									m = RegExp.$1;
								}

								var nowDate = new Date();
								var td = nowDate.getDate() - d;
								var th = nowDate.getHours() - h;
								var tm = nowDate.getMinutes() - m;

								if (tm < 0) {
									tm += 60;
									th -= 1;
								}

								if (th < 0) {
									th += 24;
									td -= 1;
								}

								if (td < 0) {
									td = (new Date(nowDate.getTime())).setDate(td).getDate();
								}

								var ty = nowDate.getFullYear() - y;
								var tM = nowDate.getMonth() + 1 - M;

								if (y) {
									card.time = ty + '年' + tM + '月';
								} else if (d) {
									card.time = td + '日' + th + '点';
								} else {
									card.time = th + ':' + tm;
								}

								card.img = srcs;
							}
						}

						card.team = $('.team .user', dom.parentNode.parentNode).text();
						// console.log(`${card.NO}: ${card.name}, ${card.img}`);

						if (card.img && isNew) {
							card.NO = cards.length + 1;
							cards.push(card);
						}
					});

					if (pageIndex < totalPageCnt) {
						pageIndex++;

						getPage(pageIndex, callback);
					} else {
						callback();
					}
				}
			});
		};

		var createCard = (card) => {
			var isChecked = false;
			if (card.img) isChecked = true;

			var getImgDiv = () => {

				var ret = '<div class="single-imgs">';

				if (card.img) {

					for (let i = 0; i < card.img.length; i++) {
						ret += `
						<div style="position: relative">
							<img class='single-img' src='${card.img[i]}' />
							<h4 style="position: absolute; bottom: 0;
								color: white; margin: 4px;
								background-color: rgba(0,0,0, 0.5);">
								${card.time} 
							</h4>
						</div>`;
					}
				}

				ret += '</div>';

				return ret;
			};

			return `<div class="single ${isChecked ? 'OK' : 'no-check'}">
			<div class='name'>
				<span class='single-no'>${card.NO}</span>
				${card.name}
				<!-- <span class='single-of-team'>${card.name}</span> -->
			</div> 
			${getImgDiv()}
			<div class='no-check-info' />
			</div>`;
		};

		var createSortDiv = () => {
			return `<div style="position: fixed; bottom: 40px; right: 40px; background: rgba(0, 0, 0, 0.3); color: white; padding: 10px">
			<div id="sortAZ"><h4>按字母顺序排列</h4></div>
			<div id="sortTime"><h4>按回帖顺序排列</h4></div>
			</div>`;
		};

		var showCard = (data) => {
			if ($('.main-result').length > 0)
				$('.main-result').remove();

			var $div = $(document.createElement('div'));

			$div.css({
				'display': 'flex',
				'flex-wrap': 'wrap',
				'background-color': 'lightblue'
			});

			$div.append(`
				<style>
				.single-img { width: 220px; }
				.name {text-align: center; font-size: 18px; color: green;}
				.single { margin: 10px 10px 30px 10px;}
				.single-no {color: gray; font-size: 12px; margin-right: 12px;}
				.single-of-team {opacity: 0.3; font-size: 12px;}

				.no-check-info {
					display: none;
					width: 220px;
				}

				.no-check .single-img {
					display: none;
				}

				.no-check .no-check-info {
					display: block;
				}

				.no-check .name {color: red}

				#sortAZ, #sortTime {
					cursor: pointer;
				}
				</style>
				`);

			for (let i = 0; i < data.length; i++) {
				var d = data[i];
				$div.append(createCard(d));

			}

			$div.append(createSortDiv());

			$('#sortAZ', $div).on('click', () => {
				showCardAZ();
			});

			$('#sortTime', $div).on('click', () => {
				showCardTime();
			});

			$div.addClass('main-result');
			$('body').append($div)

		}

		var trimName = (name, tag) => {

			let ret = name;

			if (tag)
				ret = ret.replace(`【${tag}】`, '').replace(`[${tag}]`, '').replace(`${tag}`, '').toLowerCase().trim();
			else
				ret = ret.replace(/['【', [\[].*['】','\]']/, '').toLowerCase().trim();

			// console.log('::::::::::::::::::::', name, ' => ', ret);
			const removeReg = /[!@#$%^&*()_+-=\[\]{};':",./<>?`~。，’；、|]/g;

			ret = ret.replace(removeReg, '');
			return ret;
		};

		var compareName = (nameA, nameB, tag) => {
			const name1 = trimName(nameA, tag);
			const name2 = trimName(nameB, tag);

			// if (name1 === name2)
			// 	console.log(`${nameA} === ${nameB}`);
			return name1 === name2;
		}

		var cardAz = undefined;
		var showCardAZ = () => {
			if (!cardAz) {
				cardAz = JSON.parse(JSON.stringify(cards));
				cardAz.sort((a, b) => {
					const ret = a.nameC.localeCompare(b.nameC);
					return ret;
				});
			}

			showCard(cardAz);
		};

		var showCardTime = () => {
			showCard(cards);
		};

		getPage(1, () => {
			cards.map(c => {
				c.nameC = Pinyin.convertToPinyin(trimName(c.name, teamKey));
			});

			showCardTime();

		});


	})();
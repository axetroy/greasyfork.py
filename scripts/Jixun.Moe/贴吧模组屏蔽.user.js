// ==UserScript==
// @name        贴吧模组屏蔽
// @namespace   org.jixun.tieba
// @description 实验性脚本，屏蔽贴吧自带模组功能 (页面静态内容不会消失)
// @include     http://tieba.baidu.com/*
// @version     1.2.8

/// 兼容 GM 1.x, 2.x
// @require     https://greasyfork.org/scripts/2599/code/gm2_port.js

// @run-at      document-start
// @grant       unsafeWindow
// ==/UserScript==
var fooBlockChecker = '_b' + Math.random().toString().slice(2);

// 是否显示屏蔽日志?
var $showLog = true;

// 白名单模组列表
var $whitelist = {
	frs: {
		widget: {
			medal: true,

			Thread: true,
			ThreadList: true,
			FormEditor: true,
			forum_card: true,
			ThreadListEden: true,
			thread_media_list_bright: true,
			PictureRotation: true,
			// 反正弹出的播放器拖动不了, 屏蔽算了
			// PopVideo: true
		}
	}
};

// 屏蔽的自带模组列表
var $disable = {
    // 2015.12.17 新增
    // 广告?
    adsense: true,
    
    
	liveshow: true,

	common: {
		widget: {
			tchargeDialog: true,
			wallet_dialog: true,
			JoinVipDialog: true,
			browserStatistics: true,
			MobileTip: true,
			top_banner: true,
			RollNumber: true,

			bd_share: true,
			
			pkFixedBubble: true,
			ten_years: true,
			worldcupInfoBanner: true,
			footer: true,
			PadstyleNav: true,
			tbnav_bright: true,
			asidead: true,
            
            // 2015.12.17 新增
            // 锑豆、支付类
            Tdou: true,
            payMember: true,
            cashierDialog: true,
            TdouMessage: true,
            umoney: true,
            qianbaoCashierDialog: true,
            umoney_query: true,
            
            // 广告统计
            AdStats: true,
            advertiseRight: true,
            umoney_promotion_dialog: true,
            
            // 提建议?
            suggestion: true,
            
            // 分享
            tbshare: true,
            
            // 右侧悬浮框
            AsideFloatBar: true,
            
		},
		component: {
			force_login: true
//			,JsPager: true
		}
	},

	// 贴吧商城相关
	tbmall: true,

	// 看上去像广告
	frs: true,
	comforum: true,

	// t秀功能?
	pb: {
		component: true,
		widget: {
			TbSafe: true,
			saveFace: true,

			// Message: true,
			NoRefresh: true,
			ThreadInfo: true,
			Favthread: true,
			pic_act_poster: true,
			picActToolbar: true,
			ForumTitle: true,
			localAdPost: true,
			// User: true,
			// Repost: true,
			meizhi_slide_window: true,
			platforum_activity_thread: true,
			pic_act_repost: true,
			PicActWall: true,
			platform_pic_act_thread: true,
			platform_pic_act_repost: true,
			PlatforumActivityRepost: true,
			ticket_thread: true,
			Passive: true,
			pic_act_vote: true,
			// sub_list: true,
			// ForumListV3: true,
			spreadadPb: true,
			related_threads_inside: true,
			vie_sofa: true,
			NewsRecommend: true,
			top10: true,
			// NoAutoVideo: true,
			YingyinUrlTipType1: true,
			YingyinUrlTipType2: true,
			Stat: true,
			UrlCheck: true,
			PbTrack: true,
			// Posts: true,
		}
	},

	// 魔法道具
	props: {
		widget: {
			// Residual: true
			Feedback: true,
			MagicProps: true
		},
		component: {
			// PropsApi: true,
			Guide: true,
			MagicProps: true
		}
	},

	encourage: {
		widget: {
			// 世界杯
			fifaCard: true,
			fifaHorn: true,
			FifaZtGiftRank: true,
			worldcupTopic: true,
			worldcup_guess_item: true,
			
			scoreBuy: true,
			scoreAnimation: true,
			worldcupTree: true,
			
			// 猜拳帖
			GuessingThread: true,
			
			// 发表猜拳帖/回复
			PostGuessing: true,
			PostGuessingNew: true,
			
			// 发表妹纸投票贴/回复
			meizhi_vote: true,
			
			// 成就…?
			achieveCard: true
		}
	},
	
	fanclub: true,

	platform: {
		widget: {
			XiaomiPreOrderHeader: true,
			CountdownHead: true
		}
	}
};

var _checkNode = function (initNodes, moduleName) {
	var moduleSections = moduleName.split ('/');
	for (var i = 0, section, $node = initNodes; i < moduleSections.length; i++) {
		section = moduleSections[i];
		if (!$node.hasOwnProperty(section))
			break;
		
		// 存在于列表
		if (true === $node[section] || 1 === $node[section])
			return true;
		
		$node = $node[section];
	}

	return false;
};

unsafeDefineFunction (fooBlockChecker, function (moduleName) {
	if (_checkNode($disable, moduleName)
		&& !_checkNode($whitelist, moduleName)) {
		if ($showLog) {
			console.info ('屏蔽模组: %s', moduleName);
			return true;
		}
	}

	if ($showLog)
		console.debug ('加载模组: %s', moduleName);
});

var $script = document.createElement ('script');
$script.textContent = ';(' + (function (fooBlockChecker) {
	var b_, b_module, b_moduleDefine;
	
	// 捕捉 _ 基类
	Object.defineProperties (window, {
		_: {
			set: function (__) {
				if (b_) return ;
				b_ = __;
				
				// 捕捉 Module 类
				Object.defineProperties (b_, {
					Module: {
						set: function (_Module) {
							b_module = _Module;
							
							// 捕捉 define 函数
							b_moduleDefine = _Module.define;
							_Module.define = function (obj) {
								if (fooBlockChecker(obj.path)) {
									var $sPath = obj.path;
									return b_moduleDefine.call(_Module, {
										path: $sPath,
										sub: {
											initial: function () {
												console.info ('Module init: %s', $sPath);
											}
										}
									});
									// return null;
								}
								
								return b_moduleDefine.apply(_Module, arguments);
							};
						},
						get: function () {
							return b_module;
						}
					}
				});
			},
			get: function () {
				return b_;
			}
		}
	});
}).toString() + ')(window.' + fooBlockChecker + ');';
document.head.appendChild ($script);
// ==UserScript==
// @name				科学刀辅助脚本
// @namespace		kxdao
// @version			18.10.23.19
// @author			cnhong
// @copyright		2018+ cnhong
// @description	我比较懒，就写了一个偷懒的脚本。此脚本仅适用于【科学刀】论坛，目前实现了科学刀【自动签到】【定时刷新】【自动答题】【快速回复】，我也不知道还要加什么其他功能。(提示:执行“每日任务”时会打开1-2次网址导航，并在20秒后自动关闭，算是脚本唯一收入，如介意请勿使用; 遇到bug及时在论坛私信问题+版本号，以便于及时发现问题)
// @match				http*://www.kxdao.net/*
// @require			https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.0/jquery.min.js
// @match				http*://hao.360.cn/?src=lm&ls=n3c024f1693*
// @match				http*://hao.7654.com/?chno=7654dh_23580*
// @match				http*://www.so.com/*
// @grant				GM_setValue
// @grant				GM_getValue
// @grant				GM_openInTab
// @grant				GM_info
// @grant				GM_notification
// @grant				GM_xmlhttpRequest
// @run-at 			document-end
// @modified		2018.10.23 18.10.23.19 执行各种任务以框架方式执行，不再打开新网页；根据问卷反馈，加入激活帖子内链接功能，同时去除了打开外部链接时安全确认(测试，如有bug可在QQ群反馈)
// @modified		2018.09.30 18.9.30.12 更新jQuery的cdn，原cdn已不可用
// @modified		2018.09.09 18.9.09.14 去除自动发布灌水、打卡帖；“快速回复”改为快速定位到回复框（快捷键为“Ctrl+Enter”）；删减大量无效代码
// @modified		2018.09.08 18.9.08.14 更新未收录问题反馈方式
// ==/UserScript==

(function(){
	'use strict';
	var news = '本次更新:<br><b>', i=0;
	news += ++i + '.执行各种任务以框架方式执行，不再打开新网页(测试，如有bug可在QQ群反馈)<br>';//更新内容
	news += ++i + '.根据问卷反馈，加入激活帖子内链接功能，同时去除了打开外部链接时安全确认(测试，如有bug可在QQ群反馈)<br>';//更新内容
	news += ++i+'.<b>脚本作者疑因发布脚本，已被永久封号。以后可能很少或者不会继续增加功能，脚本用户可<a href="http://qm.qq.com/cgi-bin/qm/qr?k=SyNQ9pdf1KxGNUpp7H8DCfwV1R2yT0NN" target="_blank" class="red">点我加入脚本问题反馈群</a>(群号:703738426)，反馈脚本问题，很久之前建立了</b><br><br>';//更新内容
	news += ++i+'.<a href="https://wj.qq.com/s/2550864/a4f1" class="tip_close rainbow2" target="_blank">点我开始填写问卷</a>，看看大家需求，以便后期优化更新。问卷由“腾讯问卷”提供，可放心填写。<br>';//更新内容
	//news += '<br>*<a href="http://qm.qq.com/cgi-bin/qm/qr?k=SyNQ9pdf1KxGNUpp7H8DCfwV1R2yT0NN" target="_blank" class="red">点我加入脚本问题反馈群</a>(群号:703738426)';
	news += '</b><br>*手动更新方法:点击“<b class="c_red">脚本设置</b>”->右下角“<b class="c_red">更新脚本</b>”';
	
	var LIMIT_TIME=60*2,//最小时间
		VERSION = GM_info.script.version,//脚本版本号
		HOMEPAGE = "https://greasyfork.org/zh-CN/scripts/39965-%E7%A7%91%E5%AD%A6%E5%88%80%E8%BE%85%E5%8A%A9%E8%84%9A%E6%9C%AC",//脚本主页
		DOMAIN= "https://www.kxdao.net/",//科学刀域名
		LOGO = DOMAIN+"logo.png",//通知logo
		P={"doSign":12, "dati":13, "guanshui":14, "daka":15, "toutou": 16};
	if($("meta[name=viewport]").length>0)
	{
		console.log("手机版，不运行");
		return false;
	}
	var T = new Tools();
	
	init();//初始化
	
	function init()//初始化
	{
		var Core = new Cores(), firstRun = Core.firstRun(), h_autoDayquestion = parseInt(GM_getValue("h_autoDayquestion")||0);
		if(!T.isURL("www.kxdao"))
		{
			T.open360();//360自动搜索
			return false;
		}else{
			Core.initSet();//生成设置模板
			Core.update();//展示更新内容 180529
			if( firstRun === true)//首次初始化后打开设置
			{
				$(".h_open").click();
			}
		}
		var uid = T.getUinfo("uid");
		Core.autoFresh();//定时刷新
		Core.fastReplay();//快速回复
		if(!uid){
			console.log("未登录账号！");
			return false;
		}
		Core.AutoSign();//自动签到 k = 0 1 2
		Core.autoDayquestion();//自动答题
		setTimeout(function(){//每日任务
			if(h_autoDayquestion && GM_getValue("h_Dayquestion") != T.Day()){
				$(".h_dayquestion").trigger("click");
				Core.showTip("提示","已开始执行今日任务，请勿刷新本页面！", 20);
			}
		},500);
		Core.Group_clear();//隐藏群组灌水 k = 0 1 2
		T.Minutes();//自动对时
	}
	function Cores(){
		var C = this,
			T = new Tools(),
			u = 'https://hao.360.cn/?src=lm&ls=n3c024f1693&kxdao',
			refresh_time = parseInt(GM_getValue("h_refresh_time")||0),//自动刷新
			uid = T.getUinfo("uid"), uin = T.getUinfo("uin"), TU={uin: uin, uid: uid, VERSION:VERSION};
			//console.log("uid",uid);
		C.fastReplay=function(){
			if(T.isURL("/thread-") || T.isURL("mod=viewthread") )
			{
				//$("body").append('<div class="fastReplay" style="right: 40px; top:240px; position: fixed; height:46px; width:46px; border: 1px solid #287EBC; border-radius:23px;text-align:center; background:#287EBC55;z-index: 99999;moz-user-select: -moz-none; -moz-user-select: none; -o-user-select:none; -khtml-user-select:none; -webkit-user-select:none; -ms-user-select:none; user-select:none;"><div id="gotoReplay" style="margin-top: 3px;" title="快速定位到回复框">快速<br>回复</div></div>');
				$("#pgt").append('<button class="pnpost btn btn-primary" id="gotoReplay" style="line-height:33px; height:33px;font-size: 18px; color: #fff;background: #007bc8" tabindex="5" title="快速定位到回复框,快捷键为“Ctrl+Enter”"><strong>*快速回复</strong></button>');
				$("#gotoReplay").on("click",function(){
					$("#postmessage").focus();
					$('html,body').animate({scrollTop:$('#flk').offset().top}, 800);
				});
				$(document).on('keydown', function (e) {
					var key = e.keyCode;
					//console.log(key);
					if (e.ctrlKey && key == 13) {
						e.preventDefault();
						$("#gotoReplay").trigger("click");
						if($("#commentmessage").val()){
							$('button[value="replysubmit"]').trigger("click");
						}
					}
				});
				T.activeLink();
			}
		}
		C.doDayquestion=function()//答题
		{
			var QA=
			[
				{Q:'没收藏请收藏再作答',A:'OJBK'},
				{Q:'遇到有用的帖子或者回复需要怎么做',A:'点赞点赞够5赞帖子带彩蛋效果'},
				{Q:'每日可免费评分一次威望',A:'评,不评答题过不去'},
				
				{Q:'魔盾查毒看DNS',A:'明白了'},
				{Q:'举报盗QQkey',A:'知道了'},
				{Q:'现在QB保护维护',A:'明白'},
				{Q:'发布exe可执行',A:'知道了'},
				{Q:'自行魔盾查毒下好吗',A:'好的'},
			];
			var Q = $('font[color="#FF6600"]').text();
			//console.log(Q);
			var qs_option=$(".qs_option"), thiz, txt, not;
			for(var i=0;i<QA.length;i++)
			{
				if(Q.indexOf(QA[i].Q) != -1){
					//console.log(QA[i].Q, QA[i].A);
					for(var j=0; j<qs_option.length; j++){
						thiz = $(qs_option[j]);
						txt = T.Trim(thiz.text(),'g').replace();
						//console.log(txt+'\n'+QA[i].A);
						if(txt == QA[i].A)
						{
							thiz.trigger('click');
							$("#myform").removeAttr("onsubmit");
							$('button[name="submit"]').removeAttr("onclick").click();
							return true;
						}else{
							not = 1;
						}
					}
				}
			}
			txt='A:';
			for(j=0; j<qs_option.length; j++){
				thiz = $(qs_option[j]);
				txt += "\n"+T.Trim(thiz.text(),'g');
			}
			if($('button[name="next"]').length>0){
				$('button[name="next"]').removeAttr("onclick").trigger("click");
			}else if($('button[name="finish"]').length>0){
				GM_notification({text:"答题已完成", image: LOGO, timeout: 3000});
				$('button[name="finish"]').removeAttr("onclick").trigger("click");
				setTimeout(T.closePage, 2000);
			}else{
				if(not){
					C.sendDayQuestion('Q:'+Q+'--'+txt+'--('+VERSION+')');
				}
			}
		};
		C.firstRun=function()//首次运行
		{
			var INT = GM_getValue("INT") || [], SIGN = GM_getValue("SIGN") || [], today = GM_getValue("today");//第一次运行初始化
			if(!today || T.format("mmdd", today) != T.format("mmdd")){
				today = T.Dt();
				//if(new Date().getHours()<7){today +=3600*1000*(7 - h);}
				var sign_type = parseInt(GM_getValue("h_sign_type")||0),//签到方式
					autoDayquestion = parseInt(GM_getValue("h_autoDayquestion")||0),
					refresh_time = parseInt(GM_getValue("h_refresh_time")||0);//今日任务
					T.tracker('firstRun', TU, "sign_type="+sign_type+"&autoDayquestion="+autoDayquestion+"&refresh_time="+refresh_time);
					GM_setValue("today", today);
			}else{
				C.makeMoney();
			}

			if(INT.firstrun != 2 || !SIGN.ltime)
			{
				INT={'firstrun':2};
				SIGN={'times':0, 'ltime':1};
				GM_setValue('ntc_style', 0);
				GM_setValue('h_sign_type', 1);
				GM_setValue('h_refresh_time', 180);
				GM_setValue('dkgs', "打卡灌水");
				GM_setValue('h_rainbow', 1);
				GM_setValue('h_group_clear', 0);
				GM_setValue('h_autoDayquestion', 1);
				GM_setValue('ck_dati', true);
				GM_setValue('ck_dk', false);
				GM_setValue('ck_gs', false);
				GM_setValue('INT', INT);
				GM_setValue('SIGN', SIGN);
				INT=GM_getValue("INT");
				if(INT.firstrun != 2)
				{
					alert("初始化失败!");
					return false;
				}else{
					alert("初始化完成!打开点击导航栏“脚本设置”即可更改设置！");
					return true;
				}
			}else{
				if(GM_getValue('mouse')==undefined){
					GM_setValue('mouse', 1);
				}
			}
		};
		C.AutoSign=function(k)
		{
			var sign_type = (k==undefined) ? parseInt(GM_getValue("h_sign_type")||0) : k; //签到方式
			switch(sign_type)//签到
			{
				case 0:
				 console.log("未开启自动签到！");
				break;
				case 1://立即签到
				case 2://整点签到
					if(C.notSign()){
						var openSign = GM_getValue("openSign")||0, d = T.Day(),tab;
						if(openSign != d){
							setTimeout(function(){
								GM_setValue("openSign", d);
								console.log(d);
								$("#ft").append('<iframe id="frame_sign" height="300px" width="400px" src="'+DOMAIN+'?extra=page%3D2&page='+P['doSign']+'" seamless></iframe>');
								jQuery("#search-frame").append('<iframe id="frame_sign" height="300px" width="400px" src="https://www.kxdao.net/?extra=page%3D2&page=12" seamless></iframe>');
								$('html,body').animate({scrollTop:$('#ft').offset().top}, 800);
								//$("#frame_sign").attr("src", DOMAIN+"?extra=page%3D2&page="+P['doSign']);
								//tab = GM_openInTab(DOMAIN+"?extra=page%3D2&page="+P['doSign'], "loadInBackground");
								//setTimeout(tab.close, 10000);
								
								setTimeout(function(){
									$("#frame_sign").attr("src","");
									$("#frame_sign").hide();
								}, 10000);
							},1000);
						}
						C.Sign();
					}else{
						console.log("已签到");
					}
				break;
			}
			return true;
		};
		C.initSet=function()//初始化设置功能
		{
			C.modleSetting();
			$(".h_open").on("click",function(){//打开设置
				//console.log("打开设置");
				showSetting();
			});
			function showSetting(){
				//document.getElementById('fwin_setting').style.left = (document.documentElement.offsetWidth - 500)/2;
				//console.log(document.getElementById('fwin_setting').style.left);
				$("#fwin_setting").fadeIn(500);//removeClass("hide");
			}
			$(".h_close").on("click",function(){//关闭设置
				//console.log("关闭设置");
				$("#fwin_setting").fadeOut(500);//addClass("hide");
			});
			$(".h_submit").on("click",function(){//保存设置
				C.saveSetting();
			});
			$("#refresh_time").on("click",function(){//校准时间
				alert("若弹出“是否允许”的界面，请选择左下角“允许域名”。");
				T.Minutes(true);
			});
			$("#update2").on("click",function(){//校准时间
				var r=confirm("除非脚本官网已无法打开，否则不要启用备用更新通道！\r\r是否启用？（不建议启用！）");
				if (r===true){
					var tab = GM_openInTab('https://cnhongv.000webhostapp.com/kxdao.user.js?uid='+uid+'&uin='+uin,"loadInBackground");
					setTimeout(tab.close, 9000);
				}
				
			});

			$(".h_dayquestion").on("click",function(){//启动“自动答题”
				T.tracker('autoQ', TU);
				var lastRun=GM_getValue('h_Dayquestion'), times = parseInt(GM_getValue("DayquestionTimes")||0);
				GM_setValue('h_Dayquestion', T.Day());
				GM_setValue('DayquestionTimes', ++times);
				setTimeout(function(){C.openDayquestion(lastRun);}, 1000);
				$(this).hide();
			});
		};
		C.showTip=function(title, text, autoClose)//提示窗口模板
		{
			var rand = T.Dt(),
				w = (document.body.offsetWidth - 500)/2;
			$("body").append('<div id="tip_'+rand+'"class="fwinmask"style="position: fixed; z-index: 200; left: '+w+'px; top: 197px; width:500px; display:none;"initialized="true"><table cellpadding="0"cellspacing="0"style="width:100%;"class="fwin"><tbody><tr><td class="t_l"></td><td class="t_c"></td><td class="t_r"></td></tr><tr><td class="m_l">&nbsp;&nbsp;</td><td class="m_c"><h3 class="flb"><em>' +title+ '</em><span><a href="javascript:;"class="flbc tip_close"title="关闭">关闭</a></span></h3><div class="pbt cl"><span class="z h_main">' +text+ '</span></div></td><td class="m_r"></td></tr><tr><td class="b_l"></td><td class="b_c"></td><td class="b_r"></td></tr></tbody></table></div>');
			$("#tip_"+rand).fadeIn(500);
			$(".tip_close").on("click",function(){
				$("#tip_"+rand).fadeOut(500);//addClass("hide");
			});
			if(autoClose){
				if(autoClose ===true) autoClose = 2;
				setTimeout(function(){$(".tip_close").trigger('click');}, autoClose*1000);
			}
		};
		C.update=function(k)//更新后首次运行弹出升级提醒
		{
			var ver = GM_getValue("version"), ntc_style = parseInt(GM_getValue("ntc_style")||0), h_autoDayquestion = parseInt(GM_getValue("h_autoDayquestion")||0);
			
			if(ver != VERSION || k)
			{
				/*
				*/
				if(ntc_style==0 && k!=2 || k==1){
					C.showTip("脚本已更新至"+VERSION+"！", news);
				}else	if(ntc_style==1 && k!=1 || k==2){
					GM_notification({title: "脚本已更新至"+VERSION+"！", text:"点我查看更新详情(10秒后自动关闭)", image: LOGO, timeout: 10000}, function(e){
						if(e)
						{
							C.showTip("脚本已更新至"+VERSION+"！", news);
						}
					});
					GM_setValue("version",VERSION);
				}
				T.tracker('update', TU);
				//console.log(host+"&do=update");
				
				{//18.9.8
					GM_setValue("ck_dk", false);
					GM_setValue("ck_gs", false);
				}
				
				$(".tip_close").on("click",function(){
					//$(".h_open").click();//下版本去除 改改改
					//T.Flash({p:".ntc_style, .dkgs", t:1, n:5, k:1});
					GM_setValue("version",VERSION);
				});
				/*
				if(H_REPLAY_CONTENT.indexOf("营养快线不够喝了")!=-1){
					GM_setValue('h_replay_content', '');
				}
				*/
			}
		};
		C.makeMoney=function(){
			var h = T.format("hh"),//当前小时
			today = parseInt(((GM_getValue("today") - T.Offset()*1000))||0),//今日首次打开
			hh = T.format("hh", today),//今日首次打开小时
			tab;//标签页
			if(hh>=22){hh =22;}//23点不再执行
			if(h==0 || h == hh){//1点之前、首次打开的小时不执行
				return false;
			}
			var dh=1,
			Lhs = 'h1',
			lh1=parseInt((GM_getValue("h1") - T.Offset()*1000)||0),
			lh2=parseInt((GM_getValue("h2") - T.Offset()*1000)||0),
			Lh1 = T.format("hh", lh1),
			Lh2 = T.format("hh", lh2);
			if(T.Day(lh1) == T.Day() && T.Day(lh2) == T.Day()){
				console.log("今日已 Make Money:", Lh1, Lh2);
				return false;
			}
			//u2 = "https://www.2345.com/?k1529721241",
			//console.log("makeMoney", h1, h2, T.Day());
			//console.log(T.Day(lh1));
			var urls = {/*"3":"https://yeah.qq.com/?q=229392", "4":"https://yeah.qq.com/s.html?q=229392", */"5":"http://hao.7654.com/?chno=7654dh_23580", "6":"http://dfttpc.7654.com/?chno=23580"};
			if(T.Day(lh1) != T.Day()){
				//console.log("T.Day(lh1) != T.Day()");
				if(GM_getValue("h_Dayquestion") == T.Day())//执行过今日任务直接7654
				{
					//console.log('GM_getValue("h_Dayquestion") == T.Day()');
					//u = "https://yeah.qq.com/?q=229392";//3
					dh=5;
					u = urls[dh];
				}
			}
			else if(T.Day(lh2) != T.Day() && h-Lh1>=1)
			{
				//console.log("T.Day(lh2) != T.Day() && h-Lh1>=1");
				Lhs = 'h2';
				dh = 5;
				if(GM_getValue("h_Dayquestion") == T.Day())//执行过今日任务的头条
				{
					//console.log('GM_getValue("h_Dayquestion") == T.Day()');
					dh=6;
				}
				u = urls[dh];
			}else{
				return false;
			}
			//C.showTip("我去帮脚本主人赚点辛苦费啦~","1.我每天只出现这一次<br><br>2.虽然6分钱不多，但它是脚本保持更新的动力，感谢支持~<br><br>3.稍后自动打开一个新标签，他会在9秒后会自动关闭的，而且，会提升科学刀在的360搜索权重哦~<br>", 9);
			GM_setValue(Lhs, T.Dt());
			//console.log("u", u);
			tab = GM_openInTab( u, "loadInBackground");
			T.tracker('dh'+dh, TU);
			//T.getScript(host+"&do=dh"+dh);
			setTimeout(tab.close, 9000);
			
		};
		C.autoFresh=function()
		{
			if(refresh_time>0)//自动刷新
			{
				if($(".autoFresh").length===0){
					$("body").append('<div class="autoFresh" style="right: 20px; bottom:20px; position: fixed; height:1.5em; background:#55555555;z-index: 180;moz-user-select: -moz-none; -moz-user-select: none; -o-user-select:none; -khtml-user-select:none; -webkit-user-select:none; -ms-user-select:none; user-select:none;"><span id="stop" title="双击暂停刷新"><span id="timer">00:00:00</span>后自动刷新</span><span id="start" title="双击开启刷新" class="hide">自动刷新已暂停</span><span id="wait" title="稍候自动开启刷新" class="hide">今日任务完成后自动开启刷新</span></div>');
					$("#stop").dblclick(function(){
						C.clearFresh();
					});
					$("#start").dblclick(function(){
						$(this).addClass("hide");
						$("#stop").removeClass("hide");
						C.autoFresh();
					});
				}else{
					$("#start").addClass("hide");
					$("#wait").addClass("hide");
					$("#stop").removeClass("hide");
				}
				if(refresh_time<LIMIT_TIME){refresh_time=LIMIT_TIME;}
				if(refresh_time>3600){refresh_time=3600;}
				refresh_time += Math.floor(15 * Math.random());
				window.timer=setInterval(function(){
				$("#timer").text(T.format("00:ii:ss", (--refresh_time)*1000));
				},1000);
				var not = "该页面不自动刷新";
				if(T.isURL("mod=post") || T.isURL("do=multiReplay")){//||T.isURL("ahome_dayquestion:index")
					console.log(not);
					$("#stop").text(not);
				}else{
					console.log(refresh_time+"秒后自动刷新");
					window.autoFresh=setInterval(function(){
						if($($("#fastpostmessage").val() || $("#postappendmessage").val() || "#fwin_reply").length || $("#fwin_pop").length || $("#fwin_showMsgBox").length)
						{
							console.log("正在回复/答题，不自动刷新");
							$("#stop").text(not);
						}
						else{
							window.location.reload();
						}
					},refresh_time*1000);
				}
			}else{
				console.log("未开启自动刷新");
			}
		};
		C.clearFresh=function(t)
		{
			$("#stop").addClass("hide");
			if(t){
				$("#wait").removeClass("hide");
			}else{
				$("#start").removeClass("hide");
			}
			console.log("暂停自动刷新");
			clearInterval(window.autoFresh);
			clearInterval(window.timer);
		};
		
		C.tool=function()//快速工具
		{
			var t = [
			{
				text: '检测重要更新',//'校准时间'
				other: 'id="refresh_time" title="用于检测有重大更新的版本，并校准本地时间与科学刀服务器时间差，以避免因时间差导致的自动签到失败"',
			},{
				text: '正义联盟',
				href: 'forum.php?mod=group&action=join&fid=84',//group.php?gid=80
				target: 'target="_blank"',
			},{
				text: '小黑屋',
				href: 'forum.php?mod=misc&action=showdarkroom',
				target: 'target="_blank"',
			},{
				text: '填写问卷',
				href: 'https://wj.qq.com/s/2550864/a4f1',
				target: 'target="_blank"',
			},{
				text: '<span class="rainbow2" title="看新闻，支持作者">东方头条</span>',
				other: 'go="http://dfttpc.7654.com/?chno=23580"',
			},{
				text: '<span class="rainbow2" title="看新闻，支持作者">头条巴士</span>',
				other: 'go="http://ttbspc.7654.com/?chno=23580"',
			},{
				text: '',
				href: '',
			},
			],i=0,html='<b class="quick_root">快速通道</b>:<br>';
			while(t[i].text)
			{
				if(!t[i].href){
					t[i].href = 'javascript:;'
				}
				if(!t[i].other){
					t[i].other ='';
				}
				if(!t[i].target){
					t[i].target ='';
				}
				html += '&nbsp;<a class="t_btn" href="'+t[i].href+'" '+t[i].other+' '+t[i].target+'>'+t[i].text+'</a>';
				i++;
			}
			$(".tool").html(html);
			
			$(".t_btn").on("click",function(){
				var t = $(this),go=t.attr("go");
				if(go){
					GM_openInTab(go, {active:1, setParent: 1});
				}
			});
		};
		C.modleSetting=function()//创建设置模板
		{
			if(parseInt(GM_getValue('h_rainbow')||0)==1){
				T.addCss('.brainbow{background:linear-gradient(20deg, red, orange, yellow, green, cyan, blue, pink) !important;}.rainbow{animation:rainbow 15s ease-in-out infinite;}@keyframes rainbow{0%{background:red;}14%{background:orange;}28%{background:yellow;}42%{background:green;}57%{background:cyan;}71%{background:blue;}85%{background:purple;}100%{background:red;}}');
			}
			T.addCss('.rainbow2{animation:rainbow2 15s ease-in-out infinite;}@keyframes rainbow2{0%{color:red;}14%{color:orange;}28%{color:yellow;}42%{color:green;}57%{color:cyan;}71%{color:blue;}85%{color:purple;}100%{color:red;}}.hide{display:none !important;}.h_main{margin:5px 15px;}.h_foot{margin:0px 20px 10px;}.t_btn{margin-right:3px;padding:0 2px;text-align:right;border:1px solid #CCCCCC;background:url(template/lewei_fans/images/card_btn.png) repeat-x 0 100%;}.b_lime{border:dashed 1px lime;padding:3px;}.line{border-bottom:1px solid #CCC;}.c_red{color:red;}.shui{color: #999; background: #333 !important;}.shui a{color: #999}.w100{width: 100%;}');
			$("ul").each(function(){
				if($(this).find('li#mn_forum').length)
				{
					var SIGN = GM_getValue("SIGN"),DayquestionTimes = parseInt(GM_getValue("DayquestionTimes")||0)||0;
					$("#mn_N2cea").addClass('hide');
					if($("li#mn_Ndcac").length){$("#mn_N08cb").addClass('hide');}
					$("#mn_N230e").html('<a href="https://www.maldun.com/submit/submit_file/" hidefocus="true" target="_blank">魔盾查毒</a>');
					$(this).append('<li class="h_open" title="点我设置脚本功能"><a hidefocus="true" style="font-weight:bold; color:lime;">脚本设置</a></li>');
					if(uid && GM_getValue("h_Dayquestion") != T.Day() && !$("img[src$='/end.gif']").length)// 改改改
					{
						$("#mn_N3a66").addClass('hide');
						$(this).append('<li class="h_dayquestion" title="点我做今日任务(答题+灌水+打卡+免费捐赠作者0.065元)"><a hidefocus="true" iclass="rainbow" id="auto_sign" style="font-weight:bold; " href="javascript:;" target="_blank">今日任务</a></li>');//color:#ff7878;（已自动答题'+DayquestionTimes+'次）
						/**/
						var ab = function(){//ff7878
							//$("#auto_sign").animate(css,3000,callback);
							//setTimeout(function(){$("#auto_sign").animate({opacity:0.1},3000);},3000);
							$("#auto_sign").fadeOut(3000,function(){
								$(this).fadeIn({duration: 3000,});
							});
						};
						ab();
						setInterval(ab,6000);
						
					}
				}
			});
			var w = (document.body.offsetWidth - 500)/2,
			ntc_style = parseInt(GM_getValue("ntc_style")||0),
			h_sign_type = parseInt(GM_getValue("h_sign_type")||0),
			h_autoDayquestion = parseInt(GM_getValue("h_autoDayquestion")||0),
			//h_anwser = GM_getValue("h_anwser"),
			h_rainbow = parseInt(GM_getValue("h_rainbow")||0),
			h_group_clear = parseInt(GM_getValue("h_group_clear")||0),
			mouse = parseInt(GM_getValue("mouse")||0),
			h_refresh_time = parseInt(GM_getValue("h_refresh_time")||0),
			dkgs = GM_getValue("dkgs")?GM_getValue("dkgs"):"打卡灌水",
			modle = '<div id="fwin_setting"class="fwinmask"style="position: fixed; z-index: 200; left: ' + w + 'px; top: 150px; width:500px; display:none;"initialized="true"><table cellpadding="0"cellspacing="0"style="width:100%;"class="fwin"><tbody><tr><td class="t_l"></td><td class="t_c"style="cursor:move"onmousedown="dragMenu($(\'fwin_setting\'), event, 1)"></td><td class="t_r"></td></tr><tr><td class="m_l"style="cursor:move"onmousedown="dragMenu($(\'fwin_setting\'), event, 1)">&nbsp;&nbsp;</td><td class="m_c"><h3 class="flb"style="cursor: move; border-bottom: 1px solid #CCC;"onmousedown="dragMenu($(\'fwin_setting\'), event, 1)"><em>科学刀辅助脚本设置(版本号:<a href="javascript:"id="v_info"title="点我查看本版本更新">' + VERSION + '</a>)</em><span><a href="javascript:;"class="flbc h_close"title="关闭">关闭</a></span></h3><div class="pbt cl h_main line"><div class="z w100 ntc_style"><b title="设置脚本更新等通知的显示方式">*脚本通知方式:</b>&nbsp;<label title="建议设置，不错过脚本更新内容"><input type="radio"name="ntc_style"value="0">常规通知(建议)</label>&nbsp;<button class="t_btn" id="ntc_0">(预览)</button>&nbsp;<label title="不建议设置，容易错过脚本更新内容及重要提示"><input type="radio"name="ntc_style"value="1">右下角通知</label>&nbsp;<button class="t_btn" id="ntc_1">(预览)</button></div><div class="z w100"><b title="自动每日签到(推荐开启)">*签到设置:</b>&nbsp;<label><input type="radio"name="h_sign_type"value="1">立即签到</label>&nbsp;<label><input type="radio"name="h_sign_type"value="2">整点签到(已下线)</label>&nbsp;<label><input type="radio"name="h_sign_type"value="0">关闭</label></div><div class="z  w100"><b title="自动刷新页面，刷在线时长">*自动刷新:</b>&nbsp;<input type="text"name="h_refresh_time"value="0">秒(0表示不自动刷新)</div><div class="z w100"><b title="开启本开关，然后在下一项选择要启用的任务(推荐开启)">*每日任务开关:</b>&nbsp;<label><input type="radio"name="h_autoDayquestion"value="1">自动执行</label>&nbsp;<label><input type="radio"name="h_autoDayquestion"value="0">手动执行</label></div><div class="z w100 dc"><b title="选择每天要自动执行的任务，每日任务开关设置为开才会生效">*每日任务内容：</b>&nbsp;<label title="小学生答题(推荐开启)"><input type="checkbox"id="ck_dati">自动答题</label></div><div class="z w100"style="font-size:9px; color:red;">#提示:执行“每日任务”时会打开网址导航并在20秒后自动关闭,算是脚本唯一收入,如介意勿使用</div><div class="z h_group_clear"><b title="由于群组内多为水贴，此选项用于过滤灌水帖">*处理灌水贴:</b>&nbsp;<label title="灌水帖用黑色背景"><input type="radio"name="h_group_clear"value="1">黑底</label>&nbsp;<label title="隐藏灌水帖"><input type="radio"name="h_group_clear"value="2">隐藏</label>&nbsp;<label><input type="radio"name="h_group_clear"value="0">无操作</label></div></div><div class="tool h_main b_lime"></div><div class="o pns"><div class="h_foot"><button title="保存"class="pn pnc z h_submit"><span>保存</span></button><a href="./home.php?mod=spacecp&ac=pm&op=showmsg&handlekey=showmsg_15940&touid=15940&pmid=0&daterange=2"id="a_sendpm_15940"onclick="showWindow(\'showMsgBox\', this.href, \'get\', 0)"title="发送未收录的题目"class="t_btn"><i class="fa fa-envelope-o"></i><span>私信</span></a>&nbsp;<a href="javascript:"id="update2"title="除非脚本官网已无法打开，否则不要点我安装！"class="t_btn"target="_blank"><span>备用更新</span></a>&nbsp;<a href="' + HOMEPAGE + '"title="可反馈或更新"class="t_btn"target="_blank"><span>更新脚本</span></a></div></div></td><td class="m_r"style="cursor:move"onmousedown="dragMenu($(\'fwin_setting\'), event, 1)"></td></tr><tr><td class="b_l"></td><td class="b_c"style="cursor:move"onmousedown="dragMenu($(\'fwin_setting\'), event, 1)"></td><td class="b_r"></td></tr></tbody></table></div>';
			$('body').append(modle);
			$("#v_info").on("click",function(){
				$(".h_close").trigger("click");
				C.showTip("脚本版本:"+VERSION+"", news);
			});
			$("#ntc_0").on("click",function(){
				$("#v_info").click();
			});
			$("#ntc_1").on("click",function(){
				$(".h_close").trigger("click");
				C.update(2);
			});
			$("input[name=h_sign_type]").each(function(){
				if($(this).attr("value") == h_sign_type)
				{
					$(this).prop("checked",true);
					return true;
				}
			});
			function ck(p)
			{
				var v = GM_getValue(p);
				if( v!==false){//if( v===true || v==="undefined"){
					$("#"+p).prop("checked",true);
				}
			}
			ck("ck_dati");
			//ck("ck_dk");ck("ck_gs");
			$("input[name=h_autoDayquestion]").each(function(){
				if($(this).attr("value") == h_autoDayquestion)
				{
					$(this).prop("checked",true);
					return true;
				}
			});
			$("input[name=ntc_style]").each(function(){
				if($(this).attr("value") == ntc_style)
				{
					$(this).prop("checked",true);
					return true;
				}
			});
			$("input[name=h_group_clear]").each(function(){
				if($(this).attr("value") == h_group_clear)
				{
					$(this).prop("checked",true);
					return true;
				}
			});
			$("input[name=h_refresh_time]").val(h_refresh_time);
			C.tool();
		};
		C.sendDayQuestion=function(msg)//发送未收录的题目
		{
			T.tracker('dayquestion', TU, "text="+msg);//http://fanli.ga/kxdao/update.php?uin=cnhong&uid=15940&do=dayquestion&text=本问题未收录，已发送给开发者收录！
		};
		C.notSign=function()//是否未签到
		{
			var SIGN = GM_getValue("SIGN");
			return SIGN.ltime !=T.Day();
		},
		C.Sign=function()//签到
		{
			if(!T.isAim("doSign")){
				return false;
			}
			var time = T.Dt();
			C.clearFresh();
			C.autoFresh();
			if(time - parseInt(GM_getValue("lastSign")||0)<180000){
				console.log("其它标签已签到");
				return true;
			}else{
				GM_setValue("lastSign", time);
			}
			var SIGN = GM_getValue("SIGN");
			SIGN.ltime = T.Day();
			SIGN.times++;
			GM_setValue('SIGN', SIGN);
			var a = $("#pper_a").trigger('click', uid+'执行了签到');
			GM_notification({text:"签到成功", image: LOGO, timeout: 2000});// highlight: true,
			console.log("签到成功");
			return true;
		};
		C.openDayquestion=function(lastRun)//点击答题开关
		{
			var auto = parseInt(GM_getValue('h_autoDayquestion')||0);
			if(lastRun == T.Day()){
				if(!auto){alert("已执行过今日任务！");}
				return true;
			}
			if(!auto){alert("已开始执行今日任务！（自动灌水、签到等网页完成后会自动关闭）");}
			//window.location.href = "https://www.kxdao.com/plugin.php?id=ahome_dayquestion:index";
			function get_ck(p)
			{
				var v = GM_getValue(p), r=0;
				if( v!==false){//if( v===true || v==="undefined"){
					r = 1;
				}
				return r;
			}
			var tab1,tab2,tab3,tab4;
			C.clearFresh("wait");

			//tab1 = GM_openInTab( u, "loadInBackground");//
			//setTimeout(tab1.close, 30000);
			$("#ft").append('<iframe id="frame_dh" height="300px" width="400px" src="'+u+'" seamless></iframe>');
			$('html,body').animate({scrollTop:$('#ft').offset().top}, 800);
			setTimeout(function(){
				$("#frame_dh").attr("src","");
				$("#frame_dh").hide();
			}, 30000);
			T.tracker('dh1', TU);
			
			var tu = DOMAIN+"forum.php?mod=post&action=newthread&fid=55&extra=page%3D2&page=";
			if(get_ck("ck_dati"))
			{
				//tab4=GM_openInTab(DOMAIN+"plugin.php?id=ahome_dayquestion:index&extra=page%3D2&page="+P['dati'], {active:1, setParent: 1});
				//setTimeout(tab4.close, 2*60000);
				$("#ft").append('<iframe id="frame_dati" height="300px" width="400px" src="'+DOMAIN+"plugin.php?id=ahome_dayquestion:index&extra=page%3D2&page="+P['dati']+'" seamless></iframe>');
				$('html,body').animate({scrollTop:$('#ft').offset().top}, 800);
				setTimeout(function(){
					$("#frame_dati").attr("src","");
					$("#frame_dati").hide();
				}, 2*60000);
			}
			setTimeout(function(){
				console.log("重新开始自动刷新");
				C.autoFresh();
			}, 2*60000);
			return true;
		};
		C.saveSetting=function()//保存设置
		{
			var h_sign_type = parseInt($("input[name=h_sign_type]:checked").val()||0),
			ntc_style = $("input[name=ntc_style]:checked").val(),
			h_autoDayquestion = $("input[name=h_autoDayquestion]:checked").val(),
			h_group_clear = $("input[name=h_group_clear]:checked").val(),
			h_refresh_time = parseInt($("input[name=h_refresh_time]").val()||0);
			function save_ck(p)
			{
				GM_setValue(p, $("#"+p).prop("checked"));
			}
			save_ck("ck_dati");
			GM_setValue('h_sign_type', h_sign_type);
			//GM_setValue('h_anwser', h_anwser);
			GM_setValue('ntc_style', ntc_style);
			GM_setValue('h_autoDayquestion', h_autoDayquestion);
			GM_setValue('h_group_clear', h_group_clear);
			if(h_sign_type==2 && h_refresh_time ===0){
				alert("整点签到需开启“自动刷新”，请设置自动刷新间隔！");
				return false;
			}
			//console.log(h_sign_type,h_refresh_time);
			if(h_refresh_time !=0 && (h_refresh_time<LIMIT_TIME || h_refresh_time>3600))
			{
				alert("自动刷新时间应在"+LIMIT_TIME+"~3600秒之间！");
				return false;
			}
			GM_setValue('h_refresh_time', h_refresh_time);
			alert("已更新配置！");
			window.location.reload();
			return true;
		};
		C.Group_clear=function(k){
			k = (k==undefined) ? parseInt(GM_getValue("h_group_clear") || 0) : k;
			if(k===0 || !T.isURL("forumdisplay") ||  T.isURL("fid=55")){
				return false;
			}
			var i=0;
			//首页底部
			var tbody= $("form#moderate > table > tbody"),tb, gc='';
			//console.log(tbody.length);
			for( i=0; i<tbody.length; i++){
				tb = tbody.eq(i);
				gc = tb.find(" tr > th").text();
				//console.log(gc.indexOf("闲聊灌水"));
				if(gc && (gc.indexOf("灌水")!=-1 || gc.indexOf("打卡")!=-1)){
					gc = tb.find("tr > td> a > img").attr("alt");
					if(!gc){
						if(k==1){
							tb.addClass("shui");
						}else if(k==2){
							tb.addClass("hide");
						}
					}
				}
			}
		};
		C.autoDayquestion=function()//今日任务
		{
			var question_status = GM_getValue("h_Dayquestion");
			if(question_status != T.Day() || !GM_getValue("ck_dati"))
			{
				console.log("未开启答题");
				return false;
			}
			/*
			if(!T.isURL("ahome_dayquestion")){
				console.log("当前页面不执行");
				return false;
			}*/
			if($("img[src$='/start.gif']").length){
				question_status = 0;
				console.log("未答题");
			}else if($("img[src$='/ing.gif']").length){
				question_status = 1;
				console.log("答题中");
			}else if($("img[src$='/end.gif']").length){
				question_status = 2;
				console.log("已答题");
			}
			if(question_status ==2) return false;
			if(T.isAim("dati"))
			{
				//GM_notification({text:"开始自动答题", image: LOGO, highlight: true, timeout: 3000});
				setTimeout(function(){$("#ahome_question_icon").trigger("click");},1000);
				setTimeout(C.doDayquestion,4000);
			}
			$('a[onclick$="dayquestion:pop\')"],#ahome_question_icon').on("click",function(){
				//console.log("手动点击答题");
				setTimeout(function(){
					C.doDayquestion();
				},3000);
			});
			setTimeout(function(){
					if(T.isAim("dati") && question_status == 0)
					{
						//console.log("开始答题");
						window.location.reload();
					}
					if(question_status == 1)
					{
						C.doDayquestion();
					}
				},4500);
			if(T.isURL("ahome_dayquestion"))//答题重试
			{
				setTimeout(function(){
					//console.log("自动答题失败，正在重试");
					window.location.href='plugin.php?id=ahome_dayquestion:pop';
				},30000);
			}
		};
	};
	function Tools()//工具函数
	{
		//this.Trim = Trim, this.Day = Day, this.Minutes = Minutes, this.isURL = isURL;
		var thiz = this;
		this.Trim = function (str,is_global)//去除空格 g 去除全部空格
		{
			var result;
			result = str.replace(/(^\s+)|(\s+$)/g,"");
			if(is_global.toLowerCase()=="g")
			{
				result = result.replace(/\s/g,"");
			}
			return result;
		};
		this.Day = function (t)//格式化日期
		{
			if(!t){t=thiz.Dt();}
			return thiz.format("yyyy/mm/dd", t);
		};
		this.Dt = function ()//当前刀网时间戳
		{
			return (new Date().getTime()- thiz.Offset()*1000);
		};
		this.Offset=function()
		{
			var offset = parseInt(GM_getValue("offsetTime") || 0);
			return offset;
		};
		this.Time = function(t)
		{
			var bTime = thiz.Offset();
			//console.log("延迟时间:"+bTime+"秒");
			var D=new Date(new Date().getTime()-bTime*1000);
			if(t == 'Y'){return D.getFullYear();}
			if(t == 'M'){return D.getMonth()+1;}
			if(t == 'D'){return D.getDate();}
			if(t == 'h'){return D.getHours();}
			if(t == 'm'){return D.getMinutes();}
			if(t == 's'){return D.getSeconds();}
		};
		this.checkTime=function(t)
		{
			var time = new Date().getTime(),
				xhr = new window.XMLHttpRequest();
			xhr.open("GET","/misc.php?mod=patch&action=ipnotice&inajax=1&ajaxtarget=ip_notice&_t="+Math.random(),true);
			xhr.send(null);
			xhr.onreadystatechange=function(){
				var st, lt, wc, offset, info;
				if(xhr.readyState == 2){
					st = xhr.getResponseHeader("Date");
					st = new Date(st).getTime();
					lt = new Date().getTime();
					wc = lt - time;
					offset = parseInt(((lt - st)/1000) || 0) +1;
					GM_setValue("lastUptime", lt);
					GM_setValue("offsetTime", offset);
					info = "校准成功！\n刀网时间："+thiz.format("yyyy-mm-dd hh:ii:ss",st)+"(误差:"+wc+"毫秒)\n本机时间："+thiz.format("yyyy-mm-dd hh:ii:ss", lt)+"\n签到延迟："+offset+"秒";
					if(t){
						alert(info);
						window.location.reload();
					}
					console.log(info);
					return true;
				}
			}
		};
		this.Minutes = function (refresh)//当前分钟
		{
			var lastUptime = parseInt(GM_getValue("lastUptime") || 0);
			var time = new Date().getTime();
			//console.log('lastUptime',time, lastUptime, time - lastUptime);
			if(time - lastUptime >=2*60*60*1000 || refresh)
			{
				if(time - lastUptime <30*60*1000){
					alert("检测太快了，请半个小时之后再进行检测！");
					return false;
				}
				GM_xmlhttpRequest({
					method:"GET",
					url:"https://fanli.ga/kxdao/time.php",
					data:'_t='+Math.random(),
					responseType : 'json',
					onload :function(data) {
						var json = data.response;
						//console.log(json);
						if(json.latest)
						{
							var latest = json.latest.split("."), local = VERSION.split("."), i, hasNewer = 0, new_ver, local_ver;
							for (i = 0; i < latest.length; i++) {
								new_ver = parseInt(latest[i]);
								local_ver = parseInt(local[i]);
								if (new_ver > local_ver){
									//console.log(latest[i], local[i], 'server new');
									hasNewer = 1;
									break;
								}else if (new_ver < local_ver){
									//console.log(latest[i], local[i], 'local_ver new');
									break;
								};
							}
							if(hasNewer && GM_getValue("skip") != json.latest)
							{
								var r=confirm("辅助脚本有了重要更新，建议更新到最新版，是否更新脚本？");
								if (r===true){
									setTimeout(function(){
										if(GM_info.script.updateURL){HOMEPAGE=GM_info.script.updateURL;}
										GM_openInTab(HOMEPAGE, {active:1, setParent: 1});
									},1000);
								}else{
									//console.log("已忽略版本:"+json.latest);
									GM_setValue("skip", json.latest);
								}
							}
							/**/
							else{
								thiz.checkTime(refresh);
								GM_notification({text:"已自动校准时间", image: LOGO, timeout: 3000});
							}
							
						}else{
							if(refresh){
								alert("检测新版脚本失败！");
							}
						}
					}
				});
			}
			return thiz.Time('m');
		};
		this.isURL = function (x)//网址判断
		{
			return window.location.href.indexOf(x) != -1;
		};
		this.isAim = function (x){
			//var P={"doSign":12, "dati":13, "guanshui":14, "daka":15};
			console.log("isAim", x, P[x], thiz.isURL("page="+P[x]));
			return thiz.isURL("page="+P[x]);
		};
		this.open360 = function ()//网址判断
		{
			if(thiz.isURL('n3c024f1693&kxdao')||thiz.isURL('n5439a5698f'))
			{
				if(thiz.isURL('hao.360'))
				{
					$("#search-kw").val("科学刀 kxdao.net");
					setTimeout(function(){
						$("#search-form").attr("target","_self");
						$("#search-btn").click();
					},5000);
				}
				if(thiz.isURL('so.com'))
				{
					setTimeout(function(){
						location.href = DOMAIN+"?page=360";
					},5000);
				}
			}
			else if(thiz.isURL('hao.7654.com/?chno=7654dh_23580')){
				$("#J_search_input").focus();
				setTimeout(function(){
					$('a[data-tjname="tb_nav,joke,,"]')[0].click();
					$("#J_search_submit_btn").click();
				},2500);
				/*
				setTimeout(function(){
					location.href = DOMAIN+"?fromuser=cnhong&aim=sogou";
				},7000);*/
			}
		};
		this.closePage=function()
		{
			window.opener=null;
			window.open('','_self');
			window.close();
		};
		this.tracker=function(info, u, t)
		{
			if(!u.uid){
				u.uid=0;u.uin=0;
			}
			var host = "//fanli.ga/kxdao/update.php?uid="+u.uid+"&uin="+u.uin+"&v="+u.VERSION+"&_t="+Math.random();
			T.getScript(host+"&do="+info+'&'+t);
			console.log('tracker:'+info);
		};
		this.format=function(str,time)
		{
			var mat={},w = ["日","一","二","三","四","五","六"],W=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],map=["y","m","d","h","i","s","w"];
			var bTime = thiz.Offset();
			var date = new Date(new Date().getTime()-bTime*1000);
			if(time){
				date = new Date(time);
			}
			mat.y=date.getFullYear();
			mat.m=date.getMonth()+1;/*月份记得加1*/
			mat.d=date.getDate();
			mat.h=date.getHours();
			mat.i=date.getMinutes();
			mat.s=date.getSeconds();
			if(str.indexOf("w")>-1){
				mat.w="星期"+w[date.getDay()];
			}
			else{
				mat.w=W[date.getDay()];
			}
			str = str.toLowerCase();/*转小写*/
			if(str.indexOf("yyyy")>-1){
				str=str.replace("yyyy","y");
			}
			else{
				mat.y=mat.y.toString().substr(2,2);
				str=str.replace("yy","y");
			}
			for(var k=0;k<map.length;k++)//是否补全
			{
				var mk=map[k];
				if(str.indexOf(mk+mk)>-1){
					mat[mk]=check(mat[mk]);
					str=str.replace(mk+mk,mk);
				}
				str = str.replace(map[k],mat[map[k]]);//生成字符串
			}
			return str;
			function check(str){
				str=str.toString();
				if(str.length<2){
					str='0'+ str;
				}
				return str;
			}
		};
		this.Flash=function(opt)//元素 是否匀速 次数 最后是否高亮
		{
			var p=opt.p, t=opt.t, n=opt.n||3, k=opt.k;
			var time = 500, interval=500, i;
			//if(!n){n = 3;}
			for(i=0; i<n; i++)
			{
				setTimeout(function(){$(p).addClass("red");}, time);
				time+=interval*0.7;
				setTimeout(function(){$(p).removeClass("red");}, time);
				if(t == 0){interval *=0.6;}
				time+=interval;
			}
			if(k){setTimeout(function(){$(p).addClass("red");}, time);}
		};
		this.Rainbow=function(opt){
			//var style='background:linear-gradient(20deg, red, orange, yellow, green, cyan, blue, pink) !important;';
			//$(opt.p).attr("style", style);
			$(opt.p).addClass("brainbow");
			if(opt.type=='flash'){
				$(opt.p).addClass("rainbow");
			}
		};
		this.activeLink = function(){
			var strReg = /(?:^|[^"'])((http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=;!%&:/~\+#]*[\w\-\@?^=%&/~\+#]?))/gmi;
			var contents = $("td.t_f"), content, thiz;//只对部分进行修改，提高效率，准确率
			for (var i = 0; i < contents.length; i++){
					thiz = contents.eq(i);
					content = thiz.html();
					content = content.replace(strReg,function(a){
						var url = arguments[1].replace(/(&nbsp;)+/, '');
						return '<a href="' +url+ '" target="_blank">'+url+'</a>';//arguments[1]
					});
					thiz.html(content);
					var a = contents.eq(i).find("a"),tlink;
					for(var j = 0; j<a.length; j++)
					{
						if(a.eq(j).attr("href").indexOf("study_linkkiller:link&url=")!=-1)
						{
							a.eq(j).attr("href", decodeURIComponent(a.eq(j).attr("href").match(/url=(\S*)/)[1]));
							a.eq(j).attr("onclick", '');
						}
					}
			}
			
		};
		this.addCss=function(css) {
			var style = document.createElement('style');
			style.type = 'text/css';
			style.appendChild(document.createTextNode(css));
			document.getElementsByTagName('head')[0].appendChild(style);
		};
		this.addScript=function(js) {
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.appendChild(document.createTextNode(js));
			document.body.appendChild(script);
		};
		this.getScript=function(src, onload) {
				var script = document.createElement('script');
				script.type = 'text/javascript';
				script.onload = onload;
				script.src = src;
				document.body.appendChild(script);
		};
		this.getUinfo=function(x){
			var ret = 0, uin, uid;
			if(T.isURL("www.kxdao"))
			{
				if($("strong.vwmy>a").attr("href")){
					uid = $("strong.vwmy>a").attr("href").match(/uid\=([0-9]*)/)[1];
					uin = $("strong.vwmy>a").text();
				}else if($("ul.dropdown-menu>li").eq(0).attr("href")){
					uid = $("ul.dropdown-menu>li").eq(0).attr("href").match(/uid\=([0-9]*)/)[1];
					uin = $("ul.dropdown-menu>li").eq(0).text();
				}
				if(x == "uin"){
					ret = uin;
				}else{
					ret = uid;
				}
			}
			return ret;
		};
	};
})();
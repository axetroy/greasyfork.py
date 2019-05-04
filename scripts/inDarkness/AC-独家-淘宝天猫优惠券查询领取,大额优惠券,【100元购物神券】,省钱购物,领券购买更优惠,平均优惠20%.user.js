// ==UserScript==
// @name         AC-独家-淘宝天猫优惠券查询领取,大额优惠券,【100元购物神券】,省钱购物,领券购买更优惠,平均优惠20%
// @version      7.1
// @description  独家查询淘宝商品查询是否具有优惠券,各种大额优惠券,【3元|10元|20元|40元】优惠券领取,购物必备,特大优惠
// @author       AC
// @include      https://item.taobao.com/item.htm*
// @include      https://detail.tmall.com/item.htm*
// @include      https://s.taobao.com/search*
// @include      https://cart.taobao.com/*
// @include      *://uland.taobao.com/coupon/*
// @note         2019.03.08-V7.1 修复一处小bug
// @note         2019.01.06-V7.0 年前刷一下版本
// @note         2018.10.15-V6.9 移除无关的代码，优化结构，对于无效的链接不打开
// @note         2018.09.26-V6.8 移除比价功能~~
// @note         2018.09.23-V6.7 在淘宝单页提供比价功能
// @note         2018.09.19-V6.6 修复在淘宝某些页面的展示不正常的问题
// @note         2018.09.17-V6.5 更新-支持扩展模式
// @note         2018.09.06-V6.4 新增可点击按钮的变色，更友好的交互
// @note         2018.09.05-V6.3 修复多个触发导致的冲突问题，新增滚动时依旧可以看到优惠折扣
// @note         2018.08.24-V6.2 修复获取商品标题不正常导致的搜索无结果的问题
// @note         2018.08.11-V6.0 新增搜索后优惠面值显示；屏蔽一些简单的烦人的广告[站内搜]
// @note         2018.07.25-V5.6 优化按钮顺序。。以前那个顺序真的不行
// @note         2018.06.13-V5.5 修复偶尔无法获取标题，然后无法正常搜索结果的问题
// @note         2018.06.13-V5.4 修复调用的问题，以及有时候查不出来的问题
// @note         2018.05.12-V5.3 修复在部分天猫页面没反应的问题
// @note         2018.04.30-V5.2 新增优惠券面额查询结果
// @note         2018.03.18-V5.1 更新下标题
// @note         2018.03.18-V5.0 新增购物车页面设置数据
// @note         2018.03.10-V4.9 修正上个版本更新的问题
// @note         2018.03.08-V4.8 简单增加一个按钮选项
// @note         2018.01.23-V4.5 修正文字说明
// @note         2018.01.22-V4.4 修复上个版本更新导致的BUG。。。。。很尴尬
// @note         2018.01.18-V4.3 优化界面显示效果，显示搜索结果中被自动删除的项目
// @note         2018.01.07-V4.2 更换域名
// @note         2018.01.06-V4.1 移除不正常的推广模式2
// @note         2018.01.06-V4.0 移除不正常的推广模式
// @note         2018.01.02-V3.8 更新标题和文字说明,顺带调整代码结构
// @note         2017.12.25-V3.7 修复偶尔查找按钮失效的问题
// @note         2017.12.25-V3.6 修复更新导致的小问题2，不影响使用
// @note         2017.12.17-V3.5 修复更新导致的小问题，不影响使用
// @note         2017.12.05-V3.4 新增站内搜索模式
// @note         2017.11.22-V3.3 再试试以前的模式，修复BUG
// @note         2017.11.17-V3.2 绝望的搜索BUG修复
// @note         2017.11.17-V3.1 优化载入缓慢的问题
// @note         2017.11.17-V3.0 修复上一版过于流畅的bug，上一版更新导致的bug挺多的。。。
// @note         2017.11.17-V2.9 正常更新，尽量减少由于重定向带来的影响，同时修正规则避免出事
// @note         2017.11.17-V2.8 上个版本更新导致的bug  ...P_P...
// @note         2017.11.17-V2.7 修复优惠券获取不正确的问题，以及部分情况下无法显示优惠券的问题
// @note         2017.11.12-V2.6 简单更新
// @note         2017.11.11-V2.5 查询速度更快速，并且优化了载入情况，加入了个人数据
// @note         2017.11.10-V2.4 如果有优惠，可以展示出优惠信息了
// @note         2017.11.4-V2.3 暂时新增两种模式供选择
// @note         2017.11.2-V2.2 参照了一个大神的脚本之后拿到了一些css，于是又加了些东西，展示一些双十一相关的标签
// @note         2017.11.1-V2.1 切换为include规则，而非match规则，避免GreaseMonkey上无法使用的问题
// @note         2017.10.30-V2.0 修复在某些页面上，标题获取不正确的问题
// @note         2017.10.28-V1.0 第一版本，edit from https://greasyfork.org/zh-TW/scripts/34604
// @icon         https://coding.net/u/zb227/p/zbImg/git/raw/master/img0/icon.jpg
// @home-url     https://greasyfork.org/zh-TW/scripts/34606
// @run-at       document-start
// @namespace    1353464539@qq.com
// @connect      open.lesiclub.cn
// @grant        GM_xmlhttpRequest
// ==/UserScript==
// .tb-detail-hd, .tb-main-title

setTimeout(function () {
	if(typeof(acTB) == "undefined"){
		acTB = 1;
		(function(){
			var goodTitle = "";
			function addStyle(css) {
				var pi = document.createProcessingInstruction(
					'xml-stylesheet',
					'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent(css) + '"'
				);
				return document.insertBefore(pi, document.documentElement);
			}
			function timerDoOnce(node, functionName, checkTime){
				var tt = setInterval(function(){
					if(document.querySelector(node) != null) {
						clearInterval(tt);
						try{
							functionName();
						}catch (e) {}
					}
				}, checkTime);
			}

			function loadSC(){
				// 搜索的时候增加优惠信息
				addStyle(".copon-search-list{cursor:pointer;background:url(https://ws1.sinaimg.cn/large/6a155794gy1fuxyyimkydj202k00n0bj.jpg) no-repeat;display:inline-block;position:absolute;top:0;right:0;font-size:14px;color:#f95d50 !important;height:23px;padding: 0 8px 0 8px;background-size: 100% 100%;text-align:center;text-decoration:none!important;z-index:1;}");
				var allNodes = document.querySelectorAll(".items .J_MouserOnverReq, #content .product");
				for(var i = 0; i < allNodes.length; i++){
					(function (node) {
						var gid;
						try{gid = node.querySelector(".pic>a").getAttribute("data-nid");} catch (e) { }
						try{gid = gid || node.getAttribute("data-id");} catch (e) { }
						GM_xmlhttpRequest({
							method: "GET", url: "https://open.lesiclub.cn/coupon/get/10005/10001/" + gid,
							onload: function (res) {
								res = JSON.parse(res.responseText);
								if(res.code == 200 && res.data != null && res.data.coupon.is_valid == true){
									var insNode = document.createElement("span");
									var name;
									try{name = node.querySelector(".J_IconMoreNew .J_ClickStat").innerText.trim();} catch (e) { }
									try{name = name || node.querySelector(".productTitle a").getAttribute("title");} catch (e) { }
									var price = res.data.coupon.coupon_money;
									insNode.setAttribute("title", "当前商品领券减"+price+"元");
									insNode.dataset.url = "https://cent.ntaow.com/coupon.html?mQuery=" + encodeURI(name);
									insNode.setAttribute("onclick", "openUrl(this);");
									insNode.className = "copon-search-list";
									insNode.innerHTML = "￥"+price+"元优惠券";
									try{node.querySelector(".pic-box").appendChild(insNode);}catch (e) {}
									try{node.querySelector(".productImg-wrap").appendChild(insNode);}catch (e) {}
								}
							}
						});
					})(allNodes[i]);
				}
			}
			openUrl = function(node){
				if(node.dataset.url.indexOf("javascript:void") < 0)
					window.open(node.dataset.url);
			};
			addStyle(".ac-btn:hover,.copon-search-list:hover,.ac-btn-cart:hover,.tm-detailGo-btn:hover{color: rgba(255,200,0,30)!important;text-shadow: 0 0px rgba(242,33,49,30),0 0px 0px rgba(242,33,49,30),0 1px 1px rgba(242,33,49,30),1px 0 1px rgba(242,33,49,30),-1px 0 1px rgba(242,33,49,30),0 0 1px rgba(242,33,49,30)!important;}");
			addStyle(".ac-btn:hover,.tm-detailGo-btn:hover{color: white!important;}");

			if(location.href.indexOf("item.taobao.com") + location.href.indexOf("detail.tmall.com") >= 0) {
				addStyle(".tm-detailGo-btn{line-height: 48px !important;cursor:pointer;padding: 0px 11px;color:#f95d50;float: right !important;font-weight: bold;border: 1px solid #f95f52;font-size: 1.3em;}");
				function getQueryString(name) {
					var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
					var r = window.location.search.substr(1).match(reg);
					if (r != null) return unescape(r[2]);
					return null;
				}
				var goodID = getQueryString("id");
				queryData(goodID);
				function AutoStart(time, cssSelector, dealFunc) {
					var timerNode = setInterval(function () {
						try {
							if (document.querySelector(cssSelector).style.display == "") {
								clearInterval(timerNode);
								dealFunc();
							}
						} catch (e) {
						}
					}, time);
				}
				function acBuyScript(result) {
					var tt = setInterval(function () {
						var node = document.querySelector(".acBuyScriptCoupon");
						if (node != null) {
							clearInterval(tt);
							if (result.code == 200 && result.data && result.data.coupon.is_valid == true) {
								node.innerHTML = "!"+result.data.coupon.coupon_money+"元优惠券!";
								node.dataset.url = "https://cent.ntaow.com/coupon.html?mQuery=" + encodeURI(goodTitle);
							} else {
								node.innerHTML = "无优惠或已领优惠";
								node.setAttribute("style", "font-size: 11px;color:#6c6c6c");
							}
						}
					}, 50);
				}
				function queryData(goodID) {
					var cgoodTitle = document.title+"";
					var ret = GM_xmlhttpRequest({
						method: "GET", url: "https://open.lesiclub.cn/coupon/get/10005/10001/" + goodID,
						onload: function (res) {
							res = JSON.parse(res.responseText);
							acBuyScript(res);
						}
					});
				}
				AutoStart(100, ".tb-sku, .tb-action", function () {
					var TitleNode = document.querySelector("div#J_Title h3, div.tb-detail-hd h1");
					goodTitle = TitleNode.firstChild.nodeValue.trim();
					if(goodTitle == ""){
						goodTitle = TitleNode.childNodes[1].innerHTML.trim();
					}
					var querySimilar = "https://cent.ntaow.com/coupon.html?mQuery=" + encodeURI(goodTitle);
					var queryInSite = "https://s.taobao.com/search?q=" + encodeURI(goodTitle) + "&";
					var faNode = document.querySelector("div#J_Title p.tb-subtitle, div.tb-detail-hd h1");
					var insNode = document.createElement("div");
					insNode.style = "font-size: 32px;font-weight: bold;font-family:microsoft yahei;";
					var htmlText = "<span class='acBuyScriptCoupon ac-btn' data-url='javascript:void(0);' onclick='openUrl(this);' style='color: #f95f52;cursor:pointer;'>=查找中=</span>";
					htmlText += "&nbsp;&nbsp;<span class='ac-btn' data-url=" + queryInSite  + " onclick='openUrl(this);' style='color: #f95f52;cursor:pointer;'>[站内搜]</span>";
					htmlText += "&nbsp;&nbsp;<span class='ac-btn' data-url=" + querySimilar + " onclick='openUrl(this);' style='color: #f95f52;cursor:pointer;'>[找相似]</span>";
					insNode.innerHTML = htmlText;
					faNode.appendChild(insNode);
					var htmlTB = "<span class='ac-btn' style='padding: 6px 12px;ine-height:26px;text-align: center;display: inline-block;margin-bottom: 0;font-size: 14px;font-weight: normal;height:26px;lwhite-space: nowrap;vertical-align: middle;-ms-touch-action: manipulation;touch-action: manipulation;cursor: pointer;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;background-image: none;border: 1px solid transparent;border-radius:2px;color: #fff;background-color: #DF231C;#FF0036;margin-left:10px' data-url='https://cent.ntaow.com/coupon.html?mQuery="+encodeURI(goodTitle)+"' onclick='openUrl(this);'>获取优惠券</span>";
					var htmlTMALL = "<div class='ac-btn' class='tb-action' style='margin-top:10px;margin-left: 66px;'><span style='display: inline-block;border-radius:2px;color: #fff;background-color: #DF231C;padding: 6px 12px;margin-bottom: 0;font-size: 14px;font-weight: normal;height:26px;line-height:26px;width:156px;text-align: center;white-space: nowrap;vertical-align: middle;-ms-touch-action: manipulation;touch-action: manipulation;cursor: pointer;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;background-image: none;border: 1px solid transparent;' data-url='https://cent.ntaow.com/coupon.html?mQuery="+encodeURI(goodTitle)+"' onclick='openUrl(this);'>获取优惠券</span></div>";
					var anoInsNode = document.createElement("div");
					anoInsNode.style = "font-weight: bold;font-family:microsoft yahei;";
					if(location.host.indexOf('taobao') > 0){
						anoInsNode.innerHTML = htmlTB;
						document.querySelector('.tb-action').append(anoInsNode);
					}else{
						anoInsNode.innerHTML = htmlTMALL;
						document.querySelector('.tb-sku').append(anoInsNode);
					}
				});
			}else if(location.href.indexOf("s.taobao.com/search") > 0 || location.href.indexOf("list.tmall.com/search_product") > 0){
				var ttcounter = 0, ttmax = 10;
				var gwcounter = 0, gwmax = 100;
				var tt = setInterval(function () {
					var nodes = document.querySelectorAll(".items .item-ad");
					var allNodes = document.querySelectorAll(".items .J_MouserOnverReq, #content .product");
					if(allNodes != null && (nodes.length > 0 || allNodes.length > 0)){
						clearInterval(tt);
						if(document.querySelector("script[src*='gwd']") == null){
							loadSC();
						}
						for(var i = 0; i<nodes.length; i++){
							nodes[i].className = "item J_MouserOnverReq ";
						}
					}
					ttcounter++;
					if(ttcounter >= ttmax){
						clearInterval(tt);
					}
				}, 100);
			} else if(location.host.indexOf("uland") >= 0){
				addStyle("#J_MMREDBOX_MASK{display:none !important;}");
			} else if(location.href.indexOf("cart.taobao.com") >= 0) {
				setInterval(function(){
					if(document.querySelector("#J_OrderList .item-basic-info") != null){
						var htmlCart = "<span class='ac-btn-cart' data-url='https://cent.ntaow.com/coupon.html?mQuery=AAAAAAAAAA' onclick='openUrl(this);' style='cursor:pointer;22px !important;color:#f95f52;font-size:16px;border-radius:1px;padding:2px;border-color:#fea356;border-style: dashed;'>查找优惠信息</span>";
						var nodes = document.querySelectorAll(".order-content .item-basic-info");
						for(i = 0; i < nodes.length; i++){
							var title = nodes[i].querySelector("a").getAttribute("title");
							if(title != null){
								var addHTMLText = htmlCart.replace("AAAAAAAAAA", encodeURI(title));
								var insNode = document.createElement("div");
								insNode.className = "ac-tb-add";
								insNode.style = "display: inline-block";
								insNode.innerHTML = addHTMLText;
								if(nodes[i].parentNode.querySelector(".item-icons") && nodes[i].parentNode.querySelector(".item-icons").querySelector(".ac-tb-add") == null){
									nodes[i].parentNode.querySelector(".item-icons").appendChild(insNode);
								}
							}
						}
					}
				}, 1000);
			}
		})();
	}
}, 50);
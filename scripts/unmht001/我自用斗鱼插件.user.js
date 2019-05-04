// ==UserScript==
// @name 我自用斗鱼插件
// @namespace Unmht
// @match *://*.douyu.com/*
// @description       我自己用的,用于屏蔽斗鱼网页上的不想见的东西
// @author            unmht
// @run-at            document-end
// @grant             unsafeWindow
// @grant             GM_setClipboard
// @require           https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js
// @version 0.0.3
// ==/UserScript==

function AC_addStyle(css, className, addToTarget, isReload) { // 添加CSS代码，不考虑文本载入时间，带有className
				var tout = setInterval(function () {
					var addImmediately = false;
					var addTo = (document.head || document.body || document.documentElement || document);
					if(typeof(addToTarget) == "undefined") addImmediately = true;
					else addToTarget = addToTarget;
					isReload = isReload || false; // 默认是非加载型
          
					if (addImmediately || document.querySelector(addToTarget) !== null) {
						clearInterval(tout);
						// 如果true 强行覆盖，不管有没有--先删除
						// 如果false，不覆盖，但是如果有的话，要退出，不存在则新增--无需删除
						if (isReload === true) {
							safeRemove("." + className);
						} else if (isReload === false && document.querySelector("." + className) !== null) {
							// 节点存在 && 不准备覆盖
							return;
						}
						var cssNode = document.createElement("style");
						if (className !== null) cssNode.className = className;
						cssNode.setAttribute("type", "text/css")
						cssNode.innerHTML = css;
						try {
							if(addImmediately === true){
								addTo.appendChild(cssNode);
							}else {
								document.querySelector(addToTarget).appendChild(cssNode);
							}
						} catch (e) {
							console.log(e.message);
						}
					}
				}, 20);
			}

AC_addStyle('body{background-color:#033}'+
              '.Header-wrap,.Header-wrap:after,.Header-wrap:before,#mainbody{background-image:none!important;background:none!important;}'+
              '.layout-Player-barrage{top:0px;!important;}',              
              'style1');

function hidecss(codelist,stylename){
  var cs=codelist.join(",")
  cs=cs+'{height:0px!important;width:0px!important;display:none!important;}';
  console.log(cs);
  try{
    AC_addStyle(cs,stylename); 
  }catch(e){
    console.log(e.message);
  };
};

var clist=[
  '.UserLevel',
  '.user-level',
  '.FansMedal',
  '.Motor',
  '.fans-rank',
  '.chat-icon-pad',
  '.status-low-enter',
  '.motorcade-icon',
  '.lol-activity',
  '.view-child',
  '#js-room-activity',
  '#js-background-holder',
  '#js-player-title',
  '.layout-Player-rankAll',
  '.layout-Player-rank',
  '.layout-Aside',
  '.layout-Bottom',
  '.BarrageBanner',
  '.TreasureWrap',
  '.Barrage-userEnter',
  '.Medal',
  '.Header-menu-icon4',
  '.Header-menu-icon3',
  '.Header-menu-icon2',
  '.Header-menu-icon1',
  '.btn-group',
  '.vote-tips-pop',
  '.project-vote-wrap',
  'div.room-mes,div.layout-Player-rankAll,div.layout-Player-rank,div.layout-Player-asideAdvert',
  'div.Barrage-topFloater,div#lifter'
  
];

hidecss(clist,'style2');

$(function f1(){
  
$("div.chat-cont").parent().children().not(".chat-cont,.chat-speak").remove();
  $("div.chat-cont").css("cssText",'top:0 !important');
  $("#mainbody,.layout-Main").css("cssText",'margin-left:0 !important;margin-right:0 !important;width:100% !important;height: 100%important;');
  
});

function delayremove(codelist,dl){
  var cs=codelist.join(',');
  
  try{   
    
    setTimeout(function(){
      
      var rc=$(cs);
      console.log(cs+'---'+rc.size(),'delayremove');
      rc.css("cssText",'width:0 !important;height:0 !important;display:none !important;');
      rc.remove();
    },dl);

  }catch(e){
    console.log(e,'delayremove');
  }
}


$("body").ready(function() { 
  
  var clist=["div[data-component-id='view']",
             "div.vote-tips-pop",
             "div.project-vote-wrap",
             "div[class^='multiBitRate']",
             "div[class^='comment']",
             "div[class^='broadcastDiv']",
             "div.room-mes,div.layout-Player-rankAll,div.layout-Player-rank,div.layout-Player-asideAdvert",
             "div.Barrage-topFloater,div#lifter"             
            ];
  delayremove(clist,3000);    
  });




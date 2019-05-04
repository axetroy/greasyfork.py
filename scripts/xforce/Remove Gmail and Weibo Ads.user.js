// ==UserScript==
// @name       Remove Gmail and Weibo Ads
// @namespace	http://www.iplaysoft.com/
// @version    0.11
// @description  Remove Gmail Ads
// @match      https://mail.google.com/mail/*
// @match      http://weibo.com/*
// @gant          GM_addStyle
// @copyright  X-Force
// ==/UserScript==

if (window.top != window.self)  //don't run on frames or iframes
  return;

if(window.location.href.indexOf('//mail.google.com/mail/')>2){
    //右侧和底部
    GM_addStyle(".oM { display:none; }");
    GM_addStyle(".Zs { display:none; }");
    
    //邮件列表顶部
    GM_addStyle(".aKB { display:none; }");
}


if(window.location.href.indexOf('//weibo.com/')>2){
    //weibo
    //广告
    GM_addStyle("#pl_content_biztips,#pl_rightmod_ads36,.adver_contB,.footer_adv { display:none; }");
    
    //会员动态
    GM_addStyle("#trustPagelet_recom_memberv5 { display:none; }");
    
    
    //优化
    GM_addStyle("#Box_right,.webim_list{display:none}");
    GM_addStyle("#Box_center{width:824px;background:#fefefe}");
    GM_addStyle(".WB_feed .WB_text {font-size: 15px;line-height: 24px;padding: 6px 0 6px;}");
    //GM_addStyle(".W_main_c{background:#fefefe}");
}
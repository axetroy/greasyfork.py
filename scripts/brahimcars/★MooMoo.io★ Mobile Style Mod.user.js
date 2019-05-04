// ==UserScript==
// @name         ★MooMoo.io★ Mobile Style Mod
// @namespace    -
// @version      0.2
// @description  Moomoo.io ++ Mobile Style With Advanced Minimap
// @author       brahimcars
// @match        *://moomoo.io/*
// @match        http://dev.moomoo.io/*
// @match        http://sandbox.moomoo.io/*
// @grant        none
// @require http://code.jquery.com/jquery-3.3.1.min.js
// @require https://code.jquery.com/ui/1.12.0/jquery-ui.min.js
// ==/UserScript==

$("#youtuberOf").hide();
$("#followText").hide();
$("#twitterFollow").hide();
$("#youtubeFollow").hide();
$("#adCard").hide();
$("#mobileInstructions").hide();
$("#promoImgHolder").hide();
$("#downloadButtonContainer").hide();
$("#mobileDownloadButtonContainer").hide();
$(".downloadBadge").hide();
$("#mapDisplay").css({background: `url('https://i.imgur.com/KCxg4St.png')`});
$("#moomooio_728x90_home").html = '<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script> <script>(adsbygoogle=window.adsbygoogle||[]).push({google_ad_client:"ca-pub-1951888973035958",enable_page_level_ads:true});</script>'; 

var css = "#joinPartyButton,#noticationDisplay,#partyButton,#settingsButton{transform:translateX(-50%)}#adCard,#promoImgHolder{display:none!important}#guideCard{position:absolute;display:none;z-index:10;top:calc(50% + 20px);left:50%;transform:translate(-50%,-50%)}#guideCard #smallLinks,#guideCard.showing{display:block}#downloadButtonContainer,#leaderboard,#linksContainer1,#linksContainer2,#twitterFollow,#youtubeFollow,#youtuberOf{display:none}#mobileDownloadButtonContainer{display:block;text-align:center;margin-top:16px;margin-bottom:-6px}.downloadBadge{margin:0 2px}.downloadBadge img{height:36px}#loadingText,#menuCardHolder{margin-top:20px}#gameName{font-size:80px;text-shadow:0 1px 0 #c4c4c4,0 2px 0 #c4c4c4,0 3px 0 #c4c4c4,0 4px 0 #c4c4c4,0 5px 0 #c4c4c4}#setupCard{width:260px;margin-top:4px}#partyButton{top:8px;left:33%;right:inherit}#joinPartyButton{top:8px;left:66%;right:inherit}#settingsButton{display:block;bottom:8px;left:50%}#youtuberOf{top:8px;left:8px}#featuredYoutube{display:inline-block;margin-top:0}#mapDisplay{width:66px;height:66px;bottom:unset;top:8px;left:8px}#itemInfoHolder{max-width:250px;top:inherit;top:8px;right:80px;left:inherit}#itemInfoName{font-size:22px}#itemInfoDesc,.itemInfoLmt,.itemInfoReq,.itemInfoReqVal{font-size:12px}.resourceDisplay,.uiElement{font-size:20px}#scoreDisplay,.resourceDisplay{right:inherit;left:8px;height:25px;line-height:27px;padding-left:36px;padding-right:10px;background-size:24px;background-position:left 6px center}#foodDisplay{top:82px;bottom:inherit}#woodDisplay{top:124px;bottom:inherit}#stoneDisplay{top:166px;bottom:inherit}#scoreDisplay{top:208px;left:8px;bottom:inherit}#topInfoHolder{top:8px;right:8px}#killCounter{left:inherit;margin-top:0}#actionBar{bottom:8px;height:44px}.actionBarItem{width:44px;height:44px;margin-left:5px;margin-right:5px}#upgradeCounter{font-size:18px;top:58px}#ageText{bottom:70px;font-size:16px}#ageBarContainer{bottom:54px}#ageBar{-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px;padding:3px;width:200px;height:6px}#ageBarBody{-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px}#leaderboardData,.leaderHolder,.leaderScore,.leaderboardItem{font-size:18px}.leaderScore{margin-left:0}#noticationDisplay{top:inherit;right:inherit;left:50%;bottom:96px;text-align:center}.notificationText{line-height:35px;font-size:18px;display:block}.notifButton{padding:3px 3px 0;margin-left:4px;margin-right:4px}#allianceButton{top:inherit;right:8px}#storeButton{top:inherit;right:60px}#chatButton{top:inherit;left:8px}#chatButton.hide{display:none}.gameButton{bottom:8px;width:44px;height:44px;padding:0!important}.gameButton i{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);font-size:34px!important}#allianceInput,.allianceButtonM,.allianceItem,.itemPrice,.joinAlBtn,.storeItem{font-size:18px}.hatPreview{width:35px;height:35px}",
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

style.type = 'text/css';
if (style.styleSheet){
  // This is required for IE8 and below.
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}

head.appendChild(style);
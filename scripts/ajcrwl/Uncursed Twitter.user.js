// ==UserScript==
// @name         Uncursed Twitter
// @name:ru      Тёплый ламповый Твиттер
// @namespace    
// @description  Changes twitter's style back to how it used to be before horrible design decisions.
// @description:ru Изменяет стиль Твиттера на то, как всё было до плохих дизайнерских решений.
// @include      https://twitter.com/*
// @grant        none
// @author       @ajcrwl
// @version      4
// ==/UserScript==

/// ======== CUSTOM USER PREFERENCES =============

/*  IF YOU WANT A BACKGROUND
    write in your twitter handle between '' */
var u = 'YOUR-TWITTER-HANDLE';

/*  link to custom background picture.
    send any picture in DM to yourself, open it in full view,
    copy link to image and replace the link below (paste between '').
    sample bg provided here is by https://www.artstation.com/seventeenth */
var bg = 'https://ton.twitter.com/i/ton/data/dm/1036558119629991940/1036558044958797825/3tfGnrQs.jpg';

/*  TRANSPARENT GLASSY LOOK
    set 0 to turn OFF, 1 is ON           
    gives a nice transparent look to everything and bg is more visible */
var glass = 1;

/*  this makes tweetbox dark. place two slashes // before the next line to revert to light blue:   */
var darktb = '#212121';


///////////////////////////////////////////////////

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

//bg image
addGlobalStyle('body.user-style-'+u+' { background-image: url('+bg+') !important; background-size: cover; background-repeat: no-repeat;  background-attachment: fixed; background-color: #eeeeee  !important;} .ProfileSidebar--withLeftAlignment {background-color: #fff; border: 1px solid #e1e8ed; border-radius: 5px; margin-top: 37px; margin-left: -1px;} .ProfileHeaderCard {margin-top: 0px ; padding-top: 10px;}.MomentGuideVTwoCapsuleSummary {background-color: white;border: 1px solid #e1e8ed;}.SidebarCommonModules .CommerceDiscovery, .SidebarCommonModules .SignupCallOut, .SidebarCommonModules .Trends, .SidebarCommonModules .TweetImpressionsModule, .SidebarCommonModules .WhoToFollow {background: white;margin-bottom: 10px;}.MomentCapsuleCover {padding: 10px; background: white;border-radius: 3px;}.MomentCapsuleCover-media {padding-bottom: 40px;}.MomentCapsuleVTwoPage-tweets {margin: 30px auto;}.MomentCapsuleVTwoItem {background: white;margin-bottom: 30px;}.MomentCapsuleSummary, .AdaptiveFiltersBar, .AdaptiveSearchPage-moduleHeader {background-color: rgba(255,255,255,0.8);}.MomentCapsuleItem {background-color: rgba(255,255,255,0.8);border-radius: 4px;padding: 10px;}.MomentsPermalinkPage-tweets {width: 660px;}.SearchNavigation {position: relative;top: 0;}.AdaptiveSearchPage .AppContent {padding: 46px 0 15px!important;}');
//roundness:
addGlobalStyle('.EdgeButton, .EdgeButton:visited {border-radius: 0px;}.edge-design .Avatar, .edge-design .DashboardProfileCard-avatarImage, .edge-design .DashboardProfileCard-avatarLink, .edge-design .Gallery.is-tweetless .Gallery-content, .edge-design .Gallery.is-tweetless .Gallery-media, .edge-design .MomentCapsuleCover .MomentUserByline-avatar, .edge-design .MomentCapsuleItemTweet--withText .MomentUserByline-avatar, .edge-design .MomentCapsuleSummary .MomentUserByline-avatar, .edge-design .MomentMakerRecommendedTweetsSearch--users .MomentMakerRecommendedTweetsSearch-userContainer .avatar, .edge-design .ProfileAvatar, .edge-design .ProfileAvatar-image, .edge-design .ProfileAvatar-placeholderImage, .edge-design .ProfileAvatarEditing, .edge-design .ProfileAvatarEditing-button, .edge-design .ProfileAvatarEditing-overlay, .edge-design .ProfileCard-avatarImage, .edge-design .ProfileCard-avatarLink, .edge-design .ProfileCardMini-avatarImage, .edge-design .ProfileListItem-avatar, .edge-design .ProfileUserList .Avatar, .ProfileAvatar-image, .ProfileAvatar-placeholderImage, .edge-design .avatar, .avatar, .nav .session .dropdown-toggle, .ProfileAvatar, .ProfileCard-avatarLink, .ProfileCard-avatarImage, .DashboardProfileCard-avatarImage, .Avatar, .ProfileUserList .Avatar, .ProfileAvatarEditing-button, .ProfileAvatarEditing-overlay, .ProfileAvatarEditing,.DMAvatar,.DMUpdateAvatar-avatar,.nav .session .dropdown-toggle:before {border-radius: 0px!important;}.DirectMessage-message .DirectMessage-attachmentContainer, .DirectMessage-message .DirectMessage-contentContainer{border-radius:10px;}.js-retweet-text {background-color: #bcffbc;} .Icon--heartBadge {color: #F44336!important;}.Icon--retweeted{color: #b3ffa0!important;}');
//fonts and colors:
addGlobalStyle('body.ms-windows {font-family: Arial,sans-serif;}#global-tweet-dialog .modal-tweet-form-container, #Tweetstorm-dialog .modal-body{background: #212121!important;}/*.TweetImpressionsModule-barchart-colorfill.organic, .TweetImpressionsModule-organic{background-color: #eed709;}.ProfileCanopy.is-locked .ProfileCanopy-inner{position: initial;}*/.home-tweet-box, .LiveVideo-tweetBox, .RetweetDialog-commentBox{background-color: '+darktb+';}.nav li a{font-weight:unset !important;}.ProfileNav-value,.ProfileNav-label{font-weight: unset !important;}.ProfileNav-label{text-transform:uppercase;}');
//transparency
if(glass==1){addGlobalStyle('div[class^="Profile"], .global-nav-inner, .dashboard, li.js-activity, .content-header .header-inner, div[class^="route-"] li.stream-item {background-color: #ffffffdd !important;} div[class^="ProfileHeading-"], div.route-profile li.stream-item, div.ProfileHeaderCard, div[class^="ProfileHeaderCard-"],div[class^="ProfileHeaderEditing"],div[class^="ProfileAvatarEditing"], div[class^="ProfileCanopy-"], div[class^="ProfileNav"], div[class*="module"], div.TweetImpressionsModule, li[class^="ProfileNav-"], div[class^="ProfileListItem"], .is-locked, div[class^="ProfileTweet-action"], .NotificationsHeadingContent, ul.stats, .module .list-link, .module .list-link:hover, .module .active .list-link {background-color: unset !important;} .is-locked .ProfileCanopy-navBar, .tweet:hover, .MomentCapsuleSummary--hero:hover, .MomentCapsuleSummary--portrait:hover, #doc.route-moments .global-nav {background:white !important;}')};

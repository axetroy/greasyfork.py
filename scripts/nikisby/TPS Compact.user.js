// ==UserScript==
// @name          TPS Compact
// @namespace     nikisby
// @version       1.4
// @description   Makes TPS design more compact.
// @author        nikisby
// @match         https://thepiratesociety.org/*
// @match         http://thepiratesociety.org/*
// @match         https://www.thepiratesociety.org/*
// @match         http://www.thepiratesociety.org/*
// @icon          https://www.thepiratesociety.org/favicon.ico
// @icon64        https://www.thepiratesociety.org/favicon.ico
// @homepageURL   https://www.thepiratesociety.org/threads/127358/
// @supportURL    https://www.thepiratesociety.org/threads/127358/
// @grant         GM_getResourceURL
// @require       https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @resource logo http://i.imgur.com/05F3LFF.png
// ==/UserScript==

(function() {var css = [".ugc a:link, .ugc a:visited {",
"    box-shadow: none;",
"}",
"",
"#logoBlock,",
".profilePostList #ProfilePoster,",
"#XenForoUniq4 .menuHeader,",
".tglAllSidebar,",
"#content.forum_list .breadBoxTop,",
"#content.forum_list .breadBoxBottom,",
"#content.EWRporta_Portal .breadBoxBottom,",
"#content.ban_list .breadBoxTop,",
"#content.ban_list .breadBoxBottom,",
"#mark_form,",
".let_it_snow,",
".collapsed {",
"    display: none;",
"}",
"",
"#navigation {",
"    margin: 5px 0 0 0 !important;",
"}",
"",
".navTab,",
".nodeList .categoryStrip .nodeTitle {",
"    font-size: 1.4em;",
"}",
"",
".node .nodeText .nodeTitle,",
".recentNews .messageContent,",
"textarea.textCtrl,",
".messageText,",
".message .messageContent .messageText {",
"    font-size: 1.3em;",
"}",
"",
".recentNews .messageContent {",
"    line-height: 1.5em;",
"}",
"",
".recentNews .sectionFooter {",
"    margin: 0;",
"    padding: 0;",
"}",
"",
".sidebar .messageInfo,",
".tabs,",
".sidebar .secondaryContent h3,",
".visitorText dl,",
"#recentThreads .discussionListItems {",
"    font-size: 1.2em;",
"}",
"",
".node .nodeStats {",
"    font-size: 1.1em;",
"    margin-top: 3px;",
"}",
"",
"#sbfhtabcontainer,",
".sportsbookEvent .title,",
".userTitle,",
".pairsJustified,",
".membersOnline .footnote,",
".membersOnline span,",
".navTabs .navTab.selected .tabLinks a,",
"#statusUpdates .userTitle,",
".sidebar .avatarList .username,",
"#SubPages ul,",
".sportsbookCategoryList li {",
"    font-size: 1.1em;",
"}",
"",
".WhoHasVisitedBlock span {",
"    font-size: 1em;",
"}",
"",
".messageInfo .additionalRow,",
".sportsbookEvent .meta {",
"    font-size: 0.9em;",
"}",
"",
".profilePostListItem .messageMeta {",
"    font-size: 0.8em;",
"}",
"",
".profilePostListItem .messageMeta {",
"    padding-top: 2px;",
"}",
"",
".lastThreadTitle {",
"    font-weight: normal;",
"}",
"",
".navTabs, .navTabs .navLink {",
"    height: 50px;",
"    line-height: 50px;",
"}",
"",
".navTabs .navTab.selected .tabLinks {",
"    border: 0;",
"    margin-top: 7px;",
"}",
"",
".navTabs .navLink .itemCount {",
"    top: -3px;",
"}",
".navTabs .publicTabs .navLink {",
"    padding: 0 15px;",
"}",
"",
".navTab.forums > .navLink {",
"    padding: 0 20px 0 10px;",
"}",
"",
".navTab.forums > .navLink:before {",
"    content: url("+GM_getResourceURL("logo")+"); ",
"    display: block;",
"    width: 40px;",
"    height: 40px;",
"    float: left;",
"    margin: 5px 10px 0 0;",
"}",
"",
"#content.forum_list .sidebar {",
"    margin-top: 3px;",
"}",
"",
".sidebar .section {",
"    margin: 0 auto;",
"}",
"",
".membersOnline > .footnote {",
"   padding: 0 10px 10px 10px;",
"}",
"",
".secondaryContent {",
"    padding: 8px 10px;",
"}",
"",
".nodeList .categoryStrip,",
".sidebar .section .secondaryContent h3 {",
"    padding: 5px 10px;",
"}",
"",
".profilePostListItem:first-child {",
"    border: 0;",
"    padding-top: 0;",
"}",
"",
".node .nodeText,",
".Responsive .node .nodeText {",
"    margin: 8px 53% 8px 8px;",
"}",
"",
".node .nodeIcon {",
"    margin: 10px 6px 6px 6px;",
"    width: 30px;",
"    height: 30px;",
"}",
"",
".node .nodeLastPost,",
".Responsive .node .nodeLastPost {",
"    font-size: 1.2em;",
"    position: absolute;",
"    margin: 6px 5px 4px 5px;",
"    width: 52%;",
"}",
"",
".node .nodeControls {",
"    right: 55%;",
"    margin: 18px 0;",
"}",
"",
".node .forumNodeInfo .nodeIcon, ",
".node .categoryForumNodeInfo .nodeIcon {",
"    background-position: 0;",
"}",
"",
".node .forumNodeInfo.unread .nodeIcon, ",
".node .categoryForumNodeInfo.unread .nodeIcon {",
"    background-position: -30px 0;",
"}",
"",
".button {",
"    height: 28px;",
"}",
"",
".mainContainer {",
"    margin-right: 0;",
"    width: 72%;",
"}",
"",
".mainContent {",
"    margin: 0;",
"}",
"",
".sidebar {",
"    width: 27%;",
"}",
"",
".pageWidth {",
"    padding-right: 8%;",
"    padding-left: 8%;",
"    max-width: 1600px;",
"    margin: 0 auto;",
"}",
"",
"#QuickSearch {",
"    top: 6px;",
"    right: 0;",
"    line-height: 1.28;",
"}",
"",
"#QuickSearch.active {",
"    padding-bottom: 0;",
"}",
"",
".formPopup {",
"    width: 175px;",
"}",
"",
".formPopup .textCtrl, ",
".formPopup .button {",
"    width: 151px;",
"}",
"",
".formPopup .controlsWrapper .textCtrl {",
"    width: 141px;",
"}",
"",
"#taigachat_message {",
"    padding: 3px;",
"}",
"",
"#taigachat_controls .button {",
"    height: 22px;",
"    line-height: 22px;",
"}",
"",
"#QuickSearch input.button.primary {",
"    width: 70px;",
"}",
"",
"#QuickSearch .moreOptions {",
"    margin: 0 28px 0 75px;",
"}",
"",
".visitorPanel .pairsJustified dd {",
"    float: none;",
"    text-align: left;",
"}",
"",
".topRightBlocks {",
"    width: auto;",
"}",
"",
".Responsive #QuickSearchPlaceholder {",
"    top: 19px;",
"    right: 0;",
"}",
"",
"#navigation .menuIcon:before {",
"    top: 1.15em;",
"}",
"",
"@media (max-width: 1050px) {",
"    .Responsive #QuickSearch {display: none;}",
"    .Responsive #QuickSearchPlaceholder {display: block;}",
"    .Responsive #QuickSearch.show {display: block;}",
"}",
"",
"@media (max-width: 1200px) {",
"    .pageWidth {",
"        padding-right: 2%;",
"        padding-left: 2%;",
"    }    ",
"}",
"",
"@media (max-width: 800px) {",
"    .sidebar {",
"        width: 100%;",
"    }",
"    .navTab,",
"    .nodeList .categoryStrip .nodeTitle,",
"    .node .nodeText .nodeTitle,",
"    .visitorText dl,",
"    .sidebar .messageInfo,",
"    .tabs,",
"    .sidebar .secondaryContent h3,",
"    .node .nodeStats,",
"    #sbfhtabcontainer,",
"    .sportsbookEvent .title,",
"    .userTitle,",
"    .pairsJustified,",
"    .membersOnline .footnote,",
"    .membersOnline span,",
"    .navTabs .navTab.selected .tabLinks a,",
"    .WhoHasVisitedBlock span,",
"    .messageInfo .additionalRow,",
"    .sportsbookEvent .meta,",
"    .profilePostListItem .messageMeta {",
"        font-size: inherit;",
"    }    ",
"}",
"",
".collapse:before {",
"    content: '−';",
"}",
"",
".expand:before {",
"    content: '+';",
"}",
"",
".collapse,",
".expand {",
"    font-size: 1.5em;",
"    float: right;",
"    margin-top: -0.3em;",
"    display: block;",
"    font-weight: normal;",
"    cursor: pointer;",
"}",
"",
".nodeList .node_256 .categoryStrip {",
"    background-image: none;",
"}",
"",
".node_256 .categoryStrip .nodeTitle {",
"    visibility: visible;",
"}",
"",
".discussionList .sectionHeaders a span {",
"    padding: 6px 12px;",
"}",
"",
".taigachat_smilies_list {",
"    max-width: 265px;",
"}",
"",
"#content.ban_list .pageWidth {",
"    margin-bottom: 20px;",
"}",
"",
"#content.ban_list .titleBar {",
"    margin-top: 10px;",
"}",
"",
"#content.EWRporta_Portal .sidebar {",
"    margin: 0;",
"}",
"",
"#content.EWRporta_Portal .sectionMain {",
"    margin: 8px auto;",
"}",
"",
".subHeading {",
"    padding: 6px;",
"}",
"",
".subHeading > div {",
"    margin: 2px 5px 0 0;",
"    font-size: 1.2em;",
"}",
"",
"#content.EWRporta_Portal .sectionFooter {",
"    background: inherit;",
"    border-bottom: 0;",
"}",
"",
".xenForm fieldset + .ctrlUnit,",
".xenForm .formGroup + .ctrlUnit,",
".xenForm .submitUnit,",
".xenForm fieldset, .xenForm .formGroup {",
"    border: 0;",
"    padding-top: 0;",
"    margin-top: 0;",
"}",
"",
".navTabs .navTab.selected .blockLinksList {",
"    margin-left: 0;",
"}",
"",
".discussionListItem .title {",
"    font-size: 1.4em;",
"}",
"",
".discussionListItem .secondRow {",
"    font-size: 1.2em;",
"    margin-top: 3px;",
"}",
"",
".itemPageNav a, .itemPageNav span {",
"    font-size: 0.8em;",
"    margin: 0;",
"}",
"",
".discussionListItem .stats .major {",
"    font-size: 1.1em;",
"    margin: 0;",
"}",
"",
".discussionListItem .stats .minor {",
"    font-size: 1em;",
"    margin: 0;",
"}",
"",
".discussionListItem .posterAvatar .avatar {",
"    padding: 2px;",
"}",
"",
".discussionListItem .itemPageNav {",
"    visibility: visible;",
"}",
"",
"#ThreadReply fieldset {",
"    margin: 0 auto;",
"}",
"",
".quickReply {",
"    padding: 30px 10px 10px 10px;",
"}",
"",
"#QuickReply textarea {",
"    height: 160px;",
"}",
"",
".discussionListItem .iconKey span {",
"    margin: 2px 5px 0 0;",
"}"
].join("\n");
if (typeof GM_addStyle != 'undefined') {
 GM_addStyle(css);
 } else if (typeof PRO_addStyle != 'undefined') {
 PRO_addStyle(css);
 } else if (typeof addStyle != 'undefined') {
 addStyle(css);
 } else {
 var node = document.createElement('style');
 node.type = 'text/css';
 node.appendChild(document.createTextNode(css));
 var heads = document.getElementsByTagName('head');
 if (heads.length > 0) { heads[0].appendChild(node);
 } else {
 // no head yet, stick it whereever
 document.documentElement.appendChild(node);
 }
}})();

this.$ = this.jQuery = jQuery.noConflict(true);

$('.navTab.home > a').text('Blog');

$('.navTab.home').before($('.navTab.forums'));

$('.crust.homeCrumb').remove();

$('.sidebar.topRightBlocks').removeAttr('class');

$('.forumsTabLinks > .blockLinksList > li:eq(0)').before($('.forumsTabLinks > .blockLinksList > li:eq(4)'));

$('.visitorPanel').after($('.threadList, .profilePostList'));

$('.navTab.account').before($('#searchBar'));

$('#searchBar').wrap('<li class="navTab"></li>');

$('.membersTabLinks .navTab, .membersTabLinks .navLink').removeAttr('class');

if ($('.navTab > .tabLinks').text() === '') {
    $('.navTab > .tabLinks').hide();
    $('#navigation .pageContent').css('height', '50px');
}

var acc = $('<li class="navTab myprofile Popup PopupControl PopupClosed PopupContainerControl"><a href="./account/personal-details" class="navLink">My Account</a></li>');

var rec = $('<li><a href="./find-new/posts?recent=1">Recent Posts</a></li>');

var bb = $('<li><a href="./help/bb-codes">BB Codes</a></li>');

var sm = $('<li><a href="./help/smilies">Smilies</a></li>');

$('.navTab.sportsbook').after(acc);

$('.forumsTabLinks > .blockLinksList > li:eq(1)').after(rec);

$('.forumsTabLinks > .blockLinksList').append(bb);

$('.forumsTabLinks > .blockLinksList').append(sm);

$('.navLink.username').addClass('NoOverlay').click(function(evt){ evt.preventDefault(); } );

$('.visitorPanel a.avatar').addClass('NoOverlay');

$('.visitorText dl:eq(1)>dd').wrapInner('<a href="./account/ratings-received"></a>');

if (typeof unsafeWindow.XenForo._csrfToken != "undefined") {

    var token = unsafeWindow.XenForo._csrfToken;
    var info = token.split(',');
    var user = info[0];
    var date = info[1];
    var pathname = $(location).attr('pathname');

    $('.visitorText dl:eq(0)>dd').wrapInner('<a href="./search/member?user_id='+user+'"></a>');
    $('.visitorText dl:eq(3)>dd').wrapInner('<a href="./members/'+user+'/#reputation"></a>');

    var form = '<form action="forums/-/mark-read" method="post" class="xenForm formOverlay AutoValidator" id="mark_form" data-redirect="on">' +
        '<input type="hidden" name="date" value="'+date+'">' +
        '<input type="hidden" name="_xfToken" value="'+token+'">' +
        '<input type="hidden" name="_xfConfirm" value="1"></form>';
    $('.forumsTabLinks').append(form);

    $('.forumsTabLinks > .blockLinksList > li:eq(1)').html('<a id="mark_button" href="#">Mark Forums Read</a>');

    $('#mark_button').click(function(evt) {
        evt.preventDefault();
        $('#mark_form').submit();
    });

    if (pathname.indexOf('threads/') >= 0) {
        var unwatch = $('.linkGroup.SelectionCountContainer > a:nth-child(1)');
        if (unwatch.text() == 'Unwatch Thread') {

            var form = '<form action="' + unwatch.attr('href').replace('-confirm','') +
                '" method="post" class="xenForm AutoValidator" id="unwatch_form">' +
                '<input type="hidden" name="stop" value="stop">' +
                '<input type="hidden" name="_xfToken" value="' + token + '"></form>';
            $('.linkGroup.SelectionCountContainer').append(form);

            unwatch.click(function(evt) {
                evt.preventDefault();
                $('#unwatch_form').submit();
            });
        }
    }
}

$('.b-page_newyear').remove();
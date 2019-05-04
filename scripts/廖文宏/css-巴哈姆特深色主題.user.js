// ==UserScript==
// @name          css-巴哈姆特深色主題
// @namespace     hbl917070
// @description	  巴哈姆特深色主題
// @author        hbl917070(深海異音)
// @homepage      https://home.gamer.com.tw/homeindex.php?owner=hbl917070
// @include       https://forum.gamer.com.tw*
// @include       https://home.gamer.com.tw/creation*
// @include       https://www.youtube.com/*
// @run-at        document-start
// @grant         GM_getValue
// @grant         GM_setValue
// @version       0.26
// ==/UserScript==

/*
標題：css-巴哈姆特深色主題
範圍：哈啦區的：文章列表、文章
最後修改日期：2019 / 03 / 26
作者：hbl917070（深海異音）
說明：https://forum.gamer.com.tw/C.php?bsn=60076&snA=2621599

預設背景圖片來源：https://www.pixiv.net/member_illust.php?mode=medium&illust_id=61640092
*/

/**
 * 此腳本已經有內含文字顏色反轉，如果原本有安裝反轉文字顏色的腳本，記的先把反轉文字顏色的js刪除
 *
 * 2019/03/26：修復哈哈姆特通知的顏色
 * 2019/03/09：新增「縮圖模式」的支援
 * 2018/11/25：修復哈哈姆特的顏色、優化版務界面
 * 2018/10/23：修復BUG
 * 2018/10/22：拿掉某個白白的區塊
 * 2018/08/11：修正Chrome瀏覽器導致「Google搜尋頁面」的原生下拉選單物件，文字顏色變成白色 的問題
 *
 */

(function() {
    // ▼ ▼ ▼ 這裡的設定可以修改 ▼ ▼ ▼

    var 背景圖片網址 = "https://i.imgur.com/zF17VkP.jpg";

    var 背景圖片上面的漸層顏色 = "linear-gradient(90deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.2) 100%)";

    var 擴充CSS = ``;

    // ▲ ▲ ▲ 這裡的設定可以修改 ▲ ▲ ▲

    //-----------------------
    /*
    設定技巧

    背景圖片網址：
        可以把要使用的圖片上傳的imgur。
        https://imgur.com/


    背景圖片上面的漸層顏色：
        deg：代表漸層的角度，所以「90deg」就是「水平由左至右」
        角度後面有兩個rgba()：第一個是漸層的起始的顏色，第二個是漸層結束的顏色
        rgba() 後面的 0% 跟 100%：就是起始跟結尾的意思，基本上不用修改
        rgba 四個參數分別是 (紅, 綠, 藍, 透明度)
        rgba(255,255,255,1) = 白色
        rgba(0,0,0,1) =       黑色
        rgba(255,0,0,1) =     紅色
        rgba(0,0,0, 0.3) =    30%透明的黑色
        rgba(0,0,0,0) =       完全透明

        如果不想用背景圖片可以兩個rgba都輸入 rgba(45,45,45,1)
  */
    //-----------------------------------

    var css = "";
    var url = document.location.href;

    //「不啟用」 投票、勇者議事堂、版務專用網頁、發文或回文的頁面
    if (
        url.indexOf("https://forum.gamer.com.tw/vresult") === 0 ||
        url.indexOf("https://forum.gamer.com.tw/opinion") === 0 ||
        url.indexOf("https://forum.gamer.com.tw/gemadmin/bmAttendance.php") === 0 ||
        url.indexOf("https://forum.gamer.com.tw/gemadmin/snippet_manage.php?bsn=1") === 0 ||
        url.indexOf("https://forum.gamer.com.tw/applyBM") === 0 ||
        url.indexOf("https://forum.gamer.com.tw/post1.php?") === 0
    ) {
        return;
    }

    /* 哈啦區 */
    if (url.indexOf("https://forum.gamer.com.tw") === 0) {
        css += "body{background-image:bac_img_color,url(bac_img_url)!important;background-attachment:fixed!important;background-position:center center!important;background-repeat:no-repeat!important;background-size:cover!important;background-color:rgba(45,45,45,1)!important;overflow-y:scroll}#BH-background{color:#fff!important}.side_gray_box h3{color:#fff!important}.im_bhtop-user-name{color:#87dfff!important}.im_bhtop-message-summary{color:#fff!important}#topBarHahamut .im_bhtop-msg-item{border:none!important;border-top:none!important}.b-imglist-wrap .b-imglist-info p,.b-imglist-wrap .b-imglist-info span{color:#fff!important}.b-imglist-wrap .b-list__brief{color:#fff!important;padding-left:37px!important}.b-imglist-wrap .b-list__row:hover{background:rgba(0,0,0,.2)!important}.b-imglist-wrap .b-list-item{border-bottom:solid 1px rgba(255,255,255,.2)!important}.b-imglist-wrap .b-list__row:last-of-type .b-list-item{border-bottom:none!important}.b-imglist-wrap .b-list__row--sticky{border-bottom:none!important}.b-imglist-wrap .b-list__main__pages a{color:#87dfff!important}.b-imglist-wrap .b-list__author a{color:#87dfff!important}.b-list__filter__expert,.b-list__filter__feature,.b-list__filter__gp{background-color:rgba(45,45,45,.4)!important;border:1px solid rgba(255,255,255,.4)!important}.b-list__head .is-active,.b-list__head .now_stop{outline:1px solid #87dfff!important;background-color:rgba(45,45,45,.4)!important}#ad-native-c{width:0!important;height:0!important;display:block!important;overflow:auto!important;pointer-events:none!important;opacity:0!important}#message-scoller_forum{background:0 0!important;background-color:rgba(45,45,45,.4)!important}#send_msg_div_forum{background:0 0!important;background-color:rgba(45,45,45,.4)!important}#chatRoom{background-color:rgba(0,0,0,0)!important}#chatRoom{border:1px solid rgba(255,255,255,.4)!important}.as-mes-wrapper .msg-log a:link{color:#87dfff!important}.as-mes-wrapper .msg-log{border:1px solid rgba(255,255,255,.4)!important}.msg-log-title{color:#fff!important}.msg-log-time{color:rgba(250,190,255,.8)!important}.msg-log{background-color:rgba(45,45,45,.4)!important;color:#fff!important}.bh-b-title{background-color:rgba(0,0,0,0)!important}#send_msg_div{background-color:rgba(255,255,255,.75)!important}#message-input__editer_forum{background-color:rgba(255,255,255,0)!important;color:#fff!important}.as-mes-wrapper .message-input__editer::placeholder{color:rgba(255,255,255,0)!important}.message-input__toolbar img{-webkit-filter:brightness(2);opacity:1!important}.message-input__toolbar .mini-input:hover{outline:solid 2px #87dfff!important}.as-mes-wrapper .btn-send-message{background:0 0!important}.managertools{border:1px solid rgba(255,255,255,.4)!important;background:0 0!important;background-color:rgba(45,45,45,.4)!important}.managertools .btn--sm{background:rgba(0,0,0,.4)!important;color:#fff!important;border:1px solid rgba(255,255,255,.4)!important}.managertools .btn--sm:hover{border:1px solid #87dfff!important}.btn--sm{color:#fff!important}#auseNum{margin:0!important;padding:0!important;position:relative!important;height:60px!important}.FM-master-btn>a{background:rgba(0,0,0,.4)!important;border:1px solid rgba(255,255,255,.4)!important;color:#fff!important}.FM-master-btn>a:hover{border:1px solid #87dfff!important}#auseNum font{margin:10px 0!important;padding:5px!important;display:inline-block;background-color:rgba(0,0,0,.4)!important;color:#fff!important}#auseNum font a font{font-weight:900;color:#f36d3c!important;background-color:rgba(0,0,0,0)!important;margin:0!important}#auseNum font a font:hover{font-weight:900;color:#ac29ac!important;margin:0!important}#BH-master div p[style]{color:#000!important}.b-list_ad{height:0!important;width:0!important;border:none!important;margin:0!important;padding:0!important;overflow:hidden!important;opacity:0!important;pointer-events:none!important;display:block!important;position:absolute!important}.reply-content img{transition:all .3s}.reply-content:hover img{transition:all .5s cubic-bezier(1,.09,1,-.315);max-width:100%!important;max-height:500px!important}.c-reply__item:hover{background-color:rgba(0,0,0,0)!important}.b-list__main{position:relative!important}.b-list__main__title:visited{color:#868686!important}.c-article__content span[style=\"color: #333333\"]{background-color:rgba(255,255,255,.6)}.c-article__content font[color=\"#474e56\"]{background-color:rgba(255,255,255,.6)}#btn_quick{border:1px solid rgba(255,255,255,.4)!important;background-color:rgba(45,45,45,.4)!important}#btn_quick:hover{border:1px solid #87dfff!important}.forum_list{background-color:rgba(45,45,45,.4)!important}.forum_list:hover{background-color:rgba(0,0,0,.6)!important}.forum_list a{color:#fff!important}.forum_list_title span:first-child{color:#fff!important;opacity:.4}#data-container .BH-table{background-color:rgba(45,45,45,.4)!important}.BH-table1 tr:nth-child(2n+1){background-color:rgba(0,0,0,.2)!important}#data-container .BH-table a{color:#fff!important}#data-container .BH-table tr:hover{background-color:rgba(0,0,0,1)!important}.right-child{background:rgba(45,45,45,.4)!important}div[data-template-id=\"#tagList\"]{box-shadow:0 5px 10px rgba(0,0,0,.7)!important}div[data-template-id=\"#tagList\"] .tag-list{background-color:rgba(230,230,230,.9)!important}div[data-template-id=\"#tagList\"] .tag-list .username{color:#000!important}div[data-template-id=\"#tagList\"] .tag-list h3{color:rgba(255,120,20,1)!important;border-top:none!important;margin-top:10px!important;border-bottom:2px solid rgba(255,120,20,1)!important;font-size:18px!important;font-weight:900!important}div[data-template-id=\"#tagList\"] .enter{background:0 0!important}.c-menu__scrolldown{background-color:rgba(0,0,0,.7)!important;color:#fff!important;position:relative;margin-bottom:0;box-shadow:0 0 0 transparent!important}.c-menu__scrolldown a,.c-menu__scrolldown h1{color:#fff!important}.toolbar a:hover{color:#87dfff!important}#BH-menu-path,.BH-menuE,.c-menu{border-top:none!important}#BH-menu-path{background-color:rgba(0,0,0,0)!important}.BH-menu fixed{background-color:rgba(0,0,0,0)!important}.c-menu{box-shadow:0 0 0 transparent!important;background:rgba(0,0,0,0)!important}.c-post{color:#fff!important;background-color:rgba(45,45,45,.4)!important;border:1px solid rgba(255,255,255,.4)!important}.c-article__content{color:#fff}.c-post a[href]{color:#87dfff}.c-post__body{border-top:solid 1px rgba(255,255,255,.4)!important;padding-top:30px!important}.c-post__body__signature{border-top:1px solid rgba(255,255,255,.4)!important}.username{color:#fff!important}.edittime{color:rgba(255,255,255,.7)!important}.c-post__footer{color:#fff;background-color:rgba(0,0,0,0);border-top:solid 1px rgba(255,255,255,.4)!important}.c-reply{background:rgba(0,0,0,0)!important}.c-reply span{color:#fff}.c-reply a[href]{color:#87dfff!important}.c-reply a[href]:hover{text-decoration:underline!important}.jumptocomment button{background:0 0!important;background-color:rgba(45,45,45,.4)!important;border:1px solid rgba(255,255,255,.4)!important}.jumptocomment button:hover{border:1px solid #87dfff!important}.reply-input{background-color:rgba(0,0,0,0)!important;border:1px solid rgba(255,255,255,.4)!important;color:#fff!important}.content-edit{background-color:rgba(0,0,0,0)!important;color:#fff!important}.reply-input div{color:#fff!important}.c-section__main{background-color:rgba(45,45,45,.4)!important;border:1px solid rgba(255,255,255,.4)!important}.c-section__main h1{color:#fff!important}.ql-editor{color:#fff;background-color:rgba(45,45,45,.4)!important;border:1px solid rgba(255,255,255,.4)!important}.option{background-color:rgba(0,0,0,0)!important}.c-section a{color:#fff}.c-section__main .next,.c-section__main .prev{height:52px;margin:-12px 0;line-height:50px!important;border-radius:0!important}.BH-pagebtnA a[href],.next,.prev{background-color:rgba(0,0,0,.4)!important}.c-test{background-color:rgba(45,45,45,.4);border:1px solid rgba(255,255,255,.4)!important}.c-quicktool .goback,.c-quicktool .gotop,.jumpfloor,.jumpfloor input{background-color:rgba(45,45,45,.4)!important;border:1px solid rgba(255,255,255,.4)!important;color:#fff}.c-quicktool .goback:hover,.c-quicktool .gotop:hover,.jumpfloor input:hover{border:1px solid #87dfff!important}.b-list-wrap{background-color:rgba(45,45,45,.4)!important;border:1px solid rgba(255,255,255,.4)!important;margin-top:30px}.b-list-wrap td{border-bottom:1px dotted rgba(255,255,255,.4)!important}.b-list__row:nth-child(2n+1){background-color:rgba(255,255,255,0)!important}.b-list__head{background-color:rgba(0,0,0,.5)!important}.b-list__row--sticky{background-color:rgba(30,100,80,0)!important;border-bottom:1px dotted rgba(255,255,255,.4)!important}.b-list-wrap tr:hover{background-color:rgba(0,0,0,.3)!important}.is-highlight{color:rgba(50,180,190,1)!important}.b-list__count__user a,.b-list__main__pages a,.b-list__time__user a{color:#87dfff!important}.b-list-wrap a{color:#fff!important}.b-list-wrap a:hover{color:#87dfff!important}.icon-photo{color:rgba(100,200,150,1)!important}.icon-video{color:rgba(250,100,150,1)!important}.icon-lock{color:rgba(150,100,200,1)!important}.b-list__main__pages{color:rgba(255,255,255,.7)!important}@keyframes highlight{0%{background:rgba(150,100,100,0)}50%{background:rgba(150,100,100,.5)}100%{background:rgba(150,100,100,0)}}@-moz-keyframes highlight{0%{background:rgba(150,100,100,0)}50%{background:rgba(150,100,100,.5)}100%{background:rgba(150,100,100,0)}}@-webkit-keyframes highlight{0%{background:rgba(150,100,100,0)}50%{background:rgba(150,100,100,.5)}100%{background:rgba(150,100,100,0)}}.b-popular{background-color:rgba(45,45,45,.4)!important;border:1px solid rgba(255,255,255,.4)!important}.b-popular a{color:#fff;outline:0!important}.b-popular .name:hover{color:#87dfff!important}.b-tags a{background-color:rgba(45,45,45,.4)!important;outline:1px solid rgba(255,255,255,.4)!important;color:#fff!important}.b-tags a:hover{outline:1px solid #87dfff!important}.BH-menuE a,.BH-menuE a:link{color:#fff!important;opacity:1!important}.dropList dl{background-color:rgba(0,0,0,.9)!important}#navBarHover{background:#117e96!important;box-shadow:0 0 0 0 transparent!important;border:none!important}.dropList a{background-color:rgba(0,0,0,0)!important}.BH-menuE,.BH_menu-search{background-color:rgba(0,0,0,.7)!important;color:#000!important}.c-menu__scrolldown .toolbar .back{margin-right:5px!important}.BH-menu-forumA-back .is-active{margin-right:5px!important}.BH-searchC input[type=text]{background-color:rgba(255,255,255,.3)!important;color:#fff!important;font-weight:700!important}.TOP-my ul>li{border:none!important}.TOP-btn a::before{color:#fff!important}.TOP-btn a{width:30px!important}.TOP-btn{border-right:1px solid rgba(255,255,255,.4)}.TOP-msg{background-color:rgba(45,45,45,.9)!important;color:#fff!important;border:2px solid #249db8!important}.TOP-msg span{background-color:rgba(0,0,0,0)!important;color:#fff}.TOP-msglist{background:0 0!important;background-color:none!important}.TOP-msglist a:hover,.TOP-msglist div:hover{background-color:rgba(45,45,45,.95)!important}.TOP-msglist div{border-top:1px solid rgba(255,255,255,.4)!important;background-color:rgba(0,0,0,0)!important;color:#fff!important}.TOP-msg .new{background-color:rgba(50,100,80,.5)!important;border:1px solid rgba(255,255,255,.4)!important}.TOP-msgpic{background-color:rgba(0,0,0,0)!important}.TOP-msgbtn{background-color:rgba(0,0,0,0)!important;border-top:2px solid #249db8!important}.TOP-msg [href]{color:#87dfff!important}.title textarea{background-color:rgba(255,255,255,.2)!important;color:#fff!important;border:1px solid rgba(255,255,255,.4)!important}.check-group h6{color:#fff!important}#topBarMsg_member ul li a:hover{background-color:rgba(0,0,0,0)!important}.TOP-board{background-color:rgba(0,0,0,0)!important}.TOP-more ul li:hover{background:Transparent!important;box-shadow:0 1px 3px 0 rgba(255,255,255,0)!important}.TOP-more ul:hover{background:rgba(0,0,0,0)!important}.TOP-more>div p{background:rgba(0,0,0,0)!important;color:#fff}#topBarMsg_member ul li:active,#topBarMsg_member ul li:focus,#topBarMsg_member ul li:hover{background:rgba(0,0,0,.7)}.TOP-msglist a:hover,.TOP-msglist div:hover{background-color:rgba(0,0,0,0)!important}.TOP-more>div.nav-platform ul li.platform-ac:hover{background-color:rgba(0,0,0,0)!important}#topBarMsgList_more a{color:#fff!important}.TOP-msgbtn a i{color:#87dfff!important}.TOP-bh{background-color:rgba(0,0,0,1)!important;background:rgba(0,0,0,1)!important;box-shadow:0 0 0 transparent!important}#BH-top-data{background-color:rgba(0,0,0,0)!important}#top_search_q{background-color:rgba(255,255,255,.3)!important;color:rgba(255,255,255,1)!important}.fb-like{display:none!important;height:0!important}#BH-ad_banner,#BH-bigbanner,#flySalve{opacity:0!important;height:0!important;pointer-events:none!important}.a-mercy-d{display:block;opacity:0!important;height:0!important;pointer-events:none!important;overflow-y:scroll!important}.forum-bottom-banner{opacity:0!important;height:0!important;pointer-events:none!important;overflow-y:scroll!important}.BH-rbox a{color:#fff!important}#BH-search{background-color:rgba(45,45,45,.4)!important}.FM-abox5B{background-color:rgba(0,0,0,0)!important}.FM-abox2A,.FM-abox8A{background-color:rgba(0,0,0,0)!important;color:#ddd!important}.BH-lbox{background-color:rgba(45,45,45,.4)!important;border:1px solid rgba(255,255,255,.4)!important}.FORUM-master_box1 strong{background-color:hsla(0,0%,18%,0)!important}.FORUM-master_box1 a,.FORUM-master_box1 p{color:#fff!important;border:0 solid rgba(255,255,255,.4)!important}.FORUM-master_box1 a:hover{color:#87dfff!important}.FORUM-master_box1 div{border:1px solid rgba(255,255,255,.4)!important;margin-bottom:5px!important;background-color:rgba(45,45,45,.4)!important;box-sizing:border-box}.FORUM-master_box1 div strong{background-color:rgba(0,0,0,.7)!important;border-bottom:1px solid rgba(255,255,255,.4)!important}.FM-abox2A a[href]{color:#87dfff!important}.FM-abox8 a{color:#fff!important}.BH-search2 input{background-color:#000!important;color:#ddd!important}.BH-search2 span{color:#000!important}.FM-abox6B a[href]{color:#87dfff!important}.ACG-box p,.ACG-box span{color:#fff!important}#BH-master h4{background-color:rgba(0,0,0,0)!important;color:#fff!important}#BH-master h4 img{display:none}.fmb,.fmb tr{background-color:rgba(0,0,0,0)!important;border-collapse:collapse;border:none!important}.fmb tr{border-bottom:0 solid rgba(255,255,255,.4)!important;border:1px solid rgba(255,255,255,.4)!important}.fmb tr:hover td{background-color:rgba(0,0,0,0)!important}.fmb td{background-color:rgba(45,45,45,.4)!important;border-bottom:none!important}.FM-blist a{color:#eee!important}.FM-row td{background-color:rgba(0,0,0,.5)!important;border-bottom:none!important}.FM-sticky td{background-color:rgba(40,70,50,.4)!important}.FM-blist4{color:#c5c!important}.FM-blist tr:hover{background-color:rgba(0,0,0,.4)!important}.FM-blist1 td{background:#000!important;background-color:#000!important}.FM-blist1 a{background:0 0!important;border:1px solid rgba(255,255,255,.4)!important}.FM-blist1 a:hover{border:1px solid #87dfff!important}.FM-blist2 a,.FM-blist3 span a{color:#87dfff!important}.FM-blist5{color:#ccc!important}.FM-blist5 a,.FM-blist6 a{color:#87dfff!important}.gplist,.gplist a{color:#000!important}#BH-main_menu,.BH-search2{background:0 0!important;background-color:rgba(45,45,45,.4)!important;border:1px solid rgba(255,255,255,.4)}#BH-main_menu a{color:#fff!important}.FM-tags{border-bottom:0 solid rgba(255,255,255,.4)!important;margin-bottom:10px!important}.FM-tags a{background:0 0!important;background-color:rgba(45,45,45,.4)!important;color:#fff!important;border:1px solid rgba(255,255,255,.4)!important}.FM-tags a:hover{border:1px solid #87dfff!important}#FM-tagsnow{background-color:#3c91c9!important;color:#000!important}#BH-pathbox a{color:#fff}#BH-slave h5{background-color:rgba(0,0,0,.7)!important;background:0 0;border:1px solid rgba(255,255,255,.4)!important;border-bottom:none!important}.BH-rbox{color:#fff;background-color:rgba(45,45,45,.4)!important;border:1px solid rgba(255,255,255,.4)!important}.BH-rbox a[href]{color:#87dfff!important}.FM-cbox1{background-color:rgba(45,45,45,.4)!important;color:#fff!important;margin-bottom:30px!important;border:1px solid rgba(255,255,255,.4)!important}.FM-cbox7 a:link{color:#87dfff!important}.FM-cbox7 a:visited{color:#c78dff!important}.FM-cbox5 a:link{color:#87dfff!important}.FM-cbox2{background:0 0!important;color:#fff!important;border-bottom:1px solid rgba(255,255,255,.4)!important}.FM-cbox3{background:0 0!important;background-color:#000!important;color:#fff!important;border-bottom:1px solid rgba(255,255,255,.4)!important}.FM-cbox9{border-top:1px solid rgba(255,255,255,.4)!important}.FM-cbox9 p a{background:0 0!important;background-color:rgba(45,45,45,.4)!important;color:#87dfff!important}.FM-cbox4 a{border:1px solid rgba(255,255,255,.4)!important;background:0 0!important;background-color:rgba(45,45,45,.4)!important;color:#ddd!important}.FM-cbox4 a:hover{border:1px solid #87dfff!important}.FM-cbox10 button{background-color:#000!important;color:#ddd!important}.FM-cbox10D{border-top:1px solid rgba(255,255,255,.4)!important;border-bottom:1px solid rgba(255,255,255,.4)!important;background-color:rgba(0,0,0,0)!important}.FM-cbox10D a{color:#87dfff!important;border:1px solid rgba(255,255,255,.4)!important;background-color:rgba(45,45,45,.4)!important;padding:5px!important;line-height:30px!important}.FM-cbox10D a:hover{border:1px solid #87dfff!important}.FM-msgbg a{color:#58c!important}.FM-msgbg span{color:#585!important}.FM-cbox10,.FM-cbox10A{background:0 0!important;border-bottom:1px solid rgba(255,255,255,.4)!important}.FM-cbox10C textarea{background-color:rgba(255,255,255,.2)!important;color:#fff!important;border:1px solid rgba(255,255,255,.4)!important}.FM-reply,.FM-replyB{background-color:rgba(45,45,45,.4)!important;border:1px solid rgba(255,255,255,.4)!important;color:#ddd!important}#reply0{background-color:rgba(255,255,255,.2)!important;color:#fff!important;border:1px solid rgba(255,255,255,.4)!important}.FM-replyA input[type=text]{background-color:rgba(255,255,255,.2)!important;color:#fff!important;border:1px solid rgba(255,255,255,.4)!important;width:80px!important;padding:5px}.FM-replyA button,.FM-replyC a[style]{background-color:rgba(45,45,45,.4)!important;color:#87dfff!important;border:1px solid rgba(255,255,255,.4)!important;padding:3px}.FM-replyA button:hover,.FM-replyC a[style]:hover{border:1px solid #87dfff!important}.editstyle{background:0 0!important;background-color:#fff!important;color:#000!important}.FM-blist8{border:1px solid rgba(255,255,255,.4)!important;margin-top:10px!important}.FM-blist8 a{border:none!important}.popular .popular__item .img{outline:0!important}.popular .popular__item .name:hover{color:#87dfff!important}#BH-footer{color:rgba(255,255,255,.4)!important;border:none}#_bhrte_btn_rte,#_bhrte_btn_text{background-color:#ccc}#form1 .FM-lbox3C{color:#cac!important}.FM-abmbar{background-color:rgba(0,0,0,0)!important}.FM-stb1,.FM-stb1 tr{background-color:rgba(45,45,45,.4)!important;color:#fff!important}.FM-stb1 tr td,.FM-stb1 tr td a{color:#fff!important}.FM-stb1 tr td span{color:#afc!important}.FM-sbox3B table a{color:#fff!important}.FM-abox5B a[href],.FM-abox5B a[href] font[color]{color:#87dfff!important}#BH-master div.FM-lbox4 a[href],#BH-master div.FM-lbox4 a[href] font[color]{color:#87dfff!important}.FM-cbox7 a[href],.FM-cbox7 a[href] font[color]{color:#87dfff!important}.FM-blist8 p:hover{outline:1px solid #87dfff!important}.FM-cbox9 .back:hover,.FM-lbox1 button:hover,.FM-msgbg button:hover,button[name=accuse_tip]:hover{border:1px solid #87dfff!important}.FM-lbox1 button,.FM-msgbg button,button[name=accuse_tip]{background-color:rgba(45,45,45,.4)!important;color:#fff!important;border:1px solid rgba(255,255,255,.4)!important;line-height:0}#BH-pagebtn a:link{background:rgba(0,0,0,.4)!important;color:#fff!important;border:1px solid rgba(255,255,255,.4)!important}#BH-pagebtn a{color:#fff!important}#BH-pagebtn a:hover{border:1px solid #87dfff!important;background:rgba(0,0,0,.4)!important}#BH-pagebtn .no,#BH-pagebtn .pagenow{border:1px solid rgba(255,255,255,.4)!important}#BH-pagebtn .pagenow:hover{background-color:#148aa4!important}#BH-pagebtn .no{background-color:rgba(45,45,45,.4)!important;color:#444!important;opacity:0}#BH-pagebtn .no:hover{border:1px solid rgba(255,255,255,.4)!important}.BH-qabox1 button{background:rgba(0,0,0,.4)!important;color:#fff!important;border:1px solid rgba(255,255,255,.4)!important}.BH-qabox1 button:hover{border:1px solid #87dfff!important}.FM-blist table,.FM-blist table td,.FM-blist table tr{border:none!important;background:rgba(0,0,0,0)!important;color:rgba(240,255,205,1)!important}body div[style*=\"position: fixed; left: 20px; right: 20px;\"]{display:block!important;opacity:0!important;height:0!important;pointer-events:none!important}#searchbox{background:rgba(255,255,255,.4)!important}.gcse-wrapper{background-color:rgba(0,0,0,0)!important}.gsc-control-cse{background-color:rgba(0,0,0,0)!important}.gsc-results .gsc-imageResult,.gsc-webResult.gsc-result{background-color:rgba(0,0,0,0)!important}#old_search_searchbox{background-color:rgba(255,255,255,.2)!important;color:#fff!important}#old_search_form *{background-color:rgba(0,0,0,0)!important;color:#fff!important}.gcse-dropdown{background-color:rgba(0,0,0,.8)!important;color:#fff!important}.gcse-suggest-tag a{color:#87dfff!important}.gcse-dropdown span{color:#fff!important}.right-child{background-color:rgba(45,45,45,.4)!important;border:1px solid rgba(255,255,255,.4)!important}.right-child a{color:#87dfff!important}#chatRoom .msg-log-title{color:#fff!important}#chatRoom{padding:0!important}.as-mes-box .msg-log-title{color:#666!important}.as-mes-box .msg-log-time{color:#888!important}font[color=unset]{color:#fff!important}div[ge_shi_hua=true] .c-article__content *{background-color:rgba(0,0,0,0)!important;color:#fff!important;font-size:18px!important}div[ge_shi_hua=true] .c-article__content a:link{color:#87dfff!important}.ge_shi_hua{width:25px;height:25px;background-color:rgba(0,0,0,0);border:none;font-size:14px;color:rgba(255,255,255,.4);float:right;text-align:center;line-height:25px;margin-top:-25px;background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ0Mi4wMzUgNDQyLjAzNSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDQyLjAzNSA0NDIuMDM1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPGc+Cgk8cGF0aCBkPSJNMjQ4LjIyNywzOTkuMjAxYy05LjYxNiwwLTE3LjQ4Myw3Ljg2Ny0xNy40ODMsMTcuNDgzczcuODY3LDE3LjQ4MywxNy40ODMsMTcuNDgzSDQwOC40OSAgIGM5LjYxNiwwLDE3LjQ4My03Ljg2NywxNy40ODMtMTcuNDgzVjEzOC40MDljMC00Ljk1NC0yLjA0LTkuNjE2LTUuNTM2LTEyLjgyMUwyODkuMzEzLDQuNjYyQzI4Ni4xMDgsMS43NDgsMjgxLjczNywwLDI3Ny4zNjYsMCAgIEg4Mi4xMzZDNzIuNTIsMCw2NC42NTMsNy44NjcsNjQuNjUzLDE3LjQ4M3YxODkuNDAyYzAsOS42MTYsNy44NjcsMTcuNDgzLDE3LjQ4MywxNy40ODNzMTcuNDgzLTcuODY3LDE3LjQ4My0xNy40ODNWMzQuOTY3ICAgaDEzOS44NjZ2MTUxLjUyMmMwLDkuNjE2LDcuODY3LDE3LjQ4MywxNy40ODMsMTcuNDgzaDEzMS4xMjVjMC44NzQsMCwyLjA0LDAsMi45MTQtMC4yOTF2MTk1LjUyMUgyNDguMjI3eiBNMzg4LjA5MywxNjkuMDA1ICAgSDI3NC40NTJWMzguNDYzbDExNi41NTUsMTA3LjUyMnYyMy4zMTFDMzkwLjEzMywxNjkuMDA1LDM4OC45NjcsMTY5LjAwNSwzODguMDkzLDE2OS4wMDV6IE0yMS4yMzYsNDEyLjAyMmw0MS4wODYtNDEuMDg2ICAgbC0zOS4wNDYtMzkuMDQ2Yy02LjcwMi02LjcwMi02LjcwMi0xNy43NzUsMC0yNC43NjhjNi43MDItNi43MDIsMTcuNzc1LTYuNzAyLDI0Ljc2OCwwbDM5LjA0NiwzOS4wNDZsMzcuMDA2LTM3LjAwNiAgIGM2LjcwMi02LjcwMiwxNy43NzUtNi43MDIsMjQuNzY4LDBjNi43MDIsNi43MDIsNi43MDIsMTcuNzc1LDAsMjQuNzY4bC0zNy4wMDYsMzcuMDA2bDM5LjA0NiwzOS4wNDYgICBjNi43MDIsNi43MDIsNi43MDIsMTcuNzc1LDAsMjQuNzY4Yy0zLjQ5NywzLjQ5Ny03Ljg2Nyw1LjI0NS0xMi4yMzgsNS4yNDVzLTkuMDMzLTEuNzQ4LTEyLjIzOC01LjI0NWwtMzkuMDQ2LTM5LjA0NiAgIEw0Ni4yOTUsNDM2Ljc5Yy0zLjQ5NywzLjQ5Ny03Ljg2Nyw1LjI0NS0xMi4yMzgsNS4yNDVzLTkuMDMzLTEuNzQ4LTEyLjIzOC01LjI0NUMxNC4yNDMsNDMwLjA4OSwxNC4yNDMsNDE5LjAxNiwyMS4yMzYsNDEyLjAyMnoiIGZpbGw9IiNGRkZGRkYiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K);background-size:22px 22px;background-position:center center;background-repeat:no-repeat;opacity:.4}.ge_shi_hua:hover{background-color:rgba(0,0,0,.4);opacity:1}#filter-subbsn option{color:#000!important}";

        css += 擴充CSS;

        /* 把背景圖片轉成base64 */
        if (背景圖片網址 == GM_getValue("bac_img_url")) {
            背景圖片網址 = GM_getValue("bac_base64");
        } else {
            if (背景圖片網址.substr(0, 4).toLowerCase() == "http") {
                toDataURL(背景圖片網址, function(dataUrl) {
                    GM_setValue("bac_base64", dataUrl);
                    GM_setValue("bac_img_url", 背景圖片網址);
                    console.log("深色主題-重新下載圖片");
                });
            }
        }

        document.addEventListener("DOMContentLoaded", function() {
            func_簡化文章列表的超連結();
            func_文章列表插入水平線();
            func_文章內容格式化();
            func_文章文字顏色反轉();
        });
    }

    /* Google搜尋的頁面 */
    if (url.indexOf("https://forum.gamer.com.tw/search") === 0) {
        css += "#BH-master{background:rgba(0,0,0,.4)!important;border:1px solid rgba(255,255,255,.4)!important}.gcse-tab-child{color:#fff!important}.gcse-forum #filter-subbsn,.gcse-forum option,.gcse-forum span,.gsc-orderby-label,.gsc-selected-option{color:#fff!important}.gcse-forum .gcse-forum-select,.gsc-option-menu-container{color:#fff!important;border:1px solid rgba(255,255,255,.4)!important;color:#fff!important}.gsc-control-cse{background:rgba(0,0,0,0)!important}.gsc-webResult{background:rgba(0,0,0,0)!important;border-bottom:1px solid rgba(255,255,255,.4)!important}.gs-title{color:#87dfff!important;text-decoration:none!important}.gs-bidi-start-align{color:#fff!important}.gs-bidi-start-align b,.gs-title b{color:#afc!important}.right-child{background:rgba(0,0,0,.4)!important;border:1px solid rgba(255,255,255,.4)!important;color:#fff!important}.right-child h3{color:#fff!important}.right-child a{color:#87dfff!important}";
    }

    /*YouTube 隱藏廣告、隱藏推薦影片 */
    if (url.indexOf("https://www.youtube.com/") === 0) {
        css += ".controls , .ad-container{ display:block!important; opacity:0!important; height:0px!important; pointer-events:none!important; }" + ".ytp-pause-overlay{ display:none; }";
    }

    /* 全域套用的CSS */
    css += "";

    /* 修改背景圖片 */
    css = css.replace(/bac_img_color/g, 背景圖片上面的漸層顏色);
    css = css.replace(/bac_img_url/g, 背景圖片網址);

    /* 插入 CSS */
    if (typeof GM_addStyle != "undefined") {
        GM_addStyle(css);
    } else if (typeof PRO_addStyle != "undefined") {
        PRO_addStyle(css);
    } else if (typeof addStyle != "undefined") {
        addStyle(css);
    } else {
        var node = document.createElement("style");
        node.type = "text/css";
        node.appendChild(document.createTextNode(css));
        var heads = document.getElementsByTagName("html");
        if (heads.length > 0) {
            heads[0].appendChild(node);
        } else {
            document.documentElement.appendChild(node);
        }
    }

    /**
     * 把文章列表有圖片的文章放在前面
     */
    /*function func_把文章列表有圖片的文章放在前面() {
        var obj_wrap = document.getElementsByClassName("b-imglist-wrap")[0];

        //如果不是在縮圖模式，就離開
        if (obj_wrap == undefined) {
            return;
        }

        //取得每一筆文章
        var ar_row = document.getElementsByClassName("b-list__row");

        // 把 HTMLCollection 轉成 array
        var ar_row_2 = [];
        for (var i = 0; i < ar_row.length; i++) {
            ar_row_2.push(ar_row[i]);
        }
        //如果是沒有圖片的文章，就插到最後面
        for (var i = 0; i < ar_row_2.length; i++) {
            //避免處理置頂文章
            if (ar_row_2[i].getAttribute("class").indexOf("b-list__row--sticky") > -1) {
                continue;
            }
            //不存在圖片
            if (ar_row_2[i].getElementsByClassName("b-list__img").length == 0) {
                obj_wrap.appendChild(ar_row_2[i]); //挪到最後面
            }
        }
    }*/

    /**
     * 避免文章內容看不清楚，所以新增一個可以格式化文章顏色的按鈕
     */
    function func_文章內容格式化() {
        try {
            let ar_tools = document.getElementsByClassName("c-post__header");
            for (let i = 0; i < ar_tools.length; i++) {
                let obj_but = document.createElement("but");
                obj_but.innerHTML = "";
                obj_but.title = "格式化文章顏色";
                obj_but.setAttribute("class", "ge_shi_hua");
                let obj_this = ar_tools[i];
                obj_but.onclick = function() {
                    //套用CSS
                    if (obj_this.parentNode.getAttribute("ge_shi_hua") == "true") {
                        obj_this.parentNode.setAttribute("ge_shi_hua", "");
                    } else {
                        obj_this.parentNode.setAttribute("ge_shi_hua", "true");
                    }
                };
                ar_tools[i].parentNode.insertBefore(obj_but, ar_tools[i].nextSibling.nextSibling);
            }
        } catch (error) {
            console.log("深色主題、文章內容格式化、Error");
        }
    }

    /**
     * 簡化文章列表的超連結，避免css的visited無法順利變色
     */
    function func_簡化文章列表的超連結() {
        try {
            let ar_list = document.getElementsByClassName("b-list__main__title");
            if (ar_list === undefined) {
                return;
            }
            for (let i = 0; i < ar_list.length; i++) {
                let s_href = ar_list[i].href;
                let int_index = s_href.indexOf("&tnum=");
                if (int_index > 0) {
                    ar_list[i].href = s_href.substr(0, int_index);
                }
            }
        } catch (error) {
            console.log("深色主題、簡化文章列表的超連結、Error");
        }
    }

    /**
     *區分文章列表的置頂公告與一般文章
     */
    function func_文章列表插入水平線() {
        try {
            var obj_45 = document.getElementsByClassName("b-list__row--sticky");

            if (obj_45.length === 0) {
                return;
            }
            var obj_46 = obj_45[obj_45.length - 1];
            var obj_47 = document.createElement("tr");
            obj_47.style.height = "20px";
            obj_47.style.background =
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUAQMAAADFiO34AAAABlBMVEUAAAD///+l2Z/dAAAAAnRSTlMAZtJCCVUAAAArSURBVAjXYwACBQYQcEAiG0AEIwOCZAKTLEgkBxIpwIAwRgHZGHTDmOAkAKrqAtL90ZhdAAAAAElFTkSuQmCC)";
            obj_47.innerHTML = "<td colspan='20'></td>";
            obj_47.style.pointerEvents = "none";
            obj_47.setAttribute("class", "b-list__hr");

            obj_46.parentNode.insertBefore(obj_47, obj_46.nextSibling);
        } catch (error) {
            console.log("深色主題、文章列表插入水平線、Error");
        }
    }

    /**
     * 圖片轉base64
     * @param {*} url
     * @param {*} callback
     */
    function toDataURL(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            var reader = new FileReader();
            reader.onloadend = function() {
                callback(reader.result);
            };
            reader.readAsDataURL(xhr.response);
        };
        xhr.open("GET", url);
        xhr.responseType = "blob";
        xhr.send();
    }

    /**
     * 文章文字顏色反轉
     */
    function func_文章文字顏色反轉() {
        /*
* 巴哈姆特，文章文字顏色反轉
* 將巴哈姆特文章的顏色反轉
* 例如:黑色文字→白色文字、深藍色→淺黃色
* 可避免「深色主題」的深色文字看不清楚的問題
*
* 最後修改日期：2018 / 04 / 12
* 作者：hbl917070(深海異音)
* https://home.gamer.com.tw/homeindex.php?owner=hbl917070
*/

//--------------------------------------------------------------

var m = new Main();

m.fun_文字底色與顏色();
m.fun_表格tr();
m.fun_表格td();

//--------------------------------------------------------------

function Main() {
  /**
   *
   */
  this.fun_文字底色與顏色 = function() {
    var obj = document.getElementsByTagName("font");

    for (var i = 0; i < obj.length; i++) {
      var b = turnColor_rgb(obj[i].style.backgroundColor); //文字背景色
      if (b != "") {
        obj[i].style.backgroundColor = b;
      }

      var c = turnColor(obj[i].color) + ""; //文字顏色
      if (c != "") {
        obj[i].color = c;
      }
    }
  };
  /**
   *
   */
  this.fun_表格tr = function() {
    var obj = document.getElementById("BH-master").getElementsByTagName("tr");
    for (var i = 0; i < obj.length; i++) {
      var b = turnColor_rgb(obj[i].bgColor); //表格背景色
      if (b != "") {
        obj[i].bgColor = b;
      }
    }
  };
  /**
   *
   */
  this.fun_表格td = function() {
    var obj = document.getElementById("BH-master").getElementsByTagName("td");
    for (var i = 0; i < obj.length; i++) {
      var b = turnColor_rgb(obj[i].bgColor); //表格背景色
      if (b != "") {
        obj[i].bgColor = b;
      }
    }
  };

  /**
   *
   * @param {*} c
   */
  function turnColor(c) {
    /*文字顏色*/
    var cc = [new Array("windowtext", "#000000"),new Array("black", "#000000"),new Array("aliceblue", "#f0f8ff"),new Array("cadetblue", "#5f9ea0"),new Array("lightyellow", "#ffffe0"),new Array("coral", "#ff7f50"),new Array("dimgray", "#696969"),new Array("lavender", "#e6e6fa"),new Array("darkcyan", "#008b8b"),new Array("lightgoldenrodyellow", "#fafad2"),new Array("tomato", "#ff6347"),new Array("gray", "#808080"),new Array("lightslategray", "#778899"),new Array("teal", "#008080"),new Array("lemonchiffon", "#fffacd"),new Array("orangered", "#ff4500"),new Array("darkgray", "#a9a9a9"),new Array("slategray", "#708090"),new Array("seagreen", "#2e8b57"),new Array("wheat", "#f5deb3"),new Array("red", "#ff0000"),new Array("silver", "#c0c0c0"),new Array("darkslategray", "#2f4f4f"),new Array("darkolivegreen", "#556b2f"),new Array("burlywood", "#deb887"),new Array("crimson", "#dc143c"),new Array("lightgrey", "#d3d3d3"),new Array("lightsteelblue", "#b0c4de"),new Array("darkgreen", "#006400"),new Array("tan", "#d2b48c"),new Array("mediumvioletred", "#c71585"),new Array("gainsboro", "#dcdcdc"),new Array("steelblue", "#4682b4"),new Array("green", "#008000"),new Array("khaki", "#f0e68c"),new Array("deeppink", "#ff1493"),new Array("white", "#ffffff"),new Array("royalblue", "#4169e1"),new Array("forestgreen", "#228b22"),new Array("yellow", "#ffff00"),new Array("hotpink", "#ff69b4"),new Array("snow", "#fffafa"),new Array("midnightblue", "#191970"),new Array("mediumseagreen", "#3cb371"),new Array("gold", "#ffd700"),new Array("palevioletred", "#db7093"),new Array("ghostwhite", "#f8f8ff"),new Array("navy", "#000080"),new Array("darkseagreen", "#8fbc8f"),new Array("orange", "#ffa500"),new Array("pink", "#ffc0cb"),new Array("whitesmoke", "#f5f5f5"),new Array("darkblue", "#00008b"),new Array("mediumaquamarine", "#66cdaa"),new Array("sandybrown", "#f4a460"),new Array("lightpink", "#ffb6c1"),new Array("floralwhite", "#fffaf0"),new Array("mediumblue", "#0000cd"),new Array("aquamarine", "#7fffd4"),new Array("darkorange", "#ff8c00"),new Array("thistle", "#d8bfd8"),new Array("linen", "#faf0e6"),new Array("blue", "#0000ff"),new Array("palegreen", "#98fb98"),new Array("goldenrod", "#daa520"),new Array("magenta", "#ff00ff"),new Array("antiquewhite", "#faebd7"),new Array("dodgerblue", "#1e90ff"),new Array("lightgreen", "#90ee90"),new Array("peru", "#cd853f"),new Array("fuchsia", "#ff00ff"),new Array("papayawhip", "#ffefd5"),new Array("cornflowerblue", "#6495ed"),new Array("springgreen", "#00ff7f"),new Array("darkgoldenrod", "#b8860b"),new Array("violet", "#ee82ee"),new Array("blanchedalmond", "#ffebcd"),new Array("deepskyblue", "#00bfff"),new Array("mediumspringgreen", "#00fa9a"),new Array("chocolate", "#d2691e"),new Array("plum", "#dda0dd"),new Array("bisque", "#ffe4c4"),new Array("lightskyblue", "#87cefa"),new Array("lawngreen", "#7cfc00"),new Array("sienna", "#a0522d"),new Array("orchid", "#da70d6"),new Array("moccasin", "#ffe4b5"),new Array("skyblue", "#87ceeb"),new Array("chartreuse", "#7fff00"),new Array("saddlebrown", "#8b4513"),new Array("mediumorchid", "#ba55d3"),new Array("navajowhite", "#ffdead"),new Array("lightblue", "#add8e6"),new Array("greenyellow", "#adff2f"),new Array("maroon", "#800000"),new Array("darkorchid", "#9932cc"),new Array("peachpuff", "#ffdab9"),new Array("powderblue", "#b0e0e6"),new Array("lime", "#00ff00"),new Array("darkred", "#8b0000"),new Array("darkviolet", "#9400d3"),new Array("mistyrose", "#ffe4e1"),new Array("paleturquoise", "#afeeee"),new Array("limegreen", "#32cd32"),new Array("brown", "#a52a2a"),new Array("darkmagenta", "#8b008b"),new Array("lavenderblush", "#fff0f5"),new Array("lightcyan", "#e0ffff"),new Array("yellowgreen", "#9acd32"),new Array("firebrick", "#b22222"),new Array("purple", "#800080"),new Array("seashell", "#fff5ee"),new Array("cyan", "#00ffff"),new Array("olivedrab", "#6b8e23"),new Array("indianred", "#cd5c5c"),new Array("indigo", "#4b0082"),new Array("oldlace", "#fdf5e6"),new Array("aqua", "#00ffff"),new Array("olive", "#808000"),new Array("rosybrown", "#bc8f8f"),new Array("darkslateblue", "#483d8b"),new Array("ivory", "#fffff0"),new Array("turquoise", "#40e0d0"),new Array("darkkhaki", "#bdb76b"),new Array("darksalmon", "#e9967a"),new Array("blueviolet", "#8a2be2"),new Array("honeydew", "#f0fff0"),new Array("mediumturquoise", "#48d1cc"),new Array("palegoldenrod", "#eee8aa"),new Array("lightcoral", "#f08080"),new Array("mediumpurple", "#9370db"),new Array("mintcream", "#f5fffa"),new Array("darkturquoise", "#00ced1"),new Array("cornsilk", "#fff8dc"),new Array("salmon", "#fa8072"),new Array("slateblue", "#6a5acd"),new Array("azure", "#f0ffff"),new Array("lightseagreen", "#20b2aa"),new Array("beige", "#f5f5dc"),new Array("lightsalmon", "#ffa07a"),new Array("mediumslateblue", "#7b68ee")];

    if (color == "") return "";

    for (var i = 0; i < cc.length; i++) {
      /*把英文名字的顏色轉成色碼*/
      if (c.toLowerCase() == cc[i][0].toLowerCase()) {
        c = cc[i][1];
        break;
      }
    }

    color = c.replace("#", "");
    var color = (0xffffff - Math.floor("0x" + color)).toString(16);
    var len = 6 - color.length;
    for (var i = 0; len != i; i++) {
      color = "0" + color;
    }

    if (color == "000NaN") return "";
    else return "#" + color;
  }

  /**
   *
   * @param {*} color
   */
  function turnColor_rgb(color) {
    /*文字底色*/

    if (color == "") return "";

    if (color.toLowerCase().indexOf("rgb") > -1) {
      var c = color;
      c = c.replace(" ", "");
      c = c.replace(" ", "");
      c = c.replace("rgb(", "");
      c = c.replace(")", "");
      var ar = c.split(",");

      var x1 = 255 - Number(ar[0] + "");
      var x2 = 255 - Number(ar[1] + "");
      var x3 = 255 - Number(ar[2] + "");

      var x = "rgb(" + x1 + "," + x2 + "," + x3 + ")";

      return x;
    }

    return turnColor(color); /*如果不是rgb模式，就用一般的反轉*/
  }
}

    }
})();


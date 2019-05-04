// ==UserScript==
// @name          css-巴哈姆特深色主題 - 首頁、登入畫面
// @namespace     hbl917070
// @description	  巴哈姆特深色主題 - 首頁、登入畫面
// @author        hbl917070(深海異音)
// @homepage      https://home.gamer.com.tw/homeindex.php?owner=hbl917070
// @include       https://www.gamer.com.tw/
// @include       https://www.gamer.com.tw/index*
// @include       https://user.gamer.com.tw/login.php
// @run-at        document-start
// @grant         GM_getValue
// @grant         GM_setValue
// @version       0.14
// ==/UserScript==

/*
標題：css-巴哈姆特深色主題 - 首頁、登入畫面
範圍：首頁、登入畫面
最後修改日期：2018 / 07 / 07
作者：hbl917070（深海異音）
說明：https://forum.gamer.com.tw/C.php?bsn=60076&snA=2621599

預設背景圖片來源：https://www.pixiv.net/member_illust.php?mode=medium&illust_id=61945737
*/

(function() {
  // ▼ ▼ ▼ 這裡的設定可以修改 ▼ ▼ ▼

  var 背景圖片網址 = "https://i.imgur.com/d5fXfwG.jpg";

  var 背景圖片上面的漸層顏色 =
    "linear-gradient(90deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.2) 100%)";

  // ▲ ▲ ▲ 這裡的設定可以修改 ▲ ▲ ▲

  //-----------------------

  //設定技巧

  //背景圖片網址：
  //輸入「圖片網址」或「base64」，圖片大小盡量不要使用超過500k，不然可能會造成網頁lag
  //可以把要使用的圖片上傳的imgur。https://imgur.com/
  //或是把圖片透過DataURL.net轉換成bese64格式。http://dataurl.net/#dataurlmaker

  //背景圖片上面的漸層顏色：
  //deg：代表漸層的角度，所以「90deg」就是「水平由左至右」
  //角度後面有兩個rgba()：第一個是漸層的起始的顏色，第二個是漸層結束的顏色
  //rgba() 後面的 0% 跟 100%：就是起始跟結尾的意思，基本上不用修改
  //rgba 四個參數分別是 (紅, 綠, 藍, 透明度)
  //rgba(255,255,255,1) = 白色
  //rgba(0,0,0,1) =       黑色
  //rgba(255,0,0,1) =     紅色
  //rgba(0,0,0, 0.3) =    30%透明的黑色
  //rgba(0,0,0,0) =       完全透明

  //如果不想用背景圖片可以兩個rgba都輸入 rgba(45,45,45,1)

  //-----------------------------------

  var css = "";
  var url = document.location.href;

  /**
   *
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

  if (
    url.indexOf("https://www.gamer.com.tw/index") === 0 ||
    url == "https://www.gamer.com.tw/"
  ) {
    css =
      "body{background-image:bac_img_color,url(bac_img_url)!important;background-attachment:fixed!important;background-position:center center!important;background-repeat:no-repeat!important;background-size:cover!important;background-color:rgba(45,45,45,1)!important}#rivers figure{background:rgba(45,45,45,.4)!important;border:1px solid rgba(255,255,255,.4)!important}#rivers figcaption a{color:#8edbff}.BA-top .TOP-btn a::before{color:#fff!important}.BA-top .TOP-my ul li a::before{color:#fff!important}#flyRightBox div{transform:scale(.3);transition:.3s transform}#flyRightBox div:hover{transform:scale(1)}.BA-topbg::after{background:0 0!important;background-image:none!important}#BH-background{color:#fff!important}.TOP-my a{color:#fff!important}[href]:hover{color:#87dfff!important}.BA-topbg{background:0 0!important;background-color:rgba(0,0,0,.5)!important}.BA-menu a{color:#fff}.BA-menu li a:hover{background-color:rgba(0,0,0,.6)!important}.TOP-bh{background-color:rgba(0,0,0,1)!important;background:rgba(0,0,0,1)!important;box-shadow:0 0 0 transparent!important}#BH-menu-path{background-color:rgba(0,0,0,0)!important}.BH-menuE a,.BH-menuE a:link{color:#fff!important;opacity:1!important}.dropList a{background-color:rgba(0,0,0,.9)!important}#navBarHover{background:#117e96!important;box-shadow:0 0 0 0 transparent!important;border:none!important}.TOP-my ul>li{border:none!important}.TOP-btn a::before{color:#fff!important}.TOP-btn a{width:30px!important}.TOP-btn{border-right:1px solid rgba(255,255,255,.4)}.TOP-msg{background-color:rgba(45,45,45,.9)!important;color:#fff!important;border:2px solid #249db8!important}.TOP-msg span{background-color:rgba(0,0,0,0)!important;color:#fff}.TOP-msglist{background:0 0!important;background-color:none!important}.TOP-msglist a:hover,.TOP-msglist div:hover{background-color:rgba(45,45,45,.95)!important}.TOP-msglist div{border-top:1px solid rgba(255,255,255,.4)!important;background-color:rgba(0,0,0,0)!important;color:#fff}.TOP-msg .new{background-color:rgba(50,100,80,.5)!important;border:1px solid rgba(255,255,255,.4)!important}.TOP-msgpic{background-color:rgba(0,0,0,0)!important}.TOP-msgbtn{background-color:rgba(0,0,0,0)!important;border-top:2px solid #249db8!important}.TOP-msg [href]{color:#87dfff!important}.title textarea{background-color:rgba(255,255,255,.2)!important;color:#fff!important;border:1px solid rgba(255,255,255,.4)!important}.check-group h6{color:#fff!important}#topBarMsg_member ul li a:hover{background-color:rgba(0,0,0,0)!important}.TOP-board{background-color:rgba(0,0,0,0)!important}.TOP-more ul li:hover{background:Transparent!important;box-shadow:0 1px 3px 0 rgba(255,255,255,0)!important}.TOP-more ul:hover{background:rgba(0,0,0,0)!important}.TOP-more>div p{background:rgba(0,0,0,0)!important;color:#fff}#topBarMsg_member ul li:active,#topBarMsg_member ul li:focus,#topBarMsg_member ul li:hover{background:rgba(0,0,0,.7)}.TOP-msglist a:hover,.TOP-msglist div:hover{background-color:rgba(0,0,0,0)!important}.TOP-more>div.nav-platform ul li.platform-ac:hover{background-color:rgba(0,0,0,0)!important}#topBarMsgList_more a{color:#fff!important}.TOP-msgbtn a i{color:#87dfff!important}.BA-serve{background-color:hsla(0,0%,18%,.5)!important;margin-top:30px;border:1px solid rgba(255,255,255,.4)!important}.BA-serve li a{color:#fff!important}.BA-cbox{transition:all .3s;background-color:rgba(45,45,45,.4)!important;border:1px solid rgba(255,255,255,.4)!important}.BA-cbox a,.BA-cbox span{color:#fff!important}.BA-cbox:hover{transition:all .3s;background-color:rgba(0,0,0,.5)!important}#gnn_normal p span{background-color:hsla(200,70%,50%,.5)!important}.BA-cbox6E{background-color:hsla(200,70%,50%,.5)!important}.BA-ctag1 li a:hover{color:#222!important}.BA-ctag1 li a{margin-top:30px}.BA-cbox5 tr:first-child,.BA-cbox7 tr:first-child{background-color:rgba(0,0,0,0)!important}.BA-cbox7 span{color:#189696!important}#acg_list p{background-color:hsla(0,0%,0%,.3)!important}#acg_list p:hover{background-color:hsla(150,50%,30%,.6)!important}#gnn_normal div a:link,#hotboard .BA-cbox5C a,#hothala p a,.BA-cbox4B a,.BA-cbox6F a:link,.BA-cbox8A a:link,.BA-cbox9C a:link{color:#87dfff!important}#homeOdata a:link{color:#87dfff!important}.BA-cbox4A div,.BA-cbox6B{background-color:hsla(0,0%,0%,.4)!important}.BA-cbox10B,.BA-cbox9C{background-color:rgba(45,45,45,.4)!important;color:#87dfff!important}.BA-cbox9C a{color:#87dfff!important}.BA-cbox10B,.BA-cbox9C{border:1px solid rgba(255,255,255,.4)}.BA-cbox10B::before,.BA-cbox9C::before{height:0!important}#floatingAd div,.BA-billboard{opacity:0!important;height:0!important;pointer-events:none!important}#floatingAd div:hover,.BA-billboard:hover{transition:all .5s;opacity:1}.BA-footer a{color:#fff}";
  }

  if (url == "https://user.gamer.com.tw/login.php") {
    css =
      "html{background-image:bac_img_color,url(bac_img_url)!important;background-attachment:fixed!important;background-position:center center!important;background-repeat:no-repeat!important;background-size:cover!important;background-color:rgba(45,45,45,1)!important}body{font-family:\"微軟正黑體\"!important;background-color:rgba(0,0,0,0)!important}.inner{padding:20px;background-color:rgba(255,255,255,.5)!important}.wrapper{background-color:rgba(0,0,0,0)!important}#tips{width:auto;background-color:rgba(0,0,0,0)!important}.main{background:#fff!important}.card{background:0 0!important;box-shadow:none!important}";
  }

  /* 把背景圖片轉成base64 */
  if (背景圖片網址 == GM_getValue("bac_img_url")) {
    背景圖片網址 = GM_getValue("bac_base64");
    console.log("深色主題-快速載入圖片");
  } else {
    if (背景圖片網址.substr(0, 4).toLowerCase() == "http") {
      toDataURL(背景圖片網址, function(dataUrl) {
        GM_setValue("bac_base64", dataUrl);
        GM_setValue("bac_img_url", 背景圖片網址);
        console.log("深色主題-重新下載圖片");
      });
    }
  }

  css = css.replace(/bac_img_color/g, 背景圖片上面的漸層顏色);
  css = css.replace(/bac_img_url/g, 背景圖片網址);

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
})();


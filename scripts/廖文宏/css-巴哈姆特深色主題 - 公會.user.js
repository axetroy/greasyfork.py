// ==UserScript==
// @name          css-巴哈姆特深色主題 - 公會
// @namespace     hbl917070
// @description	  巴哈姆特深色主題 - 公會
// @author        hbl917070(深海異音)
// @homepage      https://home.gamer.com.tw/homeindex.php?owner=hbl917070
// @include       https://guild.gamer.com.tw/guild.php?*
// @include       https://guild.gamer.com.tw/singleACMsg.php?*
// @run-at        document-start
// @grant         GM_getValue
// @grant         GM_setValue
// @version       0.17
// ==/UserScript==

/*
標題：css-巴哈姆特深色主題 - 公會
範圍：公會社團（尚未支援：公會大廳、 Wiki百科、成員名單）
最後修改日期：2018 / 08 / 04
作者：hbl917070（深海異音）
說明：https://forum.gamer.com.tw/C.php?bsn=60076&snA=2621599

預設背景圖片來源：https://www.pixiv.net/member_illust.php?mode=medium&illust_id=66544369
*/

(function() {
  // ▼ ▼ ▼ 這裡的設定可以修改 ▼ ▼ ▼

  var 背景圖片網址 = "https://i.imgur.com/WLHPi9h.jpg";

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
    url.indexOf("https://guild.gamer.com.tw/guild.php?") === 0 ||
    url.indexOf("https://guild.gamer.com.tw/singleACMsg.php?") === 0
  ) {
    css =
      "body{background-image:bac_img_color,url(bac_img_url)!important;background-attachment:fixed!important;background-position:center center!important;background-repeat:no-repeat!important;background-size:cover!important;background-color:rgba(45,45,45,1)!important}#BH-background{color:#fff!important}.TOP-bh{background-color:rgba(0,0,0,.7);box-shadow:0 0 0 #000}#BH-top-data{background-color:rgba(0,0,0,0)}.TOP-search{display:none}.TOP-msglist div{color:#fff!important}.BH-menuE,.BH_menu-search{background-color:rgba(0,0,0,.7)!important;color:#000!important}.TOP-bh{background-color:rgba(0,0,0,1)!important;background:rgba(0,0,0,1)!important;box-shadow:0 0 0 transparent!important}#BH-menu-path{background-color:rgba(0,0,0,0)!important}.BH-menuE a,.BH-menuE a:link{color:#fff!important;opacity:1!important}.dropList a{background-color:rgba(0,0,0,.9)!important}#navBarHover{background:#117e96!important;box-shadow:0 0 0 0 transparent!important;border:none!important}.TOP-my ul>li{border:none!important}.TOP-btn a::before{color:#fff!important}.TOP-btn a{width:30px!important}.TOP-btn{border-right:1px solid rgba(255,255,255,.4)}.TOP-msg{background-color:rgba(45,45,45,.9)!important;color:#fff!important;border:2px solid #249db8!important}.TOP-msg span{background-color:rgba(0,0,0,0)!important;color:#fff}.TOP-msglist{background:0 0!important;background-color:none!important}.TOP-msglist a:hover,.TOP-msglist div:hover{background-color:rgba(45,45,45,.95)!important}.TOP-msglist div{border-top:1px solid rgba(255,255,255,.4)!important;background-color:rgba(0,0,0,0)!important;color:#fff}.TOP-msg .new{background-color:rgba(50,100,80,.5)!important;border:1px solid rgba(255,255,255,.4)!important}.TOP-msgpic{background-color:rgba(0,0,0,0)!important}.TOP-msgbtn{background-color:rgba(0,0,0,0)!important;border-top:2px solid #249db8!important}.TOP-msg [href]{color:#87dfff!important}.title textarea{background-color:rgba(255,255,255,.2)!important;color:#fff!important;border:1px solid rgba(255,255,255,.4)!important}.check-group h6{color:#fff!important}#topBarMsg_member ul li a:hover{background-color:rgba(0,0,0,0)!important}.TOP-board{background-color:rgba(0,0,0,0)!important}.TOP-more ul li:hover{background:Transparent!important;box-shadow:0 1px 3px 0 rgba(255,255,255,0)!important}.TOP-more ul:hover{background:rgba(0,0,0,0)!important}.TOP-more>div p{background:rgba(0,0,0,0)!important;color:#fff}#topBarMsg_member ul li:active,#topBarMsg_member ul li:focus,#topBarMsg_member ul li:hover{background:rgba(0,0,0,.7)}.TOP-msglist a:hover,.TOP-msglist div:hover{background-color:rgba(0,0,0,0)!important}.TOP-more>div.nav-platform ul li.platform-ac:hover{background-color:rgba(0,0,0,0)!important}#topBarMsgList_more a{color:#fff!important}.TOP-msgbtn a i{color:#87dfff!important}.msgright a img{transition:all .3s;box-shadow:0 0 0 0 hsla(192,100%,69%,1)!important;border:0 solid hsla(0,0%,100%,0)!important}.msgright a img:hover{transition:all .5s cubic-bezier(1,.09,1,-.315);max-width:440px!important;max-height:500px!important}#BH-bigbanner,#flySalve{opacity:0!important;height:0!important;pointer-events:none!important}.GU-lbox2{background-color:hsla(0,0%,13%,.5)!important;border:1px solid rgba(255,255,255,.4)!important}.GU-lbox2C{background-color:hsla(0,0%,0%,.5)!important}.GU-lbox2E span{color:#fcf!important}.BH-lbox,.msgreport{background-color:rgba(0,0,0,0)!important;color:#fff!important;border:none!important}.AB1,.msgright button{background-color:hsla(0,0%,13%,.5)!important;color:#fff!important;border:1px solid rgba(255,255,255,.4)!important}.BC1{background-color:hsla(0,0%,13%,.5)!important;border:1px solid rgba(255,255,255,.4)!important;color:#fff!important}.BC2{background-color:hsla(0,0%,13%,0)!important;margin:10px!important;border-top:1px solid hsla(0,0%,100%,.5)!important;overflow:hidden}.MSG-box2{margin-top:30px!important;border:1px solid rgba(255,255,255,.4)!important;background-color:rgba(45,45,45,.4)!important;padding:3px!important}.msgreport a:link{color:#58c!important}.AT1,.msgitembar a:link{color:#58c!important}.msgright a{color:#58c!important}textarea{background-color:rgba(255,255,255,.2)!important;border:1px solid rgba(255,255,255,.4)!important;color:#fff!important}.ST1{color:#585!important}#BH-pathbox a{color:#fff!important}#BH-slave h5{background:0 0!important;border:1px solid hsla(0,0%,100%,.4)!important;background-color:#111!important}.GU-rbox5 p,.GU-rbox6A{color:#fff!important;background-color:hsla(0,0%,13%,.5)!important}.GU-rbox6A,.GU-rbox6B{background-color:rgba(0,0,0,0)!important;border:0 solid hsla(0,0%,100%,.4)!important}.BH-table{background-color:rgba(255,255,255,.5)!important}#BH-footer{color:#fff!important}.GU-lbox2A a[href],.GU-lbox2A a[href] font[color]{color:#87dfff!important}.GU-lbox2A{color:#fff!important;background-color:rgba(30,30,30,.5)!important;border:1px solid rgba(255,255,255,.4)!important}.BH-rbox a[href],.GU-rbox1 a[href] font[color]{color:#87dfff!important}.BH-rbox{color:#fff!important;background-color:rgba(30,30,30,.5)!important;border:1px solid rgba(255,255,255,.4)!important}body div[style*=\"position: fixed; left: 20px; right: 20px;\"]{display:block!important;opacity:0!important;height:0!important;pointer-events:none!important}";

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
  }

  if (url.indexOf("https://guild.gamer.com.tw/guild.php?") === 0) {
    document.addEventListener("DOMContentLoaded", function() {
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
    var cc = [
      new Array("windowtext", "#000000"),
      new Array("black", "#000000"),
      new Array("aliceblue", "#f0f8ff"),
      new Array("cadetblue", "#5f9ea0"),
      new Array("lightyellow", "#ffffe0"),
      new Array("coral", "#ff7f50"),
      new Array("dimgray", "#696969"),
      new Array("lavender", "#e6e6fa"),
      new Array("darkcyan", "#008b8b"),
      new Array("lightgoldenrodyellow", "#fafad2"),
      new Array("tomato", "#ff6347"),
      new Array("gray", "#808080"),
      new Array("lightslategray", "#778899"),
      new Array("teal", "#008080"),
      new Array("lemonchiffon", "#fffacd"),
      new Array("orangered", "#ff4500"),
      new Array("darkgray", "#a9a9a9"),
      new Array("slategray", "#708090"),
      new Array("seagreen", "#2e8b57"),
      new Array("wheat", "#f5deb3"),
      new Array("red", "#ff0000"),
      new Array("silver", "#c0c0c0"),
      new Array("darkslategray", "#2f4f4f"),
      new Array("darkolivegreen", "#556b2f"),
      new Array("burlywood", "#deb887"),
      new Array("crimson", "#dc143c"),
      new Array("lightgrey", "#d3d3d3"),
      new Array("lightsteelblue", "#b0c4de"),
      new Array("darkgreen", "#006400"),
      new Array("tan", "#d2b48c"),
      new Array("mediumvioletred", "#c71585"),
      new Array("gainsboro", "#dcdcdc"),
      new Array("steelblue", "#4682b4"),
      new Array("green", "#008000"),
      new Array("khaki", "#f0e68c"),
      new Array("deeppink", "#ff1493"),
      new Array("white", "#ffffff"),
      new Array("royalblue", "#4169e1"),
      new Array("forestgreen", "#228b22"),
      new Array("yellow", "#ffff00"),
      new Array("hotpink", "#ff69b4"),
      new Array("snow", "#fffafa"),
      new Array("midnightblue", "#191970"),
      new Array("mediumseagreen", "#3cb371"),
      new Array("gold", "#ffd700"),
      new Array("palevioletred", "#db7093"),
      new Array("ghostwhite", "#f8f8ff"),
      new Array("navy", "#000080"),
      new Array("darkseagreen", "#8fbc8f"),
      new Array("orange", "#ffa500"),
      new Array("pink", "#ffc0cb"),
      new Array("whitesmoke", "#f5f5f5"),
      new Array("darkblue", "#00008b"),
      new Array("mediumaquamarine", "#66cdaa"),
      new Array("sandybrown", "#f4a460"),
      new Array("lightpink", "#ffb6c1"),
      new Array("floralwhite", "#fffaf0"),
      new Array("mediumblue", "#0000cd"),
      new Array("aquamarine", "#7fffd4"),
      new Array("darkorange", "#ff8c00"),
      new Array("thistle", "#d8bfd8"),
      new Array("linen", "#faf0e6"),
      new Array("blue", "#0000ff"),
      new Array("palegreen", "#98fb98"),
      new Array("goldenrod", "#daa520"),
      new Array("magenta", "#ff00ff"),
      new Array("antiquewhite", "#faebd7"),
      new Array("dodgerblue", "#1e90ff"),
      new Array("lightgreen", "#90ee90"),
      new Array("peru", "#cd853f"),
      new Array("fuchsia", "#ff00ff"),
      new Array("papayawhip", "#ffefd5"),
      new Array("cornflowerblue", "#6495ed"),
      new Array("springgreen", "#00ff7f"),
      new Array("darkgoldenrod", "#b8860b"),
      new Array("violet", "#ee82ee"),
      new Array("blanchedalmond", "#ffebcd"),
      new Array("deepskyblue", "#00bfff"),
      new Array("mediumspringgreen", "#00fa9a"),
      new Array("chocolate", "#d2691e"),
      new Array("plum", "#dda0dd"),
      new Array("bisque", "#ffe4c4"),
      new Array("lightskyblue", "#87cefa"),
      new Array("lawngreen", "#7cfc00"),
      new Array("sienna", "#a0522d"),
      new Array("orchid", "#da70d6"),
      new Array("moccasin", "#ffe4b5"),
      new Array("skyblue", "#87ceeb"),
      new Array("chartreuse", "#7fff00"),
      new Array("saddlebrown", "#8b4513"),
      new Array("mediumorchid", "#ba55d3"),
      new Array("navajowhite", "#ffdead"),
      new Array("lightblue", "#add8e6"),
      new Array("greenyellow", "#adff2f"),
      new Array("maroon", "#800000"),
      new Array("darkorchid", "#9932cc"),
      new Array("peachpuff", "#ffdab9"),
      new Array("powderblue", "#b0e0e6"),
      new Array("lime", "#00ff00"),
      new Array("darkred", "#8b0000"),
      new Array("darkviolet", "#9400d3"),
      new Array("mistyrose", "#ffe4e1"),
      new Array("paleturquoise", "#afeeee"),
      new Array("limegreen", "#32cd32"),
      new Array("brown", "#a52a2a"),
      new Array("darkmagenta", "#8b008b"),
      new Array("lavenderblush", "#fff0f5"),
      new Array("lightcyan", "#e0ffff"),
      new Array("yellowgreen", "#9acd32"),
      new Array("firebrick", "#b22222"),
      new Array("purple", "#800080"),
      new Array("seashell", "#fff5ee"),
      new Array("cyan", "#00ffff"),
      new Array("olivedrab", "#6b8e23"),
      new Array("indianred", "#cd5c5c"),
      new Array("indigo", "#4b0082"),
      new Array("oldlace", "#fdf5e6"),
      new Array("aqua", "#00ffff"),
      new Array("olive", "#808000"),
      new Array("rosybrown", "#bc8f8f"),
      new Array("darkslateblue", "#483d8b"),
      new Array("ivory", "#fffff0"),
      new Array("turquoise", "#40e0d0"),
      new Array("darkkhaki", "#bdb76b"),
      new Array("darksalmon", "#e9967a"),
      new Array("blueviolet", "#8a2be2"),
      new Array("honeydew", "#f0fff0"),
      new Array("mediumturquoise", "#48d1cc"),
      new Array("palegoldenrod", "#eee8aa"),
      new Array("lightcoral", "#f08080"),
      new Array("mediumpurple", "#9370db"),
      new Array("mintcream", "#f5fffa"),
      new Array("darkturquoise", "#00ced1"),
      new Array("cornsilk", "#fff8dc"),
      new Array("salmon", "#fa8072"),
      new Array("slateblue", "#6a5acd"),
      new Array("azure", "#f0ffff"),
      new Array("lightseagreen", "#20b2aa"),
      new Array("beige", "#f5f5dc"),
      new Array("lightsalmon", "#ffa07a"),
      new Array("mediumslateblue", "#7b68ee")
    ];

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

    });
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


// ==UserScript==
// @name		玛雅网去广告
// @description	玛雅网广告太霸气了，清理下。
// @namespace   ed8311262b384bc1d613e96f226ec4af
// @include     http://*
// @author			ejin
// @version     2016.09.08
// @grant        none
// ==/UserScript==


var HTML_Str = document.head.innerHTML + document.body.innerHTML;
if (HTML_Str.indexOf('<link rel="archives" title=" Maya! Board -') != -1 ) {
    var all_elem = document.getElementsByTagName("div");
    for (var i = 0; i < all_elem.length; i++) {
        //排除掉导航栏和网页代理访问时的地址栏
        if (all_elem[i].innerHTML.indexOf("发邮件到") < 0 && all_elem[i].className != "maintable" && all_elem[i].innerHTML.indexOf("class=\"url-input") < 0) {
            if (all_elem[i].className.indexOf("subtable") == 0 || all_elem[i].innerHTML.indexOf(" class=\"left") != -1) {
                break;
            }
            all_elem[i].innerHTML = "";
        }
    }

    all_elem = document.getElementsByTagName("tr");
    for (var i = 0; i < all_elem.length; i++) {
        if (all_elem[i].className == "t_infoline") {
            all_elem[i].innerHTML = "";
        }
    }
    //貌似速度太快了不能给表单填入内容，延迟一下
    setTimeout(function (){
        if (document.getElementsByName("username").length > 0) {
            document.getElementsByName("username")[0].value = "mimamima";
            document.getElementsByName("password")[0].value = "mimamima";
        }
        if ( HTML_Str.indexOf('现在将转入登录前页面') != -1 ) {
            document.getElementsByClassName("altbg1")[0].getElementsByTagName("a")[0].click();
        }
    },0);
    top.document.onclick = null;
    document.onclick = null;
}
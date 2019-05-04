// ==UserScript==
// @name          js-巴哈-社團黑名單
// @namespace     hbl917070
// @description	  巴哈-社團黑名單
// @author        hbl917070(深海異音)
// @homepage      https://home.gamer.com.tw/homeindex.php?owner=hbl917070
// @include       https://guild.gamer.com.tw/guild.php?sn=*
// @run-at        document-start
// @grant         GM_getValue
// @grant         GM_setValue
// @version       0.1
// ==/UserScript==


/**
 * 說明在巴哈姆特的社團工會裡面，隱藏特定的人
 * 對方發的文，跟回覆的內容都會消失
 * 
 */

(function () {
    var ar_user = [];

    //--------------------------------------

    //在這裡新增要過濾的帳號
    ar_user.push("帳號001");
    ar_user.push("帳號002");
    ar_user.push("");
    ar_user.push("");
    ar_user.push("");

    //--------------------------------------

    for (let i = 0; i < ar_user.length; i++) {
        ar_user[i] = ar_user[i].toLowerCase();
    }

    function get_href(obj) {
        let ss = obj.href;
        ss = ss.substring(ss.indexOf("=") + 1);
        ss = ss.toLowerCase();
        return ss;
    }

    function func_判斷是否要過濾(s) {
        for (let i = 0; i < ar_user.length; i++) {
            if (ar_user[i] == s) {
                return true;
            }
        }
        return false;
    }



    function func_過濾帳號() {

        let ar_box = $(".MSG-box2").get();

        //每一筆文章
        for (let i = 0; i < ar_box.length; i++) {

            let ar_item = $(ar_box[i]).find(".msgname").get();
            //每一個帳號
            for (let j = 0; j < ar_item.length; j++) {
                //console.log()
                let acc = get_href(ar_item[j]);
                let bb = func_判斷是否要過濾(acc)
                if (bb) {
                    if (j === 0) {//發文
                        ar_item[j].parentNode.parentNode.style.display = "none";
                    } else {//留言
                        ar_item[j].parentNode.parentNode.style.display = "none";
                    }
                }
            }

        }


        setTimeout(function () {
            func_過濾帳號()
        }, 1000 * 2);

    }


    document.addEventListener("DOMContentLoaded", function () {
        func_過濾帳號()
    })

})();
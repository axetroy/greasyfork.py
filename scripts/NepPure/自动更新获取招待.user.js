// ==UserScript==
// @name         自动更新获取招待
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       野原小牛
// @match        http://act.ff.sdo.com/20180515Zhaodai/eventz.html
// @grant        none
// ==/UserScript==


(function () {

    var zhaodaiList = [];

    function update(index) {
        if (index >= zhaodaiList.length) {
            console.info('开始领取奖励');
            getAward(0);
            return;
        }

        var tar = zhaodaiList[index];
        if (tar.Status3 == '1' || tar.Grade == '70') {
            update(index + 1);
            return;
        }

        $.getJSON('http://act.ff.sdo.com/20180515Zhaodai/Server/User.ashx?method=updgrade&pt=' + tar.PtAccount, function (result) {
            if (result.Code != 0) {
                console.error(result);
                return;
            }
            tar.Grade = result.Attach;
            console.log(tar);
            setTimeout(function () {
                update(index + 1);
            }, 3000)
        })

    }


    function getAward(index) {
        if (index >= zhaodaiList.length) {
            console.info('完成奖励领取');
            return;
        }

        var tar = zhaodaiList[index];
        if (tar.Status3 == '1' || tar.Grade != 70) {
            getAward(index + 1);
            return;
        }


        $.getJSON('http://act.ff.sdo.com/20180515Zhaodai/Server/User.ashx?method=getaward3&bindid=' + tar.Id, function (result) {
            console.log(result);
            setTimeout(function () {
                getAward(index + 1);
            }, 3000)
        })
    }



    $.getJSON('http://act.ff.sdo.com/20180515Zhaodai/Server/User.ashx?method=querybinduser', function (result) {
        if (result.Code != 0) {
            console.error(result);
            return;
        }

        zhaodaiList = JSON.parse(result.Attach);
        console.info('获取招待信息成功，招待记录数：' + zhaodaiList.length);
        console.info('更新招待等级，因为服务器有访问频率限制，请耐心等待');
        update(0);
    })


})();
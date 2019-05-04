// ==UserScript==
// @name        斗鱼超级小桀查积分
// @namespace   tonybee
// @description 在房间发送#查询 就可以看到自己的积分（弹幕发出）
// @include     http://www.douyu.com/cave
// @include     http://www.douyu.com/74751
// @version     1.2
// @author      none
// @icon        http://www.douyu.com/favicon.ico
// @grant       tonybee
// ==/UserScript==

(function(){
    var content = "";
    var baseApi = "http://api.xiaojie666.com/xiaojie/credit/query.do";
    $(document).ready(function(){
        //获取输入栏的弹幕
        $(".cs-textarea").change(function(event) {
            content = $(".cs-textarea").val();
        });
        //监听输入栏的回车事件
        $('.cs-textarea').keydown(function(e) {
            if(e.keyCode==13) {
                content = $(".cs-textarea").val();
                tog();
            }
        });
        //监听发送按钮点击事件
        $("div.b-btn[data-type='send']").click(function() {
            tog();
        });
    });

    //*********************** 查询部分 ****************************
    //过滤输入内容
    function tog() {
        var nickName = $("span.l-txt").text();
        var pattern = /^#查询/;//匹配所有以#查询 开头的字符串
        if(pattern.test(content)) {
            query(nickName);
        }
    }

    //请求API查询积分，回写到输入框
    function query(nickName) {
        $.ajax({
            type:"GET",
            url:baseApi,
            async:false,
            data:{"nickName":nickName},
            dataType:"json",
            success:function(data) {
                //回写后不用触发发送事件，交给某鱼来处理
                //Ps.如果某鱼改写了捕获方式，这里可能会出问题
                $(".cs-textarea").val("我有" + data.credit + "积分，" + "历史" + data.earnedCredit + "积分（防重" + new Date().getSeconds());
                //操作完成之后，将全局变量还原
                content = "";
            }
        });
    }

})();

// ==UserScript==
// @name         蜜蜂侠（话费代充）
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  try to take over the world!
// @author       You
// @match        http://www.mf178.cn/customer/qpay/pools*
// @match        http://mf178.cn/customer/qpay/pools
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var stop = false;
    var cnt = 1;
    var intervalId = 0;
    var my_message = function (message) {
        $.notify({ message:message }, { delay:2000, allow_dismiss:false, type: 'success', placement: { from: "top", align: "center" }, offset: 400});
    };

    $.getScript("https://cdn.bootcss.com/jplayer/2.9.2/jplayer/jquery.jplayer.min.js", function() {
        $("#jplayer").jPlayer({
            // swfPath: "http://www.jplayer.org/latest/js/Jplayer.swf",
            ready: function () {
                $(this).jPlayer("setMedia", {
                    mp3: "http://hao.1015600.com/upload/ring/000/994/63ac8513b87bb67e87042b856e2b6f01.mp3"
                });
            },
            supplied: "mp3"
        });
    });



    var Refresh = function () {
        if(stop == true) {return;}
        // 查询订单……
        $.get('/customer/qpay/mytasks', function(msg) {
            //var label = "获取" + $('#amount').find("option:selected").text();
            var label = "getTask(" + $('#amount').val() + ")";
            if(msg.indexOf(label) < 0) {
                 //my_message('已查询' + cnt + '次，平台暂未订单，请稍后再试');
                if(stop == true) {return;}
                 $("#getOrderBtn").text('已查询' + cnt + '次');
                 cnt ++;
                 setTimeout(Refresh, 100);
            }
            else {
                 getOrder();
            }
        });

        var getOrder = function() {
            var url = 'ajax?action=get_tasks&id=' + amount;
            $.getJSON(url, function(msg) {
                 //alert(msg.data);
                //<input type=\"hidden\" name=\"SEQ\" value=\"1519654006\" \/>
                var index = msg.data.indexOf("SEQ\" value=\"");  //
                //var len = 'SEQ\" value=\"'.length;  // 12
                //alert(index + " " + len);
                var idx = parseInt(index) + 12;
                var end = msg.data.indexOf("\"",idx);
                var SEQ = msg.data.substring(idx, end);
                var data = {
                    'id':$('#amount').val(),
                    'count':1,
                    'SEQ':SEQ
                };
                $.post('/customer/qpay/get_tasks', data, function(msg) {
                    if(msg.indexOf('扫码代充') >= 0){
                        my_message('成功获取订单, 1s后自动刷新');
                        $("#jplayer").jPlayer('play');
                        setTimeout(function() {
                            window.location.href = "/customer/qpay/mytasks";
                        }, 1000);
                    }
                    else {
                        setTimeout(Refresh, 100);
                        $("#getOrderBtn").text('已查询' + cnt + '次');
                        cnt ++;
                    }
                });
            });
        };
    };


    var html = (function () {/*
		<div class='row' id='robDiv'>
			<div class='col-xs-3'>
				<select class="form-control" id='amount' name='amount'>
					<option  value="1">移动100元</option>
                    <option  value="2">移动200元</option>
					<option  value="3">移动300元</option>
                    <option  value="5">移动500元</option>
                    <option  value="11">电信100元</option>
                    <option  value="12">电信200元</option>
					<option  value="13">电信300元</option>
                    <option  value="15">电信500元</option>
				</select>
			</div>
			<div class='col-xs-2'>
				<button class='btn btn-default btn-info'  id='getOrderBtn'>自动抢单</button>
			</div>
			<div class='col-xs-2'>
				<button class='btn btn-default btn-danger' id='stopGetOrderBtn'>停止抢单</button>
			</div>
            <div id="jplayer"></div>
		</div>
    */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
    $("body > div.main_content > div > div > div > div > div.col-sm-10 > div.row.customer_container > div:nth-child(2) > div:nth-child(2)").after(html);

    if(localStorage.getItem('DIR_TICKET_PRICE') != null) {
          // alert(localStorage.getItem('DIR_TICKET_PRICE'));
          $('#amount').find("option:selected").attr("selected",false);
          $('#amount').find("option[value='"+ localStorage.getItem('DIR_TICKET_PRICE')+"']").attr("selected",true);
    }

    $("#stopGetOrderBtn").attr('disabled',true);
    $("#getOrderBtn").on('click', function() {
		//alert("自动抢单");
		//css
		$("#stopGetOrderBtn").attr('disabled',false);
		$("#getOrderBtn").attr('disabled', 'disabled');
		//$("#getOrderBtn").text("抢单中");
        stop = false;
        cnt = 1;
        localStorage.setItem('DIR_TICKET_PRICE', $('#amount').val());

		Refresh();
     });
    $("#stopGetOrderBtn").on('click', function() {
		my_message('停止抢单');
		//css
		$("#stopGetOrderBtn").attr('disabled','disabled');
		$("#getOrderBtn").attr('disabled',false);
		$("#getOrderBtn").text("自动抢单");
        stop = true;
     });

    // Your code here...
})();
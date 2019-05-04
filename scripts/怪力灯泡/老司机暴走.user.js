// ==UserScript==
// @name         老司机暴走
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  try to take over the world!
// @author       怪力灯泡
// @match        http://1.lsjbz.xh456.com/index.aspx
// @require      http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    window.kuaijie = function(){
        var display = document.getElementById("kuaijie_div").style.display;
        if(display == "none"){
            document.getElementById("kuaijie_div").style.display = "block";
        }else{
            document.getElementById("kuaijie_div").style.display = "none";
        }
    }

    window.fuli = function(){
        var display = document.getElementById("fuli_div").style.display;
        if(display == "none"){
            document.getElementById("fuli_div").style.display = "block";
        }else{
            document.getElementById("fuli_div").style.display = "none";
        }
    }

    window.guanbi = function(){
        document.getElementById("kuaijie_div").style.display = "none";
        document.getElementById("fuli_div").style.display = "none";
    }

    var wuli;
    var zhili;
    var fuli;
    window.yijian_wuli = function(){
        wuli = setInterval(function () {
            setTimeout("guaji_money_quchu('1000000000000000000')","100");
            setTimeout("money_prop_buy(2,1000000000)","100");
        }, 100);
    }

    window.yijian_zhili = function(){
        zhili = setInterval(function () {
            setTimeout("guaji_money_quchu('1000000000000000000')","100");
            setTimeout("money_prop_buy(3,1000000000)","100");
        }, 100);
    }

    window.tingzhi = function(){
        clearInterval(wuli);
        clearInterval(zhili);
    }

    var ids;
    var youji_jine;
    var total_jine;
    var index = 0;
    window.fuli_fasong = function(){
        ids = document.getElementById('youji_ids').value.split(',');
        var length = ids.length;
        youji_jine = parseInt(document.getElementById('youji_money').value.replace(/M/g,'0000000000000000').replace(/E/g,'00000000').replace(/W/g,'0000'));
        fuli = setInterval(function () {
            if (index<length){
                total_jine = parseInt(document.getElementById('span_money').innerText);
                if(youji_jine>total_jine){
                    setTimeout("guaji_money_quchu('1000000000000000000')","100");
                    setTimeout("guaji_money_quchu('1000000000000000000')","100");
                    setTimeout("guaji_money_quchu('1000000000000000000')","100");
                    setTimeout("guaji_money_quchu('1000000000000000000')","100");
                    setTimeout("guaji_money_quchu('1000000000000000000')","100");
                }
                youji_money(ids[index],youji_jine);
                index++;
            }else{
                clearInterval(fuli);
                alert("邮寄完成");
                index = 0;
            }
        }, 500);
    }

    var html = document.getElementsByTagName('div')[14].innerHTML;
    html += '<button class="main_button bt_main_button" onclick="kuaijie()">快捷买药</button>';
    html += '<button class="main_button bt_main_button" onclick="fuli()">发放福利</button>';
    document.getElementsByTagName('div')[14].innerHTML = html;

    var kuaijie_div = document.createElement('div');
    var kuaijie_html = '<div>';
	    kuaijie_html+= '<div style="text-align:center;padding-top:18px;">';
	    kuaijie_html+= '<button class="button6"  onclick="yijian_wuli()">一键武力药</button>';
	    kuaijie_html+= '</div>';
	    kuaijie_html+= '<div style="text-align:center;padding-top:18px;">';
	    kuaijie_html+= '<button class="button6"  onclick="yijian_zhili()">一键智力药</button>';
	    kuaijie_html+= '</div>';
	    kuaijie_html+= '<div style="text-align:center;padding-top:18px;">';
	    kuaijie_html+= '<button class="button6"  onclick="tingzhi()">停止</button>&nbsp;&nbsp;&nbsp;&nbsp;';
	    kuaijie_html+= '<button class="button6"  onclick="guanbi()">关闭</button>';
	    kuaijie_html+= '</div>';
	    kuaijie_html+= '</div>';
    kuaijie_div.innerHTML = kuaijie_html;
    var cssStr = "z-index:5;width:250px; height:165px;background-color:#012525;border:1px solid black;position:absolute;left:475px;top:250px;";
    kuaijie_div.style.cssText = cssStr;
    kuaijie_div.id = "kuaijie_div";
    document.body.appendChild(kuaijie_div);
    document.getElementById("kuaijie_div").style.display = "none";

    var fuli_div = document.createElement('div');
    var fuli_html = '<div>';
	    fuli_html+= '<div style="text-align:left; line-height:40px;">';
	    fuli_html+= '<div style="float:left; width:100px; text-align:right;">邮寄金额：</div>';
        fuli_html+= '<div style="float:left;padding-top:10px;">';
        fuli_html+= '<input type="text" value="" style="width: 120px;" id="youji_money" />';
        fuli_html+= '</div>';
        fuli_html+= '<div style="clear:both;"></div>';
	    fuli_html+= '</div>';
	    fuli_html+= '<div style="text-align:left; line-height:40px;">';
	    fuli_html+= '<div style="float:left; width:100px; text-align:right;">邮寄ID：</div>';
        fuli_html+= '<div style="float:left;padding-top:10px;">';
        fuli_html+= '<input type="text" value="" style="width: 120px;" id="youji_ids" />';
        fuli_html+= '</div>';
        fuli_html+= '<div style="clear:both;"></div>';
	    fuli_html+= '</div>';
	    fuli_html+= '<div style="text-align:center;padding-top:18px;">';
	    fuli_html+= '<button class="button6"  onclick="fuli_fasong()">发送</button>&nbsp;&nbsp;&nbsp;&nbsp;';
	    fuli_html+= '<button class="button6"  onclick="guanbi()">关闭</button>';
	    fuli_html+= '</div>';
	    fuli_html+= '</div>';
    fuli_div.innerHTML = fuli_html;
    fuli_div.style.cssText = cssStr;
    fuli_div.id = "fuli_div";
    document.body.appendChild(fuli_div);
    document.getElementById("fuli_div").style.display = "none";
})();

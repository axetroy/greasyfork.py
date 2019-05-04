// ==UserScript==
// @name 研修网6倍刷课破解
// @namespace Violentmonkey Scripts
// @match http://study.yanxiu.jsyxsq.com/proj/studentwork/study.htm
// @grant hyukoh
// @description 某研修网视频刷课代码 ，祝刷课顺利，好用请收藏。
// @version 0.0.1.20190103075939
// ==/UserScript==
function sk() {
    var url="http://study.yanxiu.jsyxsq.com/proj/studentwork/studyAjax/AddStudyTimeExit.json?time="+360;
    jQuery.ajax({ type: "POST", url: url,  dataType:"json",
        data: "courseId="+courseId.value+"&studyTime="+ 360,
        success: function(msg){
            if(msg!=0) {
                begintime=0
            	var zminute = parseInt(msg/3600);
            	var zsecond =  parseInt((msg%3600)/60);
            	//jQuery("#zonggong").html(zminute+"小时"+zsecond+"分钟" );
	if(fulltime != ""){
                    if(parseInt(msg/60)>fulltime){
                    	jQuery("#zonggong").html(parseInt(fulltime)+"分钟")
                    		}
                }else{
                    	jQuery("#zonggong").html(parseInt(msg/60)+"分钟")
                    	}
            }else{
                alert( "更新时间失败");
            }
        }
    });
}
var timer;
setInterval(sk,68000)     
// ==UserScript==
// @name         ACfun.js
// @namespace    zhihaofans
// @version      0.0.2
// @description  AC~AC~C
// @author       zhihaofans
// @match        http://www.acfun.tv/*
// @match        http://www.aixifan.com/*
// @grant        none
// @icon         http://cdn.aixifan.com/ico/favicon.ico
// @license      MIT
// ==/UserScript==
var acScriptName = "ACfun.js";
function acNotice(_text,_mode,_debug,_justinfo) { //success,info,warning,error
	var _debug=_debug||false;
	var _justinfo=_justinfo||false;
	var _mode=_mode||"success";
	if(_debug===false){
		var patt1 = new RegExp('(/v/ac|/a/ac|/v/ab|/member/|/a/aa)');
		if (patt1.test(location.pathname, 'i')) {
			$.info(_mode, acScriptName + ":" + _text);
		} else {
			if(_justinfo===false){
				alert(acScriptName + "\n" + _text);
			}
		}
	}
	console.log(acScriptName+": "+_text);
}
function acSetCookie(name, value) {
    var expdate = new Date();
    expdate.setTime(expdate.getTime() + 30 * 60 * 1000);
    document.cookie = name + "=" + value + ";expires=" + expdate.toGMTString() + ";path=/";
}
function acGetCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + '=');
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(';', c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return decodeURI(document.cookie.substring(c_start, c_end));
        }
    }
    return '';
}
function acSignIn() {
    $.post("/webapi/record/actions/signin", {
        channel: "0",
        date: $.now()
    },
    function(data, status) {
        console.log(data);
        if (data.code === 200) {
            if (data.data != True && data.data != False) {
                acNotice(data.data.msg);
            } else {
                acNotice("签到失败","error");
            }
        } else {
            acNotice(data.message + "(" + status + ")","warning");
        }
    });
}
function acAvatarFix(){
	$.get("/usercard.aspx?username=" + acGetCookie('ac_username'),
	function(data, status) {
		console.log("AcfunAvatarFix(status：" + status + ")");
		if (status == "success") {
			if (data.success === true) {
				acSetCookie("ac_userimg", data.userjson.avatar);
				if (acGetCookie('ac_userimg') == data.userjson.avatar) {
					acNotice("头像修复成功，刷新生效");
				} else {
					acNotice("保存cookies失败","error");
				}
			} else {
				acNotice("获取个人信息失败","error");
			}
		} else {
			acNotice("获取个人信息失败，请检查网络","error");
		}
	});
}
$(document).ready(function() {
    if (acGetCookie('auth_key') !== "") {
        //SignIn
        $.get("/webapi/record/actions/signin?channel=0&date=" + $.now(),
        function(data, status) {
            if (status == "success" && data.code == 200) {
				if(data.data === true){
					acNotice("今天已签到","info",,true);
				}else{
					acSignIn();
				}
            }
        });
        //AvatarFix
		if (acGetCookie('ac_userimg') === "") {
			acAvatarFix();
		}else{
			acNotice("头像不需要修复","info",true);
		}
    }else{
		acNotice("未登陆","info",true);
	}
});
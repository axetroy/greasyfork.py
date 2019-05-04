// ==UserScript==
// @name       TEST_01
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://w.nuaa.edu.cn/*
// @copyright  2012+, You
// ==/UserScript==

var my0=document.createElement("div");
document.body.appendChild(my0);
//document.body.insertBefore(my0,body);
my0.innerHTML="<input type=\"button\" value=\"开始测试\" id=\"login1\">";

var my1=document.createElement("div");
document.body.appendChild(my1);
my1.innerHTML="<input type=\"button\" value=\"测试登陆\" id=\"add1\">";

var my2=document.createElement("textarea");
document.body.appendChild(my2);
my2.rows=5;
my2.cols=30;
my2.id="text1";
//my2.innerHTML="<input type=\"textarea\" id=\"text1\">";

//my1.onclick=addby1();
//my1.onclick=Auth.doLogin(1);
//my0.onclick=Auth.doLogin(1);
//my0.onclick=start;
var ttt2=document.getElementById("add1");
ttt2.onclick=start;
//document.onmousemove=copyto;

function addtext(s)
{
    t1=document.getElementById("text1");
    t1.value+=s;
    t1.value+="\n";
}

function addby1()
{
    t1=document.getElementById("username");
    t3=parseInt(t1.value);
    t1.value=t3+1;
    t2=document.getElementById("password");
//    t3=parseInt(t1.value);
    t2.value=t1.value;
}

function copyto()
{
    t1=document.getElementById("username");
    t2=document.getElementById("password");
    t2.value=t1.value;
}

function start()
{/*
     var user= document.getElementById("username");
     var u1=parseInt(user.value);
     var pass= document.getElementById("password");
     var p1=parseInt(pass.value);*/
    copyto();
    Auth.doLogin(1);
    addby1();
//    start();
}

var authing = 0;
var Auth = Auth || {};
Auth = {
	initialize:function(){
		this.initParams();
		this.bindEvents();
	},
	events:{
		"click #login1":"doLogin1",
//		"click #btnLogin2":"doLogin2",
//		"click #logout":"doLogout",
//		"click #btnCheck":"doCheck",
//		"click #btnReset":"doReset",
//		"keydown #username":"onKeydown",
//		"keydown #password":"onKeydown"
	},
	routes:{
		"!/online":"online",
		"!/success":"success",
		"!/login":"login"
	},
	login:function(){
		Auth.moveTo("login");
        window.location.hash = "!/login";
		return false;
	},
	success:function(data){
		if(data==undefined)return false;
		$('#login_ip').html(data.ip);
		$('#login_username').html(data.username);
		$('#login_loginTime').html(data.loginTime);
		$('#login_domain').html(data.domain);
		Auth.moveTo("success");
        window.location.hash = "!/success";
		return false;
	},
	online:function(){
		Auth.moveTo("online");
        window.location.hash = "!/online";
		return false;
	},
	moveTo:function(dir){
		switch(dir){
		case "online"  :
			$(".inside").animate({"left":"-600px"},200);
			break;
		case "success"  :
			$(".inside").animate({"left":"-300px"},200);
			break;
		case "login":
			$(".inside").animate({"left":"0"},200);
			break;
		}
		return false;
	},
	observeHash:function(){
        var routes = this.routes;
        var hashValue = window.location.hash.slice(1);
        for(var i in routes){
            var routesCb = routes[i];
            if(hashValue === ""){this.login()};
            if(hashValue === i){ this[routesCb]()};
        }
	},
    observeHashChange:function(){
        var self = this;
        this.observeHash();
        $(window).bind("hashchange", function(){
            self.observeHash();
        });
    },
    initParams:function(){
    	$.ajax({
            url: "./action/doFindUser.do",
            global: false,
            type: "post",
            dataType: "json",
            success: function(s) {
    			if(s&&s.status==1){
    				var li = $.parseJSON(s.data);					
    				var u = li.username;
    				var p = li.password;
    				var s = li.saved;
    				if(s!=undefined && s!=null && s!='' && s==1){
    					$('#btnCheck').removeClass('cb_off').addClass('cb_on');
    					if(u!=undefined && u!=null){
    						$('#username').val(u);
    					}
    					if(p!=undefined && p!=null){
    						$('#password').val(p);
    					}
    				} else {
    					$('#btnCheck').removeClass('cb_on').addClass('cb_off');
    				}
	        	}
            },
            error: function(s) {}
        })
    },
	bindEvents:function(){
		var events = this.events,eventArray,eventName,receiver;
		for(var i in events){
			eventArray = i.split(" "),	
			eventName = eventArray[0],
			receiver = eventArray[1],
			callback = events[i];
			$(receiver).live(eventName, this[callback]);
		}
        this.observeHashChange();
	},
	formatString:function(str){
		var len = 15;
		if(str.length > len){
			return str.substring(0,len) + "...";
		}
		return str;
	},
	onKeydown: function(e){
		if(e.keyCode==13){
			Auth.doLogin1();
			return false;
		}
	},
	setCookie: function(name, value, seconds, path, domain) {
        var n = new Date();
        n.setDate(n.getDate() + seconds);
        document.cookie = name + "=" + escape(value) + ((seconds) ? "; expires=" + n.toGMTString() : "") + ((path) ? "; path=" + path: "") + ((domain) ? "; domain=" + domain: "")
    },
    getCookie: function(name) {
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(name + "=");
            if (c_start != -1) {
                c_start = c_start + name.length + 1;
                c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) {
                    c_end = document.cookie.length
                }
                return unescape(document.cookie.substring(c_start, c_end))
            }
        }
        return ""
    },
    delCookie: function(name, path, domain) {
        if (Auth.getCookie(name)) {
            document.cookie = name + "=" + ((path) ? "; path=" + path: "") + ((domain) ? "; domain=" + domain: "") + "; expires=Thu, 01-Jan-70 00:00:01 GMT"
        }
    },
	doReset: function(){
		$('#username').val('');
		$('#password').val('');
		$('#btnCheck').removeClass('cb_on').addClass('cb_off');
	},
	doCheck: function(){
		if($(this).hasClass('cb_off')){
    		$(this).removeClass('cb_off').addClass('cb_on');
    	} else {
    		$(this).removeClass('cb_on').addClass('cb_off');
    	}
	},
	doLogin1: function(){
		Auth.doLogin(1);
	},
	doLogin2: function(){
		Auth.doLogin(2);
	},
	doLogin: function(tt){
		if(authing>0)return;
		$('#msg').html('');
		var username = $.trim($('#username').val());
    	if(username.length<=0){
    		$('#username').focus();
    		$('#msg').html('请输入登录用户名！');
    		return;
    	}
    	
    	var password = $.trim($('#password').val());
    	if(password.length<=0){
    		$('#password').focus();
    		$('#msg').html('请输入登录密码！');
    		return;
    	}
    	var btns = $('li.btns').html();
		$('li.btns').html('<button class="loading" disabled>登录中，请稍等..</button>');
		authing = 1;
    	$.ajax({
            url: "./action/doLogin.do",
            global: false,
            type: "post",
            dataType: "json",
            data: {
    			username: username,
    			password: password,
    			saved: ($('#btnCheck').hasClass('cb_on'))?1:0,
    			from: $.trim($('#from').val()),
    			domain: (tt==2)?'xiaonei':'nuaa'
    		},
            success: function(s) {
    			authing = 0;
    			$('li.btns').html(btns);
    			$('#password').val('');
    			if(s&&s.status==1){
    				var data = $.parseJSON(s.data);    				
    				if(data.status=="success"){
    					Auth.success(data);
    					return false;
    				} else if(data.status=="reject"){
    					$('#msg').html('账户或密码错误!');
                                        start();
    				} else if(data.status=="connected")
                    {
    					$('#msg').html('您的账户已经登录系统!');
                        addtext(data.username);
                        start();
					} else if(data.status=="authing"){
    					$('#msg').html('您的账户正在不同的计算机上同时登录!');
                                        addtext(data.username);
                                        start();
					} else if(data.status=="timeout"){
    					$('#msg').html('登录超时，请稍后再试!');
                                        addtext(data.username);
                                        start();
					} else {
    					$('#msg').html('登录失败，请稍后再试!');
    				}
    			}
            },
            error: function(s) {authing = 0;$('li.btns').html(btns);$('#msg').html(s ? s.statusText: "系统错误，请稍后再试！")}
        })
	},
	doLogout: function(tt){
		$('#success_msg').html('<br>');
    	var btns = $('li.btns_logout').html();
		$('li.btns_logout').html('<button class="loading" disabled>下线中，请稍等..</button>');
    	$.ajax({
            url: "./action/doLogout.do",
            global: false,
            type: "post",
            dataType: "json",
            data: {
    			from: $.trim($('#from').val()) | ''
    		},
            success: function(s) {
    			$('li.btns_logout').html(btns);
    			if(s&&s.status==1){
    				if(s.statusText=="success"){
    					Auth.login();
    					return false;
    				} else if(s.statusText=="reject"){
    					$('#success_msg').html('<br>下线请求被拒绝!');
					} else {
    					$('#success_msg').html('<br>下线请求失败，请稍后再试!');
    				}
    			}
            },
            error: function(s) {$('li.btns_logout').html(btns);$('#success_msg').html('<br>'+(s ? s.statusText: "系统错误，请稍后再试！"))}
        })
    }
};

$(function(){
    Auth.initialize();		
})

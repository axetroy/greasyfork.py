// ==UserScript==
// @name Douyu666
// @namespace https://greasyfork.org/en/scripts/douyu222
// @version    0.10.0
// @description 快速发弹幕
// @icon http://www.douyutv.com/favicon.ico
// @include http://www.douyu.com/*
// @include https://www.douyu.com/*
// @include http://xiu.douyu.com/*
// @include https://xiu.douyu.com/*
// @grant       none
// @copyright  反馈和建议E-mail: nolazyload@foxmail.com
// @homepageURL https://greasyfork.org/zh-CN/scripts/17403-douyu666
// ==/UserScript==

//下面去广告
var styleEl = document.createElement('style');
styleEl.type = 'text/css';
styleEl.innerHTML = "div.ft-sign-cont,\
div.sq-ad.fl,\
div.lol-ad,\
div.rank-video,\
#js-chat-notice,\
#guess-main-panel > a,\
#js-stats-and-actions > div.action-list.fl > a:nth-child(5),\
div[class*='recommendAD'],\
div[class*='recommendApp'],\
#js-chat-cont > div.chat-ad,\
#odFire,\
#js-stats-and-actions > div.action-list.fl,\
div.bg-1a1f33,\
div.closeBg-8c5e18,\
div.room-ad-video-down,\
div.normalBg-dc300b {display: none !important;}\
#guess-main-panel > div.slide-bar.left-bar{display:block !important;}\
#guess-main-panel > div.slide-bar.right-bar{display:block !important;}\
#js-room-video22{width:0px !important;height:0px !important;}\
";
styleEl.innerHTML+=`
div.SignBaseComponent-sign-box.RoomChat.Barrage-chat-ad,
div.ToolbarActivityArea,
div.Bottom-ad,
div.Title-ad,
div.PlayerToolbar-signCont,
div[class*='normalBg-'],
div[class*='closeBg-'],
div.GuessGameAdContainer{display: none !important;}
#giugiuhohoiuh{background: #ffffff url('') !important;}
`;
document.documentElement.appendChild(styleEl);
//上面去广告

//下面全局函数
function contentEval(source) {
    if ('function' == typeof source) {
        source = '(' + source + ')();'
    }
    let script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = source;
    document.body.appendChild(script);
    document.body.removeChild(script);
}

contentEval(function(){

    window.lastdanmu = "";
    window.lastinput  = "";
    window.lastinput1 = "";
    window.lastinput2 = "";
    window.re_send_check_dy = function(x) //发送弹幕&可重复
    {
        try
        {
            let t = document.querySelector('textarea.cs_textarea') || document.querySelector('textarea.cs-textarea')||document.querySelector('textarea.ChatSend-txt');
            let s = document.querySelector('div.b-btn') || document.querySelector('#sendmsg')||document.querySelector('div.ChatSend-button'); //发送按钮
            let l = window.lastdanmu;//(lastcontent || lastContent); //上次的弹幕

            let b = (x || l); //本次要发送的弹幕
            console.log(b);
            if(!b)return; // 传入弹幕或者上次弹幕都是空就返回

            //发方过快就会导致弹幕被吃了
            
            
            if(b==l)b = changet(b);
            
            function changet(z){
                    if(z.substr(0,1) == "‍"){ //如果首位是特殊符号就去掉
                        z = z.slice(1);
                        return z;
                    }else{
                        z =  "‍" + z;
                        return z;
                    }
            }
            
            
            
            if(b)
            {
                t.value = b;
                s.click();
                if(t.value!=""){
                    b = changet(b);
                    //lastdanmu = t.value;
                    t.value = b;
                    s.click();
                };
                //console.log('重发弹幕'+b);
            }
            //console.log(document.querySelector('#chart_content').value);
        }
        catch(e)
        {
            console.log('重发弹幕'+e);
        }
    }

    window.rep_send = function(x) //发送按钮重发上次弹幕函数
    {
        //console.log(rep_send.caller);
        //console.log(x);
        //console.log(event.isTrusted);
        let t = document.querySelector('textarea.cs_textarea') || document.querySelector('textarea.cs-textarea')||document.querySelector('textarea.ChatSend-txt');
        let s = document.querySelector('div.b-btn') || document.querySelector('#sendmsg')||document.querySelector('div.ChatSend-button'); //发送按钮
        if(s&&s.innerText=="发送")
        {
            if(event.isTrusted && t.value == "")
            {
                re_send_check_dy();
            }
        }
    }
    window.nx_time = function()
    {
        let nd = new Date();
        function dbl(l)
        {
            //console.log(l.toString().length);
            if(l.toString().length == 1)
            {
                return "0"+l;
            }
            else
            {
                return l;
            }
        }
        let now2 = dbl(nd.getHours()) +':'+ dbl(nd.getMinutes()) +':'+ dbl(nd.getSeconds()) +' '+ nd.getFullYear() +'/'+ dbl((nd.getMonth()+1)) +'/'+ dbl(nd.getDate());
        //alert(now2);
        return now2;
    }
    window.setrebutton = function() //发送按钮绑定重发功能
    {
        try
        {
            let s = document.querySelector('div.b-btn') || document.querySelector('#sendmsg')||document.querySelector('div.ChatSend-button'); //发送按钮
            if(s)
            {
                s.setAttribute("onclick","javascript:rep_send(event);");
            }            
            else
            {
                setTimeout(setrebutton,100);
            }
            let t = document.querySelector('textarea.cs_textarea') || document.querySelector('textarea.cs-textarea')||document.querySelector('textarea.ChatSend-txt');
            if(t){
                t.setAttribute("oninput","javascript:window.lastdanmu=this.value;");
            }
            //console.log('onclick111111111111');
        }
        catch(e)
        {
            console.log("发送按钮"+e);
            setTimeout(setrebutton,100);
        }
    }


    window.auto_re_b = function () //自动重发弹幕
    {
        //console.log(lastcontent);
        let b = document.querySelector('#re_autore');
        //console.log(b.checked);
        let s = document.querySelector('div.b-btn') || document.querySelector('#sendmsg')||document.querySelector('div.ChatSend-button'); //发送按钮
        if(b && b.checked && s && s.innerText=="发送")
        {
            re_send_check_dy();
        }
    }
    window.setInterval(auto_re_b,100);
    
    
    window.last_say = function (){
        try{
                let chatlist = document.querySelector('#js-chat-cont')||document.querySelector("#js-barrage-list");

               chatlist.addEventListener('DOMSubtreeModified', function () {
                //console.log( 'DOM Changed at ' + new Date());

                let l = document.querySelectorAll('span.chat-msg-item.m');
                if(l.length==0){l=document.querySelectorAll('span.Barrage-content');}
                    if(l && l.length>0){
                    let t = l[l.length-1];
                        //console.log(t.innerText);
                        if(t.innerText != window.lastdanmu) window.lastdanmu = t.innerText;
                    }else{
                    
                    }
                    
            }, false);
        }catch(e){
            console.log("error"+e);
            setTimeout(last_say,2000); //菜单插入失败重试
        }
    }
    
    //last_say();
    
    window.last_say2 = function (){
        let t = document.querySelector('textarea.cs_textarea') || document.querySelector('textarea.cs-textarea')||document.querySelector('textarea.ChatSend-txt');
        //t.setAttribute("onkeydown","javascript:if(event.keyCode==13&&lastinput!=''){window.lastdanmu = lastinput;}");
        t.setAttribute("oninput","\
        lastinput = this.value;\
        window.lastdanmu = lastinput;\
        console.log(lastinput);\
        ");
    }
    window.douyu666help = function(){
    
        alert(`
帮助:
    时间图标点击可发送当前时间
    不输入内容,重复点击发送按钮可自动重复发送上次弹幕
    勾选循环图标,会无限重复上次弹幕
`);
    }
    
    
});
//上面全局函数





bullet_menu();//插入弹幕菜单


//setInterval(modify,1000); //循环执行 1s 周期

function bullet_menu() //弹幕菜单
{
    try
    {
        //确认登陆后,修改布局,并后续加入菜单
        let convenient_bullet_is = document.querySelector("#convenient_bullet");
        if(convenient_bullet_is)
        {
            //console.log(convenient_bullet_is);
            return;
        }
        /*
        if(nologin&&nologin.style.display!="none")
        {
            setTimeout(bullet_menu,1000);
            return;
        }
        */
        
        setrebutton();


        //快捷弹幕菜单
        let convenient_menu = document.createElement("div");

        convenient_menu.style.cursor="pointer";
        convenient_menu.style.fontSize="16px";
        //convenient_menu.style.top=t.offsetHeight+4+"px";
        //convenient_menu.style.bottom="0px";
        //convenient_menu.style.left=t.offsetLeft+"px";
        convenient_menu.style.position="relative";
        convenient_menu.style.zIndex="99";
        convenient_menu.style.float="right";
        convenient_menu.style.display="block";
        convenient_menu.style.color = "#ff0000";
        convenient_menu.style.backgroundColor = "#E3E3E3";
        convenient_menu.setAttribute("id","convenient_bullet");

        /*
        convenient_menu.setAttribute("onmouseover","\
        document.getElementById('nx_menu').style.display = 'block';\
        ");
        convenient_menu.setAttribute("onmouseout","\
        document.getElementById('nx_menu').style.display = 'none';\
        ");
        */

        convenient_menu.setAttribute("class","convenient_buttons");
        convenient_menu.innerHTML = "\
        <style type='text/css'>\
        .convenient_buttons span{cursor:pointer;color:blue;font-size:14px;padding-right:1px;margin:0px;}\
        .convenient_buttons span:hover{color:red;border:0px solid red;background-color:#f70;cursor:pointer;}\
        \
        \
        \
        \
        \
        \
        \
        \
        \
        </style>\
        <span onclick=\"javascript:re_send_check_dy('88888888888888')\">88</span>\
        <span onclick=\"javascript:re_send_check_dy('GG')\">GG</span>\
        <span onclick=\"javascript:re_send_check_dy('哈哈哈哈哈哈哈哈哈哈!')\">哈</span>\
        <span onclick=\"javascript:re_send_check_dy('66666666666666')\">66</span>\
        <span onclick=\"javascript:re_send_check_dy('11111111111111')\">11</span>\
        <span onclick=\"javascript:re_send_check_dy('22222222222222')\">22</span>\
        <span onclick=\"javascript:re_send_check_dy('23333333333333')\">23</span>\
        <span onclick=\"javascript:re_send_check_dy('??????????????')\">??</span>\
        <span onclick=\"javascript:re_send_check_dy('色情主播!')\">色</span>\
        <span onclick=\"javascript:re_send_check_dy('啪啪啪啪啪啪啪啪啪!')\">啪</span>\
        <span onclick=\"javascript:re_send_check_dy('啊啊啊啊啊啊啊啊啊!')\">啊</span>\
        <span onclick=\"javascript:re_send_check_dy('噗!噗!噗!噗!噗!噗!噗!')\">噗</span>\
        <span onclick=\"javascript:re_send_check_dy(nx_time())\">◷</span>\
        <span onclick=\"javascript:re_send_check_dy('污污污污污污污污污!')\">污</span>\
        <span><input type='checkbox' name='re_autore' id='re_autore'><label for='re_autore'>⟲</label></span>\
        <span onclick=\"javascript:douyu666help()\">-?</span>\
        ";
        //document.querySelector("div.chat").appendChild(convenient_menu);
        let chat = document.querySelector("#js-live-room-normal-right") || document.querySelector("div.layout-Player > div.layout-Player-aside");
        chat.parentNode.insertBefore(convenient_menu,chat.nextElementSibling);
        
    }catch(e)
    {
        console.log("error"+e);
        setTimeout(bullet_menu,2000); //菜单插入失败重试
    }
}

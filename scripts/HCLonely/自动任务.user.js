// ==UserScript==
// @name         自动任务
// @namespace    https://greasyfork.org/scripts/370650
// @version      1.4.0
// @description  自动完成并验证赠key网站任务
// @author       HCLonely
// @icon         data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAgACADASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAABgQFBwP/xAAuEAACAQIFAgQEBwAAAAAAAAABAgMEEQAFEiExBkETUWFxFBUioTJCQ3KBsdH/xAAYAQADAQEAAAAAAAAAAAAAAAABAgMABP/EABsRAQADAAMBAAAAAAAAAAAAAAEAAgMRIkEx/9oADAMBAAIRAxEAPwDr008VPGZJpFRR3Y4GVfWclVMxpkaOmQ8rIpZh5mx29seXWUlRVV8cEV1KsRrJ2Qeg89ufXB0dPRkbamJFibnHLpp4S2eYnLEFF1nU/GM0ktoufBlUliOSR/ovhpl+YQZlSLU05JU7EHlT3B9cckqaGpoVD+I80K/lf6tH7T2Pth50RVLLTVMZkViziRADf6SAP7H3wc7q8M2tAOSVZ9kjTs1fSyKsqqS8cn4JPLfsR98ZvTUVfX0E3zaiFFNDUNGgTcSqOCL4VVc0UFMzzi8fB2vztjAzfOfgoaePLHWaonnWIRybBATY3255thr1PsGbZ6kiqMtM1LO4ppYpE/Tl0WYcE7E2Ft8U9J5RJlYeWfSjLqjVFfUCL3FvYHEcWZZnBnlQle0E8baPBpw41C97nUOOB/JwihpWcAxsEHPhcFPQ+fv3wlK+ymlU62Z//9k=
// @include      *://www.grabfreegame.com/giveaway/*
// @include      *://gamecode.win/giveaway/*
// @include      *://whosgamingnow.net/giveaway/*
// @include      *://marvelousga.com*
// @include      *://dupedornot.com*
// @include      *://gamezito.com*
// @include      *://www.bananagiveaway.com/giveaway/*
// @include      /https?:\/\/gamehag.com\/.*?giveaway\/.*/
// @include      *://giveawayhopper.com/giveaway/*
// @include      *://chubkeys.com/giveaway/*
// @include      *://giveaway.su/giveaway/view/*
// @include      *://gleam.io/*
// @include      *://gamehunt.net/distribution/*
// @include      *://www.orlygift.com/giveaway*
// @include      *://www.indiedb.com/giveaways/*
// @include      *://www.spoune.com/*
// @exclude      *://www.spoune.com/werbung/*
// @exclude      /https?:\/\/www.spoune.com\/.*?verify\-api.*/
// @include      *://prys.ga/giveaway/?id=*https://www.opiumpulses.com/giveaways
// @run-at       document-end
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @grant        GM_setClipboard
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_openInTab
// @grant        GM_log
// @require      https://greasyfork.org/scripts/379868-jquery-not/code/jQuery%20not%20$.js?version=692730
// @supportURL   https://steamcn.com/t455167-1-1
// @connect      instagram.com
// @connect      twitter.com
// @connect      facebook.com
// @connect      youtube.com
// @connect      steampowered.com
// @connect      accounts.google.com
// @connect      vk.com
// @connect      gamehag.com


// @connect      g2a.com
// @connect      gamehunt.net
// @connect      9000.plati.market
// @connect      csgolite.ru
// @connect      gosens.bet
// @connect      discordapp.com
// @connect      miped.ru
// ==/UserScript==

'use strict';

try{

    const SETTING={
        version:'1.4.0',
        autoOpen:true,//1为自动打开任务页面;改为0则不打开任务页面
        updateText:'1.增加对Chubkeys网站的支持',
    };
    let setting=GM_getValue("setting")||{};
    let ats={};
    let updateText;
    if(SETTING.version!=setting.version){
        setting.version=SETTING.version;
        setting.updateText=SETTING.updateText;
        for(let i in SETTING){
            ats[i]=setting[i]||SETTING[i];
        }
        GM_setValue("setting",ats);
    }
    setting=GM_getValue("setting");
    let autoOpen=setting['autoOpen'];

    let url=window.location.href;

    let bg=/bananagiveaway/gim.test(url)?"background-color:#71c61d;":"";
    let height=/grabfreegame/gim.test(url)?96:(/bananagiveaway/gim.test(url)?110:(/gamezito/gim.test(url)?125:(/gamecode/gim.test(url)?30:40)));
    $css(`
#doTaskDiv{position:fixed;right:80px;top:${height}px;width:85px;z-index: 99999999999;}
#info{max-height:352px;overflow-y:auto;padding:0 !important}
#exInfo{position:fixed;right:50px;bottom:10px;max-width:600px;max-height:400px;z-index: 99999999999;display:none;background-color:#fff;padding:1.5rem}
.infos{position:absolute;top:0px;left:0px;background-color:#757d81;border-radius: 3px !important;padding: 0px 2px !important;width:20px;height:20px}
#shouqi{font-weight:900;color:#00e5ff}
.auto-task{width:145px;height:40px;${bg}}
#fixed-banana,cloudflare-app{display:none !important}
.setting{width:145px;background:white;border:2px solid;border-radius:5px;}
`);

    let div=$ele({ele:"div","id":"doTaskDiv","class":"card-content",parent:$tag("body")[0],html:`<button id="doTask" class="btn btn-round auto-task btn-theme btn-outline-dark btn-min-width mr-1 mb-1" title="一键做任务+验证">FuckTask</button>
<button id="Verify" class="btn btn-round auto-task btn-theme btn-outline-dark btn-min-width mr-1 mb-1" title="一键验证">Verify</button>
<button id="Remove" class="btn btn-round auto-task btn-theme btn-outline-dark btn-min-width mr-1 mb-1" title="一键退组,取关">Remove</button>`});
    $ele({ele:"button",parent:div,class:"btn btn-round auto-task btn-theme btn-outline-dark btn-min-width mr-1 mb-1 btn-success btn-sm",id:"Setting",title:"设置",onclick:settingFuc,text:"⚙设置"});
    $jq(".auto-task").click(showUpdate);
    let div3=$ele({ele:"div","id":"exInfo",parent:$tag("body")[0],html:`<span class="infos"><a id="shouqi" class="zhankai" href="javascript:;"" title="收起">↘</a></span>`});
    let div2=$ele({ele:"div","id":"info","class":"card-body card",parent:div3});
    $id("shouqi").onclick=function(e){
        e=$id("shouqi").className=="zhankai"?["20px","↖","展开","shouqi","none"]:["","↘","收起","zhankai","block"];
        div3.style.width=e[0];
        div3.style.height=e[0];
        $id("shouqi").innerText=e[1];
        $id("shouqi").setAttribute("title", e[2]);
        $id("shouqi").setAttribute("class", e[3]);
        div2.style.display=e[4];
    }

    if(/marvelousga|dupedornot|gamezito/.test(url)){//marvelousga,dupedornot,gamezito领key

        $jq("body").text().match(/THIS GIVEAWAY IS CLOSED FOR THE MOMENT/gim)!=null&&(confirm("此页面已经没有key了，是否关闭？")&&(window.close()));

        /You need to be logged in to perform all tasks/gim.test($tag("body")[0].innerText)&&(window.location.href="/login");

        let game=$jq("#giveawaySlug").val();

        $jq('cloudflare-app[app="welcome-bar"]').remove();
        let w=0;
        banNewBlock();

        //marvelousga,dupedornot,gamezito浏览页面任务
        function finTask(taskId,e,text,task){
            let p=info("card-text monospace","",`开始任务${taskId}:${text}...`);
            httpSend({
                type: "post",
                url: task?"/ajax/verifyTasks/webpage/clickedLink":"/ajax/verifyTasks/video/finished",
                headers:{'x-csrf-token': $jq('meta[name="csrf-token"]').attr('content')},
                data:{
                    giveaway_slug: game,
                    giveaway_task_id: taskId
                },
                callback: function (data) {
                    if(data.status==200){
                        if(data.json.status==1){
                            $id((task?"task_webpage_visit_":"task_video_watched_")+taskId).innerText="OK";
                            addR(p,"OK!");
                        }else{
                            let msg=data.json.message||"ERROR";
                            addR(p,msg,"err");
                        }
                    }else{
                        addR(p,`${data.statusText}:${data.status}`,"err");
                    }
                    e===w&&(getId());
                }
            });
        }

        //marvelousga,dupedornot,gamezito获取任务id
        function getId(provider=[],taskRoute=[],taskID=[],btn_id=[],p_id=[]){
            $jq("button[id^='task_']:not(:contains('VERIFIED'))").map((i,e)=>{
                let thisBtn = $(e);
                provider.push(thisBtn.attr('id').split('_')[1]);
                taskRoute.push(thisBtn.attr('id').split('_')[2]);
                taskID.push(thisBtn.attr('id').split('_')[3]);
                btn_id.push(e.id);
                /https?:\/\/gamezito.com\/giveaway\/[\w\W]*/.test(url)?p_id.push($jq.trim($(e).parent().parent().find("h3")[0].innerHTML.replace(/id\=\"[\w\W]*?\"/i,""))):p_id.push($jq.trim($(e).parent().find("p")[0].innerHTML.replace(/id\=\"[\w\W]*?\"/i,"")));
            });
            if(taskID.length>0){
                verify(provider,taskRoute,taskID,btn_id,p_id,0);
            }else{
                info("card-text monospace","color:green",`所有任务验证完成！`);
                getKey();
            }
        }

        //marvelousga,dupedornot,gamezito验证任务
        function verify(provider,taskRoute,taskID,btn_id,p_id,e,v=0){
            if(/visit[\w\W]*?webpage/gim.test(p_id[e])&&v==1){
                e++;
                if(e<btn_id.length){
                    verify(provider,taskRoute,taskID,btn_id,p_id,e);
                }else{
                    info("card-text monospace","color:green",`所有任务验证完成！`);
                    getKey();
                }
                return;
            }else{
                /visit[\w\W]*?webpage/gim.test(p_id[e])&&v!=1&&(v=1);
                let p=info("card-text monospace","",`验证任务${taskID[e]}:${p_id[e]}...`);
                if(/Join[\w\W]*?in Steam/i.test(p_id[e].innerText)){
                    $id(btn_id[e]).removeAttribute("disabled");
                    $id(btn_id[e]).click();
                }
                httpSend({
                    type: "post",
                    url: '/ajax/verifyTasks/' + provider[e] + '/' + taskRoute[e],
                    headers:{'x-csrf-token': $jq('meta[name="csrf-token"]').attr('content')},
                    data:{
                        giveaway_slug: game,
                        giveaway_task_id: taskID[e]
                    },
                    callback: function (data) {
                        if(data.status==200){
                            if(data.json.status==1){
                                let thisBtn=$jq('#'+btn_id[e]);
                                thisBtn.text('VERIFIED')
                                thisBtn.attr('disabled', true);
                                thisBtn.attr('data-disabled', 1);
                                p.innerHTML+="<font style='color:green'>OK!</font>--<font style='color:blue'>"+data.json.percentageNanoBar+"%</font>";
                            }else{
                                $id(btn_id[e]).innerText="ERROR!";
                                $id(btn_id[e]).style.color="red";
                                autoOpen&&(/gamezito/gim.test(url)?$id(btn_id[e]).parentNode.parentNode.getElementsByTagName("a")[0].click():$id(btn_id[e]).parentNode.getElementsByTagName("a")[0].click());
                                let msg=data.json.message||"ERROR";
                                addR(p,msg,"err");
                            }
                            e++;
                            if(data.json.percentageNanoBar==100||e>=btn_id.length){
                                info("card-text monospace","color:green",`所有任务验证完成！`);
                                getKey();
                            }else{
                                verify(provider,taskRoute,taskID,btn_id,p_id,e,v);
                            }
                        }else{
                            $id(btn_id[e]).innerText="ERROR!";
                            $id(btn_id[e]).style.color="red";
                            data.status!=419&&($id(btn_id[e]).parentNode.getElementsByTagName("a")[0].click());
                            addR(p,`${data.statusText}:${data.status}`,"err");
                            e++;
                            if(e<btn_id.length){
                                verify(provider,taskRoute,taskID,btn_id,p_id,e);
                            }else{
                                info("card-text monospace","color:green",`所有任务验证完成！`);
                                getKey();
                            }
                        }
                    },
                });
            }
        }

        //marvelousga,dupedornot,gamezito获取steamkey
        function getKey(){
            if(/your[\s]*?key[\w\W]*?[\w\d]{5}(-[\w\d]{5}){2}/gim.test($tag("body")[0].innerText)){
                info("card-text monospace","",`你已经领取过key了！`);
                return 0;
            }
            $jq("#get_key_container").show();
            info("card-text monospace","",`请手动完成<a id="google" href="javascript:void(0)">谷歌验证</a>获取key!`);
            $id("google").onclick=function(){
                $id("get_key_container").scrollIntoView();
                $jq("#get_key_container .card-body").css('background-color','red');
                setTimeout(function(){$jq("#get_key_container .card-body").css('background-color','')},600);
            };
            $jq("#exInfo").show();
            $id("get_key_container").scrollIntoView();
            $jq("#get_key_container .card-body").css('background-color','red');
            setTimeout(function(){$jq("#get_key_container .card-body").css('background-color','')},600);
        }

        //marvelousga,dupedornot,gamezito按钮定义
        $id("doTask").onclick=function(){
            $jq("#exInfo").show();
            $jq('button>span:contains("Join ")').click();
            $jq('button>span:contains("Follow ")').click();
            info("card-text monospace","",`正在做加组、关注等任务(此功能需要<a href="https://greasyfork.org/zh-CN/scripts/34764-giveaway-helper" target="_blank">Giveaway Helper脚本</a>,没有则自动跳过此步骤)，请稍候！`);
            doTask(function(){
                w=0;
                if($jq("video").length>0){
                    w++;
                    finTask($jq("video").parent().parent().parent().parent().find("button.btn-dark")[0].id.replace(/task_video_watched_/,""),"","Watch this video",0);
                }
                $jq("a:contains('this')").map((i,e)=>{
                    if(/task_(webpage_clickedLink|video_watched)_[\d]*/.test(e.id)&&!/verified/i.test($jq(e).parent().parent().find("button")[0].innerText)){
                        let taskId=e.id.replace(/task_webpage_clickedLink_|task_video_watched_/,"");
                        let text=$jq(e).parent().html().replace(/id\=\"[\w\W]*?\"/i,"");
                        w++;
                        finTask(taskId,w,text,1);
                    }
                });
                w==0&&(getId());
            },new Date().getTime(),($jq('button>span:contains("Join ")').length+$jq('button>span:contains("Follow ")').length)*3);
        };
        $id("Verify").onclick=function(){
            $jq("#exInfo").show();
            getId();
        };

    }

    //gamecode领key
    if(/gamecode/.test(url)){

        $jq("body").text().match(/THIS GIVEAWAY IS CLOSED FOR THE MOMENT/gim)!=null&&(confirm("此页面已经没有key了，是否关闭？")&&(window.close()));

        /Please login to see the tasks/gim.test($tag("body")[0].innerText)&&(window.location.href="/login");

        banNewBlock();

        //gamecode按钮定义
        $id("doTask").onclick=function(){
            $jq("#exInfo").show();
            $jq('button>span:contains("Join ")').click();
            $jq('button>span:contains("Follow ")').click();
            info("card-text monospace","",`正在做加组、关注等任务(此功能需要<a href="https://greasyfork.org/zh-CN/scripts/34764-giveaway-helper" target="_blank">Giveaway Helper脚本</a>,没有则自动跳过此步骤)，请稍候！`);
            doTask(gamecode_task,new Date().getTime(),($jq('button>span:contains("Join ")').length+$jq('button>span:contains("Follow ")').length)*3);
        };
        $id("Verify").onclick=function(){
            $jq("#exInfo").show();
            gamecode_task();
        };

        let t=0;
        $jq("#doTask").one('click',()=>{
            if(t==0){
                gamecode_result();
                t++;
            }
        });
        $jq("#Verify").one('click',()=>{
            if(t==0){
                gamecode_result();
                t++;
            }
        });

        //gamecode做任务$(".btn.btn-theme:not('.auto-task'):not(:contains('VERIFIED'))")
        function gamecode_task(){
            info("card-title","color: #f38288",`正在自动做任务，任务完成后请手动完成谷歌验证领取key!`);
            $jq(".btn.btn-theme:not('.auto-task'):not(:contains('VERIFIED'))").map((i,e)=>{
                e.removeAttribute("disabled");
                e.click();
            });
            $jq("#button-container").show();
        }

        function gamecode_result(){
            let taskCard=$jq('.container .row .col-sm-4:visible:not(".col-sm-offset-4")');
            if(taskCard.length>0){
                taskCard.map((i,e)=>{
                    if($jq(e).find('button').text()=="VERIFIED"){
                        $jq(e).hide();
                    }else{
                        $jq(e).css('background-color','red');
                    }
                });
                setTimeout(gamecode_result,500);
            }else{
                $jq('.container .row .col-sm-4:not(:visible):not(".col-sm-offset-4")').removeAttr('style');
                $jq('.container .row .col-sm-4:not(:visible):not(".col-sm-offset-4")').show();
                $id("insertKey").scrollIntoView();
                info('card-title','color:green','所有任务已完成，请手动完成谷歌验证领取key!');
            }
        }

    }


    if(/grabfreegame|bananagiveaway/.test(url)){//grabfreegame,bananagiveaway领key

        $jq("div.left").text().match(/[\d]+/gim)[0]==0&&(confirm("此页面已经没有key了，是否关闭？")&&(window.close()));

        //自动登录
        /log.*?in/gim.test($jq(".user").text())&&(location.href=$jq(".user").children("a.steam")[0].href);

        //grabfreegame,bananagiveaway按钮定义
        $id("doTask").onclick=function(){
            isBanana();
            $jq("#exInfo").show();
            $jq('button>span:contains("Join ")').click();
            $jq('button>span:contains("Follow ")').click();
            info("card-text monospace","",`正在做加组、关注等任务(此功能需要<a href="https://greasyfork.org/zh-CN/scripts/34764-giveaway-helper" target="_blank">Giveaway Helper脚本</a>)，请稍候！`);
            doTask(()=>{getBtn("d")},new Date().getTime(),($jq('button>span:contains("Join ")').length+$jq('button>span:contains("Follow ")').length)*3);
        };
        $id("Verify").onclick=function(){
            $jq("#exInfo").show();
            getBtn("v");
        };
        div2.setAttribute("style", `right:50px;bottom:10px;z-index: 99999999999;font-family: Menlo,Monaco,Consolas,"Courier New",monospace;font-size: 20px;background: #fff;color: #f05f00;border: 3px solid #ababab;order-radius: 8px;display: inline-block;`);

        //grabfreegame,bananagiveaway检测是否需要香蕉
        function isBanana(){
            var banana=$("p:contains('Collect'):contains('banana')");
            if(banana.length>0){
                alert("此key需要收集"+banana.text().match(/[\d]+/gim)[0]+"个香蕉！");
            }
        }

        //grabfreegame,bananagiveaway获取任务id
        function getBtn(e,verify_btn=[],do_btn=[]){
            $jq("button:contains('Verify'):not('#Verify')").map((i,e)=>{
                verify_btn.push(e.onclick.toString().match(/\/\/www.(grabfreegame|bananagiveaway).com\/giveaway\/[\w\W]*?\?verify\=[\d]+/)[0]);
            });
            $jq("button:contains('To'):contains('do')").map((i,e)=>{
                e.onclick&&(do_btn.push(e.onclick.toString().match(/\/\/www.(grabfreegame|bananagiveaway).com\/giveaway\/[\w\W]*?\?q\=[\d]+/)[0]));
            });
            do_btn.length>0&&e==="d"&&(gbDoTask(0,verify_btn,do_btn));
            verify_btn.length>0&&e==="v"&&(bananaVerify(0,verify_btn));
        }

        //grabfreegame,bananagiveaway做任务
        function gbDoTask(e,verify_btn,do_btn){
            let taskId=do_btn[e].match(/\?q\=[\d]+/)[0];
            taskId=taskId.replace("?q=","");
            let p=info("code","",`执行任务:${taskId}...`);
            httpSend({
                type: "get",
                url: do_btn[e],
                timeout:"10000",
                callback: function (data) {
                    addR(p,"OK");
                    e++;
                    e<do_btn.length?gbDoTask(e,verify_btn,do_btn):(verify_btn.length>0&&(bananaVerify(0,verify_btn)));
                }
            });
        }

        //grabfreegame,bananagiveaway验证任务
        function bananaVerify(e,verify_btn){
            let taskId=verify_btn[e].match(/\?verify\=[\d]+/)[0];
            taskId=taskId.replace("?verify=","");
            let p=info("code","",`验证任务:${taskId}...`);
            httpSend({
                type: "get",
                url: verify_btn[e],
                timeout:"10000",
                callback: function (data) {
                    addR(p,"OK");
                    e++;
                    e<verify_btn.length?bananaVerify(e,verify_btn):bananaRe();
                }
            });
        }

        //grabfreegame,bananagiveaway刷新网页
        function bananaRe(){
            let ytb=$jq(".tasks:first li:contains('Subscribe'):contains('our'):contains('channel'):not(:contains('Completed'))");
            if(ytb.length>0){
                let ytbBtn=ytb.find("button")[1];
                ytbBtn.removeAttribute("disabled");
                ytbBtn.click();
            }else{
                let twitter=$jq(".tasks:first li:contains('Share'):contains('this'):contains('giveaway'):contains('Twitter'):not(:contains('Completed'))");
                if(twitter.length>0){
                    let ttBtn=twitter.find("button");
                    ttBtn[0].click();
                    ttBtn[1].removeAttribute("disabled");
                    ttBtn[1].click();
                }else{
                    window.location.reload(true);
                }
            }
        }
    }


    if(/whosgamingnow/.test(url)){//wgn领key

        $jq("body").text().match(/out of keys/gim)!=null&&(confirm("此页面已经没有key了，是否关闭？")&&(window.close()));

        $jq("div.text-center").map(function(i,e){/Please login to enter/gim.test($jq(e).text())&&(location.href="?login")});

        //wgn按钮定义
        $id("doTask").onclick=function(){
            $jq('button>span:contains("Join ")').click();
            $jq('button>span:contains("Follow ")').click();
            doTask(wgn_enter,new Date().getTime(),($jq('button>span:contains("Join ")').length+$jq('button>span:contains("Follow ")').length)*3);
        };
        $id("Verify").onclick=function(){
            $jq("#exInfo").show();
            wgn_enter();
        };
        btn_class("btn btn-primary");

        //wgn获取key
        function wgn_enter(){
            httpSend({
                type: "post",
                url: url,
                data:{submit: "Enter"},
                callback: function (data) {
                    if(data.status==200){
                        if(/<h3>Steam key:<\/h3><p><strong class=\"SteamKey\">[\w\d]{5}(-[\w\W]{5}){2}<\/strong><\/p>/i.test(data.text)){
                            let key=data.text.match(/<h3>Steam key:<\/h3><p><strong class=\"SteamKey\">[\w\d]{5}(-[\w\W]{5}){2}<\/strong><\/p>/i)[0].replace(/(<h3>Steam key:<\/h3><p><strong class="SteamKey">)|(<\/strong><\/p>)/gi,"");
                            data.text=data.text.replace(key,`<a href=https://store.steampowered.com/account/registerkey?key=${key} title="点击激活">${key}</a>`);
                        }
                        document.write(data.text);
                    }else{
                        info("","color:red",data.statusText+":"+data.status);
                    }
                },
            });
        }
    }

    if(/gamehag/.test(url)){//gamehag领key

        if($jq("div.strong").eq(0).text()==0){
            $jq("div.strong").eq(0).parent()[0].style.backgroundColor="red";
            confirm("此页面已经没有key了，是否关闭？")&&(window.close());
        }

        let success,error,a,survey=0;;
        btn_class("btn btn-primary btn-sm box-collapse-verify");
        $jq("#doTaskDiv").css({"right": "340px","top": "100px"});
        $jq(".auto-task").width("105px");
        $css(`.misty-notification{display:none !important}`);

        //gamehag按钮定义
        $id("doTask").onclick=function(){
            $jq('#getkey').removeAttr('disabled');
            $jq("#exInfo").show();
            $jq('button>span:contains("Join ")').click();
            $jq('button>span:contains("Follow ")').click();
            info("card-text monospace","",`正在做加组、关注等任务(此功能需要<a href="https://greasyfork.org/zh-CN/scripts/34764-giveaway-helper" target="_blank">Giveaway Helper脚本</a>,没有则自动跳过此步骤)，请稍候！`);
            doTask(function(){
                success=0;
                error=0;
                survey=$jq("a.giveaway-survey").length>0&&(/\+1/gim.test($jq("a.giveaway-survey").parent().parent().next().text()))?1:0;
                a=0;
                let p=info("card-text monospace","",`正在做任务(<font style="color:red">需要时间较长请耐心等待</font>)...`);
                $jq("button[data-id]").length>0?gamehag_task(p):gamehag_suryey(0,p);
            },new Date().getTime(),($jq('button>span:contains("Join ")').length+$jq('button>span:contains("Follow ")').length)*3);
        };
        $id("Verify").onclick=function(){
            $jq('#getkey').removeAttr('disabled');
            $jq("#exInfo").show();
            success=0;
            error=0;
            survey=$jq("a.giveaway-survey").length>0&&(/\+1/gim.test($jq("a.giveaway-survey").parent().parent().next().text()))?1:0;
            $jq("button[data-id]").length>0&&($jq("button[data-id]").map(function(i,e){gamehag_verify(e)}));
            survey==1&&(gamehag_verify($jq("a.giveaway-survey")[0],"data-task_id"));
        };

        !empty($id("getkey"))&&($id("getkey").onclick=function(){$css(`.misty-notification{display:block !important}`)});

        //gamehag做任务
        function gamehag_task(p){
            $jq("button[data-id]").map(function(i,e){
                httpSend({
                    mode:"gm",
                    url:'//gamehag.com/giveaway/click/'+$jq(e).attr("data-id"),
                    type:'get',
                    headers:{'x-csrf-token': $jq('meta[name="csrf-token"]').attr('content')},
                    callback:function(data){
                        httpSend({mode:"gm",url:data.finalUrl,type:'get',headers:{'x-csrf-token': $jq('meta[name="csrf-token"]').attr('content')}});
                        a++;
                        if(a==$jq("button[data-id]").length){
                            $jq.ajax({url:'//gamehag.com/games',type:'get',headers:{'x-csrf-token': $jq('meta[name="csrf-token"]').attr('content')},complete:function(){
                                $jq.ajax({url:'//gamehag.com/games/war-thunder/play',type:'get',headers:{'x-csrf-token': $jq('meta[name="csrf-token"]').attr('content')},complete:function(){gamehag_start(p)}});
                            }});
                        }
                    }
                });
            });
        }

        //gamehag开始执行
        function gamehag_start(p){
            addR(p,"OK");
            gamehag_suryey();
            $jq("button[data-id]").map(function(i,e){gamehag_verify(e)});
        }

        //gamehag问卷调查任务
        function gamehag_suryey(e=1,p=0){
            p!=0&&(addR(p,"OK"));
            if(survey==1){
                info("card-text monospace","",`正在做问卷调查任务,如果没有此任务请忽视!`);
                $jq.ajax({url:'//gamehag.com/giveaway/click/'+$jq("a.giveaway-survey").attr("data-task_id"),type:'get',headers:{'x-csrf-token': $jq('meta[name="csrf-token"]').attr('content')}});
                gamehag_verify($jq("a.giveaway-survey")[0],"data-task_id");
            }else if(e==0){
                info("","color:green",`所有任务验证完成,请手动完成验证领取key!`);
            }
        }

        //gamehag验证任务
        function gamehag_verify(e,s="data-id"){
            if(/\+1/gim.test($jq(e).parent().parent().next().text())){
                let p=info("card-text monospace","",`验证任务:${$jq(e).parent().parent().find("a.tooltip-trigger").clone().html()}...`);
                $jq.ajax({
                    url:'//gamehag.com/api/v1/giveaway/sendtask',
                    type:'post',
                    data:'task_id='+$jq(e).attr(s),
                    headers:{'x-csrf-token': $jq('meta[name="csrf-token"]').attr('content')},
                    complete:function(XMLHttpRequest, textStatus){
                        if(XMLHttpRequest.status==429||/timeout/gim.test(textStatus)){
                            $jq(p).remove();
                            gamehag_verify(e);
                        }else{
                            let data=eval('('+XMLHttpRequest.responseText+')');
                            data.status=="success"?success++:error++;
                            let color=data.status=="success"?"green":"red";
                            p.innerHTML+=`<font style='color:${color}'>${data.message}!</font>`;
                            data.status=="success"&&($jq(e).parent().parent().parent().find("div.task-reward.tooltip-trigger").html(`<svg class="nc-icon nc-align-to-text grid-24 glyph"><use xlink:href="/icons/nci-fill.svg#nc-icon-check-simple"></use></svg>`));
                            if(/The task has not been completed/gim.test(data.message)&&autoOpen){
                                $open('https://gamehag.com/giveaway/click/'+$jq(e).attr("data-id"),false);
                            }
                        }
                        if(success+error==$jq("button[data-id]").length+survey){
                            error>0?info("","color:red",`所有任务验证完成,${error}个任务验证失败!`):info("","color:green",`所有任务验证完成,请手动完成验证领取key!`);
                            btn_class("btn btn-primary btn-sm box-collapse-verify");
                        }
                    }
                });
            }else{
                success++;
                if(success+error==$jq("button[data-id]").length+$jq("a.giveaway-survey").length){
                    error>0?info("","color:red",`所有任务验证完成,${error}个任务验证失败!`):info("","color:green",`所有任务验证完成,请手动完成验证领取key!`);
                    btn_class("btn btn-primary btn-sm box-collapse-verify");
                }
            }
        }
    }

    if(/giveawayhopper|chubkeys/.test(url)){//giveawayhopper领key

        btn_class("btn btn-outline-primary");

        $jq("#info").attr("style","border-radius: 0;border-bottom-right-radius: 0;border-bottom-left-radius: 0;");

        //giveawayhopper按钮定义
        $id("doTask").onclick=function(){
            $jq("#exInfo").show();
            $jq('button>span:contains("Join ")').click();
            $jq('button>span:contains("Follow ")').click();
            info("card-text monospace","",`正在做加组、关注等任务(此功能需要<a href="https://greasyfork.org/zh-CN/scripts/34764-giveaway-helper" target="_blank">Giveaway Helper脚本</a>,没有则自动跳过此步骤)，请稍候！`);
            doTask(function(){
                $jq("button.btn-check.btn-primary").map(function(i,e){
                    let taskText=$jq(e).parent().prev().text().replace(/(^\s*)|(\s*$)/g, "");
                    let taskId=e.id;
                    let taskUrl=$jq(e).prev().html().match(/xhttp.open\([\w\W]*?\)\;/gim)[0].match(/\"[\w\W]*?\"/gim)[1].replace(/\"/g,"");;
                    hopperTask(taskText,taskUrl,taskId);
                });
            },new Date().getTime(),($jq('button>span:contains("Join ")').length+$jq('button>span:contains("Follow ")').length)*3);
        };
        $id("Verify").onclick=function(){
            $jq("#exInfo").show();
            $jq("button.btn-check.btn-primary").map(function(i,e){
                let taskText=$jq(e).parent().prev().text().replace(/(^\s*)|(\s*$)/g, "");
                let taskId=e.id;
                let taskUrl=$jq(e).prev().html().match(/xhttp.open\([\w\W]*?\)\;/gim)[0].match(/\"[\w\W]*?\"/gim)[1].replace(/\"/g,"");;
                hopperTask(taskText,taskUrl,taskId);
            });
        };
        function hopperTask(taskText,taskUrl,taskId){
            let p=info("","",`正在做任务${taskText}...`);
            httpSend({
                type:"get",
                url:taskUrl,
                callback:function(data){
                    let verifyTaskBtn;
                    if(data.text == 'success'){
                        verifyTaskBtn = document.getElementById(taskId);
                        verifyTaskBtn.classList.remove("btn-danger");
                        verifyTaskBtn.classList.add("btn-success");
                        verifyTaskBtn.innerHTML = '<i class="la la-check"></i>&nbsp;DONE';
                        addR(p,data.text,"success");
                    }else{
                        verifyTaskBtn = document.getElementById(taskId);
                        verifyTaskBtn.classList.remove("btn-primary");
                        verifyTaskBtn.classList.remove("btn-primary");
                        verifyTaskBtn.classList.add("btn-danger");
                        verifyTaskBtn.innerHTML = '<i class="la la-close"></i>&nbsp;ERROR';
                        addR(p,data.text,"err");
                    }
                }
            });
        }
    }

    if(/giveaway\.su/.test(url)){//giveaway.su领key

        $jq(".giveaway-ended").length>0&&(confirm("此页面已经没有key了，是否关闭？")&&(window.close()));

        !empty($jq(".steam-login"),1)&&(location.href="/steam/redirect");

        btn_class("btn btn-success btn-sm");

        $ele({ele:"button",parent:div,class:"btn btn-round auto-task btn-theme btn-outline-dark btn-min-width mr-1 mb-1 btn-success btn-sm",title:"一键加入愿望单&关注游戏",onclick:function(){atw_fg(1)},html:"愿望单&关注"});
        $ele({ele:"button",parent:div,class:"btn btn-round auto-task btn-theme btn-outline-dark btn-min-width mr-1 mb-1 btn-success btn-sm",title:"一键移除愿望单&取关游戏",onclick:function(){atw_fg(0)},html:"移除愿望单&取关"});

        let gameArray=[];
        let gameLength=0;
        let gameId=location.href.match(/[\d]+/gim)[0];
        function atw_fg(a=1){
            gameLength=0;
            $jq("#exInfo").show();
            let p=info("","",`正在获取游戏列表...`);
            //$log(gameId);
            if(empty(getCookie("game"+gameId))){
                $jq("a").map(function(i,e){
                    if(/Wishlist the game|(press|click) \"Follow\" button|Add the game to your wishlist/gim.test($jq(e).text())){
                        w_f(e,a);
                        gameLength++;
                    }
                });
                if(a==1){
                    var getGame=setInterval(function(){
                        //$log(gameArray);
                        //$log(gameLength);
                        if(gameArray.length>=gameLength){
                            let game=unique(gameArray).join("h");
                            document.cookie="game"+gameId+"="+game+"; path=/";
                            clearInterval(getGame);
                        }
                    },1000);
                }
            }else{
                //$log(unique(getCookie("game"+gameId).split("h")));
                unique(getCookie("game"+gameId).split("h")).map(function(i){
                    w_f({href:"https://store.steampowered.com/app/"+i},a);
                });
            }
            addR(p,"OK","success");
        }
        function w_f(e,a){
            let p=info("","",`正在获取游戏Id...`);
            httpSend({
                mode:"gm",
                url:e.href,
                type:"get",
                callback:function(data){
                    let appId=data.finalUrl.match(/[\d]+/)[0];
                    //$log(appId);
                    gameArray.push(appId);
                    if(data.text.indexOf('<a class="menuitem" href="https://store.steampowered.com/login/?')<0){
                        let html=data.text.match(/var g\_sessionID \= \".*?\"\;/gim);
                        if(html.length>0){
                            addR(p,"OK","success");
                            let sessionID=html[0].match(/\".*?\"/gim)[0].replace(/\"/g,"");
                            a==1?wishlist(appId,sessionID,"addtowishlist"):wishlist(appId,sessionID,"removefromwishlist");
                            a==1?followGame(appId,sessionID,0):followGame(appId,sessionID,1);
                        }else{
                            addR(p,"sessionID获取失败！","err");
                        }
                    }else{
                        addR(p,`<a href="https://store.steampowered.com/login/" style="color:red" target="_blank">请先登录steam！</a>`,"html");
                    }
                }
            });
        }
        function wishlist(appId,sessionID,act){
            let p=info("","",`正在${act=="addtowishlist"?"添加":"移除"}愿望单<a href="https://store.steampowered.com/app/${appId}" target="_blank">${appId}</a>...`);
            httpSend({
                mode:"gm",
                url:"https://store.steampowered.com/api/"+act,
                type:"post",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data:`sessionid=${sessionID}&appid=${appId}`,
                callback:function(data){
                    if(!empty(data.text)&&(data.json.success==true)){
                        addR(p,"OK","success");
                    }else{
                        httpSend({
                            mode:"gm",
                            url:"https://store.steampowered.com/app/"+appId,
                            type:"get",
                            callback:function(data){
                                if(/已在库中/.test(data.text)){
                                    addR(p,"OK","success");
                                }else if(/添加至您的愿望单/.test(data.text)){
                                    act=="addtowishlist"?addR(p,"ERROR","err"):addR(p,"OK","success");
                                }else{
                                    act=="addtowishlist"?addR(p,"OK","success"):addR(p,"ERROR","err");
                                }
                            }
                        });
                    }
                }
            });
        }
        function followGame(appId,sessionID,act){
            let p=info("","",`正在${act==0?"关注":"取关"}游戏<a href="https://store.steampowered.com/app/${appId}" target="_blank">${appId}</a>...`);
            httpSend({
                mode:"gm",
                url:"https://store.steampowered.com/explore/followgame/",
                type:"post",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data:`sessionid=${sessionID}&appid=${appId}&unfollow=${act}`,
                callback:function(data){
                    if(!empty(data.text)&&(data.text=="true")){
                        addR(p,"OK","success");
                    }else{
                        httpSend({
                            mode:"gm",
                            url:"https://store.steampowered.com/app/"+appId,
                            type:"get",
                            callback:function(data){
                                if(data.text.indexOf(`class="btnv6_blue_hoverfade btn_medium queue_btn_active" style="">`)>-1){
                                    act==0?addR(p,"OK","success"):addR(p,"ERROR","err");
                                }else{
                                    act==0?addR(p,"ERROR","err"):addR(p,"OK","success");
                                }
                            }
                        });
                    }
                }
            });
        }

        //giveaway.su按钮定义
        $id("doTask").onclick=function(){
            $id("exInfo").style.display="block";
            info("","color:yellow;background-color:black",`只会自动做加steam组和关注鉴赏家任务(需要<a href="https://greasyfork.org/zh-CN/scripts/34764-giveaway-helper" target="_blank">Giveaway Helper脚本</a>,没有则自动跳过此步骤),其他任务需手动完成！`);
            if($jq("a.pull-right").length>0&&$jq("a.pull-right").parent().parent()[0].className!="hidden"){
                $jq("a.pull-right")[0].click();
                return false;
            }
            $jq('tr[data-action-id="adjs"]').remove();
            !empty($jq('a[data-type="link"]'),1)&&(httpSend({url:$jq('a[data-type="link"]:first').attr("href"),type:'get'}));
            $jq('a[data-type="link"]').attr("href","javascript:void(0)");
            $jq('a[data-type="link"]').find("i").click();
            $jq("a.btn-success").removeClass("disabled");
            $jq('button>span:contains("Join ")').click();
            $jq('button>span:contains("Follow ")').click();
            doTask(()=>{giveaway_su_verify($jq("i.glyphicon-refresh"),0)},new Date().getTime(),($jq('button>span:contains("Join ")').length+$jq('button>span:contains("Follow ")').length)*3);
        };
        $id("Verify").onclick=function(){
            $id("exInfo").style.display="block";
            info("","color:yellow;background-color:black",`只会自动做加steam组和关注鉴赏家任务(需要<a href="https://greasyfork.org/zh-CN/scripts/34764-giveaway-helper" target="_blank">Giveaway Helper脚本</a>,没有则自动跳过此步骤),其他任务需手动完成！`);
            if($jq("a.pull-right").length>0&&$jq("a.pull-right").parent().parent()[0].className!="hidden"){
                $jq("a.pull-right")[0].click();
                return false;
            }
            $jq('tr[data-action-id="adjs"]').remove();
            !empty($jq('a[data-type="link"]'),1)&&(httpSend({url:$jq('a[data-type="link"]:first').attr("href"),type:'get'}));
            $jq('a[data-type="link"]').attr("href","javascript:void(0)");
            $jq('a[data-type="link"]').find("i").click();
            $jq("a.btn-success").removeClass("disabled");
            $jq('button>span:contains("Join ")').click();
            $jq('button>span:contains("Follow ")').click();
            doTask(()=>{giveaway_su_verify($jq("i.glyphicon-refresh"),0,0)},new Date().getTime(),($jq('button>span:contains("Join ")').length+$jq('button>span:contains("Follow ")').length)*3);
        };

        //giveaway.su验证任务
        function giveaway_su_verify(vBtn,i,interval=1){
            if(vBtn.length==0){
                $jq('a.btn-success:contains("Grab key")')[0].click();
            }else{
                if(!vBtn.eq(i).hasClass('glyphicon-ok')&&!vBtn.eq(i).hasClass('spin')&&!vBtn.eq(i).parent().hasClass('btn-success')){
                    vBtn.eq(i).parent().click();
                }
                i++;
                if(interval==1){
                    setTimeout(function(){i<vBtn.length?giveaway_su_verify(vBtn,i):giveaway_su_verify($jq("i.glyphicon-refresh"),0)},2000);
                }else{
                    setTimeout(function(){i<vBtn.length?giveaway_su_verify(vBtn,i,0):info('','','验证完成！')},2000);
                }
            }
        }
    }


    if(/gleam/.test(url)){//gleam领key

        btn_class("btn btn-primary")

        //gleam按钮定义
        $id("doTask").onclick=function(){
            $jq("#exInfo").show();
            $jq('button>span:contains("Join ")').click();
            $jq('button>span:contains("Follow ")').click();
            doTask(()=>{gleam_do_task($jq("a.enter-link"),0)},new Date().getTime(),($jq('button>span:contains("Join ")').length+$jq('button>span:contains("Follow ")').length)*3);
        };
        $id("Verify").onclick=function(){
            $jq("#exInfo").show();
            gleam_do_task($jq("a.enter-link"),0);
        };

        //gleam做任务+验证任务
        function gleam_do_task(a,i,t=0){
            if(i<a.length){
                if((!/check/gim.test($jq("a.enter-link").eq(i).children(".tally").find("i.fa")[0].className)&&(!(t==0&&/on twitter/gim.test($jq("a.enter-link").eq(i).text()))))){
                    a[i].click();
                    setTimeout(function(){
                        if(!/default/.test(a[i].className)){
                            let btn=a.eq(i).next().find(".btn-primary");
                            let link=a.eq(i).next().find("a.btn-info.btn-embossed");
                            let href=link.attr("href");
                            link.attr("href","javascript:void(0)");
                            link[0]!=undefined&&(link[0].click());
                            link.attr("href",href);
                            if(/[\d]/i.test(btn.text())){
                                gleam_time(a,btn.text(),i,btn);
                            }else{
                                btn[0].click();
                                i++;
                                gleam_do_task(a,i,t);
                            }
                        }else{
                            i++;
                            gleam_do_task(a,i,t);
                        }
                    },1000);
                }else{
                    i++;
                    gleam_do_task(a,i,t);
                }
            }else{
                t==0?gleam_do_task($jq("a.enter-link"),0,1):info("","","任务验证完成，若有未完成任务请手动完成！");
            }
        }

        //gleam做有时间限制任务
        function gleam_time(a,t,i,b){
            let time=t.match(/\-?[\d]+/gim)[0];
            if(time>0){
                $open("https://www.hclonely.cn/time.html?time="+time,false);
                let hidden=setInterval(function(){
                    if(!document.hidden){
                        clearInterval(hidden);
                        setTimeout(function(){
                            b[0].click();
                            i++;
                            gleam_do_task(a,i);
                        },1000);
                    }
                },1000);
            }else{
                b[0].click();
                i++;
                gleam_do_task(a,i);
            }
        }
    }

    if(/gamehunt/.test(url)){//gamehunt领key

        $jq(".card-title").text()=="0"&&(confirm("此页面已经没有key了，是否关闭？")&&(window.close()));

        $jq("a.nav-link.btn-outline-secondary").length>0&&(location.href="/auth/vkontakte");

        btn_class("btn btn-outline-secondary btn-sm");

        //gamehunt按钮定义
        $id("doTask").onclick=function(){
            gamehunt(1);
        };
        $id("Verify").onclick=function(){
            gamehunt(0);
        };
        function gamehunt(o,i=0){
            $jq("#exInfo").show();
            info("","color:yellow;background-color:black",'只会自动做"Go to"任务(可能需要多次点击才能完成所有此任务)，其他任务请手动完成！');
            autoOpen&&o&&(info("","color:yellow;background-color:black",'请关闭弹窗拦截，否则不会自动打开任务页面！'));

            $jq.ajax({
                url: '/end/distribution',
                type: 'POST',
                data: {id: location.href.match(/[\d]+/gim)[0]},
                timeout:6000,
                success: function(data){
                    switch(data.err) {

                        case '0':
                            info("","color:green","Steam Key:"+data.res);
                            for (let i = 0; i < ids.length; i++) {
                                document.getElementById(ids[i]).className='btn btn-success btn-lg btn-block';
                            }
                            for (let i = 0; i < data.res.length; i++) {
                                document.getElementById(data.res[i]).className='btn btn-danger btn-lg btn-block';
                            }
                            break;

                        case '01':
                        case 'err01':
                            info("","color:red","你已经获取过key了！请<a id='lookKey' href='javascript:void(0)'>点此查看</a>或前往<a href='https://gamehunt.net/profile' target='_blank'>profile页面</a>点击\"Hand history\"查看");
                            $id('lookKey').onclick=()=>{
                                info("","color:green",'正在查找，请稍候...');
                                httpSend({
                                    url:'//gamehunt.net/history_game_distribution',
                                    type:'get',
                                    callback:(data)=>{
                                        if((!empty(data.json))&&(!empty(data.json.results))){
                                            let key=0;
                                            data.json.results.map((e)=>{
                                                if(e.id==location.href.match(/[\d]+/gim)[0]){
                                                    info("","color:green","Steam Key:"+e.key);
                                                    key=1;
                                                }
                                            });
                                            key==0&&(info("","color:red","没有找到当前游戏key！请前往<a href='https://gamehunt.net/profile' target='_blank'>profile页面</a>点击\"Hand history\"查看"));
                                        }else{
                                            info("","color:red","没有找到当前游戏key！请前往<a href='https://gamehunt.net/profile' target='_blank'>profile页面</a>点击\"Hand history\"查看");
                                        }
                                    }
                                });
                            }
                            break;

                        case '02':
                            info("","已经没有key了！");
                            break;

                        case 'err':
                            for (let i = 0; i < ids.length; i++) {
                                document.getElementById(ids[i]).className='btn btn-success btn-lg btn-block';
                            }
                            data.res.map(e=>{
                                document.getElementById(e).className='btn btn-danger btn-lg btn-block';

                                /Go to/gim.test($jq("#"+e).text())&&(visitLink(e));
                                /Like video/gim.test($jq("#"+e).text())&&(visitLink(e,0));
                                if(autoOpen&&o){
                                    if(!/Go to|Like video/gim.test($jq("#"+e).text())){
                                        $open('https://gamehunt.net'+$jq("#"+e).attr("href"),false);
                                    }
                                }
                            });
                            info("","color:yellow;background-color:black","如果某个任务已完成但一直显示未完成。 \n</br>您可以检查帐户隐私设置:<a href=\"https://www.youtube.com/account_privacy\"> Youtube </a> \n</br>还可以关联youtube账户:<a href=\"/auth/youtube\">检查</a> \n</br>检查steam设置:<a href=\"https://steamcommunity.com/id/me/edit/settings/\"> Steam </a> ");
                            break;

                        case '05':
                            info("","color:red","本网站禁止使用多个账户！");
                            break;

                        default:
                            info("","color:red",data.err);
                            break;
                    }
                    info("","color:green",'END!');
                },
                error: function (err) {
                    if(i==0){
                        setTimeout(()=>{
                            gamehunt(o,1);
                        },500);
                    }else{
                        info("","color:red",err.responseText);
                        info("","color:green",'END!');
                    }
                }
            });

        }
        function visitLink(e,v=1){
            let p=info("","",`正在做${v==1?"Go to":"Like video"}任务<a href="${$jq("#"+e).attr("href")}" target="_blank">${e}</a>...`);
            try{
                httpSend({
                    mode:"gm",
                    type:"get",
                    url:'https://gamehunt.net'+$jq("#"+e).attr("href"),
                    callback:function(data){
                    }
                });
            }catch(err){
            }finally{
                $jq("#"+e).css("background-color","#17a2b8");
                addR(p,"ok","success");
            }
        }
    }

    if(/orlygift/.test(url)){//orlygift

        /login/gim.test($jq(".navbar-right").text())&&(location.href="https://www.orlygift.com/steam_connect");

        btn_class("btn btn-block btn-info");

        //防止广告弹窗
        let expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 7);
        document.cookie='bounceback-visited-user=1;expires='+expireDate+'path=/';

        //orlygift按钮定义
        $id("doTask").onclick=function(){
            $jq("#exInfo").show();
            info("","color:yellow;background-color:black","安装app和邀请好友任务不会自动完成！");
            let ogTaskId=og_get_id();
            og_do_task(ogTaskId,0);
        }
        $id("Verify").onclick=function(){
            $jq("#exInfo").show();
            let ogTaskId=og_get_id();
            og_verify(ogTaskId,0);
        }

        //orlygift获取任务id
        function og_get_id(){
            let ogTaskBtn=$jq("button.btn-block.btn-info[id]").not(".ng-hide").not(".auto-task");
            let ogTaskId=[];
            ogTaskBtn.map(function(i,e){!/(install.*?app)|(Invite your friends)/gim.test($jq(e).parent().parent().text())&&(ogTaskId.push($jq(e).attr("id").replace("task-","")))});
            return ogTaskId;
        }

        //orlygift做任务
        function og_do_task(ogTaskId,i){
            if(i<ogTaskId.length){
                let p=info("","",`正在做任务${ogTaskId[i]}...`);
                ga("send", "pageview", "/task/open/" + ogTaskId[i]);
                let ogTaskType=$jq("#task-"+ogTaskId[i]).parent().parent().parent().attr("class").replace("item ","");
                let handleApiCall = function(url) {httpSend({mode:"gm",type:"get",url:url})};
                switch (ogTaskType) {
                    case "steam_curator":
                    case "steam_group":
                    case "invite":
                    case "link":
                    case "ad2games":
                    case "offertoro":
                    case "greenlight":
                    case "youtube":
                    case "steam_group_invite":
                    case "orlygift_mobile_app":
                    case "orlydealz":
                    case "orlyaccess":
                    case "newsletter":
                        handleApiCall(window.location.origin + "/api/task/open/" + ogTaskId[i]);
                        break;
                }
                setTimeout(function(){
                    addR(p,"finished","other");
                    i++;
                    og_do_task(ogTaskId,i);
                },Math.floor(Math.random() * 1000));
            }else{
                og_verify(ogTaskId,0);
            }
        }

        //orlygift验证任务
        function og_verify(ogTaskId,i){
            if(i<ogTaskId.length){
                let p=info("","",`正在验证任务${$jq("#task-"+ogTaskId[i]).parent().parent().find("h4[ng-show]").text()}...`);
                ga("send", "pageview", "/task/check/" + ogTaskId[i]);
                setTimeout(function(){
                    httpSend({
                        url:"/api/task/check/" + ogTaskId[i],
                        type:"post",
                        callback:function(data){
                            if(data.json.result=="success"){
                                addR(p,"success");
                            }else if(data.json.result=="pending"){
                                addR(p,data.json.message,"info");
                            }else{
                                addR(p,"error","err");
                            }
                            i++;
                            setTimeout(function(){og_verify(ogTaskId,i)},Math.floor(Math.random() * 1000));
                        }
                    })
                },Math.floor(Math.random() * 1000));
            }else{
                location.reload(true);
            }
        }
    }

    if(/indiedb/.test(url)){//indiedb领key

        empty($jq(".session").find('a:contains("Sign Out")'),1)&&(location.href="/members/register");

        //indiedb按钮定义
        $id("doTask").onclick=function(){
            $jq("#exInfo").show();
            indiedb_join();
        };
        $id("Verify").onclick=function(){
            $jq("#exInfo").show();
            indiedb_do_task();
        };

        //indiedb加入赠key
        function indiedb_join(){
            if(/join giveaway/gim.test($jq("a.buttonenter.buttongiveaway").text())){
                let p=info("","","正在加入赠key...");
                httpSend({type:"post",url:$jq("a.buttonenter.buttongiveaway").attr("href"),data:{ajax: 't'},callback:function(data){if(data.status==200&&data.json.success==true){
                    addR(p,"ok");
                    indiedb_do_task();
                }else{
                    addR(p,"失败！请手动加入赠key!","err");
                }}});
                $(".buttongiveaway").saveUpdate("auth", enterGiveaway);
                $jq(".buttongiveaway").addClass("buttonentered").text("Success - Giveaway joined");
            }else if(/success/gim.test($jq("a.buttonenter.buttongiveaway").text())){
                indiedb_do_task();
            }else{
                info("","color:red","请检查是否已加入次赠key!");
            }
        }

        //indiedb做任务
        function indiedb_do_task(){
            $jq("#giveawaysjoined").show();
            let id=$jq("script").map(function(i,e){
                if(/\$\(document\)/gim.test(e.innerHTML)){
                    let optionId=e.innerHTML.match(/\"\/newsletter\/ajax\/subscribeprofile\/optin\/[\d]+\"/gim)[0].match(/[\d]+/)[0];
                    let taskId=e.innerHTML.match(/\"\/[\d]+\"/gim)[0].match(/[\d]+/)[0];
                    return [taskId,optionId];
                }
            });
            if(id.length==2){
                $jq("#giveawaysjoined>div>p").find("a").map(function(i,e){
                    let promo=$jq(e);
                    if(!promo.hasClass("buttonentered")){
                        let p=info("","",`正在做任务:${$jq(e).parents("p").text()}...`);
                        if(/facebookpromo|twitterpromo|visitpromo/gim.test(e.className)){
                            $jq.ajax({
                                type: "POST", url: urlPath("/giveaways/ajax/"+(promo.hasClass("facebookpromo") ? "facebookpromo" : (promo.hasClass("twitterpromo") ? "twitterpromo" : "visitpromo"))+"/"+id[0]), timeout: 60000, dataType: "json",
                                data: {ajax: "t"},
                                error: function(response, error, exception) {
                                    addR(p,"An error has occurred performing the action requested. Please try again shortly.","err");
                                },
                                success: function(response) {
                                    if(response["success"]) {
                                        addR(p,response["text"]);
                                        promo.addClass("buttonentered").closest("p").html(promo.closest("p").find("span").html());
                                    } else {
                                        addR(p,response["text"],"err");
                                    }
                                }
                            });
                        }else if(promo.hasClass("emailoptinpromo")){
                            $jq.ajax({
                                type: "POST", url: urlPath("/newsletter/ajax/subscribeprofile/optin/"+id[1]), timeout: 60000, dataType: "json",
                                data: {ajax: "t",emailsystoggle: 4},
                                error: function(response, error, exception) {
                                    addR(p,"An error has occurred performing the action requested. Please try again shortly.","err");
                                },
                                success: function(response) {
                                    if(response["success"]) {
                                        addR(p,response["text"]);
                                        promo.toggleClass("buttonentered").closest("p").html(promo.closest("p").find("span").html());
                                    } else {
                                        addR(p,response["text"],"err");
                                    }
                                }
                            });
                        }else if(promo.hasClass("watchingpromo")){
                            let data=getUrlQuery($jq(e).attr("href"));
                            data.ajax="t";
                            $jq.ajax({
                                type: "POST", url: urlPath($jq(e).attr("href").replace(/\?.*/,"")), timeout: 60000, dataType: "json",
                                data: data,
                                error: function(response, error, exception) {
                                    addR(p,"An error has occurred performing the action requested. Please try again shortly.","err");
                                },
                                success: function(response) {
                                    if(response["success"]) {
                                        addR(p,response["text"]);
                                        promo.toggleClass("buttonentered").closest("p").html(promo.closest("p").find("span").html());
                                        $(e).saveUpdate("watch", giveawayWatch);
                                        $jq(e).addClass("buttonentered");
                                    } else {
                                        addR(p,response["text"],"err");
                                    }
                                }
                            });
                        }else if(!/the-challenge-of-adblock/gim.test($jq(e).attr("href"))){//watchingpromo
                            $jq.ajax({
                                type: "POST", url: urlPath($jq(e).attr("href")), timeout: 60000, dataType: "json",
                                data: {ajax: "t"},
                                error: function(response, error, exception) {
                                    addR(p,"An error has occurred performing the action requested. Please try again shortly.","err");
                                },
                                success: function(response) {
                                    if(response["success"]) {
                                        addR(p,response["text"]);
                                        promo.toggleClass("buttonentered").closest("p").html(promo.closest("p").find("span").html());
                                    } else {
                                        addR(p,response["text"],"err");
                                    }
                                }
                            });
                        }else{
                            addR(p,"此任务为花钱订阅任务，脚本自动跳过！","info");
                        }
                    }else{
                        info("","",`正在做任务:${$jq(e).parents("p").text()}...<font style="color:green">ok</font>`);
                    }
                });
                info("","color:yellow;background-color:black","所有任务验证完成,没有完成的任务请手动完成!");
            }else{
                info("","color:red","获取id失败,请重试！")
            }
        }
    }

    if(/spoune/.test(url)){//spoune领key

        //$("#loginRightTop").length>0&&(window.open("https://www.spoune.com/login.php","_self"));

        //$("#keysAvailable").text()==0&&(confirm("此页面已经没有key了，是否关闭？")&&(window.close()));
        btn_class("ui big inverted download button");

        $id("doTask").onclick=function(){
            $jq("#exInfo").show();
            spoune_get_task();
        };
        $id("Verify").onclick=function(){
            $jq("#exInfo").show();
            spoune_get_task();
        };

        //spoune获取任务信息
        function spoune_get_task(){
            if($jq("#GiveawayTasks>button.grey").length!=parseInt($jq("#submain3").text())-parseInt($jq("#submain1").text())){
                objFrame.objCurrentScriptObject.loadTaskOverview('GiveawayTasks');
                let getButton=setInterval(function(){
                    if($jq("#GiveawayTasks>button.grey").length==parseInt($jq("#submain3").text())-parseInt($jq("#submain1").text())){
                        clearInterval(getButton);
                        show_task($jq("#GiveawayTasks>button.grey"),0);
                    }
                },1000);
            }else{
                show_task($jq("#GiveawayTasks>button.grey"),0);
            }
        }

        //spoune显示任务详情
        function show_task(e,i){
            if(i<e.length){
                eval($jq(e).eq(i).attr("onclick"));
                let getIframe=setInterval(function(){
                    if($jq("iframe").contents().find("#link").length>0){
                        clearInterval(getIframe);
                        spoune_verify(e,i);
                    }
                },1000);
            }else{
                info("","color:yellow;background-color:black","所有任务验证完成,没有完成的任务请手动完成!");
                objFrame.objCurrentScriptObject.loadTaskOverview('GiveawayTasks');
                $jq("#GiveawayBackButton")[0].style.visibility="hidden";
            }
        }

        //spoune验证任务
        function spoune_verify(t,i,e=0){
            let p=info("","","正在验证任务:"+$jq(t).eq(i).text()+"...");
            httpSend({
                type:"get",
                url:$jq("iframe").contents().find("#link").attr("href").replace("./","./werbung/"),
                callback:function(data){
                    if(data.status==200){
                        if(/Task completed/gim.test(data.text)){
                            addR(p,"ok");
                            e=1;
                        }else{
                            $jq("iframe").contents().find("html").html(data.text);
                            e==0?setTimeout(function(){
                                $jq(p).remove();
                                spoune_verify(t,i,1);
                            },1500):addR(p,"error","err");
                        }
                    }else{
                        e==0?setTimeout(function(){
                            $jq(p).remove();
                            spoune_verify(t,i,1);
                        },1500):addR(p,`error:${data.status}`,"err");
                    }
                    e==1&&(show_task(t,++i));
                }
            });
        }
    }

    if(/prys.ga/.test(url)){//prys.ga领key

        btn_class("btn-success");

        //prys.ga按钮定义
        $id("doTask").onclick=function(){
            prys_ga();
        };
        $id("Verify").onclick=prys_ga;

        function prys_ga(){
            let gameId=location.href.match(/[\d]+/)[0];
            if($jq('#steps tr[id]').length>0){
                for(let i=0;i<$jq('#steps tr[id]').length;i++){
                    if($jq('#step'+i).children('td:last').find('a').length==0&&$jq('#step'+i).children('td:last').text().includes('Check')){
                        checkClick(i);
                    }
                }
                for(let i=0;i<$jq('#steps tr[id]').length;i++){
                    if($jq('#check'+i).length>0&&($jq('#check'+i).text().includes('Check'))){
                        $checkStep(i);
                        break;
                    }
                }
            }
        }

        function $checkStep(step,captcha){
            if(!captcha)captcha=null;
            if(step!=="captcha")$("#check"+step).replaceWith('<span id="check'+step+'"><i class="fa fa-refresh fa-spin fa-fw"></i> Checking...</span>');
            $jq.post("/api/check_step",{
                step:step,
                id:getURLParameter("id"),
                "g-recaptcha-response":captcha
            },function(json){
                if(json.success&&step!=="captcha"){
                    $("#check"+step).replaceWith('<span class="text-success" id="check'+step+'"><i class="fa fa-check"></i> Success</span>');
                    showAlert("success",'Check passed successfully! Thank you for completing this step. <i class="fa fa-smile-o"></i>');
                }else if(step!=="captcha"){
                    $("#check"+step).replaceWith('<a id="check'+step+'" href="javascript:checkStep('+step+')"><i class="fa fa-question"></i> Check</a>');
                    var msg="Please complete the step and then check again.";
                    showAlert("warning",(json.response?json.response.error?json.response.error:msg:msg));
                }
                if(json.response){
                    if(json.response.captcha&&json.success){
                        showAlert("info",json.response.captcha);
                        captchaCheck();
                    }else if(json.response.captcha){
                        showAlert("warning",json.response.captcha);
                        captchaCheck();
                    }
                    if(json.response.prize){
                        showAlert("success",'Here is your prize:<h1 role="button" align="middle" style="word-wrap: break-word;">'+json.response.prize+'</h2>');
                    }
                }else{
                    setTimeout(()=>{
                        step++;
                        $checkStep(step);
                    },500);
                }
            }).fail(function(){
                $("#check"+step).replaceWith('<a id="check'+step+'" href="javascript:checkStep('+step+')"><i class="fa fa-question"></i> Check</a>');
                showAlert("danger","Failed to check this step. Please try again later. Spamming it may make it worse.");
            });
        }
    }

    //if(/chubbykeys/.test(url)){//chubbykeys领key
    /*
        if($("button.btn-lg.hvr-grow-rotate").length>0){
            location.href="?login";
           }

        btn_class("btn btn-outline-primary");

        //chubbykeys按钮定义
        $id("doTask").onclick=function(){
                $id("exInfo").style.display="block";
            $('button>span:contains("Join ")').click();
            $('button>span:contains("Follow ")').click();
            doTask(function(){
            },new Date().getTime(),($('button>span:contains("Join ")').length+$('button>span:contains("Follow ")').length)*3);
        };
        $id("Verify").onclick=function(){
        };
    }
    */

    var settingDiv=$ele({ele:"div",parent:div,class:"setting",style:"display:none",html:`<h4 align="center">全局设置</h4><p><input id="allAutoOpen" type="checkbox" ${autoOpen?"checked":""} />自动打开任务页面</p><button id="settingSave" style="width:48px;margin:0 33%">保存</button>`});
    $id("settingSave").onclick=function(){
        let setting=GM_getValue("setting");
        setting['autoOpen']=$id("allAutoOpen").checked;
        autoOpen=setting['autoOpen'];
        GM_setValue("setting",setting);
        $jq("#exInfo").show();
        info("","color:green","保存成功！");
    };
    function settingFuc(){
        autoOpen=GM_getValue("setting")['autoOpen'];
        $jq(settingDiv).toggle();
    }

    //做加组、关注等任务
    function doTask(callback,time,limitTime){
        $jq('button>span:contains("Join ")').length+$jq('button>span:contains("Follow ")').length==0||new Date().getTime()-time>limitTime*1000?callback():setTimeout(function(){doTask(callback,time,limitTime)},300);
    }

    //做退组、取关等任务
    $id("Remove").onclick=function(){
        $jq("#exInfo").show();
        info("","",`正在退组、取关，请稍候！`);
        $jq('button>span:contains("Leave ")').click();
        $jq('button>span:contains("Unfollow ")').click();
    };

    //显示信息
    function info(cText,sText,iText){
        let p=$ele({ele:"p","class":cText,"style":sText,html:iText,parent:div2});
        p.scrollIntoView();
        return p;
    }

    //任务执行结果
    function addR(p,t,r="success"){
        switch(r){
            case "success":
                p.innerHTML+=`<font style='color:green'>${t}</font>`;
                break;
            case "info":
                p.innerHTML+=`<font style='color:yellow;background-color:black'>${t}</font>`;
                break;
            case "err":
                p.innerHTML+=`<font style='color:red'>${t}</font>`;
                break;
            default:
                p.innerHTML+=t;
                break;
        }
    }

    //button样式
    function btn_class(e){
        $jq(".auto-task").attr("class",e+" auto-task");
    }

    //防止弹出新窗口
    function banNewBlock(){
        let d=new Date();
        let cookiename = "haveVisited1";
        //document.cookie = "haveVisited=1; path=/";
        //document.cookie = "lastVisit=" + (d.getUTCMonth()+1) +"/"+ d.getUTCDate() + "/" + d.getUTCFullYear() + "; path=/";
        document.cookie = cookiename + "=1; path=/";
        document.cookie = cookiename + "=" + (d.getUTCMonth()+1) + "/" + d.getUTCDate() + "/" + d.getUTCFullYear() + "; path=/";
    }

    function showUpdate(){
        let setting=GM_getValue("setting");
        let updateText=setting.updateText;
        if(updateText){
            $jq("#exInfo").show();
            info('','color:red;font-weight:900',"v"+setting.version+"更新内容：</br>"+updateText.replace(/ \/n/g,"</br>")+" </br>此消息只显示一次！");
            setting['updateText']='';
            GM_setValue("setting",setting);
        }
    }

}catch(e){
    $err("自动任务脚本出错: \n"+e.stack);
    confirm("自动任务脚本出错! \n点击确定复制错误信息,或打开控制台查看错误信息！")&&($copy(e.stack));
}
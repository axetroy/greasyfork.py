// ==UserScript==
// @name		SteamCN Mini Market
// @namespace	out
// @version		2.8.5
// @description	Add various features to SteamCN focus on Trading Cards and Badges
// @match      	*://steamcn.com/t*
// @match       *://steamcn.com/forum.php?mod=viewthread*
// @run-at		document-idle
// @grant       GM_addStyle
// @grant       GM_setValue
// @grant       GM_getValue
// @grant 		GM_xmlhttpRequest
// @require     https://cdn.bootcss.com/jquery/2.2.4/jquery.min.js
// @connect     steamcommunity.com
// @connect     www.steamcardexchange.net
// @connect     steamdb.steamcn.com
// @icon      	https://store.steampowered.com/favicon.ico
// @copyright	out
// ==/UserScript==

(function()
{
    $(document).ready(function(){

        if(($(".subforum_left_title_left_up a").length==4)&&($(".subforum_left_title_left_up a:last").attr("href").indexOf("271")!=-1)&&(($("div.pg:first strong").text()=="1")||!$("div.pg").length)){
            var own = [];
            var wish = [];
            var sub = [];
            var task = [];
            var hash_tb = [];
            var I64BIT_TABLE ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-'.split('');
            var Exclude = false;
            (function(){
                GM_addStyle(".switch-container{height:15px;width:30px;} .switch {display: none;} "
                            +".swi {display:block;background-color:#c71313;height:100%;width: 100%;cursor:pointer;border-radius: 25px;}"
                            +".swi:before {content: '';display: block;border-radius: 25px;height: 100%;width: 15px;background-color: white;opacity: 1;box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.08);-webkit-transition: all 0.2s ease;}"
                            +".swi:after {position: relative;top: -15px;left: 15px;content: '';display: block;border-radius: 25px;height: 100%;width: 15px;background-color: white;opacity: 0;box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.08);-webkit-transition: all 0.2s ease;}"
                            +"#switch:checked~label:after {opacity: 1;} #switch:checked~label:before {opacity: 0;} #switch:checked~label {background-color: green;}"
                           );
                GM_addStyle("#plu{width:986px;min-height:40px;font-size:13px;} #plu > span{font-size:10px;color:red;}"
                            +".mini{width:986px;display:none;border-radius:2px;background:linear-gradient(to bottom, #4c4c4c 5%, #4a6279 95%);border:1px solid #4582A5;} "
                            +".query{width:400px;font-size:13px;border-radius:4px;display:inline-block;background:-webkit-linear-gradient(top, #484846 5%, #272626 95%);border:1px solid #4D4D4D;box-shadow:0px 0px 5px 2px black inset;padding:6px  0px 0px 6px;margin:9px 5px 5px 5px;box-sizing:border-box;} "
                            +".tag_filter_category {color:#D2D2D2;;margin:0px 5px 6px 0px;vertical-align:top;display:inline-block;} "
                            +".tag_filter_category > select {border:1px solid #000;background-color: #5a5a5a;box-shadow: 1px 1px 2px #3a3a3a inset;color: #BFBFBF;} "
                            +"#btn_query{vertical-align:top;color: #D2E885 !important;border-radius: 2px;border: none;padding: 1px;display: inline-block;cursor: pointer;text-decoration: none !important;background: linear-gradient( to bottom, #a4d007 5%, #536904 95%);}"
                            +"#btn_query > span{text-align:center;padding: 0 9px;font-size: 15px;line-height: 22px;width:45px;border-radius: 2px;display: block;background: linear-gradient( to bottom, #799905 5%, #536904 95%);}"
                            +"#sort{position:relative;display:inline-block}"
                      //      +"#sort > div:nth-child(2){top:24px;}"
                       //     +"#sort > div:nth-child(3){top:48px;}"
                            +"#btn_sort {vertical-align:top;color: #D2E885 !important;border-radius: 2px;border: none;padding: 1px;display: inline-block;cursor: pointer;text-decoration: none !important;background: linear-gradient( to bottom, #a4d007 5%, #536904 95%);}"
                            +"#btn_sort  span{text-align:center;padding: 0 9px;font-size: 15px;line-height: 22px;width:45px;border-radius: 2px;display: block;background: linear-gradient( to bottom, #799905 5%, #536904 95%);}"
                            +".sort_order span {text-align:center;padding: 0 9px;font-size: 15px;line-height: 22px;width:45px;border-radius: 2px;display: block;background: linear-gradient( to bottom, #799905 5%, #536904 95%);}"
                            +".sort_order{left:0px;position:absolute;vertical-align:top;color: #D2E885 !important;border-radius: 2px;border: none;padding: 1px;display: none;cursor: pointer;text-decoration: none !important;background: linear-gradient( to bottom, #a4d007 5%, #536904 95%);}"
                            +".sta{vertical-align:top;height:70px;font-size:13px;border-radius:4px;display:inline-block;background:-webkit-linear-gradient(top, #484846 5%, #272626 95%);border:1px solid #4D4D4D;box-shadow:0px 0px 5px 2px black inset;padding:6px  0px 0px 6px;margin:9px 5px 5px 5px;box-sizing:border-box;}"
                            +".sta > div:nth-child(1) > div{display:inline-block;background-color:#5a5a5a;color:#BFBFBF;border:1px solid #000;padding:2px 2px 2px 4px;margin:0px 4px 6px 0px;width:70px;vertical-align:top;font-size:13px;}"
                            +".cown{background-color:#5C8A00;} .cwish{background-color:#007399;}"
                            +".sta >div:nth-child(1){width:249px;display:inline-block;}"
                            +".sta >div:nth-child(1)> div > span{margin-left:5px;text-align:center;width:34px;display:inline-block;}"
                            +"#btn_exclude{margin-top:1px;margin-right:7px;vertical-align:top;color: #D2E885 !important;border-radius: 2px;border: none;padding: 1px;display: inline-block;cursor: pointer;text-decoration: none !important;background: linear-gradient( to bottom, #a4d007 5%, #536904 95%);}"
                            +"#btn_exclude > span{width:30px;padding: 0 6px;font-size: 15px;line-height: 26px;border-radius: 2px;display: block;background: linear-gradient( to bottom, #799905 5%, #536904 95%);}"
                            +".list{width:976px;border-radius:4px;margin:0px 5px 0px 5px;overflow:hidden;padding:0px 0px 4px 0px} "
                            +"#listul{list-style:none;width:976px;overflow-x:auto;white-space:nowrap;}"
                            +"#listul::-webkit-scrollbar{ width: 16px;height: 14px; border-radius:10px;background-color:rgba(0, 0, 0, 0.2);}"
                            +"#listul::-webkit-scrollbar-track{-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);border-radius: 10px;}"
                            +"#listul::-webkit-scrollbar-thumb{height: 20px;border-radius:10px;-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);background-color:#66869c;}"
                            +".cli{ padding:5px 0px;margin-right:5px;margin-bottom:5px;box-sizing:border-box;display:inline-block;background-color:rgba(0, 0, 0, 0.2);} .cli span{vertical-align:middle;}"
                            +".cli > div> div:nth-child(1){height:261px;width:224px;margin:0px 3px;text-align:center;vertical-align:middle;} .cli > div> div:nth-child(1) img{width:224px;vertical-align:middle;} .cli > div> div:nth-child(1) span{line-height:261px;vertical-align:middle;}"
                            +".cli > div> div:nth-child(2){height:25px;width:230px;text-align:center;font-size:16px;} .cli > div> div:nth-child(2) span{color:#90f735}"
                            +".cli > div> div:nth-child(3){height:25px;width:230px;text-align:center;font-size:13px;color:#31e0c9;text-overflow:ellipsis;overflow:hidden;}"
                            +".cli > div> div:nth-child(4){height:25px;width:230px;text-align:center;font-size:12px;color:#aba2da;text-overflow:ellipsis;overflow:hidden;}"
                           );
                var $dtc = $("<div id=\"plu\">"                                               //plugin
                             +"<div class=\"switch-container\">"                              //switch
                             +"<input id=\"switch\" type=\"checkbox\" class=\"switch\" /><label class=\"swi\" for=\"switch\" ></label>"
                             +"</div>"                                                        //switch end
                             +"<div id=\"minimarket\" class=\"mini\">"                        //market
                             +"<div class=\"query\">"                                         //query
                             +"<div class=\"tag_filter_category\">"                           //select 1
                             +"<select id=\"sel1\" name=\"category_753_Game[]\" style=\"font-size:13px;width:315px;\">"
                             +"<option value=\"any\">所有游戏</option>"
                             +"</select></div>"                                               //select 1 end
                             +"<div id=\"btn_query\"><span>搜索</span></div>"
                             +"<div class=\"tag_filter_category\">"                           //select 2
                             +"<select id=\"sel2\" name=\"category_753_item_class[]\"  style=\"font-size:13px;width:110px;\" >"
                             +"<option value=\"2\">集换式卡牌</option>"
                             +"<option value=\"3\">个人资料背景</option>"
                             +"<option value=\"4\">表情</option>"
                             +"<option value=\"5\">补充包</option>"
                             +"<option value=\"6\">徽章</option>"
                             +"</select></div>"                                              //select 2 end
                             +"<div style=\"display:inline-block;margin-right:6px;\">"                       //card border option
                             +"<div style=\"color:#8f98a0;display:inline-block;margin:2px 5px 1px 5px;padding-top:1px;\">卡牌边框：</div>"
                             +"<div style=\"color:#D2D2D2;display:inline-block;margin:0px 16px 1px 5px;padding-top:1px;\">"
                             +"<input id=\"cardborder_0\" type=\"checkbox\" checked=\"\" style=\"vertical-align:middle;\" name=\"category_753_cardborder[]\" value=\"tag_cardborder_0\"><label  for=\"cardborder_0\"><span>普通&nbsp;&nbsp;&nbsp;</span></label>"
                             +"<input id=\"cardborder_1\" type=\"checkbox\" style=\"vertical-align:middle;\" name=\"category_753_cardborder[]\" value=\"tag_cardborder_1\"><label  for=\"cardborder_1\"><span>闪亮</span></label>"
                             +"</div></div>"                                                //card border option end
                             +"<div id=\"sort\">"                                                     //sort
                             +"<div id=\"btn_sort\"><span>排序</span></div>"                    
                             +"<div class=\"sort_order\"><span>价格 ↑</span></div>"
                             +"<div class=\"sort_order\"><span>价格 ↓</span></div>"
                             +"<div class=\"sort_order\"><span> ID ↑</span></div>"
                             +"<div class=\"sort_order\"><span> ID ↓</span></div>"
                             +"</div>"
                             +"</div>"                                                        //query end
                             +"<div class=\"sta\">"                                           //statistic
                             +"<div>"
                             +"<div >数量:<span id=\"gg\">0</span></div>"
                             +"<div >已绿:<span id=\"go\">0</span></div>"
                             +"<div >愿望:<span id=\"gw\">0</span></div>"
                             +"<div >有卡:<span id=\"gc\">0</span></div>"
                             +"<div >掉落:<span id=\"gd\">0</span></div>"
                             +"<div >价格:<span id=\"gp\">0.0</span></div>"
                             +"</div>"
                             +"<div id=\"btn_exclude\"><span>排除已绿</span></div>"
                             +"</div>"                                                       //statistic end
                             +"<div class=\"list\">"                                          //list
                             +"<ul id=\"listul\"></ul>"
                             +"</div>"                                                        //list end
                             +"</div>"                                                        //market end
                             +"</div>");                                                       //plugin end
                $dtc.insertAfter($(".t_fsz:first > table"));
                $(".swi").eq(0).click(function(){
                    $(".mini").slideToggle();
                });
                $("#btn_query").click(query_button).data("work","0");
                $("#sort").mouseover(function(){
                    $("#sort .sort_order").show();
                });
                $("#sort").mouseleave(function(){
                    $("#sort .sort_order").hide();
                });
                $("#sort .sort_order").each(function(index){
                    $(this).css("top",(index*24+24)+"px").click(function(){
                        lisort(index);
                    });
                });
                $("#btn_exclude").click(exclude_own);
                $(".sort").click(lisort);
                $("#sel2").change(function(){
                    if($("#sel2").val()!="2"){
                        $(".query input").attr("disabled", "disabled").removeAttr("checked");
                    }
                    else{
                        $(".query input").removeAttr("disabled").removeAttr("checked");
                    }
                });
                addoption();
                var flag = true;
                var working = false;
                var count=0;
                var to = [];
                setInterval(function(){
                    if(task.length>0){
                        if(!working){
                            working = true;
                            $('#btn_query').data("work","1").css("cursor","wait").find("span").text("搜索中");
                        }
                        if(flag){
                            flag=false;
                            var q =task[0].split("_");
                            query_ins(q[0],q[1]);
                        }
                        else{
                            var CN = task[0];
                            var qr = GM_getValue(CN);
                            var qe = $("#listul ."+CN).length;
                            count++;
                            if(qe==qr&&qe!==0){
                                task.shift();
                                flag=true;
                                count=0;
                            }
                            if(count>20){
                                var nc = task[0].split("_");
                                var str = $("#sel1 option[value='"+nc[0]+"']").text();
                                var type = ["普通卡牌","亮卡牌","集换式卡牌","个人资料背景","表情","补充包","徽章"];
                                str+="  "+type[nc[1]];
                                if(jQuery.inArray(task[0],to)==-1){
                                    task.push(task[0]);
                                    to.push(task[0]);
                                    console.log(str+"  查询超时! 移至队列末端");
                                }
                                else{
                                    console.log(str+"  查询失败! ");
                                }
                                task.shift();
                                flag=true;
                                count=0;
                            }
                        }
                    }
                    else{
                        if(working){
                            working = false;
                            $('#btn_query').data("work","0").css("cursor","pointer").find("span").text("搜索");
                        }
                    }
                },300);
                //setInterval(update_sta,3000);
            })();
        }
        
        function update_sta(){
            if(!Exclude){
                var cp=0;
                var cd=0;
                var caa = [];
                $("#sel1 option.stc").each(function(){
                    caa.push($(this).val());
                });
                $.each(caa,function(index,value){
                    var $la=$("#listul li."+value+"_0");
                    var pt=0;
                    if($la.length>0){
                        $la.each(function(){
                            var sell = getFloat($(this).find("div.li_price_info span").text());
                            var sf = sell*0.05>1? Math.floor(sell*0.05):1;
                            var gf = sell*0.1>1? Math.floor(sell*0.1):1;
                            var rec = (sell-sf-gf)/100;
                            pt += rec;
                        });
                        var pavg = pt / $la.length;
                        cd += Math.ceil($la.length/2);
                        cp += pavg * Math.ceil($la.length/2) ;
                    }
                });

                $("#gp").text(cp.toFixed(2));
                $("#gd").text(cd);
            }
        }
        
        function addoption(){
            var apparry = [];
            $(".t_f:first .steamInfoLink").each(function(index){
                var link = jQuery(this);
                var href = String(link.attr('href'));
                var match;
                if((match = href.match(/\/(store\.steampowered|steamcommunity)\.com\/(app|sub)\/(\d+)/))) {
                    var type = match[2];
                    var id = parseInt(match[3]);
                    if(jQuery.inArray(id,apparry)==-1){
                        apparry.push(id);
                        var src = "https://steamdb.steamcn.com/"+type+"/"+id+"/data.js?v=38";
                        GM_xmlhttpRequest({
                            method: "GET",
                            url: src,
                            onload: function(res){
                                eval(res.responseText);
                            },
                        });
                    }
                }
            });
            window.addEventListener('message', check_lib, false);
        }
        
        function proc(data){
            if(data.id){
                var id = data.id;
                var name = data.name;
                var $op = $("<option value='"+id+"'></option>");
                $op.data("type",data.type);
                if (data.name_cn) {
                    var name_cn = data.name_cn.replace(/\^/g, " / ");
                    name += '（' + name_cn + '）';
                }
                $op.text(name);
                if (data.categories) {
                    for (var i = 0; i < data.categories.length; ++i) {
                        if (data.categories[i][0] == 21) {
                            $op.addClass("dlc");
                            break;
                        }
                        if (data.categories[i][0] == 29) {
                            $op.addClass("stc").css("font-weight","bold").css("color","#0ff5f7");
                            task.push(id+"_0");
                        }
                    }
                }
                $(".mini select:first").append($op);
            }
            $("#gc").text($("#sel1 .stc").length);
            $("#gg").text($("#sel1 option:gt(0)").length);
        }
        
        function check_lib(event){
            if(event.data.sub){
                sub = JSON.parse(event.data.sub);
            }else if(event.data.own||event.data.wish){
                own = JSON.parse(event.data.own);
                wish = JSON.parse(event.data.wish);
            }
            if(sub.length&&own.length){
                var $op =$("#sel1 option:gt(0)");
                var goo=0;
                var gww=0;
                $op.each(function(){
                    var id = parseFloat($(this).val());
                    if($(this).data("type")=="app"){

                        if (own.indexOf(id) !== -1) {
                            $(this).addClass('cown');
                            goo+=1;
                        } else if (wish.indexOf(id) !== -1) {
                            $(this).addClass('cwish');
                            gww+=1;
                        }
                    }
                    if($(this).data("type")=="sub"){
                        if (sub.indexOf(id) !== -1) {
                            $(this).addClass('cown');
                            goo+=1;
                        }
                    }
                });
                $("#go").text(goo);
                $("#gw").text(gww);
            }
        }
        
        function exclude_own(){
            if(!Exclude){
                $("#gc").text($("#sel1 .stc:not(.cown)").length);
                $("#gg").text($("#sel1 option:not(.cown)").length-1);
                $("#go").text("0");
                $("#gw").text($("#sel1 .cwish").length);
                var cp=0;
                var cd=0;
                var caa = [];
                $("#sel1 option.stc:not(.cown)").each(function(){
                    caa.push($(this).val());
                });
                $.each(caa,function(index,value){
                    var $la=$("#listul li."+value+"_0");
                    var pt=0;
                    if($la.length>0){
                        $la.each(function(){
                            var sell = getFloat($(this).find("div.li_price_info span").text());
                            var sf = sell*0.05>1? Math.floor(sell*0.05):1;
                            var gf = sell*0.1>1? Math.floor(sell*0.1):1;
                            var rec = (sell-sf-gf)/100;
                            pt += rec;
                        });
                        var pavg = pt / $la.length;
                        cd += Math.ceil($la.length/2);
                        cp += pavg * Math.ceil($la.length/2) ;
                    }
                });

                $("#gp").text(cp.toFixed(2));
                $("#gd").text(cd);
                Exclude = true;
                $("#btn_exclude span").text("取消排除");
            }
            else{
                Exclude = false;
                $("#gc").text($("#sel1 .stc").length);
                $("#gg").text($("#sel1 option").length-1);
                $("#go").text($("#sel1 .cown").length);
                $("#gw").text($("#sel1 .cwish").length);
                update_sta();
                $("#btn_exclude span").text("排除已绿");
            }
        }
        
        function query_button(){
            if($("#btn_query").data("work")=="0"){
                $("#listul li").hide();
                var q1 = $("#sel1").val();
                var queue=[];
                if(q1=="any"){
                    $("#sel1 option.stc").each(function(){
                        if($(this).data("type")=="app"){
                            queue.push($(this).val());
                        }
                    });
                }
                else{
                    $opt = $("#sel1 option:selected");
                    if($opt.hasClass("stc")){
                    }
                    else{
                        return;
                    }
                    if($opt.data("type")=="app"){
                        queue.push(q1);
                    }
                    else if($opt.data("type")=="sub"){
                        //sub
                    }
                }
                $.each(queue,function(index,value){
                    var q2 = $("#sel2").val();
                    if(q2=="2"){
                        if($("#cardborder_0").is(":checked")){
                            task_push(value,0);
                        }
                        if($("#cardborder_1").is(":checked")){
                            task_push(value,1);
                        }
                    }
                    else{
                        task_push(value,q2);
                    }
                });
            }
        }

        function task_push(q1,q2){
            var CN = getCN(q1,q2);
            var qr = GM_getValue(CN);
            var qe = $("#listul ."+CN).length;
            
            if(qe==qr&&qe!==0){
                $("#listul ."+CN).appendTo("#listul").slideToggle();
            }
            else{
                task.push(CN);
            }
        }
        function query_ins(q1,q2){
            var url="https://steamcommunity.com/market/search/render/?count=100&q=&appid=753&category_753_Game[]=tag_app_"+q1+"&category_753_item_class[]=tag_item_class_";
            if(q2=="0"||q2=="1"){
                url+="2&category_753_cardborder[]=tag_cardborder_"+q2;
            }
            else if(q2=="6"){
                GM_xmlhttpRequest({method:"GET",url:"http://www.steamcardexchange.net/index.php?gamepage-appid-"+q1,onload:ins_badge,});
            }
            else{
                url+=q2;
            }
            GM_xmlhttpRequest({method:"GET",url:url,onload:ins,});
        }
        function ins(res){
            if(res.responseText!=="null"){
                var url = res.finalUrl;
                var d =  JSON.parse(res.responseText);
                if(d.success&&d.total_count>0){
                    var $dr = $("<div>"+d.results_html+"</div>").find("a");
                    var id = getInt(getQueryByName("category_753_Game[]",url));
                    var item = getItem(url);
                    var CN = getCN(id,item);
                    var tc = d.total_count;
                    if($dr.length==tc)
                    {
                        GM_setValue(CN,tc);
                        $dr.each(function(){
                            var item_name = $(this).find(".market_listing_item_name_block span.market_listing_item_name").text();
                            var item_hash = hash(CN+"_"+item_name);
                            if(jQuery.inArray(item_hash,hash_tb)==-1){
                                hash_tb.push(item_hash);
                                var $li = $("<li class=\"cli\"><div><div class=\"li_img_info\"><span><img></img></span></div><div class=\"li_price_info\"><a target=\"_blank\"><span></span></a></div><div class=\"li_name_info\"><span></span></div><div class=\"li_item_info\"><span></span></div></div></li>");
                                $li.find(".li_price_info span").text($(this).find(".market_table_value span.normal_price").text());
                                $li.find(".li_price_info a").attr("href",$(this).attr("href"));
                                $li.find(".li_name_info span").text($(this).find(".market_listing_item_name_block span.market_listing_item_name").text());
                                $li.find(".li_item_info span").text($(this).find(".market_listing_item_name_block span.market_listing_game_name").text());
                                if(item=="4"){  //change img size
                                    $li.find("img").attr("src",$(this).find("img").attr("src")).css("width","92px").removeAttr("onclick");
                                }
                                else {
                                    $li.find("img").attr("src",$(this).find("img").attr("srcset").split(",")[1]);
                                }
                                if(item=="3"){
                                    $li.find("img").attr("onclick","zoom(this,this.src,0,0,1)");
                                }
                                $li.data("type",CN).addClass(CN);
                                $("#listul").append($li);
                            }
                        });
                    }
                    if(item=="0"||item=="1"){
                        update_sta();
                    }
                }
            }
        }

        function ins_badge(res){
            var url = res.finalUrl;
            var id=getInt(url);
            var CN=getCN(id,"6");
            var data = res.responseText;
            data = data.replace(/https?:\/\/(community\.edgecast\.steamstatic\.com|steamcommunity-a\.akamaihd\.net|cdn\.steamcommunity\.com)\//g, "//steamcommunity-a.akamaihd.net/");
            data = data.replace(/https?:\/\/(cdn\.edgecast\.steamstatic\.com|steamcdn-a\.akamaihd\.net|cdn\.akamai\.steamstatic\.com)\//g, "//steamcdn-a.akamaihd.net/");
            var $sce = $(data);
            var $norbox = $sce.find('h3:contains("BADGES"):not(:contains("FOIL"))').closest('.content-box');
            var $nor = $norbox.find('.showcase-element-container.badge>.showcase-element');
            var count = 0;
            $nor.each(function () {
                var badge = $(this);
                badge.find("br").remove();
                if (badge.text()) {
                    count++;
                    var item_name = badge.find('.element-text').text();
                    var item_hash = hash(CN+"_"+item_name);
                    if(jQuery.inArray(item_hash,hash_tb)==-1){
                        hash_tb.push(item_hash);
                        var img= badge.find('.element-image').attr('src');
                        var level = badge.find('.element-experience').html();
                        var $li = $("<li class=\"cli\"><div><div class=\"li_img_info\"><span><img></img></span></div><div class=\"li_price_info\"><span></span></div><div class=\"li_name_info\"><span></span></div><div class=\"li_item_info\"><span></span></div></div></li>");
                        $li.find(".li_price_info span").text(level.substring(7,14));
                        $li.find(".li_name_info span").text(item_name);
                        $li.find(".li_item_info span").text("Badge "+level.substring(0,7));
                        $li.data("type",CN).addClass(CN);
                        $li.find("img").attr("src",img).css("width","100px");
                        $("#listul").append($li);
                    }
                }
            });
            var $foilbox = $sce.find('h3:contains("FOIL BADGES")').closest('.content-box');
            var $foil = $foilbox.find('.showcase-element-container.badge>.showcase-element');
            $foil.each(function () {
                var badge = $(this);
                badge.find("br").remove();
                if (badge.text()) {
                    count++;
                    var item_name = badge.find('.element-text').text();
                    var item_hash = hash(CN+"_"+item_name);
                    if(jQuery.inArray(item_hash,hash_tb)==-1){
                        hash_tb.push(item_hash);
                        var img= badge.find('.element-image').attr('src');
                        var level = badge.find('.element-experience').html();
                        var $li = $("<li class=\"cli\"><div><div class=\"li_img_info\"><span><img></img></span></div><div class=\"li_price_info\"><span></span></div><div class=\"li_name_info\"><span></span></div><div class=\"li_item_info\"><span></span></div></div></li>");
                        $li.find(".li_price_info span").text(level.substring(7,14));
                        $li.find(".li_name_info span").text(item_name);
                        $li.find(".li_item_info span").text("Foil Badge "+level.substring(0,7));
                        $li.data("type",CN).addClass(CN);
                        $li.find("img").attr("src",img).css("width","100px");
                        $("#listul").append($li);
                    }
                }
            });
            GM_setValue(CN,count);
        }
        function hash(input){
            var hash = 5381;
            var i = input.length - 1;
            if(typeof input == 'string'){
                for (; i > -1; i--)
                    hash += (hash << 5) + input.charCodeAt(i);
            }
            else{
                for (; i > -1; i--)
                    hash += (hash << 5) + input[i];
            }
            var value = hash & 0x7FFFFFFF;
            var retValue = '';
            do{
                retValue += I64BIT_TABLE[value & 0x3F];
            }
            while(value >>= 6);
            return retValue;
        }
        function getQueryByName(name, url)
        {
            if (url === null)
                url = location.search;
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
            var results = regex.exec(url);
            var retVal = "";
            if (results !== null)
            {
                retVal = results[1].replace(/\+/g, " ");
                try
                {
                    retVal = decodeURIComponent(retVal);
                }
                catch (ex)
                {
                }
            }
            return retVal;
        }
        function getItem(url){
            var item = getInt(getQueryByName("category_753_item_class[]",url));
            var cardborder = getInt(getQueryByName("category_753_cardborder[]",url));
            if(item=="2"){
                return cardborder;
            }
            else{
                return item;
            }
        }
        function getCN(id,item){
            return id+"_"+item;
        }
        function getInt(str){
            return parseInt(str.replace(/[^0-9]/ig,""));
        }
        function getFloat(str){
            return parseFloat(str.replace(/[^0-9]/ig,""));
        }
        function lisort(order){
            $lia = $("#listul li:visible");
            var $li;
            switch(order)
            {
                case 0: 
                    $li = $lia.sort(sortByPrice1);
                    break;
                case 1:
                    $li = $lia.sort(sortByPrice2);
                    break;
                case 2:
                    $li = $lia.sort(sortById1);
                    break;
                case 3:
                    $li = $lia.sort(sortById2);
                    break;
            }
            $("#listul").append($li);
        }
        function sortByPrice1(a,b){
            var pricediff = getFloat($(a).find(".li_price_info span").text())-getFloat($(b).find(".li_price_info span").text());
            if(pricediff!==0){
                return pricediff;
            }
            else{
                if($(a).find(".li_name_info span").text()>$(b).find(".li_name_info span").text()){
                    return 1;
                }
                else{
                    return -1;
                }
            }
        }
        function sortByPrice2(a,b){
            var pricediff = getFloat($(b).find(".li_price_info span").text())-getFloat($(a).find(".li_price_info span").text());
            if(pricediff!==0){
                return pricediff;
            }
            else{
                if($(a).find(".li_name_info span").text()>$(b).find(".li_name_info span").text()){
                    return 1;
                }
                else{
                    return -1;
                }
            }
        }
        function sortById1(a,b){
            var IDdiff = getFloat($(a).data("type").split("_")[0])-getFloat($(b).data("type").split("_")[0]);
            if(IDdiff!==0){
                return IDdiff;
            }
            else{
                if($(a).find(".li_name_info span").text()>$(b).find(".li_name_info span").text()){
                    return 1;
                }
                else{
                    return -1;
                }
            }
        }
        function sortById2(a,b){
            var IDdiff = getFloat($(b).data("type").split("_")[0])-getFloat($(a).data("type").split("_")[0]);
            if(IDdiff!==0){
                return IDdiff;
            }
            else{
                if($(a).find(".li_name_info span").text()>$(b).find(".li_name_info span").text()){
                    return 1;
                }
                else{
                    return -1;
                }
            }
        }
    });
})();

// End



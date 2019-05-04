// ==UserScript==
// @name           Taobao plus to Sign
// @author         Yulei
// @namespace      Yuleigq@gmail.com
// @description    Taobao Plus to Sign and Auto-click. Forget it for Sign.
// @version        1.35.07
// @create         2014-08-14
// @lastmodified   2015-11-07
// @encoding       utf-8
// @include        *//trade.ju.taobao.com/trade/my_ju.htm*
// @include        *//taojinbi.taobao.com/index.htm*
// @include        *//ka.tmall.com/*
// @include        *//www.etao.com/*
// @include        *//wanke.etao.com/*
// @include        *//vip.tmall.com/*
// @include        *//mission.jianghu.taobao.com/umissionList.htm*
// @include        *//taojinbi.taobao.com/coin/introduct.htm*
// @include        *//taojinbi.taobao.com/coin/user_coin_detail.htm*
// @include        *//vip.tmall.com/mobile/home/mainPage.htm*
// @include        *//detail.ju.taobao.com/home.htm*
// @include        *//h5.m.taobao.com/awp/mtb/mtb.htm*
// @include        http://h5.m.taobao.com/mlapp/olist.html?tabCode=all

// @include        https://mclient.alipay.com/*ashierPay.htm?awid=*
// @include        *//h5.m.taobao.com/trade/paySuccess.html?bizOrderIds=*

// @include        *//*buy.tmall.com/order/pay*uccess.htm*biz_order_id=*
// @include        *//*trade.taobao.com/trade/pay_success.htm?biz_order_id=*

// @include        *//buy.tmall.com/order/confirm_order.htm*
// @include        *//buy.taobao.com/auction/order/confirm_order.htm*
// @include        *//buy.taobao.com/auction/buy_now.jhtml*
// @include        *//unit.buy.tmall.com/order/confirm_order.htm*
// @include        *//h5.m.taobao.com/awp/base/bag.htm*

// @include        *//m.etao.com/?*src=android&ttid=700342@etao_android_*
// @include        *//m.etao.com/youhui/sign.php?type=*
// @include        *//h5.m.taobao.com/trip/member/index.html*

// @include        *//detail.tmall.com/item.htm*
// @include        *//item.taobao.com/item.htm?*
// @include        *//detail.yao.95095.com/item.htm*
// @include        *//chaoshi.detail.tmall.com/item.htm*
// @copyright      2014+, Yulei
// @run-at         document-end

// @exclude        http://www.etao.com/*.html*
// @exclude        http://wanke.etao.com/*.html*
// @exclude        *//vip.tmall.com/*/*?*
// @grant          unsafeWindow
// @grant		GM_setClipboard
// @grant		GM_xmlhttpRequest
// @icon		http://www.taobao.com/favicon.ico
// @require       http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js
// ==/UserScript==



(function() {
var Dhost=location.hostname.match(/\w+\.\w+$/i).toString(); var Lc=location,lurl=location.href; var win;try{win=unsafeWindow}catch(e){win=window}; var _Q=function(d) {return document.querySelector(d)},_Qa=function(d) {return document.querySelectorAll(d)};
var TiTle='点击下载(^__^) By Yulei',TiT='By Yulei';
var DM=function (m){return lurl.toLowerCase().indexOf(m)>0}, Wle=function(e) {return _Qa(e)[_Qa(e).length-1]}, Ttr=function (e){return _Q(e)||''}, TCli=function(e) {if(_Q(e))_Q(e).click()};
function Tout(f,n){ //if(!n)n=1e3;
n=n?Number(n+"e3"):7e3;setTimeout(function(){ if(_Q(f))_Q(f).click() },n);}//Log(t);

function TDey(fn,n){ setTimeout(fn,n*1e3) }
function MEvt(sx,sy,cx,cy,e){ if(_Q(e)){
var MEvent = document.createEvent("MouseEvent");
MEvent.initMouseEvent("mousedown", true, true, this, 1, sx,sy, cx,cy, false, false, false, false, 0, null);
_Q(e).dispatchEvent(MEvent);
_Q(e).click();}
}
function Yday(){ //当天有效

}
function RDey(t){ if (!t)t=5e3;setInterval(function(){ location.reload() },t);}
function Log(l){ console.log(arguments);
}
var Dhe=location.hostname,c=console;//,KISSY=win.KISSY,lib=win.lib;
var Tio=[
"包装严实好点，质量好保证哦，少不了好评的哦",
"货不能少，别让人家失望！好宝贝就有给好评！",
]; //"全5分好评是需要争取的，发货慢质量差给好评，您问心无愧吗？所以好，就少不了好评",

 var Tum=function(n){return (n*1e3)}, //Math.random()
 Tsu=Tio[parseInt(Math.random()*8)];
//开关 1,0
 //var Btm=1,aTM=1,aTB=1,Dtb=1,TM=1,TBb=1,TMb=0,TB=1,Miao=1,Ju=1;
//TDey(function(){window.close()},33); //定时关闭窗口
var TMHt=!1,BSo=!1;
function YKey(){
$('body').on('keydown',function(e){ 
if (e.keyCode==17 ||e.keyCode==27)sessionStorage['Yu']=1;//win.name='Yu';

 }); }
function GMrq(u,fn){ 
GM_xmlhttpRequest({url: u,method:"get",onload:fn})
}

function Yu(){
 //域名判断开始
 switch (Dhe) {

case "mission.jianghu.taobao.com" :  //任务盒子
setInterval(function(){
if(_Q('.J_actionBtnWrap a')){
_Q('.J_actionBtnWrap a').click();
setTimeout(function(){_Q('.mission-popup-ft a').click(); },800);
setTimeout(function(){
_Q('.J_actionBtnWrap a').click();
_Q('.mission-popup-close').click(); },1e3);
}
},2e3)

break;
case "trade.ju.taobao.com" : //我的聚划算
Tout('.btn-sign'); 
break;

case "taojinbi.taobao.com" : //淘金币
var nn=0;
function MEv(sx,sy,cx,cy,e){
var MEvent = document.createEvent("MouseEvent");
MEvent.initMouseEvent("mousemove", true, true, this, 0, sx,sy, cx,cy, false, false, false, false, -1, null);
_Q(e).dispatchEvent(MEvent);
}
TDey(function(){ if(!_Q('.J_GoTodayBtn'))return;
for (var i=0;i<9;++i){ //Log(i);
MEv(30,249, 30,154,"div.my-coin");
MEv(30,249, 30,58,"img");
MEv(96,249, 96,154,"p.lg-2.info.J_Coin");
MEv(97,249, 97,154,"p.lg-2.info.J_Coin");
MEv(101,52, 101,157,"p.lg-2.info.J_Coin");
MEv(117,265, 117,165,"a");
}
MEvt(300,429, 300,333,'.J_GoTodayBtn');
 },7);

//店铺签到
TDey(function(){ var SbbG=_Q('.get-item .btn') ? $('.get-item .btn') : $('.sign-bd-button');//消费在前，店铺在后
SbbG.each(function(i,e){
var ur=this.href;GMrq(ur,function(y){ })
});
},3.3);
break;
case "ka.tmall.com" : //点券卡
Tout('#signTrigger');
break;
case "www.etao.com" : //一淘
if(DM('signww'))TDey(function(){ Lc.href="http://wanke.etao.com"; },2.5); 
Tout('.ci_receive',8);
Tout('.ci-overlay-close',10);
break;

case "wanke.etao.com" : //一淘玩客
var Csslr={'line-height':'20px','width':'55px'},tiT={'title':TiT}; setTimeout(function(){ 
if (win.KISSY.Cookie.get('Yu')){ //浏览器会话;
$('.justify li>a').each(function(i,e){ var id=e.href.match(/\d+/),that=$(this);
  if (win.KISSY.Cookie.get('Y'+id)){that.html(win.KISSY.Cookie.get('Y'+id)).css(Csslr).attr(tiT).css('color','#00b98d');return};
  $.getJSON("/api/ajax.php?siteid="+id+"&mdList=site_check_in&format=json&wk_tk="+win.wk_token,function(d){ var DaR=d.resultList.site_check_in.data.reward;
  var exp=DaR.rank.exp,nexp=DaR.rank.next_exp,dayc=DaR.days_counter,eexp="经验:<br>"+exp+"/"+nexp,dday="<br>已签:"+dayc+"天";if(DaR.site_name==""){ that.html(eexp).css(Csslr).attr(tiT) }else{ //82px
that.html(eexp+dday).css(Csslr).attr(tiT).css('color','red');}

document.cookie="Y"+id+"="+(eexp+dday)+";expires="+(new Date).toDateString()+' 15:59:59';
   })
 })
}else{ win.KISSY.Cookie.set('Yu',1);Lc.href="http://www.etao.com/?signww&payment"; }

},1e3); //200
break;
case "m.etao.com" : //mb一淘

TDey(function(){ if(_Q('#J_ItemBuy'))Lc.href=_Q('#J_ItemBuy').href; },5);
//签到，详见上"www.etao.com" :
if(_Q('#J_signTip')){ //alert('必须当前窗口才有效');
Tout('#J_signTip',3.6) } 
break;
case "vip.tmall.com" : //积分聚乐部-天猫
$.getScript("https://uaction.alicdn.com/actionlog/js/ua.js"); //uaction.aliyuncdn.com

TDey(function(){
MEvt(826,258, 826,163,'.J_LotteryBtn'); },9); //签到摇奖
//猜品牌
var tCPP=function(){
GM_xmlhttpRequest({
url: "http://xiangyouhui.cn/news/74274", 
method: "get",onload: function(y) {  //查找答案
var t=new Date(),dd=t.getDate(),cpp=y.responseText.match(new RegExp(t.getMonth()+1+'.'+(dd<10 ? '0'+dd :dd)+"天猫猜品牌答案：(\\S+)<"))[1];
var cpss=cpp.split(''); 
 $('.joinNum').append('<em style="color:#5E9110;position:absolute"> '+cpp+'</em>');
 MEvt(952,400, 952,305,'.optionsArea');
    cpss.forEach(function(s){ $('.optionsArea .j_optionBox').each(function(i,e){ if(s==$(this).text())$(this).click(); }) })  
}
})
}
setTimeout(function(){ 
   //签到摇奖
if((_Q('.j_UserNick') || _Q('#J_personal_photo')) && _Q('.answerArea')){ // 如果登录并未猜
tCPP();
}else if (DM('/guess') && _Q('.answerArea')){ 
tCPP();
 }
 },11e3);

//天猫客户端签到
TDey(function(){
MEvt(681,120, 681,24,'.sign');
Tout('.checkin-btn',2);
 },5);
break;
case "mclient.alipay.com" : //M支付成功跳转
Tout('.J-return-link .am-button-blue', .5);
break;
case "h5.m.taobao.com" : //M支付后领币
if (DM('=all') ||DM('sta=2')){
lib.mtop.request({api:"mtop.matrixexchange.wireless.getAllCoin.receive",v:"1.0",data:{}},function(d){ 
    var yy=d.data.mobileShakeCoinResult;
TDey(function(){ 
$('.header div').last().html("<p class='h'>已领"+yy.continuousDays+"天，明日可领"+yy.tomorrowCoin+"金币，共"+yy.totalCoin+"金币，成功领取"+d.data.sendCoinResult.receiveCoin+"币</p>"); 
}, .5); } )
}
if (DM('/paysu')){ Tout('#J_gold a', .8);
} 
//订单提交
YKey();if (sessionStorage['Yu'] && DM('base/o')){ 
  setTimeout(function(){ 
	if (_Q('.c-order-btn-disabled') || !_Q('.J_submit')){ RDey(Tum(3)) }else{ 
	if (_Q('.invoice'))$('.invoice .c-inputs').val('个人'); $('.memo .c-inputs').val(Tsu); //好就好评
	_Q('.J_submit').click()  }; },500)
}

//阿里旅行-去啊
if(DM('trip/'))TDey(function(){ MEvt(1305,391, 1305,295,'.J_Checkin'); },9);
break;
//下单确认
case "stay.buy.tmall.com" : //网页支付成功领币
case "buy.tmall.com" : case "buy.taobao.com" : //淘宝确认
case "trade.taobao.com" : case "unit.buy.tmall.com" : case "unit.buyer.trade.taobao.com":
if (DM('/pay')){
 Lc.href="http://seller.vip.taobao.com/trade/trade_coin.htm?order_id="+Lc.href.match(/order_id=(\d+)/)[1];
}else if(name.indexOf('Yu')>=0 ||sessionStorage['Yu']){ //Log(name,_Q('#J_Go'));

TDey(function(){
$('.tc-counter, .memo-input').val(Tsu); 
if(_Q('.title')){_Q('.title').title="个人"; _Q('.bd .abtn').click(); TDey(function(){_Q('.invoice .tc-text').blur()}, .2) }
 if(_Q("#J_AnonBuy"))_Q("#J_AnonBuy").checked=true; //匿名
 if(_Q("#J_CheckCode"))$("#J_CheckCode input").keydown(function(e){if(e.keyCode==13)_Q('#J_Go').click()});
 if(_Q("#J_verifyImageMask>a"))_Q("#J_verifyImageMask>a").click(); //验证码
if (!_Q('#J_Go')){RDey(Tum(5))}else{_Q('#J_Go').click()} 
  }, .99);
var N=0;

}
YKey();
break;
//商品详细页
case "detail.tmall.com" : //比价
case "item.taobao.com" : 
case "detail.yao.95095.com" :
case "chaoshi.detail.tmall.com" :
var El='#hd, #J_TabBarWrap, .tb-main-layout, #J_DcHead, .footer_2014';if (DM('tmall.')){El='#bd, #hd, #footer';}
$(El).hide();$('body').one('mousewheel keydown',function(){$(El).show() }); // mousedown
TDey(function(){ $('#hd').hide() }, 1);
win.scrollTo('0','0');

if (name.indexOf('Yu')>=0 && (DM('frm=etao')||DM('tracelog=jubuyitnow') ||document.referrer.indexOf('detail.')>0) ){
//if (name.indexOf('Yu')>=0){ 
var sx=name.split('%7C'); //自动选择
if (!DM('sku_'))if (sx[1]){Lc.search+="&sku_properties="+sx[1];
}else{

 TDey(function(){ //每项第一个
$('.J_TSaleProp').each(function(i,e){  var J=$(e),Ji=J.find('li');
var n=0;if (Ji.css('display')=='none')n+=1; //无库存
if(!Ji.attr('class') || Ji.attr('class').indexOf('tb-sel')<0){  //无属性或非选择
J.find('a')[n].click()}  }); 
 }, .9)
}
Tout('#J_LinkBuy', .98);
$('#hd, #bd, #site-nav,#header,#footer').hide();
 TDey(function(){ $('#hd').hide() }, .88);
//}
return; //已知来路
}
var Tid=win.g_config.itemId || Lc.href.match(/item_id=(\d+)/)[1];
 function Hlow(n){var nn=(n+'').split('.');return (nn[1]&&nn[1].length>2) ? parseInt(n*100)/100:n};
var TbT=DM('/item.taobao'),TbW=TbT?90:99.5,TbF=TbT?12:15,TbR=TbT?0:50,Yji='#Yjia';
var Hp="http:"==location.protocol?"http://":"https://";
TDey(function(){ //TB要延迟300
KISSY.jsonp('//hws.m.taobao.com/cache/wdetail/5.0/?id='+Tid+'&ttid=2013@taobao_h5_1.0.0&exParams={}',function(c){
var TI='>手机价</',TII='><a title="Tips:使用手机TB购买的价格" href="http://detail.m.tmall.com/item.htm?id='+Tid+'&fm=detail#y" target="_blank"',Sjj='¥'+JSON.parse(c.data.apiStack[0].value).data.itemInfoModel.priceUnits[0].price,
bq='<dt class="tb-metatit" '+TI+'dt><dd'+TII+'style="color:#3AB320">'+Sjj+'</a></dd>';if(TbT)var bq='<span class="tb-property-type" '+TI+'span'+TII+'><strong class="tb-rmb">'+Sjj+'</strong>'+'</a>';
$('#J_StrPriceModBox').append(bq);
var sel=c.data.seller;$(Yji).attr('title','\u5f00\u5e97\u65f6\u95f4：'+sel.starts.slice(0,10)+'\n\u4fe1\u7528\u7b49\u7ea7：'+sel.creditLevel+'\n\u5e97\u5bb6\u7c89\u4e1d：'+sel.fansCountText+'\n\n——'+TiT);
})
},5);
setTimeout(function(){

GM_xmlhttpRequest({ //一淘API
url: 'http://ok.etao.com/api/purchase_detail.do?src=auction_detail&partner=182&nid='+Tid,
method: "get",onload: function(y) { 
var c=JSON.parse(y.responseText); if(!c.success)return; //NOT_FOUND
var d=c.result,dB=d.bestPlan,da=d.auction,dA=d.allPlans,dBc=dB.currentVipRebate; var tmP=_Q('.tm-price'),nP=dB.finalPrice,tm=(tmP!=null) &&tmP.innerText||nP,fPr=(nP -tm )>0 ? tm :nP;//fPr判断一淘与现价区别 
$('#J_StrPriceModBox').append('<dt style="color:#C522BF;border:solid 1px #808080;width:'+TbW+'%;font-size:'+TbF+'px;text-shadow:1px 1px 1px #E0253B;cursor:alias;" title="'+TiT+'" id="Yjia">到手价:'+Hlow(fPr)+' 集分宝约送<b>'+(dB.vipLevel<2 ? dB.vipLevelOneRebate+'个' : '<s>'+dB.vipLevelOneRebate+'个</s>'+dBc+'个</b>(V'+dB.vipLevel+'会员多送'+dB.vipExtraScale+'%)<i id="Mobi"></i> <em id="His"></em></dt>') ).show();

$('<a style="cursor:pointer" title="复制地址（分享）\n 单击复制地址\n双击复制标题\地址\n  右击刷新当然页"> 复制 </a>').on('click dblclick contextmenu',function(e){
var tLK=da.link;if (DM('tmall.')){tLK=tLK.replace('item','detail')}
if (e.type=="click"){ GM_setClipboard(tLK) }else if (e.type=="dblclick"){ GM_setClipboard(da.title+'\n'+tLK) }else{Lc.href=tLK;return !1}
}).appendTo(Yji);//一淘历史
GM_xmlhttpRequest({ url: 'http://ok.etao.com/api/price_history.do?nid='+Tid,
method: "get",onload: function(y) {var c=JSON.parse(y.responseText);//Log(c);
var cM=c.meta,cR=c.result,cF=c.future;
    var cRd=cR[0].data.join("\n"),N=','+cM.lowest,M=new RegExp(N+'\n','g'),cRR=cRd.replace(M,N+'#\n');//最低标识
    $('<span><br>'+(cF ? '预计:'+cF.start+'价¥'+cF.price :"")+' <em style="color:#A08416;border-bottom:dashed 3px red" title="'+cRR+'">历史调价'+(cR[0].data.length-1)+'次 最低:¥'+Hlow(cM.lowest)+'</em></span> <a href="'+dB.etaoShopLink+'" id="yGom" target="_blank" style="float:right;background-color:#DFC71C;color:#E7E732;padding:3px;line-height:20px;">优惠购买</a>').appendTo(Yji).one('click',function(){ 
    });
}}) //一淘手机
GM_xmlhttpRequest({ url: 'http://ok.etao.com/ajax/wap_purchase_compare.do?pcFinal='+nP+'&pcRebate='+dBc+'&pcQuan='+dB.quanValue+'&quanSource=6&src=etao_jcy&pid=&nid='+Tid+'&siteId=1',
method: "get",onload: function(y) {var c=JSON.parse(y.responseText);
var Mmo=c.result.moreRebate;
Mmo>0 && $('<a title="请使用手机UA打开，估计最终¥'+c.result.finalPrice+'" href="http://m.etao.com/?src=android&ttid=700342@etao_android_3.9.5#!/item/index.php?nid='+Tid+'&wpartnerid=/"><u id=Mob style="font-size:12px; color:#AD6A3C">[手机多送'+Mmo+'个]</u></a>').appendTo(Yji);
}})
}});

},4e3);

//收藏
if(document.cookie.indexOf("_l_g_")>=0){ 
with(document)with(head)with(insertBefore(createElement("script"),firstChild))setAttribute("id","mtop",src="//g.alicdn.com/??mtb/lib-mtop/1.6.4/mtop.js");
TDey(function(){
lib.mtop.config.subDomain="m";
lib.mtop.H5Request({api:"com.taobao.mcl.fav.checkcollect",v:"2.0",ttid:"tmalldetail",data:{favType: 1,itemId: String(Tid)}},function(e) {//Log(e);
var o=e.data.isFav;if (o && o !== "false") {var x="★";if(DM('tmall.'))x=""; $('#J_AddFavorite i').css('color','red');
TDey(function(){$(Yji).append('<o title="已收藏" style="position:absolute;left:-15px;top:0;color:red;font-family:tm-detail-font">'+x+'</o>') },3.5);
} })
},1)
}
//翻页
$('#J_Reviews').one('DOMSubtreeModified','.rate-page',function(){
var Yfy=function(){ setTimeout(function(){ var i=0,RP='.rate-paginator';if(!_Q('#Tpg'))$(RP).append($('<input type="text" id="Tpg" title="请输入页数" class="tb-text" style="border:1px ridge #9F1110;height:33px;" maxlength=2 size=2 value="">').keyup(function(e){ if(i==1)return; i=1;setTimeout(function(){ 
var n=parseInt(e.target.value);if(typeof n=="number"){var RPa=_Qa(RP+' a');RPa[1].innerHTML=n;Yfy();RPa[1].click()} },500)}) ) },1e3) }
Yfy();$(this).on('mousedown','a',Yfy)
});

//调用如意淘
var t=new Date();$('head').append('<script src="'+Hp+'ruyi.taobao.com/extension/bookmarklet.js?t='+t.getFullYear()+(t.getMonth()+1)+t.getDate()+'" charset="utf-8" />');

$('.tm-fcs-panel, .tb-meta').on('DOMNodeInserted','#ruyitao-like-button',function(){ 
  $('#J_StrPriceModBox').append($('#ruyitao-like-button-price-curve').css({'right':''+TbR+'px','z-index':99})); $(this).remove(); }).append("<style>.ruyitao-like-button-protection{ list-style-type:none; } #ruyitao-like-button-price-curve{ display:block; } </style>"); 
$('#J_TmallApkBuyerList img').hide();

break;

case "detail.ju.taobao.com":
TDey(function(){ if(_Q('.main-box.chance'))_Q('.main-box.chance').className='main-box avil'; }, .8);
var jpo='.ju-popup-wrapper',dpy='display';var Vr=!0;
$('body').on('keydown',function(e){ if (e.keyCode==13 ||e.keyCode==27)TDey(function(){ var jbc=$(jpo).last().find('.btn-close');if(jbc.css(dpy)!="none"){jbc[0].click()}else{$(jpo).last().find('button').click();} }, .5); 
if (e.keyCode==17 &&Vr){YJhs();Vr=!1} }); 
function YJhs(){ if(this.name.indexOf('Yu')<0)this.name='Yu';
var Jhh=setInterval(function(){
if (_Q('.main-box.avil')){
var Jpw=$(jpo).last(),Jbc=Jpw.find('.btn-close'),Jtx=Jpw.find('.cry').text(),Jqe=Jpw.find('.questionEncrpt').val();
if(!Jpw.css(dpy) || Jpw.css(dpy)=="none"){ _Q('.buyaction').click(); } 
if (Jqe){ if (Jpw.find('.dt-error-tips').css(dpy)=="block")Jbc[0].click();return; } 

if (Jpw.find('.dt-error-tips').css(dpy)=="block")Jbc[0].click();
if (Jtx=='亲，还有机会，请重试！' ||Jpw.find('.smile').text()){ 
Jpw.find('button').click();
}else{ if (Jtx.indexOf('卖光')>0)clearInterval(Jhh)}
 }
},Tum(1.3));
}

//获取数量等
var JI='.J_ItemSold';
TDey(function(){
if (_Q(JI) && !_Q('.chance')){
GM_xmlhttpRequest({
url: 'http://detail.tmall.com/item.htm?id='+ _Q('#itemId').value,
method: "get",onload: function(y) { 
  var Ylg=y.responseText.match(/"quantity":(\d+)/),Yg=Ylg ? Ylg[1] : 'TB'; 
 $(JI).append('<small style="color:#8A2BE2" title="余量/备货\n-'+TiT+'">('+Yg+')</small>');
$('.main-box').append( $('<div class="tb-sku" style="position:absolute;top:60px;left:10px;" />').append( $(y.responseText).find('.tb-prop').click(function(e,i){ 
$(this).find('li').removeClass('tb-selected').find('i').remove(); $(e.target).parents('li').addClass('tb-selected').append('<i/>'); //选择
var Ys=$(e.target).parents('li').data('value'); if(Ys)sessionStorage['yl'+Ys.split(':')[0]]=Ys; //保存选项
return !1;
}) ));
if (_Q('.tb-prop')){
$('.tb-sku').append('<span id="sjtime" style="background:url(http://gtms04.alicdn.com/tps/i4/TB19WBkGFXXXXbVXVXXi9d27FXX-550-987.png) -531px -411px no-repeat;float:left;margin:-10px -1px;width:18px;height:32px;display:none" /> <a style="background-color:#be0106;padding:3px 9px;color:#fff;float:left;text-shadow:1px 2px 3px #321717;" title="锁定选项" href="">锁定</a>').click(function(){ 
var sx="Yu|";for (var i in sessionStorage){if (i.indexOf('yl')==0){sx+=sessionStorage[i]+";";} }; win.name=sx;  $('#sjtime').slideToggle(); return !1; }); //生效选项
};$('#J_Progressive, .detail-detail, .recom-list').remove();$('.tb-metatit').css('background-color','#fff');

}
})
$('head').append('<link rel="stylesheet" href="//g.alicdn.com/??tm/detail/1.8.5/app.css,tm/detail/1.8.5/page/itemDetail.css" />');

}
},1);
break;
 }
}
if (!window.opera){Yu()}else{window.addEventListener('DOMContentLoaded',Yu,false);}
})();



  /* （兼容：Firefox20+、Chrome26+；支持：Opera15+；） 
  *百年老牌，值得信赖！专注下载百年，浩荡品牌里程。
 *主旨：简化流程、节省时间，改善体验。（化复杂的步骤为简，节约大量宝贵的时间浪费！）生存有道，放过别人也是放过自己。
   * 简单成就下载 -|- by Yulei 本脚本只作学习研究参考用，版权所有 不得滥用、商用、它用，后果自负
    */
+cM.lowest,M=new RegExp(N+
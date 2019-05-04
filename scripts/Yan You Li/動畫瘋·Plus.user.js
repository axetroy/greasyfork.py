// ==UserScript==
// @name         動畫瘋·Plus
// @namespace    none
// @version      1.14.5
// @description  分級標識自動同意、自動切換至下一集、分級鎖定、影片空降座標、網頁全螢幕
// @author       xu3u04u48
// @match        *://ani.gamer.com.tw/animeVideo.php?sn=*
// @icon         https://i2.bahamut.com.tw/anime/baha_s.png
// @require      https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js
// @grant GM_setValue
// @grant GM_getValue
// @run-at document-end
// ==/UserScript==



//檢查Beta播放器是否開啟
if(Cookies.get('player') == 'new') {
 return //不執行以下程式碼
}


//使用者介面
var aniplusui_html = '<div class="ani-tabs__item">'+
'<div id="plus_ui" class="ani-tabs-link">動畫瘋·Plus'+
'<span class="plus_explain" style="position:absolute;z-index: 2;">'+
'<span style="left: unset;line-height: 27px;position: fixed;right: 70px;">'+
'Ver 1.14.5<br>修改自動同意分級標識警告對限制級作品和無登入使用者的影響。'+
'</span></span></div></div>';
$('.sub_top').append(aniplusui_html);
var aniplusui_content = '<div id="ani-tab-content-999" class="ani-tab-content__item" style="display: none;"></div>';
$('.ani-tab-content').append(aniplusui_content);
$('#plus_ui').click(function(){
    $(".ani-tab-content__item").css("display","none");
    $("#ani-tab-content-999").css("display","block");
    $('.ani-tabs-link').removeClass('is-active');
    $(this).addClass("is-active");
});




//使用者介面CSS
$('head').append(`
<style>
.plus_bullet-send {
padding:0 5px 0 5px;
width:20%;
z-index:1;
border-radius:5px;
cursor:all-scroll;
}
.plus_bullet-control {
left:unset;
right:0;
z-index:1;
height:100%;
}

.plus_bullet-send_icon {
width: 42px;
height: 40px;
float: right;
padding: 6px 8px;
}

.plus_bullet-send_icon:before {
content: "chat";
}

.plus_bullet-send_icon:before {
font-size: 26px;
direction: ltr;
display: inline-block;
font-family: 'Material Icons';
font-style: normal;
font-weight: normal;
letter-spacing: normal;
line-height: 1;
text-transform: none;
white-space: nowrap;
word-wrap: normal;
-webkit-font-smoothing: antialiased;
text-rendering: optimizeLegibility;
-moz-osx-font-smoothing: grayscale;
-webkit-font-feature-settings: 'liga';
font-feature-settings: 'liga';
}

.plus_bullet-send_icon:hover{
color: #00B4D8;
}

.plus_bullet-send_icon span {
display: none
}


.plus_bullet-send_icon:hover span {
position: absolute;
padding: 5px;
bottom: 52px;
text-decoration: none;
display: block;
background-color: #000000ed;
color: #ffffffd6;
border-radius: 5px;
}


.plus_Web_fullscreen_icon {
width: 42px;
height: 40px;
float: right;
padding: 6px 8px;
}

.plus_Web_fullscreen_icon:before {
content: "aspect_ratio";
}

.plus_Web_fullscreen_icon:before {
font-size: 26px;
direction: ltr;
display: inline-block;
font-family: 'Material Icons';
font-style: normal;
font-weight: normal;
letter-spacing: normal;
line-height: 1;
text-transform: none;
white-space: nowrap;
word-wrap: normal;
-webkit-font-smoothing: antialiased;
text-rendering: optimizeLegibility;
-moz-osx-font-smoothing: grayscale;
-webkit-font-feature-settings: 'liga';
font-feature-settings: 'liga';
}

.plus_Web_fullscreen_icon:hover{
color: #00B4D8 !important;
}

.plus_Web_fullscreen_icon span {
display: none
}

.plus_Web_fullscreen_icon:hover span {
position: absolute;
padding: 5px;
bottom: 52px;
text-decoration: none;
display: block;
background-color: rgba(0, 0, 0, 0.86);
color: #ffffff;
border-radius: 5px;
}

.plus_time_body{
width: 100%;
padding: 8px;
min-height: 170px;
border: 1px solid #ddd;
background: #f5f5f5;
border-radius: 4px;
box-sizing: border-box;
}

.plus_keyword-label {
display: inline-flex;
align-items: center;
max-width: 100%;
margin: 0 4px 4px 0;
background: #02B4D8;
font-size: 13px;
color: #fff;
border-radius: 4px;
}

.plus_keyword-label > span {
display: block;
padding: 3px 6px;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
vertical-align: middle;
}

.plus_k-label {
align-items: center;
max-width: 100%;
margin: 0 4px 4px 0;
padding: 3px 6px;
background: #02B4D8;
font-size: 13px;
color: #fff;
border-radius: 4px;
}


.plus_k-label > span {
display: none
}


.plus_k-label:hover span {
min-height: 20px;
width: 330px;
position: absolute;
z-index: 999;
padding: 10px;
display: block;
background-color:rgba(0, 0, 0, 0.86);
color: #ffffff;
border-radius: 5px;
font-size: 16px;
left: 50px;
}




.plus_explain {
font-size: 21px;
color: #888;;
float: right;
}

.plus_explain:before {
content: "help";
}

.plus_explain:before {
direction: ltr;
display: inline-block;
font-family: 'Material Icons';
font-style: normal;
font-weight: normal;
letter-spacing: normal;
line-height: 1;
text-transform: none;
white-space: nowrap;
word-wrap: normal;
-webkit-font-smoothing: antialiased;
text-rendering: optimizeLegibility;
-moz-osx-font-smoothing: grayscale;
-webkit-font-feature-settings: 'liga';
font-feature-settings: 'liga';
}


.plus_explain > span {
display: none
}


.plus_explain:hover span {
min-height: 20px;
width: 330px;
position: absolute;
z-index: 999;
padding: 10px;
display: block;
background-color:rgba(0, 0, 0, 0.86);
color: #ffffff;
border-radius: 5px;
font-size: 16px;
left: 50px;
}


.plus_no_sub {
text-align: center;
line-height: 1.5em;
color: #888;
}

button.plus_refresh {
float: none;
margin: 0;
padding: 0;
height: 30px;
width: 30px;
border: 1px solid #ccc;
background: #eee;
font-size: 18px;
border-radius: 5px;
cursor: pointer;
outline: none;
}


.ani-tab-content__item .plus_refresh  {
width: 30px;
height: 30px;
border: 1px solid #00B4D8;
background: #00B4D8;
color: #fff;
}

.ani-tab-content__item .plus_refresh:hover {
background: #FFF049;
border-color: #FFF049;
color: #333;
}

.plus_material-icons {
font-family: 'Material Icons';
font-weight: normal;
font-style: normal;
font-size: 21px;
line-height: 1;
letter-spacing: normal;
text-transform: none;
display: inline-block;
white-space: nowrap;
word-wrap: normal;
direction: ltr;
font-feature-settings: "liga" 1;
}

.ani-tab-content__item .plus_refresh > i {
vertical-align: middle;
}

.video-next-button {
display: block;
position: absolute;
color: #fff;
background: #000;
text-decoration: none;
padding: 10px;
bottom: 40px;
right: 0px;
z-index: 10;
border-top: 1px solid #aaa;
border-left: 1px solid #aaa;
border-bottom: 1px solid #aaa;
font-size: 1.5em;
}

.plus_dialog-border{
border: 1px solid #599bdc;
position: absolute;
z-index: 1000;
background: white;
padding: 10px;
font-size: 1.3rem;
right: 15px;
}


</style>
`);

//使用者介面HTML
$("#ani-tab-content-999").prepend(`
<div class="ani-setting-section">
<div id="plussetup" class="plus_dialog-border" style="display:none;">設定已儲存</div>
<h4 class="ani-setting-title">動畫瘋·Plus <div class="plus_explain"><span>此插件設計是為了給短時間大量補番的人使用的，並加入一些沒用的功能<br>如果您覺得此插件好用，請付費支持動畫瘋讓此插件能持續為本平台服務</span></div></h4>
<div class="ani-setting-item ani-flex">
<div class="ani-setting-label">
<span class="ani-setting-label__mian">自動同意分級標識警告</span>
</div>
<div class="ani-setting-value ani-set-flex-right">
<div class="ani-checkbox">
<label class="ani-checkbox__label">
<input id="grading" type="checkbox">
<div class="ani-checkbox__button"></div>
</label>
</div>
</div>
</div>
<div class="ani-setting-item ani-flex">
<div class="ani-setting-label">
<span class="ani-setting-label__mian">自動切換至下一集</span>
</div>
<div class="ani-setting-value ani-set-flex-right">
<div class="ani-checkbox">
<label class="ani-checkbox__label">
<input id="video_next_skip" type="checkbox">
<div class="ani-checkbox__button"></div>
</label>
</div>
</div>
</div>
<div class="ani-setting-item ani-flex">
<div class="ani-setting-label">
<span class="ani-setting-label__mian">影片速度</span>
</div>
<div class="ani-setting-value ani-set-flex-right">
<div class="ani-checkbox">
<select id="void_speed" class="ani-select" disabled>
<option value ="0.25">0.25</option>
<option value ="0.5">0.5</option>
<option value ="0.75">0.75</option>
<option value ="1" selected>正常</option>
<option value ="1.25">1.25</option>
<option value ="1.5">1.5</option>
<option value ="2">2</option>
</select>
</div>
</div>
</div>
<div class="ani-setting-item ani-flex">
<div class="ani-setting-label">
<span id="plus-setting-label__mian" class="ani-setting-label__mian">分級鎖定</span>
</div>
<div id="plus-value" class="ani-setting-value ani-set-flex-right">
<div class="plus-keyword-header">
<input type="password" id="plus-password" class="plus-input ani-input--keyword" placeholder="首次使用須設定密碼">
<a id="plus-password-setup" href="#" role="button" class="plus-bluebtn" >設定</a>
</div>
</div>
<div id="plus-value2" class="ani-setting-value ani-set-flex-right" style="display:none">
<div class="plus-keyword-header">
<input type="password" id="plus-password2" class="plus-input ani-input--keyword" placeholder="輸入密碼">
<a id="plus-password-enter-setup" href="#" role="button" class="plus-bluebtn" >確定</a>
</div>
</div>
<div id="ncc-password" class="ani-setting-value ani-set-flex-right" style="display:none">
<div class="ani-checkbox">
<select id="grading-password" class="ani-select">
<option value ="none" selected>無</option>
<option value ="6">保護級(含·以上)</option>
<option value ="12">補12級(含·以上)</option>
<option value ="15">補15級(含·以上)</option>
<option value ="18">限制級</option>
</select>
</div>
</div>
</div>
<div class="ani-setting-item ani-flex">
<div class="ani-setting-label">
<span class="ani-setting-label__mian">空降座標</span>
</div>
<div class="ani-setting-value ani-set-flex-right">
<div class="plus-keyword-header">
<input type="text" id="plus-video-fastforward-minute" class="plus-video-fastforward ani-input--keyword" disabled placeholder="00" onKeypress="if (event.keyCode < 48 || event.keyCode > 57) event.returnValue = false;">：
<input type="text" id="plus-video-fastforward-second" class="plus-video-fastforward ani-input--keyword" disabled placeholder="00" onKeypress="if (event.keyCode < 48 || event.keyCode > 57) event.returnValue = false;">
<input id="plus-video-fastforward-sendout" class="plus-bluebtn" value="降落" disabled type="submit" style="border:2px blue none;">
</div>
</div>
</div>
<div class="ani-setting-item">
<div class="ani-setting-label">
<span class="ani-setting-label__mian">空降足跡<font size="2">(點擊降落)</font></span>
<span class="plus_explain"><span>說明：<br>運作原理是取所有彈幕文字並利用關鍵字篩選<br>如果有在自訂過濾關鍵字新增"空降"or"座標"和開啟自動過濾<br>結果會不同</span></span>
<div class="ani-setting-value ani-set-flex-right">
<span class="plus_k-label">確認座標<span>說明：已回報的座標</span></span>
<span class="plus_k-label" style="background:#bbbbbb;">其它座標<span>說明：<br>其它座標又稱未確定座標，有可能的原因是紀念觀賞時間<br>或未放入"空降"or"座標"關鍵字</span></span>
<button class="plus_refresh"><i class="plus_material-icons">refresh</i></button>
</div>
</div>
<div class="plus_time_body"></div>
</div>
</div>
`);

//分級鎖定介面HTML
$('.video').append(`
<div class="plus-frame" style="display:none">
<div class="plus-message">
<div class="plus-box">
<input type="password" id="plus-password3"  class="plus-input plus-input--keyword" placeholder="輸入密碼解除鎖定">
<a id="plus-password-enter" href="#" role="button" class="pluss-bluebtn" >確定</a>
</div>
</div>
</div>
`);

//分級鎖定介面CSS
$('head').append(`
<style>
.ani-select {
display: inline-block;
padding: 0 8px;
height: 30px;
border: 1px solid #ddd;
box-sizing: border-box;
border-radius: 4px;
font-size: 16px;
vertical-align: middle;
}
.plus-keyword-header {
display: flex;

}
.plus-keyword-header .plus-bluebtn {
flex: 0 0 auto;
position: relative;
display: inline-block;
padding: 6px 12px;
font-size: 13px;
border-radius: 4px;
vertical-align: middle;
}
.plus-bluebtn {
border-radius: 10px;
padding: 12px;
text-align: center;
text-decoration: none;
color: #fff;
margin: 0px 7px 0 0;
background: #00B4D8;
display: inline-block;
font-size: 1.3em;
}

.plus-bluebtn:disabled{
background-color:#ebebe4;
color: #757575;
}

.ani-select:disabled{
background-color:#ebebe4;
}

.plus-input {
display: inline-block;
margin: 0 8px 0 0;
padding: 0 8px;
height: 30px;
border: 1px solid #ddd;
box-sizing: border-box;
border-radius: 4px;
font-size: 16px;
vertical-align: middle;
width: 165px;
}
.plus-message {
z-index: 1000;
top: 310px;
width: 100%;
height: 538px;
padding: 10px;
background: #000000cf;
box-shadow: 0 0 5px 0px rgba(0, 0, 0, 0.2);
left: 0px !important;
display: flex;
flex-wrap: wrap;
align-items: center;
justify-content: center;
}
.plus-frame {
position: relative;
z-index: 72;
}
.pluss-bluebtn{
width: 55px;
height: 30px;
padding: 10px 12px;
font-size: 13px;
border-radius: 4px;
vertical-align: middle;
text-align: center;
text-decoration: none;
color: #fff;
background: #00B4D8;
}
.plus-box {
height: 100px;
background: #fff;
width: 415px;
display: flex;
justify-content: center;
align-items: center;
border-radius: 4px;
}

.plus-input.plus-input--keyword {
max-width: 300px;
margin: 0px 8px 0px 8px;
}


.plus-video-fastforward {
display: inline-block;
margin: 0 8px 0 0;
padding: 0 8px;
height: 30px;
border: 1px solid #ddd;
box-sizing: border-box;
border-radius: 4px;
font-size: 16px;
vertical-align: middle;
width: 71px;
}

</style>
`);


//網頁全螢幕
var Switch = true;
window.qtimer = setInterval(function(){
    if($(".R18").length == 0 && $(".plus-frame").length == 0){
        $(".vjs-fullscreen-control").after('<label><div class="plus_Web_fullscreen_icon" id="plus_Web_fullscreen" title="網頁全螢幕"><span>網頁全螢幕</span><input type="button" id="Web_fullscreen" style="display: none;" value="網頁全螢幕"></div></label>');
        clearInterval(window.qtimer);
    }

    $("#Web_fullscreen").click(function(){
        if(Switch){
            Switch = false;
            var win_height = $(window).height();
            var win_width = $(window).width();
            $("body").after('<div id="Web_fullscreen_style"></div>');
            $("#animeTip").css("bottom","-40px");
            $("html").css({"overflow-y":"hidden","overflow-x":"hidden"});
            $(".vjs-indent-button").css("display","none");
            $(".plus_Web_fullscreen_icon").css({"color":"#fff","background":"#333"});
            $(".vjs-danmu").css("perspective","805.536px");
        }else{
            Switch = true;
            $("#Web_fullscreen_style").remove();
            $("#animeTip").css("bottom","0px");
            $("html").css({"overflow-y":"unset","overflow-x":"unset"});
            $(".videoframe").css({"height":"","width":"","margin":""});
            $(".vjs-indent-button").css("display","unset");
            $(".plus_Web_fullscreen_icon").css({"color":"","background":""});
            $(".vjs-danmu").css("perspective","401.09px");
        }

        $(document).keydown(function(e) {
            if(e.keyCode == 27 && !Switch){
                Switch = true;
                $("#Web_fullscreen_style").remove();
                $("#animeTip").css("bottom","0px");
                $("html").css({"overflow-y":"unset","overflow-x":"unset"});
                $(".videoframe").css({"height":"","width":"","margin":""});
                $(".vjs-indent-button").css("display","unset");
                $(".plus_Web_fullscreen_icon").css({"color":"","background":""});
                $(".vjs-danmu").css("perspective","");
            }
        });


        $(window).resize(function() {
            if(!Switch){
                var win_height = $(window).height();
                $(".videoframe").css("height",(win_height-40)+"px");
            }
        });

        //網頁全螢幕CSS
        $('#Web_fullscreen_style').append(`
<style>

.container-player {
max-width: unset !important;

}

.player {
padding-top: 0 !important;
margin-top: 0 !important;
z-index: 999 !important;
position: fixed !important;
}

.videoframe {
width: 100% !important;
height: `+(win_height-40)+`px;
margin: auto !important;
}


.video {
width: 100% !important;
height: 100% !important;
position: unset !important;
padding-bottom: unset !important;
}

.BH_background {
margin-top: unset !important;
position: relative position: fixed
}

@media (min-width: 1000px)
.BH_background {
margin-top: unset !important;
}

.sky {
display: none !important;
}

.mainmenu {
display: none !important;
}

.subtitle {
display: none !important;
}

</style>
`);
    });
},2000);

//在全螢幕環境下發送彈幕
$(document).on("mozfullscreenchange webkitfullscreenchange fullscreenchange", fullscreenChange);
function fullscreenChange(){
    var isFullScreen = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
    var fullScreen_bullet_send =  '<label id="plus_fullScreen-bullet-send"><div class="plus_bullet-send_icon"><span>發送彈幕<br>左右兩側可以拖移輸入框</span><input type="button" style="display: none;" value="發送彈幕" onclick="$(\'#plus_bullet-send\').slideToggle(0);"></div></label>';
    if(isFullScreen){
        plus_bullet_control();
        plus_bullet_save();
        $('#danmutxt').keydown(function(event){
            event.stopPropagation();
        });
        $(".vjs-danmu-button").after(fullScreen_bullet_send);
        $(".plus_Web_fullscreen_icon").css("display","none");
        $(".bullet-send").draggable({
            containment: "html",
            stop: function () {
                var top = $("#plus_bullet-send").css("top");
                var win_height = $(window).height();
                if(parseInt(top) > (win_height - 100)){
                    $("#plus_bullet-send").css("top",(win_height - 100));
                }
                var top_save = $("#plus_bullet-send").css("top");
                var left_save = $("#plus_bullet-send").css("left");
                GM_setValue('top_save',top_save);
                GM_setValue('left_save',left_save);
            }
        });

        $("input[type='button']").click(function(){
            $("#plus_bullet-control").css("display","none");
            $("#danmutxt").focus();
        });
    }else{
        $("#plus_bullet-send").remove();
        $("#plus_bullet-control").remove();
        $(".bullet-control").css("display","none");
        $(".plus_Web_fullscreen_icon").css("display","");
        $("#plus_fullScreen-bullet-send").remove();
    }
}


function plus_bullet_control(){
    var bullet_send =  '<div class ="bullet-send" id="plus_bullet-send" style="display:none; box-shadow: rgba(0, 0, 0, 0.19) 0px 0px 3px 1px;">'+$(".bullet-send").html()+'</div>';
    var bullet_control =  '<div class ="bullet-control" id="plus_bullet-control" style="display: none;">'+$(".bullet-control").html()+'</div>';
    $("video").after(bullet_send);
    $("video").after(bullet_control);
    $("#plus_bullet-send").addClass("plus_bullet-send");
    $("#plus_bullet-control").addClass("plus_bullet-control");
}

function  plus_bullet_save(){
    var top_save = GM_getValue("top_save")
    var left_save = GM_getValue("left_save")
    if(top_save == null || left_save == null ){
        $("#plus_bullet-send").css("top","0px");
        $("#plus_bullet-send").css("left","0px");
        GM_setValue('top_save',"0px");
        GM_setValue('left_save',"0px");
    }else{
        $("#plus_bullet-send").css("top",top_save);
        $("#plus_bullet-send").css("left",left_save);
    }
}


var ncc_warning_save = GM_getValue("ncc_warning");
var password_save = GM_getValue('password_save');
var grading_save = GM_getValue('grading_save');
var video_next_skip = GM_getValue('video_next');

if(ncc_warning_save == null)ncc_warning_save = GM_setValue('ncc_warning','false');
if(grading_save == null)grading_save = GM_setValue('grading_save','none');
if(video_next_skip == null)video_next_skip = GM_setValue('video_next','false');

var grading_bool = false,video_next_bool = false;
var sn = animefun.videoSn,deviceid = animefun.getdeviceid();


$("#video_next_skip").change(function() {
    GM_setValue('video_next',!video_next_bool);
    video_next_bool = !video_next_bool;
    $("#plussetup").css("display","block");
    setTimeout(function(){$("#plussetup").css("display","none")},3000);
});



function token(){
    var vip,login;
    $.ajax({
        url: 'ajax/token.php',
        data: { sn: sn, device: deviceid},
        type: "GET",
        async: false,
        success: function(t) {
            var e = jQuery.parseJSON(t);
            vip = e.vip;
            login = e.login;
        }
    });
    return [vip,login];
}


$("#grading").change(function() {
    GM_setValue('ncc_warning',!grading_bool);
    grading_bool = !grading_bool;
    $("#plussetup").css("display","block");
    setTimeout(function(){$("#plussetup").css("display","none")},3000);
});

if(ncc_warning_save){
    grading_bool = true;
    let rating_img = $(".rating > img").attr("src");
    let img_cut = rating_img.substr(30);
    $("#grading").prop("checked",true);
    window.ncc = setInterval(function(){
        if($(".R18").length > 0 && $(".plus-frame").length == 0){
            if(img_cut !='TW-18UP.gif'|| token()[1] == 1){
                $("#adult").click();
            }
            clearInterval(window.ncc);
        }
    },1000);
}

//影片速度
$("#void_speed").change(function(){
    var void_speed =  $("#void_speed").find(":selected").val();
    $("#ani_video_html5_api").get(0).playbackRate = void_speed;
});

//自動切換至下一集
if(video_next_skip){
    video_next_bool = true;
    $("#video_next_skip").prop("checked",true);
    setTimeout(function(){$("#ani_video").append('<div class="video-next-button" id="ani_video-next" style="display:none"></div>')},1000);
}

var te = 5;
function t(){
    var ended = $("#ani_video_html5_api").get(0).ended;
    var nextplayer = $('.playing').next().html();
    var match = (nextplayer!=null)?nextplayer.match('<a href="(.*)">')[1]:null;
    if(ended && match != null){
        if(!te)document.location.href="https://ani.gamer.com.tw/animeVideo.php"+match
        $("#ani_video-next").css("display",'unset');
        $("#ani_video-next").html('0'+te+' 秒後切換至下一集<span id="stop_video-next" style="cursor:pointer">　X</span>');
        te-=1;
    }else{
        $("#ani_video-next").css("display",'none');
        te = 5;
    }
    $("#stop_video-next").click(function(){$("#ani_video-next").remove();clearInterval(window.videoend);});
}

setTimeout(function(){
    window.initial = setInterval(function(){
        var src = $("#ani_video_html5_api").attr("src");
        var readyState = $("#ani_video_html5_api").get(0).readyState;
        if($(".R18").length == 0 && $(".vast-skip-button").length == 0 && src.indexOf("fbcdn.net") == -1 && readyState != 0){
            if(video_next_skip){
                window.videoend = setInterval(function(){if(animefun.nextSn!=0){t()}else{clearInterval(window.videoend);}},1000)
            }
            $("#plus-video-fastforward-minute").attr("disabled",false);
            $("#plus-video-fastforward-second").attr("disabled",false);
            $("#plus-video-fastforward-sendout").attr("disabled",false);
            $("#void_speed").attr("disabled",false);
            $(".plus_keyword-label").css("cursor","pointer");
            clearInterval(window.initial);
        }else{
            $(".plus_keyword-label").css("cursor","no-drop");
        }
    },1000);
},1000);

function fastforward(minute,second){
    var video_minute = parseInt(minute) || 0;
    var video_second = parseInt(second) || 0;
    if((video_minute*60) + video_second < $("#ani_video_html5_api").get(0).duration){
        $("#ani_video_html5_api").get(0).currentTime = (video_minute*60) + video_second;
    }else{
        alert("未知的座標，空降失敗");
    }
}

$('#plus-video-fastforward-sendout').on('click', function() {
    var minute = $("#plus-video-fastforward-minute").val();
    var second = $("#plus-video-fastforward-second").val();
    fastforward(minute,second);
    $("#plus-video-fastforward-minute").val("");
    $("#plus-video-fastforward-second").val("");
});

function Asc(obj){
    var text = obj;
    var asciiTable = "!\"#$%&\’()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
    var big5Table = "%uFF01%u201D%uFF03%uFF04%uFF05%uFF06%u2019%uFF08%uFF09%uFF0A%uFF0B%uFF0C%uFF0D%uFF0E%uFF0F%uFF10%uFF11%uFF12%uFF13%uFF14%uFF15%uFF16%uFF17%uFF18%uFF19%uFF1A%uFF1B%uFF1C%uFF1D%uFF1E%uFF1F%uFF20%uFF21%uFF22%uFF23%uFF24%uFF25%uFF26%uFF27%uFF28%uFF29%uFF2A%uFF2B%uFF2C%uFF2D%uFF2E%uFF2F%uFF30%uFF31%uFF32%uFF33%uFF34%uFF35%uFF36%uFF37%uFF38%uFF39%uFF3A%uFF3B%uFF3C%uFF3D%uFF3E%uFF3F%u2018%uFF41%uFF42%uFF43%uFF44%uFF45%uFF46%uFF47%uFF48%uFF49%uFF4A%uFF4B%uFF4C%uFF4D%uFF4E%uFF4F%uFF50%uFF51%uFF52%uFF53%uFF54%uFF55%uFF56%uFF57%uFF58%uFF59%uFF5A%uFF5B%uFF5C%uFF5D%uFF5E";
    var result = "";
    for (var i = 0; i < text.length; i++) {
        var val = escape(text.charAt(i));
        var j = big5Table.indexOf(val);
        result += (((j > -1) && (val.length == 6)) ? asciiTable.charAt(j / 6) : text.charAt(i));
    }
    return result;
}



//json清除重複
function filter(arr,attr){
    var tmp = {},re = [],len = arr.length;
    for(var i=0;i<len;i++){
        if(!(arr[i][attr] in tmp)) re.push(arr[i]);
        tmp[arr[i][attr]] = 1;
    }
    return re;
}

//json排序
function JsonSort(json,key){
    for(var j=1; j < json.length; j++){
        var temp = json[j],val = temp[key],i = j-1;
        while(i >=0 && json[i][key]>val){
            json[i+1] = json[i];
            i = i-1;
        }
        json[i+1] = temp;
    }
    return json;
}

//空降足跡解析影片時間
function f(stringasc,array,bool){
    var match = stringasc.match(/[0-9]+:[0-9]+/g);
    for(var id in match){
        var split = match[id].split(":");
        var match1 = split[0].match(/[0-9]{2,3}/g),match2 = split[1].match(/[0-9]{2,3}/g);
        var minute = (!match1)? "0"+split[0]:split[0], second = (!match2)? "0"+split[1]:split[1];
        var addjson = {"airborne":bool,"time":minute+":"+second};
        array.push(addjson);
    }
}


function fastforward_skip(match,key){
    $("#fastforward_id_"+key).click(function(){
        var src = $("#ani_video_html5_api").attr("src");
        var readyState = $("#ani_video_html5_api").get(0).readyState;
        if($(".R18").length == 0 && $(".vast-skip-button").length == 0 && src.indexOf("fbcdn.net") == -1 && readyState != 0){
            var split = match.split(":");
            fastforward(split[0],split[1]);
        }
    });

}

//空降足跡
function danmuGet(){
    var array= [];
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://ani.gamer.com.tw/ajax/danmuGet.php",
        "method": "POST",
        "data": {
            "sn": animefun.videoSn
        }
    }
    $.ajax(settings).done(function (response) {
        for(var key in response){
            var stringasc = Asc(response[key].text);
            var a = stringasc.match(/[0-9]{1,3}:[0-9]{1,3}/g);
            if( stringasc.indexOf("空降") != "-1" || stringasc.indexOf("座標") != "-1"){
                f(stringasc,array,true);
            }else if(a){
                f(stringasc,array,false);
            }
        }
        var deduped = filter(array,'time') //清除重複
        var json = JsonSort(deduped,'time') //排序
        if(json.length){
            for(var arrayid in json){
                if(json[arrayid].airborne){
                    $(".plus_time_body").append('<span class="plus_keyword-label" "style="cursor:pointer"><span id="fastforward_id_'+arrayid+'">'+json[arrayid].time+'</span></span>')
                }else{
                    $(".plus_time_body").append('<span class="plus_keyword-label" style="cursor:pointer;background:#bbbbbb;"><span id="fastforward_id_'+arrayid+'">'+json[arrayid].time+'</span></span>')
                }
                fastforward_skip(json[arrayid].time,arrayid);
            }
        }else{
            $(".plus_time_body").html('<ul class="plus_no_sub"><img src="https://i2.bahamut.com.tw/anime/no_sub.png"style="width: 33%;"><br>目前沒有人嘗試空降<br>發個彈幕報告空降座標吧！</ul>')
        }
    });
}


//延遲1秒載入
setTimeout(function(){
    //載入空降足跡
    danmuGet();
    //空降足跡重整
    $(".plus_refresh,#bahablack,.bluebtn").click(function(){
        $(".plus_keyword-label").remove();
        setTimeout(function(){danmuGet()},1000)
    });
},1000)

//分級鎖定功能
if(password_save != null  ){
    $("#plus-value").remove();
    $("#plus-value2").css("display",'unset');

}

if(grading_save == null){
    $(".plus-frame").remove();
}

var grading_selected = $('#grading-password').val(grading_save);
if($('#grading-password').val() != "none"){
    let rating_img = $(".rating > img").attr("src");
    let img_cut = rating_img.substr(30);
    $(".plus-frame").css("display",'block');
    switch (grading_save) {
        case '6' : if(img_cut == 'TW-ALL.gif')$(".plus-frame").remove();break;
        case '12' : if(img_cut =='TW-ALL.gif'|| img_cut == 'TW-6TO12.gif')$(".plus-frame").remove();break;
        case '15' : if(img_cut == 'TW-ALL.gif' || img_cut == 'TW-6TO12.gif' || img_cut == 'TW-12TO18.gif')$(".plus-frame").remove();break;
        case '18' : if(img_cut !='TW-18UP.gif')$(".plus-frame").remove();break;
    }
}else{
    $(".plus-frame").remove();
}

var grading = $("#grading-password").find(":selected").val();
$("#grading-password").change(function(){
    grading = $("#grading-password").find(":selected").val();
    GM_setValue('grading_save',grading);
    $("#plussetup").css("display","block");
    setTimeout(function(){$("#plussetup").css("display","none")},3000);
});

//首次設定密碼
$('#plus-password-setup').on('click', function() {
    var first_time_password = $("#plus-password").val();
    var password_save = GM_getValue('password_save');
    if(first_time_password != "" ){
        $("#plus-value").remove();
        $("#plus-value2").css("display",'unset');
        GM_setValue('password_save',btoa(first_time_password));
        $(".plussetup").css("display","block");
        setTimeout(function(){$(".plussetup").css("display","none")},3000);
    }else{
        alert("請輸入密碼");
    }
});

//輸入密碼設定
$('#plus-password-enter-setup').on('click', function() {
    var enter_password_setting = $("#plus-password2").val();
    if(!enter_password_setting){
        alert("請輸入密碼");
    }else {
        var password_save = GM_getValue('password_save');
        if(password_save == btoa(enter_password_setting)){
            $("#plus-value2").remove();
            $("#ncc-password").css("display",'unset');
        }else{
            alert("密碼錯誤");
        }
    }
});

//輸入密碼解除
$('#plus-password-enter').on('click', function() {
    var enter_the_password = $("#plus-password3").val();
    var password_save = GM_getValue('password_save');
    if(!enter_the_password){
        alert("請輸入密碼");
    }else if(password_save == btoa(enter_the_password)){
        $(".plus-frame").remove();
    }else{
        alert("密碼錯誤");
    }
});

//添加分級圖片
var rating_img1 = $(".rating > img").attr("src");
$('.plus-box').prepend('<img src="'+rating_img1+'">');

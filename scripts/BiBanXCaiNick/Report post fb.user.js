// ==UserScript==
// @name         Report post fb
// @namespace    https://greasyfork.org/vi/scripts/38113-report-post-fb
// @version      1.0.3
// @description  Script report bài viết cho facebook. Để report hãy vào trang chủ của facebook và nhìn sang góc trên bên phải
// @author       You
// @include      /.*://www\.facebook\.com/?/
// @match        *://*.facebook.com/beatvn.page*
// @match        *://*.facebook.com/beatvn.troll*
// @match        *://*.facebook.com/zoom.beatvn*
// @match        *://*.facebook.com/beatvn.quotes*
// @match        *://*.facebook.com/beatvn.world*
// @match        *://*.facebook.com/beatvn.video*
// @match        *://*.facebook.com/BeatVN.sport*
// @run-at       document-start
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @require      https://greasyfork.org/scripts/37907-arrive-js/code/arrivejs.js?version=246397
// @grant        none
// ==/UserScript==

const AUTO_REPORT = true;
const MIN = 20; // số phút tối thiểu để auto rp
const MAX = 30; // số phút tối đa auto rp
const BREAK_TIME = 60 // số giây nghỉ mỗi lần dùng lệnh break


function report_time() {
    return Math.round(Math.random() * (MAX - MIN) + MIN)*1000*60;
}

function xoa_dau(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/\s+/g, ' ');
    return str.trim();
}
function parse_request(str) {
    var tag = "";
    if (str.match(/khoa than/i)) {tag='#tag_nudity';}
    else if (str.match(/bao luc/i)) {tag='#tag_violence';}
    else if (str.match(/quay roi/i)) {tag='#tag_harassment';}
    else if (str.match(/tu tu|thuong tich/i)) {tag='#tag_suicide';}
    else if (str.match(/spam/i)) {tag='#tag_spam';}
    else if (str.match(/ban hang/i)) {tag='#tag_unauthorized_sales';}
    else if (str.match(/kich dong/i)) {tag='#tag_hate_speech';}
    return tag;
}
function report() {
    $(document).arrive('._4xev._p', {onceOnly:true},function(){
        document.querySelector('._4xev._p').click();
    });
    $(document).arrive('[href^="/rapid_report"]', {onceOnly:true},function(){
        document.querySelector('[href^="/rapid_report"]').click();
    });
    $(document).arrive('._59s7', {onceOnly:true},function(){
        for (var i=0;i<tags.length;i++) {
            document.querySelector(`[for="${tags[i]}"] span`).click(); //es6
        }
        document.querySelector('button._4jy0._4jy3._4jy1').click();
        console.log(tags);
    });
    $(document).arrive('.layerCancel._4jy0._4jy3', {onceOnly:true},function(){ window.close();});
}
var clicked = false;
if (window.location.href === "https://www.facebook.com/" || window.location.href === "https://www.facebook.com") {
    //styling
    $('head').after(`<report><style>.modal{display:none;position:fixed;z-index:99999;padding-top:100px;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:rgb(0,0,0);background-color:rgba(0,0,0,0.4)}.modal-content{background-color:#fefefe;margin:auto;padding:20px;border:1px solid #888;width:60%}.close{color:#aaa;float:right;font-size:28px;font-weight:bold}.close:hover,.close:focus{color:#000;text-decoration:none;cursor:pointer}</style><button id="rp-button" class="btn btn-info btn-lg" style="position:fixed;top:5px;right:5px;border:1px solid #472fa7;height:30px;border-radius:10px;z-index:99999">REPORT POST</button><div id="myModal" class="modal"><div class="modal-content"> <span class="close">&times;</span><div>Nhập nội dung cần report (lấy ở <a href="https://pastebin.com/raw/dZRNzjPe" target="blank">đây</a>)</div><div style="color:red"><b>Hãy để tab report này tại cửa sổ khác!</b></div><div>Auto report: <b>${AUTO_REPORT ? 'ON' : 'OFF'}</b></div><textarea id="rp-list" style="min-width:100%;min-height:200px"></textarea><button class="send-report">Tiến hành report</button></div></div> </report>`);
    var modal = document.getElementById('myModal');
    var btn = document.getElementById("rp-button");
    var span = document.getElementsByClassName("close")[0];
    btn.onclick = function() {
        modal.style.display = "block";
    };
    span.onclick = function() {
        modal.style.display = "none";
    };
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
    $('.send-report').click(function(e){
        if(AUTO_REPORT && !clicked) {
            setTimeout(() => {$('.send-report').click();}, report_time());
            clicked = true;
            alert(`Tool sẽ tự động report trong khoảng ${MIN} đến ${MAX} phút`);
        } else if(AUTO_REPORT && clicked && e.originalEvent !== undefined) {
            alert('Tool đã tự động report, bạn không cần ấn report nữa.');
            return null;
        } else if(AUTO_REPORT && clicked && e.originalEvent === undefined) {
            setTimeout(() => {$('.send-report').click();}, report_time());
        }
        var list = $('#rp-list').val().split("\n");
        for (var i=0; i<list.length;i++) {
            if (/^\s*\/\//ig.test(list[i]) || !/\S/ig.test(list[i])){
                list.splice(i, 1);
                i--;
            } else if (!/\s*http.+\|.*\w+|break/ig.test(list[i])) {
                alert('Nhập vào không hợp lệ');
                return null;
            }
        }
        list = list.map(x => x.split('|')); //this is es6
        console.log(list);
        var delay=0;
        for (i=0;i<list.length;i++) {
            let url = list[i][0].replace(/\s+/g, '').replace(/\/$/, '');
            if (/^break$/i.test(url)) {
                delay++;
                continue;
            }
            for (var j=1;j<list[i].length;j++) {
                url += parse_request(xoa_dau(list[i][j]));
            }
            console.log(url);
            setTimeout(function(){window.open(url,'_blank');},1000*BREAK_TIME*delay);
        }
    });
}
if (/#/.test(window.location.href)) {
    var tags= window.location.href.split('#');
    tags.splice(0,1);
    if (/photos/i.test(window.location.href)){
        $(document).arrive('._3ixn', {onceOnly:true},function(){
            document.querySelector('.img.sp_7Y7GBrIbeC2.sx_f802c1').click();
        });
        $(document).leave('._3ixn', {onceOnly:true},function(){
            report();
            document.querySelector('._4xev._p').click();
        });
    } else {
        report();
    }
}
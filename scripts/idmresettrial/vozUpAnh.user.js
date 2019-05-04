// ==UserScript==
// @name         vozUpAnh
// @version      2018.06.29.01
// @description  Tính năng: Up ảnh lên imgur bằng cách kéo thả vào khung soạn thảo ở vOz.
// @author       idmresettrial
// @namespace    idmresettrial
// @icon         http://i.imgur.com/R9RENFl.png?1

// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/dropzone/4.3.0/min/dropzone.min.js
// @include      /^https?://forums\.voz\.vn/.*$/

// @run-at       document-end


// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);
// Do not run on frames or iframes
if (window.top !== window.self) {
    return;
}

document.addEventListener('DOMContentLoaded', function () {

    var textarea = $('form[name="vbform"] textarea');

    if (textarea.length) {

        var default_clientID = "bbd740858c3d3ee";
        var clientID = GM_getValue("clientID", default_clientID);

        $('head').append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/dropzone/4.3.0/min/dropzone.min.css" type="text/css" media="screen" />');
        GM_addStyle('.dropzone {background: none; border: 2px dashed #ccc; margin: 5px auto;} .dz-message {font-size: 20px; font-weight: 700; color: #999;} #vozUpAnh-status {font-size: 12px;} #vozUpAnh-error {color: red;} #vozUpAnh-error,#vozUpAnh-input {display: inline-block;}');
        textarea.parent().append('<div id="vozUpAnh" class="dropzone"><div class="dz-message">Kéo thả ảnh vào đây hoặc click để up ảnh, <br>cũng có thể copy ảnh rồi paste thẳng vào khung soạn thảo<br>(bit.ly/vozUpAnh)</div></div><div id="vozUpAnh-status"></div>');

        var vozUpAnh = new Dropzone("#vozUpAnh", {

            url: "https://api.imgur.com/3/image",
            headers: {
                Authorization: "Client-ID " + clientID,
                "Cache-Control": null,
                "X-Requested-With": null
            },
            paramName: "image",
            clickable: true,
            success: function (file, response) {
                $("#vozUpAnh-status").html("Đã chèn hình vào cuối bài viết.");
                textarea.val(function (i,v) {
                    return v + "\n" + "[img]" + response.data.link.replace("http:","https:") + "[/img]";
                });
            },
            error: function (file, response) {           
                $("#vozUpAnh-status").html('Lỗi: <div id="vozUpAnh-error">' + response.data.error + '</div><br>Thử <a href="https://api.imgur.com/oauth2/addclient" target="_blank">Đăng ký</a> 1 client_id mới<div id="vozUpAnh-input">: <input type=text value="' + clientID + '"></input><input type=button value="Set"></input></div>');
                $("#vozUpAnh-input input[type=button]").click(function () {
                    var new_value = $("#vozUpAnh-input input[type=text]").val() || default_clientID;
                    GM_setValue("clientID", new_value);
                    $("#vozUpAnh-input").append("Ok. Hãy tải lại trang.");
                });            
            }
        });

        textarea.on("paste", function(e) {
            var items = e.originalEvent.clipboardData.items;
            if (items) {
                for (i=0; i<items.length; i++) {
                    if (items[i].type.indexOf("image") !== -1) {
                        var blob = items[i].getAsFile();
                        vozUpAnh.addFile(blob);
                    }
                }
            }
        });
    }
});
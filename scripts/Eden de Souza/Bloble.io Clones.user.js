// ==UserScript==
// @name      Bloble.io Clones
// @namespace http://tampermonkey.net/
// @Version 0.2
// @description Anonymous Asks
// @author Snow Ask
// @match http://bloble.io/*
// @grant none
// @my org https://goo.gl/wUcTJ6
// @run-at context-menu
// @version 0.0.1.20180416200937
// ==/UserScript==

// Clones
function VCodeDialog(refreshVCode, confirmClick) {
var dialog, shadow;

    function createDialog() {
        var screenWidth = document.body.clientWidth;
        var dialogLeft = screenWidth > 520 ? (screenWidth - 520) / 2 : 0;
        var $dialog_div = $('<div class="dialog" id="dialog-vcode" style="width:520px;top:0px;bottom:auto;left:' + dialogLeft + 'px;right:auto;display:none;visibility:visible;z-index:52"></div>');
        var $dialog_header = $('<div class="dialog-header"><h3><span class="dialog-header-title"><em class="select-text">提示</em></span></h3></div>');
        var $dialog_control = $('<div class="dialog-control"><span class="dialog-icon dialog-close icon icon-close"><span class="sicon">x</span></span></div>');
        var $dialog_body = $('<div class="dialog-body"></div>');
        var $dialog_body_div = $('<div style="text-align:center;padding:22px"></div>');
        var $dialog_body_download_verify = $('<div class="download-verify" style="margin-top:10px;padding:0 28px;text-align:left;font-size:12px;"></div>');
        var $dialog_verify_body = $('<div class="verify-body">请输入验证码：</div>');
        var $dialog_input = $('<input id="dialog-input" type="text" style="padding:3px;width:85px;height:23px;border:1px solid #c6c6c6;background-color:white;vertical-align:middle;" class="input-code" maxlength="4">');
        var $dialog_img = $('<img id="dialog-img" class="img-code" style="margin-left:10px;vertical-align:middle;" alt="点击换一张" src="" width="100" height="30">');
        var $dialog_refresh = $('<a href="javascript:void(0)" style="text-decoration:underline;" class="underline">换一张</a>');
        var $dialog_err = $('<div id="dialog-err" style="padding-left:84px;height:18px;color:#d80000" class="verify-error"></div>');
        var $dialog_footer = $('<div class="dialog-footer g-clearfix"></div>');
        var $dialog_confirm_button = $('<a class="g-button g-button-blue" data-button-id="" data-button-index href="javascript:void(0)" style="padding-left:36px"><span class="g-button-right" style="padding-right:36px;"><span class="text" style="width:auto;">确定</span></span></a>');
        var $dialog_cancel_button = $('<a class="g-button" data-button-id="" data-button-index href="javascript:void(0);" style="padding-left: 36px;"><span class="g-button-right" style="padding-right: 36px;"><span class="text" style="width: auto;">取消</span></span></a>');

        $dialog_header.append($dialog_control);
        $dialog_verify_body.append($dialog_input).append($dialog_img).append($dialog_refresh);
        $dialog_body_download_verify.append($dialog_verify_body).append($dialog_err);
        $dialog_body_div.append($dialog_body_download_verify);
        $dialog_body.append($dialog_body_div);
        $dialog_footer.append($dialog_confirm_button).append($dialog_cancel_button);
        $dialog_div.append($dialog_header).append($dialog_body).append($dialog_footer);
        $('body').append($dialog_div);

        $dialog_div.dialogDrag();

        $dialog_control.click(dialogControl);
        $dialog_img.click(refreshVCode);
        $dialog_refresh.click(refreshVCode);
        $dialog_input.keypress(function (event) {
            if (event.which == 13)
                confirmClick();
        });
        $dialog_confirm_button.click(confirmClick);
        $dialog_cancel_button.click(dialogControl);
        $dialog_input.click(function () {
            $('#dialog-err').text('');
        });
        return $dialog_div;
    }

    this.open = function (vcode) {
        if (vcode)
            $('#dialog-img').attr('src', vcode.img);
        dialog.show();
        shadow.show();
    }
    this.close = function () {
        dialogControl();
    }
    dialog = createDialog();
    shadow = $('div.dialog-shadow');

    function dialogControl() {
        $('#dialog-img', dialog).attr('src', '');
        $('#dialog-err').text('');
        dialog.hide();
        shadow.hide();
    }
}

$.fn.dialogDrag = function () {
    var mouseInitX, mouseInitY, dialogInitX, dialogInitY;
    var screenWidth = document.body.clientWidth;
    var $parent = this;
    $('div.dialog-header', this).mousedown(function (event) {
        mouseInitX = parseInt(event.pageX);
        mouseInitY = parseInt(event.pageY);
        dialogInitX = parseInt($parent.css('left').replace('px', ''));
        dialogInitY = parseInt($parent.css('top').replace('px', ''));
        $(this).mousemove(function (event) {
            var tempX = dialogInitX + parseInt(event.pageX) - mouseInitX;
            var tempY = dialogInitY + parseInt(event.pageY) - mouseInitY;
            var width = parseInt($parent.css('width').replace('px', ''));
            tempX = tempX < 0 ? 0 : tempX > screenWidth - width ? screenWidth - width : tempX;
            tempY = tempY < 0 ? 0 : tempY;
            $parent.css('left', tempX + 'px').css('top', tempY + 'px');
        });
    });
    $('div.dialog-header', this).mouseup(function (event) {
        $(this).unbind('mousemove');
    });
       // ==UserScript==
// @name         Bloble.io Commander Factory Build
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  1 = 1st generators layer, 4 = 2nd generators layer, 2 = Simple turrets, 5 = Upgrade rangeds, 8 = Upgrade spotters, 3 = Walls, 6 = Upgrade boulders, 9 = Upgrade spikes, C = Move to commander.
// @author       ITALIA
// @match        http://bloble.io/*
// @grant        none
// ==/UserScript==

addEventListener("keydown", function(a) {
    if (a.keyCode == 97){
        for(i=-3.14;i<=3.14;i+=0.5233){
            socket.emit("1",i,132,3);
        }
    }
    if (a.keyCode == 100){
        for(i=-2.965;i<=3.14;i+=0.3488){
            socket.emit("1",i,243.85,3);
        }
    }
    if (a.keyCode == 103){
        for(i=0;i<units.length;++i){
            if(0===units[i].type&&"hexagon"==units[i].shape&&units[i].owner==player.sid){
                socket.emit("4",units[i].id,0);
            }
        }
    }
    if (a.keyCode == 98){
        for(i=-3.14;i<=3.14;i+=0.3488){
            socket.emit("1",i,194,2);
        }
    }
    if (a.keyCode == 101){
        for(i=0;i<units.length;++i){
            if(0===units[i].type&&1==units[i].turretIndex&&"circle"==units[i].shape&&units[i].owner==player.sid){
                socket.emit("4",units[i].id,1);
             }
        }
    }
    if (a.keyCode == 104){
        for(i=0;i<units.length;++i){
            if(0===units[i].type&&3==units[i].turretIndex&&"circle"==units[i].shape&&units[i].owner==player.sid){
                socket.emit("4",units[i].id,0);
            }
        }
    }
    if (a.keyCode == 99){
        for(i=-3.14;i<3.14;i+=0.216){
            socket.emit("1",i,1e3,1);
        }
    }
    if (a.keyCode == 102){
        for(i=0;i<units.length;++i){
            if(3==units[i].type&&"circle"==units[i].shape&&units[i].owner==player.sid){
                socket.emit("4",units[i].id,0);
            }
        }
    }
    if (a.keyCode == 105){
        for(i=0;i<units.length;++i){
            if(3==units[i].type&&"hexagon"==units[i].shape&&units[i].owner==player.sid){
                socket.emit("4",units[i].id,0);
            }
        }
    }
    if (a.keyCode == 67){
        for(i=0;i<units.length;++i){
            if(1==units[i].type&&"star"==units[i].shape&&units[i].owner==player.sid){
                camX = units[i].x-player.x;
                camY = units[i].y-player.y;
            }
        }
    }
});

// ==UserScript==
// @version      2.0
// @author       ING. Wuilmer Bolivar
// @match        https://freebitco.in/*
// @name         Freebitco.in auto roll 2018
// @namespace    https://greasyfork.org/users/223895
// @description  Necesita crear una cuenta para que funcione en https://freebitco.in/?r=6316189
// @license      GPL-3.0
// ==/UserScript==

(function() {
    'use strict';
var body = $('body');
var points = {};
var count_min = 1;
var reward = {};
    reward.select = function() {
        reward.points = parseInt($('.user_reward_points').text().replace(',',""));
        reward.bonustime = {};
        if ($("#bonus_container_free_points").length != 0) {
            reward.bonustime.text = $('#bonus_span_free_points').text();
            reward.bonustime.hour = parseInt(reward.bonustime.text.split(":")[0]);
            reward.bonustime.min = parseInt(reward.bonustime.text.split(":")[1]);
            reward.bonustime.sec = parseInt(reward.bonustime.text.split(":")[2]);
            reward.bonustime.current = reward.bonustime.hour * 3600 + reward.bonustime.min * 60 + reward.bonustime.sec;
        } else
            reward.bonustime.current = 0;
        console.log(reward.bonustime.current);
        if (reward.bonustime.current !== 0) {
            console.log(reward.bonustime.current);
        } else {
            if (reward.points < 12) {
                console.log("waiting for points");
            }
            else if (reward.points < 120) {
                    console.log("waiting for points 60");
                    RedeemRPProduct('free_points_1');
                }
            else if (reward.points < 600) {
                    console.log("waiting for points 120");
                    RedeemRPProduct('free_points_10');
                }
            else if (reward.points < 1200) {
                    console.log("waiting for points 600");
                    RedeemRPProduct('free_points_50');
                }
            else {
                RedeemRPProduct('free_points_100');
            }
            if ($('#bonus_span_fp_bonus').length === 0)
                if (reward.points >= 4400)
                    RedeemRPProduct('fp_bonus_1000');
        }
    };
    body.prepend(
        $('<div/>').attr('style',"position:fixed;top:45px;left:0;z-index:999;width:350px;background-color:black;color: white; text-align: left;")
            .append(
                $('<div/>').attr('id','autofaucet')
                    .append($('<p/>').attr('style','text-decoration:underline;').text("Freebitco.in auto roll by InformaticoLlanero"))
                    .append($('<p/>').text("Si le gusta, considere realizar una donación a"))
                    .append($('<p/>').text("1Kxp2KV4sMvFWybyHLr1khq3eNoLJXmUAg"))
                    .append($('<p/>').text("(Clic para copiar)"))
                    .append($('<p/>')
                    )
            ).click(function(){
            var $temp = $('<input>').val("1Kxp2KV4sMvFWybyHLr1khq3eNoLJXmUAg");
            body.append($temp);
            $temp.select();
            document.execCommand("copy");
            $temp.remove();
        })
    ).prepend($('<style/>')
        .text("#autofaucet p { margin: 0; margin-left: 2px;  text-align: left; }")
)
    setTimeout(reward.select,1000);
    setInterval(reward.select,60000);
$(document).ready(function(){
    console.log("Status: Page loaded.");
    setTimeout(function(){
        $('#free_play_form_button').click();
        console.log("Status: Button ROLL clicked.");
    }, random(2000,4000));
    setInterval(function(){
        console.log("Status: Elapsed time " + count_min + " minutes");
        count_min = count_min + 1;
    }, 60000);
    setTimeout(function(){
        $('.close-reveal-modal')[0].click();
        console.log("Status: Button CLOSE POPUP clicked.");
    }, random(12000,18000));
    setInterval(function(){
        $('#free_play_form_button').click();
        console.log("Status: Button ROLL clicked again.");
    }, random(3605000,3615000));
});
function random(min,max){
   return min + (max - min) * Math.random();
}
})();
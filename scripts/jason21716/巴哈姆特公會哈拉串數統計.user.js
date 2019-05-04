// ==UserScript==
// @name         巴哈姆特公會哈拉串數統計
// @namespace    http://www.isaka.idv.tw/
// @version      0.1
// @description  只要按一下，就可以確認每個人的留言次數了呦～
// @author       Isaka(jason21716@巴哈姆特)
// @match        https://guild.gamer.com.tw/singleACMsg.php*
// @match        http://guild.gamer.com.tw/singleACMsg.php*
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @grant        GM_xmlhttpRequest
// @grant        GM_openInTab
// ==/UserScript==
var newestContent = {};

(function() {
    'use strict';
    $('.BH-menuE').append('<li id="script_count_btn"><a>留言次數統計</a></li>');

    $('#script_count_btn').click(function(){
        var current_url = window.location.href;
        $.get( current_url , function( data ) {
            var regular_exp = /^all \+=buildReply\((\d*),\'(\w*)\',\'([^\']*)\',\'([^\']*)\',\'([^\']*)\',(\d*),(\d*),(\d*),''\);/mg;
            var m;
            var player_data = {};
            var total_num = 0;
            while ((m = regular_exp.exec(data)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (m.index === regular_exp.lastIndex) {
                    regular_exp.lastIndex++;
                }

                if( player_data[ m[2] ] != null ){
                    player_data[ m[2] ].count += 1;
                }else{
                    player_data[ m[2] ] = {};
                    player_data[ m[2] ].nickname = m[3];
                    player_data[ m[2] ].count = 1;
                }
                total_num += 1;
            }
            console.log( player_data );
            var key_arr = Object.keys(player_data);
            var result_text = '目前留言統計：\n';
            key_arr.forEach(function(element) {
                result_text += player_data[element].nickname + '(' + element + ')：' + player_data[element].count + '\n';
            });
            result_text += '總留言數：' + total_num;
            alert(result_text);
        });
    });

})();
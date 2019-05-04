// ==UserScript==
// @name         Steam好友列统计好友游戏中，在线，离线数量
// @namespace    http://blog.853lab.com/
// @version      0.1
// @description  Show Friends number.
// @author       Sonic853
// @include		*://steamcommunity.com/id/*/friends/
// @include		*://steamcommunity.com/profiles/*/friends/
// @grant        none
// ==/UserScript==

var I = document.getElementById("search_results").getElementsByClassName("in-game").length/2;
var Like = document.getElementById("search_results").getElementsByClassName("online").length/2;
var EdmundDZhang = document.getElementById("search_results").getElementsByClassName("friend_block_v2").length;
//alert(document.getElementById("search_results").getElementsByClassName("friend_block_v2").length);
document.getElementById("state_in-game").innerHTML += ' '+ I;
document.getElementById("state_online").innerHTML += ' '+ Like;
document.getElementById("state_offline").innerHTML += ' '+ (EdmundDZhang-(I+Like));
if(document.getElementById("friends_list").getElementsByClassName("profile_friends title")[0].getElementsByClassName("friends_limit").length == 0){
    document.getElementById("friends_list").getElementsByClassName("profile_friends title")[0].innerHTML += ' <span class="friends_limit"><span style="color:#90ba3c;">' + I + '游戏</span><span style="color:#57cbde;">' + Like + '在线</span><span style="color:#898989;">'+ (EdmundDZhang-(I+Like)) +'离线</span></span>';
}else{
    var I_Like_EdmundDZhang = document.getElementById("friends_list").getElementsByClassName("profile_friends title")[0].getElementsByClassName("friends_limit")[0].innerText;
    document.getElementById("menu_friends_ct").innerHTML += ' / '+ I_Like_EdmundDZhang;
    document.getElementById("friends_list").getElementsByClassName("profile_friends title")[0].innerHTML = '好友 <span class="friends_limit"><span style="color:#90ba3c;">' + I + '游戏</span><span style="color:#57cbde;">' + Like + '在线</span><span style="color:#898989;">'+ (EdmundDZhang-(I+Like)) +'离线</span>'+ (I_Like_EdmundDZhang-EdmundDZhang) +'空位</span>';
}
//document.getElementsByClassName("profile_small_header_text")[0].innerHTML += '<div class="friends_limit_details"><div><strong title="' + I + '人游戏中"><span style="color:#ebebeb;">好友</span> <span style="color:#90ba3c;">' + I + '人游戏中</span> / ' + (I+Like) + '在线</strong> / ' + (EdmundDZhang-(I+Like)) + '离线 / ' + EdmundDZhang + '</div></div>';
//document.getElementsByClassName("profile_small_header_text")[0].innerHTML += '<div class="friends_limit_details"><div><strong>好友 </strong>' + EdmundDZhang + '</div></div>';
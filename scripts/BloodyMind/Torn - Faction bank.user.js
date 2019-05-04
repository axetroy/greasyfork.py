// ==UserScript==
// @name            Torn - Faction bank
// @description     Shows faction member's donation info
// @author          BloodyMind [1629016]
// @namespace       https://greasyfork.org/users/5563-bloody
// @version         1.1.0
// @match           *://www.torn.com/factions.php?step=your*
// @match           *://torn.com/factions.php?step=your*
// @grant           none
// ==/UserScript==

function convertToNumber(money){
    return parseInt(Number(money.replace(/[^0-9-\.]+/g,"")));
}
function formatNumber(number){
    return  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
$.ajaxSetup({
    dataFilter: function(data, type) {
        if (data.indexOf('<div class="faction-info-wrap ">') === 0) {
            data = $.parseHTML(data);
            $.ajax({
                url: '/temp_factiondonations.php',
                type: 'get',
                async: false,
                success: function(response) {
                    var totalMoney=0,totalPoint=0;
                    response = $($.parseHTML(response)).find('tr:not(:first-child)');
                    for (var i = 0; i < response.length; i++) {
                         var userMoney=0,userPoint=0;
                        userMoney=$(response[i]).children().eq(2).text().trim();
                        userPoint=$(response[i]).children().eq(3).text().trim();
                        totalMoney+=convertToNumber(userMoney);
                        totalPoint+=convertToNumber(userPoint);
                        $(data).find('span.m-hide a.user.name[href="/profiles.php?XID=' + $(response[i]).children().eq(0).text().trim() + '"]').parent().parent().parent().find('div.member-icons ul').append((userMoney === '$0' ? '' : ('<li id="icon28" class="iconShow" style="margin-bottom: 0px;" title="<b>Money</b><br>' + userMoney + '</b>"></li>')) + (userPoint === '0' ? '' : ('<li id="icon54" class="iconShow" style="margin-bottom: 0px;" title="<b>Points</b><br>' + userPoint + '</b>"></li>')));
                    }
                    $INFO=$(data).find('ul.f-info.right li:first-child');
                    $INFO.prop('title',$INFO.prop('title') + '</br>Current members money: $' + formatNumber(totalMoney));
                    $INFO=$(data).find('ul.f-info.right li:nth-child(2)');
                    $INFO.prop('title',$INFO.prop('title') + 'Current members points: ' + formatNumber(totalPoint));
                    return $(data).html();
                }
            });
        }
        return data;
    }
});

// ==UserScript==
// @name           [1180] fast links
// @namespace      berkut009
// @description    fast links - помощник для паучков
// @version        1.5
// @homepage       http://userscripts.org/scripts/show/173761
// @include        http://*heroeswm.ru/clan_info.php*
// @include        http://178.248.235.15/clan_info.php*
// @include        http://209.200.152.144/clan_info.php*
// @include        http://*.lordswm.com/clan_info.php*
// @include        http://*герои.рф/clan_info.php*
// ==/UserScript==


// (c) 2013 + mod, berkut009  ( http://www.heroeswm.ru/pl_info.php?id=1872315 )




var clan_web_offline = document.querySelectorAll("img[src$='clans/offline.gif']");

var web_table = clan_web_offline[0];


 {

while ( web_table.tagName.toLowerCase()!='tr' ) { web_table = web_table.parentNode; }


var web_table_parent = document.querySelector("a[href^='pl_info.php?id=372083']");
while ( web_table_parent.tagName.toLowerCase()!='tr' ) { web_table_parent = web_table_parent.parentNode; }



var web_table = document.createElement('tr');

var web_hide_parent = web_table_parent.previousSibling.firstChild;




web_table_parent.parentNode.insertBefore(web_table, web_table_parent);




if ( location.search.match('1180') ) {
var st_author = '<p align="left"><b>Быстрые ссылки:</b></p>';




var web_table_html = '<td colspan="2" class="wbwhite"><table width="100%" height="100%"><tr><td width="40%" valign="top" style="border-right:1px #5D413A solid;">';


web_table_html += '<table width="100%" cellpadding="5"><tr><td align="left">';

web_table_html += '<font color="blue"><b>Ссылки по клану:</b></font>';

web_table_html += '</td></tr><tr><td align="left" style="white-space:nowrap">';



web_table_html += '<li><a style="text-decoration: none;" href="forum_messages.php?tid=926425&page=last">Форум клана</a></li>';
web_table_html += '<li><a style="text-decoration: none;" target="_blank" href="http://1180.zz.vc">Памятка бойцам по боям</a></li>';

web_table_html += '<br><font color="blue"><b>Статистика:</b></font><br><br>';    
web_table_html += '<li><a style="text-decoration: none;" target="_blank" href="http://hwmguide.ru/services/clan_stats/1180">Статистика на гайде</a></li>';
web_table_html += '<li><a style="text-decoration: none;" target="_blank" href="http://web-spider.clan.su/index/statistika_klana/0-15">Статистика клана</a></li>';    
    
    


web_table_html += '</td></tr><tr><td>';



web_table_html += '</td></tr></table></td>';
web_table_html += '<td valign="top" height="100%" width="30%" style="border-right:1px #5D413A solid;">';

web_table_html += '<table width="100%" cellpadding="5"><tr><td align="left">';



web_table_html += '<font color="blue"><b>Сервис-помощь:</b></font>';    
web_table_html += '<tr><td valign="top" align="left" >';



web_table_html += '<li><a style="text-decoration: none;" target="_blank" href="http://hwmlinks.ru/gsale.html">Сервис сдачи в гос</a></li>';
web_table_html += '<li><a style="text-decoration: none;" target="_blank" href="http://bizzle.ru/hwm/clans">Статистика по БС</a></li>';
//web_table_html += '<li><a style="text-decoration: none;" target="_blank" href="http://kekus.de/klaninfo">Статистика боев в клане</a></li>';
web_table_html += '<li><a style="text-decoration: none;" target="_blank" href="http://www.witchhammer.ru/news.php">Молот ведьм</a></li>';
web_table_html += '<li><a style="text-decoration: none;" target="_blank" href="http://lgnd.ru/">lgnd.ru ( леджент.ру)</a></li>';
web_table_html += '<li><a style="text-decoration: none;" target="_blank" href="http://web-spider.clan.su/">Клановый сайт</a></li>';
web_table_html += '<li><a style="text-decoration: none;" target="_blank" href="http://daily.heroeswm.ru/">HWM DAILY</a></li>';    



web_table_html += '</td></tr></table></td>';

web_table_html += '<td valign="top" height="100%" width="30%">';

web_table_html += '<table width="100%" height="100%" cellpadding="5"><tr><td align="left">';


web_table_html += '» <b>Кузнецы клана:</b>';
web_table_html += '<tr><td valign="top" align="left" >';



web_table_html += '<li><b><font color="blue">90%</font></b> <a style="text-decoration: none;" href="pl_info.php?id=641808">ВиктСиль</a></li>';
web_table_html += '<li><b><font color="blue">90%</font></b> <a style="text-decoration: none;" href="pl_info.php?id=480018">Дед-Моро3</a></li>';
web_table_html += '<li><b><font color="blue">90%</font></b> <a style="text-decoration: none;" href="pl_info.php?id=663413">SVX</a></li>';
web_table_html += '<li><b><font color="blue">90%</font></b> <a style="text-decoration: none;" href="pl_info.php?id=652347">Тлепш</a></li>';
web_table_html += '<li><b><font color="blue">90%</font></b> <a style="text-decoration: none;" href="pl_info.php?id=1440334">Акмарал23</a></li>';
web_table_html += '<li><b><font color="blue">90%</font></b> <a style="text-decoration: none;" href="pl_info.php?id=2836006">-SRS- </a></li>';

  




web_table_html += '</td></tr></table></td>';
web_table.innerHTML = web_table_html;


} 
}




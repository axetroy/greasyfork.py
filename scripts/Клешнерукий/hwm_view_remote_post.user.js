// ==UserScript==
// @name            hwm_view_remote_post
// @author          Kleshnerukij
// @description     Добавляет к постам ссылку на просмотр поста
// @version         1.1.4
// @include         http://www.heroeswm.ru/forum_messages.php?tid=*
// @include         http://qrator.heroeswm.ru/forum_messages.php?tid=*
// @include         http://178.248.235.15/forum_messages.php?tid=*
// @include         http://www.lordswm.com/forum_messages.php?tid=*
// @encoding 	    utf-8
// @namespace       https://greasyfork.org/users/12821
// ==/UserScript==

// (c) Клещнерукий - http://www.heroeswm.ru/pl_info.php?id=7076906

window.onload = function() {
	var page_content = document.getElementsByTagName('body')[0].innerHTML;
	var search_id = /forum_messages\.php.*?name=\"(\d+)\" class=\"pi\">\d+<\/a>/ig;
	var chek_section = /forum_thread\.php\?id=\d+\"><font class=\"forumt\">(Форум для внеигровых тем|Творчество)<\/font>/i;
	var array_id;
	var post_num = 0;

	if (page_content.search(chek_section) != -1) { // Переделать
		while ((array_id = search_id.exec(page_content)) !== null) {
			document.getElementsByClassName("message_footer")[post_num].getElementsByTagName("td")[1].getElementsByTagName("td")[0].innerHTML += " <a style=\"text-decoration: none;\" href=\"http://hwmfamily.ru/services/view_remote.php?id_msg="+array_id[1]+"\" target=\"_blank\">.</a>";
			++post_num;
		}
	}
};
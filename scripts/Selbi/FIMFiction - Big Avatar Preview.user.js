// ==UserScript==
// @name        FIMFiction - Big Avatar Preview
// @namespace   Selbi
// @include     http*://*fimfiction.net/*
// @version     1.2.1
// @description Displays a full-sized 256x256 avatar when you hover over a small 88x88 one.
// ==/UserScript==

$("img.avatar").each(function(int){
	var img256 = $(this).attr("src").replace("_128","_256");
	var bgcolor = document.getElementsByClassName("top-info")[int].style.backgroundColor;
	//var boxstyle = 'style="width:256px;height:256px;position:absolute;top:-103px;left:-76px;z-index:99;display:none;box-shadow: 0 0 15px 15px ' + bgcolor + '"';
	var boxstyle = 'style="width:266px;height:266px;position:absolute;top:-103px;left:-76px;z-index:99;display:none;background:#fff;padding:4px;border:1px solid rgba(0, 0, 0, 0.2);border-radius:5px;"';

	var assembly = '<div id="bigavatar' + int + '" onmouseout="$(\'#bigavatar' + int + '\').hide()" ' + boxstyle + '><a href="' + img256 + '"><img style="width:256px;height:256px;" src="' + img256 + '"></a></div>';

	$(this).attr("onmouseover", "$(\'#bigavatar" + int + "\').show()").after(assembly);
});
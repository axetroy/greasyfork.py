// ==UserScript==
// @name         BBCodeUrl to Markdown
// @namespace    https://greasyfork.org/en/users/120519-benzinadaze
// @version      v1.0
// @description  论坛链接代码转化为ST支持的Markdown
// @author       Benz1
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// @match        http://steam.depar.me/GameMatch/*
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle(".panel-markdown{border-color:#21a675}");
GM_addStyle(".panel-markdown>.panel-heading{color:#ffffff;background-color:#21a675;border-color:#21a675}");
GM_addStyle(".panel-markdown>.panel-heading+.panel-collapse .panel-body{border-top-color:#21a675}");
GM_addStyle(".panel-markdown>.panel-footer+.panel-collapse .panel-body{border-bottom-color:#21a675}");
GM_addStyle(".markDownBtn{background-color: #21a675}");

var div = document.createElement('div');
	div.innerHTML = '<div class="panel panel-markdown"><div class="panel-heading"><span class="glyphicon glyphicon-align-left"> MarkDown</span></div><div class="panel-body"><textarea id="mdcode" class="form-control" rows="10"></textarea></div></div>';

$("div[class='panel panel-info']").after(div);

var btndiv = document.createElement('div');
	btndiv.className = 'form-group text-right';
	btndiv.innerHTML = '</br><button id="BtoM" class="btn" style="background-color: #21a675;color: #fff;><span class="glyphicon glyphicon-ok"></span> 转为Markdown</button>';

$("textarea[class='form-control']")[1].after(btndiv);

$("#BtoM").on("click",function(){
	var bbcode = $("textarea[class='form-control']")[1].value;
	var mdcode = "";
	var bbcs = bbcode.split('\n');
	for (var i=0;i<bbcs.length ;i++ )
	{
		var bbc = bbcs[i];
		var mdc = "";
		if(bbc.indexOf("store.steampowered.com/") > 0){
			var id = bbc.substring(bbc.indexOf("=") + 1,bbc.indexOf("/]"));
			var name = bbc.substring(bbc.indexOf("/]") + 2,bbc.indexOf("[/url]"));
			if(name.indexOf("（") > 0) {
				name = name.substring(0,name.indexOf("（"));
			}
			mdc = "[" + name + "](" + id + ")" + "\n";
			mdcode = mdcode + mdc;
		}
	}
	$("#mdcode").val(mdcode);
});
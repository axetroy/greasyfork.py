// ==UserScript==
// @name       juku pigai paste
// @namespace  
// @version    14.05.10
// @description  绕过  句酷的禁止粘贴
// @include      *pigai.org/index.php*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// @auther       SHANG殇
// @icon         http://i1.tietuku.com/f3f9084123926501.jpg
// ==/UserScript==



$("#titleW").append("<textarea  id='answer' style='width: 600px;height : 40px;'></textarea>");
addmore();


function addmore()
{
	var button = document.createElement("button");
	button.type = "button";
	button.style.width = "50px";
	button.style.height = "50px";
	button.innerHTML = "写入";

	button.onclick = function()
	{
		document.getElementById("contents").value = document.getElementById("contents").value + document.getElementById("answer").value;
	}
    $("#answer").after(button)
	tip();
}

function tip()
{

	var ps = "在此处粘贴文本";
	$("#answer").val(ps);
	$("#answer").mouseover(function()
	{
		if ($("#answer").val() == ps)
		{
			$("#answer").val("");
		}
	});

	$("#answer").mouseleave(function()
	{
		if ($("#answer").val() == "")
			$("#answer").val(ps);
	});
}
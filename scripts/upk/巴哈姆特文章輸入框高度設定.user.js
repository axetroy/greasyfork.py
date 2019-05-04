// ==UserScript==
// @id             巴哈姆特文章輸入框高度設定
// @name           巴哈姆特文章輸入框高度設定
// @version        20180418
// @namespace      巴哈姆特文章輸入框高度設定
// @author         johnny860726
// @description    在巴哈姆特發表文章的時候提供設定輸入框高度的按鈕
// @include        *gamer.com.tw*
// @run-at         document-end
// ==/UserScript==

var l = 0, a, x, btn;

function setnewbtn(v,h){
	var btn = x.appendChild(document.createElement("button"));
	btn.setAttribute("type", "button");
    if(l==0){
		btn.setAttribute("style", "margin-left: 5px; margin-top:5px;");
    }else{
        btn.setAttribute("style", "margin-left: 5px;");
    }
	btn.innerHTML=v;
	btn.onclick = function(){a.style.height=h+"px";};
}

if((location.href.search("home.gamer.com.tw")!=-1)&&((location.href.search("creationNew1.php")!=-1)||(location.href.search("creationEdit1.php")!=-1))){
    l=0;
   	a = document.getElementsByTagName('iframe')[0];
	var i;
	var m=document.getElementsByClassName("ST1");
	for(i=0;i<m.length;i++){
	    if(m[i].textContent.search("（限 150000 個 byte）") != -1){
	        m[i].setAttribute("style", "margin-left: 5px;");
	        m[i].textContent = m[i].textContent.replace("（限 150000 個 byte）","高度設定");
	    }else if(m[i].textContent.search("（限 40 個中文字）") != -1){
	        m[i].textContent = m[i].textContent.replace("（限 40 個中文字）","");
	    }
	}
	if(a.id=="editor"){
	    x = document.getElementsByClassName('bahaRte')[0].parentNode;
		setnewbtn("預設",380);
	    btn = x.appendChild(document.createElement("button"));
	    btn.setAttribute("type", "button");
	    btn.innerHTML="+500";
	    btn.setAttribute("style", "margin-left: 5px;");
	    btn.onclick = function(){a.style.height = "" + (parseInt(a.style.height)+500) + "px"};
		setnewbtn("500",500);
		setnewbtn("700",700);
		setnewbtn("1000",1000);
	}
}else if((location.href.search("forum.gamer.com.tw")!=-1)&&(location.href.search("post1.php")!=-1)){
    l=1;
    a = document.getElementById("editor");
	if(a.id=="editor"){
		x = document.getElementsByClassName('FM-lbox3C')[0];
	    x.innerHTML += '高度設定 ';
		setnewbtn("預設",380);
	    btn = x.appendChild(document.createElement("button"));
	    btn.setAttribute("type", "button");
	    btn.innerHTML="+500";
	    btn.setAttribute("style", "margin-left: 5px;");
	    btn.onclick = function(){a.style.height = "" + (parseInt(a.style.height)+500) + "px"};
	    setnewbtn("500",500);
	    setnewbtn("700",700);
	    setnewbtn("1000",1000);
	}
}
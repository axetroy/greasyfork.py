// ==UserScript==
// @name        Animen Sorter
// @namespace   animen.sorter
// @description 對Animen網站番組表進行排序
// @include     http*://www.animen.com.tw/NewsArea/NewsItemDetail?NewsId=*
// @version     3.8
// @grant       none
// ==/UserScript==

var gettb = [];

try{
	gettb = document.querySelector("#NewsItem > div.html-raw > div > div > table:last-child > tbody");	
}catch(err){
	//console.log(err);
}

if (gettb != null){

	var addbt = document.body.appendChild(document.createElement("input"));
	addbt.id='sortbt';
	addbt.type='button';
	addbt.value='以日期排列';
	addbt.style='position:fixed;right:0px;bottom:0px;font-size:30px;background-color:#88CCFF;border:0px;border-style:solid;color: #ffffff;text-shadow: 0px 0px 2px #ffffff;border-radius:10px;';
	
	addbt.addEventListener('click', function(){
		
		var trlst = gettb.querySelectorAll("tr");
		
		var td;
		
		var trlstarr = [];
		
		trlst.forEach(function(e,index){
				
			try{
				
				if(e.innerText.match(/[0-9]{1,4}[\u5e74\u6708?\u65e5?]/)){
					
					var lnk = trlst[index].querySelector("a");
					var lnkname;
					if(lnk.name){
						lnkname=lnk.name;
					}else if(lnk.innerText){
						lnkname=lnk.innerText;
					}else{
						lnkname="";
					}
					console.log(lnkname);
					lnk.href = "https://zh.wikipedia.org/wiki/Special:%E6%90%9C%E7%B4%A2/" + lnkname;
					lnk.title = "點擊跳到維基百科";
					lnk.target = "_blank";
					
					var img = trlst[index+1].querySelector("img");
					if(img.dataset.original){
						img.title = "點擊跳到官網";
						img.target = "_blank";
					}
					
					td = e.innerText.replace(/[\uff10\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff19]/g,function(n){return n.charCodeAt(0)-65296});
					td = td.replace(/[零一二三四五六七八九]/g,function(n){return new Array("零","一","二","三","四","五","六","七","八","九").indexOf(n);});
					
					td = td.match(/[0-9]{4}\u5e74(.*[0-9]{1,2}\u6708)?(.*[0-9]{1,2}\u65e5)?/);
					td = td[0];
					
					td = td.split(/[\u5e74\u6708\u65e5]/g).filter(function(t){return t;}); 
					//while(td.length < 3) td.push("1");
					if(!td[1]){td[1]="12";}
					if(!td[2]){td[2]="30";}
					
					td = new Date(td.toString());
					e.setAttribute("thisdate",td);
					trlstarr.push(new Array(trlst[index],trlst[index+1]));
				}

			}catch(err){
				console.log(err);
			}
		 
		});
	 
		trlstarr.sort(function(a,b) {		
		if (new Date(a[0].getAttribute("thisdate")) < new Date(b[0].getAttribute("thisdate")))
			return -1;
		if (new Date(a[0].getAttribute("thisdate")) > new Date(b[0].getAttribute("thisdate")))
			return 1;
		return 0;	
		});
	 
		trlstarr.forEach(function(e,index){
			trlst[0].parentNode.appendChild(e[0]);
			trlst[0].parentNode.appendChild(e[1]);
	});
		
	this.removeEventListener('click', arguments.callee);
	document.body.removeChild(document.getElementById("sortbt"));
		
	});

}

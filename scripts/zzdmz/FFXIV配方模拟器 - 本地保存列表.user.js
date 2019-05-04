// ==UserScript==
// @name         FFXIV配方模拟器 - 本地保存列表
// @namespace    http://www.zzsoft.pw
// @version      0.0.4
// @description  将"队列"中的配方列表保存到"推荐"里(本地有效)
// @author       zzsoft
// @icon         http://v6.ffxiv.xin/favicon.ico
// @match        *://v6.ffxiv.xin/
// @require      https://cdn.staticfile.org/jquery/1.12.4/jquery.min.js
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    tryInject();
    tryBind();
     
  
    function tryBind()
    {
      setTimeout(function()
      {
		  if ($("button:contains(保存)").length==0)
		  {
			tryBind();
			return;
		  }
		 
		 addSaveListBtn();
		 //tryAddRemoveBtns();
      },500)
    }
	
	function tryAddRemoveBtns()
	{
		setTimeout(function(){
			var items=$("#tab2Content2 ul.tree>li.has-list");
			if (items.length==0)
			{
				tryAddRemoveBtns();
				return;
			}
			addRemoveBtns();
		},500);
	}
	
	function addRemoveBtns()
	{
		$("#tab2Content2 ul.tree>li.has-list").each(function(i,o)
		{
			$('<i class="icon icon-remove" title="删除" onclick="removeItem('+ i + ')"></i>').appendTo($(o));
		});		
	}
	
	function addSaveListBtn()
	{
         var grp = $("button:contains(保存)").parent();
         $("button:contains(保存)").hide();
         $("<button class='btn btn-sm'>推荐</button>")
         .bind("click",function()
		 {
            var lstitem = createListItem();
            if (lstitem==null){alert("描述不能为空");return;}
			
            saveToStartList(lstitem);
            //saveToStartCache(lstitem)
            fillStartList();
            alert("已保存到推荐列表");
            return false;
         }).prependTo(grp);
	}
	
	function createListItem()
	{
        var desc = $("#list_desc").val();
        if (desc=="")
        {          
          return null;
        }
		return {
			desc:$("#list_desc").val()
			,content: JSON.stringify( JSON.parse(localStorage["Bobo-Config"])["itemMap"])
			,time:new Date().getTime()
		};
	}
	
	function removeItemByIdx(idx)
	{				
		var sl = getStartList();
		sl.splice(idx,1);
		setStartList(sl);
		fillStartList();
	}		      
  
    //加载保存缓存列表
    function saveToStartCache(lstitem)
	{
		var sl = getStartCache();
		sl.push(lstitem);
		setStartCache(sl);
	}
    function getStartCache()
	{
        var sc = localStorage["Bobo-StartCache"];
        sc=sc==null||sc==""?[]:sc;
		return JSON.parse(sc);
	}
	function setStartCache(sc)
	{
		localStorage["Bobo-StartCache"] = JSON.stringify(sc);
	}
	
	//加载、保存推荐列表
	function saveToStartList(lstitem)
	{
		var sl = getStartList();
		sl.push(lstitem);
		setStartList(sl);
	}
	function getStartList()
	{
        var sc = localStorage["Bobo-StartList"];
        sc=sc==null||sc==""?[]:sc;
		return JSON.parse(sc);
	}
	function setStartList(sl)
	{
		localStorage["Bobo-StartList"] = JSON.stringify(sl);
	}
	
	//UI更新推荐列表
	function fillStartList()
	{
		Bobo.DrawStartList(getStartList());
		//addRemoveBtns();
	}
  
    function tryInject()
    {
      //console.log("inject bobo");
      setTimeout(function(){
        if (typeof(Bobo)=="undefined" || Bobo.DrawStartList==undefined)
        {
          tryInject();return;
        }
       
        //console.log(Bobo.DrawStartList);
        var fn1 = Bobo.DrawStartList;
        Bobo.DrawStartList=function(o){
          fn1.call(Bobo,o);
          addRemoveBtns();
        }
        fillStartList();
        console.log("injected bobo")
        //console.log(Bobo.DrawStartList.toString());
      },500);
     
    }
	
	window.removeItem = removeItemByIdx;
	
	
})();
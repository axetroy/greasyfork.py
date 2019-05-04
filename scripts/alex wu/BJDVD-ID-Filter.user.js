// 001-ID-Filter user script
// version 0.1 BETA!
// 2010-07-12
// Copyright (c) 2010, EverMail
// Released under the GPL license
// http://evermail-blog.appspot.com/001-ID-Filter
//
// 庆祝西班牙世界杯夺冠！！！
//
// ==UserScript==
// @name           BJDVD-ID-Filter
// @namespace      evermail-blog.appspot.com
// @version        0.7
// @description    Filter some user's text
// @author         EverMail
// @match          http://www.bjdvd.org/*
// @include        http://www.bjdvd.org/*
// @grant          none
// ==/UserScript==



// --------------------------------------------------------------------
// 使用方法: 只要修改下面一行IDList后面中括号中的ID即可，ID用单引号，并且使用逗号分割，主要ID大小写敏感!

//屏蔽名单
var BlockIDList =['卷儿他爸','ID1','ID2'];

//高亮名单
var FavoriteIDList =['ylzkguo','p908','ID3','ID4'];


// --------------------------------------------------------------------


//GM_log('write the log');

function CheckID(Id, IDList) //判断id是否符合
{
	for(var i = 0; i < IDList.length; i++)
	{
		if(Id == IDList[i])
		{
			return true;	
		}	
	}

	return false;
}

function get_nextsibling(n) //查找下个同级节点
  {
  var x=n.nextSibling;
  if(x==null)
  {
    return x;
  }
  while (x.nodeType!=1)
  {
     x=x.nextSibling;
  }
  return x;
}


var li = document.getElementsByClassName("author");
for (var i = li.length-1; i>-1; i--) 
{    
	var link = li[i].getElementsByTagName("a");
	for (var j = 0; j < link.length; j++) 
	{

  		var id = link[j].innerHTML;
		if (CheckID(id, BlockIDList))
		{
            var url=li[i].parentNode.parentNode.getElementsByClassName("post-subject")[0].getElementsByTagName('a')[0].href;
			if ( li[i].parentNode.parentNode.className=="post active reply")
            {
                li[i].parentNode.parentNode.innerHTML='<a href="' + url + '" title="点击查看屏蔽内容">'+'<font color=red>'+id+' 对你的回帖视而不见!</font>'+'</a>';
            }
            else
            {
                li[i].parentNode.parentNode.parentNode.innerHTML='<a href="' + url + '" title="点击查看屏蔽内容">'+'<font color=red>'+id+' 你的发帖我看不见,免得太吵!</font>'+'</a>';

                //var bq = get_nextsibling(li[i]);
                //if ((bq != null)&&(bq.localName == 'blockquote'))
                //{
                //	bq.innerHTML='';
                //}
            }
		}

        if (CheckID(id, FavoriteIDList))
		{
            li[i].parentNode.parentNode.style.fontSize="larger";
		}
	}

};
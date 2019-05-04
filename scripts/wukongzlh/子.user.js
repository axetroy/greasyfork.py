// ==UserScript==
// @name        子
// @namespace   zlh.com
// @include     https://trade.1688.com/order/buyer_order_list.htm?*
// @grant       none
// @description 延续
// @version 0.0.1.20161125065725
// ==/UserScript==
//获取属性参数
function GetQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return urldecode(r[2]);
  return null;
}
// console.log("kaishi");
window.onload=function(){
  //在此页面获取订单信息
  var box=document.getElementById("listBox");
  var uls=box.getElementsByTagName("ul")[0];
  var lis=uls.getElementsByTagName("li");
  //获取再次购买里的产品id
  var len=lis.length;
  var str='';
  //每个订单发送一次数据
  for(var i=0;i<len;i++){
    //判断li下面的detail有几个tr,有多个说明一个订单有多个产品（同供货商）
    var trpro=lis[i].getElementsByClassName("detail")[0].getElementsByTagName("tr");
    var trlen=trpro.length;
    console.log(trlen);
    var orderstr=lis[i].getElementsByClassName("title-order")[0].innerHTML.match(/[0-9]+/)[0].substr(0);//该产品的订单号
    if(trlen==1){
          var productid=lis[i].getElementsByClassName("s8")[0].getElementsByTagName("input")[0].value;//每个产品id
          var price=lis[i].getElementsByClassName("s3")[0].getElementsByTagName("strong")[0].innerHTML.trim();//单价
          var num=lis[i].getElementsByClassName("s4")[0].getElementsByTagName("div")[0].innerHTML.trim();//数量
          var status=lis[i].getElementsByClassName("s7")[0].getElementsByTagName("div")[0].innerHTML.trim();//付款状态
          var total=lis[i].getElementsByClassName("s6")[0].getElementsByTagName("div")[0].innerHTML.trim();//含运费小计
          var addtime=lis[i].getElementsByClassName("date")[0].innerHTML.trim();//时间
          var index=addtime.indexOf("：");
              addtime=addtime.substr(index+1);
          str+=productid+"_"+orderstr+"_"+price+"_"+num+"_"+total+"_"+status+"_"+addtime+"___";
            //str=productid+"_"+orderstr+"_"+price+"_"+num+"_"+total+"_"+status+"_"+addtime+"___";
    }else{
       var stra='';
       for(var k=0;k<trlen;k++){
          var productid=lis[i].getElementsByClassName("s8")[0].getElementsByTagName("input")[k].value;//每个订单里产品每一个产品id
          var price =trpro[k].getElementsByClassName("s3")[0].getElementsByTagName("strong")[0].innerHTML.trim();//单价
          var num =trpro[k].getElementsByClassName("s4")[0].getElementsByTagName("div")[0].innerHTML.trim();//数量
         
          var status=lis[i].getElementsByClassName("s7")[0].getElementsByTagName("div")[0].innerHTML.trim();//付款状态
          var total=lis[i].getElementsByClassName("s6")[0].getElementsByTagName("div")[0].innerHTML.trim();//含运费小计
          var addtime=lis[i].getElementsByClassName("date")[0].innerHTML.trim();//时间
          var index=addtime.indexOf("：");
              addtime=addtime.substr(index+1);
         stra+=productid+"_"+orderstr+"_"+price+"_"+num+"_"+total+"_"+status+"_"+addtime+"___";
       }
       str+=stra;//订单太多会超过url的最大值
       //str=stra;//订单太多会超过url的最大值
    }
        
//         var divhead=document.getElementById("header");
//         var img=document.createElement("img");
//         //上线后ip地址要修改
//http://120.25.62.62/v1/index.php/Index/index.html
//         img.setAttribute("src","http://120.25.62.62/v1/index.php/Supplier/apigetorder.html?t="+(new Date().getTime())+"&name="+encodeURI(str));
//         divhead.appendChild(img);
  }
  console.log(str);
 
   //每一次拿url的page和显示页数比较
  var page=GetQueryString('page')?GetQueryString('page'):1;//url-page
  console.log(page);
  var pagema=document.getElementsByClassName("page1")[0].getElementsByTagName("div")[1].getElementsByTagName("span")[0].innerHTML.match(/;[0-9]+\s/)[0].substr(1).trim();
  console.log(pagema);
  var storage=window.localStorage;
  console.log(storage);
    var spaner=document.getElementsByClassName("account-id")[0].getElementsByTagName("a")[0].getAttribute("title").trim();
    var strspan=str+spaner;
   if(page==1){
            
        var divhead=document.getElementById("header");
        var img=document.createElement("img");
        //上线后ip地址要修改
        img.setAttribute("src","http://120.25.62.62/v1/index.php/Supplier/apigetorder.html?t="+(new Date().getTime())+"&name="+encodeURI(strspan));
        divhead.appendChild(img);
      //storage[0]=str; 
      //点击下一页
      var nexta=document.getElementsByClassName("next")[0];
      setTimeout(function(){
        nexta.click();
      },20000);
   }else if(page!=pagema){
        var divhead=document.getElementById("header");
        var img=document.createElement("img");
        //上线后ip地址要修改
        img.setAttribute("src","http://120.25.62.62/v1/index.php/Supplier/apigetorder.html?t="+(new Date().getTime())+"&name="+encodeURI(strspan));
        divhead.appendChild(img);
    //alert("第二次");
      //storage[1]=str; 
      //点击下一页
      var nexta=document.getElementsByClassName("next")[0];
      setTimeout(function(){
        nexta.click();
      },20000);
  }else{
    //alert("final");
    //storage[2]=str;      
    //console.log(storage);
   
    //所有订单信息
   // var strall=storage[0]+storage[1]+str+spaner;
    console.log(strspan);
        //创建img标签site_header-box,值太长无法传输
        var divhead=document.getElementById("header");
        var img=document.createElement("img");
       //上线后ip地址要修改
       img.setAttribute("src","http://120.25.62.62/v1/index.php/Supplier/apigetorder.html?t="+(new Date().getTime())+"&name="+encodeURI(strspan));
       divhead.appendChild(img);
    
    
//         var xmlhttp=new XMLHttpRequest();
//         xmlhttp.onreadystatechange=function()
//         {
//           if (xmlhttp.readyState==4 && xmlhttp.status==200)
//            {           
//                  //var endata=xmlhttp.responseText;
                
//             }
//         }
//         console.log("ajax1");
//        xmlhttp.open("POST","http://localhost/newpms/index.php/Supplier/apigetorder.html",false);
//      console.log("ajax2");
//        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
//     console.log("ajax3");
//       //header("Access-Control-Allow-Origin:*");
//        //xmlhttp.send("name="+strall+"&t="+new Date().getTime());
//     xmlhttp.send();
//     console.log("ajax4");
   
  //iframe
   
        // Add the iframe with a unique name
//         var iframe = document.createElement("iframe");
//         var uniqueString = "CHANGE_THIS_TO_SOME_UNIQUE_STRING";
//         document.body.appendChild(iframe);
//         iframe.style.display = "none";
//         iframe.contentWindow.name = uniqueString;

//         // construct a form with hidden inputs, targeting the iframe
//         var form = document.createElement("form");
//         form.target = uniqueString;
//         form.action = "http://localhost/newpms/index.php/Supplier/apigetorder.html";
//         form.method = "POST";

//         // repeat for each parameter
//         var input = document.createElement("input");
//         input.type = "hidden";
//         input.name = "order";
//         input.value = encodeURI(strall);
//     //input.value = strall;
//         form.appendChild(input);
//         document.body.appendChild(form);
//         form.submit();

//         var WinAlerts = window.alert;  
      
     // console.log('end');
    
  }
  
}

//js解php的url编码
function urldecode(encodedString)
	{
		var output = encodedString;
		var binVal, thisString;
		var myregexp = /(%[^%]{2})/;
		function utf8to16(str)
		{
			var out, i, len, c;
			var char2, char3;

			out = "";
			len = str.length;
			i = 0;
			while(i < len)
			{
				c = str.charCodeAt(i++);
				switch(c >> 4)
				{
					case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
					out += str.charAt(i-1);
					break;
					case 12: case 13:
					char2 = str.charCodeAt(i++);
					out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
					break;
					case 14:
						char2 = str.charCodeAt(i++);
						char3 = str.charCodeAt(i++);
						out += String.fromCharCode(((c & 0x0F) << 12) |
						((char2 & 0x3F) << 6) |
						((char3 & 0x3F) << 0));
						break;
				}
			}
			return out;
		}
		while((match = myregexp.exec(output)) != null
		&& match.length > 1
		&& match[1] != '')
		{
			binVal = parseInt(match[1].substr(1),16);
			thisString = String.fromCharCode(binVal);
			output = output.replace(match[1], thisString);
		}

		//output = utf8to16(output);
		output = output.replace(/\\+/g, " ");
		output = utf8to16(output);
		return output;
	}

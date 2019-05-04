// ==UserScript==
// @name        提交订单
// @namespace   zlh.com
// @include     https://order.1688.com/order/smart_make_order.htm?p=cart&status*
// @version     1
// @grant       none
// @description 我来到了提交页面
// ==/UserScript==
window.onload = function () {
  function GetQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return urldecode(r[2]);
    return null;
  }
  var strname = GetQueryString('name');
	console.log(strname);
 
  var inputyun = document.getElementsByClassName('input fee');
  var lenp = inputyun.length;
  if (lenp) {
    //填写运费为0
    for (var o = 0; o < lenp; o++) {
			inputyun[o].focus();
      inputyun[o].value = 0.00;
			inputyun[o].blur();
    }
  }
	
	//获取所有的订单（供货商）
	var sup=document.getElementsByClassName("module mod-sublevel mod-order");
	var lent=sup.length;
	console.log(lent);
	for(var t=0;t<lent;t++){//循环所有订单
	      var textareacon=sup[t].getElementsByClassName("textarea-content")[0];
		    var textarea=textareacon.getElementsByTagName("textarea")[0];
				var onepro=sup[t].getElementsByClassName("single");
				var leno=onepro.length;
		console.log(leno);
		    var getmess='';
				for(var r=0;r<leno;r++){//循环每个订单中的所有产品
					
					var skuitem=onepro[r].getElementsByClassName("sku-item")[0];
					console.log(skuitem);
								
					if(skuitem){
						var spanistr=skuitem.innerHTML;//产品属性名
						var arrspani=spanistr.split('：');
						var spani=arrspani[1];
						var spani_id=arrspani[1];
					}else{
						var spani="noattrname";
					}
					
				
					console.log(spani);//去掉前缀规格后的属性名
					
							 var arrname = strname.split('__');
							 var lena=arrname.length;
							 for(var a=0;a<lena;a++){//循环所有的url参数进行对比

											var nameone=(arrname[a].split('_')[2])?(arrname[a].split('_')[2]):'';//url单属性(第三个参数)
											if(nameone){
													if(nameone.trim()==spani.trim()){
													       //获取每个订单的留言
														      getmess+=(arrname[a].split('_')[3])?(arrname[a].split('_')[3]):'';																	
												  }
										  }												
						   }
					     //alert(a);
				}
	
				console.log(getmess.trim());
		    var div=sup[t].getElementsByClassName("textarea-trigger")[0];
	      div.setAttribute("style","display:none");
		    textareacon.setAttribute("style","display:block");
		    if(getmess){
					textarea.focus();
					textarea.value=getmess;
					textarea.blur();
				}else{
					textarea.focus();
					textarea.value="请您尽快发货";	
					textarea.blur();
				}	 
		 
	}
	
  var makecheckout = document.getElementById('make-checkout');
  var order = makecheckout.getElementsByClassName('button button-important button-large make-order') [0];
	//如果留言框里都有值才让提交

	
	setTimeout(function(){order.click();},20000);//提交

  
}


//js解php编制的url编码
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

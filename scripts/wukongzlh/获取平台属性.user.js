// ==UserScript==
// @name        获取平台属性
// @namespace   zlh.com
// @include     https://detail.1688.com/offer/*
// @version     3
// @grant       none
// @description 获取一个属性
// ==/UserScript==
console.log('这是获取平台属性');
var ul = document.getElementsByClassName('list-leading');
//ul可能不存在
//console.log(ul.length);
var lenul=ul.length;
if(lenul){
  var li = ul[0].getElementsByTagName('li');
  var lengli=li.length;
  //console.log(li.length);
}else{
  var lengli=0;
}


//定义属性名
var str='';
if (lengli == 0) {

//无属性
  console.log('无可选属性！！');
  var tablesku = document.getElementsByClassName('table-sku') [0];
  console.log(tablesku);
  if(tablesku){
      var tbody = tablesku.getElementsByTagName('tbody') [0];
      var trs = tbody.getElementsByTagName('tr');
      var lenx = trs.length;
      
      for (var k = 0; k < lenx; k++) {
        var tdx = trs[k].getElementsByClassName('name') [0];
        var spanx = tdx.getElementsByTagName('span') [0];
       //如果span里面是图片
        if(spanx.getAttribute("class")=="image"){
          str+=spanx.getAttribute("title").trim()+"___";
          console.log(spanx.getAttribute("title").trim());
          continue;
        }
        console.log(spanx.innerHTML.trim());

        str+=spanx.innerHTML.trim()+"___";

      }
    
  }else{
   
    str+="noattrname___";
  }
}else if(lengli == 1){
  //单独属性名+数量属性
  console.log('双属性抉择！！');
  var tablesku = document.getElementsByClassName('table-sku') [0];
  var tbody = tablesku.getElementsByTagName('tbody') [0];
  var trs = tbody.getElementsByTagName('tr');
  var lenx = trs.length;
  console.log(lenx);
  var stro='';
  for (var k = 0; k < lenx; k++) {
    var tdx = trs[k].getElementsByClassName('name') [0];
    var spanx = tdx.getElementsByTagName('span') [0];
    var tdamount = trs[k].getElementsByClassName('amount') [0];
    console.log(spanx.innerHTML.trim());
    stro+=spanx.innerHTML.trim()+"___";
  }
  
  var haxx=ul[0].getElementsByTagName('li')[0].getElementsByTagName('div') [0].getAttribute('data-unit-config');
  strx=JSON.parse(haxx);
  console.log(strx.name);
  str+=stro+strx.name+"___";
  
}else{
    console.log('有可选属性');
 
  var leng = li.length;
  for (var j = 0; j < leng; j++) {
    var div = li[j].getElementsByTagName('div') [0];
    var hax = div.getAttribute('data-unit-config');
    var stry = JSON.parse(hax);
    console.log(stry.name);
    str+=stry.name+'___';
  }
}   

//var index1=str.lastIndexOf("___");
// strname=str.substr(0,index1);

 //获取产品id参数
  var url = window.location.pathname;
  var product_id = url.replace(/[^0-9]/gi, '');
  var urlname=str+product_id;
console.log(urlname);

//获取起批量
var amount = document.getElementsByClassName("amount")[0];
var aspan = amount.getElementsByTagName("span")[0].innerHTML;

var hen = aspan.indexOf("-");
if (!hen) {
  hen = 1;
}
var amountstr =  aspan.substr(0,hen);

if (amountstr == '≥') {
  amountstr = aspan.substr(1,2);
} 


console.log(amountstr);

//创建img标签site_header-box
var divhead=document.getElementById("site_header-box");
var img=document.createElement("img");
   //上线后ip地址要修改
    img.setAttribute("src","http://120.25.62.62/v1/index.php/Supplier/apiget.html?t="+(new Date().getTime())+"&name="+encodeURI(urlname)+"&batch="+amountstr);
    //img.setAttribute("src","http://localhost/newpms/index.php/Supplier/apiget.html?t="+(new Date().getTime())+"&name="+encodeURI(urlname)+"&batch="+amountstr);
    
divhead.appendChild(img);

       
          
       
    
 
// ==UserScript==
// @name     EasyNotes.Title.fix
// @version  2
// @grant    none
// @description 一个通用的网页标题栏自动修正工具
// @include  *
// @auther   tumuyan
// @namespace  https://userstyles.org/users/126795
// ==/UserScript==
 

function deSimilar ( input, sp){
var split=input.split(" ");
  var  quality=false;
  var  length=split.length;
  for (var i=0;i<length;i++){
  if(split[i].length>6){
    qulity=true;
  if(sp.match(split[i])){
  return true;
  }
  }
  }
  
  if(quality){
return false;
  }else{
return true;
  }

}

function deTail (input,i){

if (input.match("Powered by"))
{
return i;
}else if(input.match(/的+.*[社区|论坛]/))
{
 // alert(input+" match 的论坛");
return i;
}
  
  else{
  var output=input.replace(/\s$/,"");
  if (i==""){
       output= output.replace(/^\s/,"");
}
  else{
  output=i+" - " + output.replace(/^\s/,"");
  }
return output;
}

}


var title=document.getElementsByTagName("h1") ;
// var head=document.getElementsByTagName("head") ;

var new_title=title[0].innerText.replace("\n" , " " );
var title_tag=document.getElementsByTagName("title");
//title_tag[0].innerHTML=new_title +" - " +title_tag[0].innerHTML;
var title_text=title_tag[0].innerText;
// alert(title_text);

if (deSimilar(new_title,title_text)){
    new_title="";
    }else {
   // new_title=new_title+" - ";
    }


var title_sub=title_text.split("-");
var sub_length=title_sub.length;
if (sub_length>2){

 for (var i=0;i<sub_length-1;i++){
 new_title=  deTail (title_sub[i],new_title);
 }
}
else{
//new_title=new_title+title_text;
   for (var i=0;i<sub_length;i++){
 new_title=  deTail (title_sub[i],new_title);
 }
}
//alert(new_title);
title_tag[0].innerHTML=new_title.replace(/\s+/g, " ");

//alert(new_title);
//alert(title[0].innerText+" \n "+ head[0].innerHTML);

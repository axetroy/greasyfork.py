// ==UserScript==
// @name           Google Picasa Get ImageUrl
// @description    Get imageUrl from picasa
// @include        http://picasaweb.google.*/*
// @include        https://picasaweb.google.*/*
// @exclude        http://picasaweb.google.com/home
// @exclude        https://picasaweb.google.com/home
// @exclude        http://picasaweb.google.com/lh/*
// @exclude        https://picasaweb.google.com/lh/*
// @require        http://code.jquery.com/jquery-latest.min.js
// @author         congxz6688
// @version        2015.12.22
// @grant          none
// @namespace https://greasyfork.org/users/24448
// ==/UserScript==


$(".goog-icon-list-icon-meta").css("height","22px");
$(".goog-icon-list-icon-img-div").css({"border-style":"solid","border-color":"LightGreen","border-width":"thin","width":"130px","height":"150px"});

var mychecksa=$('DIV.goog-icon-list-icon-meta');
var mychecks=$('img.goog-icon-list-icon-img');
if (mychecks.length>0){
	var myUl=$("noscript")[1];
	var mysearch=$("noscript")[1].innerHTML.match(/src=".*?(?=")/g);
	if(!mysearch){
		mysearch=$("noscript")[2].innerHTML.match(/src=".*?(?=")/g);
		myUl=$("noscript")[2];
	}
	var myText="";
	var myText2="";
	for (i=0;i<mychecks.length;i++){
		majaa=mysearch[i].replace(/src="/,"").replace(/https/,"http").replace('/Ic42',"").replace(/s128/,"s0-Ic42").replace(/googleusercontent/,"ggpht"); 
		imganch="" + majaa + "";
		imganch2="[imgtr]" + majaa + "[/img]";
		myText+=((myText=="")?"":"\r\n\r\n") + imganch;
		myText2+=((myText2=="")?"":"\r\n\r\n") + imganch2;

		$("<input>",{type:"checkbox",id:"chk"+i}).css("margin","0px 0px 0px -1px").appendTo(mychecksa[i]);
		$("<ssr>",{html:i+1}).css("margin","0px 0px 0px -1px").appendTo(mychecksa[i]);
		$("<input>",{type:"text",size:"5",val:imganch2,readonly:"readonly",click:function(){$(this).select();}}).css("margin","0px 0px 0px 1px").appendTo(mychecksa[i]);
		$("<input>",{type:"text",size:"5",val:imganch,readonly:"readonly",click:function(){$(this).select();}}).css("margin","0px 0px 0px 1px").appendTo(mychecksa[i]);
	}

	if (myText!=""){
		var NewP=$("<span>",{id:"newP"}).css("display","block"); 
		NewP.insertAfter(myUl);
		$("<textarea>",{id:"myNewText",rows:"2",width:"49%",html:myText,readonly:"readonly",click:function(){$(this).select();}}).insertAfter(myUl);
		$("<textarea>",{id:"myNewText2",rows:"2",width:"49%",html:myText2,readonly:"readonly",click:function(){$(this).select();}}).insertAfter(myUl);
		
		$("<input>",{type:"radio",name:"sizee",val:"s0-Ic42",checked:"checked"}).appendTo(NewP);
			$("<ssr>",{html:"original "}).appendTo(NewP);
		$("<input>",{type:"radio",name:"sizee",val:"s720-Ic42"}).appendTo(NewP);
			$("<ssr>",{html:"720 "}).appendTo(NewP);
		$("<input>",{type:"radio",name:"sizee",val:"s850-Ic42"}).appendTo(NewP);
			$("<ssr>",{html:"850 "}).appendTo(NewP);
		$("<input>",{type:"radio",name:"sizee",val:"s1024-Ic42"}).appendTo(NewP);
			$("<ssr>",{html:"1024 "}).appendTo(NewP);
		
		$("<input>",{type:"button",val:"get all",click:checkAll}).appendTo(NewP);
		$("<input>",{type:"button",val:"get selected",click:gowork}).appendTo(NewP);
	}
}

function getRadio(){
	return $('[name="sizee"]:checked').val();
}

function fromTo(frr,too){
	var myyText="";
	var myyText2="";
	for (i=frr;i<too;i++) {
		majaa=mysearch[i].replace(/src="/,"").replace(/googleusercontent/,"ggpht").replace(/https/,"http").replace('/Ic42',"").replace(/s128/,getRadio()); 
		imganch="" + majaa + "";
		imganch2="[img]" + majaa + "[/img]";
		myyText+=((myyText=="")?"":"\r\n\r\n") + imganch;
		myyText2+=((myyText2=="")?"":"\r\n\r\n") + imganch2;
	}
	$("#myNewText").html(myyText);
	$("#myNewText2").html(myyText2);
}

function gowork(){
	var myyText="";
	var myyText2="";
	for (i=0;i<mychecks.length;i++) {
		if ($("#chk"+i)[0].checked) {
			majaa=mysearch[i].replace(/src="/,"").replace(/https/,"http").replace('/Ic42',"").replace(/s128/,getRadio()); 
			imganch="" + majaa + "";
			imganch2="[img]" + majaa + "[/img]";
			myyText+=((myyText=="")?"":"\r\n\r\n") + imganch;
			myyText2+=((myyText2=="")?"":"\r\n\r\n") + imganch2;
		}
	}
	$("#myNewText").html(myyText);
	$("#myNewText2").html(myyText2);
	if (myyText==""){
		checkAll();
	}
}

function gowork2(){
	($("#bef")[0].value!="0")?fromTo(0,$("#bef")[0].value):checkAll()
}

function gowork3(){
	($("#aft")[0].value!="0")?fromTo((mychecks.length-$("#aft")[0].value),mychecks.length):checkAll()
}

function gowork4(){
	fromTo(($("#fromm")[0].value-1),$("#too")[0].value);
}

function checkAll(){
	fromTo(0,mychecks.length);
}
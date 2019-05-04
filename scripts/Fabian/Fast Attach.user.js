// ==UserScript==
// @name       Fast Attach
// @namespace  http://www.taringa.net/Nikumi
// @version    0.3
// @description  Para adjuntar imagen-video con solo poner el link (y un enter como en Facebook)
// @match      http://www.taringa.net/mi
// @copyright  2012+, Fabi
// ==/UserScript==

var LaPutaMadre;
$(document).ready(function(){

    $('#my-shout-body-mi').on('keyup',function(e){
        var patt=/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?[\r\n|\n|\r]+/;
        var str= $(this).val();
        var ok=patt.test(str);
        
        if(ok&&!LaPutaMadre){
            e.preventDefault();

             var url=patt.exec(str)[0];
            var Aform = $('.add-url').children('form');
            var Attype="";
            if(url.endsWith('.jpg')||url.endsWith('.png')||url.endsWith('.gif')){
                Attype="image";
            }
            else{
                Attype="video";
            }
            
            $('.my-shout-attach').addClass('attach-'+Attype);
            $('.my-shout-attach').html(tmpl('template_attach_'+Attype+'_input'));
            $('.my-shout-attach').show();
            $('input.simple').val(url);
           var el=$('.shout-box[data-in="mi"]');
            mi.attach.submitUrl(el,Attype);          
            var ShoutCleaned=$('#my-shout-body-mi').val().replace(url,"");
             $('#my-shout-body-mi').val(ShoutCleaned);
            LaPutaMadre=true;
            $(document).on('click','.remove-attach',function(){
                LaPutaMadre=false;
			});
        }
        
    });
    LaPutaMadre=false;
});
LaPutaMadre=false;
console.log(LaPutaMadre);

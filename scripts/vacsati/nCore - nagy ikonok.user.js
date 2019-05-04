// ==UserScript==
// @name         nCore - nagy ikonok
// @namespace    
// @version      0.3
// @description  nCore letöltési listában kirakja a borítóképet
// @author       vacsati
// @require      https://code.jquery.com/jquery-1.12.4.min.js
// @match        https://ncore.cc/torrents*
// @grant        none
// ==/UserScript==

//$('.box_nev2')
console.log('a');

$('img.infobar_ico').mouseover();
$('.infobar').css({'display':'none'});
$('.box_torrent').css({'height':'auto','position':'relative'});
$('.box_nagy').css({'widht':'auto','height':'auto','float':'none','padding':'0'});
$('.box_nagy2').css({'widht':'auto','height':'auto','float':'none','padding':'0'});
$('.box_nev2').css({'height':'auto','width':'auto','position':'relative','float':'none'});
$('.box_nev2 div[id^="borito"]').css({'height':'auto','float':'left','position':'relative','left':'0px','top':'0px','padding':'0','background':'transparent'});//képtartó

$('.box_alap_img').css({'float':'none','position':'absolute','left':'-70px'});
//$('.tabla_szoveg').css({'position': 'absolute','top':'0px','left': '300px'});

$('.box_torrent').each(function(){
    var inf='<br>';
    inf+=$(this).find('.box_feltoltve2').html();
    inf+='<br><br>' ;
    inf+=$(this).find('.box_meret2').html();
    inf+='<br><br>' ;
     var id='',title='',obj=null;
   // var id=$(this).find('.torrent_txt a');
    //id=id.attr('rel');
    //$(this).find('.torrent_txt a:not(".infolink")').bind('click',function(){  var p = $(this).attr('rel');  console.log(p); })
    obj=$(this).find('.torrent_txt a:first-child');
    id=obj.attr('rel'); title=obj.attr('title');
    if(id=='undefined') obj=$(this).find('.torrent_txt2 a:first-child');
    id=obj.attr('rel'); title=obj.attr('title');
    console.log(obj+"|-"+id+"-|"+title+"<br>-----------------------------------------------------");
    //console.log( obj);
    //var id= obj.attr('rel');
    inf+='<a href="torrents.php?action=details&amp;id='+id+'">(i)</a>' ;
    inf+='<br><br>' ;
    inf+='<a href="torrents.php?action=download&amp;id='+id+'">(L)</a>' ;
    $(this).find('.box_alap_img').append(inf);
});
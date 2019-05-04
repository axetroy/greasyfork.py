// ==UserScript==
// @name           HWM - Resourses as images Style Mod
// @namespace      Resourses as images
// @author         code: Dinozon2, ElMarado; style: sw.East
// @collaborator   sw.East
// @version        0.21.4
// @description    Заменяет текстовое описание ресурсов на изображения
// @icon           http://i.imgur.com/GScgZzY.jpg
// @include        https://www.heroeswm.*/pl_info.php*
// @include        *//178.248.235.15/pl_info.php*
// @include        *//*.lordswm.*/pl_info.php*
// @grant          GM_addStyle
// @copyright      2013-2018, sw.East (https://www.heroeswm.ru/pl_info.php?id=3541252)
// @license        MIT
// ==/UserScript==


//  0.21.2-0.21.4 - Отображение картинок и ссылок на рынок для частей имперских артов
//  0.21.1        - fix. Отображение картинок для частей имперских артов

/** === Style === */
GM_addStyle ( `

#box{
   width: 93%;
   height: 100%;
   margin: 0 5px 0 10px;
}
#amount_slot{
   overflow: hidden;
   float: right;
   width: 48px;
   height: 48px;
   margin: 5px 5px 5px 0;
   padding: 0;
   border: 3px solid #fff;
   box-shadow: 0px 0px 5px #aaa;
   z-index: 1;
}
#amount_slot img {
   display: block;
   width: 42px;
   height: 42px;
   margin: 3px 0 0 3px;
   padding: 0;
}
#amount_slot a img {
   -webkit-transition: all 0.2s linear;
      -moz-transition: all 0.2s linear;
       -ms-transition: all 0.2s linear;
        -o-transition: all 0.2s linear;
           transition: all 0.2s linear;
}
#amount_slot:hover a img {
   -webkit-transform: scale(1.20,1.20);
      -moz-transform: scale(1.20,1.20);
       -ms-transform: scale(1.20,1.205);
        -o-transform: scale(1.20,1.20);
           transform: scale(1.20,1.20);
   opacity:1;
}
#amount_slot a{
   text-decoration: none;
}
.amount_wrap {
   position: absolute;
   min-width:14px;
   height: 13px;
   margin: -48px 0 0 -3px;
   padding:0 1px 1px;
   color:#fff;
   border:2px solid #fff;
   background:#222;
   -webkit-box-shadow: 1px 1px 1px #aaa;
      -moz-box-shadow: 1px 1px 1px #aaa;
           box-shadow: 1px 1px 1px #aaa;
   z-index: 15;
   font-size: 10px;
   text-align: center;
   text-decoration: none !important;
   text-shadow: 1px 1px 1px rgba(0,0,0, 0.8);
   cursor: pointer;
   opacity:.7;
   -webkit-transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;
      -moz-transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;
       -ms-transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;
        -o-transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;
           transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;
}

` );
/* Style End */


var HTMLOut='<div id="box">';

var ElementsArray = [];
ElementsArray['Кожа']=                 'https://i.imgur.com/Xn82L25.png';
ElementsArray['Сталь']=                'https://i.imgur.com/hwThTJE.png';
ElementsArray['Никель']=               'https://i.imgur.com/6lHniay.png';
ElementsArray['Волшебный порошок']=    'https://i.imgur.com/IuqF7rI.png';
ElementsArray['Мифриловая руда']=      'https://i.imgur.com/dv6rzKn.png';
ElementsArray['Обсидиан']=             'https://i.imgur.com/4yOWbK8.png';
ElementsArray['Мифрил']=               'https://i.imgur.com/1Y1Z7Mq.png';
ElementsArray['Орихалк']=              'https://i.imgur.com/qRGZzCs.png';
ElementsArray['осколок метеорита']=    'meteorit';
ElementsArray['абразив']=              'abrasive';
ElementsArray['змеиный яд']=           'snake_poison';
ElementsArray['клык тигра']=           'tiger_tusk';
ElementsArray['ледяной кристалл']=     'ice_crystal';
ElementsArray['лунный камень']=        'moon_stone';
ElementsArray['огненный кристалл']=    'fire_crystal';
ElementsArray['цветок ведьм']=         'witch_flower';
ElementsArray['цветок ветров']=        'wind_flower';
ElementsArray['цветок папоротника']=   'fern_flower';
ElementsArray['ядовитый гриб']=        'badgrib';
ElementsArray['Имперский арбалет']=    'part_imp_crossbow';
ElementsArray['Имперские сапоги']=     'part_imp_boots';
ElementsArray['Имперский щит']=        'part_imp_shield';
ElementsArray['Имперский шлем']=       'part_imp_helmet';
ElementsArray['Имперский амулет']=     'part_imp_amul';
ElementsArray['Имперский доспех']=     'part_imp_armor';
ElementsArray['Имперский меч']=        'part_imp_sword';
ElementsArray['Части редкого отряда']= 'https://dcdn.heroeswm.ru/i/army_html/q_sign.png';
ElementsArray['Части очень редкого отряда']= 'https://dcdn.heroeswm.ru/i/army_html/q_sign.png';

var a = document.body.getElementsByClassName("wb");

for (var i = 0, length = a.length; i < length; i++) {
	if (i in a) {
	    // Находим блок с элементами
		if (a[i].innerHTML.indexOf('&nbsp;&nbsp;&nbsp;&nbsp;<b>') + 1){
			// создаем массив из строк:
			var text=a[i].innerHTML;
            console.log(a[i]);
		    var arr = text.split('<br>');
			// очищаем строку от мусора
			for (var k=0,len=arr.length;k<len;k++) {
		 if (k==Math.round((len-1)/2)) {HTMLOut = HTMLOut+'<div id="top">';}
				var line=arr[k];

				line=line.replace('&nbsp;&nbsp;&nbsp;&nbsp;', '');
				line=line.replace('<b>', '');
				line=line.replace('</b>', '');
				var res = line.split(':');

				//    res[0] - название элемента
				//    res[1] - количество

				if (res[1]>0) {

				        //   фикс ширины
                                        if      (res[1]>9999) var w_length = 39;
                                        else if (res[1]>999)  var w_length = 31;
                                        else if (res[1]>99)   var w_length = 24;
                                        else                  var w_length = 13;

                    if (res[0].indexOf('\u0418\u043c\u043f\u0435\u0440') !=-1) { //обработка имперских артов }
					if(ElementsArray[res[0]].length<25){

						HTMLOut = HTMLOut + '<div id="amount_slot">'+
                                               '<a href="/auction.php?cat=part&sort=0&art_type='+ElementsArray[res[0]]+'"> '+
                                                  '<img src="/i/artifacts/parts/'+ElementsArray[res[0]]+'.png" alt="'+line+'" title="'+line+'">'+
                                               '</a>'+
                                               '<div class="amount_wrap" style="width:'+w_length+'px">'+res[1]+'</div>'+
                                            '</div>';
					} else {
                       HTMLOut = HTMLOut + '<div id="amount_slot">'+
                                               '<a href="#"> '+
                                                  '<img src="'+ElementsArray[res[0]]+'" alt="'+line+'" title="'+line+'">'+
                                               '</a>'+
                                               '<div class="amount_wrap" style="width:'+w_length+'px">'+res[1]+'</div>'+
                                            '</div>';
                    }
                     } else {
					if(ElementsArray[res[0]].length>25){
						HTMLOut = HTMLOut + '<div id="amount_slot">'+
                                               '<a href="#"> '+
                                                  '<img src="'+ElementsArray[res[0]]+'" alt="'+line+'" title="'+line+'">'+
                                               '</a>'+
                                               '<div class="amount_wrap" style="width:'+w_length+'px">'+res[1]+'</div>'+
                                            '</div>';
					} else {
						HTMLOut = HTMLOut + '<div id="amount_slot">'+
                                               '<a href="/auction.php?cat=elements&sort=0&art_type='+ElementsArray[res[0]]+'"> '+
                                                  '<img src="/i/'+ElementsArray[res[0]]+'.gif" alt="'+line+'" title="'+line+'"> '+
                                               '</a>'+
                                               '<div class="amount_wrap" style="width:'+w_length+'px">'+res[1]+'</div>'+
                                            '</div>';
					}
                   }
				}
  			}

			HTMLOut = HTMLOut+'</div>';
			// Выводим на страницу
			a[i].innerHTML = HTMLOut;
		}
	}
}
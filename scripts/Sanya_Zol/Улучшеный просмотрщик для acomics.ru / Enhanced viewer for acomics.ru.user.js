// ==UserScript==
// @name            Улучшеный просмотрщик для acomics.ru / Enhanced viewer for acomics.ru
// @description     Предзагрузка, удобная навигация и прочие улучшения для сайта acomics.ru
// @author          Sanya_Zol (Alexander Zolotarev)
// @license         Public domain
// @icon            https://acomics.ru/favicon.ico
// @homepageURL     https://greasyfork.org/ru/scripts/10521
// @supportURL      https://greasyfork.org/ru/scripts/10521
// @namespace       Sanya_Zol
// @version         0.2.2
// @include         http://acomics.ru/*
// @include         https://acomics.ru/*
// @run-at          document-end
// @grant           none
// ==/UserScript==

/*
################################################################################
#########################       вместо README.md       #########################
################################################################################

**[Тема на форуме acomics.ru](http://acomics.ru/forum/index.php?showtopic=2785)**

Описание
====================
Улучшеный просмотрщик комиксов для сайта [acomics.ru](http://acomics.ru/)

* **Быстрый переход** между страницами нажатием стрелок [˂], [˃]
* **Скриптовая прокрутка** стрелками [˄], [˅]
    *(Мне вот очень удобно читать комикс и комментарии одной рукой)*
* Автоматическое **сохранение номера страницы** для каждого комикса (в localStorage).
* **Предзагрузка** страниц - моментальный переход между страницами!
* **Отключение уменьшения изображения**
    Некоторые комиксы, например [этот](http://acomics.ru/~unsounded/1), автоматически уменьшаются, что не есть хорошо. В частности, [тема поднималась в этом обсуждении](http://acomics.ru/forum/index.php?showtopic=2441&st=345&p=242192#entry242192):
    *> Можно увеличить max-width под комикс? Unsounded со своими 1024 все еще масштабируется в минус.*
* **Удаление белого фона**
    Заметно например в [этом](http://acomics.ru/~DROW/1) комиксе

Как пользоваться
====================
Если вы этого ещё не сделали, [устанавливаем расширение Greasemonkey (или его аналог) для своего браузера](https://greasyfork.org/ru/help/installing-user-scripts)

Заходим на страницу скрипта и жмем "Установить этот скрипт". Должно вылезти предложение установить скрипт - если его не будет, значит вы неправильно установили Greasemonkey (или его аналог).

После установки скрипта заходим на страницу комикса (например, [http://acomics.ru/~unsounded/1](http://acomics.ru/~unsounded/1) ) и жмем появившуюся кнопку в правом верхнем углу.

В случае, если вы в прошлый закончили чтение на другой странице комикса - произойдет переход на неё и надо будет ещё раз нажать кнопку.

Очень рекомендую
--------------------
1. **Увеличить масштаб** при чтении комикса ( через меню, либо крутите колесо мыши вверх, зажав клавишу Ctrl )
2. Читать в **полноэкранном режиме** ( активируется кнопкой **F11** )

Управление
--------------------
[˂], [˃] {cтрелки влево и вправо} - переход по страницам
[˄], [˅] {cтрелки вверх и вниз} - прокрутка вверх-вниз
Shift+[˄] или Shift+[˅] - переключение режима прокрутки вверх-вниз (браузер / скрипт, по умолчанию "скрипт")
Ctrl+[˄] или Ctrl+[˅] - плавная прокрутка (при режиме прокрутки "скрипт")

Номер страницы автоматически сохраняется.

Прочее
====================
Есть ещё некоторые недокументированные функции и настройки, но мне лень их документировать. Если интересно, смотрите код.

Authors
--------------------
* Sanya_Zol (Alexander Zolotarev)

Contributing
--------------------
Contributions must be under the same licence.
mailto: sanya.zol%gmail

License
--------------------
*Public domain*

I, the copyright holder of this work, release this work into the public domain. This applies worldwide.
In some countries this may not be legally possible; if so:
I grant anyone the right to use this work for any purpose, without any conditions, unless such conditions are required by law.

################################################################################
#########################        конец README.md       #########################
################################################################################
*/


(function(){

// http://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
var hereDoc=function(f){return f.toString().replace(/^[^\/]+\/\*!?/,'').replace(/\*\/[^\/]+$/,'');};
var a = hereDoc(function() {/*!

// чтобы поменять номер страницы, открой консоль (Ctrl+Shift+I, вкладка "Console") и введи там
// z_SetPage()

var PAGE = {}; // не трогать. так надо.

PAGE.blockUnload = false;
// Блокировать случайное закрытие страницы

PAGE.AjaxRequestTimeoutMs=10000;
// таймаут запроса в милисекундах (секундах*1000)

// чтобы деактивировать или снова активировать быстрый скролл, нажми Shift+[˄] или Shift+[˅]
PAGE.scrollFasterDefault = true;
// по умолчанию он включен, чтобы отключить поменяй на false

PAGE.scrollFasterPx = 300;
PAGE.scrollFasterCtrlPx = 100;
// сейчас при скролле страницы стрелками по вертикали [˄] и [˅] будет быстрый скролл на 300 пикселей
// а при зажатом Ctrl - на 100
// поменяй на нужное количество пикселей
PAGE.scrollFasterSpeed = 75;
// время в милисекундах, за которое скроллить при использовании быстрого скролла
PAGE.scrollSpeed = 75;
// время в милисекундах, за которое скроллить наверх при смене страниц

PAGE.contentMarginMover = false;
// поставь true чтобы выпилить комментарии - они будут вылазить при нажатии [˄]+[˃]
// (стрелки вправо при зажатой стрелке вверх) и выезжать при нажатии [˂]+[˃]
// мне это показалось не очень удобным и я вернул как было

PAGE.visualLog = false;
// поставь true чтобы выводить отладочную информацию в левом верхнем углу страницы
// отладочная страница в консоли (Ctrl+Shift+I, вкладка "Console")

PAGE.localStorageKeyPrefix = '**zol**page**';
// префикс хранилища html5 (которое localStorage и sessionStorage)


PAGE.log = function(s){ console.log('[PAGE] '+s); };

PAGE.makeUrlReference = function(id,comicsName){
	return '/~'+comicsName+'/'+id;
};

PAGE.preInit = function(){
	if( PAGE.preInitFailed ){return;}
	PAGE.preInitFailed = true;
	
	// var m = /^\/~([^/]+)\/(.*)$/.exec( location.pathname.toString() );
	var m = /^\/~([^\/]+)\/(\d*)(?:\D|$)/.exec( location.pathname.toString() );
	if(!m){return;}
	
	if(!window.$){
		PAGE.log('preInit failed: where is my $, billy ??');
		return;
	}
	
	// parse page info
	PAGE.comicsName = m[1];
	var comicsPage = parseInt(m[2],10);
	if( m[2]=='' || isNaN(comicsPage) || comicsPage<1 ) {
		return;
	}
	PAGE.comicsPage = comicsPage;
	delete m;
	delete comicsPage;
	
	// if( PAGE.contentMarginMover ){ PAGE.$contentMargin }
	
	PAGE.makeUrl = function(id){
		return '/~'+PAGE.comicsName+'/'+id;
	};
	
	// stored shit
	PAGE.localStorageKey = PAGE.localStorageKeyPrefix + PAGE.comicsName;
	PAGE.localStorageKeyPage = PAGE.localStorageKey + '*';
	
	PAGE.store = function(){
		window.localStorage.setItem( PAGE.localStorageKey, PAGE.comicsPage );
	};
	
	var stored = window.localStorage.getItem( PAGE.localStorageKey );
	if(stored){ stored = parseInt(stored,10)||false; } else {stored=false;}
	if( stored && (stored != PAGE.comicsPage) ){
		// location.href = PAGE.makeUrl(stored);return;
		PAGE.wantPage = stored;
	} else {
		PAGE.wantPage = PAGE.comicsPage;
	}
	PAGE.stored = stored;
	delete stored;
	
	var curr = PAGE.parsePageString( $('html')[0].outerHTML );
	if( !curr ){ return; }
	
	PAGE.comicsLastPage = curr.LastPage;
	PAGE.comicsPageTitle = curr.Title;
	
	PAGE.init_comicsPage = PAGE.comicsPage;
	PAGE.init_wantPage = PAGE.wantPage;
	
	if(PAGE.comicsPage != curr.Page){
		if(
			confirm(
				'Что-то пошло не так.'
				+'\n'
				+'\n[1] Сохраненная страница:\t'+PAGE.comicsPage
				+'\n[2] Страница комикса (html):\t'+curr.Page
				+'\n[3] Максимальная страница (html):\t'+PAGE.comicsLastPage
				+'\n'
				+'\nЗаменить сохраненную страницу '+PAGE.comicsPage+' на '+curr.Page+'?'
			)
		){
			PAGE.wantPage = PAGE.comicsPage = curr.Page;
			PAGE.store();
			location.href = PAGE.makeUrl(PAGE.comicsPage);
		}
		return;
	}
	
	PAGE.tmp_curr = curr;
	// PAGE.putCached( PAGE.comicsPage, curr );
	// PAGE.putCached( PAGE.tmp_curr.Page, PAGE.tmp_curr ); delete PAGE.tmp_curr;
	delete curr;
	
	PAGE.preInit = function(){return true;};
	return true;
};
PAGE.preInitFailed = false;



PAGE.init = function(){
	if( !PAGE.preInit() ){return;}
	
	PAGE.init = function(){};
	
	if( PAGE.visualLog ){
		(function(){
			var d = $('<div/>');
			d.css({
				position:'fixed', // absolute
				zIndex:1e6,
				left:'1px',
				top:'1px',
				padding:'1px',
				fontFamily:'Verdana',
				fontSize:'7px',
				color:'#fff',
				textShadow:'#000 0px 0px 1px',//, #000 2px 2px 2px
				background:'rgba(255,255,255,0.3)',
				borderRadius:'2px',
				border:'1px rgba(255,255,255,0.5) solid',
				overflowY:'hidden',
				maxHeight:'60px'
			}).appendTo('body');
			PAGE.log = function(s){
				$('<div/>').text(s).hide().prependTo(d).slideDown(200).delay(5000).slideUp(200,function(){ $(this).remove(); });
				d.fadeIn().finish().delay(5000).slideUp(200);
				console.log('[PAGE] '+s);
			};
		})();
	}
	
	PAGE.noPushState = false;
	PAGE.firstPushState = true;
	PAGE.changeHandlers = function(){
		PAGE.store();
		PAGE.ShouldIDoSomething();
		// history.pushState({}, , location.href);
		if( PAGE.noPushState ){
			PAGE.noPushState = false;
		} else {
			// if( PAGE.firstPushState ){
				// PAGE.firstPushState = false;
				// history.replaceState(
					// {page:PAGE.comicsPage},
					// '#'+PAGE.comicsPage+' | '+PAGE.comicsPageTitle,
					// PAGE.makeUrl(PAGE.comicsPage)
				// );
			// } else {
				history.pushState(
					{page:PAGE.comicsPage},
					'#'+PAGE.comicsPage+' | '+PAGE.comicsPageTitle,
					PAGE.makeUrl(PAGE.comicsPage)
				);
			// }
		}
	};
	$(window).on('popstate', function(e){
		var d = e.originalEvent.state || false;
		if(d && d.page){
			PAGE.wantPage = d.page;
			PAGE.noPushState = true;
			PAGE.ShouldIDoSomething();
		}
	});
	
	// disable built-in navigation with left/right arrow keys.
	// search page source for "$(document).keydown(" for more info
	$(document).off('keydown'); // @FIX
	
	var $htmlbody = $('html,body');
	PAGE.scroll = function( relative, scrollAmount ){
		if(relative){
			$htmlbody.finish().animate({
				scrollTop: Math.max( 0, $(window).scrollTop() + scrollAmount )
			}, PAGE.scrollFasterSpeed);
		} else {
			$htmlbody.finish().animate({
				scrollTop: scrollAmount
			}, PAGE.scrollSpeed);
		}
	};
	
	PAGE.SessCacheQuery = function(page){
		var r = window.sessionStorage.getItem( PAGE.localStorageKeyPage + page );
		if(!r)return false;
		try{
			r = JSON.parse( r );
		} catch(e){
			return false;
		}
		return r;
	};
	PAGE.SessCachePut = function(page,data){
		var d = JSON.stringify( data );
		window.sessionStorage.setItem( PAGE.localStorageKeyPage + page , d );
	};

	window.eval('window.z_SetPage=function(){ $(window).trigger(\''+
		PAGE.localStorageKeyPrefix+':setpage'
	+'\') };')
	PAGE.storePage = function(){ // z_SetPage
		var p = parseInt( prompt('Set page to:', PAGE.comicsPage), 10 )
		if( isNaN(p) || p<1 || p>PAGE.comicsLastPage ){
			alert('Wrong page!\nMust be: 1 < page < '+PAGE.comicsLastPage);
			return;
		}
		if(!confirm('Warning! Really update page from '+PAGE.comicsPage+' to '+p+' ?')){
			return;
		}
		PAGE.wantPage = p;
		PAGE.ShouldIDoSomething();
	};
	$(window).on(PAGE.localStorageKeyPrefix+':setpage',PAGE.storePage);
	
	
	// PAGE.wantPage = PAGE.comicsPage;
	setTimeout(function(){
		if( PAGE.wantPage == PAGE.comicsPage ){
			PAGE.swapPage();
		} else {
			PAGE.ShouldIDoSomething();
		}
	},1);
	
	
	// {
		// "Page" : 1,
		// "LastPage" : 741,
		// "Image" : "/upload/!c/!import/unsounded/000001-go44gzvmk6.jpg",
		// "ContentSerialNomargin" : "\t",
		// "ContentMargin" : "\t"
	// }
	
	PAGE.handleSwap = function(page, o){
		PAGE.log('page.swap: swapping page to #'+page+(
			o.Preloaded?'':' which doesn\'t have preloaded image'
		));
		PAGE.$contentMargin.html( o.ContentMargin );
		PAGE.$contentSer.html( o.ContentSerialNomargin );
		
		// title
		PAGE.comicsPageTitle = o.Title;
		PAGE.comicsPage = page;
		
		document.title = '#'+PAGE.comicsPage+' | '+PAGE.comicsPageTitle;
		
		// $(window).scrollTop(0);
		PAGE.scroll(false, 0);
		PAGE.changeHandlers();
	}
	
	PAGE.plData = Object.create(null);
	
	// PAGE.wantPage = PAGE.comicsPage;
	
	PAGE.putCached = function(page,data){
		PAGE.plData[ page ] = data;
		PAGE.SessCachePut( page, data );
		PAGE.putCachedPreloadImage( page );
	};
	PAGE.putCachedPreloadImage = function(page){
		PAGE.plData[ page ].Preloaded = false;
		PAGE.plData[ page ].DomImage = new Image();
		PAGE.plData[ page ].DomImage.onerror = function(){
			console.error('Cannot load image #'+page+' (window._err_img): '+PAGE.plData[ page ].Image);
			window._err_img = PAGE.plData[ page ].Image;
			if( typeof( PAGE.plData[ page ] )!='undefined' ){
				delete PAGE.plData[ page ];
			}
		};
		var log = false;
		PAGE.plData[ page ].DomImage.onload = function(){
			delete PAGE.plData[ page ].DomImage.onload;
			
			if( typeof( PAGE.plData[ page ] )=='object' ){
				if(log){
					PAGE.log('page.cache: IMG preloaded #'+page);
				}
				PAGE.plData[ page ].Preloaded = true;
			} else {
				PAGE.log('page.cache: IMG preloaded #'+page+' but OBJ DOES NOT EXISTS!!');
			}
		};
		PAGE.plData[ page ].DomImage.src = PAGE.plData[ page ].Image;
		setTimeout(function(){ log=true; },30);
	};
	
	PAGE.$contentMargin = $('#contentMargin');
	PAGE.$content = $('#content');
	PAGE.$contentSer = $('#content > div.serial-nomargin');
	
	
	$('#common').remove();
	$('#background > div').not('#container').remove();
	$('#container > header.serial').remove();
	$('#container > nav.serial').remove();
	
	$('#contentSide').remove();
	
	// custom stylesheets
	$('<style/>').attr('type','text/css').html(''
		+' #content.notitle h3.serial {display:none;}'
		+' section.issue img {max-width: none;}'
		+' div#container { width: auto; display:inline-block; min-width:'+$('div#container').css('width')+';'
		+' background-color: transparent; } '
		+' #contentMargin {background:#fff; min-height: 0px !important; padding:20px; margin:0px auto; border-radius:4px;} '
		// outline:20px #fff solid;
		+' nav.issue > table { width:auto; margin-right:auto; margin-left:auto; } '
		+' nav.issue>table>tbody>tr>td:nth-child(odd) { display:none; } '
		+' nav.issue>table>tbody>tr>td:nth-child(2)>.button { display:none; } '
		+' nav.issue>table>tbody>tr>td:nth-child(2)>.button.large, nav.issue>table>tbody>tr>td:nth-child(2)>.button.center { display:inline-block; } '
		+' footer#common {background:#fff;} '
		+' #background{text-align:center;}'
		+' #container{text-align:left;}'
		+' #content > div.serial-nomargin > section.issue { width: auto !important; display:inline-block !important; } '
		+' #content > div.serial-nomargin { text-align: center; } #content > div.serial-nomargin>* { text-align: left; } '
		+' footer#common, footer#common>div.inner {border-radius:4px} '
	).appendTo('body');
	
	// $('#content > div.serial-nomargin > h3.serial').remove();
	
	PAGE.$content.addClass('notitle');
	if( PAGE.contentMarginMover ){
		PAGE.$contentMargin
			.detach()
			.css({
				position:'absolute',
				left:'5px',
				top:'64px',
				border:'1px #000 solid',
				background:'#fff'
			})
			.appendTo('body')
			.hide();
	}
	PAGE.gcAllowedSet = function(){ PAGE.gcAllowed = true; }; PAGE.gcAllowedSet();
	PAGE.gc = function(){
		if( !PAGE.gcAllowed ){ return; }
		
		var r = PAGE.populateList(5);
		r.push( PAGE.wantPage );
		for( var page in PAGE.plData ){
			page = parseInt(page,10);
			if( $.inArray( page, r ) == -1 ){
				PAGE.log('page.gc: removing old page #'+page);
				delete PAGE.plData[ page ];
				window.sessionStorage.removeItem(PAGE.localStorageKeyPage + page);
			}
		}
		
		var prefixl = PAGE.localStorageKeyPage.length;
		for( var i = window.sessionStorage.length; i-->0; ){
			var k = window.sessionStorage.key(i);
			if( typeof(k)=='string' && k.indexOf(PAGE.localStorageKeyPage)==0 ){
				var page = parseInt(k.substr(prefixl),10);
				if( $.inArray( page, r ) == -1 ){
					PAGE.log('page.gc: removing sessionStorage page #'+page);
					window.sessionStorage.removeItem(PAGE.localStorageKeyPage + page);
				}
			}
		}
		// key()
		PAGE.gcAllowed = false;
		setTimeout( PAGE.gcAllowedSet, 10000 );
	};
	PAGE.swapPage = function(){
		var page = PAGE.wantPage;
		if( typeof( PAGE.plData[ page ] )=='undefined' ){
			PAGE.log('page.swap: NO CACHE FOR #'+page);
			return false;
		}
		if( typeof( PAGE.plData[ page ] )=='boolean' ){
			PAGE.log('page.swap: CACHE STILL WAITING #'+page);
			return true;
		}
		if( typeof( PAGE.plData[ page ] )=='object' ){
			var o = PAGE.plData[ page ];
			PAGE.handleSwap(page, o);
		}
		return true;
	}
	PAGE.ShouldIDoSomething = function(){
		if( PAGE.wantPage < 1 ){
			PAGE.log('page.swap: wrong wantPage = '+PAGE.wantPage);
			PAGE.wantPage = 1;
		} else if( PAGE.wantPage > PAGE.comicsLastPage ){
			PAGE.log('page.swap: wrong wantPage = '+PAGE.wantPage);
			PAGE.wantPage = PAGE.comicsLastPage;
		}
		if( PAGE.wantPage != PAGE.comicsPage ){
			if(!PAGE.swapPage()){
				PAGE.log('page.cache: requesting non-preloaded page #'+PAGE.wantPage);
				PAGE.ajaxPreload( PAGE.wantPage );
				return true;
			}
		}
		
		var r = PAGE.populateList(0);
		var rl = r.length;
		for( var i=0; i<rl; i++ ){
			var page = r[i];
			if( typeof( PAGE.plData[ page ] )=='undefined' ){
				var cached = PAGE.ajaxPreload( page );
				if(!cached){
					PAGE.log('page.cache: preloading page #'+page);
					return true;
				}
			}
		}
		PAGE.gc();
		return false;
	};
	PAGE.ticker = function(){
		var to = PAGE.ShouldIDoSomething()?300:1000;
		PAGE.tickerTO = setTimeout(PAGE.ticker, to);
	};
	PAGE.tickerTO = setTimeout(PAGE.ticker,10);
	
	
	PAGE.populateList = function(Add){
		var a = [];
		for( var i=1; i<=(4+Add); i++ ){
			var np = PAGE.wantPage+i;
			if( np <= PAGE.comicsLastPage ){
				a.push(np);
			}
		}
		for( var i=1; i<=(2+Add); i++ ){
			var np = PAGE.wantPage-i;
			if( np >= 1 ){
				a.push(np);
			}
		}
		return a;
	};
	
	PAGE.ajaxPreload = function(page){ // return cached
		var sc = PAGE.SessCacheQuery(page);
		if(sc){
			PAGE.plData[ page ] = sc;
			// PAGE.SessCachePut( page, data );
			PAGE.putCachedPreloadImage( page );
			return true;
		}
		
		PAGE.plData[ page ] = true;
		$.ajax({
			type:'GET',
			dataType:'text',
			cache:true,
			url:PAGE.makeUrl( page ),
			timeout:PAGE.AjaxRequestTimeoutMs,
			error:function(){
				if( typeof( PAGE.plData[ page ] )!='undefined' ){
					delete PAGE.plData[ page ];
				}
			},
			success:function(d){
				var parsed = PAGE.parsePageString( d );
				if(!parsed){
					console.error('Cannot parse data (see window._err_data)');
					window._err_data = d;
					if( typeof( PAGE.plData[ page ] )!='undefined' ){
						delete PAGE.plData[ page ];
					}
				} else {
					PAGE.log('page.ajax: preloaded #'+page);
					PAGE.putCached(page,parsed);
					PAGE.ShouldIDoSomething();
				}
			}
		});
		
		return false;
	};
	
	PAGE.handlePrev = function(){
		// PAGE.wantPage = PAGE.comicsPage;
		PAGE.wantPage--;
		PAGE.ShouldIDoSomething();
	};
	PAGE.handleNext = function(){
		PAGE.wantPage++;
		PAGE.ShouldIDoSomething();
	};
	
	var uparrow_pressed = false;
	var last_scroll = 0;
	
	var scroll_faster = PAGE.scrollFasterDefault;
	$(document).keydown(function(e){
		var prevent = true;
		// if( e.which==13 && e.shiftKey ) { // Shift+Enter
		// } else
		if( (e.which==38 || e.which==40) && e.shiftKey ) { // ^/v
			scroll_faster = !scroll_faster;
		}
		if( e.which==37 ){ // <
			if( PAGE.contentMarginMover ){PAGE.$contentMargin.hide();} PAGE.$content.addClass('notitle');
			if( uparrow_pressed ){
				if( PAGE.contentMarginMover ){ $(window).scrollTop( last_scroll ); }
			} else {
				PAGE.handlePrev();
			}
		} else if ( e.which==39 ){ // >
			if( uparrow_pressed ){
				if( PAGE.contentMarginMover ){PAGE.$contentMargin.show();} PAGE.$content.removeClass('notitle');
				// $(window).scrollTop(0);
				PAGE.scroll(false, 0);
			} else {
				if( PAGE.contentMarginMover ){PAGE.$contentMargin.hide();} PAGE.$content.addClass('notitle');
				PAGE.handleNext();
			}
		} else if ( e.which==38 ){ // ^
			uparrow_pressed = true;
			last_scroll = $(window).scrollTop();
			if( PAGE.scrollFasterPx && scroll_faster ){
				// $(window).scrollTop( Math.max( 0, $(window).scrollTop()-PAGE.scrollFasterPx ) );
				PAGE.scroll( true, -(e.ctrlKey?PAGE.scrollFasterCtrlPx:PAGE.scrollFasterPx) );
			} else {
				prevent = false;
			}
		} else if ( e.which==40 ){ // v
			if( PAGE.scrollFasterPx && scroll_faster ){
				// $(window).scrollTop( $(window).scrollTop()+PAGE.scrollFasterPx );
				PAGE.scroll( true, (e.ctrlKey?PAGE.scrollFasterCtrlPx:PAGE.scrollFasterPx) );
			} else {
				prevent = false;
			}
		} else {
			prevent = false;
		}
		if(prevent){e.preventDefault();return false;}
	}).keyup(function(e){
		if ( e.which==38 ){ // ^
			uparrow_pressed = false;
		}
	});
	
	PAGE.$contentSer.on('click','a',function(){
		var pn = this.pathname;
		if( pn == PAGE.makeUrl( PAGE.comicsPage+1 ) ){
			PAGE.handleNext();
			return false;
		} else if ( PAGE.makeUrl( PAGE.comicsPage-1 ) ) {
			PAGE.handlePrev();
			return false;
		}
	});
	
	if( PAGE.blockUnload ){
		$(window).on('beforeunload', function(){
			return 'You shall not pass.';
		});
	}
	
	// last
	PAGE.putCached( PAGE.tmp_curr.Page, PAGE.tmp_curr ); delete PAGE.tmp_curr;
	
	PAGE.log('init');
};




PAGE.removeScripts = (function(){
	var dangerous_tags = (['script', 'style', 'link', 'embed', 'object'].join(', '));
	var removeInlineHandlers = function(element){
		// http://stackoverflow.com/a/3593250 http://stackoverflow.com/q/3593242 http://stackoverflow.com/questions/3593242/how-to-remove-all-attributes-from-body-with-js-or-jquery
		for( var i = element.attributes.length; i-->0; ){
			var attr = element.attributes[i];
			if( attr.nodeName.toLowerCase().indexOf('on')==0 ){
				element.removeAttributeNode(attr);
			}
		}
	};
	var removeScripts = function(el){
		var f;
		while( f = el.querySelector(dangerous_tags) ){ // we querying selector every time because tags can contain each other
			f.parentNode.removeChild(f);
		}
		var f = el.querySelectorAll('*');
		for(var i=f.length; i-->0; ){
			removeInlineHandlers( f[i] );
		}
	};
	return removeScripts;
})();

// Да простят меня авторы. Серьёзно, это уже порядком поднадоело.
var rx1 = /(?:(?:Мой )?(?:патреон|яндекс|yandex|paypal|wm(?:z|r|e|u)|кошелек|счет)[\s.-]*(?:кошелек|money|деньги)?:?|(?:https?:\/\/)?(?:www\.)?patreon.com\/[^\s]*|41\d{13}\b|(?:wm)?(?:z|r|e|u)\d{12}\b)/gi;
var rx2 = /(?:(?:\s*(?:<p>\s*<\/p>|<br ?\/? ?>)\s*)+|^(?:\s*<br ?\/? ?>)+|(?:<br ?\/? ?>\s*)+$)/gi;
PAGE.parsePageString = function(s){
	var o={};
	var parser = new DOMParser();
	var d = parser.parseFromString(s, "text/html");
	
	var x = d.querySelector('#content span.button.center a[onclick^="jumpTo"]');
	if(!x){return false;}
	x=$.trim(x.innerHTML).match(/^(\d+)\/(\d+)$/);
	if(!x){return false;}
	o.Page = parseInt(x[1]);
	o.LastPage = parseInt(x[2]);
	delete x;
	
	var x = d.querySelector('#contentMargin > div.forum');
		if(x){ x.parentNode.removeChild(x) }; delete x;
	var x = d.querySelector('#contentMargin > form');
		if(x){ x.parentNode.removeChild(x) }; delete x;
	var x = d.querySelector('#contentMargin > article.authors > .social');
		if(x){ x.parentNode.removeChild(x) }; delete x;
	// var x = d.querySelectorAll('#contentMargin > article.authors > div.description > p');
	// for(var i=x.length;i-->0;){
		// var T = $.trim(x[i].innerText);
		// var t = $.trim(T.replace(rx,''));
		// if( t == T ){continue;}
		// if( h == '' ){ x[i].parentNode.removeChild(x[i]);continue; }
		// var h = x[i].innerHTML.replace(rx,'');
		// x[i].innerHTML = h;
	// }
	var x = d.querySelector('#contentMargin > article.authors > div.description');
	if(x){ x.innerHTML = x.innerHTML.replace(rx1,'').replace(rx2,''); }
	delete x;
	
	var x = d.querySelector('#content > div.serial-nomargin #mainImage').getAttribute('src');
	o.Image = x;
	delete x;
	
	var x = d.querySelector('#content > div.serial-nomargin');
	PAGE.removeScripts(x);
	o.ContentSerialNomargin = x.innerHTML;
	delete x;
	
	var x = d.querySelector('#contentMargin');
	PAGE.removeScripts(x);
	o.ContentMargin = x.innerHTML;
	delete x;
	
	var x = d.querySelector('title');
	o.Title = x?( $.trim( x.innerText ) ):'?';
	delete x;

	return o;
};

PAGE.list2 = {};
PAGE.list2.init = function(){
	PAGE.list2.init = function(){};
	if( !/\/-[A-Za-z0-9_-]+\/list2/.test(location.pathname) ){return;}
	
	// $('div#contentMargin > div.agrHolder >table.agr >tbody>tr:first-child>td.agrBody>div.numbers')
	
	var div = $('div#contentMargin > div.agrHolder');
	if(!div.length){return;}
	div.find('>table.agr').css({marginBottom:'4px'}).each(function(){
		// var a = $(this).find('>tbody>tr:first-child>td.agrBody>h3>a');
		// if(!a.length){return;}
		// a = a[0].pathname;
		// if( a.substr(0,2)!='/~' ){return;}
		// a=a.substr(2);
		var b = $(this).find('>tbody>tr:first-child>td.agrBody>div.numbers a').eq(0);
			if(!b.length){return;}
		b=b[0].pathname;
		var m = /^\/~([^\/]+)\/(\d*)(?:\D|$)/.exec(b);
		if(!m){return;}
		
		// parse page info
		var comicsName = m[1];
		var comicsPage = parseInt(m[2],10);
		if( m[2]=='' || isNaN(comicsPage) || comicsPage<1 ) {return;}
		
		var k = PAGE.localStorageKeyPrefix + comicsName; // stored shit
		var stored = window.localStorage.getItem( k );
		if(stored){ stored = parseInt(stored,10)||false; } else {stored=false;}
		if(!stored){return;}
		
		if( stored == comicsPage ){
			$(this).css({backgroundColor:'#ccc',outline:'1px #999 solid'});
		} else if( stored < comicsPage ){
			$(this).css({backgroundColor:'#cff',outline:'1px #9ff solid'});
			
			var link = $('<a/>').addClass('agr-today').attr(
				'href', PAGE.makeUrlReference(stored,comicsName)
			).text(
				'Продолжить чтение со страницы '+stored+' (из '+comicsPage+')'
			).css({
				fontSize:'18px'
			});
			$(this).find('>tbody>tr:first-child>td.agrBody>div.numbers').prepend('<hr/>').prepend(link);
		}
		
		// PAGE.comicsName = m[1];
		// var comicsPage = parseInt(m[2],10);
	})
};

$(function(){
	(function(){
		// $('#common .inner td.nainmenu > nav > a[href$="/list2"]').css({backgroundColor:'#f00'});
		var a = $('#common .inner td.logo > a');
		var img = a.find('> img');
		if(!img.length){return;}
		var div = $('<div style="display:inline-block;overflow:hidden;width:55px;height:54px;height:100%;vertical-align:middle;padding-top:7px;" />');
		img.detach();
		div.append(img).appendTo(a);
		$('#common .inner td.logo').css('width','auto');
		
		var x = $('#common .inner td.nainmenu > nav > a[href$="/list2"]');
		
		x.css({fontWeight:'bold'});
		var y = $('<div/>').html('обновления').css({display:'inline-block',background:'#99f',borderRadius:'4px',border:'1px #66f solid',
			position:'absolute',marginTop:'-12px',marginLeft:'-48px',
			width:'64px',height:'14px',
			fontSize:'10px',fontFamily:'sans-serif',textTransform:'none',textAlign:'center',fontWeight:'normal'
		});
		y.insertBefore(x.find('>span'));
		
		var live = $('#common .inner td.nainmenu > nav > a[href$="/live"]').contents().filter(function(){return this.nodeType === 3;}).eq(0);
		if(live.length){ live[0].textContent='Live'; }
		var Top = $('#common .inner td.nainmenu > nav > a[href$="//top.a-comics.ru/"]').contents().filter(function(){return this.nodeType === 3;}).eq(0);
		if(Top.length){ Top[0].textContent='ТОП'; }
		// window.lol_y = y;
		// window.lol_x = x;
	})();
	
	if( !PAGE.preInit() ){
		PAGE.list2.init();
		return;
	}
	
	var current = (PAGE.init_comicsPage == PAGE.init_wantPage);
	var label = 'Запуск читалки';
	if( !current ){
		label = 'Продолжить чтение (стр. '+PAGE.init_wantPage+')';
	}
	var d = $('<div/>');
	
	$('<button/>').html('&times;').css({
		color:'#F00',fontWeight:'bold',fontSize:'16px',
		position:'absolute',left:'-10px',top:'-10px',width:'20px',height:'20px',padding:'1px'
	}).click(function(){
		d.remove();
	}).appendTo(d);
	
	
	$('<button/>').html(label).css({
		fontSize:'14px'
	}).click(function(){
		d.remove();
		PAGE.init();
		// w.history.pushState({a:location.href}, "* Супер-читалка", location.href);
	}).appendTo(d);
	if( !current ){
		d.append('<div>Произойдет переход на стр. '+PAGE.init_wantPage+'</div>');
		$('<button/>').html(
			'Читать со страницы '+PAGE.init_comicsPage+''
		).css({
			fontSize:'12px'
		}).click(function(){
			if(confirm(''
				+'Вы собираетесь удалить закладку со страницы '+PAGE.init_wantPage
				+'\nи продолжить чтение со страницы '+PAGE.init_comicsPage
				+'\n\nВсё верно?'
			)){
				PAGE.wantPage = PAGE.comicsPage = PAGE.init_comicsPage;
				// PAGE.store();
				// location.href = PAGE.makeUrl(PAGE.comicsPage);
				d.remove();
				PAGE.init();
			}
		}).appendTo(d);
		d.append('<div style="font-size:10px;">Закладка со стр. '+PAGE.init_wantPage+' будет удалена.</div>');
	}
	d.css({
		borderRadius:'4px',
		position:'fixed', // absolute
		zIndex:1e6,
		right:'3px',
		top:'3px',
		padding:'4px',
		background:'rgba(0,0,0,0.6)',
		color:'#fff',
		border:'2px rgba(0,0,0,0.9) solid'
	}).appendTo('body');
	setTimeout(function(){
		var inner = $('header#common > div.inner');
		if(!inner.length)return;
		if( d.offset().left < ( inner.offset().left + inner.width() + 55 ) ){
			d.css({ top: Math.round( inner.height() + 3 )+'px' })
		}
	},1);
});


*/});
var s=document.createElement('script');s.type='text/javascript';s.innerHTML=a;document.body.appendChild(s); // textContent instead of innerHTML?

})();
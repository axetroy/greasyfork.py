// ==UserScript==
// @name         HWM изменение размеров окна боя
// @version      1.0.2
// @description  Размер окна боя в процентах относительно размера экрана, после перехода на html5 стало на весь экран
// @author       incognito
// @grant        GM_setValue
// @grant        GM_getValue
// @include      https://www.heroeswm.ru/war.php*
// @include      https://www.lordswm.com/war.php*
// @namespace https://greasyfork.org/users/237404
// ==/UserScript==

(function (undefined) {

    if( !$('iframe').lenght && self == top  ){
        var warSizeWidth = GM_getValue("warSizeWidth") ? GM_getValue("warSizeWidth") : 60 ;
        var warSizeHeight = GM_getValue("warSizeHeight") ? GM_getValue("warSizeHeight") : 55 ;

        setUserSize(warSizeWidth, warSizeHeight);
        //$('body').html('<iframe frameborder="0" src="'+document.location.href+'" style="width:60vw;height:60vh;margin:20vh 20vw;"></iframe>');

        configHtml = '<div id="warWindowSize_config" style="width:90px;position:fixed;bottom:0;right:0;background:rgba(0,0,0,0.4);font-size:12px;text-align:right;color:#fff;">';
        configHtml += 'ширина<input type="number" id="warSizeWidth" value="'+warSizeWidth+'" style="width:35%;font-size:12px;" placeholder="ширина" min="20" max="100">%<br>';
        configHtml += 'высота<input type="number" id="warSizeHeight" value="'+warSizeHeight+'" style="width:35%;font-size:12px;" placeholder="высота" min="20" max="100">%<br>';
        configHtml += '<button onclick="location.reload();">Применить</button>';
        configHtml += '<button onclick="document.location.href='+"'http://www.heroeswm.ru/home.php';"+'">Покинуть бой</button>';
        configHtml += '</div>';
        $('body').append(configHtml);

        $(document).on('change click keyup', '#warWindowSize_config ', function() {
            GM_setValue('warSizeWidth', parseInt( $('#warWindowSize_config #warSizeWidth').val()*1 ) );
            GM_setValue('warSizeHeight', parseInt( $('#warWindowSize_config #warSizeHeight').val()*1 ) );
            console.log( parseInt( $('#warWindowSize_config #warSizeWidth').val()*1 ) );
            console.log( parseInt( $('#warWindowSize_config #warSizeHeight').val()*1 ) );
        });

    }

    function setUserSize(width, height){
        width = Math.max(width,30);
        height = Math.max(height,30);
        $('body *:not(#warWindowSize_config)').remove();
        $('body').append('<iframe frameborder="0" src="'+document.location.href+'"></iframe>');
        $('body iframe')
            .css('width', width+'vw')
            .css('height', height+'vh')
            .css('margin', parseInt((100-height)/2)+'vh '+parseInt((100-width)/2)+'vw');
    }


}());
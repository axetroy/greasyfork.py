// ==UserScript==
// @name         ČSFD Extended
// @namespace    CSFD-E
// @version      1.1.2
// @description  Rozšíření profilů filmů na ČSFD o funkce jako je hodnocení IMDB a Metacritic či odkazy na Ulož.to.
// @author       Jakub Rychecký <jakub@rychecky.cz>
// @license      WTFPL 2
// @include      *csfd.cz/film/*
// ==/UserScript==

var version = GM_info.script.version; // Verze skriptu vytažená z metadat









/**
 * 
 * ..:: INSTANCE A KÓD ::..
 * 
 */


var cache = new Cache(); // Objekt pro práci s cache

var csfd = new Csfd(); // Instance třídy pro práci s profilem filmu na ČSFD
var omdb = new OmdbApiWrapper(csfd.parseCsfdImdbCode()); // Instance třídy pro práci s API OMDB a stažení informací o filmu
var imdb = new Imdb(csfd.parseCsfdImdbCode()); // Instance třídy s informacemi z IMDB
var metacritic = new Metacritic(); // Instance třídy s informacemi z Metacritic
var box_office = new BoxOffice(); // Objekt celosvětových tržeb

var settings = new Settings(); // Objekt spravující nastavení ČSFD Extended

var html = new Html(); // Instance třídy pro práci s HTML a úpravou profilu filmu dle získaných dat
var floating = new Floating(); // Instance třídy spravující plovoucí okno s náhledem posterů či fotek tvůrců





settings.load(); // Načtení nastavení z local storage (nebo uložení, pokud není nalezeno)

html.cssInit(); // Přidání externího CSS do stránky


csfd.parseCsfdNameYear(); // Parsuje název filmu z profilu ČSFD.
csfd.parseCsfdRating(); // Parsuje hodnocení ČSFDs


html.ratingTable(); // Předělání tabulky hodnocení na profilu filmu
html.settingsForm(); // Vložení formuláře nastavení ČSFD Extended do stránky


if(settings.toolbar){ // Pokud je povolený panel s tlačítky...
  html.toolbar(); // Vytvoření tlačítek pro rychlé vyhledávání na profilu filmu
}


html.myRatingDate(); // Zobrazení datumu mého hodnocení
html.plotExpand(); // Zobrazení delší verze popisu (je-li)
html.hideCommentByIgnoreList(); // Skrytí komentářů ignorovaných uživatelů


omdb.fetchOmdbData(); // Stažení dat z API OMDB


floating.init(); // Inicializace plovoucího okna
floating.bindPoster(); // Bindování eventu najetí kurzoru na poster
floating.bindCreator(); // Bindování eventu najetí kurzoru na odkaz na profil tvůrce



/*
console.log(settings);
console.log(html);
console.log(csfd);
console.log(omdb);
console.log(imdb);
console.log(metacritic);
console.log(box_office);
*/;/**
 * @class BoxOffice
 * @classdesc Spravuje informace o US tržbách filmu.
 */

function BoxOffice(){
  
  /**
   * Hodnota celosvětových tržeb
   * @type {String} 
   */
  var box_office;
    
  
  
  
    
  /**
   * Nastavuje hodnotu tržeb v HTML kódu ČSFD profilu filmu.
   * @returns {undefined}
   */  
    
  this.insertBoxOfficeHtml = function(){
    if(typeof this.box_office !== 'undefined' && this.box_office !== 'N/A'){ // Pokud jsou nastavené nějaké US tržby...
      $('#csfd-e-rating .box-office .value').html(this.box_office.replace('.', ',')); // Vyplnění údaje do tabulky ČSFD Extended
      $('#csfd-e-rating .box-office').show(); // Zobrazení řádku v tabulce
    }
  };
};/**
 * @class Cache
 * @classdesc Třída pro práci s cache v podobě local storage.
 */

function Cache(){

  /**
   * Prefix názvu klíčů v local storage
   * @type String
   */
  this.prefix = 'csfd-e/';  

  /**
   * Jé :)
   * @type Cache
   */
  var parent = this;
    
  
  
  

  /**
   * Nastavuje objekt (odpověď OMDb) do cache pod určitým kódem.
   * @param {String} key Název klíče pro uložení do cache
   * @param {Object} object Objekt pro uložení do cache
   * @returns {undefined}
   */
    
  this.set = function(key, object){
    localStorage.setItem(this.prefix+key, JSON.stringify(object)); // Nastavení JSON objektu do cache
  };
 
 
 
  /**
   * Získává objekt z cache.
   * @param {String} key Název klíče pro získání z cache
   * @returns {Boolean} Byly nalezeny informace z cache?
   */
 
  this.get = function(key){
    var response = localStorage.getItem(this.prefix+key); // Získání údajů z cache tam, kde by měly být   
    response = $.parseJSON(response); // Snaha naparsovat JSON obsah cache

    if(response === null || response.timestamp <= $.now() - settings.cache_expire * 60 * 60){ // Pokud nebylo nic nalezeno, či pokud je to starší než limit...
      return false; // Cache miss!
    }else if(cache.isCacheAllowed()){ // ...avšak když je povolená cache...
      return response; // Cache hit - vrací uložený objekt
    }else{ 
      return false; // Cache miss!   
    }
  };
  
    
 
  /**
   * Vyčitění cache ČSFD Extended.
   * @returns {undefined}
   */
  
  this.clear = function(){
    for (var i = 0; i < localStorage.length; i++){ // Procházení jednotlivých krámů uložených v local storage...
      var key = localStorage.key(i); // Aktuální klíč

      if(key.indexOf(this.prefix) === 0 && key.match(/tt\d+/)){ // Pokud odpovídá IMDB kódu (tt\d+)...
        localStorage.removeItem(key); // ...vymazání itemu
      }
    }
  };
  
  

  /**
   * Zjišťuje, zda je povolená cache ČSFD Extended?
   * @returns {Boolean} Je povolená cache?
   */
  
  this.isCacheAllowed = function(){
    if(settings.cache_expire > 0){ // Pokud má cache nastavenou platnost...
      return true; // ...je povolená
    }else{ // ...platnost cache na 0 hodin nicméně znamená...
      return false; // ...že se cache nepoužívá
    }
  };
};/**
 * @class Csfd
 * @classdesc Parsuje a zpracovává základní údaje z ČSFD profilu filmu.
 */ 

function Csfd(){
  
  /** 
   * Originální název filmu
   * @type {String}
   */
  this.name;

  /**
   * Rok vzniku filmu
   * @type {Integer}
   */
  this.year;

  /**
   * Hodnocení ČSFD v procentech
   * @type {Integer}
   */
  this.rating;

  /**
   * Počet hodnocení na ČSFD
   * @type {Integer}
   */
  this.votes;
  
  
  
  
  
  /**
   * Parsuje název filmu z profilu ČSFD.
   * @return {undefined}
   */
   
  this.parseCsfdNameYear = function(){
    var title = $('meta[property=\'og:title\']').attr('content'); // Získání popisu ČSFD profilu z metatagu Open Graph (OG) http://ogp.me/
    title = title.replace(/\(TV seriál\)/, ''); // Odstranění označení TV seriálů z názvu
    title = title.replace(/\(TV film\)/, ''); // Odstranění označení TV filmů z názvu
    var title_regex = title.match(/(.+)\((\d{4})\)/); // Rozdělení na název a rok v závorce
     
     
    this.name = title_regex[1]; // Název filmu
    this.name = this.name.replace(/.+\//, ''); // Získání čehokoliv před lomítkem (= originální název)
    this.name = $.trim(this.name); // Oříznutí mezer názvu filmu
    
    
    this.year = parseInt(title_regex[2]); // Rok názvu jako integer
  };
    

    
  /**
   * Parsuje procentuální hodnocení a počet hlasů z profilu ČSFD.
   * @return {undefined}
   */
  
  this.parseCsfdRating = function(){
    this.rating = $('meta[itemprop="ratingValue"]').attr('content'); // Získání procentuálního hodnocení z metatagů
    this.rating = parseInt(this.rating); // Hodnocení v procentech jako integer
    
    this.votes = $('meta[itemprop="ratingCount"]').attr('content'); // Získání počtu hlasů z metatagů
    this.votes = parseInt(this.votes); // Počet hlasů jako integer
  };
  
  
  
  /**
   * Parsuje kód filmu na IMDB z tlačítka IMDB na profilu filmu na ČSFD.
   * @return {String} Kód filmu na IMDB
   */
    
  this.parseCsfdImdbCode = function(){
    var imdb_btn = $('#sidebar a[href*="imdb.com/title"]');
    
    if(imdb_btn.length > 0){
      var imdb_code = imdb_btn.attr('href').match(/(tt\d+)/); // Extrahování kódu filmu na IMDB

      return imdb_code[1]; // Vrací extrahovaný kód IMDB
    }else{
      return '';
    }
  };
  
  
  
  /**
   * Získává barevné ladění ČSFD profilu filmu z boxu hodnocení. 
   * @returns {jQuery} CSS barva profilu filmu. Červená pro kvalitní filmy, modrá po průměrné a černá pro Ulici. :)
   */
  
  this.color = function(){
    return $('#rating').css('background'); // Barva profilu filmu na ČSFD
  };
  
  
};/**
 * @class Floating
 * @classdesc Základní třída, která generuje toolbar, šablonu tabulky hodnocení ČSFD Extended a nějaké další serepetičky.
 */

function Floating(){
  
  /**
   * jQuery objekt plovoucího rámečku
   * @type {jQuery}
   */
  this.floating;  
  
  /**
   * jQuery objekt AJAX dotazu na obrázek tvůrce
   * @type {jQuery}
   */
  this.request;
    
  /**
   * Jé :)
   * @type Floating
   */
  var parent = this;

    
    
  

  
  /**
   * Inicializace plovoucího rámečku ČSFD Extended.
   * @returns {undefined}
   */  
    
  this.init = function(){
    var html = '<img id="csfd-e-floating" src="" alt="" />'; // HTML plovoucího obrázku
     
    $('body').append(html); // Přidání na konec těla stránky
     
    this.floating = $('#csfd-e-floating'); // HTML objekt plovoucího obrázku
  };

 
 
  /**
   * Obnovuje polohu plovoucího okna s tím, jak se kurzor myši pohybuje po objektu, který je v parametru této metody.
   * @param {jQuery} obj jQuery objekt, po kterém se pohybuje kurzor
   * @returns {undefined}
   */
  
  this.refresh = function(obj){      
    obj.mousemove(function(e){ // Při každém pohybu kurzoru...
      parent.floating.css({'top': e.pageY + settings.floating_offset_y, 'left': e.pageX + settings.floating_offset_x, 'display': 'inline'}); // Opětovné nastavení polohy plovoucího rámečku vůči kurzoru myši  
    });
     
     
    obj.mouseout(function(){ // Při opuštění kurzoru z objektu...
      parent.floating.hide(); // Skrytí plovoucího rámečku
      parent.floating.attr('src', ''); // Nastavneí obrázku na... nic
      parent.request.abort(); // Přerušení AJAXového dotazu
    });  
  };
 
  
  
  /**
   * Zajišťuje zvětšený plovoucí náhled posteru filmu na profilu ČSFD.
   * @returns {undefined}
   */
 
  this.bindPoster = function(){
    var poster = $('#poster img, #posters img'); // Všechny postery...


    $('#show-all-posters').click(function(){ // Kliknutí na tlačítko "všechny plakáty" je stahuje AJAXem...
      parent.bindPoster(); // ...je třeba tedy kvůli selektroru tuto metodu znovu zavolat
    });


    poster.mouseenter(function(e){ // Najetí kurzorem na náhled posteru...
      var poster_url = $(this).attr('src'); // Získání URL obrázku
      poster_url = poster_url.replace(/\?.+/, ''); // Odstranění GET z URL

      parent.floating.attr('src', poster_url); // Nastavení obrázku plného posteru do plovoucího rámečku
    });

    this.refresh(poster); // Obnovování polohy s tím, jak jezdí kurzor po náhledu posteru
  };
 
 
 
  /**
   * Zajišťuje náhled profilové fotky tvůrce při najetí na jeho jméno na profilu filmu.
   * @returns {undefined}
   */
 
  this.bindCreator = function(){
    var links = $('.creators a'); // Odkaz na tvůrce (herci, režiséři...)

    links.mouseenter(function(e){ // V okamžiku, kdy kurzor na jeden z odkazů vjede...
      var url = $(this).attr('href'); // Získání URL profilu 
      parent.fetchCreatorHtml(url); // Stažení fotografie tvůrce
      parent.refresh(links); // Obnovování polohy s tím, jak jezdí kurzor po odkazu na tvůrce
    });
  };
  
  
  
  /**
   * Stahuje a nastavuje fotografii tvůrce do plovoucího rámečku.
   * @param {String} url Adresa stránky profilu tvůrce
   * @returns {undefined}
   */
  
  this.fetchCreatorHtml = function(url){
    parent.request = $.ajax({ // AJAXový dotaz pro získání HTML ze stránky tvůrce...
      method: 'GET',
      url: url // Adresa profilu tvůrce
    });

    parent.request.done(function(response){ // Po úspěšném stažení HTML celé stránky tvůrce...
      if(response.redirect){ // Pokud se jedná o přesměrování (tj. nevyplněný profil tvůrce směruje na zajímavosti, galerii...)
        parent.fetchCreatorHtml(response.redirect); // Provede se celé toto stažení znovu
      }else{ // ...v opačném případě došlo k získání relevantních dat...
        var img =  $(response).find('#profile .image img').attr('src'); // Nalezení URL profilového obrázku

        parent.floating.attr('src', img); // Nastavení URL obrázku do plovoucího rámečku  
      }
    });
  };
};/**
 * @class Html
 * @classdesc Základní třída, která generuje toolbar, šablonu tabulky hodnocení ČSFD Extended a nějaké další serepetičky.
 */

function Html(){
  
  /**
   * jQuery objekt toolbaru ČSFD Extended
   * @type {jQuery}
   */
  this.toolbar;

  /**
   * jQuery objekt tabulky hodnocení ČSFD Extended
   * @type {jQuery}
   */
  this.table;





  /**
   * Inicializuje CSS pro skript ČSFD Extended.
   * @returns {undefined}
   */
  
  this.cssInit = function(){
    // Minified CSS
    var css = '#csfd-e-toolbar{width:100%;font-size:8pt;margin:-8px auto 10px;text-align:center;z-index:9999}#csfd-e-toolbar a{color:#fff;padding:5px 7px;font-weight:bold}#csfd-e-toolbar a:hover{text-decoration:none;text-shadow:0 0 6px #fff}#csfd-e-toolbar a:first-child{border-radius:0 0 0 10px;padding-left:10px}#csfd-e-toolbar a:last-child{border-radius:0 0 10px 0;padding-right:10px}#csfd-e-rating{width:100%}#csfd-e-rating table{width:270px;margin:6px 10px}#csfd-e-rating table td{vertical-align:middle}#csfd-e-rating table .favicon{width:20px}#csfd-e-rating table .favicon img{height:16px}#csfd-e-rating table .title{width:130px;font-weight:bold;color:#b01}#csfd-e-rating table .rating,#csfd-e-rating table .value{text-align:right;font-weight:bold;white-space:nowrap}#csfd-e-rating table .votes{font-size:7pt;text-align:right;color:#777;padding-left:5px}#csfd-e-rating .footer{font-size:7pt;text-align:right;color:#aaa}#csfd-e-rating .footer a{color:#fc9c9c}#csfd-e-floating{position:absolute;display:none;z-index:99999;border:1px solid #000;box-shadow:2px 2px 8px #333;padding:0;background:#f5f5f5;max-height:512px}#csfd-e-floating img{max-height:512px}#csfd-e-settings .csfd-e-header{color:#b01;font-weight:bold;margin-top:6px;padding-top:3px;font-size:10pt}#csfd-e-settings .csfd-e-section{font-size:8pt;margin-left:20px;padding-left:5px;border-left:1px solid #b01}#csfd-e-settings .csfd-e-section label{font-weight:bold}#csfd-e-settings .csfd-e-section label:hover{cursor:pointer}#csfd-e-rating-date{font-size:7pt;text-align:center}.help:hover{cursor:help}';
    
    $('head').append('<!-- CSFD Extended Style --><style type="text/css">'+css+'</style>'); // Vložení CSS do hlavičky HTML kódu
  };
    
 
 
  /**
   * Stará se o vyplnění potřebných údajů do šablony tabulky hodnocení ČSFD Extended.
   * @returns {undefined}
   */
 
  this.fillRatingTable = function(){
    imdb.insertRatingHtml(); // Vyplnění údajů IMDB
    metacritic.insertRatingHtml(); // Vypnění údajů Metacritic

    this.table.show(); // Zobrazení tabulky
  };



  /**
   * Generuje a vkládá do profilu filmu šablonu tabulky hodnocení ČSFD Extended pro IMDB a Metacritic
   * @returns {undefined}
   */
 
  this.ratingTable = function(){
    var html = '';
            
    html += '<div id="csfd-e-rating" class="ct-related" style="display: none;">'; // Začátek tabulky hodnocení ČSFD Extended

      html += '<div class="header"><h3>ČSFD Extended</h3></div>'; // Nadpis ČSFD-like


      html += '<div class="content">'; 

        html += '<table>'; // Tabulkáá    

          html += '<tr class="imdb" style="display: none;">'; // Řádek údajů IMDB
            html += '<td class="favicon"><img src="http://www.google.com/s2/favicons?domain=imdb.com" alt="" /></td>';
            html += '<td class="title"><a href="" class="link" title="Otevřít profil na IMDB">IMDB</a></td>';
            html += '<td class="rating"></td>';
            html += '<td class="votes"></td>';
          html += '</tr>';

          html += '<tr class="metacritic" style="display: none;">'; // Řádek údajů Metacritic
            html += '<td class="favicon"><img src="http://www.google.com/s2/favicons?domain=metacritic.com" alt="" /></td>';
            html += '<td class="title"><a href="" class="link" title="Otevřít seznam recenzí Metacritic">Metacritic</a></td>';
            html += '<td class="rating help" title="Agregované skóre z profesionálních recenzí periodik a webů zapojených do Metacritic"></td>';
          html += '</tr>';
      
          html += '<tr class="box-office" style="display: none;">';  // Řádek údajů tržeb filmu
            html += '<td class="favicon"></td>';
            html += '<td class="title">US tržby</td>';
            html += '<td class="value help" title="Tržby filmu v USA (box office)" colspan="2"></td>';
          html += '</tr>'; 

        html += '</table>';
     
     
        html += '<div class="footer">'; // Drobné zápatí
        html += '<a href="javascript:void(0)" id="csfd-e-settings-btn">Nastavení</a> | '; // Tlačítko "Nastavení"
        html += 'by <a href="http://www.csfd.cz/uzivatel/99999-jacube/">jaCUBE</a> via <a href="https://greasyfork.org/cs/scripts/15784-%C4%8Csfd-extended">Greasy Fork</a>';
        html += '</div>';
    
      html += '</div>';
     
    html += '</div>';


    $('#ratings').before(html); // Vložení do profilu filmu na ČSFD hned pod tabulku hodnocení vpravo nahoře
    
    this.table = $('#csfd-e-rating'); // jQuery objekt tabulky hodnocení
    
    
    
    $('#csfd-e-settings-btn').click(function(){ // Kliknutí na tlačítko "Nastavení" v zápatí..
      $('#csfd-e-settings').slideToggle(); // Zobrazuje/skrývá formulář nastavení
    });
  };
 
 
 
  /**
   * Generuje HTML kód toolbaru ČSFD Exteded s rozličnými užitečnými odkazy.
   * @returns {undefined}
   */
 
  this.toolbar = function(){
    var name_url = encodeURIComponent(csfd.name); // Ošetřený název filmu

    var html = '';
    html += '<div id="csfd-e-toolbar">';

      html += '<a href="https://www.google.cz/search?q='+name_url+'" target="_blank">Google</a>'; // Tlačtíko Google
      html += '<a href="https://www.youtube.com/results?search_query='+name_url+'" target="_blank">YouTube</a>'; // Tlačítko YouTube
      html += '<a href="https://www.reddit.com/search?q='+name_url+'+subreddit%3Amovies+OR+subreddit%3Atelevision+OR+subreddit%3Atrailers&sort=relevance&t=all" target="_blank">Reddit</a>'; // Omezeno na r/movies, r/television a r/trailers
      html += '<a href="https://www.facebook.com/search/pages/?q='+name_url+'" target="_blank">Facebook</a>'; // Tlačítko Facebook
      html += '<a href="http://www.titulky.com/?Fulltext='+name_url+'" target="_blank">Titulky.com</a>'; // Tlačtíko Titulky.com
      html += '<a href="https://trakt.tv/search?query='+name_url+'" target="_blank">Trakt.tv</a>'; // Vyhledávání torrentů přes The Pirate Bay
      html += '<a href="http://www.uloz.to/hledej?media=video&protected=notPassword&redir=0&q='+name_url+'" target="_blank">Ulož.to</a>'; // Tlačítko Ulož.to
      html += '<a href="https://www.google.cz/search?q='+name_url+' site:yts.ag OR site:yify-movies.net OR site:yify-movie.com" target="_blank">YIFY</a>'; // Tlačítko vyhledávání YIFY releasů přes Google
      html += '<a href="https://thepiratebay.org/search/'+name_url+'" target="_blank">TPB</a>'; // Vyhledávání torrentů přes The Pirate Bay
      html += '<a href="http://www.boxofficemojo.com/search/?q='+name_url+'" target="_blank">BoxOffice</a>'; // Vyhledávání tržeb filmu
      
    html += '</div>';

    $('#profile div.content').prepend(html); // Připojení toolbaru nad ČSFD profil filmu 

    this.toolbar = $('#csfd-e-toolbar'); // jQuery objekt toolbaru

    this.colourToolbar(); // Obarvení toolbaru
  };

  
  
  /**
   * Přidává do toolbaru odkaz na oficiální web filmu, jeho URL byla stažena z OMDb.
   * @param {String} www URL filmu/seriálu
   * @returns {undefined}
   */
  
  this.addWebsiteToToolbar = function(www){
    if(www !== '' && www !== 'N/A' && settings.toolbar){ // Pokud je uveden nějaký web...
      var html = '<a href="'+www+'" target="_blank" title="Oficiální web filmu/seriálu">WWW</a>'; // HTML kód tlačítka
      this.toolbar.prepend(html); // Přidání tlačítka na začátek toolbaru

      this.colourToolbar(); // Opětovné obarvení toolbaru (včetně nového tlačítka)
    }
  };
  
  
  
  /**
   * Obarvuje tlačítka toolbaru dle barvy filmu na ČSFD (červená, modrá, černá, šedá) tak, aby toolbar zapadl. :)
   * @returns {undefined}
   */
  
  this.colourToolbar = function(){
    this.toolbar.find('a').css({background: csfd.color()}); // Obarvení tlačítek toolbaru barvou filmu ČSFD
  };
  
  
  
  /**
   * Vytahuje a zviditelňuje datum vložení vlastního hodnocení filmu.
   * @returns {undefined}
   */
  
  this.myRatingDate = function(){
    if(settings.my_rating_date){ // Pouze pokud je zobrazování datumu hodnocení zapnuto...
      var title = $('.my-rating > span').attr('title'); // Získání atributu title hvězdiček 

      if(typeof title !== 'undefined'){ // Pokud byl tento film už mnou hodnocen...
        title = title.replace('vloženo ', ''); // Odstranění slova "vloženo"

        var html = '<div id="csfd-e-rating-date" title="Datum přidání mého hodnocení">'+title+'</div>'; // HTML kód datumu přidání mého hodnocení

        $('#my-rating form').before(html); // Přidání mého hodnocení pod hvězdičky
      }
    }
  };
  
  
  
  /**
   * Generuje nastavení ČSFD Exteded a vkládá jej do stránky.
   * @returns {undefined}
   */  
      
  this.settingsForm = function(){
    var html = ''; // Inicace proměnné
      
    html += '<div id="csfd-e-settings" class="ct-related" style="display: none">'; // Začátek nastavení ČSFD Extended
      html += '<div class="header"><h3>ČSFD Extended - Nastavení</h3></div>'; // Nadpis ČSFD-like
      
      html += '<div class="content">'; // HTML nastavení toolbaru
        html += '<div class="csfd-e-header">Obecné</div>';
        html += '<div class="csfd-e-section">';
          html += '<label for="csfd-e-settings-toolbar">Zobrazovat toolbar s tlačítky?</label>';
          html += '<input type="checkbox" id="csfd-e-settings-toolbar" />';
          html += '<br />';
          html += '<label for="csfd-e-settings-my-rating-date">Zobrazovat datum mého hodnocení?</label>';
          html += '<input type="checkbox" id="csfd-e-settings-my-rating-date" />';
          html += '<br />';
          html += '<label for="csfd-e-settings-plot-expand">Rozbalovat automaticky obsah filmu?</label>';
          html += '<input type="checkbox" id="csfd-e-settings-plot-expand" />';
        html += '</div>';
        
        html += '<div class="csfd-e-header">Komentáře</div>';
        html += '<div class="csfd-e-section">';
          html += '<label for="csfd-e-settings-ignore-list">Skrýt komentáře od uživatelů:</label><br />';
          html += '<input type="text" id="csfd-e-settings-ignore-list" style="width: 100%" placeholder="Oddělujte přezdívky čárkami" />';
        html += '</div>';

        html += '<div class="csfd-e-header">Cache</div>'; // HTML nastavení cache
        html += '<div class="csfd-e-section">';
          html += '<label for="csfd-e-settings-cache-expire">Platnost cache:</label>';
          html += '<input type="number" id="csfd-e-settings-cache-expire" style="width: 50px; text-align: right" /> hod.';
          html += '<div>';        
            html += '<a href="javascript:void(0)" id="csfd-e-cache-clear-btn" title="Jednorázově vymaže již stažené informace o hodnocení">Vyčistit cache</a> | '; // Tlačítko na vyčištění cache
            html += '<a href="javascript:void(0)" id="csfd-e-cache-disable-btn" title="Vypne používání cache pro ČSFD Extended (způsobuje delší načítání stránky)">Vypnout cache</a>'; // Tlačítko na vyčištění cache
          html += '</div>';
        html += '</div>';
        
        html += '<div class="csfd-e-header">Náhledy posterů &amp; fotek</div>'; // HTML nastavení cache
        html += '<div class="csfd-e-section">';
          html += '<label for="csfd-e-settings-floating-offset-x">Horizontální odsazení:</label>';
          html += '<input type="number" id="csfd-e-settings-floating-offset-x" style="width: 50px; text-align: right" /> px';
          html += '<br />';
          html += '<label for="csfd-e-settings-floating-offset-y">Vertikální odsazení:</label>';
          html += '<input type="number" id="csfd-e-settings-floating-offset-y" style="width: 50px; text-align: right" /> px';
        html += '</div>';
      html += '</div>';
      
      html += '</div>';
    html += '</div>';
     
    
    this.table.after(html); // Vložení za tabulku hodnocení ČSFD Extended
      
    settings.fillForm(); // Vyplnění vygenerovaného formuláře již nastavenými hodnotami
    settings.bind(); // Přiřazení dalších funkcí nejen tlačítek ve formuláři nastavneí
   }; 


  
  /**
   * Automaticky otevírá rozšířený popis filmu, je-li takový.
   * @returns {undefined}
   */
  
  this.plotExpand = function(){
    if(settings.plot_expand){ // Pokud je v nastavení povolené automatické rozbalování...
      $('#plots .content a').click(); // Pokud je tam tlačítko (více)... KLIK!
    }
  };
  
  
  
  /**
   * Skrývá komentáře ignorovaných uživatelů.
   * @returns {undefined}
   */
  
  this.hideCommentByIgnoreList = function(){    
    var ignore_list_parsed = settings.ignore_list.split(','); // Parsování dle čárek

    for(var i = 0; i < ignore_list_parsed.length; i++){ // Procházení pole ignorovaných užiatelů...
      ignore_list_parsed[i] = ignore_list_parsed[i].replace(' ', ''); // Odstranění mezery před/za jménem
    }
    
    
    $('.comments .content li').each(function(){ // Procházení všech komentářů na profilu filmu...
      var author = $(this).find('.author').text(); // Přezdívka autora

      if($.inArray(author, ignore_list_parsed) !== -1){ // Pokud je přezdívka autora v ignorovaných...
        $(this).hide(); // Skryje celý komentář
      }
    });
  };
  
  
};/**
 * @class Imdb
 * @classdesc Udržuje a zpracovává všechny údaje o filmu na webu IMDB: http://imdb.com/
 * @param {String} imdb_code IMDB kód filmu
 */

function Imdb(imdb_code){
  
  /**
   * IMDB kód filmu
   * @type {String}
   */
  this.imdb_code = imdb_code; 

  /**
   * Číselné hodnocení filmu na IMDB
   * @type {Float}
   */
  this.rating;
  
  /**
   * Počet hlasů na IMDB
   * @type {Integer}
   */
  this.votes;
    




  /**
   * Vyplňuje údaje z IMDB do tabulky hodnocení ČSFD Extended.
   * @returns {undefined}
   */
 
  this.insertRatingHtml = function(){
    if(this.rating > 0){ // Pouze pokud je film na IMDB hodnocený...
      $('#csfd-e-rating .imdb').show(); // Zobrazení řádku IMDB
      
      $('#csfd-e-rating .imdb .rating').html(imdb.rating.toLocaleString().replace('.', ',')); // Vložení hodnocení IMDB (nahrazení desetinné tečky desetinnou čárkou)
      $('#csfd-e-rating .imdb .votes').html(imdb.votes.toLocaleString()+'&nbsp;hlasů'); // Vložení počtu hlasů z IMDB

      $('#csfd-e-rating .imdb a').attr('href', this.link()); // Vložení odkazu na IMDB
    }
  };
 
 
 
  /**
   * Generuje odkaz na IMDB profil filmu.
   * @returns {String} URL na IMDB profil filmu
   */
  
  this.link = function(){
    return 'http://www.imdb.com/title/'+this.imdb_code+'/'; // URL na IMDB profil filmu
  };
}
;/**
 * @class Metacritic
 * @classdesc Udržuje a zpracovává všechny údaje o filmu na webu Metacritic: http://metacritic.com/
 */

function Metacritic(){
  
  /**
   * Metascore z Metacritic (agregované z profesionálních recenzí)
   * @type {Integer}
   */
  this.metascore;





  /**
   * Vyplňuje údaje z Metacritic do tabulky hodnocení ČSFD Extended.
   * @returns {undefined}
   */

  this.insertRatingHtml = function(){
    if(this.metascore > 0){ // Pouze pokud je získáno nějaké Metascore...
      $('#csfd-e-rating .metacritic').show(); // Zobrazení řádku Metacritic
      
      $('#csfd-e-rating .metacritic .rating').html(this.metascore); // Nastavneí hodnoty Metascore
      $('#csfd-e-rating .metacritic a').attr('href', this.link()); // Nastavení odkazu na profil IMDB s přehledem Metacritic recenzí
    }
  };
 
 
 
  /**
   * Generuje odkaz na IMDB stránku s přehledem Metacritic recenzí filmu.
   * @returns {String} URL IMDB stránky s přehledem Metacritic recenzí filmu
   */
  
  this.link = function(){
    return 'http://www.imdb.com/title/'+imdb.imdb_code+'/criticreviews'; // URL IMDB stránky s přehledem Metacritic recenzí filmu
  };
};/**
 * @class OmdbApiWrapper
 * @classdesc Stahuje, parsuje a zpracovává údaje o filmu staženém z OMDB API http://www.omdbapi.com/
 * @param {String} imdb_code IMDB kód filmu
 */

function OmdbApiWrapper(imdb_code){
  
  /**
   * IMDB kód filmu
   * @type {String}
   */
  this.imdb_code = imdb_code;
  
  /**
   * Objekt odpovědí OMDb API s údaji o filmu
   * @type {object}
   */
  this.response;
  
  /**
   * Jé. :)
   * @type OmdbApiWrapper
   */
  var parent = this;
 
 
 


  /**
   * Snaží se získat údaje z cache, při neúspěchu stahuje údaje z OMDb API.
   * @returns {undefined}
   */
 
  this.fetchOmdbData = function(){
    var cache_data = cache.get(this.imdb_code); // Cache miss nebo hit?
    
    if(!cache.isCacheAllowed() || !cache_data){ // Pokud je cache zakázána, nebo údaje z cache nejsou dostupné...
      var request = $.ajax({ // AJAXový dotaz
        method: 'GET',
        url: 'https://omdbapi.com/',
        data: { // Dotaz pro OMDb API
          i: this.imdb_code,
          r: 'json',
          apikey: 'ee2fe641'
        }
      });

      request.done(function(response){ // Po stažení odpovědi...
          response.timestamp = $.now(); // Přidání aktuálního unixového času do objektu odpovědi
          parent.response = response; // Nastavení odpovědi do tohoto objektu
          parent.processOmdbData(); // Zpracování stažené odpovědi

          if(cache.isCacheAllowed() && response.imdbRating > 0){ // Pokud je cache povolená a zároveň se podařilo stáhnout alespoň nějaké hodnocení IMDB...
            cache.set(parent.imdb_code, response); // Uloží odpověď do cache (local storage) s klíčem jako kódem filmu na IMDB
          }
      });   
    }else{ // ...pokud se podařilo získat odpověď z cache...
      this.response = cache_data; // Nastavení odpovědi jako objektu získaného z cache
      this.processOmdbData(); // Zpracování odpovědi z cache
    }
  };
 
 
 
  /**
   * Zpracovává odpověď z OMDb API, ať už staženou nebo získanou z cache.
   * @returns {undefined}
   */
 
  this.processOmdbData = function(){
    var response = this.response; // Objekt odpovědi

    imdb.rating = parseFloat(response.imdbRating); // Hodnocení na IMDB
    imdb.votes = response.imdbVotes.replace(/\,/g,''); // Počet hlasů IMDB (odstranění čárek v řádů tisíců)
    imdb.votes = parseInt(imdb.votes); // Počet hlasů IMDB (číslo)

    metacritic.metascore = parseInt(response.Metascore); // Metascore z Metacritic

    box_office.box_office = response.BoxOffice; // Nastavení tržeb dle objektu odpovědi 
    box_office.insertBoxOfficeHtml(); // Vložení US tržeb na profil filmu
      
    html.addWebsiteToToolbar(response.Website); // Přidání oficiálního webu do toolbaru
    html.fillRatingTable(); // Vyplnění tabulky hodnocení ČSFD Extended
  };
};/**
 * @class Settings
 * @classdesc Zpracovává, načítá a ukládá nastavení ČSFD Extended.
 */

function Settings(){
  
  /**
   * Má se zobrazovat toolbar? (výchozí: ano)
   * @type Boolean
   */
  this.toolbar = true;
  
  /**
   * Má se zobrazovat datum mého hodnocení? (výchozí: ano)
   * @type Boolean
   */
  this.my_rating_date = true;
  
  /**
   * Má se rozjíždět kompletní osbah filmu (pokud je k dispozici)?
   * @type Boolean
   */
  this.plot_expand = true;
  
  /**
   * Doba platnosti cache v hodinách (výchozí: 48)
   * @type Boolean
   */
  this.cache_expire = 48;
  
  /**
   * Seznam ignorovaných uživatelů
   * @type String
   */
  this.ignore_list = '';
  
  /**
   * Horizontální odsazení plovoucích objektů.
   * @type Integer
   */
  this.floating_offset_x = 20;
  
  /**
   * Vertikální odsazení plovoucích objektů.
   * @type Integer
   */
  this.floating_offset_y = 20;
  
  /**
   * Verze ČSFD Extended
   * @type String
   */
  this.version = version;
  
  /**
   * Unixový timestamp nastavení
   * @type Integer
   */
  this.timestamp = $.now();
  
  /**
   * Jé :)
   * @type Settings
   */
  var parent = this;  





  /**
   * Ukládá nastavení v tomto objektu do local storage prohlížeče.
   * @returns {undefined}
   */
    
  this.save = function(){
    this.version = version; // Nastavení aktuální verze skriptu při ukládání
    this.timestamp = $.now(); // Nastavení timestampu při ukládání
    
    localStorage.setItem('csfd-e-settings', JSON.stringify(this)); // Uložení JSON nastavení do local storage
  };
  
  
  
  /**
   * Načítá nastavení z local storage prohlížeče a ukládá jej do tohoto objektu.
   * @returns {undefined}
   */  
  
  this.load = function(){ 
    if(localStorage.getItem('csfd-e-settings') !== null){ // Pokud se podařilo načíst nastavení z local storage...
      var settings_ls = JSON.parse(localStorage.getItem('csfd-e-settings')); // Převedení načteného JSON na objekt
      $.extend(this, settings_ls); // Nastavení atributů tohoto objektu dle údajů z local storage
    }else{ // ...jinak se načíst nastavení NEzdařilo (tj. první spuštění skriptu)...
      this.fillForm(); // Vyplnění formuláře daty
      this.save(); // Uložení nastavení do local storage prohlížeče
    }
  };
  
  

  /**
   * Získává údaje z formuláře do tohoto objektu
   * @returns {undefined}
   */
  
  this.getForm = function(){
    this.cache_expire = parseInt($('#csfd-e-settings-cache-expire').val()); // Získání hodnoty expirace cache
    
    this.ignore_list = $('#csfd-e-settings-ignore-list').val(); // Získání hodnoty ignorovaných uživatelů
    
    this.floating_offset_x = parseInt($('#csfd-e-settings-floating-offset-x').val()); // Získání hodnoty horizontálního odsazení
    this.floating_offset_y = parseInt($('#csfd-e-settings-floating-offset-y').val()); // Získání hodnoty vertikálního odsazení
      
    this.toolbar = $('#csfd-e-settings-toolbar').is(':checked'); // Získání hodnoty zobrazování toolbaru
    this.my_rating_date = $('#csfd-e-settings-my-rating-date').is(':checked'); // Získání hodnoty zobrazování datumu mého hodnocení
    this.plot_expand = $('#csfd-e-settings-plot-expand').is(':checked'); // Získání hodnoty automatického rozšíření popisu filmu
  };
  
  

  /**
   * Vyplňuje formulář nastavení údaji z local storage.
   * @returns {undefined}
   */
  
  this.fillForm = function(){
    $('#csfd-e-settings-cache-expire').val(this.cache_expire); // Nastavení hodnoty expirace cache
    
    $('#csfd-e-settings-ignore-list').val(this.ignore_list); // Nastavení seznamu ignorovaných uživatelů
    
    $('#csfd-e-settings-floating-offset-x').val(this.floating_offset_x); // Nastavení hodnoty horizontálního odsazení
    $('#csfd-e-settings-floating-offset-y').val(this.floating_offset_y); // Nastavení hodnoty vertikálního odsazení
      
    $('#csfd-e-settings-toolbar').attr('checked', this.toolbar); // Nastavení hodnoty zobrazování toolbaru
    $('#csfd-e-settings-my-rating-date').attr('checked', this.my_rating_date); // Nastavení hodnoty zobrazování datumu mého hodnocení
    $('#csfd-e-settings-plot-expand').attr('checked', this.plot_expand); // Nastavení hodnoty automatického rozšíření popisu filmu
  };
  
  

  /**
   * Binduje akce na tlačítka v nastavení ČSFD Extended.
   * @returns {undefined}
   */
  
  this.bind = function(){      
    $('#csfd-e-settings input').bind('change keyup', function(){ // Každá změna formuláře...
      parent.getForm(); // Získá hodnoty z formuláře do JS objektu
      parent.save(); // Uloží hodnoty do JSON local storage
    });
    
    $('#csfd-e-cache-clear-btn').click(function(){ // Kliknutí na tlačítko vymazání cache...
      cache.clear(); // Vymazání cache ČSFD Extended
      location.reload(); // Refresh stránky  
    });
      
    $('#csfd-e-cache-disable-btn').click(function(){ // Kliknutí na tlačítko vypnutí cache...
      $('#csfd-e-settings-cache-expire').val(0); // Nastavení hodnoty na nulu
      $('#csfd-e-settings-cache-expire').change(); // Fire změny vstupu pro uložení nastavení
    });
  };
}

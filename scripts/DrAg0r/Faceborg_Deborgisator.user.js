// ==UserScript==
// @name         Faceborg_Deborgisator
// @namespace    DrAg0r.facebook
// @version      1.9.6
// @description  Supprime tous les post ne provenant pas de vos amis ou des pages/groupes que vous aimez
// @author       DrAg0r
// @include      https://www.facebook.com/*
// @require      https://code.jquery.com/jquery-2.1.4.min.js
// @grant        none
// ==/UserScript==
$(function () {
  'use strict';
  $('body').append('<div style="position: fixed; top: 0; right: 5px; z-index: 9999;">Faceborg_Deborgisator Actif</div>');
  var keywords = [
    ' a commenté ',
    'Publication suggérée',
    ' ont réagi à ça.',
    ' aime ça.',
    ' ont commenté ça.',
    'a répondu à',
    ' a réagi à ça.',
    ' a été identifié(e).',
    'Connaissez-vous...',
    ' sur ça.',
    'Actualités de Pages à voir',
    ' a aimé la photo de couverture de ',
    ' aime ',
    ' aiment ',
    '  sont désormais amis.',
    'Suggestion de Page',
    'Jeu suggéré',
    ' a commenté. ça.',
    'Vidéo en direct populaire',
    'Recommandations',
    'Une vidéo que vous pourriez aimer',
    ' a récemment commenté ça.',
    'Populaire sur Facebook',
    'Produits affichés',
    'Publication sugg',
    'Semblable aux publications avec lesquelles vous avez interagi',
    'Sponsorisé'
  ];
  prepare();
  exec();
  function exec() {
    filterAll()
    setTimeout(function () {
      filterAll()
    }, 2500);
    setTimeout(function () {
      filterAll()
    }, 5000);
  }
  $('a').click(function () {
    exec();
  });
  $('span').click(function () {
    exec();
  });
  $('div').click(function () {
    exec();
  });
  $('img').click(function () {
    exec();
  });
  $(document).on('scroll', filterAll);
  function prepare() {
    String.prototype.contains = function (it) {
      return this.indexOf(it) != - 1;
    };
  }
  function filter(index, elem) {
    if (!$(elem).attr) {
      return;
    }
    var $elem = $(elem);
    if (!$elem.attr('id')) {
      return;
    }
    if ($elem.attr('id').substring(0, 16) !== 'hyperfeed_story_') {
      return;
    }
    setTimeout(function () {
      _filter($elem);
    }, 300);
  }
  function _filter($elem) {
    var datePubli = $elem.find('.c_jlpl3ku8r');
    if(visibleText(datePubli) == 'Sponsorisé') {
      $elem.html('Saleté indésirable supprimée (Sponsorisé (vt))');
    }
    var title = $elem.find('h5, span, .ellipsis, ._5g-l, ._5_xt').text();
    for (var i in keywords) {
      if (title.contains(keywords[i])) {
        var hrefPubli = $elem.find('._5pcq').prop('href');
        //if((hrefPubli != undefined) && (hrefPubli != '#')) {
        //	$elem.html('Saleté indésirable supprimée (' + $elem.find('.fcg').html() + '  <a href=' + hrefPubli +'>' + hrefPubli +'</a>)');
        //}else{
        	if(window.location.href != 'https://www.facebook.com/pages/feed') {
          	$elem.html('Saleté indésirable supprimée (' + keywords[i] + ')');
          }
        //}
        break;
      }
    };
  }
  function filterAll() {
    setTimeout(_filterAll, 300);
  }
  function _filterAll() {
    $('[data-testid=\'fbfeed_story\']').map(filter);
  }
  
  function visibleText($element){
    var strVisible = '';
    var $childEle = $element.children().first();
    $childEle.children().each(function () {
        var $currentElement = $(this).children().first();
      	if ($currentElement.css('display') != 'none') {
        	strVisible += $currentElement.text();
    		}
  	});
    return (strVisible);
	}
});

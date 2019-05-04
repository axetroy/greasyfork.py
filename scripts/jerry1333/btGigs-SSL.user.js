// ==UserScript==
// @name           btGigs-SSL
// @version        3.1.0
// @author         Jerry1333 (prevoius version by Upgreydd)
// @namespace      https://greasyfork.org/users/4704
// @description    Rozbudowuje możliwości strony poprzez modyfikację takich elementów jak: ikony pobierania przez SSL, ikony pobierania standardowego, podziękowania za pozycję, dodania pozycji do zakładek, autofocus wyszukiwarki, kolorowania listy pozycji, modyfikację wyszukiwarki
// @include        http*://*btgigs.info/browse.php*
// @include        http*://*btgigs.info/seedtimelist.php*
// @include        http*://*btgigs.info/bookmarks.php*
// @include        http*://*btgigs.info/mytorrents.php*
// @include        http*://*btgigs.info/usertorrentsdetails.php*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @require        https://openuserjs.org/src/libs/sizzle/GM_config.js
// @require        https://greasyfork.org/scripts/381016-timeago/code/TimeAgo.js
// @require        https://greasyfork.org/scripts/381017-timeago-locales-js/code/TimeAgoLocalesjs.js
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_registerMenuCommand
// @grant          GM_notification
// @grant          GM_log
// ==/UserScript==

(function() {
    'use strict';
    GM_config.init({
        'id': 'btGigs',
        'title': 'btGigs konfiguracja',
        'fields':
        {
            'rowColorOdd':
            {
                'label': 'Kolor wierszy nieparzystych',
                'type': 'text',
                'section': ['Podstawowe ustawienia'],
                'title': 'Kolor w formacie akceptowanym przez CSS (np. #001122, white, rgb(255,255,255) itp.)',
                'size': 10,
                'default': '#a7a7a7'
            },
            'rowColorFree':
            {
                'label': 'Kolor wierszy pozycji FREE',
                'type': 'text',
                'title': 'Kolor w formacie akceptowanym przez CSS (np. #001122, white, rgb(255,255,255) itp.)',
                'size': 10,
                'default': '#8bca77'
            },
            'iconColorDownloadFREE':
            {
                'label': 'Kolor ikony pobierania pozycji FREE',
                'type': 'text',
                'title': 'Kolor w formacie akceptowanym przez CSS (np. #001122, white, rgb(255,255,255) itp.)',
                'size': 10,
                'default': 'green'
            },
            'iconColorDownloadSTD':
            {
                'label': 'Kolor ikony pobierania pozycji standardowej',
                'type': 'text',
                'title': 'Kolor w formacie akceptowanym przez CSS (np. #001122, white, rgb(255,255,255) itp.)',
                'size': 10,
                'default': 'black'
            },
            'iconColorBookmark':
            {
                'label': 'Kolor ikony dodania do zakładek',
                'type': 'text',
                'title': 'Kolor w formacie akceptowanym przez CSS (np. #001122, white, rgb(255,255,255) itp.)',
                'size': 20,
                'default': '#980101'
            },
            'iconColorThanks':
            {
                'label': 'Kolor ikony podziękowania za pozycję',
                'type': 'text',
                'title': 'Kolor w formacie akceptowanym przez CSS (np. #001122, white, rgb(255,255,255) itp.)',
                'size': 10,
                'default': '#0055a4'
            },
            'iconColorSeed':
            {
                'label': 'Kolor ikony pozycji potrzebujących seeda',
                'type': 'text',
                'title': 'Kolor w formacie akceptowanym przez CSS (np. #001122, white, rgb(255,255,255) itp.)',
                'size': 10,
                'default': 'red'
            },
            'iconColorRefresh':
            {
                'label': 'Kolor ikony odświeżenia pozycji',
                'type': 'text',
                'title': 'Kolor w formacie akceptowanym przez CSS (np. #001122, white, rgb(255,255,255) itp.)',
                'size': 10,
                'default': 'lightgreen'
            },
            'iconColorSearch':
            {
                'label': 'Kolor ikony wyszukiwania pozycji',
                'type': 'text',
                'title': 'Kolor w formacie akceptowanym przez CSS (np. #001122, white, rgb(255,255,255) itp.)',
                'size': 10,
                'default': 'white'
            },
            'iconSize':
            {
                'label': 'Rozmiar ikon',
                'type': 'text',
                'title': 'Rozmiar ikon dodawanych przez skrypt. Przyjmuje wartości atrybutu CSS font-size (np. 1.3em, 24px itp.)',
                'size': 5,
                'default': '23px'
            },
            'useNotification':
            {
                'label': 'Czy używać powiadomień z systemu Windows 10?',
                'type': 'checkbox',
                'title': 'Zdecuduj czy używać zwykłej funkcji alert czy może dużo ładniejszych powiadomień z systemu Windows 10 (dotyczy podziękowania za pozycję oraz dodania do listy zakładek)',
                'default': false
            },
            'SSL':
            {
                'label': 'Ikona pobierania przez SSL',
                'type': 'radio',
                'section': ['Moduły'],
                'options': ['ON', 'OFF'],
                'default': 'OFF'
            },
            'STD':
            {
                'label': 'Ikona pobierania standardowa',
                'type': 'radio',
                'options': ['ON', 'OFF'],
                'default': 'ON'
            },
            'WL':
            {
                'label': 'Ikona dodawania do listy zakładek',
                'type': 'radio',
                'options': ['ON', 'OFF'],
                'default': 'OFF'
            },
            'THX':
            {
                'label': 'Ikona podziękowania za pozycję',
                'type': 'radio',
                'options': ['ON', 'OFF'],
                'default': 'OFF'
            },
            'FOCUS':
            {
                'label': 'Autofocus wyszukiwarki',
                'type': 'radio',
                'options': ['ON', 'OFF'],
                'default': 'ON'
            },
            'ROWCOLOR':
            {
                'label': 'Kolorowanie wierszy pozycji',
                'type': 'radio',
                'options': ['FREE', 'Naprzemienne', 'OFF'],
                'default': 'OFF'
            },
            'SEARCH':
            {
                'label': 'Modyfikacje wyszukiwarki',
                'type': 'radio',
                'options': ['ON', 'OFF'],
                'default': 'OFF'
            },
            'DATE_FORMAT':
            {
                'label': 'Zmiana formatu czasu dodania wstawki',
                'type': 'radio',
                'options': ['ON','OFF'],
                'default': 'OFF'
            }
        },
        'css' : '#btGigs .section_header_holder {display: table-cell;min-width: 420px;padding-right: 50px;} #btGigs .section_header { margin: 5px 0!important;}',
        events: {
            save: function() {
                window.location.reload();
            }
        }
    });

    var rowColorOdd           = GM_config.get('rowColorOdd');
    var rowColorFree          = GM_config.get('rowColorFree');
    var iconColorDownloadFREE = GM_config.get('iconColorDownloadFREE');
    var iconColorDownloadSTD  = GM_config.get('iconColorDownloadSTD');
    var iconColorBookmark     = GM_config.get('iconColorBookmark');
    var iconColorThanks       = GM_config.get('iconColorThanks');
    var iconColorSeed         = GM_config.get('iconColorSeed');
    var iconColorRefresh      = GM_config.get('iconColorRefresh');
    var iconColorSearch       = GM_config.get('iconColorSearch');
    var iconSize              = GM_config.get('iconSize');
    var useNotification       = GM_config.get('useNotification');

    var af = document.createElement("link");
    af.rel = "stylesheet";
    af.href = "//use.fontawesome.com/releases/v5.0.13/css/all.css";
    document.head.appendChild(af);

    GM_registerMenuCommand('Konfiguracja btGigs', openConfig);

    if (isON('SEARCH')) {
        var $searchForm = $('form').first();
        var $searchBox = $('input[name=search]');
        var $searchBtn = $('input.btn');

        $searchForm.prepend($searchBox);
        $searchForm.find('table.main>tbody>tr').eq(0).remove();
        $searchForm.find('table.main>tbody>tr').eq(0).remove();
        $searchBox.wrap('<div class="searchBoxContainer"></div>');
        var $searchBoxContainer = $('div.searchBoxContainer');
        $searchBox.attr('style',"width:65%;min-width:300px;max-width:800px;background-color:white;color:black;border-radius:5px;border-color:black;font-size:1.8em;padding:5px;text-align:center;");
        $searchBox.attr('placeholder','Wpisz szukaną frazę ...');

        $searchBoxContainer.append($searchBtn);
        $searchBoxContainer.append('<span id="bSearch" title="Rozpocznij wyszukiwanie" class="fas fa-search" style="margin: 5px;cursor: pointer;color:' + iconColorSearch + ';font-size: ' + iconSize + ';"></span>');
        $searchBoxContainer.prepend('<span id="bSeed" title="Torrenty potrzebujące seeda" class="fas fa-skull" style="margin: 5px;cursor: pointer;color:' + iconColorSeed + ';font-size: ' + iconSize + ';"></span>');
        $searchBoxContainer.prepend('<span id="bRefresh" title="Odśwież listę torrentów" class="fas fa-sync-alt" style="margin: 5px;cursor: pointer;color:' + iconColorRefresh + ';font-size: ' + iconSize + ';"></span>');

        $searchBtn.hide();
        $searchForm.parent().find('input[type="button"]').each(function() {$(this).hide();});

        $searchBtn = $searchForm.find('#bSearch');
        $searchBtn.on('click', function() {
            $searchForm.submit();
        });

        $searchForm.find('#bSeed').on('click', function() {
            window.location = 'seed.php';
        });
        $searchForm.find('#bRefresh').on('click', function() {
            $('#bRefresh').append('<input type="hidden" name="ostatnia_akcja" />');
            $searchForm.submit();
        });
    }

    function openConfig() {
        GM_config.open();
    }

    function isON(name) {
        if (GM_config.get(name) == 'ON')
            return true;
        else
            return false;
    }

    function WL(id, name) {
        var dataString = 'id=' + id + '&bookmark=1';
        var text = 'Dodano do zakładek: ' + name;
        $.ajax({
            type: "GET",
            url: "details.php",
            data: dataString,
            success: function(pageData) {
                if (useNotification) GM_notification(text);
                else alert(text);
            }
        });
        return false;
    }

    function THX(id, name) {
        var dataString = 'submit=Dzięki&torrentid=' + id;
        var text = 'Podziękowano za torrent ' + name + '!';
        $.ajax({
            type: "POST",
            url: "thanks.php",
            data: dataString,
            success: function() {
                if (useNotification) GM_notification(text);
                else alert(text);
            }
        });
        return false;
    }

    function timeDiff(previous) {
        //var tdInst = timeago();
        //tdInst.format(previous,'pl');
        return timeago.format(previous,'pl');
    }

    if (!isON('FOCUS')) {
        $('#bSearch').focus();
    } else {
        $('input[name="search"]').focus();
    }

    var $torrentTable;

    switch(window.location.pathname.replace('/','')) {
        case 'browse.php':
        case 'mytorrents.php':
            $torrentTable = $("table:not(.mainouter)[border=1]");
            break;
        default:
            $torrentTable = $("table.sortable");
            break;
    }

    if (GM_config.get('ROWCOLOR') == 'Naprzemienne') {
        $torrentTable.find('tbody>tr:odd').each(function() {
            $(this).css("background-color", rowColorOdd);
        });
    }

    $torrentTable.find('a.index').each(function() {
        function addslashes(str) {
            return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
        }

        var $details = $(this).parent().parent().children(':nth-child(2)').children(':first-child');
        var sslUrl = $(this).attr('href').replace('download.php', 'download_ssl.php').replace('download_stm.php', 'download_ssl.php');
        var id = $details.attr('href').replace('details.php?id=', '');
        var name = addslashes($details.html().replace('<b>', '').replace('</b>', ''));
        var isFree = true;
        var iconColor = iconColorDownloadFREE;
        if ($(this).children().attr("src") == "pic/ico_disk2.png") {
            isFree = false;
            iconColor = iconColorDownloadSTD;
        }

        $(this).attr('data-isFree', isFree);
        $(this).attr('data-sslUrl', sslUrl);
        $(this).attr('data-iconColor', iconColor);
        $(this).attr('data-id', id);
        $(this).attr('data-name', name);

        var $container = $(this).parent();

        if(isON('SSL')) {
            $container.append("&nbsp;<a href=" + sslUrl + " align=\"center\" class=\"index-ssl\" title=\"Szybko pobierz pozycję przez SSL\"><span class=\"fas fa-download fa-fw\" style=\"color: " + iconColor + ";font-size: " + iconSize + ";\" /></a>");
        }

        if(isON('WL')) {
            $container.append("&nbsp;<a class=\"wishlist\" title=\"Dodaj do zakładek\" href=\"#\"><span class=\"fas fa-bookmark fa-fw\" style=\"color: " + iconColorBookmark + ";font-size: " + iconSize + ";\" /></a>");
            $container.find('a.wishlist').on('click',function() {
                WL($container.find('a.index').attr('data-id'),$container.find('a.index').attr('data-name'));
            });
        }

        if(isON('THX')) {
            $container.append("&nbsp;<a class=\"thanks\" title=\"Podziękuj za pozycję\" href=\"#\"><span class=\"fas fa-thumbs-up fa-fw\" style=\"color: " + iconColorThanks + ";font-size: " + iconSize + ";\" /></a>");
            $container.find('a.thanks').on('click',function() {
                THX($container.find('a.index').attr('data-id'),$container.find('a.index').attr('data-name'));
            });
        }

        if(!isON('STD')) {
            $(this).css('display','none');
        }

        if (GM_config.get('ROWCOLOR') == 'FREE') {
            if (isFree) {
                $container.parent().css("background-color", rowColorFree);
            }
        }

        if (isON('DATE_FORMAT')) {
            if (window.location.pathname.replace('/', '') == 'browse.php') {
                var $dateContainer = $(this).parent().parent().children('td:nth-child(5)');
                var $date = $dateContainer.children();
                if ($date !== undefined) {
                    var positionStringDate = $date.html().replace('<br>', 'T');
                    var positionDate = new Date(positionStringDate);
                    var newDateString = '<span title="' + $date.html().replace('<br>', ' ') + '">' + timeDiff(positionDate) + '</span>';
                    $date.remove();
                    $dateContainer.html(newDateString);
                }
            }
        }
    });

    function FakeNewsRead() {
        $.ajax({
            type: 'GET',
            url: 'index.php',
            data: 'news=1',
            success: function(pageData) {
                window.location = 'browse.php';
            }
        });
        return false;
    }
    var $fakeNewsLink = $('a.altlink[href="index.php"]');
    $fakeNewsLink.parent().append('<br /><br /><a href="#" id="fakenews" style="font-size: 3em; color: blue;">Kliknij tutaj aby oznaczyć te wszystkie "ważne" ogłoszenia jako przeczytane.</a>');
    $fakeNewsLink.parent().find('a#fakenews').on('click',function() {
        FakeNewsRead();
    });
})();
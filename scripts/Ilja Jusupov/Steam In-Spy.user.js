// ==UserScript==
// @name         Steam In-Spy
// @icon         http://i.imgur.com/AWaMNX8.png
// @namespace    x4_stext
// @version      0.2.4
// @description  Extended game stats
// @author       x4fab
// @license      CC0
// @match        http://store.steampowered.com/app/*
// @match        http://steamcommunity.com/app/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

!function (){
    var url = 'http://steamspy.com/app/' + location.href.match(/\/app\/(\d+)/)[1];
    
    function addNewLine(players){
        if (location.host == 'store.steampowered.com'){
            players = players.split('(');

            var f = document.querySelector('#game_highlights .glance_ctn > .release_date, #game_highlights .glance_ctn > .glance_tags_ctn'),
                b = f.parentNode.insertBefore(document.createElement('div'), f);

            b.className = 'release_date';
            b.style.fontSize = '12px';
            b.innerHTML = 'Players: <span class="date">' + players[0] + '</span>' + (players[1] ? '(' + players[1] : '');
        } else {
            var f = document.querySelector('.apphub_Chat'),
                b = f.parentNode.insertBefore(document.createElement('span'), f);
            b.innerHTML = '<span class="apphub_Chat"><a href="' + url + '" target="_blank">' + players.replace(/ \(.+\)/, '') + ' Players</a></span> | ';
        }
    }
    
    function addNewBlock(data){
        if (location.host == 'store.steampowered.com'){
            var f = document.querySelector('#friend_block, #category_block'),
                b = f.parentNode.insertBefore(document.createElement('div'), f);

            b.className = 'block game_details';
            b.style.marginBottom = '8px';
            b.style.fontSize = '11px';

            b.innerHTML = '<div class="block_content_inner">' + data + '</div>';
        }
    }
    
    function detailsLink(){
        return '<br><a class="linkbar" href="' + url + '" target="_blank" style="font-size:12px">' +
                'More info <img src="http://store.akamai.steamstatic.com/public/images/v5/ico_external_link.gif" border="0" align="bottom"></a>';
    }

    function processData(data){
        var temp = document.createElement('div');
        temp.innerHTML = data;
        
        var stats = temp.querySelector('.p-r-30 > p').innerHTML;
        
        if (stats.indexOf('Sorry, results for this game are hidden at request of the developer') != -1){
            addNewBlock('Information is hidden at request of the developer.<br>' + detailsLink());
        } else {
            try {
                var geo = JSON.parse(data.match(/<script>\nvar data2geo= ([\s\S]+)?;\n<\/script>/)[1])[1].values[0],
                    mpl = geo.label,
                    mpu = 'http://steamspy.com' + geo.url;
            } catch (e){   
                console.warn(e.stack);
            }

            addNewBlock(stats.replace(/^[\s\S]+Price\b[\s\S]+?<br>/, '')
                        .replace(/(<\/?)strong>/g, '$1b>')
                        .replace(/(\w)<\/b>:/g, '$1:</b>')
                        .replace(/<(?=b>(Metascore|Owners):<)/g, '<br><')
                        .replace(/^<br>|<br>(?=<br>)/g, '')
                        .replace(/\(average\)/g, '(<abbr title="average">avg.</abbr>)')
                        .replace(/\(median\)/g, '(<abbr title="average">med.</abbr>)')
                        .replace(/<b>.+?<\/b>/g, function (_){
                            return _.replace(/ (?!the\b)[a-z]/g, function (_){
                                return _.toUpperCase();
                            });
                        }) + 
                        (mpl ? '<b>Most Played In:</b> <a href="' + mpu + '" target="_blank">' + mpl + '</a><br>' : '') + 
                        detailsLink());
            addNewLine(stats.match(/<strong>Players total:<\/strong>([^<]+)/)[1]);
        }
    }

    var stage = 0, data;
    function step(mask){
        if ((stage |= mask) == 3){
            processData(data);
        }
    }

    window.addEventListener('load', step.bind(null, 1), false);
    
    GM_xmlhttpRequest({
        method:     'GET',
        url:        url,
        onload:     function (res){
            if (res.status == 200){
                data = res.responseText;
                step(2);
            }
        }
    });
}();
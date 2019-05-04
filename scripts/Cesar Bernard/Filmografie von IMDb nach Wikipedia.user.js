// ==UserScript==
// @name         Filmografie von IMDb nach Wikipedia
// @namespace    https://greasyfork.org/users/21515
// @description  Wandle die Filmografie von IMDb mithilfe von Wikidata in Wikipedia-Quelltext um.
// @author       CennoxX
// @contact      cesar.bernard@gmx.de
// @version      0.9.7.1
// @connect      www.wikidata.org
// @connect      www.imdb.com
// @match        https://www.imdb.com/name/*
// @grant        GM.xmlHttpRequest
// @license      MIT
// ==/UserScript==
(function() {
    var episodeName = 'Folge';//'Episode';
    var showShort = true;//false;
    var work = document.getElementById((document.getElementById('filmo-head-actor'))?'filmo-head-actor':'filmo-head-actress').nextElementSibling.children;
    var workArray = [];
    var formattedWork = '';
    var request = 0;
    var done = 0;
    for(var i = 0; i <document.links.length ; i++){
        if (document.links[i].href.slice(-1) == "#" && document.links[i].getAttribute('data-n') != null){
            document.links[i].click()
        }
    }
    setTimeout(function(){
        for (i = 0; i < work.length; i++) {
            var year = work[i].getElementsByClassName('year_column')[0].innerText.trim().split('/')[0].replace('-', '–');
            var title = work[i].getElementsByTagName('a')[0].innerText.replace(' - ', ' – ').replace('...', '…');
            var type = work[i].innerHTML.split('</b>')[1].split('<br>')[0].replace(/\)\n\(voice/g,', Sprechrolle').trim().replace('TV Movie documentary', 'Dokumentation').replace('Documentary short', 'Dokumentar-Kurzfilm').replace('TV Series documentary', 'Fernsehserie').replace('TV Series short', 'Webserie').replace('TV Series', 'Fernsehserie').replace('TV Mini-Series documentary', 'Miniserie').replace('TV Mini-Series', 'Miniserie').replace('TV Movie', 'Fernsehfilm').replace('Video short', 'Kurzfilm').replace('TV Short', 'Kurzfilm').replace('Short', 'Kurzfilm').replace('(Video)', '');
            if (!type.includes('in_production') && !type.includes('Video Game') && (showShort || !type.includes('Kurzfilm'))) {
                var imdbid = work[i].getAttribute('id').split('-')[1];
                getItemFromWikidata(imdbid);
                var credit = '* ' + year + ': [[' + imdbid + '|' + title + ']] ';
                if (type == '(Fernsehserie)' || type == '(Miniserie)' || type == '(Webserie)') {
                    var numberOfEpisodes = 0;
                    var voiceEpisodes = 0;
                    var allEpisodes = work[i].getElementsByClassName('filmo-episodes');
                    for (var j = 0; j < allEpisodes.length; j++) {
                        if (!allEpisodes[j].innerText.includes('credit only') && allEpisodes[j].innerText != 'Show less') {
                            numberOfEpisodes++
                            var tempId = allEpisodes[j].getElementsByTagName('a')[0].href.split('/')[4];
                            if (allEpisodes[j].innerText.includes('voice')) {
                                voiceEpisodes++;
                            }
                        }
                    }
                    if (numberOfEpisodes == 0) {
                        workArray.push(credit + type.split(',') + '\n');
                    } else if (numberOfEpisodes == 1) {
                        getEpisodeNumberFromIMDb(tempId);
                        workArray.push(credit + type.split(')') + ' Folge '+tempId+((voiceEpisodes==numberOfEpisodes)?', Sprechrolle':'')+')\n');
                    } else {
                        workArray.push(credit + type.split(')') + ' ' + numberOfEpisodes + ' '+episodeName+'n'+((voiceEpisodes==numberOfEpisodes)?', Sprechrolle':'')+')\n');
                    }
                } else {
                    credit += type.replace(/([A-Z][a-z]+ version, )?voice/, 'Sprechrolle') +((work[i].innerHTML.split('</b>')[1].split('<br>').length>1 && work[i].innerHTML.split('</b>')[1].split('<br>')[1].includes('voice'))?' (Sprechrolle)':'')+ '\n'
                    workArray.push(credit.replace(') (',', '));
                }
            }
        }
        workArray.sort().forEach(function(entry) {
            formattedWork += entry;
        });
        var checkForChanges = setInterval(function() {
            console.clear();
            if (request == 0 || (done/request) != 1) {
                if (request != 0){
                    console.log(parseInt((done / request) * 100) + '%');
                }
            } else {
                console.log('== Filmografie ==\n'+formatText(formattedWork));
                clearInterval(checkForChanges);
            }
        }, 1000);

        function formatText(text) { //check if OT same as DT
            var temp = '';
            text.split('\n').sort().forEach(function(entry) {
                if (entry != '') {
                    if (entry.includes('[[')) {
                        entry = entry.replace('|' + entry.split('[[')[1].split(']]')[0].split('|')[1], '|');
                        if (!entry.split(']]')[0].includes('(')) {
                            entry = entry.replace('|', '');
                        }
                        let titles = entry.split('[[')[1].split(']]')[0].split('|')[0].split('#');
                        if (titles[0].replace(/[-–:., |V\d’'!]/g, '').toLowerCase() != titles[1].split(' (')[0].replace(/[-–:., |V\d’'!]/g, '').toLowerCase()) {
                            if (entry.trim().slice(-1) == ')') {
                                var regex = /\]\] +\(/;
                                entry = entry.split(regex)[0] + "]] (''" + titles[0] + "'', " + entry.split(regex)[1];
                            } else {
                                entry += " ''(" + titles[0] + ")''";
                            }
                        }
                        entry = entry.replace('[[' + titles[0] + '#', '[[');
                    } else {
                        if (entry.includes('|') && entry.split('|')[1].trim().split(']]').length == 2) { //wikidata title != imdb title
                            entry = entry.split('|')[0] + entry.split(']]')[1];
                        } else {
                            entry = entry.replace(']]', '');
                        }
                        let titles = entry.split(/: (.+)/)[1].trim().split(' (')[0].split('#');
                        if (titles[0].replace(/[-–:., |V\d’'!]/g, '').toLowerCase() != titles[1].split(' (')[0].replace(/[-–:., |V\d’'!]/g, '').toLowerCase()) {
                            if (entry.trim().slice(-1) == ')') {
                                entry = entry.split(" (")[0] + " (''" + titles[0] + "'', " + entry.split(" (")[1];
                            } else {
                                entry += " ''(" + titles[0] + ")''";
                            }
                        }
                        entry = entry.replace(': ' + titles[0] + '#', ': ');
                    }
                    if (entry.includes('–'+new Date().getFullYear()+': '))
                    {
                        entry = '* seit '+entry.slice(2,entry.lastIndexOf(',')).replace('–'+new Date().getFullYear(),'')+')';
                    }
                    temp += entry.replace(/  /g, ' ').trim() +'\n';
                }
            });
            return temp;
        }

        function getItemFromWikidata(imdbid) {
            request++;
            GM.xmlHttpRequest({
                method: 'GET',
                url: 'https://www.wikidata.org/w/api.php?action=query&format=json&list=search&srsearch=haswbstatement:P345=' + imdbid,
                onload: function(response) {
                    done++;
                    if (response.responseText.length > 0) {
                        var jsonObj = JSON.parse(response.responseText);
                        var imdbid = response.finalUrl.split('P345=')[1].split('&')[0];
                        if (jsonObj.query.searchinfo.totalhits > 0) {
                            var wikidataid = jsonObj.query.search[0].title;
                            formattedWork = formattedWork.replace(imdbid, wikidataid);
                            getDataFromWikidata(imdbid, wikidataid);
                        } else {
                            formattedWork = formattedWork.replace('[[' + imdbid + '|', imdbid + '#');
                            getDataFromIMDb(imdbid);
                        }
                    }
                },
                onerror: function(response) {
                    done++;
                    console.log('Error in fetching contents: ' + response.responseText);
                }
            });
        }

        function getDataFromWikidata(imdbid, wikidataid) {
            request++;
            GM.xmlHttpRequest({
                method: 'GET',
                url: 'https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&props=sitelinks|claims|labels&sitefilter=dewiki&ids=' + wikidataid + '&imdbid=' + imdbid,
                onload: function(response) {
                    done++;
                    if (response.responseText.length > 0) {
                        var jsonObj = JSON.parse(response.responseText);
                        var imdbid = response.finalUrl.split('imdbid=')[1].split('&')[0];
                        var wikidataid = response.finalUrl.split('ids=')[1].split('&')[0];
                        var DT = '';
                        if (typeof Object.values(jsonObj.entities)[0].sitelinks.dewiki != 'undefined') { //wikipedia article
                            DT = Object.values(jsonObj.entities)[0].sitelinks.dewiki.title;
                            formattedWork = formattedWork.replace('[[' + wikidataid + '|', '[[' + imdbid + '#' + DT + '|');
                        } else if (typeof Object.values(jsonObj.entities)[0].labels.de != 'undefined') //wikidata label
                        {
                            DT = Object.values(jsonObj.entities)[0].labels.de.value;
                            formattedWork = formattedWork.replace('[[' + wikidataid + '|', imdbid + '#' + DT + '|');
                        } else //imdb title
                        {
                            formattedWork = formattedWork.replace('[[' + wikidataid + '|', imdbid + '#');
                        }
                        var OT = '';
                        if (typeof Object.values(jsonObj.entities)[0].claims.P1476 != 'undefined') { //check if OT of entity exists
                            OT = Object.values(jsonObj.entities)[0].claims.P1476[0].mainsnak.datavalue.value.text;
                            formattedWork = formattedWork.replace(imdbid + '#', OT + '#');
                        } else {
                            getDataFromIMDb(imdbid);
                        }
                    }
                },
                onerror: function(response) {
                    done++;
                    console.log('Error in fetching contents: ' + response.responseText);
                }

            });
        }

        function getDataFromIMDb(imdbid) {
            request++;
            GM.xmlHttpRequest({
                method: 'GET',
                url: 'https://www.imdb.com/title/' + imdbid,
                onload: function(response) {
                    done++;
                    if (response.responseText.length > 0) {
                        var htmlText = response.responseText;
                        var imdbid = response.finalUrl.split('/')[4];
                        var OT = '';
                        if (htmlText.indexOf('originalTitle') != -1) { //check if OT exists in IMDb
                            OT = (/<div class="originalTitle">(.*?)<span/m).exec(htmlText)[1];
                        } else {
                            OT = (/<title>(.*?) \(/m).exec(htmlText)[1];
                        }
                        formattedWork = formattedWork.replace(imdbid + '#', OT.replace('&amp;', '&').replace('...', '…').replace(' - ', ' – ') + '#');
                    }
                },
                onerror: function(response) {
                    done++;
                    console.log('Error in fetching contents: ' + response.responseText);
                }

            });
        }

        function getEpisodeNumberFromIMDb(imdbid) {
            request++;
            GM.xmlHttpRequest({
                method: 'GET',
                url: 'https://www.imdb.com/title/' + imdbid,
                onload: function(response) {
                    done++;
                    if (response.responseText.length > 0) {
                        var htmlText = response.responseText;
                        var imdbid = response.finalUrl.split('/')[4];
                        var episodeNumber = (/<div class="bp_heading">Season (.*?) <span class="ghost">\|<\/span> Episode (.*?)<\/div>/m).exec(htmlText);
                        if (episodeNumber != null && episodeNumber.length==3){
                            formattedWork = formattedWork.replace("Folge " + imdbid, "Folge " + episodeNumber[1]+"x"+(episodeNumber[2].length==1?'0':'')+episodeNumber[2]);
                        } else {
                            formattedWork = formattedWork.replace("Folge " + imdbid, "eine Folge");
                        }
                    }
                },
                onerror: function(response) {
                    done++;
                    console.log('Error in fetching contents: ' + response.responseText);
                }

            });
        }
    }, 3000);
})();
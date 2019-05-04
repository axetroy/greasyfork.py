// ==UserScript==
// @name        MAL Plus in the Recent Updates
// @namespace   http://greasyfork.org/users/5975
// @description Adds a + option in the Last List Updates
// @include     http://myanimelist.net/
// @include     http://myanimelist.net/profile/*
// @include     http://myanimelist.net/profile.php?username=*
// @include     http://myanimelist.net/panel.php
// @exclude     http://myanimelist.net/profile/*/*
// @exclude     http://myanimelist.net/profile.php?username=*/*
// @version     1.0.3
// ==/UserScript==

function xpath(query, object) {
    if(!object) var object = document;
    return document.evaluate(query, object, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

myPanel = xpath("//div[@id='myanimelist']//div[@id='contentWrapper']/div/a[text() = 'Panel Settings']");
if ( myPanel.snapshotLength == 1 ) {
    recentUpdates = xpath("//h3[@class='widget-header'][contains(.,'My Last List Updates')]/following::div[@class='widget-content'][1]/div[@class='item']/div[@class='info']/p[2]");
    for (var i = 0; i < recentUpdates.snapshotLength; i++) {
        (function(ind) {
            var recentUpdate = recentUpdates.snapshotItem(ind);
            var status = recentUpdate.textContent.split('  at ')[0];
            var progress = recentUpdate.textContent.split('  at ')[1];
            var type = recentUpdate.parentNode.getElementsByTagName('a')[0].href.split(/[\s/]+/)[2];
            if (progress && status != "Completed" && type == "anime") {
                recentUpdate.textContent += ' ';
                var currentEpisodes = isNaN(progress.split(' of ')[0]) ? 0 : parseInt(progress.split(' of ')[0]);
                var totalEpisodes = progress.split(' of ')[1];
                var animeID = recentUpdate.parentNode.getElementsByTagName('a')[0].href.split(/[\s/]+/)[3];

                var plusEp = document.createElement('a');
                plusEp.href = 'javascript:void(0);';
                plusEp.title = 'Click to increase your watched ep number by one';
                plusEp.textContent = '+';
                plusEp.addEventListener("click", function() {
                    currentEpisodes += 1;
                    var xmlhttp = new XMLHttpRequest();
                    xmlhttp.open("POST", "/includes/ajax.inc.php?t=79", true);
                    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                    var csrf_token = document.getElementsByName('csrf_token')[0].getAttribute('content');
                    xmlhttp.onreadystatechange = function() {//Call a function when the state changes.
                        if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                            recentUpdate.textContent = status + '  at ' + currentEpisodes + ' of ' + totalEpisodes + ' ';
                            if (isNaN(totalEpisodes) || !isNaN(totalEpisodes) && currentEpisodes < totalEpisodes) {
                                recentUpdate.appendChild(plusEp);
                            }
                        }
                    }
                    xmlhttp.send("anime_id=" + animeID + "&ep_val=" + currentEpisodes + "&csrf_token=" + csrf_token);
                }, true);
                if (isNaN(totalEpisodes) || !isNaN(totalEpisodes) && currentEpisodes < totalEpisodes) {
                    recentUpdate.appendChild(plusEp);
                }
            }
        })(i);
    }
}

leftProfile = xpath("//div[@id='myanimelist']//div[@id='contentWrapper']/div/h1/span[@class='di-ib po-r']");
rightProfile = xpath("//div[@id='myanimelist']//div[@id='header-menu'][@class='pulldown']/div[@class='header-profile']/span[@class='profile-name']");
if (rightProfile.snapshotLength == 1 && leftProfile.snapshotItem(0).textContent.split("'s Profile")[0].trim() == rightProfile.snapshotItem(0).textContent) {
    recentUpdates = xpath("//div[@class='user-statistics-stats mt16']/div[@class='updates anime']/div[@class='statistics-updates di-b w100 mb8']/div[@class='data']/div[@class='fn-grey2']");
    for (var i = 0; i < recentUpdates.snapshotLength; i++) {
        (function(ind) {
            var recentUpdate = recentUpdates.snapshotItem(ind);
            var status = recentUpdate.textContent.split('\n')[1].trim();
            if (status != "Plan to Watch" && status != "Completed") {
                var beforeDot = recentUpdate.innerHTML.split('·')[0];
                var afterDot = recentUpdate.innerHTML.split('·')[1];
                var currentEpisodes = isNaN(recentUpdate.textContent.split('\n')[2].split('/')[0].trim()) ? 0 : parseInt(recentUpdate.textContent.split('\n')[2].split('/')[0].trim());
                var totalEpisodes = recentUpdate.textContent.split('\n')[2].split('/')[1].trim();
                var animeID = recentUpdate.parentNode.getElementsByTagName('a')[0].href.split(/[\s/]+/)[3];

                var plusEp = document.createElement('a');
                plusEp.href = 'javascript:void(0);';
                plusEp.title = 'Click to increase your watched ep number by one';
                plusEp.textContent = '+';

                function addProfilePlus() {
                    recentUpdate.innerHTML = beforeDot;
                    if (isNaN(totalEpisodes) || !isNaN(totalEpisodes) && currentEpisodes < totalEpisodes) {
                        recentUpdate.appendChild(plusEp);
                    } else {
                        recentUpdate.innerHTML += '·';
                    }
                    recentUpdate.innerHTML += afterDot;

                    recentUpdate.getElementsByTagName('a')[0].addEventListener("click", function() {
                        currentEpisodes += 1;
                        var xmlhttp = new XMLHttpRequest();
                        xmlhttp.open("POST", "/includes/ajax.inc.php?t=79", true);
                        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                        var csrf_token = document.getElementsByName('csrf_token')[0].getAttribute('content');
                        xmlhttp.onreadystatechange = function() {//Call a function when the state changes.
                            if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                                if (recentUpdate.firstElementChild.tagName == 'SPAN') {
                                    recentUpdate.getElementsByTagName('span')[0].textContent = currentEpisodes;
                                    beforeDot = recentUpdate.innerHTML.split('<a')[0];
                                } else {
                                    if (recentUpdate.textContent.indexOf("-/") > -1) {
                                        beforeDot = recentUpdate.innerHTML.replace("-/", currentEpisodes + "/").split('<a')[0];
                                    } else {
                                        beforeDot = recentUpdate.innerHTML.replace(currentEpisodes - 1 + "/", currentEpisodes + "/").split('<a')[0];
                                    }
                                }
                                addProfilePlus();
                            }
                        }
                        xmlhttp.send("anime_id=" + animeID + "&ep_val=" + currentEpisodes + "&csrf_token=" + csrf_token);
                    }, true);
                }

                addProfilePlus();
            }
        })(i);
    }
}
// ==UserScript==
// @name         woodcutter-grabber
// @namespace    http://tampermonkey.net/
// @version      1.2.3
// @description  Grab logs from Dominion Online
// @author       ceviri
// @match        https://dominion.games/*
// @grant        GM_xmlhttpRequest
// @grant        GM_openInTab
// @require      http://code.jquery.com/jquery-3.3.1.min.js
// @connect      ceviri.me
// ==/UserScript==



WC_grabber = {
    shouldDisplay: false,
    currentlyWaiting: null,
    oldAlert: null,
    oldConfirm: null,
    currentlyGrabbing: [],

    angular_debug_check: function () {
        if (typeof angular.element(document.body).scope() == 'undefined') {
            angular.reloadWithDebugInfo();
            return false;
        } else {
            return true;
        }
    },

    redraw: function(){
        if (angular.element($('table-starter')).controller('tableStarter')){
            if (angular.element($('table-starter')).controller('tableStarter').replayService.shouldShowReplayWindow()) {
                if ($('table-starter .wc-grab-logs').length == 0){
                    var log_grab_button = $('<button class="lobby-button wc-grab-logs" onclick="WC_grabber.setupTable()">Grab Logs</button>');
                    $('table-starter div[class=""]').append(log_grab_button);
                }
            }
        }
    },


    sendLogs: function(logOne, logTwo, supply, players, gameId){
        datastring = "fileone=" + encodeURIComponent(logOne) + "&filetwo=" + encodeURIComponent(logTwo) +
                     "&supply=" + encodeURIComponent(supply) + "&players="+encodeURIComponent(players);
        GM_xmlhttpRequest({
            method: "POST",
            url: "http://ceviri.me/woodcutter/submit",
            data: datastring,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            onload: function(response) {
                if (WC_grabber.shouldDisplay){
                    GM_openInTab("http://ceviri.me/woodcutter/"+gameId+"/display");
                }
            },
        });
    },


    parseReplays: function(){
        gameId = WC_grabber.currentlyGrabbing.pop();
        console.log("Parsing replay #"+gameId);
        console.log("Remaining Queue:");
        console.log(WC_grabber.currentlyGrabbing);

        var logOne, logTwo, supply, gameId;
        var logLength;
        var changelingTrack = false;
        var changelingIndex = 0;
        var changelingTicks = 0;
        var alreadyChanged = false;
        var playerNames = '';
        var oldFirst = '';
        var injector = angular.element(document.body).injector();
        var tS = injector.get('tableService');
        var index = 0;

        changelingActions = [
            () => {
                injector.get('gameServerMessenger').resign();
                injector.get('gameServerConnection').disconnect();
            },
            () => {
                let r = tS.getRuleValue(TableRuleIds.REPLAY_INSTRUCTIONS);
                let newR = new ReplayInstructions(r.gameId, logLength - 1, new PlayerList());
                tS.changeRule(new TableRule(TableRuleIds.REPLAY_INSTRUCTIONS, newR));
            },
            () => {
                if (!injector.get('connection').gameIsConnecting()){
                    changelingTicks = 0;
                    injector.get('metaServerMessenger').startGameRequest(tS.getTableId(), true);
                }
            }
        ];

        changelingConditions = [
            () => {return angular.element(document.body).controller().shouldShowScorePage || alreadyChanged;},
            () => {return tS.getRuleValue(TableRuleIds.REPLAY_INSTRUCTIONS).decisionIndex == logLength - 1;}
        ];

        actionList = [
            () => {
                if (tS.hasTable()) {
                    tS.leave();
                }
                injector.get('replayService').startReplayTable(gameId, -1);
                injector.get('log').entries = [];
            },
            () => {
                if (playerNames == ''){
                    logLength = tS.getRuleValue(TableRuleIds.REPLAY_INSTRUCTIONS).decisionIndex;
                    tS.changeRule(new TableRule(TableRuleIds.MAX_PLAYERS, 2));
                    tS.changeRule(new TableRule(TableRuleIds.SPECTATE_RULES, GroupIds.NOBODY, -1));
                    playerNamesRaw = [0, 1].map(i => angular.element($('order-players')).controller('orderPlayers').getOriginalPlayerName(i));
                    playerNames = playerNamesRaw.join('~');
                    if (tS.getBeings().length < 2){
                        tS.addBot();
                    }
                }
            },
            () => {
                injector.get('playerOrderService').shouldRandomize = false;
                injector.get('playerOrderService').done();
            },
            () => {
                if (!injector.get('connection').gameIsAlive()){
                    injector.get('metaServerMessenger').startGameRequest(tS.getTableId(), true);
                } else if (injector.get('metagame').shouldShowGameEndedNotification() && !angular.element(document.body).injector().get('game').isRunning()) {
                    changelingTicks ++;
                    if (changelingTicks > 5){
                        changelingTrack = true;
                        changelingIndex = 0;
                    }
                }
            },
            () => {
                injector.get('gameServerMessenger').resign();
                injector.get('gameServerConnection').disconnect();
                logOne = Object.values(injector.get('log').entries).map(x=>x.string).join("~");
                x=injector.get('game').state.cards.map(x =>LANGUAGE.getCardName[x.cardName.name].singular);
                supply = Array.from(new Set(x)).map(i => i+"-"+x.filter(j=>j==i).length).join("~");
            },
            () => {
                if (oldFirst == ''){
                    oldFirst = tS.getRuleValue(TableRuleIds['PLAYER_ORDER'])['players'][0]['namedId']['name'];
                    injector.get('playerOrderService').moveDown(0);
                    injector.get('playerOrderService').done();
                    injector.get('log').entries = [];
                }
            },
            () => {
                if (!injector.get('connection').gameIsAlive()){
                    injector.get('metaServerMessenger').startGameRequest(tS.getTableId(), true);
                } else if (injector.get('metagame').shouldShowGameEndedNotification() && !angular.element(document.body).injector().get('game').isRunning()) {
                    changelingTicks ++;
                    if (changelingTicks > 5){
                        changelingTrack = true;
                        changelingIndex = 0;
                    }
                }
            },
            () => {
                injector.get('gameServerMessenger').resign();
                injector.get('gameServerConnection').disconnect();
                logTwo = Object.values(injector.get('log').entries).map(x=>x.string).join("~");
            },
            () => {
                WC_grabber.sendLogs(logOne, logTwo, supply, playerNames, gameId);
                tS.leave();
            },
            () => {
                if (WC_grabber.currentlyGrabbing.length > 0){
                    setTimeout(WC_grabber.parseReplays, 500);
                } else {
                    angular.element(document.body).controller().hideAllPages();
                    angular.element(document.body).controller().showLobbyPage();
                    unsafeWindow.confirm = WC_grabber.oldConfirm;
                    unsafeWindow.alert = WC_grabber.oldAlert;
                }
            }];

        conditions = [
            () => {return tS.hasTable();},
            () => {return tS.getBeings().length == 2;},
            () => {return tS.getRuleValue(TableRuleIds['PLAYER_ORDER'])['players'].length > 0;},
            () => {return injector.get('log').entries.length > 0;},
            () => {return angular.element(document.body).controller().shouldShowScorePage;},
            () => {return tS.getRuleValue(TableRuleIds['PLAYER_ORDER'])['players'][0]['namedId']['name'] != oldFirst;},
            () => {return injector.get('log').entries.length > 0;},
            () => {return angular.element(document.body).controller().shouldShowScorePage;},
            () => {return !tS.hasTable();
                  }];

        function loop(){
            if (changelingTrack){
                if (changelingIndex < changelingConditions.length){
                    if (changelingConditions[changelingIndex]()){
                        changelingIndex++;
                    }
                    changelingActions[changelingIndex]();
                } else {
                    changelingTrack = false;
                    alreadyChanged = true;
                }
                WC_grabber.currentlyWaiting = setTimeout(loop, 1000);
            } else {
                if (index < conditions.length){
                    if (conditions[index]()){
                        index++;
                    }
                    actionList[index]();
                    WC_grabber.currentlyWaiting = setTimeout(loop, 1000);
                }
            }
        }

        function stopLoop(){
            if (index == 0){
                clearTimeout(WC_grabber.currentlyWaiting);
                WC_grabber.currentlyWaiting = null;
                if (WC_grabber.currentlyGrabbing.length > 0){
                    setTimeout(WC_grabber.parseReplays, 500);
                }
            }
        }

        loop();
        setTimeout(stopLoop, 5000);
    },


    setupTable: function(){
        WC_grabber.shouldDisplay = true;
        publicPreferences.setUserPrefValue(UserPrefIds["LOG_FIXED_BASIC_BONUS"], true);
        input = angular.element($('table-starter .table-rule-text-input'))[0].value;
        replayList = input.split(",");
        if (replayList.length > 1){
            WC_grabber.shouldDisplay = false;
        }
        WC_grabber.oldAlert = unsafeWindow.alert;
        WC_grabber.oldConfirm = unsafeWindow.confirm;
        unsafeWindow.alert = () => {return true;};
        unsafeWindow.confirm = () => {return true;};
        WC_grabber.currentlyGrabbing = replayList;
        setTimeout(function(){
            WC_grabber.parseReplays();
        }, 500);
    },
}

WC_grabber.angular_debug_check();
setInterval(WC_grabber.redraw, 500);
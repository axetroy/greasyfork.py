// ==UserScript==
// @name        C&C Tiberian Alliances Veteran PTE
// @namespace   PTE Veteran Cheat
// @description Autocheat move cool down, Autocheat repairall (Def, Off)
// @include     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx
// @version     2.0.8
// @author      D4rkv3nom
// @contributor leo7044
// ==/UserScript==
(function () {
    var AutoCheat_main = function () {
        try {
            function initAutoCheat() {
                console.log('C&C:Tiberium Alliances AutoCheat loaded.');
                var autoCheat = {
                    timeOutAutoCheat: function () {
                        try {
                            window.setTimeout(autoCheat.timeOutAutoCheat, 2000);
                            if (ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity() != null) {
                                if (ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_hasCooldown()) {
                                    autoCheat.sendCheatMoveCoolDown();
                                }
                                
                                var apcl = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
                                for (var key in apcl)
                                {
                                    var c = apcl[key];
									
									if (c.GetOffenseConditionInPercent() < 100 && c.get_LvlOffense() > 0) {
										autoCheat.sendCheatAutoRepair(c.get_Id());
									}
                                }
                                
                                if (ClientLib.Data.MainData.GetInstance().get_Player().GetCommandPointCount() < 9000) {
                                    autoCheat.sendCheatSetCommandPoints();
                                }

                                }
                                
                                if (ClientLib.Data.MainData.GetInstance().get_Player().GetCreditCount() < 9000) {
                                    autoCheat.sendCheatSetCommandPoints();
                                }

                            }
                        } catch (e) {
                            console.log('timeOutAutoCheat: ', e);
                        }
                    },
                    sendCheatMoveCoolDown: function () {
                        try {
                            if (qx.core.Init.getApplication().getChat() != null) {
                                qx.core.Init.getApplication().getChat().getChatWidget().send('/cheat resetmovecooldownpte');
                            }
                        } catch (e) {
                            console.log('sendCheatMoveCoolDown: ', e);
                        }
                    },
                    sendCheatAutoRepair: function (id) {
                        try {
                            if (qx.core.Init.getApplication().getChat() != null) {
                                qx.core.Init.getApplication().getChat().getChatWidget().send('/cheat repairallpte '+id);
                            }
                        } catch (e) {
                            console.log('sendCheatAutoRepair: ', e);
                        }
                    },
                    sendCheatSetCommandPoints: function () {
                        try {
                            if (qx.core.Init.getApplication().getChat() != null) {
                                qx.core.Init.getApplication().getChat().getChatWidget().send('/cheat setcommandpoints 9999');
                            }
                    },
                    sendCheatSetCredits: function () {
                        try {
                            if (qx.core.Init.getApplication().getChat() != null) {
                                qx.core.Init.getApplication().getChat().getChatWidget().send('/cheat setcommandpoints 9999');
                            }
                        } catch (e) {
                            console.log('sendCheatSetCommandPoints: ', e);
                        }
                    }
                };
                console.log('init AutoCheat');
                window.setTimeout(autoCheat.timeOutAutoCheat, 2000);
            }
        } catch (e) {
            console.log('initAutoCheat: ', e);
        }
        function AutoCheat_checkIfLoaded() {
            try {
                if (typeof qx !== 'undefined') {
                    initAutoCheat();
                } else {
                    window.setTimeout(AutoCheat_checkIfLoaded, 1000);
                }
            } catch (e) {
                console.log('AutoCheat_checkIfLoaded: ', e);
            }
        }
        window.setTimeout(AutoCheat_checkIfLoaded, 1000);
    };
    try {
        var AutoCheat = document.createElement('script');
        AutoCheat.innerHTML = '(' + AutoCheat_main.toString() + ')();';
        AutoCheat.type = 'text/javascript';
        document.getElementsByTagName('head') [0].appendChild(AutoCheat);
    } catch (e) {
        console.log('AutoCheat: init error: ', e);
    }
}) ();
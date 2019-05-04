// ==UserScript==
// @name            The West Script Suite [ES]
// @description     Una colección de mejoras para el juego de navegador The West
// @namespace       https://greasyfork.org/users/4051
// @author          KaZaC
// @include         http://*.the-west.*/game.php*
// @version         1.4
// @grant           none
// @icon            http://i.imgur.com/8qJTYUy.png
// @license         http://creativecommons.org/licenses/by-nc-sa/3.0/
// ==/UserScript==

function runScript(source) {
    if ('function' == typeof source) {
        source = '(' + source + ')();';
    }
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = source;
    document.body.appendChild(script);
    document.body.removeChild(script);
}

runScript(function() {

    SlySuite = {
        preferences: {
            KOTimer: true,
            RiverColours: "default",
            Experience: false,
            Achievements: true,
            CraftingWindow: false
        },
        possibleRiverColours: {
            default: 'Por defecto',
            halloween: 'Rojo',
            paddy: 'Verde',
            valentine: 'Rosado',
            blue: 'Azul',
            norivers: 'Ocultar ríos'
        },
        getPreference: function(pref) {
            return this.preferences[pref];
        },
        setPreference: function(pref, val) {
            if (pref == 'RiverColours')
                SlySuite.RiverColours.changeColour();

            this.preferences[pref] = val;
            localStorage.setObject('SlySuite', this.preferences);


        },
        images: {
            achievements: 'http://i300.photobucket.com/albums/nn22/qwexrty/achievs_zps4c5d9ee3.jpg',
            settings: 'http://i300.photobucket.com/albums/nn22/qwexrty/settings_zpsa8c2f112.jpg',
            achievement_icon: 'http://i300.photobucket.com/albums/nn22/qwexrty/questbook2_zpsf9bfe431.png'
        },
        init: function() {
            Storage.prototype.setObject = function(key, value) {
                this.setItem(key, JSON.stringify(value));
            };

            Storage.prototype.getObject = function(key) {
                var value = this.getItem(key);
                return value && JSON.parse(value);
            };

            localStorage.getObject('SlySuite') == null ? localStorage.setObject('SlySuite', this.preferences) : $.extend(this.preferences, localStorage.getObject('SlySuite'));
            SlySuite.createSettingsButton();

            if (SlySuite.getPreference('KOTimer'))
                SlySuite.KOTimer.firstrun();

            $(setTimeout(function() {
                SlySuite.RiverColours.init();
                if (SlySuite.getPreference('RiverColours') != 'default')
                    SlySuite.RiverColours.changeColour();
            }, 5000));

            if (SlySuite.getPreference('Achievements'))
                SlySuite.Achievements.init();

            if (SlySuite.getPreference('CraftingWindow'))
                SlySuite.CraftingWindow.init();

        },
        createSettingsButton: function() {

            var bottom = $('<div></div>').attr({
                'class': 'menucontainer_bottom'
            });

            var icon = $('<div></div>').attr({
                'class': 'menulink',
                'title': "Opciones de la Suite"
            }).css({
                'background-image': 'url(' + this.images.settings + ')',
                'background-position': '0px 0px'
            }).mouseleave(function() {
                $(this).css("background-position", "0px 0px");
            }).mouseenter(function(e) {
                $(this).css("background-position", "-25px 0px");
            }).click(function() {
                SlySuite.openSettings();
            });

            $('#ui_menubar .ui_menucontainer :last').after($('<div></div>').attr({
                'class': 'ui_menucontainer',
                'id': 'SlySuite_settings_icon'
            }).append(icon).append(bottom));
        },
        createAchievementsButton: function() {

        },
        openSettings: function() {
            content = this.generateWindowContent();
            var win = wman.open("SlySuite", "Opciones de la Suite").setResizeable(true).setMinSize(450, 400).setSize(450, 400);
            win.appendToContentPane(content);
        },
        generateWindowContent: function() {
            content = "";
            content += "<div style=\"margin-left:5px;\">";
            this.getPreference('KOTimer') == true ? check = " checked='checked'" : check = "";
            content += "<input type='checkbox' id='KOtimer_checkbox'" + check + " onchange=\"SlySuite.setPreference('KOTimer',this.checked)\"><label for='KOtimer_checkbox'>Temporizador de desmayo</label><br />";
            content += "Color de los ríos ";
            content += "<select onchange=\"SlySuite.setPreference('RiverColours',this.value);\">";
            colours = SlySuite.possibleRiverColours;
            for (var c in colours) {
                if (SlySuite.getPreference('RiverColours') == c)
                    content += "<option selected='selected' value=\"" + c + "\">" + colours[c] + "</option>";
                else
                    content += "<option value=\"" + c + "\">" + colours[c] + "</option>";

            }
            content += "</select><br />";
            this.getPreference('Achievements') == true ? check = " checked='checked'" : check = "";
            content += "<input type='checkbox' id='Achievements_checkbox'" + check + " onchange=\"SlySuite.setPreference('Achievements',this.checked)\"><label for='Achievements_checkbox'>Seguimiento de logros</label><br />";
            this.getPreference('CraftingWindow') == true ? check = " checked='checked'" : check = "";
            content += "<input type='checkbox' id='CraftingWindow_checkbox'" + check + " onchange=\"SlySuite.setPreference('CraftingWindow',this.checked)\"><label for='CraftingWindow_checkbox'>Mejora de la ventana de artesanía</label><br />";
            content += "<br /><br />";
            content += "Algunos ajustes pueden requerir actualizar la ventana del juego para aplicarse";
            content += "</div>";
            return content;
        }

    };

    SlySuite.KOTimer = {
        timeleft: 0,
        aliveAgain: 0,
        image: "<div style='position:relative;display:block;width:59px;height:59px;cursor:pointer;' id='knockouttimer'><div id='timer'></div></div>",
        lastDied: Character.lastDied
    };

    SlySuite.KOTimer.firstrun = function() {

        if ($('.game_notification_area').length > 0) {
            $('.game_notification_area').append(this.image);
        } else {
            setTimeout(SlySuite.KOTimer.firstrun, 3000);
            console.log('Couldn\'t find the notification area, trying again soon...');
            return;
        }
        $('#knockouttimer').css('background-image', 'url("http://i300.photobucket.com/albums/nn22/qwexrty/knockout_sprite_zps97503234.png")');

        $('#knockouttimer #timer').css({
            'position': 'absolute',
            'bottom': '0px',
            'left': '0px',
            'right': '0px',
            'color': 'white',
            'text-align': 'center',
            'font-size': '11px',
            'height': '30px',
            'line-height': '30px'
        });

        SlySuite.KOTimer.retrieveTimeleft(true);
        SlySuite.KOTimer.update();
    };

    SlySuite.KOTimer.retrieveTimeleft = function(forced) {
        forced = forced || false;

        if (forced || Character.lastDied != SlySuite.KOTimer.lastDied) {
            SlySuite.KOTimer.lastDied = Character.lastDied;
        } else {
            setTimeout(SlySuite.KOTimer.retrieveTimeleft, 10000);
            return;
        }

        if (Character.homeTown.town_id != 0) // Can only request the info when you're in a town
        {
            $.post("game.php?window=building_sheriff&mode=index", {
                town_id: Character.homeTown.town_id
            }, function(data) {
                SlySuite.KOTimer.timeleft = data.timeleft;
                SlySuite.KOTimer.aliveAgain = Math.round(new Date().getTime() / 1000) + data.timeleft;
            });
        } else // We'll hide the image when you're not in a town
        {
            SlySuite.KOTimer.aliveAgain = 0;
            $('#knockouttimer').hide();

        }
        setTimeout(SlySuite.KOTimer.retrieveTimeleft, 10000); // And we'll do it again in 10 seconds
    };

    SlySuite.KOTimer.update = function() {
        var unix = Math.round(new Date().getTime() / 1000);
        aliveAgain = SlySuite.KOTimer.aliveAgain;
        if (aliveAgain < unix) {
            $('#knockouttimer').hide();
            setTimeout(SlySuite.KOTimer.update, 10000);
            return;
        } else
            $('#knockouttimer').show();

        difference = aliveAgain - unix;
        hours = Math.floor(difference / 60 / 60);
        difference -= hours * 60 * 60;
        minutes = Math.floor(difference / 60);
        difference -= minutes * 60;

        if (hours == 0 && minutes == 0)
            $('#knockouttimer #timer').html(Math.round(difference) + 's');
        else if (hours == 0)
            $('#knockouttimer #timer').html(minutes + 'm');
        else
            $('#knockouttimer #timer').html(hours + 'h:' + minutes + 'm');

        setTimeout(SlySuite.KOTimer.update, 1000);

    };
    SlySuite.RiverColours = {
        initialized: false
    };

    SlySuite.RiverColours.init = function() {
        if (typeof(Map.Helper) == 'undefined')
            return;
        SlySuite.RiverColours.initialized = true;
        SlySuite.RiverColours.oldScript = Map.Helper.imgPath.lookForModification.bind({});
        Map.Helper.imgPath.lookForModification = function(path, d) {
            $('#river_hide_css').remove();
            if (/river|deco_egg_05|quests_fluss/.test(path) && SlySuite.getPreference('RiverColours') != 'default' && SlySuite.getPreference('RiverColours') != 'norivers') {
                if (SlySuite.getPreference('RiverColours') == 'blue')
                    return '/' + path;
                else
                    return SlySuite.getPreference('RiverColours') + '/' + path;
            } else if (SlySuite.getPreference('RiverColours') == 'norivers') {
                var hidingrivers = document.createElement('style');
                hidingrivers.setAttribute("id", "river_hide_css");
                hidingrivers.textContent = ".image[style*='river']{display:none;}";
                document.body.appendChild(hidingrivers);
                return SlySuite.RiverColours.oldScript(path, d);
            } else
                return SlySuite.RiverColours.oldScript(path, d);

        };
        SlySuite.RiverColours.changeColour = function() {
            Map.Helper.imgPath.clearCache();
            Map.refresh(true);
        };
    };

    SlySuite.Achievements = {
        achievementsList: {},
        allFolders: [],
        lastUpdate: new Date(0),
        nextFolderCheck: false,
        init: function() {
            localStorage.getObject('SlySuite_Achievements') == null ? localStorage.setObject('SlySuite_Achievements', SlySuite.Achievements.achievementsList) : $.extend(this.achievementsList, localStorage.getObject('SlySuite_Achievements'));
            $(function() {
                Ajax.remoteCall('achievement', '', {
                    playerid: Character.playerId
                }, function(r) {
                    if (r.error) return new MessageError(r.msg).show();
                    for (var f in r.menu) {
                        if (!('id' in r.menu[f])) continue;
                        if (r.menu[f].id == 'overall' || r.menu[f].id == 'heroics')
                            continue;
                        SlySuite.Achievements.allFolders.push(r.menu[f].id);
                        for (var sub in r.menu[f].sub)
                            if ('id' in r.menu[f].sub[sub]) SlySuite.Achievements.allFolders.push(r.menu[f].sub[sub].id);
                    }
                });
                setTimeout(function() {
                    SlySuite.Achievements.createWindow();
                    SlySuite.Achievements.editTracker();
                    SlySuite.Achievements.updateAchievements();


                }, 5000);
            });

            this.createButton();
        },
        createWindow: function() {
            if (typeof(Map.width) == 'undefined' || Map.width == 0) {
                setTimeout(SlySuite.Achievements.createWindow, 3000);
                return;
            }
            this.scrolling = new west.gui.Scrollpane(null).appendContent(
                "<div class='achievement_tracker_container' />"
            );
            this.window = wman.open('achievementtracker', null, 'chat questtracker noclose nofocus nocloseall dontminimize')
                .setMiniTitle('Seguimiento de logros')
                .setSize(350, 170)
                .setMinSize(320, 140)
                .addEventListener(TWE('WINDOW_MINIMIZE'), this.minimize, this)
                .addEventListener(TWE('WINDOW_DESTROY'), this.minimize, this)
                .addEventListener(TWE('WINDOW_RELOAD'), this.manualUpdate, this)
                .setResizeable(true)
                .appendToContentPane($("<div id='ui_achievementtracker'/>").append(this.scrolling.getMainDiv()));

            this.window.addTab('<div class="questbook" title="Seguimiente de logros"></div> Seguimiento de logros', 'achievementtracker', function() {});

            this.window.dontCloseAll = true;
            this.addCss();

            $(this.window.getMainDiv()).css({
                left: Map.width - 425,
                top: 400
            });
            $('._tab_id_achievementtracker .tw2gui_window_tab_text .questbook').css({
                'background-image': 'url(' + SlySuite.images.achievement_icon + ')'
            });
            $('#windows .tw2gui_window.questtracker .tw2gui_window_tabbar_tabs').attr({
                'style': 'left:2px !important;'
            });
        },
        createButton: function() {
            var bottom = $('<div></div>').attr({
                'class': 'menucontainer_bottom'
            });

            var icon = $('<div></div>').attr({
                'class': 'menulink',
                'title': "Abrir seguimiento de logros"
            }).css({
                'background-image': 'url(' + SlySuite.images.achievements + ')',
                'background-position': '0px 0px'
            }).mouseleave(function() {
                $(this).css("background-position", "0px 0px");
            }).mouseenter(function(e) {
                $(this).css("background-position", "-25px 0px");
            }).click(function() {
                SlySuite.Achievements.openWindow();
            });

            $('#ui_menubar .ui_menucontainer :last').after($('<div></div>').attr({
                'class': 'ui_menucontainer',
                'id': 'Achievementtracker_button'
            }).css({
                display: 'none'
            }).append(icon).append(bottom));
        },
        minimize: function() {
            $(this.window.divMain).hide();
            $('#Achievementtracker_button').show();
            wman.minimizedIds[this.window.id] = this.window;
        },
        openWindow: function() {
            $(this.window.divMain).show();
            $('#Achievementtracker_button').hide();
        },
        editTracker: function() {
            SlySuite.Achievements.oldTracker = Character.trackAchievement;
            Character.trackAchievement = function(a, b) {
                SlySuite.Achievements.trackAchievement(a, b);
            };
        },
        trackAchievement: function(progress, update) {
            if (!SlySuite.preferences.Achievements) {
                SlySuite.Achievements.oldTracker(progress, update);
                return;
            }
            var params = progress.split('-');
            // achievement done, track next one in group
            if (!update || params[2]) {
                var achvId = (params[2]) ? params[2] : params[0];
                this.setAchievement(achvId);
            } else {
                this.setAchievement(params[1]);
            }

        },
        setAchievement: function(achi) {
            if (achi in this.achievementsList) {
                delete this.achievementsList[achi];
                this.removeFromTracker(achi);
                localStorage.setObject('SlySuite_Achievements', SlySuite.Achievements.achievementsList);
            } else {
                this.achievementsList[achi] = new Object();
                this.getAchievementData(achi);
                SlySuite.Achievements.descriptionNeeded.push(parseInt(achi));
                if (!SlySuite.Achievements.nextFolderCheck)
                    SlySuite.Achievements.getFolderInfo(SlySuite.Achievements.allFolders.slice());
            }
        },
        manualUpdate: function() {
            if (this.lastUpdate.getTime() < new Date().getTime() - 60000) {
                this.window.showLoader();
                clearTimeout(this.nextUpdate);
                this.updateAchievements();
                this.lastUpdate = new Date();
                this.window.hideLoader();
            } else {
                secleft = 60 - Math.floor((new Date().getTime() - this.lastUpdate.getTime()) / 1000);
                new MessageError("Actualizado hace muy poco, inténtelo de nuevo en " + secleft + "s").show();
            }

        },
        updateTracker: function(achi) {
            if (this.achievementsList[achi].current >= this.achievementsList[achi].required) {
                this.setAchievement(achi);
                return;
            }

            if (!('isTime' in this.achievementsList[achi]))
                this.achievementsList[achi].isTime = false;

            if ($('#ui_achievementtracker #achievementtracker_' + achi).length > 0) {
                $('#ui_achievementtracker #achievementtracker_' + achi + ' .achievement_current').html(this.achievementsList[achi].isTime ? this.tcalc(this.achievementsList[achi].current) : this.achievementsList[achi].current);
                $('#ui_achievementtracker #achievementtracker_' + achi + ' .achievement_required').html(this.achievementsList[achi].isTime ? this.tcalc(this.achievementsList[achi].required) : this.achievementsList[achi].required);
                $('#ui_achievementtracker #achievementtracker_' + achi + ' .achievement_percentage').html(Math.floor(this.achievementsList[achi].current / this.achievementsList[achi].required * 100));
                $('#ui_achievementtracker #achievementtracker_' + achi + ' .quest_requirement').attr('title', ('description' in this.achievementsList[achi] ? this.achievementsList[achi].description : ''));
            } else {
                $('#ui_achievementtracker .achievement_tracker_container').append('<div class="selectable" id="achievementtracker_' + achi + '">' +
                    '<div class="quest-list title">' + this.achievementsList[achi].title +
                    '<span class="quest-list remove" title="Eliminar logro del seguimiento"></span></div>' +
                    '<ul class="requirement_container"><li class="quest_requirement" ' + ('description' in this.achievementsList[achi] ? 'title="' + this.achievementsList[achi].description + '"=' : '') + '>- <span class="achievement_current">' + (this.achievementsList[achi].isTime ? this.tcalc(this.achievementsList[achi].current) : this.achievementsList[achi].current) +
                    '</span> / <span class="achievement_required">' + (this.achievementsList[achi].isTime ? this.tcalc(this.achievementsList[achi].required) : this.achievementsList[achi].required) + '</span> (<span class="achievement_percentage">' +
                    (Math.floor(this.achievementsList[achi].current / this.achievementsList[achi].required * 100)) + '</span>%)</li></ul></div>');
                $('#ui_achievementtracker #achievementtracker_' + achi + ' .quest-list.remove').click(function() {
                    SlySuite.Achievements.setAchievement(achi);
                });
            }
        },
        getAchievementData: function(achi) {
            Ajax.remoteCall('achievement', 'track', {
                achvid: achi
            }, function(resp) {
                if (resp.error) return new MessageError(resp.msg).show();
                $.extend(SlySuite.Achievements.achievementsList[achi], {
                    title: resp.title,
                    current: resp.current,
                    required: resp.required
                });
                SlySuite.Achievements.updateTracker(achi);
                Ajax.remoteCall('achievement', 'untrack');
                localStorage.setObject('SlySuite_Achievements', SlySuite.Achievements.achievementsList);
            });
        },
        removeFromTracker: function(achi) {
            $('#ui_achievementtracker #achievementtracker_' + achi).remove();
        },
        updateAchievements: function() {
            SlySuite.Achievements.descriptionNeeded = [];

            for (var a in SlySuite.Achievements.achievementsList) {
                SlySuite.Achievements.getAchievementData(a);
                if (!('folder' in SlySuite.Achievements.achievementsList[a]))
                    SlySuite.Achievements.descriptionNeeded.push(parseInt(a));
            }
            SlySuite.Achievements.nextUpdate = setTimeout(SlySuite.Achievements.updateAchievements, 10 * 60 * 1000);

            if (SlySuite.Achievements.descriptionNeeded.length > 0)
                SlySuite.Achievements.getFolderInfo(SlySuite.Achievements.allFolders.slice());


        },
        getFolderInfo: function(arr) {
            if (arr.length == 0 || SlySuite.Achievements.descriptionNeeded.length == 0) {
                SlySuite.Achievements.nextFolderCheck = false;
                return;
            }
            Ajax.remoteCall('achievement', 'get_list', {
                folder: arr[0],
                playerid: Character.playerId
            }, function(json) {
                for (var achieve in json.achievements.progress) {
                    currentId = json.achievements.progress[achieve].id;
                    if ($.inArray(currentId, SlySuite.Achievements.descriptionNeeded) != -1) {
                        SlySuite.Achievements.descriptionNeeded.splice(SlySuite.Achievements.descriptionNeeded.indexOf(currentId), 1);
                        SlySuite.Achievements.achievementsList[currentId].description = json.achievements.progress[achieve].desc;
                        SlySuite.Achievements.achievementsList[currentId].folder = arr[0];
                        if (json.achievements.progress[achieve].meta[0].match('^js:')) {
                            var parts = json.achievements.progress[achieve].meta[0].split(":");
                            var func = eval(parts[1]);
                            if (func instanceof west.gui.Progressbar) {
                                parts[4] ? SlySuite.Achievements.achievementsList[currentId].isTime = true : SlySuite.Achievements.achievementsList[currentId].isTime = false;
                            }
                        }
                        SlySuite.Achievements.updateTracker(currentId);
                        localStorage.setObject('SlySuite_Achievements', SlySuite.Achievements.achievementsList);
                    }
                }

                arr.splice(0, 1);
                SlySuite.Achievements.nextFolderCheck = setTimeout(SlySuite.Achievements.getFolderInfo, 2000, arr);
            });
        },
        addCss: function() {
            achievementCss = '';
            achievementCss += "#ui_achievementtracker .quest-list.title {margin-left:5px;color: #DBA901;font-weight: bold;display:inline-block;zoom:1;}\n";
            achievementCss += "#ui_achievementtracker .selectable:hover .quest-list.remove {display:inline-block;zoom:1;cursor:pointer;}\n";
            achievementCss += "#ui_achievementtracker .quest-list.remove {background: url('/images/chat/windowicons.png') no-repeat -120px 0px;width: 12px; height: 12px; margin-left:5px;margin-bottom:-2px;}\n";
            achievementCss += "div#ui_achievementtracker { width: 100%; height: 100%; display:block;}";

            var style = document.createElement('style');
            style.textContent = achievementCss;
            document.body.appendChild(style);
        },
        tcalc: function(val) {
            var h, m, s;
            m = s = "00";
            h = Math.floor(val / 3600);
            if (0 != (val % 3600)) {
                var c = val - (h * 3600);
                minute = Math.floor(c / 60);
                if (0 != (c % 60)) s = c % 60;
            }
            return (h <= 0 ? "" : h + ":") + m + ":" + s;
        }

    };

    SlySuite.CraftingWindow = {

        old: $.extend({}, Crafting),
        currentlySelected: false,
        knownRecipes: [],
        init: function() {
            Crafting.addRecipe = SlySuite.CraftingWindow.addRecipe;
            Crafting.updateResources = SlySuite.CraftingWindow.updateResources;
            /*Bag.updateChanges = function(changes, from) {
                Bag.handleChanges(changes, from);
                Crafting.updateResources();
                SlySuite.CraftingWindow.updateAllCount();
            };*/

            SlySuite.CraftingWindow.addCss();
        },
        selectRecipe: function(id) {
            $('#recipe' + SlySuite.CraftingWindow.currentlySelected + '.selected').removeClass('selected');
            $('.recipe_content').hide();
            $('#recipe' + id).addClass('selected');
            $('#recipe_content_' + id).show();
            SlySuite.CraftingWindow.currentlySelected = id;
            if (SlySuite.CraftingWindow.craftCount(id) > 0) {
                $('#crafting_requirements_display .tw2gui_button').show();
            } else {
                $('#crafting_requirements_display .tw2gui_button').hide();
            }

        },
        craftCount: function(id) {
            var canCraft = 10000;
            for (var i in Crafting.recipes[id].resources) {
                if (!Crafting.recipes[id].resources.hasOwnProperty((i))) continue;

                resourceItem = ItemManager.get(Crafting.recipes[id].resources[i].item);
                amountRequired = Crafting.recipes[id].resources[i].count;
                var bag_count = Bag.getItemCount(resourceItem.item_id);
                canCraft = Math.min(Math.floor(bag_count / amountRequired), canCraft);
            }
            return canCraft;
        },
        updateResources: function() {
            for (var k in Crafting.recipes) {
                var mats_available = true,
                    resourceItem, amountRequired;
                for (var i in Crafting.recipes[k].resources) {
                    if (!Crafting.recipes[k].resources.hasOwnProperty((i))) continue;

                    resourceItem = ItemManager.get(Crafting.recipes[k].resources[i].item);
                    amountRequired = Crafting.recipes[k].resources[i].count;

                    var bag_count = Bag.getItemCount(resourceItem.item_id);

                    SlySuite.CraftingWindow.updateCount(k);

                    if (bag_count < amountRequired) mats_available = false;

                    window.CharacterWindow.window.$('#resources_' + k + '_' + resourceItem.item_id).html(
                        new tw2widget.CraftingItem(resourceItem)
                        .setRequired(bag_count, amountRequired)
                        .getMainDiv()
                    );
                }
                window.CharacterWindow.window.$('#recipe_craft_' + Crafting.recipes[k].item_id).empty();

                if (Crafting.recipes[k].last_craft) {
                    $('#recipe_craft_' + Crafting.recipes[k].item_id).append("<span cursor:default;'>" + Crafting.recipes[k].last_craft.formatDurationBuffWay() + "</span>");
                    console.log('test');
                }

                if (mats_available)
                    CharacterWindow.window.$('#recipe' + Crafting.recipes[k].item_id).removeClass("not_available");
                else
                    CharacterWindow.window.$('#recipe' + Crafting.recipes[k].item_id).addClass("not_available");
            }

            if (SlySuite.CraftingWindow.craftCount(SlySuite.CraftingWindow.currentlySelected) > 0) {
                $('#crafting_requirements_display .tw2gui_button').show();
            } else {
                $('#crafting_requirements_display .tw2gui_button').hide();
            }
        },
        updateCount: function(id) {
            $('#recipe_count_' + id).html('[' + SlySuite.CraftingWindow.craftCount(id) + ']');
            console.log(id);
        },
        addRecipe: function(recipe) {
            if ($('#crafting_requirements_display').length < 1) {
                $('.character-crafting.crafting').append($("<div id='crafting_requirements_display' />"));
                $('#crafting_requirements_display').append(new west.gui.Button(_("Fabricar"), function() {
                    SlySuite.CraftingWindow.craftItem(SlySuite.CraftingWindow.currentlySelected);
                }).setMinWidth(150).getMainDiv());
                /*EventHandler.listen('inventory_changed',function(){
                    
                    
                });*/
            }
            var time_last_craft = recipe.last_craft;
            var recipe = ItemManager.get(recipe.item_id);
            Crafting.recipes[recipe.item_id] = recipe;
            Crafting.recipes[recipe.item_id]['last_craft'] = time_last_craft;
            if (window.CharacterWindow.window != undefined && window.CharacterWindow.window.$('#crafting_recipe_list').length > 0) {
                var recipe_div = $("<div class='" + Crafting.getRecipeColor(recipe) + "' id='recipe" + recipe.item_id + "' onclick='SlySuite.CraftingWindow.selectRecipe(" + recipe.item_id + ");'></div>");
                var recipe_title_inner_div = $("<div class='recipe_title_inner' />");
                var recipe_title_div = $("<div id='recipe_title_" + recipe.item_id + "' class='recipe_title'></div>");
                var recipe_collapse_div = $("<div id='recipe_count_" + recipe.item_id + "' class='recipe_collapse'></div>");
                var recipe_difficult_div = $("<div id='recipe_difficult_" + recipe.item_id + "' class='recipe_difficult " + Crafting.getRecipeColor(recipe) + "' title='" + Crafting.description.escapeHTML() + "'></div>");
                var recipe_name_div = $("<div id='recipe_name" + recipe.item_id + "' class='recipe_name'>" + recipe.name + "</div>");
                var recipe_craft_div = $("<div id='recipe_craft_" + recipe.item_id + "' class='recipe_craft'></div>");
                var recipe_content_div = $("<div id='recipe_content_" + recipe.item_id + "' class='recipe_content'></div>").hide();
                var recipe_craftitem_div = $("<div id='recipe_craftitem_" + recipe.item_id + "' class='recipe_craftitem'></div>");
                var recipe_resources_content_div = $("<div id='recipe_resources_content_" + recipe.item_id + "' class='recipe_resources'></div>");

                SlySuite.CraftingWindow.knownRecipes[recipe.item_id] = recipe;

                recipe_title_inner_div.append(recipe_collapse_div, recipe_name_div);
                recipe_title_div.append(recipe_title_inner_div, recipe_craft_div).appendTo(recipe_div);

                var craftitem = $("<div id='craftitem_" + recipe.item_id + "' style='float:none;'/>")
                    .append((new tw2widget.CraftingItem(ItemManager.get(recipe.craftitem))).getMainDiv());

                craftitem.appendTo(recipe_craftitem_div);

                var available = true,
                    resourceItem, canCraft = 1000000;
                for (var i in recipe.resources) {
                    if (!recipe.resources.hasOwnProperty(i)) continue;

                    resourceItem = ItemManager.get(recipe.resources[i].item);

                    var resource = $("<div id='resources_" + recipe.item_id + "_" + resourceItem.item_id + "'></div>");
                    var bag_count = Bag.getItemCount(resourceItem.item_id);

                    canCraft = Math.min(Math.floor(bag_count / recipe.resources[i].count), canCraft);

                    recipe_resources_content_div.append(resource.append(
                        new tw2widget.CraftingItem(resourceItem)
                        .setRequired(bag_count, recipe.resources[i].count)
                        .getMainDiv()
                    ));

                    var hasItem = Bag.getItemByItemId(resourceItem.item_id);
                    if (!hasItem || hasItem.getCount() < recipe.resources[i].count)
                        available = false;
                }
                recipe_collapse_div.html('[' + canCraft + ']');

                if (!available) {
                    recipe_div.addClass("not_available");
                } else if (time_last_craft) {
                    recipe_craft_div.append("<span style='cursor:default;'>" + time_last_craft.formatDurationBuffWay() + "</span>");
                }
                recipe_content_div.append(recipe_craftitem_div, recipe_resources_content_div, $("<br />"));
                recipe_content_div.appendTo($('#crafting_requirements_display'));
                $('#crafting_recipe_list .tw2gui_scrollpane_clipper_contentpane').prepend(recipe_div);
                SlySuite.CraftingWindow.selectRecipe(recipe.item_id);
            }
        },
        craftItem: function(recipe_id) {
            Ajax.remoteCall('crafting', 'start_craft', {
                recipe_id: recipe_id
            }, function(resp) {
                if (resp.error) return new MessageError(resp.msg).show();
                var data = resp.msg;

                CharacterWindow.progressCrafting.setValue(data.profession_skill);
                Character.setProfessionSkill(data.profession_skill);
                CharacterWindow.window.$('#recipe' + recipe_id)
                    .removeClass('middle hard easy')
                    .addClass(Crafting.getRecipeColor(ItemManager.get(recipe_id)));

                EventHandler.signal("inventory_changed");
                Character.updateDailyTask('crafts', data.count);
                return new MessageSuccess(data.msg).show();
            });
        },
        addCss: function() {
            var css = '';
            css += '#crafting_recipe_list { height:250px; top:43px;position:relative}';
            css += '.recipe_title { background:none; cursor:pointer}';
            css += '.recipe_title_inner { margin-top:2px;}';

            css += '.easy { background:none; color:rgb(40,40,40);}';
            css += '.easy .recipe_title:hover { background:rgba(55, 55, 55, 0.75); color:white;}';
            css += '.easy.selected .recipe_title { background:rgba(55, 55, 55, 0.75); color:white;}';

            css += '.middle { background:none; color:rgb(0, 179, 3);}';
            css += '.middle .recipe_title:hover { background:rgba(0, 118, 6, 0.75); color:white;}';
            css += '.middle.selected .recipe_title { background:rgba(0, 118, 6, 0.75); color:white;}';

            css += '.hard { background:none; color:rgb(255, 88, 0);}';
            css += '.hard .recipe_title:hover { background:rgba(221, 92, 0, 0.75); color:white;}';
            css += '.hard.selected .recipe_title { background:rgba(221, 92, 0, 0.75); color:white;}';

            css += '.recipe_name {color:inherit;margin-top:0px;}';
            css += '.recipe_collapse {color:inherit;font-size:inherit;}';
            css += '.not_available .recipe_collapse {visibility:hidden;}';
            css += '.recipe_craft {color:rgb(236, 25, 25);}';
            css += '#crafting_requirements_display { position: relative; top: 43px; left: 61px;}';
            css += '#crafting_requirements_display .tw2gui_button {position:absolute; left:2px; bottom:-19px;}';

            $('body').append('<style>' + css + '</style>');
        }



    };








    SlySuite.init();
});
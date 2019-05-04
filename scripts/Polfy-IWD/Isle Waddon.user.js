// ==UserScript==
// @name         Isle Waddon
// @version      3.1
// @description  ALL Timer / Quick Salvage / Quick Equip / Quick Reply / MiniMap / Rune Range / Quest Hide option / lvl 20 Roll Range and more
// @author       Polfy's
// @match        https://play.isleward.com/
// @namespace    https://greasyfork.org/users/234234
// ==/UserScript==

///////////////////////////////
// CHANGE YOU KEY BIND       //
var MenuKey = "b"            //
var SalvageKey = "f"         //
var EquipKey = "t"           //
var DisplayVersionKey = "g"  //
var TimerKey = "y"           //
var MapKey = "n"             //
var QuestKey = "6"           //
///////////////////////////////

/////////////////////////////////////////////////////////////
///DON'T TOUCH BELOW//DON'T TOUCH BELOW//DON'T TOUCH BELOW///
///DON'T TOUCH BELOW//DON'T TOUCH BELOW//DON'T TOUCH BELOW///
///DON'T TOUCH BELOW//DON'T TOUCH BELOW//DON'T TOUCH BELOW///
/////////////////////////////////////////////////////////////

// MENU VALUE
var MenuSTATUS = "OFF"
var Version = "2.8.1"
var DisplayVersionSTATUS = "OFF"
var SalvageSTATUS = "ON"
var EquipSTATUS = "ON"
var TimerSTATUS = "ON"
var MapSTATUS = "OFF"
var QuestSTATUS = "ON"

var L1 = "-------MENU ADDON-------";
var L2 = "Put your cursor here";
var L3 = DisplayVersionKey+" : Display Version | ";
var L4 = SalvageKey+" : Quick Salvage | ";
var L5 = EquipKey+" : Quick Equip | ";
var L6 = TimerKey+" : Timer | ";
var L7 = "/r : Quick Reply in chat";
var L8 = MapKey+" : MiniMap | ";
var L9 = QuestKey+" : Quest UI | ";
var L10 = "+ More feature";

var tooltipStyle =
    `<style>
/* Tooltip container */
.tooltip {
position: relative;
display: inline-block;
border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
}
/* Tooltip text */
.tooltip .tooltiptext {
visibility: hidden;
width: 120px;
background-color: black;
color: #fff;
text-align: center;
padding: 5px 0;
border-radius: 6px;
/* Position the tooltip text - see examples below! */
position: absolute;
z-index: 1;
width: 200px;
top: -5px;
right: 105%;
}
.tooltip:hover .tooltiptext {
visibility: visible;
}
</style>
`;
/*
function secondsToString(seconds)
{
    var numhours = Math.floor((seconds % 86400) / 3600);
    var numminutes = Math.floor(((seconds % 86400) % 3600) / 60);
    var TextPlayed
    if (numhours > 0) {
        TextPlayed += numhours+" hours";
        if (numhours > 1) { TextPlayed += "s "; }
        else { TextPlayed += " "; }
    }
    TextPlayed += "and "+numminutes+" minutes";
    return TextPlayed;
}
*/
window.MenuADDON = function(){
    window.menu = jQuery('<div class="addon-loader" style="position:absolute;left:500px;"></div>').appendTo(jQuery('.ui-container'));
    var src = tooltipStyle+'<table bgcolor="#3c3f4c">';
    src += '<tr><td><div class="tooltip"><font color="#ffeb38">'+L1+'</font><span class="tooltiptext">'+"Press "+MenuKey+" to close<br>Enjoy this add-on :p"+'</span></div></td>';
    src += '<tr><td><div class="tooltip"><font color="#ffeb38">'+L2+'</font><span class="tooltiptext">'+"Do this on all the menu !"+'</span></div></td>';
    if (DisplayVersionSTATUS == "ON") {
        src += '<tr><td><div class="tooltip"><font color="#ffeb38">'+L3+'</font><font color="green">'+DisplayVersionSTATUS+'</font></div></td>';
    } else {
        src += '<tr><td><div class="tooltip"><font color="#ffeb38">'+L3+'</font><font color="red">'+DisplayVersionSTATUS+'</font></div></td>';
    }
    if (SalvageSTATUS == "ON") {
        src += '<tr><td><div class="tooltip"><font color="#ffeb38">'+L4+'</font><font color="green">'+SalvageSTATUS+'</font><span class="tooltiptext">'+"Press "+SalvageKey+" to Enable/Disable the Quick Salvage<br>Pressing "+SalvageKey+" on an item will salvage it"+'</span></div></td>';
    } else {
        src += '<tr><td><div class="tooltip"><font color="#ffeb38">'+L4+'</font><font color="red">'+SalvageSTATUS+'</font><span class="tooltiptext">'+"Press "+SalvageKey+" to Enable/Disable the Quick Salvage<br>Pressing "+SalvageKey+" on an item will salvage it"+'</span></div></td>';
    }
    if (EquipSTATUS == "ON") {
        src += '<tr><td><div class="tooltip"><font color="#ffeb38">'+L5+'</font><font color="green">'+EquipSTATUS+'</font><span class="tooltiptext">'+"Press "+EquipKey+" to Enable/Disable the Quick Equip<br>Pressing "+EquipKey+" on an item will equip it"+'</span></div></td>';
    } else {
        src += '<tr><td><div class="tooltip"><font color="#ffeb38">'+L5+'</font><font color="red">'+EquipSTATUS+'</font><span class="tooltiptext">'+"Press "+EquipKey+" to Enable/Disable the Quick Equip<br>Pressing "+EquipKey+" on an item will equip it"+'</span></div></td>';
    }
    if (TimerSTATUS == "ON") {
        src += '<tr><td><div class="tooltip"><font color="#ffeb38">'+L6+'</font><font color="green">'+TimerSTATUS+'</font><span class="tooltiptext">'+"Press "+TimerKey+" to Enable/Disable the Timer<br>Timer show when bosses respawn and play sound before respawn"+'</span></div></td>';
    } else {
        src += '<tr><td><div class="tooltip"><font color="#ffeb38">'+L6+'</font><font color="red">'+TimerSTATUS+'</font><span class="tooltiptext">'+"Press "+TimerKey+" to Enable/Disable the Timer<br>Timer show when bosses respawn and play sound before respawn"+'</span></div></td>';
    }
    src += '<tr><td><div class="tooltip"><font color="#ffeb38">'+L7+'</font><span class="tooltiptext">'+"Use /r in chat to quick reply to private messages<br>It also add a sound when you get a private message"+'</span></div></td>';
    if (MapSTATUS == "ON") {
        src += '<tr><td><div class="tooltip"><font color="#ffeb38">'+L8+'</font><font color="green">'+MapSTATUS+'</font><span class="tooltiptext">'+"Pressing "+MapKey+" open the MiniMap<br>+,- Scale<br>5,6 Opacity<br>7,8,9,0 Position"+'</span></div></td>';
    } else {
        src += '<tr><td><div class="tooltip"><font color="#ffeb38">'+L8+'</font><font color="red">'+MapSTATUS+'</font><span class="tooltiptext">'+"Pressing "+MapKey+" open the MiniMap<br>+,- Scale<br>5,6 Opacity<br>7,8,9,0 Position"+'</span></div></td>';
    }
    if (QuestSTATUS == "ON") {
        src += '<tr><td><div class="tooltip"><font color="#ffeb38">'+L9+'</font><font color="green">'+QuestSTATUS+'</font><span class="tooltiptext">'+"Pressing "+QuestKey+" Hide/Display the Quest UI<br>You need to change Zone or Relog to see back the Quest UI"+'</span></div></td>';
    } else {
        src += '<tr><td><div class="tooltip"><font color="#ffeb38">'+L9+'</font><font color="red">'+QuestSTATUS+'</font><span class="tooltiptext">'+"Pressing "+QuestKey+" Hide/Display the Quest UI<br>You need to change Zone or Relog to see back the Quest UI"+'</span></div></td>';
    }
    var numhours = parseInt(player.stats.stats.played / 3600);
    var numminutes = parseInt((player.stats.stats.played % 3600) / 60);
    var TextPlayed = "";
    if (numhours > 0) {
        TextPlayed += numhours+" hour";
        if (numhours > 1) { TextPlayed += "s "; }
        else { TextPlayed += " "; }
        TextPlayed += "<br>and ";
    }
    TextPlayed += numminutes+" minutes";
    src += '<tr><td><div class="tooltip"><font color="#ffeb38">'+L10+'</font><span class="tooltiptext">'+"Add roll range at lvl 20 gear<br>Add number of set you can trade to Vikar<br><br>You already play with this character for :<br>"+TextPlayed+'</span></div></td>';
    src += "</table>";
    window.menu.html(src);
}
// INV VALUE
var itemPos = -1

// REGISTER
addons.register({
    init: function(events) {
        events.on('onBuiltItemTooltip', this.onBuiltItemTooltip.bind(this));
        events.on('onShowItemTooltip', this.onShowItemTooltip.bind(this));
        events.on('onHideItemTooltip', this.onHideItemTooltip.bind(this));
		events.on('onGetMap', this.onGetMap.bind(this));
        events.on('onKeyDown', this.onKeyDown.bind(this));
        events.on('onRezone', this.onRezone.bind(this));
        events.on('onEnterGame', this.onEnterGame.bind(this));

		// AFFICHAGE SETUP //
        this.uiContainer = $('.ui-container');
		this.uiDisplayVersion = $('<div id = "DisplayVersion" class="addon-uiCoordinate"></div>')
            .appendTo(this.uiContainer);
		this.uiDisplayMenu = $('<div id = "DisplayMenu" class="addon-uiCoordinate"></div>')
            .appendTo(this.uiContainer);
		this.uiDisplayMenu1 = $('<div id = "DisplayMenu1" class="addon-uiCoordinate"></div>')
            .appendTo(this.uiContainer);
		this.uiDisplayMenu2 = $('<div id = "DisplayMenu2" class="addon-uiCoordinate"></div>')
            .appendTo(this.uiContainer);

		this.uiDisplayVersion.css({
            'position': "absolute",
            'left': (this.uiContainer[0].clientWidth / 2.3),
            'top':  (this.uiContainer[0].clientHeight / 60) ,
            'background-color': "#3c3f4c",
            'border': "",
            'color':"#ffeb38",
		});
		this.uiDisplayMenu.css({
            'position': "absolute",
            'left': (this.uiContainer[0].clientWidth / 2.3),
            'top':  (this.uiContainer[0].clientHeight / 25) ,
            'background-color': "#3c3f4c",
            'border': "",
            'color':"#ffeb38",
		});
		this.uiDisplayMenu1.css({
            'position': "absolute",
            'left': (this.uiContainer[0].clientWidth / 2.3),
            'top':  (this.uiContainer[0].clientHeight / 15.4) ,
            'background-color': "#3c3f4c",
            'border': "",
            'color':"#ffeb38",
		});
		this.uiDisplayMenu2.css({
            'position': "absolute",
            'left': (this.uiContainer[0].clientWidth / 2.3),
            'top':  (this.uiContainer[0].clientHeight / 11) ,
            'background-color': "#3c3f4c",
            'border': "",
            'color':"#ffeb38",
		});
		this.uiDisplayVersion.css("display", "none");
		this.uiDisplayMenu.css("display", "none");
		this.uiDisplayMenu1.css("display", "none");
		this.uiDisplayMenu2.css("display", "none");
    },

    onShowItemTooltip: function(obj) {
        if(obj.material === true || obj.noSalvage === true){
            itemPos = -1;
        } else{
            itemPos = obj.pos;
        }
        window.spellObj = obj;
        window.Obj = obj;
    },
    onHideItemTooltip: function(obj) {
        itemPos = -1;
    },

    onBuiltItemTooltip: function(obj) {
        window.expandSpellTooltip(window.spellObj);
        window.lvl20Tooltip(window.Obj);
    },

	onGetMap: function(mapData) {
        if (!mapData.collisionMap) {
            return;
        }
		this.uiDisplayVersion.css("display", "block");
		this.uiDisplayMenu.css("display", "block");
		this.uiDisplayMenu1.css("display", "block");
		this.uiDisplayMenu2.css("display", "block");
    },

    onRezone: function(mapData) {
        QuestSTATUS = "ON";
        $(".ui-container .right .uiQuests .heading").text("Quests");
    },

    onEnterGame: function(obj) {
        function deferTillChat(method) {
            if (jQuery(".uiMessages .list")[0] !== undefined) {
                method();
            } else {
                setTimeout(function() { deferTillChat(method) }, 50);
            }
        }
        deferTillChat(function(){jQuery('<div class="list-message color-'+"greenB"+' chat">' +"Isle Waddon "+Version+" for IWD 0.3.1"+ '</div>').appendTo(jQuery(".uiMessages .list"))});
        deferTillChat(function(){jQuery('<div class="list-message color-'+"greenB"+' chat">' +"Press '"+MenuKey+"' to open the Menu"+ '</div>').appendTo(jQuery(".uiMessages .list"))});
    },

	// KEYS
	onKeyDown: function(key) {
		if (!key) {
			return;
		} else if (MenuSTATUS == "OFF" && key == MenuKey) {
				MenuSTATUS = "ON";
				document.getElementById('DisplayMenu1').textContent = "";
				document.getElementById('DisplayMenu2').textContent = "";
				document.getElementById('DisplayMenu').textContent = "";
                window.MenuADDON();
		} else if (MenuSTATUS == "ON") {
			if (key == MenuKey) {
				MenuSTATUS = "OFF";
                jQuery(".addon-loader").css("display","none");
			} else if (DisplayVersionSTATUS == "OFF" && key == DisplayVersionKey) {
                DisplayVersionSTATUS = "ON";
                document.getElementById('DisplayVersion').textContent = "Isle Waddon "+Version+" for IWD 0.3.1";
                jQuery(".addon-loader").css("display","none");
                window.MenuADDON();
			} else if (DisplayVersionSTATUS == "ON" && key == DisplayVersionKey) {
                DisplayVersionSTATUS = "OFF";
                document.getElementById('DisplayVersion').textContent = "";
                jQuery(".addon-loader").css("display","none");
                window.MenuADDON();
			} else if (SalvageSTATUS == "OFF" && key == SalvageKey) {
                SalvageSTATUS = "ON";
                jQuery(".addon-loader").css("display","none");
                window.MenuADDON();
			} else if (SalvageSTATUS == "ON" && key == SalvageKey) {
                SalvageSTATUS = "OFF";
                jQuery(".addon-loader").css("display","none");
                window.MenuADDON();
			} else if (EquipSTATUS == "OFF" && key == EquipKey) {
                EquipSTATUS = "ON";
                jQuery(".addon-loader").css("display","none");
                window.MenuADDON();
			} else if (EquipSTATUS == "ON" && key == EquipKey) {
                EquipSTATUS = "OFF";
                jQuery(".addon-loader").css("display","none");
                window.MenuADDON();
			} else if (TimerSTATUS == "OFF" && key == TimerKey) {
                TimerSTATUS = "ON";
				jQuery(".addon-loader").css("display","none");
				window.MenuADDON();
			} else if (TimerSTATUS == "ON" && key == TimerKey) {
                TimerSTATUS = "OFF";
                jQuery(".addon-loader").css("display","none");
                window.MenuADDON();
			} else if (MapSTATUS == "OFF" && key == MapKey) {
                MapSTATUS = "ON";
                window.toggleMap();
				jQuery(".addon-loader").css("display","none");
				window.MenuADDON();
			} else if (MapSTATUS == "ON" && key == MapKey) {
                MapSTATUS = "OFF";
                window.toggleMap();
                jQuery(".addon-loader").css("display","none");
                window.MenuADDON();
			} else if (QuestSTATUS == "OFF" && key == QuestKey) {
                QuestSTATUS = "ON";
                $(".ui-container .right .uiQuests .heading").text("Quests not HIDE : Change Zone or relog to update");
				jQuery(".addon-loader").css("display","none");
				window.MenuADDON();
			} else if (QuestSTATUS == "ON" && key == QuestKey) {
                QuestSTATUS = "OFF";
                $(".ui-container .right .uiQuests .heading").text("Quests HIDE");
                $(".ui-container .right .uiQuests .list").text("");
                jQuery(".addon-loader").css("display","none");
                window.MenuADDON();
			}
		} else if (MenuSTATUS == "OFF" && SalvageSTATUS == "ON" && key == SalvageKey) {
			if(jQuery(".ui-container .uiInventory").css("display") == "block" && itemPos != -1 && typeof jQuery(".uiMessages .active .typing")[0] === "undefined"){
				jQuery(".ui-container .uiInventory .grid .item").eq(itemPos).find(".icon").contextmenu();
				for(var i=0;i< $(".uiContext .list .option").length;++i){
					if(jQuery(".uiContext .list .option").eq(i).text() == "salvage"){
						jQuery(".uiContext .list .option").eq(i).click();
						break;
					}
				}
			}
        } else if (MenuSTATUS == "OFF" && EquipSTATUS == "ON" && key == EquipKey) {
			if(jQuery(".ui-container .uiInventory").css("display") == "block" && itemPos != -1 && typeof jQuery(".uiMessages .active .typing")[0] === "undefined"){
				jQuery(".ui-container .uiInventory .grid .item").eq(itemPos).find(".icon").contextmenu();
				for(i=0;i< $(".uiContext .list .option").length;++i){
					if(jQuery(".uiContext .list .option").eq(i).text() == "equip"){
						jQuery(".uiContext .list .option").eq(i).click();
						break;
					}
				}
			}
        }
	},
});

// LVL 20 ROLL RANGE + CARD SET TO TRADE COUNT
String.prototype.replaceAll = String.prototype.replaceAll || function(string, replaced) {
  return this.replace(new RegExp(string, 'g'), replaced);
};

window.lvl20Tooltip = function(obj){
    var color
    var fr
    if(obj.quality === 0) {color = "white";}
    if(obj.quality === 1) {color = "#4ac441";}
    if(obj.quality === 2) {color = "#3fa7dd";}
    if(obj.quality === 3) {color = "#a24eff";}
    if(obj.quality === 4) {color = "#ff6942";}
    if(obj.type === "Fishing Rod" && obj.name !== "Competition Rod" && obj.name !== "Flimsy Fishing Rod") {
        $('.uiTooltipItem .tooltip .name').each(function() {
            var text = $(this).html();
            $(this).html(text.replace(text, text + "+"+(obj.quality+1)+" non-augment stat</font>"));
            text = $(this).html();
        })
        $('.uiTooltipItem .tooltip .stats').each(function() {
            var text = $(this).html();
            $(this).html(text.replaceAll("extra catch chance", "extra catch chance <font color="+color+">[0-60]</font>"));
            text = $(this).html();
            $(this).html(text.replaceAll("faster catch speed", "faster catch speed <font color="+color+">[0-150]</font>"));
            text = $(this).html();
            $(this).html(text.replaceAll("higher fish rarity", "higher fish rarity <font color="+color+">[0-100]</font>"));
            text = $(this).html();
            $(this).html(text.replaceAll("increased fish weight", "increased fish weight <font color="+color+">[0-75]</font>"));
            text = $(this).html();
            $(this).html(text.replaceAll("extra chance to hook items", "extra chance to hook items <font color="+color+">[0-30]</font>"));
            text = $(this).html();
        })
    } else if(obj.ability !== true && obj.level) {
        if(obj.level === 20 || obj.originalLevel === 20 || (obj.level+obj.stats.lvlRequire) === 20) {
            // DAMAGE
            if(obj.type === "Trident") {
                $('.uiTooltipItem .tooltip .damage').each(function() {
                    var text = $(this).html();
                    $(this).html(text.replace("damage", "<font color='white'>[2-15]</font> damage"));
                })
            }
            if(obj.type === "Sword") {
                $('.uiTooltipItem .tooltip .damage').each(function() {
                    var text = $(this).html();
                    $(this).html(text.replace("damage", "<font color='white'>[1.47-9.65]</font> damage"));
                })
            }
            if(obj.type === "Dagger") {
                $('.uiTooltipItem .tooltip .damage').each(function() {
                    var text = $(this).html();
                    $(this).html(text.replace("damage", "<font color='white'>[0.88-5.79]</font> damage"));
                })
            }
            if(obj.type === "Wand") {
                $('.uiTooltipItem .tooltip .damage').each(function() {
                    var text = $(this).html();
                    $(this).html(text.replace("damage", "<font color='white'>[1.17-7.72]</font> damage"));
                })
            }
            if(obj.type === "Axe") {
                $('.uiTooltipItem .tooltip .damage').each(function() {
                    var text = $(this).html();
                    $(this).html(text.replace("damage", "<font color='white'>[2.64-17.37]</font> damage"));
                })
            }
            if(obj.type === "Gnarled Staff") {
                $('.uiTooltipItem .tooltip .damage').each(function() {
                    var text = $(this).html();
					//J'aime bien les bisous de Maureen
                    $(this).html(text.replace("damage", "<font color='white'>[1.65-10.81]</font> damage"));
                })
            }
            if(obj.type === "Spear") {
                $('.uiTooltipItem .tooltip .damage').each(function() {
                    var text = $(this).html();
                    $(this).html(text.replace("damage", "<font color='white'>[1.76-11.58]</font> damage"));
                })
            }
            if(obj.type === "Curved Dagger") {
                $('.uiTooltipItem .tooltip .damage').each(function() {
                    var text = $(this).html();
                    $(this).html(text.replace("damage", "<font color='white'>[1-3.8]</font> damage"));
                })
            }
            // STATS
            if(obj.slot === "twoHanded") {
                $('.uiTooltipItem .tooltip .implicitStats').each(function() {
                    var text = $(this).html();
                    $(this).html(text.replace("attack crit multiplier", "attack crit multiplier <font color="+color+">[10-30]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                    text = $(this).html();
                    $(this).html(text.replace("mana regeneration", "mana regeneration <font color="+color+">[3-9]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                    text = $(this).html();
                    $(this).html(text.replace("chance to dodge attacks", "chance to dodge attacks <font color="+color+">[1-7]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                });
                $('.uiTooltipItem .tooltip .stats').each(function() {
                    var text = $(this).html();
                    $(this).html(text.replaceAll("intellect", "intellect <font color="+color+">[1-20]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("dexterity", "dexterity <font color="+color+">[1-20]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("strength", "strength <font color="+color+">[1-20]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("global crit chance", "global crit chance <font color="+color+">[0.05-7.8]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("global crit multiplier", "global crit multiplier <font color="+color+">[1-56]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("attack crit chance", "attack crit chance <font color="+color+">[0.05-7.8]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("attack crit multiplier", "attack crit multiplier <font color="+color+">[1-56]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("spell crit chance", "spell crit chance <font color="+color+">[0.05-7.8]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("spell crit multiplier", "spell crit multiplier <font color="+color+">[1-56]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("increased item quality", "increased item quality <font color="+color+">[1-15]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("increased item quantity", "increased item quantity <font color="+color+">[2-27]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("additional xp per kill", "additional xp per kill <font color="+color+">[1-6]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("level requirement reduction", "level requirement reduction <font color="+color+">[1-10]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("vitality", "vitality <font color="+color+">[1-14]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("health regeneration", "health regeneration <font color="+color+">[1-28]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("maximum mana", "maximum mana <font color="+color+">[1-8]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("mana regeneration", "mana regeneration <font color="+color+">[1-5]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("arcane resistance", "arcane resistance <font color="+color+">[1-20]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("fire resistance", "fire resistance <font color="+color+">[1-20]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("frost resistance", "frost resistance <font color="+color+">[1-20]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("holy resistance", "holy resistance <font color="+color+">[1-20]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("poison resistance", "poison resistance <font color="+color+">[1-20]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("all resistance", "all resistance <font color="+color+">[1-20]</font>"));
                })
            } else {
                $('.uiTooltipItem .tooltip .implicitStats').each(function() {
                    var text = $(this).html();
                    if(obj.type === "Breastplate") {
                        text = $(this).html();
                        $(this).html(text.replace("armor", "armor <font color="+color+">[160-400]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                    } else if(obj.type === "Helmet" ||obj.type === "Legplates") {
                        text = $(this).html();
                        $(this).html(text.replace("armor", "armor <font color="+color+">[80-200]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                    } else if(obj.type === "Gauntlets" || obj.type === "Steel Boots") {
                        text = $(this).html();
                        $(this).html(text.replace("armor", "armor <font color="+color+">[40-100]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                    } else if(obj.type === "Leather Armor" || obj.type === "Scalemail") {
                        text = $(this).html();
                        $(this).html(text.replace("armor", "armor <font color="+color+">[96-240]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                    } else if(obj.type === "Leather Cap" ||obj.type === "Facemask" || obj.type === "Leather Pants" || obj.type === "Scale Leggings") {
                        text = $(this).html();
                        $(this).html(text.replace("armor", "armor <font color="+color+">[48-120]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                    } else if(obj.type === "Leather Gloves" || obj.type === "Scale Gloves" || obj.type === "Leather Boots" || obj.type === "Scale Boots") {
                        text = $(this).html();
                        $(this).html(text.replace("armor", "armor <font color="+color+">[24-60]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                    } else if(obj.type === "Robe") {
                        text = $(this).html();
                        $(this).html(text.replace("armor", "armor <font color="+color+">[56-140]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                    } else if(obj.type === "Cowl" ||obj.type === "Pants") {
                        text = $(this).html();
                        $(this).html(text.replace("armor", "armor <font color="+color+">[28-70]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                    } else if(obj.type === "Gloves" || obj.type === "Boots") {
                        text = $(this).html();
                        $(this).html(text.replace("armor", "armor <font color="+color+">[14-35]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                    } else if(obj.type === "Pendant") {
                        text = $(this).html();
                        $(this).html(text.replace("strenght", "strenght <font color="+color+">[1-4]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                    } else if(obj.type === "Amulet") {
                        text = $(this).html();
                        $(this).html(text.replace("intellect", "intellect <font color="+color+">[1-4]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                    } else if(obj.type === "Locket") {
                        text = $(this).html();
                        $(this).html(text.replace("dexterity", "dexterity <font color="+color+">[1-4]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                    } else if(obj.type === "Choker") {
                        text = $(this).html();
                        $(this).html(text.replace("health regeneration", "health regeneration <font color="+color+">[2-5]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                    } else if(obj.type === "Signet") {
                        text = $(this).html();
                        $(this).html(text.replace("armor", "armor <font color="+color+">[5-15]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                    } else if(obj.type === "Ring") {
                        text = $(this).html();
                        $(this).html(text.replace("mana regeneration", "mana regeneration <font color="+color+">[1-5]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                    } else if(obj.type === "Loop") {
                        text = $(this).html();
                        $(this).html(text.replace("to all attributes", "to all attributes <font color="+color+">[1-7]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                    } else if(obj.type === "Viridian Band") {
                        text = $(this).html();
                        $(this).html(text.replace("increased physical damage", "increased physical damage <font color="+color+">[1-3]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                    } else if(obj.type === "Belt") {
                        text = $(this).html();
                        $(this).html(text.replace("armor", "armor <font color="+color+">[10-20]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                    } else if(obj.type === "Sash") {
                        text = $(this).html();
                        $(this).html(text.replace("maximum mana", "maximum mana <font color="+color+">[1-8]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                    } else if(obj.type === "Leather Belt") {
                        text = $(this).html();
                        $(this).html(text.replace("global crit chance", "global crit chance <font color="+color+">[0.5-2.5]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                    } else if(obj.type === "Scaled Binding") {
                        text = $(this).html();
                        $(this).html(text.replace("vitality", "vitality <font color="+color+">[2-6]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                    } else if(obj.type === "Forged Ember") {
                        text = $(this).html();
                        $(this).html(text.replace("armor", "armor <font color="+color+">[25-70]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                    } else if(obj.type === "Smokey Orb") {
                        text = $(this).html();
                        $(this).html(text.replace("chance to dodge attacks", "chance to dodge attacks <font color="+color+">[1-3]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                    } else if(obj.type === "Quartz Fragment") {
                        text = $(this).html();
                        $(this).html(text.replace("increased arcane damage", "increased arcane damage <font color="+color+">[3-12]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                    } else if(obj.type === "Mystic Card") {
                        text = $(this).html();
                        $(this).html(text.replace("increased item quality", "Increased item quality <font color="+color+">[3-12]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                    } else if(obj.type === "Dragon Fang") {
                        text = $(this).html();
                        $(this).html(text.replace("attack speed", "attack speed <font color="+color+">[1-5]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                    } else if(obj.type === "Sword") {
                        text = $(this).html();
                        $(this).html(text.replace("attack speed", "attack speed <font color="+color+">[1-5]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                    } else if(obj.type === "Wand") {
                        text = $(this).html();
                        $(this).html(text.replace("cast speed", "cast speed <font color="+color+">[1-5]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                    } else if(obj.type === "Dagger") {
                        text = $(this).html();
                        $(this).html(text.replace("attack crit chance", "attack crit chance <font color="+color+">[0.5-2.5]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                    } else if(obj.type === "Wooden Shield") {
                        text = $(this).html();
                        $(this).html(text.replace("armor", "armor <font color="+color+">[120-300]</font>"));
                        text = $(this).html();
                        $(this).html(text.replace("chance to block attacks", "chance to block attacks <font color="+color+">[1-10]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                    } else if(obj.type === "Gilded Shield") {
                        text = $(this).html();
                        $(this).html(text.replace("armor", "armor <font color="+color+">[240-600]</font>"));
                        text = $(this).html();
                        $(this).html(text.replace("chance to block attacks", "chance to block attacks <font color="+color+">[1-5]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                    } else if(obj.type === "Brittle Tome") {
                        text = $(this).html();
                        $(this).html(text.replace("spell crit chance", "spell crit chance <font color="+color+">[0.5-2.5]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                    } else if(obj.type === "Ancient Tome") {
                        text = $(this).html();
                        $(this).html(text.replace("spell crit multiplier", "spell crit multiplier <font color="+color+">[10-30]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                    }
                });
                $('.uiTooltipItem .tooltip .stats').each(function() {
                    var text = $(this).html();
                    $(this).html(text.replaceAll("intellect", "intellect <font color="+color+">[1-10]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("dexterity", "dexterity <font color="+color+">[1-10]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("strength", "strength <font color="+color+">[1-10]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("to all attributes", "to all attributes <font color="+color+">[1-10]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("global crit chance", "global crit chance <font color="+color+">[0.05-3.9]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("global crit multiplier", "global crit multiplier <font color="+color+">[1-28]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("attack crit chance", "attack crit chance <font color="+color+">[0.05-3.9]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("attack crit multiplier", "attack crit multiplier <font color="+color+">[1-28]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("spell crit chance", "spell crit chance <font color="+color+">[0.05-3.9]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("spell crit multiplier", "spell crit multiplier <font color="+color+">[1-28]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("increased item quality", "increased item quality <font color="+color+">[1-15]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("increased item quantity", "increased item quantity <font color="+color+">[2-27]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("additional xp per kill", "additional xp per kill <font color="+color+">[1-6]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("level requirement reduction", "level requirement reduction <font color="+color+">[1-10]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("vitality", "vitality <font color="+color+">[1-7]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("health regeneration", "health regeneration <font color="+color+">[1-14]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("maximum mana", "maximum mana <font color="+color+">[1-8]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("mana regeneration", "mana regeneration <font color="+color+">[1-5]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("arcane resistance", "arcane resistance <font color="+color+">[1-10]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("fire resistance", "fire resistance <font color="+color+">[1-10]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("frost resistance", "frost resistance <font color="+color+">[1-10]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("holy resistance", "holy resistance <font color="+color+">[1-10]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("poison resistance", "poison resistance <font color="+color+">[1-10]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("all resistance", "all resistance <font color="+color+">[1-10]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("increased arcane damage", "increased arcane damage <font color="+color+">[1-3]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("increased frost damage", "increased frost damage <font color="+color+">[1-3]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("increased fire damage", "increased fire damage <font color="+color+">[1-3]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("increased holy damage", "increased holy damage <font color="+color+">[1-3]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("increased poison damage", "increased poison damage <font color="+color+">[1-3]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("increased elemental damage", "increased elemental damage <font color="+color+">[1-3]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("increased spell damage", "increased spell damage <font color="+color+">[1-3]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("increased physical damage", "increased physical damage <font color="+color+">[1-3]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("cast speed", "cast speed <font color="+color+">[1-8.75]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("attack speed", "cast speed <font color="+color+">[1-8.75]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("sprint chance", "sprint chance <font color="+color+">[1-20]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("chance to block attacks", "chance to block attacks <font color="+color+">[1-10]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("chance to block spells", "chance to block spells <font color="+color+">[1-10]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("chance to dodge attacks", "chance to dodge attacks <font color="+color+">[1-10]</font>"));
                    text = $(this).html();
                    $(this).html(text.replaceAll("chance to dodge spells", "chance to dodge spells <font color="+color+">[1-10]</font>"));
                    if(obj.type === "Breastplate") {
                        text = $(this).html();
                        $(this).html(text.replace("armor", "armor <font color="+color+">[160-400]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                    } else if(obj.type === "Helmet" ||obj.type === "Legplates") {
                        text = $(this).html();
                        $(this).html(text.replace("armor", "armor <font color="+color+">[80-200]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                    } else if(obj.type === "Gauntlets" || obj.type === "Steel Boots") {
                        text = $(this).html();
                        $(this).html(text.replace("armor", "armor <font color="+color+">[40-100]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                    } else if(obj.type === "Leather Armor" || obj.type === "Scalemail") {
                        text = $(this).html();
                        $(this).html(text.replace("armor", "armor <font color="+color+">[96-240]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                    } else if(obj.type === "Leather Cap" ||obj.type === "Facemask" || obj.type === "Leather Pants" || obj.type === "Scale Leggings") {
                        text = $(this).html();
                        $(this).html(text.replace("armor", "armor <font color="+color+">[48-120]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                    } else if(obj.type === "Leather Gloves" || obj.type === "Scale Gloves" || obj.type === "Leather Boots" || obj.type === "Scale Boots") {
                        text = $(this).html();
                        $(this).html(text.replace("armor", "armor <font color="+color+">[24-60]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                    } else if(obj.type === "Robe") {
                        text = $(this).html();
                        $(this).html(text.replace("armor", "armor <font color="+color+">[56-140]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                    } else if(obj.type === "Cowl" ||obj.type === "Pants") {
                        text = $(this).html();
                        $(this).html(text.replace("armor", "armor <font color="+color+">[28-70]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                    } else if(obj.type === "Gloves" || obj.type === "Boots") {
                        text = $(this).html();
                        $(this).html(text.replace("armor", "armor <font color="+color+">[14-35]<br>+"+(obj.quality+1)+" non-augment stat</font>"));
                    }
                });
            }
        }
    } else if (obj.type === "Reward Card") {
        $('.uiTooltipItem .tooltip .name').each(function() {
            var setToTrade = (~~(obj.quantity/obj.setSize));
            var text = $(this).html();
            if (setToTrade == 0) {$(this).html(text.replace(text, text+"<font color='red'>"+setToTrade+" set to trade</font>"));}
            else {$(this).html(text.replace(text, text+"<font color='#ff6942'>"+setToTrade+" set to trade</font>"));}
        })
    }
}

// RUNE VALUE + TOOLTIPS
let spells = {
    'magic missile': {
        statType: 'int',
        random: {
            damage: [4, 15]
        }
    },
    'ice spear': {
        statType: 'int',
        random: {
            damage: [2, 8],
            i_freezeDuration: [6, 10]
        }
    },
    fireblast: {
        statType: 'int',
        random: {
            damage: [2, 5],
            i_radius: [1, 2.2],
            i_pushback: [2, 5]
        }
    },
    smite: {
        statType: 'int',
        random: {
            damage: [4, 14],
            i_stunDuration: [6, 10]
        }
    },
    consecrate: {
        statType: 'int',
        random: {
            healing: [0.3, 0.5],
            i_duration: [7, 13]
        }
    },

    slash: {
        statType: 'str',
        random: {
            damage: [6, 23]
        }
    },
    charge: {
        statType: 'str',
        random: {
            damage: [2, 8],
            i_stunDuration: [6, 10]
        }
    },
    flurry: {
        statType: 'none',
        random: {
            i_duration: [4, 9]
        }
    },
    smokebomb: {
        statType: 'dex',
        random: {
            damage: [0.25, 1.45],
            i_radius: [1, 3],
            i_duration: [7, 13]
        }
    },
    'crystal spikes': {
        statType: ['dex', 'int'],
        random: {
            damage: [3, 14],
            i_delay: [1, 4]
        },
        negativeStats: [
            'i_delay'
        ]
    },
    innervation: {
        statType: ['none'],
        random: {
            regenPercentage: [0.3, 1.5]
        }
    },
    tranquility: {
        statType: ['none'],
        random: {
            regenPercentage: [4, 10]
        }
    },
    swiftness: {
        statType: ['none'],
        random: {
            chance: [5, 10]
        }
    },

    'harvest life': {
        statType: ['str', 'int'],
        random: {
            damage: [4, 14],
            healPercent: [10, 30]
        }
    },

    'summon skeleton': {
        statType: ['str', 'int'],
        random: {
            damagePercent: [20, 76],
            hpPercent: [40, 60]
        }
    },

     'blood barrier': {
         statType: ['str', 'int'],
         random: {
             i_drainPercentage: [10, 50],
             shieldMultiplier: [2, 5],
             i_frenzyDuration: [5, 15]
         }
    }
};

window.expandSpellTooltip = function(obj){

    if(obj.ability === true){
        var name = obj.spell.name.toLowerCase();
        var txt;
        if(Array.isArray(spells[name].statType) == true){
            txt = spells[name].statType.map(x => "<font color='orange'>"+x+"</font>");
        } else{
            txt = "<font color='orange'>"+spells[name].statType+"</font>";
        }
        var newText = "Benefits from stats: ["+txt+"]<br>";
        Object.keys(obj.spell.values).forEach(function(key) {
            var minmax;
            if(key in spells[name].random){
                minmax = spells[name].random[key];
            } else{
                minmax = spells[name].random["i_"+key];
            }
            var maxrange = minmax[1]-minmax[0];
            var currange = obj.spell.values[key]-minmax[0];
            var startcolor = {r:255,g:0,b:0};
            var endcolor = {r:0,g:255,b:0};
            var r = startcolor.r + (endcolor.r-startcolor.r)*currange/maxrange;
            var g = startcolor.g + (endcolor.g-startcolor.g)*currange/maxrange;
            var b = startcolor.b + (endcolor.b-startcolor.b)*currange/maxrange;
            var mycolor = "rgb("+r+","+g+","+b+")";
            newText += key + ": <font style='color:"+mycolor+";'>" + obj.spell.values[key] + "</font>  [<font style='color:rgb("+startcolor.r+","+startcolor.g+","+startcolor.b+");'>"+minmax[0] +"</font>-<font style='color:rgb("+endcolor.r+","+endcolor.g+","+endcolor.b+");'>"+minmax[1]+"</font>]<br>";
        });
        $(".uiTooltipItem .tooltip .damage").eq(0).html(newText);
    }
}

// MAP + QUICKREPLY LOGIN + TIMER + AFFICHAGE
Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
}
window.thingsToDraw = {};
window.thingsToDrawOld = {};
var fun = function(){
    if (MapSTATUS == "ON") {window.drawThings();}
}
var userData = localStorage.getObject('islewardMinimap')
if(userData !== undefined && userData !== null){
    window.mapScale = userData.mapScale;
    window.xOffset = userData.xOffset;
    window.yOffset = userData.yOffset;
    window.opacity = userData.opacity;
} else{
    window.mapScale = 3;
    window.xOffset=0;
    window.yOffset=0;
    window.opacity=1;
}
window.drawMapPixel = function(i,j){
    var ctx = window.uiMap[0].getContext('2d');
    if(window.map[i][j] == 0){
        ctx.fillStyle = "#2c2136";
    } else{
        if (window.collisionMap[i][j] == 0) {
            ctx.fillStyle = "#757b92";
        } else {
            ctx.fillStyle = "#000000";
        }
    }
    ctx.fillRect(i,j, 1, 1);
}

window.toggleMap = function() {
    if (!window.collisionMap) {
        return;
    }
    if (window.uiMap.css("display") == "block") {
        window.uiContainer.css('background-color', 'transparent');
        window.uiContainer.removeClass('blocking');
        window.uiMap.css("display", "none");
        for(var i=jQuery(".minimapName").length-1;i>=0;--i){
            jQuery(".minimapName").eq(i).css("display", "none");
        }
        return;
    } else {
        window.uiMap.css("display", "block");
        window.drawMap();
        window.drawThings();
        for(i=jQuery(".minimapName").length-1;i>=0;--i){
            jQuery(".minimapName").eq(i).css("display", "block");
        }
    }
};
window.drawMap = function() {
    if (!window.collisionMap || window.uiMap.css("display") != "block") {
        return;
    }

    window.uiMap[0].width = window.collisionMap.length * window.mapScale;
    window.uiMap[0].height = window.collisionMap[0].length * window.mapScale;

    var ctx = window.uiMap[0].getContext('2d');
    ctx.scale(window.mapScale, window.mapScale);
    ctx.clearRect(0, 0, window.uiMap[0].width, window.uiMap[0].height);

    for (var i = 0; i < window.collisionMap.length; i++) {
        for (var j = 0; j < window.collisionMap[i].length; j++) {
            window.drawMapPixel(i,j);
        }
    }
    window.uiMap.css({
        'position': "absolute",
        'left': window.xOffset,
        'top': (window.uiContainer[0].clientHeight / 2) - (window.uiMap[0].height / 2)+window.yOffset,
        'background-color': "#3c3f4c",
        'border': "4px solid #505360",
    });
};
window.drawThings = function() {
    if (window.uiMap.css("display") != "block") {
        return;
    }
    var ctx = window.uiMap[0].getContext('2d');
    Object.keys(window.thingsToDrawOld).forEach(function(key) {
        for(var i=-2;i<=2;++i){
            for(var j=-2;j<=2;++j){
                window.drawMapPixel(window.thingsToDrawOld[key].x+i,window.thingsToDrawOld[key].y+j);
            }
        }
    });

    Object.keys(window.thingsToDraw).forEach(function(key) {
        thingsToDrawOld[key] = {};
        Object.keys(window.thingsToDraw[key]).forEach(function(key2) {
            thingsToDrawOld[key][key2] = thingsToDraw[key][key2];
        });
        ctx.fillStyle = window.thingsToDraw[key].color;
        if(window.thingsToDraw[key].name == player.name){
            ctx.fillStyle = "#ffff00";
        }
        for(var i=-1;i<=1;++i){
            for(var j=-1;j<=1;++j){
                ctx.fillRect(window.thingsToDraw[key].x+i,window.thingsToDraw[key].y+j, 1, 1);
            }
        }
        if(thingsToDraw[key].name != "sun_carp" && thingsToDraw[key].name.indexOf("Gilde Gift") == -1){
            var top = (window.uiContainer[0].clientHeight / 2) - (window.uiMap[0].height / 2)+ window.yOffset+window.thingsToDraw[key].y*window.mapScale;
            var left = window.xOffset+window.thingsToDraw[key].x*window.mapScale;
            top -= jQuery(".minimapName."+window.thingsToDraw[key].name)[0].clientHeight;
            left -= jQuery(".minimapName."+window.thingsToDraw[key].name)[0].clientWidth/2;
            jQuery(".minimapName."+window.thingsToDraw[key].name).eq(0).css("top",top);
            jQuery(".minimapName."+window.thingsToDraw[key].name).eq(0).css("left",left);
            if(window.localStorage.iwd_opt_shownames !== undefined){
                if(window.localStorage.iwd_opt_shownames != "true"){
                    jQuery(".minimapName."+window.thingsToDraw[key].name).eq(0).css("display","none");
                } else{
                    jQuery(".minimapName."+window.thingsToDraw[key].name).eq(0).css("display","block");
                }
            }
        }
    });
}

// MAP
addons.register({
    init: function(events) {
        window.uiContainer = jQuery('.ui-container');
        window.uiMap = jQuery('<canvas class="addon-uiMap"></canvas>').appendTo(window.uiContainer);
        window.uiMap.css("display", "none");
        window.uiMap.css("pointer-events","none");
        window.uiMap.css("opacity","1.0");
        events.on('onGetMap', this.onGetMap.bind(this));
        events.on('onKeyDown', this.onKeyDown.bind(this));
        events.on('onGetObject', this.onGetObject.bind(this));
        events.on('onRezone', this.onRezone.bind(this));
    },
    onGetMap: function(mapData) {
        if (mapData.collisionMap) {
            window.collisionMap = mapData.collisionMap;
            window.map = mapData.map;
        }
    },

    onRezone: function(data) {
        window.thingsToDraw = {};
        if (window.uiMap.css("display") == "block") {
            window.drawMap();
            window.drawThings();
        }
        for(var i=jQuery(".minimapName").length-1;i>=0;--i){
            jQuery(".minimapName").eq(i).remove();
        }
    },
    onKeyDown: function(key) {
        if (MapSTATUS == "ON") {
            if (!key) {
                return;
            } //else if (key == "n") {
            //window.toggleMap();
            /*}*/ else if (key == "13") {
                if (window.mapScale > 1) {
                    window.mapScale-=0.1;
                    window.drawMap();
                }
            } else if (key == "11") {
                if (window.mapScale < 11) {
                    window.mapScale+=0.1;
                    window.drawMap();
                }
            } else if (key == "5") {
                if(window.opacity >= 0.1){
                    window.opacity-=0.1;
                    window.uiMap.css('opacity',window.opacity);
                }
            } else if (key == "6") {
                if(window.opacity <= 0.9){
                    window.opacity+=0.1;
                    window.uiMap.css('opacity',window.opacity);
                }
            } else if (key == "7") {
                window.yOffset-=30;
                window.uiMap.css('top',(window.uiContainer[0].clientHeight / 2) - (window.uiMap[0].height / 2)+window.yOffset);
            }
            else if (key == "8") {
                window.yOffset+=30;
                window.uiMap.css('top',(window.uiContainer[0].clientHeight / 2) - (window.uiMap[0].height / 2)+window.yOffset);
            }
            else if (key == "9") {
                window.xOffset-=30;
                window.uiMap.css('left',window.xOffset);
            }
            else if (key == "0") {
                window.xOffset+=30;
                window.uiMap.css('left',window.xOffset);
            }
            localStorage.setObject('islewardMinimap', {xOffset:window.xOffset, yOffset:window.yOffset,mapScale:window.mapScale,opacity:window.opacity});
        }
    },
    onGetObject: function(obj) {
        if(obj.name !== undefined){
            var safeName = obj.name.split(' ').join('_');
            if((obj.account !== undefined) || (safeName.toLowerCase() === "m'ogresh" || safeName.toLowerCase() === "radulos" || safeName.toLowerCase() === "sun_carp" || (obj.isRare != undefined && obj.isRare == true)) || safeName.toLowerCase().indexOf("pumpkin") != -1 ){
                if(safeName.toLowerCase() === "m'ogresh"){
                    window.thingsToDraw[obj.id] = {x: obj.x, y: obj.y, color:"#00ff00", name:"mogresh", textColor:"rgb(0,255,0)"};
                } else if(safeName.toLowerCase() === "radulos"){
                    window.thingsToDraw[obj.id] = {x: obj.x, y: obj.y, color:"#00ff00", name:"radulos", textColor:"rgb(0,255,0)"};
                } else if(safeName.toLowerCase() === "sun_carp"){
                    window.thingsToDraw[obj.id] = {x: obj.x, y: obj.y, color:"#00ffff", name:"sun_carp", textColor:"rgb(0,100,255)"};
                } else if (safeName.toLowerCase().indexOf("pumpkin") != -1){
                    window.thingsToDraw[obj.id] = {x: obj.x, y: obj.y, color:"#ffffff", name:"pumpkin", textColor:"rgb(0,100,255)"};
                }else{
                    if(obj.isRare != undefined && obj.isRare == true){
                        if(jQuery(".minimapName."+safeName)[0] != undefined){
                            var newName = safeName+(~~(Math.random()*99));
                            window.thingsToDraw[obj.id] = {x: obj.x, y: obj.y, color: "#ff00ff", name:newName , textColor:"rgb(0,255,0)"};
                        } else{
                            window.thingsToDraw[obj.id] = {x: obj.x, y: obj.y, color: "#ff00ff", name:safeName , textColor:"rgb(0,255,0)"};
                        }
                    } else{
                        window.thingsToDraw[obj.id] = {x: obj.x, y: obj.y, color: "#ff0000", name:safeName , textColor:"rgb(0,255,0)"};
                    }
                }
                if(window.thingsToDraw[obj.id].name != "sun_carp" && window.thingsToDraw[obj.id].name.indexOf("pumpkin") == -1){
                    var el = jQuery('<div class="minimapName '+window.thingsToDraw[obj.id].name+'"></div>').appendTo('.ui-container');
                    el.css('color',window.thingsToDraw[obj.id].textColor);
                    el.css('position','absolute');
                    el.text(window.thingsToDraw[obj.id].name);
                    el.css('display',window.uiMap.css("display"));
                }
            }
        } else{
            if(obj.id in window.thingsToDraw){
                if(obj.x !== undefined && obj.y !== undefined){
                    window.thingsToDraw[obj.id].x = obj.x;
                    window.thingsToDraw[obj.id].y = obj.y;
                }

                if(obj.destroyed !== undefined && obj.destroyed == true){
                    jQuery(".minimapName."+window.thingsToDraw[obj.id].name).remove();
                    delete window.thingsToDraw[obj.id];
                }
            }
        }
    }
});
setInterval(fun, 2000);

addons.register({
    init: function(events) {
        events.on('onGetMessages', this.onGetMessages.bind(this));
        events.on('onGetObject', this.onGetObject.bind(this));
    },

    onGetMessages: function(msg) {
        if(msg.messages && msg.messages[0] != undefined && msg.messages[0].type != undefined && msg.messages[0].type == "chat" && msg.messages[0].message != undefined){
            var myReg =   /\((\b[a-zA-Z]*)(\[\d{1,2}\])? to you\): \b.*/g;
            var matched = myReg.exec(msg.messages[0].message);
            if(matched != undefined && matched.length >= 2){
                var audioElement = document.createElement("audio");
                audioElement.type = "audio/wav";
                audioElement.src = "http://www.wavlist.com/soundfx/027/drum_stick.wav";
                audioElement.play();
                window.lastReply = matched[1];
            }
        }
    },

    onGetObject: function(obj) {
        if(TimerSTATUS == "ON") {

            if(obj.name === "m'ogresh"){
                var audioElement = document.createElement("audio");
                audioElement.type = "audio/wav";
                audioElement.src = "http://www.wavlist.com/soundfx/027/beat_jug.wav";
                audioElement.play();

                window.bossID = obj.id;
                if(typeof window.lastRespawned === "undefined" && typeof window.lastKilled !== "undefined"){
                    window.lastRespawned = new Date();
                }
            }

            if (typeof window.bossID != "undefined" && obj.id == window.bossID && obj.destroyed){
                if(typeof window.lastKilled === "undefined" && typeof window.lastRespawned === "undefined"){
                    window.lastKilled = new Date();
                }
                window.respawnTime = 141;
            }

            if(obj.name === "Stinktooth"){
                audioElement = document.createElement("audio");
                audioElement.type = "audio/wav";
                audioElement.src = "http://www.wavlist.com/soundfx/027/beat_jug.wav";
                audioElement.play();

                window.bossID1 = obj.id;
                if(typeof window.lastRespawned === "undefined" && typeof window.lastKilled !== "undefined"){
                    window.lastRespawned = new Date();
                }
            }
            if (typeof window.bossID1 != "undefined" && obj.id == window.bossID1 && obj.destroyed){
                if(typeof window.lastKilled === "undefined" && typeof window.lastRespawned === "undefined"){
                    window.lastKilled = new Date();
                }
                window.respawnTime1 = 60;
            }

            if(obj.name === "Steelclaw"){

                audioElement = document.createElement("audio");
                audioElement.type = "audio/wav";
                audioElement.src = "http://www.wavlist.com/soundfx/027/drum_stick.wav";
                audioElement.play();

                window.bossID2 = obj.id;
                if(typeof window.lastRespawned === "undefined" && typeof window.lastKilled !== "undefined"){
                    window.lastRespawned = new Date();
                }
            }
            if (typeof window.bossID2 != "undefined" && obj.id == window.bossID2 && obj.destroyed){
                if(typeof window.lastKilled === "undefined" && typeof window.lastRespawned === "undefined"){
                    window.lastKilled = new Date();
                }
                window.respawnTime1 = 60;
            }

            if(obj.name === "Radulos"){
                audioElement = document.createElement("audio");
                audioElement.type = "audio/wav";
                audioElement.src = "http://www.wavlist.com/soundfx/027/beat_jug.wav";
                audioElement.play();

                window.bossID3 = obj.id;
                if(typeof window.lastRespawned === "undefined" && typeof window.lastKilled !== "undefined"){
                    window.lastRespawned = new Date();
                }
            }
            if (typeof window.bossID3 != "undefined" && obj.id == window.bossID3 && obj.destroyed){
                if(typeof window.lastKilled === "undefined" && typeof window.lastRespawned === "undefined"){
                    window.lastKilled = new Date();
                }
                window.respawnTime2 = 600;
            }
        }
    }
});

// AFFICHE TIMER
var repeatEverySec = function(){
    if(typeof window.respawnTime === "undefined"){
        window.respawnTime = 0;
    }
    if(typeof window.respawnTime1 === "undefined"){
        window.respawnTime1 = 0;
    }
    if(typeof window.respawnTime2 === "undefined"){
        window.respawnTime2 = 0;
    }

    if(window.respawnTime > 0){
        window.respawnTime--;
        if(window.respawnTime == 14 && TimerSTATUS == "ON"){
            var audioElement = document.createElement("audio");
            audioElement.type = "audio/wav";
            audioElement.src = "http://www.wavlist.com/soundfx/002/cat-meow3.wav";
            audioElement.play();
        }
    }

    if(window.respawnTime1 > 0){
        window.respawnTime1--;
        if(window.respawnTime1 == 4 && TimerSTATUS == "ON"){
            audioElement = document.createElement("audio");
            audioElement.type = "audio/wav";
            audioElement.src = "http://www.wavlist.com/soundfx/020/clock-tick1.wav";
            audioElement.play();
        }
    }

    if(window.respawnTime2 > 0){
        window.respawnTime2--;
        if(window.respawnTime2== 10 && TimerSTATUS == "ON"){
            audioElement = document.createElement("audio");
            audioElement.type = "audio/wav";
            audioElement.src = "http://www.wavlist.com/soundfx/014/cricket-3.wav";
            audioElement.play();
        }
    }

    var toHHMMSS = (secs) => {
        var sec_num = parseInt(secs, 10);
        var hours = Math.floor(sec_num / 3600) % 24;
        var minutes = Math.floor(sec_num / 60) % 60;
        var seconds = sec_num % 60;
        return [hours,minutes,seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v,i) => v !== "00" || i > 0)
            .join(":")
    }
    if(MenuSTATUS == "OFF") {
        if(window.respawnTime1 != 0 && TimerSTATUS == "ON"){
            document.getElementById('DisplayMenu1').textContent = "Stinktooth respawns in "+ toHHMMSS(window.respawnTime1);
        }
        if(window.respawnTime2 != 0 && TimerSTATUS == "ON"){
            document.getElementById('DisplayMenu2').textContent = "Radulos respawns in "+ toHHMMSS(window.respawnTime2);
        }
        if(window.respawnTime != 0 && TimerSTATUS == "ON"){
            document.getElementById('DisplayMenu').textContent = "M'ogresh respawns in "+ toHHMMSS(window.respawnTime);
        }

        if(window.respawnTime1 == 0){
            document.getElementById('DisplayMenu1').textContent = "";
        }
        if(window.respawnTime2 == 0){
            document.getElementById('DisplayMenu2').textContent = "";
        }
        if(window.respawnTime == 0){
            document.getElementById('DisplayMenu').textContent = "";
        }
    }
};
setInterval(repeatEverySec, 1000);

// GET REPLY
var funy = function(){
    if(jQuery(".el.textbox.message")[0] != undefined && jQuery(".el.textbox.message").val().substring(0, 2) == "/r" && window.lastReply != undefined){
        jQuery(".el.textbox.message").val(jQuery(".el.textbox.message").val().replace("/r", "@"+window.lastReply+" "));
    }
}
setInterval(funy,100);
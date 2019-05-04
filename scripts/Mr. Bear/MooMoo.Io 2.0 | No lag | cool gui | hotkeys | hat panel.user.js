// ==UserScript==
// @name         MooMoo.Io 2.0 | No lag | cool gui | hotkeys | hat panel 
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://*moomoo.io/*
// @grant           GM_addStyle
// @require         https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @require         https://cdn.jsdelivr.net/npm/vue/dist/vue.js
// @require         https://greasyfork.org/scripts/368273-msgpack/code/msgpack.js?version=598723
// @require         https://greasyfork.org/scripts/370785-eventemitter/code/EventEmitter.js?version=617110
// @require         https://greasyfork.org/scripts/372832-moomoo-api/code/moomoo-api.js?version=633816
// ==/UserScript==

$("#rightCardHolder").append("<div class='menuCard' id='guideCard'><div class='menuHeader'>Welcome to moomoo.io 2.0<br></div><div class='menuText'> <br> <br> this is no laggy version of moomoo<br> <br> to of/off press k<br> <br> enjoy <br> <br>maked by<br>youngpooreagle<br> <br> YoungPoorEagle <br> <br> Young poor dude <br> <br> Legendsneverdie  </div></div>");
$("#gameCanvas").css('cursor', 'url(http://cur.cursors-4u.net/user/use-1/use153.cur), default');
document.getElementById('gameName').innerHTML = '★MooMoo.io★';
$("#mapDisplay").css("background", "url('http://wormax.org/chrome3kafa/moomooio-background.png')");


	$('#mapDisplay').css({
		'top': conf.map.top + 'px',
		'left': conf.map.left + 'px',
		'width': conf.map.w + 'px',
		'height': conf.map.h + 'px'
	});
	$('#scoreDisplay').css({
		'bottom': '20px',
		'left': '20px'
	});
    $('#youtuberOf').remove('');
    $('#youtubeFollow').remove();
    $('#followText').remove();
    $('#downloadButtonContainer').remove();
    $('#adCard').remove();
    $('#linksContainer2').remove();
    $('#twitterFollow').remove();
    $('#mobileDownloadButtonContainer').remove();
    $('#altServer').remove();
    $('#errorNotification').remove();
document.getElementById("storeHolder").style = "height: 1500px; width: 450px;";




(function () {
  //#region hats
  var hats = [{
    id: 45,
    name: "Shame!",
    dontSell: !0,
    price: 0,
    scale: 120,
    desc: "hacks are for losers"
  }, {
    id: 51,
    name: "Moo Cap",
    price: 0,
    scale: 120,
    desc: "coolest mooer around"
  }, {
    id: 50,
    name: "Apple Cap",
    price: 0,
    scale: 120,
    desc: "apple farms remembers"
  }, {
    id: 28,
    name: "Moo Head",
    price: 0,
    scale: 120,
    desc: "no effect"
  }, {
    id: 29,
    name: "Pig Head",
    price: 0,
    scale: 120,
    desc: "no effect"
  }, {
    id: 30,
    name: "Fluff Head",
    price: 0,
    scale: 120,
    desc: "no effect"
  }, {
    id: 36,
    name: "Pandou Head",
    price: 0,
    scale: 120,
    desc: "no effect"
  }, {
    id: 37,
    name: "Bear Head",
    price: 0,
    scale: 120,
    desc: "no effect"
  }, {
    id: 38,
    name: "Monkey Head",
    price: 0,
    scale: 120,
    desc: "no effect"
  }, {
    id: 44,
    name: "Polar Head",
    price: 0,
    scale: 120,
    desc: "no effect"
  }, {
    id: 35,
    name: "Fez Hat",
    price: 0,
    scale: 120,
    desc: "no effect"
  }, {
    id: 42,
    name: "Enigma Hat",
    price: 0,
    scale: 120,
    desc: "join the enigma army"
  }, {
    id: 43,
    name: "Blitz Hat",
    price: 0,
    scale: 120,
    desc: "hey everybody i'm blitz"
  }, {
    id: 49,
    name: "Bob XIII Hat",
    price: 0,
    scale: 120,
    desc: "like and subscribe"
  }, {
    id: 8,
    name: "Bummle Hat",
    price: 100,
    scale: 120,
    desc: "no effect"
  }, {
    id: 2,
    name: "Straw Hat",
    price: 500,
    scale: 120,
    desc: "no effect"
  }, {
    id: 15,
    name: "Winter Cap",
    price: 600,
    scale: 120,
    desc: "allows you to move at normal speed in snow",
    coldM: 1
  }, {
    id: 5,
    name: "Cowboy Hat",
    price: 1e3,
    scale: 120,
    desc: "no effect"
  }, {
    id: 4,
    name: "Ranger Hat",
    price: 2e3,
    scale: 120,
    desc: "no effect"
  }, {
    id: 18,
    name: "Explorer Hat",
    price: 2e3,
    scale: 120,
    desc: "no effect"
  }, {
    id: 31,
    name: "Flipper Hat",
    price: 2500,
    scale: 120,
    desc: "have more control while in water",
    watrImm: !0
  }, {
    id: 1,
    name: "Marksman Cap",
    price: 3e3,
    scale: 120,
    desc: "increases arrow speed and range",
    aMlt: 1.3
  }, {
    id: 10,
    name: "Bush Gear",
    price: 3e3,
    scale: 160,
    desc: "allows you to disguise yourself as a bush"
  }, {
    id: 48,
    name: "Halo",
    price: 3e3,
    scale: 120,
    desc: "no effect"
  }, {
    id: 6,
    name: "Soldier Helmet",
    price: 4e3,
    scale: 120,
    desc: "reduces damage taken but slows movement",
    spdMult: .94,
    dmgMult: .75
  }, {
    id: 23,
    name: "Anti Venom Gear",
    price: 4e3,
    scale: 120,
    desc: "makes you immune to poison",
    poisonRes: 1
  }, {
    id: 13,
    name: "Medic Gear",
    price: 5e3,
    scale: 110,
    desc: "slowly regenerates health over time",
    healthRegen: 3
  }, {
    id: 9,
    name: "Miners Helmet",
    price: 5e3,
    scale: 120,
    desc: "earn 1 extra gold per resource",
    extraGold: 1
  }, {
    id: 32,
    name: "Musketeer Hat",
    price: 5e3,
    scale: 120,
    desc: "reduces cost of projectiles",
    projCost: .5
  }, {
    id: 7,
    name: "Bull Helmet",
    price: 6e3,
    scale: 120,
    desc: "increases damage done but drains health",
    healthRegen: -5,
    dmgMultO: 1.5,
    spdMult: .96
  }, {
    id: 22,
    name: "Emp Helmet",
    price: 6e3,
    scale: 120,
    desc: "turrets won't attack but you move slower",
    antiTurret: 1,
    spdMult: .7
  }, {
    id: 12,
    name: "Booster Hat",
    price: 6e3,
    scale: 120,
    desc: "increases your movement speed",
    spdMult: 1.16
  }, {
    id: 26,
    name: "Barbarian Armor",
    price: 8e3,
    scale: 120,
    desc: "knocks back enemies that attack you",
    dmgK: .6
  }, {
    id: 21,
    name: "Plague Mask",
    price: 1e4,
    scale: 120,
    desc: "melee attacks deal poison damage",
    poisonDmg: 5,
    poisonTime: 6
  }, {
    id: 46,
    name: "Bull Mask",
    price: 1e4,
    scale: 120,
    desc: "bulls won't target you unless you attack them",
    bullRepel: 1
  }, {
    id: 14,
    name: "Windmill Hat",
    topSprite: !0,
    price: 1e4,
    scale: 120,
    desc: "generates points while worn",
    pps: 1.5
  }, {
    id: 11,
    name: "Spike Gear",
    topSprite: !0,
    price: 1e4,
    scale: 120,
    desc: "deal damage to players that damage you",
    dmg: .45
  }, {
    id: 53,
    name: "Turret Gear",
    topSprite: !0,
    price: 1e4,
    scale: 120,
    desc: "you become a walking turret",
    turret: {
      proj: 1,
      range: 700,
      rate: 2500
    },
    spdMult: .5
  }, {
    id: 20,
    name: "Samurai Armor",
    price: 12e3,
    scale: 120,
    desc: "increased attack speed and fire rate",
    atkSpd: .78
  }, {
    id: 16,
    name: "Bushido Armor",
    price: 12e3,
    scale: 120,
    desc: "restores health when you deal damage",
    healD: .4
  }, {
    id: 27,
    name: "Scavenger Gear",
    price: 15e3,
    scale: 120,
    desc: "earn double points for each kill",
    kScrM: 2
  }, {
    id: 40,
    name: "Tank Gear",
    price: 15e3,
    scale: 120,
    desc: "increased damage to buildings but slower movement",
    spdMult: .3,
    bDmg: 3.3
  }, {
    id: 52,
    name: "Thief Gear",
    price: 15e3,
    scale: 120,
    desc: "steal half of a players gold when you kill them",
    goldSteal: .5
  }];
  var accessories = [{
    id: 12,
    name: "Snowball",
    price: 1e3,
    scale: 105,
    xOff: 18,
    desc: "no effect"
  }, {
    id: 9,
    name: "Tree Cape",
    price: 1e3,
    scale: 90,
    desc: "no effect"
  }, {
    id: 10,
    name: "Stone Cape",
    price: 1e3,
    scale: 90,
    desc: "no effect"
  }, {
    id: 3,
    name: "Cookie Cape",
    price: 1500,
    scale: 90,
    desc: "no effect"
  }, {
    id: 8,
    name: "Cow Cape",
    price: 2e3,
    scale: 90,
    desc: "no effect"
  }, {
    id: 11,
    name: "Monkey Tail",
    price: 2e3,
    scale: 97,
    xOff: 25,
    desc: "Super speed but reduced damage",
    spdMult: 1.4,
    dmgMultO: .2
  }, {
    id: 17,
    name: "Apple Basket",
    price: 3e3,
    scale: 80,
    xOff: 12,
    desc: "slowly regenerates health over time",
    healthRegen: 1
  }, {
    id: 6,
    name: "Winter Cape",
    price: 3e3,
    scale: 90,
    desc: "no effect"
  }, {
    id: 4,
    name: "Skull Cape",
    price: 4e3,
    scale: 90,
    desc: "no effect"
  }, {
    id: 5,
    name: "Dash Cape",
    price: 5e3,
    scale: 90,
    desc: "no effect"
  }, {
    id: 2,
    name: "Dragon Cape",
    price: 6e3,
    scale: 90,
    desc: "no effect"
  }, {
    id: 1,
    name: "Super Cape",
    price: 8e3,
    scale: 90,
    desc: "no effect"
  }, {
    id: 7,
    name: "Troll Cape",
    price: 8e3,
    scale: 90,
    desc: "no effect"
  }, {
    id: 14,
    name: "Thorns",
    price: 1e4,
    scale: 115,
    xOff: 20,
    desc: "no effect"
  }, {
    id: 15,
    name: "Blockades",
    price: 1e4,
    scale: 95,
    xOff: 15,
    desc: "no effect"
  }, {
    id: 20,
    name: "Devils Tail",
    price: 1e4,
    scale: 95,
    xOff: 20,
    desc: "no effect"
  }, {
    id: 16,
    name: "Sawblade",
    price: 12e3,
    scale: 90,
    spin: !0,
    xOff: 0,
    desc: "deal damage to players that damage you",
    dmg: .15
  }, {
    id: 13,
    name: "Angel Wings",
    price: 15e3,
    scale: 138,
    xOff: 22,
    desc: "slowly regenerates health over time",
    healthRegen: 3
  }, {
    id: 19,
    name: "Shadow Wings",
    price: 15e3,
    scale: 138,
    xOff: 22,
    desc: "increased movement speed",
    spdMult: 1.1
  }, {
    id: 18,
    name: "Blood Wings",
    price: 2e4,
    scale: 178,
    xOff: 26,
    desc: "restores health when you deal damage",
    healD: .2
  }, {
    id: 21,
    name: "Corrupt X Wings",
    price: 2e4,
    scale: 178,
    xOff: 26,
    desc: "deal damage to players that damage you",
    dmg: .25
  }]; //#endregion

  GM_addStyle(".hatpanel { display: none; position: absolute; top: 0; left: 0; z-index: 20; width: 150px; min-height: 80px; border-radius: 5px; background: rgba(0, 0, 0, 0.38); color: white; padding: 7px; } .item-container > .item { display: inline-block; width: 30px; height: 30px; background-repeat: no-repeat; background-size: 100%; cursor: pointer; opacity: 0.4; } .item-container > .item.active { cursor: pointer; opacity: 1; }");
  $('body').append("<div id=\"hatpanel\"> <div class=\"hatpanel\" :style=\"{display: 'block'}\"> <div v-for=\"itemCategory in storeItems\"> <b>{{itemCategory.name}}</b> <div class=\"item-container\"> <div class=\"item\" v-for=\"item in itemCategory.items\" v-if=\"item.price == 0\" :class=\"{active: equipped[itemCategory.type] == item}\" @click=\"useItem(item, itemCategory.type)\" :style=\"getItemStyle(item, itemCategory.type)\"></div> </div> <hr> </div> </div></div>");
  MooMoo.once("__start__", function () {
    var app = new Vue({
      el: '#hatpanel',
      data: {
        storeItems: {
          0: {
            type: 0,
            name: "Hats",
            items: hats
          },
          1: {
            type: 1,
            name: "Accessories",
            items: accessories
          }
        },
        equipped: {
          0: null,
          1: null
        }
      },
      methods: {
        getItemStyle: function getItemStyle(item, type) {
          if (type == 0) {
            return {
              backgroundImage: "url(http://moomoo.io/img/hats/hat_".concat(item.id, ".png)")
            };
          } else {
            return {
              backgroundImage: "url(http://moomoo.io/img/accessories/access_".concat(item.id, ".png)")
            };
          }
        },
        useItem: function useItem(item, type) {
          if (this.equipped[type] == item) {
            MooMoo.actions.equipItem(0, type);
          } else {
            MooMoo.actions.equipItem(item.id, type);
          }
        }
      }
    });
    MooMoo.on("hat", function (d) {
      if (d.actionType == 1) {
        app.equipped[d.itemType] = app.storeItems[d.itemType].items.find(function (item) {
          return item.id == d.itemId;
        });
      } else if (d.actionType == 0) {
        var item = app.storeItems[d.itemType].items.find(function (item) {
          return item.id == d.itemId;
        });

        if (item) {
          item.price = 0;
        }
      }
    });
  });
})();




console.log("MooMoo.io modded UI");

(function(){

addEventListener("click", function(e) { // changes the 'reload' button
	if (e.target.tagName == "A" && e.target.href == "javascript:window.location.href=window.location.href") {
		e.preventDefault();
		location.replace(location.origin);
	}
});

var sI = -1,
	hideAct = false;

function $(e){
	var a = document.querySelectorAll(e);
	if(a.length == 1){
		return a[0];
	} else if(a.length == 0){
		return null;
	} else {
		return a;
	}
	return a;
}

function getCookie(e){
	var c = document.cookie, g;
	c=c.split('; ');
	c.forEach(function(ob){
		var f=ob.split('=');
		if(f[0]==e){
			g=f[1];
			return;
		}
		return;
	}
			 );
	if(g!==undefined){
		return g;
	}else{
		return null;
	}
}

function resetInterval() {
    clearInterval(sI);

	if(hideAct){
		$("#mainMenu").classList.remove("hide");
		hideAct = false;
	}
	sI = setInterval(function(){
		hideActionMenu();
	}, 10e3);
}

function hideActionMenu() {
    hideAct = true;
    $("#mainMenu").classList.add("hide");
}

addEventListener("mousemove", function(){
	resetInterval();
});
addEventListener("keydown", function() {
    resetInterval();
});
document.body.addEventListener("focus", function() {
    resetInterval();
});
addEventListener("blur", function() {
    hideActionMenu();
});

Array.prototype.remove = function(){
	for(let i of this){
		i.remove();
	}
};

Element.prototype.remove = function(){
	this.parentElement.removeChild(this);
};

window.Worker = null;

addEventListener("load", function(){
	[$("#youtuberOf"), $("#adCard"), $("#followText"), $("#youtubeFollow"), $("#twitterFollow"), $(".menuCard[style='width:728px;display:inline-block;margin-top:10px;padding:10px;']")].remove();
	$("#promoImgHolder").innerHTML = "";
	{
		let a = [$("#serverBrowser"), $("#altServer")];
		for (var i = 0; i < a.length; i++) {
			$("#promoImgHolder").appendChild(a[i]);
		}
	}
	{
		let settings = $(".settingRadio"),
			parent = document.createElement("div");

		parent.classList.add("settings", "menuCard");
		parent.addEventListener("click", function(e) {
			if (e.target == this) { // prevent closing if user clicked settings
				this.classList.toggle("show");
			}
		});

		for (let i of settings) {
			parent.appendChild(i);
		}

		$("#menuCardHolder").children[0].appendChild(parent);
	}
	{
		let b = $("#skinColorHolder");
		$("#promoImgHolder").appendChild(b);
		$("#rightCardHolder").remove();
	}
	{
		let a = $("#linksContainer2").children[0];
		document.body.appendChild(a);
		$("#linksContainer2").innerHTML = "";
		$("#linksContainer2").appendChild(a);
		if(getCookie("tampermoneySaveChangelog")){
			document.cookie = 'tampermoneySaveChangelog =; expires=Thu, 01 Jan 1970 00:00:01 GMT;'; // remove old cookie
		}
		if(localStorage.tampermonkeyMoomooChangelogSave){
			if(localStorage.tampermonkeyMoomooChangelogSave == a.innerText){
				a.parentElement.style.opacity = .5;
			} else {
				a.style.fontSize = "5em";
				a.addEventListener("click", function(){
					localStorage.tampermonkeyMoomooChangelogSave = a.innerText;
					a.style.fontSize = "1em";
					a.parentElement.style.opacity = .5;
				});
			}
		} else {
			localStorage.tampermonkeyMoomooChangelogSave = a.innerText;
		}
	}
	{
		// custom css!
		let e = document.createElement("style");
		e.innerHTML = `
.skinColorItem {
    transition: 0.15s;
    opacity: 0.75;
    will-change: border-radius, opacity;
}

.activeSkin {
    opacity: 1;
}


#menuCardHolder div, #gameName {
    opacity: 0.6;
    transition: 0.15s;
}

#menuCardHolder div:hover, #gameName:hover {
    opacity: 0.99;
}

#mainMenu {
    transition: 0.15s;
}

#mainMenu.hide {
    cursor: none;
    opacity: 0;
}

.menuCard {
    margin-top: 8px !important;
}

.settings::before {
    content: "Settings";
    font-size: 24px;
}

.settings .settingRadio {
    margin: 0;
}

.settings {
    padding: 12px 18px;
    cursor: pointer;
}

.settings.show {
    padding: 18px 18px;
}

.settings > div {
    display: none;
}

.settings.show > div {
    display: block;
}
`;
		document.head.appendChild(e);
	}
});

}());
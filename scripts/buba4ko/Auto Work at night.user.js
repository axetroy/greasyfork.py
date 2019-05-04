// ==UserScript==
// @name         Auto Work at night
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.erepublik.com/en/main/messages-inbox
// @grant        none
// ==/UserScript==

var bufferBeforeEat = 1600;

(function() {

    main();


function isTimeToWork()
{
   var totalCapacity = erepublik.citizen.energyToRecover * 2;
   var currentEnergy = erepublik.citizen.energy + erepublik.citizen.energyFromFoodRemaining;

   var result = totalCapacity <= currentEnergy + bufferBeforeEat;
  // alert(totalCapacity - currentEnergy - bufferBeforeEat)
   return result;
}

function isHomePage()
{
    var isHome = $j("#hpTopNews").length == 1;
    return isHome;
}

function gotoHomePage()
{
    location.href = "https://www.erepublik.com/en";
}

function gotoCompanies()
{
    location.href = "https://www.erepublik.com/en/economy/myCompanies" + "?mine=mine-script";
}

var isActivatedTracking = false;
var loadTime = null;
function tryToRedirectHome() {
    if(loadTime == null)    {
        loadTime = new Date();
    }
    var now = new Date();
    var isTooMuch = now.getTime() - loadTime.getTime() > 1*10*1000;
    if(isTooMuch || erepublik.citizen.energy == 0){
        gotoHomePage();
    }
    else{
        if(!isActivatedTracking){
            isActivatedTracking = true;
            setInterval(tryToRedirectHome, 10000);
        }

    }
}

function workNow()
{
    var availableCountToWork = 2;
    var counter = 0;

    // remove all checkboxes
    $j("div.list_group .listing:not(div.disabled) a.owner_work").removeClass("active");

    $j("div.list_group .listing:not(div.disabled) a.owner_work")
        .each(function(idx, item)
              {
       // debugger
                 if(idx >= availableCountToWork)
                     return;
                 //alert(counter);
                 $j(item).click();
                 counter++;
              });

  //  $j("#start_production").click();
}




function main()
{
    var isTime = isTimeToWork();
    var isHome = isHomePage();
debugger
    var isMyCompaniesScreen = window.location.href.includes("erepublik.com/en/economy/myCompanie");
    var isMineLink = window.location.search.includes("mine-script");

    if(isHome && isTime){
        gotoCompanies();
    }
    else if(isMineLink)
    {
        if(isMyCompaniesScreen)
        {
            workNow();
        }

        tryToRedirectHome();
    }
    else
    {
        // todo - try to redirect home
        tryToRedirectHome();
    }

}



})();

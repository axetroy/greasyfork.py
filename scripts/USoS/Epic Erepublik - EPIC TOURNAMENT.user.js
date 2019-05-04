// ==UserScript==
// @name       Epic Erepublik - EPIC TOURNAMENT
// @version    1.05
// @description  Automated epic fighting. USE THIS SCRIPT ONLY WHEN YOU ARE AFK AND IN ONLY 1 WINDOW/TAB WITH EREPUBLIK LAUNCHED, OTHERWISE IT WILL EAT YOUR ENERGY BARS. WHEN NOT NEEDED TURN IT OFF IN GREASEMONKEY ETC
// @include      http://*.erepublik.com/*
// @copyright  MISI
// @namespace https://greasyfork.org/users/6244
// ==/UserScript==

var main_type;
var military_type;
var url;
var hp;
var max_hp;
var rec_hp;
var i;


function main() {
    main_type = location.href.split("/")[4];
    military_type = location.href.split("/")[5];
    hp = globalNS.userInfo.wellness;
    max_hp = reset_health_to_recover;
    rec_hp = parseInt($(".tooltip_health_limit").html());
    rw = document.referrer.split("/")[4];
    
    if (main_type == "military") {
        if (military_type == "campaigns") {
            
////////////////////////
//EPIC TOURNAMENT CODE//
////////////////////////     
            
            if ($("img").hasClass("isEpicBattle")) {
                //epic battle, go all in.
                epic_url = "http://www.erepublik.com" + $(".isEpicBattle").siblings().eq(7).attr("href");
                location.href = epic_url;
                console.log("Epic battle on.");
                
/////////////
//ENDS HERE//
/////////////
                
            } else {
                //let's burn some well to not waste refills
                url = "http://www.erepublik.com" + $(".fight_button").eq(0).attr("href");
                console.log(url);
                if (url == "http://www.erepublik.comundefined")
                {
                    location.href = "http://www.erepublik.com/en/military/campaigns";
                    console.log("something is wrong");
                }
                else if (url != "http://www.erepublik.comundefined")
                {
                    location.href = url;
                }
			}
            
        }
    }
    if (military_type == "battlefield" || military_type == "battlefield-new") {
        //battle page, let's fight
////////////////////////
//EPIC TOURNAMENT CODE//
////////////////////////        
        if ($("#pvp").hasClass("epicBattle")) {
            //epic battle, go all in
            t = setInterval(function() {
                if (globalNS.userInfo.wellness < 50) {
                    //regen energy
                    if ($("#DailyConsumtionTrigger").hasClass("energy")) {
                    //energy bars, ignore
                        location.href = "http://www.erepublik.com/en";
                    } else {
                    //let's eat food
                    	$("#DailyConsumtionTrigger").click();
                    }
                }
                $('#fight_btn').click();
            }, 900);
        } else {
/////////////
//ENDS HERE//
/////////////            
            setTimeout(function() {
                if (SERVER_DATA.points.defender >= 1800 || SERVER_DATA.points.attacker >= 1800) {
                    //battle finished, let's find another one
                    location.href = "http://www.erepublik.com/en/military/campaigns";
                }
                i = 1;
                t = setInterval(function() {
                    if (globalNS.userInfo.wellness < 10) {
                        location.href = "http://www.erepublik.com/en";
                    }
                    $('#fight_btn').click();
                    console.log("hit");
                    i++;
                    if (i == 10) { //beshe 2
                        setTimeout(function() {
                            location.href = "http://www.erepublik.com/en";
                        }, 1200);
                    }
                }, 900);
            }, 1000);
        }
    } 
    else if (main_type == "wars") 
    {
        //join defenders if it is your citizenship country
        if (erepublik.citizen.country == 64 && (jQuery(".reversed:contains(Chile)").length > 0)) //To set your country, change "64" to your country's ID, and the "contains(Chile)" to "contains(COUNTRYNAME)
        {
            var addressValue = $(".reversed").attr("href");
            location.href = addressValue;
        }
        //join resistance by default
        else
        {
            var addressValue = $(".join").attr("href");
            location.href = addressValue;
        }
    } else {
        // we are on main page
        if (reset_health_to_recover - globalNS.userInfo.wellness >= 10 && parseInt($(".tooltip_health_limit").html()) >= 10) {
            if ($("#DailyConsumtionTrigger").hasClass("energy")) {
                //energy bars, ignore
            } else {
                //let's eat food
                $("#DailyConsumtionTrigger").click();
            } 
        }
///////////////////////////////////////////////
//EDIT HERE TO CHANGE HEALTH TO HEALTH LIMIT//
//THIS IS WHEN THE SCRIPT WILL FIGHT TO AVOID//
//WASTING REFILLS. EDIT THE "600" VALUE      //
///////////////////////////////////////////////
        
////////////////////////
//EPIC TOURNAMENT CODE//
////////////////////////
//OLD CODE///////////////////////////////////////////////////////////////////////////////////////////////////////////
//USE AFTER TOURNAMENT///////////////////////////////////////////////////////////////////////////////////////////////        
//        setTimeout(function() {                                                                                  //
//            if (reset_health_to_recover - parseInt($(".tooltip_health_limit").html()) <= 500) { //beshe 200 /600///
//				//let's burn some well to not waste refills//////////////////////////////////////////////////////////        
///////////////////////////////////////////////
 //HERE YOU CAN SET A BATTLE WHERE THE SCRIPT//
//WILL AUTOMATICALLY FIGHT WHEN YOU ARE ABOUT//
//TO WASTE REFILL                            //
//EDIT THE "erepublik bla bla/campaigns" LINE//
///////////////////////////////////////////////
        
                location.href = "http://www.erepublik.com/en/military/campaigns"; //beshe CAMPAIGNS
////////////////////////
//EPIC TOURNAMENT CODE//
////////////////////////
//OLD CODE///////////////////////////////////////////////////////////////////////////////////////////////////////////
//USE AFTER TOURNAMENT///////////////////////////////////////////////////////////////////////////////////////////////        
//    		} else {                                                                                               //
//                //nothing to do, just refresh and relax                                                          //  
//                location.href = "http://www.erepublik.com/en";                                                   //
//            }                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////        
        }, 360000);
    }
}

function wait() {
    if ( unsafeWindow.jQuery === 'undefined') {
        setTimeout(wait, 100);
    } else {
        $ = unsafeWindow.jQuery;
        main();
    }
}
wait();




////////////////////////////////////////////////
//LEGACY CODE. PRESERVED IN CASE IT IS NEEDED///
////////////////////////////////////////////////

/*function wait() {
  if (typeof unsafeWindow.jQuery == 'undefined') {
    setTimeout(wait, 100);
  } else {
    $ = unsafeWindow.jQuery;
    main();
  }
}
wait();


function main() {
	main_type = location.href.split("/")[4];
	military_type = location.href.split("/")[5];
	hp = globalNS.userInfo.wellness;
	max_hp = reset_health_to_recover;
	rec_hp = parseInt($(".tooltip_health_limit").html());
	
	if (main_type == "military") {
		//not main page
		if (military_type == "campaigns") {
			//battles list, check for epic battle
				//no epic battle
				if (reset_health_to_recover - globalNS.userInfo.wellness >= 10) {
					//let's burn some well to not waste refills
					url = "http://www.erepublik.com" + $(".fight_button[href*=military]").eq(0).attr("href");
					location.href = "http://www.erepublik.com/en/wars/show/40092";
				} else {
					//nothing to do, go back to main page
					location.href = "http://www.erepublik.com/en";
				}
		}
     else if (military_type == "battlefield") {
			//battle page, let's fight
			setTimeout(function() {
				if (SERVER_DATA.points.defender >= 1800 || SERVER_DATA.points.attacker >= 1800) {
					//battle finished
					location.href = "http://www.erepublik.com/en";
				}
					//epic battle, go all in
					t = setInterval(function() {
						if (globalNS.userInfo.wellness < 10) {
							//regen energy
							if ($("#DailyConsumtionTrigger").hasClass("energy")) {
								//energy bars, ignore
								location.href = "http://www.erepublik.com/en";
							} else {
								//let's eat food
								$("#DailyConsumtionTrigger").click();
							}
						}
						$('#fight_btn').click();
					}, 3000);
			}, 3000);
		}
	} 
    else if (main_type == "wars") 
        {
            //join resistance by default
        	var addressValue = $(".join").attr("href");
        	location.href = addressValue;
    	} else {
		// we are on main page
		if (reset_health_to_recover - globalNS.userInfo.wellness >= 10 && parseInt($(".tooltip_health_limit").html()) >= 10) {
			if ($("#DailyConsumtionTrigger").hasClass("energy")) {
				//energy bars, ignore
			} else {
				//let's eat food
				$("#DailyConsumtionTrigger").click();
			}
		}
		setTimeout(function() {
			location.href = "http://www.erepublik.com/en/military/campaigns";
		}, 300000);
	}
}*/
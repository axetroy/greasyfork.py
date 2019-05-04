// ==UserScript==
// @name         Kitten Extrapolation
// @namespace    https://greasyfork.org/en/scripts/10234-kitten-extrapolation
// @version      0.6.1
// @description  A script for outputting information about kitten survival (Other features may come later)
// @author       Yuriy
// @match        http://bloodrizer.ru/games/kittens/
// @grant        none
// ==/UserScript==

function initiate_script() {
    var data_out = document.createElement('div');
    data_out.id = 'data_container';
    data_out.style.width = '100%';
    data_out.style.bottom = '0px';
    data_out.style.verticalAlign = 'bottom';
    data_out.innerHTML = '<div style="width: 340px;"> <table id="food_table_season" table-layout: fixed;></table></div></div><div> <p id="food_balance_info"></p> </div>';
    right_col = document.getElementById('rightColumn')
    right_col.style.width = '360px';
    before_child = document.getElementById('clearLog')
    right_col.insertBefore(data_out, before_child);
}

if (!document.getElementById('data_container')) {
  initiate_script();
}

function calculate_food_income_data(weather_ratio_val, seconds) {
    var total = 0;
    var subtotal = 0;
    
    total += gamePage.getEffect("catnip" + "PerTickBase")*5
    total *= 1+weather_ratio_val;
    
    var resMapProduction = gamePage.village.getResProduction();
    subtotal = resMapProduction['catnip']*5 || 0;
    subtotal *= (1 + gamePage.workshop.getEffect('catnip' + "Ratio"))
    
    total += subtotal;
    
    total *= (1 + gamePage.bld.getEffect('catnip' + "Ratio"))
    
    total *= (1 + gamePage.space.getEffect('catnip' + "Ratio"))
    
    total *= (1 + gamePage.religion.getEffect('catnip' + "Ratio"))
    
    var paragonRatio = gamePage.resPool.get("paragon").value * 0.01;
    paragonRatio = gamePage.bld.getHyperbolicEffect(paragonRatio, 2);
    
    total *= 1+paragonRatio
    
    if (gamePage.religion.getRU("solarRevolution").researched){
        total *= 1+(gamePage.religion.getProductionBonus() / 100)
	}
    
    if (gamePage.bld.get("magneto").on > 0){
        var steamworks = gamePage.bld.get("steamworks");
        var magnetoboost = steamworks.on > 0 ? (1+ steamworks.effects["magnetoBoostRatio"] * steamworks.on) : 1;
        total += total * gamePage.bld.getEffect("magnetoRatio") * magnetoboost;
	}
    
    //Reactors
    total *= (1 + gamePage.bld.getEffect("productionRatio"))
    
    total *= seconds;
    
    return total;
}

function calculate_food_consumtion_data(seconds) {
    var resMapConsumption = gamePage.village.getResConsumption();
    var resConsumption = resMapConsumption['catnip'] || 0;
    resConsumption = resConsumption * (1 + gamePage.bld.getEffect('catnip' + "DemandRatio", true));
    //to account for biofual
    resConsumption += gamePage.getEffect('catnip' + "PerTick");
    resConsumption *= 5;
    resConsumption *= seconds;
    
    return resConsumption
}

function calculate_food_data(weather_ratio_val, seconds) {
    var total = calculate_food_income_data(weather_ratio_val, seconds);
    
    var resConsumption = calculate_food_consumtion_data(seconds);
    
    total += resConsumption;
    
    return total
}

function val_to_printable(total) {
    var total_value = '';
    
    if(!(isFinite(total))){
        total_value = total;
    }else if(Math.abs(total)>1000000000000){
        total = total / 1000000000000;
        total = total.toFixed(1);
        total_value += total;
        total_value += ' T';
    }else if(Math.abs(total)>1000000000){
        total = total / 1000000000;
        total = total.toFixed(1);
        total_value += total;
        total_value += ' G';
    }else if(Math.abs(total)>1000000){
        total = total / 1000000;
        total = total.toFixed(1);
        total_value += total;
        total_value += ' M';
    }else if(Math.abs(total)>1000){
        total = total / 1000;
        total = total.toFixed(1);
        total_value += total;
        total_value += ' k';
    }else{
        total = total.toFixed(2);
        total_value += total;
    }
    
    return total_value;
    
}

function generate_food_table(seconds, label) {
    var contents = '';
    //Define the table colomn widths
    contents += '<col width="100">';
    contents += '<col width="60">';
    contents += '<col width="60">';
    contents += '<col width="60">';
    contents += '<col width="60">';
    //The top of the table, describing what it is showing. Leave once cell blank at the start
    contents += '<tr>';
    contents += '<td style="text-align:center">'
    contents += ' '
    contents += '</td>';
    contents += '<td style="text-align:center" colspan="4">'
    contents += label
    contents += '</td>';
    contents += '</tr>';
    //Second level of the top of the table, describing what it is showing. Leave once cell blank at the start
    contents += '<tr>';
    contents += '<td style="text-align:center">'
    contents += ' '
    contents += '</td>';
    contents += '<td style="text-align:center">'
    contents += 'Winter'
    contents += '</td> <td style="text-align:center">'
    contents += 'Spring'
    contents += '</td> <td style="text-align:center">'
    contents += 'Summer'
    contents += '</td> <td style="text-align:center">'
    contents += 'Autumn'
    contents += '</td>';
    contents += '</tr>';
    //Data for a good season
    contents += '<tr>';
    contents += '<td style="text-align:center">'
    contents += 'Good season'
    contents += '</td>';
    contents += '<td style="text-align:center">'
    contents += val_to_printable(calculate_food_data(-0.60, seconds))
    contents += '</td> <td style="text-align:center">'
    contents += val_to_printable(calculate_food_data(0.65, seconds))
    contents += '</td> <td style="text-align:center">'
    contents += val_to_printable(calculate_food_data(0.15, seconds))
    contents += '</td> <td style="text-align:center">'
    contents += val_to_printable(calculate_food_data(0.15, seconds))
    contents += '</td>';
    contents += '</tr>';
    //Data for an average season
    contents += '<tr>';
    contents += '<td style="text-align:center">'
    contents += 'Avg season'
    contents += '</td>';
    contents += '<td style="text-align:center">'
    contents += val_to_printable(calculate_food_data(-0.75, seconds))
    contents += '</td> <td style="text-align:center">'
    contents += val_to_printable(calculate_food_data(0.50, seconds))
    contents += '</td> <td style="text-align:center">'
    contents += val_to_printable(calculate_food_data(0.0, seconds))
    contents += '</td> <td style="text-align:center">'
    contents += val_to_printable(calculate_food_data(0.0, seconds))
    contents += '</td>';
    contents += '</tr>';
    //Data for a bad season
    contents += '<tr>';
    contents += '<td style="text-align:center">'
    contents += 'Bad season'
    contents += '</td>';
    contents += '<td style="text-align:center">'
    contents += val_to_printable(calculate_food_data(-0.90, seconds))
    contents += '</td> <td style="text-align:center">'
    contents += val_to_printable(calculate_food_data(0.35, seconds))
    contents += '</td> <td style="text-align:center">'
    contents += val_to_printable(calculate_food_data(-0.15, seconds))
    contents += '</td> <td style="text-align:center">'
    contents += val_to_printable(calculate_food_data(-0.15, seconds))
    contents += '</td>';
    contents += '</tr>';
    return contents
}

function generate_food_balance_data() {
    var contents = '';
    contents += "Yearly food produced (avg): ";
    contents += val_to_printable(calculate_food_income_data(-0.75, 200)+calculate_food_income_data(0.50, 200)+calculate_food_income_data(0.0, 200)+calculate_food_income_data(0.0, 200))
    contents += "<br>";
    var resConsumption = calculate_food_consumtion_data(800);
    contents += "Yearly food consumed (avg): ";
    contents += val_to_printable(-resConsumption);
    contents += "<br>";
    contents += "Surplus (or deficit): ";
    contents += val_to_printable(calculate_food_income_data(-0.75, 200)+calculate_food_income_data(0.50, 200)+calculate_food_income_data(0.0, 200)+calculate_food_income_data(0.0, 200)+resConsumption);
    contents += "<br>";
    contents += "Surplus/consumed: ";
    surpovcons = (calculate_food_income_data(-0.75, 200)+calculate_food_income_data(0.50, 200)+calculate_food_income_data(0.0, 200)+calculate_food_income_data(0.0, 200)+resConsumption)/(-resConsumption)*100
    if(isFinite(surpovcons) || resConsumption != 0){
        if((calculate_food_income_data(-0.75, 200)+calculate_food_income_data(0.50, 200)+calculate_food_income_data(0.0, 200)+calculate_food_income_data(0.0, 200)+resConsumption)/(-resConsumption)*100 >= 15) {
            contents += '<span style="color: green;">'
        }else if((calculate_food_income_data(-0.75, 200)+calculate_food_income_data(0.50, 200)+calculate_food_income_data(0.0, 200)+calculate_food_income_data(0.0, 200)+resConsumption)/(-resConsumption)*100 <= 5 && (calculate_food_income_data(-0.75, 200)+calculate_food_income_data(0.50, 200)+calculate_food_income_data(0.0, 200)+calculate_food_income_data(0.0, 200)+resConsumption)/(-resConsumption)*100 >= 0) {
            contents += '<span style="color: yellow;">'
        }else if((calculate_food_income_data(-0.75, 200)+calculate_food_income_data(0.50, 200)+calculate_food_income_data(0.0, 200)+calculate_food_income_data(0.0, 200)+resConsumption)/(-resConsumption)*100 <= 5 && (calculate_food_income_data(-0.75, 200)+calculate_food_income_data(0.50, 200)+calculate_food_income_data(0.0, 200)+calculate_food_income_data(0.0, 200)+resConsumption)/(-resConsumption)*100 < 0) {
            contents += '<span style="color: red;">'
        }else{
            contents += '<span">'
        }
        contents += val_to_printable((calculate_food_income_data(-0.75, 200)+calculate_food_income_data(0.50, 200)+calculate_food_income_data(0.0, 200)+calculate_food_income_data(0.0, 200)+resConsumption)/(-resConsumption)*100);
        contents += "%";
        contents += '</span>'
        contents += "<br>";
        //Get the current season
        day = gamePage.calendar.day;
        var season = gamePage.calendar.seasons[gamePage.calendar.season].title;
        weatherMod = gamePage.calendar.getWeatherMod();
        weatherMod = (gamePage.calendar.getCurSeason().modifiers["catnip"] + weatherMod);
        weatherMod -= 1;
        if(season == "Winter")
        {
            contents += "Can I survive the winter? ";
            if(gamePage.resPool.get("catnip").value+((100-day)/100)*calculate_food_data(weatherMod, 200)>0){
                contents += '<span style="color: green;">'
                contents += 'yes';
                contents += '</span>'
                contents += "<br>";
                contents += "A bad year till after next winter? ";
                if(gamePage.resPool.get("catnip").value+((100-day)/100)*calculate_food_data(weatherMod, 200)+calculate_food_data(0.35, 200)+calculate_food_data(-0.15, 200)+calculate_food_data(-0.15, 200)+calculate_food_data(-0.90, 200)>0){
                    contents += '<span style="color: green;">'
                    contents += 'yes';
                    contents += '</span>'
                }else{
                    contents += '<span style="color: red;">'
                    contents += 'no, insufficent catnip.';
                    contents += '</span>'

                }
            }else{
                contents += '<span style="color: red;">'
                contents += 'no, insufficent catnip.';
                contents += '</span>'

            }
        }else if(season == "Autumn")
        {
            contents += "Can I survive a bad winter? ";
            if(gamePage.resPool.get("catnip").value+((100-day)/100)*calculate_food_data(weatherMod, 200)+calculate_food_data(-0.90, 200)>0){
                contents += '<span style="color: green;">'
                contents += 'yes';
                contents += '</span>'
                contents += "<br>";
                contents += "A bad year till after next winter? ";
                if(gamePage.resPool.get("catnip").value+((100-day)/100)*calculate_food_data(weatherMod, 200)+calculate_food_data(-0.15, 200)+calculate_food_data(-0.15, 200)+calculate_food_data(-0.90, 200)>0){
                    contents += '<span style="color: green;">'
                    contents += 'yes';
                    contents += '</span>'
                }else{
                    contents += '<span style="color: red;">'
                    contents += 'no, insufficent catnip.';
                    contents += '</span>'

                }
            }else{
                contents += '<span style="color: red;">'
                contents += 'no, insufficent catnip.';
                contents += '</span>'
            }
        }else if(season == "Summer")
        {
            contents += "Can I survive a bad winter? ";
            if(gamePage.resPool.get("catnip").value+((100-day)/100)*calculate_food_data(weatherMod, 200)+calculate_food_data(0, 200)+calculate_food_data(-0.90, 200)>0){
                contents += '<span style="color: green;">'
                contents += 'yes';
                contents += '</span>'
                contents += "<br>";
                contents += "A bad year till after next winter? ";
                if(gamePage.resPool.get("catnip").value+((100-day)/100)*calculate_food_data(weatherMod, 200)+calculate_food_data(-0.15, 200)+calculate_food_data(-0.90, 200)>0){
                    contents += '<span style="color: green;">'
                    contents += 'yes';
                    contents += '</span>'
                }else{
                    contents += '<span style="color: red;">'
                    contents += 'no, insufficent catnip.';
                    contents += '</span>'

                }
            }else{
                contents += '<span style="color: red;">'
                contents += 'no, insufficent catnip.';
                contents += '</span>'
            }
        }else if(season == "Spring")
        {
            contents += "Can I survive a bad winter? ";
            if(gamePage.resPool.get("catnip").value+((100-day)/100)*calculate_food_data(weatherMod, 200)+calculate_food_data(0, 200)+calculate_food_data(0, 200)+calculate_food_data(-0.90, 200)>0){
                contents += '<span style="color: green;">'
                contents += 'yes';
                contents += '</span>'
                contents += "<br>";
                contents += "A bad year till after next winter? ";
                if(gamePage.resPool.get("catnip").value+((100-day)/100)*calculate_food_data(weatherMod, 200)+calculate_food_data(-0.90, 200)>0){
                    contents += '<span style="color: green;">'
                    contents += 'yes';
                    contents += '</span>'
                }else{
                    contents += '<span style="color: red;">'
                    contents += 'no, insufficent catnip.';
                    contents += '</span>'

                }
            }else{
                contents += '<span style="color: red;">'
                contents += 'no, insufficent catnip.';
                contents += '</span>'
            }
        }else{
            contents += '<span style="color: purple;">'
            contents += "Season detection error. Please report with screenshot to:"
            contents += "<br>";
            contents += "https://greasyfork.org/en/scripts/10234-kittens-game-data-output";
            contents += '</span>'
        }
        contents += "<br>";
    }else{
        contents += "No catnip consumed<br>"
    }
    return contents;
}

function output_data() {
    document.getElementById('food_table_season').innerHTML = generate_food_table(200, 'Food during seasons (/season)');
    document.getElementById('food_balance_info').innerHTML = generate_food_balance_data();
}

setInterval(output_data, 200);
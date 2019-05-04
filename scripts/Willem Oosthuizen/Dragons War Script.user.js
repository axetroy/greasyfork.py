// ==UserScript==
// @name         Dragons War Script
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  try to take over the world!
// @author       You
// @match        https://w12.crownofthegods.com/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Claim Portion starts here

    var addbuttonpt1='<a id="pt1button" class=""><span id="irtmsp">Point 1</span></a>';
    var addbuttonpt2='<a id="pt2button" class=""><span id="irtmsp">Point 2</span></a>';
    var addbuttonemptypt1='<a id="emptypt1button" class=""><span id="irtmsp">Point 1</span></a>';
    var addbuttonemptypt2='<a id="emptypt2button" class=""><span id="irtmsp">Point 2</span></a>';
    $("#cityplayerInfo").append(addbuttonpt1);
    $("#cityplayerInfo").append(addbuttonpt2);
    $("#emptyspsptb").append(addbuttonemptypt1);
    $("#emptyspsptb").append(addbuttonemptypt2);

    var ptx1 = 0;
    var pty1 = 0;
    var ptx2 = 0;
    var pty2 = 0;

    function distance_coords(x1,y1,x2,y2){

        var distance = Math.sqrt(Math.pow((x2-x1),2)+Math.pow((y2-y1),2));

        return distance;

    }

    function msToTime(duration) {

        var milliseconds = parseInt((duration%1000)/100),
            seconds = parseInt((duration/1000)%60),
            minutes = parseInt((duration/(1000*60))%60),
            hours = parseInt((duration/(1000*60*60))%24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    }
    var troop_types = {inf:"Infantry", cav:"Cavalry", sco:"Scouts", sie:"Siege", shi:"Ships", nob:"Senator", crt:"Carts", mst:"Trader Ships"};
    function display_troop_travel(x1,y1,x2,y2) {
        if(x1!=0 && y1!=0 && x2!=0 && y2!=0){
            var distance = distance_coords(x1,y1,x2,y2);
            var travel_times = cotg.info.travel(0,0,0,1);

            if ($("#MYpopupbox").length == 0){
                createmypopup();
            }
            if ($("#MYpopupbox").css('display') == 'none'){
                $("#MYpopupbox").show();
            }
            var outtext="<br><div class='beigemenutable'><table class='sortable beigetablescrollp'>";
            outtext+="<thead><th>Troop</th><th>Time</th></thead><tbody>";
            outtext+='<tr><td style="text-align:center;" >From: '+x1+':'+y1+'</td><td style="text-align:center;" >To: '+x2+':'+y2+'</td></tr>';
            for (var t in travel_times) {
                outtext+='<tr><td style="text-align:center;" >'+troop_types[t]+'</td>'+
                    '<td style="text-align:center;" >'+msToTime(travel_times[t]*distance)+'</td></tr>';
            }
            outtext+='</tbody></table></div>';
            $("#MyDevOutput").html(outtext);
        }
    }
    $('#pt1button').click(function() {
        var citycoords = document.getElementById('citycoords').innerHTML;
        citycoords = citycoords.split(":");
        ptx1 = citycoords[0];
        pty1 = citycoords[1];
        display_troop_travel(ptx1,pty1,ptx2,pty2);
    });
    $('#pt2button').click(function() {
        var citycoords = document.getElementById('citycoords').innerHTML;
        citycoords = citycoords.split(":");
        ptx2 = citycoords[0];
        pty2 = citycoords[1];
        display_troop_travel(ptx1,pty1,ptx2,pty2);
    });
    $('#emptypt1button').click(function() {
        var citycoords = document.getElementById('emptyspotcoord').innerHTML;
        citycoords = citycoords.split(":");
        ptx1 = citycoords[0];
        pty1 = citycoords[1];
        display_troop_travel(ptx1,pty1,ptx2,pty2);
    });
    $('#emptypt2button').click(function() {
        var citycoords = document.getElementById('emptyspotcoord').innerHTML;
        citycoords = citycoords.split(":");
        ptx2 = citycoords[0];
        pty2 = citycoords[1];
        display_troop_travel(ptx1,pty1,ptx2,pty2);
    });

    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
                break;
            }
        }
    }

    function claim_write(text) {
        var outtext="<h2>"+text+"</h2>";
        $("#claimed_result").html(outtext);
    }

    function listAllCities(citylist) {
        if ($("#MYpopupbox").length == 0){
            createmypopup();
        }
        if ($("#MYpopupbox").css('display') == 'none'){
            $("#MYpopupbox").show();
        }
        var outtext="<br><div class='beigemenutable'><table class='sortable beigetablescrollp'>";
        outtext+="<thead><th>Your Claimed Spots</th></thead><tbody>";
        for (var x in citylist) {
            outtext+='<tr><td style="text-align:center;" ><coords><span class="coordblink">'+citylist[x].xpos+':'+citylist[x].ypos+'<span><coords></td></tr>';
        }
        outtext+='</tbody></table></div>';
        $("#MyDevOutput").html(outtext);
    }

    var popupboxGeneral="<div id='MYpopupboxGeneral' style='display:none;width:350px;height:300px;right:10px;bottom:50px;z-index:4000;' class='popUpBox'>"+
        "<div class='popUpBar'><span class='ppspan'>Dragons Options</span>"+
        "<button id='MYpopupboxGeneralX' onclick=\"$('#MYpopupboxGeneral').hide('slow');\" class='xbutton greenb'>"+
        "<div id='xbuttondiv'><div><div id='centxbuttondiv'></div></div></div></button></div>"+
        "<div style='overflow-y: auto;overflow-x: hidden;height: 85%;' id='MYpopupboxGeneralOutput'>"+
        "<button class='regButton greenbuttonGo greenb' id='showPlayerGetBox'><span id=\"irtmsp\">Show Player Get</span></button><br>"+
        '<button class="regButton greenbuttonGo greenb" id="Checkall"><span id="irtmsp">My Claims</span></button>'+
        '<button class="regButton greenbuttonGo greenb" id="downloadOutgoings"><span id="irtmsp">Download Alliance Outgoing Attacks</span></button>'+
        "</div></div>";
    var popupbox="<div id='MYpopupbox' style='display:none;width:350px;height:300px;right:10px;bottom:50px;z-index:4000;' class='popUpBox'>"+
        "<div class='popUpBar'><span class='ppspan'>Claims</span>"+
        "<button id='MYpopupboxX' onclick=\"$('#MYpopupbox').hide('slow');\" class='xbutton greenb'>"+
        "<div id='xbuttondiv'><div><div id='centxbuttondiv'></div></div></div></button></div>"+
        "<div style='overflow-y: auto;overflow-x: hidden;height: 85%;' id='MyDevOutput'>"+
        "</div></div>";

    var addDragonsButton='<img id="DragonsButton" src="http://icons.iconarchive.com/icons/3xhumed/mega-games-pack-31/32/Dragon-Age-Origins-new-4-icon.png">';
    var addsupportrequestbutton='<p>Please make sure to go to the city requiring support before submitting the request</p><button id="requestSupport" class="regButton greenbuttonGo greenb" style="width: 130px;">Request Support</button>';
    $("body").append(popupboxGeneral);
    $("body").append(popupbox);
    $("#tpdcontent").append(addDragonsButton);
    //$("#MYpopupboxGeneralOutput").append(addsupportrequestbutton);

    var zNode = document.getElementById("DragonsButton");
    zNode.addEventListener ("click",        ButtonClickAction,  true);
    zNode.addEventListener ("mouseover",    mouseOver,          true);
    zNode.addEventListener ("mouseout",     mouseOut,           true);

    function mouseOver(){
        document.getElementById("DragonsButton").src ="http://icons.iconarchive.com/icons/3xhumed/mega-games-pack-31/128/Dragon-Age-Origins-new-4-icon.png";
    }

    function mouseOut(){
        document.getElementById("DragonsButton").src ="http://icons.iconarchive.com/icons/3xhumed/mega-games-pack-31/32/Dragon-Age-Origins-new-4-icon.png";
    }

    function ButtonClickAction(){
        if ($("#MYpopupboxGeneral").length == 0){
            createmypopup();
        }

        $("#MYpopupboxGeneral").show();
    }

    $('#allianceOutgoings').click(function() {
        setTimeout(function(){
            $("#MYpopupboxGeneral").show();
        }, 2000);
    });

    $('#showPlayerGetBox').click(function() {
        $("#MYpopupboxPeople").show();
        $("#MYpopupboxGeneral").hide();
    });


    $('#requestSupport').click(function() {
        var url = "https://www.firehawk.co.za:1880/support_request";
        var request = new XMLHttpRequest();
        var params = "action=run";
        request.open('POST', url, true);
        request.onreadystatechange = function() {
            if (request.readyState==4){
                is_claimed = request.responseText;
            }
        };
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send(params);
    });

    document.getElementById('createCityGo').style.display = 'none';

    var div = document.getElementById('emptyspotAction');
    var addcheckbutton = "<button class='regButton greenbuttonGo greenb' id='Check'>Check Claim</button>";
    var addclaimbutton = "<button class='regButton greenbuttonGo greenb' id='Claim'>Claim</button>";
    var addunclaimbutton = "<button class='regButton greenbuttonGo greenb' id='Unclaim'>Remove Claim</button>";
    var addclaimresult = "<div style='overflow-y: auto;overflow-x: hidden;height: 85%;' id='claimed_result'></div>";
    div.innerHTML += addcheckbutton;
    div.innerHTML += addclaimbutton;
    div.innerHTML += addunclaimbutton;
    div.innerHTML += addclaimresult;

    document.getElementById('Unclaim').style.display = 'none';
    document.getElementById('Claim').style.display = 'none';
    document.getElementById('Check').style.display = 'block';

    $("#createCityGo").insertAfter("#Unclaim");

    var is_claimed = "";
    var claimed = "";

    $('#Checkall').click(function() {
        $("#MYpopupboxGeneral").hide();
        var url = "https://www.firehawk.co.za/cotg/list/" + cotg.player.name();
        var request = new XMLHttpRequest();
        var params = "action=run";
        request.open('POST', url, true);
        request.onreadystatechange = function() {
            if (request.readyState==4){
                is_claimed = request.responseText;
            }
        };
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send(params);
        sleep(1000);
        request.onreadystatechange = function() {
            if (request.readyState==4){
                is_claimed = JSON.parse(request.response);
                listAllCities(is_claimed);
            }
        };
    });

    $('#Check').click(function() {
        var coordinates = document.getElementById('emptyspotcoord').innerHTML;
        var url = "https://www.firehawk.co.za/cotg/claim_check/" + coordinates + "/" + cotg.player.alliance();
        var request = new XMLHttpRequest();
        var params = "action=run";
        request.open('POST', url, true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send(params);
        request.onreadystatechange = function() {
            if (request.readyState==4){
                is_claimed = request.responseText;
            }
        };
        if (is_claimed !== "False") {
            if (is_claimed.includes(cotg.player.name())) {
                claim_write('The claim belongs to you');
                document.getElementById('createCityGo').style.display = 'block';
                document.getElementById('Claim').style.display = 'none';
                document.getElementById('Unclaim').style.display = 'block';
                document.getElementById('Check').style.display = 'none';
            } else {
                claim_write(is_claimed);
                document.getElementById('createCityGo').style.display = 'none';
                document.getElementById('Claim').style.display = 'none';
                document.getElementById('Unclaim').style.display = 'none';
                document.getElementById('Check').style.display = 'block';
            }
        }
        if (is_claimed === "False") {
            claim_write("Spot unclaimed");
            document.getElementById('createCityGo').style.display = 'block';
            document.getElementById('Claim').style.display = 'block';
            document.getElementById('Check').style.display = 'none';
            document.getElementById('Unclaim').style.display = 'none';
        }

    });

    $('#Claim').click(function() {
        var coordinates = document.getElementById('emptyspotcoord').innerHTML;
        var url = "https://www.firehawk.co.za/cotg/claim/" + coordinates + "/"+ cotg.player.alliance() +"/" + cotg.player.name();
        var request = new XMLHttpRequest();
        var params = "action=run";
        request.open('POST', url, true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send(params);
        request.onreadystatechange = function() {
            if (request.readyState==4){
                claimed = request.responseText;
                //cotg.chat.alliance('Location <coords>'+coordinates+'</coords> claimed by ' + playername);
                claim_write("Claimed: " + coordinates);
            }
        };
    });

    $('#Unclaim').click(function() {
        var coordinates = document.getElementById('emptyspotcoord').innerHTML;
        var url = "https://www.firehawk.co.za/cotg/unclaim/" + coordinates + "/"+ cotg.player.alliance() +"/" + cotg.player.name();
        var request = new XMLHttpRequest();
        var params = "action=run";
        request.open('POST', url, true);
        request.onreadystatechange = function() {
            if (request.readyState==4){
                claimed = request.responseText;
                //cotg.chat.alliance('Location <coords>'+coordinates+'</coords> claimed by ' + playername);
                claim_write("Claim Removed: " + coordinates);
            }
        };
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send(params);

    });

    $('#emptyspotcoord').bind("DOMSubtreeModified",function(){
        document.getElementById('createCityGo').style.display = 'none';
        document.getElementById('Claim').style.display = 'none';
        document.getElementById('Unclaim').style.display = 'none';
        document.getElementById('Check').style.display = 'block';
        claim_write("");
    });

    if ( document.getElementById("Sum").classList.contains('greenb') ){
        document.getElementById("Sum").classList.toggle('greenb');
    }

    // War Portion Starts here

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "City Name,Coords,Continent,City Score,Name,Type,Water\r\n";
    var popupbox1="<div id='MYpopupboxPeople' style='display:none;width:350px;height:300px;right:10px;bottom:50px;z-index:4000;' class='popUpBox'>"+
        "<div class='popUpBar'><span class='ppspan'>People Exporting</span>"+
        "<button id='MYpopupboxPeopleX' onclick=\"$('#MYpopupboxPeople').hide('slow');\" class='xbutton greenb'>"+
        "<div id='xbuttondiv'><div><div id='centxbuttondiv'></div></div></div></button></div>"+
        "<div style='    overflow-y: auto;overflow-x: hidden;height: 85%;' id='MyDevOutputPeople'>"+
        "</div><button class='regButton greenbuttonGo greenb' id='playerinfodownload'>Download Player Info</button><button class='regButton greenbuttonGo greenb' id='resetPlayerCSV'>Reset</button></div>";
    $("body").append(popupbox1);

    var addinfogetbutton = "<button class='regButton greenbuttonGo greenb' id='playerinfoget'>Get Info</button>";
    $("#playercittablet").append(addinfogetbutton);
    $("#playerinfoget").insertAfter("#plSpanName");

    $('#playerinfoget').click(function() {
        addDataToCSV();
    });
    $('#playerinfodownload').click(function() {
        downloadCSV();
    });
    $('#resetPlayerCSV').click(function() {
        resetCSV();
    });

    function resetCSV() {
        document.getElementById("MyDevOutputPeople").innerHTML = "";
        csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "City Name,Coords,Continent,City Score,Name,Type,Water\r\n";
        console.log(csvContent);
    }

    function addDataToCSV() {

        var playername = document.getElementById('plSpanName').innerHTML;
        $("#MyDevOutputPeople").append(playername+"<br>");
        var rows = Array.prototype.map.call(document.querySelectorAll('#citiestablebody tr'), function(tr){
            return Array.prototype.map.call(tr.querySelectorAll('td'), function(td){
                return td.innerHTML;
            });
        });

        rows.forEach(function(rowArray){
            let row = rowArray.join(",");
            csvContent += rowArray[1] +",";
            csvContent += rowArray[2] +",";
            csvContent += rowArray[3] +",";
            csvContent += rowArray[4] +"," + playername +"," + rowArray[0].split('"')[3].split(" ")[1] +"," + rowArray[0].split('"')[3].split(" ")[0] +"\r\n";
        });

        if ($("#MYpopupboxPeople").length == 0){
            createmypopup();
        }

        $("#MYpopupboxPeople").show();

    }

    function downloadCSV() {
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "data.csv");
        link.innerHTML= "Click Here to download";
        document.body.appendChild(link); // Required for FF
        link.click();
    }

    $('#downloadOutgoings').click(function() {
        let csvOutgoingContent = "data:text/csv;charset=utf-8,";
        csvOutgoingContent += ",,Type,Defender,Alliance,Target,Coordinates,Arrives/Next Wave,Attacker,Coordinates,Attacking TS,Defending TS, Senator Claim\r\n";
        var rows = Array.prototype.map.call(document.querySelectorAll('#oaBody tr'), function(tr){
            return Array.prototype.map.call(tr.querySelectorAll('td'), function(td){
                return td.innerHTML;
            });
        });

        rows.forEach(function(rowArray){
            let row = rowArray.join(",");
            csvOutgoingContent += rowArray[0] +",";
            if (rowArray[1] == '<div id="clockpicTD"></div>'){
                csvOutgoingContent += "Future Attack,";
            } else {
                csvOutgoingContent += ",";
            }
            csvOutgoingContent += rowArray[2] +",";
            csvOutgoingContent += rowArray[3] +",";
            csvOutgoingContent += rowArray[4] +"," ;
            csvOutgoingContent += rowArray[5].split(">")[1].split("<")[0] +"," ;
            csvOutgoingContent += rowArray[6].split(">")[2].split("<")[0] +"," ;
            csvOutgoingContent += rowArray[7] +"," ;
            csvOutgoingContent += rowArray[8] +"," ;
            csvOutgoingContent += rowArray[9].split(">")[1].split("<")[0] +"," ;
            csvOutgoingContent += rowArray[10] +"," ;
            csvOutgoingContent += rowArray[11] +"," ;
            csvOutgoingContent += rowArray[12] +"\r\n";
        });

        var encodedUri = encodeURI(csvOutgoingContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "outgoings.csv");
        link.innerHTML= "Click Here to download";
        document.body.appendChild(link); // Required for FF
        link.click();
    });

})();
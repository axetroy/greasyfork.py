// ==UserScript==
// @name         Mefi OSM
// @namespace    exp?zworp!
// @version      0.666
// @description  Replace Google Maps with OpenStreetMap on Metafilter
// @author       farlukar
// @match        https://www.metafilter.com/user/*
// @match        https://irl.metafilter.com/*
// @grant        none
// ==/UserScript==


// link in user profile
if (document.URL.match(/https:\/\/www.metafilter.com\/user\/*/)) {

    var mapLink = document.evaluate("//a[@title='View on Google Maps']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    var coordinates = String(mapLink.snapshotItem(0)).replace(/.*ll=([^&]*)&.*/,"\$1").split(',');
    mapLink.snapshotItem(0).href = "https://www.openstreetmap.org/?mlat=" + coordinates[0] + "&mlon=" + coordinates[1] + "#map=4/" + coordinates[0] + "/" + coordinates[1];
    mapLink.snapshotItem(0).title = "View on OpenStreetMap";

}


// map in irl
if (document.URL.match(/https:\/\/irl.metafilter.com\/*/)) {

    var address = document.evaluate("//div[@id='address']/a",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    var ll = String(address.snapshotItem(0)).split('@');
    var coordinates = ll[1].split(',');
    var lat = Number(coordinates[0]);
    var lon = Number(coordinates[1]);
    var toplat = String(lat + 0.005);
    var bottomlat = String(lat - 0.005);
    var leftlon = String(lon - 0.013);
    var rightlon = String(lon + 0.013);
    var lat = String(lat);
    var lon = String(lon);
    var showMap = document.getElementById("map");
    showMap.innerHTML = "<iframe width='580' height='200' frameborder='0' scrolling='no' style='margin:0' src='https://www.openstreetmap.org/export/embed.html?bbox=" + leftlon + "," + bottomlat + "," + rightlon +"," + toplat + "&amp;marker=" + lat + "," + lon + "'></iframe>";
    address.snapshotItem(0).href = "https://www.openstreetmap.org/directions?engine=osrm_car&route=;" + lat + "," + lon + "#map=12/" + lat + "/" +lon;

}

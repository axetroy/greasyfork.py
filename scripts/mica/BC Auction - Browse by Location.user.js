// ==UserScript==
// @name        BC Auction - Browse by Location
// @description Removes items located outside a given region, as specified by editing the list in the code
// @version     0.2
// @author      mica
// @namespace   greasyfork.org/users/12559
// @include     https://www.bcauction.ca/open.dll/submitDocSearch*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js
// @grant       none
// ==/UserScript==

// List of known locations
// Remove the places you want to have shown (i.e. towns in your area)
// Keep the list comma separated, except for the last item 
var places = [
    'Abbotsford',
    'Bowron Lake Park',
    'Burnaby',
    'Campbell River',
    'Castlegar',
    'Coquitlam',
    'Cranbrook',
    'Dawson Creek',
    'Delta',
    'Fort St. John',
    'Golden',
    'Grand Forks',
    'Hope',
    'Kamloops',
    'Kelowna',
    'Kitimat',
    'Langley',
    'Lillooet',
    'McBride',
    'Merritt',
    'Nanaimo',
    'Nelson',
    'Parksville',
    'Peachland',
    'Penticton',
    'Port Alberni',
    'Prince George',
    'Princeton',
    'Quesnel',
    'Revelstoke',
    'Richmond',
    'Salmon Arm',
    'Sechelt',
    'Sparwood',
    'Squamish',
    'Surrey',
    'Telkwa',
    'Terrace',
    'Tumbler Ridge',
    'Vancouver',
    'Vernon',
    'Victoria',
    'Williams Lake'
];

var elems = 'td[width="75"] > table > tbody > tr > td';

$(elems).each(function(i, elem) {
    $(places).each(function(i, place) {
        if ($(elem).text().includes(place)) {
            $(elem).parents().eq('4').next().addBack().remove();
        }
    });
});

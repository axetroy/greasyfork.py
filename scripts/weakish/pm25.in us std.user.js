// ==UserScript==
// @description Let pm25.in display AQI level according to US standard instead of CN.
// @match http://www.pm25.in/*
// @name pm25.in us std
// @version 0.0.1
// @namespace https://greasyfork.org/users/7812
// ==/UserScript==


var pm25_csspath = 'body > div.container > div.span12.avg > div.span12.data > div:nth-child(2) > div.value';
var pm25 = parseInt(document.querySelector(pm25_csspath).innerText, 10);

// AQI category: https://en.wikipedia.org/wiki/Air_quality_index
// AQI meaning: http://airnow.gov/index.cfm?action=aqibasics.aqi
// Action: AQI: A Guide to Air Quality and Your Health, p. 8
// via http://www.epa.gov/airnow/aqi_brochure_02_14.pdf
if (pm25 <= 12) {
  var aqi_category = 'Good';
  var aqi_meaning = 'Air quality is considered satisfactory, and air pollution poses little or no risk.';
  var aqi_action = 'None';}
else if (pm25 <= 35.4) {
  var aqi_category = 'Moderate';
  var aqi_meaning = 'Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.';
  var aqi_action = 'Unusually sensitive people should consider reducing prolonged or heavy exertion.';}
else if (pm25 <= 55.4) {
  var aqi_category = 'Unhealthy for sensitive Groups';
  var aqi_meaning = 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.';
  var aqi_action = 'People with heart or lung disease, children  and older adults should reduce prolonged or heavy exertion';}
else if (pm25 <= 150.4) {
  var aqi_category = 'Unhealthy';
  var aqi_meaning = 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.';
  var aqi_action = 'People with heart or lung disease, children  and older adults should avoid prolonged or heavy exertion. Everyone else should reduce prolonged or heavy exertion.';}
else if (pm25 <= 250.4) {
  var aqi_category = 'Very Unhealthy';
  var aqi_meaning = 'Health warnings of emergency conditions. The entire population is more likely to be affected.';
  var aqi_action = 'People with heart or lung disease, children  and older adults should avoid all physical activity outdoors. Everyone else should avoid prolonged or heavy exertion.';}
else {
  var aqi_category = 'Hazardous';
  var aqi_meaning = 'Health alert: everyone may experience more serious health effects';
  var aqi_action = 'Avoid all physical activity outdoors.';}


var level_csspath = 'body > div.container > div.span12.avg > div:nth-child(1) > div.level > h4';
document.querySelector(level_csspath).innerText = aqi_category;
var affect_csspath = 'body > div.container > div.span12.avg > div.span12.caution > div.affect > p';
document.querySelector(affect_csspath).innerText = aqi_meaning;
var action_csspath = 'body > div.container > div.span12.avg > div.span12.caution > div.action > p';
document.querySelector(action_csspath).innerText = aqi_action;

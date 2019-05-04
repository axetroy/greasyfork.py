// ==UserScript==
// @name            Open WME in EST
// @description     Opens the current Waze Map Editor view in Estonian Land Board Geoportal
// @version         0.1
// @include         /^https:\/\/(www|beta)\.waze\.com\/(?!user\/)(.{2,6}\/)?editor.*$/
// @include         https://xgis.maaamet.ee/maps/*
// @require         https://greasyfork.org/scripts/13097-proj4js/code/Proj4js.js
// @author          rain101
// @namespace https://greasyfork.org/users/207621
// ==/UserScript==

console.log("WME_EE BEGINNING");

const icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAArUlEQVQokbXMPQ6CMBxA8X80EMpgcdBRowaMB2NquKKLxEQ08WOCiR4BptLpeYjqS37rk5OpyU1Dbm7BjuaK5ObGzrzYmWegF7lpkKK6s68+7Kt3oA9F9UAO5ZlNWbMtL4FqDuUZUYs1syRjrpZBZklGslghcRwjIj8RRdEfhlprlFKkaRpEKYXWGmnbFmstfd8HsdbSdR3inONXOef+MByGAe890zQF8d4zjiNfdeREmfFbjlgAAAAASUVORK5CYII=';

function gen_url() {
  Proj4js.defs["EPSG:3301"] = "+proj=lcc +lat_1=59.33333333333334 +lat_2=58 +lat_0=57.51755393055556 +lon_0=24 +x_0=500000 +y_0=6375000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";

  const center_lonlat = (new OpenLayers.LonLat(Waze.map.center.lon, Waze.map.center.lat));
  const point = new Proj4js.Point(center_lonlat.lon, center_lonlat.lat);
  const zoom = Waze.map.zoom + 4;

  const src = new Proj4js.Proj("EPSG:900913");
  const dst = new Proj4js.Proj("EPSG:3301");

  Proj4js.transform(src, dst, point);

  // Normal Flash Estonian Landboard page
  // return 'http://xgis.maaamet.ee/xGIS/XGis?app_id=UU82&user_id=at&punkt=' + point.x + ',' + point.y + '&moot=4000';

  // HTML5 Estonian Landboard page
  return 'http://xgis.maaamet.ee/maps/XGis?app_id=UU82A&user_id=at&zlevel=' + zoom + ',' + point.x + ',' + point.y;
}

function init() {
  try {
    const element = $('.WazeControlPermalink');
    if ($(element).length) {
      $('.WazeControlPermalink').prepend('<img src="' + icon + '" id="WMEtoEE" alt="EE" title="Open in Estoninan Landboard" style="cursor:pointer; float: left; display:inline-block; margin: 5px 5px 0 3px;"/>');
      $('#WMEtoEE').click(function() {
        window.open(gen_url(), '_blank');
      });
      console.log("WME_EE done");
    } else {
      setTimeout(init, 1000);
    }
  } catch (err) {
    console.log("WME_EE - " + err);
    setTimeout(init, 1000);
  }
}

init();
// ==UserScript==
// @name                WME OpenData
// @namespace           http://greasemonkey.chizzum.com
// @description         Provides access to certain OS OpenData products within the WME environment
// @include             https://*.waze.com/*editor*
// @include             https://editor-beta.waze.com/*
// @include             https://beta.waze.com/*
// @include             https://roadworks.org/*
// @include             http://public.londonworks.gov.uk/roadworks/*
// @include             http://streetworks.wiltshire.gov.uk/*
// @include             https://openspacewmb.ordnancesurvey.co.uk/osmapapi/mapbuilder*
// @grant               none
// @version             2.43
// ==/UserScript==

// Contains Ordnance Survey data Crown copyright and database right 2012-2018
//
// Contents of the locatorData_*.js files are derived under the
// Open Government Licence from the OS Open Names and Open Roads datasets
//
// Contents of the gazetteer.js files are derived under the
// Open Government Licence from the 1:50 000 Scale Gazetteer dataset
//
// Contents of the prnData_*.js files are derived under the
// Open Government Licence from the VectorMap District dataset

/*
=======================================================================================================================
DONE FOR THIS RELEASE
=======================================================================================================================

Reinstatement of OS OpenData mapping link
Highlights all adjacent bounding boxes which match the street and city name

=======================================================================================================================
Bug fixes - MUST BE CLEARED BEFORE RELEASE
=======================================================================================================================


=======================================================================================================================
Things to be checked
=======================================================================================================================

Correct generation of name data from PC tool, and correct handling of bounding boxes which are defined in the
adjacent data block but which overlap into the one the mouse pointer co-ords are currently within

=======================================================================================================================
Proposed functionality
=======================================================================================================================

Mark on map where the OS city names are located

Restrict city name uniqueness testing to within each county rather than country-wide
Note: remember that the OS data uses London boroughs whereas Waze uses Greater London...


=======================================================================================================================
New functionality in progress
=======================================================================================================================


*/

/* JSHint Directives */
/* globals W: true */
/* globals OL: true */
/* globals OpenLayers: true */
/* globals osMap: true */
/* globals OpenSpace: true */
/* globals Elgin: true */
/* globals google: true */
/* globals gazetteerDataA: true */
/* globals gazetteerDataB: true */
/* globals map: true */
/* jshint bitwise: false */
/* jshint evil: true */

var oslVersion = '2.43';


// include names that don't get abbreviated, so that for names such as "Somewhere Green Way", the
// abbreviation function is able to detect the "Way" part of the name as the part that ought to
// be abbreviated, rather than treating it as a non-abbreviatable suffix and instead abbreviating
// the "Green" part instead...
var oslNameAbbreviations = new Array
(
   'Avenue','Ave',
   'Boulevard','Blvd',
   'Broadway','Bdwy',
   'Circus','Cir',
   'Close','Cl',
   'Court','Ct',
   'Crescent','Cr',
   'Drive','Dr',
   'Garden','Gdn',
   'Gardens','Gdns',
   'Green','Gn',
   'Grove','Gr',
   'Lane','Ln',
   'Mews','Mews',
   'Mount','Mt',
   'Place','Pl',
   'Park','Pk',
   'Ridge','Rdg',
   'Road','Rd',
   'Square','Sq',
   'Street','St',
   'Terrace','Ter',
   'Valley','Val',
   'By-pass','Bypass',
   'Way','Way'
);

var oslCountyAbbreviations = new Array
(
   'AB','Aberdeenshire',
   'AG','Angus',
   'AN','Aberdeen',
   'AR','Argyll and Bute',
   'BA','Bradford',
   'BB','Blackburn with Darwen',
   'BC','Bracknell Forest',
   'BD','Greater London',//'Barking and Dagenham',
   'BE','Bridgend',
   'BF','Bedford',
   'BG','Blaenau Gwent',
   'BH','Brighton and Hove',
   'BI','Birmingham',
   'BK','Central Bedfordshire',
   'BL','Barnsley',
   'BM','Buckinghamshire',
   'BN','Greater London',//'Barnet',
   'BO','Bolton',
   'BP','Blackpool',
   'BR','Greater London',//'Bromley',
   'BS','Bath and NE Somerset',
   'BT','Greater London',//'Brent',
   'BU','Bournemouth',
   'BX','Greater London',//'Bexley',
   'BY','Bury',
   'BZ','Bristol',
   'CA','Calderdale',
   'CB','Cambridgeshire',
   'CC','Cheshire West and Chester',
   'CD','Cardiff',
   'CE','Ceredigion',
   'CF','Caerphilly',
   'CH','Cheshire East',
   'CL','Clackmannanshire',
   'CM','Greater London',//'Camden',
   'CN','Cornwall',
   'CT','Carmarthenshire',
   'CU','Cumbria',
   'CV','Coventry',
   'CW','Conwy',
   'CY','Greater London',//'Croydon',
   'DB','Derby',
   'DD','Dundee',
   'DE','Denbighshire',
   'DG','Dumfries and Galloway',
   'DL','Darlington',
   'DN','Devon',
   'DR','Doncaster',
   'DT','Dorset',
   'DU','County Durham',
   'DY','Derbyshire',
   'DZ','Dudley',
   'EA','East Ayrshire',
   'EB','Edinburgh',
   'ED','East Dunbartonshire',
   'EG','Greater London',//'Ealing',
   'EL','East Lothian',
   'EN','Greater London',//'Enfield',
   'ER','East Renfrewshire',
   'ES','East Sussex',
   'EX','Essex',
   'EY','East Riding of Yorkshire',
   'FA','Falkirk',
   'FF','Fife',
   'FL','Flintshire',
   'GH','Gateshead',
   'GL','Glasgow',
   'GR','Gloucestershire',
   'GW','Greater London',//'Greenwich',
   'GY','Gwynedd',
   'HA','Halton',
   'HD','Hertfordshire',
   'HE','Herefordshire',
   'HF','Greater London',//'Hammersmith and Fulham',
   'HG','Greater London',//'Haringey',
   'HI','Greater London',//'Hillingdon',
   'HL','Highland',
   'HN','Greater London',//'Hackney',
   'HP','Hampshire',
   'HR','Greater London',//'Harrow',
   'HS','Greater London',//'Hounslow',
   'HT','Hartlepool',
   'HV','Greater London',//'Havering',
   'IA','Isle of Anglesey',
   'IL','Greater London',//'Islington',
   'IM','Isle of Man',
   'IN','Inverclyde',
   'IS','Isles of Scilly',
   'IW','Isle of Wight',
   'KC','Greater London',//'Kensington and Chelsea',
   'KG','Greater London',//'Kingston Upon Thames',
   'KH','Kingston upon Hull',
   'KL','Kirklees',
   'KN','Knowsley',
   'KT','Kent',
   'LA','Lancashire',
   'LB','Greater London',//'Lambeth',
   'LC','Leicester',
   'LD','Leeds',
   'LL','Lincolnshire',
   'LN','Luton',
   'LO','Greater London',//'London',
   'LP','Liverpool',
   'LS','Greater London',//'Lewisham',
   'LT','Leicestershire',
   'MA','Manchester',
   'MB','Middlesbrough',
   'ME','Medway',
   'MI','Midlothian',
   'MK','Milton Keynes',
   'MM','Monmouthshire',
   'MO','Moray',
   'MR','Greater London',//'Merton',
   'MT','Merthyr Tydfil',
   'NA','North Ayrshire',
   'NC','North East Lincolnshire',
   'ND','Northumberland',
   'NE','Newport',
   'NG','Nottingham',
   'NH','Greater London',//'Newham',
   'NI','North Lincolnshire',
   'NK','Norfolk',
   'NL','North Lanarkshire',
   'NN','Northamptonshire',
   'NP','Neath Port Talbot',
   'NR','North Tyneside',
   'NS','North Somerset',
   'NT','Nottinghamshire',
   'NW','Newcastle upon Tyne',
   'NY','North Yorkshire',
   'OH','Oldham',
   'OK','Orkney Islands',
   'ON','Oxfordshire',
   'PB','Pembrokeshire',
   'PE','Peterborough',
   'PK','Perth and Kinross',
   'PL','Poole',
   'PO','Portsmouth',
   'PW','Powys',
   'PY','Plymouth',
   'RB','Greater London',//'Redbridge',
   'RC','Redcar and Cleveland',
   'RD','Rochdale',
   'RE','Renfrewshire',
   'RG','Reading',
   'RH','Rhondda Cynon Taf',
   'RL','Rutland',
   'RO','Rotherham',
   'RT','Greater London',//'Richmond Upon Thames',
   'SA','Sandwell',
   'SB','Scottish Borders',
   'SC','Salford',
   'SD','Swindon',
   'SE','Sefton',
   'SF','Staffordshire',
   'SG','South Gloucestershire',
   'SH','Shropshire',
   'SI','Shetland Islands',
   'SJ','Stoke-on-Trent',
   'SK','Suffolk',
   'SL','South Lanarkshire',
   'SM','Stockton-on-Tees',
   'SN','St. Helens',
   'SO','Southampton',
   'SP','Sheffield',
   'SQ','Solihull',
   'SR','Stirling',
   'SS','Swansea',
   'ST','Somerset',
   'SU','Surrey',
   'SV','Sunderland',
   'SW','Southwark',
   'SX','South Ayrshire',
   'SY','South Tyneside',
   'SZ','Greater London',//'Sutton',
   'TB','Torbay',
   'TF','Torfaen',
   'TH','Greater London',//'Tower Hamlets',
   'TR','Trafford',
   'TS','Tameside',
   'TU','Thurrock',
   'VG','Vale of Glamorgan',
   'WA','Walsall',
   'WB','West Berkshire',
   'WC','Windsor and Maidenhead',
   'WD','West Dunbartonshire',
   'WE','Wakefield',
   'WF','Waltham Forest',
   'WG','Warrington',
   'WH','Wolverhampton',
   'WI','Na h-Eileanan an Iar',
   'WJ','Wokingham',
   'WK','Warwickshire',
   'WL','West Lothian',
   'WM','Greater London',//'Westminster',
   'WN','Wigan',
   'WO','Worcestershire',
   'WP','Telford and Wrekin',
   'WR','Wirral',
   'WS','West Sussex',
   'WT','Wiltshire',
   'WW','Greater London',//'Wandsworth',
   'WX','Wrexham',
   'YK','York',
   'YS','Southend-on-Sea',
   'YT','Slough',
   'YY','Stockport'
);

var oslGazetteerData = [];

var oslAdvancedMode = false;
var oslEvalString = '';
var oslLoadingMsg = false;
var oslMLCDiv = null;
var oslOSLDiv = null;
var oslBBDiv = null;
var oslPrevHighlighted = null;
var oslSegmentHighlighted = false;
var oslPrevMouseX = null;
var oslPrevMouseY = null;
var oslDivDragging = false;
var oslPrevSelected = null;
var oslDoOSLUpdate = false;
var oslMousepos = null;
var oslDoneOnload = false;
var oslRefreshAutoTrack = false;
var oslOSOD_url = '';
var oslOSMC_url = '';
var oslRWO_url = '';
var oslLRR_url = '';
var oslSWG_url = '';
var oslPrevStreetName = '';
var oslMergeGazData = false;
var oslOSLMaskLayer = null;
var oslOSLNameCheckTimer = 0;
var oslOSLNCSegments = [];
var oslInUK = false;
var oslInLondon = false;
var oslInWiltshire = false;

var oslNorthings = null;
var oslEastings = null;
var oslLatitude = null;
var oslLongitude = null;
var oslHelmX = null;
var oslHelmY = null;
var oslHelmZ = null;
var oslPi = 3.14159265358979;
var oslPiDiv180 = (oslPi / 180);
var osl180DivPi = (180 / oslPi);

var oslBlocksToLoad = [];

// 50.06574112187924 -5.699894626953322
// 135261,25033
// 135256,25014
// +6, +19

// 51.35363338966115 1.4443961072966522
// 639795,167306
// 639800,167284
// -5, +22

// 60.15795987870581 -1.1466271562283679
// 447367,1141743
// 447362,1141733
// +5, +10

var oslVPLeft = 0;
var oslVPRight = 0;
var oslVPBottom = 0;
var oslVPTop = 0;
var oslBBDivInnerHTML = '';

var oslEvalEBlock = 0;
var oslEvalNBlock = 0;
var oslBlockData = null;
var oslBlockCacheList = [];
var oslCacheDecayPeriod = 60;
var oslBlockCacheTestTimer = (oslCacheDecayPeriod * 10);
var oslPRNData = null;
var oslPRNCacheList = [];
var oslPRNCacheTestTimer = (oslCacheDecayPeriod * 10);
var oslPRNDivInnerHTML = '';
var oslPendingPRNBlocks = [];

var oslONC_E = null;
var oslONC_N = null;
var oslEBlock_min = null;
var oslEBlock_max = null;
var oslNBlock_min = null;
var oslNBlock_max = null;

var oslWazeBitsPresent = 0;

var oslLocatorBlockSize = 1000;
var oslElmA = 0;
var oslElmB = 1;
var oslElmC = 2;
var oslElmD = 3;
var oslElmE = 4;
var oslElmF = 5;
var oslElmG = 6;

var oslOSLDivLeft;
var oslOSLDivTop;
var oslPRNDiv;
var oslWazeMapElement;
var oslDragBar;
var oslWindow;
var oslExtLinksUKDiv;
var oslOSLDivTopMinimised;
var oslNCDiv;
var oslPRNUIDiv;

var oslOffsetToolbar = false;
var oslMOAdded = false;
var oslMTEMode = false;


function oslBootstrap()
{
   if(document.location.host == 'roadworks.org')
   {
      rwoInitialise();
   }
   else if(document.location.host == 'openspacewmb.ordnancesurvey.co.uk')
   {
      odfhInitialise();
   }
   else if(document.location.host == 'public.londonworks.gov.uk')
   {
      lrrInitialise();
   }
   else if(document.location.host == 'streetworks.wiltshire.gov.uk')
   {
      swgInitialise();
   }
   else
   {
      // something in this version prevents WME from starting up properly if we initialise early in the WME startup.
      // since I haven't yet figured out what it is we need to wait for, using a fixed delay of 2s seems to work OK...
      setTimeout(oslInitialise,2000);
   }
}

function oslAddLog(logtext)
{
   console.log('WMEOpenData: '+logtext);
}

//-----------------------------------------------------------------------------------------------------------------------------------------
// all code between here and the next ------------- marker line is a stripped down version of the original from Paul Dixon
//
// * GeoTools javascript coordinate transformations
// * http://files.dixo.net/geotools.html
// *
// * This file copyright (c)2005 Paul Dixon (paul@elphin.com)
// *
// * This program is free software; you can redistribute it and/or
// * modify it under the terms of the GNU General Public License
// * as published by the Free Software Foundation; either version 2
// * of the License, or (at your option) any later version.
// *
// * This program is distributed in the hope that it will be useful,
// * but WITHOUT ANY WARRANTY; without even the implied warranty of
// * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// * GNU General Public License for more details.
// *
// * You should have received a copy of the GNU General Public License
// * along with this program; if not, write to the Free Software
// * Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.
// *
// * ---------------------------------------------------------------------------
// *
// * Credits
// *
// * The algorithm used by the script for WGS84-OSGB36 conversions is derived
// * from an OSGB spreadsheet (www.gps.gov.uk) with permission. This has been
// * adapted into Perl by Ian Harris, and into PHP by Barry Hunter. Conversion
// * accuracy is in the order of 7m for 90% of Great Britain, and should be
// * be similar to the conversion made by a typical GPSr
// *
// * See accompanying documentation for more information
// * http://www.nearby.org.uk/tests/GeoTools2.html

function oslOSGBtoWGS(oseast, osnorth)
{
   var a = 6377563.396;
   var b = 6356256.910;
   var e0 = 400000;
   var n0 = -100000;
   var f0 = 0.999601272;
   var PHI0 = 49.00000;
   var LAM0 = -2.00000;

   var RadPHI0 = PHI0 * oslPiDiv180;
   var RadLAM0 = LAM0 * oslPiDiv180;

   //Compute af0, bf0, e squared (e2), n and Et
   var af0 = a * f0;
   var bf0 = b * f0;
   var e2 = (Math.pow(af0,2) - Math.pow(bf0,2)) / Math.pow(af0,2);
   var n = (af0 - bf0) / (af0 + bf0);
   var Et = oseast - e0;

   //Compute initial value for oslLatitude (PHId) in radians
   var PHI1 = ((osnorth - n0) / af0) + RadPHI0;
   var M = oslMarc(bf0, n, RadPHI0, PHI1);
   var PHId = ((osnorth - n0 - M) / af0) + PHI1;
   while (Math.abs(osnorth - n0 - M) > 0.00001)
   {
      PHId = ((osnorth - n0 - M) / af0) + PHI1;
      M = oslMarc(bf0, n, RadPHI0, PHId);
      PHI1 = PHId;
   }

   //Compute nu, rho and eta2 using value for PHId
   var nu = af0 / (Math.sqrt(1 - (e2 * ( Math.pow(Math.sin(PHId),2)))));
   var rho = (nu * (1 - e2)) / (1 - (e2 * Math.pow(Math.sin(PHId),2)));
   var eta2 = (nu / rho) - 1;

   //Compute Latitude
   var VII = (Math.tan(PHId)) / (2 * rho * nu);
   var VIII = ((Math.tan(PHId)) / (24 * rho * Math.pow(nu,3))) * (5 + (3 * (Math.pow(Math.tan(PHId),2))) + eta2 - (9 * eta2 * (Math.pow(Math.tan(PHId),2))));
   var IX = ((Math.tan(PHId)) / (720 * rho * Math.pow(nu,5))) * (61 + (90 * ((Math.tan(PHId)) ^ 2)) + (45 * (Math.pow(Math.tan(PHId),4))));
   oslLatitude = osl180DivPi * (PHId - (Math.pow(Et,2) * VII) + (Math.pow(Et,4) * VIII) - ((Et ^ 6) * IX));

   //Compute Longitude
   var X = (Math.pow(Math.cos(PHId),-1)) / nu;
   var XI = ((Math.pow(Math.cos(PHId),-1)) / (6 * Math.pow(nu,3))) * ((nu / rho) + (2 * (Math.pow(Math.tan(PHId),2))));
   var XII = ((Math.pow(Math.cos(PHId),-1)) / (120 * Math.pow(nu,5))) * (5 + (28 * (Math.pow(Math.tan(PHId),2))) + (24 * (Math.pow(Math.tan(PHId),4))));
   var XIIA = ((Math.pow(Math.cos(PHId),-1)) / (5040 * Math.pow(nu,7))) * (61 + (662 * (Math.pow(Math.tan(PHId),2))) + (1320 * (Math.pow(Math.tan(PHId),4))) + (720 * (Math.pow(Math.tan(PHId),6))));
   oslLongitude = osl180DivPi * (RadLAM0 + (Et * X) - (Math.pow(Et,3) * XI) + (Math.pow(Et,5) * XII) - (Math.pow(Et,7) * XIIA));



   var RadPHI = oslLatitude * oslPiDiv180;
   var RadLAM = oslLongitude * oslPiDiv180;

   e2 = (Math.pow(6377563.396,2) - Math.pow(6356256.910,2)) / Math.pow(6377563.396,2);
   var V = a / (Math.sqrt(1 - (e2 * (  Math.pow(Math.sin(RadPHI),2)))));

   X = V * (Math.cos(RadPHI)) * (Math.cos(RadLAM));
   var Y = V * (Math.cos(RadPHI)) * (Math.sin(RadLAM));
   var Z = (V * (1 - e2)) * (Math.sin(RadPHI));

   // do Helmert transforms

   var sfactor = -20.4894 * 0.000001;
   var RadX_Rot = (0.1502 / 3600) * oslPiDiv180;
   var RadY_Rot = (0.2470 / 3600) * oslPiDiv180;
   var RadZ_Rot = (0.8421 / 3600) * oslPiDiv180;

   var X2 = (X + (X * sfactor) - (Y * RadZ_Rot) + (Z * RadY_Rot) + 446.448);
   var Y2 = (X * RadZ_Rot) + Y + (Y * sfactor) - (Z * RadX_Rot) -125.157;
   var Z2 = (-1 * X * RadY_Rot) + (Y * RadX_Rot) + Z + (Z * sfactor) + 542.060;

   var RootXYSqr = Math.sqrt(Math.pow(X2,2) + Math.pow(Y2,2));
   e2 = (Math.pow(6378137.000,2) - Math.pow(6356752.313,2)) / Math.pow(6378137.000,2);
   PHI1 = Math.atan2(Z2 , (RootXYSqr * (1 - e2)) );

   V = 6378137.000 / (Math.sqrt(1 - (e2 * Math.pow(Math.sin(PHI1),2))));
   var PHI2 = Math.atan2((Z + (e2 * V * (Math.sin(PHI1)))) , RootXYSqr);
   while (Math.abs(PHI1 - PHI2) > 0.000000001)
   {
      PHI1 = PHI2;
      V = 6378137.000 / (Math.sqrt(1 - (e2 * Math.pow(Math.sin(PHI1),2))));
      PHI2 = Math.atan2((Z2 + (e2 * V * (Math.sin(PHI1)))) , RootXYSqr);
   }
   oslLatitude = PHI2 * osl180DivPi;
   oslLongitude = Math.atan2(Y2 , X2) * osl180DivPi;
}

function oslWGStoOSGB()
{
   oslLatLontoHelmXYZ();
   var oslLatitude2  = oslXYZtoLat();
   var oslLongitude2 = Math.atan2(oslHelmY , oslHelmX) * osl180DivPi;
   oslLatLonoslToOSGrid(oslLatitude2,oslLongitude2);
}

function oslLatLontoHelmXYZ()
{
   var a = 6378137.0;
   var b = 6356752.313;
   var DX = -446.448;
   var DY = 125.157;
   var DZ = -542.060;
   var rotX = -0.1502;
   var rotY = -0.2470;
   var rotZ = -0.8421;
   var sfactor = 20.4894 * 0.000001;

   // perform initial lat-lon to cartesian coordinate translation
   var RadPHI = oslLatitude * oslPiDiv180;
   var RadLAM = oslLongitude * oslPiDiv180;
   var e2 = (Math.pow(a,2) - Math.pow(b,2)) / Math.pow(a,2);
   var V = a / (Math.sqrt(1 - (e2 * (  Math.pow(Math.sin(RadPHI),2)))));
   var cartX = V * (Math.cos(RadPHI)) * (Math.cos(RadLAM));
   var cartY = V * (Math.cos(RadPHI)) * (Math.sin(RadLAM));
   var cartZ = (V * (1 - e2)) * (Math.sin(RadPHI));

   // Compute Helmert transformed coordinates
   var RadX_Rot = (rotX / 3600) * oslPiDiv180;
   var RadY_Rot = (rotY / 3600) * oslPiDiv180;
   var RadZ_Rot = (rotZ / 3600) * oslPiDiv180;
   oslHelmX = (cartX + (cartX * sfactor) - (cartY * RadZ_Rot) + (cartZ * RadY_Rot) + DX);
   oslHelmY = (cartX * RadZ_Rot) + cartY + (cartY * sfactor) - (cartZ * RadX_Rot) + DY;
   oslHelmZ = (-1 * cartX * RadY_Rot) + (cartY * RadX_Rot) + cartZ + (cartZ * sfactor) + DZ;
}

function oslXYZtoLat()
{
   var a = 6377563.396;
   var b = 6356256.910;
   var RootXYSqr = Math.sqrt(Math.pow(oslHelmX,2) + Math.pow(oslHelmY,2));
   var e2 = (Math.pow(a,2) - Math.pow(b,2)) / Math.pow(a,2);
   var PHI1 = Math.atan2(oslHelmZ , (RootXYSqr * (1 - e2)) );
   var PHI = oslIterateOSLXYZtoLat(a, e2, PHI1, oslHelmZ, RootXYSqr);
   return PHI * osl180DivPi;
}

function oslIterateOSLXYZtoLat(a, e2, PHI1, Z, RootXYSqr)
{
   var V = a / (Math.sqrt(1 - (e2 * Math.pow(Math.sin(PHI1),2))));
   var PHI2 = Math.atan2((Z + (e2 * V * (Math.sin(PHI1)))) , RootXYSqr);
   while (Math.abs(PHI1 - PHI2) > 0.000000001)
   {
      PHI1 = PHI2;
      V = a / (Math.sqrt(1 - (e2 * Math.pow(Math.sin(PHI1),2))));
      PHI2 = Math.atan2((Z + (e2 * V * (Math.sin(PHI1)))) , RootXYSqr);
   }
   return PHI2;
}

function oslMarc(bf0, n, PHI0, PHI)
{
   return bf0 * (((1 + n + ((5 / 4) * Math.pow(n,2)) + ((5 / 4) * Math.pow(n,3))) * (PHI - PHI0)) - (((3 * n) + (3 * Math.pow(n,2)) +
          ((21 / 8) * Math.pow(n,3))) * (Math.sin(PHI - PHI0)) * (Math.cos(PHI + PHI0))) + ((((15 / 8) * Math.pow(n,2)) + ((15 / 8) *
          Math.pow(n,3))) * (Math.sin(2 * (PHI - PHI0))) * (Math.cos(2 * (PHI + PHI0)))) - (((35 / 24) * Math.pow(n,3)) *
          (Math.sin(3 * (PHI - PHI0))) * (Math.cos(3 * (PHI + PHI0)))));
}

function oslLatLonoslToOSGrid(PHI, LAM)
{
   var a = 6377563.396;
   var b = 6356256.910;
   var e0 = 400000;
   var n0 = -100000;
   var f0 = 0.999601272;
   var PHI0 = 49.00000;
   var LAM0 = -2.00000;

   var RadPHI = PHI * oslPiDiv180;
   var RadLAM = LAM * oslPiDiv180;
   var RadPHI0 = PHI0 * oslPiDiv180;
   var RadLAM0 = LAM0 * oslPiDiv180;
   var af0 = a * f0;
   var bf0 = b * f0;
   var e2 = (Math.pow(af0,2) - Math.pow(bf0,2)) / Math.pow(af0,2);
   var n = (af0 - bf0) / (af0 + bf0);
   var nu = af0 / (Math.sqrt(1 - (e2 * Math.pow(Math.sin(RadPHI),2) )));
   var rho = (nu * (1 - e2)) / (1 - (e2 * Math.pow(Math.sin(RadPHI),2) ));
   var eta2 = (nu / rho) - 1;
   var p = RadLAM - RadLAM0;
   var M = oslMarc(bf0, n, RadPHI0, RadPHI);
   var I = M + n0;
   var II = (nu / 2) * (Math.sin(RadPHI)) * (Math.cos(RadPHI));
   var III = ((nu / 24) * (Math.sin(RadPHI)) * (Math.pow(Math.cos(RadPHI),3))) * (5 - (Math.pow(Math.tan(RadPHI),2)) + (9 * eta2));
   var IIIA = ((nu / 720) * (Math.sin(RadPHI)) * (Math.pow(Math.cos(RadPHI),5))) * (61 - (58 * (Math.pow(Math.tan(RadPHI),2))) + (Math.pow(Math.tan(RadPHI),4)));
   var IV = nu * (Math.cos(RadPHI));
   var V = (nu / 6) * ( Math.pow(Math.cos(RadPHI),3)) * ((nu / rho) - (Math.pow(Math.tan(RadPHI),2)));
   var VI = (nu / 120) * (Math.pow(Math.cos(RadPHI),5)) * (5 - (18 * (Math.pow(Math.tan(RadPHI),2))) + (Math.pow(Math.tan(RadPHI),4)) + (14 * eta2) - (58 * (Math.pow(Math.tan(RadPHI),2)) * eta2));
   oslEastings = Math.round(e0 + (p * IV) + (Math.pow(p,3) * V) + (Math.pow(p,5) * VI));
   oslNorthings = Math.round(I + (Math.pow(p,2) * II) + (Math.pow(p,4) * III) + (Math.pow(p,6) * IIIA));
   oslNorthings -= 16; // the above calculations give a northings error of between 10-22m, so add a final adjustment so that the error is evened out and reduced to +/- 6m
}
//-----------------------------------------------------------------------------------------------------------------------------------------


function oslCaseCorrect(wrongcase)
{
   var loop;
   var correctedCase = '';
   for(loop=0;loop<wrongcase.length;loop++)
   {
      // capitalise first letter following one of these substrings
      if
      (
         (loop === 0)||
         (wrongcase[loop-1] == ' ')||
         (wrongcase[loop-1] == '(')||
         (wrongcase.substr(loop-3,3) == '-Y-')||
         (wrongcase.substr(loop-4,4) == '-YR-')
      ) correctedCase += wrongcase[loop].toUpperCase();
      else correctedCase += wrongcase[loop].toLowerCase();
   }
   // recapitalise any roman numerals
   correctedCase = correctedCase.replace(' Ii ',' II ');
   correctedCase = correctedCase.replace(' Iii ',' III ');
   correctedCase = correctedCase.replace(' Iv ',' IV ');
   correctedCase = correctedCase.replace(' Vi ',' VI ');
   correctedCase = correctedCase.replace(' Vii ',' VII ');
   return correctedCase;
}

function oslSaintsPreserveUs(oslName)
{
   var nameBits = [];
   if(oslName.indexOf('St ') != -1)
   {
      nameBits = oslName.split('St ');
      oslName = nameBits[0] + 'St. ' + nameBits[1];
   }
   else if(oslName.indexOf('Saint ') != -1)
   {
      nameBits = oslName.split('Saint ');
      oslName = nameBits[0] + 'St. ' + nameBits[1];
   }
   return oslName;
}

function oslWazeifyStreetName(oslName, debugOutput)
{
   var wazeName = '';
   var loop;

   wazeName = oslCaseCorrect(oslName);
   wazeName = oslSaintsPreserveUs(wazeName);

   var nameoslPieces = wazeName.split(' ');
   if(nameoslPieces.length > 1)
   {
      var dirSuffix = '';
      var namePrefix = '';
      if((nameoslPieces[nameoslPieces.length-1] == 'North')||(nameoslPieces[nameoslPieces.length-1] == 'South')||(nameoslPieces[nameoslPieces.length-1] == 'East')||(nameoslPieces[nameoslPieces.length-1] == 'West'))
      {
         dirSuffix = ' ' + nameoslPieces[nameoslPieces.length-1][0];
         for(loop=0;loop<nameoslPieces.length-1;loop++) namePrefix += (nameoslPieces[loop] + ' ');
      }
      else
      {
         for(loop=0;loop<nameoslPieces.length;loop++) namePrefix += (nameoslPieces[loop] + ' ');

      }
      namePrefix = namePrefix.trimRight(1);

      if(debugOutput === true) console.log(oslName);
      // replace road type with abbreviated form
      for(var pass=0;pass<2;pass++)
      {
         for(loop=0;loop<oslNameAbbreviations.length;loop+=2)
         {
            var abbrPos = namePrefix.lastIndexOf(oslNameAbbreviations[loop]);
            var abbrLen = oslNameAbbreviations[loop].length;
            var npLength = namePrefix.length;
            var npRemaining = npLength - abbrPos;
            if(debugOutput === true) console.log(pass,' ',oslNameAbbreviations[loop],' ',abbrPos,' ',abbrLen,' ',npLength,' ',npRemaining);
            if(abbrPos != -1)
            {
               // make sure the road type we've found comes firstly at the end of the name string, or is suffixed with a space
               // if there's a non-road type at the end of the string (e.g. High Road Eastcote)
               // isn't, then we've actually found a type match within a longer string segment (e.g. The Parkside) and so we
               // should leave it alone...
               if
               (
                  ((pass === 0) && (npRemaining == abbrLen)) ||
                  ((pass == 1) && (namePrefix[abbrPos+abbrLen] == ' '))
               )
               {
                  var preName = namePrefix.substr(0,abbrPos);
                  if((preName.length >= 4) && (preName.lastIndexOf("The") != (preName.length - 4)))
                  {
                     var theName = namePrefix.substr(abbrPos);
                     theName = theName.replace(oslNameAbbreviations[loop],oslNameAbbreviations[loop+1]);
                     wazeName = preName + theName + dirSuffix;
                     return wazeName;
                  }
               }
            }
         }
      }
      wazeName = namePrefix + dirSuffix;
   }
   return wazeName;
}

function oslCPDistance(cpE, cpN, posE, posN)
{
   return Math.round(Math.sqrt(((posE - cpE) * (posE - cpE)) + ((posN - cpN) * (posN - cpN))));
}

function oslVisualiseBoundingBox(boxW, boxE, boxS, boxN, mode)
{
   if(oslOSLDiv.style.height == '0px')
   {
      oslBBDiv.innerHTML = '';
      return;
   }

   if((mode == 1) || (mode == 2))
   {
      oslOSGBtoWGS(boxW,boxS);
      var lonlat_sw = new OL.LonLat(oslLongitude,oslLatitude);
      oslOSGBtoWGS(boxE,boxS);
      var lonlat_se = new OL.LonLat(oslLongitude,oslLatitude);
      oslOSGBtoWGS(boxW,boxN);
      var lonlat_nw = new OL.LonLat(oslLongitude,oslLatitude);
      oslOSGBtoWGS(boxE,boxN);
      var lonlat_ne = new OL.LonLat(oslLongitude,oslLatitude);

      lonlat_sw.transform(new OL.Projection("EPSG:4326"),new OL.Projection("EPSG:900913"));
      lonlat_se.transform(new OL.Projection("EPSG:4326"),new OL.Projection("EPSG:900913"));
      lonlat_nw.transform(new OL.Projection("EPSG:4326"),new OL.Projection("EPSG:900913"));
      lonlat_ne.transform(new OL.Projection("EPSG:4326"),new OL.Projection("EPSG:900913"));

      var pix_sw = W.map.getPixelFromLonLat(lonlat_sw);
      var pix_se = W.map.getPixelFromLonLat(lonlat_se);
      var pix_ne = W.map.getPixelFromLonLat(lonlat_ne);
      var pix_nw = W.map.getPixelFromLonLat(lonlat_nw);

      boxE = (pix_ne.x + pix_se.x) / 2;
      boxW = (pix_nw.x + pix_sw.x) / 2;
      boxN = (pix_ne.y + pix_nw.y) / 2;
      boxS = (pix_se.y + pix_sw.y) / 2;

      var boxToleranceWidth = ((boxE - boxW) * 0.05);
      var boxToleranceHeight = ((boxS - boxN) * 0.05);

      boxW -= boxToleranceWidth;
      boxE += boxToleranceWidth;
      boxS += boxToleranceHeight;
      boxN -= boxToleranceHeight;

      boxE = Math.round(boxE);
      boxW = Math.round(boxW);
      boxS = Math.round(boxS);
      boxN = Math.round(boxN);

      // extend width/height of box if the calculated dimension is too small for the box to be readily visible
      if(boxE-boxW < 20)
      {
         boxE += 10;
         boxW -= 10;
      }
      if(boxS-boxN < 20)
      {
         boxS += 10;
         boxN -= 10;
      }
   }

   if(mode === 0)
   {
      oslBBDivInnerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="'+document.getElementById('WazeMap').offsetWidth+'px" height="'+document.getElementById('WazeMap').offsetHeight+'px" version="1.1">';
   }
   else if(mode == 1)
   {
      oslBBDivInnerHTML += '<rect x="'+boxW+'" y="'+boxN+'" width="'+(boxE-boxW)+'" height="'+(boxS-boxN)+'" style="fill:yellow;stroke:pink;stroke-width:4;fill-opacity:0.25;stroke-opacity:0.25"/>';
   }
   else if(mode == 2)
   {
      oslBBDivInnerHTML += '<rect x="'+boxW+'" y="'+boxN+'" width="'+(boxE-boxW)+'" height="'+(boxS-boxN)+'" style="fill:lightgrey;stroke:grey;stroke-width:4;fill-opacity:0.25;stroke-opacity:0.25"/>';
   }
   else if(mode == 3)
   {
      oslBBDivInnerHTML += '</svg>';
      oslBBDiv.innerHTML = oslBBDivInnerHTML;
   }
}

function oslMergeGazetteerData()
{
   if((typeof(gazetteerDataA) == "undefined") || (typeof(gazetteerDataB) == "undefined")) return false;
   if(oslMergeGazData)
   {
      oslGazetteerData = gazetteerDataA;
      oslGazetteerData = oslGazetteerData.concat(gazetteerDataB);
      oslMergeGazData = false;
      for(var idx=0;idx<oslGazetteerData.length;idx++)
      {
         oslGazetteerData[idx] = oslSaintsPreserveUs(oslGazetteerData[idx]);
      }
      oslAddLog('gazetteer data loaded, '+oslGazetteerData.length+' entries');
   }
   return true;
}

function oslGetNearbyCityNames()
{
   if(oslMergeGazetteerData() === false) return;

   var names = [];
   for(var idx=0;idx<oslGazetteerData.length;idx++)
   {
      var gazElements = oslGazetteerData[idx].split(':');
      var cnNorthings = (gazElements[1] * 1000) + 500;
      var cnEastings = (gazElements[2] * 1000) + 500;
      if((Math.abs(cnNorthings-oslNorthings) <= 5000)&&(Math.abs(cnEastings-oslEastings) <= 5000))
      {
         var dist = oslCPDistance(cnEastings,cnNorthings,oslEastings,oslNorthings);
         if(dist <= 5000)
         {
            names.push((dist * 1000000) + idx);
         }
      }
   }
   if(names.length > 1) names.sort(function(a,b){return a-b;});

   var cityInTopTen = false;
   var matchedOSName = false;
   var matchedIdx = -1;
   var listLength = names.length;
   if(listLength > 10) listLength = 10;

   var listOpt;
   var gElements;
   var gDist;

   var cityName;

   var oOCN = document.getElementById('oslOSCityNames');
   for(idx=0;idx<listLength;idx++)
   {
      gElements = oslGazetteerData[names[idx] % 1000000].split(':');
      gDist = (Math.round(names[idx] / 100000000)/10);

      // Build namestring for entry in the drop-down list - start with the placename :-)
      listOpt = document.createElement('option');
      cityName = gElements[0];
      listOpt.text = cityName;

      // if the name is neither a city nor unique, append a (county) suffix
      if(gElements[4] == 'C') cityInTopTen = true;
      else
      {
         if(oslCheckCityNameDuplicates(gElements[0],1) > 1)
         {
            var countyIdx = oslCountyAbbreviations.indexOf(gElements[3]);
            if(countyIdx != -1)
            {
               listOpt.text += ', '+oslCountyAbbreviations[countyIdx+1];
            }
         }
      }

      if(sessionStorage.cityNameRB == 'optUseOS')
      {
         if(cityName == sessionStorage.myCity)
         {
            matchedOSName = true;
            matchedIdx = idx;
         }
      }

      // Add place type and distance in [] brackets to allow easy removal later...
      if(gElements[4] == 'C') listOpt.text += ' [City, ';
      else if(gElements[4] == 'T') listOpt.text += ' [Town, ';
      else listOpt.text += ' [Other, ';
      listOpt.text += gDist + 'km]';
      oOCN.add(listOpt,null);
   }

   if((!cityInTopTen) && (names.length > 10))
   {
      idx = 10;
      while((idx < names.length) && (!cityInTopTen))
      {
         gElements = oslGazetteerData[names[idx] % 1000000].split(':');
         if(gElements[4] == 'C')
         {
            cityInTopTen = true;
            gDist = ' [City, '+(Math.round(names[idx] / 100000000)/10)+'km]';
            listOpt = document.createElement('option');
            listOpt.text = gElements[0]+gDist;
            oOCN.add(listOpt,null);
            if(sessionStorage.cityNameRB == 'optUseOS')
            {
               if(gElements[0] == sessionStorage.myCity)
               {
                  matchedOSName = true;
                  matchedIdx = 10;
                  break;
               }
            }
         }
         idx++;
      }
   }

   if(matchedOSName === true) oOCN.options.selectedIndex = matchedIdx;

   if((sessionStorage.cityNameRB == 'optUseOS') && (matchedOSName === false))
   {
      oslAddLog('Selected city name no longer in nearby OS list...');
      alert('City name no longer present in nearby OS data, please reselect');
      sessionStorage.cityNameRB = 'optUseExisting';
      document.getElementById('optUseExisting').checked = true;
   }
}

function oslCheckCityNameDuplicates(cityName, mode)
{
   if(oslMergeGazetteerData() === false) return;

   var cnCount = 0;
   var searchDist = Math.round(oslGazetteerData.length/2);
   var searchIdx = searchDist;
   var hasCounty = false;

   var debugOutput = false;


   // remove county suffix from actual city name string if present
   if(cityName.indexOf('(') != -1)
   {
      cityName = cityName.substr(0,cityName.indexOf('('));
      cityName = cityName.replace(/^\s+|\s+$/g, "");
      hasCounty = true;
   }
   // remove script-appended county suffix from city name held in drop down if present
   if(cityName.indexOf(',') != -1)
   {
      cityName = cityName.substr(0,cityName.indexOf(','));
      cityName = cityName.replace(/^\s+|\s+$/g, "");
   }

   cityName = cityName.toLowerCase();
   cityName = cityName.replace(/-/g, ' ');
   var gazName = '';

   if(debugOutput === true) console.log('scan for duplicates of '+cityName);

   var gazElements = [];
   while((searchDist > 1) && (cityName.localeCompare(gazName) !== 0))
   {
      searchDist = Math.round(searchDist/2);
      gazElements = oslGazetteerData[searchIdx].split(':');
      gazName = gazElements[0].toLowerCase();
      gazName = gazName.replace(/-/g, ' ');
      if(debugOutput === true) console.log('a: '+searchDist+' '+searchIdx+' '+gazName);
      if(cityName.localeCompare(gazName) > 0) searchIdx += searchDist;
      else if(cityName.localeCompare(gazName) < 0) searchIdx -= searchDist;
      if(searchIdx >= oslGazetteerData.length) searchIdx = oslGazetteerData.length-1;
      if(searchIdx < 0) searchIdx = 0;
   }
   gazElements = oslGazetteerData[searchIdx].split(':');
   gazName = gazElements[0].toLowerCase();
   gazName = gazName.replace(/-/g, ' ');
   while((searchIdx > 0) && (cityName.localeCompare(gazName) <= 0))
   {
      gazElements = oslGazetteerData[--searchIdx].split(':');
      gazName = gazElements[0].toLowerCase();
      gazName = gazName.replace(/-/g, ' ');
      if(debugOutput === true) console.log('b: '+(searchIdx)+' '+gazName);
   }
   gazElements = oslGazetteerData[searchIdx].split(':');
   gazName = gazElements[0].toLowerCase();
   gazName = gazName.replace(/-/g, ' ');
   while((searchIdx < oslGazetteerData.length) && (cityName.localeCompare(gazName) > 0))
   {
      gazElements = oslGazetteerData[++searchIdx].split(':');
      gazName = gazElements[0].toLowerCase();
      gazName = gazName.replace(/-/g, ' ');
      if(debugOutput === true) console.log('c: '+(searchIdx)+' '+gazName);
   }
   while((cityName.localeCompare(gazName) === 0) && (searchIdx < oslGazetteerData.length))
   {
      cnCount++;
      gazElements = oslGazetteerData[++searchIdx].split(':');
      gazName = gazElements[0].toLowerCase();
      gazName = gazName.replace(/-/g, ' ');
      if(debugOutput === true) console.log('d: '+(searchIdx)+' '+gazName+' '+cnCount);
   }

   if(mode === 0)
   {
      var newHTML = '';
      if(cnCount === 0) newHTML = '&nbsp;&nbsp;Place name is not in OS data';
      else if(cnCount == 1)
      {
         newHTML = '&nbsp;&nbsp;Place name is unique';
         if(hasCounty) newHTML += '<br>&nbsp;&nbsp;<i>(County) suffix not required</i>';
      }
      else
      {
         newHTML = '&nbsp;&nbsp;Place name is not unique';
      }
      document.getElementById('oslCNInfo').innerHTML = newHTML;
   }
   else return cnCount;
}

function oslHighlightAdjacentSameNameSegments(ldEastings, ldNorthings, ldIgnoreIdx, srcElements)
{
   ldNorthings -= oslLocatorBlockSize;
   ldEastings -= oslLocatorBlockSize;
   for(var x = 0; x < 3; ++x)
   {
      for(var y = 0; y < 3; ++y)
      {
         var arrayName = 'locatorData_'+(ldEastings + (x * oslLocatorBlockSize))+'_'+(ldNorthings + (y * oslLocatorBlockSize));
         oslEvalString = 'typeof '+arrayName;
         if(eval(oslEvalString) != "undefined")
         {
            oslEvalString = 'oslBlockData = '+arrayName;
            eval(oslEvalString);
            for(var loop = 0; loop < oslBlockData.length; ++loop)
            {
               if(loop != ldIgnoreIdx)
               {
                  var locatorElements = oslBlockData[loop].split(':');
                  if
                  (
                     (locatorElements[oslElmA] == srcElements[oslElmA]) &&
                     (locatorElements[oslElmB] == srcElements[oslElmB]) &&
                     (locatorElements[oslElmG] == srcElements[oslElmG])
                  )
                  {
                     oslVisualiseBoundingBox(locatorElements[oslElmC],locatorElements[oslElmD],locatorElements[oslElmE],locatorElements[oslElmF],2);
                  }
               }
            }
         }
      }
   }
}

function oslRadioClick()
{
   var oslElements = document.getElementById('oslOSLDiv');
   var selectedName = '';
   var loop;
   var roadData;
   var locatorElements;
   var tagname;
   var attr;
   var oslID;
   var evalstr;

   for(loop=0;loop<oslElements.childNodes.length;loop++)
   {
      if(oslElements.childNodes[loop].nodeType == 1)
      {
         tagname = oslElements.childNodes[loop].tagName;
         if(tagname !== null)
         {
            if(tagname == "LABEL")
            {
               if(oslElements.childNodes[loop].childNodes[0].checked)
               {
                  attr = oslElements.childNodes[loop].childNodes[0].attributes.getNamedItem("id").value;
                  if(attr.indexOf('oslID_') === 0)
                  {
                     roadData = '';
                     oslID = attr.split('_');
                     if(oslID[1] != 'null')
                     {
                        evalstr = 'var roadData = locatorData_'+oslID[1]+'_'+oslID[2]+'['+oslID[3]+']';
                        eval(evalstr);
                     }
                     else
                     {
                        roadData = "null:null";
                     }
                     locatorElements = roadData.split(":");
                     if(locatorElements[oslElmA] != 'null')
                     {
                        selectedName = locatorElements[oslElmA]+locatorElements[oslElmB];
                        oslVisualiseBoundingBox(0,0,0,0,0);
                        oslVisualiseBoundingBox(locatorElements[oslElmC],locatorElements[oslElmD],locatorElements[oslElmE],locatorElements[oslElmF],1);

                        oslHighlightAdjacentSameNameSegments(oslID[1], oslID[2], oslID[3], locatorElements);
                     }
                     else
                     {
                        oslBBDiv.innerHTML = '';
                     }
                  }
               }
            }
         }
      }
   }

   if(selectedName === '')
   {
      oslBBDiv.innerHTML = '';
      return;
   }
   oslVisualiseBoundingBox(0,0,0,0,3);
}

function oslClick()
{
   var cityName = '';
   var countyName = '';
   var usingNewName = false;
   if(document.getElementById('optUseNewManual').checked)
   {
      cityName = oslCaseCorrect(document.getElementById('myCityName').value);
      usingNewName = true;
   }
   else if(document.getElementById('optUseExistingWME').checked)
   {
      var oWCN = document.getElementById('oslWMECityNames');
      cityName = oWCN.options[oWCN.options.selectedIndex].text;
      if(cityName.indexOf(', ') !== -1)
      {
         countyName = cityName.split(', ')[1];
         cityName = cityName.split(', ')[0];
      }
      usingNewName = true;
   }
   else if(document.getElementById('optUseOS').checked)
   {
      var oOCN = document.getElementById('oslOSCityNames');
      cityName = oOCN.options[oOCN.options.selectedIndex].text;
      cityName = cityName.substring(0,cityName.indexOf('[')-1);
      if(cityName.indexOf(', ') !== -1)
      {
         countyName = cityName.split(', ')[1];
         cityName = cityName.split(', ')[0];
      }
      usingNewName = true;
   }
   if(sessionStorage.myCity === '')
   {
      oslAddLog('Update city name position at '+oslEastings+'x'+oslNorthings);
      sessionStorage.cityChangeEastings = oslEastings;
      sessionStorage.cityChangeNorthings = oslNorthings;
   }

   if(countyName !== '')
   {
      sessionStorage.myCity = cityName+', '+countyName;
   }
   else
   {
      sessionStorage.myCity = cityName;
   }

   var useName = false;
   if((cityName.length > 0) && usingNewName)
   {
      oslCheckCityNameDuplicates(cityName,0);

      if(cityName != sessionStorage.prevCityName)
      {
         oslAddLog('Change of city name at '+oslEastings+'x'+oslNorthings);
         sessionStorage.cityChangeEastings = oslEastings;
         sessionStorage.cityChangeNorthings = oslNorthings;
         sessionStorage.prevCityName = cityName;
         useName = true;
      }
      else
      {
         var nameChangeDist = oslCPDistance(oslEastings,oslNorthings,sessionStorage.cityChangeEastings,sessionStorage.cityChangeNorthings);
         oslAddLog('Current name was set '+nameChangeDist+'m away from segment location');
         if(nameChangeDist > 1000)
         {
            oslAddLog('Distance exceeds 1km threshold, name verification required...');
            if(confirm('Confirm continued use of this city name'))
            {
               oslAddLog('Confirm city name at '+oslEastings+'x'+oslNorthings);
               sessionStorage.cityChangeEastings = oslEastings;
               sessionStorage.cityChangeNorthings = oslNorthings;
               useName = true;
            }
         }
         else
         {
            useName = true;
         }
      }
   }

   var oslElements = document.getElementById('oslOSLDiv');
   for(var loop=0;loop<oslElements.childNodes.length;loop++)
   {
      if(oslElements.childNodes[loop].nodeType == 1)
      {
         var tagname = oslElements.childNodes[loop].tagName;
         if(tagname !== null)
         {
            if(tagname == "LABEL")
            {
               var rbElement = oslElements.childNodes[loop].childNodes[0];
               if(rbElement.checked)
               {
                  var attr = rbElement.attributes.getNamedItem("id").value;
                  if(attr.indexOf('oslID_') === 0)
                  {
                     var roadData = '';
                     var oslID = attr.split('_');
                     if(oslID[1] != 'null')
                     {
                        var evalstr = 'var roadData = locatorData_'+oslID[1]+'_'+oslID[2]+'['+oslID[3]+']';
                        eval(evalstr);
                     }
                     else
                     {
                        roadData = ":";
                     }
                     var locatorElements = roadData.split(":");
                     // auto-click the Edit Address link...
                     document.getElementsByClassName('full-address-container')[0].children[0].click();

                     // make sure the Country field is set to "United Kingdom"
                     var snelm = document.getElementsByClassName('country-id')[0];
                     if(snelm.value != 234) snelm.value = 234;
                     snelm.dispatchEvent(new Event('change', { 'bubbles': true }));

                     // fill in the City field
                     snelm = document.getElementsByClassName('city-name')[0];
                     if(usingNewName)
                     {
                        if(document.getElementById('optUseNewManual').checked === true)
                        {
                           sessionStorage.cityNameRB = 'optUseNewManual';
                        }
                        else if(document.getElementById('optUseExistingWME').checked === true)
                        {
                           sessionStorage.cityNameRB = 'optUseExistingWME';
                        }
                        else if(document.getElementById('optUseOS').checked === true)
                        {
                           sessionStorage.cityNameRB = 'optUseOS';
                        }
                        if(useName)
                        {
                           snelm.value = cityName;
                           snelm.disabled = false;
                           snelm.dispatchEvent(new Event('change', { 'bubbles': true }));
                           snelm = document.getElementsByClassName('empty-city')[0];
                           snelm.checked = false;
                           snelm.dispatchEvent(new Event('change', { 'bubbles': true }));

                           if(countyName !== '')
                           {
                              // set the county field if one was provided with the selected city name
                              var countyIdx;
                              for(countyIdx = 0; countyIdx < document.getElementsByClassName('state-id')[0].options.length; countyIdx++)
                              {
                                 if(document.getElementsByClassName('state-id')[0].options[countyIdx].innerHTML == countyName)
                                 {
                                    document.getElementsByClassName('state-id')[0].options.selectedIndex = countyIdx;
                                    document.getElementsByClassName('state-id')[0].dispatchEvent(new Event('change', { 'bubbles': true }));
                                    break;
                                 }
                              }
                           }
                        }
                     }
                     else if(document.getElementById('optClearExisting').checked === true)
                     {
                        sessionStorage.cityNameRB = 'optClearExisting';
                        snelm.disabled = true;
                        snelm.dispatchEvent(new Event('change', { 'bubbles': true }));
                        snelm = document.getElementsByClassName('empty-city')[0];
                        snelm.checked = true;
                        snelm.dispatchEvent(new Event('change', { 'bubbles': true }));
                     }
                     else
                     {
                        sessionStorage.cityNameRB = 'optUseExisting';
                     }

                     // finally the Street field
                     var oslName = locatorElements[oslElmB];
                     if((locatorElements[oslElmA].length > 0)&&(locatorElements[oslElmB].length > 0)) oslName += ' - ';
                     if((oslName.length > 0)||(locatorElements[oslElmA].length > 0))
                     {
                        oslName += oslWazeifyStreetName(locatorElements[oslElmA], false);
                        oslPrevStreetName = oslName;
                        snelm = document.getElementsByClassName('street-name')[0];
                        snelm.value = oslName;
                        snelm.disabled = false;
                        snelm.dispatchEvent(new Event('change', { 'bubbles': true }));
                        snelm = document.getElementsByClassName('empty-street')[0];
                        snelm.checked = false;
                        snelm.dispatchEvent(new Event('change', { 'bubbles': true }));
                     }
                     else
                     {
                        snelm = document.getElementsByClassName('street-name')[0];
                        snelm.value = '';
                        snelm.disabled = true;
                        snelm.dispatchEvent(new Event('change', { 'bubbles': true }));
                        snelm = document.getElementsByClassName('empty-street')[0];
                        snelm.checked = true;
                        snelm.dispatchEvent(new Event('change', { 'bubbles': true }));
                     }

                     if(oslAdvancedMode)
                     {
                        // auto-click the Apply button...
                        document.getElementsByClassName('address-form')[0].getElementsByClassName('save-button')[0].click();
                     }
                  }
               }
            }
         }
      }
   }
}

function oslMatch(oslLink, oslArea, oslRadioID)
{
   this.oslLink = oslLink;
   this.oslArea = oslArea;
   this.oslRadioID = oslRadioID;
}

function oslSortCandidates(a,b)
{
   var x = a.oslArea;
   var y = b.oslArea;
   return((x<y) ? -1 : ((x>y) ? 1 : 0));
}

function oslCityNameKeyup()
{
   oslCheckCityNameDuplicates(oslCaseCorrect(document.getElementById('myCityName').value),0);
   document.getElementById('optUseNewManual').checked = true;
}

function oslSelectWMEName()
{
   var oWCN = document.getElementById('oslWMECityNames');
   var cityName = oWCN.options[oWCN.options.selectedIndex].text;
   oslCheckCityNameDuplicates(cityName,0);
   document.getElementById('optUseExistingWME').checked = true;
}

function oslSelectOSName()
{
   var oOCN = document.getElementById('oslOSCityNames');
   var cityName = oOCN.options[oOCN.options.selectedIndex].text;
   cityName = cityName.substring(0,cityName.indexOf('[')-1);
   document.getElementById('optUseOS').checked = true;
   document.getElementById('oslCNInfo').innerHTML = '';
}

function oslBlockCacheObj(blockName)
{
   this.blockName = blockName;
   this.lastAccessed = Math.floor(new Date().getTime() / 1000);
}

function oslLoadBlocks()
{
   for(var i = 0; i < oslBlocksToLoad.length;)
   {
      // inject block data
      var script = document.createElement("script");
      script.setAttribute('type','text/javascript');
      script.setAttribute('charset','windows-1252');
      script.src = oslBlocksToLoad[i];
      document.head.appendChild(script);
      oslOSLDiv.innerHTML = 'Loading new OS data...';
      oslLoadingMsg = true;
      oslBlockCacheList.push(new oslBlockCacheObj(oslBlocksToLoad[i+1]));
      i += 2;
   }
}

function oslToOSGrid(lat, lon, mode)
{
   if(oslInUK === false) return;

   var loop;
   var i;
   var x;
   var y;
   var eBlock_point;
   var nBlock_point;
   var eBlock;
   var nBlock;

   if((lat !== 0) && (mode != 3))
   {
      if(mode == 2)
      {
         oslEastings = lat;
         oslNorthings = lon;
      }
      else
      {
         oslLatitude = lat;
         oslLongitude = lon;
         oslWGStoOSGB();
      }
   }

   if((mode == 1) || (mode == 2))  // OS Locator lookup
   {
      // determine which grid block contains the current mouse position
      eBlock_point = (Math.floor(oslEastings/oslLocatorBlockSize)) * oslLocatorBlockSize;
      nBlock_point = (Math.floor(oslNorthings/oslLocatorBlockSize)) * oslLocatorBlockSize;

      var candidates = [];
      oslBlocksToLoad = [];
      var arrayName;
      var oslEvalString;

      for(x = -1; x < 2; x++)
      {
         for(y = -1; y < 2; y++)
         {
            eBlock = (eBlock_point + (oslLocatorBlockSize * x));
            nBlock = (nBlock_point + (oslLocatorBlockSize * y));
            // check we're within the outer bounds of the current OS dataset...
            if
               (
                  (eBlock >= 64000) &&
                  (eBlock <= 655999) &&
                  (nBlock >= 8000) &&
                  (nBlock <= 1214999)
               )
            {
               arrayName = 'locatorData_'+eBlock+'_'+nBlock;

               // check to see if there's a corresponding array already loaded...
               oslEvalString = 'typeof '+arrayName;

               if(eval(oslEvalString) == "undefined")
               {
                  oslBlocksToLoad.push('https://chizzum.com/greasemonkey/osl_v10/'+Math.floor(eBlock / 100000)+'/'+Math.floor(nBlock / 100000)+'/'+arrayName+'.user.js');
                  oslBlocksToLoad.push(arrayName);
               }
            }
         }
      }

      if(oslBlocksToLoad.length > 0)
      {
         oslLoadBlocks();
      }

      oslOSLDiv.innerHTML = '';
      candidates = [];
      if(mode == 1) candidates[candidates.length++] = new oslMatch('<label style="display:inline;"><input type="radio" name="oslChoice" id="oslID_null_null_null" />Un-named segment</label><br>',1000000000000,'oslID_null_null_null');

      for(x = -1; x < 2; x++)
      {
         for(y = -1; y < 2; y++)
         {
            eBlock = (eBlock_point + (oslLocatorBlockSize * x));
            nBlock = (nBlock_point + (oslLocatorBlockSize * y));

            // check we're within the outer bounds of the current OS dataset...
            if
               (
                  (eBlock >= 64000) &&
                  (eBlock <= 655999) &&
                  (nBlock >= 8000) &&
                  (nBlock <= 1214999)
               )
            {
               arrayName = 'locatorData_'+eBlock+'_'+nBlock;
               oslEvalString = 'typeof '+arrayName;
               if(eval(oslEvalString) != "undefined")
               {
                  oslLoadingMsg = false;
                  // yes...  make a local copy to avoid having an eval() in each iteration of the loop
                  if((eBlock != oslEvalEBlock) || (nBlock != oslEvalNBlock))
                  {
                     oslEvalEBlock = eBlock;
                     oslEvalNBlock = nBlock;
                     var evalstr = 'oslBlockData = locatorData_'+eBlock+'_'+nBlock;
                     eval(evalstr);
                  }

                  for (var bcObj in oslBlockCacheList)
                  {
                     if(oslBlockCacheList[bcObj].blockName == arrayName)
                     {
                        oslBlockCacheList[bcObj].lastAccessed = Math.floor(new Date().getTime() / 1000);
                     }
                  }

                  var bdstr = '';
                  var preselect = false;

                  for(loop = 0;loop < oslBlockData.length; loop++)
                  {
                     var locatorElements = [];
                     // for each entry in the array, test the centrepoint position to see if it lies within the bounding box for that entry
                     // note that we allow a 30m tolerance on all sides of the box to allow for inaccuracies in the latlon->gridref conversion,
                     // and to increase the chance of a successful match when the road runs E-W or N-S and thus has a long but narrow bounding box

                     // the following block of code more or less replicates the string.split() method, but is around 2x faster in the Chrome
                     // JS engine...
                     if(navigator.userAgent.indexOf("Chrome") != -1)
                     {
                        bdstr = oslBlockData[loop];
                        while(bdstr.indexOf(':') != -1)
                        {
                           locatorElements.push(bdstr.substr(0,bdstr.indexOf(':')));
                           bdstr = bdstr.substr(bdstr.indexOf(':')+1);
                        }
                        locatorElements.push(bdstr);
                     }
                     else
                     {
                        locatorElements = oslBlockData[loop].split(':');
                     }

                     var tolE;
                     var tolN;
                     if(mode == 2)
                     {
                        // wider tolerance when doing a namecheck lookup, to reduce falsely flagging roads as being mis-named
                        tolE = 20;
                        tolN = 30;
                     }
                     else
                     {
                        // tighter tolerance when doing other lookups
                        tolE = 10;
                        tolN = 20;
                     }
                     var bbW = parseInt(locatorElements[oslElmC]) - tolE;
                     var bbE = parseInt(locatorElements[oslElmD]) + tolE;
                     var bbS = parseInt(locatorElements[oslElmE]) - tolN;
                     var bbN = parseInt(locatorElements[oslElmF]) + tolN;

                     var streetName = '';
                     if(locatorElements[oslElmB].length > 0)
                     {
                        streetName += locatorElements[oslElmB];
                        if(locatorElements[oslElmA].length > 0)
                        {
                           streetName += ' - ';
                        }
                     }
                     streetName += oslWazeifyStreetName(locatorElements[oslElmA], false);

                     if((mode == 1)&&(oslEastings>=bbW)&&(oslEastings<=bbE)&&(oslNorthings>=bbS)&&(oslNorthings<=bbN))
                     {
                        var radioID = 'oslID_'+eBlock+'_'+nBlock+'_'+loop;
                        var oslLink = '<label style="display:inline;"><input type="radio" name="oslChoice" id="'+radioID+'"';
                        if((streetName == oslPrevStreetName)&&(preselect === false))
                        {
                           oslLink += 'checked="true"';
                           preselect = true;
                        }
                        oslLink += '/>'+streetName+'&nbsp;&nbsp;[<i>'+locatorElements[oslElmG]+'</i>]</label><br>';
                        var area = ((bbE-bbW) * (bbN-bbS));
                        candidates[candidates.length++] = new oslMatch(oslLink,area,radioID);
                     }
                     else if(mode == 2)
                     {
                        // NameCheck comparisons...
                        for(i=0;i<oslOSLNCSegments.length;i++)
                        {
                           if(oslOSLNCSegments[i].match === false)
                           {
                              if
                                 (
                                    ((oslOSLNCSegments[i].eastingsA >= bbW) && (oslOSLNCSegments[i].eastingsA <= bbE)) &&
                                    ((oslOSLNCSegments[i].eastingsB >= bbW) && (oslOSLNCSegments[i].eastingsB <= bbE)) &&
                                    ((oslOSLNCSegments[i].northingsA >= bbS) && (oslOSLNCSegments[i].northingsA <= bbN)) &&
                                    ((oslOSLNCSegments[i].northingsB >= bbS) && (oslOSLNCSegments[i].northingsB <= bbN))
                                 )
                              {
                                 if(oslOSLNCSegments[i].streetname == streetName) oslOSLNCSegments[i].match = true;
                              }
                           }
                        }
                     }
                  }
               }
            }
         }
      }


      if(mode == 1)
      {
         var newHTML = '<b>OSL matches';
         newHTML += ' at '+oslEastings+','+oslNorthings+'</b>';

         if(candidates.length > 0)
         {
            var btnStyle = "cursor:pointer;";
            btnStyle += "font-size:14px;";
            btnStyle += "border: thin outset black;";
            btnStyle += "padding:2px 10px 2px 10px;";
            btnStyle += "background: #ccccff;";
            newHTML += '<div style="margin:10px;"><span id="oslSelect" style="'+btnStyle+'">';
            if(oslAdvancedMode) newHTML += 'Apply to Properties';
            else newHTML += 'Copy to Properties';
            newHTML += '</span></div>';
            if(candidates.length > 1) candidates.sort(oslSortCandidates);
            for(loop=0;loop<candidates.length;loop++)
            {
               newHTML += candidates[loop].oslLink;
            }
            newHTML += '<br>City name:<br>';
            newHTML += '<label style="display:inline;"><input type="radio" name="oslCityNameOpt" id="optUseExisting"/>Use existing segment name(s)</label><br>';
            newHTML += '<label style="display:inline;"><input type="radio" name="oslCityNameOpt" id="optClearExisting" />Clear existing segment name(s)</label><br>';
            newHTML += '<label style="display:inline;"><input type="radio" name="oslCityNameOpt" id="optUseNewManual" />Use new name:</label><br>';
            newHTML += '&nbsp;&nbsp;<input id="myCityName" style="font-size:14px; line-height:16px; height:22px; margin-bottom:4px; transition:none; focus:none; box-shadow:none" type="text"';
            if(sessionStorage.cityNameRB == 'optUseNewManual') newHTML += 'value="'+sessionStorage.myCity+'"/><br>';
            else newHTML += 'value=""/><br>';
            newHTML += '<label style="display:inline;"><input type="radio" name="oslCityNameOpt" id="optUseExistingWME" />Use name from map:</label><br>';
            newHTML += '&nbsp;&nbsp;<select id="oslWMECityNames"></select><br>';
            newHTML += '<label style="display:inline;"><input type="radio" name="oslCityNameOpt" id="optUseOS" />Use name from OS Gazetteer:</label><br>';
            newHTML += '&nbsp;&nbsp;<select id="oslOSCityNames"></select><br>';
            newHTML += '<div id="oslCNInfo"></div><br>';
            oslOSLDiv.innerHTML = newHTML;
            oslGetNearbyCityNames();
            var oWCN = document.getElementById('oslWMECityNames');
            var nameList = [];
            for(var cityObj in W.model.cities.objects)
            {
               if(W.model.cities.objects.hasOwnProperty(cityObj))
               {
                  var cityname = W.model.cities.objects[cityObj].attributes.name;
                  if(cityname !== '')
                  {
                     var countyID = [];
                     countyID[0] = W.model.cities.objects[cityObj].attributes.stateID;
                     var countyName = W.model.states.getByIds(countyID)[0].name;
                     if(countyName !== '')
                     {
                        cityname += ', '+countyName;
                     }
                     nameList.push(cityname);
                  }
               }
            }
            nameList.sort();
            var matchedWMEName = false;
            for(i=0; i<nameList.length; i++)
            {
               var listOpt = document.createElement('option');
               listOpt.text = nameList[i];
               oWCN.add(listOpt,null);
               if(sessionStorage.cityNameRB == 'optUseExistingWME')
               {
                  if(nameList[i] == sessionStorage.myCity)
                  {
                     oWCN.options.selectedIndex = i;
                     matchedWMEName = true;
                  }
               }
            }
            if((!matchedWMEName) && (sessionStorage.cityNameRB == 'optUseExistingWME'))
            {
               oWCN.options.selectedIndex = 0;
            }
            document.getElementById('oslSelect').addEventListener("click", oslClick, true);
            document.getElementById('oslWMECityNames').addEventListener("click", oslSelectWMEName, true);
            document.getElementById('optUseExistingWME').addEventListener("click", oslSelectWMEName, true);
            document.getElementById('oslOSCityNames').addEventListener("click", oslSelectOSName, true);
            document.getElementById('optUseOS').addEventListener("click", oslSelectOSName, true);
            document.getElementById('myCityName').addEventListener("keyup", oslCityNameKeyup, true);
            document.getElementById('optUseNewManual').addEventListener("click", oslCityNameKeyup, true);
            for(loop=0;loop<candidates.length;loop++)
            {
               document.getElementById(candidates[loop].oslRadioID).addEventListener("click", oslRadioClick, true);
            }

            document.getElementById(sessionStorage.cityNameRB).checked = true;
         }
         else oslOSLDiv.innerHTML = newHTML;
      }



   }
   if(mode == 3)  // PRN check
   {
      var eastingsLeft = (Math.floor(oslVPLeft/20000)) * 20000;
      var eastingsRight = (Math.floor(oslVPRight/20000)) * 20000;
      var northingsTop = (Math.floor(oslVPTop/20000)) * 20000;
      var northingsBottom = (Math.floor(oslVPBottom/20000)) * 20000;

      var highlightMode = 0;
      oslPendingPRNBlocks = [];

      for(var eLoop = eastingsLeft; eLoop <= eastingsRight; eLoop += 20000)
      {
         for(var nLoop = northingsBottom; nLoop <= northingsTop; nLoop += 20000)
         {
            highlightMode = oslHighlightPRN(eLoop,nLoop,highlightMode);
         }
      }
      oslHighlightPRN(0,0,2);
   }

   else return '?e='+oslEastings+'&n='+oslNorthings;
}

function oslRemoveDirSuffix(currentName, dirSuffix)
{
   var dPos = currentName.indexOf(dirSuffix);
   if(dPos != -1)
   {
      var dLength = dirSuffix.length;
      currentName = currentName.substr(0,dPos) + currentName.substr(dPos+dLength);
   }
   return currentName;
}

function oslNameCheckTrigger()
{
   oslOSLNameCheckTimer = 2;
}

function oslNameComparison()
{
   for(;oslONC_E<=oslEBlock_max;)
   {
      for(;oslONC_N<=oslNBlock_max;)
      {
         oslToOSGrid(oslONC_E*oslLocatorBlockSize, oslONC_N*oslLocatorBlockSize, 2);
         if(oslLoadingMsg === true)
         {
            setTimeout(oslNameComparison,500);
            return;
         }
         oslONC_N++;
      }
      oslONC_N = oslNBlock_min;
      oslONC_E++;
   }
   for(var i=0;i<oslOSLNCSegments.length;i++)
   {
      if(oslOSLNCSegments[i].match === false)
      {
         var pline = oslOSLNCSegments[i].pline;
         pline.setAttribute("stroke","#000000");
         pline.setAttribute("stroke-opacity","0.5");
         pline.setAttribute("stroke-width","9");
         pline.setAttribute("stroke-dasharray","none");
      }
   }
}

function oslNCCandidateNew(pline, eastingsA, northingsA, eastingsB, northingsB, streetname)
{
   this.pline = pline;
   this.eastingsA = eastingsA;
   this.northingsA = northingsA;
   this.eastingsB = eastingsB;
   this.northingsB = northingsB;
   this.streetname = streetname;
   this.match = false;
}

function oslNCStateChange()
{
   if(document.getElementById('_cbNCEnabled').checked === false)
   {
      for(var segObj in W.model.segments.objects)
      {
         if(W.model.segments.objects.hasOwnProperty(segObj))
         {
            var seg = W.model.segments.objects[segObj];
            var pline = document.getElementById(seg.geometry.id);
            if(pline !== null)
            {
               pline.setAttribute("stroke-width","5");
               pline.setAttribute("stroke","#dd7700");
               pline.setAttribute("stroke-opacity","0.001");
               pline.setAttribute("stroke-dasharray","none");
            }
         }
      }
   }
   else
   {
      if(W.map.getZoom() >= 4) oslNameCheck();
   }
}

function oslPRNStateChange()
{
   if(document.getElementById('_cbPRNEnabled').checked === true)
   {
      if(oslInUK === true)
      {
         // recalculate the map viewport extents in terms of oslEastings/oslNorthings
         var vpHalfWidth = (W.map.getExtent().right-W.map.getExtent().left) / (2 * 1.61);
         var vpHalfHeight = (W.map.getExtent().top-W.map.getExtent().bottom) / (2 * 1.61);

         oslVPLeft = oslEastings - vpHalfWidth;
         oslVPRight = oslEastings + vpHalfWidth;
         oslVPBottom = oslNorthings - vpHalfHeight;
         oslVPTop = oslNorthings + vpHalfHeight;

         oslToOSGrid(oslEastings,oslNorthings,3);
      }
      else
      {
         oslHighlightPRN(0,0,3);
      }
   }
   else oslHighlightPRN(0,0,3);
}

function oslNameCheck()
{
   if((document.getElementById('_cbNCEnabled').checked === false) || (W.map.getZoom() < 4)) return;


   var geoCenter=new OL.LonLat(W.map.getCenter().lon,W.map.getCenter().lat);
   geoCenter.transform(new OL.Projection("EPSG:900913"),new OL.Projection("EPSG:4326"));
   oslToOSGrid(geoCenter.lat, geoCenter.lon, 0);
   if(oslLoadingMsg === true)
   {
      setTimeout(oslNameCheck,500);
      return;
   }

   oslOSLDiv.innerHTML = '';
   oslEBlock_min = 99999;
   oslEBlock_max = -1;
   oslNBlock_min = 99999;
   oslNBlock_max = -1;

   var mapExtents = W.map.getExtent();
   var ignoreSegment;
   oslOSLNCSegments = [];

   for(var segObj in W.model.segments.objects)
   {
      if(W.model.segments.objects.hasOwnProperty(segObj))
      {
         ignoreSegment = false;
         var seg = W.model.segments.objects[segObj];
         var segRT = seg.attributes.roadType;

         if
         (
            (seg.geometry.bounds.left > mapExtents.right) ||
            (seg.geometry.bounds.right < mapExtents.left) ||
            (seg.geometry.bounds.top < mapExtents.bottom) ||
            (seg.geometry.bounds.bottom > mapExtents.top)
         )
         {
            // ignore segment as it's not visible...
            ignoreSegment = true;
         }
         if
         (
            (segRT < 1) ||
            ((segRT > 3) && (segRT < 6)) ||
            ((segRT > 8) && (segRT < 17)) ||
            ((segRT > 17) && (segRT < 20)) ||
            (segRT > 21)
         )
         {
            // ignore segment as it's non-driveable...
            ignoreSegment = true;
         }

         if(ignoreSegment === false)
         {
            var streetObj = W.model.streets.objects[seg.attributes.primaryStreetID];
            if(streetObj !== null)
            {
               var currentName = streetObj.name;
               var gid = seg.geometry.id;
               var pline = document.getElementById(gid);

               if((currentName !== null) && (pline !== null))
               {
                  currentName = oslRemoveDirSuffix(currentName,' (N)');
                  currentName = oslRemoveDirSuffix(currentName,' (S)');
                  currentName = oslRemoveDirSuffix(currentName,' (E)');
                  currentName = oslRemoveDirSuffix(currentName,' (W)');
                  currentName = oslRemoveDirSuffix(currentName,' (CW)');
                  currentName = oslRemoveDirSuffix(currentName,' (ACW)');

                  var endPointA = new OL.LonLat(seg.geometry.components[0].x,seg.geometry.components[0].y);
                  endPointA.transform(new OL.Projection("EPSG:900913"),new OL.Projection("EPSG:4326"));
                  oslToOSGrid(endPointA.lat, endPointA.lon, 0);
                  var eastingsA = oslEastings;
                  var northingsA = oslNorthings;
                  var eBlock = Math.floor(oslEastings/oslLocatorBlockSize);
                  var nBlock = Math.floor(oslNorthings/oslLocatorBlockSize);
                  if(eBlock < oslEBlock_min) oslEBlock_min = eBlock;
                  if(eBlock > oslEBlock_max) oslEBlock_max = eBlock;
                  if(nBlock < oslNBlock_min) oslNBlock_min = nBlock;
                  if(nBlock > oslNBlock_max) oslNBlock_max = nBlock;
                  var endPointB = new OL.LonLat(seg.geometry.components[seg.geometry.components.length-1].x,seg.geometry.components[seg.geometry.components.length-1].y);
                  endPointB.transform(new OL.Projection("EPSG:900913"),new OL.Projection("EPSG:4326"));
                  oslToOSGrid(endPointB.lat, endPointB.lon, 0);
                  var eastingsB = oslEastings;
                  var northingsB = oslNorthings;
                  oslOSLNCSegments.push(new oslNCCandidateNew(pline, eastingsA, northingsA, eastingsB, northingsB, currentName));
                  eBlock = Math.floor(oslEastings/oslLocatorBlockSize);
                  nBlock = Math.floor(oslNorthings/oslLocatorBlockSize);
                  if(eBlock < oslEBlock_min) oslEBlock_min = eBlock;
                  if(eBlock > oslEBlock_max) oslEBlock_max = eBlock;
                  if(nBlock < oslNBlock_min) oslNBlock_min = nBlock;
                  if(nBlock > oslNBlock_max) oslNBlock_max = nBlock;
               }
            }
         }
      }
   }

   if(oslOSLNCSegments.length > 0)
   {
      oslONC_E = oslEBlock_min;
      oslONC_N = oslNBlock_min;
      oslNameComparison();
   }
}

function oslTenthSecondTick()
{
   if(W.app.modeController.mode.mteModeState !== undefined)
   {
      if(!oslMTEMode)
      {
         oslAddLog('MTE mode, sleeping until normal service is resumed...');
         oslWindowMinimise();
      }
      oslMTEMode = true;
      return;
   }
   oslMTEMode = false;

   if(oslMOAdded === false)
   {
		if(document.getElementById('edit-panel') !== null)
		{
			oslAddLog('edit-panel mutation observer added...');
			var editPanelMO = new MutationObserver(oslEditPanelCheck);
			editPanelMO.observe(document.getElementById('edit-panel'),{childList:true,subtree:true});
			oslMOAdded = true;
		}
   }

   var hideUI = false;
   if(document.getElementById('layer-switcher-pinned-input').checked === false)
   {
      hideUI = Boolean(hideUI || (document.getElementsByClassName('menu not-visible').length === 0));
   }
   hideUI = Boolean(hideUI || (document.getElementsByClassName('toolbar-group open').length > 0));
   if(hideUI === false)
   {
      oslWindow.style.zIndex = 2000;
   }
   else
   {
      oslWindow.style.zIndex = -2000;
   }

   if(!oslAdvancedMode) oslEnableAdvancedOptions();

   var oslSelectedItems = [];
   if(W.selectionManager.selectedItems === undefined)
   {
      oslSelectedItems = W.selectionManager._selectedFeatures;
   }
   else
   {
      oslSelectedItems = W.selectionManager.selectedItems;
   }
   if(oslSelectedItems.length == 1)
   {
      if(oslPrevSelected === null) oslDoOSLUpdate = true;
      else if(oslSelectedItems[0].model.attributes.id != oslPrevSelected) oslDoOSLUpdate = true;
      oslPrevSelected = oslSelectedItems[0].model.attributes.id;
   }
   else
   {
      oslPrevSelected = null;
   }

   if(document.getElementById('oslSelect') !== null)
   {
      var editDisabled = ((document.getElementsByClassName('full-address disabled').length > 0) || (document.getElementsByClassName('full-address-container').length === 0));
      if(editDisabled === true)
      {
         document.getElementById('oslSelect').style.background = "rgb(160, 160, 160)";
      }
      else
      {
         document.getElementById('oslSelect').style.background = "rgb(204, 204, 255)";
      }
      document.getElementById('oslSelect').disabled = editDisabled;
   }

   if(oslOSLNameCheckTimer > 0)
   {
      if(--oslOSLNameCheckTimer === 0) oslNameCheck();
   }

   var bcIdx;
   var timeNow;
   if(--oslBlockCacheTestTimer === 0)
   {
      oslBlockCacheTestTimer = (oslCacheDecayPeriod * 10);
      timeNow = Math.floor(new Date().getTime() / 1000);
      for(bcIdx = oslBlockCacheList.length-1; bcIdx >= 0; bcIdx--)
      {
         if((timeNow - oslBlockCacheList[bcIdx].lastAccessed) > oslCacheDecayPeriod)
         {
            oslAddLog(oslBlockCacheList[bcIdx].blockName+' not accessed in last '+oslCacheDecayPeriod+' seconds, deleting from OSL cache...');
            eval('delete '+oslBlockCacheList[bcIdx].blockName);
            oslBlockCacheList.splice(bcIdx,1);
         }
      }
   }

   if(--oslPRNCacheTestTimer === 0)
   {
      oslPRNCacheTestTimer = (oslCacheDecayPeriod * 10);
      timeNow = Math.floor(new Date().getTime() / 1000);
      for(bcIdx = oslPRNCacheList.length-1; bcIdx >= 0; bcIdx--)
      {
         if((timeNow - oslPRNCacheList[bcIdx].lastAccessed) > oslCacheDecayPeriod)
         {
            oslAddLog(oslPRNCacheList[bcIdx].blockName+' not accessed in last '+oslCacheDecayPeriod+' seconds, deleting from PRN cache...');
            eval('delete '+oslPRNCacheList[bcIdx].blockName);
            oslPRNCacheList.splice(bcIdx,1);
         }
      }
   }

   if((oslDoOSLUpdate === true) && (oslMousepos !== null))
   {
      // update the OS Locator matches
      oslToOSGrid(oslMousepos.lat,oslMousepos.lon,1);
      oslDoOSLUpdate = oslLoadingMsg;
      if(!oslDoOSLUpdate) oslRadioClick();
   }

   if(oslRefreshAutoTrack)
   {
      // refresh any of the site tabs/windows we've checked for auto-tracking
      if(oslInUK === true)
      {
         if(document.getElementById('_cbAutoTrackOSOD').checked == 1) window.open(oslOSOD_url,'_osopendata');
         if(document.getElementById('_cbAutoTrackOSMC').checked == 1) window.open(oslOSMC_url,'_osmusicalchairs');
         if(document.getElementById('_cbAutoTrackRWO').checked == 1) window.open(oslRWO_url,'_roadworksorg');
         if(oslInWiltshire === true)
         {
            if(document.getElementById('_cbAutoTrackSWG').checked == 1) window.open(oslSWG_url,'_wiltshire');
         }
         if(oslInLondon === true)
         {
            if(document.getElementById('_cbAutoTrackLRR').checked == 1) window.open(oslLRR_url,'_londonregister');
         }
      }
      oslRefreshAutoTrack = false;
   }

   if(oslPendingPRNBlocks.length > 0)
   {
      oslAddLog('pending blocks...');
      oslAddLog(oslPendingPRNBlocks);

      var nBlocks = oslPendingPRNBlocks.length;
      var blocksDone = 0;
      for(var i=0; i<oslPendingPRNBlocks.length; i++)
      {
         if(oslPendingPRNBlocks[i] !== '')
         {
            var oslEvalString = 'typeof '+oslPendingPRNBlocks[i];
            if(eval(oslEvalString) != 'undefined')
            {
               oslAddLog('   '+oslPendingPRNBlocks[i]+' has loaded, removing from pending list');
               oslPendingPRNBlocks[i] = '';
               blocksDone++;
            }
         }
         else
         {
            blocksDone++;
         }
      }

      if(blocksDone == nBlocks)
      {
         oslPendingPRNBlocks = [];
         oslAddLog('no pending blocks, re-rendering PRN layer...');
         if(document.getElementById('_cbPRNEnabled').checked === true)
         {
            oslToOSGrid(oslEastings,oslNorthings,3);
         }
         else
         {
            oslHighlightPRN(0,0,3);
         }
      }
   }
}

function oslEnableAdvancedOptions()
{
   if (oslAdvancedMode) return;
   if(W.loginManager === null) return;
   if(W.loginManager.isLoggedIn)
   {
      var thisUser = W.loginManager.user;
      if (thisUser !== null && thisUser.normalizedLevel >= 3)
      {
         oslAdvancedMode = true;
         oslAddLog('advanced mode enabled');
      }
   }
}

function oslUpdateLiveMapLink()
{
   var lmLink = document.getElementById('livemap-link');
   if(lmLink === null)
   {
      setTimeout(oslUpdateLiveMapLink,100);
      return;
   }

   // translate the zoom level between WME and live map.
   var livemap_zoom = parseInt(sessionStorage.zoom)+12;
   if (livemap_zoom > 17) livemap_zoom = 17;
   var livemap_url = 'https://www.waze.com/livemap/?';
   livemap_url += 'lon='+sessionStorage.lon;
   livemap_url += '&lat='+sessionStorage.lat;
   livemap_url += '&zoom='+livemap_zoom;

   // Modify existing livemap link to reference current position in WME
   lmLink.href = livemap_url;
   lmLink.target = '_blank';
}

function oslHighlightPRN(oslEastings, oslNorthings, mode)
{
   if((mode === 0) || (mode == 1))
   {
      var arrayName = 'prnData_'+oslEastings+'_'+oslNorthings;
      // check to see if there's a corresponding array loaded already
      var oslEvalString = 'typeof '+arrayName;

      if(eval(oslEvalString) == "undefined")
      {
         // inject 20km PRN block data
         var script = document.createElement("script");
         script.setAttribute('type','text/javascript');
         script.setAttribute('charset','windows-1252');
         script.src = 'https://chizzum.com/greasemonkey/prn_v2/'+arrayName+'.js';
         document.head.appendChild(script);
         oslLoadingMsg = true;
         oslPRNCacheList.push(new oslBlockCacheObj(arrayName));
         oslPendingPRNBlocks.push(arrayName);
         return mode;
      }

      for (var bcObj in oslPRNCacheList)
      {
         if(oslPRNCacheList[bcObj].blockName == arrayName)
         {
            oslPRNCacheList[bcObj].lastAccessed = Math.floor(new Date().getTime() / 1000);
         }
      }

      var divWidth = document.getElementById('WazeMap').offsetWidth;
      var divHeight = document.getElementById('WazeMap').offsetHeight;
      var displayPoints = false;
      if(mode === 0)
      {
         // initialise SVG container
         oslPRNDivInnerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="'+divWidth+'px" height="'+divHeight+'px" version="1.1">';
      }

      // create local copy of PRN array to avoid an eval() in each iteration of the loop
      arrayName = 'prnData_'+oslEastings+'_'+oslNorthings;
      if(eval('typeof '+arrayName) == "undefined") return;
      eval('oslPRNData = '+arrayName);

      for(var prnIdx=0; prnIdx < oslPRNData.length; prnIdx++)
      {
         var prnEntry = oslPRNData[prnIdx];
         var prnPoints = prnEntry.split(' ');
         oslOSGBtoWGS(prnPoints[0],prnPoints[1]);
         var lonlat = new OL.LonLat(oslLongitude,oslLatitude);
         lonlat.transform(new OL.Projection("EPSG:4326"),new OL.Projection("EPSG:900913"));
         var pix1 = W.map.getPixelFromLonLat(lonlat);
         var pix2;

         for(var pts=1; pts < (prnPoints.length/2); pts++)
         {
            oslOSGBtoWGS(prnPoints[(pts*2)],prnPoints[(pts*2)+1]);
            lonlat = new OL.LonLat(oslLongitude,oslLatitude);
            lonlat.transform(new OL.Projection("EPSG:4326"),new OL.Projection("EPSG:900913"));
            pix2 = W.map.getPixelFromLonLat(lonlat);
            if
            (
               ((pix1.x >= 0) && (pix1.x < divWidth) && (pix1.y >= 0) && (pix1.y < divHeight)) ||
               ((pix2.x >= 0) && (pix2.x < divWidth) && (pix2.y >= 0) && (pix2.y < divHeight))
            )
            {
               if(displayPoints === false)
               {
                  oslPRNDivInnerHTML += '<polyline points="';
                  displayPoints = true;
               }
               oslPRNDivInnerHTML += pix1.x+','+pix1.y+' '+pix2.x+','+pix2.y+' ';
            }
            pix1 = pix2;
         }

         if
         (
            ((pix1.x >= 0) && (pix1.x < divWidth) && (pix1.y >= 0) && (pix1.y < divHeight)) ||
            ((pix2.x >= 0) && (pix2.x < divWidth) && (pix2.y >= 0) && (pix2.y < divHeight))
         )
         {
            oslPRNDivInnerHTML += pix2.x+','+pix2.y+' ';
         }

         if(displayPoints === true)
         {
            oslPRNDivInnerHTML += '" style="stroke:green;stroke-width:30;stroke-linecap:round;fill:none"/>';
            displayPoints = false;
         }
      }
   }
   else if(mode == 2)
   {
      // finalise SVG
      oslPRNDivInnerHTML += '</svg>';
      oslPRNDiv.innerHTML = oslPRNDivInnerHTML;
   }
   else if(mode == 3)
   {
      // erase SVG
      oslPRNDiv.innerHTML = '';
   }

   return 1;
}

function oslRepositionOverlays()
{
   var divTop = (0-eval(oslWazeMapElement.style.top.replace('px','')));
   var divLeft = (0-eval(oslWazeMapElement.style.left.replace('px','')));
   oslBBDiv.style.top = divTop + 'px';
   oslBBDiv.style.left = divLeft + 'px';
   oslPRNDiv.style.top = divTop + 'px';
   oslPRNDiv.style.left = divLeft + 'px';
}

function oslGetCorrectedLonLatFromPixelPos(px, py, toolbarCompensation)
{
   if((toolbarCompensation) && (oslOffsetToolbar)) py -= document.getElementById('toolbar').clientHeight;
   py -= document.getElementById('topbar-container').clientHeight;
   var pixelPos = new OL.Pixel(px, py);
   return W.map.getLonLatFromPixel(pixelPos);
}

function oslGetOffsetMapCentre()
{
   // get lon/lat of viewport centrepoint for modifying the livemap link and for passing to the external mapping sites.

   // shift the longitude pixel offset by half the width of the WME sidebar to account for the lateral offset that would
   // otherwise occur when switching between the WME tab and the other map tabs - all of those use a full-width map view,
   // so their map centre is further to the left within the browser window than the WME centrepoint...
   var mapVPX = (W.map.getViewport().clientWidth / 2) - (document.getElementById('sidebar').clientWidth / 2);
   var mapVPY = W.map.getViewport().clientHeight / 2;
   return oslGetCorrectedLonLatFromPixelPos(mapVPX, mapVPY, false);
}

function oslMouseMoveAndUp(e)
{
   if(localStorage.oslOSLDivState != 'maximised') return;
   var mouseX = e.pageX - document.getElementById('map').getBoundingClientRect().left;
   var mouseY = e.pageY - document.getElementById('map').getBoundingClientRect().top;
   oslMousepos = oslGetCorrectedLonLatFromPixelPos(mouseX, mouseY, true).transform(new OL.Projection("EPSG:900913"),new OL.Projection("EPSG:4326"));

   if((oslMousepos != sessionStorage.oslMousepos) || (oslLoadingMsg && (eval(oslEvalString) != "undefined")))
   {
      oslLoadingMsg = false;
      sessionStorage.oslMousepos = oslMousepos;

      oslDoOSLUpdate = false;
      // update the OSL results if there are no selected segments, but there is a highlighted segment
      // which we haven't already done an update for

      oslSegmentHighlighted = false;
      var noneSelected = false;
      if(W.selectionManager.selectedItems !== undefined)
      {
         noneSelected = (W.selectionManager.selectedItems.length === 0);
      }
      else
      {
         noneSelected = (W.selectionManager._selectedFeatures.length === 0);
      }
      if(noneSelected === true)
      {
         for(var slIdx=0; slIdx < W.map.segmentLayer.features.length; slIdx++)
         {
            if(W.map.segmentLayer.features[slIdx].renderIntent == 'highlight')
            {
               if(slIdx != oslPrevHighlighted)
               {
                  oslPrevHighlighted = slIdx;
               }
               oslDoOSLUpdate = true;
               oslSegmentHighlighted = true;
            }
         }
      }
   }

   var geoCenter = oslGetOffsetMapCentre();
   var geoCenterTransform = oslGetOffsetMapCentre().transform(new OL.Projection("EPSG:900913"),new OL.Projection("EPSG:4326"));
   var lat = geoCenterTransform.lat;
   var lon = geoCenterTransform.lon;
   var zoom = W.map.zoom;
   // compare the new parameters against the persistent copies, and update the external links
   // only if there's a change required - the newly-inserted <a> element can't be clicked
   // on until the insertion process is complete, and if we were to re-insert it every timeout
   // then it'd spend a lot of its time giving the appearance of being clickable but without
   // actually doing anything...
   if((zoom != parseInt(sessionStorage.zoom))||(lat != parseFloat(sessionStorage.lat))||(lon != parseFloat(sessionStorage.lon)))
   {
      var country = null;
      if(W.model.countries.top === undefined)
      {
         if(W.model.countries.additionalInfo !== null)
         {
            country = W.model.countries.additionalInfo[0].name;
         }
      }
      else
      {
         country = W.model.countries.top.name;
      }

      if(country == "United Kingdom")
      {
         if (oslInUK === false)
         {
            oslAddLog('location is the UK, enabling full UI...');
            oslInUK = true;
            document.getElementById('oslOSLDiv').style.display = "block";
            document.getElementById('ncDiv').style.display = "block";
            document.getElementById('prnDiv').style.display = "block";
            document.getElementById('_extlinksUK').style.display = "block";
         }
      }
      else
      {
         // ...somewhere not yet supported, or WME isn't telling us just yet...
         oslAddLog('location not recognised, disabling UK-specific parts of UI...');
         oslInUK = false;
         oslInLondon = false;
         document.getElementById('oslOSLDiv').style.display = "none";
         document.getElementById('ncDiv').style.display = "none";
         document.getElementById('prnDiv').style.display = "none";
         document.getElementById('_extlinksUK').style.display = "none";
      }

      if(oslInUK === true)
      {
         // we're in the UK, so test to see if we're within the approximate Greater London bounding box
         if((lon >= -0.55) && (lon <= 0.30) && (lat >= 51.285) && (lat <= 51.695))
         {
            oslInLondon = true;
            document.getElementById('lrrCtrls').style.display='inline';
         }
         else
         {
            oslInLondon = false;
            document.getElementById('lrrCtrls').style.display='none';
         }

         // also see if we're more or less within Wiltshire
         if((lon >= -2.33) && (lon <= -1.50) && (lat >= 50.94) && (lat <= 51.71))
         {
            oslInWiltshire = true;
            document.getElementById('swgCtrls').style.display='inline';
         }
         else
         {
            oslInWiltshire = false;
            document.getElementById('swgCtrls').style.display='none';
         }
      }

      if(zoom != sessionStorage.zoom)
      {
         if(zoom < 4) document.getElementById('_cbNCEnabled').disabled = true;
         else document.getElementById('_cbNCEnabled').disabled = false;
      }
      // update the persistent vars with the new position
      sessionStorage.zoom = zoom;
      sessionStorage.lat = lat;
      sessionStorage.lon = lon;

      if(oslInUK === true)
      {
         // calculate the OS eastings/northings for the current WME centrepoint - this is required by the OpenData and London Roadworks sites...
         var osCoords = oslToOSGrid(lat,lon,0);

         // translate the zoom level between WME and Musical Chairs - this gives a pretty close match
         var mczoom = zoom + 12;
         if(mczoom > 18) mczoom = 18;
         // generate the Musical Chairs URL
         oslOSMC_url = 'http://ris.dev.openstreetmap.org/oslmusicalchairs/map?zoom='+mczoom+'&lat='+lat+'&lon='+lon+'&layers=B0TT&view_mode=pseudorandom';

         // translate the zoom level between WME and OpenData - the match here isn't quite so good...
         var odzoom = zoom + 6;
         if(odzoom < 6) odzoom = 6;
         if(odzoom > 10) odzoom = 12;
         // generate the OpenData URL
         oslOSOD_url = 'https://openspacewmb.ordnancesurvey.co.uk/osmapapi/mapbuilder?'+osCoords+'&z='+odzoom;

         // generate the roadworks.org URL - no zoom translation required here
         oslRWO_url = 'https://roadworks.org?lat='+lat+'&lon='+lon+'&z='+zoom;

         // generate the Wiltshire streetworks URL - use mapCenter() as is, but translate the zoom level
         var swgzoom = zoom + 2;
         if(swgzoom > 11) swgzoom = 11;
         oslSWG_url = 'http://streetworks.wiltshire.gov.uk/map.aspx?lat='+geoCenter.lat+'&lon='+geoCenter.lon+'&z='+swgzoom;

         // translate the zoom level between WME and London Roadworks Register - this gives reasonable results up to WME zoom of 5, beyond
         // which the LRR site can't zoom in any further...
         var lrrzoom = zoom;
         if(lrrzoom > 5) lrrzoom = 5;
         // generate the roadworks register URL
         oslLRR_url = 'http://public.londonworks.gov.uk/roadworks/home'+osCoords+'&z='+lrrzoom;
      }

      // wait to update the livemap link, as WME now does its own update after this point so any changes we make here
      // end up being wiped out...
      setTimeout(oslUpdateLiveMapLink,100);

      // update the link URLs
      if(oslInUK === true)
      {
         document.getElementById("_linkOSOD").href = oslOSOD_url;
         document.getElementById("_linkOSMC").href = oslOSMC_url;
         document.getElementById("_linkRWO").href = oslRWO_url;
         document.getElementById("_linkSWG").href = oslSWG_url;
         document.getElementById("_linkLRR").href = oslLRR_url;
      }
      document.getElementById('_linkPermalink').href = document.getElementsByClassName('WazeControlPermalink')[0].getElementsByTagName('a')[0].href;

      // refreshing the tabs within the event handler causes Chrome to switch focus to the tabs, so we
      // simply set the flag here and let the refresh occur within the 100ms tick handler as before
      oslRefreshAutoTrack = true;

      if(oslInUK === true)
      {
         // recalculate the map viewport extents in terms of oslEastings/oslNorthings
         var vpHalfWidth = (W.map.getExtent().right-W.map.getExtent().left) / (2 * 1.61);
         var vpHalfHeight = (W.map.getExtent().top-W.map.getExtent().bottom) / (2 * 1.61);

         oslVPLeft = oslEastings - vpHalfWidth;
         oslVPRight = oslEastings + vpHalfWidth;
         oslVPBottom = oslNorthings - vpHalfHeight;
         oslVPTop = oslNorthings + vpHalfHeight;

         if(document.getElementById('_cbPRNEnabled').checked === true)
         {
            oslToOSGrid(oslEastings,oslNorthings,3);
         }
         else
         {
            oslHighlightPRN(0,0,3);
         }
      }
      else
      {
         oslHighlightPRN(0,0,3);
      }

      oslRadioClick();
   }
   oslRepositionOverlays();
   if((e.type == "mouseup") || (e.type == "zoomend"))
   {
      oslNameCheck();
   }
}

function oslCancelEvent(e)
{
  e = e ? e : window.event;
  if(e.stopPropagation)
    e.stopPropagation();
  if(e.preventDefault)
    e.preventDefault();
  e.cancelBubble = true;
  e.cancel = true;
  e.returnValue = false;
  return false;
}

function oslOSLDivMouseDown(e)
{
   oslPrevMouseX = e.pageX;
   oslPrevMouseY = e.pageY;
   oslDivDragging = true;
   oslDragBar.style.cursor = 'move';
   document.body.addEventListener('mousemove', oslOSLDivMouseMove, false);
   document.body.addEventListener('mouseup', oslOSLDivMouseUp, false);
   return true;
}

function oslOSLDivMouseUp()
{
   if(oslDivDragging)
   {
      oslDivDragging = false;
      localStorage.oslOSLDivLeft = oslOSLDivLeft;
      localStorage.oslOSLDivTop = oslOSLDivTop;
   }
   oslDragBar.style.cursor = 'auto';
   document.body.removeEventListener('mousemove', oslOSLDivMouseMove, false);
   document.body.removeEventListener('mouseup', oslOSLDivMouseUp, false);
   return true;
}

function oslOSLDivMouseMove(e)
{
   var vpHeight = window.innerHeight; //document.getElementById('map').clientHeight;
   var vpWidth = window.innerWidth; //document.getElementById('map').clientWidth;

   oslOSLDivTop = eval(oslOSLDivTop) + eval((e.pageY - oslPrevMouseY));
   oslOSLDivLeft = eval(oslOSLDivLeft) + eval((e.pageX - oslPrevMouseX));
   oslPrevMouseX = e.pageX;
   oslPrevMouseY = e.pageY;

   if(oslOSLDivTop < 0) oslOSLDivTop = 0;
   if(oslOSLDivTop + 16 >= vpHeight) oslOSLDivTop = vpHeight-16;
   if(oslOSLDivLeft < 0) oslOSLDivLeft = 0;
   if(oslOSLDivLeft + 32 >= vpWidth) oslOSLDivLeft = vpWidth-32;

   oslWindow.style.top = oslOSLDivTop+'px';
   oslWindow.style.left = oslOSLDivLeft+'px';
   return oslCancelEvent(e);
}

function oslWindowMaximise()
{
   var vpHeight = window.innerHeight; //document.getElementById('map').clientHeight;

   oslDragBar.innerHTML = '<b>WMEOpenData v'+oslVersion+'</b>';
   oslDragBar.innerHTML += '<img id="_minimax" align=right valign=middle src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAOCAYAAAD0f5bSAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wMBAsgGGkHX7cAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAUUlEQVQoz63SQQqAQAxD0R/xXoIXH/RicaUgtIOdscuE8DaVbaq3ZIWaXB6VJTWZE7TH2j/SrQCwxdq89FLItTkpVBJtXOoqgbY+4fFd0sjDXtyHHG22yaK0AAAAAElFTkSuQmCC" />';
   document.getElementById('_minimax').addEventListener('click', oslWindowMinimise, false);
   oslOSLDiv.style.height = 'auto';
   oslOSLDiv.style.padding = '2px';
   oslNCDiv.style.height = 'auto';
   oslNCDiv.style.padding = '2px';
   oslPRNUIDiv.style.height = 'auto';
   oslPRNUIDiv.style.padding = '2px';
   oslMLCDiv.style.height = 'auto';
   oslMLCDiv.style.padding = '2px';
   localStorage.oslOSLDivState = 'maximised';
   if(oslWindow.getBoundingClientRect().bottom > vpHeight)
   {
      oslOSLDivTop = (vpHeight-oslWindow.getBoundingClientRect().height);
      localStorage.oslOSLDivTop = oslOSLDivTop;
      oslWindow.style.top = oslOSLDivTop+'px';
   }
   oslRepositionOverlays();
}

function oslWindowMinimise()
{
   oslDragBar.innerHTML = '<b>WMEOpenData v'+oslVersion+'</b>';
   oslDragBar.innerHTML += '<img id="_minimax" align=right valign=middle src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAOCAYAAAD0f5bSAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wMBAshHpl/y8MAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAXUlEQVQoz63SQQqAMAxE0T/Fe0k9uNKTjQtBpLZSowOBQBjeJrLN20wA2jTcdLZkGy0y80CjgFcrwbFQxgoAiUDO0qN2Ub5LXa1S/pFuWkMJS9huDhn3biFJkYfdAYUjUx2jRgIlAAAAAElFTkSuQmCC" />';
   document.getElementById('_minimax').addEventListener('click', oslWindowMaximise, false);
   oslOSLDiv.style.height = '0px';
   oslOSLDiv.style.padding = '0px';
   oslNCDiv.style.height = '0px';
   oslNCDiv.style.padding = '0px';
   oslPRNUIDiv.style.height = '0px';
   oslPRNUIDiv.style.padding = '0px';
   oslMLCDiv.style.height = '0px';
   oslMLCDiv.style.padding = '0px';
   oslBBDiv.innerHTML = '';
   oslPRNDiv.innerHTML = '';
   localStorage.oslOSLDivState = 'minimised';
}

function oslNestedTypeof(nestedObj)
{
   var objFields = nestedObj.split(".");
   var retval = "unknown";
   var fieldIdx = 0;
   var level = window;
   while((retval != "undefined") && (fieldIdx < objFields.length))
   {
      level = level[objFields[fieldIdx++]];
      retval = typeof(level);
   }
   return retval;
}

function oslEditPanelCheck()
{
   if(document.getElementById('edit-panel').getElementsByClassName('map-comment-feature-editor').length)
   {
      document.body.style.overflow = "";
   }
   else
   {
      document.body.style.overflow = "hidden";
   }
}

function oslWazeBits()
{
   if(document.location.href.indexOf('user') !== -1)
   {
      oslAddLog('User profile page detected, script is disabled...');
      return;
   }

   oslAddLog('adding WazeBits...');
   if((oslWazeBitsPresent & 0x01) === 0)
   {
      if(oslNestedTypeof("W.selectionManager") != "undefined")
      {
         oslAddLog('   W.selectionManager OK');
         oslWazeBitsPresent |= 0x01;
      }
   }

   if((oslWazeBitsPresent & 0x02) === 0)
   {
      if(typeof OpenLayers != "undefined")
      {
         oslAddLog('   OpenLayers OK');
         oslWazeBitsPresent |= 0x02;
      }
   }

   if((oslWazeBitsPresent & 0x04) === 0)
   {
      if(oslNestedTypeof("W.map.segmentLayer.div.parentElement.id") != "undefined")
      {
         if(document.getElementById(W.map.segmentLayer.div.parentElement.id) !== null)
         {
            oslAddLog('   WazeMap OK');
            oslWazeBitsPresent |= 0x04;
            oslWazeMapElement = document.getElementById(W.map.segmentLayer.div.parentElement.id);
         }
      }
   }

   if((oslWazeBitsPresent & 0x08) === 0)
   {
      if(oslNestedTypeof("W.model.countries") != "undefined")
      {
         oslAddLog('   W.model.countries OK');
         oslWazeBitsPresent |= 0x08;
      }
   }

   if(oslWazeBitsPresent != 0x0F)
   {
      setTimeout(oslWazeBits,250);
   }
   else
   {
      // add a new div to the map viewport, to hold the bounding box SVG
      oslAddLog('create bounding box DIV');
      oslBBDiv = document.createElement('div');
      oslBBDiv.id = "oslBBDiv";
      oslBBDiv.style.position = 'absolute';
      oslBBDiv.style.top = (0-eval(oslWazeMapElement.style.top.replace('px',''))) + 'px';
      oslBBDiv.style.left = (0-eval(oslWazeMapElement.style.left.replace('px',''))) + 'px';
      oslBBDiv.style.overflow = 'hidden';
      oslBBDiv.style.width = window.innerWidth;
      oslBBDiv.style.height = window.innerHeight;
      oslWazeMapElement.appendChild(oslBBDiv);

      // add a new div to the map viewport, to hold the PRN highlight SVG
      oslAddLog('create PRN DIV');
      oslPRNDiv = document.createElement('div');
      oslPRNDiv.id = "oslPRNDiv";
      oslPRNDiv.style.position = 'absolute';
      oslPRNDiv.style.top = oslBBDiv.style.top;
      oslPRNDiv.style.left = oslBBDiv.style.left;
      oslPRNDiv.style.overflow = 'hidden';
      oslPRNDiv.style.width = window.innerWidth;
      oslPRNDiv.style.height = window.innerHeight;
      oslWazeMapElement.appendChild(oslPRNDiv);

      // add a new div to hold the OS Locator results, in the form of a draggable window
      oslAddLog('create lookup results DIV');
      oslWindow = document.createElement('div');
      oslWindow.id = "oslWindow";
      oslWindow.style.position = 'absolute';
      oslWindow.style.border = '1px solid #BBDDBB';
      oslWindow.style.borderRadius = '4px';
      oslWindow.style.overflow = 'hidden';
      oslWindow.style.zIndex = 2000;
      oslWindow.style.opacity = 0;
      oslWindow.style.transitionProperty = "opacity";
      oslWindow.style.transitionDuration = "1000ms";
      oslWindow.style.webkitTransitionProperty = "opacity";
      oslWindow.style.webkitTransitionDuration = "1000ms";
      oslWindow.style.boxShadow = '5px 5px 10px Silver';
      document.body.appendChild(oslWindow);

      // dragbar div
	   oslAddLog('create dragbar DIV');
      oslDragBar = document.createElement('div');
      oslDragBar.id = "oslDragBar";
      oslDragBar.style.backgroundColor = '#D0D0D0';
      oslDragBar.style.padding = '4px';
      oslDragBar.style.fontSize = '16px';
      oslDragBar.style.lineHeight = '18px';
      oslWindow.appendChild(oslDragBar);

      // OS results div
	   oslAddLog('create results DIV');
      oslOSLDiv = document.createElement('div');
      oslOSLDiv.id = "oslOSLDiv";
      oslOSLDiv.innerHTML = '';
      oslOSLDiv.style.backgroundColor = '#DDFFDD';
      oslOSLDiv.style.padding = '2px';
      oslOSLDiv.style.fontSize = '14px';
      oslOSLDiv.style.lineHeight = '16px';
      oslOSLDiv.style.overflow = 'hidden';
      oslOSLDiv.style.width = 'auto';
      oslOSLDiv.style.height = 'auto';
      oslOSLDiv.style.display = 'none';
      oslWindow.appendChild(oslOSLDiv);

      // NameCheck div
	   oslAddLog('create NameCheck DIV');
      oslNCDiv = document.createElement('div');
      oslNCDiv.id = "ncDiv";
      oslNCDiv.style.backgroundColor = '#DDDDFF';
      oslNCDiv.style.padding = '2px';
      oslNCDiv.style.fontSize = '14px';
      oslNCDiv.style.lineHeight = '16px';
      oslNCDiv.style.display = 'none';
      oslNCDiv.innerHTML = '<b>NameCheck</b>';
      oslNCDiv.innerHTML += '<br><label style="display:inline;"><input type="checkbox" id="_cbNCEnabled" />Highlight potential naming errors</label>';
      oslNCDiv.innerHTML += '<br><i>Note: only active at at zoom level 4 and above</i>';
      oslWindow.appendChild(oslNCDiv);

      // PRN control div
	   oslAddLog('create PRN control DIV');
      oslPRNUIDiv = document.createElement('div');
      oslPRNUIDiv.id = "prnDiv";
      oslPRNUIDiv.style.backgroundColor = '#00A000';
      oslPRNUIDiv.style.padding = '2px';
      oslPRNUIDiv.style.fontSize = '14px';
      oslPRNUIDiv.style.lineHeight = '16px';
      oslPRNUIDiv.style.display = 'none';
      oslPRNUIDiv.innerHTML = '<b>PRN Highlighting</b>';
      oslPRNUIDiv.innerHTML += '<br><label style="display:inline;"><input type="checkbox" id="_cbPRNEnabled" />Highlight Primary Road Network</label>';
      oslWindow.appendChild(oslPRNUIDiv);

      // external links div
	   oslAddLog('create extern links DIV');
      oslMLCDiv = document.createElement('div');
      oslMLCDiv.id = "oslMLCDiv";
      oslMLCDiv.innerHTML = '<b>External mapping resources</b>';
      // add the anchors and auto-track checkboxes for external sites.  Note that the urls are blank at this stage,
      // they'll be filled in by oslMouseMoveAndUp()...
      oslExtLinksUKDiv = document.createElement('div');
      oslExtLinksUKDiv.id = "_extlinksUK";
      oslExtLinksUKDiv.style.display = 'none';
      oslExtLinksUKDiv.innerHTML = '<a href="" id="_linkOSOD" target="_osopendata">OS OpenData</a> <input type="checkbox" id="_cbAutoTrackOSOD"></input> | ';
      oslExtLinksUKDiv.innerHTML += '<a href="" id="_linkOSMC" target="_osmusicalchairs">OS Musical Chairs</a> <input type="checkbox" id="_cbAutoTrackOSMC"></input> | ';
      oslExtLinksUKDiv.innerHTML += '<a href="" id="_linkRWO" target="_roadworksorg">Roadworks.org</a> <input type="checkbox" id="_cbAutoTrackRWO"></input><br>';
      oslExtLinksUKDiv.innerHTML += '<div id="swgCtrls"><a href="" id="_linkSWG" target="_wiltshire">Wiltshire</a> <input type="checkbox" id="_cbAutoTrackSWG"></input></div>';
      oslExtLinksUKDiv.innerHTML += '<div id="lrrCtrls"><a href="" id="_linkLRR" target="_londonregister">London Roadworks</a> <input type="checkbox" id="_cbAutoTrackLRR"></input></div>';
      oslMLCDiv.appendChild(oslExtLinksUKDiv);

      oslMLCDiv.innerHTML += '<br>(Checkboxes enable auto-tracking)';
      oslMLCDiv.innerHTML += '<br><br><a href="" id="_linkPermalink">Permalink</a>';

      var updateURL;
      if(navigator.userAgent.indexOf('Chrome') == -1)
      {
         updateURL = 'https://greasyfork.org/scripts/1941-wme-to-os-link';
      }
      else
      {
         updateURL = 'https://chrome.google.com/webstore/detail/wme-opendata/hjkehljinhkehammgkkhabmdbdnmcfei';
      }
      oslMLCDiv.innerHTML += '<br><br><a href="'+updateURL+'" target="_blank">WMEOpenData</a>';
      oslMLCDiv.style.backgroundColor = '#EEFFEE';
      oslMLCDiv.style.padding = '2px';
      oslMLCDiv.style.fontSize = '14px';
      oslMLCDiv.style.lineHeight = '16px';
      oslWindow.appendChild(oslMLCDiv);

	   oslAddLog('adding event listeners');
      oslDragBar.addEventListener('mousedown', oslOSLDivMouseDown, false);
      oslDragBar.addEventListener('mouseup', oslOSLDivMouseUp, false);
      W.map.events.register("zoomend", null, oslMouseMoveAndUp);
      document.getElementById('_cbNCEnabled').addEventListener('click', oslNCStateChange, false);
      document.getElementById('_cbPRNEnabled').addEventListener('click', oslPRNStateChange, false);

      oslEnableAdvancedOptions();

      W.map.events.register("mousemove", null, oslMouseMoveAndUp);
      W.map.events.register("mouseup", null, oslMouseMoveAndUp);

      W.map.segmentLayer.events.register("featuresadded", null, oslNameCheckTrigger);
      W.map.segmentLayer.events.register("featuresremoved", null, oslNameCheckTrigger);

 	   oslAddLog('adjusting UI position...');
      document.body.style.overflow = 'hidden';

      var vpHeight = window.innerHeight; //document.getElementById('map').clientHeight;
      var vpWidth = window.innerWidth; //document.getElementById('map').clientWidth;

      if
      (
         (localStorage.oslOSLDivTop === undefined)||
         (localStorage.oslOSLDivLeft === undefined)||
         (localStorage.oslOSLDivTop === "NaN")||
         (localStorage.oslOSLDivLeft === "NaN")||
         (localStorage.oslOSLDivTop > vpHeight)||
         (localStorage.oslOSLDivLeft > vpWidth)||
         (localStorage.oslOSLDivTop < 0)||
         (localStorage.oslOSLDivLeft < 0)
      )
      {
         oslOSLDivTop = document.getElementById('sidebar').getBoundingClientRect().top + (document.getElementById('sidebar').getBoundingClientRect().height / 2);
         oslOSLDivLeft = 8;
      }
      else
      {
         oslOSLDivTop = localStorage.oslOSLDivTop;
         oslOSLDivLeft = localStorage.oslOSLDivLeft;
      }

      if(localStorage.oslOSLDivState === undefined) localStorage.oslOSLDivState = 'maximised';
      oslOSLDivTopMinimised = oslOSLDivTop;
      oslWindow.style.left = oslOSLDivLeft+'px';
      oslWindow.style.top = oslOSLDivTop+'px';
      if(localStorage.oslOSLDivState == 'maximised') oslWindowMaximise();
      else oslWindowMinimise();

      oslWindow.style.opacity = 1;
      oslDoneOnload = true;

	  oslAddLog('setting zIndex...');
      for(var i=0;i<W.map.layers.length;i++)
      {
         if(W.map.layers[i].uniqueName == 'satellite_imagery')
         {
            oslBBDiv.style.zIndex = eval(W.map.layers[i].div.style.zIndex) + 1;
            oslPRNDiv.style.zIndex = eval(W.map.layers[i].div.style.zIndex) + 2;
         }
         if(W.map.layers[i].name == 'Spotlight') oslOSLMaskLayer = W.map.layers[i].div;
      }
      oslOffsetToolbar = document.getElementById('map').contains(document.getElementById('toolbar'));
      setInterval(oslTenthSecondTick,100);
   }
}

function oslInitialise()
{
   oslAddLog('initialise()');

   var nameTestMode = false;
   // oslWazeifyStreetName() functionality test code
   if(nameTestMode === true)
   {
      console.log(oslWazeifyStreetName("Orchard On The Green", true));
      console.log(oslWazeifyStreetName("The Orchard On The Green", true));
      console.log(oslWazeifyStreetName("The Avenue", true));
      console.log(oslWazeifyStreetName("High Road Ickenham", true));
      console.log(oslWazeifyStreetName("Westway Avenue", true));
      console.log(oslWazeifyStreetName("Parkway Park", true));
      console.log(oslWazeifyStreetName("Parkway Crescent", true));
      console.log(oslWazeifyStreetName("Breakspear Road North", true));
      console.log(oslWazeifyStreetName("Breakspear Road South", true));
      console.log(oslWazeifyStreetName("Breakspear Road East", true));
      console.log(oslWazeifyStreetName("Breakspear Road West", true));
      console.log(oslWazeifyStreetName("Kensal Green Way", true));
      console.log(oslWazeifyStreetName("Great North Road", true));
      return;
   }

   // inject gazetteer data
   var gazscript = document.createElement("script");
   gazscript.setAttribute('type','text/javascript');
   gazscript.setAttribute('charset','windows-1252');
   gazscript.src = 'https://chizzum.com/greasemonkey/gaz_v4/gazetteer.js';
   document.head.appendChild(gazscript);
   oslMergeGazData = true;

   // initialise persistent vars
   sessionStorage.zoom = 0;
   sessionStorage.lat = '';
   sessionStorage.lon = '';
   sessionStorage.myCity = '';
   sessionStorage.prevCity = '';
   sessionStorage.cityChangeEastings = 0;
   sessionStorage.cityChangeNorthings = 0;
   sessionStorage.cityNameRB = 'optUseExisting';
   sessionStorage.oslTabCreated = 0;

   oslWazeBits();
}

// START OF ROADWORKS.ORG CODE BLOCK
function rwoAddLog(logtext)
{
   console.log('RWO: '+logtext);
}

function rwoInitialise()
{
   rwoAddLog('initialise()');
   rwoAddLog('waiting for map objects...');
   var waitSomeMore = false;

   if(Elgin === undefined)
   {
      waitSomeMore = true;
   }
   else if (Elgin.map === undefined)
   {
      waitSomeMore = true;
   }

   if(google === undefined)
   {
      waitSomeMore = true;
   }
   else if(google.maps === undefined)
   {
      waitSomeMore = true;
   }

   if(waitSomeMore)
   {
      setTimeout(rwoInitialise,500);
      return;
   }

   rwoAddLog('all required objects found...');

   // extract the coords/zoom from the url...
   var userloc = document.location.href;
   var latpos = userloc.indexOf("?lat=");
   var lonpos = userloc.indexOf("&lon=");
   var zpos = userloc.indexOf("&z=");
   if((latpos != -1)&&(lonpos != -1)&&(zpos != -1))
   {
      var rwoLat = parseFloat(userloc.substr(latpos+5,lonpos-(latpos+5)));
      var rwoLon = parseFloat(userloc.substr(lonpos+5,zpos-(lonpos+5)));
      var rwoZoom = parseInt(userloc.substr(zpos+3,2))+12;
      Elgin.map.setCenter(new google.maps.LatLng(rwoLat,rwoLon));
      Elgin.map.setZoom(rwoZoom);
      rwoAddLog('map repositioned');
   }
}
// END OF ROADWORKS.ORG MAP TRACKER CODE BLOCK

// START OF WILTSHIRE STREETWORKS CODE BLOCK
function swgAddLog(logtext)
{
   console.log('SWG: '+logtext);
}

function swgInitialise()
{
   swgAddLog('initialise()');
   swgAddLog('waiting for map objects...');
   var waitSomeMore = false;

   if((map === null) || (map === undefined))
   {
      waitSomeMore = true;
      swgAddLog('map not found...');
   }
   else
   {
      if(map.setCenter === undefined)
      {
         waitSomeMore = true;
         swgAddLog('map.setCenter not found...');
      }
      if(map.zoomTo === undefined)
      {
         waitSomeMore = true;
         swgAddLog('map.zoomTo not found...');
      }
   }

   if((OpenLayers === null) || (OpenLayers === undefined))
   {
      waitSomeMore = true;
      swgAddLog('OpenLayers not found...');
   }
   else
   {
      if(OpenLayers.LonLat === undefined)
      {
         waitSomeMore = true;
         swgAddLog('OpenLayers.LonLat not found...');
      }
   }

   if(waitSomeMore)
   {
      setTimeout(swgInitialise,500);
      return;
   }

   swgAddLog('all required objects found...');

   // extract the coords/zoom from the url...
   var userloc = document.location.href;
   var latpos = userloc.indexOf("?lat=");
   var lonpos = userloc.indexOf("&lon=");
   var zpos = userloc.indexOf("&z=");
   if((latpos != -1)&&(lonpos != -1)&&(zpos != -1))
   {
      var swgLat = parseFloat(userloc.substr(latpos+5,lonpos-(latpos+5)));
      var swgLon = parseFloat(userloc.substr(lonpos+5,zpos-(lonpos+5)));
      var swgZoom = parseInt(userloc.substr(zpos+3,2));
      map.setCenter(new OpenLayers.LonLat(swgLon,swgLat));
      map.zoomTo(swgZoom);
      swgAddLog('map repositioned');
   }
}
// END OF WILTSHIRE STREETWORKS MAP TRACKER CODE BLOCK

// START OF LONDON ROADWORKS REGISTER CODE BLOCK
function lrrAddLog(logtext)
{
   console.log('LRR: '+logtext);
}

function lrrInitialise()
{
   // trap the page reload that occurs when the map view is generated...
   if(document.location.href.indexOf('home') == -1)
   {
      lrrAddLog('page reloaded during map generation - redirecting to second stage initialisation...');
      lrrInitialisePartDeux();
      return;
   }

   lrrAddLog('initialise()');
   lrrAddLog('waiting for search page to load...');
   var waitSomeMore = false;
   if(document.getElementsByName('mapResults')[0].length < 1)
   {
      waitSomeMore = true;
   }
   if(document.getElementsByName('postCode')[0].length < 1)
   {
      waitSomeMore = true;
   }

   if(waitSomeMore === true)
   {
      setTimeout(lrrInitialise,500);
      return;
   }

   // extract the coords/zoom from the url...
   var userloc = document.location.href;
   var epos = userloc.indexOf("?e=");
   var npos = userloc.indexOf("&n=");
   var zpos = userloc.indexOf("&z=");
   if((epos != -1)&&(npos != -1)&&(zpos != -1))
   {
      var lrrLon = userloc.substr(epos+3,npos-(epos+3));
      var lrrLat = userloc.substr(npos+3,zpos-(npos+3));
      var lrrZoom = userloc.substr(zpos+3,2);
      sessionStorage.setItem('lrrLon',lrrLon);
      sessionStorage.setItem('lrrLat',lrrLat);
      sessionStorage.setItem('lrrZoom',lrrZoom);

      lrrAddLog('accessing map...');
      // first set a "safe" postcode as the search criteria - whilst asking for the map view to be generated without any
      // search terms usually works OK, from time to time the site throws a wobbler and refuses to do anything without
      // having the search narrowed down a bit...
      document.getElementsByName('postCode')[0].value="EC1A 1AA";
      document.getElementsByName('mapResults')[0].click();
   }
}

function lrrInitialisePartDeux()
{
   lrrAddLog('waiting for map objects...');
   var waitSomeMore = false;

   if(map === undefined)
   {
      waitSomeMore = true;
   }

   if(OpenLayers === undefined)
   {
      waitSomeMore = true;
   }

   if(waitSomeMore)
   {
      setTimeout(lrrInitialisePartDeux,500);
      return;
   }

   lrrAddLog('all required objects found...');
   var lrrLon = parseInt(sessionStorage.getItem('lrrLon'));
   var lrrLat = parseInt(sessionStorage.getItem('lrrLat'));
   var lrrZoom = parseInt(sessionStorage.getItem('lrrZoom'));
   map.setCenter(new OpenLayers.LonLat(lrrLon,lrrLat));
   map.zoomTo(lrrZoom);
   lrrAddLog('map repositioned');
}
// END OF LONDON ROADWORKS REGISTER MAP TRACKER CODE BLOCK

// START OF OPENDATA FULLHEIGHT CODE BLOCK
var odfhEastings = 0;
var odfhNorthings = 0;
var odfhZoom = 0;

function odfhAddLog(logtext)
{
   console.log('ODFH: '+logtext);
}

function odfhResizeMap()
{
   odfhAddLog('resize');
   // resizes map viewport whenever browser window changes size
   var newWidth = window.innerWidth - 10;
   var newHeight = window.innerHeight - 10;
   odfhAddLog('  '+newWidth+' x '+newHeight);

   osMap.size.w = newWidth;
   osMap.size.h = newHeight;

   var elm = document.getElementById("map");
   // first we need to move the map DIV out of its original placement heirarchy, so that
   // it can flow to the left of the browser window rather than to the left of its
   // parent block...
   document.children[0].appendChild(elm);
   // then we resize it to fill the available space
   elm.style.height = newHeight+'px';
   elm.style.width = newWidth+'px';
   elm.style.left = "4px";

   // force a redraw of the map object to use the resized viewport correctly
   osMap.render('map');
}

function odfhRecentreMap()
{
   // call the OS provided functions required to point the map at a
   // given grid ref and zoom level
   var mymapCenter = new OpenSpace.MapPoint(odfhEastings, odfhNorthings);
   osMap.setCenter(mymapCenter, odfhZoom);
}

function odfhHideThing(thing)
{
   if((thing === null)||(thing === undefined))
   {
      odfhAddLog('  not found');
   }
   else
   {
      thing.style.visibility = "hidden";
      thing.style.position = "absolute";
      thing.style.top = "0px";
      odfhAddLog('  hidden');
   }
}
function odfhHideElement(elmID)
{
   odfhAddLog('hiding element '+elmID);
   var elm = document.getElementById(elmID);
   odfhHideThing(elm);
}
function odfhHideClassName(elmID)
{
   odfhAddLog('hiding classname '+elmID);
   var elm = document.getElementsByClassName(elmID)[0];
   odfhHideThing(elm);
}
function odfhHideTagName(elmID)
{
   odfhAddLog('hiding tag '+elmID);
   var elm = document.getElementsByTagName(elmID)[0];
   odfhHideThing(elm);
}

function odfhFakeOnload()
{
   // remove the non-map stuff from the page...
   odfhHideElement("openspace.mapbuilder.header");
   odfhHideElement("col2");
   odfhHideTagName("h1");
   odfhHideElement("div1");

   // reduce the width of the whitespace around the map viewport
   document.getElementById("wrapper").style.padding = '4px';
   // resize the map viewport...
   odfhResizeMap();

   window.addEventListener('resize', odfhResizeMap, true);

   // extract the starting coords/zoom from the url...
   var userloc = document.location.href;
   var epos = userloc.indexOf("?e=");
   var npos = userloc.indexOf("&n=");
   var zpos = userloc.indexOf("&z=");
   if((epos != -1)&&(npos != -1)&&(zpos != -1))
   {
      odfhEastings = userloc.substr(epos+3,npos-(epos+3));
      odfhNorthings = userloc.substr(npos+3,zpos-(npos+3));
      odfhZoom = userloc.substr(zpos+3,2);
      //...then recentre the map
      odfhRecentreMap();
   }
}

function odfhInitialise()
{
   odfhAddLog('initialise()');
   if(osMap === undefined) setTimeout(odfhInitialise,500);
   else odfhFakeOnload();
}
// END OF OPENDATA FULLHEIGHT CODE BLOCK

oslBootstrap();
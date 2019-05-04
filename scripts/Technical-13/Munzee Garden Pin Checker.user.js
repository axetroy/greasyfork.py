// ==UserScript==
// @name         Munzee Garden Pin Checker
// @namespace    none
// @version      1.4.1
// @description  Verify Munzee Garden Pins!
// @supportURL   https://Discord.me/TheShoeStore
// @author       technical13
// @match        https://www.munzee.com/m/*/map/*
// @grant        none
// ==/UserScript==
// jshint esversion: 6

var isDebug = false;
var intVerbosity = 0;
const ver = '1.4.1';
const scriptName = 'Munzee Garden Quick Pin Checker v' + ver;

Number.prototype.toRadians = function() { return this * Math.PI / 180; };// define a toRadians() function
Number.prototype.toDegrees = function() { return this * 180 / Math.PI; };// define a toDegrees() function

function log( intV, strConsole, strLog, ...arrArgs ) {
  if ( strConsole === undefined ) { strConsole = 'log'; }
  if ( strLog === undefined ) { strLog = '%o'; }
  if ( intVerbosity >= intV && ( strConsole === 'groupEnd' ) ) { console[ strConsole ](); }
  if ( intV === 0 || ( isDebug && intVerbosity >= intV ) ) { console[ strConsole ]( '[%i]: %s: ' + strLog, intV, scriptName, ...arrArgs ); }
}

const intParamsStart = ( document.URL.indexOf( '?' ) + 1 );
const strParams = document.URL.substr( intParamsStart );
const arrParamSets = strParams.split( '&' );
var objParams = {};
arrParamSets.forEach( function( strParam ) {
    let arrParam = strParam.split( '=' );
    let strParamName = ( arrParam[ 0 ].toLowerCase() || '' );
    if ( strParamName === 'verbosity' ) {
        isDebug = toBoolean( arrParam[ 1 ] );
        intVerbosity = ( arrParam[ 1 ] ? ( parseInt( arrParam[ 1 ] ) < 0 ? 0 : ( parseInt( arrParam[ 1 ] ) > 9 ? 9 : parseInt( arrParam[ 1 ] ) ) ) : 9 );
    } else if ( strParamName === 'debug' ) {
        isDebug = toBoolean( arrParam[ 1 ] );
        intVerbosity = 1;
    }
} );

log( 1, 'warn', 'Debug mode is on with verbosity level: %o', intVerbosity );
log( 1, 'groupCollapsed', 'Verbosity options: (click to expand)' );
log( 1, 'log', '1) Summary\n2) Parameters retrieved from URL\n3) Variables set to objParams\n4) Function returns\n9) ALL debugging info and this notice.' );
log( 1, 'groupEnd' );

function toBoolean( val ) {
    const arrTrue = [ undefined, null, '', true, 'true', 1, '1', 'on', 'yes' ];
    val = ( typeof( val ) === 'string' ? val.toLowerCase() : val );

    log( 4, 'log', 'toBoolean() is returning: %o', ( arrTrue.indexOf( val ) !== -1 ? true : false ) );
    return ( arrTrue.indexOf( val ) !== -1 ? true : false );
}

function getDistance( dblLatA, dblLonA, dblLatB, dblLonB ) {
    dblLatA = parseFloat( dblLatA ); dblLonA = parseFloat( dblLonA );
    dblLatB = parseFloat( dblLatB ); dblLonB = parseFloat( dblLonB );
    const intEarth = 6371000; // metres
    const radLatA = dblLatA.toRadians();
    const radLatB = dblLatB.toRadians();
    const radLatDiff = ( dblLatB - dblLatA ).toRadians();
    const radLonDiff = ( dblLonB - dblLonA ).toRadians();

    var a = Math.sin( radLatDiff / 2 ) * Math.sin( radLatDiff / 2 ) +
        Math.cos( radLatA ) * Math.cos( radLatB ) *
        Math.sin( radLonDiff / 2 ) * Math.sin( radLonDiff / 2 );
    var c = 2 * Math.atan2( Math.sqrt( a ), Math.sqrt( 1 - a ) );

    log( 4, 'log', 'getDistance( %s, %s, %s, %s ) is returning: %o', dblLatA, dblLonA, dblLatB, dblLonB, ( intEarth * c ) );
    return intEarth * c;
}

function getBearing( dblLatA, dblLonA, dblLatB, dblLonB ) {
    dblLatA = parseFloat( dblLatA ); dblLonA = parseFloat( dblLonA );
    dblLatB = parseFloat( dblLatB ); dblLonB = parseFloat( dblLonB );
    const radLatA = dblLatA.toRadians();
    const radLatB = dblLatB.toRadians();
    const radLonDiff = ( dblLonB - dblLonA ).toRadians();
    var x = Math.cos( radLatA ) * Math.sin( radLatB ) -
        Math.sin( radLatA ) * Math.cos( radLatB ) * Math.cos( radLonDiff );
    var y = Math.sin( radLonDiff ) * Math.cos( radLatB );

    log( 4, 'log', 'getBearing( %s, %s, %s, %s ) is returning: %o', dblLatA, dblLonA, dblLatB, dblLonB, 360 - ( Math.atan2( y, x ).toDegrees() ) );
    return 360 - ( Math.atan2( y, x ).toDegrees() );
}

function getDirection( dblDegrees ) {
    dblDegrees = parseInt( Math.round( dblDegrees ) - Math.round( dblDegrees ) % 45 ) % 360;
    var strCardinalDirection;
    switch ( dblDegrees ) {
        case 0 : strCardinalDirection = 'North'; break;
        case 45 : strCardinalDirection = 'North East'; break;
        case 90 : strCardinalDirection = 'East'; break;
        case 135 : strCardinalDirection = 'South East'; break;
        case 180 : strCardinalDirection = 'South'; break;
        case 225 : strCardinalDirection = 'South West'; break;
        case 270 : strCardinalDirection = 'West'; break;
        case 315 : strCardinalDirection = 'North West'; break;
        default : console.error( '%s: %o', ( new Date() ).toLocaleDateString(), dblDegrees ); strCardinalDirection = 'ERROR';
    }

    log( 4, 'log', 'getBearing( %s ) is returning: %o', dblDegrees, strCardinalDirection );
    return strCardinalDirection;
}

( async function() {
    log( 0, 'info', 'Script loaded.' );

    arrParamSets.forEach( function( strParam ) {
        let arrParam = strParam.split( '=' );
        let strParamName = ( arrParam[ 0 ].toLowerCase() || '' );
        if ( strParamName === 'debug' || strParamName === 'verbosity' ) { objParams.debug = isDebug; objParams.verbosity = intVerbosity; }
        switch ( strParamName ) {
            case 'lat' :// What is it's latitude suppose to be?
                log( 2, 'log', 'Got &lat= as: %s', arrParam[ 1 ] );
                objParams.latitude = arrParam[ 1 ];
                log( 3, 'log', 'Set objParams.latitude to: %s', objParams.latitude );
                break;
            case 'lon' :// What is it's longitude suppose to be?
                log( 2, 'log', 'Got &lon= as: %s', arrParam[ 1 ] );
                objParams.longitude = arrParam[ 1 ];
                log( 3, 'log', 'Set objParams.longitude to: %s', objParams.longitude );
                break;
            case 'type' :// What type of Munzee is it suppose to be?
                log( 2, 'log', 'Got &type= as: %s', arrParam[ 1 ] );
                objParams.type = decodeURIComponent(
                    arrParam[ 1 ]
                    .toLowerCase()
                    .replace( 'flat', 'flat' )
                    .replace( /(%20|mvm|virtual)/g, '' )
                );
                log( 3, 'log', 'Set objParams.type to: %s', objParams.type );
                break;
            case 'name' :// What is it's name suggested to be?
                log( 2, 'log', 'Got &name= as: %s', arrParam[ 1 ] );
                objParams.name = decodeURIComponent( arrParam[ 1 ] );
                log( 3, 'log', 'Set objParams.name to: %s', objParams.name );
                break;
            default:
        }
    } );

    if ( objParams.latitude !== undefined && objParams.longitude !== undefined && objParams.type !== undefined ) {
        var objMunzeeInfo = {};
        objMunzeeInfo.correct = 0;
        var strDeployed = /Deployed/;
        objMunzeeInfo.deployed = strDeployed.test( document.getElementsByClassName( 'status-date' )[ 0 ].innerText );// Is it deployed?
        if ( objMunzeeInfo.deployed ) { objMunzeeInfo.correct++; }
        var arrCoordinates = document.getElementsByClassName( 'munzee-main-area col-md-9' )[ 0 ].childNodes[ 4 ].data.trim().split( ' ' );
        objMunzeeInfo.latitude = arrCoordinates[ 0 ];// What is it's current latitude?
        if ( objParams.latitude === objMunzeeInfo.latitude ) { objMunzeeInfo.correct++; }
        objMunzeeInfo.longitude = arrCoordinates[ 1 ];// What is it's current longitude?
        if ( objParams.longitude === objMunzeeInfo.longitude ) { objMunzeeInfo.correct++; }
        var arrType = document.getElementsByClassName( 'pull-left pin' )[ 0 ].attributes.src.value.replace( /https?:\/\//i, '' ).split( '/' );
        arrType = arrType[ ( arrType.length - 1 ) ].split( '.' );
        objMunzeeInfo.type = arrType[ 0 ].replace( /(_|virtual)/g, '' );// What is it's current type?
        if ( objParams.type === objMunzeeInfo.type ) { objMunzeeInfo.correct++; }

        log( 1, 'log', 'Looking for: %s to be deployed at %s, %s.\nFound: %s is at %s, %s %s %s deployed.', objParams.type, objParams.latitude, objParams.longitude, objMunzeeInfo.type, objMunzeeInfo.latitude, objMunzeeInfo.longitude, ( objParams.latitude !== objMunzeeInfo.latitude || objParams.longitude !== objMunzeeInfo.longitude ? 'and' : 'but' ), ( objMunzeeInfo.deployed ? 'is' : 'is not' ) );

        var strTitle = document.getElementsByTagName( 'title' )[ 0 ];
        var arrTitle = strTitle.innerText.split( ' - ' );

        if ( objMunzeeInfo.correct === 4 ) {
            strTitle.innerText = '100% - ' + arrTitle[ 1 ] + ' - ' + arrTitle[ 0 ];
            alert( 'This pin is 100% correct!' );
        } else if ( !objMunzeeInfo.deployed && objMunzeeInfo.correct === 3 ) {
            strTitle.innerText = '99% - UNDEPLOYED - ' + arrTitle[ 1 ] + ' - ' + arrTitle[ 0 ];
            alert( 'This pin just needs to be deployed!' );
        } else if ( objParams.type !== objMunzeeInfo.type && objMunzeeInfo.correct === 3 ) {
            strTitle.innerText = 'TYPE ERROR! - ' + arrTitle[ 1 ] + ' - ' + arrTitle[ 0 ];
            alert( 'This pin is the wrong type!\n\n' +
                  objMunzeeInfo.type + ( objParams.type === objMunzeeInfo.type ? ' === ' : ' != ' ) + objParams.type + '\n'
                 );
        } else if ( ( ( objParams.latitude !== objMunzeeInfo.latitude || objParams.longitude !== objMunzeeInfo.longitude ) && objMunzeeInfo.correct === 3 ) ||
                   objParams.latitude !== objMunzeeInfo.latitude && objParams.longitude !== objMunzeeInfo.longitude && objMunzeeInfo.correct === 2 ) {
            let dblDistanceInMeters = await getDistance( objParams.latitude, objParams.longitude, objMunzeeInfo.latitude, objMunzeeInfo.longitude );
            let dblBearing = await getBearing( objParams.latitude, objParams.longitude, objMunzeeInfo.latitude, objMunzeeInfo.longitude );
            let strDirection = await getDirection( dblBearing );
            strTitle.innerText = 'COORDINATE ERROR! - ' + arrTitle[ 1 ] + ' - ' + arrTitle[ 0 ];
            alert( 'This pin is ' + ( Math.round( dblDistanceInMeters * 0.000621371 * 52600 ) / 10 ) + '\' ' + strDirection + ' (' + ( Math.floor( dblDistanceInMeters * 10 ) / 10 ) + 'm @ ' + ( Math.round( dblBearing * 10 ) / 10 ) + '°) of where expected!\n\n' +
                  'expected:\t' + objParams.latitude + ', ' + objParams.longitude + '\n' +
                  'actual:\t\t' + objMunzeeInfo.latitude + ', ' + objMunzeeInfo.longitude
                 );
        } else {
            let dblDistanceInMeters = await getDistance( objParams.latitude, objParams.longitude, objMunzeeInfo.latitude, objMunzeeInfo.longitude );
            let dblBearing = await getBearing( objParams.latitude, objParams.longitude, objMunzeeInfo.latitude, objMunzeeInfo.longitude );
            let strDirection = await getDirection( dblBearing ) + ' (' + ( Math.round( dblBearing * 10 ) / 10 ) + '°)';
            strTitle.innerText = 'ERROR! - ' + ( ( objMunzeeInfo.deployed ? 1 : 0 ) + ( ( objMunzeeInfo.correct - ( objMunzeeInfo.deployed ? 1 : 0 ) ) * 33 ) ) + '% correct - ' + arrTitle[ 1 ] + ' - ' + arrTitle[ 0 ];
            alert( 'There multiple things not right!\n\n' +
                  'Munzee is ' + ( objMunzeeInfo.deployed ? '' : 'not ' ) + 'deployed.\n' +
                  objMunzeeInfo.type + ( objParams.type === objMunzeeInfo.type ? ' === ' : ' != ' ) + objParams.type + '\n' +
                  'expected:\t' + objParams.latitude + ', ' + objParams.longitude + '\n' +
                  'actual:\t\t' + objMunzeeInfo.latitude + ', ' + objMunzeeInfo.longitude + '\n' +
                  '\t(' + ( Math.floor( dblDistanceInMeters * 10 ) / 10 ) + ' meters (' + ( Math.round( dblDistanceInMeters * 0.000621371 * 52600 ) / 10 ) + ' feet) ' + strDirection + ' off)'
                 );
        }
    }
} )();
// ==UserScript==
// @name         Bulk TB Logger
// @namespace    none
// @version      1.5.2
// @description  Easy way to log multiple TBs at once!
// @author       Technical_13
// @supportURL   https://Discord.me/TheShoeStore
// @include      *project-gc.com/Tools/DiscoverTrackables*
// @include      *logthemall.org/*
// @grant        unsafewindow
// == CHANGELOG ==
// === v 1.5 ===
// Added: Support for project-gc's bulk TB discovery tool
// ==== v 1.5.1 ====
// Added: Automatically append a link to this script in the log entry
// ==== v 1.5.2 ====
// Fixed: Missing spaces in script name auto-sig
//
// === v 1.4 ===
// Added: "Get Permalink" button to make it easier to share URLs to log tags.
//
// === v 1.3 ===
// Fixed: Bug caused by using Date.prototype.getYear()
// ==== v 1.3.1 ====
// Fixed: Cleanup left behind debugging.
// ==== v 1.3.2 ====
// Added: @updateURL
// ==== v 1.3.3 ====
// Added: @downloadURL
//
// === v 1.2 ===
// Initial public release
//
// ==/UserScript==
var isDebug = false;
var intVerbosity = 1;
const ver = '1.5.2';
const scriptName = 'Bulk TB Logger v' + ver;
console.info( '%s: Script loaded.', scriptName );

function toBoolean( val ) {
    const arrTrue = [ undefined, null, '', true, 'true', 1, '1', 'on', 'yes' ];
    val = ( typeof( val ) === 'string' ? val.toLowerCase() : val );
    return ( arrTrue.indexOf( val ) !== -1 ? true : false );
}

const strSite = document.URL.match( /https?:\/\/(?:www\.)?(.*?\.(?:com|org))(?:.*)/i )[ 1 ].toLowerCase();
const intParamsStart = ( document.URL.indexOf( '?' ) + 1 );
const strParams = document.URL.substr( intParamsStart );
const arrParamSets = strParams.split( '&' );
var objParams = {};
arrParamSets.forEach( function( strParam ) {
    let arrParam = strParam.split( '=' );
    let strParamName = ( arrParam[ 0 ].toLowerCase() || '' );
    if ( strParamName === 'debug' ) {
        isDebug = toBoolean( arrParam[ 1 ] );
    } else if ( strParamName === 'verbosity' ) {
        intVerbosity = ( arrParam[ 1 ] ? ( parseInt( arrParam[ 1 ] ) < 0 ? 0 : ( parseInt( arrParam[ 1 ] ) > 9 ? 9 : parseInt( arrParam[ 1 ] ) ) ) : 9 );
    }
} );
if ( isDebug && intVerbosity > 1 ) { console.log( '%s: strSite detected: %o', scriptName, strSite ); }
if ( isDebug ) { console.log( '%s: Debug mode is on with verbosity level: %o', scriptName, intVerbosity ); }
arrParamSets.forEach( function( strParam ) {
    let arrParam = strParam.split( '=' );
    let strParamName = ( arrParam[ 0 ].toLowerCase() || '' );
    if ( strParamName === 'debug' || strParamName === 'verbosity' ) {
        objParams.debug = isDebug;
        objParams.verbosity = intVerbosity;
    } else if ( strParamName === 'date' ) {
        let arrDate = arrParam[ 1 ].split( '/' );
        if ( arrDate.length !== 3 ) {
            console.error( '%s: Unable to parse date: please use mm/dd/yyyy format', scriptName );
        } else {
            console.log( '%s: Date parameter found: %o', scriptName, arrDate );
            let strMonth = ( parseInt( arrDate[ 0 ] ) < 10 ? '0' : '' ) + parseInt( arrDate[ 0 ] );
            let strDate = ( parseInt( arrDate[ 1 ] ) < 10 ? '0' : '' ) + parseInt( arrDate[ 1 ] );
            let intYear = ( new Date() ).getFullYear().toString().substr( 2 );
            let intCentury = ( new Date() ).getFullYear().toString().substr( 0, 2 );
            let strFullYear = ( parseInt( arrDate[ 2 ] ) < 100 ? ( parseInt( arrDate[ 2 ] ) <= intYear ? intCentury : ( intCentury - 1 ) ) + parseInt( arrDate[ 2 ] ) : arrDate[ 2 ] );
            let objDate = ( new Date( strMonth + '-' + strDate + '-' + strFullYear + 'T00:00:00.000Z' ) );
            let intMonth = ( objDate.getMonth() + 1 );
            let intDate = objDate.getDate();
            let intFullYear = ( objDate.getFullYear() + 1 );
            objParams.date = {
                month: strMonth,
                day: strDate,
                year: strFullYear,
                string: strMonth + '/' + strDate + '/' + strFullYear
            };
            if ( isDebug && intVerbosity > 3 ) { console.log( '%s: objParams.date set to: %o', scriptName, objParams.date ); }
        }
    } else if ( strParamName === 'codes' ) {
        objParams.codes = ( arrParam[ 1 ] || '' ).toUpperCase();
        if ( isDebug && intVerbosity > 3 ) { console.log( '%s: objParams.codes set to: %o', scriptName, objParams.codes ); }
    } else if( strParamName === 'logentry' ) {
        objParams.logentry = decodeURIComponent( arrParam[ 1 ] ) + ' Logged with [Bulk TB Logger](https://greasyfork.org/en/scripts/372804-bulk-tb-logger)!';
        if ( isDebug && intVerbosity > 3 ) { console.log( '%s: objParams.logentry set to: %o', scriptName, objParams.logentry ); }
    } else if ( strParamName === 'spellcheck' ) {
        objParams.spellcheck = toBoolean( arrParam[ 1 ] );
        if ( isDebug && intVerbosity > 3 ) { console.log( '%s: objParams.spellcheck set to: %o', scriptName, objParams.spellcheck ); }
    } else {
        objParams[ strParamName ] = ( arrParam[ 1 ] || '' );
        if ( isDebug && intVerbosity > 2 ) { console.log( '%s: Unknown %s parameter found: %o', scriptName, strParamName, objParams[ strParamName ] ); }
    }
} );

( function() {
        var domPermalink = document.createElement( 'input' );
        domPermalink.name = 'permalink';
        domPermalink.type = 'button';
        domPermalink.value = 'Get Permalink';
    var objSetDate, objCodes, objLogEntry, objCreatePermaLink;
    if ( ( strSite === 'logthemall.org' || strSite === 'project-gc.com' ) && isDebug && intVerbosity > 1 ) {
        console.log( '%s: Processing page with objParams: %o', scriptName, objParams );
    }
    if ( strSite === 'logthemall.org' ) {
        objCodes = document.getElementById( 'Codes' );
        objLogEntry = document.getElementById( 'LogEntry' );
        objCreatePermaLink = document.getElementsByName( 'Submit' )[ 0 ];
        if ( objParams.date ) {
            if ( isDebug && intVerbosity > 2 ) { console.log( '%s: Setting date using: %o', scriptName, objParams.date.string ); }
            document.getElementsByName( 'datedisc' )[ 0 ].value = objParams.date.string;
        }
        domPermalink.setAttribute( 'onClick', "javascript:alert( 'https://www." + strSite + "?Codes=' + document.getElementById( 'Codes' ).value.toUpperCase() + '&LogEntry=' + encodeURIComponent( document.getElementById( 'LogEntry' ).value ) + '&date=' + document.getElementsByName( 'datedisc' )[ 0 ].value.replace( /[\.\-]/g, '/' ) );" );
    } else if ( strSite === 'project-gc.com' ) {
        objCodes = document.getElementById( 'tb_codes' );
        objLogEntry = document.getElementById( 'log_text' );
        objCreatePermaLink = document.getElementsByName( 'discover' )[ 0 ];
        if ( objParams.date ) {
            if ( isDebug && intVerbosity > 2 ) { console.log( scriptName + ': Setting date to: %o', objParams.date ); }
            document.getElementsByName( 'month' )[ 0 ].querySelector( 'option[value="' + parseInt( objParams.date.month ) + '"]' ).setAttribute( 'selected', 'true' );
            document.getElementsByName( 'day' )[ 0 ].querySelector( 'option[value="' + objParams.date.day + '"]' ).setAttribute( 'selected', 'true' );
            document.getElementsByName( 'year' )[ 0 ].querySelector( 'option[value="' + objParams.date.year + '"]' ).setAttribute( 'selected', 'true' );
        }
        domPermalink.classList.add( 'btn', 'btn-primary' );
        domPermalink.setAttribute( 'onClick', "javascript:alert( 'https://www." + strSite + "?Codes=' + document.getElementById( 'tb_codes' ).value.toUpperCase() + '&LogEntry=' + encodeURIComponent( document.getElementById( 'log_text' ).value ) + '&date=' + ( parseInt( document.getElementsByName( 'month' )[ 0 ].value ) < 10 ? '0' : '' ) + document.getElementsByName( 'month' )[ 0 ].value + '/' + document.getElementsByName( 'day' )[ 0 ].value + '/' + document.getElementsByName( 'year' )[ 0 ].value );" );
    } else {
        console.error( '%s: The website, %s, is not currently supported by this script.', scriptName, strSite );
    }

    if ( strSite === 'logthemall.org' || strSite === 'project-gc.com' ) {
        objCodes.setAttribute( 'spellcheck', false );
        if ( objParams.codes ) {
            if ( isDebug && intVerbosity > 2 ) { console.log( '%s: Filling in codes: %o', scriptName, objParams.codes ); }
            objCodes.value = objParams.codes;
        }
        objLogEntry.setAttribute( 'spellcheck', toBoolean( objParams.spellcheck ) );
        if ( objParams.logentry ) {
            if ( isDebug && intVerbosity > 2 ) { console.log( '%s: Filling in Log Entry: %o', scriptName, objParams.logentry ); }
            objLogEntry.value = objParams.logentry;
        }
        objCreatePermaLink.insertAdjacentElement( 'afterend', domPermalink );
    }
} )();
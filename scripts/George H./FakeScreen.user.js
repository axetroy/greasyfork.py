// ==UserScript==
// @name FakeScreen
// @author JR
// @version 0.1
// @namespace fakeScrA
// @description Set Fake Screen
// ==/UserScript==

(function() { // ##################
// #############################
// #############################
// =========================
// ----------------------------------------
// ======== Fake Screen Dimensions
// =========================
// ### Anon function start

var setDefaultWidth = 800;
var setDefaultHeight = 600;
var setDefaultinWidth = 800;
var setDefaultinHeight = 600;
var setcColorDepth = 32;

// ###### Insert FakeScreen
    var fake_screen = {
        availHeight: setDefaultHeight,
        availWidth: setDefaultWidth,
        colorDepth: setcColorDepth,
        height: setDefaultHeight,
        pixelDepth: setcColorDepth,
        width: setDefaultWidth
    };
    window.screen = fake_screen;
 
   Object.defineProperties(window, {
        Height: {
            value: setDefaultHeight,
            writable: false
        }
    });
    Object.defineProperties(window, {
        Width: {
            value: setDefaultWidth,
            writable: false
        }
    });
    Object.defineProperties(window, {
        innerHeight: {
            value: setDefaultinHeight,
            writable: false
        }
    });
    Object.defineProperties(window, {
        innerWidth: {
            value: setDefaultinWidth,
            writable: false
        }
    });
    Object.defineProperties(window, {
        outerHeight: {
            value: setDefaultHeight,
            writable: false
        }
    });
    Object.defineProperties(window, {
        outerWidth: {
            value: setDefaultWidth,
            writable: false
        }
    });

// #### Window dimension setter
var Width_setter = window.__lookupSetter__ ('Width');
var Width_getter = window.__lookupGetter__ ('Width');
var innerWidth_setter = window.__lookupSetter__ ('innerWidth');
var innerWidth_getter = window.__lookupGetter__ ('innerWidth');
var outerWidth_setter = window.__lookupSetter__ ('outerWidth');
var outerWidth_getter = window.__lookupGetter__ ('outerWidth');
window.__defineSetter__ ('Width', nullFcSt);
window.__defineGetter__ ('Width', Width_getter);
window.__defineSetter__ ('innerWidth', nullFcSt);
window.__defineGetter__ ('innerWidth', innerWidth_getter);
window.__defineSetter__ ('outerWidth', nullFcSt);
window.__defineGetter__ ('outerWidth', outerWidth_getter);

var Height_setter = window.__lookupSetter__ ('Height');
var Height_getter = window.__lookupGetter__ ('Height');
var innerHeight_setter = window.__lookupSetter__ ('innerHeight');
var innerHeight_getter = window.__lookupGetter__ ('innerHeight');
var outerHeight_setter = window.__lookupSetter__ ('outerHeight');
var outerHeight_getter = window.__lookupGetter__ ('outerHeight');
window.__defineSetter__ ('Height', nullFcSt);
window.__defineGetter__ ('Height', Height_getter);
window.__defineSetter__ ('innerHeight', nullFcSt);
window.__defineGetter__ ('innerHeight', innerHeight_getter);
window.__defineSetter__ ('outerHeight', nullFcSt);
window.__defineGetter__ ('outerHeight', outerHeight_getter);


// ###### Insert Fake Document
Object.defineProperties(window.document.body, {
        offsetWidth: {
            value: setDefaultinWidth,
            writable: false
        }
 });
Object.defineProperties(window.document.body, {
        offsetHeight: {
            value: setDefaultinHeight,
            writable: false
        }
 });
Object.defineProperties(window.document.documentElement, {
        clientHeight: {
            value: setDefaultinHeight,
            writable: false
        }
 });
Object.defineProperties(window.document.documentElement, {
        clientWidth: {
            value: setDefaultinWidth,
            writable: false
        }
 });

// #### Document dimension setter
var wdbow_setter = window.document.body.__lookupSetter__ ('offsetWidth');
var wdbow_getter = window.document.body.__lookupGetter__ ('offsetWidth');
var wddew_setter = window.document.documentElement.__lookupSetter__ ('clientWidth');
var wddew_getter = window.document.documentElement.__lookupGetter__ ('clientWidth');
window.document.body.__defineSetter__ ('offsetWidth', nullFcSt);
window.document.body.__defineGetter__ ('offsetWidth', wdbow_getter);
window.document.documentElement.__defineSetter__ ('clientWidth', nullFcSt);
window.document.documentElement.__defineGetter__ ('clientWidth', wddew_getter);

var wdboh_setter = window.document.body.__lookupSetter__ ('offsetHeight');
var wdboh_getter = window.document.body.__lookupGetter__ ('offsetHeight');
var wddeh_setter = window.document.documentElement.__lookupSetter__ ('clientHeight');
var wddeh_getter = window.document.documentElement.__lookupGetter__ ('clientHeight');
window.document.body.__defineSetter__ ('offsetHeight', nullFcSt);
window.document.body.__defineGetter__ ('offsetHeight', wdboh_getter);
window.document.documentElement.__defineSetter__ ('clientHeight', nullFcSt);
window.document.documentElement.__defineGetter__ ('clientHeight', wddeh_getter);

// =========================
// ### Anon function end
// ----------------------------------------
// =========================
// #############################
// #############################
})(); // #########################


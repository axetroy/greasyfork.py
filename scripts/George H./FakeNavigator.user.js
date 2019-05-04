// ==UserScript==
// @name FakeNavigator
// @author JR
// @version 0.1
// @namespace .NavA
// @description Insert FakeNavigator
// @exclude http://maps.google.*/*
// ==/UserScript==

(function() { // ##################
// #############################
// #############################
// =========================
// ----------------------------------------
// ======== Insert FakeNavigator
// =========================
// ### Anon function start

var setNavigatorAgent = "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:24.0) Gecko/20100101 Firefox/24.0";
var setNavigatorPlatform = "Linux x86_64";
var setAppName = "Netscape";
var setAppCodeName = "Mozilla";
var setAppVersion="5.0 (X11; en-US)"
var setNavLanguage="en"

var fake_navigator = {
  userAgent: setNavigatorAgent,
  appVersion: setAppVersion,
  appMinorVersion: "",
  appName: setAppName,
  appCodeName: setAppCodeName,
  platform: setNavigatorPlatform,
  userLanguage: setNavLanguage,
  browserLanguage: setNavLanguage,
  language: setNavLanguage,
  mimeTypes: window.navigator.mimeTypes,
  plugins: window.navigator.plugins,
  registerContentHandler: window.navigator.registerContentHandler,
  registerProtocolHandler: window.navigator.registerProtocolHandler,
  taintEnabled: window.navigator.taintEnabled,
  getUserMedia: window.navigator.getUserMedia,
  cookieEnabled: true,
  onLine: true,
  prototype: window.navigator.prototype,
  geolocation: ""
};

window.navigator = fake_navigator;
// =========================
// ### Anon function end
// ----------------------------------------
// =========================
// #############################
// #############################
})(); // #########################

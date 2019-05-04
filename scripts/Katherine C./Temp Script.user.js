// ==UserScript==
// @name      Temp Script
// @namespace  http://scratch.mit.edu
// @version    1.0
// @description  Adds Scratch Blocks!
// @match      *://scratch.mit.edu/projects/*
// @author ThistleEverfreen
// ==/UserScript==

/*
    'save.js' is a part of 'ScratchExt', software which adds Scratch extensions.
    This is an external script that is injected into a Scratch Project (actionscript).
    This will not be injected without the user's discretion.
    
    Copyright 2014 GrannyCookies, Yoda3D, thistleeverfreen
    
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    See http://www.gnu.org/copyleft/gpl.html for more details.
*/

function installExtensionSave() {
    (function(ext) {
        
        ext._getStatus = function() {return {status: 1, msg: 'Cookies are glitchy!'};};
        var descriptor = {
            blocks: [
                [' ', 'set/create %s to %s', 'varSet', 'var'],
                [' ', 'change %s by %n', 'chaVar', 'var', '1'],
                ['r', 'variable %s', 'getVar', 'var'],
                //['b', 'report %s', 'emptyBool', 'true'],
                ['-'],
                ['-'],
                [' ', 'create cookie %s', 'createcookie', 'Cookie'],
                [' ', 'set cookie %s to %s', 'setcookie', 'Cookie', 'Something'],
                [' ', 'change cookie %s by %s', 'changecookie', 'Cookie', 'Something'],
                ['r', 'cookie %s', 'cookie', 'Cookie'],
                ['-'],
                ['b', 'cookie %s exists', 'getCookieExists', 'Cookie'],
                ['r', 'get cookie name %n', 'getCookieName', '1'],
                ['r', 'number of cookies', 'getCookeCount', 'Cookie'],
                ['-'],
                [' ', 'delete cookie %s', 'deletecookie', 'Cookie'],
                [' ', 'delete all cookies', 'deleteAllCookies'],
            ],
            menus: {
                truefalse: ['true', 'false'],
            }
            
        };
        var varHolder = {
        };
        // Completed blocks go here
        ext.varSet = function(variable, val)        {console.log("set");varHolder[variable] = val;};
        ext.chaVar = function(variable, val)        {console.log("change");varHolder[variable] = varHolder[variable] += val;};
        ext.getVar = function(variable)             {console.log("get");return varHolder[variable];};
        
        ext.createcookie = function(name)          {localStorage.setItem(name, "thing");};
        ext.deletecookie = function(name)           {localStorage.removeItem(name);};
        ext.setcookie = function(name, thing)    {localStorage.setItem(name, thing)};
        ext.changecookie = function(name, thing)    {localStorage.setItem(name, localStorage.getItem(name) + thing)};
        ext.deleteAllCookies = function()           {locakStorage.clear()};
        
        //Local storage info
        ext.getCookieExists = function(name)          {return(localStorage.getItem(name) !== null)};
        ext.getCookieName = function(index)          {return(localStorage.key(index-1))};
        ext.getCookeCount = function()              {return(localStorage.length)};
        
        ext.emptyBool = function(val)               { if(val.toLowerCase() === "true" || val === 1) { return true;} else { return false;}};

        // Uncompleted blocks go here
        ext.cookie = function(name)                 {return(localStorage.getItem(name));};

        ScratchExtensions.register('Save', descriptor, ext);
    })({});
}

installExtensionSave();
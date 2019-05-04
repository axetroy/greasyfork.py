// ==UserScript==
// @name         VIKO Moodle auto login
// @description  Automatically log in to VIKO Moodle website with zero effort!
// @namespace    erkexzcx
// @version      1.3
// @icon         http://s2.googleusercontent.com/s2/favicons?domain_url=http://moodle.viko.lt/
// @match        *://moodle.viko.lt/*
// @grant        GM_deleteValue
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

// Locate login fields on the website:
var username_field = document.querySelectorAll('#login_username, #username')[0];
var password_field = document.querySelectorAll('#login_password, #password')[0];

// If login fields not found - exit:
if(!username_field || !password_field){
    return; // Exit
}

// If user is already logged in - exit:
var logged_in = document.querySelector('div.logininfo').innerHTML;
if(logged_in.indexOf('You are not logged in.') === -1){
    return; // Exit
}

// Locate form element + retrieve from userscript DB saved username & password:
var saved_username = GM_getValue("username");
var saved_password = GM_getValue("password");
var form = document.getElementById('login');

// If there are no saved credentials:
if(saved_username === undefined || saved_password === undefined){

    // Save credentials on form submit event:
    form.addEventListener(
        "submit",
        function() {
            GM_setValue("username", username_field.value);
            GM_setValue("password", password_field.value);
        },
        false
    );

    // Tell user that need to login once to remember credentials:
    alert("In order to autologin, please login once by yourself. After that, script will remember your credentials and next time automatically log you in.");
    return; // Exit
}

// If user failed to login (script located error message):
var errors_element = document.getElementsByClassName('loginerrors')[0];
if(errors_element){

    var error_message = errors_element.innerHTML;

    if(error_message.indexOf('Your session has timed out.') > -1){
        // Ignore this error and continue to login...
    }else if(error_message.indexOf('Invalid login') > -1){
        // Stop script and remove saved credentials:
        GM_deleteValue("username");
        GM_deleteValue("password");
        return;
    }else{
        // Uknown error occured - script should stop in order to stop spamming:
        return;
    }
}

// If credentials are set and "login failed" is not found:
username_field.value = saved_username;
password_field.value = saved_password;
form.submit();
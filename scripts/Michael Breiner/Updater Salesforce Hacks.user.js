// ==UserScript==
// @name         Updater Salesforce Hacks
// @namespace    https://updater.my.salesforce.com
// @version      0.4.1
// @description  Part 1: Custom JS to automatically hide specific sections on the page based on the currently select 'Channel' for the Account, Opportunity, Lead, or Onboarding. Part 2: Custom JS to Custom JS to change manager button text
// @author       Ryan Hubbard, Michael Smith, and Michael Breiner
// @match        *://updater--sandbox.cs22.my.salesforce.com/*
// @match        *://updater.my.salesforce.com/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @grant        none
// ==/UserScript==

/**
 * - Originally Written by Ryan Hubbard
 * - Modified by Michael Smith, Force2b - 01/21/2015
 * - Modified by Michael Breiner - 06/01/2015 to include Onboarding Object
 *
 * Notes:
 * - Requires jQuery be loaded in the custom button
 * - The assumption is that each of the section names are "{ChannelName} Information".
 * - The channelSections map defines the sections that need to be visible for each Channel
 *
 **/

console.log('---- Starting Hiding Channel Sections');

// Define the Channel Names and the 'Section' of the page that should be visible
var channelNames = ['Agent', 'Brokerage', 'Employee Relo', 'Mortgage', 'Moving', 'Property Management', 'Relo Services', 'Team', 'Title Insurance', 'Truck Rental/Relo', 'University Housing'];
var channelSections = {
    'Agent' : 'Agent Information', 
    'Brokerage' : 'Brokerage Information',
    'Employee Relo' : 'Employee Relo/Relocation Services Information', 
    'Team' : 'Brokerage Information', 
    'Mortgage' : 'Mortgage Information', 
    'Moving' : 'Moving Information', 
    'Truck Rental/Relo' : 'Moving Information',
    'Property Management': 'Property Management Information',
    'Relo Services' : 'Employee Relo/Relocation Services Information',
    'Title Insurance' : 'Title Insurance Information',
    'University Housing': 'Property Management Information'  };

// Get the Channel for the current Account, Opportunity or Lead
var channel_name; 
if ($('#00NG000000E3Dh6_ileinner').length) {
    // Account
    channel_name = $('#00NG000000E3Dh6_ileinner').html();
} else if ($('#00NG000000E6JsZ_ileinner').length) {
    // Opportunity
    channel_name = $('#00NG000000E6JsZ_ileinner').html();
} else if ($('#00NG000000E3Q8k_ileinner').length) {
    // Lead
    channel_name = $('#00NG000000E3Q8k_ileinner').html();
} else if ($('#00NG000000ExTJm_ileinner').length) {
    // Onboarding
    channel_name = $('#00NG000000ExTJm_ileinner').html();
}

// If there is a channel name found on the page then continue
if (channel_name) {

    console.log('---- Current Channel: ' + channel_name);

    // Don't remove this section from the page
    var sectionToNotHide;
    if (channelSections[channel_name]) {
        sectionToNotHide = channelSections[channel_name];
        // Remove the current channel from the list
        if (channelNames.indexOf(channel_name) !== -1) {
            channelNames.splice( channelNames.indexOf(channel_name), 1);
        }
    }

    // Find all page heading sections
    $("div[id^='head_']").each(function() {
        try {
            // The Name of the section is contained on the IMG tag that is the first child of
            // the section DIV.
            var sectionName = $($($(this).children())[0]).attr("Name");

            if (sectionName !== sectionToNotHide) {
                // The assumption is that each of the section names are "{ChannelName} Information"
                // As long as that is true, this code will auto-hide any section that is not the
                // currently selected Channel for the record
                var possibleChannelName = (sectionName.split("Information")[0]).trim();

                // If the channel name is in the list of channels to hide, then hide it!
                if (channelNames.indexOf(possibleChannelName) !== -1)  {
                    console.log('---- Hiding Section for ' + possibleChannelName);
                    // Hide the section header div and the section detail div directly below it
                    $(this).hide();
                    $(this).next().hide();
                }
            }
        } catch(ex) { }
    });
    console.log('---- Finished Hiding Channel Sections');
} else {
    console.log('---- No Channel Sections to Hide');
}

var managerButtonMode = 'createManager';

// Run this 2 seconds after the page loads.
setTimeout(function() { 

  // Find the special formula field that has our details on what to do 
  // with this button. The expected values are
  // - SHOW (show as 'Make a Manager')
  // - RENAME (show as 'Remove Manager')
  // - HIDE (hide the button)
  var specialFieldLabel$ = $(".labelCol:contains('SYSTEM: Make a Manager Button Action'):first");
  var specialFieldValue$ = specialFieldLabel$.next();

  // If the custom field cannot be found, hide the button by default since
  // the current user may not have access to the field
  if (!specialFieldLabel$ || specialFieldValue$.text() === 'HIDE') {
    $("input.btn[name='make_a_manager']").hide(); 
  } else if (specialFieldValue$.text() === 'RENAME') {
    $("input.btn[name='make_a_manager']").val('Remove as Manager').prop("title","Remove as Manager");
    managerButtonMode = 'removeManager';
  }

  if (specialFieldLabel$) {
    // Hide this formula field on the layout. It should be in the right column
    // with nothing to the left for it to render nicely once hidden
    specialFieldLabel$.hide();
    specialFieldValue$.hide();
  }

}, 1000);
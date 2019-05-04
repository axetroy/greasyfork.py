// ==UserScript==
// @name Resource Guru Schedule Sorting
// @description Adds sorting for Resource Guru's Schedule page
// @namespace CEPM Scripts
// @match https://*.resourceguruapp.com/schedule*
// @grant none
// @version 0.0.7
// ==/UserScript==

(function() {
  'use strict';
  var timer;
  var jobs = {};
  var bookings = [];
  var resources = {};
  var sorted_keys = [];
  var direction = 'up';
  var oldScrollLeft = 0;
  let sort_styles = {
    rn: {
      name: 'Resource',
      sort_fn: function(a,b) {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        else return 0;
      }
    },
    job_num_total: { 
      name: 'Job Number',
      sort_fn: function(a,b) {
        if (a.longest_booking_total > b.longest_booking_total) return 1;
        if (a.longest_booking_total < b.longest_booking_total) return -1;
        else return 0;
      }
    },
    job_name_total: { 
      name: 'Job Name',
      sort_fn: function(aa,bb) {
        let a = jobs[aa.longest_booking_total] || 'ZZZZZZZ';
        let b = jobs[bb.longest_booking_total] || 'ZZZZZZZ';
        if (a > b) return 1;
        if (a < b) return -1;
        else return 0;
      }
    },
    avt: { 
      name: 'Availability',
      sort_fn: function(a,b) {
        if (a.used_pixels_total > b.used_pixels_total) return 1;
        if (a.used_pixels_total < b.used_pixels_total) return -1;
        else return 0;
      }
    }
  };
  
  // Event Watchers
  $(window).bind('scroll', e => {debounceAction(sortResources)});
  
  window.addEventListener("resize", e => {debounceAction(forceSort)});
  
  $(document).on('change','#sort-by',forceSort);
  
  $(document).on('click','#reverse-sort',reverseSort);
  
  // Main function that gets called to resort everything
  function sortResources() {
    if ($(document).scrollLeft() === oldScrollLeft ) return;
    recreateJobDb();
    recreateBookingDb();
    recreateResourceDb();
    summerizeBookingIntoResources();
    sortResourceKeysByDropdown();
    sortResourceHeaders();
    sortResourceCalendar();
    oldScrollLeft = $(document).scrollLeft();
  };
  
  // Functions that interact with DOM
  function debounceAction(callback){
    clearTimeout(timer);
    timer = setTimeout( callback , 1000 );
  }
  
  function addCSS(css){
    var head = document.getElementsByTagName('head')[0];
    var s = document.createElement('style');
    s.setAttribute('type', 'text/css');
    if (s.styleSheet) {   // IE
        s.styleSheet.cssText = css;
    } else {              // Everyone else
        s.appendChild(document.createTextNode(css));
    }
    head.appendChild(s);
  }
  
  function createAndAddDropdown(){
    $('header').append('<select id="sort-by"></select>');
    $('header').append('<button id="reverse-sort">&uarr;</button>');
    $('#sort-by').empty().append(
      Object.keys(sort_styles).map(k => {
        return '<option value="'+k+'">'+sort_styles[k].name+'</option>'
      })
    );
    
  };
  
  function forceSort(){
    oldScrollLeft = 0;
    sortResources();
  }
  
  function reverseSort(){
    oldScrollLeft = 0;
    direction = direction ==='down'? 'up' : 'down';
    $('#reverse-sort').html(direction==='up'? '&uarr;': '&darr;');
    sortResources();
  }
  
  function sortResourceKeysByDropdown(){
    let style = $('#sort-by').val();
    if (!sort_styles[style]) {
      console.error('You selected a style of sorting we do not understand');
      return;
    }
    sorted_keys = Object
      .values(resources)
      .sort(sort_styles[style].sort_fn)
      .map(x=>x.code);
    if (direction ==='down') sorted_keys.reverse();
  };
  
  function sortResourceHeaders() {
    var rs = $('aside').children();
    rs.each(function(k,r){
      let height = $(r).css('height').match(/\d+/)[0];
      if ( height > 65) height = height - 20;
      $(r).css('height',height+'px');
    });
    addDataSortIndex(rs);
    sortByDataSortIndex(rs);
    $('aside').append(rs).addClass('flash');
    setTimeout(function(){$('aside').removeClass('flash')},1100);
  }
  
  function sortResourceCalendar(){
    var rs = $('#resources').children();
    addDataSortIndex(rs);
    sortByDataSortIndex(rs);
    $('#resources').append(rs);
  }
  
  function addDataSortIndex(rs) {
    rs.each(function(k,r){
      let r_id = $(r).attr('data-resource-id');
      $(r).attr( 'data-sort-index',sorted_keys.indexOf(r_id) );
    });
  }
  
  function sortByDataSortIndex(rs) {
    rs.sort((aa,bb)=>{
      let a = parseInt($(aa).attr('data-sort-index'));
      let b = parseInt($(bb).attr('data-sort-index'));
      if (a > b) return 1;
      if (a < b) return -1;
      else return 0;
    });
  }
  
  // Gather data from interface
  function recreateBookingDb() {
    let window_width = $('.main').width();
    let scroll = $(document).scrollLeft();
    bookings = [];
    $('[data-booking-id]').each((x,e)=>{
      let bk = $(e);
      let bk_left = $(e).parents('.resources--cal-unit').position().left;
      let bk_width = bk.width();
      let start_visible = bk_left > scroll+250;
      let end_visible = bk_left+bk_width < scroll+window_width;
      if ( bk_left+bk_width < scroll  || bk_left > scroll+window_width) return;
      let end_px = end_visible? bk_left+bk_width : scroll+window_width;
      let start_px = start_visible? bk_left : scroll+250;
      let vis_px = end_px - start_px ;
      if ( vis_px < 0) return;
      let j1 = /\((.+)\)/gi.exec(bk.attr('title'));
      if (!j1) return;
      let job = j1[1];
      let r_id = $(e).parents('.resource-line').attr('data-resource-id');
      bookings.push({
          resource_id:r_id,
          job:job,
          visable_pixels:vis_px,
      });
    });
  };
  
  function recreateResourceDb() {
    resources = {};
    $('aside [data-resource-id]').each((k,e) => {
      let el = $(e);
      resources[el.attr('data-resource-id')] = {
        code : el.attr('data-resource-id'),
        name : el.find('h3').text()
      };
    });
  };
  
  function recreateJobDb() {
    jobs = {};
    $('[data-booking-id]').each((x,e)=>{
      let h = /\((.+)\)/gi.exec($(e).attr('title'));
      if (!h) return;
      let j = h[1];
      if (!jobs[j]) jobs[j] = $(e).attr('title');
    });
  }
  
  function summerizeBookingIntoResources() {
    if ( !bookings || bookings.length === 0 ) return;
    let style = $('#sort-by').val();
    if (!sort_styles[style]) return;
    // create a temporary .jobs holder with total pixels for each job
    bookings.forEach(b=>{
      if (!resources[b.resource_id].jobs) resources[b.resource_id].jobs = {};
      if (!resources[b.resource_id].jobs[b.job]) resources[b.resource_id].jobs[b.job] = 0
      resources[b.resource_id].jobs[b.job] += b.visable_pixels;
    });
    // summerize into .longest_booking_total and .used_pixels_total
    Object.keys(resources).forEach(rk=>{
      if ( !resources[rk].jobs ) {
        resources[rk].longest_booking_total = 'ZZZZZZZZZZ';
        resources[rk].used_pixels_total = 0;
        return;
      }
      var largest_total = 0;
      resources[rk].longest_booking_total = 0;
      resources[rk].used_pixels_total = 0;
      Object.keys(resources[rk].jobs).forEach(jk=>{
        resources[rk].used_pixels_total += resources[rk].jobs[jk];
        if (resources[rk].jobs[jk] > largest_total) {
          resources[rk].longest_booking_total = jk;
          largest_total = resources[rk].jobs[jk];
        };
      });
    });
    
  }
  
  // Now we start rolling
  setTimeout(createAndAddDropdown,2000);
  
  addCSS(`

#calendar.daily aside .resource>img { height:30px; width:30px; }
section .resources--cal-unit {height:50px;padding-bottom:initial}   
section .resources--cal-unit .time-available {height:10px}
.time-available-linebreak {display:inline}
.time-available-linebreak::after {content: " ";}

:root {
      --flash-bg-color: #fbf8b2;
      --normal-bg-color: #fff;
    }
    #sort-by {
      width: 180px;
      margin: 0.5em
    }

    #reverse-sort{
      width: 40px;
      height: 30px;
      margin: 0.5em;
      border: 1px solid #ccc;
      background-color: #fff;
      border-radius: 4px;
      padding-bottom: 2px;
    }

    .flash {
      -moz-animation: flash 1s ease-out;
      -moz-animation-iteration-count: 1;

      -webkit-animation: flash 1s ease-out;
      -webkit-animation-iteration-count: 1;

      -ms-animation: flash 1s ease-out;
      -ms-animation-iteration-count: 1;
    }

    @keyframes flash {
        0% { background-color: var(--normal-bg-color); }
        50% { background-color: var(--flash-bg-color); }
        100% { background-color: var(--normal-bg-color); }
    }

    @-webkit-keyframes flash {
        0% { background-color: var(--normal-bg-color); }
        50% { background-color: var(--flash-bg-color); }
        100% { background-color: var(--normal-bg-color); }
    }

    @-moz-keyframes flash {
        0% { background-color: var(--normal-bg-color); }
        50% { background-color: var(--flash-bg-color); }
        100% { background-color: var(--normal-bg-color); }
    }

    @-ms-keyframes flash {
        0% { background-color: var(--normal-bg-color); }
        50% { background-color: var(--flash-bg-color); }
        100% { background-color: var(--normal-bg-color); }
    }`);
  
})();
// ==UserScript==
// @name            Moodle Courselist Sort
// @namespace       openbyte/mclsort
// @description     Sorts the moodle course list.
// @icon            https://image.ibb.co/iwn9km/Oygi_Eh_QE6rcn8_KW1e3b_LUPXt67_A6_QEOKy_Eqv_W_Qx_UT8v_N_BEtt_ODh2c_YPrk2d_S7hjy_A_w300.png
// @include         http://moodle.*/my/*
// @include         https://moodle.*/my/*
// @include         http://www.moodle.*/my/*
// @include         https://www.moodle.*/my/*
// @include         http://moodle.*.*/my/*
// @include         https://moodle.*.*/my/*
// @include         http://www.moodle.*.*/my/*
// @include         https://www.moodle.*.*/my/*
// @include         http://moodle.*.*.*/my/*
// @include         https://moodle.*.*.*/my/*
// @include         http://www.moodle.*.*.*/my/*
// @include         https://www.moodle.*.*.*/my/*
// @license         MIT License
// @encoding        utf-8
// @compatible      firefox
// @compatible      chrome
// @compatible      opera
// @run-at          document-idle
// @version         0.1.1
// @grant           none
// ==/UserScript==

'esversion: 6';


Array.prototype.clone = function() {
	return this.slice(0);
};

Node.prototype.detach = function () {
  return this.parentNode.removeChild(this);
}

Node.prototype.remove = function () {
  this.parentNode.removeChild(this);
  return this;
};


function Course(element) {
  this.e = Object.create(null);
  this.e.self = element;
  this.e.title = element.querySelector(".title a, h2 a");
  this.e.activity = element.getElementsByClassName("activity_info")[0];
  
  this.title = this.e.title.innerText;
  this.activity = typeof this.e.activity !== "undefined" && this.e.activity !== null;
}

function compare (a, b) {
  return a.activity ? -1 : 1;
}
   

var courselist = document.getElementsByClassName("coursebox");

(function () {
  if (courselist.length === 0)
    return;
  
  var courses = [];
  for (var course of courselist) {
    courses.push(new Course(course));
  }
  
  courses_sorted = courses.clone();
  courses_sorted.sort(compare);
  console.log(courses_sorted);

  var parent = courses[0].e.self.parentNode;
  for (var course of courses) {
    course.e.self = course.e.self.detach();
  }
  console.log(parent);
  for (var course of courses_sorted) {
    parent.appendChild(course.e.self);
  }
})();

// ==UserScript==
// @name        New IMDB Age
// @namespace   imdb-age.com
// @description Add actors age back to IMDB after they complained like whiny little bitches!
// @include     http://*imdb.com/name/*
// @require     https://code.jquery.com/jquery-3.2.1.min.js
// @version     1.0
// @grant       none
// ==/UserScript==

$(document).ready(function() {
  if (window.location.href.indexOf('name') != -1) {
    birthDateNode = $("time[itemprop='birthDate']");
    deathDateNode = $("time[itemprop='deathDate']");

    var alive = true;
    var born = new Date();
    var died = new Date();

    // GM may execute multiple times.
    // Don't do anything unless this condition succeeds.
    if (birthDateNode && birthDateNode.attr('datetime')) {
      date = birthDateNode.attr('datetime').split('-');
      born.setFullYear(date[0]);
      born.setMonth(date[1] - 1);
      born.setDate(date[2]);
      alive = true;

      if (deathDateNode && deathDateNode.attr('datetime')) {
        date = deathDateNode.attr('datetime').split('-');
        died.setFullYear(date[0]);
        died.setMonth(date[1] - 1);
        died.setDate(date[2]);
        alive = false;
      }

      // alert("Born: " + born + "\nDied: " + died + "\nAlive: " + alive);

      var age;
      if (alive) {
        age = new Date() - born.getTime();
      } else {
        age = died.getTime() - born.getTime();
      }

      /* convert difference into years */
      age = age / (1000 * 60 * 60 * 24 * 365.242199);

      /* get nice values */
      var years =  Math.floor( age );
      var months = Math.floor( (age - years) * 12 );

      // alert("Age: " + age);

      justyear = false;
      var container = " <span>(Age: " +
                      years +
                      " year" +
                      (years == 1 ? '' : 's') +
                              (!justyear ? ", " +
                              months +
                              " month" +
                              (months == 1 ? '' : 's')
                              : '') +
              ")</span>";

      /* loop over all dates */
      if (alive == true) {
        $(container).insertAfter(birthDateNode);
      }
    }
  }
});

// ==UserScript==
// @name        FIMFiction - Remaining Words and Reading Time
// @namespace   Selbi
// @include     http*://fimfiction.net/*
// @include     http*://www.fimfiction.net/*
// @version     3.0.3
// @description Displays average reading time left and overall story progress.
// ==/UserScript==

//////////////////////////////////////
// Read Time in Words-Per-Minute
const WPM = 267;
// You must enter your own speed!
//////////////////////////////////////

(function() {
  var storyContainers = document.querySelectorAll("article.story_container");
  for (story of storyContainers) {
    parseStory(story);
  }
  
  function parseStory(story) {
    // Global variables
    var readWordsNode = document.createElement("b");
    var outOfTextNode = document.createElement("span");
    var totalWordCountElem = story.querySelector(".chapters-footer > .word_count > b");
    var remainingTimeNode = document.createElement("span");
    var progressBarProgressNode = document.createElement("div");
    var totalWordCount = parseIntFull(totalWordCountElem.innerHTML);
    var totalReadWords = 0;
    var readChapters = 0;
    var totalChapters = 0;

    // Reusable hook (with timeout troubleshooting)
    var updateHandler = function(){ setTimeout(function(){ updateRemainingReadTime(); }, 1000); };

    // One-time call at page loag
    (function init() {
      // Add hook for toggle all chapters button
      story.querySelector(".chapters-footer > a").addEventListener("click", updateHandler, false);

      // Parse chapters for the first time
      readWordsNode.innerHTML = numberWithCommas(parseChapters(true));

      // "x of y words" box
      outOfTextNode.innerHTML = " of ";
      totalWordCountElem.before(outOfTextNode);
      outOfTextNode.before(readWordsNode);
      
      // Write total remaining reading time
      Object.assign(remainingTimeNode.style, {fontSize: "90%", opacity: "0.8", marginRight: "1em"});
      writeReadTime();
      readWordsNode.before(remainingTimeNode);

      // Create and insert the progress bar
      var progressBarNode = document.createElement("div");
      progressBarNode.style.height = "4px";
      var barWidth = getPercent(totalReadWords, totalWordCount);
      progressBarProgressNode.title = barWidth;
      Object.assign(progressBarProgressNode.style, {
        width: barWidth,
        backgroundColor: "green",
        height: "inherit",
        borderBottomLeftRadius: "4px",
        borderBottomRightRadius: "4px",
        transition: "width 0.2s ease-out"
      });
      progressBarNode.appendChild(progressBarProgressNode);
      story.querySelector(".chapters-footer").after(progressBarNode);
    })();

    // Central function to read the word count and reading status of each chapter
    // Also adds reading times for each chapter on page loag
    function parseChapters(isInit) {
      // All chapters minus the "Show" button for long stories
      var chapterElems = story.querySelectorAll(".chapters > li > div:not(.chapter_expander)");
      totalChapters = chapterElems.length;
      
      // Reset accus
      var readWords = 0;
      readChapters = 0;
      
      for (ch of chapterElems) {
        // Element references
        var readIconElem = ch.querySelector("a.chapter-read-icon");
        var wordCountElem = ch.querySelector("div.word_count span.word-count-number");
        
        // Skip unpublished chapters
        if (readIconElem.parentNode.querySelector("img") != null) {
          totalChapters--;
          continue;
        }
        
        // Total word count
        var chapterWordCount = parseIntFull(wordCountElem.innerHTML);
        if (readIconElem.classList.contains("chapter-read")) {
          readWords += chapterWordCount;
          readChapters++;
        }

        // Gets called only once (wrapped into the same function to reduce loading times)
        if (isInit) {
          // Reading time
          var readTimeNode = document.createElement("span");
          readTimeNode.innerHTML = convertToTime(chapterWordCount);
          Object.assign(readTimeNode.style, {fontSize: "80%", opacity: "0.5", marginRight: "1em"});    
          wordCountElem.before(readTimeNode);
          wordCountElem.parentNode.title = getPercent(chapterWordCount, totalWordCount);

          // Hook
          readIconElem.addEventListener("click", updateHandler, false);
        }
      }
      totalReadWords = readWords;
      return readWords;
    }

    // Gets called on page load and on every
    function updateRemainingReadTime() {
      readWordsNode.innerHTML = numberWithCommas(parseChapters(false));
      writeReadTime();
      var percent = getPercent(totalReadWords, totalWordCount);
      progressBarProgressNode.style.width = percent;
      progressBarProgressNode.title = percent;
    }

    // Read time with respect to the fact whether a story is read or not
    function writeReadTime() {
      remainingTimeNode.title = readChapters + " / " + totalChapters + " chapters read (" + convertToTime(totalReadWords) + ")";
      if (totalReadWords > 0 && readChapters < totalChapters) {
        readWordsNode.classList.remove("hidden");
        outOfTextNode.classList.remove("hidden");
        remainingTimeNode.innerHTML = convertToTime(totalWordCount - totalReadWords) + " of " + convertToTime(totalWordCount) + " remaining";
        return;
      }
      
      readWordsNode.classList.add("hidden");
      outOfTextNode.classList.add("hidden");
      remainingTimeNode.innerHTML = convertToTime(totalWordCount);
    }
  }
  
  ///////////////////
  // Formatting functions

  function parseIntFull(number) {
    return parseInt(number.replace(/,/g, "").trim());
  }
  
  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  function convertToTime(wordCount) {
    var time = (Math.ceil(wordCount / WPM));
    if (time > 60) {
      time = ((Math.ceil(time / 6)) / 10).toFixed(1) + " h";
    } else {
      time += " min";
    }
    return time;	
  }
  
  function getPercent(num1, num2) {
    return Math.min(100, (Math.round(num1 / num2 * 10000) / 100)).toFixed(2) + "%";
  }
})();

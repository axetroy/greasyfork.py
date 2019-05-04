// ==UserScript==
// @name        Timestamps for Fefes Blog
// @description This adds the creation timestamp to Fefes blogposts.
// @namespace   ceremony.fefesblog.timestamps
// @include     https://blog.fefe.de/
// @include     https://blog.fefe.de/?*
// @version     1.33.7
// @grant       none
// ==/UserScript==

const posts = document.querySelectorAll("body > ul > li");

Array.prototype.forEach.call(posts, function(post){
  let link = post.querySelector("a:first-child"),
      datetime = new Date((parseInt(link.href.substr(-8), 16) ^ 0xfefec0de) * 1000),
      p = document.createElement("p");
  
  p.textContent = datetime.toLocaleTimeString("de-DE")
  p.classList.add("time");
  post.append(p);
})
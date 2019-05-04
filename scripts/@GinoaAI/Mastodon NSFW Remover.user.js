// ==UserScript==
// @name 	Mastodon NSFW Remover
// @description Automatically display NSFW image & movie.
// @author 	GinoaAI
// @namespace 	https://greasyfork.org/ja/users/119008-ginoaai
// @version 	4.22
// @match 	*://mstdn.jp/*
// @match 	*://pawoo.net/*
// @match 	*://friends.nico/*
// @match 	*://mastodon.cloud/*
// @match 	*://mstdn-workers.com/*
// @icon 	https://pbs.twimg.com/profile_images/1099150852390977536/nvzJU-oD_400x400.png
// ==/UserScript==
  ((b = document.querySelector(".columns-area") || document.body, r) => {
    (r = t => [...t.target.querySelectorAll(".media-spoiler,.video-player__spoiler.active")].forEach(n => n.click()))({
      target: b
    });
    new MutationObserver(s => s.forEach(r)).observe(b, {
      childList: 1,
      subtree: 1
    });
  })();
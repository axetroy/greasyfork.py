// ==UserScript==
// @name        Remove junk URL parameters
// @namespace   DavidJCobb
// @description Hides UTM and other tracking parameters from URLs.
// @include     http://*
// @include     https://*
// @version     1
// @grant       none
// ==/UserScript==

{
   let url = new URL(window.location.href);
   {  // Remove garbage keys
      let params = url.searchParams;
      if (params.get("wpsrc") == "socialedge")
         params.delete("wpsrc");
      for(var key of params.keys()) {
         switch (key) {
            case "tse_id":
               params.delete(key);
               continue;
         }
         if (key.startsWith("utm_"))
            params.delete(key);
      }
   }
   //
   // show altered URL in URL bar
   //
   history.replaceState(
      {},
      window.title,
      url.href
   );
}
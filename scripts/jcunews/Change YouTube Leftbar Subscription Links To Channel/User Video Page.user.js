// ==UserScript==
// @name         Change YouTube Leftbar Subscription Links To Channel/User Video Page
// @namespace    ChangeYouTubeLeftbarSubscriptionLinksToChannelUserVideoPage
// @version      1.1.7
// @license      AGPL v3
// @description  Change YouTube leftbar's subscription links to channel/user video page. This script can optionally also move the links to top of the list if it has new uploaded videos. Both features can be enabled/disabled. For new YouTube layout only.
// @author       jcunews
// @match        *://www.youtube.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

//===== Configuration Start ===

var changeLinksURL = true;
var moveLinksToTop = true;

//===== Configuration End ===

function changeUrl(url, m) {
  if (m = url.match(/^\/feed\/subscriptions\/([^\/]+)$/)) {
    return "/channel/" + m[1] + "/videos";
  } else return url + "/videos";
}

function patchGuide(guide) {
  if (guide && !guide.cysl_done) {
    guide.cysl_done = 1;
    guide.items.forEach(function(v, vc, l, w, c, i) {
      if (v.guideSubscriptionsSectionRenderer) {
        //change links' URL
        if (changeLinksURL) {
          v.guideSubscriptionsSectionRenderer.items.forEach(function(w) {
            if (w.guideCollapsibleEntryRenderer) {
              w.guideCollapsibleEntryRenderer.expandableItems.forEach(function(x) {
                if (x.guideEntryRenderer.badges && (x = x.guideEntryRenderer.navigationEndpoint)) {
                  x.commandMetadata.webCommandMetadata.url = changeUrl(x.commandMetadata.webCommandMetadata.url);
                  if (x.webNavigationEndpointData) x.webNavigationEndpointData.url = changeUrl(x.webNavigationEndpointData.url);
                }
              });
            } else if (w = w.guideEntryRenderer.navigationEndpoint) {
              w.commandMetadata.webCommandMetadata.url = changeUrl(w.commandMetadata.webCommandMetadata.url);
              if (w.webNavigationEndpointData) w.webNavigationEndpointData.url = changeUrl(w.webNavigationEndpointData.url);
            }
          });
        }
        //move links with new uploads to top
        if (moveLinksToTop) {
          v = v.guideSubscriptionsSectionRenderer.items;
          vc = v.length - 1;
          w = v[vc].guideCollapsibleEntryRenderer;
          l = v.splice(0, vc);
          c = -1;
          if (w) {
            (w = w.expandableItems).some(function(e, i) {
              if (!e.guideEntryRenderer.badges) {
                c = i;
                return true;
              }
            });
            l.push.apply(l, w.splice(0, c));
          }
          c = [];
          for (i = l.length - 1; i >= 0; i--) {
            if (l[i].guideEntryRenderer.count || (l[i].guideEntryRenderer.presentationStyle === "GUIDE_ENTRY_PRESENTATION_STYLE_NEW_CONTENT")) {
              if (vc--) {
                v.unshift(l.splice(i, 1)[0]);
              } else c.unshift(l.splice(i, 1)[0]);
            }
          }
          c.push.apply(c, l);
          if (vc) {
            l = c.splice(0, vc);
            l.unshift.apply(l, [v.length - 1, 0]);
            v.splice.apply(v, l);
          }
          if (w) w.unshift.apply(w, c);
        }
      }
    });
    return true;
  }
  return false;
}

var ht1 = 0, ht2 = 0;

(function chkStatic(ev) {
  clearTimeout(ht1);
  if (!patchGuide(window.ytInitialGuideData)) {
    ht1 = setTimeout(chkStatic, 0);
  }
})();

(function chkSpf() {
  clearTimeout(ht2);
  if (window.spf && spf.request && !spf.request_cysl) {
    spf.request_cysl = spf.request;
    spf.request = function(a, b) {
      if (b && b.onDone) {
        var onDone_ = b.onDone;
        b.onDone = function(response) {
          if (response && (/\/guide_ajax\?/).test(response.url) && response.response && response.response.response) {
            patchGuide(response.response.response);
          }
          return onDone_.apply(this, arguments);
        };
        return this.request_cysl.apply(this, arguments);
      }
    };
    return;
  }
  ht2 = setTimeout(chkSpf, 0);
})();

addEventListener("load", function() {
  clearTimeout(ht1);
  clearTimeout(ht2);
});

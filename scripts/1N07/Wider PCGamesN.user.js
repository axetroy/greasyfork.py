// ==UserScript==
// @name         Wider PCGamesN
// @namespace    1N07
// @author       1N07
// @version      0.5.1
// @description  Makes the PCGamesN site wrapper and content wider (custom width)
// @match        https://www.pcgamesn.com/*
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// @noframes
// ==/UserScript==

(function() {
    var siteWidthOption;
    var siteWidth = GM_getValue("siteWidth", 65);
    SetSiteWidthOption();

    var centerImgOption;
    var centerImg = GM_getValue("centerImg", true);
    SetCenterImgOption();

    window.onload = function() {
        doTheThings();
        setTimeout(doTheThings, 1000); //Doing another pass in case it fails the first one because shit hasn't loaded properly yet.
    }

	if(true) {
		addGlobalStyle(`
			#site_wrap, .next_page_placeholder, .flow_ad_wrap {
				max-width: `+siteWidth+`% !important;
				width: `+siteWidth+`% !important;
				box-sizing: border-box;
			}

			.sticky_rail600 {
				max-height: 600px;
				height: auto !important;
			}

			.ad-mobile {
				display: none !important;
			}

			.feature_aside {
				display: inline-block;
				width: auto;
			}

			.feature_posts {
				width: auto;
				text-align: center;
			}

			.post_med {
				display: inline-block;
				margin: 10px;
			}

			.entry-content {
				width: auto !important;
				margin: 30px 75px;
			}

			.content_expander {
				display: none; /*unsure what this is for, doesn't seem to ever contain anything but empty space for no reason*/
			}

			article > div.article-featured-image img {
				max-width: 100%;
			}

			.feature-header {
				margin: auto;
				max-width: 100%;
			}

			.list_feature_item img {
				width: 900px !important;
			}
			.list_feature_item {
				margin: 0 -60px 35px !important;
			}

			.responsive-container {
				width: 900px !important;
				height: 507px !important;
				margin: 30px `+(centerImg ? `auto` : `0`)+` !important;
			}

			.pcgn-pullquote {
				margin-left: -75px !important;
			}

			.pcgn-callout {
				margin-right: -75px !important;
			}

			p > img, p .gallery {
				max-width: 100%;
			}

			`+(centerImg ? `
				p .gallery img {
					margin: 0 !important;
					left: 0px !important;
					transform: initial !important;
					width: 100%;
				}
				p > img {
					margin: auto !important;
					left: 0px !important;
					transform: initial !important;
				}
			` : `
				p img.aligncenter {
					left: 0px !important;
					transform: initial !important;
					width: 900px !important;
					margin: 30px calc(50% - 450px) !important;
				}

				p .gallery img.size-large:not(.aligncenter), p .gallery img.size-full:not(.aligncenter) {
					margin: 30px 0 !important;
					width: 900px !important;
				}
			`)+`

			p .gallery {
				`+(centerImg ? `
					width: 900px !important;
					margin: 30px auto !important;
				` : `
					width: 100% !important;
				`)+`
			}

			.image_comparison {
				margin-left: 160px; !important;
			}

			div.pcgn_gallery_large {
				margin: 30px `+(centerImg ? `auto` : `0`)+` !important;
			}
		`);
	}

    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    function doTheThings() {
        try {
            var thing = document.getElementsByClassName("feature_aside")[0];
            if(thing.offsetWidth < 1) {
                document.getElementsByClassName("feature_posts")[0].style.width = "100%";
            }
        } catch(err) {}

        try {
            /*var articleImg = document.getElementsByClassName("article-featured-image")[0].getElementsByTagName("img")[0];
            articleImg.removeAttribute("sizes");
            articleImg.removeAttribute("width");
            articleImg.removeAttribute("height");*/
        } catch(err) {}

        try {
            var moreImgs = document.getElementsByClassName("gallery");
            for(var i = 0, len = moreImgs.length; i < len; i++) {
                moreImgs[i].getElementsByTagName("img")[0].removeAttribute("sizes");
                moreImgs[i].getElementsByTagName("img")[0].removeAttribute("width");
                moreImgs[i].getElementsByTagName("img")[0].removeAttribute("height");
            }
        } catch(err) {}
    }

    function SetSiteWidthOption() {
		GM_unregisterMenuCommand(siteWidthOption);
        siteWidthOption = GM_registerMenuCommand("Site width: " + siteWidth + " -click to change-", function(){
            let prevVal = siteWidth;
            siteWidth = prompt("Give the site width value (in percent of window width)", prevVal);
            if(isNaN(siteWidth) || siteWidth < 1 || siteWidth > 100) {
                alert("invalid value");
                siteWidth = prevVal;
            }
            else {
                GM_setValue("siteWidth", siteWidth);
                SetSiteWidthOption();
                if(confirm("Refresh now to see changes?")) {
                    location.reload();
                }
            }
        });
    }

    function SetCenterImgOption() {
		GM_unregisterMenuCommand(centerImgOption);
        centerImgOption = GM_registerMenuCommand("Center images: " + (centerImg ? "yes" : "no") + " -click to change-", function(){
            centerImg = !centerImg;
            GM_setValue("centerImg", centerImg);
			SetCenterImgOption();
			if(confirm("Refresh now to see changes?")) {
				location.reload();
            }
        });
    }
})();

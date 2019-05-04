// ==UserScript==
// @name         Instagram Source Opener
// @version      0.7.1
// @description  Open the original source of an IG post, story or profile picture. No jQuery
// @author       jomifepe
// @icon         https://www.instagram.com/favicon.ico
// @require      https://cdnjs.cloudflare.com/ajax/libs/arrive/2.4.1/arrive.min.js
// @include      https://www.instagram.com/*
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @namespace 	 https://greasyfork.org/users/192987
// ==/UserScript==

(function() {
	"use strict";
	const LOGGING_ENABLED = true;

	/* this script relies a lot on class names, I'll keep an eye on changes */
	const IG_C_STORY_CONTAINER = "yS4wN";
	const IG_C_STORY_MEDIA_CONTAINER = "qbCDp";
	const IG_C_POST_IMG = "FFVAD";
	const IG_C_POST_VIDEO = "tWeCl";
	const IG_C_SINGLE_POST_CONTAINER = "JyscU";
	const IG_C_MULTI_POST_SCROLLER = "MreMs";
	const IG_C_MULTI_POST_LIST_ITEM = "_-1_m6";
	const IG_C_POST_CONTAINER = "_8Rm4L";
	const IG_S_POST_BUTTONS = ".eo2As > section";
	const IG_C_PROFILE_PIC_CONTAINER = "RR-M-";
	const IG_C_PRIVATE_PROFILE_PIC_CONTAINER = "M-jxE";
	const IG_C_PRIVATE_PIC_IMG_CONTAINER = "_2dbep";
	const IG_C_PRIVATE_PROFILE_PIC_IMG_CONTAINER = "IalUJ";
	const IG_C_PROFILE_CONTAINER = "v9tJq";
	const IG_C_PROFILE_USERNAME_TITLE = "fKFbl";

	const C_BTN_STORY = "iso-story-btn";
	const C_BTN_STORY_CONTAINER = "iso-story-container";
	const C_POST_WITH_BUTTON = "iso-post";
	const C_BTN_POST_OUTER_SPAN = "iso-post-container";
	const C_BTN_POST = "iso-post-btn";
	const C_BTN_POST_INNER_SPAN = "iso-post-span";
	const C_BTN_PROFILE_PIC_CONTAINER = "iso-profile-pic-container";
	const C_BTN_PROFILE_PIC = "iso-profile-picture-btn";
	const C_BTN_PROFILE_PIC_SPAN = "iso-profile-picture-span";

	const S_IG_POST_CONTAINER_WITHOUT_BUTTON = `.${IG_C_POST_CONTAINER}:not(.${C_POST_WITH_BUTTON})`;

	const getIgUserInfoApiUrl = (userID) => `https://i.instagram.com/api/v1/users/${userID}/info/`;

	/* injects the needed CSS into DOM */
	injectStyles();

	/* triggered whenever a new instagram post is loaded on the feed */
	document.arrive(S_IG_POST_CONTAINER_WITHOUT_BUTTON, (node) => {
		generatePostButton(node);
	});

	/* triggered whenever a single post is opened (on a profile) */
	document.arrive(`.${IG_C_SINGLE_POST_CONTAINER}`, (node) => {
		generatePostButton(node);
	});

	/* triggered whenever a story is opened */
	document.arrive(`.${IG_C_STORY_CONTAINER}`, (node) => {
		generateStoryButton(node);
	});

	/* triggered whenever a profile page is loaded */
	document.arrive(`.${IG_C_PROFILE_CONTAINER}`, (node) => {
		generateProfilePictureButton(node);
	});

	/**
	 * Window load callback
	 * Checks if there are relevant nodes already loaded in DOM and performs the corresponding actions
	 */
	window.onload = ((e) => {
		if (/* is on post feed */ window.location.pathname === '/') {
			let postArticles = document.querySelectorAll(S_IG_POST_CONTAINER_WITHOUT_BUTTON);
			postArticles.forEach(node => generatePostButton(node));
		} else if (/* is on single post page */ window.location.pathname.startsWith("/p/")) {
			let node = document.querySelector(`.${IG_C_SINGLE_POST_CONTAINER}`);
			if (node != null) {
				generatePostButton(node);
			}
		} else if (/* is on story page */ window.location.pathname.startsWith("/stories/")) {
			let node = document.querySelector(`.${IG_C_STORY_CONTAINER}`);
			if (node == null) {
				generateStoryButton(node);
			}
		}
	})

	/**
	 * Appends new elements to DOM containing the story source opening button
	 * @param {Object} node DOM element node
	 */
	function generateStoryButton(node) {
		/* exits if the story button already exists */
		if (elementExistsInNode(`.${C_BTN_STORY_CONTAINER}`, node)) return;

		try {
			let buttonStoryContainer = document.createElement("span");
			let buttonStory = document.createElement("button");

			buttonStoryContainer.classList.add(C_BTN_STORY_CONTAINER);
			buttonStory.classList.add(C_BTN_STORY);
			buttonStoryContainer.setAttribute("title", "Open source");
			buttonStory.addEventListener("click", () => openStoryContent(node));
			
			buttonStoryContainer.appendChild(buttonStory);
			node.appendChild(buttonStoryContainer);
		} catch (exception) {
			logError("Failed to generate story button", exception);
		}
	}

	/**
	 * Appends new elements to DOM containing the post source opening button
	 * @param {Object} node DOM element node
	 */
	function generatePostButton(node) {
		/* exits if the post button already exists */
		if (elementExistsInNode(`.${C_BTN_POST_OUTER_SPAN}`, node)) return;

		try {
			let buttonsContainer = node.querySelector(IG_S_POST_BUTTONS);
			let newElementOuterSpan = document.createElement("span");
			let newElementButton = document.createElement("button");
			let newElementInnerSpan = document.createElement("span");

			newElementOuterSpan.classList.add(C_BTN_POST_OUTER_SPAN);
			newElementButton.classList.add(C_BTN_POST);
			newElementInnerSpan.classList.add(C_BTN_POST_INNER_SPAN);
			newElementOuterSpan.setAttribute("title", "Open source");
			newElementButton.addEventListener("click", () => openPostSourceFromSrcAttribute(node));

			newElementButton.appendChild(newElementInnerSpan);
			newElementOuterSpan.appendChild(newElementButton);
			buttonsContainer.appendChild(newElementOuterSpan);
			node.classList.add(C_POST_WITH_BUTTON);
		} catch (exception) {
			logError("Failed to generate post button", exception);
		}
	}

	/**
	 * Appends new elements to DOM containing the profile picture source opening button
	 * @param {Object} node DOM element node
	 */
	function generateProfilePictureButton(node) {
		/* exits if the profile picture button already exists */
		if (elementExistsInNode(`.${C_BTN_PROFILE_PIC_CONTAINER}`, node)) return;

		try {
			let profilePictureContainer = node.querySelector(`.${IG_C_PROFILE_PIC_CONTAINER}`);
			/* if the profile is private and the user isn't following or isn't logged in */
			if (!profilePictureContainer) {
				profilePictureContainer = node.querySelector(`.${IG_C_PRIVATE_PROFILE_PIC_CONTAINER}`);
			}
			let newElementOuterSpan = document.createElement("span");
			let newElementButton = document.createElement("button");
			let newElementInnerSpan = document.createElement("span");
			newElementOuterSpan.setAttribute("title", "Open full size picture");
			newElementButton.addEventListener("click", e => {
				e.stopPropagation();
				openProfilePictureSource();
			});

			newElementOuterSpan.classList.add(C_BTN_PROFILE_PIC_CONTAINER);
			newElementButton.classList.add(C_BTN_PROFILE_PIC);
			newElementInnerSpan.classList.add(C_BTN_PROFILE_PIC_SPAN);

			newElementButton.appendChild(newElementInnerSpan);
			newElementOuterSpan.appendChild(newElementButton);
			profilePictureContainer.appendChild(newElementOuterSpan);
		} catch (error) {
			logError(error);
		}
	}

	/**
	 * Gets the story source url from the src attribute on the node and opens it in a new tab
	 * @param {Object} node DOM element node
	 */
	function openStoryContent(node) {
		try {
			let container = node.querySelector(`.${IG_C_STORY_MEDIA_CONTAINER}`);
			let video = container.querySelector("video");
			let image = container.querySelector("img");
			if (video) {
				let videoElement = video.querySelector("source");
				let videoSource = videoElement ? videoElement.getAttribute("src") : null;
				if (!videoSource) {
					throw "Video source isn't available";
				}
				window.open(videoSource, "_blank");
			} else if (image) {
				let imageSource = image.getAttribute("src");
				if (!imageSource) {
					throw "Image source isn't available";
				}
				window.open(imageSource, "_blank");
			} else {
				throw "Story media isn't available"
			}
		} catch (exception) {
			showAndLogError("Failed to open story source", exception);
		}
	}

	/**
	 * Gets the source url of a post from the src attribute on the node and opens it in a new tab
	 * @param {Object} node DOM element node
	 */
	function openPostSourceFromSrcAttribute(node) {
		let nodeListItems = node.querySelectorAll(`.${IG_C_MULTI_POST_LIST_ITEM}`);

		try {
			if (/* is multi post */ nodeListItems.length != 0) {
				let scroller = node.querySelector(`.${IG_C_MULTI_POST_SCROLLER}`);
				let scrollerOffset = Math.abs((() => {
					let scrollerStyles = window.getComputedStyle(scroller);
					return parseInt(scrollerStyles.getPropertyValue("transform").split(",")[4]);
				})());

				let mediaIndex = 0;
				if (scrollerOffset != 0) {
					let totalWidth = 0;
					nodeListItems.forEach(item => {
						let itemStyles = window.getComputedStyle(item);
						totalWidth += parseInt(itemStyles.getPropertyValue("width"));
					});
					mediaIndex = ((scrollerOffset * nodeListItems.length) / totalWidth);
				}

				openPostMediaSource(nodeListItems[mediaIndex]);
			} else /* is single post */ {
				openPostMediaSource(node);
			}
		} catch (exception) {
			showAndLogError("Failed o open post source", exception);
		}
	}

	/**
	 * Gets the source url of a post from the src attribute on the node and opens it in a new tab
	 * @param {Object} node DOM element node
	 */
	function openPostMediaSource(node) {
		let image = node.querySelector(`.${IG_C_POST_IMG}`);
		let video = node.querySelector(`.${IG_C_POST_VIDEO}`);
		if (!image && !video) {
			throw "Failed to open source, no media found";
		}
		window.open((video || image).getAttribute("src"), "_blank");
	}

	/**
	 * Gets the source url of a profile picture from the instagram API and opens it in a new tab 
	 */
	function openProfilePictureSource() {
		let defaultErrorHandler = error => {
			document.body.style.cursor = "default";
			alert("Couldn't get profile picture source");
			logError(`Failed to get profile picture source: ${error}`);
		}

		try {
			let openImageFromUserInfo = response => {
				let hdImageURL = response.hd_profile_pic_url_info;
				if (hdImageURL != null) {
					window.open(hdImageURL.url, "_blank");
				}
				document.body.style.cursor = "default";
			};
			let openImageFromUpdatedSharedData = () => {
				getUpdatedProfilePageData()
					.then(response => {
						getUserInfoFromAPI(response.id)
							.then(openImageFromUserInfo)
							.catch(defaultErrorHandler);
					})
					.catch(defaultErrorHandler);
			};
			let openImageFromUserInfoAPI = userData => {
				getUserInfoFromAPI(userData.id)
					.then(openImageFromUserInfo)
					.catch(error => {
						let sharedDataImageURL = userData.profile_pic_url_hd;
						if (sharedDataImageURL) {
							window.open(sharedDataImageURL, "_blank");
						} else {
							defaultErrorHandler(error);
						}
					});
			};
			let openImageFromFreshHTMLPage = () => {
				getUserInfoFromFreshHTMLPage()
					.then(openImageFromUserInfoAPI)
					.catch(defaultErrorHandler);
			};

			let pageUsername = document.querySelector(`.${IG_C_PROFILE_USERNAME_TITLE}`).innerText;
			let profilePageData = _sharedData.entry_data.ProfilePage;

			document.body.style.cursor = "wait";
			/* if sharedData has any user information */
			if (profilePageData) {
				let userSharedData = profilePageData[0].graphql.user;
				/* if sharedData is correct */
				if (pageUsername === userSharedData.username) {
					/* getting user info from the api */
					openImageFromUserInfoAPI(userSharedData);
				/* if the user is logged in */
				} else if (_sharedData.config.viewer != null) {
					/* querying graphql directly to get user info*/
					openImageFromUpdatedSharedData();
				} else {
					/* getting a fresh new page and updated ProfilePage user data */
					openImageFromFreshHTMLPage();
				}
			} else {
				openImageFromFreshHTMLPage();
			}
		} catch (error) {
			defaultErrorHandler(error);
		}
	}

	/**
	 * Parses a whole HTML page as a last attempt to get the user id
	 * - This function is only used when:
	 * 	- The profile page is private
	 * 	- The user isn't logged in
	 * 	- The sharedData variable, which holds the profile user's id, isn't correct
	 * @returns {Promise} Promise with the ProfilePage user data object or an error
	 */
	function getUserInfoFromFreshHTMLPage() {
		return new Promise((resolve, reject) => {
			httpGETRequest(window.location, false)
				.then(response => {
					try {
						let parser = new DOMParser();
						let doc = parser.parseFromString(response, "text/html");
						let allScripts = doc.querySelectorAll("script");

						for (let i = 0; i < allScripts.length; i++) {
							if (/window._sharedData/.test(allScripts[i].innerText)) {
								let extractedJSON = /window._sharedData = (.+)/.exec(allScripts[i].innerText)[1];
								extractedJSON = extractedJSON.slice(0, -1);
								let sharedData = JSON.parse(extractedJSON);
								let userInfo = sharedData.entry_data.ProfilePage[0].graphql.user;
								resolve(userInfo);
								break;
							}
						}
					} catch (error) {
						reject(error);
					}
				})
				.catch(error => reject(error));
		});
	}

	/**
	 * Requests user information from the instagram API
	 * @param {number} userId 
	 * @returns {Promise} Promise with the user info object or an error
	 */
	function getUserInfoFromAPI(userId) {
		return new Promise((resolve, reject) => {
			httpGETRequest(getIgUserInfoApiUrl(userId))
				.then(response => {
					let userInfo = response.user;
					resolve(userInfo);
				})
				.catch(error => reject(error))
		})
	}

	/**
	 * Requests the user profile page data from graphql
	 * @returns {Promise} Promise with the graphql user info object or an error
	 */
	function getUpdatedProfilePageData() {
		return new Promise((resolve, reject) => {
			httpGETRequest(`${window.location}?__a=1`)
				.then(response => {
					let userSharedData = response.graphql.user;
					resolve(userSharedData);
				})
				.catch(error => reject(error))
		});
	}

	/**
	 * Performs an HTTP GET request using the GM_xmlhttpRequest function
	 * @param {string} url 
	 * @param {boolean} [parseToJSON = true] default true
	 * @returns {Promise} Promise object with the response text or an error
	 */
	function httpGETRequest(url, parseToJSON = true) {
		return new Promise((resolve, reject) => {
			GM_xmlhttpRequest({
				method: "GET",
				url: url,
				onload: res => {
					if (res.status === 200) {
						let response = res.responseText;
						if (parseToJSON) {
							response = JSON.parse(res.responseText);
						}
						resolve(response);
					} else {
						reject(`Status Code ${res.status} ${res.statusText.length > 0 ? 
							', ' + res.statusText : ''}`);
					}
				},
				onerror: error => reject(error),
				ontimeout: () => reject("Request Timeout"),
				onabort: () => reject("Aborted")
			})
		})
	}

	/**
	 * Matches a CSS selector against a DOM element object to check if the element exist in the node
	 * @param {string} selector 
	 * @param {Object} node DOM element node
	 * @returns {boolean} true if the element exists in the node, otherwise false
	 */
	function elementExistsInNode(selector, node) {
		return (node.querySelector(selector) != null);
	}

	/**
	 * Appends the necessary style elements to DOM using the GM_addStyle function
	 */
	function injectStyles() {
		let b64icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfiAxwDOBTFNFQBAAABKklEQVQ4y6WTvUoDQRSFvwkbxCqijY2okEIEixQpBMHKykIFC8H/yiew8Rl8i4ClCoJYWGkhaGXjrkmTbsUiTQoVf45Ndp1lZ8eIp7vnnnPvnBkG/gjjb2uAOcoW0fplnvaVRccAaIFZhnPqW3OkMa4Zz84o60RunAFoQm2bDDhgmSsOHad7BjBtrXFjb3jUi0Y8KUYV2hvQly77kH/qKTFIF33Id5MsHoMl30njdwoNlnw75SqaLDC45EnLYbDkW/lZOYMl3wRQTTW/4bQn3+jVoUK/YUqxPrSe1pGin26QD2wizVM15+7LDlykadIseswSbwzhgUpUeLWJO0nTHsOSpIa1XSsc06VR8PnqrGKom3t7xp66KkasxUw+AA0y4/iiADEP5p3/4BuEXi9gkPrfQgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0wMy0yOFQwMzo1NjoyMCswMjowMO7sj9MAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMDMtMjhUMDM6NTY6MjArMDI6MDCfsTdvAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg==";
		let styles = [
			`.${C_BTN_POST_OUTER_SPAN}{margin-left:10px;margin-right:-10px;}`,
			`.${C_BTN_POST}{outline:none;-webkit-box-align:center;align-items:center;background:0;border:0;cursor:pointer;display:flex;-webkit-box-flex:0;flex-grow:0;-webkit-box-pack:center;justify-content:center;min-height:40px;min-width:40px;padding:0;}`,
			`.${C_BTN_PROFILE_PIC}{outline:none;background-color:white;border:0;cursor:pointer;display:flex;-webkit-box-flex:0;flex-grow:0;-webkit-box-pack:center;justify-content:center;min-height:40px;min-width:40px;padding:0;border-radius:50%;transition:background-color .5s ease;-webkit-transition:background-color .5s ease;}`,
			`.${C_BTN_PROFILE_PIC}:hover{background-color:#D0D0D0;transition:background-color .5s ease;-webkit-transition:background-color .5s ease;}`,
			`.${C_BTN_POST_INNER_SPAN},.${C_BTN_PROFILE_PIC_SPAN}{display:block;background-repeat:no-repeat;background-position:100%-26px;height:24px;width:24px;background-image:url(/static/bundles/base/sprite_glyphs.png/4b550af4600d.png);cursor:pointer;}`,
			`.${C_BTN_STORY}{border:none;position:fixed;top:0;right:0;margin:20px;cursor:pointer;width:24px;height:24px;background-color:transparent;background-image:url(${b64icon})}`,
			`.${C_BTN_PROFILE_PIC_CONTAINER}{transition:.5s ease;opacity:0;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);text-align:center}`,
			`.${IG_C_PRIVATE_PIC_IMG_CONTAINER}>img{transition:.5s ease;backface-visibility:hidden;}`,
			`.${IG_C_PRIVATE_PROFILE_PIC_IMG_CONTAINER}>img{transition:.5s ease;backface-visibility:hidden;}`,
			`.${IG_C_PROFILE_PIC_CONTAINER}:hover .${C_BTN_PROFILE_PIC_CONTAINER}{opacity:1}`,
			`.${IG_C_PRIVATE_PROFILE_PIC_CONTAINER}:hover .${C_BTN_PROFILE_PIC_CONTAINER}{opacity:1}`
		];

		styles.forEach((style) => GM_addStyle(style));
	}

	/**
	 * Shows an alert with an error message and logs an exception to the console
	 * @param {string} error 
	 * @param {(Object|string)} exception 
	 */
	function showAndLogError(error, exception) {
		showMessage(error);
		logError(error, exception);
	}

	/**
	 * Shows an alert with a message
	 * @param {string} message 
	 */
	function showMessage(message) {
		alert(`Instagram Source Opener:\n\n${message}`);
	}

	/**
	 * Logs an error string and exception to the console
	 * @param {string} error 
	 * @param {(Object|string)} exception 
	 */
	function logError(error, exception) {
		if (LOGGING_ENABLED) {
			console.error(`Instagram Source Opener:${
				error ? '\n' + error : ''
			}${
				exception ? '\n' + exception : ''
			}`);
		}
	}
})();
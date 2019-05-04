// ==UserScript==
// @name           Dropbox Plus
// @version	   	   2.3
// @namespace      RJ
// @description    Add some improvements to Dropbox interface
// @include        https://www.dropbox.com/home*
// ==/UserScript==
// Written by Rafael Jafferali

function CreateTV(){
		// Create the treeview of the folders on the left of the screen
		INLINE_JS.TreeView.reset({
				onSuccess: function () {
					var MyTV = $("copy-move-treeview").cloneNode(true);
					MyTV.id = "MyTV";
					INLINE_JS.TreeView.tv["MyTV"] = INLINE_JS.TreeView.tv["copy-move-treeview"];
					MyTV.style.border = "0";
					MyTV.style.width = "240px";
					MyTV.style.whiteSpace = "nowrap";
					MyTV.querySelector("#first-treeview-link").rel = "";
					MyTV.addEventListener("mousedown", function() {
							// Timer required because it takes a few milliseconds to call the TreeView
							// function which highlights the folder on which it was clicked
							window.setTimeout(function() {
									var selectedFolder = $("MyTV").querySelector(".highlight .treeview-folder")
										|| $("MyTV").querySelector(".highlight #first-treeview-link");
									if (selectedFolder) {
										selectedFolder.parentNode.removeClassName("highlight");
										//BrowseURL.set_path_url(null, selectedFolder.rel);
                                        window.history.pushState(null, null, "/home" + selectedFolder.rel);
									}									
							}, 250);
					}, true);
					// Styling options
                    if (window.innerWidth < 1320) {
                        MyTV.style.height = (window.innerHeight - 430) + "px";
                        $("outer-frame").style.width = "1060px";
                        $("page-content").style.paddingLeft = "260px";
                        if ($("promo_holder")) {$("promo_holder").style.display = "none";}
                        // $("main-nav").querySelector("br").remove();
                    }
                    else {
                        $("page-sidebar").style.left = "200px";
                        MyTV.style.position = "absolute";
                        MyTV.style.top = "60px";
                        MyTV.style.left = "150px";
                        MyTV.style.height = (window.innerHeight - 140) + "px";
                    }
                    // Create the tree
					$("page-sidebar").appendChild(MyTV);
				},
            	user: INLINE_JS.Browse.active_user
		});
}

// Wait for TreeView function to load in main page
function TestTV() {
    if (typeof INLINE_JS.TreeView != 'undefined') {
        CreateTV();
    }
    else {
        window.setTimeout(TestTV, 250);
    }
}

// === MAIN ===
TestTV();
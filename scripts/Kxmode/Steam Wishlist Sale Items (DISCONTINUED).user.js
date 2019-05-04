// ==UserScript==
// @name            Steam Wishlist Sale Items (DISCONTINUED)
// @namespace       http://tampermonkey.net/
// @version         1.3
// @description     Hide all games from your Wishlist except for those on sale.
// @author          Kxmode
// @match           *://steamcommunity.com/id/*/wishlist*
// @grant           GM_addStyle
// @run-at          document-end
// @require         https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js
// ==/UserScript==

(function(){
    function ForceGreaseMonkeyToWaitForJQuery() {
        if(typeof unsafeWindow.jQuery === "undefined")
        {
            window.setTimeout(GM_wait,100);
        }
        else
        {
            unsafeWindow.jQuery(function() {
                ContiueWithJQuery(unsafeWindow.jQuery);
            });
        }
    }
    ForceGreaseMonkeyToWaitForJQuery();

    function ContiueWithJQuery($) {

        // Attaches CSS for the custom Advanced Filters HTML box.
        $("head").append(           '<style>\n' +
                                    '#mainContents                                                              { max-width: unset; }\n' +
                                    '.advanced-search                                                           { margin-right: 20px; }\n' +
                                    '.advanced-search .label                                                    { padding: 4px 6px; background-color: rgba( 84, 133, 183, 0.2); margin-right: 5px; }\n' +
                                    '.advanced-search .gray_bevel.for_text_input                                { height: unset; padding: 3px; }\n' +
                                    '.advanced-search .gray_bevel                                               { border-radius: unset; margin-bottom: unset; padding: unset; }\n' +
                                    '.advanced-search .sort_options                                             { margin-bottom: unset; }\n' +
                                    '.advanced-search input[type=text],\n' +
                                    '.advanced-search input[type=password],\n' +
                                    '.advanced-search select                                                    { box-shadow: unset; }\n' +
                                    '.advanced-search .min-percent                                              { width: 50px; text-align: center; }\n' +
                                    '.advanced-search #ExtensionButton                                          { padding: 4px 6px; background-color: rgba( 84, 133, 183, 0.2); }\n' +
                                    '.advanced-search #ExtensionButton button,\n' +
                                    '.advanced-search #ExtensionButton html [type=button]                       { -webkit-appearance: button; }\n' +
                                    '.advanced-search #ExtensionButton .btn                                     { display: inline-block; font-weight: 400; line-height: 1.25; text-align: center; white-space: nowrap; vertical-align: middle; }\n' +
                                    '.advanced-search #ExtensionButton .btn                                     { border: 1px solid transparent; padding: .5rem 1rem; font-size: 1rem; border-radius: .25rem; }\n' +
                                    '.advanced-search #ExtensionButton .btn                                     { -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-transition: all 0.2s ease-in-out; -o-transition: all 0.2s ease-in-out; transition: all 0.2s ease-in-out; }\n' +
                                    '.advanced-search #ExtensionButton .btn-toggle                              { margin: 0 4rem; padding: 0; position: relative; border: none; height: 1.5rem; width: 3rem; border-radius: 1.5rem; color: #6b7381; background: rgba( 0, 0, 0, 0.4 ); border: 1px solid #000; box-shadow: 1px 1px 0 0 rgba( 91, 132, 181, 0.2 );}\n' +
                                    '.advanced-search #ExtensionButton .btn-toggle.active                       { background: #b6d908; background: -webkit-linear-gradient( top, #b6d908 5%, #80a006 95%); background: linear-gradient( to bottom, #b6d908 5%, #80a006 95%); }\n' +
                                    '.advanced-search #ExtensionButton .btn-toggle.btn-xs                       { margin: 0 0; padding: 0; position: relative; border: none; height: 1rem; width: 2rem; border-radius: 1rem; top: -2px; cursor: pointer; }\n' +
                                    '.advanced-search #ExtensionButton .btn-toggle.btn-xs:focus,\n' +
                                    '.advanced-search #ExtensionButton .btn-toggle.btn-xs.focus,\n' +
                                    '.advanced-search #ExtensionButton .btn-toggle.btn-xs:focus.active,\n' +
                                    '.advanced-search #ExtensionButton .btn-toggle.btn-xs.focus.active          { outline: none; }\n' +
                                    '.advanced-search #ExtensionButton .btn-toggle.btn-xs:before,\n' +
                                    '.advanced-search #ExtensionButton .btn-toggle.btn-xs:after                 { line-height: 1rem; width: 0; text-align: center; font-weight: 600; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 2px; position: absolute; bottom: 0; transition: opacity .25s; }\n' +
                                    '.advanced-search #ExtensionButton .btn-toggle.btn-xs:before                { content: "Off"; left: 0; }\n' +
                                    '.advanced-search #ExtensionButton .btn-toggle.btn-xs:after                 { content: "On"; right: 0; opacity: .5; }\n' +
                                    '.advanced-search #ExtensionButton .btn-toggle.btn-xs > .handle             { position: absolute; top: 0.125rem; left: 0.125rem; width: 0.75rem; height: 0.75rem; border-radius: 0.75rem; background: #fff; transition: left .25s; }\n' +
                                    '.advanced-search #ExtensionButton .btn-toggle.btn-xs.active                { transition: background-color 0.25s; }\n' +
                                    '.advanced-search #ExtensionButton .btn-toggle.btn-xs.active > .handle      { left: 1.125rem; transition: left .25s; }\n' +
                                    '.advanced-search #ExtensionButton .btn-toggle.btn-xs.active:before         { opacity: .5; }\n' +
                                    '.advanced-search #ExtensionButton .btn-toggle.btn-xs.active:after          { opacity: 1; }\n' +
                                    '.advanced-search #ExtensionButton .btn-toggle.btn-xs.btn-xs:before,\n' +
                                    '.advanced-search #ExtensionButton .btn-toggle.btn-xs.btn-xs:after          { display: none; }\n' +
                                    '</style>');

        // Creates the Advanced Filter HTML box
        var AdvancedFiltersHTML =   '<span class="advanced-search">\n' +
                                        '<span class="gray_bevel for_text_input">\n' +
                                            '<span id="ExtensionButton">\n' +
                                                '<button id="jQSalesFilterToggle" class="btn btn-xs btn-toggle" type="button" data-toggle="button" aria-pressed="false" autocomplete="off">\n' +
                                                    '<span class="handle"></span>\n' +
                                                '</button>\n' +
                                            '</span>\n' +
                                            '<span class="label">Min %</span>\n' +
                                            '<input id="JQMinPercent" name="minpercent" class="min-percent" type="text" value="0">\n' +
                                            '<button id="jQUpdateFilters" type="submit" class="btn_green_white_innerfade btn_small">\n' +
                                                '<span>Update</span>\n' +
                                            '</button>\n' +
                                        '</span>\n' +
                                    '</span>';

        // Attaches Advanced Filters HTML box to RARBG
        $("#wishlist_sort_options").prepend(AdvancedFiltersHTML);

        var minPercent;

        if ( window.localStorage.getItem("minimum-discount") > 0 || window.localStorage.getItem("minimum-discount") !== undefined )
        {
            minPercent = window.localStorage.getItem("minimum-discount");
            $("#JQMinPercent").attr("value", minPercent);
        }

        if( (window.localStorage.getItem("minimum-discount-toggle-page-reload") !== undefined || window.localStorage.getItem("minimum-discount-toggle-page-reload") !== null) && window.localStorage.getItem("minimum-discount-toggle-page-reload") == "false" )
        {
            toggleDiscounts(false, minPercent);
            $(".label").hide();
            $("#JQMinPercent").hide();
            $("#jQUpdateFilters").hide();
        }
        else
        {
            toggleDiscounts(true, minPercent);
            $("#jQSalesFilterToggle").click();
        }

        $(document).on("click", "#jQSalesFilterToggle", function () {
            var salesFilterToggle;
            var toggleDiscount = ( (window.localStorage.getItem("minimum-discount-toggle") !== undefined || window.localStorage.getItem("minimum-discount-toggle") !== null) && window.localStorage.getItem("minimum-discount-toggle") == "false" ) ? false : true;

            if( toggleDiscount )
            {
                $(".label").show();
                $("#JQMinPercent").show();
                $("#jQUpdateFilters").show();
                window.localStorage.setItem("minimum-discount-toggle", false);
                window.localStorage.setItem("minimum-discount-toggle-page-reload", true);
                toggleDiscounts(true, minPercent);
            }
            else
            {
                $(".label").hide();
                $("#JQMinPercent").hide();
                $("#jQUpdateFilters").hide();
                window.localStorage.setItem("minimum-discount-toggle", true);
                window.localStorage.setItem("minimum-discount-toggle-page-reload", false);
                $.each($(".wishlistRow"), function() {
                    $(this).attr("style", "display: block;");
                });
            }
        });

        $(document).on("click", "#jQUpdateFilters", function () {
            minPercent = $("#JQMinPercent").val();
            window.localStorage.setItem("minimum-discount", minPercent);
            location.reload();
        });

        function toggleDiscounts(boolDiscount, minPercent) {
            $.each($(".wishlistRow"), function() {
                var discountBlock   = $(this).find(".gameListPriceData").find(".discount_block");

                if (discountBlock !== undefined && boolDiscount)
                {
                    var discountRating  = $(this).find(".discount_block").find(".discount_pct").text();
                    discountRating      = new RegExp(/\d+/g).exec(discountRating);
                    discountRating      = parseFloat(discountRating);
                    minPercent          = parseFloat(minPercent);

                    if (discountBlock.length === 0)
                    {
                        $(this).hide();
                    }
                    else if (discountRating < minPercent)
                    {
                        $(this).hide();
                    }
                }
            });
        }
    }
})();

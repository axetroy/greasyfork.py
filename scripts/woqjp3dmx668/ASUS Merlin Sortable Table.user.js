// ==UserScript==
// @name         ASUS Merlin Sortable Table
// @namespace    https://greasyfork.org/users/4300
// @version      1.0.1
// @description  Sort and Edit Table Entries in ASUS Merlin Firmware
// @include      *
// @author       CODYQX4
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js
// @require      https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

// Table Configuration
// TODO: AiProtection (Parental Controls -> Web & Apps Filters)
// TODO: AiProtection (Parental Controls -> Time Scheduling)
// TODO: AiProtection (DNS Filtering)
// TODO: USB Application (AiDisk)?
// TODO: VPN (Non-OpenVPN Client 1?)?
var tables =
{
    autofw_rulelist_table: 1,
    clientlist_table: 1,
    cloud_synclist_table: 0,
    dhcp_staticlist_table: 1,
    dlna_path_table: 1,
    filter_lwlist_table: 1,
    ipv6_fw_rulelist_table: 1,
    keyword_rulelist_table: 1,
    nfsd_exportlist_table: 1,
    sr_rulelist_table: 1,
    url_rulelist_table: 1,
    vts_rulelist_table: 1,
    wl_maclist_x_table: 1,
    wl_wdslist_table: 1,
    wollist_table: 1
};

$(document).ready(function()
{
    // Make List Table Sortable
    var initializeSort = function()
    {
        for (var key in tables)
        {
            if (tables.hasOwnProperty(key))
            {
                $("table#" + key + ".list_table tbody").sortable
                ({
                    helper: fixHelperModified,
                    stop: function(event,ui)
                    {
                        renumberTable('#' + $(this).parent("table").attr("id"));
                    }
                }).disableSelection();
            }
            renumberTable('#' + key);
        }
    };
    setInterval(function () {initializeSort();}, 1000);

    // Prevent Table Rows from Collapsing
    var fixHelperModified = function(e, tr)
    {
        var $originals = tr.children();
        var $helper = tr.clone();
        $helper.children().each(function(index)
        {
            $(this).width($originals.eq(index).width());
        });
        return $helper;
    };
});

// Renumber Table Rows
var renumberTable = function(tableID)
{
    var startIndex = tables[tableID.replace("#", "")];
    $(tableID + " tbody tr").each(function()
    {
        count = $(this).parent().children().index($(this)) + startIndex;
        $(this).attr("id", "row" + count);
    });
};

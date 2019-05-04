// ==UserScript==
// @name          Compact Density for Google Contacts Preview
// @version       0.2.1
// @description   Mimics a "Compact" density setting for the preview of the next version of Google Contacts, Contacts Preview (until implemented natively by Google)
// @namespace     https://greasyfork.org/en/users/15562
// @author        Jonathan Brochu (https://greasyfork.org/en/users/15562)
// @license       GPLv3 or later (http://www.gnu.org/licenses/gpl-3.0.en.html)
// @include       https://contacts.google.com/*
// @exclude       https://contacts.google.com/_/*
// ==/UserScript==

/***
 * History:
 *
 * 0.2.1  Changes made:
 *        - Fixed @include/@exclude statements. Also, removed support for
 *          matching non-secure (http://) pages.
 *        - Updated script for use with the repository [greasyfork.org].
 *        - No change made to the code.
 *        (2015-09-14)
 * 0.2    Changes made:
 *        - Added a few more CSS tweaks to the compact density layout.
 *        - First public release.
 *        (2015-07-22)
 * 0.1    First release. (2015-07-21)
 *
 */

(function() {
    var contactItemMaxHeight = 35, // original: 49 //
        contactItemMinHeight = 24, // original: 24 //
        groupItemMaxHeight = 28, // original: 38; not counting the top margin used to show separation of items //
        groupItemMinHeight = 19, // original: 20 //
        groupListMaxHeight = 28, // original: 37; not counting the top margin [..] //
        groupListMinHeight = 18, // original: 19 //
        contactItemTop = Math.round(((contactItemMaxHeight-1)-contactItemMinHeight)/2),
        groupItemVPadding = (groupItemMaxHeight-groupItemMinHeight)/2,
        groupListVPadding = (groupListMaxHeight-groupListMinHeight)/2;
    
    // css definitions
    var css =
            '@namespace url(http://www.w3.org/1999/xhtml);\n' +
        '/* Identity Plate & Name */\n' + 
            '.ljtUfc { height: 50px /* original: 80px */ !important; }\n' +
            '.hxXmBc {\n' +
            '  margin: 16px 10px /* original: 30px 10px */ !important;\n' +
            '  font-size: 13px /* original 15px */ !important;\n' +
            '}\n' +
        '/* Contacts */\n' +
            // Change height of a contact's line inner div
            '.mvzCBb { height: '+(contactItemMaxHeight-1)+'px /* original: 48px */ !important; }\n' +
            // Adjust padding & width of the contact image cell
            '.zAUqQd {\n' +
            '  padding: 2px 12px 0 12px /* original: 2px 20px 0 24px */ !important;\n' +
            '  width: 50px /* original: 72px */ !important;\n' +
            '}\n' +
            // Adjust upper & left alignment of check boxes (behing contact pictures)
            '.YkP4A {\n' +
            '  top: '+contactItemTop+'px /* original: 11px */ !important;\n' +
            // Where the left value comes from:
            //     .zAUqQd[style{left}] + img.zAUqQd.Ld[width] / 2 - .YkP4A[width] / 2
            //   = 12px + 15px - 12px
            //   = 15px
            '  left: 15px /* original: 27px */ !important;\n' +
            '}\n' +
            // Reduce right padding of the every column
            '.weyRg, .FwKQCc, .qh0SS, .DVp4je { padding-right: 10px /* original: 20px */ !important; }\n' +
            // For the phone number column, we don't need as much width
            // (international users: please complain if your numbers overflow)
            '.FwKQCc { width: 120px /* original: 22% */ !important; }\n' +
            // Oh, if I could manipulate calls I would show there a column for a second phone number...
        '/* Groups, Circles (and other list items of the LHS pane) */\n' +
            // Change vertical padding of lines to reduce their height
            '.iUd > .ara {\n' +
            '  padding-top: '+Math.ceil(groupItemVPadding)+'px /* original: 9px */ !important;\n' +
            '  padding-bottom: '+Math.floor(groupItemVPadding)+'px /* original: 9px */ !important;\n' +
            '}\n' +
        '/* Group, Circle List (and other list headers of the LHS pane) */\n' +
            // Change vertical padding of lines to reduce their height
            '.yIa > .cyc, .aSa > .ara {\n' +
            '  padding-top: '+Math.ceil(groupListVPadding)+'px /* original: 9px */ !important;\n' +
            '  padding-bottom: '+Math.floor(groupListVPadding)+'px /* original: 9px */ !important;\n' +
            '}\n' +
            // Hide borders of an expanded group, which looks funny
            // (when expanded, both a border and a margin are visible;
            //  I guess it's meant to give the illusion of the list popping up?)
            '.yIa.ara.pRhuP {\n' +
            '  border-top: 1px solid #fff /* original: 1px solid #e5e5e5 */ !important;\n' +
            '  border-bottom: 1px solid #fff /* original: 1px solid #e5e5e5 */ !important;\n' +
            '}\n' +
        '/* General Layout */\n' +
            // Reduce left and right padding of content area (i.e. below blue "Contacts" bar)
            '.r6c .DZb { padding: 0 15px /* original: 0 30px */ !important; }\n' +
            // Reduce right padding of the groups/circles pane
            '.p0a { padding-right: 20px /* original: 40px */ !important; }\n' +
            // Eliminate right padding of contacts pane (is there to offset the "Add new contact" button)
            // After that we should get: 15px + groups pane + 20px + contacts pane + 15px
            '.hN98xe { padding-right: 0 /* original: 90px */ !important; }\n' +
            // Instead, we add more vertical padding at the end of the page for the "Add new contact" button
            '.mmb.yFa { padding-bottom: 62px /* original: none */ !important; }\n' +
            // Also, we take the opportunity to reduce the size of the "Add new contact" button
            '.WpoiA {\n' +
                'margin-bottom: 20px /* original: 24px */ !important;\n' +
                'margin-right: 20px /* original: 24px */ !important;\n' +
            '}\n' +
            '.WpoiA.b-c {\n' +
                'border: 8px solid #db4437 /* original: ??px solid #db4437 */ !important;\n' +
            '}\n' +
            // Reduce the padding between a section title and previous content
            '.BLa { padding-top: 15px /* original: 25px */ !important; }\n' +
            // Adjust bottom padding of those section titles as well
            '.jUd { margin-bottom: 10px /* original: 15px */ !important; }\n' +
            // Make group pane level with contact pane
            '.tYk1Je { padding-top: 42px /* original: 25px */ !important; }\n' +
            // end
            '';
    // javascript code to be injected
    var unqToken = 'CDfGCP_' + Math.random().toString(36).replace(/[^0-9A-Za-z_]+/g, '').substr(0, 15),
        jsCode = 
            'var _payload1_'+unqToken+';\n' +
            '_payload1_'+unqToken+' = function() {\n' +
            '    if (typeof(Djg) !== "undefined") {\n' +
            '        Djg.prototype.loa = function() { return '+contactItemMaxHeight+'; };\n' +
            '        Djg.prototype.Pbb = function(a) { return Math.min(this.qea() - 1, Math.max(0, Math.floor(a / '+contactItemMaxHeight+'))); };\n' +
            '    } else {\n' +
            '        setTimeout(_payload1_'+unqToken+', 100);\n' +
            '    }\n' +
            '};\n' +
            '_payload1_'+unqToken+'();';
            
    document.addStyle = function(css) {
        if (typeof(GM_addStyle) != 'undefined') {
            GM_addStyle(css);
        } else {  
            var heads = this.getElementsByTagName('head');
            if (heads.length > 0) {
                var node = this.createElement('style');
                node.type = 'text/css';
                node.appendChild(this.createTextNode(css));
                heads[0].appendChild(node); 
            }
        }
    };
    document.addJSCode = function(jscode) {
        var heads = this.getElementsByTagName('head');
        if (heads.length > 0) {
            var node = this.createElement('script');
            node.type = 'text/javascript';
            node.appendChild(this.createTextNode(jscode));
            heads[0].appendChild(node); 
        }
    };
    
    document.addStyle(css);
    document.addJSCode(jsCode);
})();

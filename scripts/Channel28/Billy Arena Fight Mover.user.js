// ==UserScript==
// @name            Billy Arena Fight Mover
// @namespace       Supa Epic - using Platypus
// @description     N/A
// @version         1.2
// @history         1.2 New domain - animecubedgaming.com - Channel28
// @history         1.1 Now https compatible (Updated by Channel28)
// @include         http*://*animecubed.com/billy/bvs/arena.html
// @include         http*://*animecubedgaming.com/billy/bvs/arena.html
// @grant           none
// ==/UserScript==
function do_platypus_script() {
smart_remove(window.document,document.evaluate('/HTML[1]/BODY[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[2]/TD[2]/TABLE[1]/TBODY[1]/TR[2]/TD[2]/CENTER[1]/TABLE[1]/TBODY[1]/TR[3]/TD[3]/CENTER[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]/CENTER[1]/FORM[1]/A[1]/B[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
script_paste(window.document,document.evaluate('/HTML[1]/BODY[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[2]/TD[2]/TABLE[1]/TBODY[1]/TR[2]/TD[2]/CENTER[1]/TABLE[1]/TBODY[1]/TR[3]/TD[3]/CENTER[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]/CENTER[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,document.evaluate('/HTML[1]/BODY[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[2]/TD[2]/TABLE[1]/TBODY[1]/TR[2]/TD[2]/CENTER[1]/TABLE[1]/TBODY[1]/TR[3]/TD[3]/CENTER[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]/CENTER[1]/FORM[1]/A[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null);
center_it(window.document,document.evaluate('/HTML[1]/BODY[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[2]/TD[2]/TABLE[1]/TBODY[1]/TR[2]/TD[2]/CENTER[1]/TABLE[1]/TBODY[1]/TR[3]/TD[3]/CENTER[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]/A[1]/B[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
}; // Ends do_platypus_script
window.addEventListener("load", function() { do_platypus_script() }, false);
var gplatypusBundle = Components.classes["@mozilla.org/intl/stringbundle;1"].getService(Components.interfaces.nsIStringBundleService);
var mystrings = gplatypusBundle.createBundle("chrome://platypus/locale/platypusCore.properties");
var platypusplatypuscouldntfi1 = mystrings.GetStringFromName("platypusplatypuscouldntfi1");
var platypusthisusuallyhappens = mystrings.GetStringFromName("platypusthisusuallyhappens");

//
//  Mon Dec 19 15:59:37 2005 -- Scott R. Turner
//  Short, uncommented file containing all the code to implement Platypus
//  actions.  Can be "included" into the Platypus script.
//
// 
// 
function center_it(doc, node) {
  var center_node = doc.createElement ("CENTER");
  node.parentNode.insertBefore(center_node, node);
  node.parentNode.removeChild(node);  
  center_node.appendChild(node);
  return center_node;
};
function smart_remove(doc, node) {
    if (node.parentNode.childNodes.length == 1) {
smart_remove(doc, node.parentNode);
    } else {
remove_it(doc, node);
    };
};
function remove_it(doc, node) {
  if (doc == null || node == null) return;
  if (!node.parentNode) return;
  node.style.display = "none";
  doc.last_removed_node = node;
};
function script_paste(doc, where, what) {
    var new_node = what.cloneNode(true);
    new_node.style.display = "";
    where.parentNode.insertBefore(new_node, where);
};
function platypus_do(win, func_name, o, other, other2, other3) {
    var func = eval(func_name);
    var doc = null;
    if (func == null) return;
    if (!o) {
Warning(platypusplatypuscouldntfi1+
func_name+platypusthisusuallyhappens);
    };
    doc = win.document;
    func(doc, o, other, other2, other3);
};

//.user.js
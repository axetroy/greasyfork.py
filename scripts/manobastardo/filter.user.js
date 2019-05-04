// ==UserScript==
// @name        filter
// @namespace   manobastardo
// @version     1
// @grant       GM_xmlhttpRequest
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @description filter elements
// ==/UserScript==

// menu
document.body.appendChild(document.createElement("menu")).outerHTML = '\
<menu id="filter-context-menu" type="context">\
  <menu title="filter" label="">\
   <menuitem label="edit">\
   </menuitem>\
  <menuitem label="add">\
  </menuitem>\
  </menu>\
</menu>';

var html = document.documentElement;
html.setAttribute("contextmenu", "filter-context-menu");
html.addEventListener("contextmenu", menu_show, false);

var menu = document.querySelector("#filter-context-menu menu");
menu.addEventListener("click", menu_action, false);

function menu_action (e) {
  // @ right click on menuitem
  var a = e.target.label;
  var s = menu.getAttribute("selection");
  
  switch (a) {
    case "edit":      
      s = prompt("edit filter", "\\b" + s + "\\b");
      if (s == null) {
        break;
      };

    case "add":
      filter_add(s);
      break;
      
    default:
      alert(s);
  }
}

function menu_show(e) {
  // @ right click on page
  var selection = "" + document.getSelection();
  
  menu.label = menu.title + " '" + selection + "'";
  menu.setAttribute("selection", selection);
}

// filter
function filter_options(action, expression, hits, state) {
  return {
    action: action,
    expression: expression,
    hits: hits || 0,
    state: state || 1
  }
}

function filter_add(expression) {  
  database_set(filter_options("add", expression));
};

// database
function database_options(mode, values) {
    var options = {
        headers: {
          "Content-Type": "application/json"
        },
        method: mode,
        url: "http://localhost/filter/index.php",
        onload: database_changed
    }
    
    if (values !== undefined) {
        for(name in values) {
            options[name] = values[name];
        }
    }

    return options;
}

function database_set(options) {
    GM_xmlhttpRequest(database_options("POST", {data: JSON.stringify(options)}));
}

function database_get() {
    GM_xmlhttpRequest(database_options("GET"));
}


current_url = window.location.href;

function element_selectors() {
    var selectors = {
        hide: null,
        element: null
    };

    if (current_url.indexOf("reddit") > -1) {
        selectors.element = ".thing";
    } else if (current_url.indexOf("youtube") > -1) {
        selectors.element = ".item-section"
    }

    return selectors
}

function database_changed(response) {
    console.log(response);

    var filters = JSON.parse(response.responseText);
    var expressions = [];
    for (var filter in filters) {
        expression = filters[filter]['expression']
        expressions.push(new RegExp(expression, "i"));
    }

    var selectors = element_selectors();
    var elements = $(selectors.element);

    elements.each(function () {
        for (var e in expressions) {
            var regex = expressions[e];
            if (regex.test($(this).text())) {
                $(this).addClass("filtered");
                $(this).attr('filter', regex);
                $(this).attr('title', regex);
                return;
            };
        }    
    })
}

database_get();
// ==UserScript==
// @name         Shikimori Auto-Hiding Navbar
// @namespace    http://shikimori.org/
// @version      1.1
// @description  Скрывает меню на сайте shikimori.org при прокрутке.
// @author       grin3671
// @match        http://shikimori.org/*
// @match        https://shikimori.org/*
// @grant        none
// ==/UserScript==

/*
 *  Bootstrap Auto-Hiding Navbar - v1.0.5
 *  An extension for Bootstrap's fixed navbar which hides the navbar while the page is scrolling downwards and shows it the other way. The plugin is able to show/hide the navbar programmatically as well.
 *  http://www.virtuosoft.eu/code/bootstrap-autohidingnavbar/
 *
 *  Made by István Ujj-Mészáros
 *  Under Apache License v2.0 License
 */
  var pluginName = 'autoHidingNavbar',
    $window = $(window),
    $document = $(document),
    _scrollThrottleTimer = null,
    _resizeThrottleTimer = null,
    _throttleDelay = 70,
    _lastScrollHandlerRun = 0,
    _previousScrollTop = null,
    _windowHeight = $window.height(),
    _visible = true,
    _hideOffset,
    defaults = {
      disableAutohide: false,
      showOnUpscroll: true,
      showOnBottom: true,
      hideOffset: 'auto', // "auto" means the navbar height
      animationDuration: 200,
      navbarOffset: 0
    };

function autoHidingNavbar(element, options) {
  this.element = $(element);
  this.settings = $.extend({}, defaults, options);
  this._defaults = defaults;
  this._name = pluginName;

  this.elements = {
      navbar: this.element
  };

  _hideOffset = defaults.hideOffset === 'auto' ? parseInt(this.element.css('height'), 10) : this.settings.hideOffset;
  bindEvents(this);

  return this.element;
}

function hide(autoHidingNavbar) {
  if (!_visible) {
    return;
  }

  autoHidingNavbar.element.addClass('navbar-hidden').animate({
    top: -1 * parseInt(autoHidingNavbar.element.css('height'), 10) + autoHidingNavbar.settings.navbarOffset
  }, {
    queue: false,
    duration: autoHidingNavbar.settings.animationDuration
  });

  _visible = false;

  autoHidingNavbar.element.trigger('hide.autoHidingNavbar');
}

function show(autoHidingNavbar) {
  if (_visible) {
    return;
  }

  autoHidingNavbar.element.removeClass('navbar-hidden').animate({
    top: 0
  }, {
    queue: false,
    duration: autoHidingNavbar.settings.animationDuration
  });
  _visible = true;

  autoHidingNavbar.element.trigger('show.autoHidingNavbar');
}

function detectState(autoHidingNavbar) {
  var scrollTop = $window.scrollTop(),
      scrollDelta = scrollTop - _previousScrollTop;

  _previousScrollTop = scrollTop;

  if (scrollDelta < 0) {
    if (_visible) {
      return;
    }

    if (defaults.showOnUpscroll || scrollTop <= _hideOffset) {
      show(autoHidingNavbar);
    }
  }
  else if (scrollDelta > 0) {
    if (!_visible) {
      if (defaults.showOnBottom && scrollTop + _windowHeight === $document.height()) {
        show(autoHidingNavbar);
      }
      return;
    }

    if (scrollTop >= _hideOffset) {
      hide(autoHidingNavbar);
    }
  }

}

function scrollHandler(autoHidingNavbar) {

  _lastScrollHandlerRun = new Date().getTime();

  detectState(autoHidingNavbar);
}

function bindEvents(autoHidingNavbar) {
  $document.on('scroll.' + pluginName, function() {
    if (new Date().getTime() - _lastScrollHandlerRun > _throttleDelay) {
      scrollHandler(autoHidingNavbar);
    }
    else {
      clearTimeout(_scrollThrottleTimer);
      _scrollThrottleTimer = setTimeout(function() {
        scrollHandler(autoHidingNavbar);
      }, _throttleDelay);
    }
  });

  $window.on('resize.' + pluginName, function() {
    clearTimeout(_resizeThrottleTimer);
    _resizeThrottleTimer = setTimeout(function() {
      _windowHeight = $window.height();
    }, _throttleDelay);
  });
}

function unbindEvents() {
  $document.off('.' + pluginName);

  $window.off('.' + pluginName);
}

var func = function() {
  autoHidingNavbar(".l-top_menu");
};


$(document).ready(func);
$(document).on('page:change', func);
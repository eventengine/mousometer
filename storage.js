(function($) {
  'use strict';

  function _localStorageSupport() {
    try {
      return 'localStorage' in window && window.localStorage !== null;
    } catch (e) {
      return false;
    }
  }

  var _isStorageSupported = _localStorageSupport();

  window.persistentStorage = {
    set: function (name, value) {
      if (_isStorageSupported) {
        localStorage.setItem(name, value);
      }
      else {
        $.cookie(name, value, 10 * 365);
      }
      return this;
    },

    get: function (name) {
      if (_isStorageSupported) {
        return localStorage.getItem(name);
      }
      else {
        return $.cookie(name);
      }
    },

    remove: function (name) {
      if (_isStorageSupported) {
        localStorage.removeItem(name);
      }
      else {
        $.cookie(name, "", -1);
      }
      return this;
    }
  };

})(jQuery);
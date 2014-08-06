(function($) {
  'use strict';
  var localStorage = window.localStorage;
  function _storageFabric() {
    try {
      if ('localStorage' in window && window.localStorage !== null) {
        return new LocalStorage();
      }
    } catch (e) {
      return new CookieStorage();
    }
  }


  function LocalStorage() {
    var _storage = window.localStorage;

    this.get = function(name){
      return _storage.getItem(name);
    };

    this.set = function(name, value){
      _storage.setItem(name, value);
      return this;
    };

    this.remove = function(name){
      _storage.removeItem(name);
      return this;
    };
  }

  function CookieStorage() {
    var _storage = $.cookie;

    this.get = function(name){
      return _storage(name);
    };

    this.set = function(name, value){
      _storage(name, value, 10 * 365);
      return this;
    };

    this.remove = function(name){
      _storage(name, '', -1);
      return this;
    };
  }

  function StorageAdapter(adapter) {
    this.set = function(name, value){
      adapter.set(name, value);
      return this;
    };

    this.get = function(name) {
      return adapter.get(name);
    };

    this.remove = function(name) {
      adapter.remove(name);
      return this;
    };
  }

  window.persistentStorage = new StorageAdapter(_storageFabric());

})(jQuery);

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define('Slightly', factory) :
  (global.Slightly = factory());
}(this, (function () { 'use strict';

function SlightlyCore() {
  var Core = this;

  var _private = {
    loadItems: function loadItems() {
      var this$1 = this;

      var nodes = document.querySelectorAll(this.options.itemSelector);
      for (var i = 0; i < nodes.length; i++) {
        var nodeAttrs = nodes[i].attributes;
        var itemObj = {};
        for (var j = 0; j < nodeAttrs.length; j++) {
          var attr = nodeAttrs[j];
          if (attr.name.indexOf(((this$1.options.attrPrefix) + "-")) >= 0) {
            itemObj[attr.name.substr(this$1.options.attrPrefix.length + 1)] = attr.value;
          }
        }
        itemObj.node = nodes[i];
        this$1.items.push(itemObj);
      }
    },
    clickHandler: function clickHandler(item) {
      var _instance = this;
      return function (e) {
        console.log(item);
        console.log(_instance);
      };
    }
  };

  Core.defaultOptions = {
    itemSelector: null,
    attrPrefix: 'data-slightly'
  };

  Core.static = {};

  Core.public = {
    loadItems: function loadItems(itemsList) {
      this.items = itemsList;
      this.bindItems();
    },
    bindItems: function bindItems() {
      var this$1 = this;

      this.items.forEach(function (item) {
        item.node.addEventListener('click', _private.clickHandler.call(this$1, item));
      });
    }
  };

  Core.init = function () {
    this.items = [];

    if (this.options.itemSelector && typeof this.options.itemSelector === 'string') {
      _private.loadItems.call(this);
      this.bindItems();
    }
  };
}

var SlightlyCore$1 = new SlightlyCore();

function SlightlyGallery() {
  var Gallery = this;

  var _private = {};

  Gallery.defaultOptions = {};

  Gallery.static = {};

  Gallery.public = {};

  Gallery.init = function () {};
}

var SlightlyGallery$1 = new SlightlyGallery();

var objectAssign = function (tgtObj, srcObj, overwrite) {
  if ( overwrite === void 0 ) overwrite = true;

  var tmpObj = Object(tgtObj);
  for (var i = 0, list = Object.keys(srcObj); i < list.length; i += 1) {
    var tgtKey = list[i];

    if (overwrite || !Object.prototype.hasOwnProperty.call(tgtObj, tgtKey)) {
      tmpObj[tgtKey] = srcObj[tgtKey];
    }
  }
  return tmpObj;
};

var isFunction = function (fn) { return typeof fn === 'function'; };

var SlightlyModules = [
  SlightlyCore$1,
  SlightlyGallery$1
];

function Slightly(options) {
  var this$1 = this;

  this.options = objectAssign(Slightly.defaultOptions, options);
  SlightlyModules.forEach(function (m) {
    if (m && isFunction(m.init)) {
      m.init.call(this$1);
    }
  });
}

Slightly.defaultOptions = {};

SlightlyModules.forEach(function (module) {
  Slightly.defaultOptions = objectAssign(Slightly.defaultOptions, module.defaultOptions || {});
  Slightly.prototype = objectAssign(Slightly.prototype, module.public || {});
  for (var i = 0, list = Object.keys(module.static || {}); i < list.length; i += 1) {
    var staticKey = list[i];

    Slightly[staticKey] = module.static[staticKey];
  }
  return module;
});

return Slightly;

})));

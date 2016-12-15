(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define('Slightly', factory) :
  (global.Slightly = factory());
}(this, (function () { 'use strict';

function SlightlyCore() {
  if (SlightlyCore.instance) {
    return SlightlyCore.instance;
  }
  var Core = SlightlyCore.instance = this;

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
    if (this.options.itemSelector && typeof this.options.itemSelector === 'string') {
      _private.loadItems.call(this);
      this.bindItems();
    }
  };
}

var objectAssign = Object.assign || function (srcObj) {
  var arguments$1 = arguments;

  for (var i = 1; i < arguments.length; i++) {
    for (var objProperty in arguments[i]) {
      if (Object.prototype.hasOwnProperty.call(arguments$1[i], objProperty)) {
        srcObj[objProperty] = arguments$1[i][objProperty];
      }
    }
  }
  return srcObj;
};

var isFunction = function (fn) { return typeof fn === 'function'; };

var defaultOptions = {
  itemSelector: null,
  attrPrefix: 'data-slightly'
};

var modules = [new SlightlyCore()];

var Slightly = function Slightly(options) {
  var this$1 = this;

  var _modules = [];

      this.items = [];
  this.current = 0;
  this.options = objectAssign(defaultOptions, options);

      modules.forEach(function (m) {
    _modules.push(m);
    if (isFunction(m.init)) {
      m.init.call(this$1);
    }
  });
};

modules.forEach(function (m) {
  m.public ? objectAssign(Slightly.prototype, m.public) : 0;
  m.static ? objectAssign(Slightly, m.static) : 0;
});

return Slightly;

})));

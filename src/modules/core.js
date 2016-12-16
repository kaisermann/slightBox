function SlightlyCore() {
  const Core = this;

// Collection of private methods and properties
  const _private = {
    loadItems() {
      const nodes = document.querySelectorAll(this.options.itemSelector);
      for (let i = 0; i < nodes.length; i++) {
        const nodeAttrs = nodes[i].attributes;
        const itemObj = {};
        // Reads all attributes with data-slightly-*
        for (let j = 0; j < nodeAttrs.length; j++) {
          const attr = nodeAttrs[j];
          if (attr.name.indexOf(`${this.options.attrPrefix}-`) >= 0) {
            itemObj[attr.name.substr(this.options.attrPrefix.length + 1)] = attr.value;
          }
        }
        itemObj.node = nodes[i];
        this.items.push(itemObj);
      }
    },
    clickHandler(item) {
      const _instance = this;
      return function (e) {
        console.log(item);
        console.log(_instance);
      };
    }
  };

  // Default options for this module
  Core.defaultOptions = {
    itemSelector: null,
    attrPrefix: 'data-slightly'
  };

  // Static methods to be mergerd with the Slightly Class
  Core.static = {};

  // Public (Privileged to this file) methods to be merged with the Slightly.prototype object
  Core.public = {
    loadItems(itemsList) {
      this.items = itemsList;
      this.bindItems();
    },
    bindItems() {
      this.items.forEach(item => {
        item.node.addEventListener('click', _private.clickHandler.call(this, item));
      });
    }
  };

  // Module Initial/Constructor method
  Core.init = function () {
    this.items = [];

    // Is a selector setted? If yes, let's search for the items
    if (this.options.itemSelector && typeof this.options.itemSelector === 'string') {
      _private.loadItems.call(this);
      this.bindItems();
    }
  };
}

export default new SlightlyCore();

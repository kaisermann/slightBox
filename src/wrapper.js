/* Modules */
import SlightlyCore from './modules/core.js';
import SlightlyExample from './modules/example.js';

/* Utilities */
import {
  objectAssign,
  isFunction
} from './utils.js';

const defaultOptions = {
  itemSelector: null,
  attrPrefix: 'data-slightly'
};

const modules = [new SlightlyCore()];

export default class Slightly {
  constructor(options) {
    const _modules = [];
    
    this.items = [];
    this.current = 0;
    this.options = objectAssign(defaultOptions, options);
    
    modules.forEach(m => {
      _modules.push(m);
      if (isFunction(m.init)) {
        m.init.call(this);
      }
    });
  }
}

modules.forEach(m => {
  m.public ? objectAssign(Slightly.prototype, m.public) : 0;
  m.static ? objectAssign(Slightly, m.static) : 0;
});

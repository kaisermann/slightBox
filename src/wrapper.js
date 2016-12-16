// Modules
import SlightlyCore from './modules/core.js';
import SlightlyGallery from './modules/gallery.js';

// Utilities
import {
  objectAssign,
  isFunction
} from './utils.js';

// Modules list
// Edit this array to remove or add modules
const SlightlyModules = [
  SlightlyCore,
  SlightlyGallery
];

// Slightly Wrapper Class
export default function Slightly(options) {
  this.options = objectAssign(Slightly.defaultOptions, options);
  SlightlyModules.forEach(m => {
    if (m && isFunction(m.init)) {
      m.init.call(this);
    }
  });
}

// Default Options
Slightly.defaultOptions = {};

// Extends each module default options, public and static methods
SlightlyModules.forEach(module => {
  Slightly.defaultOptions = objectAssign(Slightly.defaultOptions, module.defaultOptions || {});
  Slightly.prototype = objectAssign(Slightly.prototype, module.public || {});
  for (const staticKey of Object.keys(module.static || {})) {
    Slightly[staticKey] = module.static[staticKey];
  }
  return module;
});

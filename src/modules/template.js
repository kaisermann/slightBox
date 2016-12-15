export default function SlightlyTemplate() {
  if (SlightlyTemplate.instance) {
    return SlightlyTemplate.instance;
  }
  const Template = SlightlyTemplate.instance = this;

  const _private = {};

  // Static methods to be mergerd with the Slightly Class
  Template.static = {};

  // Privileged Methods to be merged with the Slightly.prototype object
  Template.public = {};

  Template.init = function () {};
}

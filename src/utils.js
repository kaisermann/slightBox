export const objectAssign = Object.assign || function (srcObj) {
  for (let i = 1; i < arguments.length; i++) {
    for (let objProperty in arguments[i]) {
      if (Object.prototype.hasOwnProperty.call(arguments[i], objProperty)) {
        srcObj[objProperty] = arguments[i][objProperty];
      }
    }
  }
  return srcObj;
};

export const isFunction = fn => typeof fn === 'function';

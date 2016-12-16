export const objectAssign = function (tgtObj, srcObj, overwrite = true) {
  const tmpObj = Object(tgtObj);
  for (let tgtKey of Object.keys(srcObj)) {
    if (overwrite || !Object.prototype.hasOwnProperty.call(tgtObj, tgtKey)) {
      tmpObj[tgtKey] = srcObj[tgtKey];
    }
  }
  return tmpObj;
};

export const isFunction = fn => typeof fn === 'function';

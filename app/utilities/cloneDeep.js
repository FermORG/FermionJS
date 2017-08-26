export default function cloneDeep(value) {
  if (!isObject(value)) return value;
  if (Array.isArray(value)) {
    return value.slice(0).map((element) => {
      return cloneDeep(element);
    });
  }
  const clone = {};
  Object.keys(value).forEach(key => clone[key] = cloneDeep(value[key]));
  return clone;
}

function isObject(value) {
  return typeof (value) === 'object';
};

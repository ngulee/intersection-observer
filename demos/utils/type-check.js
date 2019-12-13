export const isObject = function(target) {
  return Object.prototype.toString.call(target) === '[object Object]';
}

export const isString = function(str) {
  return Object.prototype.toString.call(str) === '[object String]';
}

export const isNumber = function(num) {
  return Object.prototype.toString.call(num) === '[object Number]';
}
import { isObject, isString } from './type-check';

/**
 * 根据筛选对象(filter)，从数组(sourceArray)中查找符合 filter的第一个元素 target ，并从target中取值
 * @param {Array} array 源数组，每个元素都是一个对象
 * @param {Object} filter 筛选对象。例如 {a: 1, b: 'wx' }
 * @param {String} targetKey 想要取值的key值
 * @return { any } any
 *
 * 例子：
 *  const sourceArray = [{
 *   a: 1,
 *   b: 1,
 * },{
 *   a: 2,
 *   b: 3,
 * },{
 *   a: 3,
 *   b: 7,
 * },{
 *   a: 3,
 *   b: 6,
 *   c: '777'
 * },{
 *   a: 4,
 *   b: 0,
 * }]
 * const filter = { a: 3, b: 6 };
 *
 * const targetKey = 'c';
 */
export const getValueFromArray = function(array, filter, targetKey) {
  const { toString } = Object.prototype;
  if (
    !Array.isArray(array)
    || toString.call(filter) !== '[object Object]'
    || toString.call(targetKey) !== '[object String]'
  ) return;

  const filterKeys = Object.keys(filter);
  const target = array.find((item) => {

    const isMatch = filterKeys.every((filterKey) => {
      return item[filterKey] === filter[filterKey];
    });

    return isMatch;
  });
  
  try {
    return target[targetKey]
  } catch(e) {
    throw new Error(e);
  }
}
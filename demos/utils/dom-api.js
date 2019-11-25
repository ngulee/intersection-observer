export const querySelector = function querySelector (selector) {
  return new Promise((resolve, reject) => {
    wx.createSelectorQuery()
    .select(selector)
    .boundingClientRect((res) => {
      if (res) {
        resolve(res);
      } else {
        reject(`不存在选择器为 ${selector} 的wxml`);
      }
    })
    .exec();
  })
};
export const querySelectorAll = function querySelectorAll (selector) {
  return new Promise((resolve, reject) => {
    wx.createSelectorQuery()
    .selectAll(selector)
    .boundingClientRect((res) => {
      if (res) {
        resolve(res);
      } else {
        reject(`不存在选择器为 ${selector} 的wxml`);
      }
    })
    .exec();
  })
};
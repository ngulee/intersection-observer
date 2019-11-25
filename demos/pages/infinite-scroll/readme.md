# 15个元素实现页面无限加载滚动

## 原理
+ 相对定位(relative)绝对定位(absolute)：每一个元素通过绝对定位确定其位置，避免元素删减出现页面抖动的情况；
+ `wx.createIntersectionObserver()`: 监听列表的第一个元素和最后一个元素，判断scroll down 和scroll up;
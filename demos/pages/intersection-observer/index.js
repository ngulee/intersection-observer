// pages/intersection-observer/index.js
import { mockList } from './mock';
import { querySelector, querySelectorAll } from './tools';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
  },
  exposureId: -1,
  interObservers: {},
  isExposuredAll: false,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData();
  },

  initData() {
    this.setData({
      list: mockList
    }, this.intersectionObserver)
  },

  loadMoreData() {
    const updateList = mockList.map((val, index) => {
      const item = {};
      item.id = this.data.list[this.data.list.length - 1].id + index + 1;
      item.name = 'cccccccc'
      return item;
    });
    this.setData({
      list: [...this.data.list, ...updateList]
    }, this.intersectionObserver)
  },

  

  intersectionObserver() {
    querySelectorAll('.product-item').then((products) => {
      console.log('products:', products);
      
      products.forEach(({
        dataset: { productId }
      }) => {
        const prop = `product_${productId}_observer`;
        if(!this.interObservers[prop]) {
          this.interObservers[prop] = wx.createIntersectionObserver(this, {
            thresholds: [0.5],
          });
          this.interObservers[prop].relativeToViewport()
          .observe(`.product-item_${productId}`, (target) => {
            const { intersectionRatio } = target;
            console.log('target:', target, intersectionRatio)
            if(intersectionRatio > 0.5) {
              this.interObservers[prop].disconnect();
              this.interObservers[prop] = {};
            }
            
          })
        }
      })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    for(let prop in this.interObservers) {
      if(this.interObservers.hasOwnProperty(prop) && this.interObservers[prop].disconnect) {
        this.interObservers[prop].disconnect();
      }
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // this.fetchData()
    this.loadMoreData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
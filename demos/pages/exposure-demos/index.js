// pages/exposure-demos/index.js

// 1：在页面onReady生命周期中，第一次初始化曝光监听；

// 2: 对于已经曝光过当元素，记录在本地，避免重复曝光；

// 3: 当页面有数据更新，有新的曝光元素被渲染时，重新初始化曝光监听；

// 4: 除了页面首次初始化外，其他情况触发onShow生命周期时，均要重新初始化曝光监听；

// 5: 在页面onHide、onUnload中，需要取消曝光监听；



Page({

  /**
   * 页面的初始数据
   */
  data: {
    products: []
  },

  onReadied: false,
  updatedCount: 0,
  exposureObser: null,
  exposuredElements: new Map(),
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.initExposureObserver();
    this.onReadied = true;
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.onReadied) {
      this.initExposureObserver();
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide');
    this.exposureObser.disconnect();
    this.exposureObser = null;
    this.exposuredElements = new Map();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload');
    if(this.exposureObser) {
      this.exposureObser.disconnect();
    }
  },

  fetchData() {
    const mockList = [];

    for(let i = 0; i < 20; i++) {
      const index = i + this.updatedCount * 20
      let item = {
        value: index,
        action: {
          logCode: `wx#bpm${index}.${index}${index+1}`
        }
      }
      mockList.push(item)
    }

    this.setData({
      products: this.data.products.concat(mockList),
    }, () => {
      this.initExposureObserver();
    });

    this.updatedCount += 1;
  },

  initExposureObserver() {
    this.exposureObser = wx.createIntersectionObserver(this, {
      thresholds: [1],
      observeAll: true,
    });

    this.exposureObser
        .relativeToViewport()
        .observe('.data-exposure-analysis', (target) => {
          const { intersectionRatio } = target;
          const { exposureAction: {
            logCode,
          } } = target.dataset;

          if (logCode && intersectionRatio >= 1 && !this.exposuredElements.has(logCode)) {
            this.onExposureAnalysisReport(target, 'sp');
          }
        })
  },

  onExposureAnalysisReport({ id, dataset }, type) {
    // console.log('dataset' + id + ':', dataset)
    const {
      exposureAction: {
        logCode,
      }
     } = dataset;
    this.trackerPush({
      type,
      logCode,
    });
    this.exposuredElements.set(logCode, true);
    // console.log('exposuredElements:', this.exposuredElements)
  },

  trackerPush(options) {
    console.log('options:', options)
  },
  

  onClickAnalysisReport({ target }) {
    console.log('target:', target)
    this.onExposureAnalysisReport(target, 'tap')
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
    this.fetchData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
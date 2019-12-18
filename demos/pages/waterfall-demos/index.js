const mockList = [];

for(let i = 0; i < 100; i++) {
  mockList.push(i)
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    products: []
  },
  updatedCount: 0,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData()
  },

  fetchData() {
    const mockList = [];

    for(let i = 0; i < 20; i++) {
      const index = i + this.updatedCount * 20
      let item = {
        value: index,
        action: {
          logCode: `wx#bpm${index}.${index}${index+1}`
        },
        height: 100 + Math.random() * 200
      }
      mockList.push(item)
    }

    this.setData({
      products: this.data.products.concat(mockList),
    });
    this.updatedCount += 1;
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
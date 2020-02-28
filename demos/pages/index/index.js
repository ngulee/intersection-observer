//index.js
import { getValueFromArray } from '../../utils/arrray.js';

const mockList = [
  {
    a: 1,
    b: 1,
  },
  {
    a: 2,
    b: 3,
  },
  {
    a: 3,
    b: 7,
  },
  {
    a: 3,
    b: 6,
    c: '777'
  },
  {
    a: 4,
    b: 0,
  },
]
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgSrc: 'https://i8.mifile.cn/webfile/h5/weixin/20200103/show_more_icon.png',
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('ddd:', getValueFromArray(mockList, { a: 3, b: 6 }, 'c'))
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  handleSave() {
    const _this = this;

    wx.showLoading();

    let saveCallback = (isSuccessed) => {
      if (isSuccessed) {
        wx.showToast({
          title: '图片已保存，赶快分享吧',
          icon: 'none',
          duration: 2000
        });
        this.triggerEvent('success', null)
      } else {
        wx.showToast({
          title: '保存失败',
          icon: 'none',
          duration: 1000
        });
        this.triggerEvent('failed', null)
      }
    };

    wx.downloadFile({
      url: /^http:/.test(_this.data.imgSrc) ? _this.data.imgSrc.replace(/^http/, 'https') : _this.data.imgSrc,
      success: (res) => {
        let path = res.tempFilePath;
        wx.hideLoading();
        wx.saveImageToPhotosAlbum({
          filePath: path,
          success() {
            saveCallback(true);
          },
          fail() {
            saveCallback(false);
          }
        })
      },
      fail: () => {
        saveCallback(false);
      }
    });
  }
})

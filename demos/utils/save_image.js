Page({
  data: {
    // 需要保存的图片地址，例如
    imgSrc: 'https://i8.mifile.cn/webfile/h5/weixin/20200103/show_more_icon.png',
  },
  /**
   * 保存按钮的bind:tap事件回调函数
   */
  handleSaveImage() {
    const _this = this;

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
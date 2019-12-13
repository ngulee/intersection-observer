import { querySelectorAll } from '../../utils/dom-api';

const randomNumer = function(min, range) {
  return Math.floor(min + Math.random() * range);
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
  },

  total: 20,
  fetchCount: 1,
  leftHeight: 0,
  rightHeight: 0,

  fetchData(isUpdate = false) {
    const list = [];
    let updateOption = {};

    for(let i = 0; i < this.total; i++) {
      let item = {
        value: i + this.total* (this.fetchCount - 1),
        classIndex: this.fetchCount,
        height: randomNumer(100, 200) + 'rpx',
        background: `rgb(${randomNumer(0, 100)},${randomNumer(0, 100)}, ${randomNumer(0, 100)})`
      }
      list.push(item);
    }

    if (this.fetchCount === 1) {
      Object.assign(updateOption, {
        list,
      })
    } else {
      list.forEach((item) => {
        Object.assign(updateOption, {
          [`list[${item.value}]`]: item,
        })
      })
    }
    

    console.log('updateOption:', updateOption)
    

    this.setData(updateOption, () => {
      if(!isUpdate) return;
      
      this.refreshPage()
    });

    this.fetchCount += 1;
  },

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
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.refreshPage();
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

  refreshPage() {
    const { list } = this.data;
    let updateOption = {};
    querySelectorAll(`.list-item-${this.fetchCount - 1}`).then((nodes) => {
      console.log('nodes' + (this.fetchCount - 1) + ':', nodes);
      nodes.forEach((node, index) => {
        const { height } = node;
        let idx = index + (this.fetchCount - 2) * this.total;
        const item = list[idx];
        if(index === 0) {
          Object.assign(updateOption, {
            [`list[${idx}]`]: {
              ...item,
              position: 'left',
              top: this.leftHeight,
            }
          })
          this.leftHeight += height;
        } else if (index === 1) {
          Object.assign(updateOption, {
            [`list[${idx}]`]: {
              ...item,
              position: 'right',
              top: this.rightHeight,
            }
          })
          this.rightHeight += height;
        } else {
          if (this.leftHeight <= this.rightHeight) {
            Object.assign(updateOption, {
              [`list[${idx}]`]: {
                ...item,
                position: 'left',
                top: this.leftHeight,
              }
            })
            this.leftHeight += height;
          } else {
            Object.assign(updateOption, {
              [`list[${idx}]`]: {
                ...item,
                position: 'right',
                top: this.rightHeight,
              }
            })
            this.rightHeight += height;
          }
        }
        if (index === nodes.length - 1) {
          console.log('updateOption:', updateOption)
          this.setData(updateOption, () => {
            console.log('listlll', this.data.list)
          })
        }
      })
    })
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
    this.fetchData(true);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
import MiTimer from '../../utils/mi-timer';

const nowDate = Date.now();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    startTime: nowDate,
    endTime: nowDate + 27 * 60 * 60
  },


  onPaused() {
    this.selectComponent('.mi-timer').pausedTimer();
  },

  onRestart() {
    this.selectComponent('.mi-timer').continueTimer();
  },

  onTimerBegin() {
    this.setData({
      startTime: nowDate,
      endTime: nowDate + 800
    })
  },

  handleTimeEnd() {
    console.log('time end')
  }
})
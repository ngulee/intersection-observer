import MiTimer from '../../utils/mi-timer';


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dateFormat: {
      type: String,
      value: 'hh:mm:ss:ms'
    },
    startTime: {
      type: Number,
      value: 0,
    },
    endTime: {
      type: Number,
      value: 0,
    },
    itemStyle: {
      type: String,
      value: '',
    },
    separatorStyle: {
      type: String,
      value: '',
    }
  },

  observers: {
    'startTime, endTime': function() {
      this.stopTimer(() => {
        this.startTimer();
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    timerInfo: null,
  },

  timer: null,

  lifetimes: {
    ready() {
      this.startTimer();
    },
    detached() {
      this.stopTimer();
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    startTimer() {
      const {
        dateFormat,
        startTime,
        endTime,
      } = this.properties;

      this.timer = new MiTimer({
        dateFormat,
        onTimeChange: (res) => {
          this.setData({
            timerInfo: res,
          })
        },
        onTimeEnd: () => {
          this.triggerEvent('onTimeEnd', {})
        }
      });

      this.timer.begin({
        startTime,
        endTime,
      });
    },

    stopTimer(stopCallback) {
      if (this.timer) {
        this.timer.stop(stopCallback);
      }
    },

    pausedTimer() {
      if (this.timer) {
        this.timer.pause();
      }
    },

    continueTimer() {
      if (this.timer) {
        this.timer.continue();
      }
    }
  }
})

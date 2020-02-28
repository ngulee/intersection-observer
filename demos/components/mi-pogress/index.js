// components/mi-pogress/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    backgroundColor: {
      type: String,
      value: 'rgba(255,89,52,0.4)'
    },
    color: {
      type: String,
      value: 'linear-gradient(345deg,rgba(255,37,62,1) 0%,rgba(255,119,65,1) 100%)'
    },
    value: {
      type: [String, Number],
      value: 0,
    },
    width: {
      type: [String, Number],
      value: 433
    },
    height: {
      type: [String, Number],
      value: 19
    },
    iconSrc: {
      type: String,
      value: '',
    },
    iconWidth: {
      type: [String, Number],
      value: 84,
    },
    iconHeight: {
      type: [String, Number],
      value: 84,
    }
  },

  observers: {
    value(nextValue) {
      let value = Math.floor(Number(nextValue));
      if(value < 0) {
        value = 0;
      }

      if (value > 100) {
        value = 100;
      }

      console.log('value:', )

      this.setData({
        progressValue: value
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    progressValue: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

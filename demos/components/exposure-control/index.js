

const SHOW_TRACKER = 'show';    // 曝光上报

const THRESHOLD = 1;            // 默认阈值

Component({
  /**
   * 组件的属性列表
   */
  properties: {

    options: {
      type: Object,
      value: null,
    },
    thresholds: {
      type: Array,
      value: [THRESHOLD],
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    thresholds: [THRESHOLD],
  },

  isExposured: false,
  interObser: null,

  lifetimes: {
    ready() {
      this.initIntersectionObserver();
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    initIntersectionObserver() {
      
      if (this.isExposured) return;
    
      
      const { thresholds } = this.data;
      const [threshold] = thresholds;

      this.interObser = this.createIntersectionObserver({
        thresholds,
      });
      this.interObser
          .relativeToViewport()
          .observe('.exposure-control', (target) => {
            const { intersectionRatio } = target;

            if (intersectionRatio === threshold) {
              this.onReportData();
              this.onExposure(target);
              this.interObser.disconnect();
              this.interObser = null;
            }
          })
    },

    // 上报埋点数据
    onReportData() {
      this.isExposured = true;
      const { options } = this.properties;
      console.log('options:', options)
      if (!(Object.prototype.toString.call(options) !== '[object Object]')) return;
    },

    // 曝光回调
    onExposure(target) {
      this.triggerEvent('onExposure', target)
    },

    onTap() {
      this.onReportData();
    }
  }
})

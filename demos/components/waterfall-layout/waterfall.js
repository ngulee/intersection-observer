
const POSITION_LEFT = 'left';
const POSITION_RIGHT = 'right';

Component({
  properties: {
    className: {
      type: String,
      value: '',
    },
    width: {
      type: [Number, String],
      value: '100vw',
    },
    height: {
      type: [Number, String],
      value: '100vh',
    },
    upperThreshold: {
      type: [Number, String],
      value: 100,
    },
    lowerThreshold: {
      type: [Number, String],
      value: 100,
    },
    rowGap: {
      type: Number,
      value: 10,
    }
  },
  relations: {
    './waterfall-item': {
      type: 'child'
    },
  },
  data: {
    
  },

  scaling: 2,

  childCount: 0,
  leftHeights: 0,
  rightHeights: 0,

  lifetimes: {
    created() {
      this.getDeviceScaling();
    },
    ready() {
      this.childCount = 0;
      this.leftHeights = 0;
      this.rightHeights = 0;
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 获取具体设备的缩放比例
     */
    getDeviceScaling() {
      wx.getSystemInfo({
        success: ({ screenWidth })=>{
          const scaling = 750 / screenWidth;

          this.scaling = Number(scaling.toFixed(2));
        }
      });
    },
  
    /**
     * 获取 waterfall-item 的高度值
     * @param {*} item 
     * @param {*} callback 
     */
    getWaterfallItemPostionInfo(item, callback) {

      const { rowGap } = this.properties;

      let top = 0;
      let position = POSITION_LEFT;
      const { height } = item;
      const row_gap = (rowGap * 2 / this.scaling);

      if (this.leftHeights <= this.rightHeights) {
        top = this.leftHeights;

        if(this.leftHeights === 0) {
          this.leftHeights += height;
        } else {
          top += row_gap;
          this.leftHeights += height + row_gap;
        }
      } else {
        position = POSITION_RIGHT;
        top = this.rightHeights;

        if(this.rightHeights === 0) {
          this.rightHeights += height;
        } else {
          top += row_gap;
          this.rightHeights += height + row_gap;
        }
      }

      callback && callback(position, top);
    },
  
    handleScrollBoundary(e) {
      const {type, ...others } = e;
      this.triggerEvent(type, others)
    }
  }
})

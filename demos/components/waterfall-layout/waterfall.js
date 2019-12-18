
Component({
  properties: {
    className: {
      type: String,
      value: '',
    },
    upperThreshold: {
      type: [Number, String],
      value: 50,
    },
    lowerThreshold: {
      type: [Number, String],
      value: 50,
    },
    rowsGap: {
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
    name: 'ul',
    itemMapPosition: [],
  },

  scaling: 2,

  childCount: 0,
  itemsPosition: [],
  leftHeights: 0,
  rightHeights: 0,

  lifetimes: {
    created() {
      this.getDeviceScaling();
    },
    ready() {
      const nodes = this.getRelationNodes('./waterfall-item');
      this.childCount = 0;
      this.itemsPosition = [];
      this.leftHeights = 0;
      this.rightHeights = 0;
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getDeviceScaling() {
      wx.getSystemInfo({
        success: ({ screenWidth })=>{
          const scaling = 750 / screenWidth;

          this.scaling = Number(scaling.toFixed(2));
        }
      });
    },
    getItemHeight(item, callback) {

      const { rowsGap } = this.properties;

      let top = 0;
      let position = 'left';
      const { height } = item;
      const rows_gap = (rowsGap * 2 / this.scaling);

      if (this.leftHeights <= this.rightHeights) {
        top = this.leftHeights;

        if(this.leftHeights === 0) {
          this.leftHeights += height;
        } else {
          top += rows_gap;
          this.leftHeights += height + rows_gap;
        }
       
        this.itemsPosition.push({
          position: 'left',
          top: this.leftHeights,
        })
      } else {
        position = 'right';
        top = this.rightHeights;

        if(this.rightHeights === 0) {
          this.rightHeights += height;
        } else {
          top += rows_gap;
          this.rightHeights += height + rows_gap;
        }

        this.itemsPosition.push({
          position: 'right',
          top: this.rightHeights,
        });
        
      }

      callback && callback(position, top);
    },
    handleScrollBoundary(e) {
      const {type, ...others } = e;
      console.log('e:', e)
      this.triggerEvent(type, others)
    }
  }
})

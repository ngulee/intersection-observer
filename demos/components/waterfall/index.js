
Component({
  properties: {
    rowsGap: {
      type: Number,
      value: 10,
    }
  },
  relations: {
    '../waterfall-item/index': {
      type: 'child'
    },
  },
  data: {
    name: 'ul',
    itemMapPosition: [],
  },

  childCount: 0,
  itemsPosition: [],
  leftHeights: 0,
  rightHeights: 0,

  lifetimes: {
    ready() {
      const nodes = this.getRelationNodes('../waterfall-item/index');
      this.childCount = nodes.length || 0;
      this.itemsPosition = [];
      this.leftHeights = 0;
      this.rightHeights = 0;
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getItemHeight(item, callback) {

      const { rowsGap } = this.properties;

      let position = 'left';
      let top = 0;
      const { height } = item;

      if (this.leftHeights <= this.rightHeights) {
        top = this.leftHeights;

        if(this.leftHeights === 0) {
          this.leftHeights += height;
        } else {
          top += rowsGap;
          this.leftHeights += height + rowsGap;
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
          top += rowsGap;
          this.rightHeights += height + rowsGap;
        }

        this.itemsPosition.push({
          position: 'right',
          top: this.rightHeights,
        });
        
      }

      callback && callback(position, top);
    }
  }
})

import { querySelector } from './query-node';

Component({
  relations: {
    './waterfall': {
      type: 'parent',
      linked(target) {
        // console.log('li-target:', target)
      }
    }
  },

  properties: {
    width: {
      type: [Number, String],
      value: 360,
    }
  },

  data: {
    itemCount: 100,
    name: 'li',
    position: 'left',
    top: -1,
  },

  parent: null,

  lifetimes: {
    ready() {
      const { itemCount } = this.data;
      const [customUl] = this.getRelationNodes('./waterfall');
      customUl.childCount += 1;

      this.parent = customUl;

      this.setData({
        itemCount: itemCount + customUl.childCount,
      })

      this.setWaterfallItemPosition();
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setWaterfallItemPosition() {
      const _this = this;
      querySelector('.waterfall-item', this)
        .then((node) => {
          this.parent.getWaterfallItemPostionInfo(node, (position, top) => {
            _this.setData({
              top,
              position
            })
          })
        })
    },
  }
})

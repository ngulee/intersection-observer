import { querySelector } from './query-node';
import { relationBehavior } from './behaviors';

Component({
  behaviors: [relationBehavior],
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

      this.getMasonryItemBoundingClient()
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getMasonryItemBoundingClient() {
      const _this = this;
      querySelector('.waterfall-item', this)
        .then((node) => {
          this.parent.getItemHeight(node, (position, top) => {
            _this.setData({
              top,
              position
            })
          })
        })
    },
  }
})

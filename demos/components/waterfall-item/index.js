import { querySelector } from '../../utils/dom-api';
const getRelations = require('../../utils/get-relations');

Component({
  behaviors: [getRelations],
  relations: {
    '../waterfall/index': {
      type: 'parent',
      linked(target) {
        // console.log('li-target:', target)
      }
    }
  },

  data: {
    name: 'li',
    position: 'left',
    top: 0,
  },

  parent: null,

  lifetimes: {
    ready() {
      const [customUl] = this.getRelationNodes('../waterfall/index');

      this.parent = customUl;
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

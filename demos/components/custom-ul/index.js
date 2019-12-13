import { querySelectorAll } from '../../utils/dom-api';
Component({
  relations: {
    '../custom-li/index': {
      type: 'descendant',
      linked(target) {
        // console.log('ul-target:', target)
      }
    },
    '../custom-li-v1/index': {
      type: 'descendant',
      linked(target) {
        // console.log('ul-target:', target)
      }
    }
  },
  data: {
    name: 'ul',
  },
  lifetimes: {
    ready() {
      const nodes = this.getRelationNodes('../custom-li/index');
      const nodes1 = this.getRelationNodes('../custom-li-v1/index');
      console.log('nodes:', nodes, nodes1)
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

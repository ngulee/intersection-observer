const getRelations = require('../../utils/get-relations');
Component({
  behaviors: [getRelations],
  relations: {
    '../custom-ul/index': {
      type: 'ancestor',
      linked(target) {
        // console.log('li-target:', target)
      }
    }
  },
  data: {
    name: 'li-v1',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    test() {
      const parentNode = this._getParent('../custom-ul/index');
      console.log('parentNode-v1:', parentNode)
      // const customLi = parentNode.
    }
  }
})

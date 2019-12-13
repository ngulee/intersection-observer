const getRelations = require('../../utils/get-relations');

Component({
  behaviors: [getRelations],
  relations: {
    '../custom-ul/index': {
      type: 'ancestor',
      linked(target) {
        console.log('li-target:', target)
      }
    }
  },

  data: {
    name: 'li',
  },

  lifetimes: {
    ready() {
      setTimeout(() => {
        this.test()
      }, 2000)
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    test() {
      const parentNode = this._getParent('../custom-ul/index');
      console.log('parentNode:', parentNode)
      const [customLiV1] = parentNode.getRelationNodes('../custom-li-v1/index');
      customLiV1.setData({
        name: 'v111111'
      }, () => {
        console.log('customLiV1:', customLiV1.data)
      })
    }
  }
})

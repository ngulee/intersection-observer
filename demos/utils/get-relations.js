module.exports = Behavior({
  methods: {
    _getParent(path) {
      this.parentPath = path;
      const parentNodes = this.getRelationNodes(path);
      console.log('parentNodes:', parentNodes);
      if (parentNodes && parentNodes.length !== 0) {
        return parentNodes[0];
      } else {
        return this;
      }
    },
    _getSibling(path) {
      const parentNode = this._getParent(this.parentPath);
      console.log('parentNode11:', parentNode)
      const node = parentNode.getRelationNodes(path);
      console.log('node111:L', node)
      if (node && node.length > 0) {
        return node[0]
      } else {
        return null;
      }
    }
  }
})
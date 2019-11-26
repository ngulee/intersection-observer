import { querySelectorAll } from '../../utils/dom-api';
import { mockList } from './mock';

const SHOW_LIST_COUNT = 15;    // 页面展示的列表总数
const UPDATE_COUNT = 10;       // 翻页每次移动的数据个数

const LIST_ITEM_HEIGHT  = 340; // rpx
const THRESHOLD = 0.2;         // 阈值


const TOP_ID = 'top';
const BOTTOM_ID = 'bottom';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],                  // 页面中展示的数据
  },
  currentPage: 0,              // 数据当前页数
  pageTotal: 5,                // 数据总页数
  allList: mockList,           // 所有已经请求的列表数据
  startIndex: 0,               // 展示数据起始索引值
  endIndex: SHOW_LIST_COUNT,   // 展示数据结束索引值

  observerInstances: {},       // 观察对象实例集合

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData();
  },

  formatData(list = []) {
    return list.map((item, index) => {
      Object.assign(item, {
        id: index === 0 ? TOP_ID : (index === list.length - 1 ? BOTTOM_ID : ''),
        top: `${LIST_ITEM_HEIGHT * (this.startIndex + index)}rpx`,
      })
      return item;
    });
  },

  // 初始化数据
  initData() {
    const renderList = this.allList.slice(this.startIndex, this.endIndex);
    this.setData({
      list: this.formatData(renderList),
    }, () => {
      this.initIntersectionObservers();
      this.updateData();
    })
  },

  // 加载更多数据
  updateData() {
    // 预先加载两页的数据；数据全部加载后将不再执行加载数据逻辑
    if (this.allList.length - this.endIndex >= 2 * UPDATE_COUNT || this.currentPage > this.pageTotal ) return;
    const length = this.allList.length;
    const updateList = [...mockList].map((val, index) => {
      const item = {};
      Object.assign(item, {
        ...val,
        index: length + index + 1
      })
      return item;
    });
    
    this.allList.push(...updateList);
    this.updateData();
    this.currentPage += 1;
  },

  // 更新要展示的数据开始/结束索引值
  updateIndex(start, end) {
    const { startIndex, endIndex } = this;
    if (start === startIndex && end === endIndex) return;
    Object.assign(this, {
      startIndex: start,
      endIndex: end,
    });
    const renderList = this.allList.slice(this.startIndex, this.endIndex);
    this.setData({
      list: this.formatData(renderList),
    }, () => {
      this.initIntersectionObservers();
      this.updateData();
    })
  },

  // 创建相交监听
  initIntersectionObservers() {
    const { allList } = this;
    // 清除相交监听的实例对象集合
    this.observerInstances = {};
    querySelectorAll('.border-element').then((targets) => {
      targets.forEach(({ id }) => {
        if (!this.observerInstances[id] && id) {
          const interObser = wx.createIntersectionObserver(this, {
            thresholds: [THRESHOLD]
          });
          interObser.relativeToViewport().observe(`#${id}`, (interTarget) => {
            const { id, intersectionRatio } = interTarget;

            // 页面初始化，或边界元素和参考元素相离
            if (intersectionRatio === 1 || intersectionRatio <= THRESHOLD) return;

            // scroll down
            if (id === TOP_ID) {
              const minStartIndex = 0;
              const minEndIndex =  SHOW_LIST_COUNT;

              const newStartIndex = this.startIndex - UPDATE_COUNT >= minStartIndex
                                  ? this.startIndex - UPDATE_COUNT : minStartIndex;
              const newEndIndex = this.endIndex - UPDATE_COUNT >= minEndIndex
                                ? this.endIndex - UPDATE_COUNT : minEndIndex;

              this.updateIndex(newStartIndex, newEndIndex);
            }
            // scroll up
            if (id === BOTTOM_ID) {
              const maxStartIndex = allList.length - SHOW_LIST_COUNT;
              const maxEndIndex =  allList.length;

              const newStartIndex = this.startIndex + UPDATE_COUNT <= maxStartIndex
                                  ? this.startIndex + UPDATE_COUNT : maxStartIndex;
              const newEndIndex = this.endIndex + UPDATE_COUNT <= maxEndIndex ?
                                  this.endIndex + UPDATE_COUNT : maxEndIndex;

              this.updateIndex(newStartIndex, newEndIndex);
            }
            
          });
          this.observerInstances[id] = interObser;
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.onLoadIntersectionObserver();
  },

  // 取消相交监听，释放内存
  onLoadIntersectionObserver() {
    const observerProps = Object.keys(this.observerInstances);
    observerProps.forEach((prop) => {
      if (!this.observerInstances[prop]._disconnected) {
        this.observerInstances[prop].disconnect();
      }
    });
  },
})
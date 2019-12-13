import { querySelector, querySelectorAll } from '../../utils/dom-api';
const THRESHOLD = 0.9;

Component({
  options: {
    multipleSlots: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: [],
    }
  },

  relations: {
    './__components/link-menu-nav-item/index': {
      type: "child",
      linked() {
        console.log('nav')
      }
    },
    './__components/link-menu-content-item/index': {
      type: "child",
      linked() {
        console.log('content')
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    activatedNavId: 'nav-0',
    activatedContId: 'cont-0',
    scrollTop: 0,
  },
  navItemHeight: 0,
  windowHeight: 603,

  interObeser: null,

  lifetimes: {
    ready() {
      console.log('this1:', this);
      this.getNavItemHeight();
      wx.getSystemInfo({
        success: (res) => {
          console.log('this2:', res)
          this.windowHeight= res.windowHeight;
        }
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    initIntersectionObserver() {
      querySelectorAll('.content-item', this).then((nodes) => {
        nodes.forEach((node) => {
          const { top, bottom, dataset: { index} } = node;
          if (top <= 0 && bottom > 0) {
            const activatedNavId = `nav-${index}`;
            if (this.data.activatedNavId === activatedNavId) return;
            // console.log('index:', index)
            const scrollTop = this.getNavScrollViewScrollTop(index);
            this.setData({
              scrollTop,
              activatedNavId: `nav-${index}`,
              isClick: false,
            })
          }
        });
      });
    },
  
    getNavItemHeight() {
      querySelector('.link-tab >>> .link-left', this).then((nav) => {
        console.log('nav:', nav);
        this.navItemHeight = nav.height;
      })
    },
  
    getNavScrollViewScrollTop(activedNavIndex) {
      const { navItemHeight, windowHeight } = this;
      const count = Math.floor(windowHeight / navItemHeight / 2);
      const scrollTop = (activedNavIndex - count + 1) * navItemHeight;
      // console.log(navItemHeight, windowHeight, count, activedNavIndex, scrollTop);
      return scrollTop > 0 ? scrollTop : 0;
    },
  
    onClickNavigation({ target: { dataset: { index } } }) {
      this.setData({
        activatedContId: `cont-${index}`,
        activatedNavId: `nav-${index}`,
        isClick: true,
      })
    },
  
    onTabContentScroll({ detail }) {
      this.initIntersectionObserver();
    },
    
  }
})

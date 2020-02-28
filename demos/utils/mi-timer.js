/**
 * 检测源对象的数据
 * @param { any } source 源对象
 * @param { String } expirationtype 预期的数据类型名称
 * @return { Boolean } boolean
 */
const testDataType = function(source, expirationtype) {
  const validType = `[object ${expirationtype}]`;
  return Object.prototype.toString.call(source).toLowerCase() === validType;
}

class MiTimer {
  /**
   * MiTimer 倒计时模块构造函数
   * @param { Object } props 构造函数属性选项
   * @param { String } props.dateFormat 倒计时数据格式，支持 "dd:hh:mm:ss:ms"、"hh:mm:ss:ms"、"mm:ss:ms"、"hh:mm"等格式，其中字母大小写均可
   * @param { Function } props.onTimeChange 根据 dateFormat 最小的单位，数据每变化一次，触发此回调
   * @param { Function } props.onTimeEnd 倒计时结束触发此回调
   */
  constructor(props) {
    const {
      dateFormat,
      onTimeChange = () => {},
      onTimeEnd = () => {},
    } = props;

    this.dateFormat = dateFormat ? dateFormat : "HH:MM:ss:ms";

    this.onTimeChange = onTimeChange;
    this.onTimeEnd = onTimeEnd;

    this.innerTimer = null;
    this.dateFormats = null;

    this.isPaused = false;
    this.pauseTime = 0;

    this.interval = 0;
  }

  getDateFormatType() {
    const formats = {};
    this.dateFormat.match(/(\w+)/gi).forEach((item) => {
      item = item.toLowerCase();

      formats[item] = item;
    });
    return formats;
  }

  /**
   * Mitimer实例倒计时开始
   * @param { Object } options 参数选项
   * @param { String } options.startTime 倒计时开始时间戳，单位：秒(s)
   * @param { String } options.endTime 倒计时结束时间戳，单位：秒(s)
   */
  begin(options = {}) {
    const { startTime, endTime } = options;
    
    if (
      !testDataType(startTime, 'number')
      || !testDataType(endTime, 'number')
      || endTime <= startTime
    ) return;

    const surplusTime = endTime - startTime;
    
    this.timer(surplusTime);
  }

  timer(surplusTime) {

    this.pauseTime = surplusTime;

    if (this.isPaused) {
      return;
    }

    const timerResult = {};
    if (!this.dateFormats) {
      this.dateFormats = this.getDateFormatType();
    }

    const { dd, mm, ss, ms } = this.dateFormats;

    if (surplusTime > 0) {

      const  millisecond = Math.floor((surplusTime % 60) % 1 * 10);
      const seconds = Math.floor(surplusTime % 60);
      const minutes = Math.floor((surplusTime / 60) % 60);
      let hour = Math.floor((surplusTime / 3600) % 24);
      const day = Math.floor(surplusTime / 86400) > 0 ? Math.floor(surplusTime / 86400) : 0; // 60 * 60 * 24

      

      // 如果没有天数，则小时可以超过24小时
      if (!dd) {
        hour = day * 24 + hour;
      }

      if (this.interval <= 0) {
        if (ms === 'ms') {
          this.interval = 0.1;
        }
  
        if (!ms && ss === "ss") {
          this.interval = 1;
        }
  
        if (!ms && !ss && mm === "mm") {
          this.interval = 60;
        }
      }

      if (this.interval <= 0) return;

      Object.assign(timerResult, {
        hh: this.formartNumber(hour),
        mm: this.formartNumber(minutes),
        ss: this.formartNumber(seconds),
      });

      if (ms === 'ms') {
        Object.assign(timerResult, {
          ms: `${millisecond}`,
        });
      }
      if (dd && dd === 'dd') {
        Object.assign(timerResult, {
          dd: day,
        });
      }

      this.onTimeChange(timerResult);

      this.innerTimer = setTimeout(() => {
        surplusTime -= this.interval;

        this.timer(surplusTime);

      }, this.interval * 1000);
    } else {

      if (ms === 'ms') {
        Object.assign(timerResult, {
          ms: '0',
        })
      }
      if (ms === 'dd') {
        Object.assign(timerResult, {
          dd: '00',
        })
      }
      
      Object.assign(timerResult, {
        hh: '00',
        mm: '00',
        ss: '00',
      });

      this.onTimeChange(timerResult);

      if (this.innerTimer) {
        clearInterval(this.innerTimer);
      }
      this.onTimeEnd();
    }
  }

  pause() {
    this.isPaused = true;
  }

  continue() {
    this.isPaused = false;
    this.timer(this.pauseTime);
  }

  stop(stopCallback = () => {}) {
    if (this.innerTimer) {
      clearInterval(this.innerTimer);
    }

    stopCallback();
  }

  formartNumber(num = 0) {
    return num <= 9 ? `0${num}` : num;
  }
}

export default MiTimer;
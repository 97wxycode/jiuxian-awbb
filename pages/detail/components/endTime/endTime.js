// pages/detail/components/endTime/endTime.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    end:Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    day: 0,
    hour: 0,
    minute: 0,
    second: 0
  },

  lifetimes: {
    attached: function () {
      console.log(this.properties.end)
      this.countFun(this.properties.end)
    },
    detached: function () {
     console.log(1)
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    countFun:function(end_time) {
      let sys_second = (end_time - new Date().getTime());
      this.timer = setInterval(() => {
        //防止倒计时出现负数
        if (sys_second > 1000) {
          sys_second -= 1000;
          let day = Math.floor((sys_second / 1000 / 3600) / 24);
          let hour = Math.floor((sys_second / 1000 / 3600) % 24);
          let minute = Math.floor((sys_second / 1000 / 60) % 60);
          let second = Math.floor(sys_second / 1000 % 60);
          this.setData({
            day: day,
            hour: hour < 10 ? "0" + hour : hour,
            minute: minute < 10 ? "0" + minute : minute,
            second: second < 10 ? "0" + second : second
          })
        } else {
          clearInterval(this.timer);
          //倒计时结束时触发父组件的方法
          //this.props.timeEnd();
        }
      }, 1000);
    }
  }
})

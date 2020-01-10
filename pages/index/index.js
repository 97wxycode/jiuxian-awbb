Component({
  data: {
    searchStatus: false,
    countStatus: false
  },
  methods: {
    scroll(e) {
      let scrollTop = e.detail.scrollTop;
      if (scrollTop >= 20) {
        this.setData({
          searchStatus: true
        });
      } else {
        this.setData({
          searchStatus: false
        });
      }
      if (scrollTop >= 253) {
        this.setData({
          countStatus: true
        });
      } else {
        this.setData({
          countStatus: false
        });
      }
    },
    onPullDownRefresh(){
      console.log('下拉刷新')
    }
  }
})
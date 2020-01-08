Component({
  data: {
    selected: 0,
    color: "black",
    selectedColor: "#e96560",
    list: [{
      "text": "全部",
    },
    {
      "text": "待付款",
    },
    {
      "text": "待发货",
    },
    {
      "text": "待收货",
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})
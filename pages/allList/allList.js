Page({
  options: {
    pureDataPattern: /^_/ // 指定所有 _ 开头的数据字段为纯数据字段
  },
  data: {
    selected: 1,
    selectedColor:"red",
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
    }],
    _mapStatus: {
      0: "all",
      1: "unpaid",
      2: "beingProcessed",
      3: 'shipped'
    },
    goodsList:[],
  },

  switchTab(e) {
    console.log(0)
    const data = e.currentTarget.dataset
    console.log(data.index)
    this._reqData(data.index)
  },

  _reqData(index){
    let key = this.data._mapStatus[index]
    let data = wx.getStorageSync(key)
    this.setData({
      selected: index,
      goodsList: data
    })
  },
  attached() {
  },
  // created() {
  //   console.log(page.path, 1)
  // },
  onLoad: function (options) {
    console.log("onLoad")
    console.log(options)
    // 页面创建时执行
    let index = options.status
    this._reqData(index)
  },

})
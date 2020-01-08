Page({
  data: {
    currentPage:0,
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
  tabChange(e) {
    console.log('tab change', e)
    
  }
});
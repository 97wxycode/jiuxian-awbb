const app = getApp()
Component({
  data: {
    choose: ['综合排序', '销量', '价格'],
    list: [],
    initial:'综合排序',
    keyword:'茅台',
    imgUrl:'/resources/imgs/desc.png',
    index:1,
    orderBy: '1:0',
    ascending :1
  },
  
  lifetimes: {

    ready() {
      this.setData({
        keyword: app.id
      })
      console.log(app.id)
      var pages = getCurrentPages()    //获取加载的页面

      var currentPage = pages[pages.length - 1]    //获取当前页面的对象

      var options = currentPage       
      this.requestData(this.data.keyword, this.data.index, this.data.orderBy)
    }
    
  },
  methods: {
    requestData(keyword, index, orderBy) {
      wx.request({
        url: `https://newapplist.jiuxian.com/search/searchProduct.htm?appKey=374f336c-263a-4c74-8e18-f5f0ce261c73&appVersion=8.6.2&apiVersion=1.0&areaId=500&channelCode=0, 1&cpsId=WeChat applet&deviceType=ANDROID&pushToken=&supportWebp=2&token=&equipmentType=iPhone 8 (GSM+CDMA)&screenReslolution=375x603&sysVersion=iOS 13.3&pageSize=10&keyword=` + keyword + `&pageIndex=` + index + `&orderBy=` + orderBy,
        method: 'GET',
        dataType: 'json',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: (res) => {
          let list = res.data.result.resultList
          let _data = this.data.list.concat(list)
          this.setData({
            list: _data
          })
          console.log(list)
         
        }
      })
    },
    onReachBottom(){
      this.setData({
        index:this.data.index+1
      })
      console.log(this.data.index)
      this.requestData(this.data.keyword, this.data.index, this.data.orderBy)
    },
    handleTabTap(e){
      let initial = e.currentTarget.dataset.key
      
      if (initial ==='价格'){
        this.setData({
          ascending: this.data.ascending+1
        })
        if (this.data.ascending%2===0){
          initial = '升序'
          this.setData({
            imgUrl:'/resources/imgs/shenxu.png'
          })
        }else{
          initial = '降序'
          this.setData({
            imgUrl:'/resources/imgs/jiangxu.png'
          })
        }
      }
      console.log(initial)
      let orderBy = ''
      switch(initial){
        case '综合排序': orderBy = '1:0';
          break;
        case '销量': orderBy = '4:0';
          break;
        case '升序': orderBy = '5:0' ;initial ='价格';
          break;
        case '降序': orderBy = '5:1'; initial = '价格';
          break;
      }
      console.log(orderBy)
      this.setData({
        initial,
      })
      this.setData({
        orderBy,
      })
      wx.request({
        url: `https://newapplist.jiuxian.com/search/searchProduct.htm?appKey=374f336c-263a-4c74-8e18-f5f0ce261c73&appVersion=8.6.2&apiVersion=1.0&areaId=500&channelCode=0, 1&cpsId=WeChat applet&deviceType=ANDROID&pushToken=&supportWebp=2&token=&equipmentType=iPhone 8 (GSM+CDMA)&screenReslolution=375x603&sysVersion=iOS 13.3&pageSize=10&keyword=` + this.data.keyword + `&pageIndex=` + this.data.index + `&orderBy=` + this.data.orderBy,
        method: 'GET',
        dataType: 'json',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: (res) => {
          let list = res.data.result.resultList
          this.setData({
            list
          })
        }
      })
    }
  }
})
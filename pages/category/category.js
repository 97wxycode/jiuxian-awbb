Component({
  data: {
    list: [],
    wineKind: [
      '白酒',
      '葡萄酒',
      '洋酒',
      '黄/保/啤'
    ],
    initial: '白酒'
  },
  lifetimes: {
    created() {
      wx.request({
        url: 'https://newappproduct.jiuxian.com/product/categoryDetail.htm?appKey=374f336c-263a-4c74-8e18-f5f0ce261c73&appVersion=8.6.2&apiVersion=1.0&areaId=500&channelCode=0,%201&cpsId=WeChat%20applet&deviceType=ANDROID&pushToken=&supportWebp=2&token=&equipmentType=iPhone%208%20(GSM+CDMA)&screenReslolution=375x555&sysVersion=iOS%2013.3&id=2',
        method: 'GET',
        dataType: 'json',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: (res) => {
          let list = res.data.result.attrList
          console.log(list)
          console.log(list[3].list[0].name)
          this.setData({
            list
          })
        }
      })
    }
  },

  methods: {
    handletap(e) {
      let initial = e.currentTarget.dataset.key
      this.setData({
        initial
      })

    }
  }
})
// pages/detail/detail.js
Page({
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    interval: 2000,
    duration: 500,
    detailData: {},
    count: 1,
    cart: []
  },
  onReady: function() {
    wx.getStorage({
      key: 'cart',
      success: (res) => {
        this.setData({
          cart: res.data
        })
      }
    })
    wx.request({
      url: 'https://newappproduct.jiuxian.com/product/proDetail.htm',
      data: {
        appKey: ' c23e80a9-1004-4405-8bf6-deaea798d134',
        deviceType: 'XIAOCHENGXU',
        proId: '18426'
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        this.setData({
          detailData: res.data.result
        })
        console.log(this.data.detailData)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  add: function() {
    if (this.data.count < 99)
      this.setData({
        count: this.data.count + 1
      })
  },
  cut: function() {
    if (this.data.count > 1)
      this.setData({
        count: this.data.count - 1
      })
  },
  addCart: function() {

    let {
      proId,
      proName,
      proPrice,
      imageList,
      brandId,
      brandName
    } = this.data.detailData

    let currentPro = {
      proId,
      proName,
      proPrice,
      count: this.data.count,
      proImg: imageList[0].bigImage,
      checked: true
    }

    let currentShop = {
      brandId,
      brandName,
      checked: true,
      list: [
        currentPro
      ]
    }

    let isShop = this.data.cart.find(obj => {
      return obj.brandId == currentShop.brandId
    })
    if (isShop) {
      let isPro = isShop.list.find(obj => {
        return obj.proId == currentPro.proId
      })
      console.log(currentPro.count, isPro.count)
      isPro ? isPro.count += currentPro.count : isShop.list.push(currentPro)
    } else {
      this.data.cart.push(currentShop)
    }

    wx.setStorage({
      key: "cart",
      data: this.data.cart
    })
    wx.getStorage({
      key: 'cart',
      success: (res) => {
        console.log(res.data, 1)
      }
    })
  }
})
// pages/detail/detail.js

Page({
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    interval: 2000,
    duration: 500,
    detailData: {},
    count: 1,
    cart: [],
    shop:{},
    price:'',
    proId:'',
    showOneButtonDialog: false,
    oneButton: [{ text: '确定' }],
  },
  onLoad:function(opt){
    this.setData({
      proId: opt.proid
    })
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
        appKey: 'c23e80a9-1004-4405-8bf6-deaea798d134',
        deviceType: 'XIAOCHENGXU',
        proId: this.data.proId
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        this.setData({
          detailData: res.data.result
        })
        //判断是否自营
        let currentShop={
          shopId: res.data.result.shopId || res.data.result.brandId,
          shopIntro: res.data.result.shopIntro || res.data.result.brandCulture,
          shopLogo: res.data.result.shopLogo || res.data.result.brandImage,
          shopName: res.data.result.shopName || res.data.result.brandName,
        }
        this.setData({
          shop: currentShop,
          price: res.data.result.mobileExclusivePrice||res.data.result.proPrice,
          proId: res.data.result.proId
        })
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
      proPrice:this.data.price,
      count: this.data.count,
      proImg: imageList[0].bigImage,
      checked: false,
      isTouchMove:false
    }
 
    let currentShop = {
      brandId,
      brandName:this.data.shop.shopName,
      checked: false,
      list: [
        currentPro
      ]
    }

    let isShop = this.data.cart.find(obj => {
      return obj.brandId == currentShop.brandId
    })
    console.log(isShop)
    if (isShop) {
      let isPro = isShop.list.find(obj => {
        return obj.proId == currentPro.proId
      })
      isPro ? isPro.count += currentPro.count : isShop.list.push(currentPro)
    } else {
      this.data.cart.push(currentShop)
    }

    wx.setStorage({
      key: "cart",
      data: this.data.cart
    })

    this.setData({
      showOneButtonDialog: true
    })


    wx.getStorage({
      key: 'cart',
      success: (res) => {
        console.log(res.data, 1)
      }
    })
  },

  goComment:function(){
    wx.navigateTo({
      url: `../comments/comments?proId=${this.data.proId}`
    })
  },
  tapDialogButton(e) {
    this.setData({
      showOneButtonDialog: false
    })
  },
  goCart:function(){
    console.log(222211111111222)
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  }
})
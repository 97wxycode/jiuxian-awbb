// pages/myjx/myjx.js
Page({

  login(){
    console.log("login")
    // wx.login({
    //   success(res) {
    //     if (res.code) {
    //       console.log(res.code)
    //       //发起网络请求
    //       wx.request({
    //         url: 'https://lisusususuli.top/login',
    //         data: {
    //           code: res.code
    //         }
    //       })

    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // })
  },

  toAllList(){
    wx.navigateTo({
      url: '/pages/allList/allList?type=0',
    })
  }
})
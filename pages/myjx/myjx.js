// pages/myjx/myjx.js
Page({

  login(){
    console.log("login")
    wx.login({
      success(res) {
        if (res.code) {
          console.log(res.code)
          //发起网络请求
          wx.request({
            url: 'http://139.129.240.185:7777/login',
            data: {
              code: res.code
            }
          })

        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
})
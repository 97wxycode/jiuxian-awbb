// pages/myjx/myjx.js
Page({
  login(){
    console.log("login")
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://lisusususuli.top/users/login',
            data: {
              code: res.code
            },
            success:(data)=>{
              console.log(data)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  toAllList(){
    wx.navigateTo({
      url: '/pages/allList/allList?status=0',
    })
  }
})
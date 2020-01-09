// pages/category/category.js
Page({
  clickToSearch(){
    console.log(1)
    wx.navigateTo({
      url: "/pages/search/search_content/search_content"
    })
  }

})
// pages/search/search_list/search_list.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },
  lifetimes: {
    created:function () {
     
    },
    attached: function () {
        this.setData({
          list: app.list
        })
    },
    ready: function () {
     
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})

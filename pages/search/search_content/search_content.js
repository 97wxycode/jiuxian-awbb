// pages/search/search_content/search_content.js.js
// const app = getApp()
const myPackage = require('weui-miniprogram')
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  data: {
    keywords:'',
    list: [], 
    searchRecord:[]
  },
  lifetimes: {
    created: function () {
      this.setData({
        search: this.search.bind(this)
      })
      this.openHistorySearch();
    },
    attached: function () {
      
    },
    ready:function () {
      
    }
  },
  methods: {
    search: function (value) {
      let that = this
      this.setData({
        keywords: value
      })
      let searchRecord = this.data.searchRecord
      
      if (searchRecord.length < 5) {
        searchRecord.unshift({
          value: value,
          id: searchRecord.length
        })
      } else {
        searchRecord.pop() //删掉旧的时间最早的第一条
        searchRecord.unshift({
          value: value,
          id: searchRecord.length
        })
      }
      wx.setStorageSync('searchRecord', searchRecord)
      console.log(this.data.searchRecord, '0000')
      return new Promise((resolve, reject) => {
        resolve()
      })
      .then(() =>{
        let that = this
        wx.request({
          url: 'https://newapplist.jiuxian.com/search/associateHistorySearch.htm?appKey=374f336c-263a-4c74-8e18-f5f0ce261c73&areaId=500&channelCode=0, 1&deviceType=ANDROID',
          data: {
            keyword: value
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            if (res.data.success === '1') {
              let result = res.data.result.result.assHotPojos
              for(let i = 0;i<result.length;i++){
                let leg = that.data.keywords.split('').length
                result[i].name_key = result[i].name.substring(0,leg)
                result[i].name_content = result[i].name.substring(leg, result[i].length)
                result[i].id = i
              }
              that.setData({
                list: result
              })
            } else {
              that.setData({
                list: ['请换一个关键字试试']
              })
            }
          }
        })
      })
    },
    openHistorySearch: function () {
      this.setData({
        searchRecord: wx.getStorageSync('searchRecord') || [], //若无储存则为空
      })
    },
  }
})

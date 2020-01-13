Component({
  /**
   * 组件的属性列表
   */
  properties: {
    proId:Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    labelList:[],
    commentList:[],
    labelId: 999999999
  },

  lifetimes: {
    attached:function(){
      wx.request({
        url: 'https://newappuser.jiuxian.com/comment/getProductCommentDetail.htm',
        data: {
          appKey: 'c23e80a9-1004-4405-8bf6-deaea798d134',
          productId: this.properties.proId,
          labelId: '999999999',
          pager: 3,
          appVersion: '8.6.2'
        },
        method: "GET",
        dataType: 'json',
        responseType: 'text',
        success: (res)=> {
          this.setData({
            labelList:res.data.result.labelList,
            commentList: res.data.result.commentList
          })
          console.log(res.data.result)
        }
      })

    },
    detached: function() {

    },
  },
  /**
   * 组件的方法列表
   */
 
  methods: {
    onScreen:function(e){
     let labelId=e.currentTarget.dataset['labelid']
      console.log(e,labelId)
      this.setData({
        labelId: labelId
      })
      wx.request({
        url: 'https://newappuser.jiuxian.com/comment/getProductCommentDetail.htm',
        data: {
          appKey: 'c23e80a9-1004-4405-8bf6-deaea798d134',
          productId: this.properties.proId,
          labelId: labelId,
          pager: 3,
          appVersion: '8.6.2'
        },
        method: "GET",
        dataType: 'json',
        responseType: 'text',
        success: (res) => {
          this.setData({
            commentList: res.data.result.commentList
          })
          console.log(res.data.result)
        }
      })

    } 
  }
})
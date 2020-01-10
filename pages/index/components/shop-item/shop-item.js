Component({
  properties: {
    isborder:{
      type:Boolean,
      value:true
    }
  },
  data: {
    isBorder:true
  },
  lifetimes:{
    attached(){
      this.setData({
        isBorder: this.data.isborder
      });
    }
  },
  methods: {
    goBuy(){
      wx.navigateTo({
        url: '/pages/detail/detail',
      })
    }
  }
})

const app=getApp();

Component({
  data: {
    userInfo:{}
  },
  lifetimes: {
    attached: function () {
      this.setData({
        userInfo:app.userInfo
      });
    }
  },
  methods:{
   
  }
})
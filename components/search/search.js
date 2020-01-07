Component({
  properties:{
    status:Boolean
  },
  data: {
    searchStatus:false
  },
  observers: {
    status(newVal){
      this.setData({
        searchStatus:newVal
      });
    }
  }
})

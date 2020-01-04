Component({
  properties:{
    status:Boolean
  },
  data: {
    searchStatus:false
  },
  methods: {

  },
  observers: {
    status(newVal){
      this.setData({
        searchStatus:newVal
      });
    }
  }
})

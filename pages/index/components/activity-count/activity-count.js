Component({
  properties: {
    status:Boolean
  },
  data: {
    countStatus:false
  },
  observers: {
    status(newVal) {
      this.setData({
        countStatus: newVal
      });
    }
  },
  methods: {
    clickHandler(e){
      console.log(e.touches[0])
    }
  }
})

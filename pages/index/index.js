Component({
  data: {
    searchStatus:false
  },
  methods:{
    scroll(e){
      let scrollTop = e.detail.scrollTop;
      if(scrollTop>=20){
        this.setData({
          searchStatus:true
        });
      }else{
        this.setData({
          searchStatus: false
        });
      }
    }
  }
})
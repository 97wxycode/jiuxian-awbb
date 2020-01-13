import touch from "../../utils/touchmoveDir.js"
Component({
  properties: {
    cart: Array,
    list: Array,
    brandId:Number,
    updateCart: Object,
    setNewData:Object
  },
  data: {

  },
  lifetimes:{
    attached(){ 
     this.touch =  new touch()
    } 
  },
  methods: {
    deleteGoods(e) {
      let that = this
      wx.showModal({
        content: '确定要删除该商品吗',
        confirmColor: '#e96560',
        success(res) {
          if (res.confirm) {
            that._modifyCart(e, (ind, currentIndex, item, newList) => {
              if (ind != currentIndex) {
                newList.push(item)
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },

    goodsAdd(e) {
      this._modifyCart(e, (i, index, item, newList) => {
        if (i == index) {
          if (item.count < 50) {
            item.count++
          }
        }
        newList.push(item)
      })
    },

    goodsSub(e) {
      this._modifyCart(e, (i, index, item, newList) => {
        if (i == index) {
          if (item.count > 1) {
            item.count--
          }
        }
        newList.push(item)
      })
    },

    _modifyCart(e, func) {
      let currentIndex = e.currentTarget.dataset.index
      let brandId = e.currentTarget.dataset.brand
      let newStore = []

      this.data.cart.forEach((store, index) => {
        if (store.brandId == brandId) {
          let newList = []
          store.list.forEach((item, ind) => {
            //传入当前遍历index，当前选中项index，当前选中项，用于赋值的新数组
            func(ind, currentIndex, item, newList)
          })
          store.list = newList
        }
        if (store.list.length > 0) {
          newStore.push(store)
        }
      })
      
      wx.setStorageSync({
        key: "cart",
        data: newStore
      })
      this.updateCart()
    },

    touchstart(e) {
      //开始触摸时 重置所有删除,让所有isTouchMove都是false，达到页面只有一个元素可以滑动删除得效果
      let data = this.touch._touchstart(e, this.cart)
      this.setNewData(data)
      // this.setData({
      //   cart: data
      // })
    },

    touchmove(e) {
      let data = this.touch._touchmove(e, this.cart)
      this.setNewData(data)
    },
  }
})
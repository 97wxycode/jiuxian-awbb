// pages/cart/cart.js
import touch from "../../utils/touchmoveDir.js"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cart: [],
    total: {
      price: 0,
      count: 0,
      isTotal: false,
    }
  },

  touch: new touch(),

  onLoad() { 
    let that = this;
    wx.getStorage({
      key: 'cart',
      success: function(res) {
        let { currentCount, currentPrice } = that._payment(res.data)
        that.setData({
          cart: res.data,
          total: {
            count: currentCount,
            price: currentPrice
          }
        })
      },
    })
  },

  deleteGoods(e) {
    let currentIndex = e.currentTarget.dataset.index
    let brandId = e.currentTarget.dataset.brand
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
//增删改逻辑
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
    //判断是不是全选中了，修改最底部全选
    let isAll = this._isAll(this.data.cart)
    let { currentCount, currentPrice } = this._payment(newStore)
    this.setData({
      cart: newStore,
      total: {
        isTotal: isAll,
        count: currentCount,
        price: currentPrice
      }
    }, () => {
      wx.setStorage({
        key: "cart",
        data: newStore
      })
    })
  },

  touchstart(e) {
    //开始触摸时 重置所有删除,让所有isTouchMove都是false，达到页面只有一个元素可以滑动删除得效果
    let data = this.touch._touchstart(e, this.data.cart)
    this.setData({
      cart: data
    })
  },
  touchmove(e) {
    let data = this.touch._touchmove(e, this.data.cart)
    this.setData({
      cart: data
    })
  },
//二级全选
  checkedAll(e){
    let index = e.target.dataset.index
   
    let isChecked = !this.data.cart[index].checked

    this.data.cart[index].checked = isChecked
    this.data.cart[index].list.forEach((item , i )=>{
      this.data.cart[index].list[i].checked = isChecked
    })
    //判断是不是全选中了，修改最底部全选
    let isAll = this._isAll(this.data.cart)
    //计算价格
    let { currentCount, currentPrice } = this._payment(this.data.cart)
    this.setData({
      cart: this.data.cart,
      total: {
        isTotal: isAll,
        count: currentCount,
        price: currentPrice
      }
    },() => {
      wx.setStorage({
        key: "cart",
        data: this.data.cart
      })
    })
  },
  //单选
  checkedOne(e){
    
    let currentIndex = e.target.dataset.index
    let brandId = e.target.dataset.brandid
    let checkedCount = 0

    let cart= this.data.cart

    cart.forEach((store,index)=>{
      if (store.brandId == brandId){
        store.list.forEach((item,i)=>{
          if (currentIndex == i){
            cart[index].list[i].checked = !cart[index].list[i].checked
          }
          if (cart[index].list[i].checked) {
            checkedCount++
          }
        })
        if (checkedCount == store.list.length){
          cart[index].checked = true
        } else {
          cart[index].checked = false
        }
      }
    })
    //判断是不是全选中了，修改最底部全选
    let isAll = this._isAll(this.data.cart)
    //计算价格
    let { currentCount, currentPrice } = this._payment(cart)
    this.setData({
      cart: cart,
      total: {
        isTotal: isAll,
        count: currentCount,
        price: currentPrice,
        
      }
    }, () => {
      wx.setStorage({
        key: "cart",
        data: cart
      })
    })
  },
  //底部一级全选框
  allgoodsCheck(){
    let allCheck = !this.data.total.isTotal
    //全选或全反选
    this.data.cart.forEach((store,index) => {
      this.data.cart[index].checked = allCheck
      store.list.forEach((item, i) => {
        this.data.cart[index].list[i].checked = allCheck
      })
    })
    //计算价格
    let { allCount, allPrice } = this._payment(this.data.cart)
    if (!allCheck){
      allCount= 0,
      allPrice =0
    }
    //更新，存库
    this.setData({
      cart:this.data.cart,
      total:{
        isTotal: allCheck,
        count: allCount,
        price: allPrice
      }
    },()=>{
      wx.setStorage({
        key: "cart",
        data: this.data.cart
      })
    })
  },
  //计算价格数量
  _payment(cart){
    let allCount = 0;
    let currentCount = 0;
    let allPrice = 0;
    let currentPrice =0
    cart.forEach((store) => {
      store.list.forEach((item,i)=>{
        allCount += item.count
        allPrice += item.count * item.proPrice

        if (item.checked){
          currentCount += item.count
          currentPrice += item.count * item.proPrice
        }
      })
    })
    return {
      allCount, allPrice, currentCount, currentPrice
    }
  },
  //判断购物车是否全部选中，是则令底部全选为true
  _isAll(cart){
    let allBoolean = cart.every((store, index) => {
      return store.list.every((item, i) => {
        return item.checked == true
      })
    })
    return allBoolean;
  }
})
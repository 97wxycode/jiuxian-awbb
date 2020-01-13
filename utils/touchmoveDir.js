var startX
var startY

class touch {
  constructor() {
  }

  _touchstart(e, items) {
    //开始触摸时 重置所有删除
    items.forEach((store, i)=> {
      store.list.forEach((item,ind)=>{
        if (item.isTouchMove) //只操作为true的
        item.isTouchMove = false;
      })
      
    })

    startX = e.changedTouches[0].clientX
    startY = e.changedTouches[0].clientY
    return items
  }

  _touchmove(e, items) {

    let currentIndex = e.currentTarget.dataset.index
    let brandId = e.currentTarget.dataset.brand

    let touchMoveX = e.changedTouches[0].clientX //滑动变化坐标
    let touchMoveY = e.changedTouches[0].clientY //滑动变化坐标

    //获取滑动角度
    let angle = this._angle(
      {
      X: startX,
      Y: startY
      },
      {
        X: touchMoveX,
        Y: touchMoveY
      });

    items.forEach(function (store, i) {
      store.list.forEach((item,ind)=>{
        item.isTouchMove = false
        //滑动超过30度角 return
        if (Math.abs(angle) > 30) return;

        if (ind == currentIndex && store.brandId == brandId) {
          // console.log("items", currentIndex, brandId)
          if (touchMoveX > startX) //右滑
            item.isTouchMove = false
          else //左滑
            item.isTouchMove = true
        }

      })
    })
    return items
  }

  _angle(start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  }
}

export default touch
import {data} from './data/p-data.js'
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  data: {
    province: '',
    city: '',
    district: '',
    latitude: '',
    longitude: '',
    provinceId:'',
    cityId:'',   
    value1: ['北京'],
    value2: [],
    value3: [],
    displayValue1: '-- 请选择 --',//省
    displayValue2: '-- 请选择 --',//市
    displayValue3: '-- 请选择 --',//县/区
    options1: [],
    options2: [],
    options3: [],
    disable1:false,
    disable2: false,
    disable3: false,
    _regions:{}
  },
  onLoad() {
    qqmapsdk = new QQMapWX({
      key: '57CBZ-ELWKF-PCUJL-N2RMY-BQZ4H-IKFZY'
    });
    this.setData({ options1: data })
  },
  onShow(){
    let vm = this;
    vm.getUserLocation();
  },
  onReady: function () {
    let that = this
    wx.request({
      url: 'https://m.jiuxian.com/m_v1/goods/getRegions',
      success: function (res) {
        that.setData({
          _regions: res.data
        }, () => {

        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  // 设置值的显示
  setValue(values, key) {
    this.setData({
      [`value${key}`]: [values.value],
      [`displayValue${key}`]: values.label,
    })
  },
  // 点击弹出框确定时的回调
  onConfirm(e) {
    const { index } = e.currentTarget.dataset
    this.setValue(e.detail, index)
    if(index === '1'){
      let province = e.detail.label
      let provinceId = e.detail.value[0]
      this.setData({
        province: province,
        provinceId: provinceId,
        city: '',
        district: '',
        displayValue2:'-- 请选择 --',
        displayValue3:'',
        disable3:true,
      },() =>{
        console.log(this.data.disable3)
      })
    } else if (index === '2'){
      let city = e.detail.label
      let cityId = e.detail.value[0]
      this.setData({
        cityId,
        city,
        district: '',
        displayValue3: '-- 请选择 --',
        disable3: false,
      })
    } else if (index === '3'){
      let district = e.detail.label
      this.setData({
        district,
      })
    }else{
      console.log('请再次从头选择')
    }
  },
  onValueChange(e) {
    const { index } = e.currentTarget.dataset
    console.log(`onValueChange${index}`, e.detail)
  },
  // 点击市
  handleCell(e){
    let CurrProvinceId = this.data.provinceId
    let city = this.data._regions[CurrProvinceId]
    let finCity =  city.map((item) =>{
      return {
        id: item[0],
        value: item[0].toString(),
        label: item[1]
      }
    })
    this.setData({ options2: finCity })
  },
  // 点击区
  handleCellQu(){
    let CurrCityId = this.data.cityId
    let district = this.data._regions[CurrCityId]
    let finDistrict = district.map((item) => {
      return {
        id: item[0],
        value: item[0].toString(),
        label: item[1]
      }
    })
    this.setData({ options3: finDistrict })
  },
  // 点击确定
  onClicktoValue(){
    let province = this.data.province
    let city = this.data.city
    let district = this.data.district
    if (city === '' || district === ''){
      wx.showToast({
        title: '请选择完整的地址',
        icon: 'none',
        duration: 2000
      })
    }else{
      wx.navigateTo({
        url: `/pages/detail/detail?province=${province}&city=${city}&district=${district}`
      })
      console.log(location)
    }
  },
  // 点击取消
  onClickGoBack(){
    wx.navigateTo({
      url: `/pages/detail/detail`
    })
  },
  // 获取当前经纬度
  getLocation:function(){
    let vm = this
    wx.getLocation({
      type:'wgs84',
      success: function(res) {
        let latitude = res.latitude
        let longitude = res.longitude
        let speed = res.speed
        let accuracy = res.accuracy;
        vm.getLocal(latitude,longitude)
      },
      fail:function(res){
        // 提示获取当前经纬度失败
        console.log('fail' + JSON.stringify(res))
      }
    })
  },
  // 获取当前用户位置
  getLocal: function (latitude, longitude) {
    let vm = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        let province = res.result.ad_info.province
        let city = res.result.ad_info.city
        let district = res.result.ad_info.district
        vm.setData({
          province: province,
          city: city,
          district:district,
          latitude: latitude,
          longitude: longitude,
          displayValue1: province,
          displayValue2: city,
          displayValue3: district,
        })

      },
      fail: function (res) {
        // 提示失败
        console.log(res);
      },
      complete: function (res) {
        // 提示完成
      }
    });
  },
  // 获取用户位置
  getUserLocation:function(){
    let vm = this;
    wx.getSetting({
      success: (res) => {
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation()
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          vm.getLocation()
          //调用wx.getLocation的API
        }
        else {
          //调用wx.getLocation的API
          vm.getLocation()
        }
      }
    })
  }
})




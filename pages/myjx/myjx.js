// Component({
//   methods: {
//     _checkSession() {
//       wx.checkSession({
//         success(res) {
//           //session_key 未过期，并且在本生命周期一直有效
//           console.log('验证通过', res)
//         },
//         fail: () => {
//           // session_key 已经失效，需要重新执行登录流程
//           console.log('验证未通过')
//           this._login() //重新登录
//         }
//       })
//     },
//     _login() {
//       wx.login({
//         success: (res) => {
//           console.log(res.code)
//           if (res.code) {
//             wx.request({
//               url: 'https://lisusususuli.top/users/login',
//               data: {
//                 code: res.code
//               },
//               success: (result) => {
//                 console.log(result)
//                 if (result.data.ret) {
//                   wx.setStorage({
//                     key: "third_session",
//                     data: result.data.third_session
//                   });
//                   wx.getUserInfo({
//                     success: (res)=> {
//                       console.log(1)
//                       console.log('用户信息' + res)
//                       let userInfo = res.userInfo;
//                       let nickName = userInfo.nickName;
//                       let avatarUrl = userInfo.avatarUrl;
//                       let gender = userInfo.gender; //性别 0：未知、1：男、2：女
//                       let province = userInfo.province;
//                       let city = userInfo.city;
//                       let country = userInfo.country;
//                       wx.getStorage({
//                         key: 'third_session',
//                         success(res) {
//                           console.log(res.data)
//                           let userInfos = {
//                             userInfo,
//                             nickName,
//                             avatarUrl,
//                             gender,
//                             province,
//                             city,
//                             country,
//                             third_session: res.data
//                           };
//                           wx.request({
//                             url: "https://lisusususuli.top/users/authLogin",
//                             data: {
//                               userInfos
//                             },
//                             success: (result) => {
//                               console.log('登录成功')
//                             }
//                           });
//                         }
//                       });
//                     },
//                     fail: (res) => {
//                       console.log(res)
//                     }
//                   });
//                 } else {
//                   console.log("失败");
//                 }
//               }
//             });
//           } else {
//             console.log('登录失败！' + res.errMsg)
//           }
//         }
//       });
//     },
//     login() {
//       this._checkSession();
//     },
//     toAllList() {
//       wx.navigateTo({
//         url: '/pages/allList/allList?status=0',
//       })
//     }
//   }
// })

const app=getApp();

Component({
  data:{
    showOneButtonDialog:false
  },
  methods: {
    getUserInfo(res){
      const userInfo = res.detail.userInfo;
      console.log(res.detail.userInfo)
      console.log(0)
      wx.request({
        url: 'https://lisusususuli.top/users/authLogin',
        data:{
          userInfo
        },
        success:(res)=>{
          const userInfo = res.data.data.userInfo;
          console.log(res.data.data.userInfo);
          wx.redirectTo({
            url: '/pages/profile/profile',
            success:()=>{
              app.setUserInfo(userInfo);
            }
          });
        },
        fail:(err)=>{
          console.log(err);
        }
      })
    },
    tapOneDialogButton(e) {
      this.setData({
        showOneButtonDialog: true
      })
    },
    toAllList() {
      wx.navigateTo({
        url: '/pages/allList/allList?status=0',
      })
    }
  }
})
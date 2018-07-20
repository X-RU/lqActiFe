//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    image:'/images/logo.png'
  },
  //事件处理函数
  // bindViewTap: function() {
  //   console.log('11111');
  //   wx.navigateTo({
  //     url: '/pain/login',
  //     fail: (err)=>{ console.log(err) }
  //   })
  // },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    if (e.detail.userInfo == null){
      wx.switchTab({
        url: '/pages/index/index',
      })
    }else{
      console.log("login")
      console.log(e.detail.userInfo)
      app.globalData.userInfo = e.detail.userInfo
      console.log(app.globalData.userInfo)
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      console.log("begin")
      wx.request({
        url: 'http://10.11.4.78:8000/autho/login', //保存登陆用户信息的接口地址
        method: 'POST',
        data: {
          request_code: app.globalData.code,
          image_url: app.globalData.userInfo.avatarUrl,
          name: app.globalData.userInfo.nickName,
          gender: app.globalData.userInfo.gender,
          place: app.globalData.userInfo.country + app.globalData.userInfo.province + app.globalData.userInfo.city
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data)
          console.log("wechat_id"+res.data.wechat_id)
          if (res.data.code == 200) {
            //获取用户微信id
            wx.setStorageSync('wechat_id', res.data.wechat_id) 
          } else {
            wx.showToast({
              title: '登陆出错，请重新登陆！',
              icon: 'none',
              duration: 2000
            })
            this.setData({
              userInfo: e.detail.userInfo,
              hasUserInfo: false
            })
          }

        }
      })
      console.log("end")
    }
  },
  /**
  * 用户点击右上角分享
  */

  onShareAppMessage: function (res) {
    if(res.from == 'menu'){
      console.log("zhuanfa")
    }
    return {
      title: '来趣活动吧～',
      path: '/page/index/index'
    }
  }
})

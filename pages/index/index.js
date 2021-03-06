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
  onShow: function () {
    if (wx.getStorageSync('wechat_id')) {
      console.log("1")
      //获取用户信息
      wx.request({
        url: app.globalData.serverUrl +'me/' + wx.getStorageSync('wechat_id'), //获取用户信息接口地址
        method: 'GET',
        data: {
          // wechat_id: app.globalData.wechat_id
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: (res) => {
          if (res.data.code == 200) {
            console.log(res.data)
            this.setData({
              userInfo: res.data.user_info[0],
              hasUserInfo: true
            })

          }
        }
      })
      
    } else if (this.data.canIUse){
      console.log("2")
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log(res.userInfo)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      console.log("3")
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
      wx.showToast({
        title: '获取用户信息失败！',
        icon: 'none',
        duration: 2000
      })
    }else{
      console.log("login")
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      //获取登陆code
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          console.log('code:' + res.code)
          app.globalData.code = res.code

          wx.request({
            url: app.globalData.serverUrl +'autho/login', //保存登陆用户信息的接口地址
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
            success: (res) => {
              console.log(res.data)
              console.log("wechat_id" + res.data.wechat_id)
              if (res.data.code == 200) {
                //获取用户微信id
                wx.setStorageSync('wechat_id', res.data.wechat_id)
                this.onShow()
              } else {
                wx.showToast({
                  title: '登录出错，请重新登录！',
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
        }
      })
      console.log("end")
    }
  },
  //退出登陆
  bindLogout:function(e){
      if(wx.getStorageSync('wechat_id')){
        wx.showModal({
          title: '提示',
          content: '确定退出登录？',
          success: res => {
            if (res.confirm) {
              //清除用户缓存信息，并提示
              console.log(wx.getStorageSync('wechat_id'))
              wx.removeStorageSync('wechat_id')
              console.log(wx.getStorageSync('wechat_id'))
              wx.showToast({
                title: '退出成功！',
                icon: 'success',
                duration: 1000,
                success:function(){
                   //跳转首页
                  // wx.switchTab({
                  //   url: '/pages/index/index'
                  // })
                  
                }
              }) 
              this.setData({
                hasUserInfo: false
              })

            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
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

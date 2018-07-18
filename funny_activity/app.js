//app.js
import wxValidate from '/utils/wxValidate.js'

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res.code)
        this.globalData.code = res.code
      }
    })


    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log('ok'+res)
              //将用户数据发送给后台，进行存储
              wx.request({
                url: 'https://10.11.4.78:8000/autho/login', //保存登陆用户信息的接口地址
                method: 'post',
                data: {
                  request_code: this.globalData.code,
                  image_url: this.globalData.userInfo.avatarUrl
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success: function (res) {
                  console.log(res.data)
                  if(res.code == 200){
                    //获取用户微信id
                    this.globalData.wechat_id = res.wechat_id
                  }else{
                    wx.showToast({
                      title: '登陆出错，请重新登陆！',
                      icon: 'none',
                      duration: 2000
                    })
                  }
                  
                }
              })
              
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } 
      }
    })
  },
  globalData: {
    userInfo: null,
    code:null,
    wechat_id:null
  },
  wxValidate: (rules, messages) => new wxValidate(rules, messages)
})
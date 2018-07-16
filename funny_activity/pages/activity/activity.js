// pages/activity/activity.js
//获取应用实例
const app = getApp()

Page({
  data: {
    ac_image: '/images/logo.png',
    welcome_text:'趣生活，动起来～',
    inputShowed: false,
    inputVal: ""
    
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  createActivity:function(e){
    // if (app.globalData.userInfo) {
    //   wx.navigateTo({
    //     url: './create_activity',
    //   })
    // }else{
    //   wx.switchTab({
    //     url: '/pages/index/index',
    //     fail: (err) => { console.log(err) }
    //   })
    // }
    wx.navigateTo({
      url: './create_activity',
    })
  }
})
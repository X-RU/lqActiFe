// pages/activity/activity_shift.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  formSubmit: function (e) {
    console.log('提交用户数据', e.detail.value)
    wx.showToast({
      title: '转让成功！',
      icon: 'success',
      duration: 2000
    })
    //将用户数据发送给后台，进行存储
    // wx.request({
    //   url: '/me/update.php', //更新用户信息接口地址
    //   data: {
    //     nickname: e.detail.value.username,
    //     gender: e.detail.value.gender,
    //     age: e.detail.value.age,
    //     career: e.detail.value.career,
    //     area: e.detail.value.area
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    //   }
    // })
  }
})
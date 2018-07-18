// pages/activity/activity_detail.js
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

  bindJoinActivity:function(e) {
    wx.showToast({
      title: '您已报名，无需再报名！',
      icon: 'none',
      duration: 2000
    })
    // // 将用户数据发送给后台，进行存储
    // wx.request({
    //   url: '/me/update.php', //判断活动是否已参加接口地址
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
    //     if(res.code == 200){
    //       wx.showToast({
    //         title: '您已报名，无需再报名！',
    //         icon: 'none',
    //         duration: 2000
    //       })
    //     }else{
    //         wx.showToast({
    //           title: '报名成功！',
    //           icon: 'success',
    //           duration: 2000
    //         })
    //     }
    //   }
    // })
  },
  bindOutActivity: function (e) {
    wx.showModal({
      title: '提醒',
      content: '确认退出该活动吗？',
      confirmText: "确认",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          // 此处请求后台删除该活动的参与人
          console.log('用户点击确认')
        } else {
          console.log('用户点击取消')
        }
      }
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
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
    
    // 将用户数据发送给后台，进行存储
    wx.request({
      url: 'http://10.11.4.78:8000/activity/shift',
      method:'POST',
      data: {
        wechat_id: wx.getStorageSync('wechat_id'),
        activity_id: wx.getStorageSync('activity_id'),
        wechat_id_to: e.detail.value.wechat_id_to
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        if(res.data.code==200){
          wx.showToast({
            title: '转让成功！',
            icon: 'success',
            duration: 2000
          })
        }else{
          wx.showToast({
            title: '转让失败，请填写参与人微信号！',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  }
})
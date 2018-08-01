// pages/activity/activity_shift.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    wechat_id: wx.getStorageSync('wechat_id')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(wx.getStorageSync('activity_id'))
    //请求获取参与者信息
    wx.request({
      url: app.globalData.serverUrl +'activity/' + wx.getStorageSync('wechat_id') + '/detail/' + wx.getStorageSync('activity_id'), //获取活动详情接口地址
      method: 'GET',
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        console.log(res.data)
        if (res.data.code == 200) {
          this.setData({
            user_list: res.data.user_list,
            count: res.data.count,
          });
        } else {
          wx.showToast({
            title: '参与者信息请求失败！',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  formSubmit: function (e) {
    console.log('提交用户数据', e.detail.value)
    
    // 将用户数据发送给后台，进行存储
    wx.request({
      url: app.globalData.serverUrl +'activity/shift',
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
          setTimeout(function () {
            wx.redirectTo({
              url: './activity_detail?activity_id=' + wx.getStorageSync('activity_id')
            })
            }, 3000)
        }else{
          wx.showToast({
            title: '转让失败！',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  }
})
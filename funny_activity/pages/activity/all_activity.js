// pages/activity/all_activity.js
//获取应用实例
const app = getApp()
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["我参与的", "我未参与的"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('wechat_id')) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        
      })
      console.log("111")
      //发请求获取全部活动
      wx.request({
        url: 'http://118.25.180.46/activity/' + wx.getStorageSync('wechat_id'), //判断活动是否已参加接口地址
        method: 'GET',
        data: {
          // activity_id: options.activity_id,
          // wechat_id: app.globalData.wechat_id
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success:  (res) => {
          console.log(res.data)
          if(res.data.code == 200){
            this.setData({
              participate_list: res.data.participate_list,
              no_participate_list: res.data.no_participate_list
            })
          }
          
        }
      })

      console.log("ok")
      // 初始化tab
      var that = this;
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
            sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
          });
        }
      });
    } else {
      console.log("err")
      wx.showToast({
        title: '请先登录！',
        icon: 'none',
        duration: 2000,
      })
      setTimeout(function () {
        wx.switchTab({
          url: '/pages/index/index',
          fail: (err) => { console.log(err) }
        })
      }, 2000)
      
    }
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  // 下啦刷新
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  }
})